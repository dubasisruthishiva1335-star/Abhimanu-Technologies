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
  { title: 'AI and Automation', category: 'Service', anchor: 'services', desc: 'Chat assistants, document processing, workflows' }
];

const SERVICES = [
  {
    id: 'mobile-apps',
    title: 'Mobile app development',
    subtitle: 'Android and iOS apps that feel native and ship from one codebase when that makes sense.',
    bullets: ['Flutter and React Native', 'Native Android and iOS', 'App store launch'],
    badge: null
  },
  {
    id: 'web-development',
    title: 'Web application development',
    subtitle: 'Fast, secure web platforms, portals and dashboards built to grow with your business.',
    bullets: ['React, Node.js, Python', 'APIs and integrations', 'Admin dashboards'],
    badge: null
  },
  {
    id: 'maintenance',
    title: 'Application maintenance',
    subtitle: 'Bug fixes, security patches, performance tuning and new features after launch, under a clear service agreement.',
    bullets: ['Monitoring and alerts', 'Monthly patch cycle', 'Support plans from 8x5 to 24x7'],
    badge: null
  },
  {
    id: 'it-services',
    title: 'IT services and consulting',
    subtitle: 'Architecture reviews, technology selection, system integration and ongoing IT support for your team.',
    bullets: ['Technical audits', 'System integration', 'Staff augmentation'],
    badge: null
  },
  {
    id: 'cloud-devops',
    title: 'Cloud and DevOps',
    subtitle: 'Hosting, pipelines and infrastructure that deploy safely many times a day and scale on demand.',
    bullets: ['AWS, Azure, Google Cloud', 'CI/CD automation', 'Cost optimization'],
    badge: null
  },
  {
    id: 'ui-ux',
    title: 'UI and UX design',
    subtitle: 'Research-led interface design with prototypes you can click before a line of code is written.',
    bullets: ['Design systems', 'Interactive prototypes', 'Usability testing'],
    badge: null
  },
  {
    id: '3d-animation',
    title: '3D animation and visuals',
    subtitle: 'Product renders, explainer animations and interactive 3D for websites and apps, built in-house.',
    bullets: ['Product visualization', 'WebGL experiences', 'Motion and promo films'],
    badge: 'NEW'
  },
  {
    id: 'ai-automation',
    title: 'AI and automation',
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
    desc: 'Browser-based 3D architectural viewer with live clash detection and multi-user issue pinning.'
  },
  {
    title: 'Fleet & Route Telematics',
    tag: 'Logistics',
    desc: 'Real-time GPS tracking dashboard with geofencing, driver fatigue alerts, and automated trip logs.'
  },
  {
    title: 'FieldOps Snag Inspection',
    tag: 'Site Engineering',
    desc: 'Offline-first tablet app for civil site engineers with voice memos, photo markup, and automated BOQ sync.'
  },
  {
    title: '3D Product Customizer',
    tag: 'E-Commerce',
    desc: 'Photorealistic WebGL configurator allowing shoppers to personalize colors, finishes, and order in AR.'
  },
  {
    title: 'Tele-Health Clinic Portal',
    tag: 'Healthcare',
    desc: 'HIPAA-compliant web platform for encrypted video consults, prescription routing, and patient records.'
  },
  {
    title: 'FinTech Micro-Lending Hub',
    tag: 'Finance',
    desc: 'Instant KYC verification, credit scoring algorithms, and automated disbursal rails via UPI and netbanking.'
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
    q: 'Who owns the source code?',
    a: 'You do. At the end of the project we hand over the full source code, documentation and access to every account we set up for you.'
  },
  {
    q: 'Can you take over an app someone else built?',
    a: 'Yes. We start with a short technical audit of the code, hosting and security, then give you a plan to stabilize it and a support plan to keep it healthy.'
  },
  {
    q: 'Do you work on fixed price or monthly teams?',
    a: 'Both. Clear scopes suit a fixed price. Evolving products usually work better with a monthly team that you can grow or shrink.'
  },
  {
    q: 'What do your 3D projects include?',
    a: 'Modeling, texturing, lighting, animation and rendering for videos and images, plus real-time 3D that runs inside websites and apps.'
  },
  {
    q: 'How do we stay in touch during a project?',
    a: 'You get a shared board, a demo every two weeks and a single point of contact who answers within one working day.'
  }
];

// --- THREE.JS 3D HERO CANVAS (CHAKRA - 6 RINGS) ---
function ChakraCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

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
    const ringColors = [0x2563eb, 0x0ea5e9, 0x06b6d4, 0x10b981, 0x8b5cf6, 0xd97706];

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
        const spokeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
        const spoke = new THREE.Mesh(spokeGeom, spokeMat);
        spoke.position.x = radius;
        ringMesh.add(spoke);
      }
    }

    // Central glowing core orb
    const coreGeom = new THREE.IcosahedronGeometry(0.45, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      emissive: 0x1d4ed8,
      roughness: 0.1,
      metalness: 0.8
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    chakraGroup.add(coreMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x38bdf8, 2, 20);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x818cf8, 1.5, 20);
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
  }, []);

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
  const isDraggingRef = useRef(false);
  const prevMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

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
      <div style={styles.studioCanvasBadgeRow}>
        <span style={styles.webglTag}>REAL-TIME WEBGL</span>
        <span style={styles.dragTag}>DRAG TO ROTATE</span>
      </div>
      <div ref={mountRef} style={styles.canvasMount} />
    </div>
  );
}

// --- THREE.JS 3D BUILDING VIEWER (INDUSTRIES SECTION) ---
function BuildingCanvas({ storeys, explodePercent, showStructure, showServices, showFacade, autoRotate }) {
  const mountRef = useRef(null);
  const buildingGroupRef = useRef(null);
  const isDraggingRef = useRef(false);
  const prevMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 420;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(6, 7, 9);
    camera.lookAt(0, storeys * 0.25, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

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
      <div style={styles.studioCanvasBadgeRow}>
        <span style={styles.webglTag}>WEB BUILDING VIEWER · DEMO</span>
        <span style={styles.dragTag}>DRAG TO ROTATE</span>
      </div>
      <div ref={mountRef} style={styles.canvasMountTall} />
    </div>
  );
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

  // Contact Form State
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceNeed: 'Web application development',
    details: ''
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

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

  const calcSuggestedTeam = () => {
    let roles = ['1 Lead Architect', '2 Full-Stack Engineers'];
    if (estFeatures.threeD) roles.push('1 3D / WebGL Specialist');
    if (estFeatures.ai) roles.push('1 AI & Data Engineer');
    roles.push('1 UI/UX Designer', '1 QA Engineer');
    return roles.join(' · ');
  };

  const handleSendEstimateToContact = () => {
    const summary = `Selected Building: ${estBuildingType} | Complexity: ${estComplexity} | Features: ${Object.keys(estFeatures).filter((k) => estFeatures[k]).join(', ')} | Timeline: ${calcTimelineWeeks()}`;
    setContactData((prev) => ({
      ...prev,
      serviceNeed: estBuildingType,
      details: `Project Estimate Summary:\n${summary}\n\nAdditional notes:`
    }));
    const contactElem = document.getElementById('contact');
    if (contactElem) contactElem.scrollIntoView({ behavior: 'smooth' });
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
            <a href="#services" onClick={(e) => scrollTo(e, 'services')} style={styles.navItem}>Services</a>
            <a href="#studio" onClick={(e) => scrollTo(e, 'studio')} style={styles.navItem}>3D Studio</a>
            <a href="#industries" onClick={(e) => scrollTo(e, 'industries')} style={styles.navItem}>Industries</a>
            <a href="#work" onClick={(e) => scrollTo(e, 'work')} style={styles.navItem}>Work</a>
            <a href="#estimate" onClick={(e) => scrollTo(e, 'estimate')} style={styles.navItem}>Estimator</a>
            <a href="#support" onClick={(e) => scrollTo(e, 'support')} style={styles.navItem}>Support</a>
            <a href="#faq" onClick={(e) => scrollTo(e, 'faq')} style={styles.navItem}>FAQ</a>
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
                onClick={toggleTheme}
                style={styles.themeToggleBtn}
              >
                {isDark ? '☀️ Light' : '🌙 Dark'}
              </button>
            </div>
            <a href="#services" onClick={(e) => scrollTo(e, 'services')} style={styles.mobileMenuItem}>Services</a>
            <a href="#studio" onClick={(e) => scrollTo(e, 'studio')} style={styles.mobileMenuItem}>3D Studio</a>
            <a href="#industries" onClick={(e) => scrollTo(e, 'industries')} style={styles.mobileMenuItem}>Industries</a>
            <a href="#work" onClick={(e) => scrollTo(e, 'work')} style={styles.mobileMenuItem}>Work</a>
            <a href="#estimate" onClick={(e) => scrollTo(e, 'estimate')} style={styles.mobileMenuItem}>Estimator</a>
            <a href="#support" onClick={(e) => scrollTo(e, 'support')} style={styles.mobileMenuItem}>Support</a>
            <a href="#faq" onClick={(e) => scrollTo(e, 'faq')} style={styles.mobileMenuItem}>FAQ</a>
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
                We <em>build</em> your applications, keep them running and bring them to life in 3D.
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
              <ChakraCanvas />
            </div>
          </div>
        </div>
      </section>

      {/* --- WHAT WE DO / SERVICES SECTION --- */}
      <section id="services" style={styles.section}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionEyebrow}>What we do</span>
            <h2 style={styles.sectionTitle}>Build it. Run it. Make it unforgettable.</h2>
            <p style={styles.sectionSubtitle}>
              One team for the whole life of your software, from the first screen design to the on-call phone at 3 a.m.
            </p>
          </div>

          <div style={styles.servicesGrid}>
            {SERVICES.map((s) => (
              <div key={s.id} style={styles.serviceCard}>
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
              </div>
            ))}
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
                onClick={() => setActiveAppCategory(cat)}
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

                <div style={styles.statsWidgetRow}>
                  <div style={styles.statWidget}>
                    <div style={styles.statValue}>248</div>
                    <div style={styles.statLabel}>Orders</div>
                  </div>
                  <div style={styles.statWidget}>
                    <div style={styles.statValue}>₹1.9L</div>
                    <div style={styles.statLabel}>Revenue</div>
                  </div>
                  <div style={styles.statWidget}>
                    <div style={styles.statValue}>96%</div>
                    <div style={styles.statLabel}>Delivery on time</div>
                  </div>
                </div>

                {/* Orders List */}
                <div style={styles.ordersSection}>
                  <div style={styles.ordersHeadingRow}>
                    <span style={styles.ordersHeading}>Orders</span>
                    <span style={styles.ordersFilter}>All (5)</span>
                  </div>

                  <div style={styles.orderItem}>
                    <span>#4821 · Packed</span>
                    <span style={styles.statusReady}>Ready</span>
                  </div>
                  <div style={styles.orderItem}>
                    <span>#4820 · In transit</span>
                    <span style={styles.statusTransit}>On the way</span>
                  </div>
                  <div style={styles.orderItem}>
                    <span>#4819 · Delivered</span>
                    <span style={styles.statusDone}>Done</span>
                  </div>
                  <div style={styles.orderItem}>
                    <span>#4818 · Delivered</span>
                    <span style={styles.statusDone}>Done</span>
                  </div>
                  <div style={styles.orderItem}>
                    <span>#4817 · Payment due</span>
                    <span style={styles.statusPending}>Pending</span>
                  </div>
                </div>

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
            <div style={styles.ringControlsRow}>
              <button
                onClick={() => setRingIndex((prev) => (prev === 0 ? SAMPLE_CONCEPTS.length - 1 : prev - 1))}
                style={styles.ringArrowBtn}
                aria-label="Previous concept"
              >
                &larr; Prev
              </button>
              <span style={styles.ringIndicator}>
                {ringIndex + 1} / {SAMPLE_CONCEPTS.length}
              </span>
              <button
                onClick={() => setRingIndex((prev) => (prev + 1) % SAMPLE_CONCEPTS.length)}
                style={styles.ringArrowBtn}
                aria-label="Next concept"
              >
                Next &rarr;
              </button>
            </div>

            <div style={styles.conceptRingTabs}>
              {SAMPLE_CONCEPTS.map((sc, idx) => (
                <button
                  key={idx}
                  onClick={() => setRingIndex(idx)}
                  style={ringIndex === idx ? styles.activeRingTab : styles.ringTab}
                >
                  <span style={styles.ringTabNum}>0{idx + 1}</span>
                  <span style={styles.ringTabLabel}>{sc.title}</span>
                </button>
              ))}
            </div>

            <div style={styles.ringCardDisplay}>
              <span style={styles.conceptTag}>{SAMPLE_CONCEPTS[ringIndex].tag}</span>
              <h3 style={styles.conceptTitle}>{SAMPLE_CONCEPTS[ringIndex].title}</h3>
              <p style={styles.conceptDesc}>{SAMPLE_CONCEPTS[ringIndex].desc}</p>
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

            <p style={styles.sampleDisclaimer}>
              Sample concepts shown for illustration, not client projects.
            </p>
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

                <button onClick={handleSendEstimateToContact} style={styles.sendEstimateBtn}>
                  Send this estimate &rarr;
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
        </div>
      </section>

      {/* --- QUESTIONS / FAQ --- */}
      <section id="faq" style={styles.sectionLight}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionEyebrow}>Questions</span>
            <h2 style={styles.sectionTitle}>Things people ask before they start.</h2>
          </div>

          <div style={styles.faqWrapper}>
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} style={styles.faqAccordionItem}>
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
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
