import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-ivory/10 bg-carbon">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 py-16 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="text-display text-4xl leading-tight">
            Ogni cuore <em className="italic text-primary">non smette</em><br />di parlare.
          </div>
          <p className="mt-4 text-sm text-ivory/55 max-w-sm">Cuoriforma — atelier di stampa 3D di lusso. Realizzato a mano in Italia, spedito ovunque tu sia.</p>
        </div>
        <div className="md:col-span-3">
          <div className="text-[10px] uppercase tracking-[0.3em] text-ivory/40 mb-4">Esplora</div>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/manifesto" className="link-underline">Manifesto</Link></li>
            <li><Link to="/collezioni" className="link-underline">Collezioni</Link></li>
            <li><Link to="/packaging" className="link-underline">Rituale</Link></li>
            <li><Link to="/faq" className="link-underline">FAQ</Link></li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <div className="text-[10px] uppercase tracking-[0.3em] text-ivory/40 mb-4">Atelier</div>
          <p className="text-sm text-ivory/70">hello@cuoriforma.studio</p>
          <p className="text-sm text-ivory/70 mt-1">Italia · spedizione mondiale</p>
          <Link to="/contatti" className="btn-ghost mt-6">Scrivici</Link>
        </div>
      </div>
      <div className="border-t border-ivory/10 px-6 md:px-10 py-5 mx-auto max-w-[1440px] flex flex-col md:flex-row justify-between gap-2 text-[10px] uppercase tracking-[0.3em] text-ivory/40">
        <span>© {new Date().getFullYear()} Cuoriforma Studio</span>
        <span>Forma · Materia · Battito</span>
      </div>
    </footer>
  );
}
