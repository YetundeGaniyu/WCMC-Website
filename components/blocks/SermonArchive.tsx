'use client';

import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';
import Card from '@/components/ui/Card';
import type { Sermon } from '@/types/sanity';

const SERIES = ['All', 'Current Series', 'Past Series'];

export default function SermonArchive({ sermons }: { sermons: Sermon[] }) {
  const [search, setSearch] = useState('');
  const [series, setSeries] = useState('All');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const filteredSermons = sermons.filter((sermon) => {
    const matchesSearch =
      !search ||
      sermon.title.toLowerCase().includes(search.toLowerCase()) ||
      (sermon.speaker && sermon.speaker.toLowerCase().includes(search.toLowerCase())) ||
      (sermon.scripture && sermon.scripture.toLowerCase().includes(search.toLowerCase()));

    const matchesSeries = series === 'All' || (series === 'Current Series' && sermon.series === 'current');

    return matchesSearch && matchesSeries;
  });

  return (
    <div>
      {/* Search Bar */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search sermons..."
        className="w-full px-4 py-3 border border-line-soft rounded-md text-ink placeholder:text-ink-muted focus:outline-none focus:border-gold min-h-[48px] mb-4"
      />

      {/* Series Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {SERIES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSeries(s)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[44px] ${
              series === s
                ? 'bg-gold text-ink'
                : 'bg-gold-pale text-ink hover:bg-gold hover:text-ink'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Sermon Grid */}
      {filteredSermons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSermons.map((sermon) => (
            <Card key={sermon._id} className="p-6">
              {sermon.thumbnailImage && (
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4 relative">
                  <Image
                    src={urlFor(sermon.thumbnailImage).url()}
                    alt={sermon.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <h3 className="font-serif font-semibold text-lg text-ink mb-2">{sermon.title}</h3>
              <p className="font-sans text-gold text-sm mb-1">{sermon.speaker}</p>
              <p className="font-sans text-ink-muted text-sm mb-2">{formatDate(sermon.date)}</p>
              {sermon.scripture && (
                <p className="font-sans text-ink-muted text-xs mb-4 italic">{sermon.scripture}</p>
              )}
              {sermon.audioUrl && (
                <audio
                  controls
                  className="w-full"
                  style={{ height: '40px' }}
                >
                  <source src={sermon.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="font-sans text-ink-muted text-lg">
            {sermons.length === 0 ? 'Sermon recordings coming soon' : 'No sermons match your search'}
          </p>
        </div>
      )}
    </div>
  );
}
