import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { categories } from "@/lib/products";
import { Reveal } from "@/components/RevealText";
import packagingImg from "@/assets/packaging.png";
import heroImg from "@/assets/hero-heart.jpg";

const HeartScene = lazy(() => import("@/components/three/HeartScene").then((m) => ({ default: m.HeartScene })));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cuoriforma — La forma del battito" },
      { name: "description", content: "Sculture stampate in 3D che entrano nella vita. Bomboniere, home decor, vestiti e accessori d'autore." },
      { property: "og:title", content: "Cuoriforma — La forma del battito" },
      { property: "og:description", content: "Un atelier digitale di lusso. Ogni pezzo è un battito, ogni dettaglio una scelta." },
    ],
  }),
  component: Home,
});

function Home() {
  const [showCanvas, setShowCanvas] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShowCanvas(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] overflow-hidden">
        {/* fallback hero image while canvas loads */}
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-90"
          style={{ animation: "breathe 6s ease-in-out infinite" }}
        />
        <Suspense fallback={null}>
          {showCanvas && (
            <div className="absolute inset-0" style={{ animation: "fade-up 1.6s var(--ease-cinema) both" }}>
              <HeartScene />
            </div>
          )}
        </Suspense>

        {/* gradient veils */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, oklch(0.14 0.005 0 / 0.6) 0%, transparent 25%, transparent 60%, var(--color-carbon) 100%)" }} />

        <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-10 pt-[40svh] md:pt-[42svh] pb-24">
          <div className="reveal-mask block">
            <span className="text-[10px] uppercase tracking-[0.5em] text-ivory/60">Atelier · Italia</span>
          </div>
          <h1 className="text-display text-[14vw] md:text-[8.5vw] leading-[0.92] mt-4 max-w-[14ch]" style={{ animation: "fade-up 1.4s 0.2s var(--ease-cinema) both" }}>
            La forma <em className="italic chrome-text">del battito</em>.
          </h1>
          <p className="mt-6 max-w-md text-base text-ivory/70 leading-relaxed" style={{ animation: "fade-up 1.4s 0.5s var(--ease-cinema) both" }}>
            Ogni oggetto Cuoriforma nasce da una vibrazione. Stampato in 3D, rifinito a mano, sigillato come un segreto.
          </p>
          <div className="mt-10 flex flex-wrap gap-4" style={{ animation: "fade-up 1.4s 0.75s var(--ease-cinema) both" }}>
            <Link to="/collezioni" className="btn-solid">Esplora le collezioni</Link>
            <Link to="/manifesto" className="btn-ghost">Il manifesto</Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.4em] text-ivory/40">scorri</span>
          <div className="scroll-hint" />
        </div>
      </section>

      {/* MANIFEST STRIP */}
      <section className="relative py-32 md:py-44">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <div className="text-[10px] uppercase tracking-[0.4em] text-primary mb-5">— 01 / Filosofia</div>
            <Reveal as="h2" className="text-display text-4xl md:text-5xl leading-[1.05]">
              Materia viva,<br /><em className="italic">forma intima</em>.
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6 space-y-5 text-ivory/75 text-lg leading-relaxed">
            <Reveal as="p" delay={120}>
              Non vendiamo oggetti. Componiamo presenze. Ogni pezzo nasce in un atelier dove la stampa 3D incontra la mano, il tempo e la lentezza.
            </Reveal>
            <Reveal as="p" delay={240}>
              Lavoriamo per chi cerca un dettaglio che resti — un regalo che parli, un oggetto che diventi un ricordo prima ancora di essere usato.
            </Reveal>
          </div>
        </div>
      </section>

      {/* COLLECTIONS — cinematic gallery */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <div className="flex items-end justify-between gap-6 mb-14 flex-wrap">
            <div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-primary mb-5">— 02 / Collezioni</div>
              <Reveal as="h2" className="text-display text-5xl md:text-6xl leading-[1] max-w-[14ch]">
                Cinque <em className="italic">universi</em>, una sola firma.
              </Reveal>
            </div>
            <Link to="/collezioni" className="link-underline text-sm uppercase tracking-[0.3em] text-ivory/70">Vedi tutto</Link>
          </div>

          <div className="grid md:grid-cols-12 gap-6">
            {categories.map((c, i) => (
              <Link
                key={c.slug}
                to="/collezioni/$category"
                params={{ category: c.slug }}
                className={`group relative overflow-hidden block ${i === 0 ? "md:col-span-7 md:row-span-2 aspect-[5/4]" : "md:col-span-5 aspect-[4/3]"}`}
                data-cursor="hover"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-[2000ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/30 to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-t from-primary/30 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-7 md:p-9">
                  <div className="text-[10px] uppercase tracking-[0.4em] text-ivory/60 mb-3 transition-all duration-500 group-hover:text-primary">
                    Collezione · 0{i + 1}
                  </div>
                  <div className="text-display text-3xl md:text-4xl leading-tight">
                    {c.name}
                  </div>
                  <div className="mt-2 text-sm text-ivory/65 italic">{c.tagline}</div>
                  <div className="mt-5 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-ivory">
                    <span>Entra</span>
                    <span className="block h-px w-10 bg-ivory transition-all duration-500 group-hover:w-20 group-hover:bg-primary" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGING / RITUAL */}
      <section className="relative py-32 md:py-44 overflow-hidden">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 order-2 md:order-1">
            <div className="text-[10px] uppercase tracking-[0.4em] text-primary mb-5">— 03 / Il rituale</div>
            <Reveal as="h2" className="text-display text-5xl md:text-6xl leading-[1]">
              L'<em className="italic">apertura</em><br />è già <em className="italic">memoria</em>.
            </Reveal>
            <Reveal as="p" delay={150} className="mt-6 text-ivory/75 text-lg leading-relaxed max-w-lg">
              Ogni Cuoriforma arriva avvolto in seta bordeaux, sigillato in ceralacca con il nostro stemma anatomico. Una pergamena d'autore racconta il pezzo. Aprire diventa un gesto.
            </Reveal>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/packaging" className="btn-ghost">Scopri il rituale</Link>
            </div>
          </div>
          <div className="md:col-span-6 order-1 md:order-2 relative aspect-[5/4]">
            <img src={packagingImg} alt="Packaging Cuoriforma" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 ring-1 ring-ivory/10" />
            <div className="absolute -inset-2 -z-10 blur-3xl opacity-50" style={{ background: "radial-gradient(circle, oklch(0.42 0.18 25 / 0.4), transparent 70%)" }} />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-32 md:py-44 text-center">
        <div className="mx-auto max-w-[1100px] px-6">
          <div className="text-[10px] uppercase tracking-[0.5em] text-primary mb-6">— Su misura</div>
          <Reveal as="h2" className="text-display text-5xl md:text-7xl leading-[0.95]">
            Hai un'idea che non<br /><em className="italic">trova ancora forma</em>?
          </Reveal>
          <p className="mt-8 text-ivory/70 max-w-xl mx-auto">
            Disegniamo e stampiamo pezzi su misura. Bomboniere, regali, sculture personali — partendo da una parola, una foto, un battito.
          </p>
          <div className="mt-12">
            <Link to="/contatti" className="btn-solid">Inizia un dialogo</Link>
          </div>
        </div>
      </section>
    </>
  );
}
