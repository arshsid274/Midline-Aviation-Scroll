import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/pages/ComingSoonPage";

export const metadata: Metadata = {
  title: "Our Fleet | Midline Airlines",
  description: "Explore the Midline Airlines fleet. Full Fleet page coming soon.",
};

export default function FleetPage() {
  return (
    <ComingSoonPage
      title="Our Fleet"
      description="The complete fleet catalog, specifications, cabin configurations, and aircraft performance data are currently being prepared."
    />
  );
}

