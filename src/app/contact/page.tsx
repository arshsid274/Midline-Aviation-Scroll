import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/pages/ComingSoonPage";

export const metadata: Metadata = {
  title: "Contact | Midline Airlines",
  description: "Get in touch with Midline Airlines. Full Contact page coming soon.",
};

export default function ContactPage() {
  return (
    <ComingSoonPage
      title="Contact Midline Airlines"
      description="Our dedicated contact channels for charter, management, sales, cargo, and MRO inquiries will be available here shortly."
    />
  );
}

