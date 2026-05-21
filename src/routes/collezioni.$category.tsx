import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/RevealText";
import { categories, getCategory } from "@/lib/products";

export const Route = createFileRoute("/collezioni/$category")({
  loader: ({ params }) => {
    const cat = getCategory(params.category);
    if (!cat) throw notFound();
    return { category: cat };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.category.name ?? "Collezione"} — Cuoriforma` },
      { name: "description", content: loaderData?.category.description ?? "" },
      { property: "og:title", content: `${loaderData?.category.name} — Cuoriforma` },
      { property: "og:description", content: loaderData?.category.tagline ?? "" },
      { property: "og:image", content: loaderData?.category.image ?? "" },
    ],
  }),
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="pt-48 px-6 text-center">
      <div className="text-display text-5xl">Collezione non trovata</div>
      <Link to="/collezioni" className="btn-ghost mt-8 inline-flex">Torna alle collezioni</Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="pt-48 px-6 text-center">
      <div className="text-display text-3xl">{error.message}</div>
      <button onClick={reset} className="btn-ghost mt-8">Riprova</button>
    </div>
  ),
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const others = categories.filter((c) => c.slug !== category.slug);

  return (
    <>
      <section className="relative pt-32 md:pt-40 pb-12">
        <div className="absolute inset-0 -z-10">
          <img src={category.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-carbon/70 via-carbon/85 to-carbon" />
        </div>
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <Link to="/collezioni" className="text-[10px] uppercase tracking-[0.4em] text-ivory/50 link-underline">← Collezioni</Link>
          <div className="text-[10px] uppercase tracking-[0.5em] text-primary mt-6 mb-4">— {category.tagline}</div>
          <Reveal as="h1" className="text-display text-[14vw] md:text-[8vw] leading-[0.92] max-w-[14ch]">
            {category.name.split(" ").map((w, i) => (
              <span key={i}>{i % 2 === 1 ? <em className="italic chrome-text">{w}</em> : w}{" "}</span>
            ))}
          </Reveal>
          <p className="mt-8 text-lg md:text-xl text-ivory/75 leading-relaxed max-w-2xl">{category.description}</p>
        </div>
      </section>

      {category.subcategories && (
        <section className="py-12">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10">
            <div className="text-[10px] uppercase tracking-[0.4em] text-ivory/40 mb-5">Per occasione</div>
            <div className="flex flex-wrap gap-2">
              {category.subcategories.map((s) => (
                <span key={s.slug} className="px-5 py-2.5 border border-ivory/15 hover:border-primary hover:text-primary transition-colors duration-500 text-[11px] uppercase tracking-[0.25em] cursor-pointer" data-cursor="hover">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <div className="text-[10px] uppercase tracking-[0.4em] text-ivory/40 mb-10">Pezzi in collezione</div>
          <div className="grid md:grid-cols-3 gap-8">
            {category.pieces.map((p, i) => (
              <div key={p.name} className="group border border-ivory/10 hover:border-primary transition-all duration-500 p-7" style={{ animation: `fade-up 0.9s ${i * 100}ms var(--ease-cinema) both` }}>
                <div className="relative aspect-[4/5] overflow-hidden mb-5 bg-carbon">
                  <img src={category.image} alt={p.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-carbon/60 to-transparent" />
                </div>
                <div className="text-display text-2xl">{p.name}</div>
                <div className="text-sm text-ivory/55 mt-1">{p.detail}</div>
                <div className="flex items-end justify-between mt-5">
                  <div className="text-primary text-lg">{p.price}</div>
                  <Link to="/contatti" className="text-[10px] uppercase tracking-[0.3em] link-underline">Richiedi</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other collections */}
      <section className="py-24 border-t border-ivory/10">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <div className="text-[10px] uppercase tracking-[0.4em] text-primary mb-8">— Continua a esplorare</div>
          <div className="grid md:grid-cols-4 gap-6">
            {others.map((o) => (
              <Link key={o.slug} to="/collezioni/$category" params={{ category: o.slug }} className="group relative aspect-[4/5] overflow-hidden" data-cursor="hover">
                <img src={o.image} alt={o.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-carbon to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="text-display text-2xl">{o.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
