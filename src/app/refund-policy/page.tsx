import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Refund Policy" };

export default function Page() {
  return (
    <LegalPage
      title="Refund Policy"
      sections={[
        { h: "Before work starts", p: ["If you cancel before we begin work on your application, you are entitled to a full refund of our service fee."] },
        { h: "After work starts", p: ["Once we have started preparing your application, refunds are assessed on the work already completed."] },
        { h: "Government & third-party fees", p: ["Fees paid to embassies, consulates, visa application centres or other third parties are set by those bodies and are generally non-refundable."] },
        { h: "Visa refusals", p: ["A visa refusal by the authorities does not by itself entitle you to a refund of our service fee, as the decision is outside our control."] },
      ]}
    />
  );
}
