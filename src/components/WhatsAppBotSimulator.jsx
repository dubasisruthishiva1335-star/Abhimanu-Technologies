import React, { useState, useEffect, useRef } from 'react';

const PRESET_CONVERSATIONS = {
  'villa_30x50': {
    userQuery: 'Hi! I have a 30x50 East-facing plot in Kompally. Need a 2-floor duplex plan with Vastu. How fast can you deliver?',
    botReply: `Namaste! 🏛️ **Abhimanyu Architecture Division** here.\n\nFor a **30x50 (1,500 sq.ft)** East-facing duplex in Kompally:\n\n• **Turnaround:** First 2D layout in **24 Hours**\n• **Vastu:** 100% compliant (Pooja room in NE Ishanya, Master Bedroom in SW Nairuthi, Kitchen in SE Agneya)\n• **Deliverables:** Raw editable AutoCAD .DWG, high-res PDF, front 3D elevation, & TS-bPASS municipal submission sheet\n• **Pricing:** ₹15/sq.ft base = **₹22,500 total** (Includes 2 free revisions + structural vetting)\n\nWould you like me to dispatch our sample Kompally 30x50 villa blueprint to your WhatsApp?`,
    attachment: {
      title: 'Sample_30x50_Duplex_Kompally.dwg',
      type: 'AutoCAD Blueprint Package',
      size: '14.2 MB',
      badge: 'LOD 350 READY'
    }
  },
  'commercial_tsbpass': {
    userQuery: 'Do you handle G+12 commercial tech tower architectural plans and TS-bPASS sanctions?',
    botReply: `Yes! 🏢 We specialize in high-density commercial towers and municipal clearances across Hyderabad (GHMC & HMDA).\n\n• **BIM & Coordination:** Revit BIM LOD 400 clash detection between Structural, HVAC, Plumbing & MEP\n• **Municipal Sanctions:** 100% compliant with TS-bPASS Telangana building bylaws, parking ratio standards, and Fire NOC matrices\n• **Delivery Speed:** Venture master plan & floor demarcations in 5 working days\n\nOur team has cleared **150+ municipal layouts** with zero rejection friction.`,
    attachment: {
      title: 'TS-bPASS_Compliance_Checklist.pdf',
      type: 'Municipal Sanction Clearance Matrix',
      size: '4.8 MB',
      badge: '100% CLEARANCE'
    }
  },
  'realestate_crm': {
    userQuery: 'Can you show me a demo of your automated Real Estate WhatsApp CRM bot?',
    botReply: `You are currently experiencing our **Abhimanyu Real Estate AI Engine** in action! ⚡\n\n**Key Capabilities for Builders:**\n1. **3-Second Response:** Meta/Google ad leads receive instant personalized WhatsApp brochures in under 3.2s.\n2. **Lead Qualification:** Automatically gathers budget, facing, square footage, and loan readiness.\n3. **Site Visit Booking:** Syncs directly into Google Calendar & builder CRM with automated SMS/WhatsApp reminders.\n4. **Conversion Lift:** Typically delivers **+34% higher lead-to-visit conversion** in Month 1.\n\nSaaS setup starts at ₹10,000/month with zero vendor lock-in.`,
    attachment: {
      title: 'RealEstate_Lead_CRM_Architecture.pdf',
      type: 'AI Automation Workflow Spec',
      size: '2.1 MB',
      badge: '< 3.2s SLA'
    }
  },
  'dedicated_talent': {
    userQuery: 'How do I hire a dedicated Revit BIM draftsman at ₹25,000/month?',
    botReply: `Hiring a **Dedicated Senior Engineer** is seamless! 👷\n\n• **Schedule:** 8 Hours/Day • 6 Days/Week working exclusively for your construction or architecture firm\n• **Skillset:** AutoCAD 2D/3D, Revit BIM modeling, LOD 400 clash detection, and Quantity Takeoff (BOQ)\n• **Coordination:** Direct daily phone & WhatsApp sync with zero recruitment or platform overhead\n• **Pledge:** Vetted senior draftsman with **48-Hour replacement guarantee** if unsatisfied.\n\nWe can onboard your dedicated engineer within 24 hours.`,
    attachment: {
      title: 'Dedicated_Engineer_SLA_Agreement.pdf',
      type: 'Retainer Terms & Vetted Profiles',
      size: '1.8 MB',
      badge: '₹25,000/MO'
    }
  },
  'cost_breakdown': {
    userQuery: 'What is the full price breakdown for architectural plans and AI software?',
    botReply: `Here is our transparent **Chakravyuha-Free Pricing Matrix**:\n\n📐 **Architecture Division:**\n• 2D CAD Plans + Front Elevation: **₹5,000/plan** (or ₹15/sq.ft for large venture scope)\n• 3D Photorealistic Renderings: +₹8/sq.ft\n• Full Revit BIM & Structural: +₹12/sq.ft\n• TS-bPASS Municipal Clearance: +₹10/sq.ft\n\n💻 **IT & Software Division:**\n• Custom WhatsApp Lead Bot & CRM: **₹50,000 one-time** or ₹10,000/mo SaaS\n\n👷 **Freelance Talent:**\n• Dedicated Senior CAD/BIM Modeler: **₹25,000/month** flat retainer.`,
    attachment: {
      title: 'Abhimanyu_Rate_Card_2026.pdf',
      type: 'Official Transparent Pricing Sheet',
      size: '3.4 MB',
      badge: 'ZERO HIDDEN FEES'
    }
  }
};

export default function WhatsAppBotSimulator({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Namaste! 🙏 Welcome to Abhimanyu Technologies (Hyderabad).\n\nI am your 24/7 autonomous AI Engineering Assistant. From residential AutoCAD floor plans to real estate AI bots, I reply in **under 3 seconds**.\n\nChoose an inquiry below or type any question!',
      time: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const chatBottomRef = useRef(null);

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const triggerPreset = (key) => {
    const preset = PRESET_CONVERSATIONS[key];
    if (!preset || isTyping) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: preset.userQuery,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Realistic < 2.5s simulated AI response
    setTimeout(() => {
      setIsTyping(false);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: preset.botReply,
        attachment: preset.attachment,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1800);
  };

  const handleSendCustom = (e) => {
    e.preventDefault();
    if (!customInput.trim() || isTyping) return;

    const userText = customInput.trim();
    setCustomInput('');

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let reply = `Thank you for your inquiry regarding "${userText.slice(0, 40)}..."! 🏛️\n\nOur engineering team handles residential villa blueprints, commercial high-rises, GHMC/TS-bPASS sanctions, and custom software builds across Hyderabad.\n\nStandard delivery is 24-48 hours with raw editable .DWG files and 2 free revisions. Would you like to connect with our Technical Director directly on WhatsApp?`;

      if (userText.toLowerCase().includes('vastu')) {
        reply = `All our architectural floor plans strictly adhere to 16-zone Vedic Vastu Shastra! 🧭\n\nWe calculate the Brahmasthan, ensure the master bedroom is strictly in Nairuthi (South-West), kitchen in Agneya (South-East), and main entrance oriented along positive sub-zones. Full energy layout certification included.`;
      } else if (userText.toLowerCase().includes('price') || userText.toLowerCase().includes('cost')) {
        reply = `Our pricing is straightforward: ₹5,000 per detailed 2D villa blueprint + elevation (or ₹15/sq.ft for large venture scope), ₹25,000/month for a dedicated senior draftsman, and custom software from ₹50,000. No Chakravyuha, zero hidden fees!`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1900);
  };

  const liveWhatsAppUrl = `https://wa.me/919989028452?text=${encodeURIComponent(
    `*🏛️ INQUIRY FROM BOT SIMULATOR - ABHIMANYU TECH*\nHi, I just tried the 3-Second WhatsApp Bot Simulator on your website and would like to speak directly with an architect regarding my project.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4">
      {/* Phone Shell */}
      <div className="relative w-full max-w-lg bg-[#0c1317] border border-emerald-500/40 rounded-[32px] overflow-hidden shadow-2xl flex flex-col h-[90vh] max-h-[760px] animate-fadeIn">
        {/* WhatsApp Top Header Bar */}
        <div className="bg-[#1f2c34] px-4 py-3 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-white p-1 rounded-full text-lg leading-none"
              title="Close Simulator"
            >
              ←
            </button>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500/20 to-black border border-yellow-500/50 p-1 flex items-center justify-center overflow-hidden">
                <img
                  src="/abhimanyu-emblem-transparent.png"
                  alt="Abhimanyu Avatar"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#1f2c34]"></span>
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white text-sm">Abhimanyu AI Engineer</span>
                <span className="text-emerald-400 text-xs" title="Verified Business">✓</span>
              </div>
              <div className="text-[11px] text-emerald-400/90 font-medium">
                {isTyping ? (
                  <span className="animate-pulse">typing...</span>
                ) : (
                  '⚡ Replies in < 3s • Online'
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              LIVE SIMULATOR
            </span>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/10 text-sm"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Chat Messages Body with WhatsApp Wallpaper Pattern */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#0b141a]"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(32, 44, 51, 0.4) 0%, rgba(11, 20, 26, 0.95) 100%)`
          }}
        >
          {/* Encryption Notice */}
          <div className="mx-auto max-w-[280px] p-2 rounded-lg bg-[#182229]/80 border border-white/5 text-center text-[10px] text-yellow-500/80 leading-snug">
            🔒 Messages simulated through the Abhimanyu Real Estate Lead Engine. Average latency: 1.8s.
          </div>

          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} animate-fadeIn`}
              >
                <div
                  className={`max-w-[88%] sm:max-w-[82%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-md ${
                    isUser
                      ? 'bg-[#005c4b] text-white rounded-tr-none'
                      : 'bg-[#202c33] text-gray-100 rounded-tl-none border border-white/5'
                  }`}
                >
                  <div className="whitespace-pre-line select-text">
                    {m.text.split('**').map((part, i) =>
                      i % 2 === 1 ? <strong key={i} className="text-yellow-300 font-semibold">{part}</strong> : part
                    )}
                  </div>

                  {/* Attachment Card if present */}
                  {m.attachment && (
                    <div className="mt-3 p-2.5 rounded-xl bg-black/40 border border-yellow-500/20 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <span className="text-xl">📄</span>
                        <div className="truncate">
                          <div className="text-[11px] font-bold text-white truncate">{m.attachment.title}</div>
                          <div className="text-[9px] text-gray-400">{m.attachment.type} • {m.attachment.size}</div>
                        </div>
                      </div>
                      <span className="shrink-0 text-[9px] font-mono px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                        {m.attachment.badge}
                      </span>
                    </div>
                  )}

                  <div className="mt-1 flex items-center justify-end gap-1 text-[9px] text-gray-400 select-none">
                    <span>{m.time}</span>
                    {isUser && <span className="text-emerald-400 font-bold">✓✓</span>}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#202c33] text-gray-400 w-24 rounded-tl-none border border-white/5 animate-fadeIn">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce delay-100"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce delay-200"></span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Quick Question Action Pills Carousel */}
        <div className="bg-[#1f2c34]/95 p-2 border-t border-white/5 overflow-x-auto flex gap-2 shrink-0 scrollbar-none">
          <button
            onClick={() => triggerPreset('villa_30x50')}
            disabled={isTyping}
            className="shrink-0 text-[11px] font-medium px-3 py-1.5 rounded-full bg-white/5 hover:bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 transition whitespace-nowrap disabled:opacity-50"
          >
            📐 30x50 Villa Blueprint
          </button>
          <button
            onClick={() => triggerPreset('commercial_tsbpass')}
            disabled={isTyping}
            className="shrink-0 text-[11px] font-medium px-3 py-1.5 rounded-full bg-white/5 hover:bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 transition whitespace-nowrap disabled:opacity-50"
          >
            🏢 Commercial TS-bPASS
          </button>
          <button
            onClick={() => triggerPreset('realestate_crm')}
            disabled={isTyping}
            className="shrink-0 text-[11px] font-medium px-3 py-1.5 rounded-full bg-white/5 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 transition whitespace-nowrap disabled:opacity-50"
          >
            🤖 WhatsApp CRM Demo
          </button>
          <button
            onClick={() => triggerPreset('dedicated_talent')}
            disabled={isTyping}
            className="shrink-0 text-[11px] font-medium px-3 py-1.5 rounded-full bg-white/5 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 transition whitespace-nowrap disabled:opacity-50"
          >
            👷 Dedicated BIM (₹25k)
          </button>
          <button
            onClick={() => triggerPreset('cost_breakdown')}
            disabled={isTyping}
            className="shrink-0 text-[11px] font-medium px-3 py-1.5 rounded-full bg-white/5 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 transition whitespace-nowrap disabled:opacity-50"
          >
            💰 Pricing Breakdown
          </button>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendCustom} className="bg-[#1f2c34] p-2.5 flex items-center gap-2 shrink-0">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Type query or tap a prompt above..."
            disabled={isTyping}
            className="flex-1 bg-[#2a3942] text-white placeholder-gray-400 text-xs px-3.5 py-2.5 rounded-full border border-white/10 focus:outline-none focus:border-emerald-500 transition"
          />
          <button
            type="submit"
            disabled={!customInput.trim() || isTyping}
            className="w-9 h-9 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold text-sm hover:bg-emerald-400 transition disabled:opacity-40 disabled:hover:bg-emerald-500"
          >
            ➤
          </button>
        </form>

        {/* Live WhatsApp Call-to-Action Bar */}
        <div className="bg-black/90 p-2 text-center border-t border-white/10 flex items-center justify-between px-4 shrink-0">
          <span className="text-[10px] text-gray-400">Want real architectural drawings?</span>
          <a
            href={liveWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition"
          >
            Transfer to Live WhatsApp →
          </a>
        </div>
      </div>
    </div>
  );
}
