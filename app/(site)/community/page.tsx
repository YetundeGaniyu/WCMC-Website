import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/lib/sanity/client';
import { GET_ALL_COMMUNITY_GROUPS } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import Card from '@/components/ui/Card';
import Pill from '@/components/ui/Pill';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import PrayerForm from '@/components/blocks/PrayerForm';
import type { CommunityGroup } from '@/types/sanity';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Community & Get Involved — WCMC',
    description: 'Join our community groups, volunteer, give, and get involved at West Croydon Methodist Church.',
  };
}

export default async function CommunityPage() {
  const communityGroups = await client.fetch<CommunityGroup[]>(GET_ALL_COMMUNITY_GROUPS);

  return (
    <main className="min-h-screen bg-bg">
      {/* Page Hero */}
      <section className="relative py-16 sm:py-20" style={{ backgroundColor: '#8B1A1A' }}>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif font-semibold text-4xl sm:text-5xl text-paper mb-4">Community & Get Involved</h1>
          <p className="text-paper/90 text-lg sm:text-xl max-w-2xl">
            Find your place in our community and make a difference
          </p>
        </div>
      </section>

      {/* Community Groups Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading>Community Groups</SectionHeading>
          {communityGroups && communityGroups.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {communityGroups.map((group) => (
                <Card key={group._id} className="overflow-hidden">
                  {group.image && (
                    <div className="aspect-video bg-gray-100 relative">
                      <Image
                        src={urlFor(group.image).url()}
                        alt={group.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-serif font-semibold text-xl text-ink mb-2">{group.name}</h3>
                    {group.category && <Pill className="mb-2">{group.category}</Pill>}
                    {group.schedule && (
                      <p className="font-sans text-gold text-sm mb-2">📅 {group.schedule}</p>
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
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="font-sans text-ink-muted text-center py-8">No community groups listed yet</p>
          )}
        </div>
      </section>

      {/* Volunteering Section */}
      <section className="py-12 sm:py-16 bg-paper">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading>Volunteering</SectionHeading>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="space-y-4 text-ink">
              <p className="font-sans">
                We believe everyone has something to offer. Whether you have a few hours a week or can help occasionally,
                there&apos;s a place for you to serve at WCMC.
              </p>
              <p className="font-sans">
                Opportunities include: welcoming visitors, helping with children&apos;s groups, serving refreshments,
                supporting our music ministry, helping with events, and much more.
              </p>
              <p className="font-sans">
                Volunteering is a great way to get to know people, use your gifts, and make a real difference in our community.
              </p>
              <Link href="/contact">
                <Button>Get in touch about volunteering</Button>
              </Link>
            </div>
            <div className="aspect-square bg-gradient-to-br from-red-light to-gold-pale rounded-lg flex items-center justify-center">
              <span className="text-ink-muted text-center px-4">Volunteering image placeholder</span>
            </div>
          </div>
        </div>
      </section>

      {/* Giving Section */}
      <section className="py-12 sm:py-16 bg-ink">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading className="text-paper">Giving</SectionHeading>
          <p className="font-sans text-paper/90 text-lg mb-8 max-w-2xl mx-auto">
            Your generosity supports our work in the community and helps us share God&apos;s love with others.
          </p>
          <a
            href="https://give.example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-gold text-gold hover:bg-gold hover:text-ink rounded-md px-6 py-3 text-base font-medium transition-colors min-h-[48px]"
          >
            Give Online
          </a>
        </div>
      </section>

      {/* Prayer Requests Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading>Prayer Requests</SectionHeading>
          <p className="font-sans text-ink-muted text-center mb-8 max-w-2xl mx-auto">
            Our prayer team would love to pray for you. Share your prayer request below.
          </p>
          <PrayerForm />
        </div>
      </section>

      {/* Hall Hire Section */}
      <section className="py-12 sm:py-16 bg-paper">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading>Hall Hire</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gold-pale flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="font-serif font-semibold text-lg text-ink mb-2">Capacity</h3>
              <p className="font-sans text-ink text-sm">
                Main hall seats up to 150 people. Smaller rooms available for groups of 10-30.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gold-pale flex items-center justify-center">
                <span className="text-2xl">🎹</span>
              </div>
              <h3 className="font-serif font-semibold text-lg text-ink mb-2">Facilities</h3>
              <p className="font-sans text-ink text-sm">
                Kitchen, toilets, wheelchair access, projector, sound system, and parking available.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gold-pale flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-serif font-semibold text-lg text-ink mb-2">Pricing</h3>
              <p className="font-sans text-ink text-sm">
                Competitive rates for charities and community groups. Contact us for a quote.
              </p>
            </Card>
          </div>
          <div className="text-center">
            <Link href="/contact">
              <Button>Enquire about hall hire</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
