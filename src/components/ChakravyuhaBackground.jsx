import React, { useEffect, useRef } from 'react';

/**
 * Chakravyuham (Chakravyuha) 7-Tier Sacred Labyrinth Background Canvas
 * 
 * Inspired by the legendary 7-tier circular battle formation from the Mahabharata
 * and Abhimanyu Technologies' creed: "We Break The Chakravyuha Of Design & Code".
 * 
 * Features:
 *  - 7 Concentric defensive rotating tiers with gateway breaches
 *  - Abhimanyu's golden entry spiral penetrating from Tier 1 to Tier 7
 *  - Bastion node markers and concentric Sanskrit geometric guides
 *  - Ambient celestial stardust particles
 *  - Subtle parallax response to mouse cursor movement
 */
export default function ChakravyuhaBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    let baseAngle = 0;
    let mouse = { x: width * 0.7, y: height * 0.5, targetX: width * 0.7, targetY: height * 0.5 };

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Stardust floating particles
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Position Chakravyuham center towards the right side of the screen for desktop, center for mobile
      const isMobile = width < 768;
      const cx = isMobile ? width * 0.5 : width * 0.68 + (mouse.x - width * 0.5) * 0.04;
      const cy = height * 0.5 + (mouse.y - height * 0.5) * 0.04;
      const maxR = Math.min(width, height) * (isMobile ? 0.46 : 0.44);

      // 1. Draw Subtle Stardust Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(230, 192, 122, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.save();
      ctx.translate(cx, cy);

      // 2. Central Padmavyuha Core Radial Warm Glow
      const coreGradient = ctx.createRadialGradient(0, 0, 5, 0, 0, maxR * 1.05);
      coreGradient.addColorStop(0, 'rgba(212, 175, 55, 0.14)');
      coreGradient.addColorStop(0.3, 'rgba(230, 192, 122, 0.06)');
      coreGradient.addColorStop(0.7, 'rgba(212, 175, 55, 0.02)');
      coreGradient.addColorStop(1, 'rgba(8, 8, 10, 0)');
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(0, 0, maxR * 1.05, 0, Math.PI * 2);
      ctx.fill();

      // 3. The 7 Defensive Tiers of the Chakravyuham
      const numTiers = 7;
      const tierSpacing = maxR / (numTiers + 0.8);

      for (let k = 1; k <= numTiers; k++) {
        const r = k * tierSpacing;
        // Alternate subtle rotation per tier to simulate active defensive shifting
        const dir = k % 2 === 0 ? 1 : -1;
        const tierAngle = baseAngle * dir * (0.8 + k * 0.1);

        // Gateway aperture gap angle (where Abhimanyu breaks in)
        const gapSize = Math.PI * 0.16; // opening size
        const gapCenter = tierAngle + (k * Math.PI) / 3.2;

        const startAngle = gapCenter + gapSize / 2;
        const endAngle = gapCenter + Math.PI * 2 - gapSize / 2;

        // Outer circular defensive wall with gateway opening
        ctx.strokeStyle = k === 7 
          ? 'rgba(255, 215, 0, 0.35)' 
          : k % 2 === 0 
          ? 'rgba(230, 192, 122, 0.20)' 
          : 'rgba(212, 175, 55, 0.15)';
        ctx.lineWidth = k === 7 || k === 1 ? 1.6 : 1.1;

        ctx.beginPath();
        ctx.arc(0, 0, r, startAngle, endAngle);
        ctx.stroke();

        // Inner dashed energy harmonic ring
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.08)';
        ctx.lineWidth = 0.8;
        ctx.setLineDash([3, 6]);
        ctx.beginPath();
        ctx.arc(0, 0, r - tierSpacing * 0.45, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Bastion defense nodes along the circumference
        const numBastions = 6 + k * 2;
        for (let b = 0; b < numBastions; b++) {
          const bAngle = tierAngle + (b * Math.PI * 2) / numBastions;
          // Avoid drawing bastion over the breach gateway
          const angleDiff = Math.abs(((bAngle - gapCenter + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
          if (angleDiff > gapSize * 0.7) {
            const bx = Math.cos(bAngle) * r;
            const by = Math.sin(bAngle) * r;

            // Small glowing golden bastion node
            ctx.fillStyle = k === 7 ? 'rgba(255, 215, 0, 0.65)' : 'rgba(230, 192, 122, 0.35)';
            ctx.beginPath();
            ctx.arc(bx, by, k === 7 ? 2.5 : 1.5, 0, Math.PI * 2);
            ctx.fill();

            // Diamond tick marks on outer and inner tiers
            if (k === numTiers || k === 4) {
              ctx.strokeStyle = 'rgba(255, 215, 0, 0.28)';
              ctx.lineWidth = 0.8;
              const tickLen = 3;
              ctx.beginPath();
              ctx.moveTo(bx - tickLen, by);
              ctx.lineTo(bx + tickLen, by);
              ctx.moveTo(bx, by - tickLen);
              ctx.lineTo(bx, by + tickLen);
              ctx.stroke();
            }
          }
        }
      }

      // 4. The Path of Abhimanyu (Golden Spiral Penetration Beam)
      // Visualizes "We Break The Chakravyuha Of Design & Code"
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.40)';
      ctx.lineWidth = 1.4;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();

      const spiralSteps = 120;
      for (let s = 0; s <= spiralSteps; s++) {
        const t = s / spiralSteps; // 0 (outer) to 1 (center)
        const currentR = maxR * (1 - t * 0.94);
        const spiralAngle = baseAngle * 0.6 + t * Math.PI * 4.2;
        const sx = Math.cos(spiralAngle) * currentR;
        const sy = Math.sin(spiralAngle) * currentR;

        if (s === 0) {
          ctx.moveTo(sx, sy);
        } else {
          ctx.lineTo(sx, sy);
        }
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // 5. Central Padmavyuha Core (Sacred Golden Lotus & Bindu)
      const coreR = tierSpacing * 0.75;
      
      // 8-Petal Central Lotus
      for (let i = 0; i < 8; i++) {
        const petalAngle = -baseAngle * 1.2 + (i * Math.PI * 2) / 8;
        const px = Math.cos(petalAngle) * (coreR * 0.6);
        const py = Math.sin(petalAngle) * (coreR * 0.6);

        ctx.strokeStyle = 'rgba(255, 215, 0, 0.35)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(px, py, coreR * 0.4, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Inner Core Circle
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.55)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(0, 0, coreR * 0.35, 0, Math.PI * 2);
      ctx.stroke();

      // Pulsing Central Divine Bindu
      const pulse = 1 + Math.sin(baseAngle * 25) * 0.25;
      ctx.fillStyle = 'rgba(255, 245, 200, 0.9)';
      ctx.beginPath();
      ctx.arc(0, 0, 3.5 * pulse, 0, Math.PI * 2);
      ctx.fill();

      // Golden Halo around Bindu
      ctx.fillStyle = 'rgba(212, 175, 55, 0.25)';
      ctx.beginPath();
      ctx.arc(0, 0, 9 * pulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Advance slow celestial revolution
      baseAngle += 0.0007;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
    />
  );
}
