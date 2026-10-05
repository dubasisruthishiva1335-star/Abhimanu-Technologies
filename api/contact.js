export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Request-Id');
  res.setHeader('X-Edge-Routing', 'Anycast-Global-v4.2');
  res.setHeader('X-Load-Balancer', 'Abhimanyu-Anycast-Director');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { name, email, company, serviceNeed, budget, timeline, details } = req.body || {};

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Valid full name is required.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: 'Valid email address is required.' });
    }

    const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    const ticketRef = `ABH-${randomSuffix}`;
    const now = new Date();
    const slaDeadline = new Date(now.getTime() + 60 * 60 * 1000);

    const inquiry = {
      ticketId: ticketRef,
      timestamp: now.toISOString(),
      slaGuaranteeTime: slaDeadline.toISOString(),
      status: 'RECEIVED',
      client: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        company: company ? company.trim() : 'Undisclosed'
      },
      scope: {
        serviceNeed: serviceNeed || 'General Engineering Architecture',
        budget: budget || 'Undisclosed',
        timeline: timeline || 'Immediate',
        details: details ? details.trim() : ''
      }
    };

    return res.status(201).json({
      success: true,
      message: 'Engineering inquiry received successfully. Assigned to Technical Director.',
      ticketId: ticketRef,
      slaGuaranteeHours: 1,
      slaDeadline: slaDeadline.toISOString(),
      inquiry
    });
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      service: 'Abhimanyu Technologies Inquiries Gateway',
      status: 'ONLINE'
    });
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}
