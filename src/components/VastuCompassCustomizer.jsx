import React, { useState } from 'react';

const VASTU_DIRECTIONS = [
  { id: 'NE', name: 'Ishanya (North-East)', element: 'Water / Ether', deity: 'Shiva / Jupiter', ideal: 'Pooja Room, Meditation, Borewell, Clean Entry', color: 'from-blue-500/20 to-cyan-500/10', border: 'border-cyan-500/40' },
  { id: 'E', name: 'Purva (East)', element: 'Air / Light', deity: 'Surya (Sun)', ideal: 'Main Entrance, Living Area, Balcony, Verandah', color: 'from-amber-500/20 to-yellow-500/10', border: 'border-yellow-500/40' },
  { id: 'SE', name: 'Agneya (South-East)', element: 'Fire (Agni)', deity: 'Agni Dev / Venus', ideal: 'Kitchen Cooktop, Inverter, Electrical Panel', color: 'from-orange-500/20 to-rose-500/10', border: 'border-orange-500/40' },
  { id: 'S', name: 'Dakshina (South)', element: 'Earth / Fire', deity: 'Yama / Mars', ideal: 'Heavy Furniture, Bedrooms, High Wall', color: 'from-red-500/20 to-neutral-900', border: 'border-red-500/40' },
  { id: 'SW', name: 'Nairuthi (South-West)', element: 'Earth (Prithvi)', deity: 'Niruthi / Rahu', ideal: 'Master Bedroom, Owner Suite, Heavy Wardrobe, Safe', color: 'from-amber-600/20 to-yellow-900/10', border: 'border-amber-600/40' },
  { id: 'W', name: 'Paschima (West)', element: 'Water / Air', deity: 'Varuna / Saturn', ideal: 'Dining Room, Children Bedroom, Study Table, Overhead Tank', color: 'from-indigo-500/20 to-blue-900/10', border: 'border-indigo-500/40' },
  { id: 'NW', name: 'Vayavya (North-West)', element: 'Air (Vayu)', deity: 'Vayu Dev / Moon', ideal: 'Guest Bedroom, Granary, Parking, Finished Goods', color: 'from-teal-500/20 to-slate-800', border: 'border-teal-500/40' },
  { id: 'N', name: 'Uttara (North)', element: 'Water / Mercury', deity: 'Kubera (Wealth)', ideal: 'Treasury Safe, Open Lawns, Living Room, Main Gate', color: 'from-emerald-500/20 to-green-900/10', border: 'border-emerald-500/40' },
  { id: 'C', name: 'Brahmasthan (Center)', element: 'Cosmic Ether (Akash)', deity: 'Lord Brahma', ideal: 'Open Courtyard, Zero Weight, Clean Airflow', color: 'from-yellow-400/30 to-amber-500/20', border: 'border-yellow-400/60' }
];

export default function VastuCompassCustomizer({ isOpen, onClose, onApplyToForm }) {
  const [selectedFacing, setSelectedFacing] = useState('EAST');
  const [activeZone, setActiveZone] = useState(VASTU_DIRECTIONS[0]);
  const [poojaZone, setPoojaZone] = useState('NE');
  const [kitchenZone, setKitchenZone] = useState('SE');
  const [masterBedZone, setMasterBedZone] = useState('SW');
  const [livingZone, setLivingZone] = useState('E');

  if (!isOpen) return null;

  // Calculate live Vastu Score
  let score = 50;
  if (poojaZone === 'NE') score += 15;
  if (kitchenZone === 'SE') score += 15;
  if (masterBedZone === 'SW') score += 15;
  if (livingZone === 'E' || livingZone === 'N') score += 5;

  const handleApply = () => {
    const summary = `Vastu Verified: Facing ${selectedFacing} • Score ${score}% • Master Bed: ${masterBedZone} • Kitchen: ${kitchenZone} • Pooja: ${poojaZone}`;
    if (onApplyToForm) onApplyToForm(summary);
    onClose();
  };

  const shareOnWhatsApp = () => {
    const text = `*🧭 VASTU CONSULTATION REQUEST - ABHIMANYU TECHNOLOGIES*\nFacing: ${selectedFacing} Facing Plot\nVastu Compliance Score: ${score}%\n• Pooja Room: ${poojaZone}\n• Kitchen: ${kitchenZone}\n• Master Bedroom: ${masterBedZone}\n• Living Hall: ${livingZone}\nPlease review our plot layout with Chief Architect.`;
    window.open(`https://wa.me/919989028452?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#0c0d12] border border-yellow-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-xl">
              🧭
            </div>
            <div>
              <span className="text-[10px] tracking-[0.25em] text-yellow-400 font-bold uppercase">16-ZONE VEDIC ARCHITECTURE</span>
              <h2 className="text-xl font-bold font-['Space_Grotesk'] text-white">3D Vastu Compass & Layout Customizer</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto my-5 space-y-6 pr-1">
          {/* Plot Facing Selector */}
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">1. Select Plot Orientation</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'EAST', label: '🌅 East Facing', desc: 'Surya Pada (Highly Auspicious)' },
                { id: 'NORTH', label: '🏔️ North Facing', desc: 'Kubera Pada (Prosperity & Wealth)' },
                { id: 'WEST', label: '🌇 West Facing', desc: 'Varuna Pada (Stability & Fame)' },
                { id: 'SOUTH', label: '☀️ South Facing', desc: 'Yama Pada (Vastu Remedy Verified)' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFacing(f.id)}
                  className={`p-3 rounded-2xl border text-left transition ${
                    selectedFacing === f.id
                      ? 'bg-yellow-500/20 border-yellow-500 text-yellow-300 shadow-md shadow-yellow-500/10'
                      : 'bg-black/40 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <div className="font-bold text-xs">{f.label}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{f.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive 3D Vastu Mandala Grid */}
          <div>
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">2. 9-Square Sacred Meru Matrix (Tap Zone to Inspect)</span>
              <span className="text-[10px] font-mono text-yellow-400">Brahmasthan Center Clean</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 max-w-lg mx-auto p-3.5 rounded-3xl bg-black/60 border border-yellow-500/30 shadow-inner">
              {/* Row 1: NW, N, NE */}
              {[VASTU_DIRECTIONS[6], VASTU_DIRECTIONS[7], VASTU_DIRECTIONS[0]].map((z) => (
                <button
                  key={z.id}
                  onClick={() => setActiveZone(z)}
                  className={`p-4 rounded-2xl border flex flex-col items-center justify-center text-center transition cursor-pointer ${
                    activeZone.id === z.id
                      ? 'border-yellow-400 bg-yellow-500/20 shadow-lg shadow-yellow-500/20 scale-105'
                      : `${z.border} bg-gradient-to-b ${z.color} hover:scale-102`
                  }`}
                >
                  <span className="text-sm font-bold text-white">{z.id}</span>
                  <span className="text-[10px] text-gray-300 font-medium truncate w-full mt-0.5">{z.name.split(' ')[0]}</span>
                </button>
              ))}

              {/* Row 2: W, Center, E */}
              {[VASTU_DIRECTIONS[5], VASTU_DIRECTIONS[8], VASTU_DIRECTIONS[1]].map((z) => (
                <button
                  key={z.id}
                  onClick={() => setActiveZone(z)}
                  className={`p-4 rounded-2xl border flex flex-col items-center justify-center text-center transition cursor-pointer ${
                    activeZone.id === z.id
                      ? 'border-yellow-400 bg-yellow-500/20 shadow-lg shadow-yellow-500/20 scale-105'
                      : `${z.border} bg-gradient-to-b ${z.color} hover:scale-102`
                  }`}
                >
                  <span className="text-sm font-bold text-white">{z.id}</span>
                  <span className="text-[10px] text-gray-300 font-medium truncate w-full mt-0.5">{z.name.split(' ')[0]}</span>
                </button>
              ))}

              {/* Row 3: SW, S, SE */}
              {[VASTU_DIRECTIONS[4], VASTU_DIRECTIONS[3], VASTU_DIRECTIONS[2]].map((z) => (
                <button
                  key={z.id}
                  onClick={() => setActiveZone(z)}
                  className={`p-4 rounded-2xl border flex flex-col items-center justify-center text-center transition cursor-pointer ${
                    activeZone.id === z.id
                      ? 'border-yellow-400 bg-yellow-500/20 shadow-lg shadow-yellow-500/20 scale-105'
                      : `${z.border} bg-gradient-to-b ${z.color} hover:scale-102`
                  }`}
                >
                  <span className="text-sm font-bold text-white">{z.id}</span>
                  <span className="text-[10px] text-gray-300 font-medium truncate w-full mt-0.5">{z.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Zone Detail Card */}
          <div className="p-4 rounded-2xl bg-neutral-900 border border-yellow-500/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">{activeZone.id}</span>
                <span className="font-bold text-sm text-white">{activeZone.name}</span>
                <span className="text-[11px] text-gray-400">Element: <b>{activeZone.element}</b></span>
              </div>
              <div className="text-xs text-gray-300 mt-1">
                <b className="text-yellow-400">Recommended Usage:</b> {activeZone.ideal}
              </div>
            </div>
            <span className="shrink-0 text-[10px] text-gray-400 italic">Presiding Deity: {activeZone.deity}</span>
          </div>

          {/* Live Compliance Scorecard & Room Selectors */}
          <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-white">Vastu Compliance Rating</span>
                <div className="text-[11px] text-gray-400">Calculated according to Mayamata & Manasara shastras</div>
              </div>
              <div className="text-right">
                <span className={`text-2xl font-bold font-['Space_Grotesk'] ${score >= 90 ? 'text-emerald-400' : 'text-yellow-400'}`}>
                  {score}%
                </span>
                <div className="text-[10px] text-gray-400">100% TS-bPASS Aligned</div>
              </div>
            </div>

            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${score >= 90 ? 'bg-emerald-400' : 'bg-yellow-400'}`}
                style={{ width: `${score}%` }}
              />
            </div>

            {/* Room Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="text-[10px] text-gray-400 block mb-1">Pooja Room</label>
                <select
                  value={poojaZone}
                  onChange={(e) => setPoojaZone(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 p-2 rounded-lg text-white"
                >
                  <option value="NE">NE (Ishanya - Ideal)</option>
                  <option value="E">East</option>
                  <option value="N">North</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] text-gray-400 block mb-1">Kitchen</label>
                <select
                  value={kitchenZone}
                  onChange={(e) => setKitchenZone(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 p-2 rounded-lg text-white"
                >
                  <option value="SE">SE (Agneya - Ideal)</option>
                  <option value="NW">NW (Vayavya)</option>
                  <option value="E">East</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] text-gray-400 block mb-1">Master Bedroom</label>
                <select
                  value={masterBedZone}
                  onChange={(e) => setMasterBedZone(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 p-2 rounded-lg text-white"
                >
                  <option value="SW">SW (Nairuthi - Ideal)</option>
                  <option value="S">South</option>
                  <option value="W">West</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] text-gray-400 block mb-1">Living Room</label>
                <select
                  value={livingZone}
                  onChange={(e) => setLivingZone(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 p-2 rounded-lg text-white"
                >
                  <option value="E">East (Surya - Ideal)</option>
                  <option value="N">North (Kubera)</option>
                  <option value="NE">NE (Ishanya)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-white/10 shrink-0">
          <span className="text-xs text-gray-400 text-center sm:text-left">
            ⚡ All drawings signed by certified architectural engineers with full Vastu guarantee.
          </span>
          <div className="flex gap-2.5 w-full sm:w-auto">
            <button
              onClick={shareOnWhatsApp}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition"
            >
              <span>💬</span> WhatsApp Vastu Spec
            </button>
            <button
              onClick={handleApply}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xs transition"
            >
              Apply to Quote Form →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
