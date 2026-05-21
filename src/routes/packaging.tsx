import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/RevealText";
import packagingImg from "@/assets/packaging.png";

export const Route = createFileRoute("/packaging")({
  head: () => ({
    meta: [
      { title: "Il rituale — Cuoriforma" },
      { name: "description", content: "Packaging Cuoriforma: scatola rigida, ceralacca, seta bordeaux e pergamena. Ogni dettaglio della spedizione è un gesto." },
      { property: "og:title", content: "Il rituale del packaging — Cuoriforma" },
      { property: "og:description", content: "Aprire un Cuoriforma è già parte dell'oggetto." },
      { property: "og:image", content: "/og-packaging.jpg" },
    ],
  }),
  component: PackagingPage,
});

function PackagingPage() {
  return (
    <>
      <section className="pt-40 pb-12 md:pt-48 md:pb-20">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <div className="text-[10px] uppercase tracking-[0.5em] text-primary mb-6">— Il rituale</div>
          <Reveal as="h1" className="text-display text-[12vw] md:text-[7vw] leading-[0.95] max-w-[16ch]">
            Aprire è <em className="italic chrome-text">già un gesto</em>.
          </Reveal>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <div className="relative aspect-[16/9] overflow-hidden">
            <img src={packagingImg} alt="Packaging Cuoriforma" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-transparent" />
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1100px] px-6 md:px-10 space-y-8 text-lg md:text-xl leading-[1.7] text-ivory/80">
          <Reveal as="p">
            Ogni Cuoriforma viaggia in una scatola rigida costruita per essere conservata. Dentro: un letto di velluto, un sigillo in ceralacca con il nostro stemma anatomico, una pergamena numerata. Niente plastica, niente fretta.
          </Reveal>
          <Reveal as="p" delay={120}>
            Per le bomboniere, la stessa cura si moltiplica: nastri di seta bordeaux annodati a mano, dediche tipografiche personalizzate, scatole più piccole pensate per essere tenute sul comodino.
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 grid md:grid-cols-4 gap-8">
          {[
            { t: "Scatola", d: "Cartone rigido nero, finitura soft-touch, magneti nascosti." },
            { t: "Ceralacca", d: "Sigillo a caldo bordeaux con stemma Cuoriforma — irripetibile." },
            { t: "Seta", d: "Nastro bordeaux annodato a mano, doppio giro." },
            { t: "Pergamena", d: "Numerazione, materiali, e una dedica se richiesta." },
          ].map((p, i) => (
            <div key={p.t} className="border border-ivory/10 p-7 hover:border-primary transition-colors duration-500" style={{ animation: `fade-up 1s ${i * 100}ms var(--ease-cinema) both` }}>
              <div className="text-[10px] uppercase tracking-[0.3em] text-ivory/40">0{i + 1}</div>
              <h3 className="text-display text-2xl mt-2">{p.t}</h3>
              <p className="text-sm text-ivory/65 mt-3 leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-28 text-center">
        <Reveal as="p" className="text-display text-3xl md:text-4xl max-w-3xl mx-auto px-6 italic text-ivory/90">
          "Aprire un Cuoriforma non si fa di fretta."
        </Reveal>
        <div className="mt-10">
          <Link to="/collezioni" className="btn-solid">Vedi le collezioni</Link>
        </div>
      </section>
    </>
  );
}
