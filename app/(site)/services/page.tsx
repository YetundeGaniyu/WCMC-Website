import { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import { GET_SERMONS } from '@/lib/sanity/queries';
import Card from '@/components/ui/Card';
import SectionHeading from '@/components/ui/SectionHeading';
import SermonArchive from '@/components/blocks/SermonArchive';
import type { Sermon } from '@/types/sanity';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Services & Worship — WCMC',
    description: 'Join us for weekly services, special events, and explore our sermon archive.',
  };
}

export default async function ServicesPage() {
  const sermons = await client.fetch<Sermon[]>(GET_SERMONS);

  return (
    <main className="min-h-screen bg-bg">
      {/* Page Hero */}
      <section className="relative py-16 sm:py-20" style={{ backgroundColor: '#8B1A1A' }}>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif font-semibold text-4xl sm:text-5xl text-paper mb-4">Services & Worship</h1>
          <p className="text-paper/90 text-lg sm:text-xl max-w-2xl">
            Join us as we gather together
          </p>
        </div>
      </section>

      {/* Weekly Service Schedule */}
      <section className="py-12 sm:py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading>Weekly Schedule</SectionHeading>
          <div className="space-y-4">
            <Card className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-serif font-semibold text-xl text-ink mb-1">Sunday Main Service</h3>
                <p className="font-sans text-ink-muted">Worship, teaching, and community</p>
              </div>
              <div className="text-right">
                <p className="font-serif font-semibold text-2xl text-gold">11:00am</p>
                <p className="font-sans text-ink-muted text-sm">Every Sunday</p>
              </div>
            </Card>
            <Card className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-serif font-semibold text-xl text-ink mb-1">Midweek Prayer</h3>
                <p className="font-sans text-ink-muted">A time of prayer and reflection</p>
              </div>
              <div className="text-right">
                <p className="font-serif font-semibold text-2xl text-gold">7:30pm</p>
                <p className="font-sans text-ink-muted text-sm">Every Wednesday</p>
              </div>
            </Card>
            <Card className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-serif font-semibold text-xl text-ink mb-1">Wednesday Club</h3>
                <p className="font-sans text-ink-muted">Community Outreach Program</p>
              </div>
              <div className="text-right">
                <p className="font-serif font-semibold text-2xl text-gold">2:00pm</p>
                <p className="font-sans text-ink-muted text-sm">Every Wednesday</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Special Services */}
      <section className="py-12 sm:py-16 bg-paper">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading>Special Services</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="font-serif font-semibold text-xl text-ink mb-2">Christmas</h3>
              <p className="font-sans text-gold text-sm mb-3">December</p>
              <p className="font-sans text-ink text-sm">
                Join us for our Christmas services, including carols, candlelight, and celebration of the birth of Jesus.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-serif font-semibold text-xl text-ink mb-2">Easter</h3>
              <p className="font-sans text-gold text-sm mb-3">March/April</p>
              <p className="font-sans text-ink text-sm">
                Experience the journey from Palm Sunday through Good Friday to the celebration of Easter Sunday.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-serif font-semibold text-xl text-ink mb-2">Harvest</h3>
              <p className="font-sans text-gold text-sm mb-3">October</p>
              <p className="font-sans text-ink text-sm">
                Give thanks for Gods provision at our annual Harvest celebration and thanksgiving service.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Sermon Archive */}
      <section className="py-12 sm:py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading>Sermon Archive</SectionHeading>
          <SermonArchive sermons={sermons || []} />
        </div>
      </section>
    </main>
  );
}
