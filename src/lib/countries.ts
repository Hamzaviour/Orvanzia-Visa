import raw from "@/data/countries.json";

export type VisaKind = "Schengen Visa" | "e-Visa" | "Visa on Arrival" | "Embassy Visa" | "ETA";

export type Country = {
  code: string;
  name: string;
  region: string;
  subregion: string;
  capital: string;
  image: string;
  visa: VisaKind;
  processingDays: number;
  fee: number; // indicative government fee in GBP
  serviceFrom: number; // Orvanzia service fee from, GBP
  stay: string;
  validity: string;
  popular: boolean;
};

const SCHENGEN = new Set(
  "at be bg hr cz dk ee fi fr de gr hu is it lv li lt lu mt nl no pl pt ro sk si es se ch mc sm va".split(" "),
);
const ETA = new Set(["us", "au", "nz", "kr", "ca"]);
const EVISA = new Set(
  "tr in lk vn kh ke eg sa qa om bh az uz kg tj mm zw zm ug rw tz et ng ga bj tg ci dj ss pg ma am ge kz la co cu bd ao cm cg cd ls mw mz sl lr gn st tl ps".split(
    " ",
  ),
);
const VOA = new Set("mv np jo id th ae my lb sc mu fj ws to tv vu pw mh fm ki nr sb kn lc vc dm gd jm bb bs tt".split(" "));

const POPULAR = [
  "fr", "it", "es", "de", "nl", "ch", "gr", "pt", "us", "ca", "tr", "ae",
  "jp", "au", "th", "in", "sa", "ma", "eg", "mv", "id", "vn", "cn", "za",
];

// Hand-tuned values for major destinations; everything else uses category defaults.
const OVERRIDES: Record<string, Partial<Country>> = {
  us: { visa: "Embassy Visa", processingDays: 30, fee: 140, stay: "Up to 6 months", validity: "Up to 10 years" },
  ca: { visa: "Embassy Visa", processingDays: 28, fee: 75, stay: "Up to 6 months", validity: "Up to 10 years" },
  au: { visa: "ETA", processingDays: 2, fee: 15, stay: "Up to 3 months", validity: "12 months" },
  nz: { visa: "ETA", processingDays: 3, fee: 20, stay: "Up to 3 months", validity: "2 years" },
  kr: { visa: "ETA", processingDays: 3, fee: 8, stay: "Up to 90 days", validity: "3 years" },
  cn: { processingDays: 7, fee: 85 },
  jp: { processingDays: 7, fee: 25 },
  ru: { processingDays: 14, fee: 95 },
  ie: { processingDays: 40, fee: 55, stay: "Up to 90 days", validity: "Single entry" },
  in: { processingDays: 4, fee: 25 },
  tr: { processingDays: 2, fee: 45 },
  ae: { visa: "e-Visa", processingDays: 4, fee: 75 },
  sa: { processingDays: 3, fee: 115 },
  eg: { processingDays: 7, fee: 20 },
  za: { processingDays: 15, fee: 30 },
  th: { visa: "e-Visa", processingDays: 10, fee: 30 },
};

const DEFAULTS: Record<VisaKind, Pick<Country, "processingDays" | "fee" | "stay" | "validity">> = {
  "Schengen Visa": { processingDays: 15, fee: 77, stay: "Up to 90 days", validity: "Up to 5 years" },
  "e-Visa": { processingDays: 5, fee: 40, stay: "Up to 30 days", validity: "90 days" },
  "Visa on Arrival": { processingDays: 3, fee: 30, stay: "Up to 30 days", validity: "On arrival" },
  "Embassy Visa": { processingDays: 15, fee: 60, stay: "Up to 30 days", validity: "3 months" },
  ETA: { processingDays: 3, fee: 15, stay: "Up to 90 days", validity: "2 years" },
};

const SERVICE: Record<VisaKind, number> = {
  "Schengen Visa": 79,
  "e-Visa": 39,
  "Visa on Arrival": 29,
  "Embassy Visa": 89,
  ETA: 29,
};

function kindFor(code: string): VisaKind {
  if (SCHENGEN.has(code)) return "Schengen Visa";
  if (ETA.has(code)) return "ETA";
  if (EVISA.has(code)) return "e-Visa";
  if (VOA.has(code)) return "Visa on Arrival";
  return "Embassy Visa";
}

export const countries: Country[] = (raw as Omit<Country, "visa" | "processingDays" | "fee" | "serviceFrom" | "stay" | "validity" | "popular">[]).map(
  (c) => {
    const o = OVERRIDES[c.code] || {};
    const visa = (o.visa as VisaKind) || kindFor(c.code);
    return {
      ...c,
      visa,
      ...DEFAULTS[visa],
      serviceFrom: SERVICE[visa],
      popular: POPULAR.includes(c.code),
      ...o,
    } as Country;
  },
);

export const popularCountries = POPULAR.map((p) => countries.find((c) => c.code === p)!).filter(Boolean);

export const getCountry = (code: string) => countries.find((c) => c.code === code);

export const flag = (code: string, w = 80) => `https://flagcdn.com/w${w}/${code}.png`;

export const photo = (c: Country, w = 960) => c.image.replace(/\/\d+px-/, `/${w}px-`);

export const visaKinds: VisaKind[] = ["Schengen Visa", "e-Visa", "ETA", "Visa on Arrival", "Embassy Visa"];

export const regions = ["Europe", "Asia", "Africa", "Americas", "Oceania"];

export function requirementsFor(c: Country) {
  const base = [
    "Passport valid for at least 6 months beyond your return date, with 2 blank pages",
    "Recent passport-size photograph to the destination's specification",
    "Proof of UK residence status (BRP, eVisa share code or settled status)",
    "Bank statements for the last 3–6 months showing sufficient funds",
    "Return flight reservation and accommodation details",
  ];
  const extra: Record<VisaKind, string[]> = {
    "Schengen Visa": [
      "Travel medical insurance with minimum €30,000 cover",
      "Employment letter, payslips or proof of study",
      "Day-by-day travel itinerary",
      "Biometrics at the visa application centre",
    ],
    "e-Visa": ["Digital copy of passport bio page", "Online payment card for the government fee"],
    ETA: ["Valid email address and payment card", "Answers to security and health questions"],
    "Visa on Arrival": ["Cash in USD or local currency for the arrival fee", "Proof of onward travel"],
    "Embassy Visa": [
      "Completed embassy application form",
      "Cover letter explaining the purpose of your trip",
      "Invitation letter or hotel confirmation where applicable",
      "In-person appointment or biometrics where required",
    ],
  };
  return [...base, ...extra[c.visa]];
}
