'use client'

import type { Event } from '@/types/sanity'

interface FeaturedEventsListProps {
  events: Event[]
}

export default function FeaturedEventsList({ events }: FeaturedEventsListProps) {
  return (
    <div className="space-y-0 divide-y divide-line-soft">
      {events.map((event) => (
        <div
          key={event._id}
          className="flex items-center gap-5 py-5 hover:bg-gold-pale/50 transition-colors px-4 rounded-lg group cursor-pointer"
          onClick={() => window.location.href = '/whats-on'}
        >
          {/* Calendar date badge */}
          <div className="flex-shrink-0 w-14 text-center shadow-card rounded-lg overflow-hidden">
            <div className="bg-red text-paper text-xs font-mono uppercase tracking-widest py-1">
              {new Date(event.startDateTime).toLocaleDateString('en-GB', { month: 'short' })}
            </div>
            <div className="bg-paper border-x border-b border-line-soft text-ink font-serif text-2xl font-bold py-2">
              {new Date(event.startDateTime).getDate()}
            </div>
          </div>

          {/* Event info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-serif font-semibold text-ink group-hover:text-red transition-colors truncate">
              {event.title}
            </h3>
            <p className="text-sm text-ink-muted mt-0.5">
              {new Date(event.startDateTime).toLocaleTimeString('en-GB', {
                hour: '2-digit', minute: '2-digit'
              })}
              {event.location && ` · ${event.location}`}
            </p>
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

          {/* Category + arrow */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <span className="bg-gold-pale text-ink-muted text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full hidden sm:block">
              {event.category}
            </span>
            <span className="text-red text-lg">→</span>
          </div>
        </div>
      ))}
    </div>
  )
}
