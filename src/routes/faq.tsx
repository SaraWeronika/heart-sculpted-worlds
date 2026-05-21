import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/RevealText";
import { faqs } from "@/lib/faq";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Cuoriforma" },
      { name: "description", content: "Risposte a domande frequenti: spedizioni, materiali, bomboniere, ordini su misura, packaging." },
      { property: "og:title", content: "FAQ — Cuoriforma" },
      { property: "og:description", content: "Tutto quello che vuoi sapere prima di scriverci." },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <section className="pt-40 pb-12 md:pt-48 md:pb-16">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <div className="text-[10px] uppercase tracking-[0.5em] text-primary mb-6">— Domande</div>
          <Reveal as="h1" className="text-display text-[12vw] md:text-[7vw] leading-[0.95] max-w-[16ch]">
            Le risposte<br /><em className="italic chrome-text">più cercate</em>.
          </Reveal>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-[900px] px-6 md:px-10">
          {faqs.map((f, i) => (
            <div key={i} className="border-t border-ivory/10 last:border-b">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full py-7 flex justify-between items-center gap-6 text-left group"
              >
                <span className="text-display text-2xl md:text-3xl group-hover:text-primary transition-colors duration-500">{f.q}</span>
                <span className={`text-3xl text-primary transition-transform duration-500 ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              <div className={`overflow-hidden transition-all duration-700 ease-out ${open === i ? "max-h-96 pb-7" : "max-h-0"}`}>
                <p className="text-ivory/70 leading-relaxed text-lg max-w-[60ch]">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 text-center">
        <p className="text-ivory/65">Non hai trovato quello che cercavi?</p>
        <div className="mt-6"><Link to="/contatti" className="btn-ghost">Scrivici direttamente</Link></div>
      </section>
    </>
  );
}
