import { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import { GET_EVENTS, GET_UPCOMING_EVENTS } from '@/lib/sanity/queries';
import SectionHeading from '@/components/ui/SectionHeading';
import EventsCalendar from '@/components/blocks/EventsCalendar';
import Pill from '@/components/ui/Pill';
import type { Event } from '@/types/sanity';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'What\u2019s On — WCMC',
    description: 'Everything happening at West Croydon Methodist Church — services, events, and community groups.',
  };
}

export default async function WhatsOnPage() {
  const [events, upcomingEvents] = await Promise.all([
    client.fetch<Event[]>(GET_EVENTS, {}, { next: { revalidate: 60 } }),
    client.fetch<Event[]>(GET_UPCOMING_EVENTS, {}, { next: { revalidate: 60 } }),
  ]);

  // Helper to format date badge
  const formatDateBadge = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase();
    return `${day} ${month}`;
  };

  // Helper to format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit' });
  };

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
          <EventsCalendar events={events || []} />
        </div>
      </section>

      {/* Coming Up Section */}
      <section className="py-12 sm:py-16 bg-paper">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading>Coming Up</SectionHeading>
          {upcomingEvents && upcomingEvents.length > 0 ? (
            <div className="space-y-0">
              {upcomingEvents.map((event, index) => (
                <div
                  key={event._id}
                  className={`flex gap-4 py-4 ${
                    index < upcomingEvents.length - 1 ? 'border-b border-line-soft' : ''
                  }`}
                >
                  {/* Date badge */}
                  <div className="flex-shrink-0">
                    <div className="bg-red text-paper rounded-md px-2 py-1 text-center min-w-[48px]">
                      <span className="text-sm font-semibold">{formatDateBadge(event.startDateTime)}</span>
                    </div>
                  </div>
                  {/* Event details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-ink mb-1">{event.title}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-muted">
                      <span>{formatTime(event.startDateTime)}</span>
                      {event.location && <span>• {event.location}</span>}
                    </div>
                    {event.category && (
                      <div className="mt-2">
                        <Pill>{event.category}</Pill>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="font-sans text-ink-muted text-center py-8">No upcoming events — check back soon</p>
          )}
        </div>
      </section>
    </main>
  );
}
