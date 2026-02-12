import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/pages/ComingSoonPage";

export const metadata: Metadata = {
  title: "Aircraft Charter | Midline Airlines",
  description: "Midline Airlines aircraft charter service page coming soon.",
};

export default function AircraftCharterPage() {
  return (
    <ComingSoonPage
      title="Aircraft Charter"
      description="End-to-end private charter availability, route planning, and concierge details will be published here soon."
    />
  );
}

