import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { config } from '../config.js';

const estimatesFile = path.join(config.dataDir, 'estimates.json');

function initStorage() {
  if (!fs.existsSync(config.dataDir)) {
    fs.mkdirSync(config.dataDir, { recursive: true });
  }
  if (!fs.existsSync(estimatesFile)) {
    fs.writeFileSync(estimatesFile, JSON.stringify([], null, 2), 'utf8');
  }
}

function readEstimates() {
  try {
    initStorage();
    const data = fs.readFileSync(estimatesFile, 'utf8');
    return JSON.parse(data || '[]');
  } catch {
    return [];
  }
}

function writeEstimates(data) {
  try {
    initStorage();
    fs.writeFileSync(estimatesFile, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write estimates:', err);
  }
}

export function handleCalculateEstimate(req, res) {
  const {
    projectType = 'web',
    complexity = 'mid',
    currency = 'INR',
    features = [],
    saveEstimate = false,
    clientEmail = null
  } = req.body || {};

  // Base Weeks by Project Type
  const baseWeeksMap = {
    web: 4,
    mobile: 6,
    backend: 5,
    fullstack: 8,
    '3d': 6
  };

  // Complexity Multipliers
  const complexityMultMap = {
    mvp: 1.0,
    mid: 1.5,
    enterprise: 2.3
  };

  // Feature Additive Weeks
  const featureWeeksMap = {
    auth: 1.0,
    payments: 1.5,
    dashboard: 2.0,
    realtime: 2.0,
    threejs: 2.5,
    mobile_app: 3.0,
    caching_redis: 1.0,
    microservices: 2.5
  };

  const baseWeeks = baseWeeksMap[projectType] || 4;
  const mult = complexityMultMap[complexity] || 1.5;

  let addedFeatureWeeks = 0;
  if (Array.isArray(features)) {
    features.forEach((f) => {
      if (featureWeeksMap[f]) addedFeatureWeeks += featureWeeksMap[f];
    });
  }

  const totalWeeks = Math.max(2, Math.round((baseWeeks * mult) + addedFeatureWeeks));
  const sprintCount = Math.ceil(totalWeeks / 2);

  // Suggested Team Composition
  let teamSquad = [];
  if (complexity === 'mvp') {
    teamSquad = [
      { role: 'Lead Full-Stack Engineer', count: 1, allocation: '100%' },
      { role: 'UI/UX & Frontend Specialist', count: 1, allocation: '50%' }
    ];
  } else if (complexity === 'mid') {
    teamSquad = [
      { role: 'Lead Full-Stack Engineer', count: 1, allocation: '100%' },
      { role: 'Backend & Cloud DevOps Engineer', count: 1, allocation: '100%' },
      { role: 'Frontend & WebGL Developer', count: 1, allocation: '100%' },
      { role: 'QA Automation Engineer', count: 1, allocation: '50%' }
    ];
  } else {
    teamSquad = [
      { role: 'Principal Architect & Tech Lead', count: 1, allocation: '100%' },
      { role: 'Senior Backend & Database Engineers', count: 2, allocation: '100%' },
      { role: 'Senior Frontend & 3D WebGL Engineers', count: 2, allocation: '100%' },
      { role: 'Cloud Infrastructure / SRE', count: 1, allocation: '100%' },
      { role: 'QA Lead & Security Auditor', count: 1, allocation: '100%' }
    ];
  }

  // Cost Estimation per Currency (Based on Sprint Velocity)
  const sprintCostINR = complexity === 'mvp' ? 120000 : (complexity === 'mid' ? 240000 : 480000);
  const totalCostINR = sprintCostINR * sprintCount;

  const currencyRates = {
    INR: 1,
    USD: 85,
    EUR: 92,
    GBP: 110
  };

  const selectedRate = currencyRates[currency] || 1;
  const formattedTotal = currency === 'INR'
    ? `₹${(totalCostINR / 100000).toFixed(2)} Lakhs`
    : `${currency === 'USD' ? '$' : (currency === 'EUR' ? '€' : '£')}${Math.round(totalCostINR / selectedRate).toLocaleString()}`;

  const phaseSplit = {
    discovery: { name: 'Discovery & Spec', percentage: 15, durationWeeks: +(totalWeeks * 0.15).toFixed(1) },
    architecture: { name: 'Architecture & UI/UX', percentage: 20, durationWeeks: +(totalWeeks * 0.20).toFixed(1) },
    engineering: { name: 'Core Engineering', percentage: 50, durationWeeks: +(totalWeeks * 0.50).toFixed(1) },
    testingLaunch: { name: 'QA, Hardening & Launch', percentage: 15, durationWeeks: +(totalWeeks * 0.15).toFixed(1) }
  };

  const estimateResult = {
    estimateId: `EST-${crypto.randomBytes(3).toString('hex').toUpperCase()}`,
    createdAt: new Date().toISOString(),
    parameters: {
      projectType,
      complexity,
      currency,
      featuresSelected: features
    },
    timeline: {
      totalWeeks,
      totalSprints: sprintCount,
      kickoffLagDays: 3,
      firstWorkingDemoDays: 14
    },
    cost: {
      currency,
      estimatedTotal: formattedTotal,
      rawINR: totalCostINR
    },
    teamSquad,
    phaseSplit
  };

  if (saveEstimate) {
    const estimates = readEstimates();
    estimates.unshift({
      ...estimateResult,
      clientEmail: clientEmail || 'Anonymous'
    });
    writeEstimates(estimates);
  }

  return res.json({
    success: true,
    estimate: estimateResult
  });
}
