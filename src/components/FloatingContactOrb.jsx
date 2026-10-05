import React, { useState } from 'react';

/**
 * 3D Floating Contact & WhatsApp Speed Dial Orb
 * Provides immediate instant access to WhatsApp, phone calls, and interactive tools.
 */
export default function FloatingContactOrb({ onOpenInspector, onOpenCalculator }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 select-none">
      
      {/* Expanded Quick Action Speed-Dial Menu */}
      {isOpen && (
        <div className="flex flex-col items-end gap-2.5 mb-2 animate-fadeIn">
          {/* Action 1: CAD Blueprint Inspector */}
          <button
            onClick={() => {
              onOpenInspector();
              setIsOpen(false);
            }}
            className="flex items-center gap-2.5 bg-black/90 hover:bg-yellow-500 hover:text-black text-yellow-300 border border-yellow-500/40 px-4 py-2.5 rounded-full text-xs font-bold transition shadow-xl backdrop-blur-md"
          >
            <span>📐 Inspect Sample CAD Drawing</span>
          </button>

          {/* Action 2: Per Sq.Ft Calculator */}
          <button
            onClick={() => {
              onOpenCalculator();
              setIsOpen(false);
            }}
            className="flex items-center gap-2.5 bg-black/90 hover:bg-yellow-500 hover:text-black text-yellow-300 border border-yellow-500/40 px-4 py-2.5 rounded-full text-xs font-bold transition shadow-xl backdrop-blur-md"
          >
            <span>🧮 Per-Sq.Ft Pricing Calculator</span>
          </button>

          {/* Action 3: Direct WhatsApp */}
          <a
            href="https://wa.me/919999999999?text=Hello%20Abhimanyu%20Technologies%2C%20I%20would%20like%20to%20discuss%20an%20AutoCAD%20Architecture%20or%20IT%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-full text-xs font-bold transition shadow-xl"
          >
            <span className="text-base">💬</span>
            <span>Chat on WhatsApp (2hr SLA)</span>
          </a>

          {/* Action 4: Direct Phone Call */}
          <a
            href="tel:+919999999999"
            className="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 rounded-full text-xs font-semibold transition shadow-xl backdrop-blur-md"
          >
            <span>📞</span>
            <span>Call: +91 99999 99999</span>
          </a>
        </div>
      )}

      {/* Main 3D Floating Orb Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group w-14 h-14 rounded-full bg-gradient-to-tr from-yellow-600 via-yellow-400 to-yellow-200 p-0.5 shadow-[0_0_35px_rgba(212,175,55,0.45)] hover:shadow-[0_0_50px_rgba(212,175,55,0.7)] hover:scale-110 active:scale-95 transition-all duration-300"
        aria-label="Instant Contact Speed Dial"
      >
        {/* Pulsing Aura Ring */}
        <span className="absolute -inset-1 rounded-full bg-yellow-400/40 blur-md group-hover:bg-yellow-400/60 animate-pulse pointer-events-none"></span>

        <div className="relative w-full h-full rounded-full bg-black flex items-center justify-center text-yellow-300 font-bold text-xl overflow-hidden">
          {isOpen ? (
            <span className="text-lg text-white">✕</span>
          ) : (
            <span className="group-hover:scale-110 transition duration-300">⚡</span>
          )}
        </div>
      </button>

    </div>
  );
}
