import { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import { GET_POSTS } from '@/lib/sanity/queries';
import SectionHeading from '@/components/ui/SectionHeading';
import NewsFilter from '@/components/blocks/NewsFilter';
import type { Post } from '@/types/sanity';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'News & Stories — WCMC',
    description: 'Stories from our community at West Croydon Methodist Church.',
  };
}

export default async function NewsPage() {
  const posts = await client.fetch<Post[]>(GET_POSTS);

  return (
    <main className="min-h-screen bg-bg">
      {/* Page Hero */}
      <section className="relative py-16 sm:py-20" style={{ backgroundColor: '#8B1A1A' }}>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif font-semibold text-4xl sm:text-5xl text-paper mb-4">News & Stories</h1>
          <p className="text-paper/90 text-lg sm:text-xl max-w-2xl">
            Stories from our community
          </p>
        </div>
      </section>

      {/* News Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading>Latest Stories</SectionHeading>
          <NewsFilter posts={posts || []} />
        </div>
      </section>
    </main>
  );
}
