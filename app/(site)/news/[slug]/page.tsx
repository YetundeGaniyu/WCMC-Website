import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/lib/sanity/client';
import { GET_POST_BY_SLUG, GET_RELATED_POSTS } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import PortableText from '@/components/ui/PortableText';
import Card from '@/components/ui/Card';
import Pill from '@/components/ui/Pill';
import SectionHeading from '@/components/ui/SectionHeading';
import NewsletterSignup from '@/components/blocks/NewsletterSignup';
import type { Post } from '@/types/sanity';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = await client.fetch<Post[]>(`*[_type == "post" && defined(slug.current)]`);
  return posts.map((post) => ({ slug: post.slug.current }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await client.fetch<Post>(GET_POST_BY_SLUG, { slug: params.slug });

  if (!post) {
    return {
      title: 'Post Not Found — WCMC',
    };
  }

  return {
    title: `${post.title} — WCMC`,
    description: post.excerpt || 'Read this story from West Croydon Methodist Church.',
  };
}

export default async function NewsPostPage({ params }: PageProps) {
  const post = await client.fetch<Post>(GET_POST_BY_SLUG, { slug: params.slug });

  if (!post) {
    return (
      <main className="min-h-screen bg-bg">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="font-sans text-ink-muted">Post not found</p>
          <Link href="/news" className="text-gold hover:text-gold-light">
            ← Back to News
          </Link>
        </div>
      </main>
    );
  }

  const relatedPosts = post.category
    ? await client.fetch<Post[]>(GET_RELATED_POSTS, {
        category: post.category,
        slug: post.slug.current,
      })
    : [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <main className="min-h-screen bg-bg">
      {/* Hero Image */}
      {post.heroImage?.asset && (
        <div className="w-full aspect-video md:aspect-[21/9] bg-gray-100 relative">
          <Image
            src={urlFor(post.heroImage).url()}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {post.category && <Pill className="mb-4">{post.category}</Pill>}
        <h1 className="font-serif font-semibold text-4xl sm:text-5xl text-ink mb-6">{post.title}</h1>

        {/* Author and Date */}
        <div className="flex items-center gap-4 mb-8">
          {post.author?.photo?.asset && (
            <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden relative flex-shrink-0">
              <Image
                src={urlFor(post.author.photo).url()}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div>
            {post.author && <p className="font-sans text-ink font-medium">{post.author.name}</p>}
            <p className="font-sans text-ink-muted text-sm">{formatDate(post.publishedAt)}</p>
          </div>
        </div>

        {/* PortableText Body */}
        {post.body && <PortableText value={post.body} />}
      </article>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="py-12 sm:py-16 bg-paper">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading>Related Stories</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost._id} href={`/news/${relatedPost.slug.current}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    {relatedPost.heroImage?.asset && (
                      <div className="aspect-video bg-gray-100 relative">
                        <Image
                          src={urlFor(relatedPost.heroImage).url()}
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      {relatedPost.category && <Pill className="mb-3">{relatedPost.category}</Pill>}
                      <h3 className="font-serif font-semibold text-xl text-ink mb-2 line-clamp-2">{relatedPost.title}</h3>
                      <p className="font-sans text-gold text-sm mb-2">{formatDate(relatedPost.publishedAt)}</p>
                      {relatedPost.excerpt && (
                        <p className="font-sans text-ink text-sm line-clamp-2">{relatedPost.excerpt}</p>
                      )}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Signup */}
      <section className="py-12 sm:py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterSignup />
        </div>
      </section>
    </main>
  );
}
