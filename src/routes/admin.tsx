import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logo from "@/assets/janaki-raghav-logo.png.asset.json";
import {
  LayoutDashboard, FileText, Users, Settings, LogOut, Bell, Search,
  Plus, Upload, Image as ImgIcon, MoreHorizontal, TrendingUp,
  Eye, Edit3, Trash2, ChevronDown, Building2, X, Percent, Save, Check, Copy,
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

/* -------------------- LEADS -------------------- */

type Lead = {
  id: string; name: string; email: string; phone: string; product: string;
  amount: string; source: string; stage: "New" | "Contacted" | "Qualified" | "Converted" | "Lost"; date: string;
};

const initialLeads: Lead[] = [
  { id: "L-1042", name: "Aarav Mehta", email: "aarav.mehta@gmail.com", phone: "+91 98201 12345", product: "Home Loan", amount: "₹85 L", source: "Website", stage: "New", date: "01 Jun 2026" },
  { id: "L-1041", name: "Priya Iyer", email: "priya.iyer@outlook.com", phone: "+91 99880 22113", product: "Business Loan", amount: "₹40 L", source: "WhatsApp", stage: "Contacted", date: "31 May 2026" },
  { id: "L-1040", name: "Rohit Khanna", email: "rohit.k@company.in", phone: "+91 90011 87654", product: "Car Loan", amount: "₹12 L", source: "Brochure", stage: "Qualified", date: "30 May 2026" },
  { id: "L-1039", name: "Sneha Rao", email: "sneha.rao@gmail.com", phone: "+91 98456 99002", product: "Loan Against Property", amount: "₹1.2 Cr", source: "Referral", stage: "Converted", date: "28 May 2026" },
  { id: "L-1038", name: "Imran Sayed", email: "imran.s@yahoo.com", phone: "+91 90909 12321", product: "Personal Loan", amount: "₹8 L", source: "Instagram", stage: "Lost", date: "26 May 2026" },
  { id: "L-1037", name: "Kavya Nair", email: "kavya.nair@gmail.com", phone: "+91 97123 45678", product: "Home Loan", amount: "₹55 L", source: "Website", stage: "Contacted", date: "25 May 2026" },
  { id: "L-1036", name: "Vikram Singh", email: "vikram@sg.in", phone: "+91 98111 23456", product: "Gold Loan", amount: "₹3 L", source: "Walk-in", stage: "New", date: "24 May 2026" },
];

const stageStyle: Record<Lead["stage"], string> = {
  New: "bg-blue-100 text-blue-700",
  Contacted: "bg-amber-100 text-amber-700",
  Qualified: "bg-violet-100 text-violet-700",
  Converted: "bg-emerald-100 text-emerald-700",
  Lost: "bg-rose-100 text-rose-700",
};

function LeadsView() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [filter, setFilter] = useState<Lead["stage"] | "All">("All");
  const stages: (Lead["stage"] | "All")[] = ["All", "New", "Contacted", "Qualified", "Converted", "Lost"];
  const visible = filter === "All" ? leads : leads.filter(l => l.stage === filter);

  const updateStage = (id: string, stage: Lead["stage"]) =>
    setLeads(ls => ls.map(l => l.id === id ? { ...l, stage } : l));

  return (
    <>
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <div className="text-xs text-slate-500">CRM</div>
          <h1 className="text-2xl font-bold mt-0.5 flex items-center gap-2"><Users size={20} className="text-brand-gold"/> Leads</h1>
          <p className="text-sm text-slate-500 mt-1">Track and qualify every inbound enquiry across products.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-brand-dark text-white text-sm font-semibold px-4 py-2 hover:bg-brand-dark/90">
          <Plus size={14}/> Add lead
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {stages.slice(1).map(s => {
          const count = leads.filter(l => l.stage === s).length;
          return (
            <div key={s} className="rounded-2xl bg-white border border-slate-200 p-4">
              <div className={`inline-block text-[10px] font-bold uppercase px-2 py-1 rounded-full ${stageStyle[s as Lead["stage"]]}`}>{s}</div>
              <div className="mt-2 text-2xl font-bold">{count}</div>
              <div className="text-xs text-slate-500">leads in pipeline</div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-5 border-b border-slate-200">
          <h3 className="font-bold flex items-center gap-2"><Filter size={14} className="text-brand-gold"/> Filter by stage</h3>
          <div className="flex flex-wrap gap-1.5">
            {stages.map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                  filter === s ? "bg-brand-dark text-white border-brand-dark" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}>{s}</button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 tracking-wider">
              <tr>
                <th className="text-left font-semibold px-5 py-3">Lead</th>
                <th className="text-left font-semibold px-5 py-3">Contact</th>
                <th className="text-left font-semibold px-5 py-3">Product</th>
                <th className="text-left font-semibold px-5 py-3">Amount</th>
                <th className="text-left font-semibold px-5 py-3">Source</th>
                <th className="text-left font-semibold px-5 py-3">Stage</th>
                <th className="text-left font-semibold px-5 py-3">Date</th>
                <th className="text-right font-semibold px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.map(l => (
                <tr key={l.id} className="border-t border-slate-100 hover:bg-slate-50/50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full gradient-gold grid place-items-center text-brand-dark font-bold text-xs">
                        {l.name.split(" ").map(w => w[0]).slice(0,2).join("")}
                      </div>
                      <div>
                        <div className="font-semibold">{l.name}</div>
                        <div className="text-[11px] text-slate-500">{l.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    <div className="flex items-center gap-1.5 text-xs"><Mail size={11}/> {l.email}</div>
                    <div className="flex items-center gap-1.5 text-xs mt-0.5"><Phone size={11}/> {l.phone}</div>
                  </td>
                  <td className="px-5 py-4 text-slate-700">{l.product}</td>
                  <td className="px-5 py-4 font-semibold">{l.amount}</td>
                  <td className="px-5 py-4 text-slate-600">{l.source}</td>
                  <td className="px-5 py-4">
                    <select value={l.stage} onChange={(e) => updateStage(l.id, e.target.value as Lead["stage"])}
                      className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full border-0 outline-none cursor-pointer ${stageStyle[l.stage]}`}>
                      {stages.slice(1).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-5 py-4 text-slate-500 text-xs">{l.date}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button title="Call" className="h-8 w-8 rounded-lg hover:bg-emerald-50 grid place-items-center text-emerald-600"><Phone size={14}/></button>
                      <button title="WhatsApp" className="h-8 w-8 rounded-lg hover:bg-emerald-50 grid place-items-center text-emerald-600"><MessageCircle size={14}/></button>
                      <button title="Email" className="h-8 w-8 rounded-lg hover:bg-slate-100 grid place-items-center text-slate-500"><Mail size={14}/></button>
                      <button title="Delete" onClick={() => setLeads(ls => ls.filter(x => x.id !== l.id))} className="h-8 w-8 rounded-lg hover:bg-rose-50 grid place-items-center text-rose-500"><Trash2 size={14}/></button>
                    </div>
                  </td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr><td colSpan={8} className="px-5 py-12 text-center text-slate-400 text-sm">No leads in this stage yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* -------------------- ANALYTICS -------------------- */

function AnalyticsView() {
  const [range, setRange] = useState("30d");
  const ranges = [{ id: "7d", l: "7 days" }, { id: "30d", l: "30 days" }, { id: "90d", l: "90 days" }, { id: "1y", l: "1 year" }];
  const kpis = [
    { l: "Total visitors", v: "48,219", t: "+22.4%", d: "vs prev period" },
    { l: "Lead conversion", v: "6.8%", t: "+1.2%", d: "184 of 2,706" },
    { l: "Brochure downloads", v: "3,142", t: "+11.0%", d: "PDF & ZIP" },
    { l: "Avg. loan ticket", v: "₹62 L", t: "+8.5%", d: "approved leads" },
  ];
  const products = [
    { name: "Home Loan", v: 92, pct: "38%" },
    { name: "Business Loan", v: 64, pct: "26%" },
    { name: "Loan Against Property", v: 38, pct: "16%" },
    { name: "Car Loan", v: 28, pct: "12%" },
    { name: "Personal Loan", v: 20, pct: "8%" },
  ];
  const sources = [
    { s: "Website", v: 42, c: "bg-brand-gold" },
    { s: "Google Ads", v: 24, c: "bg-blue-500" },
    { s: "WhatsApp", v: 16, c: "bg-emerald-500" },
    { s: "Referral", v: 11, c: "bg-violet-500" },
    { s: "Instagram", v: 7, c: "bg-rose-500" },
  ];
  return (
    <>
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <div className="text-xs text-slate-500">Insights</div>
          <h1 className="text-2xl font-bold mt-0.5 flex items-center gap-2"><TrendingUp size={20} className="text-brand-gold"/> Analytics</h1>
          <p className="text-sm text-slate-500 mt-1">Performance across traffic, leads and loan products.</p>
        </div>
        <div className="inline-flex bg-white border border-slate-200 rounded-xl p-1">
          {ranges.map(r => (
            <button key={r.id} onClick={() => setRange(r.id)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                range === r.id ? "bg-brand-dark text-white" : "text-slate-600 hover:bg-slate-50"
              }`}>{r.l}</button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(k => (
          <div key={k.l} className="rounded-2xl bg-white border border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">{k.l}</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded inline-flex items-center gap-0.5"><ArrowUpRight size={10}/>{k.t}</span>
            </div>
            <div className="mt-3 text-3xl font-bold text-brand-dark">{k.v}</div>
            <div className="mt-1 text-xs text-slate-500">{k.d}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5">
          <h3 className="font-bold">Traffic & leads trend</h3>
          <p className="text-xs text-slate-500 mb-4">Daily visitors vs new leads</p>
          <div className="h-64">
            <svg viewBox="0 0 600 220" className="w-full h-full">
              <defs>
                <linearGradient id="vg" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#FFBD59" stopOpacity="0.35"/>
                  <stop offset="100%" stopColor="#FFBD59" stopOpacity="0"/>
                </linearGradient>
              </defs>
              {[40,80,120,160].map(y => <line key={y} x1="0" x2="600" y1={y} y2={y} stroke="#E2E8F0" strokeDasharray="4 4"/>)}
              <path d="M0 170 L60 150 L120 160 L180 110 L240 120 L300 70 L360 95 L420 55 L480 85 L540 40 L600 60 L600 220 L0 220 Z" fill="url(#vg)"/>
              <path d="M0 170 L60 150 L120 160 L180 110 L240 120 L300 70 L360 95 L420 55 L480 85 L540 40 L600 60" stroke="#FFBD59" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <path d="M0 190 L60 185 L120 175 L180 165 L240 155 L300 145 L360 140 L420 125 L480 130 L540 115 L600 105" stroke="#303642" strokeWidth="2.5" fill="none" strokeDasharray="6 4"/>
            </svg>
          </div>
          <div className="flex items-center gap-5 text-xs mt-2">
            <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-brand-gold"/> Visitors</div>
            <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-brand-dark"/> Leads</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <h3 className="font-bold">Traffic sources</h3>
          <p className="text-xs text-slate-500 mb-4">Share of total visits</p>
          <div className="space-y-3">
            {sources.map(s => (
              <div key={s.s}>
                <div className="flex justify-between text-xs mb-1"><span className="font-medium">{s.s}</span><span className="text-slate-500">{s.v}%</span></div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className={`h-full rounded-full ${s.c}`} style={{ width: `${s.v}%` }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <h3 className="font-bold">Top loan products by interest</h3>
        <p className="text-xs text-slate-500 mb-4">Based on enquiries this period</p>
        <div className="space-y-3">
          {products.map(p => (
            <div key={p.name} className="flex items-center gap-4">
              <div className="w-44 text-sm font-medium">{p.name}</div>
              <div className="flex-1 h-2.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full gradient-gold" style={{ width: `${p.v}%` }}/>
              </div>
              <div className="w-20 text-right text-sm font-semibold">{p.pct}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* -------------------- SETTINGS -------------------- */

function SettingsView() {
  const [tab, setTab] = useState<"profile" | "company" | "notifications" | "appearance" | "billing" | "security">("profile");
  const tabs = [
    { id: "profile" as const, l: "Profile", icon: Users },
    { id: "company" as const, l: "Company", icon: Building2 },
    { id: "notifications" as const, l: "Notifications", icon: Bell },
    { id: "appearance" as const, l: "Appearance", icon: Palette },
    { id: "billing" as const, l: "Billing", icon: CreditCard },
    { id: "security" as const, l: "Security", icon: Lock },
  ];
  return (
    <>
      <div>
        <div className="text-xs text-slate-500">Account</div>
        <h1 className="text-2xl font-bold mt-0.5 flex items-center gap-2"><Settings size={20} className="text-brand-gold"/> Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your profile, company information and preferences.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <aside className="bg-white rounded-2xl border border-slate-200 p-3 h-fit">
          <nav className="space-y-1">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  tab === t.id ? "bg-brand-gold/15 text-brand-dark" : "text-slate-600 hover:bg-slate-50"
                }`}>
                <t.icon size={15}/> {t.l}
              </button>
            ))}
          </nav>
        </aside>

        <section className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          {tab === "profile" && (
            <>
              <SectionHead title="Profile" subtitle="Update your personal information." />
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl gradient-gold grid place-items-center text-brand-dark font-bold text-xl">RS</div>
                <div>
                  <button className="rounded-xl bg-brand-dark text-white text-xs font-semibold px-3 py-1.5 mr-2">Upload new</button>
                  <button className="rounded-xl border border-slate-200 text-xs font-semibold px-3 py-1.5">Remove</button>
                  <div className="text-[11px] text-slate-500 mt-1.5">JPG/PNG · max 2MB</div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <AField label="Full name" value="Rohan Sharma" />
                <AField label="Designation" value="Super Admin" />
                <AField label="Email" value="rohan@aurum.finance" />
                <AField label="Phone" value="+91 98201 12345" />
              </div>
              <SaveRow />
            </>
          )}
          {tab === "company" && (
            <>
              <SectionHead title="Company" subtitle="Public details shown on invoices and the website." />
              <div className="grid sm:grid-cols-2 gap-4">
                <AField label="Legal name" value="Aurum Financial Services Pvt. Ltd." />
                <AField label="Brand name" value="Aurum" />
                <AField label="GSTIN" value="27ABCDE1234F1Z5" />
                <AField label="PAN" value="ABCDE1234F" />
                <AField label="Support email" value="hello@aurum.finance" />
                <AField label="Support phone" value="+91 1800 123 4567" />
              </div>
              <AField label="Registered address" value="Level 18, One BKC, Bandra Kurla Complex, Mumbai 400051" />
              <SaveRow />
            </>
          )}
          {tab === "notifications" && (
            <>
              <SectionHead title="Notifications" subtitle="Decide when and how the team is alerted." />
              <div className="space-y-2">
                <ToggleRow label="New lead submitted" hint="Email + push when a website form is submitted" defaultOn/>
                <ToggleRow label="Brochure downloaded" hint="Daily digest of all brochure downloads" defaultOn/>
                <ToggleRow label="Loan EMI calculator used" hint="Notify when high-value calculations happen" />
                <ToggleRow label="Weekly performance report" hint="Every Monday 9 AM" defaultOn/>
                <ToggleRow label="Product updates from Aurum" hint="Roadmap & feature announcements" />
              </div>
              <SaveRow />
            </>
          )}
          {tab === "appearance" && (
            <>
              <SectionHead title="Appearance" subtitle="Brand kit and theming for the dashboard." />
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Brand colours</label>
                <div className="flex gap-3">
                  <ColorSwatch hex="#FFBD59" name="Gold"/>
                  <ColorSwatch hex="#303642" name="Dark"/>
                  <ColorSwatch hex="#FFFFFF" name="Background"/>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <ASelect label="Theme" opts={["Light", "Dark", "System"]} value="Light"/>
                <ASelect label="Density" opts={["Comfortable", "Compact"]} value="Comfortable"/>
              </div>
              <SaveRow />
            </>
          )}
          {tab === "billing" && (
            <>
              <SectionHead title="Billing" subtitle="Your subscription and payment method." />
              <div className="rounded-2xl bg-gradient-to-br from-brand-dark to-brand-dark/90 text-white p-5 flex items-center justify-between">
                <div>
                  <div className="text-xs text-white/60 uppercase tracking-wider">Current plan</div>
                  <div className="text-2xl font-bold text-gradient-gold mt-1">Aurum Enterprise</div>
                  <div className="text-xs text-white/70 mt-1">Renews on 12 Mar 2027 · ₹49,999/year</div>
                </div>
                <button className="rounded-xl bg-brand-gold text-brand-dark text-sm font-semibold px-4 py-2">Manage plan</button>
              </div>
              <div>
                <h4 className="text-sm font-bold mb-3">Payment method</h4>
                <div className="rounded-xl border border-slate-200 p-4 flex items-center gap-4">
                  <div className="h-10 w-14 rounded-lg bg-gradient-to-br from-slate-800 to-slate-600 grid place-items-center text-white text-[10px] font-bold">VISA</div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">•••• •••• •••• 4242</div>
                    <div className="text-xs text-slate-500">Expires 09/29 · Rohan Sharma</div>
                  </div>
                  <button className="text-xs font-semibold text-brand-dark hover:underline">Replace</button>
                </div>
              </div>
            </>
          )}
          {tab === "security" && (
            <>
              <SectionHead title="Security" subtitle="Keep your account protected." />
              <div className="grid sm:grid-cols-2 gap-4">
                <AField label="Current password" placeholder="••••••••" />
                <AField label="New password" placeholder="At least 12 characters" />
              </div>
              <ToggleRow label="Two-factor authentication" hint="Require OTP from authenticator app on every login" defaultOn/>
              <ToggleRow label="Session timeout" hint="Auto sign-out after 30 minutes of inactivity"/>
              <div className="rounded-xl bg-rose-50 border border-rose-200 p-4 flex items-center gap-3">
                <Shield size={18} className="text-rose-600"/>
                <div className="flex-1 text-xs text-rose-700">Deleting your admin account removes all linked data. This cannot be undone.</div>
                <button className="text-xs font-semibold text-white bg-rose-600 rounded-lg px-3 py-1.5">Delete account</button>
              </div>
              <SaveRow />
            </>
          )}
        </section>
      </div>
    </>
  );
}

function SectionHead({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="pb-4 border-b border-slate-100">
      <h3 className="font-bold text-lg flex items-center gap-2"><Globe size={14} className="text-brand-gold"/>{title}</h3>
      <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
    </div>
  );
}

function SaveRow() {
  const [saved, setSaved] = useState(false);
  return (
    <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
      <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50">Cancel</button>
      <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 1500); }}
        className={`rounded-xl px-4 py-2 text-sm font-semibold inline-flex items-center gap-2 ${
          saved ? "bg-emerald-100 text-emerald-700" : "bg-brand-dark text-white hover:bg-brand-dark/90"
        }`}>
        {saved ? <><Check size={14}/> Saved</> : <><Save size={14}/> Save changes</>}
      </button>
    </div>
  );
}

function ToggleRow({ label, hint, defaultOn = false }: { label: string; hint: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
      <div>
        <div className="text-sm font-semibold">{label}</div>
        <div className="text-xs text-slate-500">{hint}</div>
      </div>
      <button onClick={() => setOn(!on)}
        className={`relative h-6 w-11 rounded-full transition-colors ${on ? "bg-brand-gold" : "bg-slate-200"}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? "left-5" : "left-0.5"}`}/>
      </button>
    </div>
  );
}

function ColorSwatch({ hex, name }: { hex: string; name: string }) {
  return (
    <div className="text-center">
      <div className="h-14 w-14 rounded-xl border border-slate-200 shadow-sm" style={{ background: hex }}/>
      <div className="text-[11px] font-semibold mt-1.5">{name}</div>
      <div className="text-[10px] text-slate-500">{hex}</div>
    </div>
  );
}
