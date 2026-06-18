'use client';

import { useState } from 'react';

const SERIES = ['All', 'Current Series', 'Past Series'];

export default function SermonFilters({
  onSearchChange,
  onSeriesChange,
}: {
  onSearchChange: (value: string) => void;
  onSeriesChange: (value: string) => void;
}) {
  const [search, setSearch] = useState('');
  const [series, setSeries] = useState('All');

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange(value);
  };

  const handleSeriesChange = (value: string) => {
    setSeries(value);
    onSeriesChange(value);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <input
        type="text"
        value={search}
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder="Search sermons..."
        className="w-full px-4 py-3 border border-line-soft rounded-md text-ink placeholder:text-ink-muted focus:outline-none focus:border-gold min-h-[48px]"
      />

      {/* Series Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {SERIES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => handleSeriesChange(s)}
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
    </div>
  );
}
