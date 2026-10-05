import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * 3D Hologram & Architectural BIM Viewer
 * Powered by Three.js (WebGL)
 * Interactive modes:
 *  1. 'cad'     - 3D CAD Architectural Skyscraper with explodable floor levels
 *  2. 'bim'     - 3D BIM Structural Grid & MEP Conduit Routing
 *  3. 'yantra'  - Sacred Sri Yantra 3D Meru Hologram with 9 interlocking sacred pyramids
 */
export default function ThreeHologramViewer() {
  const mountRef = useRef(null);
  const [activeMode, setActiveMode] = useState('cad'); // 'cad' | 'bim' | 'yantra'
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [explodeFactor, setExplodeFactor] = useState(0); // 0 to 1
  const [colorTheme, setColorTheme] = useState('gold'); // 'gold' | 'cyan'
  const [activeFloorHover, setActiveFloorHover] = useState(null);

  // References to communicate between React state and Three.js render loop
  const stateRef = useRef({
    mode: 'cad',
    autoRotate: true,
    explode: 0,
    theme: 'gold',
    groups: {
      cad: null,
      bim: null,
      yantra: null,
      particles: null
    },
    floorMeshes: []
  });

  // Keep stateRef in sync with React state
  useEffect(() => {
    stateRef.current.mode = activeMode;
  }, [activeMode]);

  useEffect(() => {
    stateRef.current.autoRotate = isAutoRotating;
  }, [isAutoRotating]);

  useEffect(() => {
    stateRef.current.explode = explodeFactor;
  }, [explodeFactor]);

  useEffect(() => {
    stateRef.current.theme = colorTheme;
    updateThemeMaterials(colorTheme);
  }, [colorTheme]);

  // Color palette definitions
  const PALETTES = {
    gold: {
      primary: 0xe6c07a,
      secondary: 0xd4af37,
      core: 0xffd700,
      glow: 0xfff2a8,
      accent: 0xff9900,
      bg: 0x08080a
    },
    cyan: {
      primary: 0x00e5ff,
      secondary: 0x00a3ff,
      core: 0x00f0ff,
      glow: 0x80ffff,
      accent: 0x7c4dff,
      bg: 0x08080a
    }
  };

  const materialsRef = useRef({
    gold: null,
    cyan: null
  });

  const updateThemeMaterials = (themeKey) => {
    const palette = PALETTES[themeKey] || PALETTES.gold;
    const { groups } = stateRef.current;
    if (!groups.cad) return;

    // Traverse and update colors smoothly
    [groups.cad, groups.bim, groups.yantra].forEach((group) => {
      if (!group) return;
      group.traverse((child) => {
        if (child.isLineSegments && child.material) {
          child.material.color.setHex(palette.primary);
        } else if (child.isMesh && child.material) {
          if (child.material.color) {
            child.material.color.setHex(palette.primary);
          }
          if (child.material.emissive) {
            child.material.emissive.setHex(palette.secondary);
          }
        }
      });
    });

    if (groups.particles && groups.particles.material) {
      groups.particles.material.color.setHex(palette.core);
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08080a, 0.025);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(22, 18, 26);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // transparent background
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xfff5dd, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight1.position.set(25, 40, 20);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xe6c07a, 1.2);
    dirLight2.position.set(-20, -10, -20);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffd700, 2.5, 60);
    pointLight.position.set(0, 5, 0);
    scene.add(pointLight);

    // 3. Materials
    const palette = PALETTES.gold;
    const lineMat = new THREE.LineBasicMaterial({
      color: palette.primary,
      transparent: true,
      opacity: 0.85
    });

    const slabMat = new THREE.MeshStandardMaterial({
      color: palette.primary,
      emissive: palette.secondary,
      emissiveIntensity: 0.2,
      roughness: 0.3,
      metalness: 0.8,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide
    });

    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x112233,
      emissive: 0x0a1a2f,
      emissiveIntensity: 0.4,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.45
    });

    const mepMatCyan = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x0088cc,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.7
    });

    const mepMatOrange = new THREE.MeshStandardMaterial({
      color: 0xff7700,
      emissive: 0xbb4400,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.7
    });

    // 4. Construct MODE 1: CAD Architectural Skyscraper
    const cadGroup = new THREE.Group();
    const floorMeshes = [];
    const numFloors = 7;
    const floorSpacing = 2.4;

    for (let f = 0; f < numFloors; f++) {
      const floorUnit = new THREE.Group();
      floorUnit.userData = {
        baseY: (f - (numFloors - 1) / 2) * floorSpacing,
        floorIndex: f,
        name: `Level 0${f + 1}`
      };
      floorUnit.position.y = floorUnit.userData.baseY;

      // Slab dimensions (step down slightly for upper terrace)
      const slabW = 12 - f * 0.45;
      const slabD = 10 - f * 0.35;
      const slabH = 0.25;

      // Floor slab mesh
      const slabGeo = new THREE.BoxGeometry(slabW, slabH, slabD);
      const slabMesh = new THREE.Mesh(slabGeo, slabMat);
      floorUnit.add(slabMesh);

      // Floor slab golden edge wireframe
      const slabEdges = new THREE.EdgesGeometry(slabGeo);
      const slabLines = new THREE.LineSegments(slabEdges, lineMat);
      floorUnit.add(slabLines);

      // Central core / elevator shaft
      const coreGeo = new THREE.BoxGeometry(3, floorSpacing - slabH, 3);
      const coreMesh = new THREE.Mesh(coreGeo, glassMat);
      coreMesh.position.y = (floorSpacing - slabH) / 2;
      floorUnit.add(coreMesh);

      const coreEdges = new THREE.EdgesGeometry(coreGeo);
      const coreLines = new THREE.LineSegments(coreEdges, lineMat);
      coreLines.position.y = (floorSpacing - slabH) / 2;
      floorUnit.add(coreLines);

      // Structural Columns (4 corner columns + 2 perimeter columns)
      const colRadius = 0.16;
      const colHeight = floorSpacing - slabH;
      const colGeo = new THREE.CylinderGeometry(colRadius, colRadius, colHeight, 8);

      const colPositions = [
        [-(slabW / 2 - 0.6), -(slabD / 2 - 0.6)],
        [(slabW / 2 - 0.6), -(slabD / 2 - 0.6)],
        [-(slabW / 2 - 0.6), (slabD / 2 - 0.6)],
        [(slabW / 2 - 0.6), (slabD / 2 - 0.6)],
        [0, -(slabD / 2 - 0.6)],
        [0, (slabD / 2 - 0.6)]
      ];

      colPositions.forEach(([cx, cz]) => {
        const colMesh = new THREE.Mesh(colGeo, slabMat);
        colMesh.position.set(cx, colHeight / 2, cz);
        floorUnit.add(colMesh);

        const colEdges = new THREE.EdgesGeometry(colGeo);
        const colLines = new THREE.LineSegments(colEdges, lineMat);
        colLines.position.set(cx, colHeight / 2, cz);
        floorUnit.add(colLines);
      });

      // Glass Curtain Facade Wall
      const facadeGeo = new THREE.BoxGeometry(slabW - 0.4, colHeight, slabD - 0.4);
      const facadeMesh = new THREE.Mesh(facadeGeo, glassMat);
      facadeMesh.position.y = colHeight / 2;
      floorUnit.add(facadeMesh);

      cadGroup.add(floorUnit);
      floorMeshes.push(floorUnit);
    }

    // Ground Plot Demarcation Grid (Vastu Demarcation)
    const gridHelper = new THREE.GridHelper(26, 26, palette.secondary, 0x222226);
    gridHelper.position.y = - (numFloors * floorSpacing) / 2 - 0.5;
    cadGroup.add(gridHelper);

    // Dimension Compass Ring
    const compassGeo = new THREE.RingGeometry(14, 14.15, 64);
    const compassMat = new THREE.MeshBasicMaterial({
      color: palette.secondary,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4
    });
    const compassMesh = new THREE.Mesh(compassGeo, compassMat);
    compassMesh.rotation.x = Math.PI / 2;
    compassMesh.position.y = gridHelper.position.y;
    cadGroup.add(compassMesh);

    scene.add(cadGroup);
    stateRef.current.groups.cad = cadGroup;
    stateRef.current.floorMeshes = floorMeshes;

    // 5. Construct MODE 2: BIM Structural & MEP Routing
    const bimGroup = new THREE.Group();
    bimGroup.visible = false;

    // Structural Concrete Grid (Exoskeleton)
    const beamMat = new THREE.MeshStandardMaterial({
      color: 0x4a4f5c,
      metalness: 0.9,
      roughness: 0.2
    });

    for (let level = 0; level < 5; level++) {
      const ly = (level - 2) * 3;
      // Perimeter beams
      const beamGeoX = new THREE.BoxGeometry(12, 0.4, 0.4);
      const beamX1 = new THREE.Mesh(beamGeoX, beamMat);
      beamX1.position.set(0, ly, 5);
      const beamX2 = new THREE.Mesh(beamGeoX, beamMat);
      beamX2.position.set(0, ly, -5);
      bimGroup.add(beamX1, beamX2);

      const beamGeoZ = new THREE.BoxGeometry(0.4, 0.4, 10);
      const beamZ1 = new THREE.Mesh(beamGeoZ, beamMat);
      beamZ1.position.set(6, ly, 0);
      const beamZ2 = new THREE.Mesh(beamGeoZ, beamMat);
      beamZ2.position.set(-6, ly, 0);
      bimGroup.add(beamZ1, beamZ2);

      // MEP Cyan Conduits (HVAC & Water Pipeline)
      const pipeGeo = new THREE.CylinderGeometry(0.12, 0.12, 11, 16);
      const pipe1 = new THREE.Mesh(pipeGeo, mepMatCyan);
      pipe1.rotation.z = Math.PI / 2;
      pipe1.position.set(0, ly + 0.6, 2.5);
      bimGroup.add(pipe1);

      // HVAC Air Ducts (Orange Rectangular conduits)
      const ductGeo = new THREE.BoxGeometry(0.8, 0.5, 9);
      const duct1 = new THREE.Mesh(ductGeo, mepMatOrange);
      duct1.position.set(3, ly + 0.8, 0);
      bimGroup.add(duct1);
    }

    // Heavy foundation footings
    const footingGeo = new THREE.BoxGeometry(2.5, 1, 2.5);
    const footingPositions = [
      [-6, -7, -5],
      [6, -7, -5],
      [-6, -7, 5],
      [6, -7, 5]
    ];
    footingPositions.forEach(([fx, fy, fz]) => {
      const footing = new THREE.Mesh(footingGeo, beamMat);
      footing.position.set(fx, fy, fz);
      bimGroup.add(footing);
    });

    scene.add(bimGroup);
    stateRef.current.groups.bim = bimGroup;

    // 6. Construct MODE 3: Sacred 3D Sri Yantra Meru Hologram
    const yantraGroup = new THREE.Group();
    yantraGroup.visible = false;

    // 9 Interlocking Pyramids with sacred geometry
    const pyramidLayers = [
      { r: 9, h: 4, y: -4, inv: false },
      { r: 7.5, h: 3.5, y: -2, inv: true },
      { r: 6.2, h: 3.2, y: -0.5, inv: false },
      { r: 5, h: 2.8, y: 1, inv: true },
      { r: 4, h: 2.4, y: 2.2, inv: false },
      { r: 3, h: 2, y: 3.2, inv: true },
      { r: 2.2, h: 1.6, y: 4.2, inv: false },
      { r: 1.5, h: 1.2, y: 5.0, inv: true },
      { r: 0.8, h: 0.9, y: 5.8, inv: false }
    ];

    pyramidLayers.forEach((layer) => {
      const coneGeo = new THREE.ConeGeometry(layer.r, layer.h, 3);
      const coneEdges = new THREE.EdgesGeometry(coneGeo);
      const pyrLine = new THREE.LineSegments(coneEdges, lineMat);

      pyrLine.position.y = layer.y;
      if (layer.inv) {
        pyrLine.rotation.x = Math.PI;
        pyrLine.rotation.y = Math.PI / 3;
      }
      yantraGroup.add(pyrLine);

      // Semi-transparent sacred gold faces
      const coneMesh = new THREE.Mesh(
        coneGeo,
        new THREE.MeshStandardMaterial({
          color: palette.secondary,
          emissive: palette.core,
          emissiveIntensity: 0.15,
          transparent: true,
          opacity: 0.18,
          wireframe: false,
          side: THREE.DoubleSide
        })
      );
      coneMesh.position.y = layer.y;
      if (layer.inv) {
        coneMesh.rotation.x = Math.PI;
        coneMesh.rotation.y = Math.PI / 3;
      }
      yantraGroup.add(coneMesh);
    });

    // Central Divine Bindu Sphere
    const binduGeo = new THREE.SphereGeometry(0.35, 32, 32);
    const binduMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const binduMesh = new THREE.Mesh(binduGeo, binduMat);
    binduMesh.position.y = 6.4;
    yantraGroup.add(binduMesh);

    // Sacred Concentric Lotus Petal Rings (16 & 8 Petals)
    const ring1Geo = new THREE.RingGeometry(9.6, 9.8, 64);
    const ring1 = new THREE.Mesh(ring1Geo, compassMat);
    ring1.rotation.x = Math.PI / 2;
    ring1.position.y = -5;
    yantraGroup.add(ring1);

    const ring2Geo = new THREE.RingGeometry(11.2, 11.45, 64);
    const ring2 = new THREE.Mesh(ring2Geo, compassMat);
    ring2.rotation.x = Math.PI / 2;
    ring2.position.y = -5;
    yantraGroup.add(ring2);

    scene.add(yantraGroup);
    stateRef.current.groups.yantra = yantraGroup;

    // 7. Ambient Stardust Particles (Vastu Cosmic Starfield)
    const particleCount = 600;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 55;
      particlePositions[i + 1] = (Math.random() - 0.5) * 45;
      particlePositions[i + 2] = (Math.random() - 0.5) * 55;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.Float32BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: palette.core,
      size: 0.18,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    scene.add(particlePoints);
    stateRef.current.groups.particles = particlePoints;

    // 8. Interactive Orbit / Drag Camera Controls (Zero-Dependency)
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let spherical = {
      radius: 36,
      theta: Math.PI / 4,
      phi: Math.PI / 3
    };

    const updateCameraFromSpherical = () => {
      spherical.phi = Math.max(0.1, Math.min(Math.PI / 2 - 0.05, spherical.phi));
      spherical.radius = Math.max(12, Math.min(60, spherical.radius));
      camera.position.x = spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
      camera.position.y = spherical.radius * Math.cos(spherical.phi);
      camera.position.z = spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
      camera.lookAt(0, 0, 0);
    };
    updateCameraFromSpherical();

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      spherical.theta -= deltaX * 0.008;
      spherical.phi -= deltaY * 0.008;
      updateCameraFromSpherical();
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e) => {
      e.preventDefault();
      spherical.radius += e.deltaY * 0.03;
      updateCameraFromSpherical();
    };

    // Touch support
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;

      spherical.theta -= deltaX * 0.01;
      spherical.phi -= deltaY * 0.01;
      updateCameraFromSpherical();
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('touchend', onTouchEnd);

    // 9. Resize Listener
    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth || 600;
      const nh = container.clientHeight || 500;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    // 10. Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Mode Visibility Transition
      const currentMode = stateRef.current.mode;
      if (cadGroup) cadGroup.visible = currentMode === 'cad';
      if (bimGroup) bimGroup.visible = currentMode === 'bim';
      if (yantraGroup) yantraGroup.visible = currentMode === 'yantra';

      // Auto rotation
      if (stateRef.current.autoRotate && !isDragging) {
        spherical.theta += delta * 0.25;
        updateCameraFromSpherical();
      }

      // Explode floors in CAD mode
      if (currentMode === 'cad') {
        const factor = stateRef.current.explode;
        floorMeshes.forEach((fl, idx) => {
          const targetY = fl.userData.baseY + (idx - 3) * factor * 2.5;
          fl.position.y += (targetY - fl.position.y) * 0.15;
        });
      }

      // Meru rotation & pulsing
      if (currentMode === 'yantra') {
        yantraGroup.rotation.y += delta * 0.2;
        binduMesh.scale.setScalar(1 + Math.sin(elapsedTime * 4) * 0.25);
        pointLight.intensity = 2.0 + Math.sin(elapsedTime * 3) * 0.8;
      }

      // Particle subtle drift
      if (particlePoints) {
        particlePoints.rotation.y = elapsedTime * 0.02;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 11. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div className="relative w-full rounded-3xl border border-yellow-500/30 bg-gradient-to-b from-[#0e0e12] via-[#09090b] to-[#08080a] shadow-[0_0_60px_rgba(212,175,55,0.12)] overflow-hidden">
      
      {/* Top Header & Live Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 md:p-6 border-b border-white/10 bg-black/40 backdrop-blur-sm z-20 relative">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-yellow-400 animate-ping"></div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-[0.25em] text-yellow-400 font-bold">
                Interactive 3D WebGL Engine
              </span>
              <span className="text-[10px] bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full border border-yellow-500/30 font-mono">
                Three.js v0.160
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-bold font-['Space_Grotesk'] text-white">
              Sacred Sri Yantra & Architectural BIM Hologram
            </h3>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur text-xs">
          <button
            onClick={() => setActiveMode('cad')}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              activeMode === 'cad'
                ? 'bg-yellow-400 text-black shadow-md shadow-yellow-500/30 font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🏢 3D CAD Tower
          </button>
          <button
            onClick={() => setActiveMode('bim')}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              activeMode === 'bim'
                ? 'bg-yellow-400 text-black shadow-md shadow-yellow-500/30 font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🏗️ BIM & MEP Mesh
          </button>
          <button
            onClick={() => setActiveMode('yantra')}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              activeMode === 'yantra'
                ? 'bg-yellow-400 text-black shadow-md shadow-yellow-500/30 font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🔱 3D Meru Hologram
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-[420px] md:h-[540px] cursor-grab active:cursor-grabbing relative select-none"
      >
        {/* Floating Instruction Overlay */}
        <div className="absolute top-4 left-4 z-10 pointer-events-none flex flex-col gap-1 text-[11px] text-gray-400 bg-black/60 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10">
          <div className="flex items-center gap-1.5 text-yellow-300 font-semibold">
            <span>🖱️</span>
            <span>Click & Drag to Rotate 360°</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>🔍</span>
            <span>Scroll Wheel to Zoom In / Out</span>
          </div>
          {activeMode === 'cad' && (
            <div className="flex items-center gap-1.5 text-amber-200/80">
              <span>📐</span>
              <span>7 Levels • G+6 Commercial Layout</span>
            </div>
          )}
        </div>

        {/* Quick HUD Telemetry in Corner */}
        <div className="absolute top-4 right-4 z-10 pointer-events-none text-right font-mono text-[10px] text-yellow-400/80 bg-black/60 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 space-y-0.5">
          <div>FPS: 60 • GPU ACCELERATED</div>
          <div>MODE: {activeMode.toUpperCase()}</div>
          <div>VASTU: ISHANYA NORTH-EAST VERIFIED</div>
        </div>
      </div>

      {/* Bottom Interactive Controls Strip */}
      <div className="p-4 md:p-6 border-t border-white/10 bg-black/50 backdrop-blur flex flex-wrap items-center justify-between gap-4">
        {/* Exploded View Slider (Available in CAD mode) */}
        {activeMode === 'cad' ? (
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs text-yellow-300/90 font-semibold whitespace-nowrap flex items-center gap-1.5">
              <span>💥</span>
              <span>Explode Floor Slabs:</span>
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={explodeFactor}
              onChange={(e) => setExplodeFactor(parseFloat(e.target.value))}
              className="w-36 md:w-44 accent-yellow-400 cursor-pointer bg-white/20 h-1.5 rounded-lg"
            />
            <span className="text-xs font-mono text-yellow-400">
              {Math.round(explodeFactor * 100)}%
            </span>
          </div>
        ) : (
          <div className="text-xs text-gray-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>
              {activeMode === 'bim'
                ? 'Showing HVAC & Electrical Routing Intersecting Structural Beams'
                : 'Sacred 9 Interlocking Pyramids Generating Golden Cosmic Energy'}
            </span>
          </div>
        )}

        {/* Auto Rotate Toggle & Theme Switcher */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition ${
              isAutoRotating
                ? 'border-yellow-500/40 bg-yellow-500/10 text-yellow-300'
                : 'border-white/20 text-gray-400 hover:text-white'
            }`}
          >
            <span>{isAutoRotating ? '⏸️' : '▶️'}</span>
            <span>{isAutoRotating ? 'Pause Rotation' : 'Auto Rotate'}</span>
          </button>

          <div className="flex items-center gap-1 border border-white/15 rounded-lg p-1 bg-black/40">
            <button
              onClick={() => setColorTheme('gold')}
              className={`px-2.5 py-1 rounded text-xs transition ${
                colorTheme === 'gold'
                  ? 'bg-yellow-500 text-black font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Brushed Gold Mode"
            >
              ✨ Gold
            </button>
            <button
              onClick={() => setColorTheme('cyan')}
              className={`px-2.5 py-1 rounded text-xs transition ${
                colorTheme === 'cyan'
                  ? 'bg-cyan-400 text-black font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Cyber Blueprint Mode"
            >
              🔷 Cyan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
