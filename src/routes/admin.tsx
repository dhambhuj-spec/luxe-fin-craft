import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard, FileText, Users, Settings, LogOut, Bell, Search,
  Plus, Upload, Image as ImgIcon, MoreHorizontal, TrendingUp,
  Eye, Edit3, Trash2, ChevronDown, Building2, X, Percent, Save, Check,
  Mail, Phone, MessageCircle, Filter, ArrowUpRight, Shield, Globe, Palette, CreditCard, Lock,
} from "lucide-react";

export const Route = createFileRoute("/admin")({ component: Admin });

type Brochure = {
  name: string; builder: string; loc: string; type: string; price: string;
  configs: string; possession: string; rera: string; date: string; views: number; status: string;
};

const initialBrochures: Brochure[] = [
  { name: "Lodha Belmondo", builder: "Lodha Group", loc: "Pune", type: "Residential", price: "₹2.4 Cr", configs: "3, 4 BHK", possession: "Dec 2026", rera: "P52100012345", date: "12 Mar 2025", views: 1248, status: "Published" },
  { name: "Prestige Falcon City", builder: "Prestige Estates", loc: "Bengaluru", type: "Residential", price: "₹1.8 Cr", configs: "2, 3, 4 BHK", possession: "Jun 2027", rera: "PRM/KA/RERA/22345", date: "08 Mar 2025", views: 982, status: "Published" },
  { name: "DLF Camellias", builder: "DLF Limited", loc: "Gurugram", type: "Luxury", price: "₹12 Cr", configs: "4, 5 BHK", possession: "Ready to move", rera: "RC/REP/HARERA/445", date: "01 Mar 2025", views: 2104, status: "Published" },
  { name: "Godrej Reserve", builder: "Godrej Properties", loc: "Mumbai", type: "Residential", price: "₹3.2 Cr", configs: "3 BHK", possession: "Mar 2027", rera: "P51800023456", date: "27 Feb 2025", views: 614, status: "Draft" },
  { name: "Brigade El Dorado", builder: "Brigade Group", loc: "Bengaluru", type: "Commercial", price: "₹95 L", configs: "1, 2 BHK", possession: "Sep 2026", rera: "PRM/KA/RERA/33456", date: "21 Feb 2025", views: 530, status: "Published" },
  { name: "Sobha Dream Acres", builder: "Sobha Limited", loc: "Bengaluru", type: "Residential", price: "₹1.1 Cr", configs: "2, 3 BHK", possession: "Dec 2025", rera: "PRM/KA/RERA/44567", date: "15 Feb 2025", views: 745, status: "Archived" },
];

type Rate = { id: string; name: string; min: number; max: number; processing: string; tenure: string; updated: string };

const initialRates: Rate[] = [
  { id: "home", name: "Home Loan", min: 8.40, max: 9.75, processing: "0.50%", tenure: "Up to 30 yrs", updated: "12 Mar 2025" },
  { id: "car", name: "Car Loan", min: 8.75, max: 11.50, processing: "1.00%", tenure: "Up to 7 yrs", updated: "10 Mar 2025" },
  { id: "business", name: "Business Loan", min: 11.99, max: 18.00, processing: "1.50%", tenure: "Up to 5 yrs", updated: "08 Mar 2025" },
  { id: "personal", name: "Personal Loan", min: 10.50, max: 16.00, processing: "1.25%", tenure: "Up to 6 yrs", updated: "08 Mar 2025" },
  { id: "lap", name: "Loan Against Property", min: 9.25, max: 12.50, processing: "0.75%", tenure: "Up to 15 yrs", updated: "05 Mar 2025" },
  { id: "edu", name: "Education Loan", min: 9.50, max: 13.00, processing: "1.00%", tenure: "Up to 10 yrs", updated: "01 Mar 2025" },
  { id: "gold", name: "Gold Loan", min: 8.90, max: 14.00, processing: "0.30%", tenure: "Up to 3 yrs", updated: "01 Mar 2025" },
];

type View = "dashboard" | "brochures" | "rates" | "leads" | "analytics" | "settings";

function Admin() {
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState<View>("dashboard");
  const [brochures, setBrochures] = useState<Brochure[]>(initialBrochures);
  const [rates, setRates] = useState<Rate[]>(initialRates);
  const [editBrochure, setEditBrochure] = useState<Brochure | null>(null);

  const handleSaveBrochure = (b: Brochure) => {
    setBrochures((list) => {
      const exists = list.find((x) => x.name === b.name);
      return exists ? list.map((x) => (x.name === b.name ? b : x)) : [b, ...list];
    });
    setShowModal(false);
    setEditBrochure(null);
  };

  const handleDeleteBrochure = (name: string) => {
    setBrochures((list) => list.filter((b) => b.name !== name));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-brand-dark flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-brand-dark text-white p-5 sticky top-0 h-screen">
        <Link to="/" className="flex items-center gap-2 mb-10">
          <div className="h-9 w-9 rounded-xl gradient-gold grid place-items-center"><span className="font-black text-brand-dark text-lg">A</span></div>
          <div className="font-bold">Aurum<span className="text-brand-gold">.</span><span className="text-xs font-normal text-white/50 ml-1">Admin</span></div>
        </Link>

        <nav className="flex-1 space-y-1">
          {[
            { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" as const },
            { icon: FileText, label: "Brochures", id: "brochures" as const, badge: String(brochures.length) },
            { icon: Percent, label: "Interest Rates", id: "rates" as const, badge: String(rates.length) },
            { icon: Users, label: "Leads", id: "leads" as const, badge: "24" },
            { icon: TrendingUp, label: "Analytics", id: "analytics" as const },
            { icon: Settings, label: "Settings", id: "settings" as const },
          ].map(i => (
            <button
              key={i.label}
              onClick={() => setView(i.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                view === i.id ? "bg-brand-gold text-brand-dark" : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <i.icon size={16} />
              <span className="flex-1">{i.label}</span>
              {i.badge && <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${view === i.id ? "bg-brand-dark text-brand-gold" : "bg-white/10"}`}>{i.badge}</span>}
            </button>
          ))}
        </nav>

        <div className="border-t border-white/10 pt-4 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="h-9 w-9 rounded-full gradient-gold grid place-items-center text-brand-dark font-bold text-sm">RS</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">Rohan Sharma</div>
              <div className="text-[11px] text-white/50">Super Admin</div>
            </div>
            <button className="text-white/40 hover:text-white"><LogOut size={14} /></button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-200 px-6 py-4 flex items-center gap-4">
          <div className="flex-1 flex items-center gap-2 max-w-md rounded-xl bg-slate-100 px-3 py-2">
            <Search size={15} className="text-slate-400" />
            <input placeholder="Search brochures, leads…" className="flex-1 bg-transparent outline-none text-sm" />
            <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-500">⌘K</kbd>
          </div>
          <button className="relative h-9 w-9 grid place-items-center rounded-xl hover:bg-slate-100">
            <Bell size={16} />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-brand-gold" />
          </button>
          {(view === "dashboard" || view === "brochures") && (
            <button onClick={() => { setEditBrochure(null); setShowModal(true); }} className="inline-flex items-center gap-2 rounded-xl bg-brand-dark text-white text-sm font-semibold px-4 py-2 hover:bg-brand-dark/90">
              <Plus size={14} /> Add Brochure
            </button>
          )}
        </header>

        <main className="p-6 space-y-6">
          {view === "rates" && (
            <RatesView rates={rates} setRates={setRates} />
          )}
          {view === "leads" && <LeadsView />}
          {view === "analytics" && <AnalyticsView />}
          {view === "settings" && <SettingsView />}

          {(view === "dashboard" || view === "brochures") && (
            <>
          {/* Page title */}
          <div>
            <div className="text-xs text-slate-500">Dashboard</div>
            <h1 className="text-2xl font-bold mt-0.5">Good morning, Rohan 👋</h1>
            <p className="text-sm text-slate-500 mt-1">Here's what's happening with your portfolio today.</p>
          </div>

          {/* KPI cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { l: "Total Brochures", v: "26", d: "+4 this month", trend: "+18%", grad: "from-amber-50 to-amber-100" },
              { l: "Active Leads", v: "184", d: "12 new today", trend: "+24%", grad: "from-blue-50 to-blue-100" },
              { l: "Brochure Views", v: "12,408", d: "Last 30 days", trend: "+8%", grad: "from-emerald-50 to-emerald-100" },
              { l: "Downloads", v: "3,142", d: "PDF downloads", trend: "+11%", grad: "from-rose-50 to-rose-100" },
            ].map(k => (
              <div key={k.l} className={`rounded-2xl bg-gradient-to-br ${k.grad} border border-slate-200/60 p-5`}>
                <div className="flex items-start justify-between">
                  <span className="text-xs font-medium text-slate-600">{k.l}</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-white/70 px-1.5 py-0.5 rounded">{k.trend}</span>
                </div>
                <div className="mt-3 text-3xl font-bold">{k.v}</div>
                <div className="mt-1 text-xs text-slate-500">{k.d}</div>
              </div>
            ))}
          </div>

          {view === "dashboard" && (
            <>
          {/* Analytics + chart */}
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-bold">Brochure performance</h3>
                  <p className="text-xs text-slate-500">Views & downloads, last 7 days</p>
                </div>
                <button className="text-xs flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 hover:bg-slate-50">This week <ChevronDown size={12} /></button>
              </div>
              <div className="h-56">
                <svg viewBox="0 0 600 200" className="w-full h-full">
                  <defs>
                    <linearGradient id="ag" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#FFBD59" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#FFBD59" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[40,80,120,160].map(y => <line key={y} x1="0" x2="600" y1={y} y2={y} stroke="#E2E8F0" strokeDasharray="4 4" />)}
                  <path d="M0 150 L85 130 L170 140 L255 95 L340 110 L425 60 L510 75 L600 40 L600 200 L0 200 Z" fill="url(#ag)" />
                  <path d="M0 150 L85 130 L170 140 L255 95 L340 110 L425 60 L510 75 L600 40" stroke="#FFBD59" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <path d="M0 170 L85 165 L170 155 L255 145 L340 130 L425 120 L510 105 L600 95" stroke="#303642" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="6 4" />
                  {[[85,130],[255,95],[425,60],[600,40]].map(([x,y]) => (
                    <circle key={x} cx={x} cy={y} r="4" fill="#fff" stroke="#FFBD59" strokeWidth="2.5" />
                  ))}
                  {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d,i) => (
                    <text key={d} x={i*85+30} y="195" textAnchor="middle" fontSize="10" fill="#94A3B8">{d}</text>
                  ))}
                </svg>
              </div>
              <div className="flex items-center gap-5 mt-4 text-xs">
                <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-brand-gold" /> Views <span className="text-slate-500">12,408</span></div>
                <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-brand-dark" /> Downloads <span className="text-slate-500">3,142</span></div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold">Top projects</h3>
              <p className="text-xs text-slate-500">By views this week</p>
              <div className="mt-5 space-y-4">
                {brochures.slice(0,4).map((b, i) => (
                  <div key={b.name} className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-brand-gold/15 grid place-items-center text-brand-dark text-xs font-bold">{i+1}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate">{b.name}</div>
                      <div className="text-[11px] text-slate-500">{b.loc}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">{b.views.toLocaleString()}</div>
                      <div className="text-[10px] text-emerald-600">+12%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
            </>
          )}

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-5 border-b border-slate-200">
              <div>
                <h3 className="font-bold flex items-center gap-2"><Building2 size={16} className="text-brand-gold"/> All brochures</h3>
                <p className="text-xs text-slate-500">Manage your builder project brochures</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-xs flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 hover:bg-slate-50">All status <ChevronDown size={12} /></button>
                <button onClick={() => { setEditBrochure(null); setShowModal(true); }} className="inline-flex items-center gap-1.5 rounded-lg bg-brand-dark text-white text-xs font-semibold px-3 py-1.5"><Plus size={12} /> New</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500 tracking-wider">
                  <tr>
                    <th className="text-left font-semibold px-5 py-3">Project</th>
                    <th className="text-left font-semibold px-5 py-3">Builder</th>
                    <th className="text-left font-semibold px-5 py-3">Config / Price</th>
                    <th className="text-left font-semibold px-5 py-3">Possession</th>
                    <th className="text-left font-semibold px-5 py-3">Views</th>
                    <th className="text-left font-semibold px-5 py-3">Status</th>
                    <th className="text-right font-semibold px-5 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {brochures.map(b => (
                    <tr key={b.name} className="border-t border-slate-100 hover:bg-slate-50/50">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 grid place-items-center">
                            <Building2 size={16} className="text-brand-dark/60" />
                          </div>
                          <div>
                            <div className="font-semibold">{b.name}</div>
                            <div className="text-xs text-slate-500">{b.loc} · {b.type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-600">{b.builder}</td>
                      <td className="px-5 py-4 text-slate-600">
                        <div className="font-medium text-brand-dark">{b.price}</div>
                        <div className="text-xs text-slate-500">{b.configs}</div>
                      </td>
                      <td className="px-5 py-4 text-slate-600">{b.possession}</td>
                      <td className="px-5 py-4 font-medium">{b.views.toLocaleString()}</td>
                      <td className="px-5 py-4">
                        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                          b.status === "Published" ? "bg-emerald-100 text-emerald-700" :
                          b.status === "Draft" ? "bg-amber-100 text-amber-700" :
                          "bg-slate-200 text-slate-600"
                        }`}>{b.status}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button title="View" className="h-8 w-8 rounded-lg hover:bg-slate-100 grid place-items-center text-slate-500"><Eye size={14}/></button>
                          <button title="Edit" onClick={() => { setEditBrochure(b); setShowModal(true); }} className="h-8 w-8 rounded-lg hover:bg-slate-100 grid place-items-center text-slate-500"><Edit3 size={14}/></button>
                          <button title="Delete" onClick={() => handleDeleteBrochure(b.name)} className="h-8 w-8 rounded-lg hover:bg-rose-50 grid place-items-center text-rose-500"><Trash2 size={14}/></button>
                          <button className="h-8 w-8 rounded-lg hover:bg-slate-100 grid place-items-center text-slate-500"><MoreHorizontal size={14}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between p-4 border-t border-slate-100 text-xs text-slate-500">
              <div>Showing 1–{brochures.length} of {brochures.length} brochures</div>
              <div className="flex gap-1">
                <button className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50">Prev</button>
                <button className="px-3 py-1.5 rounded-lg bg-brand-dark text-white">1</button>
                <button className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50">2</button>
                <button className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50">3</button>
                <button className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50">Next</button>
              </div>
            </div>
          </div>
            </>
          )}
        </main>
      </div>

      {/* Add brochure modal */}
      {showModal && (
        <BrochureModal
          initial={editBrochure}
          onClose={() => { setShowModal(false); setEditBrochure(null); }}
          onSave={handleSaveBrochure}
        />
      )}
    </div>
  );
}

function BrochureModal({ initial, onClose, onSave }: { initial: Brochure | null; onClose: () => void; onSave: (b: Brochure) => void }) {
  const [form, setForm] = useState<Brochure>(
    initial ?? {
      name: "", builder: "", loc: "", type: "Residential", price: "",
      configs: "", possession: "", rera: "",
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      views: 0, status: "Draft",
    }
  );
  const set = <K extends keyof Brochure>(k: K, v: Brochure[K]) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 bg-brand-dark/40 backdrop-blur-sm grid place-items-center p-4 overflow-y-auto" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8">
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <div>
            <h3 className="font-bold text-lg">{initial ? "Edit brochure" : "Add new brochure"}</h3>
            <p className="text-xs text-slate-500">Builder project details, pricing, and PDF brochure.</p>
          </div>
          <button onClick={onClose} className="h-9 w-9 rounded-lg hover:bg-slate-100 grid place-items-center"><X size={16}/></button>
        </div>
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          <div className="grid sm:grid-cols-2 gap-4">
            <AField label="Project name" placeholder="Lodha Belmondo" value={form.name} onChange={(v) => set("name", v)} />
            <AField label="Builder / Developer" placeholder="Lodha Group" value={form.builder} onChange={(v) => set("builder", v)} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <AField label="Location" placeholder="Pune, MH" value={form.loc} onChange={(v) => set("loc", v)} />
            <ASelect label="Project type" opts={["Residential", "Commercial", "Luxury", "Plotted", "Villas"]} value={form.type} onChange={(v) => set("type", v)} />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <AField label="Starting price" placeholder="₹1.8 Cr" value={form.price} onChange={(v) => set("price", v)} />
            <AField label="Configurations" placeholder="2, 3, 4 BHK" value={form.configs} onChange={(v) => set("configs", v)} />
            <AField label="Possession" placeholder="Dec 2026" value={form.possession} onChange={(v) => set("possession", v)} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <AField label="RERA number" placeholder="P52100012345" value={form.rera} onChange={(v) => set("rera", v)} />
            <ASelect label="Status" opts={["Draft", "Published", "Archived"]} value={form.status} onChange={(v) => set("status", v)} />
          </div>

          <UploadField icon={Upload} label="PDF Brochure" hint="Max file size 25 MB · PDF only" />
          <UploadField icon={ImgIcon} label="Thumbnail image" hint="JPG/PNG · 1200×800 recommended" />

          <div className="flex justify-end gap-2 pt-2">
            <button onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50">Cancel</button>
            <button onClick={() => form.name && onSave(form)} className="rounded-xl bg-brand-dark text-white px-4 py-2 text-sm font-semibold hover:bg-brand-dark/90 inline-flex items-center gap-2">
              <Save size={14}/> {initial ? "Save changes" : "Publish brochure"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RatesView({ rates, setRates }: { rates: Rate[]; setRates: (r: Rate[]) => void }) {
  const [draft, setDraft] = useState<Rate[]>(rates);
  const [savedId, setSavedId] = useState<string | null>(null);

  const update = (id: string, patch: Partial<Rate>) => {
    setDraft((d) => d.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const saveRow = (id: string) => {
    const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const next = draft.map((r) => (r.id === id ? { ...r, updated: today } : r));
    setDraft(next);
    setRates(next);
    setSavedId(id);
    setTimeout(() => setSavedId(null), 1500);
  };

  const saveAll = () => {
    const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const next = draft.map((r) => ({ ...r, updated: today }));
    setDraft(next);
    setRates(next);
  };

  return (
    <>
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <div className="text-xs text-slate-500">Loan products</div>
          <h1 className="text-2xl font-bold mt-0.5 flex items-center gap-2">
            <Percent size={20} className="text-brand-gold" /> Interest rates
          </h1>
          <p className="text-sm text-slate-500 mt-1">Update rate of interest, processing fees and tenure for every loan product.</p>
        </div>
        <button onClick={saveAll} className="inline-flex items-center gap-2 rounded-xl bg-brand-dark text-white text-sm font-semibold px-4 py-2 hover:bg-brand-dark/90">
          <Save size={14} /> Save all changes
        </button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { l: "Loan products", v: String(draft.length) },
          { l: "Lowest ROI", v: `${Math.min(...draft.map((r) => r.min)).toFixed(2)}%` },
          { l: "Highest ROI", v: `${Math.max(...draft.map((r) => r.max)).toFixed(2)}%` },
        ].map((k) => (
          <div key={k.l} className="rounded-2xl bg-white border border-slate-200 p-5">
            <div className="text-xs font-medium text-slate-600">{k.l}</div>
            <div className="mt-2 text-3xl font-bold text-brand-dark">{k.v}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-200">
          <h3 className="font-bold">Rate sheet</h3>
          <p className="text-xs text-slate-500">Inline edit fields and save individually or all at once.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 tracking-wider">
              <tr>
                <th className="text-left font-semibold px-5 py-3">Loan product</th>
                <th className="text-left font-semibold px-5 py-3">Min ROI (% p.a.)</th>
                <th className="text-left font-semibold px-5 py-3">Max ROI (% p.a.)</th>
                <th className="text-left font-semibold px-5 py-3">Processing fee</th>
                <th className="text-left font-semibold px-5 py-3">Max tenure</th>
                <th className="text-left font-semibold px-5 py-3">Updated</th>
                <th className="text-right font-semibold px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {draft.map((r) => (
                <tr key={r.id} className="border-t border-slate-100 hover:bg-slate-50/50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-brand-gold/15 grid place-items-center text-brand-dark font-bold text-xs">
                        {r.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                      </div>
                      <div className="font-semibold">{r.name}</div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <NumInput value={r.min} step={0.05} onChange={(v) => update(r.id, { min: v })} />
                  </td>
                  <td className="px-5 py-3">
                    <NumInput value={r.max} step={0.05} onChange={(v) => update(r.id, { max: v })} />
                  </td>
                  <td className="px-5 py-3">
                    <TxtInput value={r.processing} onChange={(v) => update(r.id, { processing: v })} />
                  </td>
                  <td className="px-5 py-3">
                    <TxtInput value={r.tenure} onChange={(v) => update(r.id, { tenure: v })} />
                  </td>
                  <td className="px-5 py-3 text-xs text-slate-500">{r.updated}</td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => saveRow(r.id)}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                        savedId === r.id ? "bg-emerald-100 text-emerald-700" : "bg-brand-dark text-white hover:bg-brand-dark/90"
                      }`}
                    >
                      {savedId === r.id ? <><Check size={12}/> Saved</> : <><Save size={12}/> Save</>}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function NumInput({ value, step, onChange }: { value: number; step: number; onChange: (n: number) => void }) {
  return (
    <input
      type="number"
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      className="w-24 rounded-lg border border-slate-200 px-2.5 py-1.5 text-sm focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none"
    />
  );
}

function TxtInput({ value, onChange }: { value: string; onChange: (s: string) => void }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-36 rounded-lg border border-slate-200 px-2.5 py-1.5 text-sm focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none"
    />
  );
}

function AField({ label, placeholder, value, onChange }: { label: string; placeholder?: string; value?: string; onChange?: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 mb-1.5">{label}</label>
      <input
        placeholder={placeholder}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none"
      />
    </div>
  );
}
function ASelect({ label, opts, value, onChange }: { label: string; opts: string[]; value?: string; onChange?: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 mb-1.5">{label}</label>
      <select
        value={value ?? opts[0]}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none bg-white"
      >
        {opts.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
function UploadField({ icon: Icon, label, hint }: any) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 mb-1.5">{label}</label>
      <div className="rounded-xl border-2 border-dashed border-slate-200 p-5 text-center hover:border-brand-gold/60 hover:bg-brand-gold/5 transition-colors cursor-pointer">
        <div className="mx-auto h-10 w-10 rounded-xl bg-brand-gold/15 text-brand-dark grid place-items-center mb-2"><Icon size={18}/></div>
        <div className="text-sm font-semibold">Click to upload <span className="font-normal text-slate-500">or drag and drop</span></div>
        <div className="text-xs text-slate-500 mt-0.5">{hint}</div>
      </div>
    </div>
  );
}
