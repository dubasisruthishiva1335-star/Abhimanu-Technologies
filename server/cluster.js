import { createApp } from './app.js';
import { Layer7LoadBalancer } from './load-balancer.js';
import { config } from './config.js';

const workerPorts = [5001, 5002, 5003];
const workerServers = [];

console.log(`\n========================================================`);
console.log(`⚡ [Abhimanyu Technologies] Initializing High-Availability Cluster`);
console.log(`========================================================\n`);

// 1. Boot Upstream Backend Workers
workerPorts.forEach((port, idx) => {
  const workerId = `worker-${idx + 1}`;
  const app = createApp(workerId);
  const server = app.listen(port, () => {
    console.log(`  [Worker ${idx + 1}] Up and running on http://127.0.0.1:${port}`);
  });
  workerServers.push({ id: workerId, server, port });
});

// 2. Boot Layer 7 Load Balancer
const lb = new Layer7LoadBalancer({
  port: config.lbPort,
  algorithm: config.algorithm,
  upstreams: config.upstreams
});

lb.listen();

// 3. Graceful Shutdown Management
function shutdown() {
  console.log('\n[Cluster Orchestrator] Graceful shutdown triggered...');
  lb.stop();
  workerServers.forEach(({ id, server }) => {
    server.close(() => console.log(`  [Worker ${id}] Shutdown complete.`));
  });
  setTimeout(() => process.exit(0), 1000);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
