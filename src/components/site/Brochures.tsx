import { useState } from "react";
import { motion } from "motion/react";
import { Search, Download, Eye, MapPin, Building2, Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const hues = [
  "from-amber-100 to-orange-200",
  "from-sky-100 to-indigo-200",
  "from-rose-100 to-pink-200",
  "from-emerald-100 to-teal-200",
  "from-violet-100 to-purple-200",
  "from-yellow-100 to-amber-200",
];
const filters = ["All", "Residential", "Commercial", "Luxury"];

export default function Brochures() {
  const [f, setF] = useState("All");
  const [q, setQ] = useState("");

  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["public-brochures"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("brochures")
        .select("id, name, builder, location, project_type, price, configs, image_url, pdf_url")
        .eq("status", "Published")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const list = rows.filter(d =>
    (f === "All" || d.project_type === f) &&
    d.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <section id="brochures" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-gold/10 px-3 py-1 text-xs font-semibold text-brand-dark uppercase tracking-wider">
              <Building2 size={12} /> Builder Brochures
            </div>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-brand-dark">
              Explore premium <span className="text-gradient-gold">project brochures.</span>
            </h2>
            <p className="mt-3 text-brand-dark/60 max-w-xl">Pre-vetted residential, commercial and luxury properties with home-loan offers ready to go.</p>
          </div>
        </div>

        <div className="glass rounded-2xl p-4 flex flex-col md:flex-row md:items-center gap-4 mb-8 border border-brand-dark/5">
          <div className="flex-1 flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 border border-brand-dark/8">
            <Search size={16} className="text-brand-dark/40" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by project name..." className="flex-1 bg-transparent outline-none text-sm text-brand-dark placeholder:text-brand-dark/40" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={14} className="text-brand-dark/40" />
            {filters.map(x => (
              <button key={x} onClick={() => setF(x)} className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${f===x ? "bg-brand-dark text-white" : "bg-white text-brand-dark/70 border border-brand-dark/10 hover:border-brand-dark/30"}`}>{x}</button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group rounded-3xl bg-white border border-brand-dark/8 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all shadow-soft"
            >
              <div className={`relative h-48 bg-gradient-to-br ${hues[i % hues.length]} overflow-hidden`}>
                {b.image_url ? (
                  <img src={b.image_url} alt={b.name} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <>
                    <div className="absolute inset-0 grid-bg opacity-30" />
                    <svg className="absolute inset-x-0 bottom-0" viewBox="0 0 400 120" preserveAspectRatio="none">
                      <path d="M0 80 L40 80 L40 40 L100 40 L100 60 L160 60 L160 20 L220 20 L220 50 L280 50 L280 30 L340 30 L340 70 L400 70 L400 120 L0 120 Z" fill="rgba(48,54,66,0.6)"/>
                      <path d="M0 95 L60 95 L60 65 L120 65 L120 80 L200 80 L200 55 L260 55 L260 75 L340 75 L340 60 L400 60 L400 120 L0 120 Z" fill="rgba(48,54,66,0.9)"/>
                    </svg>
                  </>
                )}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 text-[10px] font-bold uppercase tracking-wider text-brand-dark">{b.project_type}</div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-brand-gold text-[10px] font-bold uppercase tracking-wider text-brand-dark">New</div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-brand-dark">{b.name}</h3>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-brand-dark/60">
                  <MapPin size={12} /> {b.location} · {b.builder}
                </div>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <div>
                    <div className="text-brand-dark/40">Configuration</div>
                    <div className="font-semibold text-brand-dark">{b.configs || "—"}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-brand-dark/40">Starting</div>
                    <div className="font-semibold text-brand-dark">{b.price || "On request"}</div>
                  </div>
                </div>
                <div className="mt-5 flex gap-2">
                  <a
                    href={b.pdf_url || "#contact"}
                    target={b.pdf_url ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-brand-dark text-white text-xs font-semibold py-2.5 hover:bg-brand-dark/90"
                  >
                    <Eye size={13} /> View Brochure
                  </a>
                  <a
                    href={b.pdf_url || "#contact"}
                    download={!!b.pdf_url}
                    target={b.pdf_url ? "_blank" : undefined}
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-brand-gold/15 text-brand-dark text-xs font-semibold px-3 py-2.5 hover:bg-brand-gold/30"
                  >
                    <Download size={13} /> PDF
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {!isLoading && list.length === 0 && (
          <div className="text-center py-16 text-brand-dark/50 text-sm">No brochures match your search.</div>
        )}
        {isLoading && (
          <div className="text-center py-16 text-brand-dark/50 text-sm">Loading projects…</div>
        )}
      </div>
    </section>
  );
}
