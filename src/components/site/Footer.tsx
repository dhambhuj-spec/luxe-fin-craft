import { Instagram, Send, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/janaki-raghav-logo.png.asset.json";

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
            <div className="flex items-center gap-2.5">
              <img src={logo.url} alt="Janaki Raghav Finserve" className="h-11 w-11 object-contain" />
              <div className="font-bold text-lg leading-tight">Janaki Raghav<span className="text-brand-gold">.</span>
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/50 font-normal">Finserve</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-white/55 leading-relaxed max-w-sm">
              Janaki Raghav Finserve is a trusted loan & insurance advisory based in Bhuj, Kachchh — helping families and businesses unlock smarter financial outcomes across Gujarat.
            </p>
            <ul className="mt-5 space-y-2.5 text-xs text-white/60">
              <li className="flex items-start gap-2"><MapPin size={13} className="text-brand-gold mt-0.5 flex-shrink-0"/> Office No. 15, Pankaj Complex, New Station Road, Bhuj (M+OG), Taluka Bhuj, District Kachchh, Gujarat</li>
              <li className="flex items-center gap-2"><Mail size={13} className="text-brand-gold"/> <a href="mailto:janakiraghavfin@gmail.com" className="hover:text-white">janakiraghavfin@gmail.com</a></li>
              <li className="flex items-center gap-2"><Phone size={13} className="text-brand-gold"/> <a href="tel:+919876543210" className="hover:text-white">+91 98765 43210</a></li>
            </ul>
            <div className="mt-5 flex gap-2">
              <a href="https://www.instagram.com/janakiraghavfinserve" target="_blank" rel="noreferrer" aria-label="Instagram" className="h-9 w-9 rounded-full bg-white/5 border border-white/10 grid place-items-center hover:bg-brand-gold hover:text-brand-dark hover:border-brand-gold transition-all">
                <Instagram size={14} />
              </a>
            </div>
          </div>

          <FCol title="Loans" links={["Home Loan","Loan Against Property","Car Loan","Business Loan","Personal Loan","Commercial Vehicle Loan"]} />
          <FCol title="Insurance" links={["Health Insurance","Term Life Insurance","Motor Insurance","Travel Insurance","Home Insurance"]} />
          <FCol title="Company" links={["About Us","Brochures","EMI Calculator","Careers","Privacy Policy","Terms of Service"]} />
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/45">
          <div>© {new Date().getFullYear()} Janaki Raghav Finserve · Bhuj, Kachchh, Gujarat</div>
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
