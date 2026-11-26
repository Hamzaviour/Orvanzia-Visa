import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Page() {
  return (
    <LegalPage
      title="Privacy Policy"
      sections={[
        { h: "Who we are", p: ["Orvanzia Visa is a private visa consultancy based in the United Kingdom. This policy explains how we collect and use your personal data when you use our website and services, in line with UK GDPR and the Data Protection Act 2018."] },
        { h: "Information we collect", p: ["Details you give us through our forms: name, email, phone number, destination, travel dates and any information you include in your message.", "During an engagement we may also receive passport, residence and financial documents needed to prepare your application."] },
        { h: "How we use it", p: ["To respond to your enquiry, provide our visa assistance services, and meet our legal obligations. We never sell your data."] },
        { h: "Sharing", p: ["We only share data with the relevant embassy, consulate or visa application centre when you instruct us to, and with trusted service providers (such as email hosting) under appropriate safeguards."] },
        { h: "Retention & your rights", p: ["We keep personal data only as long as needed for the purpose collected or as required by law. You can request access, correction or deletion of your data at any time by contacting us."] },
      ]}
    />
  );
}
