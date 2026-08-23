import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/lib/sanity/client';
import { urlFor } from '@/lib/sanity/image';
import {
  GET_HOMEPAGE,
  GET_FEATURED_EVENTS,
  GET_COMMUNITY_GROUPS,
  GET_LATEST_POSTS,
  pageImagesQuery,
} from '@/lib/sanity/queries';
import NewsletterSignup from '@/components/blocks/NewsletterSignup';
import Reveal from '@/components/ui/Reveal';
import CommunityGroupCard from '@/components/blocks/CommunityGroupCard';
import HeroSlideshow from '@/components/blocks/HeroSlideshow';
import type { Homepage, Event, CommunityGroup, Post, PageImages } from '@/types/sanity';

export default async function HomePage() {
  const [homepage, featuredEvents, communityGroups, latestPosts, pageImages] = await Promise.all([
    client.fetch<Homepage>(GET_HOMEPAGE, {}, { next: { revalidate: 60 } }),
    client.fetch<Event[]>(GET_FEATURED_EVENTS, {}, { next: { revalidate: 60 } }),
    client.fetch<CommunityGroup[]>(GET_COMMUNITY_GROUPS, {}, { next: { revalidate: 60 } }),
    client.fetch<Post[]>(GET_LATEST_POSTS, {}, { next: { revalidate: 60 } }),
    client.fetch<PageImages>(pageImagesQuery, {}, { next: { revalidate: 60 } }),
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

  // Pre-resolve hero gallery URLs for client component
  const heroImages = homepage?.heroGallery?.map((img: any) => ({
    url: urlFor(img).width(1920).height(1080).url(),
    alt: img.alt || ''
  })) || [];

  return (
    <main className="min-h-screen bg-bg">
      {/* 1. Hero Section */}
      {homepage?.heroGallery && homepage.heroGallery.length >= 2 ? (
        <HeroSlideshow
          images={heroImages}
          heading={homepage?.heroHeading || 'Welcome to West Croydon Methodist Church'}
          subheading={homepage?.heroSubheading || 'A warm, welcoming community where everyone belongs.'}
        />
      ) : (
        <section className="relative min-h-[80vh] flex items-center">
          {/* Hero background */}
          {homepage?.heroGallery && homepage.heroGallery.length === 1 ? (
            <div className="absolute inset-0">
              <Image
                src={urlFor(homepage.heroGallery[0]).url()}
                alt={homepage.heroGallery[0].alt || 'Hero image'}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
            </div>
          ) : homepage?.heroImage?.asset ? (
            <div className="absolute inset-0">
              <Image
                src={urlFor(homepage.heroImage).url()}
                alt={homepage.heroImage.alt || 'Hero image'}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-red" />
          )}
          <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h1 className="font-serif text-5xl font-semibold text-white mb-6 max-w-3xl animate-fade-in-up">
              {homepage?.heroHeading || 'Welcome to West Croydon Methodist Church'}
            </h1>
            <p className="text-white/90 text-lg mb-8 max-w-2xl animate-fade-in-up delay-100">
              {homepage?.heroSubheading || 'A warm, welcoming community where everyone belongs.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-200">
              <Link
                href="/visit"
                className="bg-red text-white rounded-md px-6 py-3 text-base sm:text-lg font-medium hover:bg-red-dark transition-colors text-center min-h-[48px] flex items-center justify-center"
              >
                Plan your visit
              </Link>
              <Link
                href="/whats-on"
                className="border-2 border-white text-white rounded-md px-6 py-3 text-base sm:text-lg font-medium hover:bg-white/10 transition-colors text-center min-h-[48px] flex items-center justify-center"
              >
                What&apos;s on this week
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 2. Inclusivity Strip */}
      <section className="bg-ink text-paper py-6">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-base sm:text-lg mb-4">
            {homepage?.inclusivityStatement || "All are welcome at WCMC, no matter who you are or where you're from."}
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <span className="px-4 py-2 bg-gold text-ink rounded-full text-sm font-medium">Open to all</span>
            <span className="px-4 py-2 bg-gold text-ink rounded-full text-sm font-medium">Diverse Congregation</span>
          </div>
        </div>
      </section>

      {/* 3. What's On Preview */}
      <section className="py-12 sm:py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl text-ink">What&apos;s On</h2>
            <Link href="/whats-on" className="text-red hover:text-red-dark font-medium">
              See all events →
            </Link>
          </div>
          {featuredEvents && featuredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.map((event, i) => (
                <Link
                  key={event._id}
                  href={event.slug?.current ? `/whats-on/${event.slug.current}` : '/whats-on'}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  <div className="bg-white shadow-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    {event.image?.asset ? (
                      <div className="aspect-video bg-gray-100">
                        <img
                          src={urlFor(event.image).url()}
                          alt={event.image.alt || event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gold-pale flex items-center justify-center">
                        <span className="text-ink-muted text-sm">No image</span>
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
            <p className="text-ink-muted text-center py-8">No featured events right now. Check back soon</p>
          )}
        </div>
      </section>

      {/* 4. Community Groups Teaser */}
      <section className="py-12 sm:py-16 bg-paper">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl text-ink">Community Groups</h2>
            <Link href="/community" className="text-red hover:text-red-dark font-medium">
              Get involved →
            </Link>
          </div>
          {communityGroups && communityGroups.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {communityGroups.map((group, i) => (
                <div key={group._id} className="animate-fade-in-up" style={{ animationDelay: `${i * 90}ms` }}>
                  <CommunityGroupCard
                    group={group}
                    isLink
                    href={group.slug?.current ? `/community/${group.slug.current}` : '/community'}
                  />
                </div>
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
            <Link href="/news" className="text-red hover:text-red-dark font-medium">
              All news & stories →
            </Link>
          </div>
          {latestPosts && latestPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post, i) => (
                <Link
                  key={post._id}
                  href={post.slug?.current ? `/news/${post.slug.current}` : '/news'}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  <div className="bg-white shadow-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    {post.heroImage?.asset ? (
                      <div className="aspect-video bg-gray-100">
                        <img
                          src={urlFor(post.heroImage).url()}
                          alt={post.heroImage.alt || post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gold-pale flex items-center justify-center">
                        <span className="text-ink-muted text-sm">No image</span>
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
                Come as you are. Here&apos;s what to expect on Sunday
              </h2>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-red text-xl">✓</span>
                  <span className="text-ink">Warm welcome from our friendly community</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red text-xl">✓</span>
                  <span className="text-ink">Casual dress, come as you are</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red text-xl">✓</span>
                  <span className="text-ink">Kids welcome, with activities for all ages</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red text-xl">✓</span>
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
            {pageImages?.homepageVisitImage?.asset ? (
              <div className="aspect-square rounded-lg overflow-hidden relative">
                <Image
                  src={urlFor(pageImages.homepageVisitImage).url()}
                  alt={pageImages.homepageVisitImage.alt || 'Come as you are'}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-square bg-gradient-to-br from-red-light to-gold-pale rounded-lg flex items-center justify-center">
                <span className="text-ink-muted text-center px-4">Visit image placeholder</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. Newsletter Signup */}
      <section className="py-12 sm:py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <NewsletterSignup />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
