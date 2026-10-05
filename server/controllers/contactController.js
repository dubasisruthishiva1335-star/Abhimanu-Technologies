import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { config } from '../config.js';

const contactsFile = path.join(config.dataDir, 'contacts.json');

// Ensure data directory and storage file exist
function initStorage() {
  if (!fs.existsSync(config.dataDir)) {
    fs.mkdirSync(config.dataDir, { recursive: true });
  }
  if (!fs.existsSync(contactsFile)) {
    fs.writeFileSync(contactsFile, JSON.stringify([], null, 2), 'utf8');
  }
}

function readContacts() {
  try {
    initStorage();
    const data = fs.readFileSync(contactsFile, 'utf8');
    return JSON.parse(data || '[]');
  } catch {
    return [];
  }
}

function writeContacts(contacts) {
  try {
    initStorage();
    fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write contacts:', err);
  }
}

export function handleContactSubmit(req, res) {
  const { name, email, phone, company, serviceNeed, service, budget, timeline, details, message, sqftEstimate } = req.body || {};

  // Validation
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ success: false, error: 'Valid full name is required (min 2 characters).' });
  }

  const clientContact = phone || email;
  if (!clientContact || clientContact.trim().length < 5) {
    return res.status(400).json({ success: false, error: 'Valid phone number or email address is required.' });
  }

  // Generate unique tracking ticket ID
  const ticketRef = `ABH-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
  const now = new Date();
  const slaDeadline = new Date(now.getTime() + 60 * 60 * 1000); // 1-hour SLA guarantee

  const resolvedService = service || serviceNeed || 'Architecture CAD/BIM';
  const resolvedDetails = message || details || 'Standard quote request';

  // Format WhatsApp Message
  const waText = 
    `*🏛️ NEW INQUIRY - ABHIMANYU TECHNOLOGIES*\n` +
    `*Ticket ID:* #${ticketRef}\n` +
    `*Client:* ${name.trim()}\n` +
    `*Contact:* ${clientContact.trim()}\n` +
    `*Service:* ${resolvedService}\n` +
    (sqftEstimate ? `*Scope:* ${sqftEstimate}\n` : '') +
    `*Brief:* ${resolvedDetails}\n` +
    `*Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`;

  const whatsAppUrl = `https://wa.me/919989028452?text=${encodeURIComponent(waText)}`;

  const newInquiry = {
    ticketId: ticketRef,
    timestamp: now.toISOString(),
    slaGuaranteeTime: slaDeadline.toISOString(),
    status: 'RECEIVED',
    client: {
      name: name.trim(),
      contact: clientContact.trim(),
      email: email ? email.trim() : null,
      phone: phone ? phone.trim() : null,
      company: company ? company.trim() : 'Direct Client'
    },
    scope: {
      service: resolvedService,
      budget: budget || 'As per quotation',
      timeline: timeline || 'Immediate',
      details: resolvedDetails,
      sqftEstimate: sqftEstimate || null
    },
    meta: {
      ip: req.ip || req.headers['x-forwarded-for'] || '127.0.0.1',
      userAgent: req.headers['user-agent'] || 'Unknown'
    }
  };

  const contacts = readContacts();
  contacts.unshift(newInquiry);
  writeContacts(contacts);

  return res.status(200).json({
    success: true,
    message: 'Engineering inquiry received successfully. Assigned to Technical Director.',
    ticketId: ticketRef,
    whatsAppUrl,
    slaGuaranteeHours: 1,
    slaDeadline: slaDeadline.toISOString(),
    inquiry: newInquiry
  });
}

export function handleGetContacts(req, res) {
  const contacts = readContacts();
  return res.json({
    success: true,
    count: contacts.length,
    inquiries: contacts.slice(0, 50)
  });
}
