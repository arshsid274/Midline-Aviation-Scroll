import { Hero } from '@/components/sections/Hero';
import { TechnicalSpecs } from '@/components/sections/TechnicalSpecs';
import { InteriorExperience } from '@/components/sections/InteriorExperience';
import { UnifiedCanvas } from '@/components/canvas/UnifiedCanvas';

export default function Home() {
  return (
    <main className="min-h-screen">
      <UnifiedCanvas />

      <div className="relative z-10">
        <Hero />
        <TechnicalSpecs />
        <InteriorExperience />
      </div>

      {/* Footer or Call to Action can go here */}
      <section className="h-screen flex items-center justify-center text-white relative z-10 bg-[#0e152e]">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Ascend?</h2>
          <button className="px-8 py-4 bg-[#036190] hover:bg-[#024c73] transition-colors rounded-full text-lg uppercase tracking-widest">
            Request a Quote
          </button>
        </div>
      </section>
    </main>
  );
}
