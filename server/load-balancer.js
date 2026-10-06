import http from 'http';
import crypto from 'crypto';
import { config } from './config.js';

class Layer7LoadBalancer {
  constructor(options = {}) {
    this.port = options.port || config.lbPort || 5000;
    this.upstreams = options.upstreams || JSON.parse(JSON.stringify(config.upstreams));
    this.algorithm = options.algorithm || config.algorithm || 'round-robin';
    this.healthCheckConfig = options.healthCheck || config.healthCheck;
    this.roundRobinIndex = 0;
    this.stats = {
      startTime: Date.now(),
      totalRequestsForwarded: 0,
      totalRetries: 0,
      totalErrors: 0
    };

    this.server = null;
    this.healthCheckTimer = null;
  }

  // Choose upstream according to configured algorithm
  selectUpstream(clientIp) {
    const healthyNodes = this.upstreams.filter((node) => node.healthy);

    if (healthyNodes.length === 0) {
      return null;
    }

    if (this.algorithm === 'least-connections') {
      // Pick node with lowest active connections
      return healthyNodes.reduce((minNode, currNode) => {
        return currNode.activeConns < minNode.activeConns ? currNode : minNode;
      }, healthyNodes[0]);
    }

    if (this.algorithm === 'ip-hash') {
      // Hash IP to select deterministic node
      const hash = crypto.createHash('md5').update(clientIp || '127.0.0.1').digest('hex');
      const index = parseInt(hash.substring(0, 8), 16) % healthyNodes.length;
      return healthyNodes[index];
    }

    // Default: Round Robin
    const node = healthyNodes[this.roundRobinIndex % healthyNodes.length];
    this.roundRobinIndex = (this.roundRobinIndex + 1) % healthyNodes.length;
    return node;
  }

  // Forward request to selected upstream with automatic retry support
  forwardRequest(clientReq, clientRes, clientIp, attempt = 1) {
    const selectedNode = this.selectUpstream(clientIp);

    if (!selectedNode) {
      clientRes.writeHead(503, { 'Content-Type': 'application/json', 'X-Load-Balancer': 'Abhimanyu-L7-Director' });
      return clientRes.end(JSON.stringify({
        success: false,
        error: '503 Service Unavailable: No healthy upstream worker available in load balancer pool.',
        poolStatus: this.upstreams.map(u => ({ id: u.id, healthy: u.healthy }))
      }));
    }

    const requestId = clientReq.headers['x-request-id'] || `req_${crypto.randomBytes(4).toString('hex')}`;
    const startTime = process.hrtime();
    selectedNode.activeConns++;
    selectedNode.totalRequests++;
    this.stats.totalRequestsForwarded++;

    const options = {
      hostname: selectedNode.host,
      port: selectedNode.port,
      path: clientReq.url,
      method: clientReq.method,
      headers: {
        ...clientReq.headers,
        'x-forwarded-for': clientIp,
        'x-request-id': requestId,
        'x-load-balancer': 'Abhimanyu-L7-Director',
        'x-upstream-node': selectedNode.id
      }
    };

    const proxyReq = http.request(options, (proxyRes) => {
      const diff = process.hrtime(startTime);
      const latencyMs = ((diff[0] * 1e3) + (diff[1] * 1e-6)).toFixed(2);

      selectedNode.activeConns = Math.max(0, selectedNode.activeConns - 1);

      // Injected response headers
      const responseHeaders = {
        ...proxyRes.headers,
        'X-Load-Balancer': 'Abhimanyu-L7-Director',
        'X-Upstream-Worker': selectedNode.id,
        'X-Upstream-Host': `${selectedNode.host}:${selectedNode.port}`,
        'X-LB-Algorithm': this.algorithm,
        'X-Response-Time-Ms': latencyMs,
        'X-Request-Id': requestId
      };

      clientRes.writeHead(proxyRes.statusCode, responseHeaders);
      proxyRes.pipe(clientRes);
    });

    // Timeout Handling
    proxyReq.setTimeout(config.retry.timeoutMs, () => {
      proxyReq.destroy(new Error('Upstream worker socket timeout'));
    });

    // Error Handling & Circuit Breaker Failover
    proxyReq.on('error', (err) => {
      selectedNode.activeConns = Math.max(0, selectedNode.activeConns - 1);
      selectedNode.failedRequests++;
      this.stats.totalErrors++;

      console.warn(`[Load Balancer] Request to ${selectedNode.id} (${selectedNode.host}:${selectedNode.port}) failed: ${err.message}`);

      // If attempts remain, mark node unhealthy temporarily and failover to next healthy node
      if (attempt <= config.retry.maxRetries) {
        this.stats.totalRetries++;
        console.log(`[Load Balancer] Retrying request (Attempt ${attempt + 1}) to next available upstream...`);
        return this.forwardRequest(clientReq, clientRes, clientIp, attempt + 1);
      }

      if (!clientRes.headersSent) {
        clientRes.writeHead(502, { 'Content-Type': 'application/json', 'X-Load-Balancer': 'Abhimanyu-L7-Director' });
        clientRes.end(JSON.stringify({
          success: false,
          error: '502 Bad Gateway: Upstream worker failed to respond after retries.',
          failedUpstream: selectedNode.id,
          detail: err.message
        }));
      }
    });

    // Pipe request body from client to upstream
    clientReq.pipe(proxyReq);
  }

  // Active Health Checker for All Upstream Nodes
  checkNodeHealth(node) {
    const start = Date.now();
    const req = http.get(
      {
        hostname: node.host,
        port: node.port,
        path: this.healthCheckConfig.endpoint,
        timeout: this.healthCheckConfig.timeoutMs
      },
      (res) => {
        const healthy = res.statusCode >= 200 && res.statusCode < 400;
        const latency = Date.now() - start;

        if (healthy) {
          if (!node.healthy) {
            console.log(`[Health Monitor] Upstream ${node.id} (${node.host}:${node.port}) has RECOVERED (latency ${latency}ms). Re-admitted to pool.`);
          }
          node.healthy = true;
          node.lastCheckLatencyMs = latency;
        } else {
          if (node.healthy) {
            console.warn(`[Health Monitor] Upstream ${node.id} responded with status ${res.statusCode}. Marking node DOWN.`);
          }
          node.healthy = false;
        }
        node.lastCheckTime = new Date().toISOString();
        res.resume(); // consume response data to free socket
      }
    );

    req.on('timeout', () => {
      req.destroy();
      if (node.healthy) {
        console.warn(`[Health Monitor] Upstream ${node.id} timed out. Marking node DOWN.`);
      }
      node.healthy = false;
      node.lastCheckTime = new Date().toISOString();
    });

    req.on('error', () => {
      if (node.healthy) {
        console.warn(`[Health Monitor] Upstream ${node.id} unreachable. Marking node DOWN.`);
      }
      node.healthy = false;
      node.lastCheckTime = new Date().toISOString();
    });
  }

  startHealthChecks() {
    // Initial check
    this.upstreams.forEach((node) => this.checkNodeHealth(node));

    // Periodic check
    this.healthCheckTimer = setInterval(() => {
      this.upstreams.forEach((node) => this.checkNodeHealth(node));
    }, this.healthCheckConfig.intervalMs);
  }

  // Start the HTTP Load Balancer Server
  listen() {
    this.server = http.createServer((req, res) => {
      const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';

      // Handle CORS Preflight
      if (req.method === 'OPTIONS') {
        res.writeHead(204, {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-Request-Id',
          'Access-Control-Max-Age': '86400'
        });
        return res.end();
      }

      // Load Balancer Telemetry & Status API
      const isStatusUrl = req.url === '/lb-status' || req.url === '/api/lb-status' || req.url === '/api/load-balancer/status' || req.url === '/api/cluster/status';
      if (isStatusUrl) {
        const uptimeSec = Math.floor((Date.now() - this.stats.startTime) / 1000);
        const data = {
          service: 'Abhimanyu Technologies Layer 7 Load Balancer',
          status: 'ACTIVE',
          uptime: `${Math.floor(uptimeSec / 3600)}h ${Math.floor((uptimeSec % 3600) / 60)}m ${uptimeSec % 60}s`,
          uptimeSeconds: uptimeSec,
          algorithm: this.algorithm,
          port: this.port,
          timestamp: new Date().toISOString(),
          stats: {
            ...this.stats,
            healthyNodesCount: this.upstreams.filter(u => u.healthy).length,
            totalNodesCount: this.upstreams.length
          },
          upstreams: this.upstreams.map(u => ({
            id: u.id,
            host: `${u.host}:${u.port}`,
            healthy: u.healthy,
            activeConnections: u.activeConns,
            totalRequests: u.totalRequests,
            failedRequests: u.failedRequests,
            lastLatencyMs: u.lastCheckLatencyMs || 0,
            lastCheck: u.lastCheckTime
          }))
        };

        const acceptsHtml = (req.headers.accept || '').includes('text/html') && req.url === '/lb-status';
        if (acceptsHtml) {
          res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8',
            'X-Load-Balancer': 'Abhimanyu-L7-Director'
          });
          const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Abhimanyu Technologies - Layer 7 Load Balancer Console</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { background: #08080a; color: #fff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 30px 20px; }
    .container { max-width: 900px; margin: 0 auto; }
    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(212,175,55,0.2); padding-bottom: 20px; }
    .title { font-size: 24px; font-weight: 700; color: #E6C07A; }
    .badge { background: rgba(34,197,94,0.15); color: #4ade80; border: 1px solid rgba(34,197,94,0.3); padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin: 24px 0; }
    .card { background: rgba(18,18,22,0.85); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 18px; }
    .label { font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.05em; }
    .val { font-size: 22px; font-weight: 700; margin-top: 6px; color: #fff; }
    table { width: 100%; border-collapse: collapse; margin-top: 24px; background: rgba(18,18,22,0.6); border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); }
    th, td { padding: 14px 16px; text-align: left; font-size: 13px; }
    th { background: rgba(255,255,255,0.04); color: #aaa; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; }
    tr:not(:last-child) td { border-bottom: 1px solid rgba(255,255,255,0.04); }
    .status-up { color: #4ade80; font-weight: 600; }
    .status-down { color: #f87171; font-weight: 600; }
    .refresh { font-size: 11px; color: #666; margin-top: 20px; text-align: center; }
  </style>
  <meta http-equiv="refresh" content="5">
</head>
<body>
  <div class="container">
    <div class="header">
      <div>
        <div class="title">⚡ Abhimanyu Layer 7 Load Balancer</div>
        <div style="color: #888; font-size: 13px; margin-top: 4px;">Dynamic Reverse Proxy & Cluster Health Director</div>
      </div>
      <div class="badge">● SYSTEM ACTIVE</div>
    </div>
    <div class="grid">
      <div class="card"><div class="label">Algorithm</div><div class="val" style="color: #E6C07A;">${data.algorithm.toUpperCase()}</div></div>
      <div class="card"><div class="label">Healthy Nodes</div><div class="val">${data.stats.healthyNodesCount} / ${data.stats.totalNodesCount}</div></div>
      <div class="card"><div class="label">Requests Routed</div><div class="val">${data.stats.totalRequestsForwarded}</div></div>
      <div class="card"><div class="label">System Uptime</div><div class="val" style="font-size: 18px;">${data.uptime}</div></div>
    </div>
    <h3 style="color: #E6C07A; font-size: 16px; margin: 30px 0 12px;">Active Upstream Worker Pool</h3>
    <table>
      <thead>
        <tr>
          <th>Worker ID</th>
          <th>Host & Port</th>
          <th>Health</th>
          <th>Active Conns</th>
          <th>Total Req</th>
          <th>Latency</th>
          <th>Last Health Check</th>
        </tr>
      </thead>
      <tbody>
        ${data.upstreams.map(u => `
          <tr>
            <td style="font-weight: 600;">${u.id}</td>
            <td style="font-family: monospace; color: #bbb;">${u.host}</td>
            <td class="${u.healthy ? 'status-up' : 'status-down'}">${u.healthy ? '● HEALTHY' : '✖ DOWN'}</td>
            <td>${u.activeConnections}</td>
            <td>${u.totalRequests}</td>
            <td>${u.lastLatencyMs ? u.lastLatencyMs + 'ms' : 'N/A'}</td>
            <td style="font-size: 11px; color: #888;">${u.lastCheck ? new Date(u.lastCheck).toLocaleTimeString() : 'Pending'}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <div class="refresh">Console auto-refreshes every 5s • JSON endpoint: <a href="/api/lb-status" style="color: #E6C07A;">/api/lb-status</a></div>
  </div>
</body>
</html>`;
          return res.end(html);
        }

        res.writeHead(200, {
          'Content-Type': 'application/json',
          'X-Load-Balancer': 'Abhimanyu-L7-Director',
          'Access-Control-Allow-Origin': '*'
        });
        return res.end(JSON.stringify(data, null, 2));
      }

      // Forward client request
      this.forwardRequest(req, res, clientIp);
    });

    this.server.listen(this.port, () => {
      console.log(`========================================================`);
      console.log(`🚀 [Abhimanyu L7 Load Balancer] Active on Port ${this.port}`);
      console.log(`   Algorithm:       ${this.algorithm.toUpperCase()}`);
      console.log(`   Status Endpoint: http://127.0.0.1:${this.port}/lb-status`);
      console.log(`   Upstream Pool:   ${this.upstreams.map(u => `${u.id} (${u.host}:${u.port})`).join(', ')}`);
      console.log(`========================================================`);
    });

    this.startHealthChecks();
    return this.server;
  }

  stop() {
    if (this.healthCheckTimer) clearInterval(this.healthCheckTimer);
    if (this.server) this.server.close();
  }
}

// Standalone execution if launched directly via `node server/load-balancer.js`
if (process.argv[1]?.includes('load-balancer.js')) {
  const lb = new Layer7LoadBalancer();
  lb.listen();

  process.on('SIGINT', () => {
    console.log('[Load Balancer] Shutting down...');
    lb.stop();
    process.exit(0);
  });
}

export { Layer7LoadBalancer };
