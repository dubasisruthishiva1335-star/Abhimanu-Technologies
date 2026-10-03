import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

// --- DATA DEFINITIONS ---

const COMMAND_ITEMS = [
  { title: 'Services & Capabilities', category: 'Navigation', anchor: 'services', desc: 'Web apps, mobile apps, maintenance, cloud, UI/UX, 3D' },
  { title: '3D Studio (Live Demo)', category: 'Navigation', anchor: 'studio', desc: 'Real-time WebGL shader & customizer' },
  { title: 'Applications Showcase', category: 'Navigation', anchor: 'applications', desc: 'Live mobile mockup with orders & chat' },
  { title: 'Industries We Serve', category: 'Navigation', anchor: 'industries', desc: 'Architecture, civil & EPC 3D building viewer' },
  { title: 'Selected Work', category: 'Navigation', anchor: 'work', desc: 'A ring of ideas we can build for you' },
  { title: 'How We Work (Process)', category: 'Navigation', anchor: 'process', desc: '4-step agile delivery framework' },
  { title: 'Project Estimator', category: 'Navigation', anchor: 'estimate', desc: 'Calculate timeline, team, and phase split' },
  { title: 'Maintenance & Support Plans', category: 'Navigation', anchor: 'support', desc: 'Essential, Growth, and Enterprise tiers' },
  { title: 'Questions & FAQ', category: 'Navigation', anchor: 'faq', desc: 'Code ownership, teams, pricing, and 3D deliverables' },
  { title: 'Contact & Inquiry', category: 'Navigation', anchor: 'contact', desc: 'Tell us what you want to build' },
  { title: 'Mobile App Development', category: 'Service', anchor: 'services', desc: 'Flutter, React Native, Native iOS/Android' },
  { title: 'Web Application Development', category: 'Service', anchor: 'services', desc: 'React, Next.js, Node.js, Python' },
  { title: '3D Animation & Visuals', category: 'Service', anchor: 'studio', desc: 'Product renders, explainer films & WebGL' },
  { title: 'Application Maintenance', category: 'Service', anchor: 'support', desc: 'Security updates, bug fixing, 24/7 SLA' },
  { title: 'IT Services & Consulting', category: 'Service', anchor: 'services', desc: 'Architecture reviews & technical audits' },
  { title: 'Cloud Infrastructure & DevOps', category: 'Service', anchor: 'services', desc: 'AWS, Azure, Docker, CI/CD automation' },
  { title: 'UI and UX Design', category: 'Service', anchor: 'services', desc: 'Figma prototypes, design systems, usability testing' },
  { title: 'AI and Automation', category: 'Service', anchor: 'services', desc: 'Chat assistants, document processing, workflows' },
  { title: 'Engineering Insights & Articles', category: 'Navigation', anchor: 'insights', desc: 'Technical deep-dives on WebGL, TimescaleDB, and offline CRDTs' },
  { title: 'Security & Compliance Blueprint', category: 'Enterprise', anchor: 'support', desc: 'OWASP, encryption, mutual NDA, SOC-2 ready practices' },
  { title: 'Technology Architecture Matrix', category: 'Navigation', anchor: 'tech-stack', desc: 'Full-stack engineering layers, SLAs, and production tools' },
  { title: 'Global Delivery Footprint & Cloud Regions', category: 'Navigation', anchor: 'global-presence', desc: 'India HQ, North America, UK/Europe, GCC, and APAC hubs' }
];

const TECH_MATRIX = [
  // Frontend & Web
  { name: 'React 18 / Next.js', category: 'Frontend & Web', badge: 'Tier 1 Standard', icon: '⚛️', desc: 'Server-side rendering, streaming hydration, and static edge delivery.' },
  { name: 'TypeScript', category: 'Frontend & Web', badge: 'Strict Typing', icon: '🔷', desc: '100% strict type safety eliminating production runtime type errors.' },
  { name: 'Tailwind CSS', category: 'Frontend & Web', badge: 'Design System', icon: '🎨', desc: 'Rapid, component-driven UI systems with sub-10KB purge-optimized CSS.' },
  // Mobile Engineering
  { name: 'Flutter & Dart', category: 'Mobile Engineering', badge: 'Cross-Platform', icon: '📱', desc: 'Single codebase targeting iOS & Android with 60/120 FPS Skia canvas.' },
  { name: 'React Native', category: 'Mobile Engineering', badge: 'Native Bridge', icon: '⚡', desc: 'JavaScript ecosystem reuse with native thread optimization.' },
  { name: 'Offline CRDT Sync', category: 'Mobile Engineering', badge: 'Offline-First', icon: '🔄', desc: 'Zero-conflict local SQLite sync for remote field operations.' },
  // Backend & Cloud
  { name: 'Node.js & Express', category: 'Backend & Cloud', badge: 'High-Throughput', icon: '🟢', desc: 'Event-driven asynchronous microservices and API gateways.' },
  { name: 'Python & FastAPI', category: 'Backend & Cloud', badge: 'AI & Data Services', icon: '🐍', desc: 'High-speed OpenAPI REST endpoints with asynchronous background workers.' },
  { name: 'AWS & Cloud Infrastructure', category: 'Backend & Cloud', badge: 'SOC-2 Ready', icon: '☁️', desc: 'ECS Fargate, Lambda serverless, S3, CloudFront and Terraform IaC.' },
  { name: 'Docker & Kubernetes', category: 'Backend & Cloud', badge: 'Containerized', icon: '🐳', desc: 'Isolated reproducible builds and zero-downtime rolling deployments.' },
  // 3D & WebGL
  { name: 'Three.js & WebGL', category: '3D & WebGL', badge: 'In-House Studio', icon: '🌐', desc: 'Interactive 3D configurators, custom GLSL shaders, and orbit controls.' },
  { name: 'Draco Compression', category: '3D & WebGL', badge: '14:1 Reduction', icon: '📦', desc: 'Sub-second model downloads for instant mobile 3D viewing.' },
  { name: 'GLTF / USDZ Pipeline', category: '3D & WebGL', badge: 'AR Spatial', icon: '🕶️', desc: 'Apple Quick Look and Android WebXR ready deliverables.' },
  // Databases & Ingestion
  { name: 'PostgreSQL', category: 'Databases & Ingestion', badge: 'Primary RDBMS', icon: '🐘', desc: 'ACID transactions, JSONB document storage, and row-level security.' },
  { name: 'TimescaleDB', category: 'Databases & Ingestion', badge: 'Time-Series', icon: '⏱️', desc: 'Continuous telemetry aggregation for IoT and fleet streams.' },
  { name: 'Redis Cache', category: 'Databases & Ingestion', badge: 'Sub-Millisecond', icon: '⚡', desc: 'In-memory caching, rate limiting, and pub/sub message brokers.' }
];

const BLOG_POSTS = [
  {
    id: 'webgl-bim',
    title: 'Rendering High-Poly IFC Building Models in WebGL at 60 FPS',
    category: '3D & Graphics',
    date: 'Oct 2026',
    readTime: '6 min read',
    excerpt: 'How we used Draco geometry compression, instanced meshes, and frustum culling to render complex BIM models in standard browsers without plugins.',
    tags: ['Three.js', 'WebGL', 'BIM'],
    content: 'Handling multi-storey IFC and Revit models in client-side WebGL browsers typically struggles with memory bottlenecks and draw calls. In this article, we detail our pipeline utilizing Draco compression to achieve a 14:1 reduction in asset size, combined with GPU instancing for repetitive structural elements (columns, mullions, glazing panels), keeping render loops locked at 60 frames per second on mobile and low-spec laptops.'
  },
  {
    id: 'telematics-streaming',
    title: 'Zero-Latency GPS Telematics with TimescaleDB and WebSockets',
    category: 'Backend Architecture',
    date: 'Sep 2026',
    readTime: '8 min read',
    excerpt: 'Architecting high-frequency fleet telematics ingestion pipelines that process 50,000 sensor pings per second with instant live dashboard dispatch.',
    tags: ['Node.js', 'TimescaleDB', 'Kafka'],
    content: 'Fleet tracking at enterprise scale requires ingesting continuous telemetry streams while providing millisecond geospatial indexing for automated dispatch and geofencing. We examine our hybrid PostgreSQL/TimescaleDB architecture paired with Redis pub/sub and WebSockets, enabling operators to visualize fleet movements and geofence alerts with sub-second latency across 5,000+ active commercial vehicles.'
  },
  {
    id: 'offline-crdts',
    title: 'Building Offline-First Field Apps with Conflict-Free Replicated Data (CRDTs)',
    category: 'Mobile Engineering',
    date: 'Aug 2026',
    readTime: '5 min read',
    excerpt: 'Ensuring zero data loss for civil engineers logging snag inspections in zero-connectivity tunnels and remote construction sites.',
    tags: ['Flutter', 'SQLite', 'CRDTs'],
    content: 'Construction and EPC site engineers often conduct snag inspections and equipment quality checks in subterranean tunnels or remote sites with completely dead cell coverage. Traditional REST sync leads to merge conflicts or lost logs. Here is our implementation using Flutter, local SQLite encrypted storage, and state-based CRDT delta reconciliation that seamlessly syncs when back in range.'
  }
];

const CODE_SNIPPETS = {
  '3d': {
    filename: 'WebGL3DShader.ts',
    lang: 'typescript',
    badge: '3D Graphics',
    code: `import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

export class ModelViewer3D {
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;

  constructor(canvas: HTMLCanvasElement) {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.setupDracoPipeline();
  }

  private setupDracoPipeline() {
    const draco = new DRACOLoader();
    draco.setDecoderPath('/draco/');
    const loader = new GLTFLoader();
    loader.setDRACOLoader(draco);
    // 14:1 geometry compression for 60 FPS mobile WebGL
  }
}`
  },
  'telematics': {
    filename: 'TelematicsStream.ts',
    lang: 'typescript',
    badge: 'Backend Architecture',
    code: `import { WebSocketServer } from 'ws';
import { Pool } from 'pg';
import Redis from 'ioredis';

const db = new Pool({ connectionString: process.env.TIMESCALE_URL });
const redis = new Redis(process.env.REDIS_URL);

export async function handleTelemetryPing(vehicleId: string, lat: number, lng: number, speed: number) {
  const timestamp = new Date();
  
  // 1. Time-series hypertable ingestion
  await db.query(
    'INSERT INTO vehicle_telemetry (time, vehicle_id, location, speed) VALUES ($1, $2, ST_MakePoint($3, $4), $5)',
    [timestamp, vehicleId, lng, lat, speed]
  );

  // 2. Real-time geospatial dispatch via Redis PubSub
  await redis.publish('fleet:live', JSON.stringify({ vehicleId, lat, lng, speed, timestamp }));
}`
  },
  'crdt': {
    filename: 'OfflineCRDTSync.dart',
    lang: 'dart',
    badge: 'Mobile Systems',
    code: `import 'package:sqflite/sqflite.dart';
import 'package:uuid/uuid.dart';

class SnagInspectionCRDT {
  final Database db;
  SnagInspectionCRDT(this.db);

  Future<void> recordSiteSnag({
    required String projectId,
    required String issueDescription,
    required String photoSha256,
  }) async {
    final recordId = const Uuid().v4();
    final lamportClock = DateTime.now().millisecondsSinceEpoch;

    // Local-first SQLite store with Lamport vector timestamp
    await db.insert('offline_snags', {
      'id': recordId,
      'project_id': projectId,
      'description': issueDescription,
      'photo_hash': photoSha256,
      'lamport_clock': lamportClock,
      'synced': 0
    });
    // Conflict-free reconciliation triggers on reconnection
  }
}`
  }
};

const SERVICES = [
  {
    id: 'mobile-apps',
    title: 'Mobile app development',
    category: 'Engineering & Apps',
    subtitle: 'Android and iOS apps that feel native and ship from one codebase when that makes sense.',
    bullets: ['Flutter and React Native', 'Native Android and iOS', 'App store launch'],
    badge: null
  },
  {
    id: 'web-development',
    title: 'Web application development',
    category: 'Engineering & Apps',
    subtitle: 'Fast, secure web platforms, portals and dashboards built to grow with your business.',
    bullets: ['React, Node.js, Python', 'APIs and integrations', 'Admin dashboards'],
    badge: null
  },
  {
    id: 'maintenance',
    title: 'Application maintenance',
    category: 'Cloud & Support',
    subtitle: 'Bug fixes, security patches, performance tuning and new features after launch, under a clear service agreement.',
    bullets: ['Monitoring and alerts', 'Monthly patch cycle', 'Support plans from 8x5 to 24x7'],
    badge: null
  },
  {
    id: 'it-services',
    title: 'IT services and consulting',
    category: 'Cloud & Support',
    subtitle: 'Architecture reviews, technology selection, system integration and ongoing IT support for your team.',
    bullets: ['Technical audits', 'System integration', 'Staff augmentation'],
    badge: null
  },
  {
    id: 'cloud-devops',
    title: 'Cloud and DevOps',
    category: 'Cloud & Support',
    subtitle: 'Hosting, pipelines and infrastructure that deploy safely many times a day and scale on demand.',
    bullets: ['AWS, Azure, Google Cloud', 'CI/CD automation', 'Cost optimization'],
    badge: null
  },
  {
    id: 'ui-ux',
    title: 'UI and UX design',
    category: 'Engineering & Apps',
    subtitle: 'Research-led interface design with prototypes you can click before a line of code is written.',
    bullets: ['Design systems', 'Interactive prototypes', 'Usability testing'],
    badge: null
  },
  {
    id: '3d-animation',
    title: '3D animation and visuals',
    category: '3D & Innovation',
    subtitle: 'Product renders, explainer animations and interactive 3D for websites and apps, built in-house.',
    bullets: ['Product visualization', 'WebGL experiences', 'Motion and promo films'],
    badge: 'NEW'
  },
  {
    id: 'ai-automation',
    title: 'AI and automation',
    category: '3D & Innovation',
    subtitle: 'Chat assistants, document processing and workflow automation connected to your own data.',
    bullets: ['Support chatbots', 'Process automation', 'Smart search'],
    badge: 'NEW'
  }
];

const FLIP_CARDS = [
  {
    id: 1,
    frontTitle: 'Product Turntables & 360° Renders',
    frontDesc: 'Photoreal 360-degree rotation models with physically based materials.',
    backTitle: 'High-Poly CAD to Realtime',
    backDesc: 'We ingest SolidWorks, Rhino, and STEP files, optimizing topology and baking realistic textures for instant browser spin.'
  },
  {
    id: 2,
    frontTitle: 'Explainer & Motion Films',
    frontDesc: 'Dynamic keyframe camera animations highlighting core product value.',
    backTitle: 'Cinematic Visuals & Video',
    backDesc: 'From particle physics to exploded product views, we deliver 4K video for landing pages, investor decks, and ad campaigns.'
  },
  {
    id: 3,
    frontTitle: 'Interactive WebGL & Three.js',
    frontDesc: 'Smooth 60 FPS 3D experiences built directly into websites without plugins.',
    backTitle: 'Zero-Lag Web Performance',
    backDesc: 'Custom shaders, draco mesh compression, and responsive lighting that run smoothly on every smartphone and laptop.'
  },
  {
    id: 4,
    frontTitle: 'Interactive Configurators',
    frontDesc: 'Real-time color, material, and part customizers with live pricing.',
    backTitle: 'E-Commerce Integration',
    backDesc: 'Hook 3D variant options directly into Shopify, WooCommerce, or custom cart backends with instant visual feedback.'
  },
  {
    id: 5,
    frontTitle: 'AR-Ready Spatial Models',
    frontDesc: 'Augmented reality models ready for instant mobile preview.',
    backTitle: 'Apple Quick Look & Android AR',
    backDesc: 'Automated conversion to .USDZ and .GLB for frictionless "View in Your Space" experiences with realistic ground shadows.'
  },
  {
    id: 6,
    frontTitle: 'Architectural & BIM Visuals',
    frontDesc: 'Interactive multi-storey building models with layer slicing controls.',
    backTitle: 'BIM & Structural Cutaways',
    backDesc: 'Render HVAC ducts, MEP pipes, structural concrete, and exterior glass for client walkthroughs directly in browser.'
  }
];

const APP_MOCK_DATA = {
  'E-commerce and marketplaces': {
    stats: [
      { val: '248', label: 'Orders' },
      { val: '₹1.9L', label: 'Revenue' },
      { val: '96%', label: 'Delivery on time' }
    ],
    heading: 'Recent Orders',
    items: [
      { id: '#4821', title: 'Smart Sensor Node', desc: 'Packed · Expedited Air', status: 'Ready', statusStyle: 'statusReady' },
      { id: '#4820', title: 'Industrial Gateway v2', desc: 'In transit · Out for delivery', status: 'On the way', statusStyle: 'statusTransit' },
      { id: '#4819', title: 'Telemetry Antenna Kit', desc: 'Delivered · Signature verified', status: 'Done', statusStyle: 'statusDone' },
      { id: '#4818', title: 'BLE Beacon Pack (x10)', desc: 'Delivered · Dock 3', status: 'Done', statusStyle: 'statusDone' },
      { id: '#4817', title: 'Edge Compute Core', desc: 'Payment due · Net 30 invoice', status: 'Pending', statusStyle: 'statusPending' }
    ]
  },
  'Booking and scheduling': {
    stats: [
      { val: '42', label: 'Bookings today' },
      { val: '98%', label: 'Attendance rate' },
      { val: '8m', label: 'Avg lead time' }
    ],
    heading: 'Upcoming Appointments',
    items: [
      { id: '10:30 AM', title: 'Architecture Review', desc: 'Client: Infra Build · 45m call', status: 'Active', statusStyle: 'statusReady' },
      { id: '11:45 AM', title: 'Onsite BIM Survey', desc: 'Site #4 · Team Alpha', status: 'Confirmed', statusStyle: 'statusTransit' },
      { id: '02:00 PM', title: 'Sprint 2 Demo Walkthrough', desc: 'Stakeholder Video Room', status: 'Scheduled', statusStyle: 'statusDone' },
      { id: '04:15 PM', title: 'Security Audit Sign-off', desc: 'Compliance Review Call', status: 'Scheduled', statusStyle: 'statusDone' },
      { id: '05:30 PM', title: 'Executive Debrief', desc: 'Q4 Product Roadmap', status: 'Pending', statusStyle: 'statusPending' }
    ]
  },
  'Learning platforms': {
    stats: [
      { val: '1,840', label: 'Active learners' },
      { val: '89%', label: 'Course finish' },
      { val: '4.9★', label: 'Cohort rating' }
    ],
    heading: 'Live Cohort Modules',
    items: [
      { id: 'MOD-04', title: 'WebGL Shader Optimization', desc: '86 Submissions graded', status: 'Live', statusStyle: 'statusReady' },
      { id: 'MOD-03', title: 'Distributed Event Streaming', desc: 'Kafka + TimescaleDB lab', status: 'Completed', statusStyle: 'statusDone' },
      { id: 'MOD-02', title: 'Offline-First SQLite CRDTs', desc: 'Hands-on Flutter project', status: 'Completed', statusStyle: 'statusDone' },
      { id: 'MOD-01', title: 'Microservices with Docker', desc: 'Architecture fundamentals', status: 'Completed', statusStyle: 'statusDone' },
      { id: 'CAPSTONE', title: 'Production SaaS Submission', desc: 'Peer review window open', status: 'Reviewing', statusStyle: 'statusTransit' }
    ]
  },
  'Logistics and field tracking': {
    stats: [
      { val: '38', label: 'Fleet vehicles' },
      { val: '99.2%', label: 'Route compliance' },
      { val: '< 2s', label: 'GPS ping latency' }
    ],
    heading: 'Live Vehicle Telemetry',
    items: [
      { id: 'TRUCK-14', title: 'Hyderabad ORR Outbound', desc: 'Speed: 64 km/h · Temp: 22°C', status: 'On Route', statusStyle: 'statusTransit' },
      { id: 'VAN-08', title: 'Secunderabad Hub Dispatch', desc: 'Cargo: Medical Sensors', status: 'Dispatched', statusStyle: 'statusReady' },
      { id: 'TRUCK-02', title: 'Warangal Ingestion Gate', desc: 'Weight Check Cleared', status: 'Docked', statusStyle: 'statusDone' },
      { id: 'VAN-03', title: 'Gachibowli Last Mile', desc: 'Delivered 24 parcels', status: 'Done', statusStyle: 'statusDone' },
      { id: 'TRAILER-9', title: 'Vijayawada Highway', desc: 'Refueling stop · 15m idle', status: 'Standby', statusStyle: 'statusPending' }
    ]
  },
  'Fintech and wallets': {
    stats: [
      { val: '₹14.2L', label: 'Settled today' },
      { val: '99.99%', label: 'UPI gateway SLA' },
      { val: '1.2s', label: 'Avg disbursal' }
    ],
    heading: 'Recent Transactions',
    items: [
      { id: 'TXN-9021', title: 'Vendor Escrow Disbursal', desc: '₹85,000 · Verified UPI Autopay', status: 'Success', statusStyle: 'statusDone' },
      { id: 'TXN-9020', title: 'e-KYC DigiLocker Check', desc: 'UIDAI Aadhaar Tokenized', status: 'Verified', statusStyle: 'statusReady' },
      { id: 'TXN-9019', title: 'Micro-Loan Disbursal', desc: '₹25,000 · Instant Bank IMPS', status: 'Success', statusStyle: 'statusDone' },
      { id: 'TXN-9018', title: 'QR Payment Settlement', desc: '₹12,450 · HDFC Merchant Rails', status: 'Settled', statusStyle: 'statusDone' },
      { id: 'TXN-9017', title: 'Recurring Mandate Trigger', desc: 'Monthly SaaS Subscription', status: 'Processing', statusStyle: 'statusTransit' }
    ]
  },
  'Healthcare and clinics': {
    stats: [
      { val: '64', label: 'Consults today' },
      { val: '100%', label: 'Encrypted HIPAA' },
      { val: '4.95★', label: 'Patient score' }
    ],
    heading: 'Patient Consult Queue',
    items: [
      { id: 'ROOM-01', title: 'Dr. Anita (Cardiology)', desc: 'Patient #912 · Video consult', status: 'In Session', statusStyle: 'statusReady' },
      { id: 'RX-402', title: 'Digital E-Prescription', desc: 'Signed via Doctor Cryptographic Key', status: 'Issued', statusStyle: 'statusDone' },
      { id: 'LAB-108', title: 'Biomarker Panel Ingestion', desc: 'Automated HL7/FHIR sync', status: 'Synced', statusStyle: 'statusDone' },
      { id: 'ROOM-03', title: 'Dr. Vikram (Orthopedics)', desc: 'Next in queue · 5m wait', status: 'Waiting', statusStyle: 'statusTransit' },
      { id: 'FOLLOWUP', title: 'Post-Op Remote Telemetry', desc: 'SPO2 & Blood Pressure normal', status: 'Monitoring', statusStyle: 'statusReady' }
    ]
  }
};

const PIPELINE_STEPS = [
  { step: '01', title: 'Concept & Storyboard', desc: 'Define visual style, camera choreography, and functional user interaction goals.' },
  { step: '02', title: '3D Modeling & CAD Clean', desc: 'Sculpt bespoke geometry or retopologize engineering CAD files for optimal fidelity.' },
  { step: '03', title: 'PBR Shading & Lighting', desc: 'Physically based rendering (roughness, metalness, normal maps) and studio HDR lighting.' },
  { step: '04', title: 'Rigging & Animation', desc: 'Custom bone rigs, procedural rotations, physics simulations, and exploded animations.' },
  { step: '05', title: 'WebGL / Video Delivery', desc: 'Deliver production Three.js bundles, compressed .GLB / .USDZ files, or 4K ProRes films.' }
];

const DELIVERABLE_FORMATS = [
  'GLTF / GLB (WebGL Web Ready)',
  'USDZ (Apple iOS AR Quick Look)',
  '4K ProRes & MP4 Video',
  'Three.js / React Three Fiber Code',
  'FBX & OBJ Raw Assets',
  'Lottie 3D & WebP Animations'
];

const INDUSTRY_SOLUTIONS = [
  {
    title: 'Project and schedule apps',
    desc: 'Dashboards for tasks, milestones, resources and approvals that stay in step with your planning tools.',
    bullets: ['Progress and delay tracking', 'Role-based approvals', 'Owner and client portals']
  },
  {
    title: 'BIM and 3D model viewers',
    desc: 'Let clients and site teams open, slice and comment on a model in any browser, with nothing to install.',
    bullets: ['Layer and floor controls', 'Pinned comments and issues', 'Model and drawing versions']
  },
  {
    title: 'Site progress and inspection apps',
    desc: 'Mobile apps for engineers on site: checklists, photos, measurements and snag lists that work offline.',
    bullets: ['Offline data capture', 'Photo and location tagging', 'Daily and weekly reports']
  },
  {
    title: 'Quantity and cost tools',
    desc: 'Bills of quantities, estimates and purchase tracking in one place, ready to export to the spreadsheets your team already uses.',
    bullets: ['BOQ and estimate builders', 'Vendor and purchase tracking', 'Budget versus actual']
  }
];

const INDUSTRY_COMPANIES = [
  'Architecture firms', 'Civil and infrastructure', 'Structural consultants',
  'Mechanical and industrial', 'MEP contractors', 'EPC and plant engineering',
  'Surveying and GIS', 'Real estate developers'
];

const INDUSTRY_TOOLS = [
  'AutoCAD', 'Revit', 'Civil 3D', 'STAAD.Pro', 'ETABS', 'Tekla',
  'Navisworks', 'SolidWorks', 'Primavera P6', 'MS Project', 'Excel', 'ArcGIS'
];

const SAMPLE_CONCEPTS = [
  {
    title: 'BIM Cloud Collaborator',
    tag: 'AEC & Construction',
    category: '3D & WebGL',
    desc: 'Browser-based 3D architectural viewer with live clash detection and multi-user issue pinning.',
    stack: ['React', 'Three.js', 'WebSockets', 'IFC.js', 'PostgreSQL'],
    architecture: 'Microservices with spatial indexing and real-time WebSockets synchronization.',
    metrics: '90% faster clash reviews for engineering site teams.',
    modules: ['Spatial 3D Model Slicing', 'BCF Issue Pinning', 'Role-based Access', 'Offline Sync']
  },
  {
    title: 'Fleet & Route Telematics',
    tag: 'Logistics',
    category: 'Backend & IoT',
    desc: 'Real-time GPS tracking dashboard with geofencing, driver fatigue alerts, and automated trip logs.',
    stack: ['Next.js', 'Node.js', 'Redis', 'Mapbox GL', 'TimescaleDB'],
    architecture: 'High-throughput event streaming via Kafka & TimescaleDB time-series ingestion.',
    metrics: 'Sub-second GPS telemetry across 5,000+ active fleet vehicles.',
    modules: ['Geofencing Engine', 'Fuel & Idle Analytics', 'Automated Dispatch', 'Driver Safety Score']
  },
  {
    title: 'FieldOps Snag Inspection',
    tag: 'Site Engineering',
    category: 'Mobile & Offline',
    desc: 'Offline-first tablet app for civil site engineers with voice memos, photo markup, and automated BOQ sync.',
    stack: ['Flutter', 'SQLite', 'Node.js', 'AWS S3', 'FastAPI'],
    architecture: 'CRDT-based conflict-free offline synchronization with AWS S3 media pipeline.',
    metrics: 'Zero data loss in low-connectivity underground and tunnel sites.',
    modules: ['Photo AR Markup', 'Voice-to-Text Punchlists', 'Instant BOQ Variance', 'PDF Sign-off Export']
  },
  {
    title: '3D Product Customizer',
    tag: 'E-Commerce',
    category: '3D & WebGL',
    desc: 'Photorealistic WebGL configurator allowing shoppers to personalize colors, finishes, and order in AR.',
    stack: ['Three.js', 'React', 'WebGL Shaders', 'Shopify API', 'Draco'],
    architecture: 'Draco-compressed GLTF assets with progressive level-of-detail (LOD) streaming.',
    metrics: '3.4x higher conversion rate on personalized product orders.',
    modules: ['PBR Material Swapper', 'Direct Shopify Cart Hook', 'QuickLook USDZ AR Export', 'Snapshot Generator']
  },
  {
    title: 'Tele-Health Clinic Portal',
    tag: 'Healthcare',
    category: 'Web Platforms',
    desc: 'HIPAA-compliant web platform for encrypted video consults, prescription routing, and patient records.',
    stack: ['React', 'WebRTC', 'FastAPI', 'PostgreSQL', 'Docker'],
    architecture: 'End-to-end encrypted WebRTC mesh media pipeline with audit-logged EHR storage.',
    metrics: '99.98% uptime across 50,000+ tele-consultations.',
    modules: ['Encrypted HD Video', 'Digital Prescription Engine', 'FHIR/HL7 Integration', 'Automated Reminders']
  },
  {
    title: 'FinTech Micro-Lending Hub',
    tag: 'Finance',
    category: 'Backend & IoT',
    desc: 'Instant KYC verification, credit scoring algorithms, and automated disbursal rails via UPI and netbanking.',
    stack: ['React', 'Python', 'Go', 'PostgreSQL', 'AWS KMS'],
    architecture: 'Zero-trust banking gateway with tokenized HSM cryptographic signatures.',
    metrics: 'Under 90 seconds from application to instant UPI disbursal.',
    modules: ['DigiLocker e-KYC', 'Rule-based Credit Underwriter', 'UPI Autopay Mandates', 'Fraud Detection']
  }
];

const ONBOARDING_WEEKS = [
  {
    week: 'Week 1',
    title: 'Sprint Zero & Environment Provisioning',
    subtitle: 'Foundation setup, mutual NDA, and repository scaffolding.',
    deliverables: [
      'Bilateral Mutual NDA executed & project workspace created',
      'Architecture discovery session & feature prioritization backlog',
      'Private GitHub repository configured with CI/CD GitHub Actions',
      'Isolated cloud sandbox & database instance provisioned'
    ]
  },
  {
    week: 'Week 2',
    title: 'Core Architecture & First Interactive Demo',
    subtitle: 'Working prototype deployed to staging within 14 days.',
    deliverables: [
      'Database schema, API contracts, and authentication flow deployed',
      'First working interactive prototype delivered in staging environment',
      'Sprint review demo call with project stakeholders',
      'Feedback incorporated into sprint backlog'
    ]
  },
  {
    week: 'Week 3-4',
    title: 'Feature Sprints & Bi-Weekly Demos',
    subtitle: 'Production code velocity with continuous automated testing.',
    deliverables: [
      'Core business logic, integrations, and 3D WebGL scenes implemented',
      'Automated unit & integration test coverage runs on every push',
      'Weekly progress metrics & burndown reports on shared board',
      'End-to-end user acceptance testing (UAT) deployment'
    ]
  },
  {
    week: 'Week 5+',
    title: 'Production Hardening & Full IP Transfer',
    subtitle: 'Pen-testing, deployment sign-off, and complete asset handover.',
    deliverables: [
      'OWASP security audit, load testing, and penetration assessment',
      'Production DNS cutover & iOS App Store / Google Play submission',
      'Complete transfer of all repository ownership and deployment keys',
      'Optional onboarding into 24/7 SLA maintenance tier'
    ]
  }
];

const PROCESS_STEPS = [
  {
    step: 'STEP 1',
    title: 'Discover',
    desc: 'We learn your goals, users and systems, then agree scope, timeline and budget in writing.'
  },
  {
    step: 'STEP 2',
    title: 'Design',
    desc: 'Interface prototypes and architecture you can review and change before development starts.'
  },
  {
    step: 'STEP 3',
    title: 'Develop',
    desc: 'Two-week sprints with a working demo at the end of each one and automated testing throughout.'
  },
  {
    step: 'STEP 4',
    title: 'Launch and maintain',
    desc: 'Release, monitor and keep improving, with a support plan that matches how critical your app is.'
  }
];

const SUPPORT_PLANS = [
  {
    name: 'Essential',
    response: 'Next business day',
    responseLabel: 'RESPONSE TIME',
    features: [
      'Bug fixes and small changes',
      'Monthly security patching',
      'Uptime monitoring',
      'Email support, Mon to Fri'
    ],
    buttonText: 'Ask about Essential',
    isPopular: false
  },
  {
    name: 'Growth',
    response: 'Within 4 hours',
    responseLabel: 'RESPONSE TIME',
    badge: 'MOST CHOSEN',
    features: [
      'Everything in Essential',
      'Monthly hours for new features',
      'Performance and cost reviews',
      'Extended support hours',
      'Monthly health report'
    ],
    buttonText: 'Ask about Growth',
    isPopular: true
  },
  {
    name: 'Enterprise',
    response: 'Within 1 hour',
    responseLabel: 'CRITICAL ISSUES, 24 × 7',
    features: [
      'Dedicated support engineers',
      '24 × 7 on-call coverage',
      'Quarterly roadmap planning',
      'Disaster recovery drills'
    ],
    buttonText: 'Ask about Enterprise',
    isPopular: false
  }
];

const FAQS = [
  {
    category: 'Ownership & IP',
    q: 'Who owns the source code?',
    a: 'You do. At the end of the project we hand over the full source code, documentation and access to every account we set up for you. Zero vendor lock-in.'
  },
  {
    category: 'Maintenance',
    q: 'Can you take over an app someone else built?',
    a: 'Yes. We start with a short technical audit of the code, hosting and security, then give you a plan to stabilize it and a support plan to keep it healthy.'
  },
  {
    category: 'Engagements',
    q: 'Do you work on fixed price or monthly teams?',
    a: 'Both. Clear scopes suit a fixed price. Evolving products usually work better with a monthly dedicated team that you can grow or shrink.'
  },
  {
    category: '3D Visuals',
    q: 'What do your 3D projects include?',
    a: 'Modeling, texturing, lighting, animation and rendering for videos and images, plus real-time 3D that runs directly inside websites and mobile apps.'
  },
  {
    category: 'Communication',
    q: 'How do we stay in touch during a project?',
    a: 'You get a shared board, bi-weekly sprint demos and a single technical point of contact who answers within one working day.'
  },
  {
    category: 'Security & NDA',
    q: 'Do you sign non-disclosure agreements (NDAs) before discovery?',
    a: 'Yes, absolutely. We execute mutual NDAs prior to reviewing proprietary drawings, codebase repos, or business models.'
  },
  {
    category: 'Engagements',
    q: 'Can we start with a small pilot or proof-of-concept?',
    a: 'Yes. Many clients start with a 2 to 3-week pilot sprint or interactive clickable prototype before committing to full application build.'
  },
  {
    category: 'Maintenance',
    q: 'What are your uptime and critical issue response SLAs?',
    a: 'Under our Enterprise tier, we guarantee critical response within 1 hour, 24×7 on-call coverage, and 99.9% uptime monitoring with monthly audits.'
  }
];

const CHAKRA_THEMES = {
  cyan: {
    name: 'Cyber Cyan',
    colors: [0x2563eb, 0x0ea5e9, 0x06b6d4, 0x38bdf8, 0x0284c7, 0x1d4ed8],
    core: 0x2563eb,
    emissive: 0x1d4ed8,
    spoke: 0x38bdf8,
    light1: 0x38bdf8,
    light2: 0x818cf8
  },
  emerald: {
    name: 'Quantum Emerald',
    colors: [0x059669, 0x10b981, 0x34d399, 0x6ee7b7, 0x047857, 0x065f46],
    core: 0x059669,
    emissive: 0x10b981,
    spoke: 0x34d399,
    light1: 0x34d399,
    light2: 0x6ee7b7
  },
  gold: {
    name: 'Solar Gold',
    colors: [0xd97706, 0xf59e0b, 0xfbbf24, 0xfde68a, 0xb45309, 0x78350f],
    core: 0xd97706,
    emissive: 0xf59e0b,
    spoke: 0xfbbf24,
    light1: 0xfbbf24,
    light2: 0xfde68a
  },
  violet: {
    name: 'Cosmic Violet',
    colors: [0x7c3aed, 0x8b5cf6, 0xa78bfa, 0xc4b5fd, 0x6d28d9, 0x4c1d95],
    core: 0x7c3aed,
    emissive: 0x8b5cf6,
    spoke: 0xa78bfa,
    light1: 0xa78bfa,
    light2: 0xc4b5fd
  }
};

// --- THREE.JS 3D HERO CANVAS (CHAKRA - 6 RINGS) ---
function ChakraCanvas({ themeKey = 'cyan' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const t = CHAKRA_THEMES[themeKey] || CHAKRA_THEMES.cyan;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 8.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for the 6 concentric chakra rings
    const chakraGroup = new THREE.Group();
    scene.add(chakraGroup);

    const rings = [];
    const ringCount = 6;
    const ringColors = t.colors;

    for (let i = 0; i < ringCount; i++) {
      const radius = 1.0 + i * 0.45;
      const tube = 0.035 + (i % 2 === 0 ? 0.015 : 0.005);
      const geometry = new THREE.TorusGeometry(radius, tube, 16, 64);
      const material = new THREE.MeshStandardMaterial({
        color: ringColors[i % ringColors.length],
        metalness: 0.6,
        roughness: 0.2,
        wireframe: i === 1 || i === 4
      });
      const ringMesh = new THREE.Mesh(geometry, material);
      ringMesh.rotation.x = (i * Math.PI) / 6;
      ringMesh.rotation.y = (i * Math.PI) / 8;
      chakraGroup.add(ringMesh);
      rings.push(ringMesh);

      // Add orbiting spoke satellites on alternate rings
      if (i % 2 === 0) {
        const spokeGeom = new THREE.SphereGeometry(0.08, 12, 12);
        const spokeMat = new THREE.MeshBasicMaterial({ color: t.spoke });
        const spoke = new THREE.Mesh(spokeGeom, spokeMat);
        spoke.position.x = radius;
        ringMesh.add(spoke);
      }
    }

    // Central glowing core orb
    const coreGeom = new THREE.IcosahedronGeometry(0.45, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: t.core,
      emissive: t.emissive,
      roughness: 0.1,
      metalness: 0.8
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    chakraGroup.add(coreMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(t.light1, 2, 20);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(t.light2, 1.5, 20);
    pointLight2.position.set(-5, -5, 3);
    scene.add(pointLight2);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 1.5;
      targetY = y * 1.5;
    };

    window.addEventListener('pointermove', onPointerMove);

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse steering
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      chakraGroup.rotation.y += 0.008;
      chakraGroup.rotation.x = mouseY;
      chakraGroup.rotation.z = mouseX;

      rings.forEach((ring, idx) => {
        const speed = (idx + 1) * 0.003 * (idx % 2 === 0 ? 1 : -1);
        ring.rotation.z += speed;
      });

      coreMesh.rotation.y -= 0.015;
      coreMesh.rotation.x += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [themeKey]);

  return (
    <div style={styles.chakraContainer}>
      <div style={styles.chakraHeaderBadge}>
        <span>CHAKRA · 6 RINGS · LIVE 3D</span>
        <span style={styles.steerPill}>MOVE TO STEER</span>
      </div>
      <div ref={mountRef} style={styles.canvasMount} />
    </div>
  );
}

// --- THREE.JS 3D STUDIO CANVAS (SHAPES, MATERIALS, LIGHTS) ---
function StudioCanvas({ shape, materialType, colorHex, rotationSpeed, lightAngle, autoRotate }) {
  const mountRef = useRef(null);
  const meshRef = useRef(null);
  const dirLightRef = useRef(null);
  const rendererRef = useRef(null);
  const isDraggingRef = useRef(false);
  const prevMousePos = useRef({ x: 0, y: 0 });

  const handleDownloadSnapshot = () => {
    if (!rendererRef.current) return;
    const dataURL = rendererRef.current.domElement.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = `abhimanyu-3d-${shape}-${materialType}.png`;
    a.click();
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create Geometry based on selected shape
    let geom;
    if (shape === 'torus') {
      geom = new THREE.TorusGeometry(1.2, 0.45, 32, 64);
    } else if (shape === 'knot') {
      geom = new THREE.TorusKnotGeometry(0.9, 0.3, 80, 16);
    } else if (shape === 'chakra') {
      geom = new THREE.RingGeometry(0.6, 1.4, 32, 8);
    } else if (shape === 'cube') {
      geom = new THREE.BoxGeometry(1.6, 1.6, 1.6);
    } else if (shape === 'sphere') {
      geom = new THREE.SphereGeometry(1.25, 36, 36);
    } else {
      // diamond / octahedron
      geom = new THREE.OctahedronGeometry(1.4, 0);
    }

    // Material selection
    let mat;
    const colorNum = parseInt(colorHex.replace('#', '0x'), 16);
    if (materialType === 'wireframe') {
      mat = new THREE.MeshBasicMaterial({ color: colorNum, wireframe: true });
    } else if (materialType === 'glossy') {
      mat = new THREE.MeshStandardMaterial({
        color: colorNum,
        roughness: 0.1,
        metalness: 0.1
      });
    } else if (materialType === 'metallic') {
      mat = new THREE.MeshStandardMaterial({
        color: colorNum,
        roughness: 0.2,
        metalness: 0.95
      });
    } else {
      // Glass / Iridescent
      mat = new THREE.MeshPhysicalMaterial ? new THREE.MeshPhysicalMaterial({
        color: colorNum,
        roughness: 0.15,
        transmission: 0.8,
        thickness: 1.2,
        transparent: true,
        opacity: 0.85
      }) : new THREE.MeshStandardMaterial({
        color: colorNum,
        roughness: 0.2,
        metalness: 0.5,
        transparent: true,
        opacity: 0.8
      });
    }

    const mesh = new THREE.Mesh(geom, mat);
    scene.add(mesh);
    meshRef.current = mesh;

    // Lighting
    const ambLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    const rad = (lightAngle * Math.PI) / 180;
    dirLight.position.set(Math.cos(rad) * 6, 4, Math.sin(rad) * 6);
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    // Mouse drag handlers
    const onMouseDown = (e) => {
      isDraggingRef.current = true;
      prevMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDraggingRef.current || !meshRef.current) return;
      const dx = e.clientX - prevMousePos.current.x;
      const dy = e.clientY - prevMousePos.current.y;
      meshRef.current.rotation.y += dx * 0.01;
      meshRef.current.rotation.x += dy * 0.01;
      prevMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    container.addEventListener('pointerdown', onMouseDown);
    window.addEventListener('pointermove', onMouseMove);
    window.addEventListener('pointerup', onMouseUp);

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (meshRef.current && autoRotate && !isDraggingRef.current) {
        meshRef.current.rotation.y += 0.01 * rotationSpeed;
        meshRef.current.rotation.x += 0.005 * rotationSpeed;
      }
      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('pointerdown', onMouseDown);
      window.removeEventListener('pointermove', onMouseMove);
      window.removeEventListener('pointerup', onMouseUp);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geom.dispose();
      mat.dispose();
    };
  }, [shape, materialType, colorHex, rotationSpeed, lightAngle, autoRotate]);

  return (
    <div style={styles.studioCanvasBox}>
      <div style={{ ...styles.studioCanvasBadgeRow, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <span style={styles.webglTag}>REAL-TIME WEBGL</span>
          <span style={styles.dragTag}>DRAG TO ROTATE</span>
        </div>
        <button
          onClick={handleDownloadSnapshot}
          style={{
            backgroundColor: 'rgba(37,99,235,0.85)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '6px',
            padding: '4px 10px',
            fontSize: '11px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            backdropFilter: 'blur(4px)',
            transition: 'background-color 0.15s ease'
          }}
          title="Download PNG snapshot of your customized 3D model"
        >
          📷 Snapshot PNG
        </button>
      </div>
      <div ref={mountRef} style={styles.canvasMount} />
    </div>
  );
}

// --- THREE.JS 3D BUILDING VIEWER (INDUSTRIES SECTION) ---
function BuildingCanvas({ storeys, explodePercent, showStructure, showServices, showFacade, autoRotate }) {
  const mountRef = useRef(null);
  const buildingGroupRef = useRef(null);
  const rendererRef = useRef(null);
  const isDraggingRef = useRef(false);
  const prevMousePos = useRef({ x: 0, y: 0 });

  const handleDownloadSnapshot = () => {
    if (!rendererRef.current) return;
    const dataURL = rendererRef.current.domElement.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = `abhimanyu-bim-${storeys}storeys.png`;
    a.click();
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 420;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(6, 7, 9);
    camera.lookAt(0, storeys * 0.25, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const buildingGroup = new THREE.Group();
    scene.add(buildingGroup);
    buildingGroupRef.current = buildingGroup;

    // Materials
    const slabMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.6, metalness: 0.1 });
    const colMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.4 });
    const serviceMat = new THREE.MeshStandardMaterial({ color: 0x0ea5e9, roughness: 0.3, metalness: 0.5 });
    const ductMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.3 });
    const facadeMat = new THREE.MeshPhysicalMaterial ? new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1,
      metalness: 0.2
    }) : new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35
    });

    const floorHeight = 0.5;
    const explodeOffset = (explodePercent / 100) * 0.8;

    for (let f = 0; f < storeys; f++) {
      const floorY = f * (floorHeight + explodeOffset);
      const floorGroup = new THREE.Group();
      floorGroup.position.y = floorY;

      // 1. Structure (Slab + 4 Columns)
      if (showStructure) {
        // Floor slab
        const slabGeom = new THREE.BoxGeometry(3.2, 0.08, 3.2);
        const slab = new THREE.Mesh(slabGeom, slabMat);
        floorGroup.add(slab);

        // 4 Columns
        const colGeom = new THREE.CylinderGeometry(0.06, 0.06, floorHeight, 8);
        const colOffsets = [
          [-1.3, -1.3], [1.3, -1.3], [-1.3, 1.3], [1.3, 1.3]
        ];
        colOffsets.forEach(([cx, cz]) => {
          const col = new THREE.Mesh(colGeom, colMat);
          col.position.set(cx, floorHeight / 2, cz);
          floorGroup.add(col);
        });
      }

      // 2. Services (Ducts & Pipes)
      if (showServices) {
        const pipeGeom = new THREE.CylinderGeometry(0.04, 0.04, 2.8, 8);
        const pipe = new THREE.Mesh(pipeGeom, serviceMat);
        pipe.rotation.z = Math.PI / 2;
        pipe.position.set(0, floorHeight * 0.75, 0.5);
        floorGroup.add(pipe);

        const ductGeom = new THREE.BoxGeometry(0.25, 0.12, 2.4);
        const duct = new THREE.Mesh(ductGeom, ductMat);
        duct.position.set(-0.4, floorHeight * 0.8, 0);
        floorGroup.add(duct);
      }

      // 3. Facade Glazing
      if (showFacade) {
        const facadeGeom = new THREE.BoxGeometry(3.3, floorHeight, 3.3);
        const facade = new THREE.Mesh(facadeGeom, facadeMat);
        facade.position.set(0, floorHeight / 2, 0);
        floorGroup.add(facade);
      }

      buildingGroup.add(floorGroup);
    }

    // Ground plane
    const groundGeom = new THREE.PlaneGeometry(16, 16);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9 });
    const ground = new THREE.Mesh(groundGeom, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.1;
    scene.add(ground);

    // Grid helper
    const grid = new THREE.GridHelper(12, 12, 0x38bdf8, 0x1e293b);
    grid.position.y = -0.05;
    scene.add(grid);

    // Lights
    const amb = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(amb);

    const sun = new THREE.DirectionalLight(0xffffff, 2.5);
    sun.position.set(8, 12, 6);
    scene.add(sun);

    const fill = new THREE.PointLight(0x38bdf8, 1.5, 20);
    fill.position.set(-6, 4, -4);
    scene.add(fill);

    // Mouse drag controls
    const onMouseDown = (e) => {
      isDraggingRef.current = true;
      prevMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDraggingRef.current || !buildingGroupRef.current) return;
      const dx = e.clientX - prevMousePos.current.x;
      const dy = e.clientY - prevMousePos.current.y;
      buildingGroupRef.current.rotation.y += dx * 0.01;
      camera.position.y = Math.max(2, Math.min(18, camera.position.y - dy * 0.03));
      prevMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    container.addEventListener('pointerdown', onMouseDown);
    window.addEventListener('pointermove', onMouseMove);
    window.addEventListener('pointerup', onMouseUp);

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (buildingGroupRef.current && autoRotate && !isDraggingRef.current) {
        buildingGroupRef.current.rotation.y += 0.005;
      }
      camera.lookAt(0, (storeys * floorHeight) / 2, 0);
      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('pointerdown', onMouseDown);
      window.removeEventListener('pointermove', onMouseMove);
      window.removeEventListener('pointerup', onMouseUp);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [storeys, explodePercent, showStructure, showServices, showFacade, autoRotate]);

  return (
    <div style={styles.buildingViewerBox}>
      <div style={{ ...styles.studioCanvasBadgeRow, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <span style={styles.webglTag}>WEB BUILDING VIEWER · DEMO</span>
          <span style={styles.dragTag}>DRAG TO ROTATE</span>
        </div>
        <button
          onClick={handleDownloadSnapshot}
          style={{
            backgroundColor: 'rgba(37,99,235,0.85)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '6px',
            padding: '4px 10px',
            fontSize: '11px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            backdropFilter: 'blur(4px)',
            transition: 'background-color 0.15s ease'
          }}
          title="Download PNG snapshot of the 3D building viewer"
        >
          📷 Snapshot PNG
        </button>
      </div>
      <div ref={mountRef} style={styles.canvasMountTall} />
    </div>
  );
}

// --- SCROLL REVEAL WRAPPER ---
function RevealSection({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.07 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0px)' : 'translateY(28px)',
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
        ...style
      }}
    >
      {children}
    </div>
  );
}

// --- ANIMATED COUNTER ---
function CountUp({ target, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.6 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    const steps = 55;
    const inc = target / steps;
    const ms = duration / steps;
    let cur = 0;
    const timer = setInterval(() => {
      cur += inc;
      if (cur >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(cur)); }
    }, ms);
    return () => clearInterval(timer);
  }, [started, target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// --- MAIN APP COMPONENT ---
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Theme State (Light / Dark)
  const [theme, setTheme] = useState('light');
  const isDark = theme === 'dark';
  const styles = getStyles(isDark);

  // Scroll Progress & Command Palette (Ctrl+K)
  const [scrollProgress, setScrollProgress] = useState(0);
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState('');

  // Cookie Consent
  const [cookieAccepted, setCookieAccepted] = useState(() => {
    try { return localStorage.getItem('abt_cookies') === 'yes'; } catch { return true; }
  });
  const acceptCookies = () => {
    try { localStorage.setItem('abt_cookies', 'yes'); } catch {}
    setCookieAccepted(true);
  };

  // Service card hover & filter state
  const [hoveredServiceId, setHoveredServiceId] = useState(null);
  const [serviceCategory, setServiceCategory] = useState('All');
  const [techFilter, setTechFilter] = useState('All');
  const [chakraThemeKey, setChakraThemeKey] = useState('cyan');

  // FAQ Category & Search Filter
  const [faqCategory, setFaqCategory] = useState('All');
  const [faqSearch, setFaqSearch] = useState('');

  // 15-Min Discovery Call Scheduler Modal
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('Tomorrow');
  const [scheduleSlot, setScheduleSlot] = useState('11:00 AM IST');
  const [scheduleName, setScheduleName] = useState('');
  const [scheduleEmail, setScheduleEmail] = useState('');
  const [scheduleSuccess, setScheduleSuccess] = useState(false);

  // Active section scroll-spy
  const [activeSection, setActiveSection] = useState('top');
  const [activeArticle, setActiveArticle] = useState(null);

  // Client ROI Savings Calculator State
  const [roiTeamSize, setRoiTeamSize] = useState(3);
  const [roiDuration, setRoiDuration] = useState(6);

  // Developer Code Sandbox State
  const [activeCodeTab, setActiveCodeTab] = useState('3d');
  const [codeCopied, setCodeCopied] = useState(false);

  const handleCopyCode = () => {
    const code = CODE_SNIPPETS[activeCodeTab].code;
    navigator.clipboard?.writeText(code);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  // Enterprise Security Blueprint Modal State
  const [securityModalOpen, setSecurityModalOpen] = useState(false);

  // Procedural Web Audio Haptic Sound State
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef(null);

  const playClickSound = (type = 'click') => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'click') {
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.05);
      } else if (type === 'success') {
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.07, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.2);
      }
    } catch {}
  };

  useEffect(() => {
    const sectionIds = ['top', 'services', 'studio', 'industries', 'work', 'insights', 'estimate', 'support', 'faq', 'contact'];
    const observers = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.body.style.backgroundColor = isDark ? '#0A0F1D' : '#FFFFFF';
    document.documentElement.style.backgroundColor = isDark ? '#0A0F1D' : '#FFFFFF';
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setCommandOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredCommands = COMMAND_ITEMS.filter((item) => {
    if (!commandQuery.trim()) return true;
    const q = commandQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  // 3D Studio State
  const [studioShape, setStudioShape] = useState('torus');
  const [studioMaterial, setStudioMaterial] = useState('glossy');
  const [studioColor, setStudioColor] = useState('#2563EB');
  const [studioRotationSpeed, setStudioRotationSpeed] = useState(1.0);
  const [studioLightAngle, setStudioLightAngle] = useState(40);
  const [studioAutoRotate, setStudioAutoRotate] = useState(true);

  // Building Viewer State
  const [buildingStoreys, setBuildingStoreys] = useState(10);
  const [buildingExplode, setBuildingExplode] = useState(0);
  const [layerStructure, setLayerStructure] = useState(true);
  const [layerServices, setLayerServices] = useState(true);
  const [layerFacade, setLayerFacade] = useState(true);
  const [buildingAutoRotate, setBuildingAutoRotate] = useState(true);

  // Application Interactive Showcase State
  const [activeAppCategory, setActiveAppCategory] = useState('E-commerce and marketplaces');
  const [supportChatMessages, setSupportChatMessages] = useState([
    { sender: 'user', text: 'Hi, where is my order?' },
    { sender: 'bot', text: 'Order #4820 is out for delivery and arrives by 6 pm.' },
    { sender: 'user', text: 'Great, thank you!' },
    { sender: 'bot', text: 'Anything else I can help with?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [phoneTilt, setPhoneTilt] = useState({ x: 0, y: 0 });

  const handlePhonePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setPhoneTilt({ x: -y * 18, y: x * 18 });
  };

  const handlePhonePointerLeave = () => {
    setPhoneTilt({ x: 0, y: 0 });
  };

  // Selected Work Ring Carousel State
  const [ringIndex, setRingIndex] = useState(0);
  const [ringAutoTurn, setRingAutoTurn] = useState(true);
  const [conceptFilter, setConceptFilter] = useState('All');

  // Client Onboarding Sprint Roadmap State
  const [activeRoadmapWeek, setActiveRoadmapWeek] = useState(0);

  // Hero Typing Animation State
  const TYPING_PHRASES = ['web applications', 'mobile apps', '3D experiences', 'IT systems'];
  const [typingPhrase, setTypingPhrase] = useState('');
  const [typingPhraseIdx, setTypingPhraseIdx] = useState(0);
  const [typingDeleting, setTypingDeleting] = useState(false);

  useEffect(() => {
    const fullWord = TYPING_PHRASES[typingPhraseIdx];
    let timeout;
    if (!typingDeleting && typingPhrase === fullWord) {
      timeout = setTimeout(() => setTypingDeleting(true), 1800);
    } else if (typingDeleting && typingPhrase === '') {
      setTypingDeleting(false);
      setTypingPhraseIdx((prev) => (prev + 1) % TYPING_PHRASES.length);
    } else if (typingDeleting) {
      timeout = setTimeout(() => setTypingPhrase((p) => p.slice(0, -1)), 60);
    } else {
      timeout = setTimeout(() => setTypingPhrase(fullWord.slice(0, typingPhrase.length + 1)), 90);
    }
    return () => clearTimeout(timeout);
  }, [typingPhrase, typingDeleting, typingPhraseIdx]);

  // Estimator State
  const [estBuildingType, setEstBuildingType] = useState('Web application development');
  const [estFeatures, setEstFeatures] = useState({
    auth: true,
    payments: true,
    realtime: false,
    threeD: false,
    admin: true,
    offline: false,
    ai: false
  });
  const [estComplexity, setEstComplexity] = useState('Standard');
  const [estCurrency, setEstCurrency] = useState('INR');
  const [conceptModalData, setConceptModalData] = useState(null);

  // Contact Form State
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceNeed: 'Web application development',
    details: ''
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [inquiryCopied, setInquiryCopied] = useState(false);
  const [estimateCopied, setEstimateCopied] = useState(false);

  // Smooth scroll
  const scrollTo = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  // Ring Auto-turn effect
  useEffect(() => {
    if (!ringAutoTurn) return;
    const interval = setInterval(() => {
      setRingIndex((prev) => (prev + 1) % SAMPLE_CONCEPTS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [ringAutoTurn]);

  // Estimator Calculations
  const calcTimelineWeeks = () => {
    let base = 4;
    if (estBuildingType.includes('3D') || estBuildingType.includes('visuals')) base += 3;
    if (estBuildingType.includes('Mobile')) base += 2;
    if (estBuildingType.includes('Enterprise')) base += 4;

    const featureCount = Object.values(estFeatures).filter(Boolean).length;
    base += featureCount * 0.8;

    if (estComplexity === 'Complex') base *= 1.3;
    if (estComplexity === 'High Performance') base *= 1.6;

    const minW = Math.round(base);
    const maxW = Math.round(base * 1.35);
    return `${minW} to ${maxW} weeks`;
  };

  const calcEstimatedBudget = () => {
    let baseINR = 150000;
    if (estBuildingType.includes('3D') || estBuildingType.includes('visuals')) baseINR += 80000;
    if (estBuildingType.includes('Mobile')) baseINR += 60000;
    if (estBuildingType.includes('Enterprise')) baseINR += 120000;

    const featureCount = Object.values(estFeatures).filter(Boolean).length;
    baseINR += featureCount * 28000;

    if (estComplexity === 'Complex') baseINR *= 1.35;
    if (estComplexity === 'High Performance') baseINR *= 1.65;

    if (estCurrency === 'INR') {
      const minL = (baseINR / 100000).toFixed(1);
      const maxL = ((baseINR * 1.35) / 100000).toFixed(1);
      return `₹${minL}L – ₹${maxL}L`;
    } else if (estCurrency === 'USD') {
      const minUSD = Math.round((baseINR / 85) / 100) * 100;
      const maxUSD = Math.round(((baseINR * 1.35) / 85) / 100) * 100;
      return `$${minUSD.toLocaleString()} – $${maxUSD.toLocaleString()}`;
    } else if (estCurrency === 'EUR') {
      const minEUR = Math.round((baseINR / 92) / 100) * 100;
      const maxEUR = Math.round(((baseINR * 1.35) / 92) / 100) * 100;
      return `€${minEUR.toLocaleString()} – €${maxEUR.toLocaleString()}`;
    } else if (estCurrency === 'GBP') {
      const minGBP = Math.round((baseINR / 110) / 100) * 100;
      const maxGBP = Math.round(((baseINR * 1.35) / 110) / 100) * 100;
      return `£${minGBP.toLocaleString()} – £${maxGBP.toLocaleString()}`;
    }
    return 'Contact for quote';
  };

  const calcSuggestedTeam = () => {
    let roles = ['1 Lead Architect', '2 Full-Stack Engineers'];
    if (estFeatures.threeD) roles.push('1 3D / WebGL Specialist');
    if (estFeatures.ai) roles.push('1 AI & Data Engineer');
    roles.push('1 UI/UX Designer', '1 QA Engineer');
    return roles.join(' · ');
  };

  const handleSendEstimateToContact = () => {
    const summary = `Selected Building: ${estBuildingType} | Complexity: ${estComplexity} | Features: ${Object.keys(estFeatures).filter((k) => estFeatures[k]).join(', ')} | Timeline: ${calcTimelineWeeks()} | Indicative Budget: ${calcEstimatedBudget()}`;
    setContactData((prev) => ({
      ...prev,
      serviceNeed: estBuildingType,
      details: `Project Estimate Summary:\n${summary}\n\nAdditional notes:`
    }));
    const contactElem = document.getElementById('contact');
    if (contactElem) contactElem.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadRFP = () => {
    playClickSound('success');
    const activeFeats = Object.keys(estFeatures).filter((k) => estFeatures[k]).map((f) => `- ${f}`).join('\n') || '- Standard architecture';
    const content = `# PROJECT REQUIREMENTS & SCOPE BRIEF (RFP)
Generated via Abhimanyu Technologies Interactive Estimator
Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
Website: https://abhimanu-technologies.vercel.app/

--------------------------------------------------------------------------------
1. PROJECT SPECIFICATIONS
--------------------------------------------------------------------------------
• Project Category: ${estBuildingType}
• Complexity Level: ${estComplexity}
• Active Features:
${activeFeats}

--------------------------------------------------------------------------------
2. INDICATIVE TIMELINE & ALLOCATION
--------------------------------------------------------------------------------
• Estimated Delivery Window: ${calcTimelineWeeks()}
• Suggested Team Composition: ${calcSuggestedTeam()}
• Phase Allocation Breakdown:
  - 15% Discovery & Technical Scoping
  - 20% UI/UX Prototypes & Architecture Blueprint
  - 50% Core Agile Sprints & Automated Testing
  - 15% QA, OWASP Hardening & Production Launch

--------------------------------------------------------------------------------
3. COMMERCIAL ESTIMATE
--------------------------------------------------------------------------------
• Currency: ${estCurrency}
• Estimated Budget Bracket: ${calcEstimatedBudget()}
(Subject to final discovery review and milestone agreement)

--------------------------------------------------------------------------------
4. INTELLECTUAL PROPERTY & COMPLIANCE GUARANTEE
--------------------------------------------------------------------------------
• 100% Client Ownership of all source code, git repositories, and Figma files.
• Zero vendor lock-in or proprietary runtime fees.
• Pre-launch OWASP Top 10 vulnerability check.
• Bilateral Mutual Non-Disclosure Agreement (NDA) executed prior to Sprint Zero.

--------------------------------------------------------------------------------
5. NEXT STEPS
--------------------------------------------------------------------------------
To convert this brief into an active proposal or book an engineering scoping session:
• Email: hello@abhimanyutech.example
• Direct WhatsApp: wa.me/919999999999
• Office: Telangana, India • Available for Global Engagements
`;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Abhimanyu-Technologies-Scope-RFP-${estBuildingType.toLowerCase().replace(/[^a-z0-9]/g, '-')}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleChatSend = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const newMsg = { sender: 'user', text: chatInput };
    setSupportChatMessages((prev) => [...prev, newMsg]);
    setChatInput('');
    setTimeout(() => {
      setSupportChatMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Thank you! An engineer will be with you shortly.' }
      ]);
    }, 900);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactData.name || !contactData.email || !contactData.details) {
      alert('Please fill out your name, email, and project details.');
      return;
    }
    setContactSubmitted(true);
  };

  return (
    <div style={styles.page}>
      {/* --- SCROLL PROGRESS BAR --- */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '3px',
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #2563EB, #38BDF8)',
          zIndex: 9999,
          transition: 'width 0.1s ease-out'
        }}
      />

      {/* --- COOKIE CONSENT BANNER --- */}
      {!cookieAccepted && (
        <div style={{
          position: 'fixed',
          bottom: 0, left: 0, right: 0,
          backgroundColor: isDark ? '#111827' : '#0F172A',
          color: '#F1F5F9',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          zIndex: 9500,
          boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
          fontSize: '14px'
        }}>
          <span style={{ maxWidth: '640px', lineHeight: '1.5', color: '#CBD5E1' }}>
            🍪 We use cookies to improve your experience and analyse site traffic. By clicking <strong>Accept</strong>, you agree to our{' '}
            <a href="#faq" onClick={(e) => { scrollTo(e, 'faq'); acceptCookies(); }} style={{ color: '#38BDF8', textDecoration: 'underline' }}>Privacy Policy</a>.
          </span>
          <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
            <button
              onClick={acceptCookies}
              style={{
                backgroundColor: '#2563EB', color: '#FFFFFF',
                border: 'none', padding: '9px 20px',
                borderRadius: '8px', fontWeight: '700',
                fontSize: '14px', cursor: 'pointer'
              }}
            >
              Accept all
            </button>
            <button
              onClick={acceptCookies}
              style={{
                backgroundColor: 'transparent', color: '#94A3B8',
                border: '1px solid #334155', padding: '9px 16px',
                borderRadius: '8px', fontWeight: '500',
                fontSize: '14px', cursor: 'pointer'
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* --- COMMAND PALETTE MODAL (CTRL+K) --- */}
      {commandOpen && (
        <div style={styles.commandModalOverlay} onClick={() => setCommandOpen(false)}>
          <div style={styles.commandModalCard} onClick={(e) => e.stopPropagation()}>
            <div style={styles.commandSearchRow}>
              <span style={styles.commandSearchIcon}>🔍</span>
              <input
                autoFocus
                type="text"
                value={commandQuery}
                onChange={(e) => setCommandQuery(e.target.value)}
                placeholder="Search sections, services, or tools... (e.g. 3D, mobile, estimator)"
                style={styles.commandInput}
              />
              <span style={styles.commandEscHint}>ESC</span>
            </div>
            <div style={styles.commandList}>
              {filteredCommands.length === 0 ? (
                <div style={styles.commandEmpty}>No matching sections or services found.</div>
              ) : (
                filteredCommands.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setCommandOpen(false);
                      setCommandQuery('');
                      const elem = document.getElementById(item.anchor);
                      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={styles.commandItem}
                  >
                    <div style={styles.commandItemMain}>
                      <span style={styles.commandItemTitle}>{item.title}</span>
                      <span style={styles.commandItemDesc}>{item.desc}</span>
                    </div>
                    <span style={styles.commandCategoryTag}>{item.category}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- ARCHITECTURE & TECH SPECS MODAL --- */}
      {conceptModalData && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10001,
            padding: '20px'
          }}
          onClick={() => setConceptModalData(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '620px',
              backgroundColor: isDark ? '#111827' : '#FFFFFF',
              border: isDark ? '1px solid #374151' : '1px solid #E2E8F0',
              borderRadius: '20px',
              padding: '32px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{ ...styles.conceptTag, fontSize: '11px' }}>{conceptModalData.tag}</span>
                <h3 style={{ fontSize: '24px', fontWeight: '800', color: isDark ? '#FFFFFF' : '#0F172A', margin: '8px 0 0 0' }}>
                  {conceptModalData.title}
                </h3>
              </div>
              <button
                onClick={() => setConceptModalData(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: isDark ? '#94A3B8' : '#64748B',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '15px', color: isDark ? '#CBD5E1' : '#475569', lineHeight: '1.6', marginBottom: '20px' }}>
              {conceptModalData.desc}
            </p>

            <div style={{ backgroundColor: isDark ? '#1E293B' : '#F8FAFC', borderRadius: '12px', padding: '16px', marginBottom: '18px' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#2563EB', marginBottom: '4px' }}>
                System Architecture
              </div>
              <div style={{ fontSize: '14px', color: isDark ? '#F1F5F9' : '#0F172A', fontWeight: '600' }}>
                {conceptModalData.architecture}
              </div>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: isDark ? '#94A3B8' : '#64748B', marginBottom: '8px' }}>
                Technology Stack
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {conceptModalData.stack?.map((tech, i) => (
                  <span key={i} style={{
                    backgroundColor: isDark ? '#0F172A' : '#EFF6FF',
                    color: isDark ? '#93C5FD' : '#2563EB',
                    border: isDark ? '1px solid #1E293B' : '1px solid #BFDBFE',
                    fontSize: '12.5px',
                    fontWeight: '600',
                    padding: '4px 10px',
                    borderRadius: '8px'
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: isDark ? '#94A3B8' : '#64748B', marginBottom: '8px' }}>
                Core Capabilities & Modules
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {conceptModalData.modules?.map((mod, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: isDark ? '#CBD5E1' : '#334155' }}>
                    <span style={{ color: '#10B981', fontWeight: '700' }}>✓</span>
                    <span>{mod}</span>
                  </div>
                ))}
              </div>
            </div>

            {conceptModalData.metrics && (
              <div style={{
                backgroundColor: isDark ? 'rgba(16, 185, 129, 0.1)' : '#ECFDF5',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '10px',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '24px'
              }}>
                <span style={{ fontSize: '18px' }}>📈</span>
                <span style={{ fontSize: '13px', fontWeight: '600', color: isDark ? '#34D399' : '#065F46' }}>
                  {conceptModalData.metrics}
                </span>
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setConceptModalData(null)}
                style={{
                  backgroundColor: 'transparent',
                  border: isDark ? '1px solid #374151' : '1px solid #CBD5E1',
                  color: isDark ? '#94A3B8' : '#64748B',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
              <button
                onClick={() => {
                  const sel = conceptModalData;
                  setConceptModalData(null);
                  setContactData((prev) => ({
                    ...prev,
                    serviceNeed: sel.title,
                    details: `Inquiring regarding system architecture and development for ${sel.title} (${sel.tag}).`
                  }));
                  const elem = document.getElementById('contact');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  backgroundColor: '#2563EB',
                  border: 'none',
                  color: '#FFFFFF',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Discuss Building This &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- 15-MIN DISCOVERY CALL SCHEDULER MODAL --- */}
      {scheduleModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10002,
            padding: '20px'
          }}
          onClick={() => { setScheduleModalOpen(false); setScheduleSuccess(false); }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '540px',
              backgroundColor: isDark ? '#111827' : '#FFFFFF',
              border: isDark ? '1px solid #374151' : '1px solid #E2E8F0',
              borderRadius: '20px',
              padding: '32px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                  Engineering Consultation
                </span>
                <h3 style={{ fontSize: '22px', fontWeight: '800', color: isDark ? '#FFFFFF' : '#0F172A', margin: '4px 0 0 0' }}>
                  Book a 15-Min Discovery Call
                </h3>
              </div>
              <button
                onClick={() => { setScheduleModalOpen(false); setScheduleSuccess(false); }}
                style={{ background: 'none', border: 'none', color: isDark ? '#94A3B8' : '#64748B', fontSize: '24px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {scheduleSuccess ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <div style={{ fontSize: '42px', color: '#10B981', marginBottom: '14px' }}>✓</div>
                <h4 style={{ fontSize: '20px', fontWeight: '700', color: isDark ? '#FFFFFF' : '#0F172A', marginBottom: '8px' }}>
                  Call Reserved for {scheduleDate}!
                </h4>
                <p style={{ fontSize: '14.5px', color: isDark ? '#CBD5E1' : '#475569', lineHeight: '1.6', marginBottom: '24px' }}>
                  We have sent a calendar invite and confirmation to <strong>{scheduleEmail}</strong> for {scheduleSlot}.
                </p>
                <button
                  onClick={() => { setScheduleModalOpen(false); setScheduleSuccess(false); }}
                  style={{
                    backgroundColor: '#2563EB',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '10px 24px',
                    borderRadius: '8px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!scheduleName || !scheduleEmail) {
                    alert('Please enter your name and work email.');
                    return;
                  }
                  setScheduleSuccess(true);
                }}
                style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
              >
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: isDark ? '#CBD5E1' : '#334155', marginBottom: '8px' }}>
                    1. Select Day
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {['Tomorrow', 'In 2 Days', 'Next Monday'].map((day) => (
                      <button
                        type="button"
                        key={day}
                        onClick={() => setScheduleDate(day)}
                        style={{
                          flex: 1,
                          padding: '10px',
                          borderRadius: '8px',
                          border: scheduleDate === day ? '2px solid #2563EB' : (isDark ? '1px solid #374151' : '1px solid #CBD5E1'),
                          backgroundColor: scheduleDate === day ? (isDark ? '#1E293B' : '#EFF6FF') : (isDark ? '#0F172A' : '#F8FAFC'),
                          color: scheduleDate === day ? '#2563EB' : (isDark ? '#CBD5E1' : '#475569'),
                          fontWeight: '700',
                          fontSize: '13px',
                          cursor: 'pointer'
                        }}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: isDark ? '#CBD5E1' : '#334155', marginBottom: '8px' }}>
                    2. Select Time Window (IST)
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                    {['11:00 AM IST', '2:30 PM IST', '4:30 PM IST', '6:00 PM IST', '7:30 PM IST', '9:00 PM IST'].map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setScheduleSlot(slot)}
                        style={{
                          padding: '8px',
                          borderRadius: '8px',
                          border: scheduleSlot === slot ? '2px solid #2563EB' : (isDark ? '1px solid #374151' : '1px solid #CBD5E1'),
                          backgroundColor: scheduleSlot === slot ? (isDark ? '#1E293B' : '#EFF6FF') : (isDark ? '#0F172A' : '#F8FAFC'),
                          color: scheduleSlot === slot ? '#2563EB' : (isDark ? '#CBD5E1' : '#475569'),
                          fontWeight: '600',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: isDark ? '#CBD5E1' : '#334155', marginBottom: '6px' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={scheduleName}
                    onChange={(e) => setScheduleName(e.target.value)}
                    placeholder="e.g. John Doe"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: isDark ? '1px solid #374151' : '1px solid #CBD5E1',
                      backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
                      color: isDark ? '#FFFFFF' : '#0F172A',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: isDark ? '#CBD5E1' : '#334155', marginBottom: '6px' }}>
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={scheduleEmail}
                    onChange={(e) => setScheduleEmail(e.target.value)}
                    placeholder="john@company.com"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: isDark ? '1px solid #374151' : '1px solid #CBD5E1',
                      backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
                      color: isDark ? '#FFFFFF' : '#0F172A',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    backgroundColor: '#2563EB',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '8px',
                    fontWeight: '700',
                    fontSize: '15px',
                    cursor: 'pointer',
                    marginTop: '6px'
                  }}
                >
                  Confirm 15-Min Call ({scheduleDate}, {scheduleSlot}) &rarr;
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* --- TECHNICAL ARTICLE DEEP-DIVE MODAL --- */}
      {activeArticle && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10003,
            padding: '20px'
          }}
          onClick={() => setActiveArticle(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '680px',
              backgroundColor: isDark ? '#111827' : '#FFFFFF',
              border: isDark ? '1px solid #374151' : '1px solid #E2E8F0',
              borderRadius: '20px',
              padding: '32px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '800', color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                    {activeArticle.category}
                  </span>
                  <span style={{ color: '#94A3B8', fontSize: '12px' }}>•</span>
                  <span style={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B' }}>
                    {activeArticle.date} · {activeArticle.readTime}
                  </span>
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: '800', color: isDark ? '#FFFFFF' : '#0F172A', margin: 0, lineHeight: '1.3' }}>
                  {activeArticle.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                style={{ background: 'none', border: 'none', color: isDark ? '#94A3B8' : '#64748B', fontSize: '24px', cursor: 'pointer', padding: '4px' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '15.5px', lineHeight: '1.7', color: isDark ? '#CBD5E1' : '#334155', margin: '20px 0' }}>
              {activeArticle.content}
            </p>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
              {activeArticle.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  style={{
                    backgroundColor: isDark ? '#1E293B' : '#EFF6FF',
                    color: isDark ? '#93C5FD' : '#2563EB',
                    border: isDark ? '1px solid #334155' : '1px solid #BFDBFE',
                    fontSize: '12px',
                    fontWeight: '600',
                    padding: '4px 10px',
                    borderRadius: '6px'
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingTop: '16px', borderTop: isDark ? '1px solid #1E293B' : '1px solid #E2E8F0' }}>
              <button
                onClick={() => setActiveArticle(null)}
                style={{
                  backgroundColor: 'transparent',
                  border: isDark ? '1px solid #374151' : '1px solid #CBD5E1',
                  color: isDark ? '#94A3B8' : '#64748B',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
              <button
                onClick={() => {
                  const title = activeArticle.title;
                  setActiveArticle(null);
                  setContactData((prev) => ({
                    ...prev,
                    serviceNeed: 'Engineering Architecture Consultation',
                    details: `Interested in discussing engineering implementations similar to: "${title}".`
                  }));
                  const elem = document.getElementById('contact');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  backgroundColor: '#2563EB',
                  border: 'none',
                  color: '#FFFFFF',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Consult on Similar Architecture &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- ENTERPRISE SECURITY & COMPLIANCE BLUEPRINT MODAL --- */}
      {securityModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10004,
            padding: '20px'
          }}
          onClick={() => setSecurityModalOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '680px',
              backgroundColor: isDark ? '#111827' : '#FFFFFF',
              border: isDark ? '1px solid #374151' : '1px solid #E2E8F0',
              borderRadius: '20px',
              padding: '32px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                  Enterprise Assurance
                </span>
                <h3 style={{ fontSize: '22px', fontWeight: '800', color: isDark ? '#FFFFFF' : '#0F172A', margin: '4px 0 0 0' }}>
                  Security & Compliance Blueprint
                </h3>
              </div>
              <button
                onClick={() => setSecurityModalOpen(false)}
                style={{ background: 'none', border: 'none', color: isDark ? '#94A3B8' : '#64748B', fontSize: '24px', cursor: 'pointer', padding: '4px' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '14.5px', color: isDark ? '#CBD5E1' : '#475569', lineHeight: '1.6', marginBottom: '24px' }}>
              We engineer software for clients whose businesses cannot afford downtime or data leaks. Every line of code and cloud deployment adheres to verified security baselines:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {[
                { title: 'OWASP Top 10 Mitigation', desc: 'Automated SAST scans, parameterized queries, strict input sanitation, and CSRF protection in all API routes.' },
                { title: 'Bank-Grade Encryption', desc: 'AES-256 for all stored data & persistent database volumes; TLS 1.3 enforced for all ingress and egress transit.' },
                { title: 'Zero-Trust Architecture', desc: 'IAM least-privilege scoping, MFA enforcement across all production consoles, and isolated VPC subnetting.' },
                { title: '100% IP & Asset Assignment', desc: 'Complete copyright, source code, patentable IP, and deployment credential transfer on contract completion.' },
                { title: 'Mutual NDA by Default', desc: 'Standard non-disclosure agreement executed before any proprietary data, designs, or APIs are exchanged.' },
                { title: 'Continuous Dependency Auditing', desc: 'Automated GitHub Dependabot & Snyk alerts blocking high-severity CVEs before merging to main.' }
              ].map((sec, sIdx) => (
                <div
                  key={sIdx}
                  style={{
                    backgroundColor: isDark ? '#0F172A' : '#F8FAFC',
                    border: isDark ? '1px solid #1E293B' : '1px solid #E2E8F0',
                    borderRadius: '12px',
                    padding: '16px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ color: '#10B981', fontSize: '14px', fontWeight: 'bold' }}>✓</span>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', color: isDark ? '#FFFFFF' : '#0F172A', margin: 0 }}>
                      {sec.title}
                    </h4>
                  </div>
                  <p style={{ fontSize: '12.5px', color: isDark ? '#94A3B8' : '#64748B', lineHeight: '1.5', margin: 0 }}>
                    {sec.desc}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', borderTop: isDark ? '1px solid #1E293B' : '1px solid #E2E8F0', paddingTop: '16px' }}>
              <button
                onClick={() => setSecurityModalOpen(false)}
                style={{
                  backgroundColor: 'transparent',
                  border: isDark ? '1px solid #374151' : '1px solid #CBD5E1',
                  color: isDark ? '#94A3B8' : '#64748B',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSecurityModalOpen(false);
                  setContactData((prev) => ({
                    ...prev,
                    serviceNeed: 'IT services and consulting',
                    details: 'Requesting mutual NDA and security architecture review.'
                  }));
                  const elem = document.getElementById('contact');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  backgroundColor: '#2563EB',
                  border: 'none',
                  color: '#FFFFFF',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Request Mutual NDA & Security Review &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- FLOATING ACTION BUTTONS (WhatsApp + Back to Top) --- */}
      {scrollProgress > 8 && (
        <div style={{
          position: 'fixed',
          bottom: '28px',
          right: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          zIndex: 9000
        }}>
          <a
            href="https://wa.me/91XXXXXXXXXX?text=Hi%20Abhimanyu%20Technologies%2C%20I%20would%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#25D366',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(37, 211, 102, 0.45)',
              textDecoration: 'none',
              fontSize: '22px',
              transition: 'transform 0.2s ease'
            }}
          >
            💬
          </a>
          <button
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            title="Back to top"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: isDark ? '#1E293B' : '#0F172A',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ↑
          </button>
        </div>
      )}

      {/* --- TOP UTILITY BAR --- */}
      <div style={styles.utilityBar}>
        <div style={styles.container}>
          <div style={styles.utilityContent}>
            <span>APPS · MAINTENANCE · IT SERVICES · 3D ANIMATION</span>
            <span style={styles.utilityRight}>
              Office: Telangana, India • Available for Global Engagements
            </span>
          </div>
        </div>
      </div>

      {/* --- HEADER NAVIGATION --- */}
      <header style={styles.navHeader}>
        <div style={styles.headerContainer}>
          <a href="#top" onClick={(e) => scrollTo(e, 'top')} style={styles.brandLink}>
            <span style={styles.brandMain}>Abhimanyu</span>
            <span style={styles.brandSub}>TECHNOLOGIES</span>
          </a>

          <nav className="desktop-nav" style={styles.navLinks}>
            {[
              { id: 'services', label: 'Services' },
              { id: 'studio', label: '3D Studio' },
              { id: 'industries', label: 'Industries' },
              { id: 'work', label: 'Work' },
              { id: 'insights', label: 'Insights' },
              { id: 'estimate', label: 'Estimator' },
              { id: 'support', label: 'Support' },
              { id: 'faq', label: 'FAQ' }
            ].map((nav) => {
              const isActive = activeSection === nav.id;
              return (
                <a
                  key={nav.id}
                  href={`#${nav.id}`}
                  onClick={(e) => scrollTo(e, nav.id)}
                  style={{
                    ...styles.navItem,
                    color: isActive ? '#2563EB' : styles.navItem.color,
                    fontWeight: isActive ? '700' : styles.navItem.fontWeight,
                    position: 'relative'
                  }}
                >
                  {nav.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-4px',
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: '#2563EB',
                        borderRadius: '2px'
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div style={styles.headerActions}>
            {/* Quick Search Ctrl+K Button */}
            <button
              onClick={() => setCommandOpen(true)}
              style={styles.searchCommandBtn}
              title="Quick Search and Command Menu (Ctrl+K)"
            >
              <span>🔍</span>
              <span className="search-text-label">Search</span>
              <kbd style={styles.kbdShortcut}>⌘K</kbd>
            </button>

            {/* Sound Effects Toggle */}
            <button
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) playClickSound('success');
              }}
              style={styles.themeToggleBtn}
              title={soundEnabled ? 'Mute Interface Sound Effects' : 'Enable Subtle Interface Sound Effects'}
              aria-label="Toggle interface sound effects"
            >
              {soundEnabled ? '🔊' : '🔇'}
            </button>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              style={styles.themeToggleBtn}
              title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label="Toggle light or dark theme"
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            <a href="#contact" onClick={(e) => scrollTo(e, 'contact')} style={styles.quoteBtn}>
              Get a quote
            </a>
            <button
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={styles.mobileHamburger}
              aria-label="Toggle menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div style={styles.mobileMenu}>
            <div style={{ display: 'flex', gap: '8px', paddingBottom: '10px', borderBottom: isDark ? '1px solid #1E293B' : '1px solid #E2E8F0' }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCommandOpen(true);
                }}
                style={{ ...styles.searchCommandBtn, flex: 1, justifyContent: 'center' }}
              >
                <span>🔍 Search (Ctrl+K)</span>
              </button>
              <button
                onClick={() => {
                  const next = !soundEnabled;
                  setSoundEnabled(next);
                  if (next) playClickSound('success');
                }}
                style={styles.themeToggleBtn}
                title="Toggle Audio SFX"
              >
                {soundEnabled ? '🔊' : '🔇'}
              </button>
              <button
                onClick={toggleTheme}
                style={styles.themeToggleBtn}
              >
                {isDark ? '☀️ Light' : '🌙 Dark'}
              </button>
            </div>
            {[
              { id: 'services', label: 'Services' },
              { id: 'studio', label: '3D Studio' },
              { id: 'industries', label: 'Industries' },
              { id: 'work', label: 'Work' },
              { id: 'insights', label: 'Insights' },
              { id: 'estimate', label: 'Estimator' },
              { id: 'support', label: 'Support' },
              { id: 'faq', label: 'FAQ' }
            ].map((nav) => {
              const isActive = activeSection === nav.id;
              return (
                <a
                  key={nav.id}
                  href={`#${nav.id}`}
                  onClick={(e) => scrollTo(e, nav.id)}
                  style={{
                    ...styles.mobileMenuItem,
                    color: isActive ? '#2563EB' : styles.mobileMenuItem.color,
                    fontWeight: isActive ? '700' : '500',
                    backgroundColor: isActive ? (isDark ? 'rgba(37,99,235,0.12)' : '#EFF6FF') : 'transparent',
                    borderRadius: '8px',
                    padding: '8px 12px'
                  }}
                >
                  {nav.label}
                </a>
              );
            })}
            <a href="#contact" onClick={(e) => scrollTo(e, 'contact')} style={styles.mobileQuoteBtn}>Get a quote</a>
          </div>
        )}
      </header>

      {/* --- HERO SECTION --- */}
      <section id="top" style={styles.heroSection}>
        <div style={styles.container}>
          <div className="hero-grid" style={styles.heroGrid}>
            <div style={styles.heroTextCol}>
              <div style={styles.heroOverline}>
                APPS · MAINTENANCE · IT SERVICES · 3D
              </div>

              <h1 className="hero-title" style={styles.heroTitle}>
                We <em>build</em>{' '}
                <span style={{ color: '#2563EB', display: 'inline' }}>
                  {typingPhrase}
                  <span className="typing-cursor">|</span>
                </span>
                {' '}— apps, maintenance, IT services and 3D.
              </h1>

              <p className="hero-subtitle" style={styles.heroSubtitle}>
                Abhimanyu Technologies is a software company for businesses that want dependable apps and standout visuals. We design and develop web and mobile applications, maintain them after launch, deliver IT services, and create 3D animation and interactive 3D experiences.
              </p>

              <div style={styles.heroCtaRow}>
                <a href="#estimate" onClick={(e) => scrollTo(e, 'estimate')} style={styles.primaryCta}>
                  Estimate your project
                </a>
                <a href="#studio" onClick={(e) => scrollTo(e, 'studio')} style={styles.secondaryCta}>
                  Try the 3D Studio
                </a>
              </div>

              <div style={styles.heroPillRow}>
                {['Web apps', 'Mobile apps', 'Cloud', 'UI/UX', '3D animation', '24/7 support'].map((item, idx) => (
                  <span key={idx} style={styles.heroPill}>{item}</span>
                ))}
              </div>
            </div>

            {/* Hero 3D Chakra Interactive */}
            <div style={styles.hero3DCol}>
              <ChakraCanvas themeKey={chakraThemeKey} />
              {/* Interactive Shader Mode Switcher */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                marginTop: '12px',
                flexWrap: 'wrap'
              }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: isDark ? '#94A3B8' : '#64748B', letterSpacing: '0.4px', textTransform: 'uppercase' }}>
                  Shader:
                </span>
                {Object.keys(CHAKRA_THEMES).map((k) => (
                  <button
                    key={k}
                    onClick={() => {
                      setChakraThemeKey(k);
                      playClickSound('click');
                    }}
                    style={{
                      backgroundColor: chakraThemeKey === k ? '#2563EB' : (isDark ? '#1E293B' : '#FFFFFF'),
                      color: chakraThemeKey === k ? '#FFFFFF' : (isDark ? '#CBD5E1' : '#475569'),
                      border: chakraThemeKey === k ? '1px solid #2563EB' : (isDark ? '1px solid #334155' : '1px solid #CBD5E1'),
                      padding: '3px 9px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {CHAKRA_THEMES[k].name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS / SOCIAL PROOF BAR --- */}
      <div style={{
        backgroundColor: isDark ? '#0F172A' : '#F8FAFC',
        borderTop: isDark ? '1px solid #1E293B' : '1px solid #E2E8F0',
        borderBottom: isDark ? '1px solid #1E293B' : '1px solid #E2E8F0',
        padding: '28px 0'
      }}>
        <div style={styles.container}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '12px',
            textAlign: 'center'
          }} className="stats-grid">
            {[
              { target: 120, suffix: '+', label: 'Projects delivered', icon: '🚀', static: null },
              { target: 98, suffix: '%', label: 'Client satisfaction', icon: '⭐', static: null },
              { target: null, suffix: '', label: 'Avg. first response', icon: '⚡', static: '< 4h' },
              { target: 5, suffix: '+', label: 'Years of engineering', icon: '🏗️', static: null }
            ].map((stat, i) => (
              <div key={i} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                padding: '16px 8px'
              }}>
                <span style={{ fontSize: '22px', marginBottom: '2px' }}>{stat.icon}</span>
                <span style={{
                  fontSize: '32px',
                  fontWeight: '900',
                  color: '#2563EB',
                  lineHeight: '1'
                }}>
                  {stat.static ? stat.static : <CountUp target={stat.target} suffix={stat.suffix} />}
                </span>
                <span style={{
                  fontSize: '13px',
                  color: isDark ? '#94A3B8' : '#64748B',
                  fontWeight: '500'
                }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- TECH STACK MARQUEE STRIP --- */}
      <div style={{
        overflow: 'hidden',
        borderBottom: isDark ? '1px solid #1E293B' : '1px solid #E2E8F0',
        backgroundColor: isDark ? '#0A0F1D' : '#FFFFFF',
        padding: '18px 0',
        userSelect: 'none'
      }}>
        <div className="marquee-track">
          {[
            'React', 'Next.js', 'Node.js', 'Python', 'Flutter', 'React Native',
            'TypeScript', 'AWS', 'Google Cloud', 'Azure', 'Docker', 'PostgreSQL',
            'MongoDB', 'GraphQL', 'Three.js', 'WebGL', 'Figma', 'Kubernetes',
            // duplicate for seamless loop
            'React', 'Next.js', 'Node.js', 'Python', 'Flutter', 'React Native',
            'TypeScript', 'AWS', 'Google Cloud', 'Azure', 'Docker', 'PostgreSQL',
            'MongoDB', 'GraphQL', 'Three.js', 'WebGL', 'Figma', 'Kubernetes'
          ].map((tech, i) => (
            <span key={i} style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '6px 20px',
              margin: '0 4px',
              borderRadius: '99px',
              border: isDark ? '1px solid #1E293B' : '1px solid #E2E8F0',
              backgroundColor: isDark ? '#111827' : '#F8FAFC',
              color: isDark ? '#94A3B8' : '#475569',
              fontSize: '13px',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              letterSpacing: '0.3px'
            }}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* --- TECHNOLOGY ARCHITECTURE MATRIX --- */}
      <section id="tech-stack" style={{
        backgroundColor: isDark ? '#070C18' : '#F8FAFC',
        borderBottom: isDark ? '1px solid #1E293B' : '1px solid #E2E8F0',
        padding: '56px 0'
      }}>
        <div style={styles.container}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
            <div>
              <span style={styles.sectionEyebrow}>Enterprise Stack</span>
              <h2 style={{ ...styles.sectionTitle, margin: '6px 0 0 0', fontSize: '26px' }}>Technology Architecture Matrix</h2>
              <p style={{ ...styles.sectionSubtitle, margin: '6px 0 0 0', maxWidth: '600px' }}>
                Tested production frameworks, databases, and 3D pipelines engineered for performance and scalability.
              </p>
            </div>

            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['All', 'Frontend & Web', 'Mobile Engineering', 'Backend & Cloud', '3D & WebGL', 'Databases & Ingestion'].map((cat) => {
                const active = techFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setTechFilter(cat);
                      playClickSound('click');
                    }}
                    style={{
                      backgroundColor: active ? '#2563EB' : (isDark ? '#1E293B' : '#FFFFFF'),
                      color: active ? '#FFFFFF' : (isDark ? '#CBD5E1' : '#475569'),
                      border: active ? '1px solid #2563EB' : (isDark ? '1px solid #334155' : '1px solid #CBD5E1'),
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '16px'
          }}>
            {TECH_MATRIX.filter((item) => techFilter === 'All' || item.category === techFilter).map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
                  border: isDark ? '1px solid #1E293B' : '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '18px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '20px' }}>{item.icon}</span>
                    <strong style={{ fontSize: '14.5px', color: isDark ? '#F1F5F9' : '#0F172A' }}>{item.name}</strong>
                  </div>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    backgroundColor: isDark ? 'rgba(37,99,235,0.2)' : '#EFF6FF',
                    color: isDark ? '#93C5FD' : '#2563EB',
                    padding: '2px 8px',
                    borderRadius: '4px'
                  }}>
                    {item.badge}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '12.5px', color: isDark ? '#94A3B8' : '#64748B', lineHeight: '1.45' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHAT WE DO / SERVICES SECTION --- */}
      <section id="services" style={styles.section}>
        <div style={styles.container}>
          <RevealSection>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionEyebrow}>What we do</span>
              <h2 style={styles.sectionTitle}>Build it. Run it. Make it unforgettable.</h2>
              <p style={styles.sectionSubtitle}>
                One team for the whole life of your software, from the first screen design to the on-call phone at 3 a.m.
              </p>
            </div>
          </RevealSection>

          {/* Service Category Filter Pills */}
          <div style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '32px'
          }}>
            {['All', 'Engineering & Apps', 'Cloud & Support', '3D & Innovation'].map((cat) => {
              const active = serviceCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setServiceCategory(cat)}
                  style={{
                    backgroundColor: active ? '#2563EB' : (isDark ? '#1E293B' : '#F1F5F9'),
                    color: active ? '#FFFFFF' : (isDark ? '#CBD5E1' : '#475569'),
                    border: active ? '1px solid #2563EB' : (isDark ? '1px solid #334155' : '1px solid #CBD5E1'),
                    padding: '8px 18px',
                    borderRadius: '24px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div style={styles.servicesGrid}>
            {SERVICES.filter((s) => serviceCategory === 'All' || s.category === serviceCategory).map((s) => {
              const isHov = hoveredServiceId === s.id;
              return (
                <div
                  key={s.id}
                  onMouseEnter={() => setHoveredServiceId(s.id)}
                  onMouseLeave={() => setHoveredServiceId(null)}
                  style={{
                    ...styles.serviceCard,
                    borderLeft: isHov ? '3px solid #2563EB' : (isDark ? '1px solid #1F2937' : '1px solid #E2E8F0'),
                    transform: isHov ? 'translateY(-4px)' : 'translateY(0)',
                    boxShadow: isHov ? '0 12px 32px rgba(37,99,235,0.12)' : 'none',
                    transition: 'transform 0.22s ease, box-shadow 0.22s ease, border 0.15s ease',
                    backgroundColor: isHov ? (isDark ? '#141E33' : '#F0F6FF') : (isDark ? styles.serviceCard.backgroundColor : styles.serviceCard.backgroundColor)
                  }}
                >
                  <div style={styles.serviceCardTop}>
                    <h3 style={styles.serviceName}>{s.title}</h3>
                    {s.badge && <span style={styles.newBadge}>{s.badge}</span>}
                  </div>
                  <p style={styles.serviceDesc}>{s.subtitle}</p>
                  <ul style={styles.serviceBullets}>
                    {s.bullets.map((b, bIdx) => (
                      <li key={bIdx} style={styles.bulletItem}>
                        <span style={styles.bulletDot}>•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #F1F5F9' }}>
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        playClickSound('click');
                        setContactData((prev) => ({
                          ...prev,
                          serviceNeed: s.title,
                          details: `Inquiring about ${s.title}: ${s.subtitle}`
                        }));
                        const elem = document.getElementById('contact');
                        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                      }}
                      style={{
                        color: '#2563EB',
                        fontSize: '13px',
                        fontWeight: '700',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      Enquire about this service &rarr;
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- 3D STUDIO · LIVE DEMO SECTION --- */}
      <section id="studio" style={styles.sectionDark}>
        <div style={styles.container}>
          <div style={styles.sectionHeaderDark}>
            <span style={styles.sectionEyebrowCyan}>3D Studio · live demo</span>
            <h2 style={styles.sectionTitleDark}>This is rendering in your browser right now.</h2>
            <p style={styles.sectionSubtitleDark}>
              Change the shape, material, color and light. Drag the model to rotate it. This is the kind of interactive 3D we build into client websites, product pages and apps.
            </p>
          </div>

          <div className="studio-layout" style={styles.studioLayout}>
            {/* 3D Canvas Box */}
            <div style={styles.studioCanvasCol}>
              <StudioCanvas
                shape={studioShape}
                materialType={studioMaterial}
                colorHex={studioColor}
                rotationSpeed={studioRotationSpeed}
                lightAngle={studioLightAngle}
                autoRotate={studioAutoRotate}
              />
            </div>

            {/* Controls Palette */}
            <div style={styles.studioControlsCol}>
              <div style={styles.controlGroup}>
                <label style={styles.controlLabel}>Shape</label>
                <div style={styles.btnSelectorGrid}>
                  {[
                    { id: 'torus', label: 'Torus' },
                    { id: 'knot', label: 'Knot' },
                    { id: 'chakra', label: 'Chakra' },
                    { id: 'cube', label: 'Cube' },
                    { id: 'sphere', label: 'Sphere' },
                    { id: 'diamond', label: 'Diamond' }
                  ].map((sh) => (
                    <button
                      key={sh.id}
                      onClick={() => setStudioShape(sh.id)}
                      style={studioShape === sh.id ? styles.activeSelectBtn : styles.selectBtn}
                    >
                      {sh.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={styles.controlGroup}>
                <label style={styles.controlLabel}>Material</label>
                <div style={styles.btnSelectorGrid}>
                  {['wireframe', 'glossy', 'metallic', 'glass'].map((mat) => (
                    <button
                      key={mat}
                      onClick={() => setStudioMaterial(mat)}
                      style={studioMaterial === mat ? styles.activeSelectBtn : styles.selectBtn}
                    >
                      {mat.charAt(0).toUpperCase() + mat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div style={styles.controlGroup}>
                <label style={styles.controlLabel}>Color</label>
                <div style={styles.colorPaletteRow}>
                  {['#2563EB', '#06B6D4', '#F59E0B', '#10B981', '#8B5CF6', '#EF4444'].map((col) => (
                    <button
                      key={col}
                      onClick={() => setStudioColor(col)}
                      style={{
                        ...styles.colorCircle,
                        backgroundColor: col,
                        outline: studioColor === col ? '3px solid #FFFFFF' : 'none'
                      }}
                      aria-label={`Select color ${col}`}
                    />
                  ))}
                </div>
              </div>

              <div style={styles.controlGroup}>
                <div style={styles.sliderLabelRow}>
                  <label style={styles.controlLabel}>Rotation speed</label>
                  <span style={styles.sliderValue}>{studioRotationSpeed.toFixed(1)}×</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3.0"
                  step="0.1"
                  value={studioRotationSpeed}
                  onChange={(e) => setStudioRotationSpeed(parseFloat(e.target.value))}
                  style={styles.rangeInput}
                />
              </div>

              <div style={styles.controlGroup}>
                <div style={styles.sliderLabelRow}>
                  <label style={styles.controlLabel}>Light angle</label>
                  <span style={styles.sliderValue}>{studioLightAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={studioLightAngle}
                  onChange={(e) => setStudioLightAngle(parseInt(e.target.value))}
                  style={styles.rangeInput}
                />
              </div>

              <div style={styles.checkboxRow}>
                <input
                  type="checkbox"
                  id="autoRotateCheck"
                  checked={studioAutoRotate}
                  onChange={(e) => setStudioAutoRotate(e.target.checked)}
                  style={styles.checkbox}
                />
                <label htmlFor="autoRotateCheck" style={styles.checkboxLabel}>
                  Auto-rotate
                </label>
              </div>
            </div>
          </div>

          {/* 3D Capabilities Row */}
          <div style={styles.studioPillarsGrid}>
            <div style={styles.studioPillarCard}>
              <h4 style={styles.pillarTitle}>Product visualization</h4>
              <p style={styles.pillarText}>Photoreal renders and turntables for catalogs and launch pages.</p>
            </div>
            <div style={styles.studioPillarCard}>
              <h4 style={styles.pillarTitle}>Explainer animation</h4>
              <p style={styles.pillarText}>Short 3D films that make a complex product easy to grasp.</p>
            </div>
            <div style={styles.studioPillarCard}>
              <h4 style={styles.pillarTitle}>Interactive 3D for the web</h4>
              <p style={styles.pillarText}>Configurators and showcases that run in any modern browser.</p>
            </div>
            <div style={styles.studioPillarCard}>
              <h4 style={styles.pillarTitle}>AR-ready models</h4>
              <p style={styles.pillarText}>Optimized 3D assets for mobile augmented reality previews.</p>
            </div>
          </div>

          {/* --- 6 ANIMATED 3D FLIP CARDS --- */}
          <div style={styles.flipCardsWrapper}>
            <div style={styles.flipCardsHeader}>
              <h3 style={styles.flipCardsTitle}>3D Production Modules & Capabilities</h3>
              <p style={styles.flipCardsSubtitle}>Hover or tap any card to view detailed engineering deliverables and pipeline specifications.</p>
            </div>

            <div style={styles.flipCardsGrid}>
              {FLIP_CARDS.map((card) => (
                <div key={card.id} className="flip-card-container" style={styles.flipCardContainer}>
                  <div className="flip-card-inner" style={styles.flipCardInner}>
                    {/* Front */}
                    <div style={styles.flipCardFront}>
                      <span style={styles.cardIndexBadge}>0{card.id}</span>
                      <h4 style={styles.cardFrontTitle}>{card.frontTitle}</h4>
                      <p style={styles.cardFrontDesc}>{card.frontDesc}</p>
                      <span style={styles.flipHint}>Flip for details ↻</span>
                    </div>
                    {/* Back */}
                    <div style={styles.flipCardBack}>
                      <h4 style={styles.cardBackTitle}>{card.backTitle}</h4>
                      <p style={styles.cardBackDesc}>{card.backDesc}</p>
                      <a href="#contact" onClick={(e) => scrollTo(e, 'contact')} style={styles.cardBackCta}>
                        Inquire &rarr;
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- 5-STEP 3D PRODUCTION PIPELINE --- */}
          <div style={styles.pipelineWrapper}>
            <h3 style={styles.pipelineHeaderTitle}>Our 5-Step 3D Engineering Pipeline</h3>
            <div style={styles.pipelineGrid}>
              {PIPELINE_STEPS.map((ps, idx) => (
                <div key={idx} style={styles.pipelineStepCard}>
                  <div style={styles.pipelineStepNum}>{ps.step}</div>
                  <h4 style={styles.pipelineStepTitle}>{ps.title}</h4>
                  <p style={styles.pipelineStepDesc}>{ps.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* --- DELIVERABLE FORMATS CHIPS --- */}
          <div style={styles.formatsWrapper}>
            <h4 style={styles.formatsHeading}>Delivery Formats We Supply:</h4>
            <div style={styles.formatsChipList}>
              {DELIVERABLE_FORMATS.map((fmt, idx) => (
                <span key={idx} style={styles.formatChipItem}>{fmt}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- APPLICATIONS INTERACTIVE MOCKUP SHOWCASE --- */}
      <section id="applications" style={styles.sectionLight}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionEyebrow}>Applications</span>
            <h2 style={styles.sectionTitle}>Apps your customers open every day.</h2>
            <p style={styles.sectionSubtitle}>
              Tap a screen to see the kind of product we build. Move your pointer over the phone to tilt it.
            </p>
          </div>

          {/* Category Tabs */}
          <div style={styles.appCategoryTabs}>
            {[
              'E-commerce and marketplaces',
              'Booking and scheduling',
              'Learning platforms',
              'Logistics and field tracking',
              'Fintech and wallets',
              'Healthcare and clinics'
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveAppCategory(cat);
                  playClickSound('click');
                }}
                style={activeAppCategory === cat ? styles.activeAppTab : styles.appTab}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Interactive Phone Mockup Box */}
          <div className="phone-showcase" style={styles.phoneShowcaseWrapper}>
            <div
              onPointerMove={handlePhonePointerMove}
              onPointerLeave={handlePhonePointerLeave}
              style={{
                ...styles.phoneDeviceCard,
                transform: `perspective(1000px) rotateX(${phoneTilt.x}deg) rotateY(${phoneTilt.y}deg)`,
                transition: 'transform 0.12s ease-out'
              }}
            >
              <div style={styles.phoneSpeakerNotch} />

              <div style={styles.phoneScreenContent}>
                {/* Status Bar */}
                <div style={styles.phoneStatusBar}>
                  <span>9:41</span>
                  <span>5G • 100%</span>
                </div>

                {/* Header & Overview */}
                <div style={styles.appHeaderRow}>
                  <div>
                    <span style={styles.appGreeting}>Today's overview</span>
                    <h4 style={styles.appCategoryActiveTitle}>{activeAppCategory}</h4>
                  </div>
                  <span style={styles.livePulse}>● LIVE</span>
                </div>

                {(() => {
                  const currentMock = APP_MOCK_DATA[activeAppCategory] || APP_MOCK_DATA['E-commerce and marketplaces'];
                  return (
                    <>
                      <div style={styles.statsWidgetRow}>
                        {currentMock.stats.map((s, sIdx) => (
                          <div key={sIdx} style={styles.statWidget}>
                            <div style={styles.statValue}>{s.val}</div>
                            <div style={styles.statLabel}>{s.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Orders / Live Items List */}
                      <div style={styles.ordersSection}>
                        <div style={styles.ordersHeadingRow}>
                          <span style={styles.ordersHeading}>{currentMock.heading}</span>
                          <span style={styles.ordersFilter}>Live ({currentMock.items.length})</span>
                        </div>

                        {currentMock.items.map((item, itIdx) => (
                          <div key={itIdx} style={styles.orderItem}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden', paddingRight: '8px' }}>
                              <span style={{ fontWeight: 600, fontSize: '11px', color: '#0F172A', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                {item.id} · {item.title}
                              </span>
                              <span style={{ fontSize: '10px', color: '#64748B', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                {item.desc}
                              </span>
                            </div>
                            <span style={{ flexShrink: 0, ...(styles[item.statusStyle] || styles.statusReady) }}>
                              {item.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  );
                })()}

                {/* Live Support Chat Simulation */}
                <div style={styles.supportChatContainer}>
                  <div style={styles.chatHeader}>
                    <span>Support chat</span>
                    <span style={styles.chatOnline}>Online</span>
                  </div>

                  <div style={styles.chatMessagesArea}>
                    {supportChatMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        style={msg.sender === 'user' ? styles.chatMsgUser : styles.chatMsgBot}
                      >
                        {msg.text}
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleChatSend} style={styles.chatInputForm}>
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Type a message..."
                      style={styles.chatInput}
                    />
                    <button type="submit" style={styles.chatSendBtn}>
                      Send
                    </button>
                  </form>
                </div>

                {/* Real-time Toast Badges */}
                <div style={styles.floatingAlerts}>
                  <span style={styles.floatingAlert}>✓ Release deployed</span>
                  <span style={styles.floatingAlert}>🔔 New order received</span>
                </div>
              </div>
            </div>

            <div style={styles.phoneSideCta}>
              <h3 style={styles.sideCtaTitle}>Need an App Built for Your Industry?</h3>
              <p style={styles.sideCtaDesc}>
                Whether you are launching an on-demand marketplace, tracking field assets with offline sync, or managing medical clinics, we engineer end-to-end applications designed to handle high transaction volumes.
              </p>
              <a href="#estimate" onClick={(e) => scrollTo(e, 'estimate')} style={styles.planAppBtn}>
                Plan your app &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- INDUSTRIES WE SERVE --- */}
      <section id="industries" style={styles.section}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionEyebrow}>Industries we serve</span>
            <h2 style={styles.sectionTitle}>Software for the people who design and build the physical world.</h2>
            <p style={styles.sectionSubtitle}>
              Architecture, civil, structural, mechanical and EPC companies run on drawings, models, schedules and site data. We build the web and mobile software that connects them.
            </p>
          </div>

          <div className="building-layout" style={styles.industriesViewerLayout}>
            {/* 3D Building Viewer Canvas */}
            <div style={styles.buildingViewerCol}>
              <BuildingCanvas
                storeys={buildingStoreys}
                explodePercent={buildingExplode}
                showStructure={layerStructure}
                showServices={layerServices}
                showFacade={layerFacade}
                autoRotate={buildingAutoRotate}
              />
            </div>

            {/* Building Controls */}
            <div style={styles.buildingControlsCol}>
              <h3 style={styles.controlsHeading}>Model layers</h3>

              <div style={styles.buildingCheckboxGroup}>
                <label style={styles.checkLabel}>
                  <input
                    type="checkbox"
                    checked={layerStructure}
                    onChange={(e) => setLayerStructure(e.target.checked)}
                  />
                  <span>Structure (slabs and columns)</span>
                </label>

                <label style={styles.checkLabel}>
                  <input
                    type="checkbox"
                    checked={layerServices}
                    onChange={(e) => setLayerServices(e.target.checked)}
                  />
                  <span>Services (ducts and pipes)</span>
                </label>

                <label style={styles.checkLabel}>
                  <input
                    type="checkbox"
                    checked={layerFacade}
                    onChange={(e) => setLayerFacade(e.target.checked)}
                  />
                  <span>Facade glazing</span>
                </label>
              </div>

              <div style={styles.sliderControl}>
                <div style={styles.sliderLabelRow}>
                  <span style={styles.controlLabel}>Storeys</span>
                  <span style={styles.sliderValue}>{buildingStoreys}</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="24"
                  value={buildingStoreys}
                  onChange={(e) => setBuildingStoreys(parseInt(e.target.value))}
                  style={styles.rangeInput}
                />
              </div>

              <div style={styles.sliderControl}>
                <div style={styles.sliderLabelRow}>
                  <span style={styles.controlLabel}>Explode floors</span>
                  <span style={styles.sliderValue}>{buildingExplode}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={buildingExplode}
                  onChange={(e) => setBuildingExplode(parseInt(e.target.value))}
                  style={styles.rangeInput}
                />
              </div>

              <div style={styles.checkboxRow}>
                <input
                  type="checkbox"
                  id="bldAutoRotate"
                  checked={buildingAutoRotate}
                  onChange={(e) => setBuildingAutoRotate(e.target.checked)}
                  style={styles.checkbox}
                />
                <label htmlFor="bldAutoRotate" style={styles.checkboxLabel}>
                  Auto-rotate
                </label>
              </div>
            </div>
          </div>

          {/* 4 Industry Solution Cards */}
          <div style={styles.industrySolutionGrid}>
            {INDUSTRY_SOLUTIONS.map((sol, idx) => (
              <div key={idx} style={styles.solutionCard}>
                <h3 style={styles.solutionTitle}>{sol.title}</h3>
                <p style={styles.solutionDesc}>{sol.desc}</p>
                <ul style={styles.solutionBullets}>
                  {sol.bullets.map((b, bIdx) => (
                    <li key={bIdx} style={styles.bulletItem}>
                      <span style={styles.bulletDot}>•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Companies We Build For */}
          <div style={styles.chipsSection}>
            <h4 style={styles.chipsHeading}>Companies we build for</h4>
            <div style={styles.chipsRow}>
              {INDUSTRY_COMPANIES.map((c, idx) => (
                <span key={idx} style={styles.chipItem}>{c}</span>
              ))}
            </div>
          </div>

          {/* Built Around The Tools */}
          <div style={styles.chipsSection}>
            <h4 style={styles.chipsHeading}>Built around the tools your teams already use</h4>
            <div style={styles.chipsRow}>
              {INDUSTRY_TOOLS.map((t, idx) => (
                <span key={idx} style={styles.chipTool}>{t}</span>
              ))}
            </div>
          </div>

          <div style={styles.firmCtaRow}>
            <a href="#contact" onClick={(e) => scrollTo(e, 'contact')} style={styles.primaryCta}>
              Talk about software for your firm &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* --- SELECTED WORK (RING OF IDEAS) --- */}
      <section id="work" style={styles.sectionLight}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionEyebrow}>Selected work</span>
            <h2 style={styles.sectionTitle}>A ring of ideas we can build for you.</h2>
            <p style={styles.sectionSubtitle}>
              Use the arrows or wait for the ring to turn. These sample concepts show the range of products and visuals we take on.
            </p>
          </div>

          <div style={styles.ringCarouselBox}>
            {/* Concept Category Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '24px' }}>
              {['All', '3D & WebGL', 'Mobile & Offline', 'Backend & IoT', 'Web Platforms'].map((cat) => {
                const active = conceptFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      playClickSound('click');
                      setConceptFilter(cat);
                      const filtered = SAMPLE_CONCEPTS.filter((sc) => cat === 'All' || sc.category === cat);
                      if (filtered.length > 0) {
                        const targetIdx = SAMPLE_CONCEPTS.findIndex((sc) => sc.title === filtered[0].title);
                        if (targetIdx !== -1) setRingIndex(targetIdx);
                      }
                    }}
                    style={{
                      backgroundColor: active ? '#2563EB' : (isDark ? '#1E293B' : '#FFFFFF'),
                      color: active ? '#FFFFFF' : (isDark ? '#CBD5E1' : '#475569'),
                      border: active ? '1px solid #2563EB' : (isDark ? '1px solid #334155' : '1px solid #CBD5E1'),
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '12.5px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div style={styles.ringControlsRow}>
              <button
                onClick={() => {
                  playClickSound('click');
                  setRingIndex((prev) => (prev === 0 ? SAMPLE_CONCEPTS.length - 1 : prev - 1));
                }}
                style={styles.ringArrowBtn}
                aria-label="Previous concept"
              >
                &larr; Prev
              </button>
              <span style={styles.ringIndicator}>
                {ringIndex + 1} / {SAMPLE_CONCEPTS.length}
              </span>
              <button
                onClick={() => {
                  playClickSound('click');
                  setRingIndex((prev) => (prev + 1) % SAMPLE_CONCEPTS.length);
                }}
                style={styles.ringArrowBtn}
                aria-label="Next concept"
              >
                Next &rarr;
              </button>
            </div>

            <div style={styles.conceptRingTabs}>
              {SAMPLE_CONCEPTS.map((sc, idx) => {
                const isMatch = conceptFilter === 'All' || sc.category === conceptFilter;
                if (!isMatch) return null;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      playClickSound('click');
                      setRingIndex(idx);
                    }}
                    style={ringIndex === idx ? styles.activeRingTab : styles.ringTab}
                  >
                    <span style={styles.ringTabNum}>0{idx + 1}</span>
                    <span style={styles.ringTabLabel}>{sc.title}</span>
                  </button>
                );
              })}
            </div>

            <div style={styles.ringCardDisplay}>
              <span style={styles.conceptTag}>{SAMPLE_CONCEPTS[ringIndex].tag}</span>
              <h3 style={styles.conceptTitle}>{SAMPLE_CONCEPTS[ringIndex].title}</h3>
              <p style={styles.conceptDesc}>{SAMPLE_CONCEPTS[ringIndex].desc}</p>

              {/* Tech Stack Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', margin: '4px 0 16px 0' }}>
                {SAMPLE_CONCEPTS[ringIndex].stack?.map((stk, sIdx) => (
                  <span key={sIdx} style={{
                    backgroundColor: isDark ? '#1E293B' : '#EFF6FF',
                    color: isDark ? '#93C5FD' : '#2563EB',
                    border: isDark ? '1px solid #334155' : '1px solid #BFDBFE',
                    fontSize: '11.5px',
                    fontWeight: '600',
                    padding: '3px 9px',
                    borderRadius: '6px'
                  }}>
                    {stk}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                  onClick={() => setConceptModalData(SAMPLE_CONCEPTS[ringIndex])}
                  style={{
                    backgroundColor: isDark ? '#1E293B' : '#F1F5F9',
                    color: isDark ? '#F1F5F9' : '#0F172A',
                    border: isDark ? '1px solid #334155' : '1px solid #CBD5E1',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  📐 Architecture Specs
                </button>
                <button
                  onClick={() => {
                    setContactData((prev) => ({
                      ...prev,
                      serviceNeed: SAMPLE_CONCEPTS[ringIndex].title,
                      details: `Interested in discussing concept: ${SAMPLE_CONCEPTS[ringIndex].title} (${SAMPLE_CONCEPTS[ringIndex].tag})`
                    }));
                    const elem = document.getElementById('contact');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={styles.conceptInquireBtn}
                >
                  Discuss this concept &rarr;
                </button>
              </div>
            </div>

            <p style={styles.sampleDisclaimer}>
              Sample concepts shown for illustration, not client projects.
            </p>
          </div>
        </div>
      </section>

      {/* --- ENGINEERING INSIGHTS & ARTICLES --- */}
      <section id="insights" style={{
        backgroundColor: isDark ? '#0A0F1D' : '#F8FAFC',
        borderTop: isDark ? '1px solid #1E293B' : '1px solid #E2E8F0',
        borderBottom: isDark ? '1px solid #1E293B' : '1px solid #E2E8F0',
        padding: '80px 0'
      }}>
        <div style={styles.container}>
          <RevealSection>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionEyebrow}>Technical Insights</span>
              <h2 style={styles.sectionTitle}>How we solve hard engineering problems.</h2>
              <p style={styles.sectionSubtitle}>
                Articles and architectural write-ups from our engineers on WebGL optimization, distributed systems, and offline-first mobile apps.
              </p>
            </div>
          </RevealSection>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginTop: '36px'
          }}>
            {BLOG_POSTS.map((post) => (
              <div
                key={post.id}
                style={{
                  backgroundColor: isDark ? '#111827' : '#FFFFFF',
                  border: isDark ? '1px solid #1F2937' : '1px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  cursor: 'pointer'
                }}
                onClick={() => setActiveArticle(post)}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '800',
                      color: '#2563EB',
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px',
                      backgroundColor: isDark ? 'rgba(37,99,235,0.15)' : '#EFF6FF',
                      padding: '4px 10px',
                      borderRadius: '6px'
                    }}>
                      {post.category}
                    </span>
                    <span style={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B' }}>
                      {post.date} · {post.readTime}
                    </span>
                  </div>

                  <h3 style={{
                    fontSize: '19px',
                    fontWeight: '800',
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    lineHeight: '1.4',
                    margin: '0 0 12px 0'
                  }}>
                    {post.title}
                  </h3>

                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: isDark ? '#94A3B8' : '#64748B',
                    margin: '0 0 20px 0'
                  }}>
                    {post.excerpt}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {post.tags.map((t, idx) => (
                      <span key={idx} style={{
                        fontSize: '11.5px',
                        fontWeight: '600',
                        color: isDark ? '#CBD5E1' : '#475569',
                        backgroundColor: isDark ? '#1E293B' : '#F1F5F9',
                        padding: '3px 8px',
                        borderRadius: '4px'
                      }}>
                        #{t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveArticle(post);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      color: '#2563EB',
                      fontWeight: '700',
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    Read article &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Developer Code Terminal Explorer */}
          <div style={{
            marginTop: '56px',
            backgroundColor: isDark ? '#080D1A' : '#0F172A',
            border: isDark ? '1px solid #1E293B' : '1px solid #334155',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}>
            {/* Terminal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 18px',
              backgroundColor: isDark ? '#050811' : '#090E17',
              borderBottom: '1px solid rgba(255,255,255,0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                <div style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                <div style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                <span style={{ fontSize: '12px', color: '#64748B', marginLeft: '12px', fontFamily: 'monospace' }}>
                  abhimanyu-tech / codebase-peek
                </span>
              </div>
              <button
                onClick={handleCopyCode}
                style={{
                  backgroundColor: codeCopied ? '#10B981' : 'rgba(255,255,255,0.08)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.15s ease'
                }}
              >
                {codeCopied ? '✓ Copied!' : '📋 Copy Code'}
              </button>
            </div>

            {/* Terminal File Tabs */}
            <div style={{
              display: 'flex',
              backgroundColor: isDark ? '#0A0F1D' : '#0D1524',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              overflowX: 'auto'
            }}>
              {[
                { id: '3d', label: 'WebGL3DShader.ts', icon: '🌐' },
                { id: 'telematics', label: 'TelematicsStream.ts', icon: '⚡' },
                { id: 'crdt', label: 'OfflineCRDTSync.dart', icon: '📱' }
              ].map((tab) => {
                const active = activeCodeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCodeTab(tab.id)}
                    style={{
                      backgroundColor: active ? (isDark ? '#080D1A' : '#0F172A') : 'transparent',
                      color: active ? '#60A5FA' : '#94A3B8',
                      border: 'none',
                      borderBottom: active ? '2px solid #2563EB' : '2px solid transparent',
                      padding: '10px 18px',
                      fontSize: '12.5px',
                      fontFamily: 'monospace',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Code Body */}
            <div style={{ padding: '20px 24px', overflowX: 'auto' }}>
              <pre style={{
                margin: 0,
                color: '#E2E8F0',
                fontSize: '13px',
                lineHeight: '1.65',
                fontFamily: 'Consolas, Monaco, "Courier New", monospace'
              }}>
                <code>{CODE_SNIPPETS[activeCodeTab].code}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW WE WORK --- */}
      <section id="process" style={styles.section}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionEyebrow}>How we work</span>
            <h2 style={styles.sectionTitle}>Four steps from idea to a product that stays healthy.</h2>
          </div>

          <div style={styles.processGrid}>
            {PROCESS_STEPS.map((ps, idx) => (
              <div key={idx} style={styles.processCard}>
                <div style={styles.stepBadge}>{ps.step}</div>
                <h3 style={styles.processStepTitle}>{ps.title}</h3>
                <p style={styles.processStepDesc}>{ps.desc}</p>
              </div>
            ))}
          </div>

          {/* Client Onboarding Sprint Roadmap */}
          <div style={{
            marginTop: '56px',
            backgroundColor: isDark ? '#111827' : '#F8FAFC',
            border: isDark ? '1px solid #1F2937' : '1px solid #E2E8F0',
            borderRadius: '20px',
            padding: '36px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.04)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                Fast-Track Kickoff
              </span>
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: isDark ? '#FFFFFF' : '#0F172A', margin: '6px 0 0 0' }}>
                What Your First 30 Days Look Like
              </h3>
              <p style={{ fontSize: '14px', color: isDark ? '#94A3B8' : '#64748B', maxWidth: '540px', margin: '8px auto 0 auto' }}>
                We eliminate the traditional agency delay. Here is how we take you from signed contract to a working demo in 14 days.
              </p>
            </div>

            {/* Week Selector Tabs */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '28px' }}>
              {ONBOARDING_WEEKS.map((w, idx) => {
                const active = activeRoadmapWeek === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      playClickSound('click');
                      setActiveRoadmapWeek(idx);
                    }}
                    style={{
                      backgroundColor: active ? '#2563EB' : (isDark ? '#1E293B' : '#FFFFFF'),
                      color: active ? '#FFFFFF' : (isDark ? '#CBD5E1' : '#475569'),
                      border: active ? '1px solid #2563EB' : (isDark ? '1px solid #334155' : '1px solid #CBD5E1'),
                      padding: '10px 20px',
                      borderRadius: '12px',
                      fontSize: '13.5px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: active ? '0 4px 14px rgba(37,99,235,0.25)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>{w.week}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Week Deliverables Card */}
            <div style={{
              backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
              border: isDark ? '1px solid #1E293B' : '1px solid #E2E8F0',
              borderRadius: '16px',
              padding: '28px'
            }}>
              <div style={{ marginBottom: '18px' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#2563EB', textTransform: 'uppercase' }}>
                  {ONBOARDING_WEEKS[activeRoadmapWeek].week} Milestone
                </span>
                <h4 style={{ fontSize: '19px', fontWeight: '800', color: isDark ? '#FFFFFF' : '#0F172A', margin: '4px 0 2px 0' }}>
                  {ONBOARDING_WEEKS[activeRoadmapWeek].title}
                </h4>
                <p style={{ fontSize: '13.5px', color: isDark ? '#94A3B8' : '#64748B', margin: 0 }}>
                  {ONBOARDING_WEEKS[activeRoadmapWeek].subtitle}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
                {ONBOARDING_WEEKS[activeRoadmapWeek].deliverables.map((item, dIdx) => (
                  <div
                    key={dIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      padding: '12px 14px',
                      backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC',
                      borderRadius: '10px',
                      border: isDark ? '1px solid #1E293B' : '1px solid #F1F5F9'
                    }}
                  >
                    <span style={{ color: '#10B981', fontSize: '15px', fontWeight: 'bold', marginTop: '-1px' }}>✓</span>
                    <span style={{ fontSize: '13.5px', color: isDark ? '#E2E8F0' : '#334155', lineHeight: '1.45' }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Phase Navigation Bar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '24px',
                paddingTop: '16px',
                borderTop: isDark ? '1px solid #1E293B' : '1px solid #F1F5F9',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    disabled={activeRoadmapWeek === 0}
                    onClick={() => {
                      playClickSound('click');
                      setActiveRoadmapWeek((prev) => Math.max(0, prev - 1));
                    }}
                    style={{
                      backgroundColor: 'transparent',
                      color: activeRoadmapWeek === 0 ? (isDark ? '#475569' : '#94A3B8') : (isDark ? '#CBD5E1' : '#334155'),
                      border: isDark ? '1px solid #334155' : '1px solid #CBD5E1',
                      padding: '7px 14px',
                      borderRadius: '8px',
                      fontSize: '12.5px',
                      fontWeight: '600',
                      cursor: activeRoadmapWeek === 0 ? 'not-allowed' : 'pointer',
                      opacity: activeRoadmapWeek === 0 ? 0.5 : 1
                    }}
                  >
                    ← Previous Phase
                  </button>
                  <button
                    disabled={activeRoadmapWeek === ONBOARDING_WEEKS.length - 1}
                    onClick={() => {
                      playClickSound('click');
                      setActiveRoadmapWeek((prev) => Math.min(ONBOARDING_WEEKS.length - 1, prev + 1));
                    }}
                    style={{
                      backgroundColor: activeRoadmapWeek === ONBOARDING_WEEKS.length - 1 ? 'transparent' : '#2563EB',
                      color: activeRoadmapWeek === ONBOARDING_WEEKS.length - 1 ? (isDark ? '#475569' : '#94A3B8') : '#FFFFFF',
                      border: activeRoadmapWeek === ONBOARDING_WEEKS.length - 1 ? (isDark ? '1px solid #334155' : '1px solid #CBD5E1') : '1px solid #2563EB',
                      padding: '7px 16px',
                      borderRadius: '8px',
                      fontSize: '12.5px',
                      fontWeight: '700',
                      cursor: activeRoadmapWeek === ONBOARDING_WEEKS.length - 1 ? 'not-allowed' : 'pointer',
                      opacity: activeRoadmapWeek === ONBOARDING_WEEKS.length - 1 ? 0.5 : 1
                    }}
                  >
                    Next Phase →
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B' }}>
                    Phase {activeRoadmapWeek + 1} of {ONBOARDING_WEEKS.length}
                  </span>
                  <div style={{ display: 'flex', gap: '4px', marginLeft: '6px' }}>
                    {ONBOARDING_WEEKS.map((_, dotIdx) => (
                      <div
                        key={dotIdx}
                        onClick={() => {
                          playClickSound('click');
                          setActiveRoadmapWeek(dotIdx);
                        }}
                        style={{
                          width: dotIdx === activeRoadmapWeek ? '20px' : '6px',
                          height: '6px',
                          borderRadius: '3px',
                          backgroundColor: dotIdx === activeRoadmapWeek ? '#2563EB' : (isDark ? '#334155' : '#CBD5E1'),
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section style={{
        backgroundColor: isDark ? '#0A0F1D' : '#FFFFFF',
        borderBottom: isDark ? '1px solid #1E293B' : '1px solid #E2E8F0',
        padding: '72px 0'
      }}>
        <div style={styles.container}>
          <RevealSection>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionEyebrow}>Why choose us</span>
              <h2 style={styles.sectionTitle}>Six reasons businesses stay with us.</h2>
              <p style={styles.sectionSubtitle}>
                We're a small team that ships like a large one, with none of the agency overhead.
              </p>
            </div>
          </RevealSection>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginTop: '40px'
          }}>
            {[
              { icon: '🔑', title: 'You own everything', desc: 'Full source code, all accounts, every design asset — handed over at the end of the project with no lock-in.' },
              { icon: '⚡', title: 'Two-week sprint demos', desc: 'Every fortnight you see a working demo. No waiting months to find out the build went in the wrong direction.' },
              { icon: '🔒', title: 'Security by default', desc: 'OWASP Top 10 checks, monthly dependency auditing, and HTTPS everywhere baked into every project from day one.' },
              { icon: '🌐', title: 'In-house 3D & WebGL', desc: 'We don\'t outsource 3D. Our engineers write the shaders. That means faster iteration and consistent quality.' },
              { icon: '📊', title: 'Full transparency', desc: 'Shared project board, automated test reports, a monthly health dashboard, and a single point of contact who responds same day.' },
              { icon: '🤝', title: 'Fixed price or monthly team', desc: 'Well-scoped projects get a fixed price. Evolving products get a monthly team you can scale up or down any quarter.' }
            ].map((item, i) => (
              <RevealSection key={i} delay={i * 80}>
                <div style={{
                  backgroundColor: isDark ? '#111827' : '#F8FAFC',
                  border: isDark ? '1px solid #1F2937' : '1px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '28px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  <span style={{ fontSize: '28px' }}>{item.icon}</span>
                  <h3 style={{
                    fontSize: '17px',
                    fontWeight: '700',
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    margin: 0
                  }}>{item.title}</h3>
                  <p style={{
                    fontSize: '14px',
                    color: isDark ? '#94A3B8' : '#475569',
                    lineHeight: '1.6',
                    margin: 0
                  }}>{item.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>

          {/* Studio Comparison Table */}
          <div style={{
            marginTop: '48px',
            backgroundColor: isDark ? '#111827' : '#F8FAFC',
            border: isDark ? '1px solid #1F2937' : '1px solid #E2E8F0',
            borderRadius: '20px',
            padding: '32px',
            overflowX: 'auto'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                How We Compare
              </span>
              <h3 style={{ fontSize: '22px', fontWeight: '800', color: isDark ? '#FFFFFF' : '#0F172A', margin: '6px 0 0 0' }}>
                Traditional Agency vs. Abhimanyu Technologies Studio
              </h3>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: isDark ? '1px solid #1F2937' : '1px solid #E2E8F0' }}>
                  <th style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '700', color: isDark ? '#94A3B8' : '#64748B' }}>
                    Criteria
                  </th>
                  <th style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '700', color: isDark ? '#94A3B8' : '#64748B' }}>
                    Traditional Agency / Outsourcing
                  </th>
                  <th style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '700', color: '#2563EB' }}>
                    Abhimanyu Technologies
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: 'First Working Demo',
                    traditional: '6 to 10 weeks of slide decks & wireframes',
                    ours: 'Working demo by Sprint 1 (within 14 days)'
                  },
                  {
                    feature: 'IP & Source Code Ownership',
                    traditional: 'Vendor lock-in, proprietary runtime licenses',
                    ours: '100% full IP transfer & repository access from Day 1'
                  },
                  {
                    feature: '3D WebGL & Interactive Visuals',
                    traditional: 'Sub-contracted to third-party 3D studios',
                    ours: 'In-house Three.js & WebGL shader engineering'
                  },
                  {
                    feature: 'Post-Launch Support & SLAs',
                    traditional: 'Standard 9-to-5 ticket queue, slow escalation',
                    ours: 'Guaranteed 1-hour critical response SLA (24x7 option)'
                  },
                  {
                    feature: 'Contract Flexibility',
                    traditional: 'Rigid 12-month lock-in contracts',
                    ours: 'Sprint-based agile teams you can scale or pause'
                  }
                ].map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    style={{
                      borderBottom: isDark ? '1px solid #1E293B' : '1px solid #F1F5F9',
                      backgroundColor: rIdx % 2 === 0 ? 'transparent' : (isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.015)')
                    }}
                  >
                    <td style={{ padding: '14px 16px', fontSize: '14px', fontWeight: '700', color: isDark ? '#F1F5F9' : '#0F172A' }}>
                      {row.feature}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '13.5px', color: isDark ? '#94A3B8' : '#64748B' }}>
                      <span style={{ color: '#EF4444', marginRight: '6px' }}>✕</span>
                      {row.traditional}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '13.5px', fontWeight: '600', color: isDark ? '#60A5FA' : '#1D4ED8' }}>
                      <span style={{ color: '#10B981', marginRight: '6px' }}>✓</span>
                      {row.ours}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* --- GLOBAL ENGAGEMENT & CLOUD FOOTPRINT --- */}
      <section id="global-presence" style={{
        backgroundColor: isDark ? '#070C18' : '#F1F5F9',
        borderBottom: isDark ? '1px solid #1E293B' : '1px solid #E2E8F0',
        padding: '64px 0'
      }}>
        <div style={styles.container}>
          <RevealSection>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionEyebrow}>Global Delivery Model</span>
              <h2 style={styles.sectionTitle}>Engineered in India. Deployed Worldwide.</h2>
              <p style={styles.sectionSubtitle}>
                We partner with high-growth startups and multinational enterprises across 5 global regions with synchronized timezones and local cloud data residency.
              </p>
            </div>
          </RevealSection>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginTop: '36px'
          }}>
            {[
              {
                flag: '🇮🇳',
                region: 'India (HQ & Core Studio)',
                city: 'Telangana & Hyderabad Hub',
                tz: 'IST (UTC+5:30)',
                cloud: 'AWS ap-south-1 / GCP asia-south1',
                highlight: 'Global R&D, 3D Graphics Lab & Agile Sprint Pods',
                status: 'HQ Active'
              },
              {
                flag: '🇺🇸',
                region: 'North America',
                city: 'New York & San Francisco Alignment',
                tz: 'EST / PST (4h Daily Overlap)',
                cloud: 'AWS us-east-1 / us-west-2',
                highlight: 'SOC-2 readiness, Delaware corporate contracting',
                status: 'Sprint Sync Ready'
              },
              {
                flag: '🇬🇧',
                region: 'United Kingdom & Europe',
                city: 'London & Frankfurt Hubs',
                tz: 'GMT / BST / CET (5h Daily Overlap)',
                cloud: 'AWS eu-west-1 / eu-central-1',
                highlight: 'GDPR strict privacy compliance & localized CDNs',
                status: 'Sprint Sync Ready'
              },
              {
                flag: '🇦🇪',
                region: 'Middle East & GCC',
                city: 'Dubai & Riyadh Engagements',
                tz: 'GST (UTC+4 • 6.5h Full Overlap)',
                cloud: 'AWS me-central-1 / me-south-1',
                highlight: 'GCC data residency, FinTech & logistics platforms',
                status: 'Full Day Overlap'
              },
              {
                flag: '🇸🇬',
                region: 'Southeast Asia & APAC',
                city: 'Singapore & Sydney Alignment',
                tz: 'SGT (UTC+8 • 7h Direct Overlap)',
                cloud: 'AWS ap-southeast-1',
                highlight: 'Cross-border commerce, high-frequency IoT streaming',
                status: 'Direct Day Overlap'
              }
            ].map((hub, hIdx) => (
              <RevealSection key={hIdx} delay={hIdx * 80}>
                <div style={{
                  backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
                  border: isDark ? '1px solid #1E293B' : '1px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '24px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '26px' }}>{hub.flag}</span>
                      <strong style={{ fontSize: '15.5px', color: isDark ? '#FFFFFF' : '#0F172A' }}>{hub.region}</strong>
                    </div>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      backgroundColor: isDark ? 'rgba(37,99,235,0.2)' : '#EFF6FF',
                      color: isDark ? '#93C5FD' : '#2563EB',
                      padding: '2px 8px',
                      borderRadius: '12px'
                    }}>
                      ● {hub.status}
                    </span>
                  </div>

                  <div style={{ fontSize: '12.5px', fontWeight: '600', color: isDark ? '#38BDF8' : '#0284C7' }}>
                    {hub.city} · {hub.tz}
                  </div>

                  <div style={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B', backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC', padding: '8px 10px', borderRadius: '8px', border: isDark ? '1px solid #1E293B' : '1px solid #F1F5F9' }}>
                    <strong>Cloud Edge:</strong> {hub.cloud}
                  </div>

                  <p style={{ margin: 'auto 0 0 0', fontSize: '13px', color: isDark ? '#CBD5E1' : '#475569', lineHeight: '1.5' }}>
                    {hub.highlight}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROJECT ESTIMATOR --- */}
      <section id="estimate" style={styles.sectionLight}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionEyebrow}>Project estimator</span>
            <h2 style={styles.sectionTitle}>See a realistic timeline in thirty seconds.</h2>
            <p style={styles.sectionSubtitle}>
              Choose what you want to build. The estimate updates as you click, and you can send it with your enquiry.
            </p>
          </div>

          <div className="estimator-grid" style={styles.estimatorGrid}>
            {/* Options Side */}
            <div style={styles.estimatorOptions}>
              <div style={styles.estimatorGroup}>
                <h4 style={styles.estLabel}>What are you building?</h4>
                <div style={styles.estTypeSelectGrid}>
                  {[
                    'Mobile app development',
                    'Web application development',
                    'Application maintenance',
                    '3D animation and visuals',
                    'IT services and consulting',
                    'Cloud and DevOps'
                  ].map((t) => (
                    <button
                      key={t}
                      onClick={() => setEstBuildingType(t)}
                      style={estBuildingType === t ? styles.estTypeBtnActive : styles.estTypeBtn}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div style={styles.estimatorGroup}>
                <h4 style={styles.estLabel}>Features</h4>
                <div style={styles.estFeaturesGrid}>
                  {[
                    { key: 'auth', label: 'User accounts & authentication' },
                    { key: 'payments', label: 'Payment gateway integration' },
                    { key: 'realtime', label: 'Real-time chat & notifications' },
                    { key: 'threeD', label: '3D WebGL / Interactive model' },
                    { key: 'admin', label: 'Admin dashboard & analytics' },
                    { key: 'offline', label: 'Offline data & background sync' },
                    { key: 'ai', label: 'AI chatbot & automation' }
                  ].map((feat) => (
                    <label key={feat.key} style={styles.featureCheckboxLabel}>
                      <input
                        type="checkbox"
                        checked={estFeatures[feat.key]}
                        onChange={(e) =>
                          setEstFeatures({ ...estFeatures, [feat.key]: e.target.checked })
                        }
                      />
                      <span>{feat.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div style={styles.estimatorGroup}>
                <h4 style={styles.estLabel}>Complexity</h4>
                <div style={styles.complexityBtnRow}>
                  {['Standard', 'Complex', 'High Performance'].map((comp) => (
                    <button
                      key={comp}
                      onClick={() => setEstComplexity(comp)}
                      style={estComplexity === comp ? styles.compBtnActive : styles.compBtn}
                    >
                      {comp}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Side */}
            <div style={styles.estimatorResultBox}>
              <div style={styles.estResultCard}>
                <div style={styles.resultItem}>
                  <span style={styles.resultLabel}>Indicative timeline</span>
                  <div style={styles.timelineBigNumber}>{calcTimelineWeeks()}</div>
                </div>

                <div style={styles.resultItem}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={styles.resultLabel}>Indicative investment</span>
                    <div style={{ display: 'flex', gap: '3px', backgroundColor: isDark ? '#1E293B' : '#F1F5F9', padding: '2px', borderRadius: '6px', flexWrap: 'wrap' }}>
                      {[
                        { code: 'INR', label: '₹ INR' },
                        { code: 'USD', label: '$ USD' },
                        { code: 'EUR', label: '€ EUR' },
                        { code: 'GBP', label: '£ GBP' }
                      ].map((curr) => (
                        <button
                          key={curr.code}
                          onClick={() => {
                            setEstCurrency(curr.code);
                            playClickSound('click');
                          }}
                          style={{
                            background: estCurrency === curr.code ? '#2563EB' : 'transparent',
                            color: estCurrency === curr.code ? '#FFFFFF' : (isDark ? '#94A3B8' : '#64748B'),
                            border: 'none',
                            borderRadius: '4px',
                            padding: '2px 7px',
                            fontSize: '11px',
                            fontWeight: '700',
                            cursor: 'pointer'
                          }}
                        >
                          {curr.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{ ...styles.timelineBigNumber, color: '#10B981', fontSize: '28px', marginTop: '2px' }}>
                    {calcEstimatedBudget()}
                  </div>
                </div>

                <div style={styles.resultItem}>
                  <span style={styles.resultLabel}>Suggested team</span>
                  <div style={styles.teamDescription}>{calcSuggestedTeam()}</div>
                </div>

                <div style={styles.resultItem}>
                  <span style={styles.resultLabel}>Phase split</span>
                  <div style={styles.phaseBar}>
                    <div style={{ ...styles.phaseSegment, width: '15%', backgroundColor: '#38BDF8' }} title="Discovery (15%)">15%</div>
                    <div style={{ ...styles.phaseSegment, width: '20%', backgroundColor: '#60A5FA' }} title="Design (20%)">20%</div>
                    <div style={{ ...styles.phaseSegment, width: '50%', backgroundColor: '#2563EB' }} title="Development (50%)">50%</div>
                    <div style={{ ...styles.phaseSegment, width: '15%', backgroundColor: '#10B981' }} title="QA & Launch (15%)">15%</div>
                  </div>
                  <div style={styles.phaseLabels}>
                    <span>Discover</span>
                    <span>Design</span>
                    <span>Develop</span>
                    <span>Launch</span>
                  </div>
                </div>

                <p style={styles.estNotice}>
                  Indicative only. We confirm scope, cost and dates after a short discovery call.
                </p>

                <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                  <button onClick={handleSendEstimateToContact} style={{ ...styles.sendEstimateBtn, flex: 2, margin: 0, minWidth: '160px' }}>
                    Send this estimate &rarr;
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound('click');
                      const activeFeats = Object.keys(estFeatures).filter((k) => estFeatures[k]).join(', ');
                      const summary = `Abhimanyu Technologies - Project Estimate\n\nProject Type: ${estBuildingType}\nFeatures: ${activeFeats || 'Standard'}\nComplexity: ${estComplexity}\nIndicative Timeline: ${calcTimelineWeeks()}\nEstimated Budget: ${calcEstimatedBudget()}\nSuggested Team: ${calcSuggestedTeam()}`;
                      navigator.clipboard?.writeText(summary);
                      setEstimateCopied(true);
                      setTimeout(() => setEstimateCopied(false), 2000);
                    }}
                    style={{
                      flex: 1,
                      backgroundColor: estimateCopied ? '#10B981' : (isDark ? '#1E293B' : '#F1F5F9'),
                      color: estimateCopied ? '#FFFFFF' : (isDark ? '#F1F5F9' : '#0F172A'),
                      border: isDark ? '1px solid #334155' : '1px solid #CBD5E1',
                      borderRadius: '8px',
                      padding: '12px 14px',
                      fontWeight: '700',
                      fontSize: '13px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s ease'
                    }}
                    title="Copy full project estimate specs to clipboard"
                  >
                    {estimateCopied ? '✓ Copied' : '📋 Copy Spec'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound('click');
                      window.print();
                    }}
                    style={{
                      flex: 1,
                      backgroundColor: isDark ? '#1E293B' : '#F8FAFC',
                      color: isDark ? '#93C5FD' : '#2563EB',
                      border: isDark ? '1px solid #334155' : '1px solid #BFDBFE',
                      borderRadius: '8px',
                      padding: '12px 14px',
                      fontWeight: '700',
                      fontSize: '13px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      transition: 'all 0.15s ease'
                    }}
                    title="Print or Save Project Estimate as PDF"
                  >
                    🖨️ Print
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadRFP}
                    style={{
                      flex: 1,
                      backgroundColor: isDark ? '#1E293B' : '#F8FAFC',
                      color: isDark ? '#93C5FD' : '#2563EB',
                      border: isDark ? '1px solid #334155' : '1px solid #BFDBFE',
                      borderRadius: '8px',
                      padding: '12px 14px',
                      fontWeight: '700',
                      fontSize: '13px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      transition: 'all 0.15s ease'
                    }}
                    title="Download complete Project Scope RFP Brief (.md)"
                  >
                    📥 RFP Brief
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Client ROI & Cost Savings Calculator */}
          <div style={{
            marginTop: '56px',
            backgroundColor: isDark ? '#111827' : '#FFFFFF',
            border: isDark ? '1px solid #1F2937' : '1px solid #E2E8F0',
            borderRadius: '20px',
            padding: '36px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                Cost Efficiency Model
              </span>
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: isDark ? '#FFFFFF' : '#0F172A', margin: '6px 0 0 0' }}>
                Calculate Your Cost & Time Savings
              </h3>
              <p style={{ fontSize: '14px', color: isDark ? '#94A3B8' : '#64748B', maxWidth: '540px', margin: '8px auto 0 auto' }}>
                Compare the real total cost of in-house recruitment and payroll overhead versus our dedicated sprint teams.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '28px',
              alignItems: 'center'
            }}>
              {/* Sliders Side */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ fontSize: '13.5px', fontWeight: '700', color: isDark ? '#F1F5F9' : '#0F172A' }}>
                      Engineers Needed:
                    </label>
                    <span style={{ fontSize: '14px', fontWeight: '800', color: '#2563EB' }}>
                      {roiTeamSize} {roiTeamSize === 1 ? 'Engineer' : 'Engineers'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    step="1"
                    value={roiTeamSize}
                    onChange={(e) => setRoiTeamSize(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#2563EB', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>
                    <span>1 (Focused MVP)</span>
                    <span>3 (Full Squad)</span>
                    <span>6 (Scale-up)</span>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ fontSize: '13.5px', fontWeight: '700', color: isDark ? '#F1F5F9' : '#0F172A' }}>
                      Project Horizon:
                    </label>
                    <span style={{ fontSize: '14px', fontWeight: '800', color: '#2563EB' }}>
                      {roiDuration} Months
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="12"
                    step="1"
                    value={roiDuration}
                    onChange={(e) => setRoiDuration(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#2563EB', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>
                    <span>3 Months</span>
                    <span>6 Months</span>
                    <span>12 Months</span>
                  </div>
                </div>

                <div style={{
                  backgroundColor: isDark ? '#1E293B' : '#F8FAFC',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  fontSize: '12.5px',
                  color: isDark ? '#94A3B8' : '#64748B',
                  lineHeight: '1.5'
                }}>
                  💡 <em>In-house estimate factors in recruitment agency fees (15%), workstation/benefits (20%), and 8 weeks recruitment lag time.</em>
                </div>
              </div>

              {/* Savings Results Card */}
              <div style={{
                backgroundColor: isDark ? '#0A0F1D' : '#EFF6FF',
                border: isDark ? '1px solid #1E293B' : '1px solid #BFDBFE',
                borderRadius: '16px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                <div>
                  <span style={{ fontSize: '11.5px', fontWeight: '700', textTransform: 'uppercase', color: '#2563EB' }}>
                    Estimated Net Cost Saved
                  </span>
                  <div style={{ fontSize: '32px', fontWeight: '900', color: '#10B981', margin: '4px 0' }}>
                    {estCurrency === 'INR'
                      ? `₹${((roiTeamSize * roiDuration * 80000) / 100000).toFixed(1)} Lakhs+`
                      : `$${Math.round((roiTeamSize * roiDuration * 80000) / 85).toLocaleString()}+`}
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: isDark ? '#94A3B8' : '#475569' }}>
                    (~41% overall savings vs. in-house hiring overhead)
                  </span>
                </div>

                <div style={{ borderTop: isDark ? '1px solid #1E293B' : '1px solid #DBEAFE', paddingTop: '12px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', color: isDark ? '#CBD5E1' : '#334155' }}>Recruitment Time Saved:</span>
                  <strong style={{ fontSize: '13px', color: '#2563EB' }}>~8 to 10 Weeks</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', color: isDark ? '#CBD5E1' : '#334155' }}>Kickoff Speed:</span>
                  <strong style={{ fontSize: '13px', color: '#10B981' }}>Within 48-72 Hours</strong>
                </div>

                <button
                  onClick={() => {
                    setContactData((prev) => ({
                      ...prev,
                      serviceNeed: 'Dedicated Sprint Team Engagement',
                      details: `Inquiring for a dedicated sprint team of ${roiTeamSize} engineers for an estimated horizon of ${roiDuration} months.`
                    }));
                    const elem = document.getElementById('contact');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    backgroundColor: '#2563EB',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px',
                    fontWeight: '700',
                    fontSize: '14px',
                    cursor: 'pointer',
                    marginTop: '4px'
                  }}
                >
                  Lock In This Sprint Team &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MAINTENANCE AND SUPPORT PLANS --- */}
      <section id="support" style={styles.section}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionEyebrow}>Maintenance and support</span>
            <h2 style={styles.sectionTitle}>Launch is the beginning. We stay.</h2>
            <p style={styles.sectionSubtitle}>
              Pick the level of cover that fits how much your business depends on the app. Terms are written into a service agreement.
            </p>
          </div>

          <div style={styles.supportGrid}>
            {SUPPORT_PLANS.map((plan, idx) => (
              <div
                key={idx}
                style={plan.isPopular ? styles.supportCardPopular : styles.supportCard}
              >
                {plan.badge && <span style={styles.mostChosenBadge}>{plan.badge}</span>}
                <h3 style={styles.planName}>{plan.name}</h3>

                <div style={styles.responseBox}>
                  <span style={styles.responseSpeed}>{plan.response}</span>
                  <span style={styles.responseLabel}>{plan.responseLabel}</span>
                </div>

                <ul style={styles.planFeaturesList}>
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} style={styles.planFeatureItem}>
                      <span style={styles.bulletCheck}>✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    setContactData((prev) => ({
                      ...prev,
                      serviceNeed: `Maintenance: ${plan.name} Plan`,
                      details: `Inquiring about ${plan.name} maintenance support tier.`
                    }));
                    const elem = document.getElementById('contact');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={plan.isPopular ? styles.planBtnPopular : styles.planBtn}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>

          {/* Security & Compliance Badges Bar */}
          <div style={{
            marginTop: '42px',
            backgroundColor: isDark ? '#111827' : '#FFFFFF',
            border: isDark ? '1px solid #1E293B' : '1px solid #E2E8F0',
            borderRadius: '16px',
            padding: '24px 28px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '18px',
            alignItems: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
          }}>
            {[
              { icon: '🔒', title: 'OWASP Top 10', desc: 'Pre-deploy vulnerability auditing' },
              { icon: '🛡️', title: 'SOC-2 Ready', desc: 'Zero-trust IAM & audit trails' },
              { icon: '🔑', title: '100% IP Transfer', desc: 'Full code & repo handover' },
              { icon: '📜', title: 'Mutual Bilateral NDA', desc: 'Strict confidentiality agreements' }
            ].map((badge, bIdx) => (
              <div key={bIdx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '24px' }}>{badge.icon}</span>
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: '700', color: isDark ? '#F1F5F9' : '#0F172A' }}>{badge.title}</div>
                  <div style={{ fontSize: '11.5px', color: isDark ? '#94A3B8' : '#64748B' }}>{badge.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Enterprise Security Blueprint Trigger */}
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <button
              onClick={() => setSecurityModalOpen(true)}
              style={{
                backgroundColor: isDark ? '#111827' : '#EFF6FF',
                border: isDark ? '1px solid #1E293B' : '1px solid #BFDBFE',
                color: '#2563EB',
                padding: '12px 26px',
                borderRadius: '30px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(37,99,235,0.08)',
                transition: 'transform 0.15s ease'
              }}
            >
              <span>🛡️</span>
              <span>View Enterprise Security & Compliance Blueprint &rarr;</span>
            </button>
          </div>
        </div>
      </section>

      {/* --- QUESTIONS / FAQ --- */}
      <section id="faq" style={styles.sectionLight}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionEyebrow}>Questions</span>
            <h2 style={styles.sectionTitle}>Things people ask before they start.</h2>
          </div>

          {/* FAQ Category Filter & Search Bar */}
          <div style={{ maxWidth: '800px', margin: '0 auto 24px auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {['All', 'Ownership & IP', 'Maintenance', 'Engagements', '3D Visuals', 'Security & NDA'].map((fCat) => {
                const active = faqCategory === fCat;
                return (
                  <button
                    key={fCat}
                    onClick={() => setFaqCategory(fCat)}
                    style={{
                      backgroundColor: active ? '#2563EB' : (isDark ? '#1E293B' : '#FFFFFF'),
                      color: active ? '#FFFFFF' : (isDark ? '#CBD5E1' : '#475569'),
                      border: active ? '1px solid #2563EB' : (isDark ? '1px solid #334155' : '1px solid #CBD5E1'),
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '12.5px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    {fCat}
                  </button>
                );
              })}
            </div>

            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Search questions (e.g. source code, audit, SLA, demo)..."
                style={{
                  width: '100%',
                  padding: '10px 16px 10px 38px',
                  borderRadius: '10px',
                  border: isDark ? '1px solid #334155' : '1px solid #CBD5E1',
                  backgroundColor: isDark ? '#111827' : '#FFFFFF',
                  color: isDark ? '#FFFFFF' : '#0F172A',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
              <span style={{ position: 'absolute', left: '12px', top: '10px', fontSize: '15px' }}>🔍</span>
              {faqSearch && (
                <button
                  onClick={() => setFaqSearch('')}
                  style={{ position: 'absolute', right: '12px', top: '9px', background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {(() => {
            const filteredFaqs = FAQS.filter((faq) => {
              const matchesCat = faqCategory === 'All' || faq.category === faqCategory;
              const matchesQuery = !faqSearch.trim() ||
                faq.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
                faq.a.toLowerCase().includes(faqSearch.toLowerCase());
              return matchesCat && matchesQuery;
            });

            return (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ fontSize: '13px', color: isDark ? '#94A3B8' : '#64748B' }}>
                    Showing {filteredFaqs.length} {filteredFaqs.length === 1 ? 'question' : 'questions'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setOpenFaqIndex(openFaqIndex === 'all' ? -1 : 'all');
                      playClickSound('click');
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#2563EB',
                      fontWeight: '600',
                      fontSize: '13px',
                      cursor: 'pointer',
                      padding: '4px 8px',
                      borderRadius: '6px'
                    }}
                  >
                    {openFaqIndex === 'all' ? 'Collapse all −' : 'Expand all +'}
                  </button>
                </div>

                <div style={styles.faqWrapper}>
                  {filteredFaqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === 'all' || openFaqIndex === idx;
                    return (
                      <div key={idx} style={styles.faqAccordionItem}>
                        <button
                          onClick={() => {
                            if (openFaqIndex === 'all') {
                              setOpenFaqIndex(-1);
                            } else {
                              setOpenFaqIndex(isOpen ? -1 : idx);
                            }
                            playClickSound('click');
                          }}
                          style={styles.faqQuestionBtn}
                          aria-expanded={isOpen}
                        >
                          <span style={styles.faqQText}>{faq.q}</span>
                          <span style={styles.faqToggleChar}>{isOpen ? '−' : '+'}</span>
                        </button>
                        {isOpen && (
                          <div style={styles.faqAnswerBox}>
                            <p style={styles.faqAText}>{faq.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            );
          })()}
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" style={styles.section}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionEyebrow}>Contact</span>
            <h2 style={styles.sectionTitle}>Tell us what you want to build.</h2>
            <p style={styles.sectionSubtitle}>
              Share a few details and we will reply within one working day with questions and a suggested first step.
            </p>
          </div>

          <div className="contact-wrapper" style={styles.contactWrapper}>
            {/* Direct Info List */}
            <div style={styles.contactInfoSide}>
              <div style={styles.contactInfoRow}>
                <strong>New projects</strong>
                <a href="mailto:hello@abhimanyutech.example" style={styles.contactInfoLink}>
                  hello@abhimanyutech.example
                </a>
              </div>

              <div style={styles.contactInfoRow}>
                <strong>Support for existing clients</strong>
                <a href="mailto:support@abhimanyutech.example" style={styles.contactInfoLink}>
                  support@abhimanyutech.example
                </a>
              </div>

              <div style={styles.contactInfoRow}>
                <strong>Office</strong>
                <span style={styles.contactAddress}>Telangana, India</span>
              </div>

              <div style={styles.instantWhatsappBox}>
                <h4>Need an instant answer?</h4>
                <p>Chat directly with our technical team on WhatsApp.</p>
                <a
                  href="https://wa.me/919999999999?text=Hi%20Abhimanyu%20Technologies,%20I%20would%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.whatsappActionBtn}
                >
                  Message on WhatsApp &rarr;
                </a>
              </div>

              <div style={{
                ...styles.instantWhatsappBox,
                backgroundColor: isDark ? '#1E293B' : '#EFF6FF',
                border: isDark ? '1px solid #334155' : '1px solid #BFDBFE',
                marginTop: '14px'
              }}>
                <h4 style={{ color: isDark ? '#FFFFFF' : '#1E40AF', margin: '0 0 6px 0', fontSize: '15px' }}>
                  Prefer a live video call?
                </h4>
                <p style={{ color: isDark ? '#94A3B8' : '#3B82F6', fontSize: '13px', margin: '0 0 12px 0' }}>
                  Pick a 15-minute scoping slot directly with an engineering lead.
                </p>
                <button
                  type="button"
                  onClick={() => setScheduleModalOpen(true)}
                  style={{
                    backgroundColor: '#2563EB',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '9px 16px',
                    borderRadius: '8px',
                    fontWeight: '700',
                    fontSize: '13.5px',
                    cursor: 'pointer'
                  }}
                >
                  📅 Book 15-Min Discovery Call
                </button>
              </div>

              {/* Global Remote Delivery Hub & Timezone Alignment */}
              <div style={{
                backgroundColor: isDark ? '#111827' : '#F8FAFC',
                border: isDark ? '1px solid #1E293B' : '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '16px',
                marginTop: '14px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '800', color: '#2563EB' }}>
                    Global Remote Delivery Hub
                  </span>
                  <span style={{ fontSize: '11px', backgroundColor: '#DCFCE7', color: '#166534', padding: '2px 8px', borderRadius: '12px', fontWeight: '600' }}>
                    ● 100% Remote-Ready
                  </span>
                </div>

                <div style={{ fontSize: '13.5px', color: isDark ? '#F1F5F9' : '#0F172A', fontWeight: '700', marginBottom: '3px' }}>
                  HQ: Telangana, India (IST • UTC+5:30)
                </div>
                <div style={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B', marginBottom: '12px', lineHeight: '1.4' }}>
                  Dedicated daily overlap windows for real-time standups, sprint reviews, and direct Slack/Teams collaboration:
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  <div style={{ backgroundColor: isDark ? '#1E293B' : '#FFFFFF', padding: '8px 10px', borderRadius: '8px', border: isDark ? '1px solid #334155' : '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '11.5px', fontWeight: '700', color: isDark ? '#CBD5E1' : '#1E293B' }}>🇺🇸 US (EST / PST)</div>
                    <div style={{ fontSize: '11px', color: '#2563EB', fontWeight: '600', marginTop: '2px' }}>3.5h – 4h Sync Window</div>
                  </div>
                  <div style={{ backgroundColor: isDark ? '#1E293B' : '#FFFFFF', padding: '8px 10px', borderRadius: '8px', border: isDark ? '1px solid #334155' : '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '11.5px', fontWeight: '700', color: isDark ? '#CBD5E1' : '#1E293B' }}>🇬🇧 UK / Europe</div>
                    <div style={{ fontSize: '11px', color: '#2563EB', fontWeight: '600', marginTop: '2px' }}>4.5h – 5h Sync Window</div>
                  </div>
                  <div style={{ backgroundColor: isDark ? '#1E293B' : '#FFFFFF', padding: '8px 10px', borderRadius: '8px', border: isDark ? '1px solid #334155' : '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '11.5px', fontWeight: '700', color: isDark ? '#CBD5E1' : '#1E293B' }}>🇦🇪 UAE / Middle East</div>
                    <div style={{ fontSize: '11px', color: '#2563EB', fontWeight: '600', marginTop: '2px' }}>6.5h Full Working Overlap</div>
                  </div>
                  <div style={{ backgroundColor: isDark ? '#1E293B' : '#FFFFFF', padding: '8px 10px', borderRadius: '8px', border: isDark ? '1px solid #334155' : '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '11.5px', fontWeight: '700', color: isDark ? '#CBD5E1' : '#1E293B' }}>🇸🇬 Singapore / APAC</div>
                    <div style={{ fontSize: '11px', color: '#2563EB', fontWeight: '600', marginTop: '2px' }}>7h Direct Day Overlap</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div style={styles.contactFormSide}>
              {contactSubmitted ? (
                <div style={styles.submittedBox}>
                  <div style={styles.checkIconBig}>✓</div>
                  <h3>Thank you for reaching out!</h3>
                  <p>
                    We have received your project details. Our engineering lead will review your message and reply to <strong>{contactData.email}</strong> within one working day.
                  </p>

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', margin: '18px 0 10px 0' }}>
                    <button
                      type="button"
                      onClick={() => {
                        const summary = `Abhimanyu Technologies - Project Inquiry\n\nName: ${contactData.name}\nEmail: ${contactData.email}\nPhone: ${contactData.phone || 'N/A'}\nService Need: ${contactData.serviceNeed}\nDetails: ${contactData.details}`;
                        navigator.clipboard?.writeText(summary);
                        setInquiryCopied(true);
                        setTimeout(() => setInquiryCopied(false), 2500);
                      }}
                      style={{
                        backgroundColor: inquiryCopied ? '#10B981' : (isDark ? '#1E293B' : '#EFF6FF'),
                        color: inquiryCopied ? '#FFFFFF' : '#2563EB',
                        border: isDark ? '1px solid #334155' : '1px solid #BFDBFE',
                        padding: '10px 18px',
                        borderRadius: '8px',
                        fontWeight: '700',
                        fontSize: '13.5px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {inquiryCopied ? '✓ Copied Summary!' : '📋 Copy Inquiry Summary'}
                    </button>

                    <a
                      href={`mailto:hello@abhimanyutech.example?subject=Project%20Inquiry%20from%20${encodeURIComponent(contactData.name)}&body=${encodeURIComponent(
                        `Hi Abhimanyu Technologies team,\n\nName: ${contactData.name}\nEmail: ${contactData.email}\nPhone: ${contactData.phone || 'N/A'}\nService: ${contactData.serviceNeed}\n\nProject Details:\n${contactData.details}`
                      )}`}
                      style={{
                        backgroundColor: '#2563EB',
                        color: '#FFFFFF',
                        textDecoration: 'none',
                        padding: '10px 18px',
                        borderRadius: '8px',
                        fontWeight: '700',
                        fontSize: '13.5px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      ✉️ Open in Email Client
                    </a>
                  </div>

                  <button
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactData({
                        name: '',
                        email: '',
                        phone: '',
                        serviceNeed: 'Web application development',
                        details: ''
                      });
                    }}
                    style={styles.sendAnotherBtn}
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} style={styles.contactForm}>
                  <div style={styles.formGroup}>
                    <label style={styles.fieldLabel}>Full name *</label>
                    <input
                      type="text"
                      required
                      value={contactData.name}
                      onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                      placeholder="e.g. Ramesh V."
                      style={styles.fieldInput}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.fieldLabel}>Email *</label>
                    <input
                      type="email"
                      required
                      value={contactData.email}
                      onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                      placeholder="ramesh@example.com"
                      style={styles.fieldInput}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.fieldLabel}>Phone (optional)</label>
                    <input
                      type="tel"
                      value={contactData.phone}
                      onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                      placeholder="+91..."
                      style={styles.fieldInput}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.fieldLabel}>I need help with</label>
                    <select
                      value={contactData.serviceNeed}
                      onChange={(e) => setContactData({ ...contactData, serviceNeed: e.target.value })}
                      style={styles.fieldSelect}
                    >
                      <option value="Mobile app development">Mobile app development</option>
                      <option value="Web application development">Web application development</option>
                      <option value="Application maintenance">Application maintenance</option>
                      <option value="IT services and consulting">IT services and consulting</option>
                      <option value="Cloud and DevOps">Cloud and DevOps</option>
                      <option value="UI and UX design">UI and UX design</option>
                      <option value="3D animation and visuals">3D animation and visuals</option>
                      <option value="AI and automation">AI and automation</option>
                      <option value="Engineering and construction software">Engineering and construction software</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.fieldLabel}>Project details *</label>
                    <textarea
                      required
                      rows={5}
                      value={contactData.details}
                      onChange={(e) => setContactData({ ...contactData, details: e.target.value })}
                      placeholder="Share what you are building, key milestones, or questions..."
                      style={styles.fieldTextarea}
                    />
                  </div>

                  <button type="submit" style={styles.submitBtn}>
                    Send inquiry &rarr;
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- PRE-FOOTER CTA BANNER --- */}
      <section style={{
        background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 50%, #0EA5E9 100%)',
        padding: '80px 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative blurred circles */}
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px',
          width: '240px', height: '240px', borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.06)', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: '-80px', left: '-40px',
          width: '300px', height: '300px', borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.05)', pointerEvents: 'none'
        }} />
        <div style={styles.container}>
          <RevealSection>
            <p style={{
              fontSize: '13px', fontWeight: '700', letterSpacing: '1.2px',
              color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase',
              margin: '0 0 16px 0'
            }}>
              Ready to start?
            </p>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: '900', color: '#FFFFFF',
              margin: '0 0 18px 0', lineHeight: '1.1'
            }}>
              Let's build something great together.
            </h2>
            <p style={{
              fontSize: '18px', color: 'rgba(255,255,255,0.75)',
              maxWidth: '520px', margin: '0 auto 36px auto', lineHeight: '1.55'
            }}>
              Tell us what you're building. We'll reply within one business day with a plan and a first step.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="#contact"
                onClick={(e) => scrollTo(e, 'contact')}
                style={{
                  backgroundColor: '#FFFFFF', color: '#1D4ED8',
                  textDecoration: 'none', padding: '14px 28px',
                  borderRadius: '10px', fontWeight: '700', fontSize: '16px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
                }}
              >
                Get a quote →
              </a>
              <button
                onClick={() => setScheduleModalOpen(true)}
                style={{
                  backgroundColor: '#0F172A',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '14px 26px',
                  borderRadius: '10px',
                  fontWeight: '700',
                  fontSize: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.25)'
                }}
              >
                📅 Book a 15-Min Call
              </button>
              <a
                href="#estimate"
                onClick={(e) => scrollTo(e, 'estimate')}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: '#FFFFFF', textDecoration: 'none',
                  padding: '14px 28px', borderRadius: '10px',
                  fontWeight: '600', fontSize: '16px',
                  border: '1px solid rgba(255,255,255,0.3)'
                }}
              >
                Estimate first
              </a>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section style={{
        backgroundColor: isDark ? '#0F172A' : '#F8FAFC',
        borderTop: isDark ? '1px solid #1E293B' : '1px solid #E2E8F0',
        padding: '72px 0'
      }}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionEyebrow}>Client voices</span>
            <h2 style={styles.sectionTitle}>What our clients say.</h2>
            <p style={styles.sectionSubtitle}>A few words from businesses we've built for and supported.</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginTop: '40px'
          }}>
            {[
              {
                stars: 5,
                quote: "Abhimanyu Technologies delivered our construction project dashboard on time and within budget. The building viewer blew our site teams away — they can now review BIM models on any device without installing anything.",
                name: "Rajesh Kumar",
                role: "VP Engineering",
                company: "Infra Build Group",
                metrics: ['⚡ 60 FPS WebGL BIM', '14:1 CAD Compression', 'Zero Plugins']
              },
              {
                stars: 5,
                quote: "We needed a Flutter app that worked offline on construction sites. Abhimanyu's team built exactly that, with seamless sync once connectivity returned. The QA process was meticulous and the code they handed over is clean.",
                name: "Priya Sharma",
                role: "Head of Product",
                company: "SiteOps Pvt Ltd",
                metrics: ['📱 Offline-First SQLite', '0 Conflict Merges', 'Cross-Platform iOS/Android']
              },
              {
                stars: 5,
                quote: "Their Growth support plan means we never worry about the app. Monthly patching, a health report every month, and someone on call when our quarterly release goes live. Exactly what a growing SaaS needs.",
                name: "Anil Verma",
                role: "CTO",
                company: "TalentBridge SaaS",
                metrics: ['🛡️ 99.98% Uptime SLA', '< 2h Incident Resolution', 'Monthly Health Audits']
              }
            ].map((t, i) => (
              <RevealSection key={i} delay={i * 90}>
                <div style={{
                  backgroundColor: isDark ? '#111827' : '#FFFFFF',
                  border: isDark ? '1px solid #1F2937' : '1px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '28px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  boxShadow: isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.04)'
                }}>
                  {/* Stars */}
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {Array.from({ length: t.stars }).map((_, s) => (
                      <span key={s} style={{ color: '#F59E0B', fontSize: '16px' }}>★</span>
                    ))}
                  </div>

                  {/* Quote */}
                  <p style={{
                    fontSize: '15px',
                    color: isDark ? '#CBD5E1' : '#334155',
                    lineHeight: '1.65',
                    margin: 0,
                    fontStyle: 'italic'
                  }}>
                    "{t.quote}"
                  </p>

                  {/* Verified Project Impact Badges */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: 'auto' }}>
                    {t.metrics.map((m, mIdx) => (
                      <span key={mIdx} style={{
                        backgroundColor: isDark ? 'rgba(37,99,235,0.18)' : '#EFF6FF',
                        color: isDark ? '#93C5FD' : '#2563EB',
                        border: isDark ? '1px solid rgba(37,99,235,0.3)' : '1px solid #BFDBFE',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '700'
                      }}>
                        {m}
                      </span>
                    ))}
                  </div>

                  {/* Author */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '8px', borderTop: isDark ? '1px solid #1E293B' : '1px solid #F1F5F9' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%',
                      backgroundColor: '#2563EB',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#FFFFFF', fontWeight: '800', fontSize: '16px', flexShrink: 0
                    }}>
                      {t.name[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '14px', color: isDark ? '#FFFFFF' : '#0F172A' }}>{t.name}</div>
                      <div style={{ fontSize: '12px', color: isDark ? '#64748B' : '#94A3B8' }}>{t.role} · {t.company}</div>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div className="footer-grid" style={styles.footerGrid}>
            {/* Brand Col */}
            <div style={styles.footerBrandCol}>
              <a href="#top" onClick={(e) => scrollTo(e, 'top')} style={styles.footerBrandLink}>
                <span style={styles.brandMainFooter}>Abhimanyu</span>
                <span style={styles.brandSubFooter}>TECHNOLOGIES</span>
              </a>
              <p style={styles.footerBio}>
                Applications, maintenance, IT services and 3D animation for growing businesses.
              </p>
              <span style={styles.footerLocationBadge}>
                📍 Based in Telangana, India • Global Support
              </span>
              {/* Social Links */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                {[
                  { href: 'https://github.com/dubasisruthishiva1335-star/Abhimanu-Technologies', label: 'GitHub', icon: '🐙' },
                  { href: 'https://linkedin.com/', label: 'LinkedIn', icon: '💼' },
                  { href: 'mailto:hello@abhimanyutech.example', label: 'Email', icon: '✉️' }
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '34px',
                      height: '34px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      fontSize: '15px',
                      textDecoration: 'none'
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Services Links */}
            <div style={styles.footerCol}>
              <h4 style={styles.footerTitle}>Services</h4>
              <ul style={styles.footerLinksList}>
                <li><a href="#services" onClick={(e) => scrollTo(e, 'services')} style={styles.fLink}>App development</a></li>
                <li><a href="#support" onClick={(e) => scrollTo(e, 'support')} style={styles.fLink}>Maintenance</a></li>
                <li><a href="#services" onClick={(e) => scrollTo(e, 'services')} style={styles.fLink}>IT services</a></li>
                <li><a href="#studio" onClick={(e) => scrollTo(e, 'studio')} style={styles.fLink}>3D animation</a></li>
              </ul>
            </div>

            {/* Explore Links */}
            <div style={styles.footerCol}>
              <h4 style={styles.footerTitle}>Explore</h4>
              <ul style={styles.footerLinksList}>
                <li><a href="#industries" onClick={(e) => scrollTo(e, 'industries')} style={styles.fLink}>Industries</a></li>
                <li><a href="#work" onClick={(e) => scrollTo(e, 'work')} style={styles.fLink}>Selected work</a></li>
                <li><a href="#insights" onClick={(e) => scrollTo(e, 'insights')} style={styles.fLink}>Technical Insights</a></li>
                <li><a href="#process" onClick={(e) => scrollTo(e, 'process')} style={styles.fLink}>How we work</a></li>
                <li><a href="#estimate" onClick={(e) => scrollTo(e, 'estimate')} style={styles.fLink}>Estimator</a></li>
                <li><a href="#faq" onClick={(e) => scrollTo(e, 'faq')} style={styles.fLink}>FAQ</a></li>
              </ul>
            </div>

            {/* Company Links */}
            <div style={styles.footerCol}>
              <h4 style={styles.footerTitle}>Company</h4>
              <ul style={styles.footerLinksList}>
                <li><a href="#contact" onClick={(e) => scrollTo(e, 'contact')} style={styles.fLink}>Contact</a></li>
                <li><a href="#support" onClick={(e) => scrollTo(e, 'support')} style={styles.fLink}>Support plans</a></li>
                <li><a href="#top" onClick={(e) => scrollTo(e, 'top')} style={styles.fLink}>Back to top &uarr;</a></li>
              </ul>
            </div>
          </div>

          <div style={styles.footerBottomBar}>
            <div>
              &copy; {new Date().getFullYear()} Abhimanyu Technologies. All rights reserved.
            </div>
            <div style={styles.footerLegalLinks}>
              <span>Privacy</span>
              <span>·</span>
              <span>Terms</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- CSS-IN-JS INLINE DESIGN SYSTEM ---
const styles = {
  page: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    color: '#0F172A',
    backgroundColor: '#FFFFFF',
    minHeight: '100vh',
    lineHeight: '1.6',
    boxSizing: 'border-box'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px'
  },

  // Utility Bar
  utilityBar: {
    backgroundColor: '#0F172A',
    color: '#94A3B8',
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '0.8px',
    padding: '8px 0',
    borderBottom: '1px solid #1E293B'
  },
  utilityContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px'
  },
  utilityRight: {
    color: '#38BDF8'
  },

  // Header
  navHeader: {
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid #E2E8F0',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  headerContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  brandLink: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'baseline',
    gap: '4px'
  },
  brandMain: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: '-0.5px'
  },
  brandSub: {
    fontSize: '11px',
    fontWeight: '800',
    color: '#2563EB',
    letterSpacing: '1px'
  },
  navLinks: {
    display: 'flex',
    gap: '24px'
  },
  navItem: {
    textDecoration: 'none',
    color: '#475569',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'color 0.15s ease'
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  quoteBtn: {
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    textDecoration: 'none',
    padding: '9px 18px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    boxShadow: '0 1px 3px rgba(37, 99, 235, 0.2)'
  },
  mobileHamburger: {
    display: 'none',
    background: 'none',
    border: '1px solid #CBD5E1',
    borderRadius: '6px',
    padding: '6px',
    cursor: 'pointer',
    color: '#0F172A'
  },
  mobileMenu: {
    backgroundColor: '#FFFFFF',
    borderTop: '1px solid #E2E8F0',
    padding: '16px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  mobileMenuItem: {
    textDecoration: 'none',
    color: '#0F172A',
    fontSize: '16px',
    fontWeight: '500',
    padding: '4px 0'
  },
  mobileQuoteBtn: {
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    textDecoration: 'none',
    textAlign: 'center',
    padding: '12px',
    borderRadius: '8px',
    fontWeight: '600',
    marginTop: '6px'
  },

  // Hero
  heroSection: {
    padding: '70px 0 60px 0',
    backgroundColor: '#F8FAFC',
    borderBottom: '1px solid #E2E8F0',
    overflow: 'hidden'
  },
  heroGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '40px',
    alignItems: 'center'
  },
  heroTextCol: {
    display: 'flex',
    flexDirection: 'column'
  },
  heroOverline: {
    color: '#2563EB',
    fontSize: '12.5px',
    fontWeight: '700',
    letterSpacing: '1.5px',
    marginBottom: '16px'
  },
  heroTitle: {
    fontSize: '44px',
    fontWeight: '800',
    lineHeight: '1.2',
    color: '#0F172A',
    letterSpacing: '-1px',
    marginBottom: '20px'
  },
  heroSubtitle: {
    fontSize: '17px',
    lineHeight: '1.65',
    color: '#475569',
    marginBottom: '32px'
  },
  heroCtaRow: {
    display: 'flex',
    gap: '14px',
    flexWrap: 'wrap',
    marginBottom: '32px'
  },
  primaryCta: {
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    textDecoration: 'none',
    padding: '13px 26px',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)'
  },
  secondaryCta: {
    backgroundColor: '#FFFFFF',
    color: '#0F172A',
    border: '1px solid #CBD5E1',
    textDecoration: 'none',
    padding: '13px 24px',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600'
  },
  heroPillRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  heroPill: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    color: '#475569',
    fontSize: '12.5px',
    fontWeight: '600',
    padding: '5px 12px',
    borderRadius: '6px'
  },
  hero3DCol: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  chakraContainer: {
    width: '100%',
    maxWidth: '420px',
    height: '420px',
    backgroundColor: '#0F172A',
    borderRadius: '24px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    boxShadow: '0 20px 30px -10px rgba(15, 23, 42, 0.3)'
  },
  chakraHeaderBadge: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '1px',
    color: '#94A3B8',
    marginBottom: '10px'
  },
  steerPill: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    color: '#38BDF8',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '10px'
  },
  canvasMount: {
    width: '100%',
    height: '100%',
    cursor: 'grab'
  },
  canvasMountTall: {
    width: '100%',
    height: '460px',
    cursor: 'grab'
  },

  // Sections
  section: {
    padding: '80px 0',
    borderBottom: '1px solid #E2E8F0',
    backgroundColor: '#FFFFFF'
  },
  sectionLight: {
    padding: '80px 0',
    borderBottom: '1px solid #E2E8F0',
    backgroundColor: '#F8FAFC'
  },
  sectionDark: {
    padding: '80px 0',
    backgroundColor: '#0A0F1D',
    color: '#F8FAFC',
    borderBottom: '1px solid #1E293B'
  },
  sectionHeader: {
    maxWidth: '740px',
    margin: '0 auto 50px auto',
    textAlign: 'center'
  },
  sectionHeaderDark: {
    maxWidth: '740px',
    margin: '0 auto 50px auto',
    textAlign: 'center'
  },
  sectionEyebrow: {
    color: '#2563EB',
    fontSize: '13px',
    fontWeight: '700',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '8px'
  },
  sectionEyebrowCyan: {
    color: '#38BDF8',
    fontSize: '13px',
    fontWeight: '700',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '8px'
  },
  sectionTitle: {
    fontSize: '34px',
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: '-0.5px',
    lineHeight: '1.25',
    marginBottom: '14px'
  },
  sectionTitleDark: {
    fontSize: '34px',
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: '-0.5px',
    lineHeight: '1.25',
    marginBottom: '14px'
  },
  sectionSubtitle: {
    fontSize: '16.5px',
    color: '#475569',
    lineHeight: '1.6'
  },
  sectionSubtitleDark: {
    fontSize: '16.5px',
    color: '#94A3B8',
    lineHeight: '1.6'
  },

  // Services
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
    gap: '24px'
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '14px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.03)'
  },
  serviceCardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  },
  serviceName: {
    fontSize: '19px',
    fontWeight: '700',
    color: '#0F172A'
  },
  newBadge: {
    backgroundColor: '#EFF6FF',
    color: '#2563EB',
    fontSize: '11px',
    fontWeight: '700',
    padding: '3px 8px',
    borderRadius: '4px'
  },
  serviceDesc: {
    fontSize: '14px',
    color: '#475569',
    lineHeight: '1.6',
    marginBottom: '18px'
  },
  serviceBullets: {
    listStyle: 'none',
    padding: 0,
    margin: 'auto 0 0 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  bulletItem: {
    display: 'flex',
    gap: '8px',
    fontSize: '13px',
    color: '#334155'
  },
  bulletDot: {
    color: '#2563EB',
    fontWeight: '700'
  },

  // 3D Studio Layout
  studioLayout: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '32px',
    marginBottom: '48px',
    alignItems: 'center'
  },
  studioCanvasCol: {
    display: 'flex'
  },
  studioCanvasBox: {
    width: '100%',
    height: '420px',
    backgroundColor: '#030712',
    border: '1px solid #1E293B',
    borderRadius: '20px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  studioCanvasBadgeRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    fontSize: '11px',
    fontWeight: '700'
  },
  webglTag: {
    color: '#38BDF8',
    letterSpacing: '1px'
  },
  dragTag: {
    color: '#94A3B8'
  },
  studioControlsCol: {
    backgroundColor: '#111827',
    border: '1px solid #1F2937',
    borderRadius: '20px',
    padding: '28px',
    display: 'flex',
    flexDirection: 'column',
    gap: '18px'
  },
  controlGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  controlLabel: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#E2E8F0',
    letterSpacing: '0.3px'
  },
  btnSelectorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px'
  },
  selectBtn: {
    backgroundColor: '#1F2937',
    color: '#94A3B8',
    border: '1px solid #374151',
    padding: '8px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  activeSelectBtn: {
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    border: '1px solid #2563EB',
    padding: '8px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  colorPaletteRow: {
    display: 'flex',
    gap: '12px'
  },
  colorCircle: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.1s ease'
  },
  sliderLabelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sliderValue: {
    color: '#38BDF8',
    fontSize: '13px',
    fontWeight: '600'
  },
  rangeInput: {
    width: '100%',
    cursor: 'pointer'
  },
  checkboxRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  checkbox: {
    width: '16px',
    height: '16px',
    cursor: 'pointer'
  },
  checkboxLabel: {
    fontSize: '14px',
    color: '#CBD5E1',
    cursor: 'pointer'
  },
  studioPillarsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    marginBottom: '60px'
  },
  studioPillarCard: {
    backgroundColor: '#111827',
    border: '1px solid #1F2937',
    borderRadius: '12px',
    padding: '20px'
  },
  pillarTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#38BDF8',
    marginBottom: '6px'
  },
  pillarText: {
    fontSize: '13.5px',
    color: '#94A3B8',
    lineHeight: '1.5'
  },

  // 6 Animated CSS 3D Flip Cards
  flipCardsWrapper: {
    marginBottom: '60px'
  },
  flipCardsHeader: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  flipCardsTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: '6px'
  },
  flipCardsSubtitle: {
    fontSize: '14.5px',
    color: '#94A3B8'
  },
  flipCardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '24px'
  },
  flipCardContainer: {
    backgroundColor: 'transparent',
    height: '220px',
    perspective: '1000px'
  },
  flipCardInner: {
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'left',
    transition: 'transform 0.6s',
    transformStyle: 'preserve-3d'
  },
  flipCardFront: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    backgroundColor: '#111827',
    border: '1px solid #1F2937',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box'
  },
  cardIndexBadge: {
    fontSize: '12px',
    fontWeight: '800',
    color: '#38BDF8',
    letterSpacing: '1px',
    marginBottom: '8px'
  },
  cardFrontTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: '8px'
  },
  cardFrontDesc: {
    fontSize: '13.5px',
    color: '#94A3B8',
    lineHeight: '1.5'
  },
  flipHint: {
    marginTop: 'auto',
    fontSize: '12px',
    fontWeight: '600',
    color: '#38BDF8'
  },
  flipCardBack: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    backgroundColor: '#1E293B',
    border: '1px solid #38BDF8',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    transform: 'rotateY(180deg)',
    boxSizing: 'border-box'
  },
  cardBackTitle: {
    fontSize: '17px',
    fontWeight: '700',
    color: '#38BDF8',
    marginBottom: '8px'
  },
  cardBackDesc: {
    fontSize: '13.5px',
    color: '#E2E8F0',
    lineHeight: '1.55'
  },
  cardBackCta: {
    marginTop: 'auto',
    color: '#FFFFFF',
    backgroundColor: '#2563EB',
    textDecoration: 'none',
    alignSelf: 'flex-start',
    padding: '6px 14px',
    borderRadius: '6px',
    fontSize: '12.5px',
    fontWeight: '600'
  },

  // 3D Pipeline
  pipelineWrapper: {
    marginBottom: '48px',
    borderTop: '1px solid #1E293B',
    paddingTop: '40px'
  },
  pipelineHeaderTitle: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: '24px',
    textAlign: 'center'
  },
  pipelineGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
    gap: '16px'
  },
  pipelineStepCard: {
    backgroundColor: '#111827',
    border: '1px solid #1F2937',
    borderRadius: '12px',
    padding: '18px'
  },
  pipelineStepNum: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#38BDF8',
    lineHeight: '1',
    marginBottom: '10px'
  },
  pipelineStepTitle: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: '6px'
  },
  pipelineStepDesc: {
    fontSize: '12.5px',
    color: '#94A3B8',
    lineHeight: '1.5'
  },

  // Formats Chips
  formatsWrapper: {
    backgroundColor: '#111827',
    border: '1px solid #1F2937',
    borderRadius: '14px',
    padding: '24px',
    textAlign: 'center'
  },
  formatsHeading: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: '14px'
  },
  formatsChipList: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '10px'
  },
  formatChipItem: {
    backgroundColor: '#1E293B',
    color: '#38BDF8',
    fontSize: '12.5px',
    fontWeight: '600',
    padding: '6px 14px',
    borderRadius: '9999px',
    border: '1px solid rgba(56, 189, 248, 0.2)'
  },

  // Applications Mockup Section
  appCategoryTabs: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '40px'
  },
  appTab: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #CBD5E1',
    color: '#475569',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  activeAppTab: {
    backgroundColor: '#2563EB',
    border: '1px solid #2563EB',
    color: '#FFFFFF',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  phoneShowcaseWrapper: {
    display: 'grid',
    gridTemplateColumns: '380px 1fr',
    gap: '48px',
    alignItems: 'center',
    maxWidth: '960px',
    margin: '0 auto'
  },
  phoneDeviceCard: {
    width: '100%',
    backgroundColor: '#0F172A',
    borderRadius: '36px',
    padding: '16px',
    boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
    border: '4px solid #334155'
  },
  phoneSpeakerNotch: {
    width: '80px',
    height: '6px',
    backgroundColor: '#1E293B',
    borderRadius: '3px',
    margin: '0 auto 12px auto'
  },
  phoneScreenContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: '26px',
    padding: '18px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  phoneStatusBar: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
    fontWeight: '700',
    color: '#64748B'
  },
  appHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  appGreeting: {
    fontSize: '11px',
    color: '#64748B',
    fontWeight: '600'
  },
  appCategoryActiveTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#0F172A',
    margin: 0
  },
  livePulse: {
    fontSize: '10px',
    fontWeight: '800',
    color: '#10B981',
    backgroundColor: '#DCFCE7',
    padding: '2px 6px',
    borderRadius: '4px'
  },
  statsWidgetRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px'
  },
  statWidget: {
    backgroundColor: '#F8FAFC',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    padding: '8px',
    textAlign: 'center'
  },
  statValue: {
    fontSize: '16px',
    fontWeight: '800',
    color: '#0F172A'
  },
  statLabel: {
    fontSize: '9.5px',
    color: '#64748B',
    fontWeight: '600'
  },
  ordersSection: {
    backgroundColor: '#F8FAFC',
    border: '1px solid #E2E8F0',
    borderRadius: '10px',
    padding: '10px'
  },
  ordersHeadingRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px'
  },
  ordersHeading: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#0F172A'
  },
  ordersFilter: {
    fontSize: '11px',
    color: '#2563EB',
    fontWeight: '600'
  },
  orderItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '11px',
    padding: '4px 0',
    borderBottom: '1px solid #F1F5F9'
  },
  statusReady: {
    backgroundColor: '#EFF6FF',
    color: '#2563EB',
    padding: '1px 5px',
    borderRadius: '3px',
    fontWeight: '600'
  },
  statusTransit: {
    backgroundColor: '#FEF3C7',
    color: '#B45309',
    padding: '1px 5px',
    borderRadius: '3px',
    fontWeight: '600'
  },
  statusDone: {
    backgroundColor: '#DCFCE7',
    color: '#15803D',
    padding: '1px 5px',
    borderRadius: '3px',
    fontWeight: '600'
  },
  statusPending: {
    backgroundColor: '#FEE2E2',
    color: '#B91C1C',
    padding: '1px 5px',
    borderRadius: '3px',
    fontWeight: '600'
  },
  supportChatContainer: {
    border: '1px solid #E2E8F0',
    borderRadius: '10px',
    padding: '10px'
  },
  chatHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: '8px'
  },
  chatOnline: {
    color: '#10B981',
    fontWeight: '600'
  },
  chatMessagesArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    maxHeight: '120px',
    overflowY: 'auto',
    marginBottom: '8px'
  },
  chatMsgUser: {
    alignSelf: 'flex-end',
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    fontSize: '11px',
    padding: '5px 9px',
    borderRadius: '8px',
    maxWidth: '85%'
  },
  chatMsgBot: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F5F9',
    color: '#0F172A',
    fontSize: '11px',
    padding: '5px 9px',
    borderRadius: '8px',
    maxWidth: '85%'
  },
  chatInputForm: {
    display: 'flex',
    gap: '4px'
  },
  chatInput: {
    flex: 1,
    padding: '6px 8px',
    fontSize: '11px',
    border: '1px solid #CBD5E1',
    borderRadius: '6px'
  },
  chatSendBtn: {
    backgroundColor: '#0F172A',
    color: '#FFFFFF',
    border: 'none',
    padding: '0 8px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  floatingAlerts: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center'
  },
  floatingAlert: {
    backgroundColor: '#F1F5F9',
    color: '#334155',
    fontSize: '10px',
    fontWeight: '600',
    padding: '3px 8px',
    borderRadius: '4px'
  },
  phoneSideCta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  sideCtaTitle: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: '1.25'
  },
  sideCtaDesc: {
    fontSize: '16px',
    color: '#475569',
    lineHeight: '1.6'
  },
  planAppBtn: {
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    textDecoration: 'none',
    alignSelf: 'flex-start',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600'
  },

  // Industries We Serve
  industriesViewerLayout: {
    display: 'grid',
    gridTemplateColumns: '1.3fr 1fr',
    gap: '32px',
    marginBottom: '50px',
    alignItems: 'center'
  },
  buildingViewerCol: {
    display: 'flex'
  },
  buildingViewerBox: {
    width: '100%',
    height: '490px',
    backgroundColor: '#0F172A',
    borderRadius: '20px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  buildingControlsCol: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '16px',
    padding: '28px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  controlsHeading: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#0F172A'
  },
  buildingCheckboxGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  checkLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#334155',
    cursor: 'pointer'
  },
  sliderControl: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  industrySolutionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '24px',
    marginBottom: '40px'
  },
  solutionCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '14px',
    padding: '24px'
  },
  solutionTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: '8px'
  },
  solutionDesc: {
    fontSize: '14px',
    color: '#475569',
    lineHeight: '1.55',
    marginBottom: '16px'
  },
  solutionBullets: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  chipsSection: {
    marginBottom: '24px'
  },
  chipsHeading: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '10px'
  },
  chipsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  chipItem: {
    backgroundColor: '#EFF6FF',
    border: '1px solid #BFDBFE',
    color: '#1D4ED8',
    fontSize: '13px',
    fontWeight: '600',
    padding: '5px 12px',
    borderRadius: '6px'
  },
  chipTool: {
    backgroundColor: '#F1F5F9',
    border: '1px solid #CBD5E1',
    color: '#334155',
    fontSize: '13px',
    fontWeight: '600',
    padding: '5px 12px',
    borderRadius: '6px'
  },
  firmCtaRow: {
    textAlign: 'center',
    marginTop: '32px'
  },

  // Selected Work Ring
  ringCarouselBox: {
    maxWidth: '700px',
    margin: '0 auto',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '20px',
    padding: '36px',
    textAlign: 'center',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
  },
  ringControlsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  ringArrowBtn: {
    backgroundColor: '#F8FAFC',
    border: '1px solid #CBD5E1',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  ringIndicator: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#64748B'
  },
  conceptRingTabs: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    justifyContent: 'center',
    marginBottom: '20px'
  },
  ringTab: {
    backgroundColor: '#F8FAFC',
    border: '1px solid #E2E8F0',
    color: '#64748B',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  activeRingTab: {
    backgroundColor: '#EFF6FF',
    border: '1px solid #2563EB',
    color: '#1D4ED8',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  ringTabNum: {
    color: '#2563EB',
    fontWeight: '800'
  },
  ringTabLabel: {
    whiteSpace: 'nowrap'
  },
  ringCardDisplay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    padding: '20px 0'
  },
  conceptTag: {
    backgroundColor: '#EFF6FF',
    color: '#2563EB',
    fontSize: '12px',
    fontWeight: '700',
    padding: '4px 10px',
    borderRadius: '4px'
  },
  conceptTitle: {
    fontSize: '26px',
    fontWeight: '800',
    color: '#0F172A',
    margin: 0
  },
  conceptDesc: {
    fontSize: '16px',
    color: '#475569',
    maxWidth: '540px',
    lineHeight: '1.6'
  },
  conceptInquireBtn: {
    marginTop: '12px',
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  sampleDisclaimer: {
    fontSize: '12px',
    color: '#94A3B8',
    marginTop: '20px',
    fontStyle: 'italic'
  },

  // Process
  processGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '24px'
  },
  processCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '16px',
    padding: '28px',
    display: 'flex',
    flexDirection: 'column'
  },
  stepBadge: {
    fontSize: '12px',
    fontWeight: '800',
    color: '#2563EB',
    letterSpacing: '1px',
    marginBottom: '12px'
  },
  processStepTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: '8px'
  },
  processStepDesc: {
    fontSize: '14px',
    color: '#475569',
    lineHeight: '1.6'
  },

  // Estimator
  estimatorGrid: {
    display: 'grid',
    gridTemplateColumns: '1.3fr 1fr',
    gap: '32px'
  },
  estimatorOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '28px'
  },
  estimatorGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  estLabel: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#0F172A'
  },
  estTypeSelectGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '10px'
  },
  estTypeBtn: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #CBD5E1',
    color: '#475569',
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    textAlign: 'left',
    cursor: 'pointer'
  },
  estTypeBtnActive: {
    backgroundColor: '#EFF6FF',
    border: '1px solid #2563EB',
    color: '#1D4ED8',
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '700',
    textAlign: 'left',
    cursor: 'pointer'
  },
  estFeaturesGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '8px'
  },
  featureCheckboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#334155',
    cursor: 'pointer'
  },
  complexityBtnRow: {
    display: 'flex',
    gap: '10px'
  },
  compBtn: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #CBD5E1',
    color: '#475569',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '13.5px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  compBtnActive: {
    backgroundColor: '#2563EB',
    border: '1px solid #2563EB',
    color: '#FFFFFF',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '13.5px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  estimatorResultBox: {
    display: 'flex'
  },
  estResultCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '18px',
    padding: '28px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
  },
  resultItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  resultLabel: {
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#64748B',
    letterSpacing: '0.5px'
  },
  timelineBigNumber: {
    fontSize: '32px',
    fontWeight: '900',
    color: '#2563EB'
  },
  teamDescription: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#0F172A',
    lineHeight: '1.5'
  },
  phaseBar: {
    display: 'flex',
    height: '22px',
    borderRadius: '6px',
    overflow: 'hidden',
    marginTop: '6px'
  },
  phaseSegment: {
    color: '#FFFFFF',
    fontSize: '10px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  phaseLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
    color: '#64748B',
    marginTop: '4px'
  },
  estNotice: {
    fontSize: '12px',
    color: '#94A3B8',
    lineHeight: '1.4',
    fontStyle: 'italic',
    margin: 0
  },
  sendEstimateBtn: {
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer'
  },

  // Support Plans
  supportGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px'
  },
  supportCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '16px',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column'
  },
  supportCardPopular: {
    backgroundColor: '#FFFFFF',
    border: '2px solid #2563EB',
    borderRadius: '16px',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    boxShadow: '0 8px 20px rgba(37, 99, 235, 0.1)'
  },
  mostChosenBadge: {
    position: 'absolute',
    top: '-12px',
    right: '24px',
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    fontSize: '11px',
    fontWeight: '700',
    padding: '4px 10px',
    borderRadius: '9999px'
  },
  planName: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: '12px'
  },
  responseBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '20px'
  },
  responseSpeed: {
    fontSize: '17px',
    fontWeight: '800',
    color: '#0F172A',
    display: 'block'
  },
  responseLabel: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: '0.5px'
  },
  planFeaturesList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 28px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  planFeatureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#334155'
  },
  bulletCheck: {
    color: '#10B981',
    fontWeight: '700'
  },
  planBtn: {
    marginTop: 'auto',
    backgroundColor: '#F8FAFC',
    color: '#2563EB',
    border: '1px solid #CBD5E1',
    padding: '11px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  planBtnPopular: {
    marginTop: 'auto',
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  },

  // FAQ
  faqWrapper: {
    maxWidth: '800px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  faqAccordionItem: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '12px',
    overflow: 'hidden'
  },
  faqQuestionBtn: {
    width: '100%',
    padding: '18px 22px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left'
  },
  faqQText: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#0F172A',
    paddingRight: '16px'
  },
  faqToggleChar: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#2563EB'
  },
  faqAnswerBox: {
    padding: '0 22px 20px 22px',
    borderTop: '1px solid #F1F5F9'
  },
  faqAText: {
    fontSize: '14.5px',
    color: '#475569',
    lineHeight: '1.65',
    margin: '12px 0 0 0'
  },

  // Contact
  contactWrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.3fr',
    gap: '40px'
  },
  contactInfoSide: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  contactInfoRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    fontSize: '14px'
  },
  contactInfoLink: {
    color: '#2563EB',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '600'
  },
  contactAddress: {
    fontSize: '15px',
    color: '#0F172A'
  },
  instantWhatsappBox: {
    backgroundColor: '#F8FAFC',
    border: '1px solid #E2E8F0',
    borderRadius: '14px',
    padding: '20px',
    marginTop: '12px'
  },
  whatsappActionBtn: {
    display: 'inline-block',
    backgroundColor: '#16A34A',
    color: '#FFFFFF',
    textDecoration: 'none',
    padding: '10px 18px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    marginTop: '8px'
  },
  contactFormSide: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '18px',
    padding: '32px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
  },
  contactForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  fieldLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#334155'
  },
  fieldInput: {
    padding: '11px 14px',
    borderRadius: '8px',
    border: '1px solid #CBD5E1',
    fontSize: '14.5px',
    color: '#0F172A'
  },
  fieldSelect: {
    padding: '11px 14px',
    borderRadius: '8px',
    border: '1px solid #CBD5E1',
    fontSize: '14.5px',
    color: '#0F172A'
  },
  fieldTextarea: {
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1px solid #CBD5E1',
    fontSize: '14.5px',
    color: '#0F172A',
    fontFamily: 'inherit',
    resize: 'vertical'
  },
  submitBtn: {
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    border: 'none',
    padding: '13px',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '6px'
  },
  submittedBox: {
    textAlign: 'center',
    padding: '30px 10px'
  },
  checkIconBig: {
    fontSize: '36px',
    color: '#16A34A',
    marginBottom: '12px'
  },
  sendAnotherBtn: {
    backgroundColor: '#F1F5F9',
    color: '#0F172A',
    border: '1px solid #CBD5E1',
    padding: '9px 18px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '16px'
  },

  // Footer
  footer: {
    backgroundColor: '#0F172A',
    color: '#F8FAFC',
    padding: '60px 0 30px 0'
  },
  footerGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    gap: '36px',
    marginBottom: '40px'
  },
  footerBrandCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  footerBrandLink: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'baseline',
    gap: '4px'
  },
  brandMainFooter: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#FFFFFF'
  },
  brandSubFooter: {
    fontSize: '11px',
    fontWeight: '800',
    color: '#38BDF8',
    letterSpacing: '1px'
  },
  footerBio: {
    fontSize: '14px',
    color: '#94A3B8',
    lineHeight: '1.6',
    maxWidth: '320px'
  },
  footerLocationBadge: {
    fontSize: '12px',
    color: '#38BDF8'
  },
  footerCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  footerTitle: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: '0.5px'
  },
  footerLinksList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  fLink: {
    color: '#94A3B8',
    textDecoration: 'none',
    fontSize: '13.5px',
    transition: 'color 0.15s ease'
  },
  footerBottomBar: {
    borderTop: '1px solid #1E293B',
    paddingTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    fontSize: '13px',
    color: '#64748B'
  },
  footerLegalLinks: {
    display: 'flex',
    gap: '8px'
  },
  searchCommandBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#F1F5F9',
    border: '1px solid #CBD5E1',
    color: '#475569',
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer'
  },
  kbdShortcut: {
    fontSize: '10px',
    fontWeight: '700',
    backgroundColor: '#E2E8F0',
    color: '#64748B',
    padding: '2px 5px',
    borderRadius: '4px'
  },
  themeToggleBtn: {
    background: 'none',
    border: '1px solid #CBD5E1',
    color: '#0F172A',
    padding: '6px 10px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  commandModalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(6px)',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: '12vh',
    zIndex: 10000
  },
  commandModalCard: {
    width: '90%',
    maxWidth: '560px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '16px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  commandSearchRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '14px 18px',
    borderBottom: '1px solid #E2E8F0',
    gap: '12px'
  },
  commandSearchIcon: {
    fontSize: '18px'
  },
  commandInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '15px',
    backgroundColor: 'transparent',
    color: '#0F172A'
  },
  commandEscHint: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#64748B',
    backgroundColor: '#F1F5F9',
    padding: '2px 6px',
    borderRadius: '4px'
  },
  commandList: {
    maxHeight: '340px',
    overflowY: 'auto',
    padding: '8px'
  },
  commandItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 14px',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  commandItemMain: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  commandItemTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#0F172A'
  },
  commandItemDesc: {
    fontSize: '12px',
    color: '#64748B'
  },
  commandCategoryTag: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#2563EB',
    backgroundColor: '#EFF6FF',
    padding: '3px 8px',
    borderRadius: '4px'
  },
  commandEmpty: {
    padding: '24px',
    textAlign: 'center',
    color: '#64748B',
    fontSize: '14px'
  }
};

function getStyles(isDark) {
  const base = styles;
  if (!isDark) return base;

  return {
    ...base,
    page: {
      ...base.page,
      backgroundColor: '#0A0F1D',
      color: '#F8FAFC'
    },
    navHeader: {
      ...base.navHeader,
      backgroundColor: 'rgba(10, 15, 29, 0.96)',
      borderBottom: '1px solid #1E293B'
    },
    brandMain: {
      ...base.brandMain,
      color: '#FFFFFF'
    },
    navItem: {
      ...base.navItem,
      color: '#CBD5E1'
    },
    mobileMenu: {
      ...base.mobileMenu,
      backgroundColor: '#0F172A',
      borderTop: '1px solid #1E293B'
    },
    mobileMenuItem: {
      ...base.mobileMenuItem,
      color: '#FFFFFF'
    },
    heroSection: {
      ...base.heroSection,
      backgroundColor: '#0B1120',
      borderBottom: '1px solid #1E293B'
    },
    heroTitle: {
      ...base.heroTitle,
      color: '#FFFFFF'
    },
    heroSubtitle: {
      ...base.heroSubtitle,
      color: '#94A3B8'
    },
    heroPill: {
      ...base.heroPill,
      backgroundColor: '#1E293B',
      border: '1px solid #334155',
      color: '#CBD5E1'
    },
    secondaryCta: {
      ...base.secondaryCta,
      backgroundColor: '#1E293B',
      border: '1px solid #334155',
      color: '#FFFFFF'
    },
    section: {
      ...base.section,
      backgroundColor: '#0A0F1D',
      borderBottom: '1px solid #1E293B'
    },
    sectionLight: {
      ...base.sectionLight,
      backgroundColor: '#0F172A',
      borderBottom: '1px solid #1E293B'
    },
    sectionTitle: {
      ...base.sectionTitle,
      color: '#FFFFFF'
    },
    sectionSubtitle: {
      ...base.sectionSubtitle,
      color: '#94A3B8'
    },
    serviceCard: {
      ...base.serviceCard,
      backgroundColor: '#111827',
      border: '1px solid #1F2937'
    },
    serviceName: {
      ...base.serviceName,
      color: '#FFFFFF'
    },
    serviceDesc: {
      ...base.serviceDesc,
      color: '#94A3B8'
    },
    bulletItem: {
      ...base.bulletItem,
      color: '#CBD5E1'
    },
    appTab: {
      ...base.appTab,
      backgroundColor: '#1E293B',
      border: '1px solid #334155',
      color: '#CBD5E1'
    },
    buildingControlsCol: {
      ...base.buildingControlsCol,
      backgroundColor: '#111827',
      border: '1px solid #1F2937'
    },
    controlsHeading: {
      ...base.controlsHeading,
      color: '#FFFFFF'
    },
    checkLabel: {
      ...base.checkLabel,
      color: '#CBD5E1'
    },
    solutionCard: {
      ...base.solutionCard,
      backgroundColor: '#111827',
      border: '1px solid #1F2937'
    },
    solutionTitle: {
      ...base.solutionTitle,
      color: '#FFFFFF'
    },
    solutionDesc: {
      ...base.solutionDesc,
      color: '#94A3B8'
    },
    chipTool: {
      ...base.chipTool,
      backgroundColor: '#1E293B',
      border: '1px solid #334155',
      color: '#CBD5E1'
    },
    ringCarouselBox: {
      ...base.ringCarouselBox,
      backgroundColor: '#111827',
      border: '1px solid #1F2937'
    },
    conceptTitle: {
      ...base.conceptTitle,
      color: '#FFFFFF'
    },
    conceptDesc: {
      ...base.conceptDesc,
      color: '#94A3B8'
    },
    ringTab: {
      ...base.ringTab,
      backgroundColor: '#1E293B',
      border: '1px solid #334155',
      color: '#94A3B8'
    },
    processCard: {
      ...base.processCard,
      backgroundColor: '#111827',
      border: '1px solid #1F2937'
    },
    processStepTitle: {
      ...base.processStepTitle,
      color: '#FFFFFF'
    },
    processStepDesc: {
      ...base.processStepDesc,
      color: '#94A3B8'
    },
    estTypeBtn: {
      ...base.estTypeBtn,
      backgroundColor: '#111827',
      border: '1px solid #334155',
      color: '#CBD5E1'
    },
    compBtn: {
      ...base.compBtn,
      backgroundColor: '#111827',
      border: '1px solid #334155',
      color: '#CBD5E1'
    },
    featureCheckboxLabel: {
      ...base.featureCheckboxLabel,
      color: '#CBD5E1'
    },
    estLabel: {
      ...base.estLabel,
      color: '#FFFFFF'
    },
    estResultCard: {
      ...base.estResultCard,
      backgroundColor: '#111827',
      border: '1px solid #1F2937'
    },
    teamDescription: {
      ...base.teamDescription,
      color: '#FFFFFF'
    },
    supportCard: {
      ...base.supportCard,
      backgroundColor: '#111827',
      border: '1px solid #1F2937'
    },
    supportCardPopular: {
      ...base.supportCardPopular,
      backgroundColor: '#111827',
      border: '2px solid #2563EB'
    },
    planName: {
      ...base.planName,
      color: '#FFFFFF'
    },
    responseBox: {
      ...base.responseBox,
      backgroundColor: '#0B0F19'
    },
    responseSpeed: {
      ...base.responseSpeed,
      color: '#FFFFFF'
    },
    planFeatureItem: {
      ...base.planFeatureItem,
      color: '#CBD5E1'
    },
    planBtn: {
      ...base.planBtn,
      backgroundColor: '#1E293B',
      border: '1px solid #334155',
      color: '#38BDF8'
    },
    faqAccordionItem: {
      ...base.faqAccordionItem,
      backgroundColor: '#111827',
      border: '1px solid #1F2937'
    },
    faqQText: {
      ...base.faqQText,
      color: '#FFFFFF'
    },
    faqAText: {
      ...base.faqAText,
      color: '#CBD5E1'
    },
    faqAnswerBox: {
      ...base.faqAnswerBox,
      borderTop: '1px solid #1F2937'
    },
    contactAddress: {
      ...base.contactAddress,
      color: '#FFFFFF'
    },
    instantWhatsappBox: {
      ...base.instantWhatsappBox,
      backgroundColor: '#111827',
      border: '1px solid #1F2937'
    },
    contactFormSide: {
      ...base.contactFormSide,
      backgroundColor: '#111827',
      border: '1px solid #1F2937'
    },
    fieldLabel: {
      ...base.fieldLabel,
      color: '#CBD5E1'
    },
    fieldInput: {
      ...base.fieldInput,
      backgroundColor: '#0F172A',
      color: '#FFFFFF',
      border: '1px solid #334155'
    },
    fieldSelect: {
      ...base.fieldSelect,
      backgroundColor: '#0F172A',
      color: '#FFFFFF',
      border: '1px solid #334155'
    },
    fieldTextarea: {
      ...base.fieldTextarea,
      backgroundColor: '#0F172A',
      color: '#FFFFFF',
      border: '1px solid #334155'
    },
    searchCommandBtn: {
      ...base.searchCommandBtn,
      backgroundColor: '#1E293B',
      border: '1px solid #334155',
      color: '#CBD5E1'
    },
    kbdShortcut: {
      ...base.kbdShortcut,
      backgroundColor: '#0F172A',
      color: '#CBD5E1'
    },
    themeToggleBtn: {
      ...base.themeToggleBtn,
      border: '1px solid #334155',
      color: '#FFFFFF'
    },
    commandModalCard: {
      ...base.commandModalCard,
      backgroundColor: '#111827',
      border: '1px solid #374151'
    },
    commandSearchRow: {
      ...base.commandSearchRow,
      borderBottom: '1px solid #1F2937'
    },
    commandInput: {
      ...base.commandInput,
      color: '#FFFFFF'
    },
    commandEscHint: {
      ...base.commandEscHint,
      backgroundColor: '#1E293B',
      color: '#94A3B8'
    },
    commandItemTitle: {
      ...base.commandItemTitle,
      color: '#FFFFFF'
    },
    commandItemDesc: {
      ...base.commandItemDesc,
      color: '#94A3B8'
    }
  };
};
