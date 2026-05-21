import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/RevealText";
import founder from "@/assets/founder.png";

export const Route = createFileRoute("/manifesto")({
  head: () => ({
    meta: [
      { title: "Manifesto — Cuoriforma" },
      { name: "description", content: "La nascita di Cuoriforma, la filosofia dietro ogni pezzo e chi c'è dietro l'atelier." },
      { property: "og:title", content: "Manifesto — Cuoriforma" },
      { property: "og:description", content: "Forma, materia, battito. Il manifesto di un atelier che lavora la lentezza." },
    ],
  }),
  component: ManifestoPage,
});

function ManifestoPage() {
  return (
    <>
      <section className="pt-40 pb-20 md:pt-48 md:pb-28">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <div className="text-[10px] uppercase tracking-[0.5em] text-primary mb-6">— Manifesto</div>
          <Reveal as="h1" className="text-display text-[12vw] md:text-[7vw] leading-[0.95] max-w-[16ch]">
            Dare <em className="italic chrome-text">forma</em> a ciò che già <em className="italic">batteva</em>.
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-[1100px] px-6 md:px-10 space-y-7 text-lg md:text-xl leading-[1.7] text-ivory/80">
          <Reveal as="p">
            Cuoriforma è nato da una stanza piccola, una stampante 3D, e l'ostinazione di non voler produrre oggetti anonimi. Volevamo che ogni pezzo avesse una temperatura — una pelle, un peso, un nome.
          </Reveal>
          <Reveal as="p" delay={100}>
            La tecnologia è il nostro pennello, non il nostro vanto. Quello che ci interessa è ciò che resta dopo: la sensazione di tenere in mano un oggetto che sembra essere sempre stato lì.
          </Reveal>
          <Reveal as="p" delay={200}>
            Lavoriamo solo con materiali che invecchiano bene. Confezioniamo lentamente. Spediamo meno di quanto potremmo. Preferiamo un cliente che torna a cento che non torneranno.
          </Reveal>
        </div>
      </section>

      {/* Three pillars */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 grid md:grid-cols-3 gap-10 md:gap-16">
          {[
            { n: "01", t: "Forma", d: "L'oggetto deve raccontarsi prima di parlare. Curve organiche, riferimenti anatomici, geometrie che respirano." },
            { n: "02", t: "Materia", d: "PLA, resine, filamenti flessibili. Selezionati per la mano e per il tempo. La superficie è la prima parola." },
            { n: "03", t: "Battito", d: "Ogni pezzo entra in una vita e ne diventa parte. Lo accompagniamo con un rituale di consegna, perché l'inizio è già un ricordo." },
          ].map((p, i) => (
            <div key={p.n} style={{ animation: `fade-up 1s ${i * 120}ms var(--ease-cinema) both` }}>
              <div className="text-display text-7xl italic text-primary/40 leading-none">{p.n}</div>
              <h3 className="text-display text-3xl mt-4">{p.t}</h3>
              <div className="hairline my-5 max-w-[80px]" />
              <p className="text-ivory/65 leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founder */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 relative aspect-[4/5]">
            <img src={founder} alt="Fondatrice di Cuoriforma" loading="lazy" className="absolute inset-0 w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000" />
            <div className="absolute inset-0 ring-1 ring-ivory/10" />
            <div className="absolute -inset-3 -z-10 blur-3xl opacity-40" style={{ background: "radial-gradient(circle, oklch(0.42 0.18 25 / 0.5), transparent 70%)" }} />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <div className="text-[10px] uppercase tracking-[0.5em] text-primary mb-5">— Chi sono</div>
            <Reveal as="h2" className="text-display text-4xl md:text-5xl leading-[1.05]">
              Sono <em className="italic">la voce</em><br />dietro <em className="italic">la forma</em>.
            </Reveal>
            <Reveal as="p" delay={150} className="mt-7 text-lg text-ivory/75 leading-relaxed">
              Disegno, modello, stampo, rifinisco. Non delego la prima ora di vita di un pezzo a nessuno. Credo che il lusso non sia il prezzo, ma l'attenzione che resta visibile nei dettagli.
            </Reveal>
            <Reveal as="p" delay={250} className="mt-4 text-lg text-ivory/75 leading-relaxed">
              Cuoriforma è il mio modo di fare un regalo al mondo, un oggetto alla volta.
            </Reveal>
            <div className="mt-10">
              <Link to="/contatti" className="btn-ghost">Scrivimi direttamente</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
