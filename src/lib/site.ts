export const site = {
  name: "Orvanzia Visa",
  tagline: "Trusted Visa Assistance for Travellers in the UK",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://orvanziavisa.co.uk",
  email: "hello@orvanziavisa.co.uk",
  // Add a phone / WhatsApp number (digits only for WhatsApp, e.g. "447700900123") to show them on the site.
  phone: "+44 7862 600871",
  whatsapp: "447862600871",
  address: "United Kingdom",
  disclaimer:
    "Orvanzia Visa is an independent private consultancy and is not a government body, embassy, consulate or official visa application centre. Visa decisions are made solely by the relevant authorities.",
};

export const nav = [
  { label: "Home", href: "/" },
  {
    label: "Visas",
    href: "/destinations",
    children: [
      { label: "France", href: "/destinations/fr" },
      { label: "Germany", href: "/destinations/de" },
      { label: "Italy", href: "/destinations/it" },
      { label: "Spain", href: "/destinations/es" },
      { label: "Netherlands", href: "/destinations/nl" },
      { label: "Switzerland", href: "/destinations/ch" },
      { label: "United States", href: "/destinations/us" },
      { label: "Canada", href: "/destinations/ca" },
      { label: "All 196 destinations", href: "/destinations" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Tourist Visa", href: "/services/tourist-visa" },
      { label: "Business Visa", href: "/services/business-visa" },
      { label: "Family & Friends Visa", href: "/services/family-visa" },
      { label: "Student Visa", href: "/services/student-visa" },
      { label: "Work Visa", href: "/services/work-visa" },
      { label: "Transit Visa", href: "/services/transit-visa" },
    ],
  },
  { label: "Destinations", href: "/destinations" },
  {
    label: "Resources",
    href: "/faq",
    children: [
      { label: "FAQs", href: "/faq" },
      { label: "Visa Guidance", href: "/visa-guidance" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Refund Policy", href: "/refund-policy" },
    ],
  },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export const whatsappLink = (text = "Hello Orvanzia Visa, I'd like some help with my visa application.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
