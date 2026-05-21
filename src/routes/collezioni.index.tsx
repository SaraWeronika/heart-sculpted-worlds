import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/RevealText";
import { categories } from "@/lib/products";

export const Route = createFileRoute("/collezioni/")({
  head: () => ({
    meta: [
      { title: "Collezioni — Cuoriforma" },
      { name: "description", content: "Home decor, home utility, bomboniere, vestiti e accessori. Cinque universi di stampa 3D scultorea." },
      { property: "og:title", content: "Collezioni — Cuoriforma" },
      { property: "og:description", content: "Cinque universi, una sola firma." },
    ],
  }),
  component: CollezioniIndex,
});

function CollezioniIndex() {
  return (
    <>
      <section className="pt-40 pb-12 md:pt-48 md:pb-16">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <div className="text-[10px] uppercase tracking-[0.5em] text-primary mb-6">— Collezioni</div>
          <Reveal as="h1" className="text-display text-[12vw] md:text-[7vw] leading-[0.95] max-w-[16ch]">
            Cinque <em className="italic chrome-text">universi</em>.
          </Reveal>
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 space-y-3">
          {categories.map((c, i) => (
            <Link
              key={c.slug}
              to="/collezioni/$category"
              params={{ category: c.slug }}
              className="group relative grid md:grid-cols-12 gap-6 items-center border-t border-ivory/10 py-10 hover:bg-ivory/[0.02] transition-colors duration-500"
              data-cursor="hover"
              style={{ animation: `fade-up 0.9s ${i * 80}ms var(--ease-cinema) both` }}
            >
              <div className="md:col-span-1 text-display text-3xl italic text-primary/60">0{i + 1}</div>
              <div className="md:col-span-4">
                <div className="text-display text-4xl md:text-5xl group-hover:italic transition-all duration-500">{c.name}</div>
                <div className="text-sm text-ivory/55 italic mt-1">{c.tagline}</div>
              </div>
              <p className="md:col-span-5 text-ivory/65 leading-relaxed">{c.description}</p>
              <div className="md:col-span-2 md:text-right">
                <div className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-ivory/70 group-hover:text-primary transition-colors">
                  Entra
                  <span className="h-px w-10 bg-current transition-all duration-500 group-hover:w-20" />
                </div>
              </div>
              <div className="md:col-span-12 mt-2 hidden md:block aspect-[5/2] overflow-hidden opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-[400px] transition-all duration-700">
                <img src={c.image} alt={c.name} loading="lazy" className="w-full h-full object-cover" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
