import React, { useState } from 'react';

/**
 * Interactive CAD Blueprint & Layer Inspector Modal
 * Allows architects, builders, and clients to inspect real architectural CAD drawings
 * with interactive layer toggling, dimension measurements, and Vastu compass overlay.
 */
export default function CadBlueprintInspector({ isOpen, onClose }) {
  const [layers, setLayers] = useState({
    walls: true,
    dimensions: true,
    vastu: true,
    electrical: false,
    plumbing: false,
    furniture: true
  });

  const [zoom, setZoom] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(null);

  if (!isOpen) return null;

  const toggleLayer = (layerKey) => {
    setLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const rooms = [
    { id: 'living', name: 'Grand Living Hall', area: '280 sq.ft', vastu: 'East / North-East facing - Abundance', x: 260, y: 160 },
    { id: 'master', name: 'Master Bedroom', area: '210 sq.ft', vastu: 'South-West (Nairuthi) - Stability & Health', x: 120, y: 310 },
    { id: 'kitchen', name: 'Modular Kitchen', area: '140 sq.ft', vastu: 'South-East (Agneya) - Sacred Fire Element', x: 440, y: 320 },
    { id: 'puja', name: 'Puja Mandir', area: '45 sq.ft', vastu: 'North-East (Ishanya) - Supreme Divine Zone', x: 440, y: 120 },
    { id: 'dining', name: 'Dining Lounge', area: '160 sq.ft', vastu: 'West - Prosperity & Nourishment', x: 300, y: 320 },
    { id: 'verandah', name: 'Entry Foyer & Parking', area: '190 sq.ft', vastu: 'North Entrance - Kubera Wealth Flow', x: 140, y: 120 }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#0d0d12] border border-yellow-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/60">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📐</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-['Space_Grotesk'] text-white">
                  CAD Drawing & Layer Inspector
                </h3>
                <span className="text-[10px] bg-yellow-500/20 text-yellow-300 font-mono px-2 py-0.5 rounded border border-yellow-500/30">
                  DWG 2026 REV 4.2
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Plot #45, Kukatpally • 30' x 50' Luxury East-Facing Villa • GHMC Compliant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-yellow-500 hover:text-black flex items-center justify-center text-gray-300 transition text-lg font-bold"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Workspace: Sidebar Layer Controls + Interactive SVG Blueprint Canvas */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left / Top Controls Sidebar */}
          <div className="w-full md:w-72 p-5 border-b md:border-b-0 md:border-r border-white/10 bg-[#09090c] shrink-0 overflow-y-auto space-y-5">
            <div>
              <h4 className="text-xs uppercase tracking-widest text-yellow-400 font-bold mb-3">
                AutoCAD Layers (F8 / LA)
              </h4>
              <div className="space-y-2 text-xs">
                {[
                  { key: 'walls', label: 'Walls & RCC Columns', color: '#E6C07A', icon: '🧱' },
                  { key: 'dimensions', label: 'Dimensions & Grid Lines', color: '#00E5FF', icon: '📏' },
                  { key: 'vastu', label: 'Vastu Direction Compass', color: '#FFD700', icon: '🧭' },
                  { key: 'furniture', label: 'Room Layout & Furniture', color: '#A78BFA', icon: '🛋️' },
                  { key: 'electrical', label: 'Electrical & Conduits', color: '#F59E0B', icon: '⚡' },
                  { key: 'plumbing', label: 'Plumbing & Drainage', color: '#38BDF8', icon: '🚰' }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => toggleLayer(item.key)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition ${
                      layers[item.key]
                        ? 'border-yellow-500/30 bg-yellow-500/10 text-white'
                        : 'border-white/5 bg-white/[0.02] text-gray-500 line-through'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    <span
                      className="w-3 h-3 rounded-full border"
                      style={{
                        backgroundColor: layers[item.key] ? item.color : 'transparent',
                        borderColor: item.color
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Room Inspector Quick Details */}
            {selectedRoom && (
              <div className="p-3.5 rounded-xl border border-yellow-500/30 bg-yellow-500/5">
                <div className="text-[10px] uppercase tracking-wider text-yellow-400 font-bold">
                  Selected Zone
                </div>
                <div className="text-sm font-bold text-white mt-0.5">{selectedRoom.name}</div>
                <div className="text-xs text-yellow-200 mt-1">Area: {selectedRoom.area}</div>
                <div className="text-[11px] text-gray-300 mt-1 leading-snug">
                  {selectedRoom.vastu}
                </div>
              </div>
            )}

            {/* Zoom Controls */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-gray-400">Zoom: {Math.round(zoom * 100)}%</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setZoom(Math.max(0.7, zoom - 0.15))}
                  className="px-2.5 py-1 rounded bg-white/10 text-xs hover:bg-white/20"
                >
                  −
                </button>
                <button
                  onClick={() => setZoom(1)}
                  className="px-2.5 py-1 rounded bg-white/10 text-xs hover:bg-white/20"
                >
                  100%
                </button>
                <button
                  onClick={() => setZoom(Math.min(1.8, zoom + 0.15))}
                  className="px-2.5 py-1 rounded bg-white/10 text-xs hover:bg-white/20"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Right Blueprint Canvas */}
          <div className="flex-1 bg-[#050508] p-6 flex items-center justify-center overflow-auto relative select-none">
            {/* Grid Pattern Background */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(#d4af37 1px, transparent 1px), radial-gradient(#d4af37 1px, #050508 1px)',
                backgroundSize: '24px 24px',
                backgroundPosition: '0 0, 12px 12px'
              }}
            />

            {/* SVG Interactive Architectural Blueprint */}
            <div
              style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
              className="transition-transform duration-200"
            >
              <svg
                width="560"
                height="440"
                viewBox="0 0 560 440"
                className="rounded-2xl border border-yellow-500/30 bg-[#0a0a0f] shadow-2xl"
              >
                {/* Outer Plot Boundary & Setback Lines */}
                <rect
                  x="20"
                  y="20"
                  width="520"
                  height="400"
                  fill="none"
                  stroke="#333"
                  strokeDasharray="6 4"
                  strokeWidth="1.5"
                />
                <text x="35" y="38" fill="#666" fontSize="10" fontFamily="monospace">
                  GHMC ROAD BOUNDARY (40FT WIDE)
                </text>

                {/* Building Outer Plinth Walls */}
                {layers.walls && (
                  <g stroke="#E6C07A" strokeWidth="3" fill="#14141d">
                    {/* Outer Shell */}
                    <rect x="60" y="60" width="440" height="320" rx="4" />

                    {/* Internal Room Partitions */}
                    <line x1="220" y1="60" x2="220" y2="380" stroke="#E6C07A" strokeWidth="2.5" />
                    <line x1="60" y1="220" x2="220" y2="220" stroke="#E6C07A" strokeWidth="2.5" />
                    <line x1="220" y1="220" x2="500" y2="220" stroke="#E6C07A" strokeWidth="2.5" />
                    <line x1="380" y1="60" x2="380" y2="220" stroke="#E6C07A" strokeWidth="2.5" />

                    {/* RCC Columns (Square markers) */}
                    {[
                      [56, 56], [216, 56], [376, 56], [496, 56],
                      [56, 216], [216, 216], [376, 216], [496, 216],
                      [56, 376], [216, 376], [496, 376]
                    ].map(([cx, cy], i) => (
                      <rect
                        key={i}
                        x={cx}
                        y={cy}
                        width="8"
                        height="8"
                        fill="#D4AF37"
                        stroke="#FFF"
                        strokeWidth="0.8"
                      />
                    ))}
                  </g>
                )}

                {/* Dimensions Layer */}
                {layers.dimensions && (
                  <g stroke="#00E5FF" strokeWidth="1" fill="#00E5FF" fontSize="10" fontFamily="monospace">
                    {/* Top dimension */}
                    <line x1="60" y1="46" x2="500" y2="46" />
                    <line x1="60" y1="40" x2="60" y2="52" />
                    <line x1="500" y1="40" x2="500" y2="52" />
                    <text x="260" y="42" textAnchor="middle">44'-0" [13.41 M]</text>

                    {/* Left dimension */}
                    <line x1="46" y1="60" x2="46" y2="380" />
                    <line x1="40" y1="60" x2="52" y2="60" />
                    <line x1="40" y1="380" x2="52" y2="380" />
                    <text x="42" y="225" textAnchor="middle" transform="rotate(-90 42 225)">32'-0" [9.75 M]</text>
                  </g>
                )}

                {/* Vastu Compass Layer */}
                {layers.vastu && (
                  <g>
                    {/* Central Brahmasthan sacred aura */}
                    <circle cx="280" cy="220" r="42" fill="none" stroke="#FFD700" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                    <text x="280" y="224" fill="#FFD700" fontSize="9" textAnchor="middle" opacity="0.7">
                      BRAHMASTHAN (OPEN)
                    </text>

                    {/* Vastu Cardinal Marks */}
                    <text x="508" y="224" fill="#FFD700" fontSize="10" fontWeight="bold">E (SURYA)</text>
                    <text x="280" y="52" fill="#FFD700" fontSize="10" fontWeight="bold" textAnchor="middle">N (KUBERA)</text>
                    <text x="445" y="78" fill="#F59E0B" fontSize="9" fontWeight="bold">ISHANYA (NE)</text>
                    <text x="445" y="370" fill="#EF4444" fontSize="9" fontWeight="bold">AGNEYA (SE)</text>
                    <text x="68" y="370" fill="#3B82F6" fontSize="9" fontWeight="bold">NAIRUTHI (SW)</text>
                  </g>
                )}

                {/* Interactive Clickable Room Zones */}
                {rooms.map((room) => (
                  <g
                    key={room.id}
                    onClick={() => setSelectedRoom(room)}
                    className="cursor-pointer group"
                  >
                    <circle
                      cx={room.x}
                      cy={room.y}
                      r="18"
                      fill={selectedRoom?.id === room.id ? '#D4AF37' : '#22222c'}
                      stroke="#E6C07A"
                      strokeWidth="1"
                      className="group-hover:fill-yellow-500/40 transition"
                    />
                    <text
                      x={room.x}
                      y={room.y + 4}
                      fill={selectedRoom?.id === room.id ? '#000' : '#E6C07A'}
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {room.name.slice(0, 2).toUpperCase()}
                    </text>
                    <text
                      x={room.x}
                      y={room.y + 24}
                      fill="#FFF"
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                      opacity="0.9"
                    >
                      {room.name}
                    </text>
                    <text
                      x={room.x}
                      y={room.y + 36}
                      fill="#888"
                      fontSize="8"
                      textAnchor="middle"
                    >
                      {room.area}
                    </text>
                  </g>
                ))}

                {/* Electrical Conduits Layer */}
                {layers.electrical && (
                  <g stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 2">
                    <line x1="280" y1="160" x2="440" y2="120" />
                    <line x1="280" y1="160" x2="120" y2="310" />
                    <line x1="280" y1="160" x2="440" y2="320" />
                    <circle cx="280" cy="160" r="5" fill="#F59E0B" />
                    <circle cx="440" cy="120" r="4" fill="#F59E0B" />
                    <circle cx="120" cy="310" r="4" fill="#F59E0B" />
                    <circle cx="440" cy="320" r="4" fill="#F59E0B" />
                  </g>
                )}

                {/* Plumbing Layer */}
                {layers.plumbing && (
                  <g stroke="#38BDF8" strokeWidth="2">
                    <line x1="440" y1="340" x2="490" y2="340" />
                    <line x1="490" y1="340" x2="490" y2="390" />
                    <line x1="120" y1="330" x2="70" y2="330" />
                    <line x1="70" y1="330" x2="70" y2="390" />
                    <circle cx="490" cy="390" r="4" fill="#38BDF8" />
                    <circle cx="70" cy="390" r="4" fill="#38BDF8" />
                  </g>
                )}
              </svg>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-white/10 bg-black/60 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="text-yellow-400 font-bold">✓ TS-bPASS Standard:</span>
            <span>All drawing symbols follow Telangana Municipal Building Bylaws 2026</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={onClose}
              className="bg-[#E6C07A] hover:bg-yellow-400 text-black px-5 py-2.5 rounded-full text-xs font-bold transition shadow-md shadow-yellow-500/20"
            >
              Order Similar Drawing (₹5,000) →
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
