/**
 * Vercel / Netlify Serverless Function: /api/contact
 * Handles instant client project quote submissions and generates direct WhatsApp Webhook dispatch
 */
export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const { name, phone, email, service, message, sqftEstimate } = req.body || {};

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Name is required.' });
    }

    if (!phone && !email) {
      return res.status(400).json({ success: false, error: 'Phone number or email is required.' });
    }

    // Generate unique inquiry ticket ID
    const ticketId = 'ABH-' + Math.floor(1000 + Math.random() * 9000);
    const timestamp = new Date().toISOString();

    // Formatted WhatsApp message for instant dispatch
    const waText = 
      `*🏛️ NEW INQUIRY - ABHIMANYU TECHNOLOGIES*\n` +
      `*Ticket ID:* #${ticketId}\n` +
      `*Client:* ${name.trim()}\n` +
      `*Phone/Contact:* ${phone || email || 'Not provided'}\n` +
      `*Service Required:* ${service || 'Architecture CAD/BIM'}\n` +
      (sqftEstimate ? `*Scope Estimate:* ${sqftEstimate}\n` : '') +
      `*Project Brief:* ${message || 'Immediate project kickoff requested.'}\n` +
      `*Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`;

    const whatsAppUrl = `https://wa.me/919989028452?text=${encodeURIComponent(waText)}`;

    return res.status(200).json({
      success: true,
      ticketId,
      timestamp,
      whatsAppUrl,
      msg: `Inquiry registered successfully! Reference #${ticketId}. Our engineering director will connect within 2 hours.`
    });
  } catch (err) {
    console.error('[API Contact Error]:', err);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}
