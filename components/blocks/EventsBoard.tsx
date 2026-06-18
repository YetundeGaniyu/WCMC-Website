'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity/image';
import Card from '@/components/ui/Card';
import Pill from '@/components/ui/Pill';
import Button from '@/components/ui/Button';
import type { Event } from '@/types/sanity';

const CATEGORIES = ['All', 'Sunday Service', 'Community Group', 'Special Service', 'Youth & Families', 'Prayer', 'Social'];

export default function EventsBoard({ events }: { events: Event[] }) {
  const [view, setView] = useState<'list' | 'month'>('list');
  const [category, setCategory] = useState('All');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  const filteredEvents = events.filter((event) => {
    if (category === 'All') return true;
    return event.category === category.toLowerCase().replace(' & ', '_').replace(' ', '_');
  });

  const generateICS = () => {
    let icsContent = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//WCMC//Events//EN\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\n';

    filteredEvents.forEach((event) => {
      const startDate = new Date(event.startDateTime);
      const endDate = event.endDateTime ? new Date(event.endDateTime) : new Date(startDate.getTime() + 60 * 60 * 1000); // Default 1 hour

      const formatDateICS = (date: Date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      };

      icsContent += 'BEGIN:VEVENT\n';
      icsContent += `SUMMARY:${event.title}\n`;
      icsContent += `DTSTART:${formatDateICS(startDate)}\n`;
      icsContent += `DTEND:${formatDateICS(endDate)}\n`;
      if (event.location) {
        icsContent += `LOCATION:${event.location}\n`;
      }
      if (event.description) {
        icsContent += `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}\n`;
      }
      icsContent += 'END:VEVENT\n';
    });

    icsContent += 'END:VCALENDAR';

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'wcmc-events.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {/* View Toggle & Category Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        {/* View Toggle */}
        <div className="flex bg-gold-pale rounded-md p-1">
          <button
            type="button"
            onClick={() => setView('list')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors min-h-[44px] ${
              view === 'list' ? 'bg-gold text-ink' : 'text-ink hover:text-gold'
            }`}
          >
            List
          </button>
          <button
            type="button"
            onClick={() => setView('month')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors min-h-[44px] ${
              view === 'month' ? 'bg-gold text-ink' : 'text-ink hover:text-gold'
            }`}
          >
            Month
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors min-h-[40px] ${
                category === cat
                  ? 'bg-gold text-ink'
                  : 'bg-gold-pale text-ink hover:bg-gold hover:text-ink'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Subscribe to Calendar Button */}
      <div className="mb-8">
        <button
          type="button"
          onClick={generateICS}
          className="inline-flex items-center gap-2 border border-red text-red hover:bg-gold-pale rounded-md px-6 py-3 text-base font-medium transition-colors min-h-[48px]"
        >
          <span>📅</span>
          Subscribe to Calendar
        </button>
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className={`grid gap-6 ${view === 'list' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
          {filteredEvents.map((event) => (
            <Card key={event._id} className="overflow-hidden">
              {event.image && (
                <div className="aspect-video bg-gray-100 relative">
                  <Image
                    src={urlFor(event.image).url()}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <Pill className="mb-3">{event.category}</Pill>
                <h3 className="font-serif font-semibold text-xl text-ink mb-2">{event.title}</h3>
                <p className="font-sans text-gold text-sm mb-1">{formatDate(event.startDateTime)}</p>
                <p className="font-sans text-ink-muted text-sm mb-1">{formatTime(event.startDateTime)}</p>
                {event.location && (
                  <p className="font-sans text-ink-muted text-sm mb-4">📍 {event.location}</p>
                )}
                {event.bookingUrl && (
                  <Link href={event.bookingUrl} className="block">
                    <Button className="w-full">Book Now</Button>
                  </Link>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="font-sans text-ink-muted text-lg">
            {events.length === 0 ? 'No events scheduled yet' : 'No events match your filter'}
          </p>
        </div>
      )}
    </div>
  );
}
