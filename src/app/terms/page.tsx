import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function Page() {
  return (
    <LegalPage
      title="Terms & Conditions"
      sections={[
        { h: "Our service", p: ["Orvanzia Visa provides private visa consultancy and application assistance. We are not a government body, embassy, consulate or official visa application centre."] },
        { h: "No guarantee of outcome", p: ["Visa decisions are made solely by the relevant authorities. We cannot guarantee that any application will be approved or processed within a particular time."] },
        { h: "Your responsibilities", p: ["You must provide accurate, complete and genuine information and documents. We are not responsible for refusals or delays caused by incorrect or incomplete information."] },
        { h: "Fees", p: ["Our service fees are agreed before work begins and are separate from government, embassy and visa centre fees, which are payable to those bodies.", "Indicative fees and processing times shown on this website are for guidance only and may change."] },
        { h: "Liability", p: ["To the extent permitted by law, our liability is limited to the service fee paid to us for the relevant application."] },
      ]}
    />
  );
}
