import { Hero } from '@/components/sections/Hero';
import { TechnicalSpecs } from '@/components/sections/TechnicalSpecs';
import { InteriorExperience } from '@/components/sections/InteriorExperience';
import { UnifiedCanvas } from '@/components/canvas/UnifiedCanvas';

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.midlineairlines.com/#organization",
      name: "Midline Airlines",
      url: "https://www.midlineairlines.com",
      logo: "https://www.midlineairlines.com/favicon.ico",
      description:
        "Midline Airlines provides private jet charter, aircraft management, aircraft sales, cargo transportation, and MRO services.",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales and customer support",
          url: "https://www.midlineairlines.com/contact",
          areaServed: "Worldwide",
          availableLanguage: ["English"],
        },
      ],
    },
    {
      "@type": "Airline",
      "@id": "https://www.midlineairlines.com/#airline",
      name: "Midline Airlines",
      url: "https://www.midlineairlines.com",
      description:
        "Luxury aviation services including private jet charter, aircraft management, aircraft sales, cargo transportation, and MRO support.",
      areaServed: "Worldwide",
      parentOrganization: {
        "@id": "https://www.midlineairlines.com/#organization",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Aviation Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Private Jet Charter",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Aircraft Management",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Aircraft Sales",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Cargo Transportation",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "MRO Services",
            },
          },
        ],
      },
    },
  ],
};

export default function Home() {
  return (
    <main className="min-h-[100svh] overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <UnifiedCanvas />

      <div className="relative z-10">
        <Hero />
        <TechnicalSpecs />
        <InteriorExperience />
      </div>

      <section
        id="about"
        aria-labelledby="about-heading"
        className="relative z-10 min-h-[100svh] scroll-mt-24 bg-[radial-gradient(circle_at_15%_20%,rgba(3,97,144,0.35),transparent_40%),radial-gradient(circle_at_85%_80%,rgba(255,255,255,0.14),transparent_42%),#0e152e] px-6 py-20 text-white sm:px-8 md:px-10"
      >
        <div className="mx-auto flex min-h-[calc(100svh-10rem)] max-w-6xl items-center">
          <div className="max-w-4xl">
            <h2 id="about-heading" className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              About Midline Airlines
            </h2>
            <p className="mt-5 text-base text-white/80 sm:text-lg">
              Midline Airlines delivers end-to-end aviation solutions for private, commercial, and cargo clients worldwide. Our integrated charter, management, sales, and MRO teams ensure every mission runs with precision.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <article className="rounded-xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
                <h3 className="text-lg font-semibold">Global Operations</h3>
                <p className="mt-2 text-sm text-white/75">Flight support and logistics across major international routes.</p>
              </article>
              <article className="rounded-xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
                <h3 className="text-lg font-semibold">Safety-Led Execution</h3>
                <p className="mt-2 text-sm text-white/75">Operational planning aligned to strict aviation and maintenance standards.</p>
              </article>
              <article className="rounded-xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
                <h3 className="text-lg font-semibold">Premium Client Experience</h3>
                <p className="mt-2 text-sm text-white/75">Dedicated teams for charter booking, aircraft transactions, and ownership support.</p>
              </article>
              <article className="rounded-xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
                <h3 className="text-lg font-semibold">Integrated Aviation Services</h3>
                <p className="mt-2 text-sm text-white/75">Single partner for charter, management, cargo transportation, and MRO operations.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="min-h-[100svh] scroll-mt-24 flex items-center justify-center text-white relative z-10 bg-[#0e152e] px-6 sm:px-8 md:px-10"
      >
        <div className="text-center">
          <h2 id="contact-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8">Ready to Ascend?</h2>
          <button aria-label="Request a quote from Midline Airlines" className="px-6 py-3 sm:px-8 sm:py-4 bg-[#036190] hover:bg-[#024c73] transition-colors rounded-full text-sm sm:text-base md:text-lg uppercase tracking-[0.18em]">
            Request a Quote
          </button>
        </div>
      </section>
    </main>
  );
}
