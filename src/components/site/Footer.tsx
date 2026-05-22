import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Linkedin, Instagram, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="gradient-dark text-white pt-20 pb-8 relative overflow-hidden">
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-brand-gold/8 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Newsletter band */}
        <div className="rounded-3xl glass-dark p-8 md:p-10 -mt-32 mb-16 border border-white/10 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Stay ahead of rate changes.</h3>
            <p className="mt-2 text-white/60 text-sm">Monthly newsletter on the best loan & insurance offers. No spam, ever.</p>
          </div>
          <form onSubmit={(e)=>e.preventDefault()} className="flex gap-2 w-full">
            <input placeholder="you@email.com" className="flex-1 rounded-full bg-white/5 border border-white/10 px-5 py-3 text-sm text-white placeholder:text-white/40 focus:border-brand-gold outline-none" />
            <button className="inline-flex items-center gap-2 rounded-full bg-brand-gold text-brand-dark font-semibold px-5 py-3 text-sm hover:shadow-gold transition-all">
              Subscribe <Send size={14} />
            </button>
          </form>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 pb-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl gradient-gold grid place-items-center"><span className="font-black text-brand-dark text-lg">A</span></div>
              <div className="font-bold text-lg">Aurum<span className="text-brand-gold">.</span></div>
            </div>
            <p className="mt-4 text-sm text-white/55 leading-relaxed max-w-sm">
              Aurum Financial Advisory is an RBI-registered DSA and IRDAI-licensed insurance broker helping families and businesses unlock smarter financial outcomes.
            </p>
            <div className="mt-5 flex gap-2">
              {[Facebook, Twitter, Linkedin, Instagram].map((I, i) => (
                <a key={i} href="#" className="h-9 w-9 rounded-full bg-white/5 border border-white/10 grid place-items-center hover:bg-brand-gold hover:text-brand-dark hover:border-brand-gold transition-all">
                  <I size={14} />
                </a>
              ))}
            </div>
          </div>

          <FCol title="Loans" links={["Home Loan","Loan Against Property","Car Loan","Business Loan","Personal Loan","Commercial Vehicle Loan"]} />
          <FCol title="Insurance" links={["Health Insurance","Term Life Insurance","Motor Insurance","Travel Insurance","Home Insurance"]} />
          <FCol title="Company" links={["About Us","Brochures","EMI Calculator","Careers","Privacy Policy","Terms of Service"]} />
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/45">
          <div>© 2025 Aurum Financial Advisory Pvt. Ltd. · CIN: U65999MH2014PTC123456</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-brand-gold">{title}</h4>
      <ul className="space-y-2.5">
        {links.map(l => <li key={l}><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">{l}</a></li>)}
      </ul>
    </div>
  );
}
