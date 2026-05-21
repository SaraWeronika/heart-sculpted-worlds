import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.jpg";

const links = [
  { to: "/", label: "Atelier" },
  { to: "/manifesto", label: "Manifesto" },
  { to: "/collezioni", label: "Collezioni" },
  { to: "/packaging", label: "Rituale" },
  { to: "/faq", label: "FAQ" },
  { to: "/contatti", label: "Contatti" },
] as const;

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-700 ${scrolled ? "py-3 bg-carbon/70 backdrop-blur-xl border-b border-ivory/5" : "py-6"}`}
      >
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group" aria-label="Cuoriforma — home">
            <span className="h-9 w-9 rounded-full overflow-hidden ring-1 ring-ivory/15 transition-all group-hover:ring-primary">
              <img src={logo} alt="Cuoriforma" className="h-full w-full object-cover" />
            </span>
            <span className="text-display text-xl leading-none">
              Cuori<span className="italic text-primary">forma</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-9 text-[11px] uppercase tracking-[0.3em] text-ivory/70">
            {links.slice(1).map((l) => (
              <Link key={l.to} to={l.to} className="link-underline hover:text-ivory transition-colors" activeProps={{ className: "text-ivory" }}>
                {l.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-[11px] uppercase tracking-[0.3em] border border-ivory/25 px-4 py-2"
            aria-label="Apri menu"
          >
            Menu
          </button>
        </div>
      </header>

      {/* Immersive mobile menu */}
      <div className={`fixed inset-0 z-50 md:hidden transition-all duration-700 ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div className={`absolute inset-0 bg-carbon transition-opacity duration-700 ${open ? "opacity-100" : "opacity-0"}`} style={{ backgroundImage: "radial-gradient(circle at 70% 30%, oklch(0.22 0.09 18 / 0.7), transparent 60%)" }} />
        <button onClick={() => setOpen(false)} className="absolute top-6 right-6 text-[11px] uppercase tracking-[0.3em] text-ivory border border-ivory/25 px-4 py-2">Chiudi</button>
        <nav className={`relative h-full flex flex-col justify-center px-8 gap-2 transition-all duration-700 ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {links.map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-display text-5xl text-ivory hover:text-primary hover:italic transition-all duration-500"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
