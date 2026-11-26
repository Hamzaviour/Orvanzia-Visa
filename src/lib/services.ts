export type Service = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  icon: "plane" | "briefcase" | "users" | "graduation" | "hardhat" | "repeat";
  includes: string[];
  idealFor: string[];
};

export const services: Service[] = [
  {
    slug: "tourist-visa",
    title: "Tourist Visa",
    short: "Travel for leisure, holidays or short visits with confidence.",
    intro:
      "Planning a holiday, city break or sightseeing trip? We help you understand the right visa category, prepare a strong document pack and book your appointment.",
    icon: "plane",
    includes: ["Eligibility & route check", "Personalised document checklist", "Application form completion", "Appointment booking support", "Itinerary & cover letter guidance"],
    idealFor: ["Holidays & city breaks", "Sightseeing tours", "Cruises with port stops", "Short leisure trips"],
  },
  {
    slug: "business-visa",
    title: "Business Visa",
    short: "Support for meetings, conferences and business travel.",
    intro:
      "Attending meetings, trade fairs or conferences abroad? We prepare your application around your invitation letters and employer documents so it is clear and complete.",
    icon: "briefcase",
    includes: ["Invitation letter review", "Employer & company document guidance", "Multiple-entry visa advice", "Priority appointment support", "Fast-track options where available"],
    idealFor: ["Client meetings", "Conferences & trade fairs", "Training & workshops", "Contract negotiations"],
  },
  {
    slug: "family-visa",
    title: "Family & Friends Visa",
    short: "Guidance for visiting family or friends abroad.",
    intro:
      "Visiting loved ones overseas? We help you and your host gather the right invitation, sponsorship and accommodation evidence for a smooth application.",
    icon: "users",
    includes: ["Host invitation & sponsorship guidance", "Relationship evidence checklist", "Financial evidence review", "Family group applications", "Children's application support"],
    idealFor: ["Visiting relatives", "Weddings & celebrations", "Family reunions", "Visiting friends"],
  },
  {
    slug: "student-visa",
    title: "Student Visa",
    short: "Practical support for students planning to study abroad.",
    intro:
      "From short courses to full degrees, we help you understand student visa routes, financial requirements and the documents your university and the authorities expect.",
    icon: "graduation",
    includes: ["Course & route eligibility check", "Acceptance letter guidance", "Proof of funds planning", "Accommodation evidence", "Interview preparation tips"],
    idealFor: ["University degrees", "Language courses", "Exchange programmes", "Short study courses"],
  },
  {
    slug: "work-visa",
    title: "Work Visa",
    short: "Guidance for employment-related visa applications.",
    intro:
      "Moving abroad for a job? We explain the work visa options for your destination and help you organise employer sponsorship and qualification documents.",
    icon: "hardhat",
    includes: ["Work route comparison", "Employer sponsorship guidance", "Qualification & experience evidence", "Document translation advice", "Dependant applications"],
    idealFor: ["Skilled workers", "Intra-company transfers", "Seasonal work", "Working holiday schemes"],
  },
  {
    slug: "transit-visa",
    title: "Transit Visa",
    short: "Support for smooth international transit requirements.",
    intro:
      "Changing planes in another country? Some nationalities need an airport transit visa even without leaving the airport. We check your route and help you apply in time.",
    icon: "repeat",
    includes: ["Route & layover check", "Airport transit visa advice", "Onward ticket guidance", "Quick-turnaround applications", "Multi-country connections"],
    idealFor: ["Long layovers", "Multi-leg journeys", "Airport transit", "Cruise connections"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const faqs = [
  {
    q: "How long does a Schengen visa application take?",
    a: "Processing times vary by destination, season and the relevant authority. Standard Schengen decisions usually take around 15 calendar days after your appointment, but can take longer at peak times. We help you plan around realistic timelines.",
  },
  {
    q: "What documents do I need?",
    a: "Requirements depend on the destination, visa category and your personal circumstances. Every client receives a personalised checklist before submitting, so nothing important is missed.",
  },
  {
    q: "Can Orvanzia Visa help with visa appointments?",
    a: "Yes. Where appointment assistance is part of your service, our team guides you through the booking process and tells you exactly what to bring on the day.",
  },
  {
    q: "Can I apply from the UK if I am not a British citizen?",
    a: "Usually yes, if you are legally resident in the UK. Eligibility depends on your immigration status and the destination country's rules. Send us your details and we will advise.",
  },
  {
    q: "What happens if my visa is refused?",
    a: "A refusal does not automatically mean you cannot apply again. The right next step depends on the refusal reasons. We can review your refusal letter and guide you on a reapplication or appeal where available.",
  },
  {
    q: "Can Orvanzia Visa guarantee visa approval?",
    a: "No. Visa decisions are made solely by the relevant embassy, consulate or immigration authority. We provide private consultancy and application assistance to give you the strongest possible application, but we cannot guarantee an outcome.",
  },
  {
    q: "Are the fees and processing times on the website exact?",
    a: "They are indicative guides only. Government fees and processing times change and differ by nationality. We confirm the current figures for your situation before you pay anything.",
  },
];
