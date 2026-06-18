import { Metadata } from 'next';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Plan Your Visit — WCMC',
    description: 'Everything you need to know before visiting West Croydon Methodist Church on Sunday.',
  };
}

export default function VisitPage() {
  return (
    <main className="min-h-screen bg-bg">
      {/* Page Hero */}
      <section className="relative py-16 sm:py-20" style={{ backgroundColor: '#8B1A1A' }}>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif font-semibold text-4xl sm:text-5xl text-paper mb-4">Plan Your Visit</h1>
          <p className="text-paper/90 text-lg sm:text-xl max-w-2xl">
            Everything you need to know before Sunday
          </p>
        </div>
      </section>

      {/* Sunday Service Times */}
      <section className="py-16 sm:py-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading>Sunday Services</SectionHeading>
          <div className="my-8">
            <p className="font-serif font-semibold text-5xl sm:text-6xl text-ink mb-4">11:00am</p>
            <p className="font-sans text-ink-muted text-lg">Every Sunday</p>
          </div>
          <address className="not-italic text-ink">
            <p>West Croydon Methodist Church</p>
            <p>93 London Road</p>
            <p>West Croydon, CR0 2RF</p>
          </address>
        </div>
      </section>

      {/* What to Expect - 4 Steps */}
      <section className="py-12 sm:py-16 bg-paper">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading>What to Expect</SectionHeading>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-pale flex items-center justify-center">
                <span className="text-3xl">🚪</span>
              </div>
              <h3 className="font-serif font-semibold text-lg text-ink mb-2">Arrive</h3>
              <p className="font-sans text-ink text-sm">
                Come as you are. No dress code.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-pale flex items-center justify-center">
                <span className="text-3xl">👋</span>
              </div>
              <h3 className="font-serif font-semibold text-lg text-ink mb-2">Welcome</h3>
              <p className="font-sans text-ink text-sm">
                Friendly greeters at the door.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-pale flex items-center justify-center">
                <span className="text-3xl">🙏</span>
              </div>
              <h3 className="font-serif font-semibold text-lg text-ink mb-2">Worship</h3>
              <p className="font-sans text-ink text-sm">
                Singing, prayer, and a message.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-pale flex items-center justify-center">
                <span className="text-3xl">☕</span>
              </div>
              <h3 className="font-serif font-semibold text-lg text-ink mb-2">Stay for Coffee</h3>
              <p className="font-sans text-ink text-sm">
                Meet the community after service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility Info */}
      <section className="py-12 sm:py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading>Accessibility</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-pale flex items-center justify-center">
                <span className="text-3xl">🔊</span>
              </div>
              <h3 className="font-serif font-semibold text-lg text-ink mb-2">Hearing Loop</h3>
              <p className="font-sans text-ink text-sm">
                Induction loop available in the main hall.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-pale flex items-center justify-center">
                <span className="text-3xl">♿</span>
              </div>
              <h3 className="font-serif font-semibold text-lg text-ink mb-2">Step-Free Access</h3>
              <p className="font-sans text-ink text-sm">
                Full wheelchair accessibility throughout.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-pale flex items-center justify-center">
                <span className="text-3xl">🅿️</span>
              </div>
              <h3 className="font-serif font-semibold text-lg text-ink mb-2">Parking Available</h3>
              <p className="font-sans text-ink text-sm">
                Free parking on Sundays nearby.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Kids & Young People */}
      <section className="py-12 sm:py-16 bg-paper">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading>Kids & Young People</SectionHeading>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="space-y-4 text-ink">
              <p className="font-sans">
                Children are welcome at WCMC! We have age-appropriate groups during the service:
              </p>
              <ul className="space-y-2 font-sans">
                <li className="flex items-start gap-3">
                  <span className="text-gold text-xl">•</span>
                  <span><strong>Toddlers (0-3):</strong> Crèche with toys and activities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold text-xl">•</span>
                  <span><strong>Primary (4-11):</strong> Fun, interactive Bible teaching</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold text-xl">•</span>
                  <span><strong>Youth (12+):</strong> Discussion and activities for teens</span>
                </li>
              </ul>
              <p className="font-sans">
                All our children&apos;s workers are DBS-checked and trained in safeguarding.
                Kids join the main service for the first 15 minutes, then go to their groups.
              </p>
            </div>
            <div className="aspect-square bg-gradient-to-br from-red-light to-gold-pale rounded-lg flex items-center justify-center">
              <span className="text-ink-muted text-center px-4">Kids image placeholder</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact a Welcomer */}
      <section className="py-12 sm:py-16 bg-ink">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif font-semibold text-2xl sm:text-3xl text-paper mb-4">
            Have questions before you visit?
          </h2>
          <p className="font-sans text-paper/90 text-lg mb-8 max-w-2xl mx-auto">
            Our team is happy to help with any questions you might have about coming to WCMC.
          </p>
          <Link href="mailto:info@wcmc.org.uk">
            <Button>Email us</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
