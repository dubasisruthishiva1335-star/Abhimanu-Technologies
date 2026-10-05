export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('X-Load-Balancer', 'Abhimanyu-Anycast-Director');
  return res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Abhimanyu Technologies API Gateway',
    edgeNode: process.env.VERCEL_REGION || 'edge-primary'
  });
}
