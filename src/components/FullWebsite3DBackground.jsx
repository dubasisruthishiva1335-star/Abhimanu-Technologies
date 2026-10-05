import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Full Website 3D Model Background
 * Powered by Three.js (WebGL)
 * 
 * Features:
 *  - Fixed full-viewport 3D scene running behind the entire website
 *  - 3D Architectural CAD Wireframe Towers & Villa structural grids
 *  - 7 Concentric 3D Chakravyuham sacred golden rings revolving in deep space
 *  - 800 Floating golden stardust particles with gentle cosmic drift
 *  - Scroll-reactive camera flight that travels through the 3D scene as user scrolls
 *  - Subtle mouse perspective parallax
 *  - 60 FPS hardware accelerated with automatic lifecycle cleanup
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
    scene.fog = new THREE.FogExp2(0x08080a, 0.018);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 10, 45);

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
    const ambientLight = new THREE.AmbientLight(0xfff0cc, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xe6c07a, 1.5);
    dirLight.position.set(30, 45, 20);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xffd700, 1.8, 80);
    pointLight.position.set(10, 15, -10);
    scene.add(pointLight);

    // 3. Materials
    const goldLineMat = new THREE.LineBasicMaterial({
      color: 0xe6c07a,
      transparent: true,
      opacity: 0.35
    });

    const faintLineMat = new THREE.LineBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.18
    });

    const slabMat = new THREE.MeshStandardMaterial({
      color: 0x14141c,
      emissive: 0xd4af37,
      emissiveIntensity: 0.12,
      roughness: 0.4,
      metalness: 0.8,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide
    });

    // 4. Construct 3D Architectural Structures
    const worldGroup = new THREE.Group();

    // Building 1: Main Commercial Tower (Right-side background)
    const towerGroup = new THREE.Group();
    towerGroup.position.set(22, -8, -15);
    const towerFloors = 9;
    const floorH = 3.2;

    for (let i = 0; i < towerFloors; i++) {
      const fw = 14 - i * 0.6;
      const fd = 12 - i * 0.5;
      const fy = i * floorH;

      // Slab
      const slabGeo = new THREE.BoxGeometry(fw, 0.3, fd);
      const slabMesh = new THREE.Mesh(slabGeo, slabMat);
      slabMesh.position.y = fy;
      towerGroup.add(slabMesh);

      // Wireframe Edges
      const edges = new THREE.EdgesGeometry(slabGeo);
      const lines = new THREE.LineSegments(edges, goldLineMat);
      lines.position.y = fy;
      towerGroup.add(lines);

      // Columns
      const colGeo = new THREE.CylinderGeometry(0.12, 0.12, floorH, 6);
      [
        [-fw / 2 + 0.5, -fd / 2 + 0.5],
        [fw / 2 - 0.5, -fd / 2 + 0.5],
        [-fw / 2 + 0.5, fd / 2 - 0.5],
        [fw / 2 - 0.5, fd / 2 - 0.5]
      ].forEach(([cx, cz]) => {
        const colMesh = new THREE.Mesh(colGeo, slabMat);
        colMesh.position.set(cx, fy + floorH / 2, cz);
        towerGroup.add(colMesh);

        const colEdges = new THREE.EdgesGeometry(colGeo);
        const colLine = new THREE.LineSegments(colEdges, faintLineMat);
        colLine.position.set(cx, fy + floorH / 2, cz);
        towerGroup.add(colLine);
      });
    }
    worldGroup.add(towerGroup);

    // Building 2: Contemporary Villa / Pavilion (Left background)
    const villaGroup = new THREE.Group();
    villaGroup.position.set(-24, -10, -25);
    for (let f = 0; f < 3; f++) {
      const vw = 18;
      const vd = 14;
      const vy = f * 3.8;

      const vSlabGeo = new THREE.BoxGeometry(vw, 0.4, vd);
      const vSlab = new THREE.Mesh(vSlabGeo, slabMat);
      vSlab.position.y = vy;
      villaGroup.add(vSlab);

      const vEdges = new THREE.EdgesGeometry(vSlabGeo);
      const vLines = new THREE.LineSegments(vEdges, goldLineMat);
      vLines.position.y = vy;
      villaGroup.add(vLines);
    }
    worldGroup.add(villaGroup);

    // 5. 3D Ground Foundation Grid (Vastu Demarcation Grid)
    const gridHelper = new THREE.GridHelper(90, 45, 0xd4af37, 0x1f1f26);
    gridHelper.position.y = -12;
    gridHelper.material.opacity = 0.22;
    gridHelper.material.transparent = true;
    worldGroup.add(gridHelper);

    // 6. 3D Sacred Chakravyuham Revolving Celestial Rings (Hovering in deep 3D space)
    const chakraRingsGroup = new THREE.Group();
    chakraRingsGroup.position.set(12, 18, -35);
    chakraRingsGroup.rotation.x = Math.PI / 4.5;

    const ringCount = 7;
    const ringMeshes = [];

    for (let r = 1; r <= ringCount; r++) {
      const ringRadius = r * 3.4;
      const ringGeo = new THREE.RingGeometry(ringRadius, ringRadius + 0.12, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: r === 7 ? 0xffd700 : 0xe6c07a,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: r === 7 ? 0.35 : 0.18
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.userData = { speed: (r % 2 === 0 ? 1 : -1) * (0.001 + (7 - r) * 0.0003) };
      chakraRingsGroup.add(ringMesh);
      ringMeshes.push(ringMesh);
    }

    // Central Golden Bindu in 3D
    const binduGeo = new THREE.SphereGeometry(0.6, 24, 24);
    const binduMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const binduMesh = new THREE.Mesh(binduGeo, binduMat);
    chakraRingsGroup.add(binduMesh);

    worldGroup.add(chakraRingsGroup);

    // 7. Floating Cosmic Stardust Particles
    const particleCount = 700;
    const particlePos = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount * 3; p += 3) {
      particlePos[p] = (Math.random() - 0.5) * 110;
      particlePos[p + 1] = (Math.random() - 0.5) * 80;
      particlePos[p + 2] = (Math.random() - 0.5) * 90;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.Float32BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffd700,
      size: 0.22,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    worldGroup.add(particles);

    scene.add(worldGroup);

    // 8. Interaction & Scroll Tracking
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

    // 9. Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth scroll interpolation
      scrollY += (targetScrollY - scrollY) * 0.05;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Scroll progress from 0 to 1
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollProgress = Math.min(1, Math.max(0, scrollY / maxScroll));

      // Camera Flight Trajectory based on scroll position
      // At top (Hero): High-tech front/isometric view
      // As scrolling down: Camera smoothly revolves around the 3D CAD models
      const camRadius = 45 - scrollProgress * 12;
      const camAngle = scrollProgress * Math.PI * 1.2 + 0.3;
      camera.position.x = Math.sin(camAngle) * camRadius + mouseX * 2.5;
      camera.position.y = 8 + scrollProgress * 14 - mouseY * 2.5;
      camera.position.z = Math.cos(camAngle) * camRadius;
      camera.lookAt(0, scrollProgress * 6, -5);

      // Rotate individual Chakravyuha rings
      ringMeshes.forEach((mesh) => {
        mesh.rotation.z += mesh.userData.speed;
      });

      // Slowly rotate world particles
      particles.rotation.y = time * 0.015;

      // Subtle pulse on central bindu
      binduMesh.scale.setScalar(1 + Math.sin(time * 3) * 0.2);

      renderer.render(scene, camera);
    };
    animate();

    // 10. Cleanup
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
