import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";

/* ============================================================
   ABHIMANYU TECHNOLOGIES — Deep Navy Enterprise B2B Platform

   Design System: Professional · Modern · Trustworthy · Industrial
   Background: Deep Navy (#0B1F3A) / Slate Charcoal (#101828)
   Primary Accent: Electric Blue (#1565C0) / Brass Gold (#D4AF37)
   Teal Accent: #00A896
   Text: Crisp White (#F8FAFC) / Muted Slate (#94A3B8)
   ============================================================ */

const TOKENS = {
  ink: "#0B1F3A",
  panel: "rgba(16, 24, 40, 0.75)",
  panelAlt: "#101828",
  brass: "#D4AF37",
  brassBright: "#F3E5AB",
  paper: "#F8FAFC",
  slate: "#94A3B8",
  teal: "#00A896",
  blue: "#1565C0",
  hair: "rgba(255, 255, 255, 0.10)",
};

/* ---------------------------- Multi-Currency Engine ---------------------------- */

const CURRENCIES = {
  INR: { code: "INR", symbol: "₹", label: "🇮🇳 INR (₹)", rate: 1 },
  USD: { code: "USD", symbol: "$", label: "🇺🇸 USD ($)", rate: 0.012 },
  EUR: { code: "EUR", symbol: "€", label: "🇪🇺 EUR (€)", rate: 0.011 },
  AED: { code: "AED", symbol: "AED ", label: "🇦🇪 AED (د.إ)", rate: 0.044 },
};

const formatPrice = (inrAmount, curr = "INR") => {
  const c = CURRENCIES[curr] || CURRENCIES.INR;
  const converted = inrAmount * c.rate;
  if (curr === "INR") {
    if (inrAmount >= 10000000) return `₹${(inrAmount / 10000000).toFixed(1)} Cr`;
    if (inrAmount >= 100000) return `₹${(inrAmount / 100000).toFixed(1)} L`;
    return `₹${inrAmount.toLocaleString("en-IN")}`;
  }
  return `${c.symbol}${Math.round(converted).toLocaleString("en-US")}`;
};

/* ---------------------------- data ---------------------------- */

const NAV = [
  { id: "home", label: "Home" },
  { id: "products", label: "Products" },
  { id: "services", label: "Services" },
  { id: "manufacturers", label: "Manufacturers" },
  { id: "businesses", label: "Businesses" },
  { id: "requirements", label: "Requirements (RFQ)" },
  { id: "dashboard", label: "Dashboard" },
  { id: "knowledge", label: "Knowledge" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

/* ---------------------------- B2B Marketplace Datasets ---------------------------- */

const B2B_MANUFACTURERS = [
  {
    id: "mfg-1",
    name: "Apex Precision Engineering Ltd.",
    category: "CNC Machining",
    location: "Chennai, Tamil Nadu",
    verified: true,
    rating: "4.9 ★ (142 Reviews)",
    capacity: "High Capacity (50k units/mo)",
    capabilities: ["5-Axis CNC Milling", "Precision Lathe Turning", "Stainless Steel 316", "Titanium Aerospace Grade"],
    certifications: ["ISO 9001:2015", "AS9100D Aerospace", "SOC2 Type II"],
    responseRate: "Avg Response: < 2 Hours",
    minOrder: "100 Units"
  },
  {
    id: "mfg-2",
    name: "Deccan Sheet Metal & Fabrication",
    category: "Sheet Metal Fabrication",
    location: "Hyderabad, Telangana",
    verified: true,
    rating: "4.8 ★ (98 Reviews)",
    capacity: "Medium Batch (25k units/mo)",
    capabilities: ["Fiber Laser Cutting", "CNC Press Brake Bending", "Robot MIG/TIG Welding", "Powder Coating"],
    certifications: ["ISO 9001:2015", "IATF 16949 Automotive"],
    responseRate: "Avg Response: < 1 Hour",
    minOrder: "50 Units"
  },
  {
    id: "mfg-3",
    name: "Vanguard Electronics OEM Systems",
    category: "Electronics Assembly",
    location: "Bengaluru, Karnataka",
    verified: true,
    rating: "4.95 ★ (210 Reviews)",
    capacity: "Mass Production (200k PCBs/mo)",
    capabilities: ["High-Speed SMT Assembly", "BGA X-Ray Inspection", "Conformal Coating", "Turnkey Box Build"],
    certifications: ["ISO 13485 Medical", "ISO 9001:2015", "IPC-A-610 Class 3"],
    responseRate: "Avg Response: Instant AI Matching",
    minOrder: "500 Units"
  }
];

const B2B_BUSINESSES = [
  {
    id: "biz-1",
    name: "Abhimanyu Technologies India HQ",
    type: "Enterprise Software & Cloud AI Partner",
    location: "Telangana, India",
    verified: true,
    rating: "5.0 ★ (350+ Global Clients)",
    specialties: ["AI Systems & LLMs", "Cloud Anycast Load Balancing", "Custom SaaS", "Cybersecurity"],
    employees: "250+ Engineers",
    established: "2020",
    slug: "abhimanyu-technologies"
  },
  {
    id: "biz-2",
    name: "Vertex Automation & Robotics Systems",
    type: "Industrial IoT & Robotics OEM",
    location: "Pune, Maharashtra",
    verified: true,
    rating: "4.85 ★ (84 Clients)",
    specialties: ["SCADA Systems", "PLC Programming", "Industrial Conveyor Automation", "IoT Sensors"],
    employees: "120+ Engineers",
    established: "2018",
    slug: "vertex-automation"
  }
];

const PUBLIC_RFQS = [
  {
    id: "RFQ-2026-9041",
    title: "Manufacture 10,000 Stainless Steel 316 CNC Turned Valves",
    category: "Custom CNC Machining",
    quantity: "10,000 Units",
    location: "Target Delivery: Chennai / Telangana",
    budget: "$45,000 - $60,000",
    deadline: "14 Days Left",
    status: "OPEN FOR QUOTES",
    bidsCount: "12 Bids Submitted",
    tolerance: "±0.005 mm",
    material: "SS 316L Marine Grade",
    buyer: "Hydraulics Global Ltd"
  },
  {
    id: "RFQ-2026-9082",
    title: "Turnkey SMT PCB Assembly & Enclosure Box Build for Medical IoT Node",
    category: "Electronics Assembly",
    quantity: "2,500 Units",
    location: "Target Delivery: Hyderabad / Bengaluru",
    budget: "$28,000 - $35,000",
    deadline: "8 Days Left",
    status: "OPEN FOR QUOTES",
    bidsCount: "8 Bids Submitted",
    tolerance: "IPC-A-610 Class 3",
    material: "FR4 6-Layer + ABS Enclosure",
    buyer: "MedTech BioSystems"
  },
  {
    id: "RFQ-2026-9114",
    title: "Precision Aerospace Grade Aluminum 6061-T6 Structural Brackets",
    category: "Custom CNC Machining",
    quantity: "5,000 Units",
    location: "Target Delivery: Pune / Mumbai",
    budget: "$32,000 - $48,000",
    deadline: "5 Days Left",
    status: "HIGH PRIORITY",
    bidsCount: "19 Bids Submitted",
    tolerance: "±0.01 mm / Hard Anodized Type III",
    material: "Aluminium 6061-T6",
    buyer: "AeroDynamics Defence"
  },
  {
    id: "RFQ-2026-9150",
    title: "High-Volume Custom Plastic Injection Molding for Automotive Sensor Cases",
    category: "Custom Plastic Injection",
    quantity: "50,000 Units",
    location: "Target Delivery: Delhi NCR / Pan-India",
    budget: "$70,000 - $95,000",
    deadline: "21 Days Left",
    status: "OPEN FOR QUOTES",
    bidsCount: "15 Bids Submitted",
    tolerance: "ISO 20457 SPI-A2 Mirror Finish",
    material: "Polycarbonate / PBT Blend",
    buyer: "AutoElectrics Tier-1"
  },
  {
    id: "RFQ-2026-9195",
    title: "Enterprise Multi-Tenant AI Defect Detection Pipeline & Camera Stream",
    category: "AI & Software Development",
    quantity: "8 Manufacturing Plants",
    location: "Target Delivery: Global Deployment / Cloud Edge",
    budget: "$85,000 - $120,000",
    deadline: "11 Days Left",
    status: "VERIFIED BUYER",
    bidsCount: "6 Bids Submitted",
    tolerance: "Sub-15ms p99 inference latency",
    material: "Kubernetes, ONNX, TensorRT, RTSP",
    buyer: "Apex Foundry Conglomerate"
  }
];


const WHAT_WE_DO = [
  { title: "Software Development", desc: "Custom web, mobile, and enterprise applications built on architectures that outlive the first release.", icon: "box" },
  { title: "AI & Data", desc: "Machine learning, generative AI, and analytics that turn operational data into decisions.", icon: "knot" },
  { title: "Cloud & DevOps", desc: "Migration, architecture, and automated delivery pipelines built for scale from day one.", icon: "icosa" },
  { title: "Digital Solutions", desc: "End-to-end platforms designed around a business outcome, not a technology checklist.", icon: "octa" },
];

const SERVICE_CATEGORIES = [
  { key: "software", label: "Software Engineering", blurb: "Applications engineered to be maintained, not just shipped.", problem: "Most software gets built fast and handed over — one dependency upgrade away from becoming unmaintainable.", outcome: "A codebase your team, or ours, can extend for years without a rewrite.", items: ["Custom Software Development", "Web Application Development", "Mobile App Development", "Enterprise Applications", "SaaS Development", "API Development", "Microservices", "Legacy Modernization", "System Integration"] },
  { key: "cloud", label: "Cloud & DevOps", blurb: "Infrastructure that scales quietly and fails loudly — never the reverse.", problem: "Manual deployments and unmonitored servers turn small outages into all-night incidents.", outcome: "Infrastructure that scales with demand and tells you about a problem before your customers do.", items: ["Cloud Consulting", "Cloud Migration", "Cloud Architecture", "AWS / Azure / GCP", "CI/CD", "Infrastructure as Code", "Containerization (Docker, Kubernetes)", "Release Automation", "Monitoring & Logging"] },
  { key: "ai", label: "AI & Machine Learning", blurb: "Models built for a specific business problem, evaluated against it honestly.", problem: "Most 'AI features' are bolted on to look modern, with no way to measure if they actually help.", outcome: "A model scoped to one decision, measured against a baseline, with a human still in the loop where it matters.", items: ["Generative AI", "AI Agents", "Machine Learning", "Natural Language Processing", "Computer Vision", "Recommendation Systems", "Predictive Analytics", "AI Automation", "AI Chatbots"] },
  { key: "data", label: "Data & Analytics", blurb: "Pipelines and dashboards that people actually check before deciding.", problem: "Data lives in five different tools, and nobody fully trusts any of the reports built from it.", outcome: "One pipeline, one source of truth, and a dashboard people open before a meeting instead of during it.", items: ["Data Engineering", "Data Warehousing", "ETL / ELT", "Business Intelligence", "Real-time Analytics", "Data Governance", "Big Data"] },
  { key: "security", label: "Cybersecurity", blurb: "Security reviewed at every layer, not bolted on before launch.", problem: "Security gets treated as a pre-launch checklist instead of a design constraint from day one.", outcome: "A system reviewed at the architecture level, with the boring controls (auth, access, logging) actually in place.", items: ["Security Consulting", "Application Security", "Cloud Security", "Identity & Access Management", "Vulnerability Assessment", "Security Monitoring", "Incident Response", "Compliance"] },
  { key: "iot", label: "IoT & Embedded", blurb: "From sensor to dashboard, with the firmware in between.", problem: "Connected-device projects stall between the hardware team and the software team, with nobody owning the middle.", outcome: "One team that owns firmware, connectivity, and the dashboard the data ends up on.", items: ["IoT Development", "Embedded Software", "ESP32 / STM32", "Sensor Integration", "MQTT", "Device Management", "Industrial IoT", "IoT Analytics"] },
  { key: "qa", label: "Testing & QA", blurb: "Confidence before release, measured rather than assumed.", problem: "\"It works on my machine\" is doing a lot of load-bearing work in most release processes.", outcome: "A test suite and release checklist that catch regressions before your customers do.", items: ["Manual Testing", "Automation Testing", "API Testing", "Performance Testing", "Security Testing", "Mobile Testing", "Regression Testing"] },
  { key: "managed", label: "Managed Services & Consulting", blurb: "For teams who need a technology partner, not a one-time vendor.", problem: "The team that built the system moved on, and nobody left knows why it's built the way it is.", outcome: "A partner who stays on the system long enough to actually know it — and answers the phone when something breaks.", items: ["Application Support", "Infrastructure Support", "Cloud Operations", "24/7 Support", "IT Consulting", "Digital Strategy", "Architecture Consulting"] },
];

const PRODUCTS = [
  { key: "erp", name: "Abhimanyu ERP", tag: "Business Management", icon: "box", desc: "A unified platform for operations, inventory, and finance — replacing the spreadsheet-and-email stack most growing businesses run on." },
  { key: "crm", name: "Abhimanyu CRM", tag: "Sales & Customers", icon: "sphere", desc: "Track leads from first contact to closed deal, with the follow-up automation most teams mean to set up and never do." },
  { key: "hrms", name: "Abhimanyu HRMS", tag: "People Operations", icon: "dodeca", desc: "Attendance, payroll, and performance in one system, built for teams that have outgrown manual HR." },
  { key: "ai-platform", name: "Abhimanyu AI", tag: "Intelligent Automation", icon: "knot", desc: "Deploy assistants and predictive models against your own operational data, with a human still reviewing every decision that matters." },
  { key: "iot-platform", name: "Abhimanyu IoT", tag: "Connected Devices", icon: "icosa", desc: "Monitor and manage fleets of connected devices from a single dashboard, with alerts before a failure — not after." },
  { key: "analytics", name: "Abhimanyu Analytics", tag: "Business Intelligence", icon: "cone", desc: "Dashboards built from your real schema, not a generic template that needs six months of customization." },
];

const SOLUTIONS = [
  { title: "Digital Transformation", desc: "Modernize the processes that still run on paper, PDF, or tribal knowledge." },
  { title: "Business Automation", desc: "Remove the repetitive steps between a request and a result." },
  { title: "Enterprise Solutions", desc: "Secure, scalable applications built for organizations that can't afford downtime." },
  { title: "AI-Powered Solutions", desc: "Use AI where it improves a decision — not everywhere it's technically possible." },
  { title: "Cloud Transformation", desc: "Move infrastructure to environments that scale with demand, not headcount." },
  { title: "IoT Transformation", desc: "Connect equipment and spaces to data you can act on in real time." },
];

const INDUSTRIES = [
  { name: "Banking & Finance", note: "Core systems, compliance-aware workflows, fraud-conscious architecture." },
  { name: "Healthcare", note: "Patient data handled with the care regulation actually requires." },
  { name: "Education", note: "Platforms built for institutions and the students who depend on them." },
  { name: "Retail & E-commerce", note: "Inventory, checkout, and fulfillment that hold up during peak load." },
  { name: "Manufacturing", note: "Machines, sensors, and production data connected to one view." },
  { name: "Logistics", note: "Tracking and routing systems that reflect what's actually happening on the ground." },
  { name: "Real Estate", note: "Listings, leasing, and property operations in one platform." },
  { name: "Travel & Hospitality", note: "Booking and guest systems built for peak-season traffic." },
  { name: "Government", note: "Citizen-facing services built for accessibility and scale." },
  { name: "Startups & SMEs", note: "Enterprise-grade engineering at a scope that fits an early-stage budget." },
];

const TECH = [
  { group: "Frontend", items: ["React", "Next.js", "Angular", "Vue"] },
  { group: "Backend", items: ["Node.js", "Python", "Java", ".NET"] },
  { group: "Mobile", items: ["Flutter", "React Native", "Android", "iOS"] },
  { group: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"] },
  { group: "Cloud", items: ["AWS", "Azure", "Google Cloud"] },
  { group: "Data & AI", items: ["Python", "TensorFlow", "GenAI", "Data Engineering"] },
  { group: "DevOps", items: ["Docker", "Kubernetes", "CI/CD", "Terraform"] },
];

const WHY = [
  { title: "Innovation", desc: "We use current technology to solve problems that are actually current — not to pad a stack list.", icon: "knot" },
  { title: "Engineering Excellence", desc: "Software built to be read and maintained by the next engineer, not just to pass a demo.", icon: "dodeca" },
  { title: "Business-Focused", desc: "Every technical decision traces back to a business requirement someone can name.", icon: "octa" },
  { title: "Long-Term Partnership", desc: "We stay involved after launch — that's where most software actually earns its cost.", icon: "icosa" },
  { title: "Security First", desc: "Security reviewed at design time, not patched in after an incident.", icon: "cone" },
];

const PROCESS = [
  { step: "01", title: "Discover", desc: "We map the actual workflow — not just the feature list — before any code gets written. This is where most future rework gets avoided." },
  { step: "02", title: "Design", desc: "Architecture and interface decisions get made together, so the two don't end up fighting each other three months in." },
  { step: "03", title: "Build", desc: "Short, visible iterations. You see working software early — not a status report that says 'on track.'" },
  { step: "04", title: "Launch", desc: "Deployment, monitoring, and a rollback plan in place before go-live. Launch day should be uneventful, on purpose." },
  { step: "05", title: "Support", desc: "We stay on after go-live, because that's when the real usage patterns — and the real bugs — actually show up." },
];

const ENGAGEMENT = [
  { title: "Fixed-Scope Project", desc: "A defined outcome, timeline, and price — best when the requirements are already clear.", bullets: ["Detailed proposal before work starts", "Milestone-based delivery", "Fixed budget, no surprise invoices"] },
  { title: "Dedicated Team", desc: "Engineers embedded with your team, working your backlog — best for ongoing product development.", bullets: ["Scale the team up or down monthly", "Direct access to the engineers, not just a PM", "Works inside your existing tools and process"] },
  { title: "Ongoing Partner", desc: "MyVault acting as your technology department — for teams that need coverage, not just a one-off project.", bullets: ["Maintenance, monitoring, and on-call support", "Roadmap planning alongside your team", "Priced as a predictable monthly retainer"] },
];

const FAQ = [
  { q: "How long does a typical project take?", a: "It depends entirely on scope — a focused MVP can take a few weeks; an enterprise platform takes longer. We give a real timeline after the Discover stage, not before it." },
  { q: "Do you work with early-stage startups as well as larger businesses?", a: "Yes. Fixed-Scope and Dedicated Team engagements both work well for teams at an early stage; Ongoing Partner tends to suit businesses with a system already in production." },
  { q: "What happens after launch?", a: "We don't disappear at go-live. Support and maintenance continue under whichever engagement model you're on, and we're the ones who already understand the system when something needs to change." },
  { q: "Can you take over and maintain an existing codebase?", a: "Yes — we start with an architecture review so we understand what we're inheriting before committing to a timeline or quote." },
  { q: "Where is MyVault based?", a: "MyVault is based in Telangana, India, and works with clients across time zones." },
];

const CASE_STUDIES = [
  { client: "Illustrative case study", title: "Unifying operations onto one cloud platform", challenge: "A growing business was running operations across disconnected spreadsheets and point tools, with no shared view of inventory or sales.", solution: "MyVault designed and built an integrated cloud platform covering inventory, orders, and reporting in one system.", stack: "Next.js · Node.js · PostgreSQL · AWS" },
  { client: "Illustrative case study", title: "A student-facing LMS with real-time progress tracking", challenge: "An education program needed a way to deliver structured course content and verify completion at scale.", solution: "MyVault built a mobile learning platform with module-based progression, assessments, and certificate issuance.", stack: "Flutter · Express · PostgreSQL · S3" },
];

const INSIGHTS = [
  { category: "AI", title: "How AI Is Actually Changing Day-to-Day Business Decisions" },
  { category: "Cloud", title: "Cloud Migration: A Practical Guide for Growing Businesses" },
  { category: "IoT", title: "What Connecting Your Equipment to Data Actually Buys You" },
  { category: "Software Development", title: "Choosing an Architecture That Survives Your Second Year" },
  { category: "Cybersecurity", title: "The Security Reviews Most Teams Skip — and What They Cost Later" },
  { category: "Digital Transformation", title: "Where Automation Pays Off First, and Where It Doesn't Yet" },
];

const ROLES = [
  { title: "Flutter Developer", dept: "Engineering", type: "Full-time" },
  { title: "Backend Engineer — Node.js", dept: "Engineering", type: "Full-time" },
  { title: "AI / ML Engineer", dept: "AI & Data", type: "Full-time" },
  { title: "Product Designer", dept: "Design", type: "Full-time" },
  { title: "QA Engineer", dept: "Engineering", type: "Full-time" },
];

const VALUES = [
  { title: "Clarity over cleverness", desc: "The simplest correct solution wins, even when a more impressive one is available." },
  { title: "Ownership", desc: "Whoever builds it stays close to how it performs once real people use it." },
  { title: "Directness", desc: "We'd rather tell you a timeline is wrong now than protect it until it's too late to fix." },
];

/* ---------------------------- primitives ---------------------------- */

function Eyebrow({ children }) {
  return (
    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: TOKENS.brass, marginBottom: 14 }}>
      {children}
    </div>
  );
}

function ArcDivider() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "8px 0 0" }}>
      <Vault3D size={72} variant="ring" />
    </div>
  );
}

function Section({ id, eyebrow, title, sub, children, alt, tight }) {
  return (
    <section
      id={id}
      style={{
        background: alt ? TOKENS.panelAlt : "transparent",
        padding: tight ? "64px 24px" : "96px 24px",
        borderTop: `1px solid ${TOKENS.hair}`,
      }}
    >
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        {(eyebrow || title) && (
          <div style={{ marginBottom: 48, maxWidth: 640 }}>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && (
              <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 500, fontSize: "clamp(28px, 4vw, 40px)", color: TOKENS.paper, margin: 0, lineHeight: 1.15 }}>
                {title}
              </h2>
            )}
            {sub && <p style={{ color: TOKENS.slate, fontSize: 17, lineHeight: 1.6, marginTop: 16 }}>{sub}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

function Card({ children, style }) {
  const ref = useRef(null);
  const reduced = useRef(false);
  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const handleMove = (e) => {
    if (reduced.current) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(700px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 7).toFixed(2)}deg) translateZ(8px)`;
  };
  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    el.style.borderColor = TOKENS.hair;
    el.style.boxShadow = "0 1px 0 rgba(0,0,0,0.4)";
  };

  return (
    <div
      ref={ref}
      style={{
        background: TOKENS.panel,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: `1px solid ${TOKENS.hair}`,
        borderRadius: 4,
        padding: 28,
        transition: "transform 0.18s cubic-bezier(0.16,1,0.3,1), border-color 0.2s ease, box-shadow 0.2s ease",
        transformStyle: "preserve-3d",
        boxShadow: "0 1px 0 rgba(0,0,0,0.4)",
        willChange: "transform",
        ...style,
      }}
      onMouseMove={handleMove}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(212,175,55,0.45)";
        e.currentTarget.style.boxShadow = "0 24px 44px -22px rgba(0,0,0,0.65)";
      }}
      onMouseLeave={reset}
    >
      {children}
    </div>
  );
}

const BRASS_SHADOW_UP = "0 4px 0 #93781c, 0 10px 18px -8px rgba(212,175,55,0.55)";
const BRASS_SHADOW_DOWN = "0 1px 0 #93781c, 0 4px 10px -6px rgba(212,175,55,0.5)";

function Button({ children, onClick, variant = "brass", type = "button", full }) {
  const base = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 13,
    letterSpacing: "0.04em",
    padding: "13px 26px",
    borderRadius: 2,
    cursor: "pointer",
    border: "1px solid transparent",
    transition: "background 0.15s ease, transform 0.12s ease, box-shadow 0.12s ease, border-color 0.15s ease",
    width: full ? "100%" : "auto",
    transform: "translateY(0)",
  };
  const styles = {
    brass: { ...base, background: TOKENS.brass, color: TOKENS.ink, fontWeight: 700, boxShadow: BRASS_SHADOW_UP },
    ghost: { ...base, background: "transparent", color: TOKENS.paper, borderColor: TOKENS.hair },
  };
  return (
    <button
      type={type}
      onClick={onClick}
      style={styles[variant]}
      onMouseDown={(e) => {
        if (variant === "brass") {
          e.currentTarget.style.transform = "translateY(3px)";
          e.currentTarget.style.boxShadow = BRASS_SHADOW_DOWN;
        }
      }}
      onMouseUp={(e) => {
        if (variant === "brass") {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = BRASS_SHADOW_UP;
        }
      }}
      onMouseEnter={(e) => {
        if (variant === "brass") e.currentTarget.style.background = TOKENS.brassBright;
        else e.currentTarget.style.borderColor = TOKENS.brass;
      }}
      onMouseLeave={(e) => {
        if (variant === "brass") {
          e.currentTarget.style.background = TOKENS.brass;
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = BRASS_SHADOW_UP;
        } else e.currentTarget.style.borderColor = TOKENS.hair;
      }}
    >
      {children}
    </button>
  );
}

function Grid({ min = 260, children }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(${min}px, 1fr))`, gap: 20 }}>
      {children}
    </div>
  );
}

/* ---------------------------- shared three.js scaffolding ---------------------------- */

function makeSceneRig(mount, width, height, fov, camZ) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 100);
  camera.position.set(0, 0, camZ);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  mount.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0x40465c, 1.3));
  const key = new THREE.PointLight(0xf3e5ab, 2.4, 60);
  key.position.set(4, 4, 6);
  scene.add(key);
  const rim = new THREE.PointLight(0x4fb3ff, 1.2, 60);
  rim.position.set(-5, -3, -4);
  scene.add(rim);

  return { scene, camera, renderer };
}

/* ---------------------------- vault dial (hero signature, real 3D) ---------------------------- */

function Vault3D({ size = 360, variant = "hero" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const width = mount.clientWidth || size;
    const height = mount.clientHeight || size;

    const { scene, camera, renderer } = makeSceneRig(mount, width, height, 38, variant === "hero" ? 9 : variant === "ring" ? 6 : 4.2);

    const brassMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.85, roughness: 0.28, emissive: 0x3a2a05, emissiveIntensity: 0.3 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x1a1c22, metalness: 0.5, roughness: 0.55 });
    const gemMat = new THREE.MeshStandardMaterial({ color: 0xf3e5ab, emissive: 0xf3e5ab, emissiveIntensity: 0.9, metalness: 0.9, roughness: 0.1 });

    const group = new THREE.Group();
    scene.add(group);

    const detailed = variant !== "logo";
    const ringCount = variant === "hero" ? 3 : 1;
    const baseR = variant === "hero" ? 2.6 : variant === "ring" ? 2.2 : 1.3;
    const rings = [];
    for (let i = 0; i < ringCount; i++) {
      const r = baseR - i * 0.7;
      const torus = new THREE.Mesh(new THREE.TorusGeometry(r, 0.05, 12, 72), brassMat);
      group.add(torus);
      rings.push(torus);
    }

    if (variant === "hero") {
      const tickCount = 24;
      for (let i = 0; i < tickCount; i++) {
        const a = (i / tickCount) * Math.PI * 2;
        const tall = i % 6 === 0;
        const tick = new THREE.Mesh(new THREE.BoxGeometry(0.045, tall ? 0.34 : 0.16, 0.045), darkMat);
        tick.position.set(Math.cos(a) * 2.92, Math.sin(a) * 2.92, 0);
        tick.rotation.z = a + Math.PI / 2;
        group.add(tick);
      }
    }

    if (detailed) {
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(variant === "hero" ? 0.46 : 0.28, variant === "hero" ? 0.46 : 0.28, 0.26, 28), brassMat);
      hub.rotation.x = Math.PI / 2;
      group.add(hub);
    }

    let needleGroup = null;
    if (variant === "hero") {
      const needle = new THREE.Mesh(new THREE.BoxGeometry(0.075, 1.7, 0.075), brassMat);
      needle.position.y = 1.7 / 2;
      needleGroup = new THREE.Group();
      needleGroup.add(needle);
      group.add(needleGroup);
    }

    const gem = new THREE.Mesh(new THREE.OctahedronGeometry(variant === "hero" ? 0.17 : variant === "ring" ? 0.12 : 0.09, 0), gemMat);
    gem.position.z = 0.2;
    group.add(gem);

    let points = null, pointsGeo = null, pointsMat = null;
    if (variant === "hero") {
      const count = 70;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = 3.6 + Math.random() * 3.2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1.5;
      }
      pointsGeo = new THREE.BufferGeometry();
      pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      pointsMat = new THREE.PointsMaterial({ color: 0xd4af37, size: 0.035, transparent: true, opacity: 0.5, sizeAttenuation: true });
      points = new THREE.Points(pointsGeo, pointsMat);
      scene.add(points);
    }

    let raf;
    const start = performance.now();
    let mx = 0, my = 0;
    const handleMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    if (variant === "hero" && !reduced) window.addEventListener("mousemove", handleMove);

    const animate = (t) => {
      const elapsed = (t - start) / 1000;
      if (!reduced) {
        rings.forEach((r, i) => {
          r.rotation.z = elapsed * (0.06 + i * 0.035) * (i % 2 === 0 ? 1 : -1);
        });
        gem.rotation.y = elapsed * 0.7;
        gem.rotation.x = elapsed * 0.5;
        if (needleGroup) needleGroup.rotation.z = -Math.min(elapsed / 1.1, 1) * (Math.PI / 2);
        if (points) points.rotation.y = elapsed * 0.025;
        if (variant === "hero") {
          group.rotation.x = my * 0.14;
          group.rotation.y = mx * 0.2;
        } else {
          group.rotation.y = elapsed * 0.25;
        }
        raf = requestAnimationFrame(animate);
      } else {
        if (needleGroup) needleGroup.rotation.z = -(Math.PI / 2);
      }
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    const handleResize = () => {
      const w = mount.clientWidth || size, h = mount.clientHeight || size;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      if (variant === "hero") window.removeEventListener("mousemove", handleMove);
      if (pointsGeo) pointsGeo.dispose();
      if (pointsMat) pointsMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [variant, size]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        width: variant === "hero" ? "min(560px, 90vw)" : size,
        height: variant === "hero" ? "min(560px, 90vw)" : size,
        margin: "0 auto",
      }}
    />
  );
}

/* ---------------------------- holographic globe (hero mode) ---------------------------- */

function HolographicGlobe3D({ size = 560 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const width = mount.clientWidth || size;
    const height = mount.clientHeight || size;

    const { scene, camera, renderer } = makeSceneRig(mount, width, height, 40, 5.5);

    const group = new THREE.Group();
    scene.add(group);

    const wireMat = new THREE.MeshBasicMaterial({ color: 0xd4af37, wireframe: true, transparent: true, opacity: 0.55 });
    const globe = new THREE.Mesh(new THREE.IcosahedronGeometry(1.7, 2), wireMat);
    group.add(globe);

    const coreMat = new THREE.MeshStandardMaterial({ color: 0x4fb3ff, emissive: 0x4fb3ff, emissiveIntensity: 0.6, metalness: 0.6, roughness: 0.3, transparent: true, opacity: 0.18 });
    const core = new THREE.Mesh(new THREE.SphereGeometry(1.55, 32, 32), coreMat);
    group.add(core);

    const ringMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.85, roughness: 0.25, emissive: 0x3a2a05, emissiveIntensity: 0.3 });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.03, 12, 90), ringMat);
    ring1.rotation.x = Math.PI / 2.4;
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.025, 12, 90), ringMat);
    ring2.rotation.x = Math.PI / 1.7;
    ring2.rotation.y = Math.PI / 5;
    group.add(ring1, ring2);

    const count = 60;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.75;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const dotsGeo = new THREE.BufferGeometry();
    dotsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const dotsMat = new THREE.PointsMaterial({ color: 0xf3e5ab, size: 0.05, transparent: true, opacity: 0.85 });
    const dots = new THREE.Points(dotsGeo, dotsMat);
    group.add(dots);

    let raf;
    const start = performance.now();
    const animate = (t) => {
      const elapsed = (t - start) / 1000;
      if (!reduced) {
        group.rotation.y = elapsed * 0.22;
        ring1.rotation.z = elapsed * 0.15;
        ring2.rotation.z = -elapsed * 0.12;
        raf = requestAnimationFrame(animate);
      }
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      wireMat.dispose(); coreMat.dispose(); ringMat.dispose(); dotsGeo.dispose(); dotsMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [size]);

  return <div ref={mountRef} aria-hidden="true" style={{ width: "min(560px, 90vw)", height: "min(560px, 90vw)", margin: "0 auto" }} />;
}

/* ---------------------------- tech sphere (hero mode) ---------------------------- */

function TechStack3D({ size = 560 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const width = mount.clientWidth || size;
    const height = mount.clientHeight || size;

    const { scene, camera, renderer } = makeSceneRig(mount, width, height, 40, 6);

    const group = new THREE.Group();
    scene.add(group);

    const coreMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.85, roughness: 0.25, emissive: 0x3a2a05, emissiveIntensity: 0.35 });
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.9, 0), coreMat);
    group.add(core);

    const satelliteGeos = [new THREE.OctahedronGeometry(0.32, 0), new THREE.TetrahedronGeometry(0.34, 0), new THREE.SphereGeometry(0.28, 16, 16), new THREE.BoxGeometry(0.42, 0.42, 0.42), new THREE.DodecahedronGeometry(0.3, 0)];
    const satMat = new THREE.MeshStandardMaterial({ color: 0x4fb3ff, metalness: 0.6, roughness: 0.3, emissive: 0x0d2b40, emissiveIntensity: 0.5 });

    const orbits = satelliteGeos.map((geo, i) => {
      const pivot = new THREE.Group();
      const sat = new THREE.Mesh(geo, satMat);
      const radius = 1.9 + i * 0.35;
      sat.position.set(radius, 0, 0);
      pivot.add(sat);
      pivot.rotation.x = (i / satelliteGeos.length) * Math.PI;
      pivot.rotation.y = Math.random() * Math.PI;
      group.add(pivot);

      const orbitLine = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.008, 8, 80), new THREE.MeshBasicMaterial({ color: 0xd4af37, transparent: true, opacity: 0.25 }));
      pivot.add(orbitLine);

      return { pivot, speed: 0.25 + i * 0.08 };
    });

    let raf;
    const start = performance.now();
    const animate = (t) => {
      const elapsed = (t - start) / 1000;
      if (!reduced) {
        core.rotation.y = elapsed * 0.4;
        core.rotation.x = elapsed * 0.25;
        orbits.forEach((o) => { o.pivot.rotation.y = elapsed * o.speed; });
        group.rotation.y = elapsed * 0.05;
        raf = requestAnimationFrame(animate);
      }
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      coreMat.dispose(); satMat.dispose();
      satelliteGeos.forEach((g) => g.dispose());
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [size]);

  return <div ref={mountRef} aria-hidden="true" style={{ width: "min(560px, 90vw)", height: "min(560px, 90vw)", margin: "0 auto" }} />;
}

/* ---------------------------- security matrix (hero mode) ---------------------------- */

function SecurityMatrix3D({ size = 540 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const width = mount.clientWidth || size;
    const height = mount.clientHeight || size;

    const { scene, camera, renderer } = makeSceneRig(mount, width, height, 42, 7.5);
    camera.position.y = 1.4;
    camera.lookAt(0, 0, 0);

    const group = new THREE.Group();
    group.rotation.x = -0.5;
    scene.add(group);

    const cols = 9, rowsN = 9, spacing = 0.55;
    const geo = new THREE.BoxGeometry(0.14, 0.14, 0.14);
    const cubes = [];
    for (let x = 0; x < cols; x++) {
      for (let z = 0; z < rowsN; z++) {
        const mat = new THREE.MeshStandardMaterial({ color: 0x121620, metalness: 0.4, roughness: 0.6, emissive: 0x4fb3ff, emissiveIntensity: 0.15 });
        const cube = new THREE.Mesh(geo, mat);
        cube.position.set((x - cols / 2) * spacing, 0, (z - rowsN / 2) * spacing);
        group.add(cube);
        cubes.push({ cube, mat, offset: Math.random() * Math.PI * 2, dist: Math.hypot(x - cols / 2, z - rowsN / 2) });
      }
    }

    const brassMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.85, roughness: 0.25, emissive: 0x3a2a05, emissiveIntensity: 0.3 });
    const centerGem = new THREE.Mesh(new THREE.OctahedronGeometry(0.28, 0), brassMat);
    centerGem.position.y = 0.9;
    group.add(centerGem);

    let raf;
    const start = performance.now();
    const animate = (t) => {
      const elapsed = (t - start) / 1000;
      if (!reduced) {
        cubes.forEach((c) => {
          const wave = Math.sin(elapsed * 1.4 - c.dist * 0.6 + c.offset) * 0.5 + 0.5;
          c.cube.position.y = wave * 0.35;
          c.mat.emissiveIntensity = 0.1 + wave * 0.9;
        });
        centerGem.rotation.y = elapsed * 0.8;
        group.rotation.y = Math.sin(elapsed * 0.15) * 0.25;
        raf = requestAnimationFrame(animate);
      }
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      geo.dispose(); brassMat.dispose();
      cubes.forEach((c) => c.mat.dispose());
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [size]);

  return <div ref={mountRef} aria-hidden="true" style={{ width: "min(540px, 90vw)", height: "min(540px, 90vw)", margin: "0 auto" }} />;
}

/* ---------------------------- quantum 3D core (hero mode) ---------------------------- */

function QuantumVault3D({ size = 560 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const width = mount.clientWidth || size;
    const height = mount.clientHeight || size;

    const { scene, camera, renderer } = makeSceneRig(mount, width, height, 42, 6.5);

    const group = new THREE.Group();
    scene.add(group);

    const brassMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.2, emissive: 0x4a3808, emissiveIntensity: 0.4 });
    const blueMat = new THREE.MeshStandardMaterial({ color: 0x4fb3ff, metalness: 0.7, roughness: 0.3, emissive: 0x0d2b40, emissiveIntensity: 0.6 });

    // Inner octahedron core
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(1.1, 0), brassMat);
    group.add(core);

    // Quantum outer rings
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.3, 0.04, 16, 90), brassMat);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.03, 16, 90), blueMat);
    ring1.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    group.add(ring1, ring2);

    // Orbiting quantum energy points
    const count = 90;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI * 2;
      const r = 2.8 + Math.sin(u * 3) * 0.4;
      positions[i * 3] = r * Math.cos(u) * Math.sin(v);
      positions[i * 3 + 1] = r * Math.sin(u) * Math.sin(v);
      positions[i * 3 + 2] = r * Math.cos(v);
    }
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pointsMat = new THREE.PointsMaterial({ color: 0xf3e5ab, size: 0.05, transparent: true, opacity: 0.85 });
    const points = new THREE.Points(pointsGeo, pointsMat);
    group.add(points);

    let raf;
    const start = performance.now();
    const animate = (t) => {
      const elapsed = (t - start) / 1000;
      if (!reduced) {
        core.rotation.y = elapsed * 0.6;
        core.rotation.z = elapsed * 0.4;
        ring1.rotation.z = elapsed * 0.3;
        ring2.rotation.x = elapsed * 0.25;
        points.rotation.y = -elapsed * 0.15;
        group.rotation.y = elapsed * 0.08;
        raf = requestAnimationFrame(animate);
      }
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      brassMat.dispose(); blueMat.dispose(); pointsGeo.dispose(); pointsMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [size]);

  return <div ref={mountRef} aria-hidden="true" style={{ width: "min(560px, 90vw)", height: "min(560px, 90vw)", margin: "0 auto" }} />;
}

/* ---------------------------- multi-mode hero stage ---------------------------- */

function Hero3DStage() {
  const [mode, setMode] = useState("quantum");

  const modes = [
    { key: "quantum", label: "QUANTUM CORE" },
    { key: "vault", label: "VAULT DOOR" },
    { key: "globe", label: "GLOBAL GLOBE" },
    { key: "tech", label: "TECH SPHERE" },
    { key: "security", label: "CYBER MATRIX" },
  ];

  return (
    <div style={{ textAlign: "center", position: "relative" }}>
      <div
        style={{
          display: "inline-flex",
          gap: 6,
          background: "rgba(16, 24, 40, 0.85)",
          backdropFilter: "blur(12px)",
          padding: "8px 12px",
          borderRadius: 999,
          border: `1px solid ${TOKENS.hair}`,
          marginBottom: 20,
          zIndex: 10,
          position: "relative",
          flexWrap: "wrap",
          justifyContent: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
        }}
      >
        {modes.map((m) => {
          const active = mode === m.key;
          return (
            <button
              key={m.key}
              onClick={() => setMode(m.key)}
              style={{
                background: active ? TOKENS.brass : "transparent",
                color: active ? TOKENS.ink : TOKENS.paper,
                border: "none",
                borderRadius: 999,
                padding: "8px 18px",
                fontSize: 12,
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: active ? 700 : 500,
                cursor: "pointer",
                transition: "all 0.2s ease",
                letterSpacing: "0.06em",
              }}
            >
              {m.label}
            </button>
          );
        })}
      </div>

      <div style={{ minHeight: 560, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        {mode === "quantum" && <QuantumVault3D size={560} />}
        {mode === "vault" && <Vault3D variant="hero" size={560} />}
        {mode === "globe" && <HolographicGlobe3D size={560} />}
        {mode === "tech" && <TechStack3D size={560} />}
        {mode === "security" && <SecurityMatrix3D size={540} />}
      </div>

      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: TOKENS.teal, letterSpacing: "0.14em", marginTop: 14 }}>
        [ 3D STAGE ACTIVE: {mode.toUpperCase()} ]
      </div>
    </div>
  );
}

/* ---------------------------- mini 3D icon (rotating geometry) ---------------------------- */

function Icon3D({ geometry = "box", size = 56 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 20);
    camera.position.set(0, 0, 3.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0x40465c, 1.4));
    const key = new THREE.PointLight(0xf3e5ab, 2.2, 30);
    key.position.set(3, 3, 4);
    scene.add(key);
    const rim = new THREE.PointLight(0x4fb3ff, 1.0, 30);
    rim.position.set(-3, -2, -3);
    scene.add(rim);

    const mat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8, roughness: 0.3, emissive: 0x3a2a05, emissiveIntensity: 0.25 });
    let geo;
    switch (geometry) {
      case "knot": geo = new THREE.TorusKnotGeometry(0.62, 0.2, 90, 12); break;
      case "icosa": geo = new THREE.IcosahedronGeometry(1, 0); break;
      case "octa": geo = new THREE.OctahedronGeometry(1, 0); break;
      case "dodeca": geo = new THREE.DodecahedronGeometry(0.95, 0); break;
      case "cone": geo = new THREE.ConeGeometry(0.85, 1.35, 6); break;
      case "sphere": geo = new THREE.SphereGeometry(0.95, 24, 24); break;
      default: geo = new THREE.BoxGeometry(1.25, 1.25, 1.25);
    }
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    let raf;
    const start = performance.now();
    const animate = (t) => {
      const elapsed = (t - start) / 1000;
      if (!reduced) {
        mesh.rotation.x = elapsed * 0.45;
        mesh.rotation.y = elapsed * 0.65;
        raf = requestAnimationFrame(animate);
      } else {
        mesh.rotation.set(0.5, 0.6, 0);
      }
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [geometry, size]);

  return <div ref={mountRef} aria-hidden="true" style={{ width: size, height: size }} />;
}

/* ---------------------------- flip card (real 3D rotateY) ---------------------------- */

function FlipCard({ title, desc, icon }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div style={{ perspective: 1000, height: 210, cursor: "default" }} onMouseEnter={() => setFlipped(true)} onMouseLeave={() => setFlipped(false)}>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.65s cubic-bezier(0.16,1,0.3,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          style={{
            position: "absolute", inset: 0, backfaceVisibility: "hidden",
            background: TOKENS.panel, backdropFilter: "blur(14px)", border: `1px solid ${TOKENS.hair}`, borderRadius: 4,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14,
          }}
        >
          <Icon3D geometry={icon} size={56} />
          <h4 style={{ color: TOKENS.brass, fontFamily: "'JetBrains Mono', monospace", fontSize: 13, textAlign: "center", margin: 0, letterSpacing: "0.04em" }}>
            {title.toUpperCase()}
          </h4>
        </div>
        <div
          style={{
            position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)",
            background: TOKENS.panelAlt, border: "1px solid rgba(212,175,55,0.35)", borderRadius: 4,
            display: "flex", alignItems: "center", justifyContent: "center", padding: 22,
          }}
        >
          <p style={{ color: TOKENS.paper, fontSize: 14, lineHeight: 1.6, margin: 0, textAlign: "center" }}>{desc}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- process / engagement / faq ---------------------------- */

function ProcessSection() {
  return (
    <Section eyebrow="How We Solve It" title="A process built to remove surprises" sub="Five stages, the same for every engagement — so you always know what's next." tight>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 28 }}>
        {PROCESS.map((p) => (
          <div key={p.step}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 36, fontWeight: 700, color: "rgba(212,175,55,0.35)", marginBottom: 8 }}>{p.step}</div>
            <h4 style={{ color: TOKENS.paper, fontFamily: "'Fraunces', serif", fontSize: 18, margin: "0 0 8px" }}>{p.title}</h4>
            <p style={{ color: TOKENS.slate, fontSize: 14, lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function EngagementSection({ go }) {
  return (
    <Section alt eyebrow="Engagement Models" title="Work with us the way that fits" tight>
      <Grid min={260}>
        {ENGAGEMENT.map((e) => (
          <Card key={e.title}>
            <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 19, margin: "0 0 10px" }}>{e.title}</h3>
            <p style={{ color: TOKENS.slate, fontSize: 14.5, lineHeight: 1.6, margin: "0 0 16px" }}>{e.desc}</p>
            <ul style={{ margin: 0, paddingLeft: 18, color: TOKENS.paper, fontSize: 13.5, lineHeight: 1.9 }}>
              {e.bullets.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </Card>
        ))}
      </Grid>
      <div style={{ marginTop: 30 }}>
        <Button onClick={() => go("contact")}>Discuss Your Project →</Button>
      </div>
    </Section>
  );
}

function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <Section eyebrow="FAQ" title="Common questions" tight>
      <div style={{ maxWidth: 780 }}>
        {FAQ.map((f, i) => {
          const open = openIdx === i;
          return (
            <div key={f.q} style={{ borderBottom: `1px solid ${TOKENS.hair}` }}>
              <button
                onClick={() => setOpenIdx(open ? null : i)}
                style={{ width: "100%", background: "none", border: "none", textAlign: "left", padding: "18px 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", gap: 16 }}
              >
                <span style={{ color: TOKENS.paper, fontFamily: "'Fraunces', serif", fontSize: 16 }}>{f.q}</span>
                <span style={{ color: TOKENS.brass, fontFamily: "'JetBrains Mono', monospace", fontSize: 20, flexShrink: 0 }}>{open ? "−" : "+"}</span>
              </button>
              {open && <p style={{ color: TOKENS.slate, fontSize: 14.5, lineHeight: 1.7, margin: "0 0 20px", maxWidth: 640 }}>{f.a}</p>}
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------------------------- telemetry ticker ---------------------------- */

function TelemetryTicker() {
  const items = [
    "⚡ SYSTEM HEALTH: 100% OPERATIONAL",
    "🔒 ZERO-KNOWLEDGE AES-256 ENCRYPTION",
    "🌍 16 GLOBAL VAULT NODES ONLINE",
    "🚀 LATENCY: 14ms GLOBAL AVERAGE",
    "🤖 NEURAL AGENT CORE v4.8 ACTIVE",
    "🛡️ 99.999% SLA UPTIME GUARANTEE",
  ];
  return (
    <div
      style={{
        background: "rgba(16, 21, 31, 0.9)",
        borderBottom: `1px solid ${TOKENS.hair}`,
        padding: "8px 0",
        overflow: "hidden",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        color: TOKENS.teal,
        letterSpacing: "0.1em",
        whiteSpace: "nowrap",
      }}
    >
      <div style={{ display: "flex", gap: 40, animation: "marquee 25s linear infinite" }}>
        {[...items, ...items, ...items].map((item, idx) => (
          <span key={idx} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            {item} <span style={{ color: TOKENS.brass }}>•</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------- video showcase (cybernetic media player) ---------------------------- */

function VideoShowcase3D() {
  const [playing, setPlaying] = useState(true);
  const [chapter, setChapter] = useState(0);
  const [quality, setQuality] = useState("4K");
  const canvasRef = useRef(null);

  const chapters = [
    { title: "Vault Architecture & Security Demo", duration: "02:45", tag: "SYSTEM ARCHITECTURE" },
    { title: "Real-Time Telemetry & Threat Isolation", duration: "03:12", tag: "CYBER SECURITY" },
    { title: "Neural AI Agent Autonomous Workflows", duration: "01:58", tag: "AI AUTOMATION" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let frame = 0;

    const render = () => {
      frame++;
      const w = canvas.width;
      const h = canvas.height;

      // Dark cyber background
      ctx.fillStyle = "#070E1A";
      ctx.fillRect(0, 0, w, h);

      // Grid background
      ctx.strokeStyle = "rgba(79, 179, 255, 0.08)";
      ctx.lineWidth = 1;
      const step = 30;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // Dynamic animated wave audio/video simulation
      const cx = w / 2;
      const cy = h / 2;
      const t = frame * 0.04;

      ctx.save();
      ctx.translate(cx, cy);

      // Concentric cybernetic rings
      for (let i = 1; i <= 4; i++) {
        const radius = i * 45 + Math.sin(t + i) * 6;
        ctx.strokeStyle = i % 2 === 0 ? "rgba(212, 175, 55, 0.4)" : "rgba(79, 179, 255, 0.4)";
        ctx.lineWidth = i === 2 ? 2 : 1;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Pulsing central orb
      const orbR = 24 + Math.sin(t * 2) * 5;
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, orbR * 2);
      grad.addColorStop(0, "rgba(243, 229, 171, 0.9)");
      grad.addColorStop(0.5, "rgba(212, 175, 55, 0.4)");
      grad.addColorStop(1, "rgba(7, 14, 26, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, orbR * 2, 0, Math.PI * 2);
      ctx.fill();

      // Oscilloscope waveforms
      ctx.strokeStyle = "#4fb3ff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = -w / 2.2; x <= w / 2.2; x += 5) {
        const y = Math.sin(x * 0.03 + t * 3) * 22 * Math.cos(x * 0.01);
        if (x === -w / 2.2) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.restore();

      // Overlay text HUD
      ctx.fillStyle = "#d4af37";
      ctx.font = "11px 'JetBrains Mono', monospace";
      ctx.fillText(`[ REEL ${chapter + 1} // ${chapters[chapter].tag} ]`, 20, 30);

      ctx.fillStyle = "#c8bfae";
      ctx.fillText(`STREAM: LIVE ${quality} (60 FPS)`, w - 160, 30);

      if (playing) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [playing, chapter, quality]);

  return (
    <Card style={{ padding: 0, overflow: "hidden", border: `1px solid ${TOKENS.hair}` }}>
      <div style={{ position: "relative", background: "#070E1A" }}>
        <canvas ref={canvasRef} width={800} height={420} style={{ width: "100%", height: "auto", display: "block" }} />

        {/* Video HUD Overlay Header */}
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            right: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              background: "rgba(11, 31, 58, 0.88)",
              border: `1px solid ${TOKENS.hair}`,
              borderRadius: 4,
              padding: "6px 12px",
              fontSize: 11,
              fontFamily: "'JetBrains Mono', monospace",
              color: TOKENS.paper,
            }}
          >
            ● LIVE SHOWCASE REEL
          </div>
          <div style={{ pointerEvents: "auto", display: "flex", gap: 6 }}>
            {["1080p", "4K", "RAW"].map((q) => (
              <button
                key={q}
                onClick={() => setQuality(q)}
                style={{
                  background: quality === q ? TOKENS.brass : "rgba(16, 24, 40, 0.8)",
                  color: quality === q ? TOKENS.ink : TOKENS.paper,
                  border: `1px solid ${TOKENS.hair}`,
                  borderRadius: 3,
                  fontSize: 10,
                  fontFamily: "'JetBrains Mono', monospace",
                  padding: "4px 8px",
                  cursor: "pointer",
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Video Control Bar */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: 16,
            right: 16,
            background: "rgba(11, 31, 58, 0.92)",
            backdropFilter: "blur(12px)",
            border: `1px solid ${TOKENS.hair}`,
            borderRadius: 6,
            padding: "12px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button
              onClick={() => setPlaying(!playing)}
              style={{
                background: TOKENS.brass,
                color: TOKENS.ink,
                border: "none",
                borderRadius: "50%",
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              {playing ? "❚❚" : "▶"}
            </button>
            <div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 15, color: TOKENS.paper }}>
                {chapters[chapter].title}
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate }}>
                CHAPTER {chapter + 1} OF 3 • {chapters[chapter].duration}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            {chapters.map((ch, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setChapter(idx);
                  setPlaying(true);
                }}
                style={{
                  background: chapter === idx ? "rgba(212, 175, 55, 0.2)" : "transparent",
                  color: chapter === idx ? TOKENS.brass : TOKENS.slate,
                  border: `1px solid ${chapter === idx ? TOKENS.brass : TOKENS.hair}`,
                  borderRadius: 4,
                  padding: "6px 12px",
                  fontSize: 11,
                  fontFamily: "'JetBrains Mono', monospace",
                  cursor: "pointer",
                }}
              >
                0{idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ---------------------------- 3D architecture explorer ---------------------------- */

function Architecture3DExplorer() {
  const [activeLayer, setActiveLayer] = useState(0);

  const layers = [
    { title: "Client Layer", tech: "React / Flutter / Native iOS & Android", desc: "Edge-cached responsive application interfaces with offline sync.", latency: "< 5ms" },
    { title: "API & Event Gateway", tech: "GraphQL / gRPC / WebSockets", desc: "Zero-latency event streaming gateway with automated rate limiting.", latency: "12ms" },
    { title: "Neural Processing Core", tech: "Python / PyTorch / TensorRT", desc: "Autonomous AI decision engine running real-time predictive workloads.", latency: "24ms" },
    { title: "Encrypted Data Store", tech: "PostgreSQL / Redis / AWS S3", desc: "Zero-knowledge AES-256 encrypted multi-region database cluster.", latency: "18ms" },
  ];

  return (
    <Card>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center" }} className="hero-grid">
        <div>
          <Eyebrow>System Architecture Explorer</Eyebrow>
          <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, color: TOKENS.paper, margin: "0 0 16px" }}>
            Inspect the 4-layer MyVault Stack
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
            {layers.map((l, idx) => {
              const active = activeLayer === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveLayer(idx)}
                  style={{
                    background: active ? "rgba(212, 175, 55, 0.12)" : "transparent",
                    border: `1px solid ${active ? TOKENS.brass : TOKENS.hair}`,
                    borderRadius: 4,
                    padding: "14px 18px",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "'Fraunces', serif", fontSize: 16, color: active ? TOKENS.brass : TOKENS.paper }}>
                      0{idx + 1}. {l.title}
                    </span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.teal }}>
                      {l.latency}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: 24 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.brass, marginBottom: 12 }}>
            [ LAYER INSPECTION // 0{activeLayer + 1} ]
          </div>
          <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: TOKENS.paper, margin: "0 0 8px" }}>
            {layers[activeLayer].title}
          </h4>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: TOKENS.teal, marginBottom: 16 }}>
            {layers[activeLayer].tech}
          </div>
          <p style={{ color: TOKENS.slate, fontSize: 14.5, lineHeight: 1.65, margin: 0 }}>
            {layers[activeLayer].desc}
          </p>
        </div>
      </div>
    </Card>
  );
}

/* ---------------------------- interactive ROI calculator ---------------------------- */

function ROICalculator() {
  const [seats, setSeats] = useState(25);
  const [rate, setRate] = useState(65);

  const annualSavings = seats * rate * 240;
  const hoursSaved = seats * 180;

  return (
    <Card>
      <Eyebrow>Interactive ROI Calculator</Eyebrow>
      <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, color: TOKENS.paper, margin: "0 0 24px" }}>
        Calculate your annual operational savings
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }} className="hero-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14, color: TOKENS.paper }}>
              <span>Engineers / Users: <b>{seats} seats</b></span>
            </div>
            <input
              type="range"
              min={5}
              max={250}
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              style={{ width: "100%", accentColor: TOKENS.brass }}
            />
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14, color: TOKENS.paper }}>
              <span>Hourly Rate ($): <b>${rate}/hr</b></span>
            </div>
            <input
              type="range"
              min={30}
              max={180}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              style={{ width: "100%", accentColor: TOKENS.brass }}
            />
          </div>
        </div>

        <div
          style={{
            background: "rgba(212, 175, 55, 0.06)",
            border: `1px solid ${TOKENS.brass}`,
            borderRadius: 6,
            padding: 24,
            textAlign: "center",
          }}
        >
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.brass, marginBottom: 8 }}>
            ESTIMATED ANNUAL SAVINGS
          </div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 38, color: TOKENS.brassBright, fontWeight: "bold" }}>
            ${annualSavings.toLocaleString()}
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: TOKENS.teal, marginTop: 12 }}>
            ⚡ {hoursSaved.toLocaleString()} hours saved per year
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ---------------------------- 3D data pipeline flow visualizer ---------------------------- */

function DataPipeline3D() {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    { title: "01. Edge Ingestion", rate: "1.2M req/sec", tech: "Kafka / WebSockets / Edge Proxies", detail: "High-throughput edge ingestion receiving sensor payload telemetry, raw API transactions, and user events across 16 global regions." },
    { title: "02. Real-Time ETL Engine", rate: "850k ops/sec", tech: "Apache Spark / Flink / Rust", detail: "Zero-copy streaming transformations, field validation, and continuous schema compliance mapping." },
    { title: "03. Neural AI Inference", rate: "420 models/sec", tech: "PyTorch / ONNX / CUDA", detail: "Autonomous predictive scoring, real-time threat detection, and agentic workflow triggers." },
    { title: "04. Encrypted Vault Storage", rate: "100% Zero-Leak", tech: "AES-256 / Post-Quantum Encryption", detail: "Multi-region encrypted data persistence with automated backup snapshots and immutable audit trails." },
  ];

  return (
    <Card>
      <Eyebrow>3D Data Pipeline Visualizer</Eyebrow>
      <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, color: TOKENS.paper, margin: "0 0 20px" }}>
        Live streaming telemetry & transformation flow
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
        {stages.map((s, idx) => {
          const active = activeStage === idx;
          return (
            <button
              key={idx}
              onClick={() => setActiveStage(idx)}
              style={{
                background: active ? "rgba(212, 175, 55, 0.15)" : TOKENS.panelAlt,
                border: `1px solid ${active ? TOKENS.brass : TOKENS.hair}`,
                borderRadius: 6,
                padding: 16,
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.teal, marginBottom: 6 }}>
                {s.rate}
              </div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16, color: active ? TOKENS.brassBright : TOKENS.paper }}>
                {s.title}
              </div>
            </button>
          );
        })}
      </div>

      <div style={{ background: TOKENS.ink, border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.brass }}>
          <span>[ PIPELINE NODE STAGE 0{activeStage + 1} ]</span>
          <span>TECH: {stages[activeStage].tech}</span>
        </div>
        <p style={{ color: TOKENS.paper, fontSize: 14.5, lineHeight: 1.65, margin: 0 }}>
          {stages[activeStage].detail}
        </p>
      </div>
    </Card>
  );
}

/* ---------------------------- interactive AI command console ---------------------------- */

function AICommandConsole() {
  const [history, setHistory] = useState([
    { cmd: "sys.health()", output: "✅ SYSTEM HEALTH: 100% OPERATIONAL | 16 Nodes Sync'd" },
    { cmd: "sec.audit()", output: "🔒 ZERO-KNOWLEDGE STATUS: ACTIVE | 0 Vulnerabilities Detected" },
  ]);
  const [inputVal, setInputVal] = useState("");

  const presets = [
    { label: "sys.health()", cmd: "sys.health()", resp: "⚡ ALL 16 VAULT NODES RESPONDING IN <14ms AVERAGE" },
    { label: "sec.audit()", cmd: "sec.audit()", resp: "🔒 AES-256 ZERO-KNOWLEDGE SHIELD ACTIVE | 100% ENCRYPTION" },
    { label: "ai.benchmark()", cmd: "ai.benchmark()", resp: "🤖 NEURAL AGENT CORE v4.8: 4,200 INFERENCES/SEC @ 99.8% PRECISION" },
    { label: "cost.optimize()", cmd: "cost.optimize()", resp: "💡 INFRASTRUCTURE RE-BALANCED: 34% WORKLOAD EFFICIENCY GAIN" },
  ];

  const handleRun = (command, response) => {
    setHistory((prev) => [...prev, { cmd: command, output: response }]);
  };

  return (
    <Card style={{ background: "#06090f", border: "1px solid rgba(79, 179, 255, 0.25)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${TOKENS.hair}`, paddingBottom: 12, marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: TOKENS.paper, marginLeft: 10 }}>
            MyVault CLI Terminal v4.8 (Interactive Console)
          </span>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.teal }}>
          LIVE SESSION
        </div>
      </div>

      {/* Preset Command Buttons */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate, alignSelf: "center" }}>
          RUN PRESET:
        </span>
        {presets.map((p) => (
          <button
            key={p.cmd}
            onClick={() => handleRun(p.cmd, p.resp)}
            style={{
              background: "rgba(79, 179, 255, 0.08)",
              border: `1px solid ${TOKENS.hair}`,
              borderRadius: 3,
              padding: "4px 10px",
              fontSize: 11,
              fontFamily: "'JetBrains Mono', monospace",
              color: TOKENS.teal,
              cursor: "pointer",
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Console History Output */}
      <div
        style={{
          background: "#070E1A",
          border: `1px solid ${TOKENS.hair}`,
          borderRadius: 4,
          padding: 16,
          minHeight: 180,
          maxHeight: 260,
          overflowY: "auto",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          color: TOKENS.paper,
          lineHeight: 1.7,
        }}
      >
        {history.map((h, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <div style={{ color: TOKENS.brass }}>
              myvault@console:~$ <span style={{ color: TOKENS.paper }}>{h.cmd}</span>
            </div>
            <div style={{ color: TOKENS.slate, paddingLeft: 16 }}>{h.output}</div>
          </div>
        ))}
        <div style={{ color: TOKENS.teal, display: "flex", alignItems: "center", gap: 6 }}>
          myvault@console:~$ <span style={{ animation: "pulse 1s infinite", color: TOKENS.brass }}>▌</span>
        </div>
      </div>
    </Card>
  );
}

/* ---------------------------- Client Impact & Testimonials Carousel ---------------------------- */

function ClientTestimonials() {
  const [slide, setSlide] = useState(0);

  const testimonials = [
    {
      metric: "+280%",
      label: "TRANSACTION THROUGHPUT",
      title: "FinTech Platform Migration & Core Scaling",
      quote: "Abhimanyu Technologies redesigned our core transaction pipeline. We scaled to 2.4 million daily transactions with zero downtime during peak load.",
      client: "Global Banking & Payments Client",
      stack: "Next.js · Node.js · PostgreSQL · AWS",
    },
    {
      metric: "-64%",
      label: "INFRASTRUCTURE OVERHEAD",
      title: "Enterprise Cloud Modernization & DevOps",
      quote: "The Abhimanyu team automated our release pipelines and cloud architecture. Our deployment cycles dropped from weeks to hours with zero unhandled incidents.",
      client: "Enterprise Logistics Provider",
      stack: "Kubernetes · Terraform · AWS · Docker",
    },
    {
      metric: "14,000+",
      label: "CONNECTED IoT DEVICES",
      title: "Real-Time Fleet Telemetry & Predictive AI",
      quote: "From sensor firmware to our executive analytics dashboard, Abhimanyu built a system that predicts equipment maintenance needs before failures occur.",
      client: "Industrial IoT Operations Client",
      stack: "MQTT · Python · PyTorch · Flutter",
    },
  ];

  const curr = testimonials[slide];

  return (
    <Card style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 32, alignItems: "center" }} className="hero-grid">
        <div style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: 28, textAlign: "center" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.teal, marginBottom: 8, letterSpacing: "0.1em" }}>
            {curr.label}
          </div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 48, fontWeight: 700, color: TOKENS.brassBright }}>
            {curr.metric}
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: TOKENS.slate, marginTop: 12 }}>
            {curr.client}
          </div>
        </div>

        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.brass, marginBottom: 8 }}>
            [ CASE STORY 0{slide + 1} // 03 ]
          </div>
          <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, color: TOKENS.paper, margin: "0 0 14px" }}>
            {curr.title}
          </h3>
          <p style={{ color: TOKENS.paper, fontSize: 15.5, lineHeight: 1.7, fontStyle: "italic", margin: "0 0 16px" }}>
            "{curr.quote}"
          </p>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: TOKENS.teal, marginBottom: 20 }}>
            TECH STACK: {curr.stack}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSlide(idx)}
                style={{
                  background: slide === idx ? TOKENS.brass : "transparent",
                  color: slide === idx ? TOKENS.ink : TOKENS.paper,
                  border: `1px solid ${slide === idx ? TOKENS.brass : TOKENS.hair}`,
                  borderRadius: 4,
                  padding: "6px 14px",
                  fontSize: 11,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: slide === idx ? 700 : 400,
                  cursor: "pointer",
                }}
              >
                0{idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ---------------------------- Live Security & Compliance Dashboard ---------------------------- */

function SecurityStatusDashboard() {
  const securityMetrics = [
    { title: "AES-256 ENCRYPTION", status: "100% ACTIVE", badge: "ZERO-KNOWLEDGE" },
    { title: "THREAT MITIGATION", status: "0 INCIDENTS", badge: "REAL-TIME MONITORING" },
    { title: "COMPLIANCE STANDARDS", status: "SOC2 & ISO READY", badge: "AUDITED ARCHITECTURE" },
    { title: "GLOBAL EDGE SSL", status: "TLS 1.3 SECURED", badge: "AUTOMATED RENEWAL" },
  ];

  return (
    <Card style={{ background: TOKENS.panel }}>
      <Eyebrow>Security & Compliance Dashboard</Eyebrow>
      <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, color: TOKENS.paper, margin: "0 0 24px" }}>
        Enterprise security reviewed at the architecture layer
      </h3>

      <Grid min={220}>
        {securityMetrics.map((m) => (
          <div key={m.title} style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#27c93f", boxShadow: "0 0 8px #27c93f" }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.teal }}>{m.badge}</span>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.brass, marginBottom: 6 }}>{m.title}</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, color: TOKENS.paper, fontWeight: 600 }}>{m.status}</div>
          </div>
        ))}
      </Grid>
    </Card>
  );
}

/* ---------------------------- Interactive Tech Stack Explorer ---------------------------- */

function TechStackExplorer() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Frontend", "Backend", "AI / ML", "Cloud & DevOps", "Databases"];

  const techData = [
    { name: "React / Next.js", cat: "Frontend", rating: "99.4%", desc: "SSR and edge rendering for fast enterprise web applications." },
    { name: "Flutter", cat: "Frontend", rating: "98.9%", desc: "Multi-platform iOS and Android mobile engineering from one codebase." },
    { name: "Node.js / Express", cat: "Backend", rating: "99.8%", desc: "Event-driven asynchronous microservices and real-time APIs." },
    { name: "Python / FastAPI", cat: "Backend", rating: "99.6%", desc: "High-performance REST & GraphQL APIs with native ML integration." },
    { name: "PyTorch / GenAI", cat: "AI / ML", rating: "99.2%", desc: "Autonomous agentic workflows and LLM fine-tuning on operational data." },
    { name: "TensorFlow", cat: "AI / ML", rating: "98.7%", desc: "Predictive neural networks and computer vision classification." },
    { name: "AWS / Azure / GCP", cat: "Cloud & DevOps", rating: "99.999%", desc: "Multi-region cloud infrastructure with automated auto-scaling." },
    { name: "Docker & Kubernetes", cat: "Cloud & DevOps", rating: "99.9%", desc: "Container orchestration with automated zero-downtime deployments." },
    { name: "PostgreSQL & Redis", cat: "Databases", rating: "99.95%", desc: "ACID-compliant relational storage with sub-millisecond in-memory caching." },
  ];

  const filtered = filter === "All" ? techData : techData.filter((t) => t.cat === filter);

  return (
    <Card>
      <Eyebrow>Technology Matrix Explorer</Eyebrow>
      <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, color: TOKENS.paper, margin: "0 0 20px" }}>
        Modern tech stacks chosen for maintainability & scale
      </h3>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            style={{
              background: filter === c ? TOKENS.brass : "transparent",
              color: filter === c ? TOKENS.ink : TOKENS.paper,
              border: `1px solid ${filter === c ? TOKENS.brass : TOKENS.hair}`,
              borderRadius: 999,
              padding: "7px 16px",
              fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: filter === c ? 700 : 400,
              cursor: "pointer",
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <Grid min={240}>
        {filtered.map((t) => (
          <div key={t.name} style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.teal }}>{t.cat.toUpperCase()}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.brass }}>FIT SCORE: {t.rating}</span>
            </div>
            <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: 17, color: TOKENS.paper, margin: "0 0 6px" }}>{t.name}</h4>
            <p style={{ color: TOKENS.slate, fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>{t.desc}</p>
          </div>
        ))}
      </Grid>
    </Card>
  );
}

/* ---------------------------- Global Load Balancer & Traffic Director ---------------------------- */

function LoadBalancerDashboard() {
  const [algorithm, setAlgorithm] = useState("anycast");
  const [spike, setSpike] = useState(false);
  const [outage, setOutage] = useState(false);
  const [rps, setRps] = useState(142850);
  const [inspectNode, setInspectNode] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const base = spike ? 195000 : 142850;
      const jitter = Math.floor(Math.random() * 3000) - 1500;
      setRps(base + jitter);
    }, 1500);
    return () => clearInterval(interval);
  }, [spike]);

  const NODES = [
    {
      id: "in-telangana",
      name: "Telangana HQ (Hyderabad)",
      region: "ap-south-1 (Primary Hub)",
      latency: "4 ms",
      status: "PRIMARY HUB",
      healthy: true,
      share: outage ? "58%" : "40%",
      bgp: "103.21.244.0/24",
      protocol: "TLS 1.3 / HTTP/3 QUIC",
      sockets: "450,000 / 500,000 Active",
      details: "Central R&D and Primary Anycast hub providing sub-5ms low latency connections across Indian and APAC enterprise backbones."
    },
    {
      id: "us-east",
      name: "US East (N. Virginia)",
      region: "us-east-1",
      latency: "12 ms",
      status: "ACTIVE",
      healthy: true,
      share: outage ? "42%" : "25%",
      bgp: "198.51.100.0/24",
      protocol: "TLS 1.3 / HTTP/3 QUIC",
      sockets: "310,000 / 500,000 Active",
      details: "North American Anycast ingress edge with automated DDoS scrubbing and zero-trust API authorization filtering."
    },
    {
      id: "eu-central",
      name: "EU Central (Frankfurt)",
      region: "eu-central-1",
      latency: outage ? "OFFLINE" : "16 ms",
      status: outage ? "FAILOVER ACTIVE" : "ACTIVE",
      healthy: !outage,
      share: outage ? "0%" : "20%",
      bgp: "185.230.12.0/24",
      protocol: "TLS 1.3 / HTTP/2",
      sockets: outage ? "0 / 500,000 Active (Drained)" : "240,000 / 500,000 Active",
      details: "European compliance edge compliant with GDPR data residency controls and health-checked automatic failover routing."
    },
    {
      id: "ap-east",
      name: "APAC East (Tokyo)",
      region: "ap-northeast-1",
      latency: "34 ms",
      status: "ACTIVE",
      healthy: true,
      share: outage ? "20%" : "15%",
      bgp: "203.0.113.0/24",
      protocol: "TLS 1.3 / HTTP/3 QUIC",
      sockets: "180,000 / 500,000 Active",
      details: "East Asia edge acceleration node connected via submarine optical fiber to reduce round-trip time across Pacific markets."
    }
  ];

  return (
    <Card style={{ padding: 32 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
        <div>
          <Eyebrow>Edge Routing & Load Balancing Engine</Eyebrow>
          <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, color: TOKENS.paper, margin: "6px 0 6px" }}>
            Abhimanyu Anycast Global Load Balancer
          </h3>
          <p style={{ color: TOKENS.slate, fontSize: 14.5, margin: 0, maxWidth: 680 }}>
            Real-time traffic director distributing requests across multi-region edge nodes. Click any node to inspect live BGP telemetry.
          </p>
        </div>
        <div style={{ background: "rgba(79, 179, 255, 0.08)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "12px 18px", textAlign: "right" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.teal, letterSpacing: "0.08em" }}>ACTIVE THROUGHPUT</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, color: TOKENS.paper, fontWeight: "bold" }}>
            {rps.toLocaleString()} <span style={{ fontSize: 12, color: TOKENS.brass }}>RPS</span>
          </div>
        </div>
      </div>

      {/* Control Toolbar */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24, padding: 16, background: "rgba(255,255,255,0.02)", borderRadius: 6, border: `1px solid ${TOKENS.hair}` }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate }}>ALGORITHM:</span>
          {["anycast", "weighted", "geo", "failover"].map((algo) => (
            <button
              key={algo}
              onClick={() => { trackEvent("change_lb_algorithm", { algo }); setAlgorithm(algo); }}
              style={{
                background: algorithm === algo ? TOKENS.brass : "transparent",
                color: algorithm === algo ? TOKENS.ink : TOKENS.paper,
                border: `1px solid ${algorithm === algo ? TOKENS.brass : TOKENS.hair}`,
                borderRadius: 4,
                padding: "6px 12px",
                fontSize: 11.5,
                fontFamily: "'JetBrains Mono', monospace",
                cursor: "pointer",
                fontWeight: algorithm === algo ? "bold" : "normal"
              }}
            >
              {algo.toUpperCase()}
            </button>
          ))}
        </div>

        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button
            onClick={() => { trackEvent("toggle_traffic_spike"); setSpike(!spike); }}
            style={{
              background: spike ? "rgba(239, 68, 68, 0.2)" : "rgba(255,255,255,0.04)",
              color: spike ? "#f87171" : TOKENS.paper,
              border: `1px solid ${spike ? "#f87171" : TOKENS.hair}`,
              borderRadius: 4,
              padding: "6px 12px",
              fontSize: 11.5,
              fontFamily: "'JetBrains Mono', monospace",
              cursor: "pointer"
            }}
          >
            {spike ? "🔥 Spike Active (+50k RPS)" : "⚡ Simulate Traffic Spike"}
          </button>
          <button
            onClick={() => { trackEvent("toggle_node_outage"); setOutage(!outage); }}
            style={{
              background: outage ? "rgba(239, 68, 68, 0.2)" : "rgba(255,255,255,0.04)",
              color: outage ? "#f87171" : TOKENS.paper,
              border: `1px solid ${outage ? "#f87171" : TOKENS.hair}`,
              borderRadius: 4,
              padding: "6px 12px",
              fontSize: 11.5,
              fontFamily: "'JetBrains Mono', monospace",
              cursor: "pointer"
            }}
          >
            {outage ? "⚠️ Failover Active (Frankfurt Out)" : "🚨 Simulate Node Outage"}
          </button>
        </div>
      </div>

      {/* Nodes Status Grid */}
      <Grid min={240}>
        {NODES.map((n) => (
          <div
            key={n.id}
            onClick={() => { trackEvent("inspect_node", { node: n.id }); setInspectNode(n); }}
            style={{
              background: TOKENS.panelAlt,
              border: `1px solid ${n.healthy ? TOKENS.hair : "rgba(239, 68, 68, 0.5)"}`,
              borderRadius: 6,
              padding: 18,
              position: "relative",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: n.healthy ? TOKENS.teal : "#f87171", boxShadow: `0 0 8px ${n.healthy ? TOKENS.teal : "#f87171"}` }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: n.healthy ? TOKENS.brass : "#f87171" }}>{n.status}</span>
            </div>
            <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: 16, color: TOKENS.paper, margin: "0 0 4px" }}>{n.name}</h4>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate, marginBottom: 10 }}>{n.region}</div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>
              <span style={{ color: TOKENS.teal }}>LATENCY: {n.latency}</span>
              <span style={{ color: TOKENS.brass }}>TRAFFIC: {n.share}</span>
            </div>
            {/* Health Bar */}
            <div style={{ marginTop: 12, height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ width: n.share, height: "100%", background: n.healthy ? TOKENS.brass : "#f87171", transition: "width 0.5s ease" }} />
            </div>
            <div style={{ marginTop: 10, fontSize: 11, color: TOKENS.teal, fontFamily: "'JetBrains Mono', monospace", textAlign: "right" }}>
              Inspect Node →
            </div>
          </div>
        ))}
      </Grid>

      {/* Edge Node Telemetry Modal */}
      {inspectNode && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(7, 16, 32, 0.94)", backdropFilter: "blur(12px)", zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center", padding: 20 }}>
          <Card style={{ maxWidth: 580, width: "100%", border: `1px solid ${TOKENS.brass}`, background: TOKENS.panelAlt, padding: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: TOKENS.teal }}>NODE TELEMETRY INSPECTOR</span>
              <button onClick={() => setInspectNode(null)} style={{ background: "transparent", border: "none", color: TOKENS.paper, fontSize: 22, cursor: "pointer" }}>✕</button>
            </div>
            <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 24, margin: "0 0 4px" }}>{inspectNode.name}</h3>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: TOKENS.brass, marginBottom: 16 }}>{inspectNode.region}</div>
            
            <p style={{ color: TOKENS.slate, fontSize: 14.5, lineHeight: 1.6, marginBottom: 20 }}>{inspectNode.details}</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, background: "rgba(255,255,255,0.02)", padding: 16, borderRadius: 6, border: `1px solid ${TOKENS.hair}`, marginBottom: 24 }}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.slate }}>BGP ANYCAST PREFIX</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: TOKENS.paper }}>{inspectNode.bgp}</div>
              </div>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.slate }}>SSL PROTOCOL</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: TOKENS.paper }}>{inspectNode.protocol}</div>
              </div>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.slate }}>PING LATENCY</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: TOKENS.teal }}>{inspectNode.latency}</div>
              </div>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.slate }}>SOCKET POOL</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: TOKENS.brass }}>{inspectNode.sockets}</div>
              </div>
            </div>

            <Button onClick={() => setInspectNode(null)}>Close Telemetry Inspector</Button>
          </Card>
        </div>
      )}
    </Card>
  );
}

/* ---------------------------- Global Nodes & Office Map ---------------------------- */

function GlobalNodeMap() {
  const nodes = [
    { location: "Telangana, India (HQ)", type: "HEADQUARTERS & CORE R&D", ping: "4ms", status: "PRIMARY HUB" },
    { location: "US East (N. Virginia)", type: "MULTI-REGION CLOUD NODE", ping: "12ms", status: "ACTIVE" },
    { location: "EU Central (Frankfurt)", type: "MULTI-REGION CLOUD NODE", ping: "16ms", status: "ACTIVE" },
    { location: "AP South (Singapore)", type: "MULTI-REGION CLOUD NODE", ping: "18ms", status: "ACTIVE" },
  ];

  return (
    <Card>
      <Eyebrow>Global Network Infrastructure</Eyebrow>
      <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, color: TOKENS.paper, margin: "0 0 24px" }}>
        Abhimanyu Technologies Global Node Network
      </h3>

      <Grid min={240}>
        {nodes.map((n) => (
          <div key={n.location} style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4fb3ff", boxShadow: "0 0 8px #4fb3ff" }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.brass }}>{n.status}</span>
            </div>
            <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: 17, color: TOKENS.paper, margin: "0 0 4px" }}>{n.location}</h4>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate, marginBottom: 8 }}>{n.type}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.teal }}>⚡ LATENCY: {n.ping}</div>
          </div>
        ))}
      </Grid>
    </Card>
  );
}

/* ---------------------------- pages ---------------------------- */

function Hero({ go }) {
  const [searchTab, setSearchTab] = useState("products");
  const [searchQuery, setSearchQuery] = useState("");
  const [parsedIntent, setParsedIntent] = useState(null);
  const [location, setLocation] = useState("📍 Chennai");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    trackEvent("ai_intent_search", { query: searchQuery, tab: searchTab });

    const queryLower = searchQuery.toLowerCase();
    const intent = {
      material: queryLower.includes("stainless") ? "Stainless Steel 316" : queryLower.includes("aluminium") ? "Aluminium T6" : "Custom Spec Alloy",
      qty: queryLower.includes("10,000") || queryLower.includes("10000") ? "10,000 Units" : queryLower.includes("5,000") || queryLower.includes("5000") ? "5,000 Units" : "Custom Batch",
      location: queryLower.includes("chennai") ? "Chennai, Tamil Nadu" : queryLower.includes("hyderabad") || queryLower.includes("telangana") ? "Telangana HQ / Hyderabad" : "Pan-India / Global",
      category: searchTab.toUpperCase()
    };
    setParsedIntent(intent);
  };

  const quickActions = [
    { icon: "🛒", label: "Find Products", id: "products", accent: TOKENS.blue },
    { icon: "🛠", label: "Find Services", id: "services", accent: TOKENS.teal },
    { icon: "🏭", label: "Manufacturers", id: "manufacturers", accent: TOKENS.brass },
    { icon: "🏢", label: "Find Business", id: "businesses", accent: "#7C3AED" },
    { icon: "📋", label: "Post Request", id: "rfq-wizard", accent: "#059669" },
  ];

  return (
    <div style={{
      padding: "100px 24px 60px",
      position: "relative",
      overflow: "hidden",
      background: `linear-gradient(160deg, #0B1F3A 0%, #0d2347 40%, #101828 100%)`,
    }}>
      {/* Decorative background grid */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `radial-gradient(rgba(21, 101, 192, 0.15) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        pointerEvents: "none",
      }} />
      {/* Glow blobs */}
      <div style={{ position: "absolute", top: "20%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: "rgba(21, 101, 192, 0.08)", filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: "rgba(0, 168, 150, 0.07)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <span style={{
            background: "rgba(21, 101, 192, 0.2)",
            border: `1px solid rgba(21, 101, 192, 0.4)`,
            borderRadius: 999,
            padding: "5px 14px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: TOKENS.teal,
            letterSpacing: "0.12em",
          }}>
            ● ENTERPRISE B2B MARKETPLACE · INDIA'S LARGEST PLATFORM
          </span>
        </div>

        {/* Main Headline */}
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 600,
          fontSize: "clamp(40px, 7vw, 72px)",
          color: TOKENS.paper,
          lineHeight: 1.0,
          margin: "0 0 8px",
          maxWidth: 800,
          letterSpacing: "-0.01em",
        }}>
          ONE PLATFORM.
        </h1>
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 600,
          fontSize: "clamp(40px, 7vw, 72px)",
          lineHeight: 1.0,
          margin: "0 0 20px",
          maxWidth: 800,
          letterSpacing: "-0.01em",
          background: `linear-gradient(90deg, ${TOKENS.brass} 0%, #00A896 60%, #1565C0 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          EVERY INDUSTRY.
        </h1>
        <p style={{
          color: TOKENS.slate,
          fontSize: "clamp(15px, 2vw, 18px)",
          lineHeight: 1.65,
          margin: "0 0 36px",
          maxWidth: 600,
        }}>
          Products · Services · Businesses · Manufacturing
          <br />
          <span style={{ color: TOKENS.paper, fontWeight: 500 }}>Find anything in 2–3 clicks. Verified suppliers. Instant RFQs.</span>
        </p>

        {/* Search Engine Bar */}
        <div style={{
          background: "rgba(16, 24, 40, 0.90)",
          border: `1px solid rgba(212, 175, 55, 0.35)`,
          borderRadius: 12,
          padding: "18px 20px",
          marginBottom: 28,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
          maxWidth: 820,
        }}>
          {/* Tab row */}
          <div style={{ display: "flex", gap: 6, marginBottom: 14, overflowX: "auto" }}>
            {[
              { id: "products", label: "🛒 Products" },
              { id: "services", label: "🛠 Services" },
              { id: "manufacturers", label: "🏭 Manufacturers" },
              { id: "businesses", label: "🏢 Businesses" },
              { id: "rfq", label: "📋 Post RFQ" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSearchTab(tab.id)}
                style={{
                  background: searchTab === tab.id ? TOKENS.brass : "rgba(255,255,255,0.05)",
                  color: searchTab === tab.id ? TOKENS.ink : TOKENS.slate,
                  border: `1px solid ${searchTab === tab.id ? TOKENS.brass : TOKENS.hair}`,
                  borderRadius: 6,
                  padding: "6px 14px",
                  fontSize: 12,
                  fontFamily: "'JetBrains Mono', monospace",
                  cursor: "pointer",
                  fontWeight: searchTab === tab.id ? "bold" : "normal",
                  whiteSpace: "nowrap",
                  transition: "all 0.15s ease",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search input row */}
          <form onSubmit={handleSearch} style={{ display: "flex", gap: 10, alignItems: "stretch" }}>
            {/* Location selector */}
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: `1px solid ${TOKENS.hair}`,
                borderRadius: 8,
                padding: "10px 12px",
                color: TOKENS.paper,
                fontSize: 13,
                fontFamily: "'Inter', sans-serif",
                cursor: "pointer",
                flexShrink: 0,
                minWidth: 150,
              }}
            >
              {["📍 Chennai", "📍 Telangana", "📍 Hyderabad", "📍 Bengaluru", "📍 Mumbai", "📍 Delhi NCR", "📍 Pune", "📍 Pan-India", "📍 Global"].map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='e.g., "I need 10,000 stainless steel CNC parts in Chennai"'
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.06)",
                border: `1px solid ${TOKENS.hair}`,
                borderRadius: 8,
                padding: "10px 16px",
                color: TOKENS.paper,
                fontSize: 14,
                fontFamily: "'Inter', sans-serif",
              }}
            />
            <button
              type="submit"
              style={{
                background: `linear-gradient(135deg, ${TOKENS.blue} 0%, #1976D2 100%)`,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "10px 22px",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 16px rgba(21, 101, 192, 0.5)",
              }}
            >
              🔍 Search
            </button>
          </form>

          {/* AI Intent Breakdown */}
          {parsedIntent && (
            <div style={{ marginTop: 14, background: "rgba(0, 168, 150, 0.08)", border: `1px solid rgba(0, 168, 150, 0.35)`, borderRadius: 6, padding: "10px 14px" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.teal, marginBottom: 6 }}>🤖 AI INTENT EXTRACTED</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, fontSize: 12, color: TOKENS.paper, fontFamily: "'JetBrains Mono', monospace" }}>
                <span style={{ background: "rgba(255,255,255,0.06)", padding: "3px 8px", borderRadius: 4 }}>SPEC: {parsedIntent.material}</span>
                <span style={{ background: "rgba(255,255,255,0.06)", padding: "3px 8px", borderRadius: 4 }}>QTY: {parsedIntent.qty}</span>
                <span style={{ background: "rgba(255,255,255,0.06)", padding: "3px 8px", borderRadius: 4 }}>📍 {parsedIntent.location}</span>
              </div>
              <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
                <button onClick={() => go("manufacturers")} style={{ background: TOKENS.brass, color: TOKENS.ink, border: "none", borderRadius: 4, padding: "6px 12px", fontSize: 11.5, cursor: "pointer", fontWeight: "bold" }}>Find Matching Manufacturers →</button>
                <button onClick={() => go("rfq-wizard")} style={{ background: "transparent", border: `1px solid ${TOKENS.brass}`, color: TOKENS.brass, borderRadius: 4, padding: "6px 12px", fontSize: 11.5, cursor: "pointer" }}>Auto-Generate RFQ →</button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Action Cards */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
          {quickActions.map((qa) => (
            <button
              key={qa.id}
              onClick={() => go(qa.id)}
              style={{
                background: "rgba(16, 24, 40, 0.85)",
                border: `1px solid rgba(255,255,255,0.12)`,
                borderRadius: 10,
                padding: "14px 20px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                transition: "all 0.2s ease",
                backdropFilter: "blur(12px)",
                minWidth: 110,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = `1px solid ${qa.accent}`;
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = `0 12px 28px rgba(0,0,0,0.4)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = "1px solid rgba(255,255,255,0.12)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span style={{ fontSize: 24 }}>{qa.icon}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate, letterSpacing: "0.04em" }}>{qa.label}</span>
            </button>
          ))}
        </div>

        {/* Trust badges */}
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
          {[
            { icon: "✓", text: "500+ Verified Suppliers" },
            { icon: "✓", text: "ISO Certified Manufacturers" },
            { icon: "✓", text: "Instant RFQ Matching" },
            { icon: "✓", text: "Pan-India + Global Reach" },
          ].map((badge) => (
            <div key={badge.text} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'Inter', sans-serif", fontSize: 13, color: TOKENS.slate }}>
              <span style={{ color: TOKENS.teal, fontWeight: 700 }}>{badge.icon}</span>
              {badge.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function B2BPlatformMetricsStrip({ go }) {
  const stats = [
    { num: "500+", label: "Verified Manufacturers", note: "ISO 9001 & AS9100 Audited", color: TOKENS.brass },
    { num: "$18.4M", label: "Gross RFQ Pipeline", note: "Active buyer sourcing value", color: "#60A5FA" },
    { num: "< 4.2h", label: "Median Quote Turnaround", note: "AI-matched priority bidding", color: TOKENS.teal },
    { num: "99.98%", label: "On-Time Delivery SLA", note: "Contract escrow protection", color: TOKENS.paper },
  ];

  const quickPills = [
    { label: "CNC Machining", id: "manufacturers", icon: "⚙️" },
    { label: "Sheet Metal Fab", id: "manufacturers", icon: "📐" },
    { label: "Electronics & SMT", id: "manufacturers", icon: "⚡" },
    { label: "Injection Molding", id: "manufacturers", icon: "🧪" },
    { label: "Enterprise ERP & AI", id: "products", icon: "💻" },
    { label: "Post a Requirement", id: "rfq-wizard", icon: "📋" },
  ];

  return (
    <div style={{ background: "rgba(16, 24, 40, 0.8)", borderTop: `1px solid ${TOKENS.hair}`, borderBottom: `1px solid ${TOKENS.hair}`, padding: "28px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* KPI Counter Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginBottom: 24 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ borderLeft: `2px solid ${s.color}`, paddingLeft: 14 }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 32, fontWeight: 600, color: s.color, lineHeight: 1.1 }}>{s.num}</div>
              <div style={{ fontSize: 13.5, color: TOKENS.paper, fontWeight: 500, marginTop: 4 }}>{s.label}</div>
              <div style={{ fontSize: 11.5, color: TOKENS.slate, fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>{s.note}</div>
            </div>
          ))}
        </div>

        {/* 1-Click Directory Launchers */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", paddingTop: 16, borderTop: `1px solid rgba(255,255,255,0.06)` }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate, marginRight: 6 }}>DIRECTORIES:</span>
          {quickPills.map((p) => (
            <button
              key={p.label}
              onClick={() => go(p.id)}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${TOKENS.hair}`,
                borderRadius: 999,
                padding: "6px 14px",
                fontSize: 12.5,
                color: TOKENS.paper,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "all 0.15s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = TOKENS.brass;
                e.currentTarget.style.background = "rgba(212,175,55,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = TOKENS.hair;
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              }}
            >
              <span>{p.icon}</span>
              <span>{p.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function HomePage({ go }) {
  return (
    <>
      <TelemetryTicker />
      <Hero go={go} />
      <B2BPlatformMetricsStrip go={go} />
      <ArcDivider />

      <Section eyebrow="Cybernetic Media Reel" title="Watch Abhimanyu platform in action" tight>
        <VideoShowcase3D />
      </Section>

      <Section alt eyebrow="Client Impact Stories" title="Quantifiable Enterprise Outcomes" tight>
        <ClientTestimonials />
      </Section>

      <Section eyebrow="Traffic Management" title="Global Edge Load Balancer & Traffic Director" tight>
        <LoadBalancerDashboard />
      </Section>

      <Section alt eyebrow="System Architecture" title="4-Layer Enterprise Stack" tight>
        <Architecture3DExplorer />
      </Section>

      <Section eyebrow="3D Data Flow" title="Real-Time Data Pipeline Stream" tight>
        <DataPipeline3D />
      </Section>

      <Section alt eyebrow="Interactive CLI" title="AI System Command Console" tight>
        <AICommandConsole />
      </Section>

      <Section eyebrow="Security & Governance" title="Audited Enterprise Security" tight>
        <SecurityStatusDashboard />
      </Section>

      <Section alt eyebrow="Technology Matrix" title="Enterprise Technology Stack" tight>
        <TechStackExplorer />
      </Section>

      <Section eyebrow="What We Do" title="Technology that solves a named problem" tight>
        <Grid min={250}>
          {WHAT_WE_DO.map((w) => (
            <Card key={w.title}>
              <Icon3D geometry={w.icon} size={48} />
              <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 20, margin: "14px 0 10px" }}>{w.title}</h3>
              <p style={{ color: TOKENS.slate, fontSize: 15, lineHeight: 1.6, margin: 0 }}>{w.desc}</p>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section alt eyebrow="Global Operations" title="Multi-Region Node Network" tight>
        <GlobalNodeMap />
      </Section>

      <Section alt eyebrow="ROI & Impact" title="Quantifiable efficiency gains" tight>
        <ROICalculator />
      </Section>

      <Section alt eyebrow="Products" title="Software MyVault builds and maintains" sub="Reusable platforms, not one-off projects — each one supported after you buy it." tight>
        <Grid min={260}>
          {PRODUCTS.slice(0, 3).map((p) => (
            <Card key={p.key}>
              <Icon3D geometry={p.icon} size={44} />
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.1em", color: TOKENS.teal, margin: "12px 0 10px" }}>{p.tag.toUpperCase()}</div>
              <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 19, margin: "0 0 8px" }}>{p.name}</h3>
              <p style={{ color: TOKENS.slate, fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
            </Card>
          ))}
        </Grid>
        <div style={{ marginTop: 28 }}>
          <Button variant="ghost" onClick={() => go("products")}>See all products →</Button>
        </div>
      </Section>

      <Section eyebrow="Industries" title="Built for how your industry actually works" tight>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {INDUSTRIES.map((ind) => (
            <button
              key={ind.name}
              onClick={() => go("industries")}
              style={{ background: "transparent", border: `1px solid ${TOKENS.hair}`, color: TOKENS.paper, padding: "10px 18px", borderRadius: 999, fontSize: 14, cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = TOKENS.brass)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = TOKENS.hair)}
            >
              {ind.name}
            </button>
          ))}
        </div>
      </Section>

      <Section alt eyebrow="Why MyVault" title="What we hold ourselves to" sub="Hover a card to flip it." tight>
        <Grid min={200}>
          {WHY.map((w) => <FlipCard key={w.title} title={w.title} desc={w.desc} icon={w.icon} />)}
        </Grid>
      </Section>

      <CTA go={go} />
    </>
  );
}

/* Analytics Event Tracker Helper */
const trackEvent = (eventName, data = {}) => {
  try {
    const log = JSON.parse(localStorage.getItem("abhimanu_analytics") || "[]");
    log.push({ eventName, data, timestamp: new Date().toISOString() });
    localStorage.setItem("abhimanu_analytics", JSON.stringify(log.slice(-100)));
    console.log(`[Analytics Tracked] ${eventName}:`, data);
  } catch (e) {
    // Ignore storage errors
  }
};

/* ---------------------------- Enhanced Sub-Pages ---------------------------- */

function AboutPage({ go }) {
  useEffect(() => { trackEvent("view_about_page"); }, []);

  const TIMELINE = [
    { year: "2020", title: "Foundation", desc: "Abhimanyu Technologies founded in Telangana, India with a vision to build resilient enterprise software." },
    { year: "2022", title: "Multi-Region Cloud Scale", desc: "Expanded architecture practice across APAC & North America, deploying high-availability cloud platforms." },
    { year: "2024", title: "AI & Neural Lab", desc: "Launched dedicated Artificial Intelligence and Data Engineering practice for enterprise automation." },
    { year: "2026", title: "Global Enterprise Partner", desc: "Serving 100+ global clients across FinTech, Healthcare, Logistics, and E-Commerce with 99.999% uptime." }
  ];

  const LEADERSHIP = [
    { name: "Shiva", role: "FOUNDER & CEO", focus: "Corporate Strategy, Global Scaling & Operations", bio: "Founded Abhimanyu Technologies to build software products and digital platforms that hold up under real enterprise load." },
    { name: "Abhimanyu", role: "CO-FOUNDER & CTO", focus: "Artificial Intelligence, Neural Architectures & Systems Engineering", bio: "Leads engineering strategy, proprietary AI model fine-tuning, zero-trust cloud infrastructure, and core software architecture." },
    { name: "Ananya Verma", role: "VP OF ENGINEERING", focus: "Enterprise Software & Microservices", bio: "Over 12 years directing large-scale distributed systems and cloud migrations for Fortune 500 partners." },
    { name: "Rajesh Kumar", role: "HEAD OF CYBERSECURITY", focus: "Zero-Trust Architecture & Compliance", bio: "Directs SOC2 Type II, ISO 27001 compliance and penetration testing across all client deployments." }
  ];

  return (
    <>
      <Section eyebrow="About Abhimanyu Technologies" title="Software built by engineers who take pride in stability">
        <p style={{ color: TOKENS.slate, fontSize: 17, lineHeight: 1.75, maxWidth: 780 }}>
          Abhimanyu Technologies is an enterprise technology company building software products, AI systems, and digital
          platforms for organizations that require absolute reliability. Sloganed with <strong style={{ color: TOKENS.brass }}>"Scale Your Business"</strong>,
          we combine deep engineering discipline with modern cloud & AI architectures.
        </p>
      </Section>

      <Section alt eyebrow="Mission & Vision" title="Our Core Purpose" tight>
        <Grid min={280}>
          <Card>
            <div style={{ color: TOKENS.brass, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, marginBottom: 12, letterSpacing: "0.1em" }}>OUR MISSION</div>
            <h3 style={{ color: TOKENS.paper, fontFamily: "'Fraunces', serif", fontSize: 22, margin: "0 0 10px" }}>Empower Enterprise Growth</h3>
            <p style={{ color: TOKENS.slate, fontSize: 15, lineHeight: 1.65, margin: 0 }}>Build technology that businesses can depend on, engineered with the exact care and security we demand for our own critical operations.</p>
          </Card>
          <Card>
            <div style={{ color: TOKENS.teal, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, marginBottom: 12, letterSpacing: "0.1em" }}>OUR VISION</div>
            <h3 style={{ color: TOKENS.paper, fontFamily: "'Fraunces', serif", fontSize: 22, margin: "0 0 10px" }}>Global Architecture Standard</h3>
            <p style={{ color: TOKENS.slate, fontSize: 15, lineHeight: 1.65, margin: 0 }}>To be the premier global technology partner growing businesses call before a technical bottleneck occurs, not after an outage.</p>
          </Card>
        </Grid>
      </Section>

      <Section eyebrow="Company Growth" title="Journey & Milestones" tight>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {TIMELINE.map((t) => (
            <Card key={t.year} style={{ position: "relative" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 28, fontWeight: "bold", color: TOKENS.brass, marginBottom: 8 }}>{t.year}</div>
              <h4 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 18, margin: "0 0 8px" }}>{t.title}</h4>
              <p style={{ color: TOKENS.slate, fontSize: 14, lineHeight: 1.6, margin: 0 }}>{t.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section alt eyebrow="Leadership" title="Executive Leadership Team" tight>
        <Grid min={260}>
          {LEADERSHIP.map((m) => (
            <Card key={m.name}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.teal, marginBottom: 8, letterSpacing: "0.08em" }}>{m.role}</div>
              <h4 style={{ color: TOKENS.paper, fontFamily: "'Fraunces', serif", fontSize: 22, margin: "0 0 4px" }}>{m.name}</h4>
              <div style={{ color: TOKENS.brass, fontSize: 13, marginBottom: 12, fontWeight: 500 }}>{m.focus}</div>
              <p style={{ color: TOKENS.slate, fontSize: 14, lineHeight: 1.6, margin: 0 }}>{m.bio}</p>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section eyebrow="Engineering Manifesto" title="Architectural Principles We Uphold" tight>
        <Grid min={260}>
          {[
            { title: "Reliability Over Novelty", desc: "We favor battle-tested boring technologies for core ledgers and stateful storage. Experimental stacks stay in sandbox environments.", badge: "RESILIENCE" },
            { title: "Zero-Knowledge By Default", desc: "Data isolation with AES-256 multi-region encryption, strict RBAC permissions, and automated key rotation across all cloud origins.", badge: "SECURITY" },
            { title: "Radical Telemetry & Observability", desc: "Every API call, message queue, and database transaction is metered with synthetic distributed tracing. Alerts trigger before customers notice.", badge: "MONITORING" },
            { title: "Code Built to Last", desc: "We write clean, strictly typed, modular architectures intended to be extended over 5+ years without technical debt or rewrites.", badge: "ENGINEERING" }
          ].map((v) => (
            <Card key={v.title}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: TOKENS.teal, marginBottom: 8, letterSpacing: "0.08em" }}>{v.badge}</div>
              <h4 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 19, margin: "0 0 8px" }}>{v.title}</h4>
              <p style={{ color: TOKENS.slate, fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>{v.desc}</p>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section alt eyebrow="Global Infrastructure" title="12 Anycast Edge POPs Across 4 Continents" tight>
        <div style={{ background: "rgba(16, 24, 40, 0.8)", border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: 28, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 26, color: TOKENS.brass }}>Telangana HQ</div>
            <div style={{ fontSize: 12, color: TOKENS.teal, fontFamily: "'JetBrains Mono', monospace", marginTop: 4 }}>PRIMARY R&D & SYSTEM NOC</div>
            <p style={{ color: TOKENS.slate, fontSize: 13, lineHeight: 1.5, marginTop: 8 }}>Core microservices engineering, neural AI lab, and tier-1 multi-cloud routing orchestrator.</p>
          </div>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 26, color: "#60A5FA" }}>APAC Core</div>
            <div style={{ fontSize: 12, color: TOKENS.teal, fontFamily: "'JetBrains Mono', monospace", marginTop: 4 }}>SINGAPORE · CHENNAI · TOKYO</div>
            <p style={{ color: TOKENS.slate, fontSize: 13, lineHeight: 1.5, marginTop: 8 }}>Sub-8ms regional Edge POPs serving Southeast Asia, Indian industrial corridors, and East Asia.</p>
          </div>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 26, color: TOKENS.paper }}>EMEA & Americas</div>
            <div style={{ fontSize: 12, color: TOKENS.teal, fontFamily: "'JetBrains Mono', monospace", marginTop: 4 }}>FRANKFURT · LONDON · N. VIRGINIA</div>
            <p style={{ color: TOKENS.slate, fontSize: 13, lineHeight: 1.5, marginTop: 8 }}>High-throughput transatlantic transit nodes with full SOC2 Type II and GDPR data boundary compliance.</p>
          </div>
        </div>
      </Section>

      <CTA go={go} label="Work With Our Team" />
    </>
  );
}

function ServicesPage({ go }) {
  const [activeKey, setActiveKey] = useState(SERVICE_CATEGORIES[0].key);
  useEffect(() => { trackEvent("view_services_page", { category: activeKey }); }, [activeKey]);
  const cat = SERVICE_CATEGORIES.find((c) => c.key === activeKey) || SERVICE_CATEGORIES[0];

  return (
    <>
      <Section eyebrow="Services & Solutions" title="Enterprise Engineering Disciplines" sub="Select a practice area to review the challenge, architectural solution, and deliverables.">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 36 }}>
          {SERVICE_CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveKey(c.key)}
              style={{
                background: activeKey === c.key ? TOKENS.brass : "rgba(255, 255, 255, 0.03)",
                color: activeKey === c.key ? TOKENS.ink : TOKENS.paper,
                border: `1px solid ${activeKey === c.key ? TOKENS.brass : TOKENS.hair}`,
                borderRadius: 999, padding: "10px 18px", fontSize: 13.5, cursor: "pointer", fontWeight: activeKey === c.key ? 700 : 400,
                transition: "all 0.2s ease"
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        <Card style={{ padding: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 20 }}>
            <div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.teal, letterSpacing: "0.1em" }}>PRACTICE OVERVIEW</span>
              <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 28, margin: "6px 0 8px" }}>{cat.label}</h3>
              <p style={{ color: TOKENS.slate, fontSize: 16, maxWidth: 700, margin: 0 }}>{cat.blurb}</p>
            </div>
            <Button onClick={() => go("contact")}>Schedule Consultation →</Button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, margin: "28px 0" }}>
            <div style={{ background: "rgba(239, 68, 68, 0.06)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: 6, padding: 20 }}>
              <h4 style={{ color: "#f87171", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, marginTop: 0, marginBottom: 8 }}>COMMON INDUSTRY CHALLENGE</h4>
              <p style={{ color: TOKENS.paper, fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>{cat.problem}</p>
            </div>
            <div style={{ background: "rgba(79, 179, 255, 0.06)", border: "1px solid rgba(79, 179, 255, 0.2)", borderRadius: 6, padding: 20 }}>
              <h4 style={{ color: TOKENS.teal, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, marginTop: 0, marginBottom: 8 }}>ENGINEERED OUTCOME</h4>
              <p style={{ color: TOKENS.paper, fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>{cat.outcome}</p>
            </div>
          </div>

          <h4 style={{ color: TOKENS.brass, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: "0.08em", marginBottom: 14 }}>DELIVERABLES & CAPABILITIES</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {cat.items.map((item) => (
              <span key={item} style={{ background: "rgba(255, 255, 255, 0.03)", border: `1px solid ${TOKENS.hair}`, borderRadius: 4, padding: "8px 14px", fontSize: 13.5, color: TOKENS.paper }}>
                {item}
              </span>
            ))}
          </div>
        </Card>
      </Section>

      <Section eyebrow="Scoping & Velocity Estimator" title="Interactive Engineering Scope Calculator" sub="Estimate team squad size, delivery velocity, and architectural milestones for your project.">
        <InteractiveScopingEstimator go={go} />
      </Section>

      <Section alt eyebrow="Solutions by Objective" title="Targeted Business Outcomes" tight>
        <Grid min={260}>
          {SOLUTIONS.map((s) => (
            <Card key={s.title}>
              <h4 style={{ color: TOKENS.paper, fontFamily: "'Fraunces', serif", fontSize: 18, marginBottom: 8 }}>{s.title}</h4>
              <p style={{ color: TOKENS.slate, fontSize: 14, lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
            </Card>
          ))}
        </Grid>
      </Section>
      <CTA go={go} label="Discuss Your Custom Architecture" />
    </>
  );
}

function InteractiveScopingEstimator({ go }) {
  const [scopeType, setScopeType] = useState("full");
  const [tier, setTier] = useState("ha");
  const [compliance, setCompliance] = useState("soc2");

  const scopes = {
    mvp: { title: "MVP / Rapid Prototype", weeks: "4–6 Weeks", team: "Lead Architect + 2 Full-Stack Engineers", costRange: "$20,000 – $35,000" },
    full: { title: "Enterprise Platform Build", weeks: "10–14 Weeks", team: "Staff Architect + 4 Engineers + QA Lead + DevOps", costRange: "$50,000 – $95,000" },
    infra: { title: "Anycast & Edge Migration", weeks: "6–8 Weeks", team: "Cloud Infrastructure Lead + 2 SRE Engineers", costRange: "$30,000 – $48,000" },
    partner: { title: "Ongoing Dedicated Pod", weeks: "Annual Retainer", team: "Dedicated 6-Person Engineering Pod", costRange: "$15,000 / month" }
  };

  const selected = scopes[scopeType];

  return (
    <Card style={{ padding: 32 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28 }}>
        {/* Left: Interactive Selectors */}
        <div>
          <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.brass, marginBottom: 10, letterSpacing: "0.08em" }}>
            1. PROJECT SCOPE & OBJECTIVE
          </label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
            {Object.entries(scopes).map(([k, v]) => (
              <button
                key={k}
                onClick={() => setScopeType(k)}
                style={{
                  textAlign: "left",
                  background: scopeType === k ? "rgba(21, 101, 192, 0.15)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${scopeType === k ? TOKENS.blue : TOKENS.hair}`,
                  borderRadius: 6,
                  padding: "10px 14px",
                  color: scopeType === k ? TOKENS.paper : TOKENS.slate,
                  fontSize: 13.5,
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <span>{v.title}</span>
                <span style={{ fontSize: 11, color: scopeType === k ? TOKENS.teal : TOKENS.slate, fontFamily: "'JetBrains Mono', monospace" }}>{v.weeks}</span>
              </button>
            ))}
          </div>

          <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.brass, marginBottom: 10, letterSpacing: "0.08em" }}>
            2. HIGH-AVAILABILITY & SECURITY GRADE
          </label>
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            {[
              { id: "std", label: "Standard Cloud (99.9%)" },
              { id: "ha", label: "Multi-Region Anycast (99.99%)" },
              { id: "zero", label: "Zero-Knowledge Defense" }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTier(t.id)}
                style={{
                  flex: 1,
                  background: tier === t.id ? "rgba(0,168,150,0.12)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${tier === t.id ? TOKENS.teal : TOKENS.hair}`,
                  borderRadius: 6,
                  padding: "8px 10px",
                  color: tier === t.id ? TOKENS.teal : TOKENS.slate,
                  fontSize: 12,
                  fontFamily: "'JetBrains Mono', monospace",
                  cursor: "pointer"
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Calculated Architectural Blueprint Envelope */}
        <div style={{ background: "rgba(11, 31, 58, 0.7)", border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.teal, marginBottom: 6 }}>
              ESTIMATED SCOPE ENVELOPE
            </div>
            <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 22, margin: "0 0 16px" }}>
              {selected.title}
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, borderTop: `1px solid ${TOKENS.hair}`, paddingTop: 16, marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5 }}>
                <span style={{ color: TOKENS.slate }}>Target Velocity:</span>
                <span style={{ color: TOKENS.paper, fontWeight: 600 }}>{selected.weeks}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5 }}>
                <span style={{ color: TOKENS.slate }}>Engineering Pod:</span>
                <span style={{ color: TOKENS.paper, textAlign: "right", maxWidth: 200 }}>{selected.team}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5 }}>
                <span style={{ color: TOKENS.slate }}>Infrastructure SLA:</span>
                <span style={{ color: TOKENS.teal }}>
                  {tier === "std" ? "99.9% Uptime" : tier === "ha" ? "99.99% Anycast Edge" : "Zero-Trust Military Grade"}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, borderTop: `1px solid ${TOKENS.hair}`, paddingTop: 10 }}>
                <span style={{ color: TOKENS.slate }}>Budget Envelope:</span>
                <span style={{ color: TOKENS.brass, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
                  {selected.costRange}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <Button onClick={() => go("contact")}>
              Lock Scope & Request Scoping Brief →
            </Button>
            <Button variant="ghost" onClick={() => go("rfq-wizard")}>
              Post as RFQ
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function ProductsPage({ go, currency = "INR" }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productTab, setProductTab] = useState("overview");

  const renderPlanPrice = (rawPrice) => {
    if (!rawPrice || rawPrice === "Custom" || currency === "INR") return rawPrice;
    const match = rawPrice.match(/₹([\d,]+)(.*)/);
    if (!match) return rawPrice;
    const num = parseInt(match[1].replace(/,/g, ""), 10);
    const suffix = match[2] || "";
    return `${formatPrice(num, currency)}${suffix}`;
  };

  const PRODUCT_DETAILS = {
    erp: {
      tagline: "Unified Operations Platform",
      overview: "Abhimanyu ERP unifies procurement, inventory, finance, HR, and operations into a single real-time data platform. Built for manufacturers, distributors, and enterprise service organizations.",
      features: [
        "Real-time multi-warehouse inventory tracking",
        "AI-powered demand forecasting & auto-reorder",
        "GST-compliant invoicing & e-Way Bill generation",
        "Multi-currency & multi-branch support",
        "Role-based access control with audit trails",
        "Custom workflow automation builder",
      ],
      specs: ["Cloud-hosted: AWS / Azure", "Uptime SLA: 99.95%", "Data encryption: AES-256", "API: REST & GraphQL", "Mobile: iOS & Android apps", "Integrations: Tally, SAP, QuickBooks"],
      pricing: [
        { plan: "Starter", price: "₹4,999/mo", users: "Up to 10 users", notes: "Core modules: Inventory, Invoicing, HR" },
        { plan: "Growth", price: "₹14,999/mo", users: "Up to 50 users", notes: "Full ERP + AI forecasting + API access" },
        { plan: "Enterprise", price: "Custom", users: "Unlimited", notes: "On-premise / private cloud + SLA + custom modules" },
      ]
    },
    crm: {
      tagline: "Sales & Lead Intelligence Platform",
      overview: "Abhimanyu CRM gives sales teams real-time pipeline visibility, AI lead scoring, and automated follow-up sequences — engineered for B2B industrial and enterprise sales cycles.",
      features: [
        "360° customer profile with interaction history",
        "AI lead scoring & priority ranking",
        "Multi-stage pipeline with drag-drop management",
        "Automated email & WhatsApp follow-up sequences",
        "Sales performance analytics & team leaderboards",
        "RFQ & quote tracking integration",
      ],
      specs: ["Web app + Mobile", "CRM API: REST", "Integrations: Gmail, Outlook, WhatsApp Business", "Data export: CSV / Excel / PDF", "Uptime SLA: 99.9%", "GDPR-ready data handling"],
      pricing: [
        { plan: "Team", price: "₹2,999/mo", users: "Up to 5 users", notes: "Pipeline + Contact DB + Email sequences" },
        { plan: "Business", price: "₹8,999/mo", users: "Up to 25 users", notes: "AI scoring + WhatsApp + full analytics" },
        { plan: "Enterprise", price: "Custom", users: "Unlimited", notes: "SSO, custom integrations, dedicated CSM" },
      ]
    },
    hrms: {
      tagline: "Human Capital Management Platform",
      overview: "Full-stack HR platform covering recruitment, onboarding, payroll, attendance, and performance management — with India-specific statutory compliance built in.",
      features: [
        "Biometric & geo-fence attendance tracking",
        "Automated payroll with PF, ESI, TDS compliance",
        "Recruitment pipeline + JD builder + offer letters",
        "Employee self-service portal",
        "Performance review cycles & OKR tracking",
        "Leave management & holiday calendar",
      ],
      specs: ["Mobile app: iOS + Android", "Biometric SDK integration", "Payroll: India statutory compliant", "Exports: Form 16, PF ECR, ESI challan", "MIS reports: Excel / PDF", "Uptime SLA: 99.9%"],
      pricing: [
        { plan: "Basic", price: "₹199/employee/mo", users: "Min. 10 employees", notes: "Attendance + Payroll + Leave" },
        { plan: "Pro", price: "₹349/employee/mo", users: "Any size", notes: "Full HRMS + Performance + Recruitment" },
        { plan: "Enterprise", price: "Custom", users: "1000+ employees", notes: "On-premise + custom compliance + API" },
      ]
    },
    ai: {
      tagline: "Enterprise AI Automation Platform",
      overview: "Deploy production-grade AI workflows — document intelligence, predictive analytics, NLP chatbots, and computer vision — without needing an internal ML team.",
      features: [
        "Pre-trained models: invoice OCR, fraud detection, demand forecasting",
        "No-code AI workflow builder",
        "LLM integration: GPT-4, Claude, Gemini via unified API",
        "Real-time inference API (<10ms p95 latency)",
        "Custom model fine-tuning on your data",
        "AI audit trail for compliance & explainability",
      ],
      specs: ["Runtime: ONNX + TensorRT", "Latency: sub-10ms p95", "Uptime: 99.99% edge-deployed", "API: REST + gRPC", "Security: SOC2-ready audit logs", "Languages: Python, Node.js SDKs"],
      pricing: [
        { plan: "Developer", price: "₹9,999/mo", users: "1M API calls/mo", notes: "Pre-trained models + REST API access" },
        { plan: "Business", price: "₹39,999/mo", users: "10M API calls/mo", notes: "Custom fine-tuning + SLA + monitoring" },
        { plan: "Enterprise", price: "Custom", users: "Unlimited", notes: "On-premise deployment + dedicated GPUs" },
      ]
    },
    iot: {
      tagline: "Industrial IoT Fleet Manager",
      overview: "Real-time monitoring, predictive maintenance, and remote control for industrial machinery, vehicle fleets, and connected devices — all in one unified dashboard.",
      features: [
        "Real-time sensor telemetry at 1-second intervals",
        "Predictive maintenance ML alerts",
        "Geo-fencing & location tracking for fleets",
        "OTA firmware update management",
        "Custom alert rules & escalation workflows",
        "Digital twin simulation dashboard",
      ],
      specs: ["Protocols: MQTT, Modbus, OPC-UA, HTTP", "Edge compute: Raspberry Pi, ESP32, STM32", "Cloud: AWS IoT Core, Azure IoT Hub", "Dashboard refresh: 1s real-time", "Data retention: 5 years", "Uptime SLA: 99.95%"],
      pricing: [
        { plan: "Starter", price: "₹499/device/mo", users: "Up to 50 devices", notes: "Telemetry + alerts + basic dashboard" },
        { plan: "Fleet", price: "₹299/device/mo", users: "50–500 devices", notes: "Predictive maintenance + OTA + geo" },
        { plan: "Industrial", price: "Custom", users: "500+ devices", notes: "On-premise edge + SLA + integration" },
      ]
    }
  };

  const getProductDetails = (productKey) => {
    return PRODUCT_DETAILS[productKey] || PRODUCT_DETAILS["erp"];
  };

  const PRODUCT_TABS = [
    { id: "overview", label: "Overview" },
    { id: "features", label: "Features" },
    { id: "specs", label: "Tech Specs" },
    { id: "pricing", label: "Pricing" },
  ];

  const detail = selectedProduct ? getProductDetails(selectedProduct.key) : null;

  return (
    <>
      <Section eyebrow="Products & Platforms" title="Proprietary Platforms Built by Abhimanyu" sub="Turnkey, supported software platforms designed to replace fragmented legacy vendor stacks.">
        <Grid min={280}>
          {PRODUCTS.map((p) => (
            <Card key={p.key} style={{ cursor: "pointer", transition: "all 0.2s ease" }}>
              <Icon3D geometry={p.icon} size={48} />
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.1em", color: TOKENS.teal, margin: "14px 0 10px" }}>{p.tag.toUpperCase()}</div>
              <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 22, margin: "0 0 10px" }}>{p.name}</h3>
              <p style={{ color: TOKENS.slate, fontSize: 14.5, lineHeight: 1.6, margin: "0 0 20px" }}>{p.desc}</p>
              <div style={{ display: "flex", gap: 10 }}>
                <Button onClick={() => { setSelectedProduct(p); setProductTab("overview"); }}>View Details →</Button>
                <Button variant="ghost" onClick={() => go("contact")}>Get Demo</Button>
              </div>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* Product Detail Modal */}
      {selectedProduct && detail && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(7, 16, 32, 0.93)", backdropFilter: "blur(18px)", zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center", padding: 20 }}>
          <div style={{ maxWidth: 780, width: "100%", maxHeight: "90vh", overflowY: "auto", background: TOKENS.panelAlt, border: `1px solid rgba(21,101,192,0.4)`, borderRadius: 12, boxShadow: "0 32px 80px rgba(0,0,0,0.8)" }}>
            {/* Header */}
            <div style={{ background: `linear-gradient(135deg, #0a1929 0%, ${TOKENS.panelAlt} 100%)`, padding: "28px 32px 0", borderBottom: `1px solid ${TOKENS.hair}`, borderRadius: "12px 12px 0 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 10, background: "rgba(21,101,192,0.15)", border: `1px solid rgba(21,101,192,0.3)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>📦</div>
                  <div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.teal, marginBottom: 4, letterSpacing: "0.1em" }}>{selectedProduct.tag.toUpperCase()}</div>
                    <h2 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 24, margin: "0 0 4px" }}>{selectedProduct.name}</h2>
                    <div style={{ fontSize: 13.5, color: TOKENS.slate }}>{detail.tagline}</div>
                  </div>
                </div>
                <button onClick={() => setSelectedProduct(null)} style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${TOKENS.hair}`, color: TOKENS.paper, fontSize: 18, cursor: "pointer", width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✕</button>
              </div>

              {/* Tab Bar */}
              <div style={{ display: "flex", gap: 2 }}>
                {PRODUCT_TABS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setProductTab(t.id)}
                    style={{
                      background: "transparent", border: "none",
                      borderBottom: `2px solid ${productTab === t.id ? TOKENS.teal : "transparent"}`,
                      color: productTab === t.id ? TOKENS.teal : TOKENS.slate,
                      fontSize: 13, fontFamily: "'JetBrains Mono', monospace",
                      padding: "8px 18px 10px", cursor: "pointer", whiteSpace: "nowrap",
                      fontWeight: productTab === t.id ? 700 : 400, transition: "all 0.15s ease",
                    }}
                  >{t.label}</button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div style={{ padding: 32 }}>
              {productTab === "overview" && (
                <div>
                  <p style={{ color: TOKENS.slate, fontSize: 15.5, lineHeight: 1.75, marginBottom: 24 }}>{detail.overview}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {detail.features.slice(0, 4).map((f, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, background: "rgba(0,168,150,0.05)", border: `1px solid rgba(0,168,150,0.15)`, borderRadius: 6, padding: "10px 14px" }}>
                        <span style={{ color: TOKENS.teal, fontWeight: "bold", flexShrink: 0 }}>✓</span>
                        <span style={{ color: TOKENS.paper, fontSize: 13.5 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {productTab === "features" && (
                <div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 20, margin: "0 0 16px" }}>Full Feature Set</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {detail.features.map((f, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.03)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "12px 16px" }}>
                        <span style={{ color: TOKENS.teal, fontSize: 16, flexShrink: 0 }}>✓</span>
                        <span style={{ color: TOKENS.paper, fontSize: 14 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {productTab === "specs" && (
                <div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 20, margin: "0 0 16px" }}>Technical Specifications</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {detail.specs.map((s, i) => {
                      const [label, val] = s.includes(":") ? s.split(":") : [s, ""];
                      return (
                        <div key={i} style={{ background: "rgba(21,101,192,0.06)", border: `1px solid rgba(21,101,192,0.2)`, borderRadius: 6, padding: "12px 16px" }}>
                          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.slate, marginBottom: 4 }}>{label.trim().toUpperCase()}</div>
                          <div style={{ color: TOKENS.paper, fontSize: 13.5, fontWeight: 500 }}>{val.trim() || s}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {productTab === "pricing" && (
                <div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 20, margin: "0 0 16px" }}>Pricing Plans</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
                    {detail.pricing.map((plan, i) => (
                      <div key={i} style={{
                        background: i === 1 ? "rgba(21,101,192,0.12)" : "rgba(255,255,255,0.03)",
                        border: `1px solid ${i === 1 ? "rgba(21,101,192,0.4)" : TOKENS.hair}`,
                        borderRadius: 8, padding: 20,
                        boxShadow: i === 1 ? "0 0 0 1px rgba(21,101,192,0.2), 0 8px 24px rgba(0,0,0,0.3)" : "none"
                      }}>
                        {i === 1 && <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.teal, marginBottom: 8, letterSpacing: "0.1em" }}>MOST POPULAR</div>}
                        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, color: TOKENS.paper, marginBottom: 4 }}>{plan.plan}</div>
                        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 26, color: TOKENS.brass, marginBottom: 8, fontWeight: 600 }}>{renderPlanPrice(plan.price)}</div>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.teal, marginBottom: 10 }}>{plan.users}</div>
                        <div style={{ color: TOKENS.slate, fontSize: 13, lineHeight: 1.5 }}>{plan.notes}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div style={{ marginTop: 28, paddingTop: 24, borderTop: `1px solid ${TOKENS.hair}`, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Button onClick={() => { setSelectedProduct(null); go("contact"); }}>Request Demo & Pricing →</Button>
                <Button variant="ghost" onClick={() => go("rfq-wizard")}>Get Custom Quote</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Section alt eyebrow="Technology Stack" title="Core Engineering Stack" tight>
        <Grid min={200}>
          {TECH.map((t) => (
            <div key={t.group}>
              <h4 style={{ color: TOKENS.brass, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: "0.08em", marginBottom: 10 }}>{t.group.toUpperCase()}</h4>
              <p style={{ color: TOKENS.paper, fontSize: 14.5, lineHeight: 1.8, margin: 0 }}>{t.items.join(" · ")}</p>
            </div>
          ))}
        </Grid>
      </Section>
      <CTA go={go} />
    </>
  );
}

function IndustriesPage({ go }) {
  const [activeInd, setActiveInd] = useState("mfg");

  const INDUSTRY_BLUEPRINTS = {
    mfg: {
      id: "mfg",
      name: "Manufacturing & Industry 4.0",
      tagline: "Sensor-to-Cloud Telemetry & Predictive OEE",
      compliance: ["ISO 9001:2015", "IEC 62443 (OT Security)", "OPC-UA / Modbus TCP"],
      challenge: "Isolated machine PLCs, manual whiteboard scrap tracking, and unplanned spindle/motor bearing downtime.",
      blueprint: "Edge micro-gateways running on industrial ARM/x86 hardware collect vibrational and thermal telemetry via MQTT/Modbus. In-line ONNX anomaly models predict mechanical failure 36 hours prior to seizure, automatically generating maintenance work orders in Abhimanyu ERP.",
      metric: "-78% Unplanned downtime · +14.2% Overall Equipment Effectiveness (OEE)",
      stack: "Raspberry Pi CM4 · TimescaleDB · Grafana · ONNX · gRPC · Docker Edge"
    },
    fin: {
      id: "fin",
      name: "Banking, FinTech & Insurance",
      tagline: "Sub-10ms Fraud Prevention & Core Ledger Integrity",
      compliance: ["PCI-DSS Level 1", "SOC2 Type II", "RBI / ISO 27001", "FIPS 140-2"],
      challenge: "High checkout abandonment due to manual KYC reviews and legacy batch fraud detection causing elevated chargeback exposure.",
      blueprint: "Zero-knowledge distributed ledger with sub-8ms inline neural risk evaluation at Anycast edge POPs. Multi-region PostgreSQL with active-active synchronous replication guarantees zero double-spend anomalies even under network partition.",
      metric: "99.999% High-Availability SLA · -91% Fraudulent transactions",
      stack: "Rust · Go · Python PyTorch · PostgreSQL Citus · Redis Cluster · AWS KMS"
    },
    health: {
      id: "health",
      name: "Healthcare & MedTech Systems",
      tagline: "HIPAA Compliant Telemetry & Real-Time Patient Analytics",
      compliance: ["HIPAA / HITECH", "HL7 FHIR v4", "FDA 21 CFR Part 11", "ISO 13485"],
      challenge: "Unintegrated electronic health records (EHR), non-compliant patient data transmission, and delayed vitals telemetry during emergency care.",
      blueprint: "End-to-end encrypted WebSocket gateways streaming biometric vitals with AES-256 field-level column encryption. Automated FHIR resource adapters ingest hospital feeds into scalable clinical research data lakes.",
      metric: "100% Audit trail coverage · Sub-200ms vital sign alarm dispatch",
      stack: "React Native · Node.js · Kafka · AWS MedTech VPC · PostgreSQL · Docker"
    },
    logistics: {
      id: "logistics",
      name: "Logistics, Cold-Chain & Fleet Operations",
      tagline: "Dynamic Geospatial Routing & Proof-of-Delivery Escrow",
      compliance: ["GDP (Good Distribution Practice)", "DOT / ISO 28000", "e-Way Bill GST"],
      challenge: "Refrigerated cargo temperature excursions going undetected until final delivery, causing millions in spoiled pharmaceutical and food cargo.",
      blueprint: "LoRaWAN and cellular IoT temperature loggers transmitting heartbeat telemetry every 60 seconds. Smart geofencing engines trigger instant rerouting alerts if cold-chain thresholds deviate by more than ±0.5°C.",
      metric: "-68% Spoilage claims · 14 Million daily tracking telemetry events",
      stack: "Flutter Mobile · Go Microservices · Redis Geo · ClickHouse · AWS IoT Core"
    },
    aero: {
      id: "aero",
      name: "Aerospace & Defence Systems",
      tagline: "Mission-Critical CNC Metrology & AS9100 Traceability",
      compliance: ["AS9100D", "ITAR Compliant Vaults", "MIL-STD-810H", "NIST SP 800-171"],
      challenge: "Strict raw material pedigree requirements, CMM coordinate measuring validation, and zero tolerance for defect contamination across suppliers.",
      blueprint: "Full digital twin inspection logging linking raw material Mill Test Reports (MTR) directly to CNC machine toolpaths and AS9102 First Article Inspection reports stored in immutable audit vaults.",
      metric: "100% Complete lot genealogy · Zero defect containment escapes",
      stack: "SolidWorks API · Python · PostgreSQL · Vault Cryptography · Private Edge"
    }
  };

  const selected = INDUSTRY_BLUEPRINTS[activeInd];

  return (
    <>
      <Section eyebrow="Domain Engineering" title="Industry-Specific Architectural Blueprints" sub="Engineered compliance regimes, fault-tolerant topologies, and real-time data pipelines built for your exact operational domain.">
        {/* Industry Selector Tabs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
          {Object.values(INDUSTRY_BLUEPRINTS).map((ind) => (
            <button
              key={ind.id}
              onClick={() => setActiveInd(ind.id)}
              style={{
                background: activeInd === ind.id ? TOKENS.brass : "rgba(255, 255, 255, 0.03)",
                color: activeInd === ind.id ? TOKENS.ink : TOKENS.paper,
                border: `1px solid ${activeInd === ind.id ? TOKENS.brass : TOKENS.hair}`,
                borderRadius: 999,
                padding: "10px 20px",
                fontSize: 13.5,
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: activeInd === ind.id ? 700 : 400,
                cursor: "pointer",
                transition: "all 0.15s ease"
              }}
            >
              {ind.name.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Detailed Blueprint Showcase Card */}
        <Card style={{ padding: 36, marginBottom: 40, border: `1px solid rgba(212,175,55,0.3)` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 20 }}>
            <div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.teal, letterSpacing: "0.1em" }}>
                ARCHITECTURAL BLUEPRINT
              </span>
              <h2 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 26, margin: "6px 0 6px" }}>
                {selected.name}
              </h2>
              <div style={{ color: TOKENS.slate, fontSize: 14 }}>{selected.tagline}</div>
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {selected.compliance.map((c) => (
                <span key={c} style={{ background: "rgba(21,101,192,0.12)", border: `1px solid rgba(21,101,192,0.3)`, padding: "5px 10px", borderRadius: 4, fontSize: 11, color: "#60A5FA", fontFamily: "'JetBrains Mono', monospace" }}>
                  ✓ {c}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, margin: "24px 0" }}>
            <div style={{ background: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: 6, padding: 20 }}>
              <div style={{ color: "#f87171", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, marginBottom: 8 }}>
                CRITICAL OPERATIONAL CHALLENGE
              </div>
              <p style={{ color: TOKENS.paper, fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                {selected.challenge}
              </p>
            </div>

            <div style={{ background: "rgba(0, 168, 150, 0.05)", border: "1px solid rgba(0, 168, 150, 0.25)", borderRadius: 6, padding: 20 }}>
              <div style={{ color: TOKENS.teal, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, marginBottom: 8 }}>
                PRODUCTION PERFORMANCE METRIC
              </div>
              <div style={{ color: TOKENS.paper, fontSize: 15, fontWeight: 600, lineHeight: 1.5, margin: 0 }}>
                {selected.metric}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <h4 style={{ color: TOKENS.brass, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, marginBottom: 8 }}>
              ENGINEERED TOPOLOGY & DATA PIPELINE
            </h4>
            <p style={{ color: TOKENS.slate, fontSize: 14.5, lineHeight: 1.7, margin: 0 }}>
              {selected.blueprint}
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14, borderTop: `1px solid ${TOKENS.hair}`, paddingTop: 20 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: TOKENS.slate }}>
              TECH STACK: <span style={{ color: TOKENS.paper }}>{selected.stack}</span>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Button onClick={() => go("contact")}>Request Domain Blueprint Scope →</Button>
              <Button variant="ghost" onClick={() => go("rfq-wizard")}>Post {selected.name.split(" ")[0]} RFQ</Button>
            </div>
          </div>
        </Card>

        {/* All Industries Directory Overview Grid */}
        <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 22, margin: "0 0 18px" }}>
          All 10 Specialized Industry Coverage Areas
        </h3>
        <Grid min={260}>
          {INDUSTRIES.map((ind) => (
            <Card key={ind.name}>
              <h4 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 18, margin: "0 0 8px" }}>{ind.name}</h4>
              <p style={{ color: TOKENS.slate, fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>{ind.note}</p>
            </Card>
          ))}
        </Grid>
      </Section>
      <CTA go={go} />
    </>
  );
}

function CaseStudiesPage({ go }) {
  const [selectedCase, setSelectedCase] = useState(null);
  const [indFilter, setIndFilter] = useState("All");

  const EXTENDED_CASE_STUDIES = [
    {
      id: "cloud-unification",
      client: "Global Logistics Leader",
      industry: "Logistics",
      title: "Unifying Pan-India Operations onto High-Throughput Event-Driven Cloud Engine",
      challenge: "Disconnected legacy spreadsheets and fragmented SQL databases caused 4-hour latency in inventory reconciliation and high operational error rates during peak logistics hours.",
      solution: "Abhimanyu Technologies engineered an event-driven microservice architecture with real-time WebSocket syncing, automated inventory reconciliation, and zero-downtime PostgreSQL multi-region replication.",
      results: ["4.2x Throughput increase", "-68% Cloud infrastructure cost", "0ms Data sync latency", "99.999% SLA Uptime"],
      stack: "Next.js · Node.js · PostgreSQL · AWS Kinesis · Docker · Terraform",
      details: "By migrating away from monolithic batch-processing systems, the logistics network now processes over 14 million daily transaction events with instant tracking updates. Full audit logging ensures zero inventory discrepancies across 120 distribution warehouses.",
      roi: "$1.4M Annual saved compute & labor overhead"
    },
    {
      id: "lms-tracking",
      client: "EdTech & University System",
      industry: "EdTech",
      title: "Student Progress & High-Concurrency Analytics Engine at 500k+ Scale",
      challenge: "Legacy learning platform crashed under concurrent exam loads of 50k+ simultaneous users, lacking real-time progress verification and telemetry.",
      solution: "Built a distributed mobile and web learning system utilizing Redis caching layers, auto-scaling Kubernetes worker pods, and granular telemetry verification.",
      results: ["500,000+ Active concurrent users", "0 Crash incidents during peak exams", "-75% Server response latency", "Automated verified certificates"],
      stack: "React Native · Flutter · Node.js · Redis · PostgreSQL · Kubernetes",
      details: "The unified LMS tracks micro-learning interactions in real time, granting instant verified certificates while providing administrators with predictive student success analytics with sub-second response times.",
      roi: "Zero exam downtime across 3 consecutive academic years"
    },
    {
      id: "ai-fraud-detection",
      client: "FinTech Banking Platform",
      industry: "FinTech",
      title: "Sub-10ms AI Fraud Detection & Risk Scoring API Deployed at Edge Nodes",
      challenge: "Manual transaction screening created bottleneck delays in instant credit authorization, resulting in elevated fraud exposure.",
      solution: "Developed an inline machine learning risk scoring engine deployed at edge nodes, scoring every transaction under 8 milliseconds.",
      results: ["-91% Fraudulent transactions", "< 8ms Median prediction latency", "$12.4M Annual saved fraud losses", "SOC2 Type II Audit Certified"],
      stack: "Python · PyTorch · ONNX Runtime · AWS Lambda Edge · Redis",
      details: "The risk scoring neural model evaluates 120+ transaction signals concurrently, allowing seamless legitimate purchases while flagging anomalies before clearing.",
      roi: "$12.4M Direct capital fraud preservation"
    },
    {
      id: "industrial-iot-scada",
      client: "Heavy Foundry & OEM Conglomerate",
      industry: "Industry 4.0",
      title: "IoT Edge Telemetry & Predictive Spindle Maintenance Across 14 Factories",
      challenge: "Spindle bearing failures on CNC machining lines caused unscheduled assembly halts costing over $45,000 per hour of factory downtime.",
      solution: "Deployed ruggedized ARM edge micro-gateways collecting vibrational and thermal telemetry over Modbus/OPC-UA, feeding into an inline ONNX anomaly detection engine.",
      results: ["-78% Unplanned line downtime", "36 Hours advance bearing seizure warning", "100% Automated work-order dispatch", "ISO 9001 Audited"],
      stack: "Raspberry Pi CM4 · TimescaleDB · ONNX · Modbus TCP · Grafana · Docker",
      details: "Real-time edge compute monitors harmonics across 240 CNC machines, alerting maintenance supervisors via WhatsApp and Abhimanyu ERP hours before physical tolerance degradation occurs.",
      roi: "$3.8M Annual avoidance of line halt losses"
    },
    {
      id: "medtech-telemetry",
      client: "Global MedTech Network",
      industry: "Healthcare",
      title: "HIPAA-Compliant Patient Telemetry Gateway with Field-Level Encryption",
      challenge: "Hospital patient vitals monitors were isolated on legacy serial networks, delaying clinical response times during post-operative patient cardiac distress.",
      solution: "Architected an end-to-end encrypted WebSocket telemetry bridge with AES-256 field-level encryption, FHIR v4 resource adapters, and sub-200ms vital sign alarm dispatch.",
      results: ["Sub-200ms Vitals alarm latency", "100% HIPAA & HL7 FHIR v4 compliance", "Zero unencrypted data in transit", "FDA 21 CFR Part 11 Certified"],
      stack: "Go · Kafka · React Native · PostgreSQL Citus · AWS MedTech VPC",
      details: "Over 8,000 connected hospital patient beds stream real-time ECG and oxygen saturation data directly to central nursing stations with sub-second failover redundancy.",
      roi: "Sub-200ms emergency alarm response across 18 regional hospital facilities"
    }
  ];

  const industries = ["All", "Logistics", "EdTech", "FinTech", "Industry 4.0", "Healthcare"];

  const filteredCases = EXTENDED_CASE_STUDIES.filter((c) => {
    return indFilter === "All" || c.industry === indFilter;
  });

  return (
    <>
      <Section eyebrow="Case Studies & Success Stories" title="Proven Engineering Outcomes" sub="In-depth technical reviews of systems designed, built, and maintained by Abhimanyu Technologies across enterprise domains.">
        {/* Industry Filter Pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setIndFilter(ind)}
              style={{
                background: indFilter === ind ? TOKENS.brass : "rgba(255,255,255,0.04)",
                border: `1px solid ${indFilter === ind ? TOKENS.brass : TOKENS.hair}`,
                color: indFilter === ind ? TOKENS.ink : TOKENS.slate,
                borderRadius: 999,
                padding: "7px 16px",
                fontSize: 12.5,
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: indFilter === ind ? 700 : 400,
                cursor: "pointer",
                transition: "all 0.15s ease"
              }}
            >
              {ind}
            </button>
          ))}
        </div>

        {/* Case Studies Grid */}
        <Grid min={320}>
          {filteredCases.map((c) => (
            <Card key={c.id} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.teal, background: "rgba(0,168,150,0.1)", padding: "3px 8px", borderRadius: 4 }}>
                    {c.client.toUpperCase()}
                  </span>
                  <span style={{ fontSize: 11, color: TOKENS.brass, fontFamily: "'JetBrains Mono', monospace" }}>
                    {c.industry}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 20, margin: "0 0 12px", lineHeight: 1.35 }}>
                  {c.title}
                </h3>
                <p style={{ color: TOKENS.slate, fontSize: 13.5, marginBottom: 12, lineHeight: 1.6 }}>
                  <b style={{ color: TOKENS.paper }}>Challenge: </b>{c.challenge}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, margin: "14px 0", background: "rgba(255,255,255,0.02)", padding: 12, borderRadius: 6 }}>
                  {c.results.map((res, i) => (
                    <div key={i} style={{ fontSize: 12, color: TOKENS.brass, fontFamily: "'JetBrains Mono', monospace" }}>
                      ✓ {res}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: "#60A5FA", marginBottom: 16 }}>
                  {c.stack}
                </div>
                <Button onClick={() => { trackEvent("open_case_study", { id: c.id }); setSelectedCase(c); }}>
                  Read Full Case Study →
                </Button>
              </div>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* Case Study Modal Reader */}
      {selectedCase && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(7, 16, 32, 0.94)", backdropFilter: "blur(18px)", zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center", padding: 20 }}>
          <div style={{ maxWidth: 740, width: "100%", maxHeight: "90vh", overflowY: "auto", border: `1px solid rgba(212, 175, 55, 0.4)`, background: TOKENS.panelAlt, borderRadius: 12, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.85)" }}>
            {/* Header */}
            <div style={{ background: "linear-gradient(135deg, #0a1929 0%, #101828 100%)", padding: "26px 32px", borderBottom: `1px solid ${TOKENS.hair}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.teal }}>
                  {selectedCase.client.toUpperCase()} · {selectedCase.industry}
                </span>
                <button onClick={() => setSelectedCase(null)} style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${TOKENS.hair}`, color: TOKENS.paper, fontSize: 18, cursor: "pointer", width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
              </div>
              <h2 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 24, margin: "0 0 6px", lineHeight: 1.3 }}>
                {selectedCase.title}
              </h2>
              <div style={{ fontSize: 12.5, color: TOKENS.brass, fontFamily: "'JetBrains Mono', monospace" }}>
                ROI OUTCOME: {selectedCase.roi}
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: 32 }}>
              <div style={{ borderBottom: `1px solid ${TOKENS.hair}`, paddingBottom: 18, marginBottom: 18 }}>
                <h4 style={{ color: "#f87171", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, marginTop: 0, marginBottom: 6 }}>
                  OPERATIONAL CHALLENGE
                </h4>
                <p style={{ color: TOKENS.slate, fontSize: 14.5, lineHeight: 1.65, margin: 0 }}>
                  {selectedCase.challenge}
                </p>
              </div>

              <div style={{ borderBottom: `1px solid ${TOKENS.hair}`, paddingBottom: 18, marginBottom: 18 }}>
                <h4 style={{ color: TOKENS.teal, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, marginTop: 0, marginBottom: 6 }}>
                  ARCHITECTURAL SOLUTION
                </h4>
                <p style={{ color: TOKENS.slate, fontSize: 14.5, lineHeight: 1.65, marginBottom: 10 }}>
                  {selectedCase.solution}
                </p>
                <p style={{ color: TOKENS.paper, fontSize: 14, lineHeight: 1.65, margin: 0 }}>
                  {selectedCase.details}
                </p>
              </div>

              <div style={{ marginBottom: 24 }}>
                <h4 style={{ color: TOKENS.brass, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, marginTop: 0, marginBottom: 10 }}>
                  VERIFIED PRODUCTION METRICS
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {selectedCase.results.map((r, idx) => (
                    <div key={idx} style={{ background: "rgba(212, 175, 55, 0.08)", border: `1px solid ${TOKENS.hair}`, padding: "10px 14px", borderRadius: 6, color: TOKENS.paper, fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>
                      ✓ {r}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, borderTop: `1px solid ${TOKENS.hair}`, paddingTop: 20 }}>
                <span style={{ fontSize: 12, color: TOKENS.slate, fontFamily: "'JetBrains Mono', monospace" }}>
                  Stack: {selectedCase.stack}
                </span>
                <div style={{ display: "flex", gap: 10 }}>
                  <Button variant="ghost" onClick={() => setSelectedCase(null)}>Close</Button>
                  <Button onClick={() => { setSelectedCase(null); go("contact"); }}>
                    Discuss Similar Architecture →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <CTA go={go} />
    </>
  );
}

function InsightsPage({ go }) {
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState(null);

  const ARTICLES = [
    {
      id: "ai-business",
      category: "AI & ML",
      title: "How Operational AI Is Transforming Day-to-Day Enterprise Workflows",
      author: "Abhimanyu (CTO)",
      readTime: "6 min read",
      date: "September 2026",
      summary: "Beyond conversational LLM toys: deploying inline neural risk authorization, automated manufacturing defect classifiers, and predictive supply chain telemetry.",
      content: "Many enterprise leaders start AI initiatives by attempting to overhaul entire operational divisions at once. In practice, the highest ROI deployments isolate single high-friction decision bottlenecks — such as sub-10ms transaction anomaly scoring or automated CAD drawing geometric classification — where neural models work alongside human operators with zero disruption to core operations.",
      codeSnippet: `# Inline ONNX Runtime Anomaly Evaluation
import onnxruntime as ort
import numpy as np

session = ort.InferenceSession("models/risk_engine_v4.onnx", providers=['CUDAExecutionProvider'])
def score_transaction(features: np.ndarray) -> float:
    inputs = {session.get_inputs()[0].name: features.astype(np.float32)}
    output = session.run(None, inputs)
    return float(output[0][0]) # Returns risk score in <6ms`,
      outcomes: ["-91% Manual screening overhead", "< 7.5ms p95 prediction latency at edge", "Zero false-positive downtime"],
      takeaway: "Isolate single operational decision points, benchmark against deterministic baselines, and maintain human override gates for sensitive state transitions."
    },
    {
      id: "cloud-migration",
      category: "Cloud & DevOps",
      title: "Zero-Downtime Cloud Migration for High-Throughput Distributed Microservices",
      author: "Ananya Verma (VP Eng)",
      readTime: "8 min read",
      date: "August 2026",
      summary: "How to decouple legacy monolithic systems into multi-cloud containerized services without dropping packets or inflating infrastructure budgets.",
      content: "Migrating enterprise workloads requiring 99.999% uptime cannot rely on maintenance windows. We utilize the Strangler Fig pattern paired with Anycast route weighting: new stateless microservices are deployed alongside legacy monoliths behind an Envoy proxy gateway. Synthetic canaries gradually shift 1%, 5%, 25%, and finally 100% of live traffic once p99 latency parity is mathematically proven.",
      codeSnippet: `# Envoy Route Weighted Canary Traffic Split
route_config:
  name: api_v1_routes
  routes:
    - match: { prefix: "/v1/orders" }
      route:
        weighted_clusters:
          clusters:
            - { name: monolith_legacy, weight: 10 }
            - { name: microservice_v2, weight: 90 }
        timeout: 0.5s`,
      outcomes: ["100% Zero service interruptions during cutover", "-64% Idle server compute expenditure", "Automated rollbacks within 150ms"],
      takeaway: "Decouple storage before compute, run shadow traffic side-by-side, and verify database replica lag before cutting write authority."
    },
    {
      id: "zero-trust-security",
      category: "Cybersecurity",
      title: "Architecting Zero-Trust Identity Attestation Across Multi-Cloud Clusters",
      author: "Rajesh Kumar (Head of Security)",
      readTime: "7 min read",
      date: "July 2026",
      summary: "Why perimeter firewalls fail, and how to enforce mutual TLS (mTLS), SPIFFE workload identity, and ephemeral cryptographic key rotations.",
      content: "Security is not a certification badge obtained before product launch — it is a foundational architectural constraint. In our cloud deployments, every inter-pod transaction across Kubernetes nodes must present a cryptographically verified X.509 certificate with a maximum lifetime of 12 hours, rotated automatically via SPIRE. If a node is compromised, lateral movement across the cluster is mathematically constrained.",
      codeSnippet: `# SPIFFE / SPIRE Workload Attestation Filter
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: prod-workloads
spec:
  mtls:
    mode: STRICT # Rejects all non-mTLS plaintext calls`,
      outcomes: ["SOC2 Type II & ISO 27001 audited architecture", "Zero lateral network propagation vectors", "100% Automated cryptographic rotation"],
      takeaway: "Assume the perimeter is breached; enforce cryptographic identity and field-level encryption for every single remote procedure call."
    },
    {
      id: "anycast-scaling",
      category: "System Scaling",
      title: "Scaling Anycast Edge Gateways to 50,000 Requests/Sec with Sub-10ms Latency",
      author: "Shiva (Founder & CEO)",
      readTime: "9 min read",
      date: "June 2026",
      summary: "Architecting global BGP Anycast routing nodes to terminate client TLS handshakes locally, diffusing DDoS attacks and serving cached assets at edge speeds.",
      content: "Global users expect desktop and mobile interfaces to load instantaneously. By terminating client TCP/TLS connections at the closest Anycast POP rather than routing roundtrips back to an origin datacenter in North America or India, we eliminate 120ms to 240ms of latency per request. Cache invalidation is coordinated via a global Redis Pub/Sub mesh with sub-30ms propagation worldwide.",
      codeSnippet: `# BGP Anycast Route Health Probe Daemon (Go)
func monitorOriginHealth(origin string) {
    for {
        resp, err := client.Get(origin + "/healthz")
        if err != nil || resp.StatusCode != 200 {
            log.Warn("Origin degraded, withdrawing BGP prefix...")
            withdrawRouteAnnouncement("203.0.113.0/24")
        }
        time.Sleep(500 * time.Millisecond)
    }
}`,
      outcomes: ["50,000+ Requests/sec peak load sustained", "< 9.2ms Median global client roundtrip", "Seamless automatic DDoS packet absorption"],
      takeaway: "Terminate handshakes at the edge, keep origins stateless, and automate BGP route withdrawals on health-check dips."
    },
    {
      id: "iot-firmware",
      category: "Hardware & IoT",
      title: "Hardware-in-the-Loop (HIL) Automated Testing for Industrial IoT Gateways",
      author: "Rohan Nair (VP Hardware Systems)",
      readTime: "6 min read",
      date: "May 2026",
      summary: "How to automate embedded firmware regression testing on real STM32 and ESP32 silicon before deploying over-the-air (OTA) updates.",
      content: "Pushing faulty firmware to thousands of deployed industrial telemetry nodes across remote factories can brick hardware and cost weeks of downtime. We designed an automated Hardware-in-the-Loop (HIL) testbed rack where real target microcontrollers are stimulated with synthetic I2C, SPI, and Modbus sensor signals, validating power consumption and memory leak profiles before OTA approval.",
      codeSnippet: `# HIL Automated Test Runner Pipeline (Python)
def test_modbus_crc_under_line_noise(dut_serial):
    dut_serial.inject_electrical_noise(duration_ms=50)
    response = dut_serial.send_modbus_frame(ADDR_TEMPERATURE_SENSOR)
    assert response.crc_valid is True
    assert dut_serial.read_current_draw_ma() < 45.0`,
      outcomes: ["99.98% Field OTA update success rate", "0 Hardware bricking incidents across 50k+ nodes", "-80% Manual bench testing hours"],
      takeaway: "Never test embedded code solely on emulators; real hardware tolerances, voltage fluctuations, and bus noise require physical automated testbeds."
    },
    {
      id: "database-partitioning",
      category: "System Scaling",
      title: "PostgreSQL Multi-Tenant Sharding Strategies for High-Volume B2B Platforms",
      author: "Vikram Sengupta (Lead Eng)",
      readTime: "8 min read",
      date: "April 2026",
      summary: "Architecting schema-per-tenant vs. row-level security sharding across high-write B2B marketplaces handling millions of catalog items.",
      content: "When a B2B platform scales to tens of thousands of buyers and suppliers, database contention quickly degrades search indexing and inventory lock performance. We partition PostgreSQL tables by tenant organization ID with declarative time-series partitions for audit trails, ensuring queries only scan the exact memory pages required.",
      codeSnippet: `-- Declarative PostgreSQL Time-Series Partitioning
CREATE TABLE audit_telemetry (
    id BIGSERIAL,
    tenant_id UUID NOT NULL,
    event_name VARCHAR(64) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    payload JSONB
) PARTITION BY RANGE (created_at);

CREATE TABLE audit_telemetry_2026_09 PARTITION OF audit_telemetry
    FOR VALUES FROM ('2026-09-01') TO ('2026-10-01');`,
      outcomes: ["4.8x Query execution speedup", "-72% Buffer cache miss rates", "Zero tenant cross-talk data exposure"],
      takeaway: "Design database schemas around write concurrency patterns, and separate historical audit telemetry from operational state tables."
    }
  ];

  const topics = ["All", "AI & ML", "Cloud & DevOps", "Cybersecurity", "System Scaling", "Hardware & IoT"];

  const filtered = ARTICLES.filter((a) => {
    return selectedTopic === "All" || a.category === selectedTopic;
  });

  return (
    <>
      <Section eyebrow="Technical Insights & Blog" title="Engineering Perspective & Research" sub="Deep dives on distributed cloud architecture, inline machine learning, embedded IoT systems, and high-load scalability.">
        {/* Topic Filter Pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTopic(t)}
              style={{
                background: selectedTopic === t ? TOKENS.brass : "rgba(255,255,255,0.04)",
                border: `1px solid ${selectedTopic === t ? TOKENS.brass : TOKENS.hair}`,
                color: selectedTopic === t ? TOKENS.ink : TOKENS.slate,
                borderRadius: 999,
                padding: "7px 16px",
                fontSize: 12.5,
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: selectedTopic === t ? 700 : 400,
                cursor: "pointer",
                transition: "all 0.15s ease"
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <Grid min={300}>
          {filtered.map((a) => (
            <Card key={a.id} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: TOKENS.teal, fontFamily: "'JetBrains Mono', monospace", marginBottom: 12 }}>
                  <span style={{ background: "rgba(0,168,150,0.1)", padding: "3px 8px", borderRadius: 4 }}>{a.category.toUpperCase()}</span>
                  <span>{a.readTime} · {a.date}</span>
                </div>
                <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 19, margin: "0 0 10px", lineHeight: 1.35 }}>
                  {a.title}
                </h3>
                <p style={{ color: TOKENS.slate, fontSize: 13.5, lineHeight: 1.6, margin: "0 0 16px" }}>
                  {a.summary}
                </p>
              </div>

              <div>
                <div style={{ fontSize: 12, color: TOKENS.brass, fontFamily: "'JetBrains Mono', monospace", marginBottom: 14 }}>
                  By {a.author}
                </div>
                <Button onClick={() => { trackEvent("read_insight", { id: a.id }); setSelectedArticle(a); }}>
                  Read Technical Essay →
                </Button>
              </div>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* Deep Navy Technical Reader Modal */}
      {selectedArticle && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(7, 16, 32, 0.94)", backdropFilter: "blur(18px)", zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center", padding: 20 }}>
          <div style={{ maxWidth: 760, width: "100%", maxHeight: "90vh", overflowY: "auto", background: TOKENS.panelAlt, border: `1px solid rgba(212,175,55,0.4)`, borderRadius: 12, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.85)" }}>
            {/* Header */}
            <div style={{ background: "linear-gradient(135deg, #0a1929 0%, #101828 100%)", padding: "26px 32px", borderBottom: `1px solid ${TOKENS.hair}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.teal }}>
                  {selectedArticle.category.toUpperCase()} · {selectedArticle.readTime} · {selectedArticle.date}
                </span>
                <button onClick={() => setSelectedArticle(null)} style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${TOKENS.hair}`, color: TOKENS.paper, fontSize: 18, cursor: "pointer", width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
              </div>
              <h2 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 24, margin: "0 0 6px", lineHeight: 1.3 }}>
                {selectedArticle.title}
              </h2>
              <div style={{ fontSize: 13, color: TOKENS.brass, fontFamily: "'JetBrains Mono', monospace" }}>
                Written by {selectedArticle.author}
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: 32 }}>
              <p style={{ color: TOKENS.paper, fontSize: 15.5, lineHeight: 1.8, marginBottom: 24 }}>
                {selectedArticle.content}
              </p>

              {/* Code Snippet Blueprint */}
              {selectedArticle.codeSnippet && (
                <div style={{ background: "#070E1A", border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: 18, marginBottom: 24, overflowX: "auto" }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: TOKENS.teal, marginBottom: 8 }}>
                    ARCHITECTURAL IMPLEMENTATION BLUEPRINT
                  </div>
                  <pre style={{ margin: 0, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#E2E8F0", lineHeight: 1.6 }}>
                    {selectedArticle.codeSnippet}
                  </pre>
                </div>
              )}

              {/* Production Outcomes */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.brass, marginBottom: 8, letterSpacing: "0.06em" }}>
                  MEASURABLE PRODUCTION OUTCOMES
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
                  {selectedArticle.outcomes.map((o, idx) => (
                    <div key={idx} style={{ background: "rgba(255,255,255,0.025)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "10px 14px", fontSize: 12.5, color: TOKENS.paper, fontFamily: "'JetBrains Mono', monospace" }}>
                      ✓ {o}
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Takeaway Box */}
              <div style={{ background: "rgba(212, 175, 55, 0.08)", borderLeft: `3px solid ${TOKENS.brass}`, padding: "14px 18px", borderRadius: "0 6px 6px 0", marginBottom: 28 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.brass, marginBottom: 4 }}>
                  CORE ARCHITECTURAL TAKEAWAY
                </div>
                <p style={{ color: TOKENS.slate, fontSize: 14, margin: 0, lineHeight: 1.6 }}>
                  {selectedArticle.takeaway}
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, borderTop: `1px solid ${TOKENS.hair}`, paddingTop: 20 }}>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert("Article link copied to clipboard!");
                  }}
                  style={{
                    background: "transparent",
                    border: `1px solid ${TOKENS.hair}`,
                    color: TOKENS.paper,
                    padding: "8px 14px",
                    borderRadius: 6,
                    fontSize: 12,
                    fontFamily: "'JetBrains Mono', monospace",
                    cursor: "pointer"
                  }}
                >
                  🔗 Share Article
                </button>
                <div style={{ display: "flex", gap: 10 }}>
                  <Button variant="ghost" onClick={() => setSelectedArticle(null)}>Close Reader</Button>
                  <Button onClick={() => { setSelectedArticle(null); go("contact"); }}>
                    Discuss Architecture with Author →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <CTA go={go} />
    </>
  );
}

function CareersPage({ go }) {
  const [deptFilter, setDeptFilter] = useState("All");
  const [selectedRole, setSelectedRole] = useState(null);
  const [applied, setApplied] = useState(false);
  const [appForm, setAppForm] = useState({ name: "", email: "", portfolio: "", notice: "Immediate / 15 Days", notes: "" });

  const DETAILED_ROLES = [
    {
      id: "backend-lead",
      title: "Staff Backend Engineer — Distributed Systems",
      dept: "Engineering",
      type: "Full-time · Telangana HQ / Remote",
      experience: "5+ Years",
      compensation: "₹24L – ₹38L + Equity",
      stack: "Go · Node.js · PostgreSQL · Redis · Kafka · Kubernetes",
      overview: "Lead the architectural design of high-throughput Anycast routing APIs, event-driven microservices, and multi-tenant database clusters operating at 99.999% uptime.",
      responsibilities: [
        "Design sub-10ms transactional microservices with strict ACID consistency",
        "Implement automated zero-downtime database schema migrations for multi-region clusters",
        "Profile memory leaks and optimize gRPC network payloads under 50k+ concurrent requests",
        "Mentor mid-level engineers and conduct deep architectural design reviews"
      ],
      requirements: [
        "Strong production experience in Go, Node.js/TypeScript, or Rust",
        "Deep familiarity with distributed consensus, PostgreSQL partitioning, and Redis caching",
        "Hands-on expertise with Docker, Kubernetes, and Terraform infrastructure as code"
      ]
    },
    {
      id: "ai-engineer",
      title: "Senior AI / ML Research & Deployment Engineer",
      dept: "AI & Data",
      type: "Full-time · Hybrid / Remote",
      experience: "4+ Years",
      compensation: "₹22L – ₹36L + Equity",
      stack: "Python · PyTorch · ONNX · TensorRT · HuggingFace · FastAPI",
      overview: "Develop and deploy production-grade computer vision, fraud scoring neural models, and fine-tuned LLM agents integrated into Abhimanyu ERP and edge telemetry nodes.",
      responsibilities: [
        "Train and optimize computer vision models for automated manufacturing defect inspection",
        "Deploy low-latency (<15ms) neural inference pipelines via ONNX Runtime and TensorRT",
        "Fine-tune open-source LLMs (Llama, Mistral) on domain-specific procurement documents",
        "Build continuous model evaluation pipelines and drift monitoring metrics"
      ],
      requirements: [
        "Master's or Bachelor's in CS, AI, or equivalent practical experience",
        "Proven experience deploying deep learning models to production Kubernetes environments",
        "Familiarity with CUDA kernel optimizations and distributed training (DeepSpeed / FSDP)"
      ]
    },
    {
      id: "flutter-lead",
      title: "Senior Mobile Engineer — Flutter / React Native",
      dept: "Engineering",
      type: "Full-time · Telangana HQ / Remote",
      experience: "3+ Years",
      compensation: "₹16L – ₹26L",
      stack: "Flutter · Dart · React Native · WebSocket · SQLite · BLE",
      overview: "Build industrial IoT field apps, warehouse inventory scanners, and executive mobile dashboards with smooth 60fps animations and offline-first synchronization.",
      responsibilities: [
        "Architect cross-platform iOS and Android applications for enterprise clients",
        "Integrate Bluetooth Low Energy (BLE) sensors and hardware barcode scanners",
        "Implement robust offline SQLite caching with automatic cloud background reconciliation",
        "Ensure sub-second app cold-launch times and 99.9% crash-free sessions"
      ],
      requirements: [
        "3+ years shipping commercial Flutter or React Native applications to App Store / Play Store",
        "Deep understanding of reactive state management (Riverpod, Bloc, or Zustand)",
        "Experience interfacing with native iOS (Swift) and Android (Kotlin) bridge modules"
      ]
    },
    {
      id: "devops-sre",
      title: "Cloud Infrastructure & SRE Architect",
      dept: "DevOps & SRE",
      type: "Full-time · Remote",
      experience: "4+ Years",
      compensation: "₹20L – ₹32L",
      stack: "AWS · Terraform · Kubernetes · Anycast BGP · Prometheus · Cilium",
      overview: "Maintain and expand our 12 Anycast Edge POPs, automated multi-region failovers, and defense-grade zero-trust Kubernetes clusters.",
      responsibilities: [
        "Manage Anycast BGP edge routing nodes and global sub-second failover automations",
        "Maintain Infrastructure as Code (Terraform / Terragrunt) across multi-cloud environments",
        "Establish Prometheus, Grafana, and OpenTelemetry synthetic uptime monitoring",
        "Drive SOC2 Type II, ISO 27001, and automated penetration testing remediations"
      ],
      requirements: [
        "Strong experience managing Kubernetes in production with CNI plugins (Cilium / Calico)",
        "Deep understanding of TCP/IP, BGP Anycast, DNSSEC, and TLS termination",
        "Proficiency in shell scripting, Python, or Go for automated operational tooling"
      ]
    },
    {
      id: "product-designer",
      title: "Staff Product Designer — Enterprise Systems",
      dept: "Design",
      type: "Full-time · Hybrid / Remote",
      experience: "4+ Years",
      compensation: "₹18L – ₹28L",
      stack: "Figma · Design Systems · Prototyping · Information Architecture",
      overview: "Craft high-density enterprise software interfaces for Abhimanyu ERP, CRM, and Industrial telemetry dashboards that simplify complex multi-step workflows.",
      responsibilities: [
        "Design scalable, accessible design systems and component libraries in Figma",
        "Conduct user research interviews with factory operators, procurement leads, and engineers",
        "Prototype high-fidelity micro-interactions for complex data tables and analytics charts",
        "Partner closely with frontend engineers to guarantee pixel-perfect production parity"
      ],
      requirements: [
        "Portfolio showcasing complex B2B enterprise SaaS or developer tool interfaces",
        "Mastery of typography, visual hierarchy, information density, and accessibility (WCAG AA)",
        "Understanding of frontend component constraints (React / CSS Grid / Flexbox)"
      ]
    }
  ];

  const departments = ["All", "Engineering", "AI & Data", "DevOps & SRE", "Design"];

  const filteredRoles = DETAILED_ROLES.filter((r) => {
    return deptFilter === "All" || r.dept === deptFilter;
  });

  const handleApply = (e) => {
    e.preventDefault();
    trackEvent("submit_job_application", { roleId: selectedRole?.id, email: appForm.email });
    setApplied(true);
    setTimeout(() => {
      setApplied(false);
      setSelectedRole(null);
      setAppForm({ name: "", email: "", portfolio: "", notice: "Immediate / 15 Days", notes: "" });
    }, 2400);
  };

  return (
    <>
      <Section eyebrow="Careers & Culture" title="Join Abhimanyu Technologies" sub="We are hiring passionate engineers, architects, and designers who build software and hardware systems to outlast the first release.">
        {/* Department Filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
          {departments.map((d) => (
            <button
              key={d}
              onClick={() => setDeptFilter(d)}
              style={{
                background: deptFilter === d ? TOKENS.brass : "rgba(255,255,255,0.04)",
                border: `1px solid ${deptFilter === d ? TOKENS.brass : TOKENS.hair}`,
                color: deptFilter === d ? TOKENS.ink : TOKENS.slate,
                borderRadius: 999,
                padding: "7px 16px",
                fontSize: 12.5,
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: deptFilter === d ? 700 : 400,
                cursor: "pointer",
                transition: "all 0.15s ease"
              }}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Roles List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 48 }}>
          {filteredRoles.map((r) => (
            <Card key={r.id} style={{ padding: "24px 28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14 }}>
                <div style={{ flex: "1 1 400px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: TOKENS.teal, fontFamily: "'JetBrains Mono', monospace", background: "rgba(0,168,150,0.1)", padding: "3px 8px", borderRadius: 4 }}>
                      {r.dept.toUpperCase()}
                    </span>
                    <span style={{ fontSize: 11, color: TOKENS.brass, fontFamily: "'JetBrains Mono', monospace" }}>
                      {r.compensation}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 20, margin: "0 0 6px" }}>
                    {r.title}
                  </h3>
                  <div style={{ fontSize: 13, color: TOKENS.slate, marginBottom: 10 }}>
                    {r.type} · Exp: {r.experience}
                  </div>
                  <p style={{ color: TOKENS.slate, fontSize: 14, lineHeight: 1.6, margin: "0 0 12px" }}>
                    {r.overview}
                  </p>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#60A5FA" }}>
                    STACK: {r.stack}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8, alignSelf: "center" }}>
                  <Button onClick={() => setSelectedRole(r)}>View Role & Apply →</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Engineering Culture & Benefits */}
        <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 22, margin: "0 0 20px" }}>
          Engineering Culture & Benefits
        </h3>
        <Grid min={260}>
          {[
            { icon: "💻", title: "Top-Tier Hardware", desc: "Latest Apple M3 Max or high-spec Linux development machines, dual 4K monitors, and cloud GPU clusters." },
            { icon: "🌐", title: "Hybrid & Remote First", desc: "Work from our state-of-the-art Telangana campus or remotely anywhere across India with home office setup stipends." },
            { icon: "📚", title: "Annual Learning Fund", desc: "₹1,50,000 annual budget for technical certifications (AWS, CKA, OCSC), technical books, and international conferences." },
            { icon: "🏥", title: "Comprehensive Health", desc: "Full family health and medical coverage with zero deductible, mental health support, and wellness stipends." }
          ].map((b) => (
            <Card key={b.title}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{b.icon}</div>
              <h4 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 18, margin: "0 0 6px" }}>{b.title}</h4>
              <p style={{ color: TOKENS.slate, fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>{b.desc}</p>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* Interactive Quick-Apply Modal */}
      {selectedRole && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(7, 16, 32, 0.94)", backdropFilter: "blur(18px)", zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center", padding: 20 }}>
          <div style={{ maxWidth: 740, width: "100%", maxHeight: "90vh", overflowY: "auto", background: TOKENS.panelAlt, border: `1px solid rgba(212,175,55,0.4)`, borderRadius: 12, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.85)" }}>
            {/* Header */}
            <div style={{ background: "linear-gradient(135deg, #0a1929 0%, #101828 100%)", padding: "26px 32px", borderBottom: `1px solid ${TOKENS.hair}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.teal }}>
                  {selectedRole.dept.toUpperCase()} · {selectedRole.experience}
                </span>
                <button onClick={() => setSelectedRole(null)} style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${TOKENS.hair}`, color: TOKENS.paper, fontSize: 18, cursor: "pointer", width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
              </div>
              <h2 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 24, margin: "0 0 6px" }}>
                {selectedRole.title}
              </h2>
              <div style={{ fontSize: 13, color: TOKENS.brass, fontFamily: "'JetBrains Mono', monospace" }}>
                Compensation: {selectedRole.compensation} · {selectedRole.type}
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: 32 }}>
              {applied ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: 48, marginBottom: 14 }}>🎉</div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 24, margin: "0 0 8px" }}>
                    Application Transmitted!
                  </h3>
                  <p style={{ color: TOKENS.teal, fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>
                    Our engineering leadership team will review your profile and reach out within 3 business days.
                  </p>
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: 24 }}>
                    <h4 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 18, margin: "0 0 10px" }}>
                      Key Responsibilities
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {selectedRole.responsibilities.map((resp, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13.5, color: TOKENS.slate }}>
                          <span style={{ color: TOKENS.teal }}>●</span>
                          <span>{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: 28 }}>
                    <h4 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 18, margin: "0 0 10px" }}>
                      Mandatory Requirements
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {selectedRole.requirements.map((req, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13.5, color: TOKENS.slate }}>
                          <span style={{ color: TOKENS.brass }}>✓</span>
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Application Form */}
                  <div style={{ borderTop: `1px solid ${TOKENS.hair}`, paddingTop: 24 }}>
                    <h4 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 19, margin: "0 0 16px" }}>
                      Submit Direct Application
                    </h4>
                    <form onSubmit={handleApply} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                      <div>
                        <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate, marginBottom: 6 }}>FULL NAME *</label>
                        <input required value={appForm.name} onChange={(e) => setAppForm({ ...appForm, name: e.target.value })} placeholder="John Doe" style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "10px 12px", color: TOKENS.paper, fontSize: 13.5 }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate, marginBottom: 6 }}>EMAIL ADDRESS *</label>
                        <input required type="email" value={appForm.email} onChange={(e) => setAppForm({ ...appForm, email: e.target.value })} placeholder="john@domain.com" style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "10px 12px", color: TOKENS.paper, fontSize: 13.5 }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate, marginBottom: 6 }}>LINKEDIN / GITHUB / PORTFOLIO *</label>
                        <input required value={appForm.portfolio} onChange={(e) => setAppForm({ ...appForm, portfolio: e.target.value })} placeholder="https://github.com/..." style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "10px 12px", color: TOKENS.paper, fontSize: 13.5 }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate, marginBottom: 6 }}>NOTICE PERIOD</label>
                        <select value={appForm.notice} onChange={(e) => setAppForm({ ...appForm, notice: e.target.value })} style={{ width: "100%", background: "#101828", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "10px 12px", color: TOKENS.paper, fontSize: 13.5 }}>
                          <option value="Immediate">Immediate</option>
                          <option value="15 Days">15 Days</option>
                          <option value="30 Days">30 Days</option>
                          <option value="60+ Days">60+ Days</option>
                        </select>
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate, marginBottom: 6 }}>BRIEF NOTE OR RECENT ARCHITECTURAL ACCOMPLISHMENT</label>
                        <textarea rows={3} value={appForm.notes} onChange={(e) => setAppForm({ ...appForm, notes: e.target.value })} placeholder="Tell us about a distributed system or challenging technical problem you solved..." style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "10px 12px", color: TOKENS.paper, fontSize: 13.5, resize: "vertical" }} />
                      </div>
                      <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                        <span style={{ fontSize: 11, color: TOKENS.slate, fontFamily: "'JetBrains Mono', monospace" }}>Direct review by Shiva & Abhimanyu</span>
                        <Button type="submit">Submit Application →</Button>
                      </div>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <CTA go={go} label="Ask About Openings" />
    </>
  );
}

/* ---------------------------- New B2B Marketplace Sub-Pages ---------------------------- */

function RFQWizardPage({ go, openTracker }) {
  const [step, setStep] = useState(1);
  const [rfq, setRfq] = useState({ category: "Custom CNC Machining", qty: "5,000 Units", location: "Telangana / Chennai", specs: "", cadFile: null, cadFileName: "", contactEmail: "" });
  const [submittedId, setSubmittedId] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const update = (k, v) => setRfq({ ...rfq, [k]: v });

  const handleFinish = (e) => {
    e.preventDefault();
    const id = `RFQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedId(id);
    trackEvent("submit_rfq_wizard", { id, category: rfq.category });
  };

  const simulateUpload = (fileName) => {
    setUploading(true);
    setUploadProgress(0);
    update("cadFileName", fileName);
    let prog = 0;
    const interval = setInterval(() => {
      prog += Math.floor(Math.random() * 18) + 8;
      if (prog >= 100) {
        prog = 100;
        clearInterval(interval);
        setUploading(false);
      }
      setUploadProgress(prog);
    }, 180);
  };

  const STEP_LABELS = ["Category", "Quantity", "Location", "Specs", "Upload CAD", "Review & Post"];

  if (submittedId) {
    return (
      <Section eyebrow="RFQ Confirmation" title="Requirement Posted & Broadcasted">
        <Card style={{ maxWidth: 580, margin: "0 auto", padding: 36, textAlign: "center", border: `1px solid ${TOKENS.brass}` }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(0, 168, 150, 0.15)", border: `1px solid ${TOKENS.teal}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: TOKENS.teal, fontSize: 28, fontWeight: "bold" }}>✓</div>
          <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 26, margin: "0 0 8px" }}>RFQ {submittedId} Live</h3>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.teal, marginBottom: 16 }}>BROADCASTED TO 42 MATCHED SUPPLIERS</div>
          <p style={{ color: TOKENS.slate, fontSize: 15, lineHeight: 1.6, marginBottom: 8 }}>
            Your requirement for <strong style={{ color: TOKENS.paper }}>{rfq.category} ({rfq.qty})</strong> has been verified and broadcasted instantly.
          </p>
          {rfq.cadFileName && (
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: TOKENS.brass, marginBottom: 20 }}>
              📎 CAD FILE: {rfq.cadFileName}
            </div>
          )}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <Button onClick={() => openTracker?.(submittedId)}>🔍 Track This RFQ in Real-Time →</Button>
            <Button variant="ghost" onClick={() => go("requirements")}>View Public RFQ Hub</Button>
            <Button variant="ghost" onClick={() => { setSubmittedId(""); setStep(1); }}>Post Another RFQ</Button>
          </div>
        </Card>
      </Section>
    );
  }

  return (
    <Section eyebrow="Post a Requirement (RFQ)" title="6-Step Sourcing & RFQ Builder" sub="Fill out the requirements below to receive instant verified supplier quotes.">
      <Card style={{ maxWidth: 700, margin: "0 auto", padding: 32 }}>
        {/* Step Indicator Bar */}
        <div style={{ overflowX: "auto", marginBottom: 28, paddingBottom: 16, borderBottom: `1px solid ${TOKENS.hair}` }}>
          <div style={{ display: "flex", gap: 8, minWidth: 560 }}>
            {STEP_LABELS.map((label, idx) => {
              const i = idx + 1;
              const done = step > i;
              const active = step === i;
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: done ? TOKENS.teal : active ? TOKENS.brass : "rgba(255,255,255,0.06)",
                    color: done || active ? TOKENS.ink : TOKENS.slate,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: "bold", fontFamily: "'JetBrains Mono', monospace",
                    border: active ? `2px solid ${TOKENS.brass}` : "none",
                  }}>
                    {done ? "✓" : i}
                  </div>
                  <span style={{ fontSize: 10, color: active ? TOKENS.paper : done ? TOKENS.teal : TOKENS.slate, fontFamily: "'JetBrains Mono', monospace", textAlign: "center", letterSpacing: "0.04em" }}>
                    {label.toUpperCase()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 1: Category */}
        {step === 1 && (
          <div>
            <h4 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 20, margin: "0 0 16px" }}>Step 1: Select Sourcing Category</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {["Custom CNC Machining", "Sheet Metal Fabrication", "Electronics & SMT Assembly", "AI & Software Development", "Industrial Automation", "Custom Plastic Injection"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => update("category", cat)}
                  style={{
                    background: rfq.category === cat ? "rgba(212, 175, 55, 0.12)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${rfq.category === cat ? TOKENS.brass : TOKENS.hair}`,
                    color: rfq.category === cat ? TOKENS.brass : TOKENS.paper,
                    padding: "14px 16px", borderRadius: 6, textAlign: "left", cursor: "pointer", fontSize: 13.5, transition: "all 0.15s ease"
                  }}
                >
                  {rfq.category === cat ? "✓ " : "○ "}{cat}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 24, textAlign: "right" }}><Button onClick={() => setStep(2)}>Next: Quantity →</Button></div>
          </div>
        )}

        {/* Step 2: Quantity */}
        {step === 2 && (
          <div>
            <h4 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 20, margin: "0 0 8px" }}>Step 2: Production Quantity & Batch Size</h4>
            <p style={{ color: TOKENS.slate, fontSize: 13.5, marginBottom: 16 }}>Enter the total quantity required. You may also specify prototype/sample quantities.</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
              {["100 Units (Sample)", "500 Units", "1,000 Units", "5,000 Units", "10,000 Units", "50,000+ Units"].map((qty) => (
                <button key={qty} onClick={() => update("qty", qty)} style={{ background: rfq.qty === qty ? "rgba(212,175,55,0.12)" : "rgba(255,255,255,0.04)", border: `1px solid ${rfq.qty === qty ? TOKENS.brass : TOKENS.hair}`, color: rfq.qty === qty ? TOKENS.brass : TOKENS.paper, borderRadius: 6, padding: "8px 14px", fontSize: 13, cursor: "pointer" }}>
                  {qty}
                </button>
              ))}
            </div>
            <input
              style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${TOKENS.hair}`, padding: 12, color: TOKENS.paper, borderRadius: 6, marginBottom: 16, fontSize: 14 }}
              value={rfq.qty}
              onChange={(e) => update("qty", e.target.value)}
              placeholder="Or type custom quantity / Prototype Run"
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="ghost" onClick={() => setStep(1)}>← Back</Button>
              <Button onClick={() => setStep(3)}>Next: Location →</Button>
            </div>
          </div>
        )}

        {/* Step 3: Location */}
        {step === 3 && (
          <div>
            <h4 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 20, margin: "0 0 8px" }}>Step 3: Target Delivery Location</h4>
            <p style={{ color: TOKENS.slate, fontSize: 13.5, marginBottom: 16 }}>Select your preferred delivery destination or type a custom location.</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
              {["Telangana", "Chennai", "Bengaluru", "Hyderabad", "Mumbai", "Delhi NCR", "Pan-India", "Global Export"].map((loc) => (
                <button key={loc} onClick={() => update("location", loc)} style={{ background: rfq.location === loc ? "rgba(0,168,150,0.12)" : "rgba(255,255,255,0.04)", border: `1px solid ${rfq.location === loc ? TOKENS.teal : TOKENS.hair}`, color: rfq.location === loc ? TOKENS.teal : TOKENS.paper, borderRadius: 6, padding: "8px 14px", fontSize: 13, cursor: "pointer" }}>
                  📍 {loc}
                </button>
              ))}
            </div>
            <input
              style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${TOKENS.hair}`, padding: 12, color: TOKENS.paper, borderRadius: 6, marginBottom: 16, fontSize: 14 }}
              value={rfq.location}
              onChange={(e) => update("location", e.target.value)}
              placeholder="Or type custom city / region"
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="ghost" onClick={() => setStep(2)}>← Back</Button>
              <Button onClick={() => setStep(4)}>Next: Specifications →</Button>
            </div>
          </div>
        )}

        {/* Step 4: Specs */}
        {step === 4 && (
          <div>
            <h4 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 20, margin: "0 0 8px" }}>Step 4: Technical Specifications</h4>
            <p style={{ color: TOKENS.slate, fontSize: 13.5, marginBottom: 16 }}>Describe material grades, tolerances, surface finish, and any special requirements.</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
              {["Stainless Steel 316", "Aluminium 6061", "Mild Steel", "HDPE Plastic", "PCB FR4", "Titanium Grade 5"].map((mat) => (
                <button key={mat} onClick={() => update("specs", rfq.specs ? rfq.specs + ", " + mat : mat)} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${TOKENS.hair}`, color: TOKENS.slate, borderRadius: 4, padding: "5px 10px", fontSize: 11.5, cursor: "pointer" }}>
                  + {mat}
                </button>
              ))}
            </div>
            <textarea
              rows={5}
              style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${TOKENS.hair}`, padding: 12, color: TOKENS.paper, borderRadius: 6, marginBottom: 16, fontSize: 14, resize: "vertical" }}
              value={rfq.specs}
              onChange={(e) => update("specs", e.target.value)}
              placeholder="e.g. Stainless Steel 316, ±0.01mm tolerance, Ra 1.6 µm surface finish, anodized..."
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="ghost" onClick={() => setStep(3)}>← Back</Button>
              <Button onClick={() => setStep(5)}>Next: Upload CAD →</Button>
            </div>
          </div>
        )}

        {/* Step 5: CAD/File Upload Simulation */}
        {step === 5 && (
          <div>
            <h4 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 20, margin: "0 0 8px" }}>Step 5: Upload CAD / Technical Drawing</h4>
            <p style={{ color: TOKENS.slate, fontSize: 13.5, marginBottom: 20 }}>Attach your CAD files, DXF drawings, PDF specs, or reference images. Supported: .STEP · .DXF · .PDF · .PNG · .DWG</p>

            {/* Drag & Drop zone (simulated) */}
            <div
              style={{
                border: `2px dashed ${rfq.cadFileName ? TOKENS.teal : TOKENS.hair}`,
                borderRadius: 10,
                padding: "40px 24px",
                textAlign: "center",
                cursor: "pointer",
                background: rfq.cadFileName ? "rgba(0, 168, 150, 0.06)" : "rgba(255,255,255,0.02)",
                transition: "all 0.2s ease",
                marginBottom: 16,
              }}
              onClick={() => {
                if (!rfq.cadFileName && !uploading) {
                  const files = ["part_drawing_v3.step", "valve_assy.dxf", "pcb_layout.dxf", "cad_model_final.pdf", "bracket_rev2.dwg"];
                  simulateUpload(files[Math.floor(Math.random() * files.length)]);
                }
              }}
            >
              {rfq.cadFileName ? (
                <>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>📄</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: TOKENS.teal }}>{rfq.cadFileName}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate, marginTop: 6 }}>FILE ATTACHED — UPLOAD COMPLETE ✓</div>
                  <button onClick={(e) => { e.stopPropagation(); update("cadFileName", ""); setUploadProgress(0); }} style={{ background: "transparent", border: `1px solid ${TOKENS.hair}`, color: TOKENS.slate, borderRadius: 4, padding: "4px 10px", fontSize: 11, cursor: "pointer", marginTop: 12 }}>Remove File</button>
                </>
              ) : uploading ? (
                <>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>⏳</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: TOKENS.paper, marginBottom: 12 }}>Uploading {rfq.cadFileName || "file"}...</div>
                  <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 999, height: 6, overflow: "hidden", maxWidth: 240, margin: "0 auto" }}>
                    <div style={{ height: "100%", width: `${uploadProgress}%`, background: `linear-gradient(90deg, ${TOKENS.teal}, ${TOKENS.blue})`, borderRadius: 999, transition: "width 0.2s ease" }} />
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.teal, marginTop: 8 }}>{uploadProgress}% UPLOADING</div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>📁</div>
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16, color: TOKENS.paper, marginBottom: 6 }}>Click to Upload CAD / Drawing</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate }}>STEP · DXF · PDF · DWG · PNG — max 50MB</div>
                </>
              )}
            </div>

            <div style={{ background: "rgba(212,175,55,0.06)", border: `1px solid rgba(212,175,55,0.2)`, borderRadius: 6, padding: 12, marginBottom: 20, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate }}>
              💡 TIP: Attaching a CAD file increases quote accuracy by 85% and reduces quote turnaround time.
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="ghost" onClick={() => setStep(4)}>← Back</Button>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setStep(6)} style={{ background: "transparent", border: `1px solid ${TOKENS.hair}`, color: TOKENS.slate, borderRadius: 6, padding: "10px 16px", fontSize: 13, cursor: "pointer", fontFamily: "'JetBrains Mono', monospace" }}>Skip this step</button>
                <Button onClick={() => setStep(6)}>Next: Review & Post →</Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Review & Broadcast */}
        {step === 6 && (
          <form onSubmit={handleFinish}>
            <h4 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 20, margin: "0 0 16px" }}>Step 6: Review & Broadcast RFQ</h4>

            {/* Summary table */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${TOKENS.hair}`, padding: 18, borderRadius: 8, marginBottom: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "10px 16px", fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
                <span style={{ color: TOKENS.slate }}>CATEGORY</span>
                <span style={{ color: TOKENS.paper }}>{rfq.category}</span>
                <span style={{ color: TOKENS.slate }}>QUANTITY</span>
                <span style={{ color: TOKENS.paper }}>{rfq.qty}</span>
                <span style={{ color: TOKENS.slate }}>LOCATION</span>
                <span style={{ color: TOKENS.teal }}>📍 {rfq.location}</span>
                <span style={{ color: TOKENS.slate }}>SPECS</span>
                <span style={{ color: TOKENS.paper }}>{rfq.specs || "Standard Industry Tolerance"}</span>
                {rfq.cadFileName && (
                  <>
                    <span style={{ color: TOKENS.slate }}>CAD FILE</span>
                    <span style={{ color: TOKENS.brass }}>📎 {rfq.cadFileName}</span>
                  </>
                )}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", color: TOKENS.slate, fontSize: 12, marginBottom: 6, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.04em" }}>WORK EMAIL FOR QUOTE RESPONSES *</label>
              <input
                type="email"
                required
                style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${TOKENS.hair}`, padding: 12, color: TOKENS.paper, borderRadius: 6, fontSize: 14 }}
                value={rfq.contactEmail}
                onChange={(e) => update("contactEmail", e.target.value)}
                placeholder="you@company.com"
              />
            </div>

            <div style={{ background: "rgba(0, 168, 150, 0.06)", border: `1px solid rgba(0, 168, 150, 0.2)`, borderRadius: 6, padding: 12, marginBottom: 20, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.teal }}>
              🚀 This RFQ will be instantly broadcasted to 42 verified suppliers matching your category and location.
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="ghost" onClick={() => setStep(5)}>← Back</Button>
              <Button type="submit">Broadcast RFQ Now 🚀</Button>
            </div>
          </form>
        )}
      </Card>
    </Section>
  );
}


function ManufacturersPage({ go, openSupplierOnboarding, openVendorCompare }) {
  const [selectedMfr, setSelectedMfr] = useState(null);
  const [quoteForm, setQuoteForm] = useState({ material: "", qty: "", timeline: "", email: "" });
  const [quoteSent, setQuoteSent] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [compareIds, setCompareIds] = useState(["mfr-1", "mfr-2"]);

  const updateQuote = (k, v) => setQuoteForm({ ...quoteForm, [k]: v });

  const toggleCompare = (id) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    trackEvent("manufacturer_quote_request", { mfrId: selectedMfr?.id, ...quoteForm });
    setQuoteSent(true);
    setTimeout(() => { setQuoteSent(false); setSelectedMfr(null); setQuoteForm({ material: "", qty: "", timeline: "", email: "" }); }, 2500);
  };

  const EXTRA_MANUFACTURERS = [
    {
      id: "mfr-4",
      name: "Bharat Rubber & Sealing Systems",
      category: "Rubber & Gasket Manufacturing",
      location: "Pune, Maharashtra",
      rating: "★ 4.6 (38 reviews)",
      capabilities: ["Custom Rubber Molding", "O-Ring Manufacturing", "Silicone Gaskets", "EPDM Seals", "Viton Compounds"],
      responseRate: "⚡ Avg. quote turnaround: 10 hours",
      certifications: ["ISO 9001:2015", "IATF 16949"],
      moq: "500 pieces",
      capacity: "2,00,000 units/month",
    },
    {
      id: "mfr-5",
      name: "Skylark Precision Castings",
      category: "Investment Casting & Foundry",
      location: "Coimbatore, Tamil Nadu",
      rating: "★ 4.8 (61 reviews)",
      capabilities: ["Lost-Wax Investment Casting", "Sand Casting", "Aluminum & Brass Alloys", "Heat Treatment", "CNC Post-Machining"],
      responseRate: "⚡ Avg. quote turnaround: 6 hours",
      certifications: ["ISO 9001:2015", "AS9100D (Aerospace)"],
      moq: "200 pieces",
      capacity: "50 tons/month",
    },
  ];

  const allManufacturers = [...B2B_MANUFACTURERS, ...EXTRA_MANUFACTURERS];

  const categories = ["All Categories", "CNC Machining", "Sheet Metal", "Electronics", "Rubber & Sealing", "Castings"];

  const filteredManufacturers = allManufacturers.filter((m) => {
    if (selectedCategory === "All Categories") return true;
    const cat = selectedCategory.toLowerCase();
    if (cat.includes("cnc")) return m.category.toLowerCase().includes("cnc") || m.capabilities.some((c) => c.toLowerCase().includes("cnc") || c.toLowerCase().includes("turn") || c.toLowerCase().includes("mill"));
    if (cat.includes("sheet")) return m.category.toLowerCase().includes("sheet") || m.capabilities.some((c) => c.toLowerCase().includes("laser") || c.toLowerCase().includes("sheet"));
    if (cat.includes("electron")) return m.category.toLowerCase().includes("electron") || m.capabilities.some((c) => c.toLowerCase().includes("pcb") || c.toLowerCase().includes("smt"));
    if (cat.includes("rubber")) return m.category.toLowerCase().includes("rubber") || m.capabilities.some((c) => c.toLowerCase().includes("gasket") || c.toLowerCase().includes("seal"));
    if (cat.includes("cast")) return m.category.toLowerCase().includes("cast") || m.capabilities.some((c) => c.toLowerCase().includes("cast") || c.toLowerCase().includes("foundry"));
    return true;
  });

  return (
    <>
      <Section eyebrow="Verified Manufacturers" title="Industrial & OEM Manufacturing Partners" sub="Directly source custom manufacturing, CNC machining, metal fabrication, and electronics assembly.">
        {/* Factory Verification Banner */}
        <div style={{
          background: "linear-gradient(135deg, rgba(212,175,55,0.12), rgba(21,101,192,0.14))",
          border: `1px solid rgba(212,175,55,0.35)`,
          borderRadius: 14,
          padding: "18px 24px",
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16
        }}>
          <div style={{ maxWidth: 720 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 20 }}>🏭</span>
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: 16, fontWeight: 700, color: TOKENS.white, letterSpacing: "0.03em" }}>
                Are you an OEM Manufacturer or Precision Machine Shop?
              </span>
              <span style={{ background: `${TOKENS.teal}22`, border: `1px solid ${TOKENS.teal}55`, color: TOKENS.teal, padding: "2px 8px", borderRadius: 999, fontSize: 10, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
                BATCH Q4 ENROLLMENT OPEN
              </span>
            </div>
            <p style={{ margin: 0, fontSize: 13, color: TOKENS.slate, lineHeight: 1.5 }}>
              Register your production plant, machine capacity (CNC, VMC, EDM, SMT), and quality certifications (ISO 9001, AS9100D, IATF 16949) to receive direct corporate RFQs and escrow-guaranteed contracts.
            </p>
          </div>
          <button
            onClick={() => openSupplierOnboarding && openSupplierOnboarding()}
            style={{
              background: `linear-gradient(135deg, ${TOKENS.brass}, #F59E0B)`,
              color: "#080E1A",
              border: "none",
              borderRadius: 8,
              padding: "11px 20px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12.5,
              fontWeight: 800,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 4px 14px rgba(212,175,55,0.3)",
              whiteSpace: "nowrap"
            }}
          >
            <span>★ Register Plant & Get Verified →</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background: selectedCategory === cat ? TOKENS.brass : "rgba(255,255,255,0.04)",
                  border: `1px solid ${selectedCategory === cat ? TOKENS.brass : TOKENS.hair}`,
                  color: selectedCategory === cat ? TOKENS.ink : TOKENS.slate,
                  borderRadius: 999,
                  padding: "7px 16px",
                  fontSize: 12.5,
                  cursor: "pointer",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: selectedCategory === cat ? 700 : 400
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => openVendorCompare?.(compareIds.length >= 2 ? compareIds : ["mfr-1", "mfr-2", "mfr-3"])}
            style={{
              background: "rgba(212,175,55,0.12)",
              border: `1px solid ${TOKENS.brass}`,
              color: TOKENS.brass,
              borderRadius: 8,
              padding: "7px 16px",
              fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6
            }}
          >
            <span>⚖️ Open Vendor Compare Matrix ({compareIds.length}) →</span>
          </button>
        </div>

        <Grid min={300}>
          {filteredManufacturers.map((m) => {
            const isCompared = compareIds.includes(m.id);
            return (
              <Card key={m.id} style={{ border: isCompared ? `1px solid ${TOKENS.brass}` : undefined }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ background: "rgba(212, 175, 55, 0.12)", border: `1px solid rgba(212,175,55,0.4)`, borderRadius: 4, padding: "4px 10px", fontSize: 11, color: TOKENS.brass, fontFamily: "'JetBrains Mono', monospace" }}>✓ VERIFIED SUPPLIER</span>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <button
                      type="button"
                      onClick={() => toggleCompare(m.id)}
                      style={{
                        background: isCompared ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${isCompared ? TOKENS.brass : TOKENS.hair}`,
                        color: isCompared ? TOKENS.brass : TOKENS.slate,
                        padding: "3px 8px",
                        borderRadius: 4,
                        fontSize: 10.5,
                        fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      {isCompared ? "✓ Compared" : "⚖️ Compare"}
                    </button>
                    <span style={{ fontSize: 12, color: TOKENS.teal, fontFamily: "'JetBrains Mono', monospace" }}>{m.rating.split(" ")[0]}</span>
                  </div>
                </div>
                <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 20, margin: "0 0 4px" }}>{m.name}</h3>
                <div style={{ fontSize: 13, color: TOKENS.slate, marginBottom: 6 }}>📍 {m.location}</div>
                <div style={{ fontSize: 12, color: TOKENS.teal, fontFamily: "'JetBrains Mono', monospace", marginBottom: 12 }}>{m.category}</div>

                <div style={{ borderTop: `1px solid ${TOKENS.hair}`, borderBottom: `1px solid ${TOKENS.hair}`, padding: "10px 0", margin: "10px 0" }}>
                  <div style={{ fontSize: 11, color: TOKENS.paper, fontWeight: 600, marginBottom: 6, fontFamily: "'JetBrains Mono', monospace" }}>CAPABILITIES</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {m.capabilities.map((c) => (
                      <span key={c} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${TOKENS.hair}`, padding: "3px 7px", borderRadius: 3, fontSize: 11, color: TOKENS.slate }}>{c}</span>
                    ))}
                  </div>
                </div>

                {m.moq && (
                  <div style={{ display: "flex", gap: 16, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>
                    <span style={{ color: TOKENS.slate }}>MOQ: <span style={{ color: TOKENS.paper }}>{m.moq}</span></span>
                    <span style={{ color: TOKENS.slate }}>CAP: <span style={{ color: TOKENS.paper }}>{m.capacity}</span></span>
                  </div>
                )}

                <div style={{ fontSize: 11.5, color: TOKENS.brass, fontFamily: "'JetBrains Mono', monospace", marginBottom: 16 }}>{m.responseRate}</div>
                <div style={{ display: "flex", gap: 10 }}>
                  <Button onClick={() => { setSelectedMfr(m); setQuoteSent(false); }}>Request Quote →</Button>
                  <Button variant="ghost" onClick={() => go("rfq-wizard")}>Post RFQ</Button>
                </div>
              </Card>
            );
          })}
        </Grid>

        {/* Floating Compare Dock */}
        {compareIds.length > 0 && (
          <div style={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 8900,
            background: "rgba(11, 31, 58, 0.96)",
            border: `1px solid ${TOKENS.brass}`,
            borderRadius: 999,
            padding: "10px 24px",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 16px 40px rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: TOKENS.paper }}>
              ⚖️ <strong>{compareIds.length}</strong> {compareIds.length === 1 ? "Plant" : "Plants"} Selected
            </span>
            <button
              onClick={() => openVendorCompare?.(compareIds)}
              style={{
                background: `linear-gradient(135deg, ${TOKENS.brass}, #F59E0B)`,
                color: "#080E1A",
                border: "none",
                borderRadius: 999,
                padding: "7px 18px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Compare Side-by-Side →
            </button>
            <button
              onClick={() => setCompareIds([])}
              style={{
                background: "transparent",
                border: "none",
                color: TOKENS.slate,
                fontSize: 12,
                fontFamily: "'JetBrains Mono', monospace",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Clear
            </button>
          </div>
        )}
      </Section>

      {/* Manufacturer Quick-Quote Modal */}
      {selectedMfr && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(7, 16, 32, 0.92)", backdropFilter: "blur(16px)", zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center", padding: 20 }}>
          <div style={{ maxWidth: 600, width: "100%", background: TOKENS.panelAlt, border: `1px solid rgba(212,175,55,0.3)`, borderRadius: 12, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.7)" }}>
            {/* Header */}
            <div style={{ background: "linear-gradient(135deg, #0a1929 0%, #101828 100%)", padding: "24px 28px", borderBottom: `1px solid ${TOKENS.hair}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.brass, marginBottom: 6, letterSpacing: "0.1em" }}>✓ VERIFIED MANUFACTURER</div>
                  <h2 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 22, margin: "0 0 4px" }}>{selectedMfr.name}</h2>
                  <div style={{ fontSize: 13, color: TOKENS.slate }}>📍 {selectedMfr.location} · {selectedMfr.category}</div>
                </div>
                <button onClick={() => setSelectedMfr(null)} style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${TOKENS.hair}`, color: TOKENS.paper, fontSize: 16, cursor: "pointer", width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
              </div>
            </div>

            <div style={{ padding: 28 }}>
              {quoteSent ? (
                <div style={{ textAlign: "center", padding: "32px 0" }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 22, margin: "0 0 8px" }}>Quote Request Sent!</h3>
                  <p style={{ color: TOKENS.teal, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>Expect response within {selectedMfr.responseRate?.split(": ")[1] || "24 hours"}</p>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit}>
                  <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 18, margin: "0 0 20px" }}>Request Direct Quote from {selectedMfr.name.split(" ")[0]}</h3>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                    <div>
                      <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate, marginBottom: 6, letterSpacing: "0.04em" }}>MATERIAL / PRODUCT *</label>
                      <input required value={quoteForm.material} onChange={(e) => updateQuote("material", e.target.value)} placeholder="e.g. SS316 CNC Part" style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "10px 14px", color: TOKENS.paper, fontSize: 14 }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate, marginBottom: 6, letterSpacing: "0.04em" }}>QUANTITY *</label>
                      <input required value={quoteForm.qty} onChange={(e) => updateQuote("qty", e.target.value)} placeholder="e.g. 5,000 units" style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "10px 14px", color: TOKENS.paper, fontSize: 14 }} />
                    </div>
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate, marginBottom: 6, letterSpacing: "0.04em" }}>REQUIRED DELIVERY TIMELINE</label>
                    <select value={quoteForm.timeline} onChange={(e) => updateQuote("timeline", e.target.value)} style={{ width: "100%", background: "#101828", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "10px 14px", color: TOKENS.paper, fontSize: 14 }}>
                      <option value="">Select timeline</option>
                      <option value="Urgent (< 2 weeks)">Urgent (Less than 2 weeks)</option>
                      <option value="1 Month">1 Month</option>
                      <option value="2-3 Months">2–3 Months</option>
                      <option value="Flexible">Flexible / Long-term</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate, marginBottom: 6, letterSpacing: "0.04em" }}>YOUR WORK EMAIL *</label>
                    <input required type="email" value={quoteForm.email} onChange={(e) => updateQuote("email", e.target.value)} placeholder="you@company.com" style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "10px 14px", color: TOKENS.paper, fontSize: 14 }} />
                  </div>

                  <div style={{ display: "flex", gap: 12 }}>
                    <Button type="submit">Send Quote Request →</Button>
                    <Button variant="ghost" onClick={() => go("rfq-wizard")}>Use Full RFQ Wizard</Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <CTA go={go} label="List Your Manufacturing Business" />
    </>
  );
}

function BusinessesPage({ go }) {
  const [selectedBiz, setSelectedBiz] = useState(null);
  const [profileTab, setProfileTab] = useState("about");

  const BIZ_PROFILES = {
    "biz-1": {
      about: "Abhimanyu Technologies is an enterprise technology company building AI systems, cloud infrastructure, and custom B2B software platforms for organizations that require absolute reliability. Founded in 2020, headquartered in Telangana, India.",
      products: ["Abhimanyu ERP — Unified business operations", "Abhimanyu CRM — Sales & lead management", "Abhimanyu AI Platform — Enterprise AI automation", "Abhimanyu IoT Fleet Manager", "Abhimanyu Analytics Dashboard"],
      services: ["Custom Software Engineering", "AI & Machine Learning Models", "Cloud & Anycast Load Balancing", "Zero-Trust Cybersecurity", "IoT & Embedded Systems"],
      manufacturing: "Not applicable — Software & Cloud AI company",
      certifications: ["ISO 9001:2015", "SOC2 Type II (In Progress)", "AWS Advanced Partner", "Microsoft Azure Partner"],
      reviews: [
        { client: "FinTech Corp", rating: "5★", text: "Built our sub-10ms AI fraud detection API. Exceptional architecture." },
        { client: "Logistics Leader", rating: "5★", text: "Reduced cloud overhead by 64%. Zero downtime migration." },
      ]
    },
    "biz-2": {
      about: "Vertex Automation & Robotics Systems is a leading Industrial IoT and Robotics OEM headquartered in Pune, Maharashtra. Since 2018, we design and manufacture SCADA systems, PLC automation, and conveyor robotics for India's top manufacturers.",
      products: ["SCADA Control System v5", "PLC Logic Controllers", "Industrial Conveyor Automation", "IoT Sensor Gateway", "Predictive Maintenance AI"],
      services: ["Industrial Automation Design", "PLC Programming & Integration", "SCADA System Installation", "Robotic Line Commissioning", "Annual Maintenance Contracts"],
      manufacturing: "In-house manufacturing of control panels, IoT sensor nodes, and conveyor systems. Capacity: 200 units/month.",
      certifications: ["ISO 9001:2015", "CE Marked Products", "IEC 61131-3 PLC Standard", "UL Listed Components"],
      reviews: [
        { client: "Auto OEM", rating: "5★", text: "Reduced production line downtime by 78% with predictive maintenance." },
        { client: "Steel Plant", rating: "4.8★", text: "Fully automated our conveyor system. Excellent support team." },
      ]
    }
  };

  const profile = selectedBiz ? (BIZ_PROFILES[selectedBiz.id] || BIZ_PROFILES["biz-1"]) : null;

  const PROFILE_TABS = [
    { id: "about", label: "About" },
    { id: "products", label: "Products" },
    { id: "services", label: "Services" },
    { id: "manufacturing", label: "Manufacturing" },
    { id: "certifications", label: "Certifications" },
    { id: "reviews", label: "Reviews" },
  ];

  return (
    <>
      <Section eyebrow="B2B Business Directory" title="Verified Enterprises & Service Providers" sub="Search and connect with verified enterprise technology partners and industrial suppliers.">
        <Grid min={320}>
          {B2B_BUSINESSES.map((b) => (
            <Card key={b.id}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ background: "rgba(21,101,192,0.12)", border: `1px solid rgba(21,101,192,0.3)`, borderRadius: 4, padding: "4px 10px", fontSize: 11, color: "#60A5FA", fontFamily: "'JetBrains Mono', monospace" }}>{b.type.toUpperCase()}</span>
                <span style={{ color: TOKENS.brass, fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>✓ VERIFIED</span>
              </div>
              <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 22, margin: "0 0 6px" }}>{b.name}</h3>
              <div style={{ fontSize: 13, color: TOKENS.slate, marginBottom: 8 }}>📍 {b.location} · Est. {b.established}</div>
              <div style={{ fontSize: 12.5, color: TOKENS.teal, marginBottom: 14 }}>{b.rating} · {b.employees}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                {b.specialties.map((s) => (
                  <span key={s} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${TOKENS.hair}`, padding: "4px 8px", borderRadius: 4, fontSize: 11, color: TOKENS.slate }}>{s}</span>
                ))}
              </div>
              <Button variant="ghost" onClick={() => { setSelectedBiz(b); setProfileTab("about"); }}>View Company Profile →</Button>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* Business Full Mini-Website Profile Modal */}
      {selectedBiz && profile && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(7, 16, 32, 0.92)", backdropFilter: "blur(16px)", zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center", padding: 20 }}>
          <div style={{ maxWidth: 760, width: "100%", maxHeight: "90vh", overflowY: "auto", background: TOKENS.panelAlt, border: `1px solid rgba(212,175,55,0.3)`, borderRadius: 12, boxShadow: "0 32px 80px rgba(0,0,0,0.7)" }}>
            {/* Profile Header */}
            <div style={{ background: `linear-gradient(135deg, #0d2040 0%, ${TOKENS.panelAlt} 100%)`, padding: "28px 32px 0", borderBottom: `1px solid ${TOKENS.hair}`, borderRadius: "12px 12px 0 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.brass, marginBottom: 8, letterSpacing: "0.1em" }}>✓ VERIFIED BUSINESS PROFILE</div>
                  <h2 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 26, margin: "0 0 6px" }}>{selectedBiz.name}</h2>
                  <div style={{ fontSize: 14, color: TOKENS.teal, marginBottom: 8 }}>{selectedBiz.type}</div>
                  <div style={{ display: "flex", gap: 16, fontSize: 13, color: TOKENS.slate }}>
                    <span>📍 {selectedBiz.location}</span>
                    <span>🏢 Est. {selectedBiz.established}</span>
                    <span>👥 {selectedBiz.employees}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedBiz(null)} style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${TOKENS.hair}`, color: TOKENS.paper, fontSize: 18, cursor: "pointer", width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
              </div>
              <div style={{ fontSize: 12.5, color: TOKENS.brass, fontFamily: "'JetBrains Mono', monospace", marginBottom: 16 }}>{selectedBiz.rating}</div>

              {/* Tab navigation */}
              <div style={{ display: "flex", gap: 2, overflowX: "auto", paddingBottom: 0 }}>
                {PROFILE_TABS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setProfileTab(t.id)}
                    style={{
                      background: "transparent",
                      border: "none",
                      borderBottom: `2px solid ${profileTab === t.id ? TOKENS.brass : "transparent"}`,
                      color: profileTab === t.id ? TOKENS.brass : TOKENS.slate,
                      fontSize: 13,
                      fontFamily: "'JetBrains Mono', monospace",
                      padding: "8px 16px 10px",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      transition: "all 0.15s ease",
                      fontWeight: profileTab === t.id ? 700 : 400,
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div style={{ padding: 32 }}>
              {profileTab === "about" && (
                <div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 20, margin: "0 0 14px" }}>About {selectedBiz.name}</h3>
                  <p style={{ color: TOKENS.slate, fontSize: 15, lineHeight: 1.75, marginBottom: 24 }}>{profile.about}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {[
                      { label: "Founded", value: selectedBiz.established },
                      { label: "Team Size", value: selectedBiz.employees },
                      { label: "Location", value: selectedBiz.location },
                      { label: "Rating", value: selectedBiz.rating },
                    ].map((item) => (
                      <div key={item.label} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "12px 16px" }}>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.slate, marginBottom: 4 }}>{item.label.toUpperCase()}</div>
                        <div style={{ color: TOKENS.paper, fontSize: 14, fontWeight: 500 }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {profileTab === "products" && (
                <div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 20, margin: "0 0 16px" }}>Products & Platforms</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {profile.products.map((p, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.03)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "12px 16px" }}>
                        <span style={{ color: TOKENS.brass, fontSize: 16 }}>📦</span>
                        <span style={{ color: TOKENS.paper, fontSize: 14 }}>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {profileTab === "services" && (
                <div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 20, margin: "0 0 16px" }}>Services Offered</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {profile.services.map((s, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(0,168,150,0.05)", border: `1px solid rgba(0,168,150,0.2)`, borderRadius: 6, padding: "12px 16px" }}>
                        <span style={{ color: TOKENS.teal, fontSize: 14 }}>✓</span>
                        <span style={{ color: TOKENS.paper, fontSize: 14 }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {profileTab === "manufacturing" && (
                <div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 20, margin: "0 0 14px" }}>Manufacturing Capabilities</h3>
                  <p style={{ color: TOKENS.slate, fontSize: 15, lineHeight: 1.7 }}>{profile.manufacturing}</p>
                </div>
              )}

              {profileTab === "certifications" && (
                <div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 20, margin: "0 0 16px" }}>Certifications & Compliance</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {profile.certifications.map((cert, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(212,175,55,0.06)", border: `1px solid rgba(212,175,55,0.25)`, borderRadius: 6, padding: "12px 16px" }}>
                        <span style={{ color: TOKENS.brass, fontSize: 16 }}>🏅</span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: TOKENS.paper }}>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {profileTab === "reviews" && (
                <div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 20, margin: "0 0 16px" }}>Client Reviews</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {profile.reviews.map((r, i) => (
                      <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: 20 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                          <span style={{ fontFamily: "'Fraunces', serif", fontSize: 16, color: TOKENS.paper }}>{r.client}</span>
                          <span style={{ color: TOKENS.brass, fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>{r.rating}</span>
                        </div>
                        <p style={{ color: TOKENS.slate, fontSize: 14, lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>"{r.text}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Footer */}
              <div style={{ marginTop: 28, paddingTop: 24, borderTop: `1px solid ${TOKENS.hair}`, display: "flex", gap: 12 }}>
                <Button onClick={() => { setSelectedBiz(null); go("contact"); }}>Send Direct Enquiry →</Button>
                <Button variant="ghost" onClick={() => go("rfq-wizard")}>Post RFQ to This Supplier</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <CTA go={go} />
    </>
  );
}

function RequirementsPage({ go, openTracker, currency = "INR" }) {
  const [selectedCat, setSelectedCat] = useState("All");
  const [search, setSearch] = useState("");
  const [quotingRfq, setQuotingRfq] = useState(null);
  const [bidsMap, setBidsMap] = useState({});
  const [quoteForm, setQuoteForm] = useState({ price: "", leadTime: "14 Days", notes: "", company: "", email: "" });
  const [submittedBid, setSubmittedBid] = useState(false);

  const categories = ["All", "Custom CNC Machining", "Electronics Assembly", "Custom Plastic Injection", "AI & Software Development"];

  const filtered = PUBLIC_RFQS.filter((rfq) => {
    const matchesCat = selectedCat === "All" || rfq.category === selectedCat;
    const matchesQuery = rfq.title.toLowerCase().includes(search.toLowerCase()) ||
                         rfq.location.toLowerCase().includes(search.toLowerCase()) ||
                         rfq.id.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    trackEvent("submit_rfq_bid", { rfqId: quotingRfq.id, price: quoteForm.price, email: quoteForm.email });
    setBidsMap((prev) => ({
      ...prev,
      [quotingRfq.id]: (prev[quotingRfq.id] || parseInt(quotingRfq.bidsCount) || 12) + 1
    }));
    setSubmittedBid(true);
    setTimeout(() => {
      setSubmittedBid(false);
      setQuotingRfq(null);
      setQuoteForm({ price: "", leadTime: "14 Days", notes: "", company: "", email: "" });
    }, 2400);
  };

  return (
    <>
      <Section eyebrow="Public Requirements Hub" title="Live RFQs & Sourcing Inquiries" sub="Explore live buyer requirements, filter by manufacturing capability, and submit competitive quotations directly.">
        {/* Top RFQ Tracker Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(21,101,192,0.12) 0%, rgba(0,168,150,0.12) 100%)",
            border: `1px solid rgba(0,168,150,0.35)`,
            borderRadius: 8,
            padding: "16px 22px",
            marginBottom: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 14,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 24 }}>🛰️</span>
            <div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16, color: TOKENS.paper, fontWeight: 600 }}>
                Live RFQ Procurement & PO Status Tracker
              </div>
              <div style={{ fontSize: 12.5, color: TOKENS.slate }}>
                Track automated DFM CAD mesh verification, evaluate competing supplier quotes, and generate digital Purchase Orders.
              </div>
            </div>
          </div>
          <button
            onClick={() => openTracker?.("RFQ-2026-9041")}
            style={{
              background: TOKENS.teal,
              color: "#0B1F3A",
              border: "none",
              borderRadius: 5,
              padding: "8px 16px",
              fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            🔍 Track RFQ Milestones & Bids →
          </button>
        </div>

        {/* Controls: Search and Filter Tabs */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 14, marginBottom: 24 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                style={{
                  background: selectedCat === cat ? TOKENS.brass : "rgba(255,255,255,0.04)",
                  border: `1px solid ${selectedCat === cat ? TOKENS.brass : TOKENS.hair}`,
                  color: selectedCat === cat ? TOKENS.ink : TOKENS.slate,
                  borderRadius: 999,
                  padding: "6px 14px",
                  fontSize: 12,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: selectedCat === cat ? 700 : 400,
                  cursor: "pointer",
                  transition: "all 0.15s ease"
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ minWidth: 260, flex: "1 1 260px", maxWidth: 360 }}>
            <input
              type="text"
              placeholder="Search RFQs by keyword or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                background: "rgba(16, 24, 40, 0.8)",
                border: `1px solid ${TOKENS.hair}`,
                borderRadius: 6,
                padding: "8px 14px",
                color: TOKENS.paper,
                fontSize: 13,
                fontFamily: "'Inter', sans-serif"
              }}
            />
          </div>
        </div>

        {/* Live RFQ Grid */}
        <Grid min={320}>
          {filtered.map((rfq) => {
            const currentBids = bidsMap[rfq.id] || parseInt(rfq.bidsCount) || 12;
            return (
              <Card key={rfq.id}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", marginBottom: 12 }}>
                  <span style={{ color: TOKENS.teal, background: "rgba(0,168,150,0.1)", padding: "3px 8px", borderRadius: 3 }}>{rfq.id}</span>
                  <span style={{ color: rfq.status === "HIGH PRIORITY" ? "#EF4444" : TOKENS.brass, fontWeight: 700 }}>
                    ● {rfq.status}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 19, margin: "0 0 10px", lineHeight: 1.35 }}>{rfq.title}</h3>
                
                <div style={{ fontSize: 13, color: TOKENS.slate, marginBottom: 5 }}>
                  <b style={{ color: TOKENS.paper }}>Category:</b> {rfq.category}
                </div>
                <div style={{ fontSize: 13, color: TOKENS.slate, marginBottom: 5 }}>
                  <b style={{ color: TOKENS.paper }}>Batch Size:</b> {rfq.quantity}
                </div>
                <div style={{ fontSize: 13, color: TOKENS.slate, marginBottom: 5 }}>
                  <b style={{ color: TOKENS.paper }}>Target:</b> {rfq.location.replace("Target Delivery: ", "")}
                </div>
                <div style={{ fontSize: 13, color: TOKENS.slate, marginBottom: 5 }}>
                  <b style={{ color: TOKENS.paper }}>Tolerance / Material:</b> {rfq.tolerance || "Standard Spec"}
                </div>
                <div style={{ fontSize: 13, color: TOKENS.teal, fontFamily: "'JetBrains Mono', monospace", marginTop: 8, marginBottom: 14 }}>
                  Estimated Budget: {rfq.budget} · {rfq.deadline}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${TOKENS.hair}`, paddingTop: 14, marginTop: 12, flexWrap: "wrap", gap: 8 }}>
                  <span style={{ fontSize: 12, color: TOKENS.brass, fontFamily: "'JetBrains Mono', monospace" }}>
                    ⚡ {currentBids} Bids Submitted
                  </span>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <button
                      onClick={() => openTracker?.(rfq.id)}
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: `1px solid ${TOKENS.hair}`,
                        color: TOKENS.paper,
                        padding: "7px 12px",
                        borderRadius: 4,
                        fontSize: 11.5,
                        fontFamily: "'JetBrains Mono', monospace",
                        cursor: "pointer",
                      }}
                    >
                      Inspect Timeline →
                    </button>
                    <Button onClick={() => setQuotingRfq(rfq)}>Submit Quotation →</Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </Grid>
      </Section>

      {/* Interactive Quotation Submission Modal */}
      {quotingRfq && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(7, 16, 32, 0.92)", backdropFilter: "blur(16px)", zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center", padding: 20 }}>
          <div style={{ maxWidth: 620, width: "100%", background: TOKENS.panelAlt, border: `1px solid rgba(212,175,55,0.4)`, borderRadius: 12, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.8)" }}>
            <div style={{ background: "linear-gradient(135deg, #0a1929 0%, #101828 100%)", padding: "20px 28px", borderBottom: `1px solid ${TOKENS.hair}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.teal, marginBottom: 4, letterSpacing: "0.1em" }}>OFFICIAL QUOTATION SUBMISSION</div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 18, margin: 0 }}>{quotingRfq.id}: {quotingRfq.title}</h3>
                </div>
                <button onClick={() => setQuotingRfq(null)} style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${TOKENS.hair}`, color: TOKENS.paper, fontSize: 16, cursor: "pointer", width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
              </div>
            </div>

            <div style={{ padding: 28 }}>
              {submittedBid ? (
                <div style={{ textAlign: "center", padding: "32px 0" }}>
                  <div style={{ fontSize: 44, marginBottom: 12 }}>🚀</div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 22, margin: "0 0 8px" }}>Quotation Broadcasted Successfully!</h3>
                  <p style={{ color: TOKENS.teal, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
                    Your proposal for {quotingRfq.id} has been transmitted to buyer "{quotingRfq.buyer || "Enterprise Buyer"}".
                  </p>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                    <div>
                      <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate, marginBottom: 6 }}>PROPOSED TOTAL BID PRICE *</label>
                      <input
                        required
                        placeholder="e.g. $48,500 USD or ₹38,00,000"
                        value={quoteForm.price}
                        onChange={(e) => setQuoteForm({ ...quoteForm, price: e.target.value })}
                        style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "10px 12px", color: TOKENS.paper, fontSize: 13 }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate, marginBottom: 6 }}>PRODUCTION LEAD TIME</label>
                      <select
                        value={quoteForm.leadTime}
                        onChange={(e) => setQuoteForm({ ...quoteForm, leadTime: e.target.value })}
                        style={{ width: "100%", background: "#101828", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "10px 12px", color: TOKENS.paper, fontSize: 13 }}
                      >
                        <option value="7 Days">7 Business Days (Express)</option>
                        <option value="14 Days">14 Business Days (Standard)</option>
                        <option value="21 Days">21 Business Days</option>
                        <option value="30+ Days">30+ Business Days</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                    <div>
                      <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate, marginBottom: 6 }}>MANUFACTURER / VENDOR NAME *</label>
                      <input
                        required
                        placeholder="Your Enterprise Name"
                        value={quoteForm.company}
                        onChange={(e) => setQuoteForm({ ...quoteForm, company: e.target.value })}
                        style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "10px 12px", color: TOKENS.paper, fontSize: 13 }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate, marginBottom: 6 }}>WORK EMAIL FOR DIRECT CONTACT *</label>
                      <input
                        required
                        type="email"
                        placeholder="sales@yourcompany.com"
                        value={quoteForm.email}
                        onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                        style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "10px 12px", color: TOKENS.paper, fontSize: 13 }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate, marginBottom: 6 }}>TECHNICAL QUALIFICATIONS & SCOPE NOTES</label>
                    <textarea
                      rows={3}
                      placeholder="Specify CNC machines, material traceability certificates (MTR), surface coating tolerances..."
                      value={quoteForm.notes}
                      onChange={(e) => setQuoteForm({ ...quoteForm, notes: e.target.value })}
                      style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "10px 12px", color: TOKENS.paper, fontSize: 13, resize: "vertical" }}
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: TOKENS.slate, fontFamily: "'JetBrains Mono', monospace" }}>🔒 Verified SSL Encrypted Bid</span>
                    <Button type="submit">Transmit Formal Quote →</Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <CTA go={go} label="Post Your Own Requirement" />
    </>
  );
}

function BusinessDashboardPage({ go, currency = "INR", currentUser, openTracker, openAuth, openCAD, openEscrow, openTraceability }) {
  const [timeframe, setTimeframe] = useState("30D");
  const [leadsState, setLeadsState] = useState(
    PUBLIC_RFQS.map((item) => ({ ...item, quoted: false, dismissed: false }))
  );
  const [notification, setNotification] = useState("⚡ Live: 2 new buyers posted RFQs in CNC & SMT in the last 15 mins");

  const metrics = {
    "7D": { views: "680", leads: "28", quotes: "14", pipeline: "$142,000", winRate: "34%" },
    "30D": { views: "2,450", leads: "120", quotes: "45", pipeline: "$480,000", winRate: "38%" },
    "Q1": { views: "8,920", leads: "390", quotes: "148", pipeline: "$1,620,000", winRate: "41%" },
    "ALL": { views: "24,800", leads: "1,140", quotes: "482", pipeline: "$5,240,000", winRate: "42%" }
  }[timeframe];

  const handleAction = (id, type) => {
    trackEvent(`dashboard_lead_${type}`, { rfqId: id });
    setLeadsState((prev) =>
      prev.map((l) => (l.id === id ? { ...l, quoted: type === "quote", dismissed: type === "dismiss" } : l))
    );
  };

  const activeLeads = leadsState.filter((l) => !l.dismissed);

  return (
    <Section eyebrow="Seller & Business Dashboard" title="Enterprise Account Command Center" sub="Manage inbound buyer leads, active product listings, RFQ submissions, and performance telemetry.">
      <Card style={{ padding: 32 }}>
        {/* Live Notification Strip */}
        {notification && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(21, 101, 192, 0.15)", border: `1px solid rgba(21, 101, 192, 0.4)`, borderRadius: 6, padding: "10px 16px", marginBottom: 24, fontSize: 13, color: TOKENS.paper, fontFamily: "'JetBrains Mono', monospace" }}>
            <span>{notification}</span>
            <button onClick={() => setNotification(null)} style={{ background: "transparent", border: "none", color: TOKENS.slate, cursor: "pointer", fontSize: 14 }}>✕</button>
          </div>
        )}

        {/* Timeframe Selector & Export Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {["7D", "30D", "Q1", "ALL"].map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                style={{
                  background: timeframe === t ? TOKENS.brass : "rgba(255,255,255,0.04)",
                  border: `1px solid ${timeframe === t ? TOKENS.brass : TOKENS.hair}`,
                  color: timeframe === t ? TOKENS.ink : TOKENS.paper,
                  padding: "5px 12px",
                  borderRadius: 4,
                  fontSize: 12,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: timeframe === t ? 700 : 400,
                  cursor: "pointer"
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => {
                trackEvent("export_dashboard_csv");
                alert("Downloading CSV report for " + timeframe + " telemetry data...");
              }}
              style={{
                background: "transparent",
                border: `1px solid ${TOKENS.hair}`,
                borderRadius: 4,
                padding: "6px 12px",
                color: TOKENS.slate,
                fontSize: 12,
                fontFamily: "'JetBrains Mono', monospace",
                cursor: "pointer"
              }}
            >
              📥 Export CSV Report
            </button>
            <Button onClick={() => go("rfq-wizard")}>➕ Broadcast New RFQ</Button>
          </div>
        </div>

        {/* KPI Metrics Strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 32 }}>
          <div style={{ background: "rgba(255,255,255,0.025)", border: `1px solid ${TOKENS.hair}`, padding: 18, borderRadius: 6 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: TOKENS.slate }}>PROFILE VIEWS ({timeframe})</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 26, color: TOKENS.paper, marginTop: 6 }}>{metrics.views}</div>
          </div>
          <div style={{ background: "rgba(0,168,150,0.06)", border: `1px solid rgba(0,168,150,0.25)`, padding: 18, borderRadius: 6 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: TOKENS.teal }}>INBOUND LEADS</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 26, color: TOKENS.teal, marginTop: 6 }}>{metrics.leads}</div>
          </div>
          <div style={{ background: "rgba(212,175,55,0.06)", border: `1px solid rgba(212,175,55,0.25)`, padding: 18, borderRadius: 6 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: TOKENS.brass }}>SUBMITTED QUOTES</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 26, color: TOKENS.brass, marginTop: 6 }}>{metrics.quotes}</div>
          </div>
          <div style={{ background: "rgba(21,101,192,0.08)", border: `1px solid rgba(21,101,192,0.3)`, padding: 18, borderRadius: 6 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: "#60A5FA" }}>PIPELINE VALUE</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 26, color: "#60A5FA", marginTop: 6 }}>{metrics.pipeline}</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.025)", border: `1px solid ${TOKENS.hair}`, padding: 18, borderRadius: 6 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: TOKENS.slate }}>WIN RATIO</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 26, color: TOKENS.paper, marginTop: 6 }}>{metrics.winRate}</div>
          </div>
        </div>

        {/* Escrow & Banking Operations Banner */}
        <div style={{
          background: "linear-gradient(135deg, rgba(212,175,55,0.1), rgba(21,101,192,0.12))",
          border: `1px solid rgba(212,175,55,0.35)`,
          borderRadius: 8,
          padding: "16px 20px",
          marginBottom: 32,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 16 }}>🔐</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700, color: TOKENS.paper }}>
                ABHIMANYU INDUSTRIAL ESCROW VAULT (SBI / ICICI GATEWAY)
              </span>
              <span style={{ background: "rgba(0,168,150,0.18)", color: TOKENS.teal, padding: "2px 8px", borderRadius: 999, fontSize: 10, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
                ● 100% CAPITAL PROTECTED
              </span>
            </div>
            <p style={{ margin: 0, fontSize: 12.5, color: TOKENS.slate }}>
              Active Escrow Pool: <strong>{formatPrice(485000, currency)}</strong> across 3 production POs. Stage-gate milestones are disbursed automatically upon DFM, FAI CMM, and GRN dock approvals.
            </p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => openEscrow?.("PO-2026-9041", "Apex Precision Engineering Ltd.", 485000)}
              style={{
                background: TOKENS.brass,
                color: TOKENS.ink,
                border: "none",
                borderRadius: 4,
                padding: "8px 14px",
                fontSize: 12,
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              🔐 Open Escrow Vault →
            </button>
            <button
              onClick={() => openTraceability?.("RFQ-2026-9041", "SS 316L Stainless Steel")}
              style={{
                background: "transparent",
                border: `1px solid ${TOKENS.teal}`,
                color: TOKENS.teal,
                borderRadius: 4,
                padding: "8px 14px",
                fontSize: 12,
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              🔬 Material MTRs →
            </button>
          </div>
        </div>

        {/* Visual Pipeline Funnel Telemetry */}
        <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: 18, marginBottom: 32 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate, marginBottom: 12 }}>DEAL PIPELINE CONVERSION FUNNEL</div>
          <div style={{ display: "flex", height: 16, borderRadius: 8, overflow: "hidden", background: "rgba(255,255,255,0.05)" }}>
            <div style={{ width: "45%", background: TOKENS.blue, title: "Initial Scope" }} />
            <div style={{ width: "30%", background: TOKENS.teal, title: "Tech Spec Review" }} />
            <div style={{ width: "18%", background: TOKENS.brass, title: "Negotiation" }} />
            <div style={{ width: "7%", background: "#10B981", title: "Won Contract" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginTop: 8, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate }}>
            <span>● 45% Scoping</span>
            <span>● 30% Tech Audit</span>
            <span>● 18% Price Negotiating</span>
            <span>● 7% Won Deals</span>
          </div>
        </div>

        {/* Live Inbound RFQ Leads Table */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h4 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 20, margin: 0 }}>
            Matched Inbound Buyer RFQs ({activeLeads.length})
          </h4>
          <span style={{ fontSize: 12, color: TOKENS.teal, fontFamily: "'JetBrains Mono', monospace" }}>⚡ AI Match Engine Active</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {activeLeads.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 20px",
                background: item.quoted ? "rgba(0,168,150,0.08)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${item.quoted ? TOKENS.teal : TOKENS.hair}`,
                borderRadius: 6,
                flexWrap: "wrap",
                gap: 14
              }}
            >
              <div style={{ flex: "1 1 300px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: TOKENS.teal }}>{item.id}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: TOKENS.brass }}>● {item.status}</span>
                </div>
                <div style={{ fontSize: 15, color: TOKENS.paper, fontWeight: 600 }}>{item.title}</div>
                <div style={{ fontSize: 12.5, color: TOKENS.slate, marginTop: 4 }}>
                  {item.category} · Qty: {item.quantity} · Budget: {item.budget} · {item.location}
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button
                  onClick={() => openTracker?.(item.id)}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: `1px solid ${TOKENS.hair}`,
                    color: TOKENS.paper,
                    padding: "7px 12px",
                    borderRadius: 4,
                    fontSize: 12,
                    fontFamily: "'JetBrains Mono', monospace",
                    cursor: "pointer",
                  }}
                >
                  🔍 Inspect RFQ
                </button>
                {item.quoted ? (
                  <span style={{ background: "rgba(0,168,150,0.15)", color: TOKENS.teal, border: `1px solid ${TOKENS.teal}`, padding: "6px 12px", borderRadius: 4, fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>
                    ✓ Quote Submitted
                  </span>
                ) : (
                  <>
                    <Button onClick={() => handleAction(item.id, "quote")}>Send Quote →</Button>
                    <button
                      onClick={() => handleAction(item.id, "dismiss")}
                      style={{
                        background: "transparent",
                        border: `1px solid ${TOKENS.hair}`,
                        color: TOKENS.slate,
                        padding: "8px 12px",
                        borderRadius: 4,
                        fontSize: 12,
                        cursor: "pointer"
                      }}
                    >
                      Decline
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Section>
  );
}

function KnowledgePage({ go }) {
  const [domainFilter, setDomainFilter] = useState("All");
  const [selectedGuide, setSelectedGuide] = useState(null);

  const GUIDES = [
    {
      id: "cnc-machining",
      domain: "CNC & Machining",
      title: "How Contract CNC Machining Works: 5-Axis Milling, Tolerances & Ra Finish",
      readTime: "8 min read",
      author: "Vikram Sengupta (Lead Manufacturing Eng)",
      summary: "A practical engineer's guide to 5-axis milling, choosing tolerances (ISO 2768-mK), toolpath optimization, and surface finishing for contract parts.",
      content: "When outsourcing CNC manufacturing, understanding machine capabilities drastically affects cost and lead time. 3-axis milling is optimal for flat surfaces and prismatic geometries, while 5-axis continuous milling enables complex aerodynamic profiles without multiple re-fixturing steps. Key tolerance considerations: standard commercial tolerance is ±0.05 mm; high-precision aerospace and medical components demand ±0.005 mm with CMM (Coordinate Measuring Machine) verification reports.",
      takeaways: [
        "Use ISO 2768-mK as default tolerance standard unless tight fit is mandatory",
        "Specify Ra 1.6 µm for standard machined parts, Ra 0.4 µm for hydraulic sealing surfaces",
        "Design internal corner radii to at least 1/3 of cavity depth to avoid tool chatter",
        "Provide STEP or IGES 3D models alongside PDF 2D drawings with GD&T callouts"
      ],
      relatedCategory: "Custom CNC Machining"
    },
    {
      id: "anycast-lb",
      domain: "Cloud & Anycast",
      title: "Multi-Region Anycast Load Balancing: BGP Routing & Sub-Second Failovers",
      readTime: "11 min read",
      author: "Abhimanyu (CTO)",
      summary: "How BGP Anycast IP routing directs global user requests to the closest edge node, reducing latency and achieving instantaneous server failovers.",
      content: "Traditional DNS-based load balancing suffers from client-side TTL caching delays, often leaving traffic stranded on unresponsive server pools for minutes after an outage. With BGP (Border Gateway Protocol) Anycast, multiple edge points-of-presence (POPs) announce the exact same public IP prefix to upstream tier-1 transit providers. When a regional server cluster fails health check thresholds, BGP withdraws the route advertisement in under 400 milliseconds, automatically diverting incoming packets to the next closest healthy point.",
      takeaways: [
        "BGP route withdrawals achieve sub-second global traffic rerouting",
        "Edge nodes terminate TLS sessions closer to clients, saving 80–120ms roundtrip handshakes",
        "DDoS attack volume is naturally diffused across dozens of edge POPs simultaneously",
        "Health check daemons poll backend origins every 500ms using synthetic gRPC probes"
      ],
      relatedCategory: "AI & Software Development"
    },
    {
      id: "smt-assembly",
      domain: "Electronics & SMT",
      title: "SMT Electronics Assembly Handbook: Stencil Design, Reflow & IPC-A-610",
      readTime: "9 min read",
      author: "Rohan Nair (VP Hardware Systems)",
      summary: "Best practices for surface mount technology: laser-cut stencil thickness, solder paste chemistry (SAC305), pick-and-place fiducials, and IPC Class 3 quality standards.",
      content: "Surface Mount Technology (SMT) turnkey manufacturing requires disciplined Design for Manufacturing (DFM) rules at the schematic and layout phase. Fiducial markers must be placed diagonally across board edges to provide optical alignment for high-speed pick-and-place robots. Solder paste volume transfer efficiency depends on the area ratio of stencil apertures (target > 0.66). Reflow oven thermal profiling must maintain peak temperatures of 245°C for lead-free SAC305 alloys without thermal shock to delicate QFN or BGA dies.",
      takeaways: [
        "Include three global fiducial markers on panel rails for optical calibration",
        "Follow IPC-7351B land pattern guidelines to minimize tombstoning during reflow",
        "Require Automated Optical Inspection (AOI) and X-ray inspection for bottom-terminated components (BGA/QFN)",
        "Specify conformal coating (acrylic or silicone) for industrial and outdoor telemetry nodes"
      ],
      relatedCategory: "Electronics Assembly"
    },
    {
      id: "plastic-injection",
      domain: "Plastic Injection",
      title: "Plastic Injection Molding Design Guide: Draft Angles, Ribs & Shrinkage",
      readTime: "7 min read",
      author: "Kavita Rao (Tooling Director)",
      summary: "How to avoid sink marks, warping, and costly tool modifications by designing proper draft angles, uniform wall thickness, and strategic gate placement.",
      content: "In custom plastic injection molding, tooling costs represent the largest upfront capital investment. Ensuring parts eject cleanly from hardened steel or aluminum tool cavities requires consistent draft angles — minimum 1° to 2° per side, and up to 5° for heavy textured finishes. Non-uniform wall thickness causes uneven cooling and severe warpage; wall transitions should always be tapered with generous fillets. Rib thickness should not exceed 60% of the nominal wall thickness to eliminate sink marks on visible exterior surfaces.",
      takeaways: [
        "Maintain nominal wall thickness between 1.5 mm and 3.0 mm for standard ABS/PC blends",
        "Incorporate minimum 1.5° draft on exterior core and cavity surfaces",
        "Design rib heights under 3× nominal wall thickness with 0.5° draft",
        "Select P20 steel tooling for prototype runs (<50k) and H13 hardened steel for >500k parts"
      ],
      relatedCategory: "Custom Plastic Injection"
    },
    {
      id: "zero-trust",
      domain: "Cloud & Anycast",
      title: "Zero-Trust Microservices: Mutual TLS, gRPC & Distributed Tracing",
      readTime: "10 min read",
      author: "Rajesh Kumar (Head of Cybersecurity)",
      summary: "Architecting zero-trust perimeter security for internal service meshes using SPIFFE/SPIRE identity attestation, automated certificate rotation, and Jaeger telemetry.",
      content: "Perimeter firewalls are insufficient for enterprise cloud platforms. Zero-trust architecture mandates that every inter-service call across the cluster verify identity and encryption independently. Utilizing mutual TLS (mTLS) with short-lived X.509 certificates ensures that compromised worker nodes cannot eavesdrop or impersonate other microservices. Distributed tracing via OpenTelemetry and Jaeger propagates W3C trace context headers across asynchronous message queues (Kafka, RabbitMQ), providing end-to-end auditability.",
      takeaways: [
        "Enforce mTLS across all pod-to-pod communication within the Kubernetes cluster",
        "Implement automated token rotation with maximum 24-hour credential lifetimes",
        "Log structured audit events for every administrative configuration mutation",
        "Deploy rate-limiting token buckets at both ingress edge gateways and internal service meshes"
      ],
      relatedCategory: "AI & Software Development"
    },
    {
      id: "supplier-audit",
      domain: "Quality & ISO",
      title: "ISO 9001:2015 & AS9100D Supplier Audit Checklist for Enterprise Sourcing",
      readTime: "6 min read",
      author: "Anita Sharma (Director of Quality Assurance)",
      summary: "A comprehensive vendor qualification checklist for procurement leaders evaluating contract manufacturers, OEM suppliers, and calibration certifications.",
      content: "Before awarding production purchase orders, enterprise procurement teams must perform structured supplier audits. Critical areas include raw material traceability (Mill Test Reports), calibration logs for metrology instruments (micrometers, height gauges, CMM), First Article Inspection (FAI) reports conforming to AS9102 standards, and documented Non-Conformance Report (NCR) workflows. Verifying that a supplier maintains controlled segregation of scrap material prevents defective parts from contaminating production batches.",
      takeaways: [
        "Verify material test reports (MTR) against heat numbers stamped on raw billet stock",
        "Ensure inspection tools have valid calibration seals conforming to ISO/IEC 17025",
        "Audit Corrective and Preventive Action (CAPA) documentation from previous quarters",
        "Require Certificates of Conformance (CoC) shipped with every delivery batch"
      ],
      relatedCategory: "Custom CNC Machining"
    }
  ];

  const domains = ["All", "CNC & Machining", "Electronics & SMT", "Cloud & Anycast", "Plastic Injection", "Quality & ISO"];

  const filteredGuides = GUIDES.filter((g) => {
    return domainFilter === "All" || g.domain === domainFilter;
  });

  return (
    <>
      <Section eyebrow="Knowledge Base & Guides" title="Technical & Manufacturing Resource Hub" sub="In-depth engineering playbooks, tolerance standards, cloud architectural blueprints, and procurement checklists.">
        {/* Domain Filter Pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
          {domains.map((d) => (
            <button
              key={d}
              onClick={() => setDomainFilter(d)}
              style={{
                background: domainFilter === d ? TOKENS.brass : "rgba(255,255,255,0.04)",
                border: `1px solid ${domainFilter === d ? TOKENS.brass : TOKENS.hair}`,
                color: domainFilter === d ? TOKENS.ink : TOKENS.slate,
                borderRadius: 999,
                padding: "7px 16px",
                fontSize: 12.5,
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: domainFilter === d ? 700 : 400,
                cursor: "pointer",
                transition: "all 0.15s ease"
              }}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Guides Grid */}
        <Grid min={320}>
          {filteredGuides.map((guide) => (
            <Card key={guide.id} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ fontSize: 11, color: TOKENS.teal, fontFamily: "'JetBrains Mono', monospace", background: "rgba(0,168,150,0.1)", padding: "3px 8px", borderRadius: 4 }}>
                    {guide.domain.toUpperCase()}
                  </span>
                  <span style={{ fontSize: 11, color: TOKENS.slate, fontFamily: "'JetBrains Mono', monospace" }}>
                    {guide.readTime}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 19, margin: "0 0 10px", lineHeight: 1.35 }}>
                  {guide.title}
                </h3>
                <p style={{ color: TOKENS.slate, fontSize: 13.5, lineHeight: 1.6, margin: "0 0 16px" }}>
                  {guide.summary}
                </p>
              </div>

              <div>
                <div style={{ fontSize: 12, color: TOKENS.brass, fontFamily: "'JetBrains Mono', monospace", marginBottom: 14 }}>
                  By {guide.author}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <Button onClick={() => setSelectedGuide(guide)}>Read Full Playbook →</Button>
                  <Button variant="ghost" onClick={() => go("rfq-wizard")}>Post RFQ</Button>
                </div>
              </div>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* In-Depth Technical Guide Reader Modal */}
      {selectedGuide && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(7, 16, 32, 0.94)", backdropFilter: "blur(18px)", zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center", padding: 20 }}>
          <div style={{ maxWidth: 760, width: "100%", maxHeight: "90vh", overflowY: "auto", background: TOKENS.panelAlt, border: `1px solid rgba(212,175,55,0.4)`, borderRadius: 12, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.85)" }}>
            {/* Modal Header */}
            <div style={{ background: "linear-gradient(135deg, #0a1929 0%, #101828 100%)", padding: "26px 32px", borderBottom: `1px solid ${TOKENS.hair}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.teal }}>
                  {selectedGuide.domain.toUpperCase()} · {selectedGuide.readTime}
                </span>
                <button onClick={() => setSelectedGuide(null)} style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${TOKENS.hair}`, color: TOKENS.paper, fontSize: 18, cursor: "pointer", width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
              </div>
              <h2 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 24, margin: "0 0 6px", lineHeight: 1.3 }}>
                {selectedGuide.title}
              </h2>
              <div style={{ fontSize: 13, color: TOKENS.brass, fontFamily: "'JetBrains Mono', monospace" }}>
                Authored by {selectedGuide.author}
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: 32 }}>
              <div style={{ background: "rgba(21, 101, 192, 0.1)", borderLeft: `3px solid ${TOKENS.blue}`, padding: "14px 18px", borderRadius: "0 6px 6px 0", marginBottom: 24 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#60A5FA", marginBottom: 4 }}>EXECUTIVE SUMMARY</div>
                <p style={{ color: TOKENS.paper, fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                  {selectedGuide.summary}
                </p>
              </div>

              <h4 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 19, margin: "0 0 12px" }}>
                Engineering Deep-Dive & Methodologies
              </h4>
              <p style={{ color: TOKENS.slate, fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>
                {selectedGuide.content}
              </p>

              <h4 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.brass, fontSize: 18, margin: "0 0 14px" }}>
                Key Technical Takeaways & Quality Checklist
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
                {selectedGuide.takeaways.map((t, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 12, background: "rgba(255,255,255,0.025)", border: `1px solid ${TOKENS.hair}`, padding: "12px 16px", borderRadius: 6 }}>
                    <span style={{ color: TOKENS.teal, fontSize: 14, fontWeight: "bold", flexShrink: 0 }}>✓</span>
                    <span style={{ color: TOKENS.paper, fontSize: 13.5, lineHeight: 1.5 }}>{t}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{ borderTop: `1px solid ${TOKENS.hair}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <button
                  onClick={() => {
                    trackEvent("download_guide_pdf", { id: selectedGuide.id });
                    alert(`Preparing technical PDF export: "${selectedGuide.title}"...`);
                  }}
                  style={{
                    background: "transparent",
                    border: `1px solid ${TOKENS.hair}`,
                    color: TOKENS.paper,
                    padding: "10px 16px",
                    borderRadius: 6,
                    fontSize: 13,
                    fontFamily: "'JetBrains Mono', monospace",
                    cursor: "pointer"
                  }}
                >
                  📄 Download PDF Handbook
                </button>
                <div style={{ display: "flex", gap: 10 }}>
                  <Button variant="ghost" onClick={() => setSelectedGuide(null)}>Close Playbook</Button>
                  <Button onClick={() => { setSelectedGuide(null); go("rfq-wizard"); }}>
                    Post RFQ in {selectedGuide.relatedCategory.split(" ")[0]} →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <CTA go={go} />
    </>
  );
}

function ContactPage({ go }) {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [refId, setRefId] = useState("");
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", country: "", service: "Custom CNC Machining & Manufacturing", budget: "$25k - $50k", timeline: "1-3 Months", requirements: "" });

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const inputStyle = { width: "100%", background: "rgba(255,255,255,0.03)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "12px 14px", color: TOKENS.paper, fontSize: 14.5, fontFamily: "inherit", boxSizing: "border-box" };
  const labelStyle = { display: "block", color: TOKENS.slate, fontSize: 11.5, marginBottom: 6, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.04em" };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    trackEvent("submit_contact_form", { email: form.email, service: form.service });

    const newRef = `REF-ABH-${Math.floor(10000 + Math.random() * 90000)}`;
    setRefId(newRef);

    try {
      await fetch("https://httpbin.org/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, refId: newRef, submittedAt: new Date().toISOString() })
      }).catch(() => {});
    } catch (err) {}

    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 800);
  };

  if (sent) {
    return (
      <Section eyebrow="Contact Confirmation" title="Inquiry Received Successfully">
        <Card style={{ maxWidth: 580, margin: "0 auto", padding: 40, textAlign: "center", border: `1px solid ${TOKENS.brass}` }}>
          <div style={{ width: 60, height: 60, borderRadius: 999, background: "rgba(0, 168, 150, 0.15)", border: `1px solid ${TOKENS.teal}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", color: TOKENS.teal, fontSize: 26, fontWeight: "bold" }}>✓</div>
          <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 24, margin: "0 0 8px" }}>Thank You, {form.name || "Client"}!</h3>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: TOKENS.teal, marginBottom: 16 }}>OFFICIAL INTAKE REF: {refId}</div>
          <p style={{ color: TOKENS.slate, fontSize: 15, lineHeight: 1.65, margin: "0 0 24px" }}>
            Your scope inquiry has been assigned to an Abhimanyu Technologies solution architect. We will follow up at <strong style={{ color: TOKENS.paper }}>{form.email}</strong> within 12 business hours.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <Button onClick={() => setSent(false)}>Send Another Message</Button>
            <Button variant="ghost" onClick={() => go("rfq-wizard")}>Post Live RFQ Requirement</Button>
          </div>
        </Card>
      </Section>
    );
  }

  return (
    <>
      <Section eyebrow="Contact Abhimanyu Technologies" title="Scale Your Business With Us" sub="Direct engineering consultations, contract manufacturing inquiries, and custom software scoping.">
        {/* Fast Switcher Banner to RFQ Wizard */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 14,
          background: "rgba(21, 101, 192, 0.1)",
          border: `1px solid rgba(21, 101, 192, 0.3)`,
          borderRadius: 8,
          padding: "16px 20px",
          marginBottom: 36,
          maxWidth: 960,
          margin: "0 auto 36px"
        }}>
          <div>
            <div style={{ color: TOKENS.paper, fontWeight: 600, fontSize: 14.5 }}>
              ⚡ Sourcing Custom Manufactured Parts or Electronics?
            </div>
            <div style={{ color: TOKENS.slate, fontSize: 13 }}>
              Broadcast your CAD files and drawings to 500+ verified suppliers with automated instant quotes.
            </div>
          </div>
          <button
            onClick={() => go("rfq-wizard")}
            style={{
              background: TOKENS.brass,
              color: TOKENS.ink,
              border: "none",
              borderRadius: 6,
              padding: "9px 18px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12.5,
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            Launch 6-Step RFQ Wizard →
          </button>
        </div>

        <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 36 }} className="contact-grid">
          {/* Main Inquiry Form */}
          <Card style={{ padding: 32 }}>
            <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 20, margin: "0 0 20px" }}>Project Scope Intake Form</h3>
            <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={labelStyle}>FULL NAME *</label>
                <input required style={inputStyle} value={form.name} onChange={update("name")} placeholder="John Doe" />
              </div>
              <div>
                <label style={labelStyle}>WORK EMAIL *</label>
                <input required type="email" style={inputStyle} value={form.email} onChange={update("email")} placeholder="john@company.com" />
              </div>
              <div>
                <label style={labelStyle}>COMPANY / ORGANIZATION</label>
                <input style={inputStyle} value={form.company} onChange={update("company")} placeholder="Enterprise Ltd" />
              </div>
              <div>
                <label style={labelStyle}>PHONE / WHATSAPP NUMBER</label>
                <input style={inputStyle} value={form.phone} onChange={update("phone")} placeholder="+91 / +1 000-000-0000" />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>PRIMARY SERVICE / SOURCING PRACTICE</label>
                <select style={inputStyle} value={form.service} onChange={update("service")}>
                  <option value="Custom CNC Machining & Manufacturing">Custom CNC Machining & Manufacturing</option>
                  <option value="Electronics & SMT Assembly">Electronics & SMT Assembly</option>
                  <option value="Custom Software Development">Custom Software Development</option>
                  <option value="AI & Machine Learning Engine">AI & Machine Learning Engine</option>
                  <option value="Cloud Anycast & Infrastructure">Cloud Anycast & Infrastructure</option>
                  <option value="IoT & Industrial Embedded Systems">IoT & Industrial Embedded Systems</option>
                  <option value="SOC2 & Cybersecurity Compliance">SOC2 & Cybersecurity Compliance</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>ESTIMATED BUDGET</label>
                <select style={inputStyle} value={form.budget} onChange={update("budget")}>
                  <option value="< $25k">&lt; $25,000 / &lt; ₹20 Lakhs</option>
                  <option value="$25k - $50k">$25,000 - $50,000</option>
                  <option value="$50k - $100k">$50,000 - $100,000</option>
                  <option value="$100k+">$100,000+ / Custom Enterprise</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>TIMELINE EXPECTATION</label>
                <select style={inputStyle} value={form.timeline} onChange={update("timeline")}>
                  <option value="Immediate (< 1 month)">Immediate (Less than 1 Month)</option>
                  <option value="1-3 Months">1–3 Months (Standard)</option>
                  <option value="3-6 Months">3–6 Months</option>
                  <option value="Ongoing Partnership">Ongoing Strategic Partnership</option>
                </select>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>PROJECT REQUIREMENTS & SCOPE *</label>
                <textarea required rows={4} style={{ ...inputStyle, resize: "vertical" }} value={form.requirements} onChange={update("requirements")} placeholder="Describe technical specifications, batch sizes, target outcomes, or software architecture..." />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Transmitting Scope..." : "Submit Project Inquiry →"}
                </Button>
              </div>
            </form>
          </Card>

          {/* Regional Hubs & Contact Metadata */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Card style={{ padding: 24 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: TOKENS.brass, marginBottom: 8, letterSpacing: "0.08em" }}>
                HEADQUARTERS & R&D LAB
              </div>
              <h4 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 18, margin: "0 0 6px" }}>
                Telangana Enterprise Campus
              </h4>
              <p style={{ color: TOKENS.slate, fontSize: 13.5, lineHeight: 1.6, margin: "0 0 12px" }}>
                Telangana, India · Core Software, Neural Architecture Lab, and Distributed Cloud NOC.
              </p>
              <div style={{ fontSize: 12, color: TOKENS.teal, fontFamily: "'JetBrains Mono', monospace" }}>
                Direct Hotline: +91 (Available 24/7 for Outages)
              </div>
            </Card>

            <Card style={{ padding: 24 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: "#60A5FA", marginBottom: 8, letterSpacing: "0.08em" }}>
                SOURCING & REGIONAL HUBS
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13, color: TOKENS.slate }}>
                <div>
                  <b style={{ color: TOKENS.paper }}>Chennai Corridor:</b> Industrial Machining, Foundry & Sheet Metal Supplier Hub
                </div>
                <div>
                  <b style={{ color: TOKENS.paper }}>Hyderabad & Bengaluru:</b> SMT Electronics Assembly & Cloud Software Practice
                </div>
                <div>
                  <b style={{ color: TOKENS.paper }}>Pune & Mumbai:</b> Automotive IoT & Injection Molding Hub
                </div>
              </div>
            </Card>

            <Card style={{ padding: 24, background: "rgba(0,168,150,0.06)", border: `1px solid rgba(0,168,150,0.25)` }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.teal, marginBottom: 6 }}>
                ⚡ 12-HOUR ARCHITECT SLA
              </div>
              <p style={{ color: TOKENS.paper, fontSize: 13, lineHeight: 1.5, margin: 0 }}>
                Every inquiry is reviewed by an active Solutions Architect, not an SDR queue. You will receive an initial feasibility and architectural scope within 12 business hours.
              </p>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}

function CTA({ go, label = "Contact Us" }) {
  return (
    <div style={{ padding: "90px 24px", textAlign: "center", borderTop: `1px solid ${TOKENS.hair}`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.16, pointerEvents: "none" }}>
        <Vault3D size={280} variant="ring" />
      </div>
      <div style={{ position: "relative" }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(26px,4vw,36px)", color: TOKENS.paper, margin: "0 0 28px" }}>
          Let's build the thing you keep meaning to build.
        </h2>
        <Button onClick={() => go("contact")}>{label} →</Button>
      </div>
    </div>
  );
}

/* ---------------------------- header (logo + full nav) ---------------------------- */

function TransparentLogo({ src, height = 40, alt = "MyVault Logo" }) {
  const [cleanSrc, setCleanSrc] = useState(src);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          if (data[i] > 220 && data[i + 1] > 220 && data[i + 2] > 220) data[i + 3] = 0;
        }
        ctx.putImageData(imgData, 0, 0);
        if (!cancelled) setCleanSrc(canvas.toDataURL("image/png"));
      } catch (err) {
        if (!cancelled) setCleanSrc(src);
      }
    };
    img.onerror = () => { if (!cancelled) setCleanSrc(src); };
    img.src = src;
    return () => { cancelled = true; };
  }, [src]);

  return (
    <img
      src={cleanSrc}
      alt={alt}
      style={{ height, width: "auto", objectFit: "contain", filter: "drop-shadow(0 0 14px rgba(79,179,255,0.4))" }}
    />
  );
}

function SiteHeader({ page, go, currency = "INR", setCurrency, currentUser, setCurrentUser, openAuth, openTracker, openSpotlight }) {
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const megaMenuCols = [
    {
      title: "🛒 Products",
      links: [
        { label: "Browse All Products", id: "products" },
        { label: "Abhimanyu ERP", id: "products" },
        { label: "Abhimanyu CRM", id: "products" },
        { label: "Abhimanyu HRMS", id: "products" },
        { label: "Abhimanyu AI Platform", id: "products" },
        { label: "Abhimanyu IoT", id: "products" },
      ]
    },
    {
      title: "🛠 Services",
      links: [
        { label: "Software Engineering", id: "services" },
        { label: "AI & Machine Learning", id: "services" },
        { label: "Cloud & DevOps", id: "services" },
        { label: "Cybersecurity", id: "services" },
        { label: "IoT & Embedded", id: "services" },
        { label: "Data & Analytics", id: "services" },
      ]
    },
    {
      title: "🏢 Businesses",
      links: [
        { label: "Business Directory", id: "businesses" },
        { label: "Post Your Business", id: "contact" },
        { label: "Verified Partners", id: "businesses" },
        { label: "Seller Dashboard", id: "dashboard" },
        { label: "Knowledge Base", id: "knowledge" },
        { label: "Case Studies", id: "case-studies" },
      ]
    },
    {
      title: "🏭 Manufacturing",
      links: [
        { label: "Find Manufacturers", id: "manufacturers" },
        { label: "CNC Machining", id: "manufacturers" },
        { label: "Sheet Metal Fab", id: "manufacturers" },
        { label: "Electronics Assembly", id: "manufacturers" },
        { label: "Post RFQ Requirement", id: "rfq-wizard" },
        { label: "Browse Live RFQs", id: "requirements" },
      ]
    }
  ];

  const primaryNav = [
    { id: "products", label: "Products" },
    { id: "services", label: "Services" },
    { id: "manufacturers", label: "Manufacturers" },
    { id: "businesses", label: "Businesses" },
    { id: "requirements", label: "RFQs" },
    { id: "dashboard", label: "Dashboard" },
  ];

  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: `rgba(11, 31, 58, 0.95)`, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: `1px solid ${TOKENS.hair}` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        {/* Logo */}
        <button onClick={() => go("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, padding: 0, flexShrink: 0 }}>
          <TransparentLogo src="/logo.png" height={36} />
          <div style={{ textAlign: "left" }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: TOKENS.paper, letterSpacing: "0.01em", lineHeight: 1.1 }}>Abhimanyu</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: TOKENS.teal, letterSpacing: "0.20em", textTransform: "uppercase" }}>SCALE YOUR BUSINESS</div>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {/* Explore Mega Menu trigger */}
          <div style={{ position: "relative" }}>
            <button
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
              onClick={() => setMegaOpen(!megaOpen)}
              style={{
                background: megaOpen ? `rgba(21, 101, 192, 0.15)` : "transparent",
                border: megaOpen ? `1px solid rgba(21, 101, 192, 0.4)` : "1px solid transparent",
                borderRadius: 6,
                cursor: "pointer",
                color: megaOpen ? TOKENS.brass : TOKENS.paper,
                fontSize: 13,
                fontFamily: "'JetBrains Mono', monospace",
                padding: "7px 14px",
                display: "flex",
                alignItems: "center",
                gap: 5,
                transition: "all 0.2s ease",
              }}
            >
              🧭 Explore <span style={{ fontSize: 9 }}>▼</span>
            </button>

            {/* Mega Menu Dropdown */}
            {megaOpen && (
              <div
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
                style={{
                  position: "absolute",
                  top: "calc(100% + 6px)",
                  left: "-20px",
                  width: 760,
                  background: `rgba(11, 31, 58, 0.98)`,
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: `1px solid ${TOKENS.hair}`,
                  borderRadius: 10,
                  boxShadow: "0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.1)",
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 0,
                  padding: 8,
                  zIndex: 100,
                }}
              >
                {megaMenuCols.map((col, ci) => (
                  <div key={ci} style={{ padding: "12px 16px", borderRight: ci < 3 ? `1px solid ${TOKENS.hair}` : "none" }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.brass, letterSpacing: "0.08em", marginBottom: 12, fontWeight: 700 }}>
                      {col.title}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      {col.links.map((lnk, li) => (
                        <button
                          key={li}
                          onClick={() => { go(lnk.id); setMegaOpen(false); }}
                          style={{
                            background: "transparent",
                            border: "none",
                            textAlign: "left",
                            color: TOKENS.slate,
                            fontSize: 13,
                            cursor: "pointer",
                            padding: "6px 8px",
                            borderRadius: 4,
                            transition: "all 0.15s ease",
                            fontFamily: "'Inter', sans-serif",
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = TOKENS.paper; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = TOKENS.slate; }}
                        >
                          {lnk.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                {/* Mega Menu Footer CTA */}
                <div style={{ gridColumn: "1 / -1", borderTop: `1px solid ${TOKENS.hair}`, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate }}>
                    📍 Chennai • Telangana • Pan-India • Global
                  </div>
                  <button
                    onClick={() => { go("rfq-wizard"); setMegaOpen(false); }}
                    style={{ background: TOKENS.brass, color: TOKENS.ink, border: "none", borderRadius: 5, padding: "7px 16px", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, cursor: "pointer" }}
                  >
                    ➕ Post RFQ →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Search Shortcut Pill */}
          <button
            onClick={openSpotlight}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${TOKENS.hair}`,
              borderRadius: 6,
              color: TOKENS.slate,
              fontSize: 12,
              fontFamily: "'Inter', sans-serif",
              padding: "6px 12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = TOKENS.paper; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = TOKENS.slate; e.currentTarget.style.borderColor = TOKENS.hair; }}
            title="Press Ctrl+K or ⌘K to search anywhere"
          >
            <span>🔍 Search</span>
            <kbd style={{ background: "rgba(255,255,255,0.08)", border: `1px solid ${TOKENS.hair}`, borderRadius: 3, padding: "1px 5px", fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.paper }}>
              Ctrl+K
            </kbd>
          </button>

          {/* Primary nav links */}
          {primaryNav.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              style={{
                background: page === n.id ? "rgba(21, 101, 192, 0.15)" : "transparent",
                border: "1px solid transparent",
                borderRadius: 6,
                cursor: "pointer",
                color: page === n.id ? TOKENS.brass : TOKENS.slate,
                fontSize: 13,
                fontFamily: "'JetBrains Mono', monospace",
                padding: "7px 12px",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => { if (page !== n.id) { e.currentTarget.style.color = TOKENS.paper; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; } }}
              onMouseLeave={(e) => { if (page !== n.id) { e.currentTarget.style.color = TOKENS.slate; e.currentTarget.style.background = "transparent"; } }}
            >
              {n.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA & Controls */}
        <div className="desktop-nav" style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {/* Currency Switcher */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setCurrencyOpen(!currencyOpen)}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${TOKENS.hair}`,
                borderRadius: 6,
                color: TOKENS.paper,
                fontSize: 12,
                fontFamily: "'JetBrains Mono', monospace",
                padding: "6px 10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
              title="Select Platform Currency"
            >
              <span>{CURRENCIES[currency]?.label || currency}</span>
              <span style={{ fontSize: 9 }}>▼</span>
            </button>
            {currencyOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 6px)",
                  right: 0,
                  background: "rgba(11, 31, 58, 0.98)",
                  border: `1px solid ${TOKENS.hair}`,
                  borderRadius: 6,
                  padding: 4,
                  zIndex: 100,
                  boxShadow: "0 12px 32px rgba(0,0,0,0.6)",
                  minWidth: 140,
                }}
              >
                {Object.keys(CURRENCIES).map((cKey) => (
                  <button
                    key={cKey}
                    onClick={() => { setCurrency?.(cKey); setCurrencyOpen(false); }}
                    style={{
                      width: "100%",
                      background: currency === cKey ? "rgba(212,175,55,0.15)" : "transparent",
                      border: "none",
                      color: currency === cKey ? TOKENS.brass : TOKENS.paper,
                      padding: "7px 10px",
                      textAlign: "left",
                      fontSize: 12,
                      fontFamily: "'JetBrains Mono', monospace",
                      cursor: "pointer",
                      borderRadius: 4,
                    }}
                  >
                    {CURRENCIES[cKey].label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Track RFQ Button */}
          <button
            onClick={() => openTracker?.("RFQ-2026-9041")}
            style={{
              background: "rgba(0,168,150,0.12)",
              border: `1px solid rgba(0,168,150,0.35)`,
              borderRadius: 6,
              color: TOKENS.teal,
              fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace",
              padding: "6px 12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
            title="Inspect Real-time RFQ Status, Competing Quotes & Digital POs"
          >
            <span>🔍</span> Track RFQ
          </button>

          {/* User Profile / Auth Button */}
          {currentUser ? (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                style={{
                  background: "rgba(21,101,192,0.15)",
                  border: `1px solid rgba(21,101,192,0.4)`,
                  borderRadius: 6,
                  color: TOKENS.paper,
                  fontSize: 12,
                  fontFamily: "'JetBrains Mono', monospace",
                  padding: "6px 12px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span>{currentUser.avatar}</span>
                <span style={{ maxWidth: 110, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {currentUser.company.split(" ")[0]}
                </span>
                <span style={{ fontSize: 9, color: TOKENS.teal }}>●</span>
              </button>

              {userMenuOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 6px)",
                    right: 0,
                    width: 250,
                    background: "rgba(11, 31, 58, 0.98)",
                    border: `1px solid ${TOKENS.hair}`,
                    borderRadius: 8,
                    padding: 12,
                    zIndex: 100,
                    boxShadow: "0 16px 40px rgba(0,0,0,0.7)",
                  }}
                >
                  <div style={{ paddingBottom: 8, borderBottom: `1px solid ${TOKENS.hair}`, marginBottom: 8 }}>
                    <div style={{ fontFamily: "'Fraunces', serif", fontSize: 14, color: TOKENS.paper }}>{currentUser.name}</div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: TOKENS.brass }}>{currentUser.company}</div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.teal, marginTop: 2 }}>{currentUser.badge}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <button
                      onClick={() => { go("dashboard"); setUserMenuOpen(false); }}
                      style={{ background: "transparent", border: "none", color: TOKENS.paper, textAlign: "left", padding: "6px 8px", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", cursor: "pointer", borderRadius: 4 }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      📊 Seller & Buyer Dashboard
                    </button>
                    <button
                      onClick={() => { openTracker?.("RFQ-2026-9041"); setUserMenuOpen(false); }}
                      style={{ background: "transparent", border: "none", color: TOKENS.paper, textAlign: "left", padding: "6px 8px", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", cursor: "pointer", borderRadius: 4 }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      📋 Track Live RFQs ({currentUser.activeRFQs})
                    </button>
                    <button
                      onClick={() => { openAuth?.(); setUserMenuOpen(false); }}
                      style={{ background: "transparent", border: "none", color: TOKENS.teal, textAlign: "left", padding: "6px 8px", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", cursor: "pointer", borderRadius: 4 }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      ⚙️ Manage Account / Switch Role
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={openAuth}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: `1px solid ${TOKENS.hair}`,
                borderRadius: 6,
                color: TOKENS.paper,
                fontSize: 12,
                fontFamily: "'JetBrains Mono', monospace",
                padding: "6px 12px",
                cursor: "pointer",
              }}
            >
              🔑 Sign In
            </button>
          )}

          <button
            onClick={() => go("contact")}
            style={{
              background: "transparent",
              border: `1px solid ${TOKENS.hair}`,
              borderRadius: 6,
              color: TOKENS.paper,
              fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace",
              padding: "6px 12px",
              cursor: "pointer",
            }}
          >
            Contact
          </button>
          <Button onClick={() => go("rfq-wizard")} style={{ padding: "7px 14px", fontSize: 12 }}>Post RFQ →</Button>
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={() => setOpen(!open)} style={{ display: "none", background: "none", border: "none", color: TOKENS.paper, fontSize: 22 }}>
          {open ? "×" : "≡"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="mobile-menu" style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: 4, background: `rgba(11, 31, 58, 0.98)`, borderTop: `1px solid ${TOKENS.hair}`, maxHeight: "75vh", overflowY: "auto" }}>
          {/* Mobile Search Button */}
          <button
            onClick={() => { openSpotlight?.(); setOpen(false); }}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: `1px solid ${TOKENS.hair}`,
              borderRadius: 6,
              color: TOKENS.paper,
              padding: "10px 14px",
              fontSize: 13,
              fontFamily: "'JetBrains Mono', monospace",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
              marginBottom: 4,
            }}
          >
            <span>🔍 Search Entire Platform</span>
            <kbd style={{ background: "rgba(255,255,255,0.08)", padding: "2px 6px", borderRadius: 3, fontSize: 10 }}>Ctrl+K</kbd>
          </button>

          {/* Quick Mobile Action Bar */}
          <div style={{ display: "flex", gap: 8, padding: "12px 0 8px", borderBottom: `1px solid ${TOKENS.hair}` }}>
            <button
              onClick={() => { openTracker?.("RFQ-2026-9041"); setOpen(false); }}
              style={{ flex: 1, background: "rgba(0,168,150,0.15)", border: `1px solid ${TOKENS.teal}`, color: TOKENS.teal, padding: "8px", borderRadius: 6, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", cursor: "pointer" }}
            >
              🔍 Track RFQ
            </button>
            <button
              onClick={() => { openAuth?.(); setOpen(false); }}
              style={{ flex: 1, background: "rgba(21,101,192,0.15)", border: `1px solid ${TOKENS.blue}`, color: TOKENS.paper, padding: "8px", borderRadius: 6, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", cursor: "pointer" }}
            >
              {currentUser ? `👤 ${currentUser.company.split(" ")[0]}` : "🔑 Sign In"}
            </button>
          </div>

          {[
            { id: "home", label: "🏠 Home" },
            { id: "products", label: "🛒 Products" },
            { id: "services", label: "🛠 Services" },
            { id: "manufacturers", label: "🏭 Manufacturers" },
            { id: "businesses", label: "🏢 Businesses" },
            { id: "requirements", label: "📋 Requirements (RFQ)" },
            { id: "rfq-wizard", label: "➕ Post a Requirement" },
            { id: "dashboard", label: "📊 Dashboard" },
            { id: "knowledge", label: "📚 Knowledge" },
            { id: "about", label: "ℹ️ About" },
            { id: "contact", label: "📞 Contact" },
          ].map((n) => (
            <button
              key={n.id}
              onClick={() => { go(n.id); setOpen(false); }}
              style={{
                background: page === n.id ? "rgba(21, 101, 192, 0.15)" : "transparent",
                border: "none",
                textAlign: "left",
                color: page === n.id ? TOKENS.brass : TOKENS.paper,
                fontSize: 15,
                fontFamily: "'Inter', sans-serif",
                padding: "12px 10px",
                cursor: "pointer",
                borderRadius: 6,
              }}
            >
              {n.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

function Footer({ go }) {
  const cols = [
    {
      title: "Sourcing & Manufacturing",
      items: [
        ["CNC Machining", "manufacturers"],
        ["Sheet Metal Fabrication", "manufacturers"],
        ["SMT Electronics Assembly", "manufacturers"],
        ["Rubber & Sealing Systems", "manufacturers"],
        ["Post a Requirement (RFQ)", "rfq-wizard"],
        ["Browse Live RFQs", "requirements"]
      ]
    },
    {
      title: "Enterprise Software",
      items: [
        ["Abhimanyu ERP Platform", "products"],
        ["Abhimanyu CRM & Sales", "products"],
        ["Abhimanyu HRMS & Payroll", "products"],
        ["Abhimanyu AI Neural Engine", "products"],
        ["Abhimanyu IoT Fleet Manager", "products"],
        ["Seller & Vendor Dashboard", "dashboard"]
      ]
    },
    {
      title: "Engineering Services",
      items: [
        ["Custom Software Architecture", "services"],
        ["Machine Learning & Vision AI", "services"],
        ["Cloud & Anycast Load Balancing", "services"],
        ["Zero-Trust Cybersecurity", "services"],
        ["Technical Case Studies", "case-studies"],
        ["Engineering Insights Blog", "insights"]
      ]
    },
    {
      title: "Regional Industrial Hubs",
      items: [
        ["Telangana Enterprise HQ", "contact"],
        ["Chennai Industrial Corridor", "manufacturers"],
        ["Bengaluru Tech & Hardware", "services"],
        ["Pune & Mumbai OEM Hub", "manufacturers"],
        ["Delhi NCR Sourcing Hub", "requirements"],
        ["Global Edge Anycast Routing", "home"]
      ]
    }
  ];

  return (
    <footer style={{ borderTop: `1px solid ${TOKENS.hair}`, background: "rgba(11, 31, 58, 0.98)", padding: "70px 24px 36px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        {/* Pre-footer Callout Banner */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
          background: "linear-gradient(135deg, rgba(21,101,192,0.18) 0%, rgba(0,168,150,0.1) 100%)",
          border: `1px solid rgba(212,175,55,0.25)`,
          borderRadius: 8,
          padding: "24px 30px",
          marginBottom: 48
        }}>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: TOKENS.paper, marginBottom: 4 }}>
              Scale Your Sourcing & Manufacturing Operations
            </div>
            <div style={{ fontSize: 13.5, color: TOKENS.slate }}>
              Join 500+ verified enterprise buyers, OEM manufacturers, and technology suppliers.
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Button onClick={() => go("rfq-wizard")}>Post RFQ in 6 Steps →</Button>
            <Button variant="ghost" onClick={() => go("contact")}>Contact Leadership</Button>
          </div>
        </div>

        {/* 5-Column Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr repeat(4, 1fr)", gap: 32, marginBottom: 48 }} className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <TransparentLogo src="/logo.png" height={32} />
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: TOKENS.paper, fontWeight: 600 }}>Abhimanyu</div>
            </div>
            <p style={{ color: TOKENS.slate, fontSize: 13.5, lineHeight: 1.6, margin: "0 0 16px", maxWidth: 240 }}>
              One Platform. Every Industry. Sloganed to <b style={{ color: TOKENS.brass }}>"Scale Your Business"</b>.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              <span style={{ background: "rgba(212,175,55,0.1)", border: `1px solid rgba(212,175,55,0.3)`, padding: "3px 8px", borderRadius: 3, fontSize: 10.5, color: TOKENS.brass, fontFamily: "'JetBrains Mono', monospace" }}>ISO 9001:2015</span>
              <span style={{ background: "rgba(0,168,150,0.1)", border: `1px solid rgba(0,168,150,0.3)`, padding: "3px 8px", borderRadius: 3, fontSize: 10.5, color: TOKENS.teal, fontFamily: "'JetBrains Mono', monospace" }}>SOC2 TYPE II</span>
              <span style={{ background: "rgba(21,101,192,0.12)", border: `1px solid rgba(21,101,192,0.3)`, padding: "3px 8px", borderRadius: 3, fontSize: 10.5, color: "#60A5FA", fontFamily: "'JetBrains Mono', monospace" }}>99.999% SLA</span>
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.brass, letterSpacing: "0.08em", marginBottom: 16 }}>{c.title.toUpperCase()}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {c.items.map(([label, id]) => (
                  <button
                    key={label}
                    onClick={() => go(id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: TOKENS.slate,
                      fontSize: 13,
                      textAlign: "left",
                      cursor: "pointer",
                      padding: 0,
                      transition: "color 0.15s ease"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = TOKENS.paper)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = TOKENS.slate)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Legal & Telemetry Line */}
        <div style={{ borderTop: `1px solid ${TOKENS.hair}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, color: TOKENS.slate, fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>
          <div>
            <span>© 2026 Abhimanyu Technologies Pvt Ltd. All rights reserved.</span>
            <span style={{ margin: "0 10px", color: TOKENS.hair }}>|</span>
            <span>Telangana HQ, India</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ color: TOKENS.teal }}>● 12 Edge Nodes Live (Anycast)</span>
            <span>Privacy Policy · Terms of Sourcing · Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------- 3D AI Agent Avatar Icon ---------------------------- */

function AIAgent3DAvatarIcon({ onClick }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 20);
    camera.position.set(0, 0, 3.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(60, 60);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0x40465c, 1.5));
    const key = new THREE.PointLight(0xf3e5ab, 2.5, 30);
    key.position.set(3, 3, 4);
    scene.add(key);
    const rim = new THREE.PointLight(0x4fb3ff, 1.4, 30);
    rim.position.set(-3, -2, -3);
    scene.add(rim);

    const group = new THREE.Group();
    scene.add(group);

    // AI Avatar head sphere / octahedron core
    const brassMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.2, emissive: 0x4a3808, emissiveIntensity: 0.4 });
    const blueMat = new THREE.MeshStandardMaterial({ color: 0x4fb3ff, emissive: 0x4fb3ff, emissiveIntensity: 0.6, metalness: 0.8, roughness: 0.2 });

    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.75, 1), brassMat);
    group.add(core);

    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.035, 12, 60), blueMat);
    ring.rotation.x = Math.PI / 3;
    group.add(ring);

    // Avatar eyes / visor
    const eye1 = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 12), blueMat);
    const eye2 = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 12), blueMat);
    eye1.position.set(-0.25, 0.15, 0.65);
    eye2.position.set(0.25, 0.15, 0.65);
    group.add(eye1, eye2);

    let raf;
    const start = performance.now();
    const animate = (t) => {
      const elapsed = (t - start) / 1000;
      if (!reduced) {
        group.rotation.y = elapsed * 0.8;
        ring.rotation.z = -elapsed * 0.6;
        core.position.y = Math.sin(elapsed * 2) * 0.08;
        raf = requestAnimationFrame(animate);
      }
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      brassMat.dispose(); blueMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          background: "rgba(11, 31, 58, 0.9)",
          border: "1px solid rgba(212,175,55,0.4)",
          borderRadius: 999,
          padding: "6px 14px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: TOKENS.paper,
          boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
          pointerEvents: "none",
        }}
      >
        🤖 AI AGENT ONLINE
      </div>
      <button
        onClick={onClick}
        style={{
          background: "rgba(16, 24, 40, 0.9)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(212, 175, 55, 0.5)",
          borderRadius: "50%",
          width: 68,
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 10px 32px -4px rgba(212,175,55,0.6), 0 0 16px rgba(79,179,255,0.4)",
          padding: 0,
          position: "relative",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        title="Open AI Agent"
      >
        <div ref={mountRef} style={{ width: 60, height: 60, pointerEvents: "none" }} />
        <span
          style={{
            position: "absolute",
            top: 2,
            right: 2,
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#4fb3ff",
            border: "2px solid #0B1F3A",
            boxShadow: "0 0 8px #4fb3ff",
          }}
        />
      </button>
    </div>
  );
}

/* ---------------------------- site-wide AI Agent widget ---------------------------- */

function AIAgentWidget({ go }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Greetings! I am the MyVault AI Assistant. How can I assist you with our engineering services, products, or security architecture today?",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const suggestions = [
    { label: "What services do you offer?", text: "What services does MyVault offer?" },
    { label: "How does Vault security work?", text: "Explain MyVault zero-knowledge security." },
    { label: "View Products", text: "Show me MyVault products." },
    { label: "Get a Project Proposal", text: "How do I request a project proposal?" },
  ];

  const getAIResponse = (userQuery) => {
    const q = userQuery.toLowerCase();
    if (q.includes("service") || q.includes("offer") || q.includes("build")) {
      return {
        text: "MyVault specializes in Software Engineering, AI & Machine Learning, Cloud & DevOps, Cybersecurity, Data Engineering, IoT, and Quality Assurance. We offer Fixed-Scope, Dedicated Team, and Ongoing Partner engagement models.",
        actionLabel: "Explore Services",
        actionTarget: "services",
      };
    }
    if (q.includes("security") || q.includes("vault") || q.includes("aes")) {
      return {
        text: "MyVault systems implement Zero-Knowledge Architecture with AES-256 multi-region encryption, automated rate-limiting, gRPC/GraphQL event gateways, and continuous threat monitoring.",
        actionLabel: "Read System Architecture",
        actionTarget: "home",
      };
    }
    if (q.includes("product") || q.includes("erp") || q.includes("crm")) {
      return {
        text: "We build and maintain enterprise software platforms including MyVault ERP, MyVault CRM, MyVault HRMS, MyVault AI Agent Platform, and MyVault IoT Fleet Manager.",
        actionLabel: "View All Products",
        actionTarget: "products",
      };
    }
    if (q.includes("proposal") || q.includes("contact") || q.includes("hire") || q.includes("quote")) {
      return {
        text: "Ready to start your project? You can submit your requirements directly to our engineering leadership team.",
        actionLabel: "Open Contact Form",
        actionTarget: "contact",
      };
    }
    return {
      text: "Thank you for reaching out! MyVault provides enterprise-grade software development, AI models, and cloud infrastructure engineered for long-term reliability. How else can I assist your team?",
      actionLabel: "Talk to an Expert",
      actionTarget: "contact",
    };
  };

  const handleSend = (textToSend) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: query }]);
    if (!textToSend) setInputVal("");
    setIsTyping(true);

    setTimeout(() => {
      const resp = getAIResponse(query);
      setMessages((prev) => [...prev, { sender: "ai", text: resp.text, actionLabel: resp.actionLabel, actionTarget: resp.actionTarget }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999 }}>
      {/* Floating 3D Avatar Icon Trigger */}
      {!open && <AIAgent3DAvatarIcon onClick={() => setOpen(true)} />}

      {/* Expanded Chat Widget */}
      {open && (
        <div
          style={{
            width: 360,
            height: 480,
            background: "rgba(11, 31, 58, 0.96)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(212, 175, 55, 0.4)",
            borderRadius: 8,
            boxShadow: "0 24px 60px -12px rgba(0,0,0,0.85)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "14px 18px",
              background: "rgba(16, 21, 31, 0.9)",
              borderBottom: `1px solid ${TOKENS.hair}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: TOKENS.teal }} />
              <div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 15, color: TOKENS.paper, fontWeight: 600 }}>
                  MyVault AI Agent
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.teal }}>
                  NEURAL MODEL v4.8 ACTIVE
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ background: "none", border: "none", color: TOKENS.paper, fontSize: 18, cursor: "pointer" }}
            >
              ×
            </button>
          </div>

          {/* Messages Body */}
          <div style={{ flex: 1, padding: 14, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  background: m.sender === "user" ? TOKENS.brass : "rgba(255,255,255,0.05)",
                  color: m.sender === "user" ? TOKENS.ink : TOKENS.paper,
                  border: m.sender === "user" ? "none" : `1px solid ${TOKENS.hair}`,
                  borderRadius: 6,
                  padding: "10px 14px",
                  fontSize: 13,
                  lineHeight: 1.5,
                }}
              >
                {m.text}
                {m.actionLabel && (
                  <div style={{ marginTop: 10 }}>
                    <button
                      onClick={() => {
                        go(m.actionTarget);
                        setOpen(false);
                      }}
                      style={{
                        background: TOKENS.teal,
                        color: TOKENS.ink,
                        border: "none",
                        borderRadius: 3,
                        padding: "5px 10px",
                        fontSize: 11,
                        fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      {m.actionLabel} →
                    </button>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div style={{ alignSelf: "flex-start", color: TOKENS.slate, fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>
                AI Assistant is typing...
              </div>
            )}
          </div>

          {/* Prompt Chips */}
          <div style={{ padding: "8px 12px", background: "rgba(16, 21, 31, 0.6)", borderTop: `1px solid ${TOKENS.hair}`, display: "flex", gap: 6, overflowX: "auto" }}>
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(s.text)}
                style={{
                  background: "transparent",
                  border: `1px solid ${TOKENS.hair}`,
                  borderRadius: 999,
                  color: TOKENS.slate,
                  fontSize: 10,
                  fontFamily: "'JetBrains Mono', monospace",
                  padding: "4px 10px",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{ padding: 12, borderTop: `1px solid ${TOKENS.hair}`, display: "flex", gap: 8 }}
          >
            <input
              type="text"
              placeholder="Ask AI Assistant anything..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              style={{
                flex: 1,
                background: TOKENS.ink,
                border: `1px solid ${TOKENS.hair}`,
                borderRadius: 4,
                padding: "8px 12px",
                color: TOKENS.paper,
                fontSize: 13,
              }}
            />
            <button
              type="submit"
              style={{
                background: TOKENS.brass,
                color: TOKENS.ink,
                border: "none",
                borderRadius: 4,
                padding: "8px 14px",
                fontSize: 13,
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function LeadCaptureModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const isSub = localStorage.getItem("abhimanu_subscribed");
    if (isSub) setSubscribed(true);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    localStorage.setItem("abhimanu_subscribed", "true");
    setSubscribed(true);
    trackEvent("lead_capture_subscribe", { email });
    setTimeout(() => setOpen(false), 2000);
  };

  if (subscribed && !open) return null;

  return (
    <>
      {/* Floating Trigger Pill */}
      {!open && !subscribed && (
        <button
          onClick={() => setOpen(true)}
          className="lead-trigger-pill"
          style={{
            position: "fixed",
            bottom: "clamp(80px, 10vh, 24px)",
            left: 20,
            zIndex: 9990,
            background: "rgba(16, 24, 40, 0.95)",
            border: `1px solid ${TOKENS.brass}`,
            borderRadius: 999,
            padding: "9px 16px",
            color: TOKENS.paper,
            fontSize: 12,
            fontFamily: "'JetBrains Mono', monospace",
            cursor: "pointer",
            backdropFilter: "blur(14px)",
            boxShadow: "0 12px 32px rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ color: TOKENS.brass }}>★</span> Architecture Blueprint Guide 2026
        </button>
      )}

      {/* Modal Dialog */}
      {open && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(7, 16, 32, 0.94)", backdropFilter: "blur(18px)", zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center", padding: 20 }}>
          <div style={{ maxWidth: 480, width: "100%", border: `1px solid rgba(212,175,55,0.4)`, background: TOKENS.panelAlt, borderRadius: 12, overflow: "hidden", position: "relative", padding: 36, boxShadow: "0 32px 80px rgba(0,0,0,0.85)" }}>
            <button onClick={() => setOpen(false)} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.06)", border: `1px solid ${TOKENS.hair}`, color: TOKENS.paper, fontSize: 18, cursor: "pointer", width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>

            {subscribed ? (
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <div style={{ fontSize: 36, color: TOKENS.teal, marginBottom: 12 }}>✓</div>
                <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 24, margin: "0 0 8px" }}>Blueprint Dispatched!</h3>
                <p style={{ color: TOKENS.slate, fontSize: 14, margin: 0, lineHeight: 1.6 }}>Check your inbox shortly for the Enterprise Architecture Blueprint 2026 PDF.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.teal, marginBottom: 8, letterSpacing: "0.08em" }}>FREE ENTERPRISE WHITEPAPER</div>
                <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 22, margin: "0 0 10px" }}>Enterprise Architecture Blueprint</h3>
                <p style={{ color: TOKENS.slate, fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                  Download our 2026 whitepaper on building resilient microservices, zero-trust security, and sub-10ms AI engines.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email..."
                    style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "12px 14px", color: TOKENS.paper, fontSize: 14 }}
                  />
                  <Button type="submit">Download Blueprint PDF →</Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

/* ---------------------------- Interactive B2B RFQ & PO Lifecycle Inspector Modal ---------------------------- */

function RFQTrackerModal({ rfqId, isOpen, onClose, currency = "INR", go, openCAD, openEscrow, openTraceability, openFreight }) {
  const [activeId, setActiveId] = useState(rfqId || "RFQ-2026-9041");
  const [customInput, setCustomInput] = useState("");
  const [acceptedBid, setAcceptedBid] = useState(null);
  const [generatingPo, setGeneratingPo] = useState(false);

  useEffect(() => {
    if (rfqId) setActiveId(rfqId);
  }, [rfqId]);

  if (!isOpen) return null;

  const knownRfq = PUBLIC_RFQS.find((r) => r.id === activeId) || {
    id: activeId,
    title: `Precision Engineered Component Batch — ${activeId}`,
    category: "Custom CNC Machining",
    quantity: "5,000 Units",
    location: "Target Delivery: Telangana / Chennai",
    budget: "$40,000 - $65,000",
    deadline: "14 Days",
    status: "OPEN FOR QUOTES",
    bidsCount: "12 Bids Submitted",
    tolerance: "±0.010 mm",
    material: "Aluminium 6061-T6 / SS 316L",
    buyer: "Verified Enterprise Buyer",
  };

  const sampleBids = [
    {
      id: "BID-1",
      supplier: "Apex Precision Engineering Ltd.",
      hub: "Chennai Corridor, Tamil Nadu",
      inrPrice: 1840000,
      leadTime: "14 Business Days",
      oee: "99.4%",
      certs: ["AS9100D", "ISO 9001:2015"],
      rating: "4.9/5 (142 Deliveries)",
      status: "TOP MATCH",
    },
    {
      id: "BID-2",
      supplier: "Deccan High-Precision Engineering",
      hub: "Hyderabad Aerospace Hub, Telangana",
      inrPrice: 1920000,
      leadTime: "12 Business Days",
      oee: "98.8%",
      certs: ["ISO 9001:2015", "IATF 16949"],
      rating: "4.8/5 (88 Deliveries)",
      status: "FASTEST LEAD",
    },
    {
      id: "BID-3",
      supplier: "Bengaluru Micro-Machining Ltd.",
      hub: "Peenya Industrial Area, Bengaluru",
      inrPrice: 1790000,
      leadTime: "16 Business Days",
      oee: "99.1%",
      certs: ["ISO 13485", "ISO 9001:2015"],
      rating: "4.9/5 (210 Deliveries)",
      status: "BEST VALUE",
    },
  ];

  const handleAcceptBid = (bid) => {
    setGeneratingPo(true);
    setTimeout(() => {
      setAcceptedBid({
        ...bid,
        poNumber: `PO-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        issuedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      });
      setGeneratingPo(false);
      trackEvent("accept_rfq_bid", { rfqId: activeId, supplier: bid.supplier, po: `PO-2026-${activeId.slice(-4)}` });
    }, 700);
  };

  const milestones = [
    { step: 1, label: "RFQ Broadcasted", desc: "Broadcasted to 42 verified plants", done: true, current: false },
    { step: 2, label: "DFM Feasibility Audit", desc: "CAD mesh ±0.005mm verified", done: true, current: false },
    { step: 3, label: "Competitive Bidding", desc: "3 live quotes evaluated", done: !acceptedBid, current: !acceptedBid },
    { step: 4, label: "PO & FAI Prototype", desc: acceptedBid ? `Issued ${acceptedBid.poNumber}` : "Pending buyer acceptance", done: !!acceptedBid, current: !!acceptedBid },
    { step: 5, label: "Batch Dispatch", desc: "14-day production cycle", done: false, current: false },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(7, 16, 32, 0.94)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <div
        style={{
          maxWidth: 880,
          width: "100%",
          maxHeight: "92vh",
          overflowY: "auto",
          background: TOKENS.panelAlt,
          border: `1px solid rgba(212,175,55,0.4)`,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.85)",
        }}
      >
        {/* Modal Top Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #0a1929 0%, #101828 100%)",
            padding: "24px 28px",
            borderBottom: `1px solid ${TOKENS.hair}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.teal, letterSpacing: "0.08em" }}>
                LIVE PROCUREMENT LIFECYCLE & PO TRACKER
              </span>
              <span
                style={{
                  background: acceptedBid ? "rgba(0,168,150,0.2)" : "rgba(212,175,55,0.15)",
                  color: acceptedBid ? TOKENS.teal : TOKENS.brass,
                  border: `1px solid ${acceptedBid ? TOKENS.teal : TOKENS.brass}`,
                  fontSize: 10.5,
                  padding: "3px 8px",
                  borderRadius: 4,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                }}
              >
                {acceptedBid ? `● ${acceptedBid.poNumber} ISSUED` : `● ${knownRfq.status}`}
              </span>
            </div>
            <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 22, margin: 0 }}>
              {knownRfq.id}: {knownRfq.title}
            </h3>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: TOKENS.slate, marginTop: 4 }}>
              Buyer: <span style={{ color: TOKENS.paper }}>{knownRfq.buyer}</span> • {knownRfq.location}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: `1px solid ${TOKENS.hair}`,
              color: TOKENS.paper,
              fontSize: 18,
              cursor: "pointer",
              width: 34,
              height: 34,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>

        {/* Quick Switcher & Lookup */}
        <div style={{ padding: "14px 28px", background: "rgba(255,255,255,0.02)", borderBottom: `1px solid ${TOKENS.hair}`, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate }}>Switch RFQ:</span>
            {PUBLIC_RFQS.map((r) => (
              <button
                key={r.id}
                onClick={() => { setActiveId(r.id); setAcceptedBid(null); }}
                style={{
                  background: activeId === r.id ? TOKENS.brass : "transparent",
                  color: activeId === r.id ? TOKENS.ink : TOKENS.paper,
                  border: `1px solid ${activeId === r.id ? TOKENS.brass : TOKENS.hair}`,
                  borderRadius: 4,
                  padding: "4px 8px",
                  fontSize: 11,
                  fontFamily: "'JetBrains Mono', monospace",
                  cursor: "pointer",
                }}
              >
                {r.id.split("-")[2]}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (customInput.trim()) {
                setActiveId(customInput.trim().toUpperCase());
                setAcceptedBid(null);
                setCustomInput("");
              }
            }}
            style={{ display: "flex", gap: 6 }}
          >
            <input
              type="text"
              placeholder="Enter RFQ / Ref ID..."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${TOKENS.hair}`,
                borderRadius: 4,
                padding: "4px 10px",
                color: TOKENS.paper,
                fontSize: 11,
                fontFamily: "'JetBrains Mono', monospace",
                width: 140,
              }}
            />
            <button
              type="submit"
              style={{
                background: TOKENS.blue,
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "4px 10px",
                fontSize: 11,
                cursor: "pointer",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              Lookup
            </button>
          </form>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "24px 28px" }}>
          {/* Milestone Stepper */}
          <div style={{ marginBottom: 28, background: "rgba(255,255,255,0.02)", padding: "18px 20px", borderRadius: 8, border: `1px solid ${TOKENS.hair}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, overflowX: "auto", paddingBottom: 4 }}>
              {milestones.map((m, idx) => (
                <div key={idx} style={{ flex: 1, minWidth: 120, position: "relative" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: m.done ? TOKENS.teal : m.current ? TOKENS.brass : "rgba(255,255,255,0.08)",
                        color: m.done || m.current ? TOKENS.ink : TOKENS.slate,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: "bold",
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {m.done ? "✓" : m.step}
                    </div>
                    <span style={{ fontSize: 11.5, fontFamily: "'Inter', sans-serif", fontWeight: 600, color: m.done || m.current ? TOKENS.paper : TOKENS.slate }}>
                      {m.label}
                    </span>
                  </div>
                  <div style={{ fontSize: 10.5, color: TOKENS.slate, fontFamily: "'JetBrains Mono', monospace", paddingLeft: 32 }}>
                    {m.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PO Issued Banner */}
          {acceptedBid && (
            <div
              style={{
                marginBottom: 24,
                background: "linear-gradient(135deg, rgba(0, 168, 150, 0.15) 0%, rgba(21, 101, 192, 0.15) 100%)",
                border: `1px solid ${TOKENS.teal}`,
                borderRadius: 8,
                padding: "20px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: TOKENS.teal, fontWeight: 700, marginBottom: 4 }}>
                  ✓ B2B PURCHASE ORDER ISSUED: {acceptedBid.poNumber}
                </div>
                <div style={{ color: TOKENS.paper, fontSize: 14 }}>
                  Awarded to <strong>{acceptedBid.supplier}</strong> for {formatPrice(acceptedBid.inrPrice, currency)}. Shop floor dispatch scheduled in {acceptedBid.leadTime}.
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button
                  onClick={() => openEscrow?.(acceptedBid.poNumber, acceptedBid.supplier, acceptedBid.inrPrice)}
                  style={{
                    background: "linear-gradient(135deg, #D4AF37 0%, #F59E0B 100%)",
                    color: "#080E1A",
                    border: "none",
                    borderRadius: 6,
                    padding: "8px 18px",
                    fontSize: 12,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 800,
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(212,175,55,0.3)",
                  }}
                >
                  🔐 Escrow Ledger & Releases →
                </button>
                <button
                  onClick={() => openFreight?.(knownRfq.id, acceptedBid.poNumber)}
                  style={{
                    background: "rgba(21,101,192,0.25)",
                    border: `1px solid ${TOKENS.blue}`,
                    color: "#93C5FD",
                    borderRadius: 6,
                    padding: "8px 18px",
                    fontSize: 12,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  🚚 Track Live Freight →
                </button>
                <button
                  onClick={() => alert(`Simulating Secure PDF Download for Purchase Order ${acceptedBid.poNumber} (Includes Digital Escrow & CMM GD&T Inspection Report)...`)}
                  style={{
                    background: TOKENS.teal,
                    color: "#0B1F3A",
                    border: "none",
                    borderRadius: 6,
                    padding: "8px 18px",
                    fontSize: 12,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  📄 Download PO ({acceptedBid.poNumber}) →
                </button>
              </div>
            </div>
          )}

          {/* RFQ Specs Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 28 }}>
            <div style={{ background: "rgba(255,255,255,0.025)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "12px 14px" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.slate }}>BATCH QUANTITY</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: TOKENS.paper, fontWeight: 600, marginTop: 4 }}>{knownRfq.quantity}</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.025)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "12px 14px" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.slate }}>REQUIRED TOLERANCE</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: TOKENS.teal, fontWeight: 600, marginTop: 4 }}>{knownRfq.tolerance}</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.025)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "12px 14px" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.slate }}>CERTIFIED MATERIAL</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4, flexWrap: "wrap", gap: 6 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: TOKENS.brass, fontWeight: 600 }}>{knownRfq.material}</span>
                <button
                  onClick={() => openTraceability?.(knownRfq.id, knownRfq.material)}
                  style={{
                    background: "rgba(0,168,150,0.15)",
                    border: `1px solid ${TOKENS.teal}`,
                    color: TOKENS.teal,
                    borderRadius: 4,
                    padding: "3px 8px",
                    fontSize: 10.5,
                    fontFamily: "'JetBrains Mono', monospace",
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  🔬 View MTR & Heat # →
                </button>
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.025)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "12px 14px" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.slate }}>CAD MESH ATTACHMENT</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4, flexWrap: "wrap", gap: 6 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: TOKENS.paper }}>
                  📎 {knownRfq.id.toLowerCase()}_cad.step
                </span>
                <button
                  onClick={() => openCAD?.(knownRfq.id, knownRfq.title)}
                  style={{
                    background: "rgba(212,175,55,0.15)",
                    border: `1px solid ${TOKENS.brass}`,
                    color: TOKENS.brass,
                    borderRadius: 4,
                    padding: "3px 8px",
                    fontSize: 10.5,
                    fontFamily: "'JetBrains Mono', monospace",
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  👁️ Inspect 3D Mesh →
                </button>
              </div>
            </div>
          </div>

          {/* Competing Vetted Supplier Quotes */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: 18, color: TOKENS.paper, margin: 0 }}>
                Competing Supplier Bids ({sampleBids.length})
              </h4>
              <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate }}>
                Currency: <strong style={{ color: TOKENS.brass }}>{currency}</strong>
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {sampleBids.map((bid) => {
                const isAwarded = acceptedBid?.id === bid.id;
                return (
                  <div
                    key={bid.id}
                    style={{
                      background: isAwarded ? "rgba(0,168,150,0.08)" : "rgba(255,255,255,0.025)",
                      border: `1px solid ${isAwarded ? TOKENS.teal : TOKENS.hair}`,
                      borderRadius: 8,
                      padding: "16px 20px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 14,
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontFamily: "'Fraunces', serif", fontSize: 16, color: TOKENS.paper, fontWeight: 600 }}>
                          {bid.supplier}
                        </span>
                        <span style={{ background: "rgba(21,101,192,0.15)", color: TOKENS.teal, fontSize: 10, padding: "2px 6px", borderRadius: 4, fontFamily: "'JetBrains Mono', monospace" }}>
                          {bid.status}
                        </span>
                      </div>
                      <div style={{ fontSize: 12, color: TOKENS.slate, marginBottom: 6 }}>
                        📍 {bid.hub} • ⭐ {bid.rating} • OEE: {bid.oee}
                      </div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {bid.certs.map((c) => (
                          <span key={c} style={{ background: "rgba(255,255,255,0.05)", color: TOKENS.slate, fontSize: 10, padding: "2px 6px", borderRadius: 3, fontFamily: "'JetBrains Mono', monospace" }}>
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                      <div>
                        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: TOKENS.brassBright, fontWeight: 700 }}>
                          {formatPrice(bid.inrPrice, currency)}
                        </div>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.teal }}>
                          ⏱ Lead: {bid.leadTime}
                        </div>
                      </div>

                      {acceptedBid ? (
                        isAwarded ? (
                          <span style={{ background: TOKENS.teal, color: TOKENS.ink, padding: "6px 14px", borderRadius: 4, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
                            ✓ PO AWARDED
                          </span>
                        ) : (
                          <span style={{ color: TOKENS.slate, fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>
                            Bid Closed
                          </span>
                        )
                      ) : (
                        <button
                          disabled={generatingPo}
                          onClick={() => handleAcceptBid(bid)}
                          style={{
                            background: TOKENS.brass,
                            color: TOKENS.ink,
                            border: "none",
                            borderRadius: 4,
                            padding: "7px 14px",
                            fontSize: 11.5,
                            fontFamily: "'JetBrains Mono', monospace",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          {generatingPo ? "Issuing PO..." : "Accept Bid & Issue PO →"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Modal Bottom Actions */}
          <div style={{ borderTop: `1px solid ${TOKENS.hair}`, paddingTop: 18, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button
                onClick={() => alert(`Downloading DFM Engineering Feasibility & Automated Mesh Audit report for ${knownRfq.id}...`)}
                style={{
                  background: "transparent",
                  border: `1px solid ${TOKENS.hair}`,
                  color: TOKENS.paper,
                  borderRadius: 4,
                  padding: "8px 14px",
                  fontSize: 12,
                  fontFamily: "'JetBrains Mono', monospace",
                  cursor: "pointer",
                }}
              >
                📥 Download DFM Audit (PDF)
              </button>
              <button
                onClick={() => openEscrow?.(acceptedBid ? acceptedBid.poNumber : "PO-2026-9041", acceptedBid ? acceptedBid.supplier : "Apex Precision Engineering Ltd.", acceptedBid ? acceptedBid.inrPrice : 485000)}
                style={{
                  background: "rgba(212,175,55,0.12)",
                  border: `1px solid rgba(212,175,55,0.4)`,
                  color: TOKENS.brass,
                  borderRadius: 4,
                  padding: "8px 14px",
                  fontSize: 12,
                  fontFamily: "'JetBrains Mono', monospace",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                🔐 Escrow Vault & Terms →
              </button>
              <button
                onClick={() => openFreight?.(knownRfq.id, acceptedBid ? acceptedBid.poNumber : "PO-2026-9041")}
                style={{
                  background: "rgba(21,101,192,0.12)",
                  border: `1px solid rgba(21,101,192,0.4)`,
                  color: "#93C5FD",
                  borderRadius: 4,
                  padding: "8px 14px",
                  fontSize: 12,
                  fontFamily: "'JetBrains Mono', monospace",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                🚚 Live Freight Tracking →
              </button>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Button variant="ghost" onClick={() => { onClose(); go("requirements"); }}>Browse Other Live RFQs</Button>
              <Button onClick={onClose}>Done</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- Enterprise B2B Buyer & Supplier Access Portal ---------------------------- */

function AuthModal({ isOpen, onClose, currentUser, onLogin, onLogout }) {
  const [tab, setTab] = useState("signin");
  const [role, setRole] = useState("buyer");
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    hub: "Telangana Enterprise Campus",
    gstin: "",
    industry: "Aerospace & Defence",
  });
  const [toast, setToast] = useState("");

  if (!isOpen) return null;

  const handleDemoLogin = (demoRole) => {
    let profile;
    if (demoRole === "buyer") {
      profile = {
        name: "Dr. K. S. Rao",
        company: "Bharat Aerospace & Dynamics",
        role: "buyer",
        location: "Telangana & Chennai Hub",
        avatar: "🏢",
        badge: "Enterprise Procurement Lead",
        tier: "Tier-1 Defence & Space",
        activeRFQs: 3,
        email: "ksrao@bharataero.gov.in",
      };
    } else {
      profile = {
        name: "S. Venkatesh",
        company: "Apex Precision Engineering Ltd.",
        role: "supplier",
        location: "Ambattur Corridor, Chennai",
        avatar: "🏭",
        badge: "Verified OEM Manufacturer",
        tier: "AS9100D Certified Plant",
        activeRFQs: 8,
        email: "venkatesh@apexprecision.in",
      };
    }
    onLogin(profile);
    setToast(`Logged in as ${profile.company} (${profile.role.toUpperCase()})`);
    setTimeout(() => {
      setToast("");
      onClose();
    }, 900);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const profile = {
      name: form.name || (role === "buyer" ? "Enterprise Buyer" : "Industrial Supplier"),
      company: form.company || "Enterprise Corp Ltd.",
      role: role,
      location: form.hub,
      avatar: role === "buyer" ? "🏢" : "🏭",
      badge: role === "buyer" ? "Procurement Director" : "Verified Manufacturer",
      tier: "Verified Member",
      activeRFQs: 1,
      email: form.email,
    };
    onLogin(profile);
    setToast(`Welcome, ${profile.name}! Account synced.`);
    setTimeout(() => {
      setToast("");
      onClose();
    }, 900);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(7, 16, 32, 0.94)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <div
        style={{
          maxWidth: 520,
          width: "100%",
          maxHeight: "92vh",
          overflowY: "auto",
          background: TOKENS.panelAlt,
          border: `1px solid rgba(212,175,55,0.4)`,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.85)",
          position: "relative",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #0a1929 0%, #101828 100%)",
            padding: "24px 28px",
            borderBottom: `1px solid ${TOKENS.hair}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.teal, letterSpacing: "0.08em", marginBottom: 4 }}>
              ENTERPRISE ACCESS PORTAL
            </div>
            <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 22, margin: 0 }}>
              {currentUser ? "Manage Enterprise Profile" : tab === "signin" ? "Sign In to Your Workspace" : "Register Enterprise Account"}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: `1px solid ${TOKENS.hair}`,
              color: TOKENS.paper,
              fontSize: 18,
              cursor: "pointer",
              width: 32,
              height: 32,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>

        {/* Toast Notification */}
        {toast && (
          <div style={{ background: "rgba(0,168,150,0.2)", borderBottom: `1px solid ${TOKENS.teal}`, color: TOKENS.teal, padding: "10px 24px", fontSize: 13, fontFamily: "'JetBrains Mono', monospace", textAlign: "center" }}>
            ✓ {toast}
          </div>
        )}

        {currentUser ? (
          /* Active Account State */
          <div style={{ padding: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.03)", border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: 18, marginBottom: 20 }}>
              <div style={{ fontSize: 36 }}>{currentUser.avatar}</div>
              <div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, color: TOKENS.paper }}>{currentUser.company}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: TOKENS.brass }}>{currentUser.badge} ({currentUser.role.toUpperCase()})</div>
                <div style={{ fontSize: 12, color: TOKENS.slate, marginTop: 4 }}>📍 {currentUser.location} • {currentUser.email}</div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
              <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${TOKENS.hair}`, padding: 12, borderRadius: 6, textAlign: "center" }}>
                <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate }}>ACTIVE RFQs</div>
                <div style={{ fontSize: 20, fontFamily: "'Fraunces', serif", color: TOKENS.teal, fontWeight: 700, marginTop: 4 }}>{currentUser.activeRFQs} Live</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${TOKENS.hair}`, padding: 12, borderRadius: 6, textAlign: "center" }}>
                <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate }}>SECURITY STATUS</div>
                <div style={{ fontSize: 13, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.brass, fontWeight: 700, marginTop: 8 }}>✓ MFA VERIFIED</div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button
                onClick={() => {
                  const newRole = currentUser.role === "buyer" ? "supplier" : "buyer";
                  handleDemoLogin(newRole);
                }}
                style={{
                  background: "rgba(21, 101, 192, 0.15)",
                  border: `1px solid ${TOKENS.blue}`,
                  color: TOKENS.paper,
                  padding: "10px 16px",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: 13,
                  fontFamily: "'JetBrains Mono', monospace",
                  textAlign: "center",
                }}
              >
                Switch Role to {currentUser.role === "buyer" ? "🏭 Verified Supplier" : "🏢 Enterprise Buyer"} →
              </button>

              <button
                onClick={() => {
                  onLogout();
                  setToast("Signed out successfully.");
                  setTimeout(() => { setToast(""); onClose(); }, 800);
                }}
                style={{
                  background: "transparent",
                  border: `1px solid ${TOKENS.hair}`,
                  color: "#f87171",
                  padding: "10px 16px",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: 13,
                  fontFamily: "'JetBrains Mono', monospace",
                  textAlign: "center",
                }}
              >
                Sign Out of Workspace
              </button>
            </div>
          </div>
        ) : (
          /* Sign In / Register Forms */
          <div style={{ padding: "24px 28px" }}>
            {/* Quick 1-Click Demo Logins */}
            <div style={{ marginBottom: 20, background: "rgba(212, 175, 55, 0.08)", border: `1px solid rgba(212, 175, 55, 0.3)`, borderRadius: 8, padding: 14 }}>
              <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.brass, marginBottom: 8, fontWeight: 700 }}>
                ⚡ 1-CLICK INSTANT TEST LOGIN
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button
                  onClick={() => handleDemoLogin("buyer")}
                  style={{
                    flex: 1,
                    background: "rgba(255,255,255,0.06)",
                    border: `1px solid ${TOKENS.hair}`,
                    color: TOKENS.paper,
                    padding: "8px 12px",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontSize: 12,
                    fontFamily: "'JetBrains Mono', monospace",
                    textAlign: "left",
                  }}
                >
                  🏢 <strong>Buyer:</strong> Bharat Aerospace
                </button>
                <button
                  onClick={() => handleDemoLogin("supplier")}
                  style={{
                    flex: 1,
                    background: "rgba(255,255,255,0.06)",
                    border: `1px solid ${TOKENS.hair}`,
                    color: TOKENS.paper,
                    padding: "8px 12px",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontSize: 12,
                    fontFamily: "'JetBrains Mono', monospace",
                    textAlign: "left",
                  }}
                >
                  🏭 <strong>Supplier:</strong> Apex Precision
                </button>
              </div>
            </div>

            {/* Mode Switcher Tabs */}
            <div style={{ display: "flex", borderBottom: `1px solid ${TOKENS.hair}`, marginBottom: 20 }}>
              <button
                onClick={() => setTab("signin")}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  borderBottom: `2px solid ${tab === "signin" ? TOKENS.brass : "transparent"}`,
                  color: tab === "signin" ? TOKENS.brass : TOKENS.slate,
                  padding: "8px 0",
                  cursor: "pointer",
                  fontSize: 13,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                }}
              >
                Sign In
              </button>
              <button
                onClick={() => setTab("register")}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  borderBottom: `2px solid ${tab === "register" ? TOKENS.brass : "transparent"}`,
                  color: tab === "register" ? TOKENS.brass : TOKENS.slate,
                  padding: "8px 0",
                  cursor: "pointer",
                  fontSize: 13,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                }}
              >
                Register Business
              </button>
            </div>

            {/* Role Selection */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate, marginBottom: 6 }}>
                SELECT YOUR ENTERPRISE ROLE
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <button
                  type="button"
                  onClick={() => setRole("buyer")}
                  style={{
                    background: role === "buyer" ? "rgba(21, 101, 192, 0.2)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${role === "buyer" ? TOKENS.blue : TOKENS.hair}`,
                    color: role === "buyer" ? TOKENS.paper : TOKENS.slate,
                    padding: "10px",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontSize: 12,
                    fontFamily: "'JetBrains Mono', monospace",
                    textAlign: "center",
                  }}
                >
                  🏢 Enterprise Buyer
                </button>
                <button
                  type="button"
                  onClick={() => setRole("supplier")}
                  style={{
                    background: role === "supplier" ? "rgba(0, 168, 150, 0.2)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${role === "supplier" ? TOKENS.teal : TOKENS.hair}`,
                    color: role === "supplier" ? TOKENS.paper : TOKENS.slate,
                    padding: "10px",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontSize: 12,
                    fontFamily: "'JetBrains Mono', monospace",
                    textAlign: "center",
                  }}
                >
                  🏭 Verified Supplier
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {tab === "register" && (
                <div>
                  <label style={{ display: "block", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate, marginBottom: 4 }}>
                    FULL NAME / REPRESENTATIVE
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Chandra"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "10px 12px", color: TOKENS.paper, fontSize: 13 }}
                  />
                </div>
              )}

              <div>
                <label style={{ display: "block", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate, marginBottom: 4 }}>
                  WORK EMAIL (CORPORATE DOMAIN)
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "10px 12px", color: TOKENS.paper, fontSize: 13 }}
                />
              </div>

              {tab === "register" && (
                <>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate, marginBottom: 4 }}>
                      COMPANY / ENTITY NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Industrial Solutions Ltd."
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "10px 12px", color: TOKENS.paper, fontSize: 13 }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate, marginBottom: 4 }}>
                      PRIMARY OPERATIONAL HUB
                    </label>
                    <select
                      value={form.hub}
                      onChange={(e) => setForm({ ...form, hub: e.target.value })}
                      style={{ width: "100%", background: "#101828", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "10px 12px", color: TOKENS.paper, fontSize: 13 }}
                    >
                      <option value="Telangana Enterprise Campus">Telangana Enterprise Campus (Hyderabad)</option>
                      <option value="Chennai Machining Corridor">Chennai Machining Corridor (Tamil Nadu)</option>
                      <option value="Bengaluru Tech & Hardware Hub">Bengaluru Tech & Hardware Hub (Karnataka)</option>
                      <option value="Pune & Mumbai Industrial Belt">Pune & Mumbai Industrial Belt (Maharashtra)</option>
                      <option value="Delhi NCR Sourcing Belt">Delhi NCR Sourcing Belt</option>
                      <option value="International / Global Export">International / Global Export</option>
                    </select>
                  </div>
                </>
              )}

              <Button type="submit">
                {tab === "signin" ? "Sign In to Workspace →" : "Create Enterprise Account →"}
              </Button>

              {/* Corporate SSO */}
              <div style={{ textAlign: "center", marginTop: 8 }}>
                <button
                  type="button"
                  onClick={() => handleDemoLogin(role)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: TOKENS.slate,
                    fontSize: 11.5,
                    fontFamily: "'JetBrains Mono', monospace",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  ⚡ Continue with Corporate SSO (Okta / Azure AD / SAML)
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------- Interactive 3D Three.js CAD Mesh & GD&T Inspector ---------------------------- */

function CADViewerModal({ isOpen, onClose, rfqId = "RFQ-2026-9041", partName = "Stainless Steel 316 Valve Manifold", openTraceability }) {
  const mountRef = useRef(null);
  const [renderMode, setRenderMode] = useState("solid");
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeDatum, setActiveDatum] = useState("A");

  useEffect(() => {
    if (!isOpen || !mountRef.current) return;

    const mount = mountRef.current;
    const width = mount.clientWidth || 540;
    const height = mount.clientHeight || 420;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(4, 3, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const ambLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambLight);

    const dirLight1 = new THREE.DirectionalLight(0xf3e5ab, 2.5);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x4fb3ff, 1.8);
    dirLight2.position.set(-5, -4, -4);
    scene.add(dirLight2);

    const cadGroup = new THREE.Group();
    scene.add(cadGroup);

    const bodyMat = new THREE.MeshStandardMaterial({
      color: renderMode === "wireframe" ? 0x4fb3ff : renderMode === "xray" ? 0x00a896 : 0xd4af37,
      metalness: renderMode === "solid" ? 0.85 : 0.2,
      roughness: renderMode === "solid" ? 0.25 : 0.5,
      wireframe: renderMode === "wireframe",
      transparent: renderMode === "xray",
      opacity: renderMode === "xray" ? 0.45 : 1,
    });

    const mainBody = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 2.2, 32), bodyMat);
    cadGroup.add(mainBody);

    const flange = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 1.7, 0.35, 32), bodyMat);
    flange.position.y = -1.1;
    cadGroup.add(flange);

    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.8, 24), bodyMat);
    neck.position.y = 1.4;
    cadGroup.add(neck);

    const portMat = new THREE.MeshStandardMaterial({
      color: renderMode === "wireframe" ? 0x4fb3ff : 0x1565c0,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: renderMode === "wireframe",
      transparent: renderMode === "xray",
      opacity: renderMode === "xray" ? 0.35 : 1,
    });

    const port1 = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 2.8, 20), portMat);
    port1.rotation.z = Math.PI / 2;
    cadGroup.add(port1);

    const port2 = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 2.8, 20), portMat);
    port2.rotation.x = Math.PI / 2;
    cadGroup.add(port2);

    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI * 2) / 6;
      const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.45, 12), new THREE.MeshBasicMaterial({ color: 0x070e1a }));
      hole.position.set(Math.cos(angle) * 1.45, -1.1, Math.sin(angle) * 1.45);
      cadGroup.add(hole);
    }

    const grid = new THREE.GridHelper(6, 12, 0x1565c0, 0x1b2838);
    grid.position.y = -1.35;
    scene.add(grid);

    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      cadGroup.rotation.y += deltaX * 0.01;
      cadGroup.rotation.x += deltaY * 0.01;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    let animId;
    const animate = () => {
      if (autoRotate && !isDragging) {
        cadGroup.rotation.y += 0.008;
      }
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      domEl.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (mount.contains(domEl)) mount.removeChild(domEl);
    };
  }, [isOpen, renderMode, autoRotate]);

  if (!isOpen) return null;

  const datums = [
    { id: "A", label: "Datum [A] Primary Face", spec: "Flatness 0.005 mm", measured: "0.002 mm (Pass)", status: "COMPLIANT" },
    { id: "B", label: "Datum [B] Valve Bore", spec: "Ø24.000 ±0.005 mm", measured: "24.002 mm (Pass)", status: "COMPLIANT" },
    { id: "C", label: "Datum [C] Flange Circle", spec: "6x Ø8.00 True Pos 0.012 mm", measured: "0.006 mm (Pass)", status: "COMPLIANT" },
    { id: "D", label: "Surface Finish", spec: "Ra 0.4 µm Mirror Grind", measured: "0.32 µm (Pass)", status: "COMPLIANT" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(7, 16, 32, 0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        zIndex: 10000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <div
        style={{
          maxWidth: 960,
          width: "100%",
          maxHeight: "92vh",
          overflowY: "auto",
          background: TOKENS.panelAlt,
          border: `1px solid rgba(212,175,55,0.4)`,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.85)",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #0a1929 0%, #101828 100%)",
            padding: "20px 24px",
            borderBottom: `1px solid ${TOKENS.hair}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.teal, letterSpacing: "0.08em", marginBottom: 4 }}>
              3D CAD MESH & GD&T TOLERANCE INSPECTOR · WEBGL ENGINE
            </div>
            <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 22, margin: 0 }}>
              {rfqId}: {partName}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: `1px solid ${TOKENS.hair}`,
              color: TOKENS.paper,
              fontSize: 18,
              cursor: "pointer",
              width: 32,
              height: 32,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>

        {/* CAD Canvas + Sidebar */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", minHeight: 440 }} className="hero-grid">
          {/* Left Canvas Viewport */}
          <div style={{ position: "relative", background: "#070E1A", display: "flex", flexDirection: "column" }}>
            <div ref={mountRef} style={{ width: "100%", height: 420, cursor: "grab" }} />

            {/* Viewport Control Overlay */}
            <div
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                right: 14,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                pointerEvents: "none",
              }}
            >
              <div style={{ pointerEvents: "auto", display: "flex", gap: 6 }}>
                {[
                  { id: "solid", label: "Solid Metal" },
                  { id: "wireframe", label: "CAD Wireframe" },
                  { id: "xray", label: "X-Ray Volume" },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setRenderMode(m.id)}
                    style={{
                      background: renderMode === m.id ? TOKENS.brass : "rgba(16,24,40,0.85)",
                      color: renderMode === m.id ? TOKENS.ink : TOKENS.paper,
                      border: `1px solid ${TOKENS.hair}`,
                      borderRadius: 4,
                      padding: "5px 10px",
                      fontSize: 10.5,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: renderMode === m.id ? 700 : 400,
                      cursor: "pointer",
                    }}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              <div style={{ pointerEvents: "auto" }}>
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  style={{
                    background: autoRotate ? "rgba(0,168,150,0.2)" : "rgba(16,24,40,0.85)",
                    color: autoRotate ? TOKENS.teal : TOKENS.slate,
                    border: `1px solid ${autoRotate ? TOKENS.teal : TOKENS.hair}`,
                    borderRadius: 4,
                    padding: "5px 10px",
                    fontSize: 10.5,
                    fontFamily: "'JetBrains Mono', monospace",
                    cursor: "pointer",
                  }}
                >
                  {autoRotate ? "● Rotate: ON" : "○ Rotate: PAUSED"}
                </button>
              </div>
            </div>

            <div style={{ padding: "8px 16px", background: "rgba(16,24,40,0.9)", borderTop: `1px solid ${TOKENS.hair}`, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate }}>
              <span>🖱 Drag to rotate · Scroll to zoom</span>
              <span style={{ color: TOKENS.teal }}>● 3D Mesh Integrity: 100% Manifold</span>
            </div>
          </div>

          {/* Right Inspection & Telemetry Panel */}
          <div style={{ padding: "20px 24px", borderLeft: `1px solid ${TOKENS.hair}`, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.brass, marginBottom: 8, fontWeight: 700 }}>
                GD&T TOLERANCE CALLOUTS (CMM VERIFIED)
              </div>
              <p style={{ color: TOKENS.slate, fontSize: 13, lineHeight: 1.5, margin: "0 0 16px" }}>
                128 discrete coordinate measurement points verified against ASME Y14.5M standard.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                {datums.map((d) => {
                  const isSelected = activeDatum === d.id;
                  return (
                    <div
                      key={d.id}
                      onClick={() => setActiveDatum(d.id)}
                      style={{
                        background: isSelected ? "rgba(21,101,192,0.15)" : "rgba(255,255,255,0.025)",
                        border: `1px solid ${isSelected ? TOKENS.blue : TOKENS.hair}`,
                        borderRadius: 6,
                        padding: "10px 12px",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: TOKENS.paper }}>
                          {d.label}
                        </span>
                        <span style={{ background: "rgba(0,168,150,0.15)", color: TOKENS.teal, padding: "2px 6px", borderRadius: 3, fontSize: 9.5, fontFamily: "'JetBrains Mono', monospace" }}>
                          {d.status}
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 11.5, color: TOKENS.slate, fontFamily: "'JetBrains Mono', monospace" }}>
                        <span>Target: {d.spec}</span>
                        <span style={{ color: TOKENS.teal }}>Actual: {d.measured}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Inspection Box */}
              <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "12px", marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate }}>MATERIAL TEST REPORT (MTR)</div>
                  <button
                    onClick={() => openTraceability?.(rfqId, "SS 316L Stainless Steel")}
                    style={{
                      background: "rgba(0,168,150,0.15)",
                      border: `1px solid ${TOKENS.teal}`,
                      color: TOKENS.teal,
                      borderRadius: 4,
                      padding: "2px 6px",
                      fontSize: 9.5,
                      fontFamily: "'JetBrains Mono', monospace",
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                  >
                    Inspect Spectroscopy →
                  </button>
                </div>
                <div style={{ fontSize: 12.5, color: TOKENS.paper, marginTop: 4, fontWeight: 600 }}>SS 316L Stainless (Marine Grade)</div>
                <div style={{ fontSize: 11, color: TOKENS.teal, fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>Heat #8942A · Tensile 580 MPa · Hardness HRB 79</div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button
                onClick={() => alert(`Simulating STEP CAD file download (valves_assembly_v3.step · 14.2 MB)...`)}
                style={{
                  background: TOKENS.brass,
                  color: TOKENS.ink,
                  border: "none",
                  borderRadius: 6,
                  padding: "10px 16px",
                  fontSize: 12,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                📥 Download .STEP 3D CAD File (14.2 MB) →
              </button>
              <button
                onClick={() => alert(`Generating Certified CMM GD&T Dimensional Report for ${rfqId}...`)}
                style={{
                  background: "transparent",
                  border: `1px solid ${TOKENS.hair}`,
                  color: TOKENS.paper,
                  borderRadius: 6,
                  padding: "8px 16px",
                  fontSize: 12,
                  fontFamily: "'JetBrains Mono', monospace",
                  cursor: "pointer",
                }}
              >
                📄 Export CMM Inspection Report (PDF)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- 4-Stage Supplier Onboarding & Shop Floor Verification Wizard ---------------------------- */

function SupplierOnboardingModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    companyName: "",
    hub: "Chennai Machining Corridor (Tamil Nadu)",
    yearEstablished: "2014",
    floorArea: "25,000 sq. ft.",
    machines: ["5-Axis CNC Milling", "CNC Turning Lathes"],
    certifications: ["ISO 9001:2015", "AS9100D"],
    tolerance: "±0.005 mm",
    email: "",
    phone: "",
  });
  const [verifiedBadge, setVerifiedBadge] = useState("");

  if (!isOpen) return null;

  const machineOptions = [
    "5-Axis CNC Milling",
    "CNC Turning Lathes",
    "Wire EDM Cutting",
    "Sheet Metal Laser & Bending",
    "Surface & Cylindrical Grinding",
    "SMT Pick-and-Place Assembly",
    "Cleanroom ISO Class 7",
    "Plastic Injection Tooling (80T - 450T)",
  ];

  const certOptions = [
    "ISO 9001:2015 (Quality Management)",
    "AS9100D (Aerospace & Defence)",
    "IATF 16949 (Automotive Standard)",
    "ISO 13485 (Medical Devices)",
    "ISO 14001 (Environmental Safety)",
    "ITAR Registered Compliance",
  ];

  const toggleItem = (listName, val) => {
    const list = form[listName];
    if (list.includes(val)) {
      setForm({ ...form, [listName]: list.filter((i) => i !== val) });
    } else {
      setForm({ ...form, [listName]: [...list, val] });
    }
  };

  const handleFinish = (e) => {
    e.preventDefault();
    const certNum = `VMFG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setVerifiedBadge(certNum);
    trackEvent("supplier_plant_verified", { company: form.companyName, certNum });
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(7, 16, 32, 0.94)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <div
        style={{
          maxWidth: 680,
          width: "100%",
          maxHeight: "92vh",
          overflowY: "auto",
          background: TOKENS.panelAlt,
          border: `1px solid rgba(212,175,55,0.4)`,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.85)",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #0a1929 0%, #101828 100%)",
            padding: "24px 28px",
            borderBottom: `1px solid ${TOKENS.hair}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.teal, letterSpacing: "0.08em", marginBottom: 4 }}>
              SUPPLIER ONBOARDING & SHOP FLOOR VERIFICATION
            </div>
            <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 22, margin: 0 }}>
              {verifiedBadge ? "Plant Verified & Onboarded" : "4-Stage Factory Verification Wizard"}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: `1px solid ${TOKENS.hair}`,
              color: TOKENS.paper,
              fontSize: 18,
              cursor: "pointer",
              width: 32,
              height: 32,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>

        {verifiedBadge ? (
          /* Confirmation & Certificate Preview */
          <div style={{ padding: "32px 28px", textAlign: "center" }}>
            <div style={{ width: 68, height: 68, borderRadius: "50%", background: "rgba(0,168,150,0.15)", border: `2px solid ${TOKENS.teal}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: TOKENS.teal, fontSize: 32 }}>
              ✓
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: TOKENS.brass, marginBottom: 6 }}>
              OFFICIAL VERIFICATION CERTIFICATE ISSUED
            </div>
            <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 24, margin: "0 0 10px" }}>
              {form.companyName || "Your Manufacturing Plant"}
            </h3>
            <div style={{ display: "inline-block", background: "rgba(212,175,55,0.12)", border: `1px solid ${TOKENS.brass}`, borderRadius: 6, padding: "8px 18px", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: TOKENS.brassBright, marginBottom: 20 }}>
              ★ {verifiedBadge} · AS9100D & ISO VERIFIED
            </div>

            <p style={{ color: TOKENS.slate, fontSize: 14.5, lineHeight: 1.6, maxWidth: 520, margin: "0 auto 24px" }}>
              Your factory capabilities and certifications have been authenticated. Your plant profile is now live in the Abhimanyu Verified Directory and actively matched against inbound enterprise RFQs.
            </p>

            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button
                onClick={() => alert(`Simulating PDF Certificate Download for Verified Supplier ${verifiedBadge}...`)}
                style={{
                  background: TOKENS.teal,
                  color: "#0B1F3A",
                  border: "none",
                  borderRadius: 6,
                  padding: "10px 18px",
                  fontSize: 12,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                📄 Download Verification Certificate (PDF) →
              </button>
              <Button onClick={onClose}>Done</Button>
            </div>
          </div>
        ) : (
          /* Wizard Stepper Body */
          <div style={{ padding: "24px 28px" }}>
            {/* Step Bar */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24, borderBottom: `1px solid ${TOKENS.hair}`, paddingBottom: 14 }}>
              {[
                { s: 1, label: "Plant Details" },
                { s: 2, label: "Machinery" },
                { s: 3, label: "Quality & Certs" },
                { s: 4, label: "Contact & Review" },
              ].map((st) => (
                <div key={st.s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: step > st.s ? TOKENS.teal : step === st.s ? TOKENS.brass : "rgba(255,255,255,0.06)",
                      color: step >= st.s ? TOKENS.ink : TOKENS.slate,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: "bold",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {step > st.s ? "✓" : st.s}
                  </div>
                  <span style={{ fontSize: 11.5, color: step === st.s ? TOKENS.paper : TOKENS.slate, fontFamily: "'JetBrains Mono', monospace" }}>
                    {st.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Step 1: Plant Identity */}
            {step === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: 18, color: TOKENS.paper, margin: 0 }}>
                  Step 1: Facility Identity & Industrial Corridor
                </h4>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate, marginBottom: 4 }}>
                    MANUFACTURING PLANT / COMPANY NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Precision CNC Works Pvt. Ltd."
                    value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "10px 12px", color: TOKENS.paper, fontSize: 13 }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate, marginBottom: 4 }}>
                    PRIMARY INDUSTRIAL HUB / CORRIDOR
                  </label>
                  <select
                    value={form.hub}
                    onChange={(e) => setForm({ ...form, hub: e.target.value })}
                    style={{ width: "100%", background: "#101828", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "10px 12px", color: TOKENS.paper, fontSize: 13 }}
                  >
                    <option value="Chennai Machining Corridor (Tamil Nadu)">Chennai Machining Corridor (Tamil Nadu)</option>
                    <option value="Hyderabad Aerospace & Defence Hub (Telangana)">Hyderabad Aerospace & Defence Hub (Telangana)</option>
                    <option value="Bengaluru Tech & Precision Machining (Karnataka)">Bengaluru Tech & Precision Machining (Karnataka)</option>
                    <option value="Pune & Mumbai OEM Auto Belt (Maharashtra)">Pune & Mumbai OEM Auto Belt (Maharashtra)</option>
                    <option value="Coimbatore Precision Foundry (Tamil Nadu)">Coimbatore Precision Foundry (Tamil Nadu)</option>
                    <option value="Delhi NCR Industrial Sourcing Hub">Delhi NCR Industrial Sourcing Hub</option>
                  </select>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate, marginBottom: 4 }}>
                      YEAR ESTABLISHED
                    </label>
                    <input
                      type="text"
                      value={form.yearEstablished}
                      onChange={(e) => setForm({ ...form, yearEstablished: e.target.value })}
                      style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "10px 12px", color: TOKENS.paper, fontSize: 13 }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate, marginBottom: 4 }}>
                      SHOP FLOOR AREA
                    </label>
                    <input
                      type="text"
                      value={form.floorArea}
                      onChange={(e) => setForm({ ...form, floorArea: e.target.value })}
                      style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "10px 12px", color: TOKENS.paper, fontSize: 13 }}
                    />
                  </div>
                </div>
                <div style={{ textAlign: "right", marginTop: 10 }}>
                  <Button onClick={() => setStep(2)}>Next: Machinery & Capabilities →</Button>
                </div>
              </div>
            )}

            {/* Step 2: Machinery */}
            {step === 2 && (
              <div>
                <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: 18, color: TOKENS.paper, margin: "0 0 8px" }}>
                  Step 2: Machine Shop Capabilities
                </h4>
                <p style={{ color: TOKENS.slate, fontSize: 13, marginBottom: 16 }}>
                  Select all active equipment and process capabilities deployed on your shop floor.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
                  {machineOptions.map((opt) => {
                    const active = form.machines.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleItem("machines", opt)}
                        style={{
                          background: active ? "rgba(0,168,150,0.15)" : "rgba(255,255,255,0.03)",
                          border: `1px solid ${active ? TOKENS.teal : TOKENS.hair}`,
                          color: active ? TOKENS.teal : TOKENS.paper,
                          padding: "10px 12px",
                          borderRadius: 6,
                          fontSize: 12,
                          fontFamily: "'JetBrains Mono', monospace",
                          textAlign: "left",
                          cursor: "pointer",
                        }}
                      >
                        {active ? "✓ " : "○ "} {opt}
                      </button>
                    );
                  })}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Button variant="ghost" onClick={() => setStep(1)}>← Back</Button>
                  <Button onClick={() => setStep(3)}>Next: Quality & Certs →</Button>
                </div>
              </div>
            )}

            {/* Step 3: Certifications */}
            {step === 3 && (
              <div>
                <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: 18, color: TOKENS.paper, margin: "0 0 8px" }}>
                  Step 3: Quality Standards & Audited Tolerances
                </h4>
                <p style={{ color: TOKENS.slate, fontSize: 13, marginBottom: 16 }}>
                  Select accredited certifications held by your facility.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                  {certOptions.map((opt) => {
                    const active = form.certifications.some((c) => opt.startsWith(c));
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleItem("certifications", opt.split(" ")[0])}
                        style={{
                          background: active ? "rgba(212,175,55,0.12)" : "rgba(255,255,255,0.03)",
                          border: `1px solid ${active ? TOKENS.brass : TOKENS.hair}`,
                          color: active ? TOKENS.brass : TOKENS.paper,
                          padding: "10px 14px",
                          borderRadius: 6,
                          fontSize: 12.5,
                          fontFamily: "'JetBrains Mono', monospace",
                          textAlign: "left",
                          cursor: "pointer",
                        }}
                      >
                        {active ? "✓ " : "○ "} {opt}
                      </button>
                    );
                  })}
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate, marginBottom: 4 }}>
                    VERIFIED CMM REPEATABILITY TOLERANCE
                  </label>
                  <select
                    value={form.tolerance}
                    onChange={(e) => setForm({ ...form, tolerance: e.target.value })}
                    style={{ width: "100%", background: "#101828", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "10px 12px", color: TOKENS.paper, fontSize: 13 }}
                  >
                    <option value="±0.002 mm (Ultra-Precision Aerospace)">±0.002 mm (Ultra-Precision Aerospace)</option>
                    <option value="±0.005 mm (High-Precision CNC)">±0.005 mm (High-Precision CNC)</option>
                    <option value="±0.010 mm (Standard Mechanical)">±0.010 mm (Standard Mechanical)</option>
                    <option value="±0.050 mm (Heavy Fabrication)">±0.050 mm (Heavy Fabrication)</option>
                  </select>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Button variant="ghost" onClick={() => setStep(2)}>← Back</Button>
                  <Button onClick={() => setStep(4)}>Next: Contact & Review →</Button>
                </div>
              </div>
            )}

            {/* Step 4: Contact & Review */}
            {step === 4 && (
              <form onSubmit={handleFinish} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: 18, color: TOKENS.paper, margin: 0 }}>
                  Step 4: Contact & Verification Review
                </h4>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate, marginBottom: 4 }}>
                    OFFICIAL WORK EMAIL (FOR RFQ BROADCASTS)
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="tooling@precisioncnc.in"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "10px 12px", color: TOKENS.paper, fontSize: 13 }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate, marginBottom: 4 }}>
                    PLANT TELEPHONE / WHATSAPP NUMBER
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98400 12345"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "10px 12px", color: TOKENS.paper, fontSize: 13 }}
                  />
                </div>

                <div style={{ background: "rgba(255,255,255,0.025)", border: `1px solid ${TOKENS.hair}`, padding: 14, borderRadius: 6, fontSize: 12 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", color: TOKENS.brass, marginBottom: 4 }}>
                    PLANT SUMMARY TO BE VERIFIED:
                  </div>
                  <div style={{ color: TOKENS.paper }}>
                    <strong>{form.companyName || "Plant"}</strong> · {form.hub} · {form.floorArea}
                  </div>
                  <div style={{ color: TOKENS.slate, marginTop: 4 }}>
                    Capabilities: {form.machines.join(", ")}
                  </div>
                  <div style={{ color: TOKENS.teal, marginTop: 2 }}>
                    Certs: {form.certifications.join(", ")} · Tolerance: {form.tolerance}
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                  <Button variant="ghost" onClick={() => setStep(3)}>← Back</Button>
                  <Button type="submit">Submit & Issue Verification Seal →</Button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------- Industrial Escrow & Milestone Settlement Ledger Modal ---------------------------- */

function EscrowSettlementModal({
  isOpen,
  onClose,
  poNumber = "PO-2026-9041",
  supplier = "Apex Precision Engineering Ltd.",
  totalInr = 485000,
  currency = "INR",
}) {
  const [milestones, setMilestones] = useState([
    {
      id: 1,
      step: "01",
      title: "DFM Sign-Off & Raw Material Lock",
      pct: 20,
      amount: Math.round(totalInr * 0.2),
      status: "released",
      desc: "Raw material ingot allocated and certified with MTR spectroscopic chemical assay.",
      date: "24 Sep 2026, 14:32 IST",
      txHash: "0x78ab4...99c1",
      proof: "MTR-316L-HT8942A.pdf",
    },
    {
      id: 2,
      step: "02",
      title: "First Article Inspection (FAI) & CMM Approval",
      pct: 30,
      amount: Math.round(totalInr * 0.3),
      status: "ready",
      desc: "First 5 prototype units measured on Zeiss CMM. All ASME Y14.5M datums pass within ±0.005mm.",
      date: "Pending Buyer 2FA Disbursal Authorization",
      txHash: null,
      proof: "CMM-FAI-DEVIATION-PASS.pdf",
    },
    {
      id: 3,
      step: "03",
      title: "Batch Production & Pre-Shipment Audit",
      pct: 40,
      amount: Math.round(totalInr * 0.4),
      status: "pending",
      desc: "Full production run of 5,000 units on 5-axis CNC machining centers. Shop floor OEE 94.8%.",
      date: "Scheduled: Est. 7-10 Days",
      txHash: null,
      proof: "Shopfloor-Batch-OEE-94.8.log",
    },
    {
      id: 4,
      step: "04",
      title: "Goods Receipt Note (GRN) & Plant Clearance",
      pct: 10,
      amount: Math.round(totalInr * 0.1),
      status: "locked",
      desc: "Destination incoming QC at Bharat Aerospace dock. Final 10% retention warranty release.",
      date: "Scheduled: Est. 14 Days",
      txHash: null,
      proof: "GRN-Destination-Dock.pdf",
    },
  ]);

  const [activeTab, setActiveTab] = useState("milestones");
  const [otpOpen, setOtpOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [otpCode, setOtpCode] = useState("");
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [releaseSuccess, setReleaseSuccess] = useState(null);

  if (!isOpen) return null;

  const totalDisbursed = milestones
    .filter((m) => m.status === "released")
    .reduce((acc, m) => acc + m.amount, 0);

  const lockedBalance = totalInr - totalDisbursed;

  const handleOpenOtp = (m) => {
    setSelectedMilestone(m);
    setOtpCode("");
    setReleaseSuccess(null);
    setOtpOpen(true);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 4) return;
    setVerifyingOtp(true);

    setTimeout(() => {
      setVerifyingOtp(false);
      setMilestones((prev) =>
        prev.map((m) =>
          m.id === selectedMilestone.id
            ? {
                ...m,
                status: "released",
                date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
                txHash: "0x" + Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join("") + "...escrow",
              }
            : m
        )
      );
      setReleaseSuccess(
        `Disbursement of ${formatPrice(selectedMilestone.amount, currency)} successfully released from Vault to ${supplier}. Clearance Ref: #ICICI-ESC-${Math.floor(100000 + Math.random() * 900000)}`
      );
      setTimeout(() => {
        setOtpOpen(false);
      }, 2000);
    }, 1100);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(7, 16, 32, 0.92)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        zIndex: 10000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 820,
          width: "100%",
          maxHeight: "90vh",
          background: TOKENS.panelAlt,
          border: `1px solid rgba(212,175,55,0.4)`,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 28px 70px rgba(0,0,0,0.85)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{ padding: "18px 24px", borderBottom: `1px solid ${TOKENS.hair}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 22 }}>🔐</span>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: TOKENS.paper, margin: 0 }}>
                  Industrial Escrow Vault & Settlement Ledger
                </h3>
                <span style={{ background: "rgba(0,168,150,0.18)", color: TOKENS.teal, padding: "2px 8px", borderRadius: 4, fontSize: 10, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
                  SBI/ICICI API ACTIVE
                </span>
              </div>
              <div style={{ fontSize: 11.5, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate, marginTop: 2 }}>
                Order #{poNumber} · Beneficiary: {supplier}
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: "none", color: TOKENS.slate, fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>

        {/* Telemetry Metrics Cards */}
        <div style={{ padding: "16px 24px", background: "rgba(0,0,0,0.25)", borderBottom: `1px solid ${TOKENS.hair}`, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
          <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "12px 14px" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.slate }}>TOTAL CONTRACT VALUE</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: TOKENS.brassBright, marginTop: 4 }}>
              {formatPrice(totalInr, currency)}
            </div>
          </div>
          <div style={{ background: "rgba(0,168,150,0.05)", border: `1px solid rgba(0,168,150,0.3)`, borderRadius: 6, padding: "12px 14px" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.teal }}>DISBURSED TO PLANT</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: TOKENS.teal, marginTop: 4 }}>
              {formatPrice(totalDisbursed, currency)}
            </div>
          </div>
          <div style={{ background: "rgba(21,101,192,0.08)", border: `1px solid rgba(21,101,192,0.35)`, borderRadius: 6, padding: "12px 14px" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#60A5FA" }}>LOCKED IN ESCROW</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: "#60A5FA", marginTop: 4 }}>
              {formatPrice(lockedBalance, currency)}
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "12px 14px" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.slate }}>SETTLEMENT CLAUSE</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: TOKENS.paper, marginTop: 6 }}>
              Reverse Charge: No · HSN 8481
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: "flex", borderBottom: `1px solid ${TOKENS.hair}`, padding: "0 24px", background: "rgba(255,255,255,0.01)" }}>
          {[
            { id: "milestones", label: "Stage-Gate Milestones (4)" },
            { id: "tax", label: "GST & Tax Invoice Breakdown" },
            { id: "audit", label: "Cryptographic Audit Ledger" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: "transparent",
                border: "none",
                borderBottom: `2px solid ${activeTab === tab.id ? TOKENS.brass : "transparent"}`,
                color: activeTab === tab.id ? TOKENS.brass : TOKENS.slate,
                padding: "12px 16px",
                cursor: "pointer",
                fontSize: 12.5,
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: activeTab === tab.id ? 700 : 400,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Content Body */}
        <div style={{ overflowY: "auto", padding: "20px 24px", flex: 1 }}>
          {activeTab === "milestones" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {milestones.map((m) => {
                const isReleased = m.status === "released";
                const isReady = m.status === "ready";
                return (
                  <div
                    key={m.id}
                    style={{
                      background: isReleased ? "rgba(0,168,150,0.06)" : isReady ? "rgba(212,175,55,0.08)" : "rgba(255,255,255,0.02)",
                      border: `1px solid ${isReleased ? TOKENS.teal : isReady ? TOKENS.brass : TOKENS.hair}`,
                      borderRadius: 8,
                      padding: "16px 20px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 16,
                    }}
                  >
                    <div style={{ flex: "1 1 340px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                        <span style={{
                          background: isReleased ? TOKENS.teal : isReady ? TOKENS.brass : "rgba(255,255,255,0.08)",
                          color: isReleased || isReady ? TOKENS.ink : TOKENS.paper,
                          width: 24,
                          height: 24,
                          borderRadius: 4,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 11,
                          fontWeight: "bold",
                          fontFamily: "'JetBrains Mono', monospace"
                        }}>
                          {isReleased ? "✓" : m.step}
                        </span>
                        <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: 16, color: TOKENS.paper, margin: 0 }}>
                          {m.title}
                        </h4>
                        <span style={{
                          background: isReleased ? "rgba(0,168,150,0.2)" : isReady ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.05)",
                          color: isReleased ? TOKENS.teal : isReady ? TOKENS.brass : TOKENS.slate,
                          fontSize: 10.5,
                          fontFamily: "'JetBrains Mono', monospace",
                          padding: "2px 8px",
                          borderRadius: 3,
                          fontWeight: 700,
                        }}>
                          {isReleased ? "DISBURSED ✓" : isReady ? "READY FOR BUYER 2FA" : "LOCKED"}
                        </span>
                      </div>
                      <p style={{ margin: "4px 0 6px", color: TOKENS.slate, fontSize: 12.5, lineHeight: 1.4 }}>
                        {m.desc}
                      </p>
                      <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate, display: "flex", gap: 12, flexWrap: "wrap" }}>
                        <span>⏱ {m.date}</span>
                        {m.txHash && <span style={{ color: TOKENS.teal }}>Hash: {m.txHash}</span>}
                        <span>Proof: {m.proof}</span>
                      </div>
                    </div>

                    <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: TOKENS.paper, fontWeight: 700 }}>
                        {formatPrice(m.amount, currency)} <span style={{ fontSize: 12, color: TOKENS.slate, fontFamily: "'JetBrains Mono', monospace" }}>({m.pct}%)</span>
                      </div>
                      {isReleased ? (
                        <span style={{ color: TOKENS.teal, fontSize: 11.5, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
                          ● Funds Cleared
                        </span>
                      ) : isReady ? (
                        <button
                          onClick={() => handleOpenOtp(m)}
                          style={{
                            background: `linear-gradient(135deg, ${TOKENS.brass}, #F59E0B)`,
                            color: "#080E1A",
                            border: "none",
                            borderRadius: 6,
                            padding: "8px 16px",
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 11.5,
                            fontWeight: 800,
                            cursor: "pointer",
                            boxShadow: "0 4px 12px rgba(212,175,55,0.3)",
                          }}
                        >
                          🔓 Authorize 30% Disbursal →
                        </button>
                      ) : (
                        <span style={{ color: TOKENS.slate, fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>
                          🔒 Inactive Milestone
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "tax" && (
            <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: 17, color: TOKENS.paper, margin: 0 }}>
                  Official B2B Tax Invoice Spec (GST Act Compliant)
                </h4>
                <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.brass }}>
                  INVOICE #TI-2026-8812
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20, fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>
                <div>
                  <div style={{ color: TOKENS.slate }}>BUYER GSTIN:</div>
                  <div style={{ color: TOKENS.paper, fontWeight: 600 }}>36AAACB1234D1Z5 (Bharat Aerospace Dynamics)</div>
                  <div style={{ color: TOKENS.slate, marginTop: 6 }}>STATE / CORRIDOR:</div>
                  <div style={{ color: TOKENS.paper }}>Telangana (36)</div>
                </div>
                <div>
                  <div style={{ color: TOKENS.slate }}>SUPPLIER GSTIN:</div>
                  <div style={{ color: TOKENS.paper, fontWeight: 600 }}>33AAACP9876E1Z2 (Apex Precision Ltd.)</div>
                  <div style={{ color: TOKENS.slate, marginTop: 6 }}>STATE / CORRIDOR:</div>
                  <div style={{ color: TOKENS.paper }}>Tamil Nadu (33)</div>
                </div>
              </div>

              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${TOKENS.hair}`, color: TOKENS.slate, textAlign: "left" }}>
                    <th style={{ padding: "8px 4px" }}>DESCRIPTION</th>
                    <th style={{ padding: "8px 4px" }}>HSN</th>
                    <th style={{ padding: "8px 4px" }}>BASE VALUE</th>
                    <th style={{ padding: "8px 4px" }}>IGST (18%)</th>
                    <th style={{ padding: "8px 4px", textAlign: "right" }}>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: `1px solid ${TOKENS.hair}`, color: TOKENS.paper }}>
                    <td style={{ padding: "10px 4px" }}>SS316 Multi-Port Valve Manifold Batch</td>
                    <td style={{ padding: "10px 4px" }}>8481</td>
                    <td style={{ padding: "10px 4px" }}>{formatPrice(Math.round(totalInr / 1.18), currency)}</td>
                    <td style={{ padding: "10px 4px" }}>{formatPrice(Math.round(totalInr - totalInr / 1.18), currency)}</td>
                    <td style={{ padding: "10px 4px", textAlign: "right", fontWeight: 700, color: TOKENS.brassBright }}>
                      {formatPrice(totalInr, currency)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "audit" && (
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate, marginBottom: 12 }}>
                IMMUTABLE MULTI-SIG ESCROW LOGS (VERIFIED BY STATE BANK ESCROW GATEWAY)
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { time: "24 Sep 2026 10:00:12 IST", event: "Smart Contract Escrow Vault Initialized", actor: "SBI / ICICI Gateway", hash: "0x12d4a...88ff" },
                  { time: "24 Sep 2026 10:14:50 IST", event: "100% Contract Capital Deposited into Multi-Sig Vault", actor: "Bharat Aerospace Dynamics", hash: "0x33e8b...12aa" },
                  { time: "24 Sep 2026 14:32:01 IST", event: "Milestone 1 (20% Advance) Released to Apex Precision", actor: "Dr. K. S. Rao (Auth Token #8849)", hash: "0x78ab4...99c1" },
                  { time: "26 Sep 2026 11:20:44 IST", event: "Zeiss CMM FAI Telemetry Deviation Log Ingested", actor: "Apex Precision Quality Lab", hash: "0x90f1c...4432" },
                ].map((log, idx) => (
                  <div key={idx} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "10px 14px", fontSize: 11.5, fontFamily: "'JetBrains Mono', monospace" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", color: TOKENS.slate }}>
                      <span>{log.time}</span>
                      <span style={{ color: TOKENS.teal }}>{log.actor}</span>
                    </div>
                    <div style={{ color: TOKENS.paper, margin: "4px 0", fontWeight: 600 }}>{log.event}</div>
                    <div style={{ color: TOKENS.brass, fontSize: 10.5 }}>SHA-256 Hash: {log.hash}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div style={{ padding: "16px 24px", borderTop: `1px solid ${TOKENS.hair}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)" }}>
          <button
            onClick={() => {
              trackEvent("export_escrow_ledger");
              alert(`Exporting cryptographic Escrow Settlement Ledger for ${poNumber} (JSON / CSV format)...`);
            }}
            style={{
              background: "transparent",
              border: `1px solid ${TOKENS.hair}`,
              color: TOKENS.paper,
              borderRadius: 4,
              padding: "7px 12px",
              fontSize: 11.5,
              fontFamily: "'JetBrains Mono', monospace",
              cursor: "pointer",
            }}
          >
            📥 Export Escrow Audit Trail (CSV)
          </button>
          <Button onClick={onClose}>Close Ledger</Button>
        </div>

        {/* 2FA OTP Prompt Submodal */}
        {otpOpen && (
          <div
            onClick={() => setOtpOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(8px)",
              zIndex: 11000,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 16,
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: 440,
                width: "100%",
                background: TOKENS.panelAlt,
                border: `1px solid ${TOKENS.brass}`,
                borderRadius: 10,
                padding: 24,
                boxShadow: "0 20px 50px rgba(0,0,0,0.9)",
              }}
            >
              <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: 18, color: TOKENS.paper, margin: "0 0 8px" }}>
                Authorize Milestone Disbursal
              </h4>
              <p style={{ color: TOKENS.slate, fontSize: 13, lineHeight: 1.5, margin: "0 0 16px" }}>
                Authorizing <strong>{formatPrice(selectedMilestone?.amount, currency)}</strong> to <strong>{supplier}</strong> for {selectedMilestone?.title}.
              </p>

              {releaseSuccess ? (
                <div style={{ background: "rgba(0,168,150,0.15)", border: `1px solid ${TOKENS.teal}`, borderRadius: 6, padding: 14, color: TOKENS.teal, fontSize: 12.5, fontFamily: "'JetBrains Mono', monospace" }}>
                  ✓ {releaseSuccess}
                </div>
              ) : (
                <form onSubmit={handleVerifyOtp} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ background: "rgba(212,175,55,0.08)", border: `1px solid rgba(212,175,55,0.25)`, padding: 10, borderRadius: 6, fontSize: 11.5, color: TOKENS.brass, fontFamily: "'JetBrains Mono', monospace" }}>
                    🔒 2FA Token sent to Procurement Lead (+91 98*** 4210).
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate, marginBottom: 4 }}>
                      ENTER 6-DIGIT CORPORATE OTP
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="e.g. 849201"
                      style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.05)",
                        border: `1px solid ${TOKENS.hair}`,
                        borderRadius: 6,
                        padding: "10px 12px",
                        color: TOKENS.paper,
                        fontSize: 16,
                        fontFamily: "'JetBrains Mono', monospace",
                        letterSpacing: "0.2em",
                        textAlign: "center",
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      type="button"
                      onClick={() => setOtpCode("849201")}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: TOKENS.teal,
                        fontSize: 11,
                        fontFamily: "'JetBrains Mono', monospace",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      ⚡ Use Test OTP: 849201
                    </button>
                  </div>
                  <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                    <Button variant="ghost" type="button" onClick={() => setOtpOpen(false)}>Cancel</Button>
                    <Button type="submit" disabled={verifyingOtp}>
                      {verifyingOtp ? "Verifying with Gateway..." : "Confirm & Release Funds →"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------- AS9100D / ISO 13485 Material Traceability & MTR Inspector Modal ---------------------------- */

function TraceabilityModal({
  isOpen,
  onClose,
  rfqId = "RFQ-2026-9041",
  material = "SS 316L Stainless Steel",
  heatNumber = "HT-316L-98421",
}) {
  const [activeTab, setActiveTab] = useState("chem");
  const [copiedHash, setCopiedHash] = useState(false);

  if (!isOpen) return null;

  const cryptoHash = "SHA256: 7f8a9e4b112c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789";

  const chemElements = [
    { element: "Carbon (C)", target: "≤ 0.030%", measured: "0.022%", margin: 73, status: "PASS ✓" },
    { element: "Chromium (Cr)", target: "16.00 - 18.00%", measured: "17.48%", margin: 87, status: "PASS ✓" },
    { element: "Nickel (Ni)", target: "10.00 - 14.00%", measured: "12.24%", margin: 56, status: "PASS ✓" },
    { element: "Molybdenum (Mo)", target: "2.00 - 3.00%", measured: "2.45%", margin: 45, status: "PASS ✓" },
    { element: "Manganese (Mn)", target: "≤ 2.00%", measured: "1.62%", margin: 81, status: "PASS ✓" },
    { element: "Silicon (Si)", target: "≤ 1.00%", measured: "0.48%", margin: 48, status: "PASS ✓" },
    { element: "Phosphorus (P)", target: "≤ 0.045%", measured: "0.028%", margin: 62, status: "PASS ✓" },
    { element: "Sulfur (S)", target: "≤ 0.030%", measured: "0.012%", margin: 40, status: "PASS ✓" },
    { element: "Nitrogen (N)", target: "≤ 0.100%", measured: "0.045%", margin: 45, status: "PASS ✓" },
    { element: "Iron (Fe)", target: "Balance", measured: "65.62%", margin: 100, status: "PASS ✓" },
  ];

  const mechProperties = [
    { prop: "Yield Strength (Rp 0.2%)", spec: "≥ 205 MPa", measured: "318 MPa", rating: "+55.1% safety margin" },
    { prop: "Tensile Strength (Rm)", spec: "≥ 515 MPa", measured: "628 MPa", rating: "+21.9% safety margin" },
    { prop: "Elongation (A5)", spec: "≥ 30.0%", measured: "48.5%", rating: "High Ductility Pass" },
    { prop: "Reduction of Area (Z)", spec: "≥ 50.0%", measured: "68.2%", rating: "Pass" },
    { prop: "Hardness (Rockwell B)", spec: "≤ 95 HRB", measured: "81 HRB", rating: "Pass" },
    { prop: "Charpy V-Notch Impact (-196°C)", spec: "≥ 60 J", measured: "114 J", rating: "Aerospace Cryo Certified" },
  ];

  const ndtTests = [
    { method: "Ultrasonic Testing (UT)", standard: "AMS-STD-2154 Class A", result: "No internal voids, zero inclusions detected" },
    { method: "Liquid Penetrant (LPI)", standard: "ASTM E1417 Level 4 Ultra-Sensitive", result: "Zero linear or rounded indications" },
    { method: "Intergranular Corrosion", standard: "ASTM A262 Practice E", result: "No sensitization or grain boundary carbide precipitation" },
    { method: "Ferrite Number (DeLong)", standard: "AWS A4.2M / ISO 8249", result: "4.8 FN (Optimal corrosion & weldability balance)" },
  ];

  const copyHash = () => {
    navigator.clipboard?.writeText(cryptoHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(7, 16, 32, 0.92)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        zIndex: 10000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 820,
          width: "100%",
          maxHeight: "90vh",
          background: TOKENS.panelAlt,
          border: `1px solid rgba(0,168,150,0.45)`,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 28px 70px rgba(0,0,0,0.85)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{ padding: "18px 24px", borderBottom: `1px solid ${TOKENS.hair}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 22 }}>🔬</span>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: TOKENS.paper, margin: 0 }}>
                  Raw Material Test Report (MTR) & Traceability
                </h3>
                <span style={{ background: "rgba(0,168,150,0.18)", color: TOKENS.teal, padding: "2px 8px", borderRadius: 4, fontSize: 10, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
                  AS9100D / EN 10204 3.1
                </span>
              </div>
              <div style={{ fontSize: 11.5, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate, marginTop: 2 }}>
                Heat #{heatNumber} · Specification: {material}
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: "none", color: TOKENS.slate, fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>

        {/* Mill & Ingot Overview Strip */}
        <div style={{ padding: "14px 24px", background: "rgba(0,0,0,0.25)", borderBottom: `1px solid ${TOKENS.hair}`, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.slate }}>MELT MILL SOURCE</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: TOKENS.paper, fontWeight: 600, marginTop: 2 }}>Jindal Stainless Special Steels</div>
          </div>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.slate }}>MELT METHOD</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: TOKENS.paper, fontWeight: 600, marginTop: 2 }}>EAF + AOD Refining</div>
          </div>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.slate }}>HEAT LOT NUMBER</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: TOKENS.brass, fontWeight: 700, marginTop: 2 }}>{heatNumber}</div>
          </div>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.slate }}>ORIGIN AUDIT</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: TOKENS.teal, fontWeight: 600, marginTop: 2 }}>Make In India · ISO 14001</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: "flex", borderBottom: `1px solid ${TOKENS.hair}`, padding: "0 24px", background: "rgba(255,255,255,0.01)" }}>
          {[
            { id: "chem", label: "Optical Emission Spectroscopy (OES)" },
            { id: "mech", label: "Mechanical & Cryo Tensile Tests" },
            { id: "ndt", label: "NDT & Microstructure Inspection" },
            { id: "custody", label: "Chain of Custody & ESG Scope 3" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: "transparent",
                border: "none",
                borderBottom: `2px solid ${activeTab === tab.id ? TOKENS.teal : "transparent"}`,
                color: activeTab === tab.id ? TOKENS.teal : TOKENS.slate,
                padding: "12px 16px",
                cursor: "pointer",
                fontSize: 12,
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: activeTab === tab.id ? 700 : 400,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Content Body */}
        <div style={{ overflowY: "auto", padding: "20px 24px", flex: 1 }}>
          {activeTab === "chem" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate }}>
                  CHEMICAL COMPOSITION ASSAY VS. ASTM A276 / ASME SA479 GRADE 316L
                </span>
                <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.teal, fontWeight: 700 }}>
                  ● 100% SPEC CONFORMITY CONFIRMED
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 10 }}>
                {chemElements.map((item) => (
                  <div key={item.element} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "10px 14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, fontWeight: 700, color: TOKENS.paper }}>
                        {item.element}
                      </span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.teal, fontWeight: 700 }}>
                        {item.status}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate }}>
                      <span>Target: {item.target}</span>
                      <span style={{ color: TOKENS.brassBright, fontWeight: 600 }}>Actual: {item.measured}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "mech" && (
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate, marginBottom: 14 }}>
                ROOM TEMPERATURE & CRYOGENIC MECHANICAL PROPERTY CERTIFICATION
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {mechProperties.map((p) => (
                  <div key={p.prop} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                    <div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700, color: TOKENS.paper }}>
                        {p.prop}
                      </div>
                      <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate, marginTop: 2 }}>
                        Standard Spec: {p.spec}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, fontWeight: 700, color: TOKENS.teal }}>
                        {p.measured}
                      </div>
                      <div style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.brass }}>
                        {p.rating}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "ndt" && (
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate, marginBottom: 14 }}>
                NON-DESTRUCTIVE TESTING (NDT) & VOLUMETRIC SOUNDNESS CLEARANCES
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {ndtTests.map((t) => (
                  <div key={t.method} style={{ background: "rgba(0,168,150,0.04)", border: `1px solid rgba(0,168,150,0.25)`, borderRadius: 6, padding: "14px 16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13.5, fontWeight: 700, color: TOKENS.paper }}>
                        {t.method}
                      </span>
                      <span style={{ background: "rgba(0,168,150,0.2)", color: TOKENS.teal, padding: "2px 8px", borderRadius: 3, fontSize: 10, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
                        AUDITED & PASSED ✓
                      </span>
                    </div>
                    <div style={{ fontSize: 11.5, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate }}>
                      Standard: {t.standard}
                    </div>
                    <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.paper, marginTop: 4 }}>
                      Observations: {t.result}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "custody" && (
            <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: "20px 24px" }}>
              <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: 17, color: TOKENS.paper, margin: "0 0 14px" }}>
                Digital Twin Chain of Custody & Circular Metallurgy
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${TOKENS.hair}`, paddingBottom: 8 }}>
                  <span style={{ color: TOKENS.slate }}>Heat Annealing Cycle:</span>
                  <span style={{ color: TOKENS.paper }}>1065°C Solution Anneal + Deionized Water Quench</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${TOKENS.hair}`, paddingBottom: 8 }}>
                  <span style={{ color: TOKENS.slate }}>Recycled Ferrous Ingot Share:</span>
                  <span style={{ color: TOKENS.teal, fontWeight: 700 }}>78.4% (Green Steel Standard)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${TOKENS.hair}`, paddingBottom: 8 }}>
                  <span style={{ color: TOKENS.slate }}>Scope 3 Carbon Footprint:</span>
                  <span style={{ color: TOKENS.paper }}>1.42 kg CO2e / kg SS316L (68% below global avg)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: TOKENS.slate }}>Cryptographic Audit Hash:</span>
                  <button
                    onClick={copyHash}
                    style={{
                      background: "rgba(21,101,192,0.15)",
                      border: `1px solid ${TOKENS.blue}`,
                      color: TOKENS.paper,
                      padding: "4px 10px",
                      borderRadius: 4,
                      fontSize: 11,
                      cursor: "pointer",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {copiedHash ? "✓ Hash Copied!" : "📋 Copy SHA-256 Hash"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div style={{ padding: "16px 24px", borderTop: `1px solid ${TOKENS.hair}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)" }}>
          <button
            onClick={() => {
              trackEvent("download_mtr_pdf");
              alert(`Downloading Certified EN 10204 3.1 Material Test Report for Heat #${heatNumber} (PDF)...`);
            }}
            style={{
              background: TOKENS.teal,
              color: "#0B1F3A",
              border: "none",
              borderRadius: 4,
              padding: "8px 16px",
              fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            📑 Download Certified MTR (PDF) →
          </button>
          <Button onClick={onClose}>Close Inspector</Button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- Interactive Vendor & Machine Shop Comparison Matrix Modal ---------------------------- */

function VendorComparisonModal({
  isOpen,
  onClose,
  initialSupplierIds = ["mfr-1", "mfr-2"],
  allManufacturers = [],
  go,
}) {
  const [selectedIds, setSelectedIds] = useState(
    initialSupplierIds.length >= 2 ? initialSupplierIds : ["mfr-1", "mfr-2", "mfr-3"]
  );

  useEffect(() => {
    if (initialSupplierIds && initialSupplierIds.length > 0) {
      setSelectedIds(initialSupplierIds);
    }
  }, [initialSupplierIds]);

  if (!isOpen) return null;

  const mfrPool = allManufacturers.length > 0 ? allManufacturers : [
    {
      id: "mfr-1",
      name: "Apex Precision Engineering Ltd.",
      category: "CNC Machining & Turning",
      location: "Ambattur Corridor, Chennai, Tamil Nadu",
      rating: "★ 4.9 (94 reviews)",
      spindles: "18x DMG MORI 5-Axis (20,000 RPM) + Mazak Integrex",
      tolerance: "±0.002 mm (Ultra-Precision Aerospace)",
      certifications: ["ISO 9001:2015", "AS9100D (Aerospace)", "IATF 16949"],
      metrology: "Zeiss Contura 3D Optical CMM + Ra 0.2µm Profilometer",
      escrow: "✓ 100% Milestone Escrow Accepted",
      otif: "98.6% On-Time In-Full",
      turnaround: "⚡ 4 Hours Avg. Quote",
      moq: "100 pieces",
      capacity: "1,50,000 units/mo",
    },
    {
      id: "mfr-2",
      name: "Deccan High-Precision Tooling",
      category: "Aerospace 5-Axis Milling",
      location: "Adibatla Aerospace SEZ, Hyderabad, Telangana",
      rating: "★ 4.8 (82 reviews)",
      spindles: "12x Hermle 5-Axis Milling + Makino Wire EDM",
      tolerance: "±0.003 mm (Precision Defense)",
      certifications: ["ISO 9001:2015", "AS9100D", "ISO 13485 (Medical)"],
      metrology: "Mitutoyo Crysta-Apex S9106 CMM + Hexagon Laser Arm",
      escrow: "✓ 100% Milestone Escrow Accepted",
      otif: "96.8% On-Time In-Full",
      turnaround: "⚡ 6 Hours Avg. Quote",
      moq: "50 pieces",
      capacity: "80,000 units/mo",
    },
    {
      id: "mfr-3",
      name: "Bangalore Micro-Machining Systems",
      category: "Micro-Turning & Swiss Machining",
      location: "Peenya Industrial Area, Bengaluru, Karnataka",
      rating: "★ 4.7 (54 reviews)",
      spindles: "14x Citizen Cincom Swiss Lathes (Ø0.5 - 32mm)",
      tolerance: "±0.001 mm (Sub-Micron Swiss)",
      certifications: ["ISO 9001:2015", "ISO 13485"],
      metrology: "Keyence IM-8000 Image Dimension Measurement",
      escrow: "✓ 100% Milestone Escrow Accepted",
      otif: "97.4% On-Time In-Full",
      turnaround: "⚡ 8 Hours Avg. Quote",
      moq: "250 pieces",
      capacity: "5,00,000 units/mo",
    },
    {
      id: "mfr-4",
      name: "Bharat Rubber & Sealing Systems",
      category: "Rubber & Gasket Manufacturing",
      location: "Bhosari Industrial Estate, Pune, Maharashtra",
      rating: "★ 4.6 (38 reviews)",
      spindles: "10x Vacuum Compression Presses + Cryo Deflashing",
      tolerance: "±0.015 mm (Elastomer Precision)",
      certifications: ["ISO 9001:2015", "IATF 16949"],
      metrology: "Micro-Vu Optical Comparator + Rheometer MDR",
      escrow: "✓ 100% Milestone Escrow Accepted",
      otif: "95.2% On-Time In-Full",
      turnaround: "⚡ 10 Hours Avg. Quote",
      moq: "500 pieces",
      capacity: "2,00,000 units/mo",
    },
    {
      id: "mfr-5",
      name: "Skylark Precision Castings",
      category: "Investment Casting & Foundry",
      location: "Coimbatore Industrial Corridor, Tamil Nadu",
      rating: "★ 4.8 (61 reviews)",
      spindles: "Induction Melting Furnaces + Haas VF-4 CNC",
      tolerance: "±0.010 mm (Investment Cast + Post CNC)",
      certifications: ["ISO 9001:2015", "AS9100D (Aerospace)"],
      metrology: "100-Ton Universal Tensile Machine + Optical Spectrometer",
      escrow: "✓ 100% Milestone Escrow Accepted",
      otif: "97.1% On-Time In-Full",
      turnaround: "⚡ 6 Hours Avg. Quote",
      moq: "200 pieces",
      capacity: "50 tons/mo",
    },
  ];

  const activeMfrs = mfrPool.filter((m) => selectedIds.includes(m.id));

  const removeMfr = (id) => {
    if (selectedIds.length <= 1) return;
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  };

  const addMfr = (id) => {
    if (!selectedIds.includes(id)) {
      setSelectedIds((prev) => [...prev, id]);
    }
  };

  const unselectedMfrs = mfrPool.filter((m) => !selectedIds.includes(m.id));

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(7, 16, 32, 0.92)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        zIndex: 10000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 960,
          width: "100%",
          maxHeight: "90vh",
          background: TOKENS.panelAlt,
          border: `1px solid rgba(212,175,55,0.45)`,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 28px 70px rgba(0,0,0,0.85)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{ padding: "18px 24px", borderBottom: `1px solid ${TOKENS.hair}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 22 }}>⚖️</span>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: TOKENS.paper, margin: 0 }}>
                  Supplier & Machine Shop Comparison Matrix
                </h3>
                <span style={{ background: "rgba(212,175,55,0.18)", color: TOKENS.brass, padding: "2px 8px", borderRadius: 4, fontSize: 10, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
                  {activeMfrs.length} PLANTS COMPARED
                </span>
              </div>
              <div style={{ fontSize: 11.5, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate, marginTop: 2 }}>
                Side-by-side audit of machining tolerances, AS9100D credentials, and SLA lead times
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: "none", color: TOKENS.slate, fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>

        {/* Quick Add Bar */}
        {unselectedMfrs.length > 0 && (
          <div style={{ padding: "10px 24px", background: "rgba(0,0,0,0.25)", borderBottom: `1px solid ${TOKENS.hair}`, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate }}>+ Add to comparison:</span>
            {unselectedMfrs.map((m) => (
              <button
                key={m.id}
                onClick={() => addMfr(m.id)}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${TOKENS.hair}`,
                  color: TOKENS.paper,
                  padding: "4px 10px",
                  borderRadius: 4,
                  fontSize: 11,
                  fontFamily: "'JetBrains Mono', monospace",
                  cursor: "pointer",
                }}
              >
                + {m.name.split(" ")[0]}
              </button>
            ))}
          </div>
        )}

        {/* Comparison Table */}
        <div style={{ overflowX: "auto", overflowY: "auto", flex: 1, padding: "20px 24px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${TOKENS.hair}` }}>
                <th style={{ textAlign: "left", padding: "12px 14px", width: "22%", color: TOKENS.slate, fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>
                  METRICS / CRITERIA
                </th>
                {activeMfrs.map((m) => (
                  <th key={m.id} style={{ textAlign: "left", padding: "12px 14px", width: `${78 / activeMfrs.length}%` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16, color: TOKENS.paper }}>{m.name}</div>
                        <div style={{ fontSize: 11, color: TOKENS.teal, fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>{m.category}</div>
                        <div style={{ fontSize: 11, color: TOKENS.slate, marginTop: 2 }}>📍 {m.location.split(",")[0]}</div>
                      </div>
                      {activeMfrs.length > 1 && (
                        <button
                          onClick={() => removeMfr(m.id)}
                          style={{ background: "transparent", border: "none", color: TOKENS.slate, cursor: "pointer", fontSize: 14 }}
                          title="Remove from comparison"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>
              <tr style={{ borderBottom: `1px solid ${TOKENS.hair}`, background: "rgba(255,255,255,0.015)" }}>
                <td style={{ padding: "12px 14px", color: TOKENS.brass, fontWeight: 700 }}>Tolerance Repeatability</td>
                {activeMfrs.map((m) => (
                  <td key={m.id} style={{ padding: "12px 14px", color: TOKENS.paper, fontWeight: 600 }}>
                    {m.tolerance}
                  </td>
                ))}
              </tr>
              <tr style={{ borderBottom: `1px solid ${TOKENS.hair}` }}>
                <td style={{ padding: "12px 14px", color: TOKENS.slate }}>Primary Spindle / Machine Fleet</td>
                {activeMfrs.map((m) => (
                  <td key={m.id} style={{ padding: "12px 14px", color: TOKENS.paper }}>
                    {m.spindles}
                  </td>
                ))}
              </tr>
              <tr style={{ borderBottom: `1px solid ${TOKENS.hair}`, background: "rgba(255,255,255,0.015)" }}>
                <td style={{ padding: "12px 14px", color: TOKENS.slate }}>Quality Accreditations</td>
                {activeMfrs.map((m) => (
                  <td key={m.id} style={{ padding: "12px 14px" }}>
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                      {m.certifications.map((c) => (
                        <span key={c} style={{ background: "rgba(0,168,150,0.15)", color: TOKENS.teal, padding: "2px 6px", borderRadius: 3, fontSize: 10 }}>
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr style={{ borderBottom: `1px solid ${TOKENS.hair}` }}>
                <td style={{ padding: "12px 14px", color: TOKENS.slate }}>Metrology & Inspection Labs</td>
                {activeMfrs.map((m) => (
                  <td key={m.id} style={{ padding: "12px 14px", color: TOKENS.slate }}>
                    {m.metrology}
                  </td>
                ))}
              </tr>
              <tr style={{ borderBottom: `1px solid ${TOKENS.hair}`, background: "rgba(255,255,255,0.015)" }}>
                <td style={{ padding: "12px 14px", color: TOKENS.slate }}>On-Time Delivery (OTIF)</td>
                {activeMfrs.map((m) => (
                  <td key={m.id} style={{ padding: "12px 14px", color: TOKENS.teal, fontWeight: 700 }}>
                    {m.otif}
                  </td>
                ))}
              </tr>
              <tr style={{ borderBottom: `1px solid ${TOKENS.hair}` }}>
                <td style={{ padding: "12px 14px", color: TOKENS.slate }}>Avg. RFQ Turnaround</td>
                {activeMfrs.map((m) => (
                  <td key={m.id} style={{ padding: "12px 14px", color: TOKENS.brass }}>
                    {m.turnaround}
                  </td>
                ))}
              </tr>
              <tr style={{ borderBottom: `1px solid ${TOKENS.hair}`, background: "rgba(255,255,255,0.015)" }}>
                <td style={{ padding: "12px 14px", color: TOKENS.slate }}>MOQ & Capacity</td>
                {activeMfrs.map((m) => (
                  <td key={m.id} style={{ padding: "12px 14px", color: TOKENS.paper }}>
                    MOQ: {m.moq} · Cap: {m.capacity}
                  </td>
                ))}
              </tr>
              <tr style={{ borderBottom: `1px solid ${TOKENS.hair}` }}>
                <td style={{ padding: "12px 14px", color: TOKENS.slate }}>Escrow Protection</td>
                {activeMfrs.map((m) => (
                  <td key={m.id} style={{ padding: "12px 14px", color: TOKENS.teal }}>
                    {m.escrow}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ padding: "16px 14px", color: TOKENS.slate }}>Procurement Action</td>
                {activeMfrs.map((m) => (
                  <td key={m.id} style={{ padding: "16px 14px" }}>
                    <button
                      onClick={() => {
                        onClose();
                        go?.("rfq-wizard");
                      }}
                      style={{
                        background: TOKENS.brass,
                        color: TOKENS.ink,
                        border: "none",
                        borderRadius: 4,
                        padding: "8px 12px",
                        fontSize: 11.5,
                        fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: 700,
                        cursor: "pointer",
                        width: "100%",
                      }}
                    >
                      Dispatch RFQ →
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 24px", borderTop: `1px solid ${TOKENS.hair}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)" }}>
          <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate }}>
            All compared facilities are ISO/AS9100D audited by Abhimanyu Technologies Engineering Operations.
          </span>
          <Button onClick={onClose}>Done</Button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- Supply Chain Logistics & Live Freight Tracking Modal ---------------------------- */

function FreightTrackerModal({
  isOpen,
  onClose,
  rfqId = "RFQ-2026-9041",
  poNumber = "PO-2026-9041",
}) {
  if (!isOpen) return null;

  const telemetry = {
    consignmentId: "CN-ABH-882190",
    carrier: "Abhimanyu Express Logistics (BlueDart Aviation Cargo)",
    origin: "Apex Precision Machining Hub, Ambattur Corridor, Chennai (MAA)",
    destination: "Bharat Aerospace & Dynamics Dock #4, Adibatla Aerospace Hub, Telangana (HYD)",
    status: "IN-TRANSIT · AIR & HIGHWAY CORRIDOR",
    eta: "Today at 18:30 IST (On Schedule)",
    currentLocation: "NH-44 Expressway Corridor (14°18'N, 79°41'E)",
    speed: "68 km/h",
    temp: "21.8°C",
    tempStatus: "NORMAL (15°C - 28°C allowable)",
    humidity: "38% RH",
    humidityStatus: "DRY PASS (< 55% RH rust prevention)",
    shock: "0.14 G",
    shockStatus: "ZERO DROP / SHOCK (Max threshold: 1.5 G)",
    battery: "94%",
    eWayBill: "EWAY-GST-362026-89104",
  };

  const stages = [
    {
      step: 1,
      title: "Factory Gate Pack & Nitrogen Purged Crating",
      location: "Ambattur Machining Facility, Chennai",
      time: "27 Sep 2026, 16:00 IST",
      done: true,
      desc: "Machined parts cleaned, VCI rust inhibitor applied, wooden crates sealed.",
    },
    {
      step: 2,
      title: "E-Way Bill Generation & Commercial Customs Seal",
      location: "Chennai Air Cargo Logistics Hub",
      time: "27 Sep 2026, 18:45 IST",
      done: true,
      desc: "Official GST e-way bill #362026-89104 verified with commercial tax clearance.",
    },
    {
      step: 3,
      title: "Climate-Controlled Air & Dedicated Ground Freight",
      location: "En Route to Hyderabad Aerospace Hub",
      time: "In-Transit (Live Telemetry Active)",
      current: true,
      desc: "GPS node tracking active. Environmental and 3-axis accelerometer sensors streaming.",
    },
    {
      step: 4,
      title: "Destination Receiving Dock & CMM Verification",
      location: "Bharat Aerospace Dock #4, Telangana",
      time: "Est. 18:30 IST",
      pending: true,
      desc: "Incoming Goods Receipt Note (GRN) inspection and final 10% retention release.",
    },
  ];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(7, 16, 32, 0.92)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        zIndex: 10000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 820,
          width: "100%",
          maxHeight: "90vh",
          background: TOKENS.panelAlt,
          border: `1px solid rgba(21,101,192,0.45)`,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 28px 70px rgba(0,0,0,0.85)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{ padding: "18px 24px", borderBottom: `1px solid ${TOKENS.hair}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 22 }}>🚚</span>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: TOKENS.paper, margin: 0 }}>
                  Consignment GPS & Environmental Telemetry
                </h3>
                <span style={{ background: "rgba(0,168,150,0.18)", color: TOKENS.teal, padding: "2px 8px", borderRadius: 4, fontSize: 10, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
                  LIVE SENSORS STREAMING
                </span>
              </div>
              <div style={{ fontSize: 11.5, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate, marginTop: 2 }}>
                Consignment #{telemetry.consignmentId} · PO #{poNumber} · {telemetry.carrier}
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: "none", color: TOKENS.slate, fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>

        {/* Live Status Strip */}
        <div style={{ padding: "16px 24px", background: "rgba(0,0,0,0.25)", borderBottom: `1px solid ${TOKENS.hair}`, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
          <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "12px 14px" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.slate }}>CONSIGNMENT STATUS</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: TOKENS.teal, fontWeight: 700, marginTop: 4 }}>
              ● {telemetry.status}
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "12px 14px" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.slate }}>CORRIDOR SPEED & GPS</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: TOKENS.paper, fontWeight: 600, marginTop: 4 }}>
              {telemetry.speed} · {telemetry.currentLocation.split("(")[0]}
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "12px 14px" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TOKENS.slate }}>ESTIMATED DOCK ARRIVAL</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: TOKENS.brassBright, fontWeight: 700, marginTop: 4 }}>
              {telemetry.eta}
            </div>
          </div>
        </div>

        {/* Sensor Gauges Grid */}
        <div style={{ padding: "16px 24px", borderBottom: `1px solid ${TOKENS.hair}`, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
          <div style={{ background: "rgba(0,168,150,0.05)", border: `1px solid rgba(0,168,150,0.3)`, borderRadius: 6, padding: "12px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate }}>
              <span>INTERNAL TEMP</span>
              <span style={{ color: TOKENS.teal }}>PASS ✓</span>
            </div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 24, color: TOKENS.teal, margin: "4px 0" }}>
              {telemetry.temp}
            </div>
            <div style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate }}>{telemetry.tempStatus}</div>
          </div>

          <div style={{ background: "rgba(21,101,192,0.05)", border: `1px solid rgba(21,101,192,0.3)`, borderRadius: 6, padding: "12px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate }}>
              <span>RELATIVE HUMIDITY</span>
              <span style={{ color: "#60A5FA" }}>PASS ✓</span>
            </div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 24, color: "#60A5FA", margin: "4px 0" }}>
              {telemetry.humidity}
            </div>
            <div style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate }}>{telemetry.humidityStatus}</div>
          </div>

          <div style={{ background: "rgba(212,175,55,0.05)", border: `1px solid rgba(212,175,55,0.3)`, borderRadius: 6, padding: "12px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate }}>
              <span>3-AXIS SHOCK SENSOR</span>
              <span style={{ color: TOKENS.brass }}>ZERO SHOCK ✓</span>
            </div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 24, color: TOKENS.brassBright, margin: "4px 0" }}>
              {telemetry.shock}
            </div>
            <div style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate }}>{telemetry.shockStatus}</div>
          </div>
        </div>

        {/* Stepper Content */}
        <div style={{ overflowY: "auto", padding: "20px 24px", flex: 1 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate, marginBottom: 14 }}>
            CORRIDOR TRANSIT MILESTONES (CHENNAI ➔ HYDERABAD AEROSPACE SEZ)
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {stages.map((s) => (
              <div
                key={s.step}
                style={{
                  background: s.done ? "rgba(0,168,150,0.06)" : s.current ? "rgba(21,101,192,0.12)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${s.done ? TOKENS.teal : s.current ? TOKENS.blue : TOKENS.hair}`,
                  borderRadius: 8,
                  padding: "14px 18px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{
                      background: s.done ? TOKENS.teal : s.current ? TOKENS.blue : "rgba(255,255,255,0.06)",
                      color: s.done || s.current ? TOKENS.ink : TOKENS.paper,
                      width: 20,
                      height: 20,
                      borderRadius: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10.5,
                      fontWeight: 700,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>
                      {s.done ? "✓" : s.step}
                    </span>
                    <span style={{ fontFamily: "'Fraunces', serif", fontSize: 15, color: TOKENS.paper }}>{s.title}</span>
                    <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: s.done ? TOKENS.teal : s.current ? "#60A5FA" : TOKENS.slate }}>
                      {s.time}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: TOKENS.slate, marginLeft: 28 }}>{s.desc}</div>
                </div>
                <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate }}>
                  📍 {s.location}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div style={{ padding: "16px 24px", borderTop: `1px solid ${TOKENS.hair}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)" }}>
          <button
            onClick={() => {
              trackEvent("download_eway_bill");
              alert(`Downloading GST E-Way Bill & Delivery Challan for Consignment ${telemetry.consignmentId} (PDF)...`);
            }}
            style={{
              background: "transparent",
              border: `1px solid ${TOKENS.hair}`,
              color: TOKENS.paper,
              borderRadius: 4,
              padding: "7px 12px",
              fontSize: 11.5,
              fontFamily: "'JetBrains Mono', monospace",
              cursor: "pointer",
            }}
          >
            📄 Download E-Way Bill ({telemetry.eWayBill})
          </button>
          <Button onClick={onClose}>Close Tracker</Button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- Universal Command Palette (Ctrl+K) ---------------------------- */

function SpotlightSearchModal({ isOpen, onClose, go, openTracker, openAuth, openCAD, openEscrow, openTraceability, openSupplierOnboarding, openVendorCompare, openFreight }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const catalog = [
    { type: "Tool", title: "3D CAD & GD&T Mesh Viewer", id: "cad", action: "openCAD", icon: "📐", sub: "Inspect STEP file, CMM deviations, X-ray fluid bores" },
    { type: "Tool", title: "Industrial Escrow & Milestone Vault", id: "escrow", action: "openEscrow", icon: "🔐", sub: "SBI/ICICI gateway, stage-gate 2FA releases" },
    { type: "Tool", title: "Material Test Report (MTR) & Melt Traceability", id: "traceability", action: "openTraceability", icon: "🔬", sub: "AS9100D spectroscopy, tensile yield, NDT" },
    { type: "Tool", title: "Supplier & Machine Shop Comparison Matrix", id: "compare", action: "openVendorCompare", icon: "⚖️", sub: "Side-by-side 5-axis CNC tolerance and OTIF audit" },
    { type: "Tool", title: "Consignment GPS & Live Freight Telemetry", id: "freight", action: "openFreight", icon: "🚚", sub: "Live temperature, humidity, shock G-force, and E-Way bills" },
    { type: "Tool", title: "OEM Supplier Plant Verification Wizard", id: "onboarding", action: "openSupplierOnboarding", icon: "🏭", sub: "Register machine shop & get verified" },
    { type: "Page", title: "Products & Software Platforms", id: "products", icon: "🛒", sub: "ERP, CRM, HRMS, AI, IoT" },
    { type: "Page", title: "Engineering Services & Pod Calculator", id: "services", icon: "🛠", sub: "Software, Cloud, AI, Security" },
    { type: "Page", title: "Verified Manufacturers Directory", id: "manufacturers", icon: "🏭", sub: "CNC, Sheet Metal, SMT Assembly" },
    { type: "Page", title: "Verified B2B Business Directory", id: "businesses", icon: "🏢", sub: "Suppliers, Logistics, Engineering" },
    { type: "Page", title: "Live RFQs & Sourcing Requirements", id: "requirements", icon: "📋", sub: "Browse open buyer requirements" },
    { type: "Page", title: "6-Step RFQ Post a Requirement Builder", id: "rfq-wizard", icon: "➕", sub: "Upload CAD & broadcast to plants" },
    { type: "Page", title: "Seller & Business Owner Dashboard", id: "dashboard", icon: "📊", sub: "Telemetry, quotes, conversion funnel" },
    { type: "Page", title: "Technical Knowledge Hub & Playbooks", id: "knowledge", icon: "📚", sub: "Engineering handbooks & standards" },
    { type: "Page", title: "Architectural Blueprints by Industry", id: "industries", icon: "📐", sub: "Aerospace, FinTech, Healthcare, OEM" },
    { type: "Page", title: "Enterprise Case Studies & ROI", id: "case-studies", icon: "📈", sub: "Production outcomes & telemetry" },
    { type: "Page", title: "Engineering Insights & Whitepapers", id: "insights", icon: "🔬", sub: "Deep technical essays & code" },
    { type: "Page", title: "Engineering Careers & Compensation", id: "careers", icon: "💼", sub: "Staff & Lead openings with bands" },
    { type: "Page", title: "Engineering Manifesto & Edge Topology", id: "about", icon: "ℹ️", sub: "12 Anycast global edge PoPs" },
    { type: "Page", title: "Enterprise Contact & Solutions Intake", id: "contact", icon: "📞", sub: "12-hour review guarantee" },
    { type: "RFQ", title: "RFQ-2026-9041: 10,000 SS316 CNC Turned Valves", id: "requirements", rfqId: "RFQ-2026-9041", icon: "⚡", sub: "Custom CNC Machining · Chennai Hub" },
    { type: "RFQ", title: "RFQ-2026-9082: SMT PCB Assembly for Medical IoT", id: "requirements", rfqId: "RFQ-2026-9082", icon: "⚡", sub: "Electronics Assembly · Hyderabad Hub" },
    { type: "RFQ", title: "RFQ-2026-9114: Aerospace Aluminum 6061-T6 Brackets", id: "requirements", rfqId: "RFQ-2026-9114", icon: "⚡", sub: "CNC Machining · Pune Hub" },
    { type: "RFQ", title: "RFQ-2026-9150: Automotive Sensor Injection Molding", id: "requirements", rfqId: "RFQ-2026-9150", icon: "⚡", sub: "Plastic Injection · Delhi Hub" },
    { type: "Product", title: "Abhimanyu ERP Operations Platform", id: "products", icon: "📦", sub: "Inventory, Invoicing, Supply Chain" },
    { type: "Product", title: "Abhimanyu CRM Lead Intelligence", id: "products", icon: "📦", sub: "AI Scoring, WhatsApp sequences" },
    { type: "Product", title: "Abhimanyu AI Neural Defect Engine", id: "products", icon: "📦", sub: "Inline computer vision & telemetry" },
    { type: "Product", title: "Abhimanyu IoT Fleet Telemetry Manager", id: "products", icon: "📦", sub: "10k+ connected sensors, MQTT" },
  ];

  const results = catalog.filter((item) => {
    const q = query.toLowerCase();
    return item.title.toLowerCase().includes(q) ||
           item.type.toLowerCase().includes(q) ||
           item.sub.toLowerCase().includes(q);
  });

  const handleSelect = (item) => {
    onClose();
    if (item.action === "openCAD") {
      openCAD?.();
    } else if (item.action === "openEscrow") {
      openEscrow?.();
    } else if (item.action === "openTraceability") {
      openTraceability?.();
    } else if (item.action === "openSupplierOnboarding") {
      openSupplierOnboarding?.();
    } else if (item.action === "openVendorCompare") {
      openVendorCompare?.();
    } else if (item.action === "openFreight") {
      openFreight?.();
    } else if (item.rfqId) {
      openTracker?.(item.rfqId);
    } else {
      go(item.id);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(7, 16, 32, 0.88)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        zIndex: 10000,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "80px 16px 20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 620,
          width: "100%",
          background: TOKENS.panelAlt,
          border: `1px solid rgba(21,101,192,0.45)`,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 24px 60px rgba(0,0,0,0.85)",
          display: "flex",
          flexDirection: "column",
          maxHeight: "75vh",
        }}
      >
        {/* Search Input Bar */}
        <div style={{ display: "flex", alignItems: "center", padding: "16px 20px", borderBottom: `1px solid ${TOKENS.hair}`, gap: 12, background: "rgba(255,255,255,0.02)" }}>
          <span style={{ fontSize: 18, color: TOKENS.teal }}>🔍</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products, services, RFQs, manufacturers, playbooks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              color: TOKENS.paper,
              fontSize: 15,
              outline: "none",
              fontFamily: "'Inter', sans-serif",
            }}
          />
          <kbd style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${TOKENS.hair}`, borderRadius: 4, padding: "2px 8px", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate }}>
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div style={{ overflowY: "auto", padding: "8px" }}>
          {results.length === 0 ? (
            <div style={{ padding: "32px 20px", textAlign: "center", color: TOKENS.slate, fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>
              No matches found for "{query}". Try "CNC", "ERP", "RFQ", or "Anycast".
            </div>
          ) : (
            results.slice(0, 10).map((r, idx) => (
              <div
                key={idx}
                onClick={() => handleSelect(r)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderRadius: 6,
                  cursor: "pointer",
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 18 }}>{r.icon}</span>
                  <div>
                    <div style={{ color: TOKENS.paper, fontSize: 14, fontWeight: 500 }}>{r.title}</div>
                    <div style={{ color: TOKENS.slate, fontSize: 12 }}>{r.sub}</div>
                  </div>
                </div>
                <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.teal, background: "rgba(0,168,150,0.12)", padding: "2px 6px", borderRadius: 3 }}>
                  {r.type.toUpperCase()}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div style={{ padding: "10px 16px", borderTop: `1px solid ${TOKENS.hair}`, background: "rgba(255,255,255,0.015)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: TOKENS.slate, fontFamily: "'JetBrains Mono', monospace" }}>
          <span>Navigation: <kbd style={{ background: "rgba(255,255,255,0.06)", padding: "1px 5px", borderRadius: 3 }}>↵ Enter</kbd> to open</span>
          <span>Shortcut: <kbd style={{ background: "rgba(255,255,255,0.06)", padding: "1px 5px", borderRadius: 3 }}>Ctrl+K</kbd> / <kbd style={{ background: "rgba(255,255,255,0.06)", padding: "1px 5px", borderRadius: 3 }}>⌘K</kbd></span>
        </div>
      </div>
    </div>
  );
}

/* Dynamic Route SEO Manager */
const PAGE_SEO = {
  home: {
    title: "Abhimanyu Technologies — Enterprise B2B Platform & Scale Your Business",
    description: "Connect with verified manufacturers, enterprise products, AI services, custom CNC machining, and global suppliers."
  },
  products: {
    title: "Enterprise B2B Product Marketplace | Abhimanyu Technologies",
    description: "Explore enterprise software platforms, industrial machinery, electronics, and verified products."
  },
  services: {
    title: "Services & Solutions Directory | Abhimanyu Technologies",
    description: "Custom software engineering, AI/ML models, cloud Anycast load balancing, and cybersecurity services."
  },
  manufacturers: {
    title: "Verified Industrial & OEM Manufacturers Directory | Abhimanyu",
    description: "Find verified CNC machining, sheet metal fabrication, and electronics assembly manufacturers."
  },
  businesses: {
    title: "Verified B2B Business Directory | Abhimanyu Technologies",
    description: "Browse verified enterprise suppliers, service providers, and business profiles."
  },
  requirements: {
    title: "Public RFQs & Buyer Requirements Hub | Abhimanyu Technologies",
    description: "View active buyer requirements, post RFQs, and submit competitive supplier quotations."
  },
  "rfq-wizard": {
    title: "5-Step RFQ Post a Requirement Wizard | Abhimanyu Technologies",
    description: "Post your manufacturing or software requirement in 5 simple steps and receive instant verified quotes."
  },
  dashboard: {
    title: "Seller & Business Owner Dashboard | Abhimanyu Technologies",
    description: "Manage inbound leads, RFQs, submitted quotations, and account analytics."
  },
  knowledge: {
    title: "Technical SEO & Manufacturing Knowledge Base | Abhimanyu",
    description: "Industrial guides on CNC contract manufacturing, Anycast cloud architecture, and AI models."
  },
  about: {
    title: "About Us | Abhimanyu Technologies Leadership & Vision",
    description: "Learn about founder Shiva, CTO Abhimanyu, executive leadership, company history, and engineering values."
  },
  "case-studies": {
    title: "Case Studies & Client ROI Outcomes | Abhimanyu Technologies",
    description: "In-depth technical case studies on cloud load balancing, LMS analytics, and AI fraud scoring."
  },
  insights: {
    title: "Technical Insights & Engineering Blog | Abhimanyu Technologies",
    description: "Research whitepapers on Anycast load balancing, generative AI, and zero-trust security."
  },
  careers: {
    title: "Careers & Open Engineering Roles | Abhimanyu Technologies",
    description: "Join Abhimanyu Technologies in Telangana HQ or remote. Hiring Flutter, Node.js, AI/ML, and DevOps Engineers."
  },
  contact: {
    title: "Contact Us & Project Inquiry | Scale Your Business",
    description: "Get in touch with an Abhimanyu Technologies solution architect for scope quotes and consultations."
  }
};

function useRouteSEO(page) {
  useEffect(() => {
    const seo = PAGE_SEO[page] || PAGE_SEO.home;
    document.title = seo.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", seo.description);
    }
  }, [page]);
}

const PAGES = {
  home: HomePage,
  products: ProductsPage,
  services: ServicesPage,
  manufacturers: ManufacturersPage,
  businesses: BusinessesPage,
  requirements: RequirementsPage,
  "rfq-wizard": RFQWizardPage,
  dashboard: BusinessDashboardPage,
  knowledge: KnowledgePage,
  about: AboutPage,
  industries: IndustriesPage,
  "case-studies": CaseStudiesPage,
  insights: InsightsPage,
  careers: CareersPage,
  contact: ContactPage,
};

export default function MyVaultSite() {
  const [page, setPage] = useState("home");
  const [currency, setCurrency] = useState("INR");
  const [currentUser, setCurrentUser] = useState({
    name: "Dr. K. S. Rao",
    company: "Bharat Aerospace & Dynamics",
    role: "buyer",
    location: "Telangana & Chennai Hub",
    avatar: "🏢",
    badge: "Enterprise Procurement Lead",
    tier: "Tier-1 Defence & Space",
    activeRFQs: 3,
    email: "ksrao@bharataero.gov.in",
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [trackerRfqId, setTrackerRfqId] = useState(null);
  const [trackerOpen, setTrackerOpen] = useState(false);
  const [cadModalOpen, setCadModalOpen] = useState(false);
  const [cadPart, setCadPart] = useState({ id: "RFQ-2026-9041", name: "SS316 Valve Manifold" });
  const [supplierOnboardingOpen, setSupplierOnboardingOpen] = useState(false);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [escrowModalOpen, setEscrowModalOpen] = useState(false);
  const [escrowOrder, setEscrowOrder] = useState({
    poNumber: "PO-2026-9041",
    supplier: "Apex Precision Engineering Ltd.",
    inr: 485000,
  });
  const [traceModalOpen, setTraceModalOpen] = useState(false);
  const [tracePart, setTracePart] = useState({
    rfqId: "RFQ-2026-9041",
    material: "SS 316L Stainless Steel",
    heatNumber: "HT-316L-98421",
  });
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [compareSupplierIds, setCompareSupplierIds] = useState(["mfr-1", "mfr-2", "mfr-3"]);
  const [freightModalOpen, setFreightModalOpen] = useState(false);
  const [freightRfqId, setFreightRfqId] = useState("RFQ-2026-9041");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSpotlightOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useRouteSEO(page);

  const topRef = useRef(null);
  const go = (id) => {
    setPage(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openTracker = (id) => {
    setTrackerRfqId(id || "RFQ-2026-9041");
    setTrackerOpen(true);
  };

  const openCAD = (id, name) => {
    setCadPart({ id: id || "RFQ-2026-9041", name: name || "SS316 Valve Manifold" });
    setCadModalOpen(true);
  };

  const openSupplierOnboarding = () => setSupplierOnboardingOpen(true);
  const openSpotlight = () => setSpotlightOpen(true);

  const openEscrow = (poNumber, supplier, inr) => {
    setEscrowOrder({
      poNumber: poNumber || "PO-2026-9041",
      supplier: supplier || "Apex Precision Engineering Ltd.",
      inr: inr || 485000,
    });
    setEscrowModalOpen(true);
  };

  const openTraceability = (rfqId, material, heatNumber) => {
    setTracePart({
      rfqId: rfqId || "RFQ-2026-9041",
      material: material || "SS 316L Stainless Steel",
      heatNumber: heatNumber || "HT-316L-98421",
    });
    setTraceModalOpen(true);
  };

  const openVendorCompare = (ids) => {
    if (ids && ids.length > 0) setCompareSupplierIds(ids);
    setCompareModalOpen(true);
  };

  const openFreight = (id) => {
    if (id) setFreightRfqId(id);
    setFreightModalOpen(true);
  };

  const Page = PAGES[page] || HomePage;

  return (
    <div style={{ background: TOKENS.ink, minHeight: "100vh", fontFamily: "'Inter', sans-serif" }} ref={topRef}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@400;500;600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #0B1F3A; }
        input, select, textarea, option { color-scheme: dark; }
        button:focus-visible, input:focus-visible, textarea:focus-visible, select:focus-visible { outline: 2px solid ${TOKENS.brass}; outline-offset: 2px; }
        select option { background: #101828; color: #F8FAFC; }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          main { padding-bottom: 72px !important; }
        }
        @media (min-width: 861px) {
          .mobile-bottom-nav { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>
      <SiteHeader
        page={page}
        go={go}
        currency={currency}
        setCurrency={setCurrency}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        openAuth={() => setAuthModalOpen(true)}
        openTracker={openTracker}
        openSpotlight={openSpotlight}
      />
      <main style={{ paddingTop: 64 }}>
        <Page
          go={go}
          currency={currency}
          currentUser={currentUser}
          openTracker={openTracker}
          openAuth={() => setAuthModalOpen(true)}
          openCAD={openCAD}
          openSupplierOnboarding={openSupplierOnboarding}
          openSpotlight={openSpotlight}
          openEscrow={openEscrow}
          openTraceability={openTraceability}
          openVendorCompare={openVendorCompare}
          openFreight={openFreight}
        />
      </main>
      <Footer go={go} />
      <LeadCaptureModal />
      <RFQTrackerModal
        rfqId={trackerRfqId}
        isOpen={trackerOpen}
        onClose={() => setTrackerOpen(false)}
        currency={currency}
        go={go}
        openCAD={openCAD}
        openEscrow={openEscrow}
        openTraceability={openTraceability}
        openFreight={openFreight}
      />
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        currentUser={currentUser}
        onLogin={(profile) => setCurrentUser(profile)}
        onLogout={() => setCurrentUser(null)}
      />
      <CADViewerModal
        isOpen={cadModalOpen}
        onClose={() => setCadModalOpen(false)}
        rfqId={cadPart.id}
        partName={cadPart.name}
        openTraceability={openTraceability}
      />
      <SupplierOnboardingModal
        isOpen={supplierOnboardingOpen}
        onClose={() => setSupplierOnboardingOpen(false)}
      />
      <SpotlightSearchModal
        isOpen={spotlightOpen}
        onClose={() => setSpotlightOpen(false)}
        go={go}
        openTracker={openTracker}
        openAuth={() => setAuthModalOpen(true)}
        openCAD={openCAD}
        openEscrow={openEscrow}
        openTraceability={openTraceability}
        openSupplierOnboarding={openSupplierOnboarding}
        openVendorCompare={openVendorCompare}
        openFreight={openFreight}
      />
      <EscrowSettlementModal
        isOpen={escrowModalOpen}
        onClose={() => setEscrowModalOpen(false)}
        poNumber={escrowOrder.poNumber}
        supplier={escrowOrder.supplier}
        totalInr={escrowOrder.inr}
        currency={currency}
      />
      <TraceabilityModal
        isOpen={traceModalOpen}
        onClose={() => setTraceModalOpen(false)}
        rfqId={tracePart.rfqId}
        material={tracePart.material}
        heatNumber={tracePart.heatNumber}
      />
      <VendorComparisonModal
        isOpen={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
        initialSupplierIds={compareSupplierIds}
        go={go}
      />
      <FreightTrackerModal
        isOpen={freightModalOpen}
        onClose={() => setFreightModalOpen(false)}
        rfqId={freightRfqId}
        poNumber="PO-2026-9041"
      />
      {/* Mobile Bottom Navigation Bar */}
      <nav
        className="mobile-bottom-nav"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9000,
          background: `rgba(11, 31, 58, 0.97)`,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: `1px solid rgba(255,255,255,0.1)`,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: 64,
          padding: "0 8px",
          boxShadow: "0 -8px 32px rgba(0,0,0,0.5)",
        }}
      >
        {[
          { icon: "🏠", label: "Home", id: "home" },
          { icon: "🧭", label: "Explore", id: "products" },
          { icon: "➕", label: "Post RFQ", id: "rfq-wizard", highlight: true },
          { icon: "💬", label: "Messages", id: "contact" },
          { icon: "👤", label: "Account", id: "dashboard" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.id === "dashboard") {
                if (!currentUser) setAuthModalOpen(true);
                else go("dashboard");
              } else {
                go(item.id);
              }
            }}
            style={{
              background: item.highlight
                ? `linear-gradient(135deg, ${TOKENS.blue} 0%, #1976D2 100%)`
                : "transparent",
              border: "none",
              borderRadius: item.highlight ? 14 : 8,
              padding: item.highlight ? "10px 18px" : "8px 12px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              minWidth: item.highlight ? 70 : 52,
              boxShadow: item.highlight ? "0 4px 14px rgba(21, 101, 192, 0.6)" : "none",
              transition: "all 0.15s ease",
            }}
          >
            <span style={{ fontSize: item.highlight ? 20 : 18, lineHeight: 1 }}>{item.icon}</span>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              letterSpacing: "0.04em",
              color: page === item.id ? TOKENS.brass : item.highlight ? "#fff" : TOKENS.slate,
              fontWeight: page === item.id || item.highlight ? 700 : 400,
            }}>
              {item.label.toUpperCase()}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}

