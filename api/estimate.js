export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Request-Id');
  res.setHeader('X-Load-Balancer', 'Abhimanyu-Anycast-Director');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const {
    projectType = 'web',
    complexity = 'mid',
    currency = 'INR',
    features = []
  } = req.body || {};

  const baseWeeksMap = { web: 4, mobile: 6, backend: 5, fullstack: 8, '3d': 6 };
  const complexityMultMap = { mvp: 1.0, mid: 1.5, enterprise: 2.3 };
  const featureWeeksMap = {
    auth: 1.0, payments: 1.5, dashboard: 2.0, realtime: 2.0,
    threejs: 2.5, mobile_app: 3.0, caching_redis: 1.0, microservices: 2.5
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

  const sprintCostINR = complexity === 'mvp' ? 120000 : (complexity === 'mid' ? 240000 : 480000);
  const totalCostINR = sprintCostINR * sprintCount;

  const currencyRates = { INR: 1, USD: 85, EUR: 92, GBP: 110 };
  const selectedRate = currencyRates[currency] || 1;
  const formattedTotal = currency === 'INR'
    ? `₹${(totalCostINR / 100000).toFixed(2)} Lakhs`
    : `${currency === 'USD' ? '$' : (currency === 'EUR' ? '€' : '£')}${Math.round(totalCostINR / selectedRate).toLocaleString()}`;

  const randomRef = Math.random().toString(36).substring(2, 8).toUpperCase();

  return res.status(200).json({
    success: true,
    estimate: {
      estimateId: `EST-${randomRef}`,
      createdAt: new Date().toISOString(),
      parameters: { projectType, complexity, currency, featuresSelected: features },
      timeline: { totalWeeks, totalSprints: sprintCount, kickoffLagDays: 3, firstWorkingDemoDays: 14 },
      cost: { currency, estimatedTotal: formattedTotal, rawINR: totalCostINR }
    }
  });
}
