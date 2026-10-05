import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function apiDevMiddleware() {
  return {
    name: 'api-dev-middleware',
    configureServer(server) {
      server.middlewares.use('/api/contact', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body || '{}');
              const ticketId = 'ABH-' + Math.floor(1000 + Math.random() * 9000);
              const waText =
                `*🏛️ NEW INQUIRY - ABHIMANYU TECHNOLOGIES*\n` +
                `*Ticket ID:* #${ticketId}\n` +
                `*Client:* ${data.name || 'Anonymous'}\n` +
                `*Contact:* ${data.phone || data.email || 'Not provided'}\n` +
                `*Service:* ${data.service || 'Architecture CAD/BIM'}\n` +
                (data.sqftEstimate ? `*Scope:* ${data.sqftEstimate}\n` : '') +
                `*Brief:* ${data.message || 'Immediate project kickoff requested.'}\n` +
                `*Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`;

              const whatsAppUrl = `https://wa.me/919989028452?text=${encodeURIComponent(waText)}`;

              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  success: true,
                  ticketId,
                  whatsAppUrl,
                  msg: `Inquiry registered successfully! Reference #${ticketId}. Our engineering director will connect within 2 hours.`
                })
              );
            } catch {
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, error: 'Failed to process request' }));
            }
          });
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ status: 'API Contact Service Operational', timestamp: new Date().toISOString() }));
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), apiDevMiddleware()],
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 750,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-three': ['three'],
        },
      },
    },
  },
});
