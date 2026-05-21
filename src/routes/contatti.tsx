import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/RevealText";

export const Route = createFileRoute("/contatti")({
  head: () => ({
    meta: [
      { title: "Contatti — Cuoriforma" },
      { name: "description", content: "Richiedi un pezzo su misura, una bomboniera personalizzata o semplicemente fai una domanda. Rispondiamo entro 48 ore." },
      { property: "og:title", content: "Contatti — Cuoriforma" },
      { property: "og:description", content: "Inizia un dialogo con l'atelier." },
    ],
  }),
  component: ContattiPage,
});

function ContattiPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", topic: "Pezzo su misura", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(`Da: ${form.name} <${form.email}>\nArgomento: ${form.topic}\n\n${form.message}`);
    window.location.href = `mailto:hello@cuoriforma.studio?subject=${encodeURIComponent("[Cuoriforma] " + form.topic)}&body=${body}`;
    setSent(true);
  };

  return (
    <>
      <section className="pt-40 pb-12 md:pt-48 md:pb-16">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <div className="text-[10px] uppercase tracking-[0.5em] text-primary mb-6">— Dialogo</div>
          <Reveal as="h1" className="text-display text-[12vw] md:text-[7vw] leading-[0.95] max-w-[16ch]">
            Raccontaci<br />la tua <em className="italic chrome-text">idea</em>.
          </Reveal>
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5 space-y-6">
            <p className="text-lg text-ivory/75 leading-relaxed">
              Pezzi su misura, bomboniere personalizzate, regali fuori catalogo o semplicemente una curiosità. Rispondiamo entro 48 ore con una bozza e un preventivo.
            </p>
            <div className="hairline" />
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-ivory/40 mb-2">Atelier</div>
              <p className="text-ivory">hello@cuoriforma.studio</p>
              <p className="text-ivory/60 mt-1 text-sm">Italia · spedizione mondiale</p>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-ivory/40 mb-2">Tempi</div>
              <p className="text-ivory/70 text-sm">Risposta entro 48h · campione bomboniere in 7 giorni · produzione 2–4 settimane</p>
            </div>
          </div>

          <form onSubmit={submit} className="md:col-span-7 space-y-6">
            {([
              { k: "name", l: "Il tuo nome", type: "text" },
              { k: "email", l: "Email", type: "email" },
            ] as const).map((f) => (
              <label key={f.k} className="block">
                <span className="block text-[10px] uppercase tracking-[0.3em] text-ivory/40 mb-2">{f.l}</span>
                <input
                  type={f.type}
                  required
                  value={form[f.k]}
                  onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                  className="w-full bg-transparent border-b border-ivory/20 focus:border-primary py-3 text-lg outline-none transition-colors"
                />
              </label>
            ))}
            <label className="block">
              <span className="block text-[10px] uppercase tracking-[0.3em] text-ivory/40 mb-2">Argomento</span>
              <select
                value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                className="w-full bg-carbon border-b border-ivory/20 focus:border-primary py-3 text-lg outline-none"
              >
                <option>Pezzo su misura</option>
                <option>Bomboniere</option>
                <option>Collaborazione</option>
                <option>Informazioni generali</option>
              </select>
            </label>
            <label className="block">
              <span className="block text-[10px] uppercase tracking-[0.3em] text-ivory/40 mb-2">Raccontaci</span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Descrivi l'idea, il contesto, il numero di pezzi, la data se rilevante…"
                className="w-full bg-transparent border-b border-ivory/20 focus:border-primary py-3 text-lg outline-none resize-none"
              />
            </label>
            <button type="submit" className="btn-solid">{sent ? "Inviato — grazie" : "Invia il messaggio"}</button>
          </form>
        </div>
      </section>
    </>
  );
}
