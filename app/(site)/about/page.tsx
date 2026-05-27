import { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import { GET_HOMEPAGE, GET_TEAM_MEMBERS } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import type { Homepage, TeamMember } from '@/types/sanity';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'About Us — WCMC',
    description: 'Learn about West Croydon Methodist Church, our story, our team, and what we believe.',
  };
}

export default async function AboutPage() {
  const [homepage, teamMembers] = await Promise.all([
    client.fetch<Homepage>(GET_HOMEPAGE),
    client.fetch<TeamMember[]>(GET_TEAM_MEMBERS),
  ]);

  // Minister is the team member with order = 1
  const minister = teamMembers?.find((m) => m.order === 1);
  const otherTeam = teamMembers?.filter((m) => m.order !== 1);

  return (
    <main className="min-h-screen bg-bg">
      {/* Page Hero */}
      <section className="py-16 sm:py-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl sm:text-5xl text-ink mb-4">About Us</h1>
          <p className="text-ink-muted text-lg sm:text-xl max-w-2xl">
            A warm, welcoming community of faith in the heart of West Croydon.
          </p>
        </div>
      </section>

      {/* Church Story */}
      <section className="py-12 sm:py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="font-serif text-2xl sm:text-3xl text-ink mb-6">Our Story</h2>
            <div className="prose prose-lg text-ink">
              {homepage?.aboutIntro ? (
                <p className="text-ink mb-4">{homepage.aboutIntro}</p>
              ) : (
                <p className="text-ink mb-4">
                  West Croydon Methodist Church has been serving the local community for over 100 years.
                  We&apos;re a diverse congregation united by our faith and commitment to loving our neighbours.
                  Whether you&apos;re exploring faith for the first time or looking for a church home,
                  you&apos;ll find a warm welcome here.
                </p>
              )}
              <p className="text-ink mb-4">
                We believe in being present in our community — not just on Sundays, but throughout the week.
                From community groups to youth activities, from pastoral care to social justice initiatives,
                we seek to be the hands and feet of Jesus in West Croydon.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Minister Bio Card */}
      {minister && (
        <section className="py-12 sm:py-16 bg-paper">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-card rounded-lg p-6 sm:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              {minister.photo?.asset && (
                <div className="w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 rounded-full bg-gray-100 overflow-hidden">
                  <img
                    src={urlFor(minister.photo).url()}
                    alt={minister.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <h2 className="font-serif text-2xl sm:text-3xl text-ink mb-2">{minister.name}</h2>
                <p className="text-gold text-lg font-medium mb-4">{minister.role}</p>
                {minister.bio && <p className="text-ink mb-4">{minister.bio}</p>}
                {minister.email && (
                  <a
                    href={`mailto:${minister.email}`}
                    className="inline-block bg-red text-paper rounded-md px-6 py-3 text-base font-medium hover:bg-red-dark transition-colors min-h-[48px]"
                  >
                    Contact {minister.name.split(' ')[0]}
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Team Grid */}
      {otherTeam && otherTeam.length > 0 && (
        <section className="py-12 sm:py-16">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl sm:text-3xl text-ink mb-8">Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherTeam.map((member) => (
                <div key={member._id} className="bg-white shadow-card rounded-lg p-6 text-center">
                  {member.photo?.asset ? (
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 overflow-hidden">
                      <img
                        src={urlFor(member.photo).url()}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gold-pale flex items-center justify-center">
                      <span className="text-ink-muted text-sm">No photo</span>
                    </div>
                  )}
                  <h3 className="font-serif text-lg text-ink mb-1">{member.name}</h3>
                  {member.role && (
                    <p className="text-gold text-sm font-medium mb-2">{member.role}</p>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-ink-muted text-sm hover:text-gold transition-colors"
                    >
                      {member.email}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Methodist Beliefs */}
      <section className="py-12 sm:py-16 bg-paper">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="font-serif text-2xl sm:text-3xl text-ink mb-6">What We Believe</h2>
            <div className="space-y-4 text-ink">
              <p>
                As Methodists, we believe in a God of love who is actively involved in the world.
                Our faith is rooted in the Bible and shaped by the Methodist tradition, which emphasises
                personal faith, social justice, and the importance of community.
              </p>
              <p>
                We believe that everyone is made in the image of God and deserves to be treated with
                dignity and respect. We&apos;re committed to working for justice and peace in our world,
                and to caring for God&apos;s creation.
              </p>
              <p>
                We believe in the power of prayer, the importance of worship, and the value of small groups
                for spiritual growth. We believe that faith is a journey, not a destination — and we&apos;re
                all on that journey together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safeguarding Statement */}
      <section className="py-12 sm:py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl bg-gold-pale border-2 border-gold rounded-lg p-6 sm:p-8">
            <h2 className="font-serif text-2xl text-ink mb-4">Safeguarding</h2>
            <p className="text-ink mb-4">
              We take the safety and wellbeing of children, young people, and vulnerable adults very seriously.
              All our volunteers and workers are DBS-checked and trained in safeguarding procedures.
            </p>
            <p className="text-ink mb-6">
              If you have any concerns about safeguarding, please contact our Safeguarding Officer
              or speak to a member of the ministry team.
            </p>
            <a
              href="/contact"
              className="inline-block bg-red text-paper rounded-md px-6 py-3 text-base font-medium hover:bg-red-dark transition-colors min-h-[48px]"
            >
              Contact us about safeguarding
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
