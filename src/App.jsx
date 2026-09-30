import React, { useState, useEffect, useRef, useMemo } from "react";
import * as THREE from "three";

/* ============================================================
   ABHIMANYU TECHNOLOGIES — Enterprise IT Services & Products
   
   Platform Architecture:
   - Full-Stack Digital Engineering & Custom IT Services
   - Web Development (Frontend & Full-Stack)
   - Android & iOS Mobile App Development
   - Backend & Distributed API Microservices
   - Cloud, DevOps & Infrastructure (AWS/GCP/Azure/K8s)
   - Enterprise AI & Custom Automation
   - Proprietary Software Products (ERP, CRM, HRMS, AI Studio)
   - Interactive Client Project Scope & Cost Estimator
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

const DARK_TOKENS = {
  ink: "#0B1727",
  panel: "#132238",
  panelAlt: "#1B2F4A",
  brass: "#F59E0B",
  brassBright: "#FBBF24",
  paper: "#F8FAFC",
  slate: "#94A3B8",
  teal: "#14B8A6",
  blue: "#38BDF8",
  blueDark: "#0284C7",
  hair: "rgba(255, 255, 255, 0.12)",
  white: "#FFFFFF",
  badgeBg: "rgba(56, 189, 248, 0.14)",
  cardHover: "rgba(56, 189, 248, 0.06)",
};

const TOKENS = { ...LIGHT_TOKENS };

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

/* ---------------------------- Navigation Structure ---------------------------- */

const NAV = [
  { id: "home", label: "Home" },
  { id: "services", label: "IT Services" },
  { id: "products", label: "Products" },
  { id: "rfq-wizard", label: "Project Planner" },
  { id: "case-studies", label: "Case Studies" },
  { id: "dashboard", label: "Client Portal" },
  { id: "knowledge", label: "Tech Hub" },
  { id: "about", label: "About Us" },
  { id: "careers", label: "Careers" },
  { id: "contact", label: "Contact" },
];

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

/* ---------------------------- Software Products Dataset ---------------------------- */

const SOFTWARE_PRODUCTS = [
  {
    id: "erp",
    name: "Abhimanyu Cloud ERP",
    badge: "Enterprise Flagship",
    tagline: "All-in-One Cloud Operations, Supply Chain & Financial Management",
    shortDesc: "A modular, lightning-fast cloud ERP engineered for high-growth businesses. Unify inventory, multi-warehouse logistics, purchase orders, automated GST billing, and real-time P&L reporting.",
    icon: "📦",
    category: "Operations & Finance",
    metrics: ["4.2x Faster Month-End Close", "99.98% Inventory Accuracy", "12,000+ Daily Transactions"],
    modules: [
      "Smart Multi-Warehouse Inventory with Batch & Barcode Tracking",
      "Automated Purchase Orders & Supplier Portal with Vendor Scorecards",
      "GST-Compliant E-Invoicing, E-Way Bill Generation & Tax Audits",
      "Double-Entry General Ledger, Accounts Receivable/Payable & P&L",
      "Production Planning (BOM, Work Orders & Machine Downtime Tracking)",
      "Role-Based Access Control (RBAC) with Bank-Grade Audit Logs",
    ],
    pricing: {
      starter: { label: "Starter", inr: 24999, period: "/mo", desc: "Up to 15 users, 1 warehouse, core inventory & accounting" },
      pro: { label: "Growth Pro", inr: 59999, period: "/mo", desc: "Up to 50 users, 5 warehouses, automated GST & supplier portal" },
      enterprise: { label: "Enterprise", inr: 129999, period: "/mo", desc: "Unlimited users, dedicated cloud instance, custom API integrations" },
    },
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS"],
    demoId: "erp",
  },
  {
    id: "crm",
    name: "Abhimanyu CRM",
    badge: "AI-Powered",
    tagline: "Intelligent Lead Acceleration, Omnichannel WhatsApp & Revenue Pipeline",
    shortDesc: "Close deals faster with automated AI lead scoring, visual drag-and-drop sales pipelines, two-way WhatsApp & Email sequences, and predictive revenue forecasting.",
    icon: "🎯",
    category: "Sales & Marketing",
    metrics: ["+46% Lead-to-Deal Conversion", "<15 Min Response SLA", "Omnichannel WhatsApp Sync"],
    modules: [
      "Visual Drag-and-Drop Sales Pipeline with Custom Deal Stages",
      "Official Meta WhatsApp Cloud API Integration with Automated Drip Sequences",
      "AI Lead Scoring based on engagement telemetry and budget fit",
      "Unified Customer Inbox: Email, WhatsApp, Phone, and Web Chat",
      "Automated Quotation Generator with E-Signature and PDF Export",
      "Sales Representative Activity Telemetry, Leaderboards & Commissions",
    ],
    pricing: {
      starter: { label: "Starter", inr: 14999, period: "/mo", desc: "Up to 5 sales reps, 5,000 active leads, WhatsApp automation" },
      pro: { label: "Growth Pro", inr: 34999, period: "/mo", desc: "Up to 20 reps, 25,000 leads, AI scoring & custom reports" },
      enterprise: { label: "Enterprise", inr: 79999, period: "/mo", desc: "Unlimited seats, dedicated WhatsApp number pools, custom webhooks" },
    },
    techStack: ["React", "FastAPI (Python)", "PostgreSQL", "Redis", "WebSockets"],
    demoId: "crm",
  },
  {
    id: "hrms",
    name: "Abhimanyu HRMS",
    badge: "People Operations",
    tagline: "Modern Payroll, Biometric Attendance & Employee Lifecycle Platform",
    shortDesc: "Automate workforce management from hiring to retirement. Features 1-click compliant payroll, geo-fenced mobile attendance, leave approvals, and employee self-service.",
    icon: "👥",
    category: "Human Capital",
    metrics: ["1-Click Monthly Payroll", "100% Statutory Compliance", "Zero Paperwork HR"],
    modules: [
      "Automated Payroll Processing with PF, ESI, TDS & Professional Tax",
      "Mobile Geo-Fenced & Facial Biometric Attendance Integration",
      "Flexible Leave Policies, Holiday Calendars & Shift Rostering",
      "Employee Self-Service Mobile App (Payslip Downloads, Reimbursements)",
      "Performance Appraisal Cycles, OKR Tracking & 360 Feedback",
      "Digital Onboarding, Offer Letter Generator & Document Vault",
    ],
    pricing: {
      starter: { label: "Starter", inr: 9999, period: "/mo", desc: "Up to 25 employees, automated payroll & attendance" },
      pro: { label: "Growth Pro", inr: 24999, period: "/mo", desc: "Up to 100 employees, biometric sync & appraisal cycles" },
      enterprise: { label: "Enterprise", inr: 54999, period: "/mo", desc: "Unlimited workforce, custom ERP payroll sync, dedicated HR SLA" },
    },
    techStack: ["Next.js", "Go", "PostgreSQL", "Flutter (Mobile App)", "Docker"],
    demoId: "hrms",
  },
  {
    id: "ai-studio",
    name: "Abhimanyu AI Studio",
    badge: "Generative AI",
    tagline: "Private Enterprise Knowledge Brain & Custom AI Workflow Orchestrator",
    shortDesc: "Deploy secure, enterprise-grade AI assistants trained on your private internal documents, wikis, and databases with zero data leakage.",
    icon: "🧠",
    category: "Enterprise Intelligence",
    metrics: ["<350ms Query Latency", "100% Private Data Isolation", "Multi-Model Fallback"],
    modules: [
      "Private Document Ingestion: PDF, Word, Excel, Notion, Confluence, SQL",
      "Hybrid Semantic & Keyword Search using Vector Embeddings",
      "Custom Prompt Engineering Studio with Guardrails & Hallucination Filters",
      "Multi-LLM Routing (OpenAI GPT-4o, Anthropic Claude 3.5, Local Llama 3)",
      "Automated Workflow Triggers: Ticket Resolution, Summarization, Email Drafting",
      "Full Audit Trail of AI Responses with Ground-Truth Source Citations",
    ],
    pricing: {
      starter: { label: "Starter", inr: 29999, period: "/mo", desc: "Up to 50,000 queries/mo, 10GB documents, 3 custom agents" },
      pro: { label: "Growth Pro", inr: 69999, period: "/mo", desc: "Up to 250,000 queries/mo, 100GB documents, unlimited agents" },
      enterprise: { label: "Enterprise", inr: 149999, period: "/mo", desc: "On-premise / private VPC deployment, fine-tuned custom models" },
    },
    techStack: ["Python", "FastAPI", "Milvus / Qdrant", "LangChain", "Next.js"],
    demoId: "ai-studio",
  },
  {
    id: "devpulse",
    name: "Abhimanyu DevPulse",
    badge: "DevOps & SRE",
    tagline: "Real-Time Cloud Telemetry, Container Health & Automated Rollback Monitor",
    shortDesc: "Gain full observability into your distributed services. Detect latency spikes, memory leaks, and failing API routes before your customers notice.",
    icon: "📊",
    category: "Cloud Observability",
    metrics: ["Real-time APM Telemetry", "<2s Incident Alerts", "Automated Rollback Engine"],
    modules: [
      "Distributed Tracing across microservices with latency bottleneck alerts",
      "Docker & Kubernetes Pod Health, CPU/Memory telemetry, and auto-scaling rules",
      "API Endpoint Uptime & HTTP status code distribution dashboards",
      "Automated Canary Rollback triggers when error rate exceeds threshold",
      "Slack, PagerDuty, WhatsApp & Email incident routing with runbooks",
      "Log Aggregation & Search with instant root-cause analysis",
    ],
    pricing: {
      starter: { label: "Starter", inr: 11999, period: "/mo", desc: "Up to 10 servers/nodes, 100GB logs, 1-minute metric intervals" },
      pro: { label: "Growth Pro", inr: 28999, period: "/mo", desc: "Up to 50 servers, 500GB logs, real-time APM & Slack alerts" },
      enterprise: { label: "Enterprise", inr: 64999, period: "/mo", desc: "Unlimited infrastructure, automated rollback webhooks, SLA 99.99%" },
    },
    techStack: ["Go", "Prometheus", "Grafana", "TimescaleDB", "React"],
    demoId: "devpulse",
  },
  {
    id: "appengine",
    name: "Abhimanyu AppEngine",
    badge: "Developer Tool",
    tagline: "Rapid Backend-as-a-Service & Secure API Generator for Web & Mobile",
    shortDesc: "Accelerate your development cycle by 10x. Model your database schemas visually and auto-generate production-ready REST & GraphQL APIs with built-in auth.",
    icon: "⚡",
    category: "Developer Platform",
    metrics: ["10x Faster Backend Setup", "Instant REST & GraphQL", "Auto-Generated TypeScript SDKs"],
    modules: [
      "Visual Database Schema Designer with automatic foreign key relations",
      "Auto-generated CRUD REST endpoints and GraphQL queries with pagination",
      "Pre-built Authentication (JWT, Email Magic Link, Google/Apple OAuth)",
      "Role-Based Field-Level Permissions and Row-Level Security (RLS)",
      "Auto-generated typed TypeScript and Kotlin client SDKs",
      "1-Click Deploy to isolated cloud environments with automatic backups",
    ],
    pricing: {
      starter: { label: "Developer", inr: 7999, period: "/mo", desc: "Up to 3 active projects, 50,000 API requests/day, community support" },
      pro: { label: "Team Pro", inr: 19999, period: "/mo", desc: "Up to 15 projects, 1M requests/day, team collaboration & custom domains" },
      enterprise: { label: "Enterprise", inr: 49999, period: "/mo", desc: "Self-hosted license, unlimited APIs, custom database connectors" },
    },
    techStack: ["Node.js", "TypeScript", "PostgreSQL", "Prisma", "Docker"],
    demoId: "appengine",
  },
];

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
  currency = "INR",
  setCurrency,
  currentUser,
  openAuth,
  openEstimator,
  openTracker,
  openSpotlight,
  openArchitecture,
  openApiSandbox,
  theme = "light",
  setTheme,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [currencyDropdown, setCurrencyDropdown] = useState(false);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: theme === "dark" ? "rgba(19, 34, 56, 0.94)" : "rgba(255, 255, 255, 0.94)",
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
              IT SERVICES & PRODUCTS
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
              IT Services <span style={{ fontSize: 9 }}>▼</span>
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
            onClick={() => go("products")}
            style={{
              background: page === "products" ? TOKENS.badgeBg : "transparent",
              border: "none",
              borderRadius: 6,
              color: page === "products" ? TOKENS.blue : TOKENS.paper,
              fontSize: 13,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            Products
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
        </nav>

        {/* Desktop Actions */}
        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Spotlight Search Pill */}
          <button
            onClick={openSpotlight}
            style={{
              background: "rgba(15,23,42,0.04)",
              border: `1px solid ${TOKENS.hair}`,
              borderRadius: 6,
              padding: "6px 10px",
              fontSize: 12,
              fontFamily: "'Inter', sans-serif",
              color: TOKENS.slate,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
            title="Press Ctrl+K to Search Services, Products & Tech"
          >
            <span>🔍 Search</span>
            <kbd style={{ background: "rgba(15,23,42,0.06)", border: `1px solid ${TOKENS.hair}`, borderRadius: 3, padding: "1px 4px", fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }}>Ctrl+K</kbd>
          </button>

          {/* Theme Toggle Pill */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            style={{
              background: "rgba(15,23,42,0.04)",
              border: `1px solid ${TOKENS.hair}`,
              borderRadius: 6,
              padding: "6px 10px",
              fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace",
              color: TOKENS.paper,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
            title={`Switch to ${theme === "light" ? "Dark Mode" : "Light Mode"}`}
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>

          {/* Currency Switcher */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setCurrencyDropdown(!currencyDropdown)}
              style={{
                background: "rgba(15,23,42,0.04)",
                border: `1px solid ${TOKENS.hair}`,
                borderRadius: 6,
                padding: "6px 10px",
                fontSize: 12,
                fontFamily: "'JetBrains Mono', monospace",
                color: TOKENS.paper,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span>{CURRENCIES[currency]?.label.split(" ")[0]}</span>
              <span style={{ fontSize: 8 }}>▼</span>
            </button>
            {currencyDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  background: TOKENS.panel,
                  border: `1px solid ${TOKENS.hair}`,
                  borderRadius: 6,
                  padding: 4,
                  boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
                  zIndex: 200,
                  minWidth: 130,
                }}
              >
                {Object.keys(CURRENCIES).map((cKey) => (
                  <button
                    key={cKey}
                    onClick={() => { setCurrency(cKey); setCurrencyDropdown(false); }}
                    style={{
                      width: "100%",
                      background: currency === cKey ? TOKENS.badgeBg : "transparent",
                      border: "none",
                      color: currency === cKey ? TOKENS.blue : TOKENS.paper,
                      padding: "6px 10px",
                      fontSize: 11.5,
                      fontFamily: "'JetBrains Mono', monospace",
                      textAlign: "left",
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

          {/* System Architecture Designer */}
          <button
            onClick={openArchitecture}
            style={{
              background: "rgba(37,99,235,0.08)",
              border: `1px solid ${TOKENS.blue}44`,
              borderRadius: 6,
              color: TOKENS.blue,
              padding: "6px 12px",
              fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
            title="Design Custom Microservices & Cloud Architecture"
          >
            <span>📐 System Architect</span>
          </button>

          {/* Developer API Console */}
          <button
            onClick={openApiSandbox}
            style={{
              background: "rgba(13,148,136,0.08)",
              border: `1px solid ${TOKENS.teal}44`,
              borderRadius: 6,
              color: TOKENS.teal,
              padding: "6px 12px",
              fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
            title="Test Live Simulated REST & GraphQL API Endpoints"
          >
            <span>🔌 API Console</span>
          </button>

          {/* Interactive Project Cost Estimator */}
          <button
            onClick={openEstimator}
            style={{
              background: "rgba(217,119,6,0.12)",
              border: `1px solid ${TOKENS.brass}`,
              borderRadius: 6,
              color: TOKENS.brass,
              padding: "6px 12px",
              fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span>⚡ Cost Estimator</span>
          </button>

          {/* Primary CTA */}
          <Button onClick={() => go("rfq-wizard")} style={{ padding: "7px 14px", fontSize: 12 }}>
            Start a Project →
          </Button>
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
            <button
              onClick={() => { openArchitecture(); setMobileMenuOpen(false); }}
              style={{
                background: "rgba(37,99,235,0.08)",
                border: `1px solid ${TOKENS.blue}44`,
                color: TOKENS.blue,
                borderRadius: 6,
                padding: "8px",
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              📐 Architecture
            </button>
            <button
              onClick={() => { openApiSandbox(); setMobileMenuOpen(false); }}
              style={{
                background: "rgba(13,148,136,0.08)",
                border: `1px solid ${TOKENS.teal}44`,
                color: TOKENS.teal,
                borderRadius: 6,
                padding: "8px",
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              🔌 API Console
            </button>
            <button
              onClick={() => { openEstimator(); setMobileMenuOpen(false); }}
              style={{
                background: "rgba(217,119,6,0.12)",
                border: `1px solid ${TOKENS.brass}`,
                color: TOKENS.brass,
                borderRadius: 6,
                padding: "8px",
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              ⚡ Cost Estimator
            </button>
            <button
              onClick={() => { setTheme(theme === "light" ? "dark" : "light"); setMobileMenuOpen(false); }}
              style={{
                background: TOKENS.panelAlt,
                border: `1px solid ${TOKENS.hair}`,
                color: TOKENS.paper,
                borderRadius: 6,
                padding: "8px",
                fontSize: 11.5,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>
          </div>

          {[
            { id: "home", label: "🏠 Home" },
            { id: "services", label: "🛠 IT Services" },
            { id: "products", label: "📦 Products" },
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

/* ---------------------------- Interactive Project Scope & Cost Estimator Modal ---------------------------- */

function ProjectEstimatorModal({ isOpen, onClose, currency = "INR", go }) {
  const [platform, setPlatform] = useState("web");
  const [complexity, setComplexity] = useState("medium");
  const [timeline, setTimeline] = useState("standard");
  const [selectedFeatures, setSelectedFeatures] = useState(["auth", "db", "api"]);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const PLATFORM_OPTIONS = [
    { id: "web", name: "Web Application", icon: "🌐", baseCost: 150000, weeks: 4, desc: "Responsive portal, Next.js / React SPA, PWA" },
    { id: "android", name: "Native Android App", icon: "🤖", baseCost: 180000, weeks: 5, desc: "Native Kotlin, Jetpack Compose, Material 3" },
    { id: "cross", name: "Cross-Platform Mobile", icon: "📱", baseCost: 220000, weeks: 6, desc: "Flutter or React Native for Android & iOS" },
    { id: "fullstack", name: "Full Stack Web + Mobile", icon: "⚡", baseCost: 350000, weeks: 8, desc: "Next.js Web + Android/iOS App + Backend" },
    { id: "backend", name: "Backend Microservices", icon: "⚙️", baseCost: 160000, weeks: 4, desc: "High-throughput APIs in Node.js, Python or Go" },
  ];

  const FEATURE_MODULES = [
    { id: "auth", name: "User Authentication & RBAC", cost: 25000, icon: "🔐" },
    { id: "db", name: "Database Modeling & Cloud Sync", cost: 35000, icon: "💾" },
    { id: "api", name: "RESTful & GraphQL API Suite", cost: 40000, icon: "🔌" },
    { id: "payments", name: "Payment Gateway (Stripe/Razorpay)", cost: 30000, icon: "💳" },
    { id: "chat", name: "Real-Time Chat & Push Alerts", cost: 45000, icon: "💬" },
    { id: "admin", name: "Custom Admin CMS & Analytics", cost: 50000, icon: "📊" },
    { id: "ai", name: "AI Assistant & RAG Integration", cost: 65000, icon: "🤖" },
    { id: "devops", name: "Docker & CI/CD Cloud Pipeline", cost: 35000, icon: "☁️" },
  ];

  const COMPLEXITY_MULTIPLIERS = {
    mvp: { label: "MVP Prototype", mult: 0.85, tag: "Rapid Launch" },
    medium: { label: "Production Grade", mult: 1.0, tag: "Standard Scale" },
    enterprise: { label: "Enterprise Distributed", mult: 1.45, tag: "High Security & Scale" },
  };

  const TIMELINE_MULTIPLIERS = {
    standard: { label: "Standard Delivery", mult: 1.0, tag: "Normal Cadence" },
    accelerated: { label: "Accelerated Sprint", mult: 1.25, tag: "+25% Priority Pod" },
    rush: { label: "Rapid 3-Week Blitz", mult: 1.5, tag: "+50% Dedicated Sprint" },
  };

  const toggleFeature = (fId) => {
    setSelectedFeatures((prev) =>
      prev.includes(fId) ? prev.filter((x) => x !== fId) : [...prev, fId]
    );
  };

  const currentPlatform = PLATFORM_OPTIONS.find((p) => p.id === platform) || PLATFORM_OPTIONS[0];
  const comp = COMPLEXITY_MULTIPLIERS[complexity] || COMPLEXITY_MULTIPLIERS.medium;
  const time = TIMELINE_MULTIPLIERS[timeline] || TIMELINE_MULTIPLIERS.standard;

  const featuresTotal = selectedFeatures.reduce((acc, fId) => {
    const f = FEATURE_MODULES.find((m) => m.id === fId);
    return acc + (f ? f.cost : 0);
  }, 0);

  const baseCalculated = (currentPlatform.baseCost + featuresTotal) * comp.mult * time.mult;
  const totalCostInr = Math.round(baseCalculated);
  const estimatedSprints = Math.max(2, Math.round(currentPlatform.weeks * comp.mult));

  const handleCopySpec = () => {
    const spec = `Abhimanyu Technologies - Project Estimate\nPlatform: ${currentPlatform.name}\nComplexity: ${comp.label}\nFeatures: ${selectedFeatures.join(", ")}\nTimeline: ${time.label} (~${estimatedSprints} weeks)\nEstimated Budget: ${formatPrice(totalCostInr, currency)}`;
    navigator.clipboard?.writeText(spec);
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
          maxHeight: "90vh",
          overflowY: "auto",
          background: TOKENS.panel,
          border: `1px solid ${TOKENS.hair}`,
          borderRadius: 14,
          boxShadow: "0 24px 60px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          color: TOKENS.paper,
        }}
      >
        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${TOKENS.hair}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20 }}>⚡</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: TOKENS.paper }}>
                Interactive Project Scope & Cost Estimator
              </span>
              <span style={{ background: TOKENS.badgeBg, color: TOKENS.blue, border: `1px solid ${TOKENS.blue}44`, fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, padding: "2px 8px", borderRadius: 4 }}>
                INSTANT ALGORITHM
              </span>
            </div>
            <div style={{ fontSize: 12.5, color: TOKENS.slate, marginTop: 4 }}>
              Configure your software specifications, tech modules, and team velocity to calculate estimated development budget and delivery timeline.
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: 24, display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24 }}>
          {/* Left Config Panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* 1. Platform Choice */}
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: TOKENS.slate, marginBottom: 8 }}>
                1. TARGET PLATFORM & ARCHITECTURE
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {PLATFORM_OPTIONS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPlatform(p.id)}
                    style={{
                      background: platform === p.id ? TOKENS.badgeBg : TOKENS.panelAlt,
                      border: `1px solid ${platform === p.id ? TOKENS.blue : TOKENS.hair}`,
                      borderRadius: 8,
                      padding: "10px 12px",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span>{p.icon}</span>
                      <span style={{ fontSize: 12.5, fontWeight: 700, color: platform === p.id ? TOKENS.blue : TOKENS.paper }}>{p.name}</span>
                    </div>
                    <div style={{ fontSize: 10.5, color: TOKENS.slate, marginTop: 4 }}>{p.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Feature Modules */}
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: TOKENS.slate, marginBottom: 8 }}>
                2. REQUIRED TECHNICAL MODULES
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                {FEATURE_MODULES.map((f) => {
                  const selected = selectedFeatures.includes(f.id);
                  return (
                    <button
                      key={f.id}
                      onClick={() => toggleFeature(f.id)}
                      style={{
                        background: selected ? "rgba(13, 148, 136, 0.1)" : TOKENS.panelAlt,
                        border: `1px solid ${selected ? TOKENS.teal : TOKENS.hair}`,
                        borderRadius: 6,
                        padding: "8px 10px",
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span>{f.icon}</span>
                        <span style={{ fontSize: 11.5, fontWeight: 600, color: selected ? TOKENS.teal : TOKENS.paper }}>{f.name}</span>
                      </div>
                      <span style={{ fontSize: 12 }}>{selected ? "✓" : "+"}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Complexity & Timeline */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: TOKENS.slate, marginBottom: 6 }}>
                  SCALE & COMPLEXITY
                </div>
                <select
                  value={complexity}
                  onChange={(e) => setComplexity(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    borderRadius: 6,
                    border: `1px solid ${TOKENS.hair}`,
                    background: TOKENS.panel,
                    color: TOKENS.paper,
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  {Object.keys(COMPLEXITY_MULTIPLIERS).map((k) => (
                    <option key={k} value={k}>
                      {COMPLEXITY_MULTIPLIERS[k].label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: TOKENS.slate, marginBottom: 6 }}>
                  DELIVERY SPEED
                </div>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    borderRadius: 6,
                    border: `1px solid ${TOKENS.hair}`,
                    background: TOKENS.panel,
                    color: TOKENS.paper,
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  {Object.keys(TIMELINE_MULTIPLIERS).map((k) => (
                    <option key={k} value={k}>
                      {TIMELINE_MULTIPLIERS[k].label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Right Summary Panel */}
          <div
            style={{
              background: TOKENS.panelAlt,
              border: `1px solid ${TOKENS.hair}`,
              borderRadius: 12,
              padding: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ borderBottom: `1px solid ${TOKENS.hair}`, paddingBottom: 14, marginBottom: 16 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TOKENS.slate }}>
                  ESTIMATED PROJECT BUDGET
                </div>
                <div style={{ fontSize: 32, fontWeight: 800, color: TOKENS.blue, marginTop: 4 }}>
                  {formatPrice(totalCostInr, currency)}
                </div>
                <div style={{ fontSize: 12, color: TOKENS.slate, marginTop: 2 }}>
                  Estimated Velocity: <strong>~{estimatedSprints} Weeks</strong> (Agile 2-week Sprints)
                </div>
              </div>

              {/* Recommended Team Pod */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, fontWeight: 700, color: TOKENS.slate, marginBottom: 8 }}>
                  DEDICATED ENGINEERING POD ALLOCATION
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 11.5 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: TOKENS.slate }}>Lead Solutions Architect:</span>
                    <strong style={{ color: TOKENS.paper }}>1 Engineer (Part-Time)</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: TOKENS.slate }}>Senior Full-Stack / Mobile:</span>
                    <strong style={{ color: TOKENS.paper }}>2 Engineers (Full-Time)</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: TOKENS.slate }}>UI/UX Product Designer:</span>
                    <strong style={{ color: TOKENS.paper }}>1 Designer (Sprint 1-3)</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: TOKENS.slate }}>QA & DevOps Specialist:</span>
                    <strong style={{ color: TOKENS.paper }}>1 Specialist (Continuous)</strong>
                  </div>
                </div>
              </div>

              {/* Scope Inclusions */}
              <div style={{ background: "rgba(13, 148, 136, 0.08)", border: `1px solid ${TOKENS.teal}44`, borderRadius: 8, padding: 12, fontSize: 11.5, lineHeight: 1.5, color: TOKENS.paper }}>
                ✓ <strong>Guarantee:</strong> 100% Full IP & Source Code Ownership, Daily Standup Telemetry, 30-Day Post-Launch Warranty, and Strict Non-Disclosure Agreement (NDA).
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 18 }}>
              <Button
                onClick={() => {
                  go("rfq-wizard");
                  onClose();
                }}
                style={{ width: "100%", padding: "12px" }}
              >
                🚀 Request Formal Scope Proposal →
              </Button>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={handleCopySpec}
                  style={{
                    flex: 1,
                    background: TOKENS.panel,
                    border: `1px solid ${TOKENS.hair}`,
                    borderRadius: 6,
                    padding: "8px",
                    fontSize: 11.5,
                    fontFamily: "'JetBrains Mono', monospace",
                    color: TOKENS.paper,
                    cursor: "pointer",
                  }}
                >
                  {copied ? "✓ Copied Spec" : "📋 Copy Estimate"}
                </button>
                <button
                  onClick={() => {
                    go("contact");
                    onClose();
                  }}
                  style={{
                    flex: 1,
                    background: TOKENS.panel,
                    border: `1px solid ${TOKENS.hair}`,
                    borderRadius: 6,
                    padding: "8px",
                    fontSize: 11.5,
                    fontFamily: "'JetBrains Mono', monospace",
                    color: TOKENS.blue,
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  💬 Speak with Architect
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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

/* ---------------------------- Product Demo Modal ---------------------------- */

/* ---------------------------- Interactive Architecture Visualizer Modal ---------------------------- */

function ArchitectureVisualizerModal({ isOpen, onClose, go, currency = "INR" }) {
  const [clientTier, setClientTier] = useState("nextjs");
  const [gatewayTier, setGatewayTier] = useState("go");
  const [dataTier, setDataTier] = useState("postgres_redis");
  const [cloudTier, setCloudTier] = useState("aws");
  const [brokerTier, setBrokerTier] = useState("kafka");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const CLIENT_OPTIONS = {
    nextjs: { name: "Next.js 15 Web & Edge SSR", icon: "🌐", qps: "100k+ QPS", desc: "Sub-second edge rendering, React 19, TypeScript, PWA" },
    android_native: { name: "Native Android (Kotlin + Compose)", icon: "🤖", qps: "60 FPS Native", desc: "Coroutines, Flow, Room SQLite offline-first sync" },
    flutter_cross: { name: "Cross-Platform Flutter & iOS", icon: "📱", qps: "Unified Delivery", desc: "Single codebase for Android & iOS with native plugins" },
    micro_frontends: { name: "Enterprise Micro-Frontends", icon: "🎨", qps: "Team Isolation", desc: "Module federation, independent release cycles" },
  };

  const GATEWAY_OPTIONS = {
    go: { name: "Go (Golang) Microservices", icon: "⚡", baseLatency: 16, maxQps: 85000, desc: "High-concurrency goroutines, minimal 14MB RAM per pod" },
    fastify: { name: "Node.js (Fastify) Event Services", icon: "⚙️", baseLatency: 28, maxQps: 45000, desc: "Asynchronous non-blocking I/O, rapid developer velocity" },
    fastapi: { name: "Python FastAPI + PyTorch AI", icon: "🐍", baseLatency: 35, maxQps: 32000, desc: "Async ASGI, native machine learning inference pipelines" },
    spring: { name: "Java Spring Boot Core", icon: "☕", baseLatency: 30, maxQps: 55000, desc: "Enterprise banking-grade transactions, robust ACID safety" },
  };

  const DATA_OPTIONS = {
    postgres_redis: { name: "PostgreSQL Shards + Redis Cache", icon: "💾", bonusQps: 25000, latencyMult: 0.85, desc: "ACID compliance with sub-millisecond Redis caching" },
    timescale: { name: "TimescaleDB + PostgreSQL", icon: "📈", bonusQps: 35000, latencyMult: 0.9, desc: "High-frequency IoT sensor telemetry & GPS packet streams" },
    milvus_rag: { name: "Milvus Vector DB + PostgreSQL", icon: "🧠", bonusQps: 15000, latencyMult: 1.1, desc: "Hybrid semantic search & enterprise RAG document embeddings" },
  };

  const CLOUD_OPTIONS = {
    aws: { name: "AWS Multi-AZ (EKS, RDS, S3, CloudFront)", icon: "☁️", sla: "99.99%", estMonthlyInr: 38000 },
    gcp: { name: "Google Cloud (GKE, Cloud Spanner, BigQuery)", icon: "🌐", sla: "99.99%", estMonthlyInr: 42000 },
    hybrid_k8s: { name: "Hybrid Kubernetes + ArgoCD GitOps", icon: "⚓", sla: "99.95%", estMonthlyInr: 32000 },
  };

  const BROKER_OPTIONS = {
    kafka: { name: "Apache Kafka Event Bus", icon: "📬", desc: "High-throughput partitioned log streaming for decoupled services" },
    redis_pubsub: { name: "Redis Streams & Pub/Sub", icon: "⚡", desc: "Ultra-low latency real-time messaging and WebSocket notifications" },
    rabbitmq: { name: "RabbitMQ Message Broker", icon: "🐇", desc: "Flexible AMQP routing, dead-letter queues, reliable delivery" },
  };

  const gw = GATEWAY_OPTIONS[gatewayTier];
  const dt = DATA_OPTIONS[dataTier];
  const cld = CLOUD_OPTIONS[cloudTier];
  const clt = CLIENT_OPTIONS[clientTier];
  const brk = BROKER_OPTIONS[brokerTier];

  const calculatedQps = Math.round(gw.maxQps + dt.bonusQps);
  const calculatedLatency = Math.round(gw.baseLatency * dt.latencyMult);

  const handleCopySpec = () => {
    const spec = `Abhimanyu Technologies - Architecture Specification\nClient Tier: ${clt.name}\nAPI Gateway: ${gw.name}\nData Layer: ${dt.name}\nBroker: ${brk.name}\nCloud SRE: ${cld.name}\nThroughput Capacity: ~${calculatedQps.toLocaleString()} QPS\nEst. P99 Latency: ~${calculatedLatency} ms\nHigh-Availability SLA: ${cld.sla}`;
    navigator.clipboard?.writeText(spec);
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
          maxWidth: 960,
          maxHeight: "92vh",
          overflowY: "auto",
          background: TOKENS.panel,
          border: `1px solid ${TOKENS.hair}`,
          borderRadius: 14,
          boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
          color: TOKENS.paper,
        }}
      >
        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${TOKENS.hair}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20 }}>📐</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: TOKENS.paper }}>
                Interactive System Architecture & Tech Stack Designer
              </span>
              <span style={{ background: TOKENS.badgeBg, color: TOKENS.blue, border: `1px solid ${TOKENS.blue}44`, fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, padding: "2px 8px", borderRadius: 4 }}>
                ENTERPRISE TOPOLOGY
              </span>
            </div>
            <div style={{ fontSize: 12.5, color: TOKENS.slate, marginTop: 4 }}>
              Compose your client applications, microservices runtime, event streams, and cloud infrastructure to calculate real-time performance benchmarks.
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>

        {/* Live Visual Topology Blueprint */}
        <div style={{ padding: "18px 24px", background: TOKENS.panelAlt, borderBottom: `1px solid ${TOKENS.hair}` }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: TOKENS.slate, marginBottom: 12, display: "flex", justifyContent: "space-between" }}>
            <span>LIVE SYSTEM TOPOLOGY MAP</span>
            <span style={{ color: TOKENS.teal }}>● 99.99% HIGH-AVAILABILITY CLUSTER</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, alignItems: "center" }}>
            <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.blue}66`, borderRadius: 8, padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 20 }}>{clt.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: TOKENS.paper, marginTop: 4 }}>Client Layer</div>
              <div style={{ fontSize: 9.5, color: TOKENS.blue, fontFamily: "'JetBrains Mono', monospace" }}>{clt.name.split(" ")[0]}</div>
            </div>

            <div style={{ textAlign: "center", color: TOKENS.blue, fontSize: 14 }}>➔</div>

            <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.teal}66`, borderRadius: 8, padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 20 }}>🛡️</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: TOKENS.paper, marginTop: 4 }}>Edge WAF & CDN</div>
              <div style={{ fontSize: 9.5, color: TOKENS.teal, fontFamily: "'JetBrains Mono', monospace" }}>Cloudflare / SSL</div>
            </div>

            <div style={{ textAlign: "center", color: TOKENS.blue, fontSize: 14 }}>➔</div>

            <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.brass}66`, borderRadius: 8, padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 20 }}>{gw.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: TOKENS.paper, marginTop: 4 }}>API Gateway</div>
              <div style={{ fontSize: 9.5, color: TOKENS.brass, fontFamily: "'JetBrains Mono', monospace" }}>{gw.name.split(" ")[0]}</div>
            </div>

            <div style={{ textAlign: "center", color: TOKENS.blue, fontSize: 14 }}>➔</div>

            <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 20 }}>{brk.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: TOKENS.paper, marginTop: 4 }}>Event Broker</div>
              <div style={{ fontSize: 9.5, color: TOKENS.slate, fontFamily: "'JetBrains Mono', monospace" }}>{brk.name.split(" ")[0]}</div>
            </div>

            <div style={{ textAlign: "center", color: TOKENS.blue, fontSize: 14 }}>➔</div>

            <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 20 }}>{dt.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: TOKENS.paper, marginTop: 4 }}>Storage & Cache</div>
              <div style={{ fontSize: 9.5, color: TOKENS.slate, fontFamily: "'JetBrains Mono', monospace" }}>{dt.name.split(" ")[0]}</div>
            </div>
          </div>

          {/* Telemetry Metrics */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginTop: 16 }}>
            <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: "10px 14px" }}>
              <div style={{ fontSize: 10.5, color: TOKENS.slate }}>Projected Peak Throughput</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: TOKENS.blue, marginTop: 2 }}>~{calculatedQps.toLocaleString()} QPS</div>
            </div>
            <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: "10px 14px" }}>
              <div style={{ fontSize: 10.5, color: TOKENS.slate }}>P99 Network Response Latency</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: TOKENS.teal, marginTop: 2 }}>~{calculatedLatency} ms</div>
            </div>
            <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: "10px 14px" }}>
              <div style={{ fontSize: 10.5, color: TOKENS.slate }}>High-Availability SLA</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: TOKENS.brass, marginTop: 2 }}>{cld.sla} Uptime</div>
            </div>
            <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: "10px 14px" }}>
              <div style={{ fontSize: 10.5, color: TOKENS.slate }}>Est. Monthly Cloud Hosting</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: TOKENS.paper, marginTop: 2 }}>{formatPrice(cld.estMonthlyInr, currency)}/mo</div>
            </div>
          </div>
        </div>

        {/* Configuration Tiers */}
        <div style={{ padding: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* 1. Client Tier */}
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: TOKENS.slate, marginBottom: 8 }}>
              1. CLIENT & PRESENTATION TIER
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {Object.keys(CLIENT_OPTIONS).map((k) => {
                const opt = CLIENT_OPTIONS[k];
                const active = clientTier === k;
                return (
                  <button
                    key={k}
                    onClick={() => setClientTier(k)}
                    style={{
                      background: active ? TOKENS.badgeBg : TOKENS.panelAlt,
                      border: `1px solid ${active ? TOKENS.blue : TOKENS.hair}`,
                      borderRadius: 8,
                      padding: "8px 12px",
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: active ? TOKENS.blue : TOKENS.paper }}>{opt.icon} {opt.name}</div>
                      <div style={{ fontSize: 10.5, color: TOKENS.slate }}>{opt.desc}</div>
                    </div>
                    <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.teal, fontWeight: 700 }}>{opt.qps}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Microservices Gateway Tier */}
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: TOKENS.slate, marginBottom: 8 }}>
              2. MICROSERVICES & API ENGINE
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {Object.keys(GATEWAY_OPTIONS).map((k) => {
                const opt = GATEWAY_OPTIONS[k];
                const active = gatewayTier === k;
                return (
                  <button
                    key={k}
                    onClick={() => setGatewayTier(k)}
                    style={{
                      background: active ? TOKENS.badgeBg : TOKENS.panelAlt,
                      border: `1px solid ${active ? TOKENS.blue : TOKENS.hair}`,
                      borderRadius: 8,
                      padding: "8px 12px",
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: active ? TOKENS.blue : TOKENS.paper }}>{opt.icon} {opt.name}</div>
                      <div style={{ fontSize: 10.5, color: TOKENS.slate }}>{opt.desc}</div>
                    </div>
                    <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.blue, fontWeight: 700 }}>~{opt.maxQps.toLocaleString()} QPS</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Data & Storage Tier */}
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: TOKENS.slate, marginBottom: 8 }}>
              3. DATABASE, CACHING & VECTOR STORE
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {Object.keys(DATA_OPTIONS).map((k) => {
                const opt = DATA_OPTIONS[k];
                const active = dataTier === k;
                return (
                  <button
                    key={k}
                    onClick={() => setDataTier(k)}
                    style={{
                      background: active ? TOKENS.badgeBg : TOKENS.panelAlt,
                      border: `1px solid ${active ? TOKENS.blue : TOKENS.hair}`,
                      borderRadius: 8,
                      padding: "8px 12px",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ fontSize: 12, fontWeight: 700, color: active ? TOKENS.blue : TOKENS.paper }}>{opt.icon} {opt.name}</div>
                    <div style={{ fontSize: 10.5, color: TOKENS.slate }}>{opt.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Cloud Infrastructure */}
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: TOKENS.slate, marginBottom: 8 }}>
              4. CLOUD SRE & ORCHESTRATION
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {Object.keys(CLOUD_OPTIONS).map((k) => {
                const opt = CLOUD_OPTIONS[k];
                const active = cloudTier === k;
                return (
                  <button
                    key={k}
                    onClick={() => setCloudTier(k)}
                    style={{
                      background: active ? TOKENS.badgeBg : TOKENS.panelAlt,
                      border: `1px solid ${active ? TOKENS.blue : TOKENS.hair}`,
                      borderRadius: 8,
                      padding: "8px 12px",
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: active ? TOKENS.blue : TOKENS.paper }}>{opt.icon} {opt.name}</div>
                      <div style={{ fontSize: 10.5, color: TOKENS.slate }}>High-Availability SLA: <strong>{opt.sla}</strong></div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div style={{ padding: "16px 24px", borderTop: `1px solid ${TOKENS.hair}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div style={{ fontSize: 12, color: TOKENS.slate }}>
            Estimated Dev Sprints: <strong>5 to 8 Sprints</strong> (Dedicated pod with Lead Architect, Full-Stack Engineers & SRE).
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={handleCopySpec}
              style={{
                background: TOKENS.panelAlt,
                border: `1px solid ${TOKENS.hair}`,
                borderRadius: 6,
                padding: "10px 14px",
                fontSize: 12,
                fontFamily: "'JetBrains Mono', monospace",
                cursor: "pointer",
                color: TOKENS.paper,
              }}
            >
              {copied ? "✓ Copied Spec" : "📋 Copy Blueprint"}
            </button>
            <Button
              onClick={() => {
                go("rfq-wizard");
                onClose();
              }}
            >
              🚀 Request Engineering Pod for This Architecture →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- Live Developer API Console & Sandbox Modal ---------------------------- */

function ApiSandboxModal({ isOpen, onClose }) {
  const [selectedEndpoint, setSelectedEndpoint] = useState("catalog");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [copiedCurl, setCopiedCurl] = useState(false);

  const ENDPOINTS = {
    catalog: {
      method: "GET",
      path: "/v1/services/catalog",
      desc: "Fetches complete IT engineering services directory with tech stack metadata and deliverables.",
      body: null,
      sampleResponse: {
        status: 200,
        provider: "Abhimanyu Technologies Pvt Ltd",
        total_services: 8,
        services: [
          { id: "web-dev", title: "Web Application Development", stack: ["Next.js 14", "React 18", "Node.js"] },
          { id: "android-dev", title: "Android & Mobile App Development", stack: ["Kotlin", "Compose", "Flutter"] },
          { id: "backend-dev", title: "Backend & Distributed APIs", stack: ["Go", "Node.js", "PostgreSQL", "Kafka"] },
          { id: "ai-solutions", title: "Enterprise AI & RAG", stack: ["Python", "FastAPI", "Milvus", "LangChain"] },
        ],
        infrastructure: "AWS Multi-AZ EKS Cluster (Hyderabad & Singapore)",
        timestamp: "2026-09-30T11:30:00Z",
      },
    },
    quote: {
      method: "POST",
      path: "/v1/projects/quote/calculate",
      desc: "Parametrically calculates sprint timeline, engineering pod allocation, and budget.",
      body: JSON.stringify({
        platform: "android_web_turnkey",
        modules: ["auth_rbac", "payment_gateway", "ai_rag_assistant", "realtime_telemetry"],
        scale_tier: "enterprise_high_concurrency",
      }, null, 2),
      sampleResponse: {
        status: 200,
        quote_id: "QTE-2026-9921",
        estimated_budget_inr: 450000,
        estimated_budget_usd: 5400,
        estimated_duration_weeks: 8,
        allocated_pod: {
          solutions_architect: 1,
          senior_fullstack_engineers: 2,
          mobile_specialist: 1,
          devops_sre: 1,
        },
        sla_guarantee: "100% IP Ownership & 30-Day Post-Launch Warranty",
      },
    },
    inventory: {
      method: "GET",
      path: "/v1/products/erp/inventory/status",
      desc: "Queries real-time warehouse inventory telemetry from Abhimanyu Cloud ERP.",
      body: null,
      sampleResponse: {
        status: 200,
        product: "Abhimanyu Cloud ERP",
        warehouse_id: "WH-TELANGANA-01",
        total_skus: 1420,
        active_sync_latency_ms: 14,
        recent_stock: [
          { sku: "SKU-8841", item: "Microcontroller STM32", qty: 2450, status: "IN_STOCK" },
          { sku: "SKU-4420", item: "Fiber Laser Scanner Head", qty: 38, status: "LOW_STOCK" },
          { sku: "SKU-1192", item: "Titanium Fastener M8", qty: 890, status: "IN_STOCK" },
        ],
      },
    },
    rag: {
      method: "POST",
      path: "/v1/ai/rag/query",
      desc: "Simulates an enterprise semantic query against proprietary vector documents.",
      body: JSON.stringify({
        query: "What is our disaster recovery RTO and RPO for AWS microservices?",
        role_access: "engineering_lead",
      }, null, 2),
      sampleResponse: {
        status: 200,
        query: "What is our disaster recovery RTO and RPO for AWS microservices?",
        confidence: 0.994,
        latency_ms: 320,
        answer: "Under our multi-region AWS topology with cross-region RDS read-replicas and Aurora Global Database, Recovery Time Objective (RTO) is < 15 minutes, and Recovery Point Objective (RPO) is < 1 second.",
        citations: ["SecOps-DR-Runbook-v3.pdf #Section 4.2", "AWS-MultiAZ-Spec.md"],
      },
    },
  };

  const ep = ENDPOINTS[selectedEndpoint] || ENDPOINTS.catalog;

  const handleSend = () => {
    setLoading(true);
    setResponse(null);
    setTimeout(() => {
      setResponse(ep.sampleResponse);
      setLoading(false);
    }, 280);
  };

  const handleCopyCurl = () => {
    const curl = `curl -X ${ep.method} "https://api.abhimanu-technologies.app${ep.path}" \\
  -H "Authorization: Bearer abk_live_demo_9841" \\
  -H "Content-Type: application/json"${ep.body ? ` \\\n  -d '${ep.body.replace(/\n/g, "")}'` : ""}`;
    navigator.clipboard?.writeText(curl);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  if (!isOpen) return null;

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
          maxWidth: 900,
          maxHeight: "90vh",
          overflowY: "auto",
          background: TOKENS.panel,
          border: `1px solid ${TOKENS.hair}`,
          borderRadius: 14,
          boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
          color: TOKENS.paper,
        }}
      >
        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${TOKENS.hair}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20 }}>🔌</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: TOKENS.paper }}>
                Live Developer API Console & Sandbox
              </span>
              <span style={{ background: "rgba(13,148,136,0.15)", color: TOKENS.teal, fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, padding: "2px 8px", borderRadius: 4 }}>
                REST & GRAPHQL
              </span>
            </div>
            <div style={{ fontSize: 12.5, color: TOKENS.slate, marginTop: 4 }}>
              Execute live simulated API requests against Abhimanyu platform microservices, query service catalogs, and inspect JSON payloads.
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>

        {/* Endpoint Selector Tabs */}
        <div style={{ display: "flex", gap: 8, padding: "14px 24px", borderBottom: `1px solid ${TOKENS.hair}`, background: TOKENS.panelAlt, flexWrap: "wrap" }}>
          {Object.keys(ENDPOINTS).map((k) => {
            const item = ENDPOINTS[k];
            const active = selectedEndpoint === k;
            return (
              <button
                key={k}
                onClick={() => { setSelectedEndpoint(k); setResponse(null); }}
                style={{
                  background: active ? TOKENS.panel : "transparent",
                  border: `1px solid ${active ? TOKENS.blue : "transparent"}`,
                  borderRadius: 6,
                  padding: "6px 12px",
                  fontSize: 12,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                  cursor: "pointer",
                  color: active ? TOKENS.blue : TOKENS.slate,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span style={{ color: item.method === "GET" ? TOKENS.teal : TOKENS.blue, fontWeight: 700 }}>{item.method}</span>
                <span>{item.path.split("/").pop()}</span>
              </button>
            );
          })}
        </div>

        {/* URL Bar & Send Button */}
        <div style={{ padding: "16px 24px", borderBottom: `1px solid ${TOKENS.hair}`, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ background: ep.method === "GET" ? "rgba(13,148,136,0.15)" : TOKENS.badgeBg, color: ep.method === "GET" ? TOKENS.teal : TOKENS.blue, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, padding: "6px 12px", borderRadius: 6 }}>
            {ep.method}
          </span>
          <div style={{ flex: 1, background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "8px 12px", fontSize: 13, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.paper }}>
            https://api.abhimanu-technologies.app{ep.path}
          </div>
          <Button onClick={handleSend} disabled={loading} style={{ padding: "8px 18px", fontSize: 13 }}>
            {loading ? "Sending..." : "Send Request ⚡"}
          </Button>
        </div>

        {/* Request Details & Response Output */}
        <div style={{ padding: 24, display: "grid", gridTemplateColumns: ep.body ? "1fr 1fr" : "1fr", gap: 20 }}>
          {ep.body && (
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: TOKENS.slate, marginBottom: 8 }}>
                REQUEST BODY (JSON)
              </div>
              <div style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: 14, fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: TOKENS.paper, overflowX: "auto" }}>
                <pre style={{ margin: 0 }}>{ep.body}</pre>
              </div>
            </div>
          )}

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: TOKENS.slate }}>
                RESPONSE PAYLOAD
              </span>
              {response && (
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ background: "rgba(13,148,136,0.15)", color: TOKENS.teal, fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, padding: "2px 6px", borderRadius: 4 }}>
                    ● 200 OK (24ms)
                  </span>
                </div>
              )}
            </div>

            <div style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: 14, minHeight: 220, maxHeight: 320, overflowY: "auto", fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: TOKENS.paper }}>
              {loading ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 200, color: TOKENS.slate }}>
                  Processing request...
                </div>
              ) : response ? (
                <pre style={{ margin: 0, color: TOKENS.paper }}>
                  {JSON.stringify(response, null, 2)}
                </pre>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: 200, color: TOKENS.slate, textAlign: "center" }}>
                  <span style={{ fontSize: 24, marginBottom: 8 }}>⚡</span>
                  Click "Send Request ⚡" to execute simulated live call.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ padding: "14px 24px", borderTop: `1px solid ${TOKENS.hair}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 12, color: TOKENS.slate }}>
            {ep.desc}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={handleCopyCurl}
              style={{
                background: TOKENS.panelAlt,
                border: `1px solid ${TOKENS.hair}`,
                borderRadius: 6,
                padding: "8px 12px",
                fontSize: 11.5,
                fontFamily: "'JetBrains Mono', monospace",
                cursor: "pointer",
                color: TOKENS.paper,
              }}
            >
              {copiedCurl ? "✓ Copied cURL" : "📋 Copy cURL"}
            </button>
            <Button onClick={onClose} variant="secondary" style={{ padding: "8px 14px", fontSize: 12 }}>
              Close Console
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- Enhanced Product Demo Modal with Live Interactive Sandbox ---------------------------- */

function ProductDemoModal({ product, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("sandbox");
  
  // Interactive ERP state
  const [erpStock, setErpStock] = useState([
    { id: 1, sku: "SKU-8841", name: "High-Precision Micro-Controllers", qty: 1420, price: 850 },
    { id: 2, sku: "SKU-4420", name: "Industrial Fiber Laser Scanner Heads", qty: 38, price: 42000 },
    { id: 3, sku: "SKU-1192", name: "Aerospace Titanium Fastener Kits", qty: 890, price: 1600 },
  ]);
  const [erpInvoice, setErpInvoice] = useState(null);

  // Interactive CRM state
  const [crmDeals, setCrmDeals] = useState([
    { id: 1, client: "Apex FinTech Solutions", val: "₹18,00,000", stage: "Lead In" },
    { id: 2, client: "TransContinental Logistics", val: "₹34,00,000", stage: "Demo" },
    { id: 3, client: "Vanguard Health Technologies", val: "₹24,50,000", stage: "Won" },
  ]);
  const [crmMsgSent, setCrmMsgSent] = useState(false);

  // Interactive HRMS state
  const [hrmsCtc, setHrmsCtc] = useState(85000);
  const [hrmsDays, setHrmsDays] = useState(26);

  // Interactive AI state
  const [aiPrompt, setAiPrompt] = useState("What is our disaster recovery RTO for cloud microservices?");
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  // Interactive DevPulse state
  const [deploySimulating, setDeploySimulating] = useState(false);
  const [deploySuccess, setDeploySuccess] = useState(false);

  // Interactive AppEngine state
  const [appEntity, setAppEntity] = useState("CustomerOrder");

  if (!isOpen || !product) return null;

  // Handlers for Sandbox
  const handleAddStock = (id) => {
    setErpStock((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 50 } : item))
    );
  };

  const handleGenerateInvoice = () => {
    const item = erpStock[0];
    const subtotal = item.price * 10;
    const gst = subtotal * 0.18;
    setErpInvoice({
      number: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      item: item.name,
      qty: 10,
      subtotal,
      gst,
      total: subtotal + gst,
    });
  };

  const handleAdvanceDeal = (id) => {
    setCrmDeals((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d;
        const nextStage = d.stage === "Lead In" ? "Demo" : d.stage === "Demo" ? "Won" : "Lead In";
        return { ...d, stage: nextStage };
      })
    );
  };

  const handleRunAi = () => {
    setAiGenerating(true);
    setAiResult(null);
    setTimeout(() => {
      setAiResult({
        answer: "Under Abhimanyu Multi-Region Cloud Topology, our automated cross-region Aurora Postgres failover guarantees an RTO of under 15 minutes and an RPO of under 1 second.",
        confidence: "99.4%",
        latency: "310ms",
        sources: ["Cloud-DR-Runbook.pdf (Sec 4.2)", "Kubernetes-EKS-Manifest.yaml"],
      });
      setAiGenerating(false);
    }, 400);
  };

  const handleSimulateDeploy = () => {
    setDeploySimulating(true);
    setDeploySuccess(false);
    setTimeout(() => {
      setDeploySimulating(false);
      setDeploySuccess(true);
    }, 600);
  };

  // HRMS Calculations
  const basic = Math.round(hrmsCtc * 0.5);
  const hra = Math.round(hrmsCtc * 0.2);
  const pf = Math.round(basic * 0.12);
  const pt = 200;
  const tds = Math.round(hrmsCtc * 0.08);
  const netTakeHome = hrmsCtc - (pf + pt + tds);

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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 32 }}>{product.icon}</span>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 20, fontWeight: 800, color: TOKENS.paper }}>{product.name}</span>
                <span style={{ background: TOKENS.badgeBg, color: TOKENS.blue, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, padding: "2px 8px", borderRadius: 4 }}>
                  {product.badge}
                </span>
              </div>
              <div style={{ fontSize: 13, color: TOKENS.slate, marginTop: 2 }}>{product.tagline}</div>
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

        {/* Tab Buttons */}
        <div style={{ display: "flex", gap: 8, borderBottom: `1px solid ${TOKENS.hair}`, paddingBottom: 10, marginBottom: 16 }}>
          {[
            { id: "sandbox", label: "⚡ Live Interactive Sandbox" },
            { id: "features", label: "Module Features" },
            { id: "architecture", label: "System Architecture" },
            { id: "pricing", label: "SaaS Plans" },
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

        {/* Sandbox Tab Content */}
        {activeTab === "sandbox" && (
          <div>
            {/* 1. ERP Sandbox */}
            {product.id === "erp" && (
              <div style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 10, padding: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: TOKENS.paper }}>📦 Live Inventory & Automated Invoicing Sandbox</div>
                    <div style={{ fontSize: 11.5, color: TOKENS.slate }}>Click to simulate real-time stock replenishment or generate a GST e-invoice.</div>
                  </div>
                  <Button onClick={handleGenerateInvoice} style={{ padding: "6px 12px", fontSize: 11.5 }}>
                    🧾 Generate GST E-Invoice
                  </Button>
                </div>

                <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 8, overflow: "hidden", marginBottom: 16 }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, textAlign: "left" }}>
                    <thead>
                      <tr style={{ background: TOKENS.panelAlt, borderBottom: `1px solid ${TOKENS.hair}`, fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate }}>
                        <th style={{ padding: "8px 12px" }}>SKU</th>
                        <th style={{ padding: "8px 12px" }}>Item Name</th>
                        <th style={{ padding: "8px 12px" }}>Stock Balance</th>
                        <th style={{ padding: "8px 12px" }}>Unit Price</th>
                        <th style={{ padding: "8px 12px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {erpStock.map((item) => (
                        <tr key={item.id} style={{ borderBottom: `1px solid ${TOKENS.hair}` }}>
                          <td style={{ padding: "8px 12px", fontFamily: "'JetBrains Mono', monospace", color: TOKENS.blue, fontWeight: 600 }}>{item.sku}</td>
                          <td style={{ padding: "8px 12px", color: TOKENS.paper }}>{item.name}</td>
                          <td style={{ padding: "8px 12px", fontWeight: 700, color: item.qty < 50 ? TOKENS.brass : TOKENS.teal }}>{item.qty} Units</td>
                          <td style={{ padding: "8px 12px", color: TOKENS.slate }}>₹{item.price.toLocaleString("en-IN")}</td>
                          <td style={{ padding: "8px 12px" }}>
                            <button
                              onClick={() => handleAddStock(item.id)}
                              style={{ background: TOKENS.badgeBg, border: `1px solid ${TOKENS.blue}44`, borderRadius: 4, padding: "3px 8px", fontSize: 10.5, color: TOKENS.blue, cursor: "pointer", fontWeight: 600 }}
                            >
                              + Ingest 50
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {erpInvoice && (
                  <div style={{ background: "rgba(13,148,136,0.08)", border: `1px solid ${TOKENS.teal}66`, borderRadius: 8, padding: 14, fontSize: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, color: TOKENS.teal, marginBottom: 6 }}>
                      <span>✓ Official GST E-Invoice Generated ({erpInvoice.number})</span>
                      <span>HSN: 8471 | IRN Validated</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: TOKENS.paper }}>
                      <span>Item: {erpInvoice.item} × {erpInvoice.qty} units</span>
                      <strong>Total with 18% GST: ₹{erpInvoice.total.toLocaleString("en-IN")}</strong>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. CRM Sandbox */}
            {product.id === "crm" && (
              <div style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 10, padding: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: TOKENS.paper }}>🎯 Interactive Sales Pipeline & WhatsApp Drip Simulator</div>
                    <div style={{ fontSize: 11.5, color: TOKENS.slate }}>Click any deal card to advance it through the revenue pipeline.</div>
                  </div>
                  <button
                    onClick={() => setCrmMsgSent(true)}
                    style={{ background: "#25D366", color: "#FFFFFF", border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 11.5, fontWeight: 700, cursor: "pointer" }}
                  >
                    💬 Test WhatsApp Drip
                  </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
                  {["Lead In", "Demo", "Won"].map((stg) => {
                    const stgDeals = crmDeals.filter((d) => d.stage === stg);
                    return (
                      <div key={stg} style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: 12 }}>
                        <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: TOKENS.slate, marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                          <span>{stg.toUpperCase()}</span>
                          <span>({stgDeals.length})</span>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          {stgDeals.map((d) => (
                            <div
                              key={d.id}
                              onClick={() => handleAdvanceDeal(d.id)}
                              style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: 10, cursor: "pointer", transition: "all 0.15s ease" }}
                            >
                              <div style={{ fontSize: 12, fontWeight: 700, color: TOKENS.paper }}>{d.client}</div>
                              <div style={{ fontSize: 11, color: TOKENS.blue, fontWeight: 600, marginTop: 4 }}>{d.val}</div>
                              <div style={{ fontSize: 9.5, color: TOKENS.teal, marginTop: 4 }}>Click to Advance ➔</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {crmMsgSent && (
                  <div style={{ background: "rgba(37, 211, 102, 0.1)", border: "1px solid #25D366", borderRadius: 8, padding: 12, fontSize: 12 }}>
                    <div style={{ fontWeight: 700, color: "#128C7E", marginBottom: 4 }}>✓ WhatsApp Cloud API Drip Dispatched to +91 98401 XXXXX</div>
                    <div style={{ color: TOKENS.paper, fontStyle: "italic" }}>
                      "Hi Rajesh, your custom architecture demo for Apex FinTech is ready. View live sandbox: https://abhimanu.app/demo/8841"
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. HRMS Sandbox */}
            {product.id === "hrms" && (
              <div style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 10, padding: 18 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: TOKENS.paper, marginBottom: 4 }}>👥 Real-Time Indian & Global Payroll Calculator</div>
                <div style={{ fontSize: 11.5, color: TOKENS.slate, marginBottom: 14 }}>Adjust monthly CTC to compute automatic PF, TDS, and net take-home salary.</div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ fontSize: 11.5, color: TOKENS.slate, display: "block", marginBottom: 6 }}>
                      Monthly Base CTC: <strong>₹{hrmsCtc.toLocaleString("en-IN")}</strong>
                    </label>
                    <input
                      type="range"
                      min={30000}
                      max={300000}
                      step={5000}
                      value={hrmsCtc}
                      onChange={(e) => setHrmsCtc(Number(e.target.value))}
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 11.5, color: TOKENS.slate, display: "block", marginBottom: 6 }}>
                      Working Days Attended: <strong>{hrmsDays} / 26 Days</strong>
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={26}
                      value={hrmsDays}
                      onChange={(e) => setHrmsDays(Number(e.target.value))}
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>

                <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: 14 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10, fontSize: 11.5 }}>
                    <div><span style={{ color: TOKENS.slate }}>Basic (50%):</span> <strong style={{ color: TOKENS.paper }}>₹{basic.toLocaleString("en-IN")}</strong></div>
                    <div><span style={{ color: TOKENS.slate }}>HRA (20%):</span> <strong style={{ color: TOKENS.paper }}>₹{hra.toLocaleString("en-IN")}</strong></div>
                    <div><span style={{ color: TOKENS.slate }}>Provident Fund (12%):</span> <strong style={{ color: TOKENS.brass }}>-₹{pf.toLocaleString("en-IN")}</strong></div>
                    <div><span style={{ color: TOKENS.slate }}>TDS (Est. Tax):</span> <strong style={{ color: TOKENS.brass }}>-₹{tds.toLocaleString("en-IN")}</strong></div>
                    <div><span style={{ color: TOKENS.slate }}>Net Take-Home:</span> <strong style={{ color: TOKENS.teal, fontSize: 14 }}>₹{netTakeHome.toLocaleString("en-IN")}</strong></div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. AI Studio Sandbox */}
            {product.id === "ai" && (
              <div style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 10, padding: 18 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: TOKENS.paper, marginBottom: 4 }}>🧠 Enterprise RAG Vector Knowledge Assistant</div>
                <div style={{ fontSize: 11.5, color: TOKENS.slate, marginBottom: 14 }}>Simulate querying confidential enterprise documents with semantic citations.</div>

                <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                  <input
                    type="text"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    style={{ flex: 1, padding: "8px 12px", borderRadius: 6, fontSize: 12.5 }}
                  />
                  <Button onClick={handleRunAi} disabled={aiGenerating} style={{ padding: "8px 16px", fontSize: 12 }}>
                    {aiGenerating ? "Generating..." : "Query Vault ⚡"}
                  </Button>
                </div>

                {aiResult && (
                  <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: 14, fontSize: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", color: TOKENS.teal, fontWeight: 700, marginBottom: 6 }}>
                      <span>Confidence Score: {aiResult.confidence}</span>
                      <span>Latency: {aiResult.latency}</span>
                    </div>
                    <div style={{ color: TOKENS.paper, lineHeight: 1.6, marginBottom: 10 }}>{aiResult.answer}</div>
                    <div style={{ fontSize: 10.5, color: TOKENS.slate }}>
                      Citations: {aiResult.sources.map((s, i) => <code key={i} style={{ background: TOKENS.panelAlt, padding: "2px 6px", borderRadius: 3, marginRight: 6 }}>{s}</code>)}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 5. DevPulse Sandbox */}
            {product.id === "devpulse" && (
              <div style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 10, padding: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: TOKENS.paper }}>📊 DORA Metrics Observability & Canary Deployments</div>
                    <div style={{ fontSize: 11.5, color: TOKENS.slate }}>Live telemetry benchmarks across your production GitOps repositories.</div>
                  </div>
                  <Button onClick={handleSimulateDeploy} disabled={deploySimulating} style={{ padding: "6px 14px", fontSize: 11.5 }}>
                    {deploySimulating ? "Deploying..." : "🚀 Simulate Canary Deploy"}
                  </Button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginBottom: 14 }}>
                  {[
                    { label: "Deploy Frequency", val: "18.4 / day", tier: "Elite" },
                    { label: "Lead Time", val: "24 mins", tier: "Elite" },
                    { label: "MTTR Recovery", val: "12 mins", tier: "Elite" },
                    { label: "Failure Rate", val: "0.7%", tier: "Elite" },
                  ].map((m, i) => (
                    <div key={i} style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: 12 }}>
                      <div style={{ fontSize: 10.5, color: TOKENS.slate }}>{m.label}</div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: TOKENS.teal, marginTop: 2 }}>{m.val}</div>
                      <span style={{ fontSize: 9.5, background: "rgba(13,148,136,0.15)", color: TOKENS.teal, padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>{m.tier}</span>
                    </div>
                  ))}
                </div>

                {deploySuccess && (
                  <div style={{ background: "rgba(13,148,136,0.1)", border: `1px solid ${TOKENS.teal}`, borderRadius: 8, padding: 12, fontSize: 12, color: TOKENS.teal, fontWeight: 700 }}>
                    ✓ Canary deployment hash #git-d71a89 promoted to 100% traffic with zero error anomalies.
                  </div>
                )}
              </div>
            )}

            {/* 6. AppEngine Sandbox */}
            {product.id === "appengine" && (
              <div style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 10, padding: 18 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: TOKENS.paper, marginBottom: 4 }}>⚡ Instant Low-Code Microservice & API Generator</div>
                <div style={{ fontSize: 11.5, color: TOKENS.slate, marginBottom: 14 }}>Type an entity name to auto-generate RESTful OpenAPI & GraphQL specifications.</div>

                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: TOKENS.paper }}>Entity Model:</label>
                  <input
                    type="text"
                    value={appEntity}
                    onChange={(e) => setAppEntity(e.target.value)}
                    style={{ padding: "6px 12px", borderRadius: 6, fontSize: 12, width: 220 }}
                  />
                </div>

                <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: 14, fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: TOKENS.paper }}>
                  <div style={{ color: TOKENS.blue, fontWeight: 700, marginBottom: 6 }}>// Auto-Generated REST Endpoints</div>
                  <div>POST   /api/v1/{appEntity.toLowerCase()}s        ➔ Create {appEntity}</div>
                  <div>GET    /api/v1/{appEntity.toLowerCase()}s        ➔ Paginated List (Cursor / Limit)</div>
                  <div>GET    /api/v1/{appEntity.toLowerCase()}s/:id    ➔ Query by UUID</div>
                  <div>DELETE /api/v1/{appEntity.toLowerCase()}s/:id    ➔ Soft Delete & Audit Log</div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "features" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {product.modules.map((m, idx) => (
              <div key={idx} style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: "12px 14px", fontSize: 13 }}>
                <span style={{ color: TOKENS.teal, fontWeight: 700, marginRight: 6 }}>✓</span>
                {m}
              </div>
            ))}
          </div>
        )}

        {activeTab === "architecture" && (
          <div style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 10, padding: 20 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: TOKENS.slate, marginBottom: 8 }}>
              ENTERPRISE DEPLOYMENT TOPOLOGY
            </div>
            <div style={{ fontSize: 13, color: TOKENS.paper, lineHeight: 1.6, marginBottom: 14 }}>
              Engineered using <strong>{product.techStack.join(" • ")}</strong> with automated multi-region database failover, Redis caching clusters, and zero-downtime rolling updates.
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {product.metrics.map((met, i) => (
                <div key={i} style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "8px 14px", fontSize: 12, fontWeight: 700, color: TOKENS.blue }}>
                  ⚡ {met}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "pricing" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {Object.keys(product.pricing).map((k) => {
              const p = product.pricing[k];
              return (
                <div key={k} style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 10, padding: 16 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: TOKENS.paper }}>{p.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: TOKENS.blue, margin: "8px 0" }}>
                    ₹{p.inr.toLocaleString("en-IN")}<span style={{ fontSize: 11, color: TOKENS.slate }}>{p.period}</span>
                  </div>
                  <div style={{ fontSize: 11.5, color: TOKENS.slate, lineHeight: 1.4 }}>{p.desc}</div>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20, paddingTop: 16, borderTop: `1px solid ${TOKENS.hair}` }}>
          <Button onClick={onClose}>Close Walkthrough</Button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- Universal Spotlight Search (Ctrl+K) ---------------------------- */

function SpotlightSearchModal({ isOpen, onClose, go, openEstimator, openTracker, openArchitecture, openApiSandbox }) {
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
    { type: "Service", title: "Web Application Development", id: "services", icon: "🌐", sub: "Next.js 14, React, responsive web portals, PWAs" },
    { type: "Service", title: "Frontend & UI/UX Development", id: "services", icon: "🎨", sub: "Figma to pixel-perfect code, Tailwind, design systems" },
    { type: "Service", title: "Backend & Distributed API Engineering", id: "services", icon: "⚙️", sub: "Node.js, Python FastAPI, Go, PostgreSQL, Kafka" },
    { type: "Service", title: "Android & Mobile App Development", id: "services", icon: "📱", sub: "Native Kotlin, Jetpack Compose, Flutter, React Native" },
    { type: "Service", title: "Full Stack Turnkey Development", id: "services", icon: "⚡", sub: "Complete web + mobile digital product engineering" },
    { type: "Service", title: "Cloud, DevOps & SRE Engineering", id: "services", icon: "☁️", sub: "AWS, GCP, Docker, Kubernetes, CI/CD, Terraform" },
    { type: "Service", title: "Enterprise AI & Custom Solutions", id: "services", icon: "🤖", sub: "Private RAG, custom LLMs, document intelligence" },
    { type: "Product", title: "Abhimanyu Cloud ERP", id: "products", icon: "📦", sub: "Inventory, supply chain, automated GST invoicing" },
    { type: "Product", title: "Abhimanyu CRM", id: "products", icon: "🎯", sub: "Omnichannel WhatsApp, sales pipeline & AI lead scoring" },
    { type: "Product", title: "Abhimanyu HRMS", id: "products", icon: "👥", sub: "Payroll automation, biometric attendance, tax compliance" },
    { type: "Product", title: "Abhimanyu AI Studio", id: "products", icon: "🧠", sub: "Private enterprise knowledge RAG & automation" },
    { type: "Product", title: "Abhimanyu DevPulse", id: "products", icon: "📊", sub: "Real-time cloud observability & rollback monitor" },
    { type: "Product", title: "Abhimanyu AppEngine", id: "products", icon: "⚡", sub: "Rapid backend-as-a-service & API generator" },
    { type: "Tool", title: "Interactive System Architecture Designer", id: "architecture", action: "openArchitecture", icon: "📐", sub: "Design cloud microservices, topology & estimate latency" },
    { type: "Tool", title: "Live Developer API Console & Sandbox", id: "api-sandbox", action: "openApiSandbox", icon: "🔌", sub: "Execute simulated REST & GraphQL API requests live" },
    { type: "Tool", title: "Interactive Project Scope & Cost Estimator", id: "estimator", action: "openEstimator", icon: "⚡", sub: "Calculate tech stack budget, sprints & team pod" },
    { type: "Tool", title: "Client Live Project Sprint Tracker", id: "tracker", action: "openTracker", icon: "📊", sub: "Live staging URL, sprint burndown & commit logs" },
    { type: "Page", title: "Case Studies & Client Portfolio", id: "case-studies", icon: "📈", sub: "FinTech, Healthcare, Logistics & E-Commerce" },
    { type: "Page", title: "Engineering Manifesto & Tech Hub", id: "knowledge", icon: "📚", sub: "Architecture playbooks and development guides" },
    { type: "Page", title: "Careers & Open Positions", id: "careers", icon: "💼", sub: "Senior engineering roles with compensation bands" },
    { type: "Page", title: "Contact & Technical Solutions Intake", id: "contact", icon: "📞", sub: "Direct consultation booking with 12hr review SLA" },
  ];

  const results = catalog.filter((item) => {
    const q = query.toLowerCase();
    return item.title.toLowerCase().includes(q) || item.sub.toLowerCase().includes(q) || item.type.toLowerCase().includes(q);
  });

  const handleSelect = (item) => {
    onClose();
    if (item.action === "openEstimator") openEstimator?.();
    else if (item.action === "openTracker") openTracker?.();
    else if (item.action === "openArchitecture") openArchitecture?.();
    else if (item.action === "openApiSandbox") openApiSandbox?.();
    else go(item.id);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15, 23, 42, 0.65)",
        backdropFilter: "blur(16px)",
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
          width: "100%",
          maxWidth: 620,
          background: TOKENS.panel,
          border: `1px solid ${TOKENS.hair}`,
          borderRadius: 12,
          boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", padding: "14px 18px", borderBottom: `1px solid ${TOKENS.hair}` }}>
          <span style={{ fontSize: 18, marginRight: 10 }}>🔍</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search IT Services, Products, Tech Stacks, or Tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: 15,
              fontFamily: "'Inter', sans-serif",
              color: TOKENS.paper,
            }}
          />
          <kbd style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 4, padding: "2px 6px", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TOKENS.slate }}>
            ESC
          </kbd>
        </div>

        <div style={{ maxHeight: 380, overflowY: "auto", padding: 8 }}>
          {results.length === 0 ? (
            <div style={{ padding: "30px", textAlign: "center", color: TOKENS.slate, fontSize: 13 }}>
              No matching services or products found for "{query}".
            </div>
          ) : (
            results.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(item)}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  padding: "10px 14px",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = TOKENS.panelAlt)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: TOKENS.paper }}>{item.title}</div>
                    <div style={{ fontSize: 11, color: TOKENS.slate }}>{item.sub}</div>
                  </div>
                </div>
                <span style={{ background: TOKENS.panelAlt, color: TOKENS.slate, fontSize: 10, fontFamily: "'JetBrains Mono', monospace", padding: "2px 8px", borderRadius: 4 }}>
                  {item.type}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- Page 1: HomePage ---------------------------- */

function HomePage({ go, currency, openEstimator, openTracker, openArchitecture, openApiSandbox, setSelectedProduct, openProductDemo }) {
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
              ENTERPRISE IT SERVICES & FULL-STACK DIGITAL PRODUCTS
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
            Engineering World-Class <span style={{ color: TOKENS.blue }}>Web & Mobile Apps</span>, Cloud Backends and SaaS Products.
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
            We partner with ambitious startups and enterprises to architect, design, and deliver high-performance Web Portals, Android & iOS Mobile Apps, Scalable Microservices, and Custom AI Systems.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Button onClick={() => go("services")} style={{ padding: "13px 26px", fontSize: 15 }}>
              Explore IT Services →
            </Button>
            <Button
              onClick={openArchitecture}
              style={{
                background: "rgba(37,99,235,0.08)",
                border: `1px solid ${TOKENS.blue}55`,
                color: TOKENS.blue,
                padding: "13px 24px",
                fontSize: 15,
                fontWeight: 700,
              }}
            >
              📐 System Architect
            </Button>
            <Button onClick={openEstimator} variant="secondary" style={{ padding: "13px 24px", fontSize: 15 }}>
              ⚡ Cost Estimator
            </Button>
            <Button onClick={() => go("products")} variant="outline" style={{ padding: "13px 24px", fontSize: 15 }}>
              📦 View Software Products
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
              { val: "120+", label: "Completed Digital Projects" },
              { label: "On-Time Milestone Delivery", val: "99.8%" },
              { label: "Web & Mobile App Engineers", val: "45+" },
              { label: "Technical Solutions SLA", val: "< 2 Hours" },
            ].map((st, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: TOKENS.blue }}>{st.val}</div>
                <div style={{ fontSize: 11.5, color: TOKENS.slate, marginTop: 4 }}>{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core IT Services Grid */}
      <section style={{ padding: "80px 20px", maxWidth: 1280, margin: "0 auto" }}>
        <SectionHeading
          badge="Full-Stack Capabilities"
          title="Comprehensive IT Engineering Services"
          subtitle="From concept to deployment, our senior developers build robust, accessible, and scalable digital solutions tailored to your business goals."
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
                  <div style={{ fontSize: 10, color: TOKENS.slate }}>ESTIMATED START</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: TOKENS.paper }}>{formatPrice(s.estInr, currency)}</div>
                </div>
                <Button onClick={() => go("services")} style={{ padding: "6px 12px", fontSize: 12 }}>
                  Details →
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Proprietary Software Products Showcase */}
      <section style={{ padding: "80px 20px", background: TOKENS.panelAlt }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading
            badge="Proprietary SaaS Suites"
            title="Enterprise Software Products"
            subtitle="Pre-built, modular, and customizable software platforms built by Abhimanyu Technologies for enterprise operations, CRM, HRMS, and AI."
          />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
            {SOFTWARE_PRODUCTS.map((p) => (
              <div
                key={p.id}
                style={{
                  background: TOKENS.panel,
                  border: `1px solid ${TOKENS.hair}`,
                  borderRadius: 12,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <span style={{ fontSize: 32 }}>{p.icon}</span>
                    <span style={{ background: TOKENS.badgeBg, color: TOKENS.blue, fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, padding: "2px 8px", borderRadius: 4 }}>
                      {p.badge}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 19, fontWeight: 700, color: TOKENS.paper, margin: "0 0 6px" }}>{p.name}</h3>
                  <div style={{ fontSize: 12, fontWeight: 600, color: TOKENS.teal, marginBottom: 10 }}>{p.tagline}</div>
                  <p style={{ fontSize: 13, color: TOKENS.slate, lineHeight: 1.5, margin: "0 0 16px" }}>{p.shortDesc}</p>

                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 18 }}>
                    {p.metrics.map((met, mi) => (
                      <div key={mi} style={{ fontSize: 11.5, color: TOKENS.paper, display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ color: TOKENS.teal }}>✓</span> {met}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ borderTop: `1px solid ${TOKENS.hair}`, paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 10, color: TOKENS.slate }}>STARTER TIER</div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: TOKENS.blue }}>
                      {formatPrice(p.pricing.starter.inr, currency)}<span style={{ fontSize: 11, fontWeight: 400, color: TOKENS.slate }}>/mo</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      setSelectedProduct(p);
                      openProductDemo();
                    }}
                    style={{ padding: "6px 12px", fontSize: 12 }}
                  >
                    View Modules →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Matrix */}
      <section style={{ padding: "80px 20px", maxWidth: 1280, margin: "0 auto" }}>
        <SectionHeading
          badge="Modern Ecosystem"
          title="Battle-Tested Technology Stack"
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
      </section>

      {/* Client Testimonials */}
      <section style={{ padding: "80px 20px", background: TOKENS.panelAlt }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionHeading
            badge="Client Success"
            title="Trusted by Technology Leaders"
            subtitle="See how our engineering teams have helped founders and CTOs ship world-class digital products."
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
            Ready to Build Your Next Digital Product?
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", maxWidth: 640, margin: "0 auto 30px", lineHeight: 1.6 }}>
            Connect with our Senior Solutions Architects today. Receive a comprehensive technical scope proposal and estimated development sprints within 12 business hours.
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
              onClick={openEstimator}
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
              ⚡ Instant Budget Estimator
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------------------- Page 2: ServicesPage ---------------------------- */

function ServicesPage({ go, currency, openEstimator, openArchitecture }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

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

                <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                  <Button onClick={() => go("rfq-wizard")} style={{ flex: 1, padding: "9px" }}>
                    Start Requirement →
                  </Button>
                  <Button onClick={openEstimator} variant="secondary" style={{ padding: "9px 14px" }}>
                    ⚡ Estimate
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
              How our Senior Solutions Architects evaluate and choose the optimal architectural stack for client software products.
            </div>
          </div>
          <Button onClick={openArchitecture} style={{ padding: "8px 16px", fontSize: 12.5 }}>
            📐 Open System Architect
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
    </div>
  );
}

/* ---------------------------- Page 3: ProductsPage ---------------------------- */

function ProductsPage({ currency, setSelectedProduct, openProductDemo, go }) {
  return (
    <div style={{ padding: "40px 20px 80px", maxWidth: 1280, margin: "0 auto" }}>
      <SectionHeading
        badge="Software Suite"
        title="Enterprise Software Platforms"
        subtitle="Proprietary software products built by Abhimanyu Technologies, available as cloud SaaS or private on-premise deployments."
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32 }}>
        {SOFTWARE_PRODUCTS.map((prod) => (
          <div
            key={prod.id}
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
                <span style={{ fontSize: 40 }}>{prod.icon}</span>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <h3 style={{ fontSize: 22, fontWeight: 800, color: TOKENS.paper, margin: 0 }}>{prod.name}</h3>
                    <span style={{ background: TOKENS.badgeBg, color: TOKENS.blue, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, padding: "2px 8px", borderRadius: 4 }}>
                      {prod.badge}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: TOKENS.teal, marginTop: 4 }}>{prod.tagline}</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <Button
                  onClick={() => {
                    setSelectedProduct(prod);
                    openProductDemo();
                  }}
                  variant="outline"
                  style={{ padding: "8px 14px", fontSize: 12.5 }}
                >
                  Interactive Walkthrough
                </Button>
                <Button onClick={() => go("contact")} style={{ padding: "8px 16px", fontSize: 12.5 }}>
                  Schedule Live Demo →
                </Button>
              </div>
            </div>

            <p style={{ fontSize: 14, color: TOKENS.slate, lineHeight: 1.6, marginBottom: 20 }}>
              {prod.shortDesc}
            </p>

            {/* Modules Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 10, marginBottom: 24 }}>
              {prod.modules.map((mod, mi) => (
                <div key={mi} style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 6, padding: "10px 12px", fontSize: 12.5, color: TOKENS.paper }}>
                  <span style={{ color: TOKENS.teal, fontWeight: 700, marginRight: 6 }}>✓</span>
                  {mod}
                </div>
              ))}
            </div>

            {/* Tiered Pricing Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
              {Object.keys(prod.pricing).map((k) => {
                const plan = prod.pricing[k];
                return (
                  <div key={k} style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 8, padding: 14 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: TOKENS.paper }}>{plan.label}</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: TOKENS.blue, margin: "6px 0" }}>
                      {formatPrice(plan.inr, currency)}<span style={{ fontSize: 10.5, fontWeight: 400, color: TOKENS.slate }}>{plan.period}</span>
                    </div>
                    <div style={{ fontSize: 11, color: TOKENS.slate, lineHeight: 1.4 }}>{plan.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
        subtitle="Complete this 5-step guided intake to outline your requirements, tech stack, and timeline."
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

/* ---------------------------- Page 5: CaseStudiesPage ---------------------------- */

function CaseStudiesPage({ go }) {
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
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {cs.tech.map((t, ti) => (
                <span key={ti} style={{ background: TOKENS.badgeBg, border: `1px solid ${TOKENS.blue}33`, color: TOKENS.blue, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", padding: "3px 8px", borderRadius: 4 }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------- Page 6: KnowledgePage (Tech Hub) ---------------------------- */

function KnowledgePage({ openApiSandbox, openArchitecture }) {
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

      {/* Live Developer API Sandbox Callout */}
      <div
        style={{
          background: `linear-gradient(135deg, ${TOKENS.panelAlt} 0%, ${TOKENS.panel} 100%)`,
          border: `1px solid ${TOKENS.teal}66`,
          borderRadius: 12,
          padding: 22,
          marginBottom: 32,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 14,
        }}
      >
        <div style={{ maxWidth: 660 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 20 }}>🔌</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: TOKENS.paper }}>
              Live Interactive Developer API Console & Sandbox
            </span>
            <span style={{ background: "rgba(13,148,136,0.15)", color: TOKENS.teal, fontSize: 10, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, padding: "2px 6px", borderRadius: 4 }}>
              DEVELOPER TESTBED
            </span>
          </div>
          <p style={{ fontSize: 12.5, color: TOKENS.slate, margin: 0, lineHeight: 1.5 }}>
            Execute simulated REST & GraphQL endpoints, inspect request headers, and view live JSON payloads returned by Abhimanyu microservice APIs.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Button onClick={openApiSandbox} style={{ padding: "9px 18px", fontSize: 13 }}>
            Launch API Console ⚡
          </Button>
          <Button onClick={openArchitecture} variant="secondary" style={{ padding: "9px 16px", fontSize: 13 }}>
            📐 Architecture Map
          </Button>
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

function DashboardPage({ openTracker, openEstimator, go }) {
  return (
    <div style={{ padding: "40px 20px 80px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: TOKENS.paper, margin: "0 0 6px" }}>
            Client Project & Development Workspace
          </h2>
          <div style={{ fontSize: 13, color: TOKENS.slate }}>
            Logged in as <strong>Dr. K. S. Rao</strong> (Enterprise Client Lead)
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
    </div>
  );
}

/* ---------------------------- Page 8: AboutPage ---------------------------- */

function AboutPage({ go }) {
  return (
    <div style={{ padding: "40px 20px 80px", maxWidth: 1100, margin: "0 auto" }}>
      <SectionHeading
        badge="Who We Are"
        title="Engineering Excellence & Digital Craftsmanship"
        subtitle="Abhimanyu Technologies is an enterprise software engineering company headquartered in Telangana, India, serving clients across the globe."
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 40 }}>
        <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 12, padding: 24 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: TOKENS.paper, margin: "0 0 10px" }}>🎯 Our Core Mission</h3>
          <p style={{ fontSize: 13.5, color: TOKENS.slate, lineHeight: 1.6, margin: 0 }}>
            To empower forward-thinking organizations with modern web applications, robust native Android mobile software, scalable cloud backends, and bespoke enterprise SaaS products built for long-term reliability.
          </p>
        </div>

        <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 12, padding: 24 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: TOKENS.paper, margin: "0 0 10px" }}>🛡️ Development Principles</h3>
          <p style={{ fontSize: 13.5, color: TOKENS.slate, lineHeight: 1.6, margin: 0 }}>
            We champion strict type safety, modular microservices, automated end-to-end testing, zero technical debt, and transparent daily communication with our clients.
          </p>
        </div>
      </div>

      {/* Leadership & Engineering Hubs */}
      <div style={{ background: TOKENS.panelAlt, border: `1px solid ${TOKENS.hair}`, borderRadius: 14, padding: 28, textAlign: "center" }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: TOKENS.paper, margin: "0 0 10px" }}>Global Delivery & Engineering Hubs</h3>
        <p style={{ fontSize: 14, color: TOKENS.slate, maxWidth: 640, margin: "0 auto 20px", lineHeight: 1.6 }}>
          Headquartered in Telangana with distributed senior engineering teams across Hyderabad, Bengaluru, Chennai, and remote technology hubs.
        </p>
        <Button onClick={() => go("contact")}>Schedule a Technical Consultation →</Button>
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
    { title: "DevOps & Cloud SRE Architect (AWS + Kubernetes)", team: "Infrastructure", loc: "Chennai / Remote", exp: "4-8 years", comp: "₹20L - ₹35L PA" },
  ];

  return (
    <div style={{ padding: "40px 20px 80px", maxWidth: 1000, margin: "0 auto" }}>
      <SectionHeading
        badge="Join Our Team"
        title="Build Future-Proof Software with Us"
        subtitle="Work on high-throughput microservices, cutting-edge Android apps, and generative AI products with top-tier engineers."
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
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "Web Development", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ padding: "40px 20px 80px", maxWidth: 1000, margin: "0 auto" }}>
      <SectionHeading
        badge="Get in Touch"
        title="Start Your Technical Consultation"
        subtitle="Speak directly with our senior software architects. Receive NDA-protected technical guidance and project estimates."
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 32 }}>
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
            <h3 style={{ fontSize: 16, fontWeight: 700, color: TOKENS.paper, margin: "0 0 10px" }}>🛡️ Our Guarantee</h3>
            <div style={{ fontSize: 13, color: TOKENS.slate, lineHeight: 1.5 }}>
              • 12-Hour Solutions Architect Review SLA<br />
              • Bilateral NDA Protection Signed Automatically<br />
              • Transparent Sprint-Based Milestone Pricing<br />
              • 100% Client Code & IP Ownership
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.hair}`, borderRadius: 14, padding: 28, boxShadow: "0 2px 14px rgba(0,0,0,0.03)" }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <span style={{ fontSize: 40 }}>✅</span>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: TOKENS.paper, margin: "12px 0 6px" }}>Message Received!</h3>
              <p style={{ fontSize: 13.5, color: TOKENS.slate }}>Thank you, {form.name}. Our Solutions Architect will reach out to {form.email} within 12 business hours.</p>
              <Button onClick={() => setSubmitted(false)} variant="secondary" style={{ marginTop: 14 }}>Send Another Note</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, color: TOKENS.slate, display: "block", marginBottom: 4 }}>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandra"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: 6, border: `1px solid ${TOKENS.hair}`, background: TOKENS.panel, color: TOKENS.paper, fontSize: 13 }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: TOKENS.slate, display: "block", marginBottom: 4 }}>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: 6, border: `1px solid ${TOKENS.hair}`, background: TOKENS.panel, color: TOKENS.paper, fontSize: 13 }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12, color: TOKENS.slate, display: "block", marginBottom: 4 }}>Primary Service of Interest</label>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
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
                <label style={{ fontSize: 12, color: TOKENS.slate, display: "block", marginBottom: 4 }}>Project Details / Architecture Scope</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Outline your requirements, tech preferences, or project timeline..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: 6, border: `1px solid ${TOKENS.hair}`, background: TOKENS.panel, color: TOKENS.paper, fontSize: 13 }}
                />
              </div>

              <Button type="submit" style={{ padding: "12px", width: "100%" }}>
                Submit Consultation Request →
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- Universal Footer ---------------------------- */

function Footer({ go }) {
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
            Enterprise IT Services, Full-Stack Web Development, Native Android & Mobile App Engineering, and Software Products. Sloganed to Scale Your Business.
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
            SOFTWARE PRODUCTS
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button onClick={() => go("products")} style={{ background: "none", border: "none", color: TOKENS.slate, textAlign: "left", cursor: "pointer", padding: 0 }}>Abhimanyu Cloud ERP</button>
            <button onClick={() => go("products")} style={{ background: "none", border: "none", color: TOKENS.slate, textAlign: "left", cursor: "pointer", padding: 0 }}>Abhimanyu CRM</button>
            <button onClick={() => go("products")} style={{ background: "none", border: "none", color: TOKENS.slate, textAlign: "left", cursor: "pointer", padding: 0 }}>Abhimanyu HRMS</button>
            <button onClick={() => go("products")} style={{ background: "none", border: "none", color: TOKENS.slate, textAlign: "left", cursor: "pointer", padding: 0 }}>Abhimanyu AI Studio</button>
            <button onClick={() => go("products")} style={{ background: "none", border: "none", color: TOKENS.slate, textAlign: "left", cursor: "pointer", padding: 0 }}>Abhimanyu DevPulse</button>
            <button onClick={() => go("products")} style={{ background: "none", border: "none", color: TOKENS.slate, textAlign: "left", cursor: "pointer", padding: 0 }}>Abhimanyu AppEngine</button>
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
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", borderTop: `1px solid ${TOKENS.hair}`, paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, fontSize: 11.5 }}>
        <div>
          © 2026 Abhimanyu Technologies Pvt. Ltd. All rights reserved. Sloganed to <strong>Scale Your Business</strong>.
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Bilateral NDA Guarantee</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------- Pages Registry ---------------------------- */

const PAGES = {
  home: HomePage,
  services: ServicesPage,
  products: ProductsPage,
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
  const [currency, setCurrency] = useState("INR");
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("abhimanyu_theme") || "light";
    } catch {
      return "light";
    }
  });

  const [currentUser, setCurrentUser] = useState({
    name: "Dr. K. S. Rao",
    company: "Apex FinTech Solutions",
    role: "client",
  });

  // Modal states
  const [estimatorOpen, setEstimatorOpen] = useState(false);
  const [trackerOpen, setTrackerOpen] = useState(false);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [architectureOpen, setArchitectureOpen] = useState(false);
  const [apiSandboxOpen, setApiSandboxOpen] = useState(false);
  const [productDemoOpen, setProductDemoOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(SOFTWARE_PRODUCTS[0]);

  // Synchronize dynamic theme tokens
  useEffect(() => {
    const isDark = theme === "dark";
    Object.assign(TOKENS, isDark ? DARK_TOKENS : LIGHT_TOKENS);
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.setProperty("--bg", isDark ? "#0B1727" : "#F8FAFC");
    document.documentElement.style.setProperty("--text", isDark ? "#F8FAFC" : "#0F172A");
    document.body.style.background = isDark ? "#0B1727" : "#F8FAFC";
    document.body.style.color = isDark ? "#F8FAFC" : "#0F172A";
    try {
      localStorage.setItem("abhimanyu_theme", theme);
    } catch (_) {}
  }, [theme]);

  // Keyboard shortcut Ctrl+K / Cmd+K
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

  const go = (id) => {
    setPage(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const PageComponent = PAGES[page] || HomePage;

  return (
    <div
      style={{
        background: theme === "dark" ? DARK_TOKENS.ink : LIGHT_TOKENS.ink,
        color: theme === "dark" ? DARK_TOKENS.paper : LIGHT_TOKENS.paper,
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: ${theme === "dark" ? "#0B1727" : "#F8FAFC"}; color: ${theme === "dark" ? "#F8FAFC" : "#0F172A"}; }
        input, select, textarea, option { color-scheme: ${theme === "dark" ? "dark" : "light"}; }
        input, select, textarea {
          background: ${theme === "dark" ? "#132238" : "#FFFFFF"} !important;
          color: ${theme === "dark" ? "#F8FAFC" : "#0F172A"} !important;
          border-color: ${theme === "dark" ? "rgba(255,255,255,0.18)" : "#CBD5E1"} !important;
        }
        input::placeholder, textarea::placeholder {
          color: ${theme === "dark" ? "#64748B" : "#94A3B8"} !important;
        }
        button:focus-visible, input:focus-visible, textarea:focus-visible, select:focus-visible { outline: 2px solid ${TOKENS.blue}; outline-offset: 2px; }
        select option { background: ${theme === "dark" ? "#132238" : "#FFFFFF"} !important; color: ${theme === "dark" ? "#F8FAFC" : "#0F172A"} !important; }

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
        currency={currency}
        setCurrency={setCurrency}
        currentUser={currentUser}
        openEstimator={() => setEstimatorOpen(true)}
        openTracker={() => setTrackerOpen(true)}
        openSpotlight={() => setSpotlightOpen(true)}
        openArchitecture={() => setArchitectureOpen(true)}
        openApiSandbox={() => setApiSandboxOpen(true)}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Main Page Content */}
      <main style={{ paddingTop: 64 }}>
        <PageComponent
          go={go}
          currency={currency}
          currentUser={currentUser}
          openEstimator={() => setEstimatorOpen(true)}
          openTracker={() => setTrackerOpen(true)}
          openArchitecture={() => setArchitectureOpen(true)}
          openApiSandbox={() => setApiSandboxOpen(true)}
          setSelectedProduct={setSelectedProduct}
          openProductDemo={() => setProductDemoOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer go={go} />

      {/* Global Modals */}
      <ProjectEstimatorModal
        isOpen={estimatorOpen}
        onClose={() => setEstimatorOpen(false)}
        currency={currency}
        go={go}
      />

      <ClientProjectTrackerModal
        isOpen={trackerOpen}
        onClose={() => setTrackerOpen(false)}
        go={go}
      />

      <ArchitectureVisualizerModal
        isOpen={architectureOpen}
        onClose={() => setArchitectureOpen(false)}
        go={go}
        currency={currency}
      />

      <ApiSandboxModal
        isOpen={apiSandboxOpen}
        onClose={() => setApiSandboxOpen(false)}
      />

      <ProductDemoModal
        product={selectedProduct}
        isOpen={productDemoOpen}
        onClose={() => setProductDemoOpen(false)}
      />

      <SpotlightSearchModal
        isOpen={spotlightOpen}
        onClose={() => setSpotlightOpen(false)}
        go={go}
        openEstimator={() => setEstimatorOpen(true)}
        openTracker={() => setTrackerOpen(true)}
        openArchitecture={() => setArchitectureOpen(true)}
        openApiSandbox={() => setApiSandboxOpen(true)}
      />

      {/* Fixed Mobile Bottom Navigation */}
      <nav
        className="mobile-bottom-nav"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9000,
          background: theme === "dark" ? "rgba(19, 34, 56, 0.96)" : "rgba(255, 255, 255, 0.96)",
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
          { icon: "📦", label: "Products", id: "products" },
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
