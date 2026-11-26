import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Visa Guidance", description: "Practical guidance for preparing a strong visa application from the UK.", alternates: { canonical: "/visa-guidance" } };

export default function Page() {
  return (
    <LegalPage
      title="Visa Guidance"
      sections={[
        { h: "Apply early", p: ["Book appointments as soon as your travel plans are confirmed. Schengen applications can usually be submitted up to 6 months before travel, and peak seasons fill quickly."] },
        { h: "Check your passport", p: ["Most countries require at least 6 months' validity beyond your return date and two blank pages. Renew first if needed."] },
        { h: "Show strong ties to the UK", p: ["Evidence of employment, study, property or family in the UK helps show you intend to return after your trip."] },
        { h: "Keep finances clear", p: ["Bank statements should show steady funds that cover your trip. Explain any large recent deposits."] },
        { h: "Be consistent", p: ["Your itinerary, bookings, cover letter and form answers should all match. Inconsistencies are a common reason for refusal."] },
        { h: "Understand visa types", p: ["Schengen visas cover 29 European countries. e-Visas and ETAs are applied for online. Embassy visas usually need an appointment and biometrics. Visa on arrival is issued at the border but may still need pre-registration."] },
      ]}
    />
  );
}
