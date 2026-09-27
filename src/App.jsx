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
    deadline: "Deadline: 14 Days Left",
    status: "OPEN FOR QUOTES",
    bidsCount: "12 Bids Submitted"
  },
  {
    id: "RFQ-2026-9082",
    title: "Turnkey SMT PCB Assembly & Enclosure Box Build for Medical IoT Node",
    category: "Electronics Assembly",
    quantity: "2,500 Units",
    location: "Target Delivery: Hyderabad / Bengaluru",
    budget: "$28,000 - $35,000",
    deadline: "Deadline: 8 Days Left",
    status: "OPEN FOR QUOTES",
    bidsCount: "8 Bids Submitted"
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
          background: "rgba(9,9,9,0.85)",
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
      ctx.fillStyle = "#090909";
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
      grad.addColorStop(1, "rgba(9, 9, 9, 0)");
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
      <div style={{ position: "relative", background: "#090909" }}>
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
              background: "rgba(9,9,9,0.85)",
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
                  background: quality === q ? TOKENS.brass : "rgba(9,9,9,0.8)",
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
            background: "rgba(9,9,9,0.9)",
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
          background: "#090909",
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
    <Card style={{ background: "rgba(9, 9, 9, 0.95)" }}>
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
        <div style={{ position: "fixed", inset: 0, background: "rgba(9, 9, 9, 0.85)", backdropFilter: "blur(12px)", zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center", padding: 20 }}>
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

function HomePage({ go }) {
  return (
    <>
      <TelemetryTicker />
      <Hero go={go} />
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

function ProductsPage({ go }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productTab, setProductTab] = useState("overview");

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
                        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 26, color: TOKENS.brass, marginBottom: 8, fontWeight: 600 }}>{plan.price}</div>
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
  return (
    <>
      <Section eyebrow="Industries" title="Domain-Specific Engineering Solutions" sub="Tailored regulatory compliance, domain schemas, and high-load capabilities built for your industry.">
        <Grid min={270}>
          {INDUSTRIES.map((ind) => (
            <Card key={ind.name}>
              <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 20, margin: "0 0 10px" }}>{ind.name}</h3>
              <p style={{ color: TOKENS.slate, fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>{ind.note}</p>
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

  const EXTENDED_CASE_STUDIES = [
    {
      id: "cloud-unification",
      client: "Global Logistics Leader",
      title: "Unifying Operations onto High-Throughput Cloud Engine",
      challenge: "Disconnected legacy spreadsheets and fragmented SQL databases caused 4-hour latency in inventory reconciliation and high operational error rates during peak logistics hours.",
      solution: "Abhimanyu Technologies engineered an event-driven microservice architecture with real-time WebSocket syncing, automated inventory reconciliation, and zero-downtime PostgreSQL multi-region replication.",
      results: ["4.2x Throughput increase", "-68% Cloud infrastructure cost", "0ms Data sync latency", "99.999% SLA Uptime"],
      stack: "Next.js · Node.js · PostgreSQL · AWS Kinesis · Docker · Terraform",
      details: "By migrating away from monolithic batch-processing systems, the logistics network now processes over 14 million daily transaction events with instant tracking updates. Full audit logging ensures zero inventory discrepancies."
    },
    {
      id: "lms-tracking",
      client: "EdTech & University System",
      title: "Student Progress & Analytics Engine at 500k+ Scale",
      challenge: "Legacy learning platform crashed under concurrent exam loads of 50k+ simultaneous users, lacking real-time progress verification and telemetry.",
      solution: "Built a distributed mobile and web learning system utilizing Redis caching layers, auto-scaling Kubernetes worker pods, and granular telemetry verification.",
      results: ["500,000+ Active concurrent users", "0 Crash incidents during peak exams", "-75% Server response latency", "Automated certificate issuance"],
      stack: "React Native · Flutter · Node.js · Redis · PostgreSQL · Kubernetes",
      details: "The unified LMS tracks micro-learning interactions in real time, granting instant verified certificates while providing administrators with predictive student success analytics."
    },
    {
      id: "ai-fraud-detection",
      client: "FinTech Banking Platform",
      title: "Sub-10ms AI Fraud Detection & Risk Scoring API",
      challenge: "Manual transaction screening created bottleneck delays in instant credit authorization, resulting in elevated fraud exposure.",
      solution: "Developed an inline machine learning risk scoring engine deployed at edge nodes, scoring every transaction under 8 milliseconds.",
      results: ["-91% Fraudulent transactions", "< 8ms Median prediction latency", "$12.4M Annual saved fraud losses", "SOC2 Type II Audit Certified"],
      stack: "Python · PyTorch · ONNX Runtime · AWS Lambda Edge · Redis",
      details: "The risk scoring neural model evaluates 120+ transaction signals concurrently, allowing seamless legitimate purchases while flagging anomalies before clearing."
    }
  ];

  return (
    <>
      <Section eyebrow="Case Studies & Success Stories" title="Proven Engineering Outcomes" sub="In-depth technical reviews of systems designed, built, and maintained by Abhimanyu Technologies.">
        <Grid min={320}>
          {EXTENDED_CASE_STUDIES.map((c) => (
            <Card key={c.id}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.teal, marginBottom: 10, letterSpacing: "0.08em" }}>{c.client.toUpperCase()}</div>
              <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 21, margin: "0 0 14px" }}>{c.title}</h3>
              <p style={{ color: TOKENS.slate, fontSize: 14, marginBottom: 10, lineHeight: 1.6 }}><b style={{ color: TOKENS.paper }}>Challenge: </b>{c.challenge}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, margin: "16px 0", background: "rgba(255,255,255,0.02)", padding: 12, borderRadius: 4 }}>
                {c.results.map((res, i) => (
                  <div key={i} style={{ fontSize: 12.5, color: TOKENS.brass, fontFamily: "'JetBrains Mono', monospace" }}>✓ {res}</div>
                ))}
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: TOKENS.slate, marginBottom: 18 }}>{c.stack}</div>
              <Button variant="ghost" onClick={() => { trackEvent("open_case_study", { id: c.id }); setSelectedCase(c); }}>
                Read Full Case Study →
              </Button>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* Case Study Modal Reader */}
      {selectedCase && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(9, 9, 9, 0.85)", backdropFilter: "blur(12px)", zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center", padding: 20 }}>
          <Card style={{ maxWidth: 700, width: "100%", maxHeight: "85vh", overflowY: "auto", border: `1px solid ${TOKENS.brass}`, background: TOKENS.panelAlt }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: TOKENS.teal }}>{selectedCase.client}</span>
              <button onClick={() => setSelectedCase(null)} style={{ background: "transparent", border: "none", color: TOKENS.paper, fontSize: 22, cursor: "pointer" }}>✕</button>
            </div>
            <h2 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 24, margin: "0 0 16px" }}>{selectedCase.title}</h2>
            <div style={{ borderBottom: `1px solid ${TOKENS.hair}`, paddingBottom: 16, marginBottom: 16 }}>
              <h4 style={{ color: TOKENS.brass, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, marginTop: 0 }}>CHALLENGE</h4>
              <p style={{ color: TOKENS.slate, fontSize: 15, lineHeight: 1.6 }}>{selectedCase.challenge}</p>
            </div>
            <div style={{ borderBottom: `1px solid ${TOKENS.hair}`, paddingBottom: 16, marginBottom: 16 }}>
              <h4 style={{ color: TOKENS.teal, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, marginTop: 0 }}>ARCHITECTURAL SOLUTION</h4>
              <p style={{ color: TOKENS.slate, fontSize: 15, lineHeight: 1.6 }}>{selectedCase.solution}</p>
              <p style={{ color: TOKENS.paper, fontSize: 14, lineHeight: 1.6 }}>{selectedCase.details}</p>
            </div>
            <div style={{ marginBottom: 20 }}>
              <h4 style={{ color: TOKENS.brass, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, marginTop: 0 }}>VERIFIED RESULTS</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {selectedCase.results.map((r, idx) => (
                  <div key={idx} style={{ background: "rgba(212, 175, 55, 0.08)", border: `1px solid ${TOKENS.hair}`, padding: "10px 14px", borderRadius: 4, color: TOKENS.paper, fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>
                    ✓ {r}
                  </div>
                ))}
              </div>
            </div>
            <Button onClick={() => { setSelectedCase(null); go("contact"); }}>Discuss Similar Project →</Button>
          </Card>
        </div>
      )}

      <CTA go={go} />
    </>
  );
}

function InsightsPage({ go }) {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const ARTICLES = [
    {
      id: "ai-business",
      category: "AI & ML",
      title: "How AI Is Actually Changing Day-to-Day Business Operations",
      author: "Abhimanyu (CTO)",
      readTime: "5 min read",
      summary: "Beyond generic chatbot noise: real operational AI models deployed for predictive supply chain routing, inline document processing, and sub-10ms risk authorization.",
      content: "Many enterprises start AI projects by attempting to replace core business processes all at once. The most successful implementations, however, target single decision bottlenecks — such as automated invoice validation or real-time sensor anomaly scoring — where neural models work alongside human operators."
    },
    {
      id: "cloud-migration",
      category: "Cloud & DevOps",
      title: "Cloud Migration: A Practical Guide for High-Growth Engineering Teams",
      author: "Ananya Verma (VP Eng)",
      readTime: "7 min read",
      summary: "How to transition from legacy monologs to multi-cloud containerized microservices without service interruption or cost ballooning.",
      content: "A successful cloud migration requires breaking down infrastructure into stateless worker units managed via Infrastructure as Code (Terraform). Automated CI/CD pipelines with canary releases allow zero-downtime rollouts."
    },
    {
      id: "zero-trust-security",
      category: "Cybersecurity",
      title: "The Security Controls Most Engineering Teams Skip — and What They Cost Later",
      author: "Rajesh Kumar (Head of Security)",
      readTime: "6 min read",
      summary: "An architecture-level breakdown of zero-trust identity verification, database encryption at rest & in transit, and SOC2 compliance automation.",
      content: "Security is not a checkbox added before launch — it is an architectural constraint. Implementing mutual TLS (mTLS), strict RBAC permissions, and automated vulnerability scanning at commit time prevents breach incidents."
    }
  ];

  return (
    <>
      <Section eyebrow="Technical Insights & Blog" title="Engineering Perspective & Research" sub="Deep dives on cloud architecture, generative AI, zero-trust security, and system scaling.">
        <Grid min={280}>
          {ARTICLES.map((a) => (
            <Card key={a.id}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: TOKENS.teal, fontFamily: "'JetBrains Mono', monospace", marginBottom: 10 }}>
                <span>{a.category.toUpperCase()}</span>
                <span>{a.readTime}</span>
              </div>
              <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 20, margin: "0 0 10px", lineHeight: 1.4 }}>{a.title}</h3>
              <p style={{ color: TOKENS.slate, fontSize: 14, lineHeight: 1.6, margin: "0 0 16px" }}>{a.summary}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: TOKENS.brass }}>By {a.author}</span>
                <Button variant="ghost" onClick={() => { trackEvent("read_insight", { id: a.id }); setSelectedArticle(a); }}>Read Article →</Button>
              </div>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* Article Modal Reader */}
      {selectedArticle && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(9, 9, 9, 0.85)", backdropFilter: "blur(12px)", zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center", padding: 20 }}>
          <Card style={{ maxWidth: 680, width: "100%", maxHeight: "85vh", overflowY: "auto", border: `1px solid ${TOKENS.brass}`, background: TOKENS.panelAlt }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: TOKENS.teal }}>{selectedArticle.category} · {selectedArticle.readTime}</span>
              <button onClick={() => setSelectedArticle(null)} style={{ background: "transparent", border: "none", color: TOKENS.paper, fontSize: 22, cursor: "pointer" }}>✕</button>
            </div>
            <h2 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 24, margin: "0 0 10px" }}>{selectedArticle.title}</h2>
            <div style={{ fontSize: 13, color: TOKENS.brass, marginBottom: 20 }}>Written by {selectedArticle.author}</div>
            <p style={{ color: TOKENS.paper, fontSize: 16, lineHeight: 1.7, marginBottom: 20 }}>{selectedArticle.content}</p>
            <div style={{ background: "rgba(255,255,255,0.02)", borderLeft: `3px solid ${TOKENS.brass}`, padding: 16, marginBottom: 24 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: TOKENS.brass, marginBottom: 4 }}>KEY TAKEAWAY</div>
              <p style={{ color: TOKENS.slate, fontSize: 14, margin: 0 }}>{selectedArticle.summary}</p>
            </div>
            <Button onClick={() => setSelectedArticle(null)}>Close Article</Button>
          </Card>
        </div>
      )}

      <CTA go={go} />
    </>
  );
}

function CareersPage({ go }) {
  return (
    <>
      <Section eyebrow="Careers" title="Join Abhimanyu Technologies" sub="We are hiring passionate engineers who build software to last.">
        <div style={{ display: "flex", flexDirection: "column", gap: 1, border: `1px solid ${TOKENS.hair}` }}>
          {ROLES.map((r) => (
            <div key={r.title} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", background: TOKENS.panel, backdropFilter: "blur(14px)", borderBottom: `1px solid ${TOKENS.hair}`, flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ color: TOKENS.paper, fontFamily: "'Fraunces', serif", fontSize: 19 }}>{r.title}</div>
                <div style={{ color: TOKENS.slate, fontSize: 13, marginTop: 4 }}>{r.dept} · {r.type} · Telangana HQ / Remote</div>
              </div>
              <Button variant="ghost" onClick={() => { trackEvent("apply_role", { role: r.title }); go("contact"); }}>Apply Now →</Button>
            </div>
          ))}
        </div>
      </Section>
      <CTA go={go} label="Ask About Openings" />
    </>
  );
}

/* ---------------------------- New B2B Marketplace Sub-Pages ---------------------------- */

function RFQWizardPage({ go }) {
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
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <Button onClick={() => go("requirements")}>View Public RFQ Hub →</Button>
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


function ManufacturersPage({ go }) {
  const [selectedMfr, setSelectedMfr] = useState(null);
  const [quoteForm, setQuoteForm] = useState({ material: "", qty: "", timeline: "", email: "" });
  const [quoteSent, setQuoteSent] = useState(false);

  const updateQuote = (k, v) => setQuoteForm({ ...quoteForm, [k]: v });

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

  return (
    <>
      <Section eyebrow="Verified Manufacturers" title="Industrial & OEM Manufacturing Partners" sub="Directly source custom manufacturing, CNC machining, metal fabrication, and electronics assembly.">
        {/* Filter Bar */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {["All Categories", "CNC Machining", "Sheet Metal", "Electronics", "Rubber & Sealing", "Castings"].map((cat) => (
            <button key={cat} style={{ background: cat === "All Categories" ? TOKENS.brass : "rgba(255,255,255,0.04)", border: `1px solid ${cat === "All Categories" ? TOKENS.brass : TOKENS.hair}`, color: cat === "All Categories" ? TOKENS.ink : TOKENS.slate, borderRadius: 999, padding: "7px 16px", fontSize: 12.5, cursor: "pointer", fontFamily: "'JetBrains Mono', monospace", fontWeight: cat === "All Categories" ? 700 : 400 }}>
              {cat}
            </button>
          ))}
        </div>

        <Grid min={300}>
          {allManufacturers.map((m) => (
            <Card key={m.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ background: "rgba(212, 175, 55, 0.12)", border: `1px solid rgba(212,175,55,0.4)`, borderRadius: 4, padding: "4px 10px", fontSize: 11, color: TOKENS.brass, fontFamily: "'JetBrains Mono', monospace" }}>✓ VERIFIED SUPPLIER</span>
                <span style={{ fontSize: 12, color: TOKENS.teal, fontFamily: "'JetBrains Mono', monospace" }}>{m.rating.split(" ")[0]}</span>
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
          ))}
        </Grid>
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

function RequirementsPage({ go }) {
  return (
    <>
      <Section eyebrow="Public Requirements Hub" title="Live RFQs & Sourcing Inquiries" sub="Explore live buyer requirements and submit competitive quotations directly.">
        <Grid min={320}>
          {PUBLIC_RFQS.map((rfq) => (
            <Card key={rfq.id}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", marginBottom: 10 }}>
                <span style={{ color: TOKENS.teal }}>{rfq.id}</span>
                <span style={{ color: TOKENS.brass }}>{rfq.status}</span>
              </div>
              <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 20, margin: "0 0 10px" }}>{rfq.title}</h3>
              <div style={{ fontSize: 13.5, color: TOKENS.slate, marginBottom: 4 }}><b>Category:</b> {rfq.category}</div>
              <div style={{ fontSize: 13.5, color: TOKENS.slate, marginBottom: 4 }}><b>Quantity:</b> {rfq.quantity}</div>
              <div style={{ fontSize: 13.5, color: TOKENS.slate, marginBottom: 14 }}><b>Target Location:</b> {rfq.location}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${TOKENS.hair}`, paddingTop: 12, marginTop: 12 }}>
                <span style={{ fontSize: 12, color: TOKENS.brass, fontFamily: "'JetBrains Mono', monospace" }}>{rfq.bidsCount}</span>
                <Button onClick={() => go("contact")}>Submit Quotation →</Button>
              </div>
            </Card>
          ))}
        </Grid>
      </Section>
      <CTA go={go} label="Post Your Own Requirement" />
    </>
  );
}

function BusinessDashboardPage({ go }) {
  return (
    <Section eyebrow="Seller & Business Dashboard" title="Enterprise Account Command Center" sub="Manage inbound leads, active product listings, RFQ submissions, and performance telemetry.">
      <Card style={{ padding: 32 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
          <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${TOKENS.hair}`, padding: 20, borderRadius: 6 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate }}>PROFILE VIEWS</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, color: TOKENS.paper, marginTop: 6 }}>2,450</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${TOKENS.hair}`, padding: 20, borderRadius: 6 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.teal }}>INBOUND LEADS</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, color: TOKENS.teal, marginTop: 6 }}>120</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${TOKENS.hair}`, padding: 20, borderRadius: 6 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.brass }}>SUBMITTED QUOTES</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, color: TOKENS.brass, marginTop: 6 }}>45</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${TOKENS.hair}`, padding: 20, borderRadius: 6 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.paper }}>PIPELINE VALUE</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, color: TOKENS.paper, marginTop: 6 }}>$480,000</div>
          </div>
        </div>

        <h4 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 20, margin: "0 0 16px" }}>Recent Inbound RFQ Leads</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {PUBLIC_RFQS.map((item) => (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 16, background: "rgba(255,255,255,0.02)", border: `1px solid ${TOKENS.hair}`, borderRadius: 4, flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ fontSize: 15, color: TOKENS.paper, fontWeight: 600 }}>{item.title}</div>
                <div style={{ fontSize: 12.5, color: TOKENS.slate, marginTop: 4 }}>{item.category} · {item.quantity} · {item.budget}</div>
              </div>
              <Button onClick={() => go("contact")}>Send Quote →</Button>
            </div>
          ))}
        </div>
      </Card>
    </Section>
  );
}

function KnowledgePage({ go }) {
  return (
    <>
      <Section eyebrow="Knowledge Base & Guides" title="Technical & Manufacturing Resource Hub" sub="Educational articles, engineering guides, and architectural blueprints.">
        <Grid min={280}>
          <Card>
            <div style={{ fontSize: 11, color: TOKENS.teal, fontFamily: "'JetBrains Mono', monospace", marginBottom: 8 }}>MANUFACTURING GUIDE</div>
            <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 20, margin: "0 0 10px" }}>How Contract CNC Machining Works</h3>
            <p style={{ color: TOKENS.slate, fontSize: 14, lineHeight: 1.6, margin: 0 }}>A complete guide on 5-axis milling, precision tolerances, and choosing contract suppliers.</p>
          </Card>
          <Card>
            <div style={{ fontSize: 11, color: TOKENS.brass, fontFamily: "'JetBrains Mono', monospace", marginBottom: 8 }}>CLOUD ARCHITECTURE</div>
            <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 20, margin: "0 0 10px" }}>Multi-Region Anycast Load Balancing</h3>
            <p style={{ color: TOKENS.slate, fontSize: 14, lineHeight: 1.6, margin: 0 }}>How Anycast IP routing reduces global latency and handles sub-second server failovers.</p>
          </Card>
        </Grid>
      </Section>
      <CTA go={go} />
    </>
  );
}

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [refId, setRefId] = useState("");
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", country: "", service: "Software Development", budget: "$25k - $50k", timeline: "1-3 Months", requirements: "" });

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const inputStyle = { width: "100%", background: TOKENS.ink, border: `1px solid ${TOKENS.hair}`, borderRadius: 4, padding: "12px 14px", color: TOKENS.paper, fontSize: 14.5, fontFamily: "inherit", boxSizing: "border-box" };
  const labelStyle = { display: "block", color: TOKENS.slate, fontSize: 12, marginBottom: 6, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.04em" };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    trackEvent("submit_contact_form", { email: form.email, service: form.service });

    const newRef = `REF-ABH-${Math.floor(10000 + Math.random() * 90000)}`;
    setRefId(newRef);

    try {
      // Simulate live webhook endpoint post
      await fetch("https://httpbin.org/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, refId: newRef, submittedAt: new Date().toISOString() })
      }).catch(() => {});
    } catch (err) {
      // Graceful fallback
    }

    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 800);
  };

  if (sent) {
    return (
      <Section eyebrow="Contact Confirmation" title="Inquiry Received Successfully">
        <Card style={{ maxWidth: 560, margin: "0 auto", padding: 36, textAlign: "center", border: `1px solid ${TOKENS.brass}` }}>
          <div style={{ width: 56, height: 56, borderRadius: 999, background: "rgba(212, 175, 55, 0.14)", border: `1px solid ${TOKENS.brass}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: TOKENS.brass, fontSize: 24, fontWeight: "bold" }}>✓</div>
          <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 24, margin: "0 0 8px" }}>Thank You, {form.name || "Client"}!</h3>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: TOKENS.teal, marginBottom: 16 }}>REFERENCE ID: {refId}</div>
          <p style={{ color: TOKENS.slate, fontSize: 15, lineHeight: 1.65, margin: "0 0 24px" }}>
            Your project inquiry has been registered. An Abhimanyu Technologies solution architect will review your scope and follow up at <strong style={{ color: TOKENS.paper }}>{form.email}</strong> within 12 business hours.
          </p>
          <Button onClick={() => setSent(false)}>Send Another Message</Button>
        </Card>
      </Section>
    );
  }

  return (
    <Section eyebrow="Contact Abhimanyu Technologies" title="Scale Your Business With Us" sub="Tell us about your project requirements. Fields marked with an asterisk (*) are required.">
      <form onSubmit={handleSubmit} style={{ maxWidth: 720, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <div>
          <label style={labelStyle}>FULL NAME *</label>
          <input required style={inputStyle} value={form.name} onChange={update("name")} placeholder="John Doe" />
        </div>
        <div>
          <label style={labelStyle}>WORK EMAIL *</label>
          <input required type="email" style={inputStyle} value={form.email} onChange={update("email")} placeholder="john@company.com" />
        </div>
        <div>
          <label style={labelStyle}>COMPANY NAME</label>
          <input style={inputStyle} value={form.company} onChange={update("company")} placeholder="Acme Corp" />
        </div>
        <div>
          <label style={labelStyle}>PHONE NUMBER</label>
          <input style={inputStyle} value={form.phone} onChange={update("phone")} placeholder="+1 (555) 000-0000" />
        </div>
        <div>
          <label style={labelStyle}>PRIMARY SERVICE NEEDED</label>
          <select style={inputStyle} value={form.service} onChange={update("service")}>
            <option value="Custom Software">Custom Software Development</option>
            <option value="AI & Machine Learning">AI & Machine Learning</option>
            <option value="Cloud & DevOps">Cloud & DevOps Migration</option>
            <option value="Cybersecurity">Cybersecurity & Compliance</option>
            <option value="IoT & Embedded">IoT & Embedded Systems</option>
            <option value="Data & Analytics">Data & Business Analytics</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>ESTIMATED BUDGET</label>
          <select style={inputStyle} value={form.budget} onChange={update("budget")}>
            <option value="< $25k">&lt; $25,000</option>
            <option value="$25k - $50k">$25,000 - $50,000</option>
            <option value="$50k - $100k">$50,000 - $100,000</option>
            <option value="$100k+">$100,000+</option>
          </select>
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>PROJECT REQUIREMENTS & SCOPE *</label>
          <textarea required rows={5} style={{ ...inputStyle, resize: "vertical" }} value={form.requirements} onChange={update("requirements")} placeholder="Describe your technical requirements, goals, and target outcomes..." />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Transmitting Scope..." : "Submit Project Inquiry →"}
          </Button>
        </div>
      </form>
    </Section>
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

function SiteHeader({ page, go }) {
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

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

        {/* Desktop CTA */}
        <div className="desktop-nav" style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            onClick={() => go("contact")}
            style={{
              background: "transparent",
              border: `1px solid ${TOKENS.hair}`,
              borderRadius: 6,
              color: TOKENS.paper,
              fontSize: 12.5,
              fontFamily: "'JetBrains Mono', monospace",
              padding: "8px 14px",
              cursor: "pointer",
            }}
          >
            Contact
          </button>
          <Button onClick={() => go("rfq-wizard")}>Post RFQ →</Button>
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={() => setOpen(!open)} style={{ display: "none", background: "none", border: "none", color: TOKENS.paper, fontSize: 22 }}>
          {open ? "×" : "≡"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="mobile-menu" style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: 4, background: `rgba(11, 31, 58, 0.98)`, borderTop: `1px solid ${TOKENS.hair}`, maxHeight: "75vh", overflowY: "auto" }}>
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
    { title: "Company", items: [["About", "about"], ["Careers", "careers"], ["Insights", "insights"], ["Contact", "contact"]] },
    { title: "Services", items: [["Services", "services"], ["Solutions", "services"]] },
    { title: "Products", items: [["Products", "products"]] },
    { title: "Industries", items: [["Industries", "industries"]] },
  ];
  return (
    <footer style={{ borderTop: `1px solid ${TOKENS.hair}`, padding: "64px 24px 32px" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr repeat(4, 1fr)", gap: 32, marginBottom: 48 }} className="footer-grid">
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: TOKENS.paper, marginBottom: 10 }}>Abhimanyu</div>
            <p style={{ color: TOKENS.slate, fontSize: 13.5, lineHeight: 1.6, maxWidth: 220 }}>Technology. Innovation. Transformation.</p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: TOKENS.brass, letterSpacing: "0.08em", marginBottom: 14 }}>{c.title.toUpperCase()}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {c.items.map(([label, id]) => (
                  <button key={label} onClick={() => go(id)} style={{ background: "none", border: "none", color: TOKENS.slate, fontSize: 13.5, textAlign: "left", cursor: "pointer", padding: 0 }}>{label}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${TOKENS.hair}`, paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, color: TOKENS.slate, fontSize: 12.5, fontFamily: "'JetBrains Mono', monospace" }}>
          <span>© 2026 Abhimanyu Technologies. All rights reserved.</span>
          <span>Privacy · Terms · Cookies</span>
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
          background: "rgba(9,9,9,0.85)",
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
          background: "rgba(9, 9, 9, 0.9)",
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
            border: "2px solid #090909",
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
            background: "rgba(9, 9, 9, 0.94)",
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
          style={{
            position: "fixed",
            bottom: 24,
            left: 24,
            zIndex: 9990,
            background: "rgba(16, 21, 31, 0.92)",
            border: `1px solid ${TOKENS.brass}`,
            borderRadius: 999,
            padding: "10px 18px",
            color: TOKENS.paper,
            fontSize: 12.5,
            fontFamily: "'JetBrains Mono', monospace",
            cursor: "pointer",
            backdropFilter: "blur(12px)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
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
        <div style={{ position: "fixed", inset: 0, background: "rgba(9, 9, 9, 0.8)", backdropFilter: "blur(10px)", zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center", padding: 20 }}>
          <Card style={{ maxWidth: 460, width: "100%", border: `1px solid ${TOKENS.brass}`, background: TOKENS.panelAlt, position: "relative", padding: 32 }}>
            <button onClick={() => setOpen(false)} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: TOKENS.paper, fontSize: 20, cursor: "pointer" }}>✕</button>

            {subscribed ? (
              <div style={{ textAlign: "center", padding: "12px 0" }}>
                <div style={{ fontSize: 28, color: TOKENS.brass, marginBottom: 8 }}>✓</div>
                <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.paper, fontSize: 22, margin: "0 0 8px" }}>Guide Sent!</h3>
                <p style={{ color: TOKENS.slate, fontSize: 14, margin: 0 }}>Check your inbox shortly for the Enterprise Architecture Blueprint 2026 PDF.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.teal, marginBottom: 8 }}>FREE ENTERPRISE RESOURCE</div>
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
                    style={{ background: TOKENS.ink, border: `1px solid ${TOKENS.hair}`, borderRadius: 4, padding: "12px 14px", color: TOKENS.paper, fontSize: 14 }}
                  />
                  <Button type="submit">Download Blueprint PDF →</Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      )}
    </>
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
  useRouteSEO(page);

  const topRef = useRef(null);
  const go = (id) => {
    setPage(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      <SiteHeader page={page} go={go} />
      <main style={{ paddingTop: 64 }}>
        <Page go={go} />
      </main>
      <Footer go={go} />
      <LeadCaptureModal />
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
            onClick={() => go(item.id)}
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

