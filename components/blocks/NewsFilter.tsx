'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity/image';
import Card from '@/components/ui/Card';
import Pill from '@/components/ui/Pill';
import type { Post } from '@/types/sanity';

const CATEGORIES = ['All', 'News', 'Community', 'Faith & Life', 'Youth', 'Announcements'];

export default function NewsFilter({ posts }: { posts: Post[] }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      !search ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = category === 'All' || post.category === category.toLowerCase().replace(' & ', '_').replace(' ', '_');

    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div>
      {/* Search Bar */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search stories..."
        className="w-full px-4 py-3 border border-line-soft rounded-md text-ink placeholder:text-ink-muted focus:outline-none focus:border-gold min-h-[48px] mb-4"
      />

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[44px] ${
              category === cat
                ? 'bg-gold text-ink'
                : 'bg-gold-pale text-ink hover:bg-gold hover:text-ink'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link key={post._id} href={`/news/${post.slug.current}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                {post.heroImage && (
                  <div className="aspect-video bg-gray-100 relative">
                    <Image
                      src={urlFor(post.heroImage).url()}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  {post.category && <Pill className="mb-3">{post.category}</Pill>}
                  <h3 className="font-serif font-semibold text-xl text-ink mb-2 line-clamp-2">{post.title}</h3>
                  <p className="font-sans text-gold text-sm mb-2">{formatDate(post.publishedAt)}</p>
                  {post.author && <p className="font-sans text-ink-muted text-sm mb-2">By {post.author.name}</p>}
                  {post.excerpt && (
                    <p className="font-sans text-ink text-sm line-clamp-2">{post.excerpt}</p>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="font-sans text-ink-muted text-lg">
            {posts.length === 0 ? 'No stories published yet' : 'No stories match your search'}
          </p>
        </div>
      )}
    </div>
  );
}
