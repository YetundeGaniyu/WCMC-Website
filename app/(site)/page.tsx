import Link from 'next/link';
import { client } from '@/lib/sanity/client';
import { urlFor } from '@/lib/sanity/image';
import {
  GET_HOMEPAGE,
  GET_FEATURED_EVENTS,
  GET_COMMUNITY_GROUPS,
  GET_LATEST_POSTS,
} from '@/lib/sanity/queries';
import NewsletterSignup from '@/components/blocks/NewsletterSignup';
import type { Homepage, Event, CommunityGroup, Post } from '@/types/sanity';

export default async function HomePage() {
  const [homepage, featuredEvents, communityGroups, latestPosts] = await Promise.all([
    client.fetch<Homepage>(GET_HOMEPAGE),
    client.fetch<Event[]>(GET_FEATURED_EVENTS),
    client.fetch<CommunityGroup[]>(GET_COMMUNITY_GROUPS),
    client.fetch<Post[]>(GET_LATEST_POSTS),
  ]);

  // Helper to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <main className="min-h-screen bg-bg">
      {/* 1. Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        {homepage?.heroImage ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${urlFor(homepage.heroImage).url()})` }}
          />
        ) : (
          <div className="absolute inset-0" style={{ backgroundColor: '#8B1A1A' }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 to-ink/20" />
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-paper mb-6 max-w-3xl">
            {homepage?.heroHeading || 'Welcome to West Croydon Methodist Church'}
          </h1>
          <p className="text-paper/90 text-lg sm:text-xl mb-8 max-w-2xl">
            {homepage?.heroSubheading || 'A warm, welcoming community where everyone belongs.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/visit"
              className="bg-red text-paper rounded-md px-6 py-3 text-base sm:text-lg font-medium hover:bg-red-dark transition-colors text-center min-h-[48px] flex items-center justify-center"
            >
              Plan your visit
            </Link>
            <Link
              href="/whats-on"
              className="border-2 border-paper text-paper rounded-md px-6 py-3 text-base sm:text-lg font-medium hover:bg-paper/10 transition-colors text-center min-h-[48px] flex items-center justify-center"
            >
              What&apos;s on this week
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Inclusivity Strip */}
      <section className="bg-ink text-paper py-6">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-base sm:text-lg mb-4">
            {homepage?.inclusivityStatement || "All are welcome at WCMC — no matter who you are or where you're from."}
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <span className="px-4 py-2 bg-gold text-ink rounded-full text-sm font-medium">Open to all</span>
            <span className="px-4 py-2 bg-gold text-ink rounded-full text-sm font-medium">No experience needed</span>
          </div>
        </div>
      </section>

      {/* 3. What's On Preview */}
      <section className="py-12 sm:py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl text-ink">What&apos;s On</h2>
            <Link href="/whats-on" className="text-gold hover:text-gold-light font-medium">
              See all events →
            </Link>
          </div>
          {featuredEvents && featuredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.map((event) => (
                <Link key={event._id} href={`/whats-on/${event.slug.current}`} className="group">
                  <div className="bg-white shadow-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    {event.image && (
                      <div className="aspect-video bg-gray-100">
                        <img
                          src={urlFor(event.image).url()}
                          alt={event.image.alt || event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-4 sm:p-6">
                      <span className="inline-block px-3 py-1 bg-gold-pale text-ink rounded-full text-xs sm:text-sm mb-3">
                        {event.category}
                      </span>
                      <h3 className="font-serif text-lg text-ink mb-2">{event.title}</h3>
                      <p className="text-ink-muted text-sm">
                        {formatDate(event.startDateTime)} · {formatTime(event.startDateTime)}
                      </p>
                      {event.location && (
                        <p className="text-ink-muted text-sm mt-1">{event.location}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-ink-muted text-center py-8">No featured events right now — check back soon</p>
          )}
        </div>
      </section>

      {/* 4. Community Groups Teaser */}
      <section className="py-12 sm:py-16 bg-paper">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl text-ink">Community Groups</h2>
            <Link href="/community" className="text-gold hover:text-gold-light font-medium">
              Get involved →
            </Link>
          </div>
          {communityGroups && communityGroups.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {communityGroups.map((group) => (
                <Link key={group._id} href={`/community/${group.slug.current}`} className="group">
                  <div className="bg-white shadow-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    {group.image && (
                      <div className="aspect-video bg-gray-100">
                        <img
                          src={urlFor(group.image).url()}
                          alt={group.image.alt || group.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-4 sm:p-6">
                      <h3 className="font-serif text-lg text-ink mb-2">{group.name}</h3>
                      {group.schedule && (
                        <span className="inline-block px-3 py-1 bg-gold-pale text-ink rounded-full text-xs sm:text-sm mb-2">
                          {group.schedule}
                        </span>
                      )}
                      {group.description && (
                        <p className="text-ink-muted text-sm line-clamp-2">{group.description}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-ink-muted text-center py-8">No community groups available yet</p>
          )}
        </div>
      </section>

      {/* 5. Latest News */}
      <section className="py-12 sm:py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl text-ink">Latest News</h2>
            <Link href="/news" className="text-gold hover:text-gold-light font-medium">
              All news & stories →
            </Link>
          </div>
          {latestPosts && latestPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <Link key={post._id} href={`/news/${post.slug.current}`} className="group">
                  <div className="bg-white shadow-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    {post.heroImage && (
                      <div className="aspect-video bg-gray-100">
                        <img
                          src={urlFor(post.heroImage).url()}
                          alt={post.heroImage.alt || post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-4 sm:p-6">
                      {post.category && (
                        <span className="inline-block px-3 py-1 bg-gold-pale text-ink rounded-full text-xs sm:text-sm mb-3">
                          {post.category}
                        </span>
                      )}
                      <h3 className="font-serif text-lg text-ink mb-2">{post.title}</h3>
                      <p className="text-ink-muted text-sm mb-2">
                        {formatDate(post.publishedAt)}
                      </p>
                      {post.author && (
                        <p className="text-ink-muted text-sm">By {post.author.name}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-ink-muted text-center py-8">No news posts yet</p>
          )}
        </div>
      </section>

      {/* 6. Plan Your Visit Teaser */}
      <section className="py-12 sm:py-16 bg-paper">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-ink mb-6">
                Come as you are — here&apos;s what to expect on Sunday
              </h2>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-gold text-xl">✓</span>
                  <span className="text-ink">Warm welcome from our friendly community</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold text-xl">✓</span>
                  <span className="text-ink">Casual dress — come as you are</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold text-xl">✓</span>
                  <span className="text-ink">Kids welcome — we have activities for all ages</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold text-xl">✓</span>
                  <span className="text-ink">Parking available nearby</span>
                </li>
              </ul>
              <Link
                href="/visit"
                className="inline-block bg-red text-paper rounded-md px-6 py-3 text-base sm:text-lg font-medium hover:bg-red-dark transition-colors min-h-[48px] flex items-center"
              >
                Everything you need to know →
              </Link>
            </div>
            <div className="aspect-square bg-gradient-to-br from-red-light to-gold-pale rounded-lg flex items-center justify-center">
              <span className="text-ink-muted text-center px-4">Visit image placeholder</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Newsletter Signup */}
      <section className="py-12 sm:py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterSignup />
        </div>
      </section>
    </main>
  );
}
