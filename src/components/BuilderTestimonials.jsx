import React, { useState } from 'react';
import TiltCard from './TiltCard.jsx';

/**
 * Builder & Client Testimonials Component
 * Features interactive 3D perspective cards, filter tabs, glowing star ratings,
 * verified client badges, and deliverable metrics.
 */
export default function BuilderTestimonials() {
  const [activeTab, setActiveTab] = useState('ALL');

  const testimonials = [
    {
      id: 1,
      category: 'ARCHITECTURE',
      name: 'Srikanth Reddy',
      role: 'Managing Director',
      company: 'Aura Infratech (Hyderabad)',
      avatar: '👨‍💼',
      avatarBg: 'from-amber-500/20 to-yellow-600/20',
      rating: 5,
      project: '120-Acre Master Gated Community (Shadnagar)',
      metric: '120 Acres • 200 Villas Approved',
      quote:
        'Abhimanyu Technologies drafted 200 duplex villa blueprints, arterial roads, and municipal sanction documentation with zero revision friction. Delivered all raw editable .DWG files ahead of schedule. Truly broke the traditional agency chakravyuha.',
      deliverables: ['AutoCAD 2D + 3D Elevations', 'DTCP & RERA Sanction Files', 'Master Venture Blueprint'],
      verified: true
    },
    {
      id: 2,
      category: 'AI SOFTWARE & CRM',
      name: 'Ananya Deshmukh',
      role: 'VP Engineering',
      company: 'Apex PropTech Solutions',
      avatar: '👩‍💻',
      avatarBg: 'from-purple-500/20 to-indigo-600/20',
      rating: 5,
      project: 'Automated WhatsApp Lead Qualifier & Builder CRM',
      metric: '3-Sec Response • +34% Conversion',
      quote:
        'Their IT division engineered an automated WhatsApp bot that captures buyer inquiries from Meta ads and responds in under 3 seconds with interactive project brochures. Our lead-to-site-visit conversion jumped by 34% in the very first month.',
      deliverables: ['3-Sec WhatsApp Automation Bot', 'Real Estate Lead CRM', 'Interactive Floor Plan Portal'],
      verified: true
    },
    {
      id: 3,
      category: 'DEDICATED TALENT',
      name: 'Vikramaditya Varma',
      role: 'Principal Architect',
      company: 'Varma & Associates (Banjara Hills)',
      avatar: '📐',
      avatarBg: 'from-cyan-500/20 to-blue-600/20',
      rating: 5,
      project: 'Dedicated Senior Revit BIM Modeler',
      metric: 'Dedicated Engineer • LOD 400 BIM',
      quote:
        'We hired a dedicated Revit BIM draftsman through Abhimanyu Technologies at ₹25,000/month. Direct daily WhatsApp and phone sync, zero management overhead, and extraordinary proficiency in LOD 400 clash detection.',
      deliverables: ['Full-Time Dedicated BIM Engineer', 'LOD 400 Clash Detection Matrix', 'Daily Standup Coordination'],
      verified: true
    },
    {
      id: 4,
      category: 'ARCHITECTURE',
      name: 'Kalyan Chakravarthy',
      role: 'Managing Partner',
      company: 'Skyline Commercial Ventures (Miyapur)',
      avatar: '🏗️',
      avatarBg: 'from-emerald-500/20 to-teal-600/20',
      rating: 5,
      project: 'G+12 Commercial Tech Tower & Vastu Layout',
      metric: '100% Municipal Clearance • G+12 Tower',
      quote:
        '100% compliant with TS-bPASS municipal bylaws on first submission. The Brahmasthan and 16-zone Vastu analysis gave our corporate buyers total peace of mind. Unmatched drafting speed and engineering precision.',
      deliverables: ['G+12 Structural CAD & MEP', '16-Zone Vastu Shastra Layout', 'TS-bPASS Sanction Clearance'],
      verified: true
    }
  ];

  const filtered = testimonials.filter(
    (t) => activeTab === 'ALL' || t.category === activeTab
  );

  return (
    <section id="testimonials" className="px-6 md:px-16 py-24 bg-[#09090d]/80 backdrop-blur-[2px] relative border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 border border-yellow-500/40 bg-yellow-500/10 rounded-full px-4 py-1.5 text-[11px] tracking-[0.25em] text-yellow-400 font-bold uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping"></span>
              ● CLIENT VERIFIED REVIEWS • 4.98 / 5.0 RATING
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] text-white">
              Trusted by Hyderabad's<br />
              <span className="shimmer-text">Top Builders & Architects.</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base mt-2 max-w-xl leading-relaxed">
              Read how real estate developers, commercial architects, and proptech teams leverage our AutoCAD blueprints, AI software, and dedicated engineers.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'ALL', label: 'All Reviews (4)' },
              { id: 'ARCHITECTURE', label: 'Architecture & Ventures' },
              { id: 'AI SOFTWARE & CRM', label: 'AI Software & CRM' },
              { id: 'DEDICATED TALENT', label: 'Dedicated Talent' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-500/20 scale-105'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials 3D Tilt Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((item) => (
            <TiltCard
              key={item.id}
              className="group relative rounded-3xl p-8 bg-black/60 border border-white/10 hover:border-yellow-500/50 hover:shadow-[0_0_35px_rgba(212,175,55,0.2)] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Animated Glowing Top Border Beam */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div>
                {/* Header: Avatar, Client Info & Rating */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.avatarBg} border border-yellow-500/30 flex items-center justify-center text-2xl shadow-lg shrink-0 group-hover:scale-105 transition-transform`}
                    >
                      {item.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-base font-['Space_Grotesk'] text-white group-hover:text-yellow-300 transition-colors">
                          {item.name}
                        </h4>
                        {item.verified && (
                          <span className="text-[10px] bg-green-500/20 text-green-400 border border-green-500/40 px-1.5 py-0.2 rounded-full font-bold">
                            ✓ Verified
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-yellow-400/90 font-medium">
                        {item.role}, <span className="text-gray-300">{item.company}</span>
                      </div>
                    </div>
                  </div>

                  {/* 5-Star Rating */}
                  <div className="flex items-center gap-0.5 text-yellow-400 text-sm">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>

                {/* Scope & Metric Pill */}
                <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-yellow-500/10 border border-yellow-500/25 text-[11px] font-semibold text-yellow-300">
                  <span>📍</span>
                  <span>{item.project}</span>
                </div>

                {/* Review Quote */}
                <p className="text-sm text-gray-300 leading-relaxed italic">
                  "{item.quote}"
                </p>

                {/* Deliverables Badges */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.deliverables.map((del, dIdx) => (
                    <span
                      key={dIdx}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] text-gray-400 font-medium"
                    >
                      {del}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Metric */}
              <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-xs">
                <span className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">Key Result</span>
                <span className="font-bold text-yellow-400 font-['Space_Grotesk']">{item.metric}</span>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Bottom Trust Metrics Strip */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-3xl bg-black/40 border border-white/10 text-center">
          <div>
            <div className="text-2xl font-bold font-['Space_Grotesk'] shimmer-text">99.4%</div>
            <div className="text-[11px] text-gray-400 mt-0.5 uppercase tracking-wider">On-Time Delivery</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-['Space_Grotesk'] shimmer-text">150+</div>
            <div className="text-[11px] text-gray-400 mt-0.5 uppercase tracking-wider">Plans Handed Over</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-['Space_Grotesk'] shimmer-text">100%</div>
            <div className="text-[11px] text-gray-400 mt-0.5 uppercase tracking-wider">Raw .DWG Ownership</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-['Space_Grotesk'] shimmer-text">48 Hours</div>
            <div className="text-[11px] text-gray-400 mt-0.5 uppercase tracking-wider">Engineer Replacement</div>
          </div>
        </div>
      </div>
    </section>
  );
}
