import React, { useState, useEffect, useRef } from 'react';
import ThreeHologramViewer from './components/ThreeHologramViewer.jsx';
import CadBlueprintInspector from './components/CadBlueprintInspector.jsx';
import TiltCard from './components/TiltCard.jsx';
import FloatingContactOrb from './components/FloatingContactOrb.jsx';
import FullWebsite3DBackground from './components/FullWebsite3DBackground.jsx';
import Interactive3DModelCards from './components/Interactive3DModelCards.jsx';

// --- DATA DEFINITIONS ---

const CHAKRAS = [
  {
    id: 'architecture',
    number: 'CHAKRA 01',
    icon: '🏗️',
    title: 'Architecture Division',
    subtitle: 'AutoCAD + BIM + Planning',
    desc: 'Precision CAD drafting, BIM structural models, architectural elevations, and venture approval coordination.',
    features: [
      '2D Floor Plans & 3D Elevations',
      '3D Visualization & Walkthrough',
      'Revit BIM, Structural & MEP',
      'Venture Layouts & GHMC Approvals',
      'Estimation, BOQ & Costing'
    ],
    pricing: 'From ₹15/sq.ft',
    badge: '24hr Delivery • 2 Revisions Free • GHMC Ready',
    highlight: false
  },
  {
    id: 'it',
    number: 'CHAKRA 02',
    icon: '💻',
    title: 'IT Division',
    subtitle: 'AI & Software Company',
    desc: 'Custom software engineering, AI workflow agents, real estate CRMs, mobile applications, and automated WhatsApp pipelines.',
    features: [
      'AI Agents & WhatsApp Automation',
      'Real Estate CRM & Lead System',
      'Websites, SaaS & Mobile Apps',
      'AI for Drawings & Estimation',
      'Cloud DevOps & Security'
    ],
    pricing: 'From ₹50k/project',
    badge: '₹10k/mo SaaS • Demo in 24hr • Zero Lock-in',
    highlight: true
  },
  {
    id: 'freelance',
    number: 'CHAKRA 03',
    icon: '👷',
    title: 'Freelance Hub',
    subtitle: 'Hire Vetted Experts',
    desc: 'On-demand network of certified civil draftsmen, BIM modelers, and full-stack software engineers ready to deploy.',
    features: [
      '60+ AutoCAD Draftsmen',
      '40+ Developers & BIM Experts',
      'Pay Per Drawing / Hourly',
      'Monthly Dedicated Engineer',
      'Dedicated Project Manager'
    ],
    pricing: '20% Platform Fee',
    badge: 'Quality Checked • Replace in 48hr • Vetted Talent',
    highlight: false
  }
];

const PROJECTS = [
  {
    tag: 'ARCHITECTURE',
    tagColor: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
    title: '200 Villas Venture - Shadnagar',
    specs: '120 acres • AutoCAD + 3D + Approvals',
    desc: 'Complete venture master plan, arterial road alignments, individual 200 duplex villa blueprints, and DTCP municipal sanction drawings.',
    bgGrad: 'from-amber-950/40 via-black to-black'
  },
  {
    tag: 'IT + ARCH',
    tagColor: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    title: 'Real Estate AI CRM',
    specs: 'Lead → WhatsApp → Site Visit Auto',
    desc: 'Intelligent lead qualification CRM for builders. Captures Meta ad leads, triggers immediate WhatsApp interactive brochures, and schedules site visits.',
    bgGrad: 'from-purple-950/40 via-black to-black'
  },
  {
    tag: 'FREELANCE',
    tagColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    title: '100 Engineers On-Demand',
    specs: 'For Builders & Consultants',
    desc: 'Rapid elastic scaling for EPC contractors across Hyderabad, Bangalore, and Dubai with zero recruitment overhead.',
    bgGrad: 'from-cyan-950/40 via-black to-black'
  },
  {
    tag: 'BIM & STRUCTURAL',
    tagColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    title: 'G+15 Commercial Complex - Hitec City',
    specs: '450,000 sq.ft • Revit MEP Clash Detection',
    desc: 'High-density commercial office tower complete structural drafting, HVAC routing, plumbing diagrams, and zero-clash BIM coordination.',
    bgGrad: 'from-amber-900/30 via-black to-black'
  },
  {
    tag: 'MUNICIPAL SANCTION',
    tagColor: 'text-green-400 border-green-500/30 bg-green-500/10',
    title: 'Venture Layout & GHMC Sanction',
    specs: 'Miyapur 35 Acres • 100% Approval Rate',
    desc: 'Mortgage plot demarcations, rainwater harvesting design, and GHMC TS-bPASS compliant architectural sanction documentation.',
    bgGrad: 'from-emerald-950/40 via-black to-black'
  },
  {
    tag: 'AI AUTOMATION',
    tagColor: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
    title: 'Autonomous WhatsApp Lead Agent',
    specs: '24/7 AI Buyer Response • 3.2s Reply',
    desc: 'Trained on 400-page builder master plans to answer unit availability, square footage, facing, vastu compliance, and bank loan approvals.',
    bgGrad: 'from-rose-950/40 via-black to-black'
  }
];

const PRICING_PLANS = [
  {
    name: 'Per Drawing',
    price: '₹5,000',
    unit: '/plan',
    desc: 'Ideal for independent homeowners and individual villa plots requiring rapid 24-hour turnaround.',
    features: [
      '1 Detailed 2D Floor Plan',
      'Front Elevation Blueprint',
      'AutoCAD DWG + Print-ready PDF',
      '2 Comprehensive Revisions Included',
      'Vastu & Dimensions Verification',
      'Standard 24-48hr Delivery'
    ],
    cta: 'Order Drawing Now',
    highlight: false
  },
  {
    name: 'Monthly Engineer',
    badge: '⭐ MOST POPULAR FOR BUILDERS',
    price: '₹25,000',
    unit: '/month',
    desc: 'A dedicated civil engineer or AutoCAD draftsman working exclusively for your construction company.',
    features: [
      'Dedicated CAD / BIM Engineer',
      '8 Hours / Day • 6 Days / Week',
      'Unlimited Drawings & Revisions',
      'Direct WhatsApp & Call Access',
      '3D SketchUp & Revit Support',
      'Vetted by Abhimanyu Tech',
      '48-Hour Replacement Guarantee'
    ],
    cta: 'Hire Dedicated Engineer',
    highlight: true
  },
  {
    name: 'IT + Architecture Combo',
    price: 'Custom',
    unit: 'based on scope',
    desc: 'Complete technology & engineering integration for real estate ventures, townships, and commercial developers.',
    features: [
      'Master Venture Layout + BIM Models',
      'Custom Builder Website & Real Estate CRM',
      'Automated WhatsApp Lead Qualifier Bot',
      'Interactive 3D Virtual Tour & Walkthrough',
      'GHMC Sanction Documentation Support',
      'Dedicated Account Director'
    ],
    cta: 'Talk to Founders',
    highlight: false
  }
];

const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Share Requirements',
    desc: 'Send plot dimensions, hand sketches, vastu requirements, or software feature brief via WhatsApp or our instant quote form.',
    tag: 'Step 1 • Immediate Kickoff'
  },
  {
    step: '02',
    title: 'We Design & Engineer',
    desc: 'Our certified architects, BIM modelers, and AI engineers draft your 2D plans, 3D elevations, or software build in 24-48 hours.',
    tag: 'Step 2 • 24-48hr Turnaround'
  },
  {
    step: '03',
    title: 'Deliver, Revise & Support',
    desc: 'Receive full editable AutoCAD DWG, print PDFs, or live deployments. Includes 2 free revisions and full ongoing support.',
    tag: 'Step 3 • Complete Handover'
  }
];

const FAQS = [
  {
    q: 'How fast do you deliver AutoCAD architectural plans?',
    a: 'Standard residential floor plans and elevations are delivered within 24 to 48 hours. Larger venture layouts and multi-storey commercial BIM packages are delivered within 3 to 7 working days with regular milestone previews.'
  },
  {
    q: 'Do we get full ownership of editable AutoCAD (.DWG) and source files?',
    a: 'Yes, 100%. Upon completion, you receive all raw editable AutoCAD .DWG files, Revit .RVT models, high-resolution 3D renders, and full source code repositories with zero vendor lock-in.'
  },
  {
    q: 'Are your drawings compliant with GHMC and TS-bPASS sanction norms?',
    a: 'Yes. All our architectural and venture drawings strictly follow GHMC, HMDA, and DTCP municipal building bylaws, ensuring seamless approval on Telangana’s TS-bPASS portal.'
  },
  {
    q: 'How does the ₹25,000/month Dedicated Engineer plan work?',
    a: 'You get an experienced civil draftsman, BIM modeler, or software engineer working exclusively on your projects for 8 hours a day, 6 days a week, with direct daily WhatsApp and phone coordination, plus a 48-hour replacement guarantee.'
  },
  {
    q: 'Can you develop custom AI software or WhatsApp CRM for real estate builders?',
    a: 'Yes. Our IT division specializes in real estate lead capture CRMs, automated WhatsApp bots that respond to buyer inquiries in 3 seconds, and interactive builder portals starting at ₹50,000.'
  }
];

// --- CANVAS SRI YANTRA BACKGROUND ---
function SriYantraCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let angle = 0;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width * 0.75;
      const cy = canvas.height * 0.5;
      const baseR = Math.min(canvas.width, canvas.height) * 0.38;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);

      // Outer circles with golden glow
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.18)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, baseR, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(230, 192, 122, 0.12)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(0, 0, baseR * 0.94, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // 16 Petals approximation ring
      for (let i = 0; i < 16; i++) {
        const theta = (i * Math.PI * 2) / 16;
        const px = Math.cos(theta) * baseR * 0.9;
        const py = Math.sin(theta) * baseR * 0.9;
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.10)';
        ctx.beginPath();
        ctx.arc(px, py, baseR * 0.08, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 9 Intersecting Triangles (4 Upward, 5 Downward)
      const triangles = [
        { up: true, scale: 0.85, yOff: 0 },
        { up: false, scale: 0.88, yOff: -baseR * 0.05 },
        { up: true, scale: 0.72, yOff: -baseR * 0.02 },
        { up: false, scale: 0.75, yOff: baseR * 0.04 },
        { up: true, scale: 0.60, yOff: -baseR * 0.04 },
        { up: false, scale: 0.62, yOff: baseR * 0.06 },
        { up: true, scale: 0.48, yOff: -baseR * 0.02 },
        { up: false, scale: 0.45, yOff: baseR * 0.04 },
        { up: false, scale: 0.32, yOff: baseR * 0.02 }
      ];

      triangles.forEach((t, idx) => {
        const r = baseR * t.scale;
        const sign = t.up ? -1 : 1;
        ctx.strokeStyle = idx % 2 === 0 ? 'rgba(230, 192, 122, 0.22)' : 'rgba(212, 175, 55, 0.16)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        // Equilateral triangle coordinates
        const p1x = 0;
        const p1y = sign * r + t.yOff;
        const p2x = r * Math.cos(Math.PI / 6);
        const p2y = -sign * (r * Math.sin(Math.PI / 6)) + t.yOff;
        const p3x = -r * Math.cos(Math.PI / 6);
        const p3y = -sign * (r * Math.sin(Math.PI / 6)) + t.yOff;

        ctx.moveTo(p1x, p1y);
        ctx.lineTo(p2x, p2y);
        ctx.lineTo(p3x, p3y);
        ctx.closePath();
        ctx.stroke();
      });

      // Central Bindu
      ctx.fillStyle = 'rgba(255, 215, 0, 0.6)';
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      angle += 0.0008;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

// --- MAIN APPLICATION COMPONENT ---
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calculatorModalOpen, setCalculatorModalOpen] = useState(false);
  const [blueprintInspectorOpen, setBlueprintInspectorOpen] = useState(false);
  const [clusterModalOpen, setClusterModalOpen] = useState(false);
  const [clusterData, setClusterData] = useState(null);
  const [clusterLoading, setClusterLoading] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const fetchClusterStatus = async () => {
    setClusterLoading(true);
    try {
      const res = await fetch('/api/lb-status');
      if (res.ok) {
        const data = await res.json();
        setClusterData(data);
      } else {
        throw new Error('Fallback to default cluster data');
      }
    } catch {
      setClusterData({
        service: 'Abhimanyu Technologies Layer 7 Load Balancer',
        status: 'ACTIVE',
        uptime: '99.98% High Availability',
        algorithm: 'ROUND-ROBIN (FAILOVER RETRY)',
        stats: { healthyNodesCount: 3, totalNodesCount: 3, totalRequestsForwarded: 14820, totalRetries: 3 },
        upstreams: [
          { id: 'worker-1', host: '127.0.0.1:5001', healthy: true, activeConnections: 1, lastLatencyMs: 1.4 },
          { id: 'worker-2', host: '127.0.0.1:5002', healthy: true, activeConnections: 0, lastLatencyMs: 1.6 },
          { id: 'worker-3', host: '127.0.0.1:5003', healthy: true, activeConnections: 2, lastLatencyMs: 1.2 }
        ]
      });
    } finally {
      setClusterLoading(false);
    }
  };
  const [activeProjectTab, setActiveProjectTab] = useState('ALL');

  // Per-Sq.Ft Architecture Calculator State
  const [sqft, setSqft] = useState(2500);
  const [include3D, setInclude3D] = useState(true);
  const [includeBIM, setIncludeBIM] = useState(false);
  const [includeGHMC, setIncludeGHMC] = useState(true);
  const [includeCRM, setIncludeCRM] = useState(false);

  // Form State
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formService, setFormService] = useState('Architecture CAD/BIM');
  const [formMessage, setFormMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  // Calculate pricing based on selections
  const baseCadRate = 15; // ₹15 per sq.ft base 2D CAD
  const rate3D = include3D ? 8 : 0;
  const rateBIM = includeBIM ? 12 : 0;
  const rateGHMC = includeGHMC ? 10 : 0;
  const effectiveRate = baseCadRate + rate3D + rateBIM + rateGHMC;
  const calculatedCadTotal = sqft * effectiveRate;
  const totalWithCRM = calculatedCadTotal + (includeCRM ? 15000 : 0);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) {
      alert('Please enter your name and phone number.');
      return;
    }
    setSubmitting(true);
    setSubmitResult(null);

    const ticketId = 'ABH-' + Math.floor(1000 + Math.random() * 9000);
    const payload = {
      name: formName,
      phone: formPhone,
      service: formService,
      message: formMessage,
      sqftEstimate: `${sqft} sq.ft (Est: ₹${totalWithCRM.toLocaleString('en-IN')})`,
      ticketId,
      timestamp: new Date().toISOString()
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      const generatedWaUrl = data.whatsAppUrl || `https://wa.me/919989028452?text=${encodeURIComponent(
        `*🏛️ INQUIRY #${ticketId} - ABHIMANYU TECHNOLOGIES*\nClient: ${formName}\nPhone: ${formPhone}\nService: ${formService}\nScope: ${sqft} sq.ft\nBrief: ${formMessage || 'Quote request'}`
      )}`;

      setSubmitResult({
        success: true,
        ticketId: data.ticketId || ticketId,
        whatsAppUrl: generatedWaUrl,
        msg: data.msg || data.message || `Quote registered! Reference #${ticketId}. Our engineering director will connect within 2 hours.`
      });
      setFormName('');
      setFormPhone('');
      setFormMessage('');
    } catch {
      const fallbackWaUrl = `https://wa.me/919989028452?text=${encodeURIComponent(
        `*🏛️ INQUIRY #${ticketId} - ABHIMANYU TECHNOLOGIES*\nClient: ${formName}\nPhone: ${formPhone}\nService: ${formService}\nScope: ${sqft} sq.ft\nBrief: ${formMessage || 'Quote request'}`
      )}`;
      setSubmitResult({
        success: true,
        ticketId,
        whatsAppUrl: fallbackWaUrl,
        msg: `Inquiry registered! Reference #${ticketId}. Click below to dispatch directly via WhatsApp.`
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#08080a] text-white min-h-screen font-['Inter',sans-serif] selection:bg-yellow-500 selection:text-black relative">
      {/* FULL WEBSITE 3D WEBGL MODEL BACKGROUND */}
      <FullWebsite3DBackground />
      
      {/* 1. STICKY LUXURY NAVBAR */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-16 py-4 bg-black/85 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-3">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-yellow-500/20 via-black/80 to-yellow-600/20 border border-yellow-500/50 p-1 flex items-center justify-center shadow-lg shadow-yellow-500/20 group-hover:border-yellow-400 group-hover:scale-105 transition shrink-0">
              <img
                src="/abhimanyu-emblem-transparent.png"
                alt="Abhimanyu Technologies Logo"
                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(212,175,55,0.7)]"
              />
            </div>
            <div className="leading-tight">
              <span className="text-lg md:text-xl font-bold tracking-wide font-['Space_Grotesk'] text-white">ABHIMANYU</span>
              <span className="text-yellow-400 font-bold tracking-wider text-xs md:text-sm block">TECHNOLOGIES</span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-semibold tracking-widest text-gray-300">
          <a href="#home" className="hover:text-yellow-400 transition">HOME</a>
          <a href="#3d-studio" className="hover:text-yellow-400 transition flex items-center gap-1.5 text-yellow-300">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping"></span>
            3D STUDIO
          </a>
          <a href="#services" className="hover:text-yellow-400 transition">SERVICES</a>
          <a href="#how-it-works" className="hover:text-yellow-400 transition">PROCESS</a>
          <a href="#work" className="hover:text-yellow-400 transition">WORK</a>
          <a href="#pricing" className="hover:text-yellow-400 transition">PRICING</a>
          <a href="#faq" className="hover:text-yellow-400 transition">FAQ</a>
          <a href="#contact" className="hover:text-yellow-400 transition">CONTACT</a>
        </div>

        {/* CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setBlueprintInspectorOpen(true)}
            className="hidden xl:flex items-center gap-1.5 border border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-300 px-3.5 py-2 rounded-full text-xs font-medium transition"
          >
            <span>📐</span>
            <span>Inspect CAD</span>
          </button>
          <a
            href="#contact"
            className="hidden sm:inline-block border border-yellow-500/50 bg-yellow-500/10 hover:bg-yellow-400 hover:text-black text-yellow-300 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider transition shadow-sm"
          >
            GET QUOTE →
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-white/20 text-gray-300 hover:text-white"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-24 px-6 lg:hidden flex flex-col gap-5 overflow-y-auto pb-10">
          <a href="#home" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-gray-200">HOME</a>
          <a href="#3d-studio" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-yellow-300 flex items-center gap-2">
            <span>⚡</span> 3D WEBGL STUDIO
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setBlueprintInspectorOpen(true);
            }}
            className="text-left text-lg font-bold text-yellow-300 flex items-center gap-2"
          >
            <span>📐</span> INSPECT CAD BLUEPRINT
          </button>
          <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-gray-200">SERVICES (3 CHAKRAS)</a>
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-gray-200">HOW IT WORKS</a>
          <a href="#work" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-gray-200">WORK PORTFOLIO</a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-gray-200">PRICING & CALCULATOR</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-gray-200">FREQUENT QUESTIONS</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-yellow-400">CONTACT & GET QUOTE</a>
        </div>
      )}

      {/* 2. HERO SECTION */}
      <section id="home" className="relative min-h-screen flex items-center px-6 md:px-16 pt-32 pb-20 overflow-hidden">
        {/* Subtle Obsidian Gradient Overlay on Left for Pristine Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080a]/90 via-[#08080a]/60 to-transparent pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <div>
            <div className="inline-flex items-center gap-2 border border-yellow-600/40 bg-yellow-500/10 rounded-full px-4 py-1.5 text-[11px] tracking-[0.25em] text-yellow-400 mb-6 font-semibold">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
              ● CHAKRAVYUHA BREAKER • HYDERABAD • SINCE 2024
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-[76px] font-bold leading-[1.0] font-['Space_Grotesk'] tracking-tight">
              We Break The<br />
              Chakravyuha Of<br />
              <span className="shimmer-text">
                Design & Code.
              </span>
            </h1>

            <p className="mt-6 text-gray-300 text-base md:text-xl max-w-2xl leading-relaxed">
              Abhimanyu Technologies is Hyderabad's first hybrid: <b className="text-white font-semibold">AutoCAD Architecture + BIM + AI Software + Elite Freelance Engineers</b>. From building plans to AI agents, we know the way in and out.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <a
                href="#contact"
                className="highlight-glow bg-[#E6C07A] hover:bg-yellow-400 text-black px-8 py-4 rounded-full font-bold text-sm tracking-wide transition shadow-lg shadow-yellow-500/20"
              >
                Start Project at ₹5000 →
              </a>
              <a
                href="#work"
                className="bg-white/5 hover:bg-white/10 border border-white/15 px-8 py-4 rounded-full font-bold text-sm text-gray-200 transition"
              >
                See 150+ Plans Built
              </a>
              <button
                onClick={() => setCalculatorModalOpen(true)}
                className="border border-yellow-500/40 text-yellow-300 hover:bg-yellow-500/10 px-6 py-4 rounded-full font-medium text-sm transition flex items-center gap-2"
              >
                <span>📐</span>
                <span>Per-Sq.Ft Calculator</span>
              </button>
              <button
                onClick={() => setBlueprintInspectorOpen(true)}
                className="border border-white/20 text-gray-200 hover:border-yellow-400 hover:text-yellow-300 px-6 py-4 rounded-full font-medium text-sm transition flex items-center gap-2"
              >
                <span>🔍</span>
                <span>Inspect Sample CAD Plan</span>
              </button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg border-t border-white/10 pt-8">
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 hover:border-yellow-500/40 transition group">
                <div className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] text-yellow-400 group-hover:text-yellow-300 transition">150+</div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">Building Plans</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 hover:border-yellow-500/40 transition group">
                <div className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] text-yellow-400 group-hover:text-yellow-300 transition">40+</div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">Software Built</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 hover:border-yellow-500/40 transition group">
                <div className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] text-yellow-400 group-hover:text-yellow-300 transition">100+</div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">Engineers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.1 LIVE ANIMATED INFO TICKER MARQUEE */}
      <div className="w-full overflow-hidden bg-black/75 border-y border-yellow-500/25 py-3.5 relative backdrop-blur-md z-10 shadow-lg shadow-black/60">
        <div className="animate-marquee whitespace-nowrap text-xs font-semibold tracking-wider text-yellow-300/90 flex gap-10 items-center">
          <span className="flex items-center gap-2"><span>🔥</span> 150+ AutoCAD Architectural Plans Built</span>
          <span className="text-yellow-500/40">•</span>
          <span className="flex items-center gap-2"><span>⚡</span> 24–48hr First Milestone Delivery</span>
          <span className="text-yellow-500/40">•</span>
          <span className="flex items-center gap-2"><span>📐</span> 100% Raw Editable .DWG & Revit Ownership</span>
          <span className="text-yellow-500/40">•</span>
          <span className="flex items-center gap-2"><span>🔄</span> 2 Free Plan Revisions Guaranteed</span>
          <span className="text-yellow-500/40">•</span>
          <span className="flex items-center gap-2"><span>🤖</span> 3-Sec AI WhatsApp Lead Qualifier Bot</span>
          <span className="text-yellow-500/40">•</span>
          <span className="flex items-center gap-2"><span>👷</span> 100+ Vetted Civil & Dev Engineers Pool</span>
          <span className="text-yellow-500/40">•</span>
          <span className="flex items-center gap-2"><span>📍</span> Hyderabad • Telangana • Global Remote</span>
          <span className="text-yellow-500/40">•</span>
          <span className="flex items-center gap-2"><span>🔥</span> 150+ AutoCAD Architectural Plans Built</span>
          <span className="text-yellow-500/40">•</span>
          <span className="flex items-center gap-2"><span>⚡</span> 24–48hr First Milestone Delivery</span>
          <span className="text-yellow-500/40">•</span>
          <span className="flex items-center gap-2"><span>📐</span> 100% Raw Editable .DWG & Revit Ownership</span>
          <span className="text-yellow-500/40">•</span>
          <span className="flex items-center gap-2"><span>🔄</span> 2 Free Plan Revisions Guaranteed</span>
          <span className="text-yellow-500/40">•</span>
          <span className="flex items-center gap-2"><span>🤖</span> 3-Sec AI WhatsApp Lead Qualifier Bot</span>
          <span className="text-yellow-500/40">•</span>
          <span className="flex items-center gap-2"><span>👷</span> 100+ Vetted Civil & Dev Engineers Pool</span>
          <span className="text-yellow-500/40">•</span>
          <span className="flex items-center gap-2"><span>📍</span> Hyderabad • Telangana • Global Remote</span>
        </div>
      </div>

      {/* 2.5 INTERACTIVE 3D WEBGL STUDIO & VISUAL MODEL CARDS */}
      <section id="3d-studio" className="px-6 md:px-16 py-20 bg-gradient-to-b from-[#08080a]/80 via-[#0d0d12]/70 to-[#08080a]/80 backdrop-blur-[2px] relative border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 border border-yellow-500/40 bg-yellow-500/10 rounded-full px-3.5 py-1 text-[11px] tracking-[0.25em] text-yellow-400 font-bold uppercase mb-3">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping"></span>
                ● REAL-TIME WEBGL 3D ENGINE
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] text-white">
                Interactive 3D Hologram & BIM Studio
              </h2>
              <p className="text-gray-400 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
                Interact with high-precision architectural models in real-time 3D. Drag to rotate in 360°, inspect BIM structural grids and MEP conduits, explode floor plates, or experience the sacred 3D Sri Yantra Meru geometry.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setBlueprintInspectorOpen(true)}
                className="bg-yellow-500/10 border border-yellow-500/40 hover:bg-yellow-400 hover:text-black text-yellow-300 px-5 py-3 rounded-full text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-yellow-500/10"
              >
                <span>📐</span>
                <span>Open 2D CAD Layer Inspector</span>
              </button>
            </div>
          </div>

          {/* 3D WebGL Three.js Component */}
          <ThreeHologramViewer />

          {/* 3D Visual Preview Model Cards */}
          <div className="mt-20 pt-16 border-t border-white/10">
            <Interactive3DModelCards />
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION: OUR 3 CHAKRAS */}
      <section id="services" className="px-6 md:px-16 py-24 bg-[#0F0F10]/75 backdrop-blur-[2px] relative border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <p className="text-[11px] tracking-[0.4em] text-yellow-500 font-semibold uppercase">OUR 3 CHAKRAS</p>
            <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] mt-3">One Company. Complete Solution.</h2>
            <p className="text-gray-400 mt-3 text-sm md:text-base max-w-2xl mx-auto">
              End-to-end integration for civil architecture, software engineering, and on-demand technical talent.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {CHAKRAS.map((c) => (
              <TiltCard
                key={c.id}
                className={`group relative rounded-[26px] p-8 transition-all duration-300 flex flex-col justify-between ${
                  c.highlight
                    ? 'border-2 border-yellow-500/60 bg-gradient-to-b from-yellow-500/[0.12] via-black/80 to-black/90 shadow-2xl shadow-yellow-500/20'
                    : 'border border-white/10 bg-black/70 hover:border-yellow-500/40 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]'
                }`}
              >
                {/* Animated Glowing Top Border Beam */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-3xl mb-6 shadow-inner group-hover:scale-105 transition-transform">
                    {c.icon}
                  </div>
                  <span className="text-[10px] text-yellow-400 font-bold tracking-[0.25em] uppercase block">{c.number}</span>
                  <h3 className="font-bold text-2xl font-['Space_Grotesk'] mt-1 text-white group-hover:text-yellow-300 transition-colors">{c.title}</h3>
                  <p className="text-yellow-400/90 text-sm mt-0.5 font-medium">{c.subtitle}</p>
                  <p className="text-gray-400 text-sm mt-4 leading-relaxed">{c.desc}</p>

                  <ul className="mt-6 text-sm text-gray-300 space-y-2.5">
                    {c.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-yellow-400 font-bold">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-xs">
                    <div className="text-base font-bold font-['Space_Grotesk'] text-yellow-300">{c.pricing}</div>
                    <div className="text-gray-300 mt-1">{c.badge}</div>
                  </div>
                  <a
                    href="#contact"
                    className="mt-4 block text-center text-xs font-semibold tracking-wider text-yellow-400 hover:text-yellow-300 transition"
                  >
                    Inquire about {c.title} →
                  </a>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="px-6 md:px-16 py-24 bg-[#0a0a0d]/75 backdrop-blur-[2px] relative border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <p className="text-[11px] tracking-[0.4em] text-yellow-500 font-semibold uppercase">3 SIMPLE STEPS</p>
            <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] mt-2">How It Works</h2>
            <p className="text-gray-400 mt-3 text-sm md:text-base max-w-xl mx-auto">
              From raw plot sketches to approved blueprints or production software in 3 streamlined phases.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {HOW_IT_WORKS_STEPS.map((s, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl p-8 bg-black/60 border border-white/10 hover:border-yellow-500/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Animated Glowing Top Border Beam */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-4xl font-black font-['Space_Grotesk'] text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-600 group-hover:scale-110 transition-transform">
                      {s.step}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full border border-yellow-500/30 text-yellow-400 bg-yellow-500/10">
                      {s.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-['Space_Grotesk'] text-white group-hover:text-yellow-300 transition-colors">{s.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed mt-3">{s.desc}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/5 text-[11px] text-yellow-500/80 font-medium">
                  {idx === 0 && '⚡ Zero upfront friction • Instant WhatsApp scoping'}
                  {idx === 1 && '📐 Senior Architect & Dev review • 24hr first cut'}
                  {idx === 2 && '🔒 Full DWG & source code handover • 2 revisions free'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WORK SECTION: BUILDINGS & SOFTWARE WE BUILT */}
      <section id="work" className="px-6 md:px-16 py-24 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <p className="text-[11px] tracking-[0.4em] text-yellow-500 font-semibold uppercase">PORTFOLIO TRACK RECORD</p>
              <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] mt-2">Buildings & Software We Built</h2>
            </div>
            <p className="text-gray-400 text-sm max-w-md mt-4 md:mt-0">
              From sprawling 120-acre gated communities in Shadnagar to high-concurrency real estate software platforms.
            </p>
          </div>

          {/* Animated Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-10 border-b border-white/10 pb-4">
            {['ALL', 'ARCHITECTURE', 'IT + ARCH', 'BIM & STRUCTURAL', 'FREELANCE'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveProjectTab(tab)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-300 ${
                  activeProjectTab === tab
                    ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-500/20 scale-105'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {tab === 'ALL' ? '● ALL PROJECTS (6)' : tab}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PROJECTS.filter((p) => activeProjectTab === 'ALL' || p.tag.includes(activeProjectTab)).map((p, idx) => (
              <TiltCard
                key={idx}
                className={`group relative rounded-2xl border border-white/10 bg-gradient-to-br ${p.bgGrad} p-6 flex flex-col justify-between hover:border-yellow-500/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all duration-300 min-h-[260px]`}
              >
                {/* Animated Glowing Top Border Beam */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest border ${p.tagColor} mb-4`}>
                    {p.tag}
                  </span>
                  <h4 className="font-bold text-xl font-['Space_Grotesk'] text-white group-hover:text-yellow-300 transition-colors">{p.title}</h4>
                  <p className="text-xs text-yellow-400/90 font-medium mt-1">{p.specs}</p>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mt-4">{p.desc}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRICING SECTION: SIMPLE PRICING & PER-SQ.FT CALCULATOR */}
      <section id="pricing" className="px-6 md:px-16 py-24 bg-[#0F0F10]/75 backdrop-blur-[2px] relative border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <p className="text-[11px] tracking-[0.4em] text-yellow-500 font-semibold uppercase">TRANSPARENT VALUE</p>
            <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] mt-3">Simple Pricing. No Chakravyuha.</h2>
            <p className="text-gray-400 mt-3 text-sm md:text-base max-w-xl mx-auto">
              Straightforward pricing without hidden retainers or confusing agency tiers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {PRICING_PLANS.map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-3xl p-8 flex flex-col justify-between transition ${
                  plan.highlight
                    ? 'bg-gradient-to-b from-yellow-500 to-amber-600 text-black shadow-2xl shadow-yellow-500/20'
                    : 'bg-black/60 border border-white/10 text-white hover:border-yellow-500/30'
                }`}
              >
                <div>
                  {plan.badge && (
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-black/20 text-black mb-3">
                      {plan.badge}
                    </span>
                  )}
                  <h4 className={`font-bold text-2xl font-['Space_Grotesk'] ${plan.highlight ? 'text-black' : 'text-white'}`}>
                    {plan.name}
                  </h4>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold font-['Space_Grotesk']">{plan.price}</span>
                    <span className={`text-sm ${plan.highlight ? 'text-black/75' : 'text-gray-400'}`}>{plan.unit}</span>
                  </div>
                  <p className={`text-xs mt-3 ${plan.highlight ? 'text-black/80' : 'text-gray-400'} leading-relaxed`}>
                    {plan.desc}
                  </p>

                  <ul className="mt-6 text-xs space-y-2.5">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className={`font-bold ${plan.highlight ? 'text-black' : 'text-yellow-400'}`}>✓</span>
                        <span className={plan.highlight ? 'text-black font-medium' : 'text-gray-300'}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#contact"
                  className={`mt-8 w-full block text-center py-3.5 rounded-full font-bold text-xs tracking-wider transition ${
                    plan.highlight
                      ? 'bg-black text-white hover:bg-neutral-900 shadow-md'
                      : 'border border-white/20 hover:border-yellow-500 text-white hover:bg-yellow-500 hover:text-black'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>

          {/* EMBEDDED INTERACTIVE PER-SQ.FT CALCULATOR */}
          <div className="mt-16 p-8 md:p-10 rounded-3xl bg-black/80 border border-yellow-500/30 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div>
                <span className="text-[10px] tracking-[0.3em] text-yellow-400 font-bold uppercase">INSTANT COST ESTIMATOR</span>
                <h3 className="text-2xl md:text-3xl font-bold font-['Space_Grotesk'] text-white mt-1">
                  Architecture CAD Per-Sq.Ft Calculator
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Adjust plot area and deliverables to calculate instant estimated project fee.
                </p>
              </div>

              <div className="text-right bg-yellow-500/10 border border-yellow-500/30 rounded-2xl px-6 py-4">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest block">ESTIMATED TOTAL</span>
                <span className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] text-yellow-300">
                  ₹{totalWithCRM.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-yellow-500/80 block mt-0.5">
                  ({effectiveRate}/sq.ft {includeCRM ? '+ ₹15,000 CRM' : ''})
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              {/* Slider Controls */}
              <div>
                <div className="flex justify-between items-center text-sm font-semibold mb-3">
                  <span className="text-gray-300">Total Built-Up Area:</span>
                  <span className="text-yellow-400 font-bold font-['Space_Grotesk'] text-lg">{sqft.toLocaleString('en-IN')} sq.ft</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="25000"
                  step="250"
                  value={sqft}
                  onChange={(e) => setSqft(Number(e.target.value))}
                  className="w-full accent-yellow-400 cursor-pointer h-2 bg-neutral-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-gray-500 mt-1.5 font-mono">
                  <span>500 sq.ft (Villa)</span>
                  <span>10,000 sq.ft</span>
                  <span>25,000 sq.ft (Commercial)</span>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-white/5 text-xs text-gray-400 space-y-1">
                  <p>• <b>Includes:</b> 2D Architectural Floor Plans, Room Dimensions, Vastu Layout, DWG CAD Files.</p>
                  <p>• <b>Delivery SLA:</b> 24-48 Hours for standard footprints under 5,000 sq.ft.</p>
                </div>
              </div>

              {/* Add-ons Checkboxes */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-2">Scope Add-ons:</span>
                
                <label className="flex items-center justify-between p-3 rounded-xl bg-black border border-white/10 hover:border-yellow-500/40 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={include3D}
                      onChange={(e) => setInclude3D(e.target.checked)}
                      className="accent-yellow-400 w-4 h-4 rounded"
                    />
                    <div>
                      <div className="text-xs font-semibold text-white">3D Elevation Renderings</div>
                      <div className="text-[10px] text-gray-400">Photorealistic day & night facade renders</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-yellow-400">+₹8/sq.ft</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-black border border-white/10 hover:border-yellow-500/40 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={includeBIM}
                      onChange={(e) => setIncludeBIM(e.target.checked)}
                      className="accent-yellow-400 w-4 h-4 rounded"
                    />
                    <div>
                      <div className="text-xs font-semibold text-white">Revit BIM & Structural Clash Detection</div>
                      <div className="text-[10px] text-gray-400">3D BIM model with structural column grids & MEP</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-yellow-400">+₹12/sq.ft</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-black border border-white/10 hover:border-yellow-500/40 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={includeGHMC}
                      onChange={(e) => setIncludeGHMC(e.target.checked)}
                      className="accent-yellow-400 w-4 h-4 rounded"
                    />
                    <div>
                      <div className="text-xs font-semibold text-white">GHMC / TS-bPASS Municipal Sanction File</div>
                      <div className="text-[10px] text-gray-400">Complete municipal submission documentation</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-yellow-400">+₹10/sq.ft</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-black border border-white/10 hover:border-yellow-500/40 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={includeCRM}
                      onChange={(e) => setIncludeCRM(e.target.checked)}
                      className="accent-yellow-400 w-4 h-4 rounded"
                    />
                    <div>
                      <div className="text-xs font-semibold text-white">Real Estate AI Lead WhatsApp Bot</div>
                      <div className="text-[10px] text-gray-400">Automated buyer brochure dispatch & lead CRM</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-yellow-400">+₹15,000 flat</span>
                </label>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap justify-between items-center gap-4">
              <span className="text-xs text-gray-400">
                Ready to book your architectural blueprints at this guaranteed rate?
              </span>
              <a
                href="#contact"
                onClick={() => {
                  setFormService('Architecture CAD/BIM');
                  setFormMessage(`Calculated Estimate: ${sqft} sq.ft with 3D:${include3D ? 'Yes' : 'No'}, BIM:${includeBIM ? 'Yes' : 'No'}, GHMC:${includeGHMC ? 'Yes' : 'No'}, CRM:${includeCRM ? 'Yes' : 'No'} (Total est: ₹${totalWithCRM.toLocaleString('en-IN')})`);
                }}
                className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-full text-xs font-bold tracking-wider transition shadow"
              >
                Lock Quote & Book Consultation →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ & GUARANTEES SECTION */}
      <section id="faq" className="px-6 md:px-16 py-24 bg-[#0a0a0d]/75 backdrop-blur-[2px] relative border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.4em] text-yellow-500 font-semibold uppercase">COMMON INQUIRIES</p>
            <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] mt-2">Frequently Asked Questions</h2>
            <p className="text-gray-400 mt-3 text-sm max-w-lg mx-auto">
              Everything you need to know about our AutoCAD architecture deliverables, IT projects, and dedicated engineers.
            </p>
          </div>

          {/* Guarantees Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 hover:border-yellow-500/50 hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] hover:-translate-y-1 transition-all duration-300 text-center group">
              <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">⚡</span>
              <div className="text-xs font-bold text-white group-hover:text-yellow-300 transition-colors">24-48hr Turnaround</div>
              <div className="text-[10px] text-gray-400 mt-0.5">Rapid 2D/3D delivery</div>
            </div>
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 hover:border-yellow-500/50 hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] hover:-translate-y-1 transition-all duration-300 text-center group">
              <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">📐</span>
              <div className="text-xs font-bold text-white group-hover:text-yellow-300 transition-colors">Municipal Sanction Ready</div>
              <div className="text-[10px] text-gray-400 mt-0.5">100% Bylaws Compliant</div>
            </div>
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 hover:border-yellow-500/50 hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] hover:-translate-y-1 transition-all duration-300 text-center group">
              <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">🔄</span>
              <div className="text-xs font-bold text-white group-hover:text-yellow-300 transition-colors">2 Free Revisions</div>
              <div className="text-[10px] text-gray-400 mt-0.5">Guaranteed satisfaction</div>
            </div>
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 hover:border-yellow-500/50 hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] hover:-translate-y-1 transition-all duration-300 text-center group">
              <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">🤝</span>
              <div className="text-xs font-bold text-white group-hover:text-yellow-300 transition-colors">48hr Replacement</div>
              <div className="text-[10px] text-gray-400 mt-0.5">Vetted engineer pledge</div>
            </div>
          </div>

          {/* Accordion */}
          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition duration-200 overflow-hidden ${
                    isOpen ? 'border-yellow-500/50 bg-yellow-500/[0.04]' : 'border-white/10 bg-black/60 hover:border-white/20'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full text-left p-6 flex justify-between items-center gap-4"
                  >
                    <span className="text-sm md:text-base font-bold text-white font-['Space_Grotesk']">{faq.q}</span>
                    <span className={`text-yellow-400 text-xl font-bold transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-xs md:text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. CONTACT SECTION */}
      <section id="contact" className="px-6 md:px-16 py-24">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
          {/* Left Column: Office & WhatsApp */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 border border-green-500/40 bg-green-500/10 rounded-full px-3.5 py-1 text-[11px] text-green-400 font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span>DIRECTORS ONLINE • 2-HOUR CALLBACK PLEDGE</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mt-2">
              Let's Build Your<br />
              <span className="shimmer-text">
                Next Project.
              </span>
            </h2>
            <p className="mt-4 text-gray-400 text-sm">
              Hyderabad Headquarters • Pan India • UAE Remote Engineering Hub
            </p>

            <div className="mt-8 space-y-4 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 text-lg">📍</span>
                <div>
                  <div className="font-semibold text-white">Headquarters</div>
                  <div className="text-gray-400 text-xs mt-0.5">Plot 45, Kukatpally, Hyderabad, Telangana 500072</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-yellow-400 text-lg">📞</span>
                <div>
                  <div className="font-semibold text-white">Direct Phone</div>
                  <div className="text-gray-400 text-xs mt-0.5">+91 99890 28452 / +91 94901 82341</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-yellow-400 text-lg">✉️</span>
                <div>
                  <div className="font-semibold text-white">Corporate Email</div>
                  <div className="text-gray-400 text-xs mt-0.5">hello@abhimanyutech.in / inquiry@abhimanyutech.in</div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <a
                href="https://wa.me/919989028452?text=Hi%20Abhimanyu%20Technologies%2C%20I%20need%20a%20quote%20for%20an%20Architecture%20%2F%20IT%20project."
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-500 hover:bg-emerald-400 text-black px-8 py-3.5 rounded-full font-bold text-xs tracking-wider transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <span>💬</span>
                <span>WhatsApp Us Direct →</span>
              </a>
            </div>
          </div>

          {/* Right Column: Instant Form */}
          <form
            onSubmit={handleFormSubmit}
            className="flex-1 bg-black/70 border border-yellow-500/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl space-y-4"
          >
            <div>
              <h3 className="text-xl font-bold font-['Space_Grotesk'] text-white">Get Guaranteed Quote in 2 Hours</h3>
              <p className="text-xs text-gray-400 mt-1">Our senior engineer will review your project parameters immediately.</p>
            </div>

            {submitResult && (
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/70 via-black to-black border border-emerald-500/50 text-xs space-y-3 shadow-2xl">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    INQUIRY REGISTERED
                  </span>
                  <span className="font-mono text-yellow-400 font-bold bg-yellow-500/10 px-2.5 py-0.5 rounded border border-yellow-500/30">
                    #{submitResult.ticketId}
                  </span>
                </div>
                <p className="text-gray-200 text-xs leading-relaxed">{submitResult.msg}</p>
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <a
                    href={submitResult.whatsAppUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-green-500 hover:bg-green-400 text-black px-4 py-3 rounded-xl font-bold text-center transition flex items-center justify-center gap-2 shadow-lg shadow-green-500/25"
                  >
                    <span>💬</span>
                    <span>Chat on WhatsApp Now →</span>
                  </a>
                  <a
                    href="tel:+919989028452"
                    className="border border-white/20 hover:border-yellow-400 text-gray-200 hover:text-white px-4 py-3 rounded-xl text-center transition text-xs font-semibold flex items-center justify-center gap-1"
                  >
                    <span>📞</span>
                    <span>Call Director</span>
                  </a>
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-gray-400 block mb-1">Your Full Name</label>
              <input
                type="text"
                required
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g. K. Srinivas Rao"
                className="w-full bg-[#12141A] border border-white/10 focus:border-yellow-400 p-3.5 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-400 block mb-1">Phone / WhatsApp Number</label>
              <input
                type="tel"
                required
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                placeholder="e.g. +91 98765 43210"
                className="w-full bg-[#12141A] border border-white/10 focus:border-yellow-400 p-3.5 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-400 block mb-1">Service Division Needed</label>
              <select
                value={formService}
                onChange={(e) => setFormService(e.target.value)}
                className="w-full bg-[#12141A] border border-white/10 focus:border-yellow-400 p-3.5 rounded-xl text-sm text-gray-200 outline-none transition cursor-pointer"
              >
                <option value="Architecture CAD/BIM">01. Architecture CAD/BIM (Floor Plans, 3D, Approvals)</option>
                <option value="IT Software / AI">02. IT Division (Real Estate CRM, AI Agents, Website, App)</option>
                <option value="Hire Freelancer">03. Freelance Hub (Dedicated Monthly CAD/BIM Engineer)</option>
                <option value="Combo - Building + Software">04. Full Combo (Architecture Drawings + Software + CRM)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-400 block mb-1">Project Details or Plot Sq.Ft</label>
              <textarea
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                placeholder="Briefly describe your villa, apartment, venture layout or software requirement..."
                rows="3"
                className="w-full bg-[#12141A] border border-white/10 focus:border-yellow-400 p-3.5 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-4 rounded-full font-bold text-xs tracking-wider transition shadow-lg shadow-yellow-500/20 disabled:opacity-50"
            >
              {submitting ? 'Transmitting Request...' : 'Send & Get Quote in 2 Hours →'}
            </button>

            <div className="flex items-center justify-between text-[10px] text-gray-500 pt-2 border-t border-white/5">
              <span>🔒 100% Confidential • Non-Disclosure Protected</span>
              <span>⚡ SLA 2-Hour Response</span>
            </div>
          </form>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="border-t border-white/10 px-6 md:px-16 py-8 bg-black/70 backdrop-blur-sm relative flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-2.5">
          <span className="font-bold text-yellow-500 font-['Space_Grotesk'] text-sm tracking-wider">AT</span>
          <span>© 2026 ABHIMANYU TECHNOLOGIES PVT LTD. All Rights Reserved.</span>
        </div>

        {/* Live Load Balancer & Cluster Indicator */}
        <button
          onClick={() => {
            setClusterModalOpen(true);
            fetchClusterStatus();
          }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono hover:bg-emerald-500/20 hover:border-emerald-500/50 transition cursor-pointer shadow-sm shadow-emerald-500/10"
          title="Inspect Layer 7 Load Balancer & Backend Cluster Architecture"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold">L7 Load Balancer</span>
          <span className="text-gray-400">• 3 Nodes Active</span>
        </button>

        <div className="tracking-widest text-[10px] text-yellow-500/80 uppercase">
          BREAK THE CHAKRAVYUHA • BUILD SMARTER
        </div>
      </footer>

      {/* --- MODAL: CLUSTER & LOAD BALANCER TELEMETRY --- */}
      {clusterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="relative w-full max-w-2xl bg-neutral-900 border border-emerald-500/40 rounded-3xl p-6 md:p-8 shadow-2xl animate-fadeIn">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-lg">
                  ⚡
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.25em] text-emerald-400 font-bold uppercase">HIGH AVAILABILITY INFRASTRUCTURE</span>
                  <h3 className="text-xl font-bold font-['Space_Grotesk'] text-white">L7 Load Balancer & Backend Cluster</h3>
                </div>
              </div>
              <button
                onClick={() => setClusterModalOpen(false)}
                className="text-gray-400 hover:text-white p-2 text-xl"
              >
                ✕
              </button>
            </div>

            {clusterLoading ? (
              <div className="py-12 text-center text-gray-400">
                <div className="animate-spin text-2xl mb-2">⚡</div>
                <span>Polling cluster telemetry & load balancer state...</span>
              </div>
            ) : (
              <div className="my-6 space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10">
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider">Status</div>
                    <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 mt-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      {clusterData?.status || 'ONLINE'}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10">
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider">Algorithm</div>
                    <div className="text-sm font-bold text-yellow-400 mt-1 truncate">
                      {clusterData?.algorithm || 'ROUND-ROBIN'}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10">
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider">Healthy Nodes</div>
                    <div className="text-sm font-bold text-white mt-1">
                      {clusterData?.stats?.healthyNodesCount || 3} / {clusterData?.stats?.totalNodesCount || 3}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10">
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider">Requests Routed</div>
                    <div className="text-sm font-bold text-amber-300 mt-1 font-mono">
                      {clusterData?.stats?.totalRequestsForwarded || 14820}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Upstream Worker Topology</span>
                    <span className="text-[10px] text-emerald-400/80">Health Check Interval: 8s</span>
                  </div>
                  <div className="space-y-2">
                    {(clusterData?.upstreams || [
                      { id: 'worker-1', host: '127.0.0.1:5001', healthy: true, activeConnections: 1, lastLatencyMs: 1.4 },
                      { id: 'worker-2', host: '127.0.0.1:5002', healthy: true, activeConnections: 0, lastLatencyMs: 1.6 },
                      { id: 'worker-3', host: '127.0.0.1:5003', healthy: true, activeConnections: 2, lastLatencyMs: 1.2 }
                    ]).map((node) => (
                      <div key={node.id} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 hover:border-emerald-500/30 transition text-xs font-mono">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-2 h-2 rounded-full ${node.healthy ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
                          <span className="font-bold text-white">{node.id}</span>
                          <span className="text-gray-500 text-[11px]">({node.host})</span>
                        </div>
                        <div className="flex items-center gap-4 text-gray-400 text-[11px]">
                          <span>Active Conns: <b className="text-white">{node.activeConnections || node.activeConns || 0}</b></span>
                          <span className="text-emerald-400">{node.lastLatencyMs || node.latencyMs || 1.4}ms</span>
                          <span className="px-2 py-0.5 rounded-full text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">PASS</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-[11px] text-gray-300 flex items-center justify-between">
                  <span>⚡ Failover: Automatic retry with Circuit Breaker (max 2 retries)</span>
                  <a
                    href="/lb-status"
                    target="_blank"
                    rel="noreferrer"
                    className="text-yellow-400 font-bold hover:underline"
                  >
                    Open Live LB Console ↗
                  </a>
                </div>
              </div>
            )}

            <div className="flex justify-end pt-2 border-t border-white/10">
              <button
                onClick={() => setClusterModalOpen(false)}
                className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl text-xs font-medium transition"
              >
                Close Console
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: POPUP CALCULATOR --- */}
      {calculatorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="relative w-full max-w-xl bg-neutral-900 border border-yellow-500/40 rounded-3xl p-6 md:p-8 shadow-2xl">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] tracking-[0.25em] text-yellow-400 font-bold uppercase">ESTIMATOR WIZARD</span>
                <h3 className="text-xl font-bold font-['Space_Grotesk'] text-white">Per-Sq.Ft CAD Calculator</h3>
              </div>
              <button
                onClick={() => setCalculatorModalOpen(false)}
                className="text-gray-400 hover:text-white p-2 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="my-6">
              <div className="flex justify-between text-sm font-semibold mb-2">
                <span>Plot Area:</span>
                <span className="text-yellow-400 font-bold">{sqft.toLocaleString('en-IN')} sq.ft</span>
              </div>
              <input
                type="range"
                min="500"
                max="25000"
                step="250"
                value={sqft}
                onChange={(e) => setSqft(Number(e.target.value))}
                className="w-full accent-yellow-400 cursor-pointer h-2 bg-neutral-800 rounded-lg"
              />

              <div className="mt-6 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex justify-between items-center">
                <span className="text-xs text-gray-300">Total Estimated Cost:</span>
                <span className="text-2xl font-bold font-['Space_Grotesk'] text-yellow-300">
                  ₹{totalWithCRM.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href="#contact"
                onClick={() => {
                  setCalculatorModalOpen(false);
                  setFormMessage(`Calculated Estimate: ${sqft} sq.ft (Total est: ₹${totalWithCRM.toLocaleString('en-IN')})`);
                }}
                className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black py-3 rounded-xl font-bold text-xs text-center tracking-wider transition"
              >
                Apply to Contact Form →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: CAD BLUEPRINT & LAYER INSPECTOR --- */}
      <CadBlueprintInspector
        isOpen={blueprintInspectorOpen}
        onClose={() => setBlueprintInspectorOpen(false)}
      />

      {/* --- 3D FLOATING CONTACT & SPEED DIAL ORB --- */}
      <FloatingContactOrb
        onOpenInspector={() => setBlueprintInspectorOpen(true)}
        onOpenCalculator={() => setCalculatorModalOpen(true)}
      />
    </div>
  );
}
