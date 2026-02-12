import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/pages/ComingSoonPage";

export const metadata: Metadata = {
  title: "Aircraft Sales | Midline Airlines",
  description: "Midline Airlines aircraft sales service page coming soon.",
};

export default function AircraftSalesPage() {
  return (
    <ComingSoonPage
      title="Aircraft Sales"
      description="Acquisition advisory, valuation, listing strategy, and transaction support information will be available on this page soon."
    />
  );
}

