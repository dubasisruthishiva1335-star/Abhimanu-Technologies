import React, { useState, useEffect, useRef } from 'react';

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

const PITCH_DECK_SLIDES = [
  {
    num: 1,
    title: 'ABHIMANYU TECHNOLOGIES',
    subtitle: 'Hyderabad • Private Presentation',
    headline: 'Breaking The Chakravyuha Of Design & Code',
    badge: 'CONFIDENTIAL EXECUTIVE BRIEFING',
    content: 'We unify Architecture CAD BIM, IT AI Software, and Elite Freelance Engineers under one coordinated roof. Just as Abhimanyu understood the strategic entry of the Chakravyuha, we guide real estate builders and enterprises through the maze of modern engineering.'
  },
  {
    num: 2,
    title: 'THE CHAKRAVYUHA PROBLEM',
    subtitle: 'The Fragmented Real Estate Dilemma',
    headline: 'Builders Are Trapped Between 4 Disconnected Vendors',
    badge: 'INDUSTRY BOTTLENECK',
    content: '1. Architects take weeks for drawing modifications\n2. IT agencies don\'t understand square footage or civil approvals\n3. Freelancers disappear mid-project without documentation\n4. Real estate marketing leads are lost without automated WhatsApp qualification\n\nResult: 3-5 month project delays and massive cost overruns.'
  },
  {
    num: 3,
    title: 'THE ABHIMANYU SOLUTION',
    subtitle: 'The 3-Chakra Operating Model',
    headline: 'One Single Partner From Soil To Software',
    badge: 'OUR VALUE PROPOSITION',
    content: '• Chakra 01 (Architecture): 2D Plans, 3D Elevations, Revit BIM, GHMC Approvals from ₹15/sq.ft\n• Chakra 02 (IT & AI): Real Estate CRM, WhatsApp Bots, Builder Web & Mobile Platforms\n• Chakra 03 (Freelance Hub): 100+ Vetted Engineers on-demand for ₹25k/month with 48hr replacement.'
  },
  {
    num: 4,
    title: 'CHAKRA 01: ARCHITECTURE DIVISION',
    subtitle: 'AutoCAD, BIM & Approvals',
    headline: 'High-Precision Civil & Structural Engineering',
    badge: 'CORE COMPETENCY',
    content: '• Turnaround: 24 to 48 hours for standard municipal packages\n• Tools: AutoCAD, Revit, Civil 3D, SketchUp, Lumion, 3ds Max\n• Deliverables: G+5 to G+25 structural drawings, MEP clash detection, BOQ estimations, and TS-bPASS sanction dossiers\n• Track Record: Over 150+ successful residential & venture plans completed.'
  },
  {
    num: 5,
    title: 'CHAKRA 02: IT & AI SOFTWARE DIVISION',
    subtitle: 'Digital Transformation for Builders',
    headline: 'AI Agents & Custom Software Built for Real Estate',
    badge: 'TECHNOLOGY ACCELERATOR',
    content: '• Real Estate CRM: Live lead routing from Meta & Google directly to field sales\n• WhatsApp AI Qualifier: Answers unit pricing, amenities, and downloads brochures in 3 seconds\n• Cloud Infrastructure: Ultra-fast Next.js portals with sub-second page loads globally\n• Revenue Model: From ₹50,000 project fees + ₹10,000/mo recurring SaaS maintenance.'
  },
  {
    num: 6,
    title: 'CHAKRA 03: FREELANCE HUB',
    subtitle: 'Elastic Engineering Workforce',
    headline: '100+ On-Demand Civil & Software Engineers',
    badge: 'HUMAN CAPITAL PLATFORM',
    content: '• 60+ Certified AutoCAD Draftsmen & BIM Modelers\n• 40+ Full-Stack Software Engineers (React, Node, Python, Mobile)\n• Transparent Pricing: ₹25,000/month dedicated talent or pay-per-drawing at ₹5,000\n• 20% Platform Fee with 100% quality escrow and 48-hour replacement guarantee.'
  },
  {
    num: 7,
    title: 'TRACTION & HYDERABAD MARKET',
    subtitle: 'Operational Milestones',
    headline: 'Rapid Momentum Across Telangana & Andhra Pradesh',
    badge: 'KEY METRICS',
    content: '• 150+ Residential & Commercial Building Plans delivered\n• 40+ Custom Software Platforms & AI agents deployed\n• 100+ Engineers vetted and active in our on-demand network\n• Headquarters: Plot 45, Kukatpally, Hyderabad — strategic hub near Hitec City & ORR real estate corridors.'
  },
  {
    num: 8,
    title: 'PARTNER WITH US TODAY',
    subtitle: 'Get Started in Under 24 Hours',
    headline: 'Break The Chakravyuha of Design & Technology',
    badge: 'NEXT STEPS',
    content: '• Website: https://abhimanu-technologies.vercel.app/\n• Email: hello@abhimanyutech.in\n• Office: Plot 45, Kukatpally, Hyderabad, Telangana 500072\n• Phone / WhatsApp: +91 99890 28452\n\nLet\'s build your next building plan or software product.'
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
  const [visitingCardModalOpen, setVisitingCardModalOpen] = useState(false);
  const [pitchDeckModalOpen, setPitchDeckModalOpen] = useState(false);
  const [calculatorModalOpen, setCalculatorModalOpen] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

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

  // Visiting card 3D flip state
  const [cardFlipped, setCardFlipped] = useState(false);

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
      if (res.ok) {
        setSubmitResult({
          success: true,
          ticketId,
          msg: `Quote request received! Reference #${ticketId}. Our engineering director will call or WhatsApp you within 2 hours.`
        });
        setFormName('');
        setFormPhone('');
        setFormMessage('');
      } else {
        // Fallback success if API route is in static preview mode
        setSubmitResult({
          success: true,
          ticketId,
          msg: `Request noted! Reference #${ticketId}. We will connect via WhatsApp at ${formPhone} within 2 hours.`
        });
      }
    } catch {
      setSubmitResult({
        success: true,
        ticketId,
        msg: `Request noted! Reference #${ticketId}. We will connect via WhatsApp at ${formPhone} within 2 hours.`
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Keyboard navigation for Pitch Deck
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!pitchDeckModalOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        setCurrentSlideIndex((prev) => (prev < PITCH_DECK_SLIDES.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Escape') {
        setPitchDeckModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pitchDeckModalOpen]);

  return (
    <div className="bg-[#08080a] text-white min-h-screen font-['Inter',sans-serif] selection:bg-yellow-500 selection:text-black">
      
      {/* 1. STICKY LUXURY NAVBAR */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-16 py-4 bg-black/85 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-3">
          <a href="#home" className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F5E6C8] via-[#D4AF37] to-[#8C6A1F] flex items-center justify-center font-bold text-black text-xl shadow-lg shadow-yellow-500/20">
            A
          </a>
          <div className="leading-tight">
            <span className="text-lg md:text-xl font-bold tracking-wide font-['Space_Grotesk'] text-white">ABHIMANYU</span>
            <span className="text-yellow-400 font-bold tracking-wider text-xs md:text-sm block">TECHNOLOGIES</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-widest text-gray-300">
          <a href="#home" className="hover:text-yellow-400 transition">HOME</a>
          <a href="#services" className="hover:text-yellow-400 transition">SERVICES</a>
          <a href="#work" className="hover:text-yellow-400 transition">WORK</a>
          <a href="#pricing" className="hover:text-yellow-400 transition">PRICING</a>
          <a href="#contact" className="hover:text-yellow-400 transition">CONTACT</a>
          
          <button
            onClick={() => setVisitingCardModalOpen(true)}
            className="px-3 py-1.5 rounded-lg border border-yellow-500/30 text-yellow-300 hover:bg-yellow-500/10 transition flex items-center gap-1.5"
          >
            <span>📇</span>
            <span>VISITING CARD</span>
          </button>

          <button
            onClick={() => setPitchDeckModalOpen(true)}
            className="px-3 py-1.5 rounded-lg border border-amber-500/30 text-amber-300 hover:bg-amber-500/10 transition flex items-center gap-1.5"
          >
            <span>📊</span>
            <span>PITCH DECK</span>
          </button>
        </div>

        {/* CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
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
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-24 px-6 lg:hidden flex flex-col gap-6">
          <a href="#home" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold text-gray-200">HOME</a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold text-gray-200">SERVICES (3 CHAKRAS)</a>
          <a href="#work" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold text-gray-200">WORK PORTFOLIO</a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold text-gray-200">PRICING & CALCULATOR</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold text-yellow-400">CONTACT & GET QUOTE</a>
          
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => { setVisitingCardModalOpen(true); setMobileMenuOpen(false); }}
              className="w-full text-left py-3 px-4 rounded-xl border border-yellow-500/30 text-yellow-300 bg-yellow-500/10 font-medium"
            >
              📇 Open Corporate Visiting Card
            </button>
            <button
              onClick={() => { setPitchDeckModalOpen(true); setMobileMenuOpen(false); }}
              className="w-full text-left py-3 px-4 rounded-xl border border-amber-500/30 text-amber-300 bg-amber-500/10 font-medium"
            >
              📊 View 8-Slide Pitch Deck
            </button>
          </div>
        </div>
      )}

      {/* 2. HERO SECTION */}
      <section id="home" className="relative min-h-screen flex items-center px-6 md:px-16 pt-32 pb-20 overflow-hidden">
        {/* Subtle Video Background Loop */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 right-0 w-full lg:w-[60%] h-full object-cover opacity-[0.14] pointer-events-none"
        >
          <source src="sri-yantra-loop.mp4" type="video/mp4" />
          <source src="generated_video_059bfe58.mp4" type="video/mp4" />
        </video>

        {/* Dynamic Canvas Sri Yantra Sacred Geometry */}
        <SriYantraCanvas />

        {/* Gradient Overlay for Pristine Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080a] via-[#08080a]/90 to-transparent pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 border border-yellow-600/40 bg-yellow-500/10 rounded-full px-4 py-1.5 text-[11px] tracking-[0.25em] text-yellow-400 mb-6 font-semibold">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
            ● CHAKRAVYUHA BREAKER • HYDERABAD • SINCE 2024
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-[76px] font-bold leading-[1.0] font-['Space_Grotesk'] tracking-tight">
            We Break The<br />
            Chakravyuha Of<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5E6C8] via-[#E6C07A] to-[#D4AF37]">
              Design & Code.
            </span>
          </h1>

          <p className="mt-6 text-gray-300 text-base md:text-xl max-w-2xl leading-relaxed">
            Abhimanyu Technologies is Hyderabad's first hybrid: <b className="text-white font-semibold">AutoCAD Architecture + BIM + AI Software + Elite Freelance Engineers</b>. From building plans to AI agents, we know the way in and out.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <a
              href="#contact"
              className="bg-[#E6C07A] hover:bg-yellow-400 text-black px-8 py-4 rounded-full font-bold text-sm tracking-wide transition shadow-lg shadow-yellow-500/20"
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
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg border-t border-white/10 pt-8">
            <div>
              <div className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] text-yellow-400">150+</div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Building Plans</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] text-yellow-400">40+</div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Software Built</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] text-yellow-400">100+</div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Engineers</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION: OUR 3 CHAKRAS */}
      <section id="services" className="px-6 md:px-16 py-24 bg-[#0F0F10] border-t border-white/5">
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
              <div
                key={c.id}
                className={`rounded-[24px] p-8 transition duration-300 flex flex-col justify-between ${
                  c.highlight
                    ? 'border border-yellow-500/50 bg-gradient-to-b from-yellow-500/[0.08] to-black/60 shadow-xl shadow-yellow-500/10'
                    : 'border border-white/10 bg-black/60 hover:border-yellow-500/30'
                }`}
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-3xl mb-6">
                    {c.icon}
                  </div>
                  <span className="text-[10px] text-yellow-400 font-bold tracking-[0.25em] uppercase block">{c.number}</span>
                  <h3 className="font-bold text-2xl font-['Space_Grotesk'] mt-1 text-white">{c.title}</h3>
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WORK SECTION: BUILDINGS & SOFTWARE WE BUILT */}
      <section id="work" className="px-6 md:px-16 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-[11px] tracking-[0.4em] text-yellow-500 font-semibold uppercase">PORTFOLIO TRACK RECORD</p>
              <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] mt-2">Buildings & Software We Built</h2>
            </div>
            <p className="text-gray-400 text-sm max-w-md mt-4 md:mt-0">
              From sprawling 120-acre gated communities in Shadnagar to high-concurrency real estate software platforms.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PROJECTS.map((p, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border border-white/10 bg-gradient-to-br ${p.bgGrad} p-6 flex flex-col justify-between hover:border-yellow-500/40 transition duration-300 min-h-[260px]`}
              >
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest border ${p.tagColor} mb-4`}>
                    {p.tag}
                  </span>
                  <h4 className="font-bold text-xl font-['Space_Grotesk'] text-white">{p.title}</h4>
                  <p className="text-xs text-yellow-400/90 font-medium mt-1">{p.specs}</p>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mt-4">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRICING SECTION: SIMPLE PRICING & PER-SQ.FT CALCULATOR */}
      <section id="pricing" className="px-6 md:px-16 py-24 bg-[#0F0F10] border-t border-white/5">
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

      {/* 6. CONTACT SECTION */}
      <section id="contact" className="px-6 md:px-16 py-24">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
          {/* Left Column: Office & WhatsApp */}
          <div className="flex-1">
            <span className="text-[10px] tracking-[0.3em] text-yellow-500 font-bold uppercase">CONNECT DIRECTLY</span>
            <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mt-2">
              Let's Build Your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5E6C8] via-[#E6C07A] to-[#D4AF37]">
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

              <button
                onClick={() => setVisitingCardModalOpen(true)}
                className="border border-white/20 hover:border-yellow-500 text-gray-300 hover:text-white px-6 py-3.5 rounded-full text-xs font-semibold transition"
              >
                📇 Download Visiting Card
              </button>
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
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-xs">
                <b>✓ {submitResult.msg}</b>
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
      <footer className="border-t border-white/10 px-6 md:px-16 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-[#F5E6C8] to-[#8C6A1F] flex items-center justify-center font-bold text-black text-[10px]">
            A
          </div>
          <span>© 2026 ABHIMANYU TECHNOLOGIES PVT LTD. All Rights Reserved.</span>
        </div>
        <div className="tracking-widest text-[10px] text-yellow-500/80 uppercase">
          BREAK THE CHAKRAVYUHA • BUILD SMARTER
        </div>
      </footer>

      {/* --- MODAL 1: CORPORATE VISITING CARD --- */}
      {visitingCardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="relative w-full max-w-xl bg-neutral-900 border border-yellow-500/40 rounded-3xl p-6 md:p-8 shadow-2xl">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] tracking-[0.25em] text-yellow-400 font-bold uppercase">OFFICIAL ASSET</span>
                <h3 className="text-xl font-bold font-['Space_Grotesk'] text-white">Corporate Visiting Card</h3>
              </div>
              <button
                onClick={() => setVisitingCardModalOpen(false)}
                className="text-gray-400 hover:text-white p-2 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Realistic Visiting Card Preview (Card Flip) */}
            <div className="my-6 flex flex-col items-center">
              <div
                onClick={() => setCardFlipped(!cardFlipped)}
                className="w-full max-w-md aspect-[1.75/1] rounded-2xl p-6 cursor-pointer transition-transform duration-500 shadow-2xl relative overflow-hidden flex flex-col justify-between"
                style={{
                  background: cardFlipped
                    ? 'linear-gradient(135deg, #1c1a16 0%, #0a0a0a 100%)'
                    : 'linear-gradient(135deg, #0d0f14 0%, #050608 100%)',
                  border: '1px solid rgba(212, 175, 55, 0.4)'
                }}
              >
                {!cardFlipped ? (
                  <>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F5E6C8] via-[#D4AF37] to-[#8C6A1F] flex items-center justify-center font-bold text-black text-xl shadow">
                          A
                        </div>
                        <div>
                          <div className="text-base font-bold font-['Space_Grotesk'] tracking-wider text-white">ABHIMANYU</div>
                          <div className="text-[9px] tracking-[0.25em] text-yellow-400 font-semibold">TECHNOLOGIES</div>
                        </div>
                      </div>
                      <span className="text-[9px] text-gray-500 uppercase tracking-widest">FRONT • TAP TO FLIP</span>
                    </div>

                    <div>
                      <div className="text-sm font-bold text-white">DIRECTOR OF ENGINEERING</div>
                      <div className="text-xs text-yellow-400/90 font-medium">Civil Architecture & IT Solutions</div>
                      <div className="text-[10px] text-gray-400 mt-2">Plot 45, Kukatpally, Hyderabad, India</div>
                      <div className="text-[10px] text-gray-400">hello@abhimanyutech.in • +91 99890 28452</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] text-yellow-400 uppercase tracking-widest font-semibold">THE 3 CHAKRAS</span>
                      <span className="text-[9px] text-gray-500 uppercase tracking-widest">BACK • TAP TO FLIP</span>
                    </div>
                    <div className="space-y-1.5 text-xs text-gray-300">
                      <div><b className="text-yellow-400">01. Architecture:</b> AutoCAD, 3D Elevation, Revit BIM, GHMC</div>
                      <div><b className="text-yellow-400">02. IT Division:</b> AI Agents, Builder CRM, Web, Mobile</div>
                      <div><b className="text-yellow-400">03. Freelance:</b> 100+ On-Demand Civil & IT Engineers</div>
                    </div>
                    <div className="text-[9px] text-gray-400 border-t border-white/10 pt-2 flex justify-between">
                      <span>www.abhimanyutech.in</span>
                      <span>BREAK THE CHAKRAVYUHA</span>
                    </div>
                  </>
                )}
              </div>
              <p className="text-[11px] text-gray-500 mt-2">Click card above to flip between Front and Back</p>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <a
                href="/visiting-card.jpg"
                download="Abhimanyu_Technologies_Visiting_Card.jpg"
                className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black py-3 rounded-xl font-bold text-xs text-center tracking-wider transition"
              >
                Download Card JPG
              </a>
              <button
                onClick={() => window.print()}
                className="px-6 py-3 rounded-xl border border-white/20 text-gray-300 hover:text-white text-xs font-semibold transition"
              >
                Print
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 2: 8-SLIDE EXECUTIVE PITCH DECK --- */}
      {pitchDeckModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="relative w-full max-w-3xl bg-neutral-950 border border-yellow-500/40 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col justify-between min-h-[520px]">
            <div>
              {/* Deck Header */}
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F5E6C8] to-[#8C6A1F] flex items-center justify-center font-bold text-black text-sm">
                    A
                  </div>
                  <div>
                    <div className="text-xs text-yellow-400 font-bold tracking-widest uppercase">
                      SLIDE {currentSlideIndex + 1} OF {PITCH_DECK_SLIDES.length}
                    </div>
                    <div className="text-sm font-bold text-white font-['Space_Grotesk']">
                      {PITCH_DECK_SLIDES[currentSlideIndex].title}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setPitchDeckModalOpen(false)}
                  className="text-gray-400 hover:text-white p-2 text-xl"
                >
                  ✕
                </button>
              </div>

              {/* Slide Content Body */}
              <div className="py-8">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 mb-3">
                  {PITCH_DECK_SLIDES[currentSlideIndex].badge}
                </span>
                <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
                  {PITCH_DECK_SLIDES[currentSlideIndex].subtitle}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold font-['Space_Grotesk'] text-white mt-1 leading-snug">
                  {PITCH_DECK_SLIDES[currentSlideIndex].headline}
                </h3>
                <div className="mt-6 text-sm text-gray-300 leading-relaxed whitespace-pre-line bg-white/5 p-6 rounded-2xl border border-white/5">
                  {PITCH_DECK_SLIDES[currentSlideIndex].content}
                </div>
              </div>
            </div>

            {/* Deck Controls */}
            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                {PITCH_DECK_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlideIndex(i)}
                    className={`h-2 rounded-full transition-all ${
                      currentSlideIndex === i ? 'w-8 bg-yellow-400' : 'w-2 bg-neutral-700'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  disabled={currentSlideIndex === 0}
                  onClick={() => setCurrentSlideIndex((prev) => prev - 1)}
                  className="px-5 py-2 rounded-full border border-white/20 text-xs font-semibold text-gray-300 hover:text-white disabled:opacity-30"
                >
                  ← Previous
                </button>
                <button
                  disabled={currentSlideIndex === PITCH_DECK_SLIDES.length - 1}
                  onClick={() => setCurrentSlideIndex((prev) => prev + 1)}
                  className="px-5 py-2 rounded-full bg-yellow-400 text-black text-xs font-bold hover:bg-yellow-300 disabled:opacity-30"
                >
                  Next Slide →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 3: POPUP CALCULATOR --- */}
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
    </div>
  );
}
