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
  const { name, email, company, serviceNeed, budget, timeline, details } = req.body || {};

  // Validation
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ success: false, error: 'Valid full name is required (min 2 characters).' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Valid email address is required.' });
  }

  // Generate unique tracking ticket ID
  const ticketRef = `ABH-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
  const now = new Date();
  const slaDeadline = new Date(now.getTime() + 60 * 60 * 1000); // 1-hour SLA guarantee

  const newInquiry = {
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
    },
    meta: {
      ip: req.ip || req.headers['x-forwarded-for'] || '127.0.0.1',
      userAgent: req.headers['user-agent'] || 'Unknown'
    }
  };

  const contacts = readContacts();
  contacts.unshift(newInquiry);
  writeContacts(contacts);

  return res.status(201).json({
    success: true,
    message: 'Engineering inquiry received successfully. Assigned to Technical Director.',
    ticketId: ticketRef,
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
