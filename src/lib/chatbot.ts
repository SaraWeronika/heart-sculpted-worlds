type Rule = { keywords: string[]; answer: string };

export const chatbotRules: Rule[] = [
  { keywords: ["spedizione", "spedire", "consegna", "tempi"], answer: "Le spedizioni in Italia sono tracciate e gratuite sopra €120. Tempi tipici di preparazione: 5–10 giorni lavorativi. Per l'estero rispondiamo entro 24h con un preventivo personalizzato." },
  { keywords: ["resi", "restituire", "reso", "rimborso"], answer: "Hai 14 giorni per il reso. Le bomboniere personalizzate e i pezzi su misura non sono restituibili — per qualsiasi dubbio scrivici prima dell'ordine." },
  { keywords: ["materiale", "materiali", "pla", "resina"], answer: "Lavoriamo principalmente con PLA premium, resine estetiche e filamenti flessibili per i capi indossabili. Ogni materiale è scelto per finitura tattile e durata." },
  { keywords: ["bomboniere", "matrimonio", "battesimo", "comunione"], answer: "Le bomboniere partono da un ordine minimo di 30 pezzi. Possiamo personalizzare colore, dedica e ceralacca. Scrivici dalla pagina Contatti per ricevere un campione fisico." },
  { keywords: ["misura", "personalizzato", "custom", "personalizzazione"], answer: "Realizziamo pezzi su misura. Raccontaci la tua idea da Contatti: rispondiamo entro 48h con bozza, preventivo e tempi." },
  { keywords: ["packaging", "confezione", "scatola", "regalo"], answer: "Ogni ordine arriva in scatola nera rigida, sigillata in ceralacca con nastro di seta bordeaux e pergamena numerata. È il primo capitolo dell'oggetto." },
  { keywords: ["prezzo", "costo", "costi", "pagamento"], answer: "I prezzi sono indicati per ciascuna collezione. Accettiamo carta, PayPal e bonifico. Per ordini sopra €500 è possibile rateizzare." },
  { keywords: ["cura", "pulizia", "manutenzione"], answer: "Pulisci con un panno morbido leggermente umido. Evita solventi, luce solare diretta prolungata e temperature sopra i 50°C." },
  { keywords: ["contatto", "contatti", "email", "scriverci"], answer: "Puoi scriverci da Contatti, oppure mandare una mail a hello@cuoriforma.studio. Rispondiamo entro 48 ore." },
  { keywords: ["chi", "brand", "filosofia", "storia"], answer: "Cuoriforma nasce per dare forma scultorea agli oggetti che entrano nella vita delle persone. Scopri di più nel Manifesto." },
];

export function answer(input: string): string {
  const q = input.toLowerCase();
  for (const rule of chatbotRules) {
    if (rule.keywords.some((k) => q.includes(k))) return rule.answer;
  }
  return "Non sono sicura di aver capito — posso aiutarti su spedizioni, materiali, bomboniere, ordini su misura, packaging, prezzi o cura dei pezzi. Per dettagli specifici, scrivici da Contatti.";
}
