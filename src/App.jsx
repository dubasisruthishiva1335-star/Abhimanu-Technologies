import React, { useState, useEffect, useRef, useMemo } from "react";
import * as THREE from "three";

/* ============================================================
   ABHIMANYU TECHNOLOGIES — Global Software Engineering & Digital Solutions
   
   Enterprise Architecture:
   - Full-Stack Digital Engineering & Custom Software Services
   - Modern Web Engineering (Next.js, React, Micro-Frontends)
   - Mobile Engineering (Native Android Kotlin, iOS Swift, Flutter)
   - Distributed Microservices & APIs (Go, Node.js, Python FastAPI)
   - Cloud, DevOps & SRE (AWS, GCP, Kubernetes, Terraform)
   - Enterprise AI & Data Intelligence
   - Industry Verticals (FinTech, Healthcare, Retail, Supply Chain)
   ============================================================ */

const LIGHT_TOKENS = {
  ink: "#F8FAFC",
  panel: "#FFFFFF",
  panelAlt: "#F1F5F9",
  brass: "#D97706",
  brassBright: "#B45309",
  paper: "#0F172A",
  slate: "#475569",
  teal: "#0D9488",
  blue: "#2563EB",
  blueDark: "#1D4ED8",
  hair: "#E2E8F0",
  white: "#0F172A",
  badgeBg: "rgba(37, 99, 235, 0.08)",
  cardHover: "rgba(37, 99, 235, 0.04)",
};

const TOKENS = { ...LIGHT_TOKENS };

/* ---------------------------- Currency Formatter ---------------------------- */

const formatPrice = (inrAmount) => {
  if (inrAmount >= 10000000) return `₹${(inrAmount / 10000000).toFixed(1)} Cr`;
  if (inrAmount >= 100000) return `₹${(inrAmount / 100000).toFixed(1)} L`;
  return `₹${Math.round(inrAmount).toLocaleString("en-IN")}`;
};

/* ---------------------------- IT Services Dataset ---------------------------- */

const IT_SERVICES = [
  {
    id: "web-dev",
    category: "Web Engineering",
    title: "Web Application Development",
    shortDesc: "High-performance, responsive web portals, SaaS platforms, and enterprise progressive web apps built with Next.js, React, and Node.js.",
    icon: "🌐",
    tag: "Core Service",
    techStack: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Node.js", "GraphQL"],
    features: [
      "SSR & SSG Next.js web applications with sub-second page loads",
      "Headless e-commerce, custom customer portals, and internal tools",
      "Progressive Web Apps (PWAs) with offline caching and service workers",
      "High-converting landing pages with 98+ Google Lighthouse scores",
      "Real-time WebSocket feeds and interactive dashboards",
      "Enterprise SEO optimization & structured metadata schemas",
    ],
    deliverables: "Production-ready Web App, Figma UI Kit, CI/CD Pipeline, Automated Test Suite",
    timeline: "3 to 8 weeks",
    estInr: 180000,
  },
  {
    id: "frontend-dev",
    category: "Frontend Engineering",
    title: "Frontend & UI/UX Development",
    shortDesc: "Pixel-perfect, accessible, and fluid user interfaces crafted from Figma designs with modern component architectures and micro-frontends.",
    icon: "🎨",
    tag: "UI / UX Speciality",
    techStack: ["React", "Vue.js", "Zustand", "Tailwind CSS", "Framer Motion", "Storybook"],
    features: [
      "Custom enterprise design systems with reusable tokenized UI components",
      "WCAG 2.1 AA accessibility compliance and cross-browser resilience",
      "Smooth 60fps animations, interactive micro-interactions, and 3D visualizers",
      "Micro-frontend architectures for enterprise scale and team isolation",
      "State management optimization with zero unnecessary re-renders",
      "Rigorous unit and visual regression testing via Storybook & Playwright",
    ],
    deliverables: "Design System Repository, Reusable Component Library, Storybook Docs",
    timeline: "2 to 6 weeks",
    estInr: 140000,
  },
  {
    id: "backend-dev",
    category: "Backend & Systems",
    title: "Backend & Distributed API Engineering",
    shortDesc: "Scalable microservices, high-throughput REST and GraphQL APIs, event-driven data streaming, and secure database architectures.",
    icon: "⚙️",
    tag: "High Concurrency",
    techStack: ["Node.js", "Python (FastAPI)", "Go", "PostgreSQL", "Redis", "Kafka", "Docker"],
    features: [
      "Distributed microservices capable of handling 50,000+ requests/second",
      "PostgreSQL relational modeling, connection pooling, and multi-tenant sharding",
      "Redis distributed caching, rate-limiting, and Pub/Sub message queues",
      "Kafka / RabbitMQ event-driven streaming for asynchronous data pipelines",
      "OAuth2, JWT, Role-Based Access Control (RBAC), and SOC2 audit trails",
      "Automated OpenAPI / Swagger interactive documentation and SDK generators",
    ],
    deliverables: "Containerized Microservices, Database Migrations, API Docs, Load Test Reports",
    timeline: "4 to 10 weeks",
    estInr: 220000,
  },
  {
    id: "android-dev",
    category: "Mobile Engineering",
    title: "Android & Mobile App Development",
    shortDesc: "Native Android apps in Kotlin & Jetpack Compose, plus cross-platform Flutter and React Native apps for Android & iOS.",
    icon: "📱",
    tag: "Native & Cross-Platform",
    techStack: ["Kotlin", "Jetpack Compose", "Flutter", "Swift", "React Native", "Room DB", "Firebase"],
    features: [
      "Native Android development utilizing Kotlin Coroutines, Flow, and Jetpack Compose",
      "Cross-platform Flutter & React Native development for unified Android + iOS delivery",
      "Offline-first sync architectures with Room SQLite and encrypted local databases",
      "Push notifications (Firebase Cloud Messaging), deep linking, and biometric auth",
      "Hardware sensors, Bluetooth BLE, GPS real-time tracking, and camera integrations",
      "End-to-end Google Play Store and Apple App Store release & compliance management",
    ],
    deliverables: "Signed Android APK/AAB, iOS IPA, Source Code, Play Store Deployment",
    timeline: "4 to 12 weeks",
    estInr: 250000,
  },
  {
    id: "fullstack-dev",
    category: "Turnkey Engineering",
    title: "Full Stack Turnkey Development",
    shortDesc: "End-to-end digital product engineering from conceptual wireframes to scalable backend microservices, web apps, and native mobile apps.",
    icon: "⚡",
    tag: "End-to-End Delivery",
    techStack: ["React / Next.js", "Kotlin / Flutter", "Node.js / Python", "PostgreSQL", "AWS / Docker"],
    features: [
      "Turnkey MVP engineering: launch your digital product from zero to production",
      "Unified data models and seamless API synchronization across Web and Mobile",
      "Automated payment gateway integration (Stripe, Razorpay, PayPal, Invoicing)",
      "Comprehensive Admin Control Panel with business analytics, charts, and user audits",
      "Continuous integration and continuous deployment (CI/CD) with zero downtime",
      "Post-launch technical maintenance, security patches, and SLA uptime guarantees",
    ],
    deliverables: "Complete Web + Mobile Suite, Admin CMS, Cloud Infrastructure, Source Code",
    timeline: "6 to 14 weeks",
    estInr: 450000,
  },
  {
    id: "cloud-devops",
    category: "Cloud & Infrastructure",
    title: "Cloud, DevOps & SRE Engineering",
    shortDesc: "Automated cloud infrastructure, Kubernetes container orchestration, CI/CD pipelines, and 99.99% high-availability architectures.",
    icon: "☁️",
    tag: "99.99% SLA",
    techStack: ["AWS", "Google Cloud", "Kubernetes", "Docker", "Terraform", "GitHub Actions", "Prometheus"],
    features: [
      "Cloud architecture setup across AWS (ECS/EKS, Lambda, RDS, S3) and Google Cloud",
      "Infrastructure as Code (IaC) using Terraform for repeatable, audited environments",
      "Docker multi-stage containerization and automated Kubernetes orchestration",
      "Zero-downtime CI/CD deployment pipelines via GitHub Actions and GitLab CI",
      "24/7 observability, distributed tracing, and Prometheus/Grafana alerting",
      "DDoS mitigation, WAF rule configuration, SSL/TLS automation, and backup strategies",
    ],
    deliverables: "Terraform Scripts, Kubernetes Manifests, CI/CD Workflows, SRE Monitoring",
    timeline: "2 to 6 weeks",
    estInr: 160000,
  },
  {
    id: "ai-solutions",
    category: "Artificial Intelligence",
    title: "Enterprise AI & Custom Solutions",
    shortDesc: "Custom LLM integrations, Retrieval-Augmented Generation (RAG) over proprietary data, computer vision, and intelligent process automation.",
    icon: "🤖",
    tag: "Next-Gen AI",
    techStack: ["Python", "OpenAI / Claude API", "LangChain", "LlamaIndex", "Vector DBs", "PyTorch"],
    features: [
      "Private Retrieval-Augmented Generation (RAG) systems over enterprise documents",
      "Custom AI assistants for automated customer support, lead routing, and intake",
      "Intelligent Document Processing (IDP): OCR invoice extraction and parsing",
      "Predictive analytics, churn forecasting, and demand planning algorithms",
      "Fine-tuning of open-source models (Llama 3, Mistral) on private client servers",
      "Strict data privacy fences ensuring client IP is never used for external training",
    ],
    deliverables: "Trained AI Pipeline, Vector Database, API Middleware, Admin Sandbox",
    timeline: "4 to 10 weeks",
    estInr: 320000,
  },
  {
    id: "qa-security",
    category: "Quality & Security",
    title: "Cybersecurity, QA & Testing",
    shortDesc: "Automated end-to-end regression suites, API load testing, vulnerability assessments, and OWASP compliance certification.",
    icon: "🔒",
    tag: "Zero Defect Policy",
    techStack: ["Playwright", "Cypress", "Jest", "k6", "OWASP ZAP", "SonarQube"],
    features: [
      "Automated cross-browser end-to-end regression suites using Playwright",
      "API performance and load stress testing (k6) to simulate 100k+ concurrent users",
      "Static code analysis (SAST) and dependency vulnerability scans (SonarQube)",
      "OWASP Top 10 penetration testing and security gap remediation",
      "Mobile automated UI testing on cloud device farms (Firebase Test Lab)",
      "Detailed QA audit certification reports prior to production deployments",
    ],
    deliverables: "Automated Test Suites, Penetration Test Report, QA Certification Seal",
    timeline: "2 to 5 weeks",
    estInr: 120000,
  },
];

/* ---------------------------- Industries We Transform Dataset ---------------------------- */

const INDUSTRY_VERTICALS = [
  {
    id: "fintech",
    name: "Banking, FinTech & Digital Payments",
    icon: "💳",
    badge: "PCI-DSS Level 1 Ready",
    tagline: "High-Throughput Core Banking, Payment Switches & Real-Time Settlement",
    shortDesc: "Architecting resilient distributed ledgers, sub-100ms payment switches, biometric fraud detection, and automated regulatory reporting for banks, NBFCs, and global FinTech scale-ups.",
    metrics: [
      { label: "Peak Throughput", val: "10,000+ TPS" },
      { label: "P99 Processing Latency", val: "< 85ms" },
      { label: "Statutory Compliance", val: "RBI / PCI-DSS" },
    ],
    capabilities: [
      "Real-time UPI, IMPS, ACH, and ISO 20022 message payment switches",
      "Core banking modernization & legacy mainframe migration to Go microservices",
      "AI-driven biometric authentication, risk scoring, and anti-money laundering (AML)",
      "Zero-trust card tokenization vaults and hardware security module (HSM) integrations",
    ],
    techStack: ["Go", "Kafka", "PostgreSQL", "Redis", "Docker", "AWS EKS"],
  },
  {
    id: "healthcare",
    name: "Healthcare & Life Sciences",
    icon: "🏥",
    badge: "HIPAA & HL7/FHIR Compliant",
    tagline: "Telehealth Platforms, EHR Modernization & Clinical Workflow Automation",
    shortDesc: "End-to-end digital health engineering delivering secure electronic health records (EHR), remote patient monitoring, and AI-assisted clinical decision support with strict HIPAA isolation.",
    metrics: [
      { label: "Data Security SLA", val: "100% HIPAA" },
      { label: "Consultation Latency", val: "< 180ms" },
      { label: "Active Patient Records", val: "2.4M+" },
    ],
    capabilities: [
      "FHIR & HL7 interoperability middleware connecting hospital information systems (HIS)",
      "WebRTC encrypted low-latency video consultations with automated clinical transcription",
      "Medical imaging (DICOM) cloud viewers with AI diagnostic assistance overlays",
      "e-Prescription (eRx) routing with pharmacy POS integrations and drug interaction checks",
    ],
    techStack: ["React", "Python FastAPI", "WebRTC", "PostgreSQL", "HIPAA Cloud"],
  },
  {
    id: "retail",
    name: "Retail, E-Commerce & Omnichannel",
    icon: "🛍️",
    badge: "High Concurrency",
    tagline: "Headless Commerce, Dynamic Pricing Engines & Omnichannel POS",
    shortDesc: "Powering global retail brands with headless e-commerce architectures, sub-second product search, dynamic AI pricing engines, and real-time unified inventory across physical and digital stores.",
    metrics: [
      { label: "Black Friday Concurrency", val: "250K Users" },
      { label: "Cart Checkout Speed", val: "< 1.2s" },
      { label: "Conversion Lift", val: "+34%" },
    ],
    capabilities: [
      "Headless storefronts built with Next.js 14 and distributed edge caching",
      "Unified multi-store inventory synchronization with ERP & warehouse dispatch",
      "Personalized recommendation engines utilizing vector search and customer purchase history",
      "Omnichannel Point of Sale (POS) native tablet apps with offline receipt printing",
    ],
    techStack: ["Next.js 14", "Node.js", "Redis", "Elasticsearch", "Stripe / Razorpay"],
  },
  {
    id: "logistics",
    name: "Logistics & Intelligent Supply Chain",
    icon: "🚚",
    badge: "Real-Time Telemetry",
    tagline: "Fleet Telematics, Dynamic Route Optimization & Warehouse Automation",
    shortDesc: "Streamlining end-to-end freight mobility with IoT fleet tracking, automated geofenced dispatching, dynamic multi-stop routing algorithms, and cold-chain temperature monitoring.",
    metrics: [
      { label: "Fleet Mileage Saved", val: "18.4%" },
      { label: "Real-Time Geolocation", val: "5-Sec Ping" },
      { label: "On-Time Dispatch", val: "99.4%" },
    ],
    capabilities: [
      "Real-time GPS vehicle tracking with live CAN-bus engine diagnostics and geofencing",
      "Genetic algorithmic multi-drop route optimization reducing fuel expenditure",
      "Automated electronic Proof of Delivery (e-PoD) with digital signature capture",
      "Warehouse management system (WMS) integrating automated conveyor barcode scanners",
    ],
    techStack: ["Kotlin / Android", "Go", "TimescaleDB", "MQTT / IoT", "Google Maps API"],
  },
  {
    id: "saas",
    name: "Enterprise High-Tech & Cloud SaaS",
    icon: "☁️",
    badge: "Multi-Tenant Scale",
    tagline: "Multi-Tenant Architectures, Micro-Frontends & DevSecOps Automation",
    shortDesc: "Co-engineering next-generation enterprise software platforms with independent multi-tenant database isolations, usage-based billing, enterprise SSO (SAML/Okta), and automated CI/CD canary rollouts.",
    metrics: [
      { label: "Platform Availability", val: "99.99%" },
      { label: "Tenant Provisioning", val: "< 15s" },
      { label: "Global Edge Latency", val: "< 45ms" },
    ],
    capabilities: [
      "Dynamic tenant isolation: database-per-tenant and row-level security (RLS)",
      "Enterprise single sign-on (SSO) with Okta, Azure AD, Ping, and SAML 2.0",
      "Automated metering and usage-based billing infrastructure via Stripe / Chargebee",
      "Micro-frontend module federation allowing multiple independent agile squads to ship in parallel",
    ],
    techStack: ["React 18", "Go / Python", "PostgreSQL", "Kubernetes", "Terraform"],
  },
  {
    id: "manufacturing",
    name: "Smart Manufacturing & Industrial IoT",
    icon: "🏭",
    badge: "Industry 4.0",
    tagline: "Predictive Maintenance, SCADA Telemetry & Factory Floor Analytics",
    shortDesc: "Bridging Operational Technology (OT) and Information Technology (IT) with edge IoT gateways, real-time machine telemetry dashboards, and predictive maintenance ML models.",
    metrics: [
      { label: "Machine Downtime Cut", val: "-42%" },
      { label: "Edge Sensor Ingestion", val: "50K msg/s" },
      { label: "OEE Tracking Accuracy", val: "99.8%" },
    ],
    capabilities: [
      "OPC-UA and MQTT edge industrial protocol gateways connecting PLC controllers",
      "Real-time Overall Equipment Effectiveness (OEE) digital twin visualizers",
      "Vibration and thermal sensor telemetry pipelines for predictive anomaly alerting",
      "Paperless production work orders synced directly with plant ERP and inventory",
    ],
    techStack: ["Python", "Rust", "MQTT", "Grafana", "TimescaleDB", "Docker"],
  },
];

/* ---------------------------- Engagement & Delivery Models Dataset ---------------------------- */

const ENGAGEMENT_MODELS = [
  {
    id: "dedicated-pod",
    name: "Dedicated Engineering Pods",
    badge: "Agile Extension",
    icon: "👥",
    desc: "Autonomous, senior cross-functional teams (Lead Architect, Senior Full-Stack Engineers, Mobile Engineers, QA, and DevOps) integrated directly into your sprint cycles.",
    bestFor: "Scale-ups and enterprise tech teams needing velocity, domain expertise, and zero hiring overhead.",
    highlights: ["Senior talent with 5+ years experience", "Timezone-aligned daily standups", "Flexible team scaling with 2-week notice", "Full IP and repository ownership"],
  },
  {
    id: "turnkey-delivery",
    name: "End-to-End Turnkey Delivery",
    badge: "Fixed / Milestones",
    icon: "🎯",
    desc: "We take full accountability for architecting, designing, engineering, testing, and deploying your digital platform from discovery to production launch.",
    bestFor: "Enterprises launching new digital ventures, modernization programs, or time-critical greenfield platforms.",
    highlights: ["Fixed scope, milestones & transparent pricing", "Comprehensive UI/UX design & system architecture", "Strict SLA commitments and zero-defect warranties", "Full knowledge transfer and developer runbooks"],
  },
  {
    id: "architecture-advisory",
    name: "Strategic Technology & Architecture Advisory",
    badge: "CTO / Architect Level",
    icon: "🏛️",
    desc: "High-impact architectural audits, cloud migration roadmaps, security compliance reviews (SOC2/ISO27001), and legacy system refactoring strategies.",
    bestFor: "Founders and CTOs needing architectural validation before massive scale or migration.",
    highlights: ["In-depth code and architecture debt audit", "Cloud cost optimization (FinOps)", "Microservices migration roadmaps", "Disaster recovery & high-availability blueprints"],
  },
];

// Backwards compatibility alias
const SOFTWARE_PRODUCTS = INDUSTRY_VERTICALS;

/* ---------------------------- Tech Stacks ---------------------------- */

const TECH_CATEGORIES = [
  {
    category: "Frontend Web",
    icon: "🌐",
    items: [
      { name: "React 18", desc: "Component architecture, hooks, concurrent rendering" },
      { name: "Next.js 14", desc: "App router, SSR/SSG, optimized edge rendering" },
      { name: "TypeScript", desc: "Strict type safety, enterprise maintainability" },
      { name: "Tailwind CSS", desc: "Rapid utility-first styling and design systems" },
      { name: "Vue.js 3", desc: "Reactive composition API and Pinia state management" },
      { name: "Zustand / Redux", desc: "Predictable, high-performance client state" },
    ],
  },
  {
    category: "Mobile App Development",
    icon: "📱",
    items: [
      { name: "Android (Kotlin)", desc: "Native Android, Jetpack Compose, Coroutines" },
      { name: "Flutter", desc: "Cross-platform iOS & Android with native 60fps canvas" },
      { name: "React Native", desc: "Fast multi-platform mobile apps with native bridges" },
      { name: "iOS (Swift)", desc: "SwiftUI, Combine, Metal, native iOS ecosystem" },
      { name: "Room SQLite", desc: "Encrypted offline-first local database caching" },
      { name: "Firebase / FCM", desc: "Push notification pipelines and real-time sync" },
    ],
  },
  {
    category: "Backend & APIs",
    icon: "⚙️",
    items: [
      { name: "Node.js / Express", desc: "Event-driven asynchronous I/O microservices" },
      { name: "Python (FastAPI)", desc: "High-speed async APIs, AI integrations, data" },
      { name: "Go (Golang)", desc: "Ultra-low latency, concurrent network microservices" },
      { name: "Java Spring Boot", desc: "Battle-tested enterprise transactional backends" },
      { name: "GraphQL & REST", desc: "Flexible typed query layers and clean RESTful APIs" },
      { name: "gRPC & Protobuf", desc: "High-performance inter-service communication" },
    ],
  },
  {
    category: "Databases & Streaming",
    icon: "💾",
    items: [
      { name: "PostgreSQL", desc: "ACID compliant relational data with JSONB support" },
      { name: "MongoDB", desc: "Scalable document storage for dynamic schemas" },
      { name: "Redis", desc: "In-memory caching, rate-limiting, and Pub/Sub queues" },
      { name: "Apache Kafka", desc: "High-throughput distributed event streaming" },
      { name: "Elasticsearch", desc: "Full-text search indexing and log analysis" },
      { name: "Vector DBs", desc: "Milvus, Pinecone & Qdrant for AI semantic retrieval" },
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: "☁️",
    items: [
      { name: "Amazon Web Services", desc: "ECS/EKS, Lambda, RDS, S3, CloudFront, Route53" },
      { name: "Google Cloud Platform", desc: "Cloud Run, GKE, BigQuery, Cloud Pub/Sub" },
      { name: "Kubernetes (K8s)", desc: "Automated container orchestration and scaling" },
      { name: "Docker", desc: "Multi-stage reproducible microservice containers" },
      { name: "Terraform", desc: "Declarative Infrastructure as Code (IaC)" },
      { name: "GitHub Actions", desc: "Automated continuous delivery & automated testing" },
    ],
  },
];

/* ---------------------------- Client Case Studies ---------------------------- */

const CASE_STUDIES = [
  {
    id: "fintech-bank",
    title: "Next-Gen Mobile Neobank & Real-Time Payment Engine",
    client: "Apex FinTech Solutions",
    industry: "FinTech & Banking",
    icon: "💳",
    summary: "Built a native Android and cross-platform iOS mobile banking application paired with Go microservices, handling over 1.2M daily transactions with sub-100ms latency.",
    challenge: "Client required bank-grade biometrics, zero-fraud card tokenization, instant UPI / IMPS settlements, and offline-first balance checking for users in low-bandwidth regions.",
    solution: "Engineered a high-performance Flutter mobile client integrated with Go gRPC backend services, Redis distributed caching, and Kafka transactional logs with automated fraud detection.",
    results: [
      { label: "Daily Active Users", value: "850,000+" },
      { label: "API Latency", value: "< 85ms" },
      { label: "Crash-Free Sessions", value: "99.94%" },
      { label: "Transaction Volume", value: "₹420 Cr/mo" },
    ],
    tech: ["Flutter", "Kotlin", "Go", "PostgreSQL", "Kafka", "Redis", "AWS EKS"],
  },
  {
    id: "telehealth-platform",
    title: "HIPAA-Compliant Telehealth Web Portal & Android App",
    client: "Vanguard Health Technologies",
    industry: "Healthcare & MedTech",
    icon: "🩺",
    summary: "Architected a comprehensive telemedicine consultation platform with HD WebRTC video, digital prescription generator, and native Android app for doctors and patients.",
    challenge: "Handling secure peer-to-peer encrypted medical consultations with real-time vitals monitoring and automated electronic health record (EHR) sync.",
    solution: "Developed a Next.js 14 web app and native Android app in Kotlin with WebRTC end-to-end encrypted video, HIPAA compliant AWS S3 medical vaults, and FHIR API standards.",
    results: [
      { label: "Video Consults", value: "140,000+" },
      { label: "Prescription Gen Time", value: "< 2 mins" },
      { label: "HIPAA Audit Score", value: "100% Pass" },
      { label: "Doctor App Rating", value: "4.9 ★" },
    ],
    tech: ["Next.js", "Kotlin", "WebRTC", "FastAPI (Python)", "PostgreSQL", "Docker"],
  },
  {
    id: "logistics-saas",
    title: "Global Supply Chain Fleet Telemetry & Dispatch SaaS",
    client: "TransContinental Logistics Ltd.",
    industry: "Logistics & Fleet",
    icon: "🚚",
    summary: "Engineered a real-time fleet GPS tracking, automated driver route optimization, and digital consignment dispatch platform for 12,000+ freight trucks.",
    challenge: "Processing high-frequency MQTT GPS telemetry packets every 3 seconds from thousands of vehicles while generating instant detour alerts.",
    solution: "Built a distributed Node.js + Go streaming ingestion pipeline on Apache Kafka and TimescaleDB, with an interactive React mapping dashboard and Android driver app.",
    results: [
      { label: "Tracked Fleet", value: "12,400 Trucks" },
      { label: "Fuel Cost Savings", value: "18.4%" },
      { label: "Telemetry Ingestion", value: "65k msgs/sec" },
      { label: "On-Time Deliveries", value: "98.2%" },
    ],
    tech: ["React", "Android (Java/Kotlin)", "Go", "Kafka", "TimescaleDB", "Google Maps SDK"],
  },
  {
    id: "ai-enterprise-rag",
    title: "Autonomous Enterprise Knowledge Assistant & RAG Studio",
    client: "Cognitive Enterprise Systems",
    industry: "Enterprise AI & SaaS",
    icon: "🤖",
    summary: "Implemented a private Retrieval-Augmented Generation (RAG) assistant allowing 4,000+ corporate employees to instantly query 2M+ internal technical documents in natural language.",
    challenge: "Eliminating hallucination, maintaining strict document access permissions per employee role, and achieving sub-second question-answering speeds.",
    solution: "Constructed an automated document embedding pipeline using Milvus vector databases, hybrid BM25 + dense vector search, and custom Claude 3.5 Sonnet prompt orchestration.",
    results: [
      { label: "Information Retrieval", value: "-82% Time" },
      { label: "Accuracy Rate", value: "98.7%" },
      { label: "Indexed Documents", value: "2,100,000+" },
      { label: "Support Tickets Resolved", value: "45% Auto" },
    ],
    tech: ["Python", "FastAPI", "Milvus Vector DB", "LangChain", "Next.js", "Docker"],
  },
  {
    id: "ecommerce-engine",
    title: "High-Concurrency Multi-Vendor Marketplace Backend",
    client: "OmniStore Commerce Network",
    industry: "E-Commerce & Retail",
    icon: "🛍️",
    summary: "Re-architected an omnichannel retail platform with micro-frontends, dynamic inventory sync, and a checkout engine built to sustain flash sales of 45,000 orders/minute.",
    challenge: "Previous legacy monolith crashed during peak festive flash sales with cart locking deadlocks and inventory overselling.",
    solution: "Decomposed the system into distributed Node.js microservices with Redis distributed locks, idempotent payment webhooks, and Next.js ISR edge caching.",
    results: [
      { label: "Peak Flash Sale QPS", value: "48,000 Req/s" },
      { label: "Overselling Incidents", value: "0" },
      { label: "Checkout Duration", value: "1.4s" },
      { label: "Uptime During Sale", value: "100.0%" },
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "Redis Cluster", "AWS Fargate", "Stripe API"],
  },
];

/* ---------------------------- Client Testimonials ---------------------------- */

const TESTIMONIALS = [
  {
    quote: "Abhimanyu Technologies delivered our native Android app and cloud backend 3 weeks ahead of schedule. Their engineering quality, clean code architecture, and proactive communication set a new benchmark for software partners.",
    author: "Rajesh Varma",
    role: "Chief Technology Officer",
    company: "Apex FinTech Solutions",
    avatar: "👨‍💼",
    rating: 5,
  },
  {
    quote: "The WebRTC telehealth platform they engineered has been rock solid. We have conducted over 140,000 patient consultations with zero downtime. Their attention to security, HIPAA compliance, and UX is extraordinary.",
    author: "Dr. Ananya Sen",
    role: "VP of Product Engineering",
    company: "Vanguard Health Technologies",
    avatar: "👩‍⚕️",
    rating: 5,
  },
  {
    quote: "Abhimanyu Cloud ERP transformed our multi-warehouse operations. We cut our month-end financial reconciliation from 8 days to just 6 hours. Outstanding product and incredible customer engineering support.",
    author: "K. S. Narayanan",
    role: "Managing Director",
    company: "Deccan Industrial Logistics",
    avatar: "👨‍🏭",
    rating: 5,
  },
];

/* ---------------------------- Reusable UI Components ---------------------------- */

function Button({ children, onClick, variant = "primary", style = {}, disabled = false, title }) {
  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";
  const isOutline = variant === "outline";

  let bg = TOKENS.blue;
  let color = "#FFFFFF";
  let border = "none";

  if (isSecondary) {
    bg = TOKENS.panelAlt;
    color = TOKENS.paper;
    border = `1px solid ${TOKENS.hair}`;
  } else if (isOutline) {
    bg = "transparent";
    color = TOKENS.blue;
    border = `1px solid ${TOKENS.blue}`;
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        background: bg,
        color: color,
        border: border,
        borderRadius: 8,
        padding: "10px 18px",
        fontSize: 13.5,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        transition: "all 0.15s ease",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function SectionHeading({ title, subtitle, badge }) {
  return (
    <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 40px" }}>
      {badge && (
        <span
          style={{
            display: "inline-block",
            background: TOKENS.badgeBg,
            color: TOKENS.blue,
            border: `1px solid ${TOKENS.blue}33`,
            borderRadius: 999,
            padding: "4px 14px",
            fontSize: 11.5,
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          {badge}
        </span>
      )}
      <h2
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(24px, 4vw, 36px)",
          fontWeight: 800,
          color: TOKENS.paper,
          letterSpacing: "-0.025em",
          margin: "0 0 12px",
          lineHeight: 1.2,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            fontSize: 15,
            color: TOKENS.slate,
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

function TransparentLogo({ src = "/logo.png", height = 36 }) {
  return (
    <img
      src={src}
      alt="Abhimanyu Technologies Logo"
      style={{
        height,
        width: "auto",
        objectFit: "contain",
        filter: "drop-shadow(0 2px 8px rgba(37, 99, 235, 0.25))",
      }}
    />
  );
}

/* ---------------------------- Interactive 3D Tech Canvas ---------------------------- */

function HeroThreeCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Particle field representing connected digital nodes / microservices
    const particleCount = 120;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 40;
      positions[i + 1] = (Math.random() - 0.5) * 24;
      positions[i + 2] = (Math.random() - 0.5) * 20;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x2563eb,
      size: 0.8,
      transparent: true,
      opacity: 0.65,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Geometric polyhedra representing microservice clusters
    const polyGeo = new THREE.IcosahedronGeometry(7, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x0d9488,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const poly = new THREE.Mesh(polyGeo, wireMat);
    scene.add(poly);

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      particles.rotation.y += 0.0012;
      particles.rotation.x += 0.0006;
      poly.rotation.y -= 0.002;
      poly.rotation.x -= 0.001;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      polyGeo.dispose();
      wireMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.85,
      }}
    />
  );
}

/* ---------------------------- Universal Header ---------------------------- */

function SiteHeader({
  page,
  go,
  openStatusModal,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(255, 255, 255, 0.94)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: `1px solid ${TOKENS.hair}`,
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        {/* Brand Logo */}
        <button
          onClick={() => go("home")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: 0,
          }}
        >
          <TransparentLogo src="/logo.png" height={36} />
          <div style={{ textAlign: "left" }}>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 17.5,
                fontWeight: 700,
                color: TOKENS.paper,
                letterSpacing: "-0.01em",
                lineHeight: 1.1,
              }}
            >
              Abhimanyu
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 8.5,
                color: TOKENS.teal,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              GLOBAL SOFTWARE ENGINEERING
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {/* Services Dropdown */}
          <div style={{ position: "relative" }}>
            <button
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
              onClick={() => { go("services"); setServicesDropdown(false); }}
              style={{
                background: page === "services" ? TOKENS.badgeBg : "transparent",
                border: "none",
                borderRadius: 6,
                color: page === "services" ? TOKENS.blue : TOKENS.paper,
                fontSize: 13,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                padding: "8px 12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              Services <span style={{ fontSize: 9 }}>▼</span>
            </button>
            {servicesDropdown && (
              <div
                onMouseEnter={() => setServicesDropdown(true)}
                onMouseLeave={() => setServicesDropdown(false)}
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: 320,
                  background: TOKENS.panel,
                  border: `1px solid ${TOKENS.hair}`,
                  borderRadius: 10,
                  boxShadow: "0 14px 40px rgba(0,0,0,0.12)",
                  padding: 8,
                  zIndex: 200,
                }}
              >
                {IT_SERVICES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { go("services"); setServicesDropdown(false); }}
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      padding: "8px 10px",
                      borderRadius: 6,
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "all 0.12s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = TOKENS.panelAlt)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <span style={{ fontSize: 16 }}>{s.icon}</span>
                    <div>
                      <div style={{ fontSize: 12.5, fontWeight: 600, color: TOKENS.paper }}>{s.title}</div>
                      <div style={{ fontSize: 10, color: TOKENS.slate }}>{s.category}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => go("industries")}
            style={{
              background: page === "industries" || page === "products" ? TOKENS.badgeBg : "transparent",
              border: "none",
              borderRadius: 6,
              color: page === "industries" || page === "products" ? TOKENS.blue : TOKENS.paper,
              fontSize: 13,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            Industries
          </button>

          <button
            onClick={() => go("case-studies")}
            style={{
              background: page === "case-studies" ? TOKENS.badgeBg : "transparent",
              border: "none",
              borderRadius: 6,
              color: page === "case-studies" ? TOKENS.blue : TOKENS.paper,
              fontSize: 13,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            Case Studies
          </button>

          <button
            onClick={() => go("knowledge")}
            style={{
              background: page === "knowledge" ? TOKENS.badgeBg : "transparent",
              border: "none",
              borderRadius: 6,
              color: page === "knowledge" ? TOKENS.blue : TOKENS.paper,
              fontSize: 13,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            Tech Hub
          </button>

          <button
            onClick={() => go("about")}
            style={{
              background: page === "about" ? TOKENS.badgeBg : "transparent",
              border: "none",
              borderRadius: 6,
              color: page === "about" ? TOKENS.blue : TOKENS.paper,
              fontSize: 13,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            About
          </button>

          <button
            onClick={() => go("careers")}
            style={{
              background: page === "careers" ? TOKENS.badgeBg : "transparent",
              border: "none",
              borderRadius: 6,
              color: page === "careers" ? TOKENS.blue : TOKENS.paper,
              fontSize: 13,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            Careers
          </button>

          <button
            onClick={() => go("contact")}
            style={{
              background: page === "contact" ? TOKENS.badgeBg : "transparent",
              border: "none",
              borderRadius: 6,
              color: page === "contact" ? TOKENS.blue : TOKENS.paper,
              fontSize: 13,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            Contact
          </button>
        </nav>

        {/* Desktop Actions */}
        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* System SLA Status Telemetry Pill */}
          <button
            onClick={openStatusModal}
            style={{
              background: "rgba(16, 185, 129, 0.08)",
              border: "1px solid rgba(16, 185, 129, 0.28)",
              borderRadius: 6,
              padding: "6px 12px",
              fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 600,
              color: "#10B981",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
            title="Click to view Live 99.99% Infrastructure SLA & Edge Telemetry"
          >
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 6px #10B981" }} />
            <span>99.99% SLA</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            fontSize: 24,
            color: TOKENS.paper,
            cursor: "pointer",
          }}
        >
          {mobileMenuOpen ? "×" : "≡"}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            background: TOKENS.panel,
            borderTop: `1px solid ${TOKENS.hair}`,
            padding: "16px 20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {/* Mobile Status Telemetry Banner */}
          <button
            onClick={() => { openStatusModal(); setMobileMenuOpen(false); }}
            style={{
              background: "rgba(16, 185, 129, 0.08)",
              border: "1px solid rgba(16, 185, 129, 0.28)",
              color: "#10B981",
              borderRadius: 6,
              padding: "9px 12px",
              fontSize: 12,
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 4,
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981" }} />
              <span>System Telemetry & Health</span>
            </span>
            <span style={{ fontSize: 11, background: "rgba(16, 185, 129, 0.15)", padding: "2px 6px", borderRadius: 4 }}>
              99.99% SLA ⚡
            </span>
          </button>

          {[
            { id: "home", label: "🏠 Home" },
            { id: "services", label: "🛠 Engineering Capabilities" },
            { id: "industries", label: "🏢 Industries We Transform" },
            { id: "rfq-wizard", label: "➕ Project Scope Planner" },
            { id: "case-studies", label: "📈 Case Studies" },
            { id: "dashboard", label: "📊 Client Portal" },
            { id: "knowledge", label: "📚 Tech Hub" },
            { id: "about", label: "ℹ️ About Us" },
            { id: "careers", label: "💼 Careers" },
            { id: "contact", label: "📞 Contact & Consult" },
          ].map((n) => (
            <button
              key={n.id}
              onClick={() => { go(n.id); setMobileMenuOpen(false); }}
              style={{
                background: page === n.id ? TOKENS.badgeBg : "transparent",
                border: "none",
                textAlign: "left",
                color: page === n.id ? TOKENS.blue : TOKENS.paper,
                fontSize: 14.5,
                fontFamily: "'Inter', sans-serif",
                fontWeight: page === n.id ? 700 : 500,
                padding: "10px 8px",
                borderRadius: 6,
                cursor: "pointer",
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

/* ---------------------------- Client Project Tracker Modal ---------------------------- */

function ClientProjectTrackerModal({ isOpen, onClose, go }) {
  if (!isOpen) return null;

  const project = {
    id: "PRJ-2026-8841",
    name: "Apex Neobank Mobile App & Microservices",
    client: "Apex FinTech Solutions",
    status: "In Active Development",
    currentSprint: "Sprint 4 of 6",
    progressPct: 68,
    stagingUrl: "https://staging-apex.abhimanu-technologies.app",
    leadArchitect: "Er. Vikramaditya Rao",
    lastCommit: "feat(android): implement biometrics & UPI QR scan module",
    commitHash: "git#a89f41b (14 mins ago)",
  };

  const sprints = [
    { num: 1, title: "Figma UI/UX & Cloud DB Architecture", status: "COMPLETED", date: "Sep 01 - Sep 14" },
    { num: 2, title: "Auth0 RBAC, Security & User Microservices", status: "COMPLETED", date: "Sep 15 - Sep 28" },
    { num: 3, title: "Android Jetpack Compose Navigation & Core Screens", status: "COMPLETED", date: "Sep 29 - Oct 12" },
    { num: 4, title: "Payment Gateway Integration & WebRTC Video KYC", status: "IN_PROGRESS", date: "Oct 13 - Oct 26" },
    { num: 5, title: "End-to-End Automated Testing & Security Audit", status: "PENDING", date: "Oct 27 - Nov 09" },
    { num: 6, title: "Google Play Store / App Store Production Release", status: "PENDING", date: "Nov 10 - Nov 20" },
  ];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15, 23, 42, 0.65)",
        backdropFilter: "blur(16px)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px 16px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 880,
          maxHeight: "90vh",
          overflowY: "auto",
          background: TOKENS.panel,
          border: `1px solid ${TOKENS.hair}`,
          borderRadius: 14,
          padding: 24,
          color: TOKENS.paper,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20 }}>📊</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: TOKENS.paper }}>
                Client Live Project Sprint Tracker
              </span>
              <span style={{ background: "rgba(13, 148, 136, 0.15)", color: TOKENS.teal, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, padding: "2px 8px", borderRadius: 4 }}>
                ● SPRINT 4 ACTIVE
              </span>
            </div>
            <div style={{ fontSize: 13, color: TOKENS.slate, marginTop: 4 }}>
              Project: <strong>{project.name}</strong> • Ticket: <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{project.id}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: TOKENS.panelAlt,
              border: `1px solid ${TOKENS.hair}`,
              borderRadius: 6,
              width: 32,
              height: 32,
              cursor: "pointer",
              fontSize: 18,
              color: TOKENS.slate,
            }}
          >
            ×
          </button>
        </div>

        {/* Progress Banner */}
        <div style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 10, padding: 16, marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, fontSize: 13 }}>
            <span>Overall Roadmap Completion:</span>
            <strong>{project.progressPct}%</strong>
          </div>
          <div style={{ height: 8, background: "#E2E8F0", borderRadius: 999, overflow: "hidden" }}>
            <div style={{ width: `${project.progressPct}%`, height: "100%", background: `linear-gradient(90deg, ${TOKENS.blue}, ${TOKENS.teal})` }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: TOKENS.slate, marginTop: 10 }}>
            <span>Lead Architect: <strong>{project.leadArchitect}</strong></span>
            <span>Latest Commit: <code style={{ color: TOKENS.blue }}>{project.commitHash}</code></span>
          </div>
        </div>

        {/* Sprints Timeline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: TOKENS.slate }}>
            AGILE SPRINTS TIMELINE
          </div>
          {sprints.map((sp) => (
            <div
              key={sp.num}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 14px",
                background: sp.status === "IN_PROGRESS" ? TOKENS.badgeBg : TOKENS.panelAlt,
                border: `1px solid ${sp.status === "IN_PROGRESS" ? TOKENS.blue : TOKENS.hair}`,
                borderRadius: 8,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: TOKENS.blue }}>
                  #{sp.num}
                </span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: TOKENS.paper }}>{sp.title}</div>
                  <div style={{ fontSize: 11, color: TOKENS.slate }}>{sp.date}</div>
                </div>
              </div>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: 4,
                  background:
                    sp.status === "COMPLETED"
                      ? "rgba(13, 148, 136, 0.15)"
                      : sp.status === "IN_PROGRESS"
                      ? "rgba(37, 99, 235, 0.15)"
                      : "rgba(15, 23, 42, 0.06)",
                  color:
                    sp.status === "COMPLETED"
                      ? TOKENS.teal
                      : sp.status === "IN_PROGRESS"
                      ? TOKENS.blue
                      : TOKENS.slate,
                }}
              >
                {sp.status}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${TOKENS.hair}`, paddingTop: 16 }}>
          <div style={{ fontSize: 12, color: TOKENS.slate }}>
            🔒 Authenticated client session for <strong>Apex FinTech Solutions</strong>.
          </div>
          <Button onClick={onClose}>Close Portal</Button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- System Status & SLA Telemetry Modal ---------------------------- */

function SystemStatusModal({ isOpen, onClose }) {
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("Just now (Live edge streaming)");
  const [alertEmail, setAlertEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [hoveredDay, setHoveredDay] = useState(null);

  if (!isOpen) return null;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      const d = new Date();
      setLastUpdated(`Refreshed at ${d.toLocaleTimeString()}`);
    }, 500);
  };

  const edgeNodes = [
    { id: "HYD-1", city: "Hyderabad, India", role: "Primary Cloud Datacenter", ping: isRefreshing ? "..." : "12ms", p99: "22ms", uptime: "99.998%", ssl: "TLS 1.3 / Grade A+", status: "Healthy" },
    { id: "SIN-1", city: "Singapore, APAC", role: "Asia-Pacific Edge PoP", ping: isRefreshing ? "..." : "38ms", p99: "49ms", uptime: "99.995%", ssl: "TLS 1.3 / Grade A+", status: "Healthy" },
    { id: "FRA-1", city: "Frankfurt, Germany", role: "Europe Central Edge", ping: isRefreshing ? "..." : "114ms", p99: "132ms", uptime: "99.992%", ssl: "TLS 1.3 / Grade A+", status: "Healthy" },
    { id: "IAD-1", city: "US-East (Virginia)", role: "Americas Edge Gateway", ping: isRefreshing ? "..." : "158ms", p99: "174ms", uptime: "99.991%", ssl: "TLS 1.3 / Grade A+", status: "Healthy" },
  ];

  const subsystems = [
    { name: "Global Ingress API Gateway", stack: "Kong & Envoy L7 Proxy", uptime: "100.00%", latency: "8.4ms", status: "Operational", desc: "Edge routing, rate token buckets & mTLS termination" },
    { name: "Microservices Core Fleet", stack: "Go 1.22 & Node.js on Kubernetes", uptime: "99.99%", latency: "16.1ms", status: "Operational", desc: "Stateless container pods auto-scaled across multi-AZ nodes" },
    { name: "Distributed Transaction Database", stack: "PostgreSQL Multi-AZ + PgBouncer", uptime: "99.99%", latency: "2.8ms write", status: "Operational", desc: "Write-ahead streaming replication & sub-millisecond connection pooling" },
    { name: "In-Memory Cache Cluster", stack: "Redis 7.2 Multi-Node Cluster", uptime: "100.00%", latency: "0.38ms", status: "Operational", desc: "Distributed session caching and instant KV retrieval" },
    { name: "Event Streaming Mesh", stack: "Apache Kafka 3.6 Event Mesh", uptime: "99.99%", latency: "0 consumer lag", status: "Operational", desc: "Zero data-loss financial & telemetry log bus" },
    { name: "Vector AI Inference Fleet", stack: "Qdrant Vector DB + Dedicated GPUs", uptime: "99.98%", latency: "134ms p95", status: "Operational", desc: "Private enterprise embeddings & semantic RAG retrieval" },
    { name: "Edge CDN & Enterprise WAF", stack: "Cloudflare Enterprise + DDoS Shield", uptime: "100.00%", latency: "Instant", status: "Operational", desc: "L3/L4/L7 threat mitigation and global static asset edge cache" },
    { name: "GitOps CI/CD Delivery Fleet", stack: "ArgoCD & GitHub Enterprise Runners", uptime: "99.96%", latency: "3m 10s build", status: "Operational", desc: "Continuous delivery with automated canary verification" },
  ];

  const filteredNodes = selectedRegion === "all" ? edgeNodes : edgeNodes.filter((n) => n.id === selectedRegion);

  const incidents = [
    {
      id: "INC-2026-0929",
      title: "Automated Kafka Consumer Partition Rebalance",
      status: "Resolved",
      time: "Yesterday, 14:22 UTC",
      duration: "42 seconds",
      impact: "Zero customer impact. Autonomous pod self-healing initiated rebalance without message loss.",
    },
    {
      id: "MNT-2026-1004",
      title: "Rolling Worker Node OS Kernel & Security Patching",
      status: "Scheduled",
      time: "Upcoming Sunday, 02:00 - 02:15 UTC",
      duration: "15 minutes",
      impact: "Zero downtime. Pods automatically cordoned and drained across secondary AZ nodes.",
    },
  ];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15, 23, 42, 0.72)",
        backdropFilter: "blur(14px)",
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
          width: "100%",
          maxWidth: 960,
          maxHeight: "90vh",
          background: TOKENS.panel,
          border: `1px solid ${TOKENS.hair}`,
          borderRadius: 14,
          boxShadow: "0 24px 60px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: `1px solid ${TOKENS.hair}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: TOKENS.panelAlt,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 20 }}>🟢</span>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: TOKENS.paper }}>
                System Telemetry & Operational Health
              </h2>
              <span
                style={{
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "#10B981",
                  fontSize: 10.5,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: 4,
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                }}
              >
                99.994% SLA ROLLING
              </span>
            </div>
            <div style={{ fontSize: 12, color: TOKENS.slate, marginTop: 4 }}>
              Real-time infrastructure heartbeat across global multi-region edge gateways and distributed data layers.
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={handleRefresh}
              style={{
                background: TOKENS.panel,
                border: `1px solid ${TOKENS.hair}`,
                borderRadius: 6,
                padding: "6px 12px",
                fontSize: 11.5,
                fontFamily: "'JetBrains Mono', monospace",
                color: TOKENS.paper,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span>{isRefreshing ? "⏳" : "🔄"}</span>
              <span>{isRefreshing ? "Pinging Nodes..." : "Refresh Telemetry"}</span>
            </button>
            <button
              onClick={onClose}
              style={{
                background: "transparent",
                border: "none",
                fontSize: 22,
                cursor: "pointer",
                color: TOKENS.slate,
                padding: "0 6px",
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Main Status Hero */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(13, 148, 136, 0.06) 100%)",
              border: "1px solid rgba(16, 185, 129, 0.25)",
              borderRadius: 10,
              padding: "16px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "rgba(16, 185, 129, 0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  boxShadow: "0 0 16px rgba(16, 185, 129, 0.35)",
                }}
              >
                ✓
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#10B981" }}>
                  All Production Systems Fully Operational
                </div>
                <div style={{ fontSize: 12, color: TOKENS.slate, marginTop: 2 }}>
                  All 4 global edge nodes, database clusters, and inference pipelines are reporting normal operating parameters.
                </div>
              </div>
            </div>
            <div style={{ textAlign: "right", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate }}>
              <div>STATUS: <strong style={{ color: "#10B981" }}>HEALTHY</strong></div>
              <div style={{ marginTop: 2 }}>{lastUpdated}</div>
            </div>
          </div>

          {/* 90-Day Rolling Uptime Bar */}
          <div style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 10, padding: "16px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: TOKENS.paper }}>
                90-Day Rolling Uptime History
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#10B981", fontWeight: 700 }}>
                99.994% Availability
              </div>
            </div>

            {/* 90 Bars */}
            <div style={{ display: "flex", gap: 3, alignItems: "center", height: 32, marginBottom: 8 }}>
              {Array.from({ length: 90 }).map((_, i) => {
                const isMaintenanceDay = i === 62;
                return (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredDay(90 - i)}
                    onMouseLeave={() => setHoveredDay(null)}
                    style={{
                      flex: 1,
                      height: "100%",
                      borderRadius: 2,
                      background: isMaintenanceDay ? "#F59E0B" : "#10B981",
                      cursor: "pointer",
                      opacity: hoveredDay === 90 - i ? 1 : 0.85,
                      transition: "opacity 0.15s ease",
                    }}
                    title={isMaintenanceDay ? `Day ${90 - i}: 99.98% (Scheduled Zero-Downtime Migration)` : `Day ${90 - i}: 100.0% Uptime`}
                  />
                );
              })}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, color: TOKENS.slate, fontFamily: "'JetBrains Mono', monospace" }}>
              <span>90 Days Ago</span>
              <span>{hoveredDay ? `Viewing Day -${hoveredDay}: ${hoveredDay === 28 ? "99.98% (Maintenance)" : "100.0% Operational"}` : "Hover a bar for telemetry"}</span>
              <span>Today (100.0%)</span>
            </div>
          </div>

          {/* Global Edge Node Health & Latency */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: TOKENS.paper }}>
                Global Edge Gateways & Latency
              </div>
              {/* Region filter */}
              <div style={{ display: "flex", gap: 4 }}>
                {["all", "HYD-1", "SIN-1", "FRA-1", "IAD-1"].map((reg) => (
                  <button
                    key={reg}
                    onClick={() => setSelectedRegion(reg)}
                    style={{
                      background: selectedRegion === reg ? TOKENS.blue : "transparent",
                      color: selectedRegion === reg ? "#FFFFFF" : TOKENS.slate,
                      border: `1px solid ${selectedRegion === reg ? TOKENS.blue : TOKENS.hair}`,
                      borderRadius: 4,
                      padding: "3px 8px",
                      fontSize: 10.5,
                      fontFamily: "'JetBrains Mono', monospace",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    {reg.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
              {filteredNodes.map((node) => (
                <div
                  key={node.id}
                  style={{
                    background: TOKENS.panelAlt,
                    border: `1px solid ${TOKENS.hair}`,
                    borderRadius: 8,
                    padding: "14px 16px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: TOKENS.paper }}>
                      {node.id}
                    </span>
                    <span style={{ fontSize: 10, color: "#10B981", fontWeight: 700, background: "rgba(16, 185, 129, 0.15)", padding: "2px 6px", borderRadius: 4 }}>
                      ● {node.status}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: TOKENS.paper, marginBottom: 2 }}>{node.city}</div>
                  <div style={{ fontSize: 11, color: TOKENS.slate, marginBottom: 10 }}>{node.role}</div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>
                    <div>
                      <span style={{ color: TOKENS.slate }}>Ping: </span>
                      <strong style={{ color: TOKENS.paper }}>{node.ping}</strong>
                    </div>
                    <div>
                      <span style={{ color: TOKENS.slate }}>p99: </span>
                      <strong style={{ color: TOKENS.paper }}>{node.p99}</strong>
                    </div>
                    <div>
                      <span style={{ color: TOKENS.slate }}>SLA: </span>
                      <strong style={{ color: "#10B981" }}>{node.uptime}</strong>
                    </div>
                    <div>
                      <span style={{ color: TOKENS.slate }}>Security: </span>
                      <strong style={{ color: TOKENS.paper }}>TLS 1.3</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Infrastructure Subsystems */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: TOKENS.paper, marginBottom: 12 }}>
              Core Infrastructure Subsystems
            </div>
            <div style={{ border: `1px solid ${TOKENS.hair}`, borderRadius: 8, overflow: "hidden" }}>
              {subsystems.map((sub, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr",
                    padding: "12px 16px",
                    background: idx % 2 === 0 ? TOKENS.panel : TOKENS.panelAlt,
                    borderBottom: idx === subsystems.length - 1 ? "none" : `1px solid ${TOKENS.hair}`,
                    alignItems: "center",
                    gap: 12,
                    fontSize: 12,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: TOKENS.paper }}>{sub.name}</div>
                    <div style={{ fontSize: 10.5, color: TOKENS.slate, marginTop: 2 }}>{sub.desc}</div>
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate, fontSize: 11 }}>
                    {sub.stack}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", color: TOKENS.paper, fontSize: 11 }}>
                    ⚡ {sub.latency}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "#10B981", fontWeight: 700, fontSize: 11 }}>
                    {sub.uptime}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: 10.5, color: "#10B981", background: "rgba(16, 185, 129, 0.12)", padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>
                      ● {sub.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Incident & Maintenance Feed */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: TOKENS.paper, marginBottom: 12 }}>
              Incident & Maintenance Log
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {incidents.map((inc) => (
                <div
                  key={inc.id}
                  style={{
                    background: TOKENS.panelAlt,
                    border: `1px solid ${TOKENS.hair}`,
                    borderRadius: 8,
                    padding: "14px 16px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span
                        style={{
                          fontSize: 10,
                          fontFamily: "'JetBrains Mono', monospace",
                          fontWeight: 700,
                          padding: "2px 6px",
                          borderRadius: 4,
                          background: inc.status === "Resolved" ? "rgba(16, 185, 129, 0.15)" : "rgba(37, 99, 235, 0.15)",
                          color: inc.status === "Resolved" ? "#10B981" : TOKENS.blue,
                        }}
                      >
                        {inc.status.toUpperCase()}
                      </span>
                      <strong style={{ fontSize: 13, color: TOKENS.paper }}>{inc.title}</strong>
                    </div>
                    <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate }}>
                      {inc.time}
                    </span>
                  </div>
                  <p style={{ margin: "0 0 6px", fontSize: 12, color: TOKENS.slate, lineHeight: 1.5 }}>
                    {inc.impact}
                  </p>
                  <div style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate }}>
                    Reference ID: {inc.id} • Duration: {inc.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SLA Commitment Banner & Alert Subscription */}
          <div
            style={{
              background: `linear-gradient(135deg, ${TOKENS.panelAlt} 0%, ${TOKENS.panel} 100%)`,
              border: `1px solid ${TOKENS.hair}`,
              borderRadius: 10,
              padding: "18px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div style={{ maxWidth: 460 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: TOKENS.paper, marginBottom: 4 }}>
                🛡️ 99.99% Financial SLA Backing
              </div>
              <div style={{ fontSize: 11.5, color: TOKENS.slate, lineHeight: 1.5 }}>
                Our client contracts incorporate automated 25% sprint credits if monthly multi-AZ availability dips below 99.9%. Monitored continuously via third-party synthetic probes.
              </div>
            </div>

            <div style={{ minWidth: 280 }}>
              {subscribed ? (
                <div style={{ color: "#10B981", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>
                  ✓ Subscribed to real-time status alerts!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: "flex", gap: 6 }}>
                  <input
                    type="email"
                    required
                    placeholder="Enter email for SLA alerts..."
                    value={alertEmail}
                    onChange={(e) => setAlertEmail(e.target.value)}
                    style={{
                      background: TOKENS.panel,
                      border: `1px solid ${TOKENS.hair}`,
                      borderRadius: 6,
                      padding: "8px 10px",
                      fontSize: 11.5,
                      color: TOKENS.paper,
                      width: 190,
                    }}
                  />
                  <Button type="submit" style={{ padding: "8px 12px", fontSize: 11.5 }}>
                    Subscribe
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: "14px 24px",
            borderTop: `1px solid ${TOKENS.hair}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: TOKENS.panelAlt,
          }}
        >
          <div style={{ fontSize: 11, color: TOKENS.slate, fontFamily: "'JetBrains Mono', monospace" }}>
            Autonomous Incident Monitoring by Prometheus & OpenTelemetry
          </div>
          <Button onClick={onClose} variant="secondary" style={{ padding: "7px 16px", fontSize: 12 }}>
            Close Telemetry View
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- Enhanced Product Demo Modal with Live Interactive Sandbox ---------------------------- */

function ProductDemoModal() {
  return null;
}

/* ---------------------------- Page 1: HomePage ---------------------------- */

function HomePage({ go, currency, openTracker }) {
  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          minHeight: "88vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 20px 80px",
          overflow: "hidden",
          background: `radial-gradient(circle at 50% 15%, ${TOKENS.blue}0d 0%, transparent 60%)`,
        }}
      >
        <HeroThreeCanvas />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 980, margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: TOKENS.badgeBg,
              border: `1px solid ${TOKENS.blue}33`,
              borderRadius: 999,
              padding: "6px 16px",
              marginBottom: 20,
            }}
          >
            <span style={{ color: TOKENS.teal, fontSize: 11 }}>●</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: TOKENS.blue, letterSpacing: "0.04em" }}>
              GLOBAL SOFTWARE ENGINEERING & ENTERPRISE DIGITAL SOLUTIONS
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(34px, 5.5vw, 62px)",
              fontWeight: 800,
              color: TOKENS.paper,
              letterSpacing: "-0.03em",
              lineHeight: 1.12,
              margin: "0 0 20px",
            }}
          >
            Engineering World-Class <span style={{ color: TOKENS.blue }}>Web & Mobile Platforms</span>, Scalable Cloud Backends & AI Systems.
          </h1>

          <p
            style={{
              fontSize: "clamp(15px, 2vw, 19px)",
              color: TOKENS.slate,
              lineHeight: 1.6,
              maxWidth: 760,
              margin: "0 auto 36px",
            }}
          >
            We partner with global enterprises and high-growth scale-ups to architect, build, and deploy mission-critical software solutions with uncompromised engineering rigor and zero technical debt.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Button onClick={() => go("services")} style={{ padding: "13px 26px", fontSize: 15 }}>
              Explore Capabilities →
            </Button>
            <Button onClick={() => go("industries")} variant="outline" style={{ padding: "13px 24px", fontSize: 15 }}>
              🏢 Industries We Transform
            </Button>
            <Button onClick={() => go("contact")} variant="secondary" style={{ padding: "13px 24px", fontSize: 15 }}>
              Schedule Consultation
            </Button>
          </div>

          {/* Key Metric Badges */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 16,
              marginTop: 60,
              background: TOKENS.panel,
              border: `1px solid ${TOKENS.hair}`,
              borderRadius: 12,
              padding: "20px 24px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
            }}
          >
            {[
              { val: "120+", label: "Completed Enterprise Systems" },
              { label: "Production SLA Reliability", val: "99.99%" },
              { label: "Senior Solutions Engineers", val: "50+" },
              { label: "Incident & Architecture SLA", val: "< 2 Hours" },
            ].map((st, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: TOKENS.blue }}>{st.val}</div>
                <div style={{ fontSize: 11.5, color: TOKENS.slate, marginTop: 4 }}>{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core IT Engineering Services Grid */}
      <section style={{ padding: "80px 20px", maxWidth: 1280, margin: "0 auto" }}>
        <SectionHeading
          badge="Full-Stack Capabilities"
          title="Enterprise Software Engineering Capabilities"
          subtitle="From cloud-native architecture to continuous delivery, our senior developers engineer resilient, high-concurrency systems tailored to your business roadmap."
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {IT_SERVICES.map((s) => (
            <div
              key={s.id}
              style={{
                background: TOKENS.panel,
                border: `1px solid ${TOKENS.hair}`,
                borderRadius: 12,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                transition: "all 0.2s ease",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <span style={{ fontSize: 32 }}>{s.icon}</span>
                  <span style={{ background: TOKENS.badgeBg, color: TOKENS.blue, fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, padding: "2px 8px", borderRadius: 4 }}>
                    {s.tag}
                  </span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: TOKENS.paper, margin: "0 0 8px" }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: TOKENS.slate, lineHeight: 1.5, margin: "0 0 16px" }}>{s.shortDesc}</p>

                {/* Tech Pills */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                  {s.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: TOKENS.panelAlt,
                        border: `1px solid ${TOKENS.hair}`,
                        borderRadius: 4,
                        padding: "2px 7px",
                        fontSize: 11,
                        fontFamily: "'JetBrains Mono', monospace",
                        color: TOKENS.paper,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: `1px solid ${TOKENS.hair}`, paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 10, color: TOKENS.slate }}>ESTIMATED STARTING BUDGET</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: TOKENS.paper }}>{formatPrice(s.estInr, currency)}</div>
                </div>
                <Button onClick={() => go("services")} style={{ padding: "6px 12px", fontSize: 12 }}>
                  Practice Details →
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Strategic Industry Verticals Showcase */}
      <section style={{ padding: "80px 20px", background: TOKENS.panelAlt }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading
            badge="Strategic Verticals"
            title="Industries We Transform Through Software"
            subtitle="Domain-specific architectures engineered for the strict regulatory compliance, high concurrency, and data security demanded by global enterprises."
          />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 24 }}>
            {INDUSTRY_VERTICALS.map((ind) => (
              <div
                key={ind.id}
                style={{
                  background: TOKENS.panel,
                  border: `1px solid ${TOKENS.hair}`,
                  borderRadius: 14,
                  padding: 26,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <span style={{ fontSize: 34 }}>{ind.icon}</span>
                    <span style={{ background: TOKENS.badgeBg, color: TOKENS.blue, fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, padding: "3px 8px", borderRadius: 4 }}>
                      {ind.badge}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 19, fontWeight: 700, color: TOKENS.paper, margin: "0 0 6px" }}>{ind.name}</h3>
                  <div style={{ fontSize: 12, fontWeight: 600, color: TOKENS.teal, marginBottom: 10 }}>{ind.tagline}</div>
                  <p style={{ fontSize: 13, color: TOKENS.slate, lineHeight: 1.5, margin: "0 0 16px" }}>{ind.shortDesc}</p>

                  {/* Metrics */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, background: TOKENS.panelAlt, borderRadius: 8, padding: 12, marginBottom: 16 }}>
                    {ind.metrics.map((m, mi) => (
                      <div key={mi} style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 13, fontWeight: 800, color: TOKENS.blue }}>{m.val}</div>
                        <div style={{ fontSize: 9.5, color: TOKENS.slate, marginTop: 2 }}>{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Capabilities checklist */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
                    {ind.capabilities.slice(0, 2).map((cap, ci) => (
                      <div key={ci} style={{ fontSize: 11.5, color: TOKENS.paper, display: "flex", alignItems: "flex-start", gap: 6 }}>
                        <span style={{ color: TOKENS.teal, fontWeight: 700 }}>✓</span>
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ borderTop: `1px solid ${TOKENS.hair}`, paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                    {ind.techStack.slice(0, 3).map((t, ti) => (
                      <span key={ti} style={{ fontSize: 10, background: TOKENS.panelAlt, padding: "2px 6px", borderRadius: 4, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <Button onClick={() => go("industries")} style={{ padding: "6px 12px", fontSize: 12 }}>
                    Explore Vertical →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Engagement & Delivery Models */}
      <section style={{ padding: "80px 20px", maxWidth: 1280, margin: "0 auto" }}>
        <SectionHeading
          badge="How We Deliver"
          title="Enterprise Engagement & Delivery Models"
          subtitle="Flexible collaboration structures designed to seamlessly align with your enterprise roadmap, sprint velocity, and governance standards."
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
          {ENGAGEMENT_MODELS.map((model) => (
            <div
              key={model.id}
              style={{
                background: TOKENS.panel,
                border: `1px solid ${TOKENS.hair}`,
                borderRadius: 14,
                padding: 26,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <span style={{ fontSize: 32 }}>{model.icon}</span>
                  <span style={{ background: TOKENS.badgeBg, color: TOKENS.blue, fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, padding: "3px 8px", borderRadius: 4 }}>
                    {model.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: 19, fontWeight: 700, color: TOKENS.paper, margin: "0 0 8px" }}>{model.name}</h3>
                <p style={{ fontSize: 13, color: TOKENS.slate, lineHeight: 1.5, margin: "0 0 14px" }}>{model.desc}</p>
                <div style={{ background: TOKENS.panelAlt, borderRadius: 6, padding: "8px 10px", fontSize: 11.5, color: TOKENS.paper, marginBottom: 16 }}>
                  <strong>Best For:</strong> {model.bestFor}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 18 }}>
                  {model.highlights.map((h, hi) => (
                    <div key={hi} style={{ fontSize: 11.5, color: TOKENS.paper, display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ color: TOKENS.teal }}>✓</span> {h}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: `1px solid ${TOKENS.hair}`, paddingTop: 14 }}>
                <Button onClick={() => go("contact")} style={{ width: "100%", padding: "10px", fontSize: 13 }}>
                  Consult on {model.name} →
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Matrix */}
      <section style={{ padding: "80px 20px", background: TOKENS.panelAlt }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading
            badge="Modern Ecosystem"
            title="Battle-Tested Enterprise Technology Stack"
            subtitle="We select the right tools for your specific business requirements, ensuring zero technical debt, security, and high maintainability."
          />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {TECH_CATEGORIES.map((cat, ci) => (
              <div
                key={ci}
                style={{
                  background: TOKENS.panel,
                  border: `1px solid ${TOKENS.hair}`,
                  borderRadius: 10,
                  padding: 18,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${TOKENS.hair}` }}>
                  <span>{cat.icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: TOKENS.paper }}>{cat.category}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {cat.items.map((item, ii) => (
                    <div key={ii}>
                      <div style={{ fontSize: 12.5, fontWeight: 600, color: TOKENS.paper }}>{item.name}</div>
                      <div style={{ fontSize: 10.5, color: TOKENS.slate }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section style={{ padding: "80px 20px", maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeading
          badge="Enterprise Impact"
          title="Trusted by Global Technology Leaders"
          subtitle="See how our engineering teams have helped founders and CTOs ship world-class software platforms."
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              style={{
                background: TOKENS.panel,
                border: `1px solid ${TOKENS.hair}`,
                borderRadius: 12,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
              }}
            >
              <div>
                <div style={{ color: TOKENS.brass, fontSize: 16, marginBottom: 12 }}>{"★".repeat(t.rating)}</div>
                <p style={{ fontSize: 13.5, color: TOKENS.paper, lineHeight: 1.6, margin: "0 0 20px", fontStyle: "italic" }}>
                  "{t.quote}"
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, borderTop: `1px solid ${TOKENS.hair}`, paddingTop: 14 }}>
                <span style={{ fontSize: 28 }}>{t.avatar}</span>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: TOKENS.paper }}>{t.author}</div>
                  <div style={{ fontSize: 11.5, color: TOKENS.slate }}>{t.role} • <strong>{t.company}</strong></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Intake CTA Banner */}
      <section style={{ padding: "80px 20px", maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            background: `linear-gradient(135deg, ${TOKENS.blueDark} 0%, #1E3A8A 100%)`,
            color: "#FFFFFF",
            borderRadius: 16,
            padding: "50px 36px",
            textAlign: "center",
            boxShadow: "0 20px 50px rgba(37, 99, 235, 0.25)",
          }}
        >
          <h2 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            Ready to Accelerate Your Enterprise Software Roadmap?
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", maxWidth: 640, margin: "0 auto 30px", lineHeight: 1.6 }}>
            Connect with our Senior Solutions Architects today. Receive a comprehensive technical scope proposal and estimated development sprints within 12 business hours under mutual NDA.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => go("rfq-wizard")}
              style={{
                background: "#FFFFFF",
                color: TOKENS.blueDark,
                border: "none",
                borderRadius: 8,
                padding: "12px 24px",
                fontSize: 14,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Start Project Planner →
            </button>
            <button
              onClick={() => go("contact")}
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "#FFFFFF",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: 8,
                padding: "12px 24px",
                fontSize: 14,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Consult an Architect →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------------------- Page 2: ServicesPage ---------------------------- */

function ServicesPage({ go, currency }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Enterprise ROI & Dev Pod TCO Calculator State
  const [roiTeamSize, setRoiTeamSize] = useState(4);
  const [roiSalaryLakhs, setRoiSalaryLakhs] = useState(24);
  const [roiMonths, setRoiMonths] = useState(6);
  const [roiSpecialty, setRoiSpecialty] = useState("Full-Stack Web & Next.js");
  const [downloadedTco, setDownloadedTco] = useState(false);

  // Computations
  const inHouseMonthlyBase = (roiTeamSize * (roiSalaryLakhs * 100000)) / 12;
  const inHouseTotalSalary = inHouseMonthlyBase * roiMonths;
  const inHouseOverheads = inHouseTotalSalary * 0.28; // benefits, equipment, recruitment fees
  const inHouseHiringDelayCost = inHouseMonthlyBase * 2.5; // 2.5 months lost recruiting & onboarding
  const totalInHouseTCO = Math.round(inHouseTotalSalary + inHouseOverheads + inHouseHiringDelayCost);

  const podMonthlyRatePerHead = 145000;
  const abhimanyuTotalCost = Math.round(roiTeamSize * podMonthlyRatePerHead * roiMonths);
  const netSavings = Math.max(0, totalInHouseTCO - abhimanyuTotalCost);
  const savingsPercent = Math.round((netSavings / totalInHouseTCO) * 100);

  const categories = ["All", "Web Engineering", "Frontend Engineering", "Backend & Systems", "Mobile Engineering", "Turnkey Engineering", "Cloud & Infrastructure", "Artificial Intelligence", "Quality & Security"];

  const filtered = selectedCategory === "All"
    ? IT_SERVICES
    : IT_SERVICES.filter((s) => s.category === selectedCategory);

  return (
    <div style={{ padding: "40px 20px 80px", maxWidth: 1280, margin: "0 auto" }}>
      <SectionHeading
        badge="Full-Stack Capabilities"
        title="Enterprise IT Engineering Services"
        subtitle="Specialized development teams delivering web portals, native Android apps, microservices, cloud DevOps, and AI systems."
      />

      {/* Filter Tabs */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 36 }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              background: selectedCategory === cat ? TOKENS.blue : TOKENS.panel,
              color: selectedCategory === cat ? "#FFFFFF" : TOKENS.slate,
              border: `1px solid ${selectedCategory === cat ? TOKENS.blue : TOKENS.hair}`,
              borderRadius: 6,
              padding: "7px 14px",
              fontSize: 12.5,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Detailed Services Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
        {filtered.map((s) => (
          <div
            key={s.id}
            style={{
              background: TOKENS.panel,
              border: `1px solid ${TOKENS.hair}`,
              borderRadius: 14,
              padding: 28,
              boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14, marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 36 }}>{s.icon}</span>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <h3 style={{ fontSize: 21, fontWeight: 700, color: TOKENS.paper, margin: 0 }}>{s.title}</h3>
                    <span style={{ background: TOKENS.badgeBg, color: TOKENS.blue, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, padding: "2px 8px", borderRadius: 4 }}>
                      {s.tag}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: TOKENS.slate, marginTop: 4 }}>{s.category} • Timeline: <strong>{s.timeline}</strong></div>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: TOKENS.slate }}>ESTIMATED STARTING BUDGET</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: TOKENS.blue }}>{formatPrice(s.estInr, currency)}</div>
              </div>
            </div>

            <p style={{ fontSize: 14, color: TOKENS.slate, lineHeight: 1.6, marginBottom: 20 }}>
              {s.shortDesc}
            </p>

            {/* Features & Deliverables Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginBottom: 20 }}>
              <div style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: 16 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: TOKENS.slate, marginBottom: 8 }}>
                  WHAT WE DELIVER
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {s.features.map((feat, fi) => (
                    <div key={fi} style={{ fontSize: 12.5, color: TOKENS.paper, display: "flex", alignItems: "flex-start", gap: 6 }}>
                      <span style={{ color: TOKENS.teal, fontWeight: 700 }}>✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: 16, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: TOKENS.slate, marginBottom: 8 }}>
                    TECHNOLOGY STACK
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                    {s.techStack.map((tech, ti) => (
                      <span key={ti} style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 4, padding: "3px 8px", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.paper }}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: TOKENS.slate, marginBottom: 4 }}>
                    CORE DELIVERABLES
                  </div>
                  <div style={{ fontSize: 12.5, color: TOKENS.paper }}>{s.deliverables}</div>
                </div>

                <div style={{ marginTop: 16 }}>
                  <Button onClick={() => go("rfq-wizard")} style={{ width: "100%", padding: "9px" }}>
                    Start Requirement →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tech Stack Decision Matrix & Benchmarks */}
      <div style={{ marginTop: 60, background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 14, padding: 28, boxShadow: "0 4px 16px rgba(0,0,0,0.03)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20 }}>⚖️</span>
              <h3 style={{ fontSize: 19, fontWeight: 700, color: TOKENS.paper, margin: 0 }}>
                Enterprise Tech Stack Decision Matrix & Benchmarks
              </h3>
              <span style={{ background: TOKENS.badgeBg, color: TOKENS.blue, fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, padding: "2px 8px", borderRadius: 4 }}>
                PRODUCTION COMPARISONS
              </span>
            </div>
            <div style={{ fontSize: 12.5, color: TOKENS.slate, marginTop: 4 }}>
              How our Senior Solutions Architects evaluate and choose the optimal architectural stack for enterprise software systems.
            </div>
          </div>
          <Button onClick={() => go("contact")} style={{ padding: "8px 16px", fontSize: 12.5 }}>
            Book Architecture Review →
          </Button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {[
            {
              domain: "Web Tier: Next.js 15 vs React SPA",
              choice1: { name: "Next.js 15 Edge SSR", pros: "Sub-second FCP, Edge Caching, Perfect SEO (100)", best: "Public SaaS, E-Commerce, Dashboards" },
              choice2: { name: "React 18 SPA (Vite)", pros: "Lower server overhead, simple static S3 hosting", best: "Internal tooling, offline-focused web apps" },
              winner: "Next.js 15 recommended for public portals and organic search.",
            },
            {
              domain: "Mobile Tier: Kotlin Native vs Flutter",
              choice1: { name: "Native Android (Kotlin & Compose)", pros: "Direct hardware BLE, 60fps native feel, zero bridge overhead", best: "FinTech, IoT controllers, Enterprise Android apps" },
              choice2: { name: "Flutter Cross-Platform", pros: "Single Dart codebase for Android + iOS, rapid time-to-market", best: "Early-stage MVPs, uniform brand apps" },
              winner: "Kotlin Native for maximum performance; Flutter for budget MVPs.",
            },
            {
              domain: "Backend Tier: Go vs Node.js Fastify",
              choice1: { name: "Go (Golang) Microservices", pros: "85,000+ QPS, 14MB RAM footprint, strict compile-time types", best: "High-frequency streaming, payment gateways, IoT" },
              choice2: { name: "Node.js (Fastify) Event Services", pros: "Unmatched JS ecosystem, rapid feature velocity", best: "B2B SaaS, GraphQL federations, CRUD portals" },
              winner: "Go for concurrency bottlenecks; Node.js for rapid product velocity.",
            },
            {
              domain: "Data Tier: PostgreSQL vs MongoDB",
              choice1: { name: "PostgreSQL (Sharded + RLS)", pros: "Strict ACID safety, PgBouncer, Multi-Tenant Row Security", best: "FinTech, ERP ledgers, Healthcare records" },
              choice2: { name: "MongoDB Document DB", pros: "Polymorphic schemas, rapid document nesting", best: "Unstructured content catalogs, raw telemetry logs" },
              winner: "PostgreSQL is our default standard for mission-critical enterprise systems.",
            },
          ].map((item, idx) => (
            <div key={idx} style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 10, padding: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: TOKENS.paper, marginBottom: 10 }}>{item.domain}</div>
              <div style={{ marginBottom: 10, fontSize: 12 }}>
                <div style={{ fontWeight: 600, color: TOKENS.blue }}>Option A: {item.choice1.name}</div>
                <div style={{ color: TOKENS.slate, fontSize: 11, marginTop: 2 }}>{item.choice1.pros}</div>
                <div style={{ color: TOKENS.paper, fontSize: 10.5, marginTop: 1 }}>Best For: <em>{item.choice1.best}</em></div>
              </div>
              <div style={{ marginBottom: 12, fontSize: 12 }}>
                <div style={{ fontWeight: 600, color: TOKENS.teal }}>Option B: {item.choice2.name}</div>
                <div style={{ color: TOKENS.slate, fontSize: 11, marginTop: 2 }}>{item.choice2.pros}</div>
                <div style={{ color: TOKENS.paper, fontSize: 10.5, marginTop: 1 }}>Best For: <em>{item.choice2.best}</em></div>
              </div>
              <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "8px 10px", fontSize: 11, color: TOKENS.brass, fontWeight: 600 }}>
                💡 Recommendation: {item.winner}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enterprise ROI & Dev Pod TCO Calculator */}
      <div
        style={{
          background: TOKENS.panel,
          border: `1px solid ${TOKENS.hair}`,
          borderRadius: 14,
          padding: 28,
          marginTop: 48,
          boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14, marginBottom: 24 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 22 }}>💰</span>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: TOKENS.paper }}>
                Enterprise ROI & Dev Pod TCO Calculator
              </h3>
              <span style={{ background: "rgba(16,185,129,0.12)", color: "#10B981", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, padding: "2px 8px", borderRadius: 4 }}>
                ESTIMATED ~{savingsPercent}% SAVINGS
              </span>
            </div>
            <p style={{ margin: "6px 0 0", fontSize: 13, color: TOKENS.slate }}>
              Benchmark the true Total Cost of Ownership (TCO) of recruiting an in-house engineering team vs. deploying a turnkey Abhimanyu Dev Pod.
            </p>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <Button
              onClick={() => {
                setDownloadedTco(true);
                setTimeout(() => setDownloadedTco(false), 2500);
              }}
              variant="secondary"
              style={{ padding: "8px 14px", fontSize: 12 }}
            >
              {downloadedTco ? "✓ Business Case Exported" : "📥 Export Business Case (.csv)"}
            </Button>
            <Button onClick={() => go("rfq-wizard")} style={{ padding: "8px 16px", fontSize: 12 }}>
              Engage This Pod →
            </Button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 28, alignItems: "start" }}>
          {/* Controls Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 10, padding: 22 }}>
            {/* Team Size Slider */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: TOKENS.paper }}>
                  1. Dedicated Senior Engineers in Pod
                </label>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 700, color: TOKENS.blue }}>
                  {roiTeamSize} Engineers
                </span>
              </div>
              <input
                type="range"
                min={2}
                max={12}
                step={1}
                value={roiTeamSize}
                onChange={(e) => setRoiTeamSize(Number(e.target.value))}
                style={{ width: "100%", accentColor: TOKENS.blue, cursor: "pointer" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, color: TOKENS.slate, fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>
                <span>2 Devs (MVP Pod)</span>
                <span>6 Devs (Growth Pod)</span>
                <span>12 Devs (Enterprise Fleet)</span>
              </div>
            </div>

            {/* In-House Salary Slider */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: TOKENS.paper }}>
                  2. Benchmark In-House Senior Engineer CTC (Annual)
                </label>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 700, color: TOKENS.blue }}>
                  ₹{roiSalaryLakhs} Lakhs / yr
                </span>
              </div>
              <input
                type="range"
                min={12}
                max={45}
                step={1}
                value={roiSalaryLakhs}
                onChange={(e) => setRoiSalaryLakhs(Number(e.target.value))}
                style={{ width: "100%", accentColor: TOKENS.blue, cursor: "pointer" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, color: TOKENS.slate, fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>
                <span>₹12L (Tier-2 Hub)</span>
                <span>₹24L (Metro Average)</span>
                <span>₹45L (Principal Staff)</span>
              </div>
            </div>

            {/* Project Horizon Slider */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: TOKENS.paper }}>
                  3. Project Delivery Horizon
                </label>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 700, color: TOKENS.blue }}>
                  {roiMonths} Months
                </span>
              </div>
              <input
                type="range"
                min={3}
                max={12}
                step={1}
                value={roiMonths}
                onChange={(e) => setRoiMonths(Number(e.target.value))}
                style={{ width: "100%", accentColor: TOKENS.blue, cursor: "pointer" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, color: TOKENS.slate, fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>
                <span>3 Months (Rapid MVP)</span>
                <span>6 Months (Core Product)</span>
                <span>12 Months (Turnkey SaaS)</span>
              </div>
            </div>

            {/* Pod Specialization Pills */}
            <div>
              <label style={{ fontSize: 12.5, fontWeight: 600, color: TOKENS.paper, display: "block", marginBottom: 8 }}>
                4. Pod Technical Specialization
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  "Full-Stack Web & Next.js",
                  "Native Android & Mobile",
                  "Distributed Backend & APIs",
                  "Enterprise AI & Cloud SRE",
                ].map((spec) => (
                  <button
                    type="button"
                    key={spec}
                    onClick={() => setRoiSpecialty(spec)}
                    style={{
                      background: roiSpecialty === spec ? TOKENS.badgeBg : TOKENS.panel,
                      border: `1px solid ${roiSpecialty === spec ? TOKENS.blue : TOKENS.hair}`,
                      color: roiSpecialty === spec ? TOKENS.blue : TOKENS.paper,
                      padding: "8px 10px",
                      borderRadius: 6,
                      fontSize: 11.5,
                      fontWeight: roiSpecialty === spec ? 700 : 500,
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Real-Time TCO Comparison Output */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Side-by-side Cost Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {/* In-House Card */}
              <div style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 10, padding: 18 }}>
                <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: TOKENS.slate, textTransform: "uppercase" }}>
                  In-House Internal Hiring
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#EF4444", margin: "8px 0 10px" }}>
                  ₹{totalInHouseTCO.toLocaleString("en-IN")}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 11, color: TOKENS.slate }}>
                  <div>• Base Salary: ₹{Math.round(inHouseTotalSalary).toLocaleString("en-IN")}</div>
                  <div>• Overheads & Benefits (28%): ₹{Math.round(inHouseOverheads).toLocaleString("en-IN")}</div>
                  <div>• 2.5-Mo Hiring Delay Runway: ₹{Math.round(inHouseHiringDelayCost).toLocaleString("en-IN")}</div>
                  <div style={{ color: "#EF4444", fontWeight: 600, marginTop: 4 }}>⚠️ High recruitment & attrition risk</div>
                </div>
              </div>

              {/* Abhimanyu Dev Pod Card */}
              <div style={{ background: "rgba(37,99,235,0.05)", border: `1px solid ${TOKENS.blue}55`, borderRadius: 10, padding: 18 }}>
                <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: TOKENS.blue, textTransform: "uppercase" }}>
                  Abhimanyu Turnkey Pod
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, color: TOKENS.blue, margin: "8px 0 10px" }}>
                  ₹{abhimanyuTotalCost.toLocaleString("en-IN")}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 11, color: TOKENS.slate }}>
                  <div>• Dedicated Senior Pod ({roiTeamSize} Devs)</div>
                  <div>• Tech Lead & QA & DevOps Included</div>
                  <div>• Zero Recruitment Lag (Day 1 Start)</div>
                  <div style={{ color: "#10B981", fontWeight: 600, marginTop: 4 }}>✓ 99.99% SLA & Bilateral NDA</div>
                </div>
              </div>
            </div>

            {/* Savings & Advantage Banner */}
            <div
              style={{
                background: "linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(13,148,136,0.08) 100%)",
                border: "1px solid rgba(16,185,129,0.3)",
                borderRadius: 10,
                padding: "18px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div>
                <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: "#10B981" }}>
                  PROJECTED CLIENT CAPITAL SAVINGS
                </div>
                <div style={{ fontSize: 26, fontWeight: 800, color: "#10B981", margin: "4px 0" }}>
                  ₹{netSavings.toLocaleString("en-IN")} <span style={{ fontSize: 16 }}>({savingsPercent}% Cost Efficiency)</span>
                </div>
                <div style={{ fontSize: 12, color: TOKENS.paper }}>
                  ⚡ <strong>10 to 14 Weeks Faster Time-to-Market</strong>: Bypass the 75-day Indian tech hiring cycle and begin active sprint delivery immediately.
                </div>
              </div>
            </div>

            {/* Pod Guarantees Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 11.5, color: TOKENS.slate }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: TOKENS.teal, fontWeight: 700 }}>✓</span> 100% Client Code & IP Ownership
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: TOKENS.teal, fontWeight: 700 }}>✓</span> Weekly Staging Demos & Burndown
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: TOKENS.teal, fontWeight: 700 }}>✓</span> ISO 27001 & SOC 2 Security Baseline
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: TOKENS.teal, fontWeight: 700 }}>✓</span> Scalable Pod (Scale up/down in 1 sprint)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- Page 3: ProductsPage ---------------------------- */

function IndustriesPage({ go }) {
  const [activeTab, setActiveTab] = useState("all");

  const filtered = activeTab === "all"
    ? INDUSTRY_VERTICALS
    : INDUSTRY_VERTICALS.filter((ind) => ind.id === activeTab);

  return (
    <div style={{ padding: "40px 20px 80px", maxWidth: 1280, margin: "0 auto" }}>
      <SectionHeading
        badge="Strategic Verticals"
        title="Enterprise Solutions Across Global Industries"
        subtitle="Proven domain expertise, regulatory compliance frameworks (RBI, PCI-DSS, HIPAA, SOC 2 Type II), and battle-tested distributed architectures across mission-critical sectors."
      />

      {/* Industry Filter Pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 36 }}>
        {[
          { id: "all", label: "All Industries" },
          { id: "fintech", label: "💳 Banking & FinTech" },
          { id: "healthcare", label: "🏥 Healthcare & Pharma" },
          { id: "retail", label: "🛍️ Retail & E-Commerce" },
          { id: "logistics", label: "🚚 Logistics & Supply Chain" },
          { id: "saas", label: "☁️ High-Tech Cloud SaaS" },
          { id: "manufacturing", label: "🏭 Smart Manufacturing" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: activeTab === tab.id ? TOKENS.blue : TOKENS.panel,
              color: activeTab === tab.id ? "#FFFFFF" : TOKENS.slate,
              border: `1px solid ${activeTab === tab.id ? TOKENS.blue : TOKENS.hair}`,
              borderRadius: 6,
              padding: "7px 14px",
              fontSize: 12.5,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Industry Verticals List */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32 }}>
        {filtered.map((ind) => (
          <div
            key={ind.id}
            style={{
              background: TOKENS.panel,
              border: `1px solid ${TOKENS.hair}`,
              borderRadius: 14,
              padding: 28,
              boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14, marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 40 }}>{ind.icon}</span>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <h3 style={{ fontSize: 22, fontWeight: 800, color: TOKENS.paper, margin: 0 }}>{ind.name}</h3>
                    <span style={{ background: TOKENS.badgeBg, color: TOKENS.blue, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, padding: "2px 8px", borderRadius: 4 }}>
                      {ind.badge}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: TOKENS.teal, marginTop: 4 }}>{ind.tagline}</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <Button onClick={() => go("rfq-wizard")} variant="outline" style={{ padding: "8px 14px", fontSize: 12.5 }}>
                  Request Vertical RFP →
                </Button>
                <Button onClick={() => go("contact")} style={{ padding: "8px 16px", fontSize: 12.5 }}>
                  Schedule Consultation →
                </Button>
              </div>
            </div>

            <p style={{ fontSize: 14, color: TOKENS.slate, lineHeight: 1.6, marginBottom: 20 }}>
              {ind.shortDesc}
            </p>

            {/* Key Outcomes / Metrics Row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 22 }}>
              {ind.metrics.map((m, mi) => (
                <div key={mi} style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: "12px 16px", textAlign: "center" }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: TOKENS.blue }}>{m.val}</div>
                  <div style={{ fontSize: 11, color: TOKENS.slate, marginTop: 3 }}>{m.label}</div>
                </div>
              ))}
            </div>

            {/* Specialized Engineering Capabilities Grid */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: TOKENS.slate, marginBottom: 10, textTransform: "uppercase" }}>
                Specialized Enterprise Capabilities Engineered for this Vertical
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 10 }}>
                {ind.capabilities.map((cap, ci) => (
                  <div key={ci} style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "10px 14px", fontSize: 12.5, color: TOKENS.paper, display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <span style={{ color: TOKENS.teal, fontWeight: 700 }}>✓</span>
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Chips */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", borderTop: `1px solid ${TOKENS.hair}`, paddingTop: 14 }}>
              <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: TOKENS.slate }}>
                RECOMMENDED ARCHITECTURAL STACK:
              </span>
              {ind.techStack.map((tech, ti) => (
                <span
                  key={ti}
                  style={{
                    background: TOKENS.panelAlt,
                    border: `1px solid ${TOKENS.hair}`,
                    borderRadius: 4,
                    padding: "3px 8px",
                    fontSize: 11,
                    fontFamily: "'JetBrains Mono', monospace",
                    color: TOKENS.paper,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Enterprise Trust & Governance Box */}
      <div
        style={{
          marginTop: 48,
          background: TOKENS.panel,
          border: `1px solid ${TOKENS.hair}`,
          borderRadius: 14,
          padding: 28,
          boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: TOKENS.paper }}>
              🛡️ Enterprise Compliance, Governance & IP Protection
            </div>
            <div style={{ fontSize: 13, color: TOKENS.slate, marginTop: 4 }}>
              Every engagement is backed by bilateral mutual Non-Disclosure Agreements (NDAs), complete intellectual property assignment to your enterprise, and compliance with SOC 2 Type II and ISO 27001 standards.
            </div>
          </div>
          <Button onClick={() => go("contact")} style={{ padding: "10px 20px", fontSize: 13 }}>
            Consult Our Lead Architect →
          </Button>
        </div>
      </div>
    </div>
  );
}

// Backwards-compatibility alias for internal router
const ProductsPage = IndustriesPage;

/* ---------------------------- Page 4: Project Intake Wizard (rfq-wizard) ---------------------------- */

function ProjectWizardPage({ go }) {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState("web");
  const [techStack, setTechStack] = useState(["React/Next.js", "Node.js"]);
  const [budget, setBudget] = useState("medium");
  const [timeline, setTimeline] = useState("4-8 weeks");
  const [formData, setFormData] = useState({ name: "", email: "", company: "", description: "" });
  const [submittedId, setSubmittedId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ref = `PRJ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedId(ref);
  };

  if (submittedId) {
    return (
      <div style={{ padding: "80px 20px", maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
        <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 16, padding: "40px 30px", boxShadow: "0 10px 40px rgba(0,0,0,0.06)" }}>
          <span style={{ fontSize: 48 }}>🎉</span>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: TOKENS.paper, margin: "14px 0 8px" }}>
            Project Scope Ticket Created!
          </h2>
          <div style={{ fontSize: 14, color: TOKENS.slate, marginBottom: 20 }}>
            Your requirement has been logged with reference ID:
          </div>
          <div style={{ background: TOKENS.badgeBg, border: `1px solid ${TOKENS.blue}`, borderRadius: 8, padding: "12px", fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 700, color: TOKENS.blue, marginBottom: 20 }}>
            {submittedId}
          </div>
          <p style={{ fontSize: 13.5, color: TOKENS.slate, lineHeight: 1.6, marginBottom: 28 }}>
            Our Senior Solutions Architect will review your architecture specifications and send an initial scoping proposal and sprint plan within <strong>12 business hours</strong> to <strong>{formData.email || "your email"}</strong>.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <Button onClick={() => go("home")}>Return to Home</Button>
            <Button onClick={() => setSubmittedId(null)} variant="secondary">Submit Another Ticket</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 20px 80px", maxWidth: 760, margin: "0 auto" }}>
      <SectionHeading
        badge="Project Planner"
        title="Start Your Software Project"
        subtitle="Complete this 4-step guided intake to outline your requirements, tech stack, and timeline."
      />

      <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 14, padding: "28px 32px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
        {/* Step Indicators */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 28, borderBottom: `1px solid ${TOKENS.hair}`, paddingBottom: 16 }}>
          {["1. Platform", "2. Stack", "3. Budget", "4. Contact"].map((sLabel, idx) => (
            <div
              key={idx}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11.5,
                fontWeight: step === idx + 1 ? 700 : 500,
                color: step === idx + 1 ? TOKENS.blue : step > idx + 1 ? TOKENS.teal : TOKENS.slate,
              }}
            >
              {step > idx + 1 ? "✓ " : ""}{sLabel}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: TOKENS.paper, marginBottom: 14 }}>
              Select your project category:
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
              {[
                { id: "web", label: "Web Application / Portal", icon: "🌐" },
                { id: "android", label: "Native Android App", icon: "🤖" },
                { id: "cross", label: "Flutter / Cross-Platform App", icon: "📱" },
                { id: "fullstack", label: "Turnkey Full-Stack System", icon: "⚡" },
                { id: "backend", label: "Backend Microservices / APIs", icon: "⚙️" },
                { id: "ai", label: "Enterprise AI & Custom LLMs", icon: "🧠" },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setProjectType(p.id)}
                  style={{
                    background: projectType === p.id ? TOKENS.badgeBg : TOKENS.panelAlt,
                    border: `1px solid ${projectType === p.id ? TOKENS.blue : TOKENS.hair}`,
                    borderRadius: 8,
                    padding: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span style={{ fontSize: 24 }}>{p.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: projectType === p.id ? TOKENS.blue : TOKENS.paper }}>{p.label}</span>
                </button>
              ))}
            </div>
            <Button onClick={() => setStep(2)}>Next: Tech Stack →</Button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: TOKENS.paper, marginBottom: 14 }}>
              Select preferred technologies:
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 24 }}>
              {["React/Next.js", "Kotlin (Android)", "Flutter", "Swift (iOS)", "Node.js", "Python FastAPI", "Go", "PostgreSQL", "AWS Cloud"].map((t) => {
                const active = techStack.includes(t);
                return (
                  <button
                    key={t}
                    onClick={() => setTechStack(active ? techStack.filter((x) => x !== t) : [...techStack, t])}
                    style={{
                      background: active ? TOKENS.badgeBg : TOKENS.panelAlt,
                      border: `1px solid ${active ? TOKENS.blue : TOKENS.hair}`,
                      borderRadius: 6,
                      padding: "10px",
                      fontSize: 12,
                      fontWeight: 600,
                      color: active ? TOKENS.blue : TOKENS.paper,
                      cursor: "pointer",
                    }}
                  >
                    {active ? "✓ " : "+ "}{t}
                  </button>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Button onClick={() => setStep(1)} variant="secondary">← Back</Button>
              <Button onClick={() => setStep(3)}>Next: Budget & Scope →</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: TOKENS.paper, marginBottom: 14 }}>
              Estimated budget range & timeline:
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
              {[
                { id: "starter", label: "₹1.5L - ₹3L ($2k - $4k)", desc: "MVP or Module" },
                { id: "medium", label: "₹3L - ₹7L ($4k - $9k)", desc: "Production App" },
                { id: "enterprise", label: "₹7L+ ($9k+)", desc: "Enterprise Full Stack" },
              ].map((b) => (
                <button
                  key={b.id}
                  onClick={() => setBudget(b.id)}
                  style={{
                    background: budget === b.id ? TOKENS.badgeBg : TOKENS.panelAlt,
                    border: `1px solid ${budget === b.id ? TOKENS.blue : TOKENS.hair}`,
                    borderRadius: 8,
                    padding: "12px",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 700, color: budget === b.id ? TOKENS.blue : TOKENS.paper }}>{b.label}</div>
                  <div style={{ fontSize: 10, color: TOKENS.slate, marginTop: 4 }}>{b.desc}</div>
                </button>
              ))}
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 12.5, fontWeight: 600, color: TOKENS.paper, display: "block", marginBottom: 6 }}>
                Target Launch Timeline:
              </label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: 6, border: `1px solid ${TOKENS.hair}`, background: TOKENS.panel, color: TOKENS.paper, fontSize: 13 }}
              >
                <option value="Under 4 weeks">Under 4 weeks (Rapid Sprint)</option>
                <option value="4-8 weeks">4 to 8 weeks (Standard MVP)</option>
                <option value="8-14 weeks">8 to 14 weeks (Full Scale Enterprise)</option>
              </select>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <Button onClick={() => setStep(2)} variant="secondary">← Back</Button>
              <Button onClick={() => setStep(4)}>Next: Contact Details →</Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <form onSubmit={handleSubmit}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: TOKENS.paper, marginBottom: 14 }}>
              Your contact details & project brief:
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              <div>
                <label style={{ fontSize: 12, color: TOKENS.slate, display: "block", marginBottom: 4 }}>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: 6, border: `1px solid ${TOKENS.hair}`, background: TOKENS.panel, color: TOKENS.paper, fontSize: 13 }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, color: TOKENS.slate, display: "block", marginBottom: 4 }}>Work Email *</label>
                <input
                  type="email"
                  required
                  placeholder="anand@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: 6, border: `1px solid ${TOKENS.hair}`, background: TOKENS.panel, color: TOKENS.paper, fontSize: 13 }}
                />
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, color: TOKENS.slate, display: "block", marginBottom: 4 }}>Company / Organization Name</label>
              <input
                type="text"
                placeholder="e.g. Apex FinTech Solutions"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                style={{ width: "100%", padding: "10px", borderRadius: 6, border: `1px solid ${TOKENS.hair}`, background: TOKENS.panel, color: TOKENS.paper, fontSize: 13 }}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, color: TOKENS.slate, display: "block", marginBottom: 4 }}>Brief Project Description & Goals</label>
              <textarea
                rows={4}
                placeholder="Describe key features, user flows, or existing codebase..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={{ width: "100%", padding: "10px", borderRadius: 6, border: `1px solid ${TOKENS.hair}`, background: TOKENS.panel, color: TOKENS.paper, fontSize: 13 }}
              />
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <Button onClick={() => setStep(3)} variant="secondary">← Back</Button>
              <Button type="submit">Submit Requirement & Get Scoping Doc →</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ---------------------------- Interactive Case Study Deep-Dive Reader Modal ---------------------------- */

function CaseStudyReaderModal({ caseStudy, isOpen, onClose, go }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [copied, setCopied] = useState(false);

  if (!isOpen || !caseStudy) return null;

  const handleCopy = () => {
    const text = `Case Study: ${caseStudy.title}\nClient: ${caseStudy.client} (${caseStudy.industry})\nChallenge: ${caseStudy.challenge}\nSolution: ${caseStudy.solution}\nTech: ${caseStudy.tech.join(", ")}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15, 23, 42, 0.65)",
        backdropFilter: "blur(16px)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px 16px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 920,
          maxHeight: "92vh",
          overflowY: "auto",
          background: TOKENS.panel,
          border: `1px solid ${TOKENS.hair}`,
          borderRadius: 14,
          padding: 24,
          color: TOKENS.paper,
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 34 }}>{caseStudy.icon}</span>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: TOKENS.paper }}>{caseStudy.title}</span>
                <span style={{ background: TOKENS.badgeBg, color: TOKENS.blue, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, padding: "2px 8px", borderRadius: 4 }}>
                  {caseStudy.industry}
                </span>
              </div>
              <div style={{ fontSize: 12.5, color: TOKENS.slate, marginTop: 2 }}>
                Client: <strong>{caseStudy.client}</strong> • Production Case Study
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: TOKENS.panelAlt,
              border: `1px solid ${TOKENS.hair}`,
              borderRadius: 6,
              width: 32,
              height: 32,
              cursor: "pointer",
              fontSize: 18,
              color: TOKENS.slate,
            }}
          >
            ×
          </button>
        </div>

        {/* Tab Controls */}
        <div style={{ display: "flex", gap: 8, borderBottom: `1px solid ${TOKENS.hair}`, paddingBottom: 10, marginBottom: 18 }}>
          {[
            { id: "overview", label: "Overview & ROI Outcomes" },
            { id: "architecture", label: "Architecture Topology" },
            { id: "tech", label: "Engineering Stack & Security" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                background: activeTab === t.id ? TOKENS.blue : "transparent",
                color: activeTab === t.id ? "#FFFFFF" : TOKENS.slate,
                border: "none",
                borderRadius: 6,
                padding: "6px 14px",
                fontSize: 12.5,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 10, padding: 18 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: TOKENS.slate, marginBottom: 6 }}>
                OPERATIONAL CHALLENGE
              </div>
              <div style={{ fontSize: 13.5, color: TOKENS.paper, lineHeight: 1.6 }}>
                {caseStudy.challenge}
              </div>
            </div>

            <div style={{ background: "rgba(37,99,235,0.06)", border: `1px solid ${TOKENS.blue}44`, borderRadius: 10, padding: 18 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: TOKENS.blue, marginBottom: 6 }}>
                ENGINEERING ARCHITECTURE & SOLUTION
              </div>
              <div style={{ fontSize: 13.5, color: TOKENS.paper, lineHeight: 1.6 }}>
                {caseStudy.solution}
              </div>
            </div>

            {/* Results Grid */}
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: TOKENS.slate, marginBottom: 10 }}>
                VERIFIED PRODUCTION METRICS
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
                {caseStudy.results.map((r, i) => (
                  <div key={i} style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: 14, textAlign: "center" }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: TOKENS.blue }}>{r.value}</div>
                    <div style={{ fontSize: 11, color: TOKENS.slate, marginTop: 4 }}>{r.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Architecture Topology */}
        {activeTab === "architecture" && (
          <div style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 10, padding: 20 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: TOKENS.slate, marginBottom: 12 }}>
              DISTRIBUTED CLOUD TOPOLOGY & DATA FLOW
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12, alignItems: "center", marginBottom: 20 }}>
              <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: 12, textAlign: "center" }}>
                <div style={{ fontSize: 20 }}>📱</div>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: TOKENS.paper, marginTop: 4 }}>Client App</div>
                <div style={{ fontSize: 10, color: TOKENS.blue }}>{caseStudy.tech[0]}</div>
              </div>
              <div style={{ textAlign: "center", color: TOKENS.blue }}>➔</div>
              <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: 12, textAlign: "center" }}>
                <div style={{ fontSize: 20 }}>🛡️</div>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: TOKENS.paper, marginTop: 4 }}>Anycast WAF</div>
                <div style={{ fontSize: 10, color: TOKENS.teal }}>TLS 1.3 / CDN</div>
              </div>
              <div style={{ textAlign: "center", color: TOKENS.blue }}>➔</div>
              <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: 12, textAlign: "center" }}>
                <div style={{ fontSize: 20 }}>⚡</div>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: TOKENS.paper, marginTop: 4 }}>Backend API</div>
                <div style={{ fontSize: 10, color: TOKENS.brass }}>{caseStudy.tech[2] || "Microservices"}</div>
              </div>
              <div style={{ textAlign: "center", color: TOKENS.blue }}>➔</div>
              <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: 12, textAlign: "center" }}>
                <div style={{ fontSize: 20 }}>💾</div>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: TOKENS.paper, marginTop: 4 }}>Data Tier</div>
                <div style={{ fontSize: 10, color: TOKENS.slate }}>{caseStudy.tech[3] || "PostgreSQL"}</div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: TOKENS.slate, lineHeight: 1.6 }}>
              Production cluster deployed across multi-AZ container pods with automated horizontal pod autoscaling (HPA), zero-downtime rolling updates, and sub-100ms P99 latency SLA.
            </div>
          </div>
        )}

        {/* Tab 3: Tech & Security */}
        {activeTab === "tech" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 10, padding: 18 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: TOKENS.slate, marginBottom: 8 }}>
                PRODUCTION TECH STACK COMPONENTS
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {caseStudy.tech.map((t, idx) => (
                  <span key={idx} style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.blue}44`, color: TOKENS.blue, fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, padding: "5px 12px", borderRadius: 6 }}>
                    ✓ {t}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ background: "rgba(13,148,136,0.08)", border: `1px solid ${TOKENS.teal}44`, borderRadius: 10, padding: 18 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: TOKENS.teal, marginBottom: 6 }}>
                SECURITY & AUDIT COMPLIANCE
              </div>
              <div style={{ fontSize: 13, color: TOKENS.paper, lineHeight: 1.6 }}>
                • OWASP Top 10 penetration testing passed with 0 critical or high vulnerabilities.<br />
                • Strict AES-256 encryption at rest and TLS 1.3 in transit with automated KMS key rotation.<br />
                • Role-Based Access Control (RBAC) with immutable audit logging and continuous observability.
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${TOKENS.hair}`, paddingTop: 16, marginTop: 20 }}>
          <button
            onClick={handleCopy}
            style={{
              background: TOKENS.panelAlt,
              border: `1px solid ${TOKENS.hair}`,
              borderRadius: 6,
              padding: "8px 14px",
              fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace",
              cursor: "pointer",
              color: TOKENS.paper,
            }}
          >
            {copied ? "✓ Copied Summary" : "📋 Copy Case Study Summary"}
          </button>
          <div style={{ display: "flex", gap: 10 }}>
            <Button onClick={onClose} variant="secondary">Close Reader</Button>
            <Button
              onClick={() => {
                go("rfq-wizard");
                onClose();
              }}
            >
              🚀 Request Similar Platform Proposal →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- Page 5: CaseStudiesPage ---------------------------- */

function CaseStudiesPage({ go }) {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(CASE_STUDIES[0]);
  const [readerOpen, setReaderOpen] = useState(false);

  const handleOpenReader = (cs) => {
    setSelectedCaseStudy(cs);
    setReaderOpen(true);
  };

  return (
    <div style={{ padding: "40px 20px 80px", maxWidth: 1280, margin: "0 auto" }}>
      <SectionHeading
        badge="Proven Outcomes"
        title="Enterprise Engineering Case Studies"
        subtitle="Explore real-world software platforms, Android apps, and high-concurrency cloud architectures delivered by our team."
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {CASE_STUDIES.map((cs) => (
          <div
            key={cs.id}
            style={{
              background: TOKENS.panel,
              border: `1px solid ${TOKENS.hair}`,
              borderRadius: 14,
              padding: 28,
              boxShadow: "0 2px 14px rgba(0,0,0,0.03)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 36 }}>{cs.icon}</span>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: TOKENS.paper, margin: "0 0 4px" }}>{cs.title}</h3>
                  <div style={{ fontSize: 12.5, color: TOKENS.slate }}>Client: <strong>{cs.client}</strong> • Industry: <strong>{cs.industry}</strong></div>
                </div>
              </div>
              <Button onClick={() => handleOpenReader(cs)} style={{ padding: "8px 16px", fontSize: 12.5 }}>
                🔬 View Full Blueprint →
              </Button>
            </div>

            <p style={{ fontSize: 14, color: TOKENS.slate, lineHeight: 1.6, marginBottom: 16 }}>{cs.summary}</p>

            {/* Results Counters */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 20 }}>
              {cs.results.map((r, ri) => (
                <div key={ri} style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: "12px 14px", textAlign: "center" }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: TOKENS.blue }}>{r.value}</div>
                  <div style={{ fontSize: 11, color: TOKENS.slate, marginTop: 4 }}>{r.label}</div>
                </div>
              ))}
            </div>

            {/* Tech Stack Pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {cs.tech.map((t, ti) => (
                  <span key={ti} style={{ background: TOKENS.badgeBg, border: `1px solid ${TOKENS.blue}33`, color: TOKENS.blue, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", padding: "3px 8px", borderRadius: 4 }}>
                    {t}
                  </span>
                ))}
              </div>
              <button
                onClick={() => handleOpenReader(cs)}
                style={{ background: "none", border: "none", color: TOKENS.blue, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}
              >
                Inspect Technical Challenge & Architecture ➔
              </button>
            </div>
          </div>
        ))}
      </div>

      <CaseStudyReaderModal
        caseStudy={selectedCaseStudy}
        isOpen={readerOpen}
        onClose={() => setReaderOpen(false)}
        go={go}
      />
    </div>
  );
}

/* ---------------------------- Page 6: KnowledgePage (Tech Hub) ---------------------------- */

function KnowledgePage({ go }) {
  const [activeLang, setActiveLang] = useState("ts");
  const [activeTopic, setActiveTopic] = useState("quote");
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const sdkSnippets = {
    ts: {
      quote: `import { AbhimanyuClient } from '@abhimanyu/sdk';

const abhimanyu = new AbhimanyuClient({
  apiKey: process.env.ABHIMANYU_API_KEY,
  environment: 'production'
});

// Calculate quote for a high-concurrency enterprise project
const quote = await abhimanyu.estimator.calculateQuote({
  serviceCategory: 'web-application-development',
  tier: 'enterprise',
  frontend: 'nextjs-14',
  backend: 'go-distributed',
  cloud: 'aws-multi-az',
  sprintsCount: 6,
  currency: 'INR'
});

console.log(\`Estimated Cost: ₹\${quote.totalEstimatedInr.toLocaleString('en-IN')}\`);
console.log(\`Assigned Pod: \${quote.suggestedPod.join(', ')}\`);`,

      rag: `import { AbhimanyuClient } from '@abhimanyu/sdk';

const abhimanyu = new AbhimanyuClient({ apiKey: process.env.ABHIMANYU_API_KEY });

// Query Private Enterprise Vector Knowledge Base
const response = await abhimanyu.aiStudio.ragQuery({
  knowledgeBaseId: 'kb_fintech_compliance_2026',
  prompt: 'What are the PCI-DSS tokenization requirements for cardholder storage?',
  topK: 4,
  temperature: 0.1
});

console.log(\`Verified Answer: \${response.answer}\`);
console.log('Source Documents:', response.citations.map(c => c.documentTitle));`,

      invoice: `import { AbhimanyuClient } from '@abhimanyu/sdk';

const abhimanyu = new AbhimanyuClient({ apiKey: process.env.ABHIMANYU_API_KEY });

// Automated GST E-Invoicing & IRN Generation
const invoice = await abhimanyu.erp.invoices.create({
  customerGstin: '36AAAAA0000A1Z5',
  clientCompanyName: 'Apex FinTech Solutions Pvt Ltd',
  items: [
    { sku: 'SKU-8841', description: 'High-Precision Micro-Controllers', qty: 25, unitPrice: 850 }
  ],
  applyGST: true,
  irnAutoSign: true
});

console.log(\`Invoice: \${invoice.invoiceNumber} | Government IRN: \${invoice.irn}\`);`,

      sprint: `import { AbhimanyuClient } from '@abhimanyu/sdk';

const abhimanyu = new AbhimanyuClient({ apiKey: process.env.ABHIMANYU_API_KEY });

// Real-time WebSocket sprint burndown stream
const stream = abhimanyu.tracker.streamSprintProgress('PRJ-2026-APEX');
stream.on('data', (sprint) => {
  console.log(\`Sprint: \${sprint.name} | Burndown: \${sprint.completedPoints}/\${sprint.totalPoints} pts\`);
  console.log(\`Staging Cluster: \${sprint.stagingUrl}\`);
});`,
    },

    py: {
      quote: `from abhimanyu import AbhimanyuClient
import os

client = AbhimanyuClient(
    api_key=os.environ.get("ABHIMANYU_API_KEY"),
    timeout_seconds=30
)

# Calculate dynamic enterprise quote
quote = client.estimator.calculate_quote(
    service_category="web-application-development",
    tier="enterprise",
    frontend="nextjs-14",
    backend="go-distributed",
    cloud="aws-multi-az",
    sprints_count=6,
    currency="INR"
)

print(f"Estimated Investment: ₹{quote.total_estimated_inr:,.2f}")
print(f"Delivery Timeline: {quote.timeline_weeks} Weeks across {quote.sprints_count} Sprints")`,

      rag: `from abhimanyu import AbhimanyuClient
import os

client = AbhimanyuClient(api_key=os.environ.get("ABHIMANYU_API_KEY"))

# Query Private Enterprise Vector Knowledge Base
response = client.ai_studio.rag_query(
    knowledge_base_id="kb_fintech_compliance_2026",
    prompt="Explain our disaster recovery RTO and automated database failover SLAs.",
    top_k=4,
    temperature=0.1
)

print(f"Inference Latency: {response.latency_ms}ms (p95)")
print(f"Answer: {response.answer}")
for cite in response.citations:
    print(f" - [{cite.score:.2f}] {cite.title} (Page {cite.page})")`,

      invoice: `from abhimanyu import AbhimanyuClient
import os

client = AbhimanyuClient(api_key=os.environ.get("ABHIMANYU_API_KEY"))

# Generate GST E-Invoice with Automated IRN Digitization
invoice = client.erp.invoices.create(
    customer_gstin="36AAAAA0000A1Z5",
    client_name="Apex FinTech Solutions Pvt Ltd",
    items=[
        {"sku": "SKU-8841", "description": "High-Precision Micro-Controllers", "qty": 25, "unit_price": 850}
    ],
    irn_auto_sign=True
)

print(f"Tax Invoice: {invoice.invoice_number} | IRN: {invoice.irn}")
print(f"Grand Total: ₹{invoice.grand_total:,.2f} (Includes 18% CGST/SGST)")`,

      sprint: `from abhimanyu import AbhimanyuClient
import os

client = AbhimanyuClient(api_key=os.environ.get("ABHIMANYU_API_KEY"))

# Query live sprint burndown & DORA metrics
status = client.tracker.get_sprint_status("PRJ-2026-APEX")
print(f"Active Sprint: {status.name} (Milestone {status.milestone_index})")
print(f"Staging Deployment: {status.staging_url}")
print(f"DORA Lead Time: {status.lead_time_days} days | Change Failure Rate: {status.change_failure_rate}%")`,
    },

    go: {
      quote: `package main

import (
	"context"
	"fmt"
	"log"
	"github.com/abhimanyu/client-go"
)

func main() {
	client := abhimanyu.NewClient(abhimanyu.Config{
		APIKey:  "abh_live_94819488a0b94c3d",
		BaseURL: "https://api.abhimanu-technologies.app/v1",
	})

	quote, err := client.Estimator.CalculateQuote(context.Background(), &abhimanyu.QuoteParams{
		ServiceCategory: "web-application-development",
		Tier:            "enterprise",
		Frontend:        "nextjs-14",
		Backend:         "go-distributed",
		Cloud:           "aws-multi-az",
		SprintsCount:    6,
	})
	if err != nil {
		log.Fatalf("Calculation error: %v", err)
	}

	fmt.Printf("Estimated Cost: ₹%d | Timeline: %d weeks\\n", quote.TotalINR, quote.Weeks)
}`,

      rag: `package main

import (
	"context"
	"fmt"
	"github.com/abhimanyu/client-go"
)

func main() {
	client := abhimanyu.NewClient(abhimanyu.Config{APIKey: "abh_live_94819488a0b94c3d"})

	rag, _ := client.AIStudio.QueryRAG(context.Background(), &abhimanyu.RAGRequest{
		KnowledgeBaseID: "kb_fintech_compliance_2026",
		Prompt:          "Explain our disaster recovery RTO and automated database failover SLAs.",
		TopK:            3,
	})

	fmt.Printf("Model: %s | Latency: %dms\\n", rag.ModelVersion, rag.LatencyMs)
	fmt.Printf("Synthesis: %s\\n", rag.Answer)
}`,

      invoice: `package main

import (
	"context"
	"fmt"
	"github.com/abhimanyu/client-go"
)

func main() {
	client := abhimanyu.NewClient(abhimanyu.Config{APIKey: "abh_live_94819488a0b94c3d"})

	inv, _ := client.ERP.CreateInvoice(context.Background(), &abhimanyu.InvoicePayload{
		GSTIN:       "36AAAAA0000A1Z5",
		ClientName:  "Apex FinTech Solutions Pvt Ltd",
		Items: []abhimanyu.Item{
			{SKU: "SKU-8841", Qty: 25, Price: 850.0},
		},
		AutoSignIRN: true,
	})

	fmt.Printf("GST E-Invoice Created: %s | IRN: %s\\n", inv.InvoiceNumber, inv.IRN)
}`,

      sprint: `package main

import (
	"context"
	"fmt"
	"github.com/abhimanyu/client-go"
)

func main() {
	client := abhimanyu.NewClient(abhimanyu.Config{APIKey: "abh_live_94819488a0b94c3d"})

	status, _ := client.Tracker.GetSprintTelemetry(context.Background(), "PRJ-2026-APEX")
	fmt.Printf("Project: %s | Status: %s\\n", status.ProjectID, status.State)
	fmt.Printf("Staging URL: %s\\n", status.StagingURL)
}`,
    },

    kt: {
      quote: `package com.abhimanyu.android.demo

import com.abhimanyu.android.sdk.AbhimanyuClient
import com.abhimanyu.android.sdk.models.QuoteRequest
import kotlinx.coroutines.runBlocking

fun main() = runBlocking {
    val client = AbhimanyuClient.Builder()
        .apiKey("abh_live_94819488a0b94c3d")
        .build()

    val quote = client.estimator.calculateQuote(
        QuoteRequest(
            serviceCategory = "web-application-development",
            tier = "enterprise",
            frontend = "nextjs-14",
            backend = "go-distributed",
            cloud = "aws-multi-az",
            sprintsCount = 6
        )
    )

    println("Total Investment: ₹\${quote.totalEstimatedInr}")
    println("Pod Assigned: \${quote.suggestedPod.joinToString()}")
}`,

      rag: `package com.abhimanyu.android.demo

import com.abhimanyu.android.sdk.AbhimanyuClient
import kotlinx.coroutines.runBlocking

fun main() = runBlocking {
    val client = AbhimanyuClient.Builder().apiKey("abh_live_94819488a0b94c3d").build()

    val rag = client.aiStudio.ragQuery(
        knowledgeBaseId = "kb_fintech_compliance_2026",
        prompt = "Explain our disaster recovery RTO and database failover SLAs."
    )

    println("RAG Result: \${rag.answer}")
    println("Citations Count: \${rag.citations.size}")
}`,

      invoice: `package com.abhimanyu.android.demo

import com.abhimanyu.android.sdk.AbhimanyuClient
import kotlinx.coroutines.runBlocking

fun main() = runBlocking {
    val client = AbhimanyuClient.Builder().apiKey("abh_live_94819488a0b94c3d").build()

    val invoice = client.erp.createInvoice(
        gstin = "36AAAAA0000A1Z5",
        clientName = "Apex FinTech Solutions Pvt Ltd",
        sku = "SKU-8841",
        qty = 25,
        unitPrice = 850.0
    )

    println("Invoice: \${invoice.invoiceNumber} | Total: ₹\${invoice.grandTotal}")
}`,

      sprint: `package com.abhimanyu.android.demo

import com.abhimanyu.android.sdk.AbhimanyuClient
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.runBlocking

fun main() = runBlocking {
    val client = AbhimanyuClient.Builder().apiKey("abh_live_94819488a0b94c3d").build()

    client.tracker.observeSprintVelocity("PRJ-2026-APEX").collectLatest { status ->
        println("Sprint: \${status.name} | Velocity: \${status.velocityPoints} pts/week")
    }
}`,
    },

    curl: {
      quote: `curl -X POST https://api.abhimanu-technologies.app/v1/projects/quote/calculate \\
  -H "Authorization: Bearer abh_live_94819488a0b94c3d" \\
  -H "Content-Type: application/json" \\
  -d '{
    "service_category": "web-application-development",
    "tier": "enterprise",
    "frontend": "nextjs-14",
    "backend": "go-distributed",
    "cloud": "aws-multi-az",
    "sprints_count": 6,
    "currency": "INR"
  }'`,

      rag: `curl -X POST https://api.abhimanu-technologies.app/v1/ai/rag/query \\
  -H "Authorization: Bearer abh_live_94819488a0b94c3d" \\
  -H "Content-Type: application/json" \\
  -d '{
    "knowledge_base_id": "kb_fintech_compliance_2026",
    "prompt": "What are the PCI-DSS tokenization requirements for cardholder storage?",
    "top_k": 4
  }'`,

      invoice: `curl -X POST https://api.abhimanu-technologies.app/v1/integrations/enterprise/events \\
  -H "Authorization: Bearer abh_live_94819488a0b94c3d" \\
  -H "Content-Type: application/json" \\
  -d '{
    "customer_gstin": "36AAAAA0000A1Z5",
    "client_name": "Apex FinTech Solutions Pvt Ltd",
    "items": [{"sku": "SKU-8841", "qty": 25, "unit_price": 850}],
    "irn_auto_sign": true
  }'`,

      sprint: `curl -X GET https://api.abhimanu-technologies.app/v1/projects/PRJ-2026-APEX/telemetry \\
  -H "Authorization: Bearer abh_live_94819488a0b94c3d"`,
    },
  };

  const articles = [
    {
      title: "Architecting Distributed Microservices in Go & Node.js",
      category: "Backend Systems",
      readTime: "8 min read",
      summary: "How we design event-driven backends with Kafka, Redis, and PostgreSQL to handle 50k+ requests per second with deterministic latency.",
      code: "func handleOrderStream(ctx context.Context, msg *kafka.Message) error {\n  // Atomic idempotent state transition\n  return db.Transaction(func(tx *sql.Tx) error {\n    return processPayment(tx, msg.Payload)\n  })\n}",
    },
    {
      title: "Native Android UI Excellence with Jetpack Compose & M3",
      category: "Mobile Architecture",
      readTime: "6 min read",
      summary: "Modern declarative Android development: State hoisting, Flow integration, Room database caching, and building fluid 60fps mobile interfaces.",
      code: "@Composable\nfun OrderTelemetryCard(order: OrderState) {\n  Card(modifier = Modifier.fillMaxWidth().padding(12.dp)) {\n    Text(text = order.title, style = MaterialTheme.typography.titleMedium)\n  }\n}",
    },
    {
      title: "Enterprise Next.js 14 App Router & Micro-Frontend Topologies",
      category: "Web & Frontend",
      readTime: "7 min read",
      summary: "Optimizing server component boundaries, edge streaming, and multi-zone deployment for enterprise-grade SaaS platforms.",
      code: "export async function generateMetadata({ params }): Promise<Metadata> {\n  const data = await fetchProjectTelemetry(params.id);\n  return { title: `${data.name} | Abhimanyu Tech` };\n}",
    },
  ];

  return (
    <div style={{ padding: "40px 20px 80px", maxWidth: 1100, margin: "0 auto" }}>
      <SectionHeading
        badge="Engineering Knowledge"
        title="Technical Playbooks & Architecture Guides"
        subtitle="Insights, design patterns, and engineering standards developed across our production software deployments."
      />


      {/* Multi-Language Developer SDK & Integration Generator */}
      <div
        style={{
          background: TOKENS.panel,
          border: `1px solid ${TOKENS.hair}`,
          borderRadius: 14,
          padding: 24,
          marginBottom: 36,
          boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14, marginBottom: 18 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20 }}>💻</span>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: TOKENS.paper }}>
                Official Developer SDKs & Integration Suite
              </h3>
              <span style={{ background: "rgba(37,99,235,0.12)", color: TOKENS.blue, fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, padding: "2px 8px", borderRadius: 4 }}>
                v2.4 PRODUCTION
              </span>
            </div>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: TOKENS.slate }}>
              Connect your distributed systems, mobile clients, and enterprise workflows using strongly-typed official SDKs.
            </p>
          </div>

          {/* Quick Install Pill */}
          <div
            style={{
              background: TOKENS.panelAlt,
              border: `1px solid ${TOKENS.hair}`,
              borderRadius: 8,
              padding: "6px 12px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
            }}
          >
            <span style={{ color: TOKENS.teal }}>$</span>
            <span style={{ color: TOKENS.paper }}>
              {activeLang === "ts" && "npm install @abhimanyu/sdk"}
              {activeLang === "py" && "pip install abhimanyu-client"}
              {activeLang === "go" && "go get github.com/abhimanyu/client-go"}
              {activeLang === "kt" && 'implementation("com.abhimanyu.android:core:2.4.0")'}
              {activeLang === "curl" && "curl -sS https://api.abhimanu-technologies.app/v1/health"}
            </span>
            <button
              onClick={() => {
                const cmd =
                  activeLang === "ts"
                    ? "npm install @abhimanyu/sdk"
                    : activeLang === "py"
                    ? "pip install abhimanyu-client"
                    : activeLang === "go"
                    ? "go get github.com/abhimanyu/client-go"
                    : activeLang === "kt"
                    ? 'implementation("com.abhimanyu.android:core:2.4.0")'
                    : "curl -sS https://api.abhimanu-technologies.app/v1/health";
                navigator.clipboard?.writeText(cmd);
                setCopiedInstall(true);
                setTimeout(() => setCopiedInstall(false), 2000);
              }}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: 11,
                color: copiedInstall ? "#10B981" : TOKENS.slate,
                padding: "2px 4px",
              }}
              title="Copy install command"
            >
              {copiedInstall ? "✓ Copied" : "📋"}
            </button>
          </div>
        </div>

        {/* Language Tabs */}
        <div style={{ display: "flex", gap: 6, borderBottom: `1px solid ${TOKENS.hair}`, paddingBottom: 10, marginBottom: 16, overflowX: "auto" }}>
          {[
            { id: "ts", label: "TypeScript / Node.js", icon: "📘" },
            { id: "py", label: "Python 3.11+", icon: "🐍" },
            { id: "go", label: "Go (Golang)", icon: "🐹" },
            { id: "kt", label: "Kotlin / Android", icon: "📱" },
            { id: "curl", label: "cURL / Terminal", icon: "⚡" },
          ].map((lang) => (
            <button
              key={lang.id}
              onClick={() => setActiveLang(lang.id)}
              style={{
                background: activeLang === lang.id ? TOKENS.badgeBg : "transparent",
                border: `1px solid ${activeLang === lang.id ? TOKENS.blue : "transparent"}`,
                borderRadius: 6,
                padding: "6px 14px",
                fontSize: 12.5,
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: activeLang === lang.id ? 700 : 500,
                color: activeLang === lang.id ? TOKENS.blue : TOKENS.slate,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                whiteSpace: "nowrap",
              }}
            >
              <span>{lang.icon}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>

        {/* Topic / Endpoint Switcher */}
        <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
          {[
            { id: "quote", label: "1. Project Scope & Architecture API" },
            { id: "rag", label: "2. Enterprise AI Studio Vector RAG" },
            { id: "invoice", label: "3. Cloud ERP Automated GST Invoice" },
            { id: "sprint", label: "4. Live Sprint Velocity & Telemetry" },
          ].map((topic) => (
            <button
              key={topic.id}
              onClick={() => setActiveTopic(topic.id)}
              style={{
                background: activeTopic === topic.id ? TOKENS.panelAlt : "transparent",
                border: `1px solid ${activeTopic === topic.id ? TOKENS.teal : TOKENS.hair}`,
                borderRadius: 6,
                padding: "5px 12px",
                fontSize: 12,
                fontFamily: "'Inter', sans-serif",
                fontWeight: activeTopic === topic.id ? 600 : 400,
                color: activeTopic === topic.id ? TOKENS.paper : TOKENS.slate,
                cursor: "pointer",
              }}
            >
              {topic.label}
            </button>
          ))}
        </div>

        {/* Code Snippet Box */}
        <div
          style={{
            background: "#0B1727",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "8px 16px",
              background: "#132238",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#EF4444", display: "inline-block" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#F59E0B", display: "inline-block" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#10B981", display: "inline-block" }} />
              <span style={{ marginLeft: 8, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "#94A3B8" }}>
                {activeLang === "ts" && "integration.ts"}
                {activeLang === "py" && "client_service.py"}
                {activeLang === "go" && "main.go"}
                {activeLang === "kt" && "TelemetryRepository.kt"}
                {activeLang === "curl" && "terminal_request.sh"}
              </span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(sdkSnippets[activeLang][activeTopic]);
                  setCopiedCode(true);
                  setTimeout(() => setCopiedCode(false), 2000);
                }}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: copiedCode ? "#10B981" : "#F8FAFC",
                  padding: "4px 10px",
                  fontSize: 11,
                  fontFamily: "'JetBrains Mono', monospace",
                  borderRadius: 4,
                  cursor: "pointer",
                }}
              >
                {copiedCode ? "✓ Copied Snippet" : "📋 Copy Code"}
              </button>

            </div>
          </div>
          <pre
            style={{
              margin: 0,
              padding: "16px 20px",
              color: "#E2E8F0",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              lineHeight: 1.6,
              overflowX: "auto",
            }}
          >
            <code>{sdkSnippets[activeLang][activeTopic]}</code>
          </pre>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {articles.map((art, idx) => (
          <div key={idx} style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 12, padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ background: TOKENS.badgeBg, color: TOKENS.blue, fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, padding: "2px 8px", borderRadius: 4 }}>
                {art.category}
              </span>
              <span style={{ fontSize: 11.5, color: TOKENS.slate }}>{art.readTime}</span>
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: TOKENS.paper, margin: "0 0 8px" }}>{art.title}</h3>
            <p style={{ fontSize: 13.5, color: TOKENS.slate, lineHeight: 1.6, marginBottom: 14 }}>{art.summary}</p>
            <div style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "12px", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: TOKENS.paper, overflowX: "auto" }}>
              <pre style={{ margin: 0 }}>{art.code}</pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------- Page 7: DashboardPage ---------------------------- */

function DashboardPage({ openTracker, go }) {
  const [downloadedInv, setDownloadedInv] = useState(null);

  // Interactive Kanban state
  const [tasks, setTasks] = useState([
    { id: "TSK-101", title: "Android Biometric Keystore & Face Unlock", tag: "Kotlin / Compose", col: "In Dev" },
    { id: "TSK-102", title: "WebRTC P2P Video Consultation Module", tag: "Go / STUN", col: "Code Review" },
    { id: "TSK-103", title: "PostgreSQL Multi-Tenant Shard Migrations", tag: "SQL / PgBouncer", col: "Ready for Staging" },
    { id: "TSK-104", title: "Automated GST E-Invoicing & E-Way Bills", tag: "Node.js / IRN", col: "Backlog" },
    { id: "TSK-105", title: "Redis Cluster Distributed Lock Middleware", tag: "Redis / Go", col: "In Dev" },
    { id: "TSK-106", title: "Cross-Platform Push Notifications Sync", tag: "Firebase FCM", col: "Code Review" },
  ]);

  const handleAdvanceTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const nextCol =
          t.col === "Backlog"
            ? "In Dev"
            : t.col === "In Dev"
            ? "Code Review"
            : t.col === "Code Review"
            ? "Ready for Staging"
            : "Backlog";
        return { ...t, col: nextCol };
      })
    );
  };

  const commits = [
    { sha: "git#a89f41b", msg: "feat(android): implement Jetpack Compose biometrics & hardware keystore", author: "Er. Vikramaditya", time: "14m ago", tests: "✓ 34 Passed" },
    { sha: "git#c71b092", msg: "perf(postgres): add partition index on transaction_timestamp and client_id", author: "Er. Sundaram", time: "1h ago", tests: "✓ 48 Passed" },
    { sha: "git#e54d318", msg: "sec(auth): enforce strict OAuth2 JWT token rotation and rate limiting", author: "Er. Ananya", time: "3h ago", tests: "✓ 29 Passed" },
    { sha: "git#f9021da", msg: "infra(k8s): configure horizontal pod autoscaler (HPA) for 50k QPS peak", author: "Er. K. S. Rao", time: "5h ago", tests: "✓ All Green" },
  ];

  const milestones = [
    { id: "M1", title: "UI/UX Architecture & Figma Token System", amount: "₹1,20,000", status: "PAID", inv: "INV-2026-081" },
    { id: "M2", title: "Core Microservices & Auth0 RBAC Suite", amount: "₹1,50,000", status: "PAID", inv: "INV-2026-082" },
    { id: "M3", title: "Native Android App (Jetpack Compose) MVP", amount: "₹1,80,000", status: "PAID", inv: "INV-2026-083" },
    { id: "M4", title: "Payment Gateways & Staging Production Release", amount: "₹1,20,000", status: "DUE", inv: "INV-2026-084" },
  ];

  return (
    <div style={{ padding: "40px 20px 80px", maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30, flexWrap: "wrap", gap: 14 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: TOKENS.paper, margin: "0 0 6px" }}>
            Client Project & Development Workspace
          </h2>
          <div style={{ fontSize: 13, color: TOKENS.slate }}>
            Logged in as <strong>Dr. K. S. Rao</strong> (Enterprise Client Lead • Apex FinTech Solutions)
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Button onClick={openTracker} variant="secondary" style={{ padding: "8px 14px", fontSize: 12 }}>
            📊 Open Live Sprint Tracker
          </Button>
          <Button onClick={() => go("rfq-wizard")} style={{ padding: "8px 14px", fontSize: 12 }}>
            ➕ New Project Ticket
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Active Software Sprints", val: "2 In Progress", color: TOKENS.blue },
          { label: "Staging Health Status", val: "100% Operational", color: TOKENS.teal },
          { label: "Completed Milestones", val: "14 Deliverables", color: TOKENS.paper },
          { label: "Assigned Dev Pod Engineers", val: "4 Full-Time", color: TOKENS.brass },
        ].map((c, i) => (
          <div key={i} style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 10, padding: 18 }}>
            <div style={{ fontSize: 11.5, color: TOKENS.slate }}>{c.label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: c.color, marginTop: 4 }}>{c.val}</div>
          </div>
        ))}
      </div>

      {/* Active Projects Table */}
      <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 12, overflow: "hidden", marginBottom: 28 }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${TOKENS.hair}`, fontWeight: 700, fontSize: 14 }}>
          Active Client Deliverables
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, textAlign: "left" }}>
          <thead>
            <tr style={{ background: TOKENS.panelAlt, borderBottom: `1px solid ${TOKENS.hair}`, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate }}>
              <th style={{ padding: "10px 16px" }}>Ticket ID</th>
              <th style={{ padding: "10px 16px" }}>Project Scope</th>
              <th style={{ padding: "10px 16px" }}>Tech Stack</th>
              <th style={{ padding: "10px 16px" }}>Current Sprint</th>
              <th style={{ padding: "10px 16px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: `1px solid ${TOKENS.hair}` }}>
              <td style={{ padding: "12px 16px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: TOKENS.blue }}>PRJ-2026-8841</td>
              <td style={{ padding: "12px 16px", fontWeight: 600 }}>Apex Neobank Mobile App & Microservices</td>
              <td style={{ padding: "12px 16px", fontSize: 12, color: TOKENS.slate }}>Flutter, Kotlin, Go, PostgreSQL</td>
              <td style={{ padding: "12px 16px" }}><span style={{ background: "rgba(37,99,235,0.1)", color: TOKENS.blue, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 700 }}>Sprint 4 (68%)</span></td>
              <td style={{ padding: "12px 16px" }}><button onClick={openTracker} style={{ background: "none", border: "none", color: TOKENS.blue, fontWeight: 600, cursor: "pointer" }}>Inspect →</button></td>
            </tr>
            <tr>
              <td style={{ padding: "12px 16px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: TOKENS.blue }}>PRJ-2026-9022</td>
              <td style={{ padding: "12px 16px", fontWeight: 600 }}>Cloud ERP Multi-Warehouse Sync</td>
              <td style={{ padding: "12px 16px", fontSize: 12, color: TOKENS.slate }}>Next.js 14, Node.js, Redis, Docker</td>
              <td style={{ padding: "12px 16px" }}><span style={{ background: "rgba(13,148,136,0.1)", color: TOKENS.teal, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 700 }}>Sprint 2 (30%)</span></td>
              <td style={{ padding: "12px 16px" }}><button onClick={openTracker} style={{ background: "none", border: "none", color: TOKENS.blue, fontWeight: 600, cursor: "pointer" }}>Inspect →</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Interactive Sprint Kanban Board */}
      <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 12, padding: 22, marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: TOKENS.paper }}>
              ⚡ Interactive Sprint Kanban Board (Sprint 4)
            </div>
            <div style={{ fontSize: 12, color: TOKENS.slate }}>
              Click any engineering ticket to advance its lifecycle state across the pod pipeline.
            </div>
          </div>
          <span style={{ background: TOKENS.badgeBg, color: TOKENS.blue, fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, padding: "3px 8px", borderRadius: 4 }}>
            LIVE SYNC ACTIVE
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
          {["Backlog", "In Dev", "Code Review", "Ready for Staging"].map((col) => {
            const colTasks = tasks.filter((t) => t.col === col);
            return (
              <div key={col} style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 10, padding: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: TOKENS.slate, marginBottom: 10, paddingBottom: 6, borderBottom: `1px solid ${TOKENS.hair}` }}>
                  <span>{col.toUpperCase()}</span>
                  <span>({colTasks.length})</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {colTasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => handleAdvanceTask(task.id)}
                      style={{
                        background: TOKENS.panel,
                        border: `1px solid ${TOKENS.hair}`,
                        borderRadius: 8,
                        padding: "10px 12px",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = TOKENS.blue)}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = TOKENS.hair)}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.blue, fontWeight: 700 }}>{task.id}</span>
                        <span style={{ fontSize: 9.5, color: TOKENS.teal, background: "rgba(13,148,136,0.1)", padding: "1px 5px", borderRadius: 3 }}>Advance ➔</span>
                      </div>
                      <div style={{ fontSize: 12.5, fontWeight: 600, color: TOKENS.paper, lineHeight: 1.4 }}>{task.title}</div>
                      <div style={{ fontSize: 10.5, color: TOKENS.slate, marginTop: 6 }}>{task.tag}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Grid: Live Git Commits & Billing Ledger */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24 }}>
        {/* Live Git Commit Telemetry */}
        <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 12, padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: TOKENS.paper }}>
              💻 Live Dev Pod Git Telemetry
            </div>
            <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.teal }}>● CI/CD GREEN</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {commits.map((c, idx) => (
              <div key={idx} style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: "10px 12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                  <code style={{ fontSize: 11, color: TOKENS.blue, fontWeight: 700 }}>{c.sha}</code>
                  <span style={{ fontSize: 10.5, color: TOKENS.teal, fontWeight: 600 }}>{c.tests}</span>
                </div>
                <div style={{ fontSize: 12, color: TOKENS.paper, fontWeight: 500, lineHeight: 1.3 }}>{c.msg}</div>
                <div style={{ fontSize: 10.5, color: TOKENS.slate, marginTop: 4 }}>
                  {c.author} • {c.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestone Invoicing & Billing */}
        <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 12, padding: 22 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: TOKENS.paper, marginBottom: 14 }}>
            🧾 Milestone Invoices & Contract Ledger
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {milestones.map((m, idx) => (
              <div key={idx} style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: TOKENS.paper }}>{m.title}</div>
                  <div style={{ fontSize: 10.5, color: TOKENS.slate, marginTop: 2 }}>
                    Inv: <code style={{ color: TOKENS.blue }}>{m.inv}</code> • Amount: <strong>{m.amount}</strong>
                  </div>
                </div>
                <div>
                  {m.status === "PAID" ? (
                    <button
                      onClick={() => {
                        setDownloadedInv(m.inv);
                        setTimeout(() => setDownloadedInv(null), 2500);
                      }}
                      style={{
                        background: downloadedInv === m.inv ? "rgba(13,148,136,0.2)" : "rgba(13,148,136,0.1)",
                        border: `1px solid ${TOKENS.teal}66`,
                        color: TOKENS.teal,
                        borderRadius: 6,
                        padding: "5px 10px",
                        fontSize: 11,
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      {downloadedInv === m.inv ? "✓ Downloaded" : "📥 Tax Inv"}
                    </button>
                  ) : (
                    <span style={{ background: "rgba(217,119,6,0.1)", color: TOKENS.brass, padding: "4px 8px", borderRadius: 4, fontSize: 10.5, fontWeight: 700 }}>
                      DUE UPON RELEASE
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- Page 8: AboutPage ---------------------------- */

function AboutPage({ go }) {
  const [activeTrustTab, setActiveTrustTab] = useState("data");
  const [downloadedNda, setDownloadedNda] = useState(false);
  const [downloadedSecurityPaper, setDownloadedSecurityPaper] = useState(false);

  const trustTabs = [
    { id: "data", label: "🔐 Data Protection & Encryption", icon: "🔐" },
    { id: "access", label: "🛡️ Zero-Trust Identity & SSO", icon: "🛡️" },
    { id: "network", label: "🌐 Edge WAF & Network Isolation", icon: "🌐" },
    { id: "audits", label: "🔬 Audits, CVE Scans & BCP", icon: "🔬" },
  ];

  const leadership = [
    {
      name: "K. S. Abhimanyu",
      role: "Founder & Chief Technology Officer",
      cred: "Distributed Systems & Cloud Architect",
      bio: "16+ years architecting high-throughput financial backends, distributed ledgers, and enterprise SaaS platforms. Champion of clean code and zero-technical-debt delivery.",
      avatar: "KA",
      color: TOKENS.blue,
      tags: ["Systems Architecture", "Go / Kubernetes", "Enterprise ERP"],
    },
    {
      name: "Srikanth Rao",
      role: "Principal Cloud & SRE Architect",
      cred: "Ex-ThoughtWorks • AWS Certified Solution Architect Pro",
      bio: "14+ years designing multi-AZ resilient cloud infrastructures, Kafka event streaming meshes, and zero-downtime microservice topologies handling 50k+ QPS.",
      avatar: "SR",
      color: TOKENS.teal,
      tags: ["Multi-AZ AWS/GCP", "Apache Kafka", "Kubernetes"],
    },
    {
      name: "Deepika Sundaram",
      role: "Head of Mobile & Android Engineering",
      cred: "Ex-Swiggy • Android GDE & Jetpack Compose Lead",
      bio: "11+ years leading flagship Android and cross-platform mobile apps. Pioneer in modern reactive Kotlin, offline-first Room synchronization, and 60fps animations.",
      avatar: "DS",
      color: "#8B5CF6",
      tags: ["Native Kotlin", "Jetpack Compose", "Mobile Keystore"],
    },
    {
      name: "Anand Vardhan",
      role: "Head of DevSecOps & Product Security",
      cred: "CISSP • CEH • Certified Kubernetes Security Specialist (CKS)",
      bio: "12+ years in corporate application security, ISO 27001 ISMS implementation, SOC 2 compliance audits, and automated DevSecOps CI/CD integration.",
      avatar: "AV",
      color: TOKENS.brass,
      tags: ["SOC 2 Type II", "OWASP Top 10", "Zero-Trust IAM"],
    },
  ];

  return (
    <div style={{ padding: "40px 20px 80px", maxWidth: 1140, margin: "0 auto" }}>
      <SectionHeading
        badge="Who We Are"
        title="Engineering Excellence & Digital Craftsmanship"
        subtitle="Abhimanyu Technologies is an enterprise software engineering company headquartered in Telangana, India, delivering world-class digital products and cloud services globally."
      />

      {/* Mission & Principles Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 40 }}>
        <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 12, padding: 24 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: TOKENS.paper, margin: "0 0 10px" }}>🎯 Our Core Mission</h3>
          <p style={{ fontSize: 13.5, color: TOKENS.slate, lineHeight: 1.6, margin: 0 }}>
            To empower visionary enterprises and scale-ups with high-performance web applications, native Android & mobile products, resilient cloud microservices, and specialized AI systems built with uncompromised engineering rigor.
          </p>
        </div>

        <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 12, padding: 24 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: TOKENS.paper, margin: "0 0 10px" }}>🛡️ Development Principles</h3>
          <p style={{ fontSize: 13.5, color: TOKENS.slate, lineHeight: 1.6, margin: 0 }}>
            We champion strict type safety, clean hexagonal architectures, automated end-to-end testing, zero technical debt, 100% client code ownership, and transparent daily burndown communication.
          </p>
        </div>
      </div>

      {/* Interactive Security, Compliance & Trust Center */}
      <div
        style={{
          background: TOKENS.panel,
          border: `1px solid ${TOKENS.hair}`,
          borderRadius: 14,
          padding: 28,
          marginBottom: 44,
          boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14, marginBottom: 20 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 22 }}>🛡️</span>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: TOKENS.paper }}>
                Enterprise Security, Compliance & Trust Center
              </h3>
              <span style={{ background: "rgba(16,185,129,0.12)", color: "#10B981", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, padding: "2px 8px", borderRadius: 4 }}>
                ZERO-TRUST CERTIFIED
              </span>
            </div>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: TOKENS.slate }}>
              How Abhimanyu Technologies safeguards client intellectual property, proprietary business logic, and sensitive customer data.
            </p>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <Button
              onClick={() => {
                setDownloadedNda(true);
                setTimeout(() => setDownloadedNda(false), 2500);
              }}
              variant="secondary"
              style={{ padding: "8px 14px", fontSize: 12 }}
            >
              {downloadedNda ? "✓ NDA Downloaded" : "📄 Download Bilateral NDA (.pdf)"}
            </Button>
            <Button
              onClick={() => {
                setDownloadedSecurityPaper(true);
                setTimeout(() => setDownloadedSecurityPaper(false), 2500);
              }}
              style={{ padding: "8px 14px", fontSize: 12 }}
            >
              {downloadedSecurityPaper ? "✓ Paper Downloaded" : "🛡️ Download Security Whitepaper"}
            </Button>
          </div>
        </div>

        {/* Compliance Badges Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 12, marginBottom: 22 }}>
          {[
            { badge: "SOC 2 Type II", desc: "Clean Opinion on Security & Availability" },
            { badge: "ISO/IEC 27001:2022", desc: "Information Security Management System" },
            { badge: "GDPR & DPDP Act 2023", desc: "Data Privacy & Geographic Localization" },
            { badge: "HIPAA BAA Ready", desc: "ePHI Safeguards for Healthcare" },
            { badge: "OWASP Top 10 Verified", desc: "Zero Critical Vulnerabilities in CI/CD" },
          ].map((c, ci) => (
            <div
              key={ci}
              style={{
                background: TOKENS.panelAlt,
                border: `1px solid ${TOKENS.hair}`,
                borderRadius: 8,
                padding: "12px 14px",
                textAlign: "center",
              }}
            >
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: TOKENS.blue, marginBottom: 4 }}>
                ✓ {c.badge}
              </div>
              <div style={{ fontSize: 10.5, color: TOKENS.slate }}>{c.desc}</div>
            </div>
          ))}
        </div>

        {/* Tab Controls for Security Controls */}
        <div style={{ display: "flex", gap: 6, borderBottom: `1px solid ${TOKENS.hair}`, paddingBottom: 10, marginBottom: 18, overflowX: "auto" }}>
          {trustTabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTrustTab(t.id)}
              style={{
                background: activeTrustTab === t.id ? TOKENS.badgeBg : "transparent",
                border: `1px solid ${activeTrustTab === t.id ? TOKENS.blue : "transparent"}`,
                borderRadius: 6,
                padding: "6px 14px",
                fontSize: 12.5,
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: activeTrustTab === t.id ? 700 : 500,
                color: activeTrustTab === t.id ? TOKENS.blue : TOKENS.slate,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Active Trust Tab Content */}
        <div style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 10, padding: 20 }}>
          {activeTrustTab === "data" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: TOKENS.paper }}>
                  Cryptographic Data Protection & Storage Isolation
                </h4>
                <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.teal, background: "rgba(13,148,136,0.12)", padding: "2px 8px", borderRadius: 4 }}>
                  AES-256-GCM • TLS 1.3 PFS
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, fontSize: 12.5, color: TOKENS.slate, lineHeight: 1.6 }}>
                <div>
                  • <strong>Storage Encryption</strong>: All production databases (PostgreSQL, Redis, S3/GCS buckets) utilize hardware-accelerated AES-256 encryption with customer-managed keys (CMK) rotated automatically every 90 days.<br />
                  • <strong>Transport Security</strong>: Strict TLS 1.3 enforced for all edge ingress and internal service-to-service communications with HSTS preloading.
                </div>
                <div>
                  • <strong>Field-Level Tokenization</strong>: Sensitive client credentials, payment tokens, and PII are salted and encrypted at the application layer prior to DB write.<br />
                  • <strong>Geographic Data Sovereignty</strong>: Dedicated infrastructure clusters deployed in Hyderabad/Mumbai (India), Frankfurt (EU), or US-East to satisfy statutory data residency laws.
                </div>
              </div>
            </div>
          )}

          {activeTrustTab === "access" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: TOKENS.paper }}>
                  Zero-Trust Identity, SSO & Least-Privilege IAM
                </h4>
                <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.blue, background: "rgba(37,99,235,0.12)", padding: "2px 8px", borderRadius: 4 }}>
                  SAML 2.0 • WebAuthn FIDO2
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, fontSize: 12.5, color: TOKENS.slate, lineHeight: 1.6 }}>
                <div>
                  • <strong>Enterprise SSO Integration</strong>: Centralized SAML 2.0 and OIDC federation with Okta, Azure Active Directory, and Google Workspace.<br />
                  • <strong>Hardware Token MFA</strong>: Mandatory FIDO2 / WebAuthn physical security keys (YubiKey) required for all staff with production infrastructure access.
                </div>
                <div>
                  • <strong>Just-In-Time (JIT) IAM Privileges</strong>: Zero standing administrative access to production systems. Privileged sessions granted for maximum 60 minutes with two-party authorization.<br />
                  • <strong>Continuous Session Logging</strong>: All terminal and database queries recorded into append-only cryptographic audit logs.
                </div>
              </div>
            </div>
          )}

          {activeTrustTab === "network" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: TOKENS.paper }}>
                  Edge WAF, DDoS Shield & VPC Micro-Segmentation
                </h4>
                <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "#10B981", background: "rgba(16,185,129,0.12)", padding: "2px 8px", borderRadius: 4 }}>
                  CLOUDFLARE ENTERPRISE • mTLS
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, fontSize: 12.5, color: TOKENS.slate, lineHeight: 1.6 }}>
                <div>
                  • <strong>Autonomous DDoS Defense</strong>: Multi-Tbps edge scrubbing network mitigating Layer 3, 4, and 7 attacks in under 3 seconds without latency impact.<br />
                  • <strong>Web Application Firewall (WAF)</strong>: Managed OWASP Core Rule Sets blocking SQLi, XSS, SSRF, and credential stuffing at edge PoPs.
                </div>
                <div>
                  • <strong>Isolated VPC Topology</strong>: Databases and microservice pods reside inside strictly private subnets with no public IPv4 addresses.<br />
                  • <strong>Service Mesh Mutual TLS</strong>: Pod-to-pod communication encrypted with short-lived X.509 certificates managed by Istio / Envoy.
                </div>
              </div>
            </div>
          )}

          {activeTrustTab === "audits" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: TOKENS.paper }}>
                  Continuous Vulnerability Assessment & Disaster Recovery (BCP)
                </h4>
                <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.brass, background: "rgba(217,119,6,0.12)", padding: "2px 8px", borderRadius: 4 }}>
                  RPO &lt; 15s • RTO &lt; 60s
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, fontSize: 12.5, color: TOKENS.slate, lineHeight: 1.6 }}>
                <div>
                  • <strong>Automated DevSecOps Pipeline</strong>: Snyk and Trivy static container scanning executed on every pull request. Builds halted on any unresolved CVE.<br />
                  • <strong>Independent Penetration Testing</strong>: Annual white-box penetration assessments conducted by CERT-In empanelled ethical security firms.
                </div>
                <div>
                  • <strong>Active-Active Multi-AZ Failover</strong>: Automated PostgreSQL streaming replication with sub-15-second Recovery Point Objective (RPO).<br />
                  • <strong>Chaos Engineering & Drills</strong>: Quarterly automated disaster recovery simulation exercises ensuring continuous business continuity.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Senior Technical Leadership & Principal Architects */}
      <div style={{ marginBottom: 44 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: TOKENS.paper, margin: "0 0 8px" }}>
            Senior Engineering Leadership & Principal Architects
          </h3>
          <p style={{ fontSize: 13.5, color: TOKENS.slate, maxWidth: 640, margin: "0 auto" }}>
            Our development pods are directed by seasoned technology leaders with deep battle-tested experience across global technology organizations.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
          {leadership.map((l, i) => (
            <div
              key={i}
              style={{
                background: TOKENS.panel,
                border: `1px solid ${TOKENS.hair}`,
                borderRadius: 12,
                padding: 22,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: "50%",
                      background: l.color,
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      fontWeight: 700,
                    }}
                  >
                    {l.avatar}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: TOKENS.paper }}>{l.name}</h4>
                    <div style={{ fontSize: 11.5, fontWeight: 600, color: l.color }}>{l.role}</div>
                  </div>
                </div>

                <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.teal, marginBottom: 10 }}>
                  {l.cred}
                </div>

                <p style={{ margin: "0 0 16px", fontSize: 12.5, color: TOKENS.slate, lineHeight: 1.55 }}>
                  {l.bio}
                </p>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, borderTop: `1px solid ${TOKENS.hair}`, paddingTop: 12 }}>
                {l.tags.map((t, ti) => (
                  <span
                    key={ti}
                    style={{
                      background: TOKENS.panelAlt,
                      borderRadius: 4,
                      padding: "2px 6px",
                      fontSize: 10.5,
                      fontFamily: "'JetBrains Mono', monospace",
                      color: TOKENS.paper,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Delivery Hubs CTA Card */}
      <div style={{ background: `linear-gradient(135deg, ${TOKENS.panelAlt} 0%, ${TOKENS.panel} 100%)`, border: `1px solid ${TOKENS.hair}`, borderRadius: 14, padding: 32, textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
        <h3 style={{ fontSize: 21, fontWeight: 700, color: TOKENS.paper, margin: "0 0 10px" }}>
          Ready to Accelerate Your Engineering Roadmap?
        </h3>
        <p style={{ fontSize: 14, color: TOKENS.slate, maxWidth: 640, margin: "0 auto 24px", lineHeight: 1.6 }}>
          Headquartered in the Telangana Technology Corridor with distributed engineering teams across Hyderabad, Bengaluru, Chennai, and global delivery nodes.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Button onClick={() => go("contact")} style={{ padding: "11px 22px", fontSize: 14 }}>
            Schedule an Architecture Consultation →
          </Button>
          <Button onClick={() => go("rfq-wizard")} variant="secondary" style={{ padding: "11px 20px", fontSize: 14 }}>
            ⚡ Plan Project Scope
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- Page 9: CareersPage ---------------------------- */

function CareersPage({ go }) {
  const [appliedRole, setAppliedRole] = useState(null);

  const roles = [
    { title: "Senior Full Stack Engineer (React + Node/Go)", team: "Digital Platforms", loc: "Hyderabad / Remote", exp: "4-7 years", comp: "₹18L - ₹32L PA" },
    { title: "Senior Android Engineer (Kotlin + Jetpack Compose)", team: "Mobile Engineering", loc: "Bengaluru / Remote", exp: "3-6 years", comp: "₹16L - ₹28L PA" },
    { title: "Frontend Architecture Lead (Next.js + Design Systems)", team: "UI/UX Engineering", loc: "Telangana / Remote", exp: "5-9 years", comp: "₹22L - ₹38L PA" },
    { title: "Staff AI/ML Systems Engineer (Python + Vector DBs)", team: "AI & Data Engineering", loc: "Hyderabad / Remote", exp: "5-8 years", comp: "₹24L - ₹42L PA" },
    { title: "DevOps & Cloud SRE Architect (AWS + Kubernetes)", team: "Infrastructure", loc: "Chennai / Remote", exp: "4-8 years", comp: "₹20L - ₹35L PA" },
  ];

  return (
    <div style={{ padding: "40px 20px 80px", maxWidth: 1000, margin: "0 auto" }}>
      <SectionHeading
        badge="Join Our Team"
        title="Build Future-Proof Software with Us"
        subtitle="Work on high-throughput microservices, cutting-edge Android apps, and enterprise cloud platforms with top-tier engineers."
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {roles.map((r, i) => (
          <div
            key={i}
            style={{
              background: TOKENS.panel,
              border: `1px solid ${TOKENS.hair}`,
              borderRadius: 12,
              padding: 20,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: TOKENS.paper }}>{r.title}</div>
              <div style={{ fontSize: 12.5, color: TOKENS.slate, marginTop: 4 }}>
                {r.team} • {r.loc} • Exp: {r.exp}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700, color: TOKENS.blue }}>
                {r.comp}
              </div>
              <Button onClick={() => setAppliedRole(r.title)} style={{ padding: "8px 14px", fontSize: 12 }}>
                Quick Apply →
              </Button>
            </div>
          </div>
        ))}
      </div>

      {appliedRole && (
        <div style={{ marginTop: 24, padding: 18, background: "rgba(13, 148, 136, 0.1)", border: `1px solid ${TOKENS.teal}`, borderRadius: 8, textAlign: "center" }}>
          <span style={{ fontWeight: 700, color: TOKENS.teal }}>✓ Application Started for {appliedRole}!</span>
          <div style={{ fontSize: 13, color: TOKENS.paper, marginTop: 4 }}>
            Please email your resume and GitHub profile to <code style={{ fontWeight: 700 }}>careers@abhimanu-technologies.app</code>.
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------- Page 10: ContactPage ---------------------------- */

function ContactPage() {
  const [activeTab, setActiveTab] = useState("calendar"); // "calendar" | "rfp"

  // Calendar State
  const [selectedPractice, setSelectedPractice] = useState("Web & Next.js 14");
  const [selectedDate, setSelectedDate] = useState("Tomorrow (Recommended)");
  const [selectedTimezone, setSelectedTimezone] = useState("IST (UTC+5:30) - Asia/Kolkata");
  const [selectedSlot, setSelectedSlot] = useState("02:00 PM - 02:45 PM");
  const [calForm, setCalForm] = useState({ name: "", email: "", company: "", topic: "" });
  const [calBooked, setCalBooked] = useState(false);
  const [copiedMeet, setCopiedMeet] = useState(false);
  const [downloadedIcs, setDownloadedIcs] = useState(false);

  // RFP Form State
  const [rfpSubmitted, setRfpSubmitted] = useState(false);
  const [rfpForm, setRfpForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "Web Application Development",
    budget: "₹15,00,000 - ₹30,00,000",
    message: "",
    ndaRequired: true,
  });

  const handleBookCalendar = (e) => {
    e.preventDefault();
    setCalBooked(true);
  };

  const handleRfpSubmit = (e) => {
    e.preventDefault();
    setRfpSubmitted(true);
  };

  return (
    <div style={{ padding: "40px 20px 80px", maxWidth: 1040, margin: "0 auto" }}>
      <SectionHeading
        badge="Get in Touch"
        title="Technical Consultation & Architectural Advisory"
        subtitle="Speak directly with senior enterprise architects. Receive NDA-protected system designs, cost models, and feasibility reviews."
      />

      {/* Mode Switcher Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 12,
          marginBottom: 32,
        }}
      >
        <button
          onClick={() => setActiveTab("calendar")}
          style={{
            background: activeTab === "calendar" ? TOKENS.blue : TOKENS.panel,
            color: activeTab === "calendar" ? "#FFFFFF" : TOKENS.paper,
            border: `1px solid ${activeTab === "calendar" ? TOKENS.blue : TOKENS.hair}`,
            borderRadius: 8,
            padding: "10px 22px",
            fontSize: 13.5,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            boxShadow: activeTab === "calendar" ? "0 4px 14px rgba(37,99,235,0.3)" : "none",
            transition: "all 0.15s ease",
          }}
        >
          <span>⚡</span>
          <span>Book Direct Architect Video Session (Google Meet)</span>
        </button>

        <button
          onClick={() => setActiveTab("rfp")}
          style={{
            background: activeTab === "rfp" ? TOKENS.blue : TOKENS.panel,
            color: activeTab === "rfp" ? "#FFFFFF" : TOKENS.paper,
            border: `1px solid ${activeTab === "rfp" ? TOKENS.blue : TOKENS.hair}`,
            borderRadius: 8,
            padding: "10px 22px",
            fontSize: 13.5,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            boxShadow: activeTab === "rfp" ? "0 4px 14px rgba(37,99,235,0.3)" : "none",
            transition: "all 0.15s ease",
          }}
        >
          <span>📝</span>
          <span>Submit Written RFP & Request Bilateral NDA</span>
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.35fr", gap: 32, alignItems: "start" }}>
        {/* Info Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 12, padding: 22 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: TOKENS.paper, margin: "0 0 10px" }}>🏢 Engineering Headquarters</h3>
            <div style={{ fontSize: 13.5, color: TOKENS.slate, lineHeight: 1.6 }}>
              Abhimanyu Technologies Pvt. Ltd.<br />
              Telangana Technology Corridor, India<br />
              Email: <strong>contact@abhimanu-technologies.app</strong><br />
              Direct: <strong>+91 (040) 8491-0022</strong>
            </div>
          </div>

          <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 12, padding: 22 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: TOKENS.paper, margin: "0 0 10px" }}>🛡️ Consultation Guarantees</h3>
            <div style={{ fontSize: 13, color: TOKENS.slate, lineHeight: 1.6 }}>
              • <strong>Bilateral NDA Signed Upfront</strong>: Your proprietary logic and code remain 100% confidential.<br />
              • <strong>Senior Staff Only</strong>: You converse directly with Principal Architects, never non-technical sales reps.<br />
              • <strong>Free Architecture Whitepaper</strong>: Following the 45-min call, receive a tailored system topology map and milestone breakdown.<br />
              • <strong>Sprint-Based Fixed Pricing</strong>: Predictable milestones with zero hidden lock-in fees.
            </div>
          </div>

          {/* Assigned Lead Architect Card */}
          <div
            style={{
              background: `linear-gradient(135deg, ${TOKENS.panelAlt} 0%, ${TOKENS.panel} 100%)`,
              border: `1px solid ${TOKENS.teal}55`,
              borderRadius: 12,
              padding: 20,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: TOKENS.teal,
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                SR
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: TOKENS.paper }}>Srikanth Rao</div>
                <div style={{ fontSize: 11, color: TOKENS.teal, fontFamily: "'JetBrains Mono', monospace" }}>
                  Principal Cloud & Distributed Systems Architect
                </div>
              </div>
            </div>
            <p style={{ margin: 0, fontSize: 12, color: TOKENS.slate, lineHeight: 1.5 }}>
              14+ years designing high-throughput backends and native mobile applications. Ex-ThoughtWorks, AWS Certified Solutions Architect Professional.
            </p>
          </div>
        </div>

        {/* Right Interaction Card */}
        <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 14, padding: 28, boxShadow: "0 2px 14px rgba(0,0,0,0.03)" }}>
          {activeTab === "calendar" ? (
            /* Tab A: Calendar Scheduler */
            calBooked ? (
              <div style={{ textAlign: "center", padding: "20px 10px" }}>
                <span style={{ fontSize: 44 }}>🎉</span>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: TOKENS.paper, margin: "14px 0 6px" }}>
                  Consultation Confirmed!
                </h3>
                <p style={{ fontSize: 13, color: TOKENS.slate, margin: "0 0 20px" }}>
                  A calendar invite and bilateral NDA packet have been dispatched to <strong>{calForm.email}</strong>.
                </p>

                {/* Video Pass Card */}
                <div
                  style={{
                    background: TOKENS.panelAlt,
                    border: `1px solid ${TOKENS.teal}66`,
                    borderRadius: 10,
                    padding: "18px 20px",
                    textAlign: "left",
                    marginBottom: 20,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, borderBottom: `1px solid ${TOKENS.hair}`, paddingBottom: 10 }}>
                    <span style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: TOKENS.teal }}>
                      ● SECURE ARCHITECTURE VIDEO SESSION
                    </span>
                    <span style={{ fontSize: 11, color: TOKENS.slate }}>45 Minutes</span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 12.5, marginBottom: 14 }}>
                    <div>
                      <span style={{ color: TOKENS.slate }}>Domain: </span>
                      <strong style={{ color: TOKENS.paper }}>{selectedPractice}</strong>
                    </div>
                    <div>
                      <span style={{ color: TOKENS.slate }}>Lead Architect: </span>
                      <strong style={{ color: TOKENS.paper }}>Srikanth Rao</strong>
                    </div>
                    <div>
                      <span style={{ color: TOKENS.slate }}>Date: </span>
                      <strong style={{ color: TOKENS.paper }}>{selectedDate}</strong>
                    </div>
                    <div>
                      <span style={{ color: TOKENS.slate }}>Time Slot: </span>
                      <strong style={{ color: TOKENS.paper }}>{selectedSlot}</strong>
                    </div>
                  </div>

                  <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: TOKENS.blue, fontWeight: 600 }}>
                      https://meet.google.com/abh-8841-sre
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText("https://meet.google.com/abh-8841-sre");
                        setCopiedMeet(true);
                        setTimeout(() => setCopiedMeet(false), 2000);
                      }}
                      style={{
                        background: TOKENS.panelAlt,
                        border: `1px solid ${TOKENS.hair}`,
                        borderRadius: 4,
                        padding: "4px 8px",
                        fontSize: 11,
                        cursor: "pointer",
                        color: copiedMeet ? "#10B981" : TOKENS.paper,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {copiedMeet ? "✓ Copied" : "📋 Copy"}
                    </button>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                  <Button
                    onClick={() => {
                      setDownloadedIcs(true);
                      setTimeout(() => setDownloadedIcs(false), 2500);
                    }}
                    style={{ padding: "8px 16px", fontSize: 12 }}
                  >
                    {downloadedIcs ? "✓ Calendar (.ics) Downloaded" : "📥 Add to Google / Outlook Calendar"}
                  </Button>
                  <Button onClick={() => setCalBooked(false)} variant="secondary" style={{ padding: "8px 14px", fontSize: 12 }}>
                    Book Another Slot
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookCalendar} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: TOKENS.paper, display: "block", marginBottom: 6 }}>
                    1. Select Technical Practice / Domain
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {[
                      "Web & Next.js 14",
                      "Mobile & Kotlin / Flutter",
                      "Backend & Microservices",
                      "Cloud & Kubernetes DevOps",
                      "Enterprise AI & Custom LLMs",
                      "Custom Enterprise Engineering",
                    ].map((p) => (
                      <button
                        type="button"
                        key={p}
                        onClick={() => setSelectedPractice(p)}
                        style={{
                          background: selectedPractice === p ? TOKENS.badgeBg : TOKENS.panelAlt,
                          border: `1px solid ${selectedPractice === p ? TOKENS.blue : TOKENS.hair}`,
                          color: selectedPractice === p ? TOKENS.blue : TOKENS.paper,
                          padding: "8px 10px",
                          borderRadius: 6,
                          fontSize: 11.5,
                          textAlign: "left",
                          cursor: "pointer",
                          fontWeight: selectedPractice === p ? 700 : 500,
                        }}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: TOKENS.paper, display: "block", marginBottom: 6 }}>
                    2. Select Consultation Date
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
                    {[
                      "Today (Urgent Intake)",
                      "Tomorrow (Recommended)",
                      "In 2 Days",
                      "In 3 Days",
                    ].map((d) => (
                      <button
                        type="button"
                        key={d}
                        onClick={() => setSelectedDate(d)}
                        style={{
                          background: selectedDate === d ? TOKENS.badgeBg : TOKENS.panelAlt,
                          border: `1px solid ${selectedDate === d ? TOKENS.blue : TOKENS.hair}`,
                          color: selectedDate === d ? TOKENS.blue : TOKENS.paper,
                          padding: "7px 6px",
                          borderRadius: 6,
                          fontSize: 10.5,
                          cursor: "pointer",
                          textAlign: "center",
                          fontWeight: selectedDate === d ? 700 : 500,
                        }}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr", gap: 10 }}>
                  <div>
                    <label style={{ fontSize: 12, color: TOKENS.slate, display: "block", marginBottom: 4 }}>Timezone</label>
                    <select
                      value={selectedTimezone}
                      onChange={(e) => setSelectedTimezone(e.target.value)}
                      style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: `1px solid ${TOKENS.hair}`, background: TOKENS.panel, color: TOKENS.paper, fontSize: 11.5 }}
                    >
                      <option value="IST (UTC+5:30) - Asia/Kolkata">IST (UTC+5:30) - India</option>
                      <option value="UTC - Universal Time">UTC - London / Universal</option>
                      <option value="EST (UTC-5) - New York">EST (UTC-5) - Americas</option>
                      <option value="SGT (UTC+8) - Singapore">SGT (UTC+8) - Singapore</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: 12, color: TOKENS.slate, display: "block", marginBottom: 4 }}>Available 45-Min Slots</label>
                    <select
                      value={selectedSlot}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: `1px solid ${TOKENS.hair}`, background: TOKENS.panel, color: TOKENS.paper, fontSize: 11.5 }}
                    >
                      <option value="10:00 AM - 10:45 AM">10:00 AM - 10:45 AM</option>
                      <option value="11:30 AM - 12:15 PM">11:30 AM - 12:15 PM</option>
                      <option value="02:00 PM - 02:45 PM">02:00 PM - 02:45 PM (Recommended)</option>
                      <option value="04:30 PM - 05:15 PM">04:30 PM - 05:15 PM</option>
                      <option value="07:00 PM - 07:45 PM">07:00 PM - 07:45 PM</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div>
                    <label style={{ fontSize: 12, color: TOKENS.slate, display: "block", marginBottom: 4 }}>Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Chandra"
                      value={calForm.name}
                      onChange={(e) => setCalForm({ ...calForm, name: e.target.value })}
                      style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: `1px solid ${TOKENS.hair}`, background: TOKENS.panel, color: TOKENS.paper, fontSize: 12.5 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: TOKENS.slate, display: "block", marginBottom: 4 }}>Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="ramesh@company.com"
                      value={calForm.email}
                      onChange={(e) => setCalForm({ ...calForm, email: e.target.value })}
                      style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: `1px solid ${TOKENS.hair}`, background: TOKENS.panel, color: TOKENS.paper, fontSize: 12.5 }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 12, color: TOKENS.slate, display: "block", marginBottom: 4 }}>Company / Startup Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Apex FinTech Solutions"
                    value={calForm.company}
                    onChange={(e) => setCalForm({ ...calForm, company: e.target.value })}
                    style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: `1px solid ${TOKENS.hair}`, background: TOKENS.panel, color: TOKENS.paper, fontSize: 12.5 }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 12, color: TOKENS.slate, display: "block", marginBottom: 4 }}>What would you like to solve on this call?</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Scaling Next.js server components, database sharding, or native Kotlin app migration..."
                    value={calForm.topic}
                    onChange={(e) => setCalForm({ ...calForm, topic: e.target.value })}
                    style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: `1px solid ${TOKENS.hair}`, background: TOKENS.panel, color: TOKENS.paper, fontSize: 12.5 }}
                  />
                </div>

                <Button type="submit" style={{ padding: "12px", width: "100%", fontSize: 13 }}>
                  Confirm 45-Min Architect Session (Free & NDA-Protected) →
                </Button>
              </form>
            )
          ) : (
            /* Tab B: RFP & Written Inquiry */
            rfpSubmitted ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <span style={{ fontSize: 40 }}>✅</span>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: TOKENS.paper, margin: "12px 0 6px" }}>RFP Received!</h3>
                <p style={{ fontSize: 13.5, color: TOKENS.slate }}>Thank you, {rfpForm.name}. Our Solutions Architect will review your scope and respond to {rfpForm.email} within 12 business hours.</p>
                <Button onClick={() => setRfpSubmitted(false)} variant="secondary" style={{ marginTop: 14 }}>Submit Another RFP</Button>
              </div>
            ) : (
              <form onSubmit={handleRfpSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 12, color: TOKENS.slate, display: "block", marginBottom: 4 }}>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Chandra"
                    value={rfpForm.name}
                    onChange={(e) => setRfpForm({ ...rfpForm, name: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: 6, border: `1px solid ${TOKENS.hair}`, background: TOKENS.panel, color: TOKENS.paper, fontSize: 13 }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 12, color: TOKENS.slate, display: "block", marginBottom: 4 }}>Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="ramesh@company.com"
                      value={rfpForm.email}
                      onChange={(e) => setRfpForm({ ...rfpForm, email: e.target.value })}
                      style={{ width: "100%", padding: "10px", borderRadius: 6, border: `1px solid ${TOKENS.hair}`, background: TOKENS.panel, color: TOKENS.paper, fontSize: 13 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: TOKENS.slate, display: "block", marginBottom: 4 }}>Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={rfpForm.phone}
                      onChange={(e) => setRfpForm({ ...rfpForm, phone: e.target.value })}
                      style={{ width: "100%", padding: "10px", borderRadius: 6, border: `1px solid ${TOKENS.hair}`, background: TOKENS.panel, color: TOKENS.paper, fontSize: 13 }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 12, color: TOKENS.slate, display: "block", marginBottom: 4 }}>Primary Service of Interest</label>
                    <select
                      value={rfpForm.service}
                      onChange={(e) => setRfpForm({ ...rfpForm, service: e.target.value })}
                      style={{ width: "100%", padding: "10px", borderRadius: 6, border: `1px solid ${TOKENS.hair}`, background: TOKENS.panel, color: TOKENS.paper, fontSize: 13 }}
                    >
                      <option value="Web Development">Web Application Development (Next.js / React)</option>
                      <option value="Android & Mobile">Android & Mobile App Development (Kotlin / Flutter)</option>
                      <option value="Backend Microservices">Backend & API Engineering (Node / Python / Go)</option>
                      <option value="Full Stack System">Turnkey Full-Stack Product</option>
                      <option value="Cloud DevOps">Cloud, DevOps & Kubernetes (AWS / GCP)</option>
                      <option value="Enterprise AI">Enterprise AI & Custom LLMs</option>
                      <option value="Product SaaS Demo">Abhimanyu SaaS Product Demo</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: 12, color: TOKENS.slate, display: "block", marginBottom: 4 }}>Estimated Budget Range</label>
                    <select
                      value={rfpForm.budget}
                      onChange={(e) => setRfpForm({ ...rfpForm, budget: e.target.value })}
                      style={{ width: "100%", padding: "10px", borderRadius: 6, border: `1px solid ${TOKENS.hair}`, background: TOKENS.panel, color: TOKENS.paper, fontSize: 13 }}
                    >
                      <option value="₹5,00,000 - ₹15,00,000">₹5,00,000 - ₹15,00,000 ($6k - $18k)</option>
                      <option value="₹15,00,000 - ₹30,00,000">₹15,00,000 - ₹30,00,000 ($18k - $36k)</option>
                      <option value="₹30,00,000 - ₹75,00,000">₹30,00,000 - ₹75,00,000 ($36k - $90k)</option>
                      <option value="₹75,00,000+">₹75,00,000+ ($90k+ Enterprise Pod)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 12, color: TOKENS.slate, display: "block", marginBottom: 4 }}>Project Details / Architecture Scope *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Outline your requirements, tech preferences, or project timeline..."
                    value={rfpForm.message}
                    onChange={(e) => setRfpForm({ ...rfpForm, message: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: 6, border: `1px solid ${TOKENS.hair}`, background: TOKENS.panel, color: TOKENS.paper, fontSize: 13 }}
                  />
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: TOKENS.slate }}>
                  <input
                    type="checkbox"
                    id="ndaCheck"
                    checked={rfpForm.ndaRequired}
                    onChange={(e) => setRfpForm({ ...rfpForm, ndaRequired: e.target.checked })}
                  />
                  <label htmlFor="ndaCheck">
                    Require automated Bilateral Non-Disclosure Agreement (NDA) countersigned before technical disclosure.
                  </label>
                </div>

                <Button type="submit" style={{ padding: "12px", width: "100%" }}>
                  Submit RFP Consultation Request →
                </Button>
              </form>
            )
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- Universal Footer ---------------------------- */

function Footer({ go, openStatusModal }) {
  return (
    <footer
      style={{
        background: TOKENS.panelAlt,
        borderTop: `1px solid ${TOKENS.hair}`,
        padding: "60px 20px 40px",
        color: TOKENS.slate,
        fontSize: 13,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 36,
          marginBottom: 40,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <TransparentLogo src="/logo.png" height={32} />
            <span style={{ fontSize: 16, fontWeight: 700, color: TOKENS.paper }}>Abhimanyu</span>
          </div>
          <p style={{ lineHeight: 1.6, margin: "0 0 16px" }}>
            Global Software Engineering, Cloud-Native Backends, Native Mobile & Web Platforms, and Enterprise Solutions. Sloganed to Scale Your Business.
          </p>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.teal }}>
            📍 Telangana • Pan-India • Global Delivery
          </div>
        </div>

        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: TOKENS.paper, marginBottom: 14 }}>
            IT SERVICES
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button onClick={() => go("services")} style={{ background: "none", border: "none", color: TOKENS.slate, textAlign: "left", cursor: "pointer", padding: 0 }}>Web Application Development</button>
            <button onClick={() => go("services")} style={{ background: "none", border: "none", color: TOKENS.slate, textAlign: "left", cursor: "pointer", padding: 0 }}>Android & Mobile App Development</button>
            <button onClick={() => go("services")} style={{ background: "none", border: "none", color: TOKENS.slate, textAlign: "left", cursor: "pointer", padding: 0 }}>Backend Microservices & APIs</button>
            <button onClick={() => go("services")} style={{ background: "none", border: "none", color: TOKENS.slate, textAlign: "left", cursor: "pointer", padding: 0 }}>Frontend UI/UX Design Systems</button>
            <button onClick={() => go("services")} style={{ background: "none", border: "none", color: TOKENS.slate, textAlign: "left", cursor: "pointer", padding: 0 }}>Cloud, DevOps & SRE (AWS/GCP)</button>
            <button onClick={() => go("services")} style={{ background: "none", border: "none", color: TOKENS.slate, textAlign: "left", cursor: "pointer", padding: 0 }}>Enterprise AI & RAG Solutions</button>
          </div>
        </div>

        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: TOKENS.paper, marginBottom: 14 }}>
            INDUSTRIES & SOLUTIONS
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button onClick={() => go("industries")} style={{ background: "none", border: "none", color: TOKENS.slate, textAlign: "left", cursor: "pointer", padding: 0 }}>Banking, FinTech & Payments</button>
            <button onClick={() => go("industries")} style={{ background: "none", border: "none", color: TOKENS.slate, textAlign: "left", cursor: "pointer", padding: 0 }}>Healthcare & Life Sciences</button>
            <button onClick={() => go("industries")} style={{ background: "none", border: "none", color: TOKENS.slate, textAlign: "left", cursor: "pointer", padding: 0 }}>Retail, E-Commerce & Omnichannel</button>
            <button onClick={() => go("industries")} style={{ background: "none", border: "none", color: TOKENS.slate, textAlign: "left", cursor: "pointer", padding: 0 }}>Logistics & Intelligent Supply Chain</button>
            <button onClick={() => go("industries")} style={{ background: "none", border: "none", color: TOKENS.slate, textAlign: "left", cursor: "pointer", padding: 0 }}>High-Tech SaaS & Cloud Platforms</button>
            <button onClick={() => go("industries")} style={{ background: "none", border: "none", color: TOKENS.slate, textAlign: "left", cursor: "pointer", padding: 0 }}>Smart Manufacturing & Industrial IoT</button>
          </div>
        </div>

        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: TOKENS.paper, marginBottom: 14 }}>
            COMPANY & LEGAL
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button onClick={() => go("about")} style={{ background: "none", border: "none", color: TOKENS.slate, textAlign: "left", cursor: "pointer", padding: 0 }}>About Us</button>
            <button onClick={() => go("case-studies")} style={{ background: "none", border: "none", color: TOKENS.slate, textAlign: "left", cursor: "pointer", padding: 0 }}>Case Studies & Portfolio</button>
            <button onClick={() => go("knowledge")} style={{ background: "none", border: "none", color: TOKENS.slate, textAlign: "left", cursor: "pointer", padding: 0 }}>Engineering Playbooks</button>
            <button onClick={() => go("careers")} style={{ background: "none", border: "none", color: TOKENS.slate, textAlign: "left", cursor: "pointer", padding: 0 }}>Careers & Open Roles</button>
            <button onClick={() => go("contact")} style={{ background: "none", border: "none", color: TOKENS.slate, textAlign: "left", cursor: "pointer", padding: 0 }}>Contact & Consultation</button>
            <button onClick={openStatusModal} style={{ background: "none", border: "none", color: "#10B981", textAlign: "left", cursor: "pointer", padding: 0, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} />
              Live System Status & SLA (99.99%)
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", borderTop: `1px solid ${TOKENS.hair}`, paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, fontSize: 11.5 }}>
        <div>
          © 2026 Abhimanyu Technologies Pvt. Ltd. All rights reserved. Sloganed to <strong>Scale Your Business</strong>.
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Bilateral NDA Guarantee</span>
          <button onClick={openStatusModal} style={{ background: "none", border: "none", color: "#10B981", cursor: "pointer", padding: 0, fontSize: 11.5, fontFamily: "'JetBrains Mono', monospace" }}>
            ● 99.99% Status
          </button>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------- Pages Registry ---------------------------- */

const PAGES = {
  home: HomePage,
  services: ServicesPage,
  industries: IndustriesPage,
  products: IndustriesPage,
  "rfq-wizard": ProjectWizardPage,
  "case-studies": CaseStudiesPage,
  knowledge: KnowledgePage,
  dashboard: DashboardPage,
  about: AboutPage,
  careers: CareersPage,
  contact: ContactPage,
};

/* ---------------------------- Root Application Component ---------------------------- */

export default function App() {
  const [page, setPage] = useState("home");
  const [currency] = useState("INR");

  const [currentUser, setCurrentUser] = useState({
    name: "Dr. K. S. Rao",
    company: "Apex FinTech Solutions",
    role: "client",
  });

  // Modal states
  const [trackerOpen, setTrackerOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  // Product state removed: MNC software company format

  const go = (id) => {
    setPage(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const PageComponent = PAGES[page] || HomePage;

  return (
    <div
      style={{
        background: LIGHT_TOKENS.ink,
        color: LIGHT_TOKENS.paper,
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #F8FAFC; color: #0F172A; }
        input, select, textarea, option { color-scheme: light; }
        input, select, textarea {
          background: #FFFFFF !important;
          color: #0F172A !important;
          border-color: #CBD5E1 !important;
        }
        input::placeholder, textarea::placeholder {
          color: #94A3B8 !important;
        }
        button:focus-visible, input:focus-visible, textarea:focus-visible, select:focus-visible { outline: 2px solid ${TOKENS.blue}; outline-offset: 2px; }
        select option { background: #FFFFFF !important; color: #0F172A !important; }

        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
          main { padding-bottom: 72px !important; }
        }
        @media (min-width: 861px) {
          .mobile-bottom-nav { display: none !important; }
        }
      `}</style>

      {/* Header */}
      <SiteHeader
        page={page}
        go={go}
        openStatusModal={() => setStatusModalOpen(true)}
      />

      {/* Main Page Content */}
      <main style={{ paddingTop: 64 }}>
        <PageComponent
          go={go}
          currency={currency}
          currentUser={currentUser}
          openTracker={() => setTrackerOpen(true)}
          openStatusModal={() => setStatusModalOpen(true)}
          /* Clean MNC props */
        />
      </main>

      {/* Footer */}
      <Footer go={go} openStatusModal={() => setStatusModalOpen(true)} />

      {/* Global Modals */}
      <ClientProjectTrackerModal
        isOpen={trackerOpen}
        onClose={() => setTrackerOpen(false)}
        go={go}
      />

      <SystemStatusModal
        isOpen={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
      />

      {/* ProductDemoModal removed */}

      {/* Fixed Mobile Bottom Navigation */}
      <nav
        className="mobile-bottom-nav"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9000,
          background: "rgba(255, 255, 255, 0.96)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: `1px solid ${TOKENS.hair}`,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: 64,
          padding: "0 8px",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
        }}
      >
        {[
          { icon: "🏠", label: "Home", id: "home" },
          { icon: "🛠", label: "Services", id: "services" },
          { icon: "⚡", label: "Plan", id: "rfq-wizard", highlight: true },
          { icon: "🏢", label: "Industries", id: "industries" },
          { icon: "📞", label: "Contact", id: "contact" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => go(item.id)}
            style={{
              background: item.highlight ? `linear-gradient(135deg, ${TOKENS.blue} 0%, #1D4ED8 100%)` : "transparent",
              border: "none",
              borderRadius: item.highlight ? 12 : 8,
              padding: item.highlight ? "8px 16px" : "6px 10px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              boxShadow: item.highlight ? "0 4px 14px rgba(37, 99, 235, 0.4)" : "none",
            }}
          >
            <span style={{ fontSize: item.highlight ? 18 : 16 }}>{item.icon}</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                fontWeight: page === item.id || item.highlight ? 700 : 500,
                color: page === item.id ? TOKENS.blue : item.highlight ? "#FFFFFF" : TOKENS.slate,
              }}
            >
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}
