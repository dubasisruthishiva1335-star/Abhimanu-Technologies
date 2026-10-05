import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * Single 3D Visual Model Card
 * Renders a lightweight, high-performance real-time Three.js WebGL canvas inside the card
 * with 360° mouse drag rotation, idle spin, and mode toggle.
 */
function SingleModelCard({ modelType, title, subtitle, badge, price, specs, features, ctaText, ctaLink }) {
  const mountRef = useRef(null);
  const [wireframeOnly, setWireframeOnly] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const wireframeRef = useRef(wireframeOnly);
  wireframeRef.current = wireframeOnly;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 280;
    const height = container.clientHeight || 180;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 4, 11);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Lighting
    const amb = new THREE.AmbientLight(0xfff4db, 1.0);
    scene.add(amb);

    const dir = new THREE.DirectionalLight(0xffdf78, 2.0);
    dir.position.set(6, 12, 8);
    scene.add(dir);

    const rim = new THREE.DirectionalLight(0xb87333, 1.2);
    rim.position.set(-6, -4, -6);
    scene.add(rim);

    // Model Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // Dynamic Materials
    const goldPBR = new THREE.MeshStandardMaterial({
      color: 0x1c170c,
      emissive: 0xd4af37,
      emissiveIntensity: 0.35,
      roughness: 0.25,
      metalness: 0.9
    });

    const goldLine = new THREE.LineBasicMaterial({
      color: 0xffe066,
      transparent: true,
      opacity: 0.75
    });

    const meshList = [];

    // Construct Specific 3D Model based on modelType
    if (modelType === 'architecture') {
      // 3D Architectural Tower
      const floors = 6;
      for (let f = 0; f < floors; f++) {
        const fw = 4.2 - f * 0.3;
        const fd = 3.6 - f * 0.25;
        const fy = f * 1.1 - 2.8;

        const slabGeo = new THREE.BoxGeometry(fw, 0.2, fd);
        const slab = new THREE.Mesh(slabGeo, goldPBR);
        slab.position.y = fy;
        modelGroup.add(slab);
        meshList.push(slab);

        const edges = new THREE.EdgesGeometry(slabGeo);
        const line = new THREE.LineSegments(edges, goldLine);
        line.position.y = fy;
        modelGroup.add(line);

        // Columns
        const colGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.9, 6);
        [
          [-fw / 2 + 0.3, -fd / 2 + 0.3],
          [fw / 2 - 0.3, -fd / 2 + 0.3],
          [-fw / 2 + 0.3, fd / 2 - 0.3],
          [fw / 2 - 0.3, fd / 2 - 0.3]
        ].forEach(([cx, cz]) => {
          const col = new THREE.Mesh(colGeo, goldPBR);
          col.position.set(cx, fy + 0.55, cz);
          modelGroup.add(col);
          meshList.push(col);
        });
      }

      // Rooftop Spire
      const spireGeo = new THREE.ConeGeometry(0.3, 1.8, 6);
      const spire = new THREE.Mesh(spireGeo, goldPBR);
      spire.position.y = 4.5;
      modelGroup.add(spire);
      meshList.push(spire);

    } else if (modelType === 'ai') {
      // 3D AI Neural Network Core
      const coreGeo = new THREE.IcosahedronGeometry(2.0, 1);
      const coreMesh = new THREE.Mesh(coreGeo, goldPBR);
      modelGroup.add(coreMesh);
      meshList.push(coreMesh);

      const coreEdges = new THREE.EdgesGeometry(coreGeo);
      const coreLines = new THREE.LineSegments(coreEdges, goldLine);
      modelGroup.add(coreLines);

      // Orbiting Neural Nodes
      const orbitCount = 8;
      const nodeGeo = new THREE.SphereGeometry(0.2, 12, 12);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffe680 });
      for (let n = 0; n < orbitCount; n++) {
        const ang = (n / orbitCount) * Math.PI * 2;
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        node.position.set(Math.cos(ang) * 3.4, Math.sin(ang * 2) * 0.8, Math.sin(ang) * 3.4);
        modelGroup.add(node);
      }

    } else if (modelType === 'bim') {
      // 3D BIM Structural Steel Framework (Column-Beam Grid)
      const gridSize = 3;
      const spacing = 1.6;
      for (let x = -1; x <= 1; x++) {
        for (let z = -1; z <= 1; z++) {
          const colGeo = new THREE.CylinderGeometry(0.12, 0.12, 4.8, 8);
          const col = new THREE.Mesh(colGeo, goldPBR);
          col.position.set(x * spacing, 0, z * spacing);
          modelGroup.add(col);
          meshList.push(col);

          const edges = new THREE.EdgesGeometry(colGeo);
          const colLines = new THREE.LineSegments(edges, goldLine);
          colLines.position.set(x * spacing, 0, z * spacing);
          modelGroup.add(colLines);
        }
      }

      // Horizontal Beams
      const beamGeoX = new THREE.BoxGeometry(3.6, 0.18, 0.18);
      const beamGeoZ = new THREE.BoxGeometry(0.18, 0.18, 3.6);
      [-1.8, 0, 1.8].forEach((by) => {
        [-spacing, 0, spacing].forEach((pos) => {
          const bx = new THREE.Mesh(beamGeoX, goldPBR);
          bx.position.set(0, by, pos);
          modelGroup.add(bx);
          meshList.push(bx);

          const bz = new THREE.Mesh(beamGeoZ, goldPBR);
          bz.position.set(pos, by, 0);
          modelGroup.add(bz);
          meshList.push(bz);
        });
      });

    } else if (modelType === 'vastu') {
      // 3D Sri Meru Pyramid Geometry
      for (let p = 1; p <= 5; p++) {
        const pr = 3.6 - p * 0.6;
        const ph = 1.2;
        const py = (p - 1) * 0.8 - 1.8;

        const pyrGeo = new THREE.ConeGeometry(pr, ph, 4, 1);
        const pyr = new THREE.Mesh(pyrGeo, goldPBR);
        pyr.position.y = py;
        pyr.rotation.y = (p * Math.PI) / 4;
        modelGroup.add(pyr);
        meshList.push(pyr);

        const edges = new THREE.EdgesGeometry(pyrGeo);
        const pLines = new THREE.LineSegments(edges, goldLine);
        pLines.position.y = py;
        pLines.rotation.y = (p * Math.PI) / 4;
        modelGroup.add(pLines);
      }

      // Consecrated Apex Bindu
      const topBindu = new THREE.Mesh(
        new THREE.SphereGeometry(0.4, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      topBindu.position.y = 2.6;
      modelGroup.add(topBindu);
    }

    // Interactive Drag to Rotate Logic
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotVelX = 0;
    let rotVelY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      setIsInteracting(true);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      rotVelY = dx * 0.008;
      rotVelX = dy * 0.008;
      modelGroup.rotation.y += rotVelY;
      modelGroup.rotation.x += rotVelX;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 2000);
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support for mobile devices
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        setIsInteracting(true);
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - prevMouseX;
      const dy = e.touches[0].clientY - prevMouseY;
      modelGroup.rotation.y += dx * 0.01;
      modelGroup.rotation.x += dy * 0.01;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    };
    const onTouchEnd = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 2000);
    };

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    // Handle Resize
    const onResize = () => {
      if (!container) return;
      const nw = container.clientWidth || 280;
      const nh = container.clientHeight || 180;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    // Render Loop
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Auto-spin smoothly when user is not dragging
      if (!isDragging) {
        modelGroup.rotation.y += 0.012;
      }

      // Synchronize wireframe state
      meshList.forEach((m) => {
        m.visible = !wireframeRef.current;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelType]);

  return (
    <div className="group relative rounded-3xl p-6 bg-gradient-to-b from-[#13131a]/90 via-[#0e0e14]/90 to-[#08080a]/95 border border-white/10 hover:border-yellow-500/50 transition-all duration-500 flex flex-col justify-between hover:shadow-[0_0_35px_rgba(212,175,55,0.2)] hover:-translate-y-1">
      {/* Animated Glowing Top Border Beam */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div>
        {/* Badge & Mode Controls */}
        <div className="flex justify-between items-center mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-yellow-500/10 border border-yellow-500/30 text-yellow-400">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping"></span>
            {badge}
          </span>
          <button
            onClick={() => setWireframeOnly(!wireframeOnly)}
            className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 hover:text-yellow-400 px-2 py-0.5 rounded border border-white/10 hover:border-yellow-500/30 bg-black/40 transition"
            title="Toggle Wireframe view"
          >
            {wireframeOnly ? '⚡ Solid' : '📐 Wireframe'}
          </button>
        </div>

        {/* Live 3D Interactive WebGL Canvas */}
        <div className="relative w-full h-44 rounded-2xl bg-black/60 border border-white/5 overflow-hidden my-3 cursor-grab active:cursor-grabbing flex items-center justify-center">
          <div ref={mountRef} className="w-full h-full" />
          
          {/* Subtle 3D Navigation Hint */}
          <div className="absolute bottom-2 left-2 pointer-events-none text-[9px] uppercase tracking-widest text-gray-400/80 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded flex items-center gap-1">
            <span>🔄</span> Drag 360°
          </div>
          {isInteracting && (
            <div className="absolute top-2 right-2 pointer-events-none text-[9px] uppercase tracking-wider text-yellow-300 font-bold bg-yellow-500/20 px-2 py-0.5 rounded border border-yellow-500/40 animate-pulse">
              Active Orbit
            </div>
          )}
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-xl font-bold font-['Space_Grotesk'] text-white group-hover:text-yellow-300 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-yellow-400/90 font-medium mt-0.5">{subtitle}</p>
        <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">{specs}</p>

        {/* Highlighted Feature Pills */}
        <div className="mt-4 space-y-1.5">
          {features.map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
              <span className="text-yellow-400 text-[11px]">✓</span>
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
        <div>
          <span className="text-[10px] text-gray-400 block uppercase tracking-wider">Starting Rate</span>
          <span className="text-lg font-bold font-['Space_Grotesk'] text-white text-gradient">{price}</span>
        </div>
        <a
          href={ctaLink}
          className="bg-yellow-500/10 hover:bg-yellow-400 text-yellow-300 hover:text-black border border-yellow-500/40 px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-1 shadow-sm"
        >
          <span>{ctaText}</span>
          <span>→</span>
        </a>
      </div>
    </div>
  );
}

/**
 * Interactive 3D Visual Model Cards Showcase Component
 */
export default function Interactive3DModelCards() {
  const cards = [
    {
      modelType: 'architecture',
      title: '3D High-Rise Elevation',
      subtitle: 'AutoCAD + 3D Elevation',
      badge: 'LIVE 3D MODEL',
      price: '₹15 / sq.ft',
      specs: 'Precision 2D floor plans, parametric elevations, and high-impact photorealistic 3D visualization.',
      features: [
        '2D Floor Plans & Sections',
        '3D Exterior Elevations',
        '24-48hr Milestone Delivery',
        'GHMC & TS-bPASS Norms'
      ],
      ctaText: 'Get Quote',
      ctaLink: '#contact'
    },
    {
      modelType: 'ai',
      title: 'AI Neural Matrix Core',
      subtitle: 'Software & Workflow Agents',
      badge: 'AI ENGINE 3D',
      price: 'From ₹50k',
      specs: 'Custom builder portals, automated WhatsApp lead qualifier bots, and AI drawing estimation systems.',
      features: [
        '3-Sec WhatsApp Auto-Responder',
        'Real Estate Lead CRM',
        'Custom Web & Mobile Apps',
        'Zero Vendor Lock-In'
      ],
      ctaText: 'Demo Build',
      ctaLink: '#contact'
    },
    {
      modelType: 'bim',
      title: 'BIM Structural Framework',
      subtitle: 'Revit BIM + Structural MEP',
      badge: 'BIM 3D STEEL',
      price: 'From ₹25k/mo',
      specs: 'Full Revit BIM structural models, clash detection reports, and BOQ estimation packages.',
      features: [
        'LOD 300 / 400 Modeling',
        'Clash Detection Matrix',
        'MEP Conduits Coordination',
        'Vetted Dedicated Engineers'
      ],
      ctaText: 'Hire BIM Lead',
      ctaLink: '#contact'
    },
    {
      modelType: 'vastu',
      title: 'Vastu Maha Meru Citadel',
      subtitle: 'Sacred Vastu & Demarcation',
      badge: 'VASTU 3D MERU',
      price: 'From ₹5k',
      specs: '100% Vastu Shastra orientation analysis, Brahmasthan energy zones, and sacred coordinate planning.',
      features: [
        '16 Vastu Zones Demarcation',
        'Brahmasthan Zero-Load Plan',
        'Solar Path & Wind Orientation',
        'CAD Vastu Layer Included'
      ],
      ctaText: 'Verify Vastu',
      ctaLink: '#contact'
    }
  ];

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 border border-yellow-500/40 bg-yellow-500/10 rounded-full px-4 py-1.5 text-[11px] tracking-[0.25em] text-yellow-400 font-bold uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping"></span>
            ● REAL-TIME 3D VISUAL MODEL SHOWCASE
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] text-white">
            Interactive 3D Visual Model Cards
          </h2>
          <p className="text-gray-400 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
            Interact with live 3D models directly within each card below. Click and drag in 360° to inspect our architectural elevations, AI neural systems, BIM structural frames, and sacred Vastu geometries.
          </p>
        </div>

        {/* Global Control Hint */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-black/50 border border-white/10 text-xs text-gray-300 flex items-center gap-2">
            <span className="text-yellow-400 text-sm">💡</span>
            <span>Click & drag any 3D model to rotate in real time</span>
          </div>
        </div>
      </div>

      {/* 4 Responsive 3D Visual Model Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c, idx) => (
          <SingleModelCard key={idx} {...c} />
        ))}
      </div>
    </div>
  );
}
