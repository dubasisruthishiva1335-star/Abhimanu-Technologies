import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Full Website 3D Chakravyuham (Chakravyuha) Model Background
 * Powered by Three.js (WebGL)
 *
 * Replaces generic backgrounds with the authentic 3D Chakravyuham:
 * - 7 Concentric 3D Defensive Bastion Tiers with spiral breach dwāras (gateways)
 * - Watchtower monoliths and architectural battlements positioned along each tier
 * - Abhimanyu's golden entry spiral path (Veera Patha) winding from Tier 1 to 7
 * - Central Padmavyuha sanctum with rotating sacred Meru geometry & pulsing Bindu orb
 * - Expansive 3D Vastu foundation grid & 800 floating golden cosmic stardust particles
 * - Scroll-reactive orbital camera flight that descends through the labyrinth
 * - Hardware accelerated 60 FPS, pointer-events none, 100% responsive
 */
export default function FullWebsite3DBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08080a, 0.016);

    const camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 1000);
    // Initial camera position for heroic elevated isometric perspective
    camera.position.set(0, 36, 44);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0); // transparent background
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xfff3d6, 0.9);
    scene.add(ambientLight);

    const centralLight = new THREE.PointLight(0xffd700, 2.8, 120);
    centralLight.position.set(0, 6, 0);
    scene.add(centralLight);

    const topLight = new THREE.DirectionalLight(0xf5e6c8, 1.6);
    topLight.position.set(20, 50, 30);
    scene.add(topLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 1.2);
    rimLight.position.set(-25, 30, -25);
    scene.add(rimLight);

    // 3. Shared Materials
    const goldLineMat = new THREE.LineBasicMaterial({
      color: 0xffd700,
      transparent: true,
      opacity: 0.55
    });

    const faintLineMat = new THREE.LineBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.25
    });

    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0x121118,
      emissive: 0xd4af37,
      emissiveIntensity: 0.16,
      roughness: 0.35,
      metalness: 0.85,
      transparent: true,
      opacity: 0.72,
      side: THREE.DoubleSide
    });

    const pylonMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e1c24,
      emissive: 0xffd700,
      emissiveIntensity: 0.28,
      roughness: 0.25,
      metalness: 0.9,
      transparent: true,
      opacity: 0.85
    });

    const goldCoreMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff
    });

    const glowingRaysMaterial = new THREE.LineBasicMaterial({
      color: 0xe6c07a,
      transparent: true,
      opacity: 0.4
    });

    // 4. Master 3D Chakravyuham Group
    const chakravyuhaGroup = new THREE.Group();
    // Tilt the formation slightly for dramatic 3D architectural elevation
    chakravyuhaGroup.rotation.x = Math.PI * 0.18;
    chakravyuhaGroup.position.set(0, -2, -6);
    scene.add(chakravyuhaGroup);

    // Dynamic rotation tiers array
    const tierGroups = [];

    // --- CONSTRUCT 7 3D DEFENSIVE CHAKRAVYUHAM TIERS ---
    const tierCount = 7;
    const baseRadius = 4.2;
    const tierSpacing = 3.8;

    for (let t = 1; t <= tierCount; t++) {
      const tierGroup = new THREE.Group();
      const radius = baseRadius + t * tierSpacing;
      const wallHeight = 1.6 + (tierCount - t) * 0.22;
      const wallThick = 0.55;

      // Spiral Breach Angle: Each tier has an open gateway rotated by ~52 degrees
      const breachAngle = (t - 1) * 0.92;
      const breachWidth = 0.65; // ~37 degrees opening

      // Create 3D Curved Bastion Wall using arc segments
      // Two wall arcs per tier flanking the breach
      const arc1Start = breachAngle + breachWidth / 2;
      const arc1Length = Math.PI * 2 - breachWidth;

      const wallGeo = new THREE.CylinderGeometry(
        radius + wallThick / 2,
        radius + wallThick / 2,
        wallHeight,
        64,
        1,
        true,
        arc1Start,
        arc1Length
      );

      const wallMesh = new THREE.Mesh(wallGeo, wallMaterial);
      tierGroup.add(wallMesh);

      // Golden Wireframe Edges for High-Tech CAD/Vedic Aesthetic
      const wallEdges = new THREE.EdgesGeometry(wallGeo, 25);
      const wallLine = new THREE.LineSegments(wallEdges, t === 7 ? goldLineMat : faintLineMat);
      tierGroup.add(wallLine);

      // Concentric Ground Rings (Circular trench / baseline guide)
      const ringGeo = new THREE.RingGeometry(radius - 0.08, radius + 0.08, 96);
      const ringMat = new THREE.MeshBasicMaterial({
        color: t === 7 ? 0xffd700 : 0xd4af37,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: t === 7 ? 0.6 : 0.22
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.y = -wallHeight / 2;
      tierGroup.add(ringMesh);

      // Defensive Monolith Pylons / Watchtowers along the ring perimeter
      const pylonCount = 8 + t * 4;
      const pylonGeo = new THREE.BoxGeometry(0.5, wallHeight + 0.8, 0.5);
      const pylonEdgeGeo = new THREE.EdgesGeometry(pylonGeo);

      for (let p = 0; p < pylonCount; p++) {
        const angle = (p / pylonCount) * Math.PI * 2;
        // Don't place pylons directly inside the breach gateway
        const diff = Math.atan2(Math.sin(angle - breachAngle), Math.cos(angle - breachAngle));
        if (Math.abs(diff) < breachWidth / 2 + 0.15) continue;

        const px = Math.cos(angle) * radius;
        const pz = Math.sin(angle) * radius;

        const pylon = new THREE.Mesh(pylonGeo, pylonMaterial);
        pylon.position.set(px, 0.2, pz);
        pylon.rotation.y = -angle;
        tierGroup.add(pylon);

        const pylonLines = new THREE.LineSegments(pylonEdgeGeo, goldLineMat);
        pylonLines.position.set(px, 0.2, pz);
        pylonLines.rotation.y = -angle;
        tierGroup.add(pylonLines);
      }

      // Gateway Markers (2 Golden Bastion Obelisks flanking the breach entrance)
      const gateObeliskGeo = new THREE.CylinderGeometry(0.2, 0.35, wallHeight + 1.4, 6);
      const gateEdgeGeo = new THREE.EdgesGeometry(gateObeliskGeo);

      [breachAngle - breachWidth / 2, breachAngle + breachWidth / 2].forEach((gAngle) => {
        const gx = Math.cos(gAngle) * radius;
        const gz = Math.sin(gAngle) * radius;

        const gateMesh = new THREE.Mesh(gateObeliskGeo, pylonMaterial);
        gateMesh.position.set(gx, 0.5, gz);
        tierGroup.add(gateMesh);

        const gateLine = new THREE.LineSegments(gateEdgeGeo, goldLineMat);
        gateLine.position.set(gx, 0.5, gz);
        tierGroup.add(gateLine);
      });

      // Individual slow counter-rotation for mystical battle formation dynamics
      tierGroup.userData = {
        speed: (t % 2 === 0 ? 1 : -1) * (0.0006 + (tierCount - t) * 0.00015)
      };

      chakravyuhaGroup.add(tierGroup);
      tierGroups.push(tierGroup);
    }

    // --- 5. ABHIMANYU'S GOLDEN PENETRATION SPIRAL (VEERA PATHA) ---
    // Smooth 3D curve winding from outermost perimeter through all 7 gateways to center
    const spiralPoints = [];
    const totalSpiralSteps = 160;
    const maxSpiralR = baseRadius + tierCount * tierSpacing + 2.5;

    for (let s = 0; s <= totalSpiralSteps; s++) {
      const progress = s / totalSpiralSteps; // 0 (outer) to 1 (inner)
      const currentR = maxSpiralR * (1 - progress * 0.94);
      // Angular trajectory following the breach sequence
      const theta = progress * Math.PI * 5.2 - 0.2;
      const x = Math.cos(theta) * currentR;
      const z = Math.sin(theta) * currentR;
      const y = Math.sin(progress * Math.PI * 4) * 0.4 + (1 - progress) * 0.6;
      spiralPoints.push(new THREE.Vector3(x, y, z));
    }

    const spiralCurve = new THREE.CatmullRomCurve3(spiralPoints);
    const spiralTubeGeo = new THREE.TubeGeometry(spiralCurve, 140, 0.12, 8, false);
    const spiralMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: 0xffa500,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.9,
      transparent: true,
      opacity: 0.85
    });
    const spiralMesh = new THREE.Mesh(spiralTubeGeo, spiralMat);
    chakravyuhaGroup.add(spiralMesh);

    // --- 6. CENTRAL INNER CITADEL & PADMAVYUHA SANCTUM (7th CHAKRA) ---
    const sanctumGroup = new THREE.Group();

    // Sacred 3D Meru Octahedron Wireframe
    const octaGeo = new THREE.OctahedronGeometry(2.4, 0);
    const octaEdges = new THREE.EdgesGeometry(octaGeo);
    const octaLines = new THREE.LineSegments(octaEdges, goldLineMat);
    sanctumGroup.add(octaLines);

    const innerIcosaGeo = new THREE.IcosahedronGeometry(1.6, 0);
    const innerIcosaEdges = new THREE.EdgesGeometry(innerIcosaGeo);
    const innerIcosaLines = new THREE.LineSegments(
      innerIcosaEdges,
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.75 })
    );
    sanctumGroup.add(innerIcosaLines);

    // Central Glowing Bindu Sphere
    const binduGeo = new THREE.SphereGeometry(0.85, 32, 32);
    const binduMesh = new THREE.Mesh(binduGeo, goldCoreMaterial);
    sanctumGroup.add(binduMesh);

    // Radial Sacred Geometric Energy Rays (8 cardinal rays connecting Bindu to Tier 1)
    const rayPoints = [];
    for (let r = 0; r < 8; r++) {
      const rayAngle = (r / 8) * Math.PI * 2;
      rayPoints.push(new THREE.Vector3(0, 0, 0));
      rayPoints.push(new THREE.Vector3(Math.cos(rayAngle) * 7.5, 0, Math.sin(rayAngle) * 7.5));
    }
    const rayGeo = new THREE.BufferGeometry().setFromPoints(rayPoints);
    const rayLines = new THREE.LineSegments(rayGeo, glowingRaysMaterial);
    sanctumGroup.add(rayLines);

    chakravyuhaGroup.add(sanctumGroup);

    // --- 7. 3D VASTU ARCHITECTURAL DEMARCATION FOUNDATION GRID ---
    const gridHelper = new THREE.GridHelper(110, 55, 0xd4af37, 0x1f1f28);
    gridHelper.position.y = -10;
    gridHelper.material.opacity = 0.28;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // --- 8. 800 FLOATING GOLDEN COSMIC STARDUST PARTICLES ---
    const particleCount = 800;
    const particlePos = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount * 3; p += 3) {
      particlePos[p] = (Math.random() - 0.5) * 130;
      particlePos[p + 1] = (Math.random() - 0.5) * 90;
      particlePos[p + 2] = (Math.random() - 0.5) * 110;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.Float32BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffd700,
      size: 0.26,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- 9. INTERACTION & SCROLL-BASED ORBITAL FLIGHT ---
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

    // --- 10. ANIMATION LOOP ---
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth scroll interpolation
      scrollY += (targetScrollY - scrollY) * 0.055;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollProgress = Math.min(1, Math.max(0, scrollY / maxScroll));

      // DYNAMIC 3D CAMERA FLIGHT THROUGH CHAKRAVYUHAM:
      // At Top (Hero): Majestic high aerial overview of all 7 tiers
      // Mid-page (Services & Process): Camera spirals closer, tilting down towards the gate breaches
      // Bottom (Pricing, FAQ, Contact): Camera dives in close to the glowing Padmavyuha sanctum
      const camRadius = 50 - scrollProgress * 22;
      const camHeight = 34 - scrollProgress * 18;
      const camAngle = scrollProgress * Math.PI * 1.5 + 0.15;

      camera.position.x = Math.sin(camAngle) * camRadius + mouseX * 3.0;
      camera.position.y = camHeight - mouseY * 2.5;
      camera.position.z = Math.cos(camAngle) * camRadius;

      // Dynamic LookAt point navigating through the labyrinth
      const lookY = -2 + scrollProgress * 2;
      camera.lookAt(0, lookY, -3);

      // Rotate individual Chakravyuham tiers at their designated speeds
      tierGroups.forEach((tier) => {
        tier.rotation.y += tier.userData.speed;
      });

      // Slowly rotate the entire formation
      chakravyuhaGroup.rotation.y = time * 0.02;

      // Rotate central Meru sacred geometry
      octaLines.rotation.x = time * 0.35;
      octaLines.rotation.y = time * 0.25;
      innerIcosaLines.rotation.y = -time * 0.4;
      innerIcosaLines.rotation.z = time * 0.2;

      // Pulsing glow on Central Bindu Orb
      const pulse = 1 + Math.sin(time * 3.5) * 0.18;
      binduMesh.scale.set(pulse, pulse, pulse);

      // Cosmic stardust particle drift
      particles.rotation.y = time * 0.012;
      particles.rotation.x = Math.sin(time * 0.01) * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    // --- 11. LIFECYCLE CLEANUP ---
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
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
