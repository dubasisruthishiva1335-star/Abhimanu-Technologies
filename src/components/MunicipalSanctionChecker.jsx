import React, { useState, useMemo } from 'react';

/**
 * TS-bPASS & GHMC Municipal Sanction Rules Checker
 * Instant compliance estimation according to Telangana Municipal Building Bylaws
 */
export default function MunicipalSanctionChecker() {
  const [plotAreaYards, setPlotAreaYards] = useState(250);
  const [roadWidthFeet, setRoadWidthFeet] = useState(40);
  const [buildingType, setBuildingType] = useState('residential'); // 'residential' | 'apartment' | 'commercial'

  const calculation = useMemo(() => {
    const areaSqFt = plotAreaYards * 9;
    let maxFloors = 'G + 2 Floors';
    let maxHeightMeters = 10;
    let setbacks = { front: '3.00 m (10 ft)', rear: '1.50 m (5 ft)', sides: '1.50 m (5 ft)' };
    let category = 'Instant Self-Certification (TS-bPASS)';
    let timeline = 'Instant Online Token (Within 24 Hours)';
    let coverage = 60; // 60%

    if (plotAreaYards <= 75) {
      maxFloors = 'G + 1 Floor';
      maxHeightMeters = 7;
      setbacks = { front: '1.50 m (5 ft)', rear: 'Nil', sides: 'Nil' };
      category = 'Instant Registration (₹1 Token)';
      timeline = 'Immediate Real-Time Receipt';
      coverage = 75;
    } else if (plotAreaYards <= 600 && buildingType === 'residential') {
      maxFloors = roadWidthFeet >= 40 ? 'G + 2 or Stilt + 3' : 'G + 2';
      maxHeightMeters = roadWidthFeet >= 40 ? 12 : 10;
      setbacks = {
        front: roadWidthFeet >= 40 ? '3.00 m (10 ft)' : '2.00 m (6.6 ft)',
        rear: '1.50 m (5 ft)',
        sides: '1.50 m (5 ft)'
      };
      category = 'Instant Self-Certification';
      timeline = 'Approved in 1 to 3 Days';
      coverage = 65;
    } else if (buildingType === 'apartment') {
      maxFloors = roadWidthFeet >= 40 ? 'Stilt + 5 Floors' : 'Stilt + 3 Floors';
      maxHeightMeters = roadWidthFeet >= 40 ? 18 : 12;
      setbacks = {
        front: '4.50 m (15 ft)',
        rear: '3.00 m (10 ft)',
        sides: '3.00 m (10 ft)'
      };
      category = 'Single Window Common Application';
      timeline = 'Guaranteed 21-Day Clearance';
      coverage = 55;
    } else {
      // Commercial
      maxFloors = roadWidthFeet >= 60 ? 'G + 6 Commercial' : 'G + 4 Commercial';
      maxHeightMeters = roadWidthFeet >= 60 ? 24 : 15;
      setbacks = {
        front: '6.00 m (20 ft)',
        rear: '4.00 m (13 ft)',
        sides: '4.00 m (13 ft)'
      };
      category = 'Single Window Multi-Department Clearance';
      timeline = 'Guaranteed 21-Day Clearance';
      coverage = 50;
    }

    const groundCoverageSqFt = Math.round((areaSqFt * coverage) / 100);
    const estBuiltUpSqFt = Math.round(areaSqFt * (buildingType === 'residential' ? 2.2 : buildingType === 'apartment' ? 3.0 : 3.5));

    return {
      areaSqFt,
      maxFloors,
      maxHeightMeters,
      setbacks,
      category,
      timeline,
      coverage,
      groundCoverageSqFt,
      estBuiltUpSqFt
    };
  }, [plotAreaYards, roadWidthFeet, buildingType]);

  return (
    <div className="rounded-3xl border border-yellow-500/30 bg-gradient-to-br from-[#0c0c10] via-[#08080a] to-[#0a0a0d] p-6 md:p-8 shadow-[0_0_50px_rgba(212,175,55,0.08)]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🏛️</span>
            <span className="text-xs uppercase tracking-[0.25em] text-yellow-400 font-bold">
              GHMC & TS-bPASS Compliance Tool
            </span>
          </div>
          <h3 className="text-2xl font-bold font-['Space_Grotesk'] text-white mt-1">
            Hyderabad Municipal Sanction Calculator
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Check setbacks, floor limits, and clearance pathway based on Telangana Building Rules.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 px-3.5 py-1.5 rounded-full text-xs text-yellow-300 font-mono self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>100% TS-bPASS Pass Guarantee</span>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        
        {/* Input 1: Plot Area */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <label className="text-gray-300 font-semibold">Plot Area:</label>
            <span className="font-mono text-yellow-400 font-bold">
              {plotAreaYards} Sq.Yards ({plotAreaYards * 9} sq.ft)
            </span>
          </div>
          <input
            type="range"
            min="50"
            max="1200"
            step="25"
            value={plotAreaYards}
            onChange={(e) => setPlotAreaYards(parseInt(e.target.value, 10))}
            className="w-full accent-yellow-400 cursor-pointer bg-white/20 h-2 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-gray-500">
            <span>50 Sq.Yds</span>
            <span>300 (Standard)</span>
            <span>1200 Sq.Yds</span>
          </div>
        </div>

        {/* Input 2: Road Width */}
        <div className="space-y-2">
          <label className="block text-xs text-gray-300 font-semibold">
            Abutting Road Width (Feet):
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[30, 40, 60, 100].map((width) => (
              <button
                key={width}
                type="button"
                onClick={() => setRoadWidthFeet(width)}
                className={`py-2 rounded-xl text-xs font-semibold border transition ${
                  roadWidthFeet === width
                    ? 'border-yellow-400 bg-yellow-400 text-black shadow-md'
                    : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/30'
                }`}
              >
                {width}' FT
              </button>
            ))}
          </div>
        </div>

        {/* Input 3: Building Type */}
        <div className="space-y-2">
          <label className="block text-xs text-gray-300 font-semibold">
            Building Classification:
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'residential', label: 'Villa (G+2)' },
              { id: 'apartment', label: 'Apartment' },
              { id: 'commercial', label: 'Commercial' }
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setBuildingType(t.id)}
                className={`py-2 px-1 rounded-xl text-[11px] font-semibold border transition text-center ${
                  buildingType === t.id
                    ? 'border-yellow-400 bg-yellow-400 text-black shadow-md'
                    : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/30'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Calculated Results Summary Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-black/60 border border-white/10 mb-6">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-gray-400">Permissible Floors</div>
          <div className="text-lg md:text-xl font-bold text-yellow-300 font-['Space_Grotesk'] mt-0.5">
            {calculation.maxFloors}
          </div>
          <div className="text-[11px] text-gray-400">Height: ≤ {calculation.maxHeightMeters}m</div>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-wider text-gray-400">Front Setback</div>
          <div className="text-lg md:text-xl font-bold text-white font-['Space_Grotesk'] mt-0.5">
            {calculation.setbacks.front}
          </div>
          <div className="text-[11px] text-gray-400">Road margin clearance</div>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-wider text-gray-400">Side / Rear Setbacks</div>
          <div className="text-lg md:text-xl font-bold text-white font-['Space_Grotesk'] mt-0.5">
            {calculation.setbacks.sides}
          </div>
          <div className="text-[11px] text-gray-400">Rear: {calculation.setbacks.rear}</div>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-wider text-gray-400">Est. Built-up Area</div>
          <div className="text-lg md:text-xl font-bold text-yellow-400 font-['Space_Grotesk'] mt-0.5">
            {calculation.estBuiltUpSqFt.toLocaleString('en-IN')} sq.ft
          </div>
          <div className="text-[11px] text-gray-400">{calculation.coverage}% Ground Coverage</div>
        </div>
      </div>

      {/* TS-bPASS Category Banner & Action CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-400 text-black flex items-center justify-center font-bold text-lg shrink-0">
            TS
          </div>
          <div>
            <div className="text-xs font-bold text-yellow-300">
              {calculation.category}
            </div>
            <div className="text-[11px] text-gray-300">
              Timeline: {calculation.timeline} • Zero Rejection Guarantee
            </div>
          </div>
        </div>

        <a
          href="#contact"
          className="w-full sm:w-auto bg-[#E6C07A] hover:bg-yellow-400 text-black px-6 py-2.5 rounded-full text-xs font-bold transition shadow-md whitespace-nowrap text-center"
        >
          Draft TS-bPASS Sanction Drawing →
        </a>
      </div>

    </div>
  );
}
