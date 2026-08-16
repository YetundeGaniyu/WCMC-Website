import { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import { GET_EVENTS, GET_ALL_COMMUNITY_GROUPS } from '@/lib/sanity/queries';
import SectionHeading from '@/components/ui/SectionHeading';
import EventsBoard from '@/components/blocks/EventsBoard';
import Card from '@/components/ui/Card';
import Pill from '@/components/ui/Pill';
import type { Event, CommunityGroup } from '@/types/sanity';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'What\u2019s On — WCMC',
    description: 'Everything happening at West Croydon Methodist Church — services, events, and community groups.',
  };
}

export default async function WhatsOnPage() {
  const [events, communityGroups] = await Promise.all([
    client.fetch<Event[]>(GET_EVENTS, {}, { next: { revalidate: 60 } }),
    client.fetch<CommunityGroup[]>(GET_ALL_COMMUNITY_GROUPS, {}, { next: { revalidate: 60 } }),
  ]);

  return (
    <main className="min-h-screen bg-bg">
      {/* Page Hero */}
      <section className="relative py-16 sm:py-20" style={{ backgroundColor: '#8B1A1A' }}>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif font-semibold text-4xl sm:text-5xl text-paper mb-4">What&apos;s On</h1>
          <p className="text-paper/90 text-lg sm:text-xl max-w-2xl">
            Everything happening at WCMC
          </p>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading>Upcoming Events</SectionHeading>
          <EventsBoard events={events || []} />
        </div>
      </section>

      {/* Recurring Groups Section */}
      {communityGroups && communityGroups.length > 0 ? (
        <section className="py-12 sm:py-16 bg-paper">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading>Recurring Groups</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {communityGroups.map((group) => (
                <Card key={group._id} className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-serif font-semibold text-xl text-ink">{group.name}</h3>
                    {group.open ? (
                      <Pill>Open</Pill>
                    ) : (
                      <Pill>Full</Pill>
                    )}
                  </div>
                  {group.category && <Pill className="mb-2">{group.category}</Pill>}
                  {group.schedule && (
                    <p className="font-sans text-gold text-sm mb-2">📅 {group.schedule}</p>
                  )}
                  {group.location && (
                    <p className="font-sans text-ink-muted text-sm mb-2">📍 {group.location}</p>
                  )}
                  {group.description && (
                    <p className="font-sans text-ink text-sm mb-4">{group.description}</p>
                  )}
                  {group.contactEmail && (
                    <a
                      href={`mailto:${group.contactEmail}`}
                      className="text-gold text-sm hover:text-gold-light transition-colors"
                    >
                      Contact group
                    </a>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-12 sm:py-16 bg-paper">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading>Recurring Groups</SectionHeading>
            <p className="font-sans text-ink-muted text-center py-8">No recurring groups listed yet</p>
          </div>
        </section>
      )}
    </main>
  );
}
