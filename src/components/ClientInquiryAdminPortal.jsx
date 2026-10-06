import React, { useState, useEffect } from 'react';

const SEED_INQUIRIES = [
  {
    ticketId: 'ABH-9842',
    name: 'Kalyan Chakravarthy',
    contact: '+919849012345',
    service: 'Architecture CAD/BIM',
    scope: 'G+12 Commercial Tech Tower (Miyapur, 45,000 sq.ft)',
    notes: 'Requires TS-bPASS sanction clearance documentation and Revit BIM LOD 400 clash detection.',
    status: 'IN PRODUCTION',
    estimatedValue: 675000,
    timestamp: '2026-10-06T14:32:00Z'
  },
  {
    ticketId: 'ABH-7621',
    name: 'Ananya Deshmukh',
    contact: '+919988776655',
    service: 'IT Division',
    scope: 'Real Estate Meta Ad WhatsApp CRM & AI Bot',
    notes: 'Builder with 3 active gated projects in Gachibowli. Needs 3-second WhatsApp brochure auto-responder.',
    status: 'QUOTED',
    estimatedValue: 60000,
    timestamp: '2026-10-06T11:15:00Z'
  },
  {
    ticketId: 'ABH-5419',
    name: 'Vikramaditya Varma',
    contact: '+919876543210',
    service: 'Freelance Hub',
    scope: 'Dedicated Senior Revit BIM Modeler (Monthly Retainer)',
    notes: 'Needs experienced architectural draftsman for daily standup coordination on Dubai EPC projects.',
    status: 'CLOSED',
    estimatedValue: 25000,
    timestamp: '2026-10-05T18:20:00Z'
  },
  {
    ticketId: 'ABH-3382',
    name: 'Srikanth Reddy',
    contact: '+919944332211',
    service: 'Architecture CAD/BIM',
    scope: '120-Acre Master Gated Community (Shadnagar)',
    notes: '200 duplex villas blueprints, arterial road layout, and DTCP sanction drawings.',
    status: 'IN REVIEW',
    estimatedValue: 450000,
    timestamp: '2026-10-05T09:45:00Z'
  }
];

export default function ClientInquiryAdminPortal({ isOpen, onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('abh_admin_auth') === 'true';
  });
  const [passkeyInput, setPasskeyInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Inquiries State
  const [inquiries, setInquiries] = useState([]);
  const [filterService, setFilterService] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Real-Time Recalculator State inside Admin
  const [calcSqft, setCalcSqft] = useState(2500);
  const [calcInclude3D, setCalcInclude3D] = useState(true);
  const [calcIncludeBIM, setCalcIncludeBIM] = useState(false);
  const [calcIncludeSanction, setCalcIncludeSanction] = useState(true);
  const [calcIncludeCRM, setCalcIncludeCRM] = useState(false);
  const [activeCalculatorTicket, setActiveCalculatorTicket] = useState(null);

  // Load inquiries from localStorage + Seed + Backend
  useEffect(() => {
    if (!isOpen || !isAuthenticated) return;

    const storedLocal = localStorage.getItem('abh_client_inquiries');
    let combined = SEED_INQUIRIES;

    if (storedLocal) {
      try {
        const parsed = JSON.parse(storedLocal);
        combined = [...parsed, ...SEED_INQUIRIES.filter(s => !parsed.some(p => p.ticketId === s.ticketId))];
      } catch (err) {
        console.warn('Error reading local inquiries:', err);
      }
    }

    // Attempt to pull from backend /api/contact if available
    fetch('/api/contact')
      .then(res => res.json())
      .then(data => {
        if (data?.inquiries && Array.isArray(data.inquiries)) {
          const mappedBackend = data.inquiries.map(item => ({
            ticketId: item.ticketId || `ABH-${Math.floor(1000 + Math.random() * 9000)}`,
            name: item.client?.name || item.name || 'Direct Lead',
            contact: item.client?.contact || item.phone || item.contact || '+91-9989028452',
            service: item.scope?.service || item.service || 'Architecture CAD/BIM',
            scope: item.scope?.details || item.message || item.sqftEstimate || 'Custom scope',
            notes: item.scope?.details || item.message || 'Direct inquiry submission',
            status: item.status || 'NEW',
            estimatedValue: 35000,
            timestamp: item.timestamp || new Date().toISOString()
          }));
          const merged = [...mappedBackend, ...combined.filter(c => !mappedBackend.some(b => b.ticketId === c.ticketId))];
          setInquiries(merged);
        } else {
          setInquiries(combined);
        }
      })
      .catch(() => {
        setInquiries(combined);
      });
  }, [isOpen, isAuthenticated]);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (passkeyInput === 'abhimanyu2026' || passkeyInput === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('abh_admin_auth', 'true');
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('abh_admin_auth');
    setPasskeyInput('');
  };

  const handleStatusChange = (ticketId, nextStatus) => {
    setInquiries(prev => {
      const updated = prev.map(inq => inq.ticketId === ticketId ? { ...inq, status: nextStatus } : inq);
      localStorage.setItem('abh_client_inquiries', JSON.stringify(updated));
      return updated;
    });
  };

  // Calculation Logic
  const calcBase = 15;
  const calcRate = calcBase + (calcInclude3D ? 8 : 0) + (calcIncludeBIM ? 12 : 0) + (calcIncludeSanction ? 10 : 0);
  const calcTotal = (calcSqft * calcRate) + (calcIncludeCRM ? 15000 : 0);

  const exportCSV = () => {
    const headers = ['Ticket ID,Client Name,Contact,Service,Scope,Estimated Value (INR),Status,Date'];
    const rows = inquiries.map(i =>
      `"${i.ticketId}","${i.name}","${i.contact}","${i.service}","${(i.scope || '').replace(/"/g, '""')}","${i.estimatedValue || 0}","${i.status}","${new Date(i.timestamp).toLocaleDateString()}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `abhimanyu_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // KPI Calculations
  const totalValue = inquiries.reduce((sum, item) => sum + (item.estimatedValue || 0), 0);
  const activeLeads = inquiries.filter(item => item.status !== 'CLOSED').length;

  const filteredInquiries = inquiries.filter(item => {
    const matchesService = filterService === 'ALL' || item.service.toLowerCase().includes(filterService.toLowerCase());
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ticketId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.contact.includes(searchQuery);
    return matchesService && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-3 sm:p-6 overflow-y-auto">
      {/* 1. AUTHENTICATION GATE */}
      {!isAuthenticated ? (
        <div className="relative w-full max-w-md bg-neutral-900 border border-yellow-500/40 rounded-3xl p-8 shadow-2xl animate-fadeIn text-center">
          <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 mx-auto flex items-center justify-center text-2xl mb-4">
            🔒
          </div>
          <span className="text-[10px] tracking-[0.3em] text-yellow-400 font-bold uppercase">SECURE FOUNDER ACCESS</span>
          <h2 className="text-2xl font-bold font-['Space_Grotesk'] text-white mt-1">Client Inquiry Portal</h2>
          <p className="text-xs text-gray-400 mt-2">
            Enter administrator passkey to inspect registered architectural inquiries and calculate live quotes.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              type="password"
              value={passkeyInput}
              onChange={(e) => setPasskeyInput(e.target.value)}
              placeholder="Passkey (abhimanyu2026)"
              className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-3 text-sm text-center text-white focus:outline-none focus:border-yellow-400 font-mono tracking-widest"
              autoFocus
            />

            {authError && (
              <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 py-2 rounded-lg">
                Invalid passkey. Hint: <code className="font-bold">abhimanyu2026</code>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl text-xs tracking-wider transition uppercase"
            >
              Unlock Admin Portal →
            </button>
          </form>

          <button
            onClick={onClose}
            className="mt-6 text-xs text-gray-500 hover:text-gray-300 transition"
          >
            ← Return to Website
          </button>
        </div>
      ) : (
        /* 2. MAIN ADMIN DASHBOARD */
        <div className="relative w-full max-w-6xl bg-[#0c0d10] border border-yellow-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-fadeIn">
          {/* Top Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/10 shrink-0">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center font-bold text-yellow-400 font-['Space_Grotesk']">
                  AT
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.25em] text-yellow-400 font-bold uppercase">PORTAL & CRM</span>
                  <h2 className="text-xl font-bold font-['Space_Grotesk'] text-white">Client Inquiry Management</h2>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <button
                onClick={exportCSV}
                className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 flex items-center gap-1.5 transition"
                title="Export inquiries to CSV for Excel/CRM"
              >
                <span>📥</span> Export CSV
              </button>
              <button
                onClick={handleLogout}
                className="px-3.5 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs text-red-400 transition"
              >
                Lock Portal
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center text-lg"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Metric KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-5 shrink-0">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">Active Leads</div>
              <div className="text-2xl font-bold font-['Space_Grotesk'] text-white mt-1">{activeLeads}</div>
              <div className="text-[10px] text-yellow-400 mt-1">● Pending Follow-Up</div>
            </div>
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">Pipeline Value</div>
              <div className="text-2xl font-bold font-['Space_Grotesk'] text-yellow-300 mt-1">
                ₹{totalValue.toLocaleString('en-IN')}
              </div>
              <div className="text-[10px] text-emerald-400 mt-1">↑ Verified Scope</div>
            </div>
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">Response SLA</div>
              <div className="text-2xl font-bold font-['Space_Grotesk'] text-emerald-400 mt-1">&lt; 38 min</div>
              <div className="text-[10px] text-gray-400 mt-1">Target: &lt; 2 Hours</div>
            </div>
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">WhatsApp Conversion</div>
              <div className="text-2xl font-bold font-['Space_Grotesk'] text-purple-400 mt-1">42.8%</div>
              <div className="text-[10px] text-gray-400 mt-1">Meta Ad to Site Visit</div>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4 shrink-0">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {['ALL', 'Architecture', 'IT', 'Freelance'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterService(f)}
                  className={`text-[11px] px-3 py-1.5 rounded-full font-medium transition whitespace-nowrap ${
                    filterService === f
                      ? 'bg-yellow-500 text-black font-bold'
                      : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                  }`}
                >
                  {f === 'ALL' ? 'All Inquiries' : f}
                </button>
              ))}
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search client, phone, or ticket..."
              className="bg-black/50 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 w-full sm:w-64"
            />
          </div>

          {/* Inquiry Table / List Container */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {filteredInquiries.length === 0 ? (
              <div className="py-16 text-center text-gray-500 text-sm">
                No matching inquiries found.
              </div>
            ) : (
              filteredInquiries.map((inq) => (
                <div
                  key={inq.ticketId}
                  className="p-4 rounded-2xl bg-black/50 border border-white/10 hover:border-yellow-500/30 transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-yellow-400 font-bold bg-yellow-500/10 border border-yellow-500/30 px-2 py-0.5 rounded text-[10px]">
                        {inq.ticketId}
                      </span>
                      <span className="font-bold text-white text-sm">{inq.name}</span>
                      <span className="text-gray-400 text-[11px] font-mono">{inq.contact}</span>
                      <span className="text-gray-500 text-[10px]">
                        {new Date(inq.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <div className="text-gray-300 leading-relaxed">
                      <b className="text-yellow-500/80">[{inq.service}]</b> {inq.scope}
                    </div>

                    {inq.notes && (
                      <div className="text-gray-500 text-[11px] italic">
                        Notes: {inq.notes}
                      </div>
                    )}
                  </div>

                  {/* Actions & Status Dropdown */}
                  <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-end md:self-center">
                    <div className="text-right mr-2 hidden sm:block">
                      <div className="text-[10px] text-gray-500 uppercase">Estimated</div>
                      <div className="font-bold text-yellow-400 font-['Space_Grotesk'] text-sm">
                        ₹{(inq.estimatedValue || 35000).toLocaleString('en-IN')}
                      </div>
                    </div>

                    <select
                      value={inq.status}
                      onChange={(e) => handleStatusChange(inq.ticketId, e.target.value)}
                      className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg border focus:outline-none cursor-pointer ${
                        inq.status === 'NEW'
                          ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                          : inq.status === 'IN REVIEW'
                          ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                          : inq.status === 'QUOTED'
                          ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                          : inq.status === 'IN PRODUCTION'
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      }`}
                    >
                      <option value="NEW" className="bg-neutral-900 text-white">NEW</option>
                      <option value="IN REVIEW" className="bg-neutral-900 text-white">IN REVIEW</option>
                      <option value="QUOTED" className="bg-neutral-900 text-white">QUOTED</option>
                      <option value="IN PRODUCTION" className="bg-neutral-900 text-white">IN PRODUCTION</option>
                      <option value="CLOSED" className="bg-neutral-900 text-white">CLOSED</option>
                    </select>

                    {/* WhatsApp Direct Chat Trigger */}
                    <a
                      href={`https://wa.me/${inq.contact.replace(/\D/g, '')}?text=${encodeURIComponent(
                        `*Namaste ${inq.name}!* This is Abhimanyu Technologies Technical Director regarding your inquiry #${inq.ticketId} for ${inq.service}. We have formulated your preliminary proposal.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center transition"
                      title="Open WhatsApp chat with client"
                    >
                      💬 WhatsApp
                    </a>

                    {/* Quote Calculator Trigger */}
                    <button
                      onClick={() => setActiveCalculatorTicket(inq)}
                      className="p-2 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 flex items-center justify-center transition"
                      title="Recalculate custom quote for this client"
                    >
                      🧮 Quote
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Quick Quote Recalculator Drawer/Bar */}
          {activeCalculatorTicket && (
            <div className="mt-4 p-4 rounded-2xl bg-yellow-500/[0.06] border border-yellow-500/30 shrink-0 flex flex-col md:flex-row justify-between items-center gap-4 animate-fadeIn">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-yellow-400">
                  <span>⚡ Instant Quote Generator for #{activeCalculatorTicket.ticketId} ({activeCalculatorTicket.name})</span>
                </div>
                <div className="flex flex-wrap gap-4 text-[11px] text-gray-300">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={calcInclude3D}
                      onChange={(e) => setCalcInclude3D(e.target.checked)}
                      className="accent-yellow-400"
                    />
                    <span>3D Elevations (+₹8)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={calcIncludeBIM}
                      onChange={(e) => setCalcIncludeBIM(e.target.checked)}
                      className="accent-yellow-400"
                    />
                    <span>Revit BIM (+₹12)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={calcIncludeSanction}
                      onChange={(e) => setCalcIncludeSanction(e.target.checked)}
                      className="accent-yellow-400"
                    />
                    <span>TS-bPASS Clear (+₹10)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={calcIncludeCRM}
                      onChange={(e) => setCalcIncludeCRM(e.target.checked)}
                      className="accent-yellow-400"
                    />
                    <span>AI Lead CRM (+₹15k)</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-[10px] text-gray-400 uppercase">Rate: ₹{calcRate}/sq.ft</div>
                  <div className="text-lg font-bold font-['Space_Grotesk'] text-yellow-300">
                    ₹{calcTotal.toLocaleString('en-IN')}
                  </div>
                </div>
                <a
                  href={`https://wa.me/${activeCalculatorTicket.contact.replace(/\D/g, '')}?text=${encodeURIComponent(
                    `*🏛️ QUOTATION - ABHIMANYU TECHNOLOGIES*\nTicket: #${activeCalculatorTicket.ticketId}\nClient: ${activeCalculatorTicket.name}\nScope: ${calcSqft} sq.ft\nRate: ₹${calcRate}/sq.ft\n*Total Quote: ₹${calcTotal.toLocaleString('en-IN')}*\nDelivery: 24-48 Hours with Raw .DWG & 2 Free Revisions.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-4 py-2 rounded-xl text-xs transition"
                >
                  Send Quote via WhatsApp →
                </a>
                <button
                  onClick={() => setActiveCalculatorTicket(null)}
                  className="text-gray-400 hover:text-white text-sm"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
