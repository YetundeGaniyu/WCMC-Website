'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity/image';
import type { TeamMember } from '@/types/sanity';

interface TeamMemberCardProps {
  member: TeamMember;
  isFeatured?: boolean;
}

export default function TeamMemberCard({ member, isFeatured = false }: TeamMemberCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`bg-paper rounded-2xl shadow-card border border-line-soft overflow-hidden p-4 ${
        isFeatured ? 'max-w-sm mx-auto' : ''
      }`}
    >
      {/* Photo with red border frame */}
      {member.photo?.asset ? (
        <div className="border-4 border-red rounded-xl overflow-hidden">
          <div className="relative w-full aspect-[3/4]">
            <Image
              src={urlFor(member.photo).url()}
              alt={member.name}
              fill
              className="object-cover object-top"
            />
          </div>
        </div>
      ) : (
        <div className="border-4 border-red rounded-xl overflow-hidden">
          <div className="w-full aspect-[3/4] bg-gold-pale flex items-center justify-center">
            <span className="text-ink-muted text-sm">No photo</span>
          </div>
        </div>
      )}

      {/* Text content */}
      <h3 className="font-serif font-semibold text-lg text-ink text-center mt-3">{member.name}</h3>
      {member.role && (
        <p className="text-gold font-semibold text-sm text-center">{member.role}</p>
      )}
      {member.bio && (
        <p className={`text-ink-muted text-sm text-center mt-2 ${isExpanded ? '' : 'line-clamp-3'}`}>
          {member.bio}
        </p>
      )}

      {/* View Profile / Close button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-red text-sm font-semibold text-center flex items-center justify-center gap-1 mt-3 hover:underline w-full"
      >
        {isExpanded ? (
          <>
            Close
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </>
        ) : (
          <>
            View Profile
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </>
        )}
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-line-soft text-center">
          {member.email && (
            <Link
              href={`mailto:${member.email}`}
              className="text-gold text-sm hover:text-gold-light transition-colors block mb-2"
            >
              {member.email}
            </Link>
          )}
          {member.contactContext && (
            <p className="text-ink-muted text-sm">{member.contactContext}</p>
          )}
        </div>
      )}
    </div>
  );
}
