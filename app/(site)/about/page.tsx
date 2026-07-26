import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/lib/sanity/client';
import { GET_TEAM_MEMBERS, pageImagesQuery } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import Card from '@/components/ui/Card';
import Pill from '@/components/ui/Pill';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import type { TeamMember, PageImages } from '@/types/sanity';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Who We Are — WCMC',
    description: 'Learn about West Croydon Methodist Church, our story, our team, and what we believe.',
  };
}

export default async function AboutPage() {
  const teamMembers = await client.fetch<TeamMember[]>(GET_TEAM_MEMBERS);
  const pageImages = await client.fetch<PageImages>(pageImagesQuery);

  // Minister is the first team member
  const minister = teamMembers?.[0];
  const otherTeam = teamMembers?.slice(1);

  return (
    <main className="min-h-screen bg-bg">
      {/* Page Hero */}
      <section className="relative py-16 sm:py-20" style={{ backgroundColor: '#8B1A1A' }}>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif font-semibold text-4xl sm:text-5xl text-paper mb-4">Who We Are</h1>
          <p className="text-paper/90 text-lg sm:text-xl max-w-2xl">
            A warm, welcoming community of faith in the heart of West Croydon.
          </p>
        </div>
      </section>

      {/* Church Story */}
      <section className="py-12 sm:py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading>Our Story</SectionHeading>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="space-y-4 text-ink">
              <p className="font-sans">
                West Croydon Methodist Church has been serving the local community for over 100 years.
                We&apos;re a diverse congregation united by our faith and commitment to loving our neighbours.
                Whether you&apos;re exploring faith for the first time or looking for a church home,
                you&apos;ll find a warm welcome here.
              </p>
              <p className="font-sans">
                We believe in being present in our community — not just on Sundays, but throughout the week.
                From community groups to youth activities, from pastoral care to social justice initiatives,
                we seek to be the hands and feet of Jesus in West Croydon.
              </p>
              <p className="font-sans">
                Our doors are open to everyone, regardless of background, belief, or circumstance.
                We believe that God&apos;s love is for all people, and we strive to reflect that love
                in everything we do.
              </p>
            </div>
            {pageImages?.aboutPageImage?.asset ? (
              <div className="aspect-square rounded-lg overflow-hidden relative">
                <Image
                  src={urlFor(pageImages.aboutPageImage).url()}
                  alt={pageImages.aboutPageImage.alt || 'Our church'}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-square bg-gradient-to-br from-red-light to-gold-pale rounded-lg flex items-center justify-center">
                <span className="text-ink-muted text-center px-4">Church image placeholder</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Minister Bio Card */}
      {minister && (
        <section className="py-12 sm:py-16">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading>Meet Our Minister</SectionHeading>
            <Card className="p-6 sm:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              {minister.photo?.asset ? (
                <div className="w-40 h-40 sm:w-48 sm:h-48 flex-shrink-0 rounded-full bg-gray-100 overflow-hidden relative">
                  <Image
                    src={urlFor(minister.photo).url()}
                    alt={minister.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-40 h-40 sm:w-48 sm:h-48 flex-shrink-0 rounded-full bg-gold-pale flex items-center justify-center">
                  <span className="text-ink-muted text-sm">No photo</span>
                </div>
              )}
              <div className="flex-1">
                <h2 className="font-serif font-semibold text-2xl sm:text-3xl text-ink mb-2">{minister.name}</h2>
                <Pill className="mb-4">{minister.role}</Pill>
                {minister.bio && <p className="font-sans text-ink mb-4">{minister.bio}</p>}
                {minister.email && (
                  <Link href={`mailto:${minister.email}`}>
                    <Button>Contact {minister.name.split(' ')[0]}</Button>
                  </Link>
                )}
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Full Team Grid */}
      {otherTeam && otherTeam.length > 0 ? (
        <section className="py-12 sm:py-16 bg-paper">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading>Our Team</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherTeam.map((member) => (
                <Card key={member._id} className="p-6 text-center">
                  {member.photo?.asset ? (
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 overflow-hidden relative">
                      <Image
                        src={urlFor(member.photo).url()}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gold-pale flex items-center justify-center">
                      <span className="text-ink-muted text-sm">No photo</span>
                    </div>
                  )}
                  <h3 className="font-serif font-semibold text-lg text-ink mb-1">{member.name}</h3>
                  {member.role && <Pill className="mb-2">{member.role}</Pill>}
                  {member.email && (
                    <Link
                      href={`mailto:${member.email}`}
                      className="text-ink-muted text-sm hover:text-red transition-colors"
                    >
                      {member.email}
                    </Link>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-12 sm:py-16 bg-paper">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading>Our Team</SectionHeading>
            <p className="text-ink-muted text-center py-8">No team members listed yet</p>
          </div>
        </section>
      )}

      {/* Methodist Beliefs */}
      <section className="py-12 sm:py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading>What We Believe</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-pale flex items-center justify-center">
                <span className="text-3xl">🍽️</span>
              </div>
              <h3 className="font-serif font-semibold text-lg text-ink mb-2">Open Table</h3>
              <p className="font-sans text-ink text-sm">
                Everyone is welcome at our table, regardless of background or belief.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-pale flex items-center justify-center">
                <span className="text-3xl">⚖️</span>
              </div>
              <h3 className="font-serif font-semibold text-lg text-ink mb-2">Social Justice</h3>
              <p className="font-sans text-ink text-sm">
                We work for justice, peace, and the wellbeing of all people.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-pale flex items-center justify-center">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="font-serif font-semibold text-lg text-ink mb-2">Inclusive Community</h3>
              <p className="font-sans text-ink text-sm">
                We celebrate diversity and strive to be a place where all belong.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Safeguarding Statement */}
      <section className="py-12 sm:py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl bg-ink border-2 border-gold rounded-lg p-6 sm:p-8">
            <h2 className="font-serif font-semibold text-2xl text-paper mb-4">Safeguarding</h2>
            <p className="font-sans text-paper mb-4">
              We take the safety and wellbeing of children, young people, and vulnerable adults very seriously.
              All our volunteers and workers are DBS-checked and trained in safeguarding procedures.
            </p>
            <p className="font-sans text-paper mb-6">
              If you have any concerns about safeguarding, please contact our Safeguarding Officer
              or speak to a member of the ministry team.
            </p>
            <Link href="/contact">
              <Button>Contact us about safeguarding</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
