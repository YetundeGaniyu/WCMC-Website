'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity/image';
import Card from '@/components/ui/Card';
import Pill from '@/components/ui/Pill';
import type { CommunityGroup } from '@/types/sanity';

interface CommunityGroupCardProps {
  group: CommunityGroup;
  isLink?: boolean;
  href?: string;
}

export default function CommunityGroupCard({ group, isLink = false, href }: CommunityGroupCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const cardContent = (
    <>
      {group.image?.asset && (
        <div className="aspect-video bg-gray-100 relative">
          <Image
            src={urlFor(group.image).url()}
            alt={group.image.alt || group.name}
            fill
            className={`object-cover ${isLink ? 'group-hover:scale-105 transition-transform duration-300' : ''}`}
          />
        </div>
      )}
      <div className="p-4 sm:p-6">
        <h3 className="font-serif font-semibold text-lg sm:text-xl text-ink mb-2">{group.name}</h3>
        {group.category && <Pill className="mb-2">{group.category}</Pill>}
        {group.schedule && (
          <p className="font-sans text-gold text-sm mb-2">📅 {group.schedule}</p>
        )}
        {group.description && (
          <div className="mb-4">
            <p className={`font-sans text-ink text-sm ${isExpanded ? '' : 'line-clamp-3'}`}>
              {group.description}
            </p>
            {group.description.length > 100 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-gold text-sm hover:text-gold-light transition-colors mt-1"
              >
                {isExpanded ? 'Read less' : 'Read more'}
              </button>
            )}
          </div>
        )}
        {group.contactEmail && !isLink && (
          <a
            href={`mailto:${group.contactEmail}`}
            className="text-gold text-sm hover:text-gold-light transition-colors"
          >
            Contact group
          </a>
        )}
      </div>
    </>
  );

  if (isLink && href) {
    return (
      <Link href={href} className="group animate-fade-in-up">
        <div className="bg-white shadow-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
          {cardContent}
        </div>
      </Link>
    );
  }

  return <Card className="overflow-hidden">{cardContent}</Card>;
}
