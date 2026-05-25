import { SanityImageSource } from '@sanity/image-url';

export interface SiteSettings {
  _id: string;
  _type: 'siteSettings';
  churchName: string;
  strapline?: string;
  address?: string;
  phone?: string;
  email?: string;
  social?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
  safeguardingOfficerEmail?: string;
}

export interface TeamMember {
  _id: string;
  _type: 'teamMember';
  name: string;
  role: string;
  photo?: SanityImageSource;
  email?: string;
  bio?: string;
  contactContext?: string;
  order: number;
}

export interface Event {
  _id: string;
  _type: 'event';
  title: string;
  slug: { current: string };
  category: 'service' | 'group' | 'special' | 'youth' | 'prayer' | 'social' | 'hallhire' | 'external';
  startDateTime: string;
  endDateTime?: string;
  isRecurring: boolean;
  recurrenceRule?: string;
  location?: string;
  description?: string;
  image?: SanityImageSource;
  contactEmail?: string;
  bookingUrl?: string;
  featured: boolean;
}

export interface Sermon {
  _id: string;
  _type: 'sermon';
  title: string;
  slug: { current: string };
  date: string;
  speaker?: string;
  series?: string;
  scripture?: string;
  audioFile?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  audioUrl?: string;
  transcript?: Array<Record<string, unknown>>;
  thumbnailImage?: SanityImageSource;
  notes?: string;
}

export interface Post {
  _id: string;
  _type: 'post';
  title: string;
  slug: { current: string };
  category?: 'news' | 'community' | 'faith' | 'youth' | 'announcements';
  author?: TeamMember;
  publishedAt: string;
  heroImage?: SanityImageSource;
  excerpt?: string;
  body?: Array<Record<string, unknown>>;
  featured: boolean;
}

export interface CommunityGroup {
  _id: string;
  _type: 'communityGroup';
  name: string;
  slug: { current: string };
  category?: 'adults' | 'youth' | 'prayer' | 'action' | 'music';
  schedule?: string;
  location?: string;
  description?: string;
  image?: SanityImageSource;
  contactEmail?: string;
  contactName?: string;
  open: boolean;
}

export interface Homepage {
  _id: string;
  _type: 'homepage';
  heroHeading?: string;
  heroSubheading?: string;
  heroImage?: SanityImageSource;
  inclusivityStatement?: string;
  aboutIntro?: string;
  newsletterHeading?: string;
  newsletterSubheading?: string;
}
