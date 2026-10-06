import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * 3D Cinematic Sri Chakravyuham Model Background
 * Powered by Three.js (WebGL)
 *
 * Cinematic fusion of the Sacred 3D Sri Yantra Maha Meru & the 7-Tier Chakravyuham Fortress:
 *  - 3D Central Sri Yantra Maha Meru: 9 interlocking golden pyramid triangles (4 Shiva + 5 Shakti)
 *  - 16-petal & 8-petal revolving consecrated golden lotus mandalas
 *  - 7 Concentric 3D Chakravyuham defensive bastion tiers with staggered spiral gateways
 *  - Monolith bastion watchtowers with glowing golden prism capstones
 *  - Animated energy photon packet traversing Abhimanyu's golden spiral breach trajectory
 *  - Outer 3D Bhupura (quadrangular sacred perimeter) with 4 cardinal gateway portals
 *  - 1000 floating celestial golden embers & stardust with volumetric depth
 *  - Cinematic multi-point lighting (Imperial Gold key, Copper fill, Specular rim)
 *  - Scroll-reactive cinematic crane camera flight with organic breathing motion
 */
export default function FullWebsite3DBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene, Fog, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07070a, 0.014);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1200);
    camera.position.set(0, 38, 52);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0); // Transparent canvas
    container.appendChild(renderer.domElement);

    // 2. Cinematic Lighting System
    const ambientLight = new THREE.AmbientLight(0xfff5e0, 0.85);
    scene.add(ambientLight);

    // Imperial Gold Key Spotlight
    const keySpot = new THREE.DirectionalLight(0xffdf78, 2.2);
    keySpot.position.set(35, 60, 40);
    scene.add(keySpot);

    // Deep Copper Fill Light for rich metallic shading
    const fillLight = new THREE.DirectionalLight(0xb87333, 1.4);
    fillLight.position.set(-40, 25, -20);
    scene.add(fillLight);

    // Cyan-Gold Specular Rim Light for dramatic edge glints
    const rimLight = new THREE.DirectionalLight(0xe0f7fa, 0.9);
    rimLight.position.set(0, -30, -50);
    scene.add(rimLight);

    // Pulsing Central Bindu Core Light
    const corePointLight = new THREE.PointLight(0xffd700, 3.5, 140, 1.2);
    corePointLight.position.set(0, 4, 0);
    scene.add(corePointLight);

    // 3. Cinematic Materials
    const goldPBR = new THREE.MeshStandardMaterial({
      color: 0x221b0e,
      emissive: 0xd4af37,
      emissiveIntensity: 0.28,
      roughness: 0.25,
      metalness: 0.92,
      side: THREE.DoubleSide
    });

    const wallPBR = new THREE.MeshStandardMaterial({
      color: 0x121017,
      emissive: 0x8a6a24,
      emissiveIntensity: 0.2,
      roughness: 0.4,
      metalness: 0.85,
      transparent: true,
      opacity: 0.78,
      side: THREE.DoubleSide
    });

    const brightGoldLine = new THREE.LineBasicMaterial({
      color: 0xffe680,
      transparent: true,
      opacity: 0.65
    });

    const faintGoldLine = new THREE.LineBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.25
    });

    const lotusMaterial = new THREE.MeshStandardMaterial({
      color: 0x261d0f,
      emissive: 0xffbe33,
      emissiveIntensity: 0.35,
      roughness: 0.3,
      metalness: 0.9,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide
    });

    // 4. Master Sri Chakravyuham Root Group
    const masterGroup = new THREE.Group();
    // Tilt formation for dramatic cinematic perspective
    masterGroup.rotation.x = Math.PI * 0.17;
    masterGroup.position.set(0, -1, -5);
    scene.add(masterGroup);

    // ========================================================
    // PART A: CENTRAL 3D SRI YANTRA MAHA MERU CITADEL
    // ========================================================
    const meruSanctum = new THREE.Group();

    // 9 Interlocking Golden Tetrahedral Pyramids (4 Shiva upwards, 5 Shakti downwards)
    const triangleLevels = [
      { r: 1.2, h: 4.8, y: 0.6, up: true },
      { r: 2.1, h: 4.2, y: 0.4, up: false },
      { r: 2.9, h: 3.6, y: 0.2, up: true },
      { r: 3.8, h: 3.0, y: 0.0, up: false },
      { r: 4.6, h: 2.5, y: -0.2, up: true },
      { r: 5.4, h: 2.1, y: -0.4, up: false },
      { r: 6.2, h: 1.8, y: -0.6, up: true },
      { r: 7.0, h: 1.5, y: -0.8, up: false },
      { r: 7.8, h: 1.2, y: -1.0, up: false }
    ];

    const meruTriangles = [];
    triangleLevels.forEach((lvl, idx) => {
      // 3-sided pyramid (Tetrahedral Cone)
      const pyrGeo = new THREE.ConeGeometry(lvl.r, lvl.h, 3, 1, false);
      const pyrMesh = new THREE.Mesh(pyrGeo, goldPBR);

      if (!lvl.up) {
        pyrMesh.rotation.x = Math.PI;
      }
      pyrMesh.position.y = lvl.y + (lvl.up ? lvl.h / 2 : -lvl.h / 2);
      pyrMesh.rotation.y = (idx * Math.PI) / 4.5;

      const edges = new THREE.EdgesGeometry(pyrGeo);
      const wire = new THREE.LineSegments(edges, brightGoldLine);
      pyrMesh.add(wire);

      meruSanctum.add(pyrMesh);
      meruTriangles.push(pyrMesh);
    });

    // Central Radiant Golden Bindu (The Singular Primordial Point)
    const binduGeo = new THREE.SphereGeometry(0.9, 32, 32);
    const binduMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const binduMesh = new THREE.Mesh(binduGeo, binduMat);
    binduMesh.position.y = 1.2;
    meruSanctum.add(binduMesh);

    // Orbital Bindu Aura Rings (Kinetic Celestial Gyroscope)
    const gyroGroup = new THREE.Group();
    gyroGroup.position.y = 1.2;
    const gyroRingGeo = new THREE.RingGeometry(1.6, 1.72, 48);
    const gyroRingMat = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75
    });

    const gyro1 = new THREE.Mesh(gyroRingGeo, gyroRingMat);
    const gyro2 = new THREE.Mesh(gyroRingGeo, gyroRingMat);
    gyro2.rotation.x = Math.PI / 2;
    const gyro3 = new THREE.Mesh(gyroRingGeo, gyroRingMat);
    gyro3.rotation.y = Math.PI / 2;

    gyroGroup.add(gyro1, gyro2, gyro3);
    meruSanctum.add(gyroGroup);

    // ========================================================
    // PART B: 16-PETAL & 8-PETAL REVOLVING LOTUS MANDALAS
    // ========================================================
    // Inner 8-Petal Lotus
    const innerLotusGroup = new THREE.Group();
    innerLotusGroup.position.y = -0.8;
    const petal8Geo = new THREE.ConeGeometry(1.1, 2.6, 4);
    petal8Geo.scale(1, 0.35, 1);

    for (let p = 0; p < 8; p++) {
      const angle = (p / 8) * Math.PI * 2;
      const petal = new THREE.Mesh(petal8Geo, lotusMaterial);
      petal.position.set(Math.cos(angle) * 8.6, 0, Math.sin(angle) * 8.6);
      petal.rotation.y = -angle + Math.PI / 2;
      petal.rotation.z = Math.PI / 3.2;

      const pEdges = new THREE.EdgesGeometry(petal8Geo);
      petal.add(new THREE.LineSegments(pEdges, brightGoldLine));
      innerLotusGroup.add(petal);
    }
    meruSanctum.add(innerLotusGroup);

    // Outer 16-Petal Lotus
    const outerLotusGroup = new THREE.Group();
    outerLotusGroup.position.y = -1.1;
    const petal16Geo = new THREE.ConeGeometry(1.3, 3.2, 4);
    petal16Geo.scale(1, 0.3, 1);

    for (let p = 0; p < 16; p++) {
      const angle = (p / 16) * Math.PI * 2;
      const petal = new THREE.Mesh(petal16Geo, lotusMaterial);
      petal.position.set(Math.cos(angle) * 11.8, 0, Math.sin(angle) * 11.8);
      petal.rotation.y = -angle + Math.PI / 2;
      petal.rotation.z = Math.PI / 3.4;

      const pEdges = new THREE.EdgesGeometry(petal16Geo);
      petal.add(new THREE.LineSegments(pEdges, brightGoldLine));
      outerLotusGroup.add(petal);
    }
    meruSanctum.add(outerLotusGroup);

    masterGroup.add(meruSanctum);

    // ========================================================
    // PART C: 7 CONCENTRIC 3D CHAKRAVYUHAM FORTRESS TIERS
    // ========================================================
    const tierGroups = [];
    const tierCount = 7;
    const startRadius = 14.5;
    const tierSpacing = 3.6;

    for (let t = 1; t <= tierCount; t++) {
      const tierGroup = new THREE.Group();
      const radius = startRadius + (t - 1) * tierSpacing;
      const wallHeight = 1.9 + (tierCount - t) * 0.25;
      const wallThick = 0.65;

      // Sequential breach gateways rotating across tiers in spiral succession
      const breachAngle = (t - 1) * 0.88;
      const breachWidth = 0.62; // gateway opening

      // 3D Curved Bastion Wall
      const arcStart = breachAngle + breachWidth / 2;
      const arcLength = Math.PI * 2 - breachWidth;

      const wallGeo = new THREE.CylinderGeometry(
        radius + wallThick / 2,
        radius + wallThick / 2,
        wallHeight,
        72,
        1,
        true,
        arcStart,
        arcLength
      );
      const wallMesh = new THREE.Mesh(wallGeo, wallPBR);
      tierGroup.add(wallMesh);

      // Gold Edge Wireframe
      const wallEdges = new THREE.EdgesGeometry(wallGeo, 24);
      const wallLine = new THREE.LineSegments(wallEdges, t === 7 ? brightGoldLine : faintGoldLine);
      tierGroup.add(wallLine);

      // Concentric Circular Foundation Trench / Track
      const trackGeo = new THREE.RingGeometry(radius - 0.12, radius + 0.12, 110);
      const trackMat = new THREE.MeshBasicMaterial({
        color: t === 7 ? 0xffd700 : 0xd4af37,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: t === 7 ? 0.7 : 0.28
      });
      const trackMesh = new THREE.Mesh(trackGeo, trackMat);
      trackMesh.rotation.x = Math.PI / 2;
      trackMesh.position.y = -wallHeight / 2;
      tierGroup.add(trackMesh);

      // Monolith Bastion Watchtowers stationed along the wall ring
      const towerCount = 10 + t * 4;
      const towerGeo = new THREE.BoxGeometry(0.55, wallHeight + 1.1, 0.55);
      const towerEdgeGeo = new THREE.EdgesGeometry(towerGeo);

      // Crystal Prism Capstone on each watchtower
      const capGeo = new THREE.OctahedronGeometry(0.35, 0);

      for (let w = 0; w < towerCount; w++) {
        const angle = (w / towerCount) * Math.PI * 2;
        // Avoid placing towers directly inside the breach gateway
        const diff = Math.atan2(Math.sin(angle - breachAngle), Math.cos(angle - breachAngle));
        if (Math.abs(diff) < breachWidth / 2 + 0.18) continue;

        const tx = Math.cos(angle) * radius;
        const tz = Math.sin(angle) * radius;

        const tower = new THREE.Mesh(towerGeo, goldPBR);
        tower.position.set(tx, 0.3, tz);
        tower.rotation.y = -angle;
        tierGroup.add(tower);

        const tLines = new THREE.LineSegments(towerEdgeGeo, brightGoldLine);
        tLines.position.set(tx, 0.3, tz);
        tLines.rotation.y = -angle;
        tierGroup.add(tLines);

        // Glowing crystal atop tower
        const cap = new THREE.Mesh(
          capGeo,
          new THREE.MeshBasicMaterial({ color: t % 2 === 0 ? 0xffe680 : 0xffa500 })
        );
        cap.position.set(tx, wallHeight + 0.7, tz);
        tierGroup.add(cap);
      }

      // Twin Gateway Bastion Pylons flanking the breach opening
      const gatePylonGeo = new THREE.CylinderGeometry(0.24, 0.42, wallHeight + 1.8, 6);
      const gateEdgeGeo = new THREE.EdgesGeometry(gatePylonGeo);

      [breachAngle - breachWidth / 2, breachAngle + breachWidth / 2].forEach((gAngle) => {
        const gx = Math.cos(gAngle) * radius;
        const gz = Math.sin(gAngle) * radius;

        const gateMesh = new THREE.Mesh(gatePylonGeo, goldPBR);
        gateMesh.position.set(gx, 0.6, gz);
        tierGroup.add(gateMesh);

        const gLines = new THREE.LineSegments(gateEdgeGeo, brightGoldLine);
        gLines.position.set(gx, 0.6, gz);
        tierGroup.add(gLines);
      });

      // Individual kinetic counter-rotation
      tierGroup.userData = {
        speed: (t % 2 === 0 ? 1 : -1) * (0.0005 + (tierCount - t) * 0.00012)
      };

      masterGroup.add(tierGroup);
      tierGroups.push(tierGroup);
    }

    // ========================================================
    // PART D: ABHIMANYU'S GOLDEN SPIRAL BREACH & PULSING PHOTON
    // ========================================================
    const spiralPoints = [];
    const totalSpiralSteps = 220;
    const maxSpiralR = startRadius + (tierCount - 1) * tierSpacing + 3.0;

    for (let s = 0; s <= totalSpiralSteps; s++) {
      const progress = s / totalSpiralSteps; // 0 (outer perimeter) to 1 (inner sanctum)
      const currentR = maxSpiralR * (1 - progress * 0.88);
      const theta = progress * Math.PI * 5.6 - 0.25;
      const x = Math.cos(theta) * currentR;
      const z = Math.sin(theta) * currentR;
      const y = Math.sin(progress * Math.PI * 5) * 0.5 + (1 - progress) * 0.8;
      spiralPoints.push(new THREE.Vector3(x, y, z));
    }

    const spiralCurve = new THREE.CatmullRomCurve3(spiralPoints);
    const spiralTubeGeo = new THREE.TubeGeometry(spiralCurve, 180, 0.16, 8, false);
    const spiralMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: 0xffa500,
      emissiveIntensity: 0.75,
      roughness: 0.2,
      metalness: 0.95,
      transparent: true,
      opacity: 0.9
    });
    const spiralMesh = new THREE.Mesh(spiralTubeGeo, spiralMat);
    masterGroup.add(spiralMesh);

    // Dynamic Pulsing Energy Photon Packet (darts along the spiral curve)
    const photonGeo = new THREE.SphereGeometry(0.55, 16, 16);
    const photonMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const photonMesh = new THREE.Mesh(photonGeo, photonMat);
    masterGroup.add(photonMesh);

    const photonLight = new THREE.PointLight(0xffe680, 3.0, 18);
    masterGroup.add(photonLight);

    // ========================================================
    // PART E: 3D SACRED BHUPURA (QUADRANGULAR SRI CHAKRA GATES)
    // ========================================================
    const bhupuraGroup = new THREE.Group();
    bhupuraGroup.position.y = -2.2;
    const bSize = startRadius + (tierCount - 1) * tierSpacing + 7.5;

    // 4 Cardinal Gateway Openings (East, West, North, South)
    const gateW = 5.0;
    const bhupuraLines = [];

    // Outer 3 concentric square enclosures
    [bSize, bSize + 1.2, bSize + 2.4].forEach((sz, idx) => {
      const half = sz;
      const pts = [
        // North Side with Portal Notch
        new THREE.Vector3(-half, 0, -half),
        new THREE.Vector3(-gateW / 2, 0, -half),
        new THREE.Vector3(-gateW / 2, 0, -half - 1.2),
        new THREE.Vector3(gateW / 2, 0, -half - 1.2),
        new THREE.Vector3(gateW / 2, 0, -half),
        new THREE.Vector3(half, 0, -half),

        // East Side with Portal Notch
        new THREE.Vector3(half, 0, -gateW / 2),
        new THREE.Vector3(half + 1.2, 0, -gateW / 2),
        new THREE.Vector3(half + 1.2, 0, gateW / 2),
        new THREE.Vector3(half, 0, gateW / 2),
        new THREE.Vector3(half, 0, half),

        // South Side with Portal Notch
        new THREE.Vector3(gateW / 2, 0, half),
        new THREE.Vector3(gateW / 2, 0, half + 1.2),
        new THREE.Vector3(-gateW / 2, 0, half + 1.2),
        new THREE.Vector3(-gateW / 2, 0, half),
        new THREE.Vector3(-half, 0, half),

        // West Side with Portal Notch
        new THREE.Vector3(-half, 0, gateW / 2),
        new THREE.Vector3(-half - 1.2, 0, gateW / 2),
        new THREE.Vector3(-half - 1.2, 0, -gateW / 2),
        new THREE.Vector3(-half, 0, -gateW / 2),
        new THREE.Vector3(-half, 0, -half)
      ];

      const bGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const bLine = new THREE.Line(bGeo, idx === 0 ? brightGoldLine : faintGoldLine);
      bhupuraGroup.add(bLine);
    });
    masterGroup.add(bhupuraGroup);

    // ========================================================
    // PART F: 1000 CELESTIAL GOLDEN EMBERS & DRIFTING STARDUST
    // ========================================================
    const emberCount = 1000;
    const emberPositions = new Float32Array(emberCount * 3);
    const emberVelocities = [];

    for (let e = 0; e < emberCount; e++) {
      const idx = e * 3;
      emberPositions[idx] = (Math.random() - 0.5) * 150;
      emberPositions[idx + 1] = (Math.random() - 0.5) * 90;
      emberPositions[idx + 2] = (Math.random() - 0.5) * 130;
      emberVelocities.push({
        vy: 0.02 + Math.random() * 0.04,
        vx: (Math.random() - 0.5) * 0.015,
        vz: (Math.random() - 0.5) * 0.015
      });
    }

    const emberGeo = new THREE.BufferGeometry();
    emberGeo.setAttribute('position', new THREE.Float32BufferAttribute(emberPositions, 3));
    const emberMat = new THREE.PointsMaterial({
      color: 0xffd700,
      size: 0.28,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const emberSystem = new THREE.Points(emberGeo, emberMat);
    scene.add(emberSystem);

    // 3D Demarcation Architectural Ground Grid
    const groundGrid = new THREE.GridHelper(140, 70, 0xd4af37, 0x1f1b26);
    groundGrid.position.y = -12;
    groundGrid.material.opacity = 0.28;
    groundGrid.material.transparent = true;
    scene.add(groundGrid);

    // ========================================================
    // PART G: CINEMATIC CAMERA CHOREOGRAPHY & INTERACTION
    // ========================================================
    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const onMouseMove = (e) => {
      targetMouseX = (e.clientX / width - 0.5) * 2;
      targetMouseY = (e.clientY / height - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const onResize = () => {
      if (!container) return;
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    // ========================================================
    // PART H: ANIMATION & RENDER LOOP
    // ========================================================
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth damping
      scrollY += (targetScrollY - scrollY) * 0.055;
      mouseX += (targetMouseX - mouseX) * 0.045;
      mouseY += (targetMouseY - mouseY) * 0.045;

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollProgress = Math.min(1, Math.max(0, scrollY / maxScroll));

      // CINEMATIC CRANE FLIGHT:
      // - Hero Section (0% scroll): Heroic wide aerial view of the Sri Chakravyuham
      // - Mid-page (Services & Process): Descending orbital sweep through the 7 fortress tiers
      // - End-page (Pricing & Contact): Low-angle heroic view aligned with the glowing Sri Yantra Meru sanctum
      const baseRadius = 54 - scrollProgress * 24;
      const baseHeight = 36 - scrollProgress * 22;
      // Subtle cinematic breathing wave + scroll angle
      const camAngle = scrollProgress * Math.PI * 1.6 + Math.sin(time * 0.15) * 0.08 + 0.2;

      camera.position.x = Math.sin(camAngle) * baseRadius + mouseX * 3.5;
      camera.position.y = baseHeight - mouseY * 3.0 + Math.sin(time * 0.3) * 0.6;
      camera.position.z = Math.cos(camAngle) * baseRadius;

      // Focus lookAt point smoothly transitioning into the sanctum
      const targetLookY = 1.0 - scrollProgress * 2.0;
      camera.lookAt(0, targetLookY, -2);

      // Rotate individual Chakravyuham tiers
      tierGroups.forEach((tier) => {
        tier.rotation.y += tier.userData.speed;
      });

      // Slowly rotate lotus mandalas in sacred opposition
      innerLotusGroup.rotation.y = time * 0.04;
      outerLotusGroup.rotation.y = -time * 0.025;

      // Slowly revolve master formation
      masterGroup.rotation.y = time * 0.015;

      // Rotate Bindu celestial gyro rings
      gyro1.rotation.z = time * 0.8;
      gyro2.rotation.y = time * 0.6;
      gyro3.rotation.x = time * 0.7;

      // Core Bindu heartbeat pulse
      const pulse = 1 + Math.sin(time * 4) * 0.22;
      binduMesh.scale.set(pulse, pulse, pulse);
      corePointLight.intensity = 3.2 + Math.sin(time * 4) * 1.0;

      // Traverse energy photon along Abhimanyu's spiral curve
      const photonT = (time * 0.18) % 1.0;
      const photonPos = spiralCurve.getPointAt(photonT);
      photonMesh.position.copy(photonPos);
      photonLight.position.copy(photonPos);

      // Ascending celestial golden embers
      const positions = emberGeo.attributes.position.array;
      for (let e = 0; e < emberCount; e++) {
        const idx = e * 3;
        positions[idx + 1] += emberVelocities[e].vy;
        positions[idx] += emberVelocities[e].vx;
        positions[idx + 2] += emberVelocities[e].vz;

        // Reset if ember floats too high
        if (positions[idx + 1] > 55) {
          positions[idx + 1] = -40;
          positions[idx] = (Math.random() - 0.5) * 150;
          positions[idx + 2] = (Math.random() - 0.5) * 130;
        }
      }
      emberGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    // Pause rendering loop when document is not visible to conserve battery & GPU
    let isTabVisible = !document.hidden;
    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && !animId) {
        animate();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    animate();

    // Cleanup & Deep Three.js Memory Deallocation
    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      // Deep dispose all geometries and materials across scene graph
      scene.traverse((object) => {
        if (object.geometry) {
          object.geometry.dispose();
        }
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 select-none overflow-hidden"
      aria-hidden="true"
    />
  );
}
