import { useEffect, useRef, useState } from "react";
import { answer } from "@/lib/chatbot";

type Msg = { role: "user" | "bot"; text: string };

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "Benvenutu in Cuoriforma. Sono qui per aiutarti con spedizioni, bomboniere, ordini su misura o qualsiasi dubbio. Cosa vuoi sapere?" },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs, open]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setTimeout(() => setMsgs((m) => [...m, { role: "bot", text: answer(text) }]), 450);
  };

  const suggestions = ["Tempi di spedizione", "Bomboniere matrimonio", "Pezzo su misura", "Packaging"];

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Apri assistenza"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full flex items-center justify-center text-ivory transition-all duration-500"
        style={{ background: "linear-gradient(135deg, var(--color-secondary), var(--color-primary))", boxShadow: "0 20px 50px -15px oklch(0.42 0.18 25 / 0.7)" }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M21 12a8 8 0 1 1-3.2-6.4L21 4l-1.5 4.5" />}
        </svg>
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[92vw] max-w-sm flex flex-col rounded-sm overflow-hidden border border-ivory/15 bg-carbon/95 backdrop-blur-xl" style={{ boxShadow: "var(--shadow-cinema)", animation: "fade-up 0.5s var(--ease-cinema)" }}>
          <div className="px-5 py-4 border-b border-ivory/10 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-primary" style={{ animation: "pulse-soft 1.1s infinite" }} />
            <div>
              <div className="text-display text-lg leading-none">Assistenza</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-ivory/50 mt-1">Risposte rapide · Cuoriforma</div>
            </div>
          </div>
          <div ref={scrollRef} className="px-5 py-4 max-h-80 overflow-y-auto space-y-3 text-sm">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "bot" ? "text-ivory/90" : "text-ivory text-right"}>
                <div className={`inline-block px-3.5 py-2.5 rounded-sm max-w-[85%] ${m.role === "bot" ? "bg-ivory/5 border border-ivory/10" : "bg-primary/80"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 pb-3 flex flex-wrap gap-1.5">
            {suggestions.map((s) => (
              <button key={s} onClick={() => { setInput(s); setTimeout(() => { setMsgs((m) => [...m, { role: "user", text: s }, { role: "bot", text: answer(s) }]); setInput(""); }, 50); }} className="text-[10px] uppercase tracking-[0.2em] px-2.5 py-1.5 border border-ivory/15 hover:border-primary hover:text-primary transition-colors">
                {s}
              </button>
            ))}
          </div>
          <div className="px-3 pb-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Scrivi una domanda…"
              className="flex-1 bg-ivory/5 border border-ivory/10 px-3 py-2.5 text-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-primary"
            />
            <button onClick={send} className="px-4 text-[10px] uppercase tracking-[0.2em] bg-primary text-ivory">Invia</button>
          </div>
        </div>
      )}
    </>
  );
}
