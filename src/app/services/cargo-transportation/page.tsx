import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/pages/ComingSoonPage";

export const metadata: Metadata = {
  title: "Cargo Transportation | Midline Airlines",
  description: "Midline Airlines cargo transportation service page coming soon.",
};

export default function CargoTransportationPage() {
  return (
    <ComingSoonPage
      title="Cargo Transportation"
      description="Cargo routing, handling standards, and mission-critical freight support capabilities are currently being prepared."
    />
  );
}

