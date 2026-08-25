'use client'

import { useState } from 'react'
import type { Event } from '@/types/sanity'

interface EventsCalendarProps {
  events: Event[]
}

export default function EventsCalendar({ events }: EventsCalendarProps) {
  const [view, setView] = useState<'list' | 'month'>('list')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = Array.from(new Set(events.map(e => e.category)))

  const filteredEvents = selectedCategory === 'all'
    ? events
    : events.filter(e => e.category === selectedCategory)

  // Helper to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase()
    return { day, month }
  }

  // Helper to format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit' })
  }

  return (
    <div>
      {/* Category filter chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === 'all' ? 'bg-red text-paper' : 'bg-gold-pale text-ink hover:bg-gold/30'
          }`}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category ? 'bg-red text-paper' : 'bg-gold-pale text-ink hover:bg-gold/30'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* List/Month toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setView('list')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            view === 'list' ? 'bg-ink text-paper' : 'bg-gold-pale text-ink hover:bg-gold/30'
          }`}
        >
          List
        </button>
        <button
          onClick={() => setView('month')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            view === 'month' ? 'bg-ink text-paper' : 'bg-gold-pale text-ink hover:bg-gold/30'
          }`}
        >
          Month
        </button>
      </div>

      {/* Events list */}
      {view === 'list' && (
        <div className="space-y-0">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => {
              const { day, month } = formatDate(event.startDateTime)
              const time = formatTime(event.startDateTime)
              const isOnline = event.isOnline || (event.location && /zoom|online/i.test(event.location))

              return (
                <div
                  key={event._id}
                  className={`flex items-start gap-4 py-5 ${
                    index < filteredEvents.length - 1 ? 'border-b border-line-soft' : ''
                  }`}
                >
                  {/* Date badge — calendar icon style */}
                  <div className="flex-shrink-0 w-16 text-center">
                    <div className="bg-red text-paper text-xs font-mono uppercase tracking-widest py-1 rounded-t-md">
                      {month}
                    </div>
                    <div className="bg-paper border border-line-soft text-ink font-serif text-2xl font-bold py-2 rounded-b-md shadow-card">
                      {day}
                    </div>
                  </div>

                  {/* Event details */}
                  <div className="flex-1">
                    <h3 className="font-serif font-semibold text-ink text-lg">{event.title}</h3>
                    <p className="text-ink-muted text-sm mt-1">
                      {isOnline && <span className="mr-1">🎥</span>}
                      {event.location || 'TBD'}
                    </p>
                    <p className="text-ink-muted text-sm">{time}</p>
                    {event.isRecurring && event.recurrenceLabel && (
                      <span className="text-xs text-gold font-semibold flex items-center gap-1 mt-1">
                        🔁 {event.recurrenceLabel}
                      </span>
                    )}
                    {event.isOnline && (
                      <div
                        className="mt-2 bg-blue-50 border border-blue-100 rounded-md px-3 py-2 text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center gap-2 text-blue-700 font-semibold mb-1">
                          <span>📹</span> Online event
                        </div>
                        {event.onlineLink && (
                          <a
                            href={event.onlineLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline hover:text-blue-800 font-semibold block"
                          >
                            Join Zoom Meeting →
                          </a>
                        )}
                        {event.zoomId && (
                          <p className="text-ink-muted text-xs mt-1">
                            Meeting ID: <span className="font-mono font-semibold text-ink">{event.zoomId}</span>
                          </p>
                        )}
                        {event.zoomPassword && (
                          <p className="text-ink-muted text-xs">
                            Passcode: <span className="font-mono font-semibold text-ink">{event.zoomPassword}</span>
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Category pill */}
                  <div className="flex-shrink-0">
                    <span className="bg-gold-pale text-ink-muted text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full">
                      {event.category}
                    </span>
                  </div>
                </div>
              )
            })
          ) : (
            <p className="text-ink-muted text-center py-8">No events found</p>
          )}
        </div>
      )}

      {/* Month view placeholder */}
      {view === 'month' && (
        <div className="text-center py-12">
          <p className="text-ink-muted">Month view coming soon</p>
        </div>
      )}
    </div>
  )
}
