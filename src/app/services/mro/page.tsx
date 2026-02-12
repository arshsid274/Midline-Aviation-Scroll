import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/pages/ComingSoonPage";

export const metadata: Metadata = {
  title: "MRO Services | Midline Airlines",
  description: "Midline Airlines MRO service page coming soon.",
};

export default function MroPage() {
  return (
    <ComingSoonPage
      title="MRO Services"
      description="Maintenance, repair, and overhaul capabilities, certifications, and service scope are being finalized for publication."
    />
  );
}

