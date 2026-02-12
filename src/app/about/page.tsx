import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/pages/ComingSoonPage";

export const metadata: Metadata = {
  title: "About | Midline Airlines",
  description: "Learn more about Midline Airlines. Full About page coming soon.",
};

export default function AboutPage() {
  return (
    <ComingSoonPage
      title="About Midline Airlines"
      description="Our detailed company profile, leadership overview, and aviation mission are being finalized. This page will be published soon."
    />
  );
}

