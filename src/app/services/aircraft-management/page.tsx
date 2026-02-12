import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/pages/ComingSoonPage";

export const metadata: Metadata = {
  title: "Aircraft Management | Midline Airlines",
  description: "Midline Airlines aircraft management service page coming soon.",
};

export default function AircraftManagementPage() {
  return (
    <ComingSoonPage
      title="Aircraft Management"
      description="Ownership support, compliance operations, crew management, and maintenance coordination details are being finalized."
    />
  );
}

