import homeDecor from "@/assets/cat-home-decor.jpg";
import homeUtility from "@/assets/cat-home-utility.jpg";
import bomboniere from "@/assets/cat-bomboniere.jpg";
import vestiti from "@/assets/cat-vestiti.jpg";
import accessori from "@/assets/cat-accessori.jpg";

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  subcategories?: { slug: string; name: string }[];
  pieces: { name: string; detail: string; price: string }[];
};

export const categories: Category[] = [
  {
    slug: "home-decor",
    name: "Home Decor",
    tagline: "Sculture per gli spazi che abiti",
    description: "Oggetti scultorei che trasformano la luce di una stanza. Forme organiche stampate in 3D, finiture vellutate, edizioni intime.",
    image: homeDecor,
    pieces: [
      { name: "Vaso Cuore Cavo", detail: "Ceramica bordeaux opaca · 18 cm", price: "€ 89" },
      { name: "Portacandela Aorta", detail: "PLA premium nero satinato", price: "€ 64" },
      { name: "Scultura Battito 01", detail: "Edizione di 25 · numerata", price: "€ 240" },
    ],
  },
  {
    slug: "home-utility",
    name: "Home Utility",
    tagline: "Funzione che diventa rituale",
    description: "Oggetti d'uso quotidiano disegnati per essere tenuti in mano, non solo guardati. Curve organiche, materiali tattili.",
    image: homeUtility,
    pieces: [
      { name: "Vassoio Onda", detail: "Resina titanio · 32×14 cm", price: "€ 72" },
      { name: "Porta-anelli Ventricolo", detail: "Avorio finitura soft-touch", price: "€ 48" },
      { name: "Diffusore Ambient", detail: "Per oli essenziali · bordeaux", price: "€ 96" },
    ],
  },
  {
    slug: "bomboniere",
    name: "Bomboniere",
    tagline: "Il ricordo si fa oggetto",
    description: "Bomboniere su misura per i momenti che restano. Confezionate a mano, sigillate in ceralacca, accompagnate da una pergamena d'autore.",
    image: bomboniere,
    subcategories: [
      { slug: "nascita", name: "Nascita" },
      { slug: "battesimo", name: "Battesimo" },
      { slug: "comunione", name: "Comunione" },
      { slug: "cresima", name: "Cresima" },
      { slug: "diciottesimo", name: "Diciottesimo" },
      { slug: "laurea", name: "Laurea" },
      { slug: "matrimonio", name: "Matrimonio" },
    ],
    pieces: [
      { name: "Cuore Avorio · Matrimonio", detail: "Nastro bordeaux + ceralacca", price: "€ 12 / pz · da 30" },
      { name: "Piccolo Cuore · Battesimo", detail: "Finitura porcellana · rosa cipria o avorio", price: "€ 9 / pz · da 30" },
      { name: "Toga · Laurea", detail: "Miniatura scultorea con dedica", price: "€ 14 / pz · da 20" },
    ],
  },
  {
    slug: "vestiti",
    name: "Vestiti",
    tagline: "Indossare un'idea",
    description: "Capi in tessuto stampato e parti scultoree applicate. Edizioni limitate, taglie su misura, ogni pezzo firmato a mano.",
    image: vestiti,
    pieces: [
      { name: "Bustier Anatomico", detail: "Cotone bordeaux + placca scultorea", price: "€ 320" },
      { name: "T-shirt Vena d'Oro", detail: "Cotone organico, applicazione 3D", price: "€ 120" },
      { name: "Giacca Velluto Cuore", detail: "Su prenotazione · taglio sartoriale", price: "€ 680" },
    ],
  },
  {
    slug: "accessori",
    name: "Accessori",
    tagline: "Gioielli, borse, talismani",
    description: "Piccoli oggetti da portare con sé. Cuori, simboli, dettagli cromati che dialogano con la pelle e con la luce.",
    image: accessori,
    subcategories: [
      { slug: "gioielli", name: "Gioielli" },
      { slug: "borse", name: "Borse" },
    ],
    pieces: [
      { name: "Pendente Cuore Smaltato", detail: "Argento + smalto bordeaux", price: "€ 145" },
      { name: "Orecchini Atrio", detail: "Acciaio chirurgico · cromato", price: "€ 78" },
      { name: "Pochette Aorta", detail: "Pelle bordeaux + chiusura scultorea", price: "€ 240" },
    ],
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
