import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { config } from '../config.js';

const schedulesFile = path.join(config.dataDir, 'schedules.json');

function initStorage() {
  if (!fs.existsSync(config.dataDir)) {
    fs.mkdirSync(config.dataDir, { recursive: true });
  }
  if (!fs.existsSync(schedulesFile)) {
    fs.writeFileSync(schedulesFile, JSON.stringify([], null, 2), 'utf8');
  }
}

function readSchedules() {
  try {
    initStorage();
    const data = fs.readFileSync(schedulesFile, 'utf8');
    return JSON.parse(data || '[]');
  } catch {
    return [];
  }
}

function writeSchedules(data) {
  try {
    initStorage();
    fs.writeFileSync(schedulesFile, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write schedules:', err);
  }
}

export function handleBookSchedule(req, res) {
  const { name, email, company, date, timeSlot, timezone, notes } = req.body || {};

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ success: false, error: 'Full name is required.' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Valid business email is required.' });
  }
  if (!date || !timeSlot) {
    return res.status(400).json({ success: false, error: 'Preferred date and time slot are required.' });
  }

  const bookingId = `CALL-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
  const booking = {
    bookingId,
    createdAt: new Date().toISOString(),
    status: 'CONFIRMED',
    attendee: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company ? company.trim() : 'Undisclosed'
    },
    slot: {
      date,
      timeSlot,
      timezone: timezone || 'Asia/Kolkata (IST • UTC+5:30)',
      durationMinutes: 15,
      meetingFormat: 'Google Meet / Zoom'
    },
    host: {
      role: 'Principal Software Architect & Engineering Lead',
      company: 'Abhimanyu Technologies'
    },
    notes: notes ? notes.trim() : ''
  };

  const schedules = readSchedules();
  schedules.unshift(booking);
  writeSchedules(schedules);

  return res.status(201).json({
    success: true,
    message: '15-minute engineering discovery call confirmed.',
    booking
  });
}
