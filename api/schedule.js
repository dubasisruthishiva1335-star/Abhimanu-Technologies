export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Request-Id');
  res.setHeader('X-Load-Balancer', 'Abhimanyu-Anycast-Director');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { name, email, company, date, timeSlot, timezone, notes } = req.body || {};

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ success: false, error: 'Full name is required.' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Valid business email is required.' });
  }

  const bookingId = `CALL-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  return res.status(201).json({
    success: true,
    message: '15-minute engineering discovery call confirmed.',
    booking: {
      bookingId,
      createdAt: new Date().toISOString(),
      status: 'CONFIRMED',
      attendee: { name: name.trim(), email: email.trim().toLowerCase(), company: company || 'Undisclosed' },
      slot: { date: date || 'Next Business Day', timeSlot: timeSlot || '14:00 - 14:15 IST', timezone: timezone || 'IST (UTC+5:30)', durationMinutes: 15 },
      notes: notes || ''
    }
  });
}
