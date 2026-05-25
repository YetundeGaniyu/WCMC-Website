/**
 * WCMC — Sanity Schema Definitions
 * Drop this into your Sanity Studio at /studio/schemaTypes/index.ts
 * Run: npm create sanity@latest -- --template clean
 */

import { defineField, defineType, defineArrayMember } from 'sanity'

// ─────────────────────────────────────────────
// 1. SITE SETTINGS  (singleton)
// ─────────────────────────────────────────────
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '⚙️',
  // Treat as singleton — only one document of this type
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'churchName',  title: 'Church Name',  type: 'string', initialValue: 'WCMC' }),
    defineField({ name: 'strapline',   title: 'Strapline',    type: 'string', description: 'Shown in hero / meta description' }),
    defineField({ name: 'address',     title: 'Address',      type: 'text',   rows: 3 }),
    defineField({ name: 'phone',       title: 'Phone',        type: 'string' }),
    defineField({ name: 'email',       title: 'General Email', type: 'string' }),
    defineField({
      name: 'social', title: 'Social Links', type: 'object',
      fields: [
        defineField({ name: 'facebook',  type: 'url', title: 'Facebook URL' }),
        defineField({ name: 'instagram', type: 'url', title: 'Instagram URL' }),
        defineField({ name: 'youtube',   type: 'url', title: 'YouTube URL' }),
      ],
    }),
    defineField({
      name: 'coordinates', title: 'Map Coordinates', type: 'object',
      description: 'Used for embedded map on Contact page',
      fields: [
        defineField({ name: 'lat', type: 'number', title: 'Latitude' }),
        defineField({ name: 'lng', type: 'number', title: 'Longitude' }),
      ],
    }),
    defineField({
      name: 'safeguardingOfficerEmail',
      title: 'Safeguarding Officer Email',
      type: 'string',
      description: '⚠️ This is a private routing address. Never displayed publicly.',
    }),
  ],
})

// ─────────────────────────────────────────────
// 2. TEAM MEMBER
// ─────────────────────────────────────────────
export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Members',
  type: 'document',
  icon: () => '👤',
  fields: [
    defineField({ name: 'name',  title: 'Full Name',  type: 'string', validation: R => R.required() }),
    defineField({ name: 'role',  title: 'Role / Title', type: 'string', validation: R => R.required() }),
    defineField({
      name: 'photo', title: 'Photo', type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
    }),
    defineField({ name: 'email', title: 'Contact Email', type: 'string',
      description: 'Shown publicly on the Contact page' }),
    defineField({ name: 'bio',   title: 'Short Bio', type: 'text', rows: 3 }),
    defineField({
      name: 'contactContext', title: 'Contact Context',
      type: 'string',
      description: 'e.g. "All pastoral / general" — shown under email on Contact page',
    }),
    defineField({
      name: 'order', title: 'Display Order', type: 'number',
      description: 'Lower numbers appear first. Minister = 1.',
    }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
})

// ─────────────────────────────────────────────
// 3. EVENT
// ─────────────────────────────────────────────
const eventCategories = [
  { title: 'Sunday Service',   value: 'service'   },
  { title: 'Community Group',  value: 'group'     },
  { title: 'Special Service',  value: 'special'   },
  { title: 'Youth & Families', value: 'youth'     },
  { title: 'Prayer',           value: 'prayer'    },
  { title: 'Social',           value: 'social'    },
  { title: 'Hall Hire',        value: 'hallhire'  },
  { title: 'External',         value: 'external'  },
]

export const event = defineType({
  name: 'event',
  title: 'Events',
  type: 'document',
  icon: () => '📅',
  fields: [
    defineField({ name: 'title',    title: 'Event Title', type: 'string', validation: R => R.required() }),
    defineField({ name: 'slug',     title: 'Slug',        type: 'slug',   options: { source: 'title' } }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: { list: eventCategories, layout: 'radio' },
      validation: R => R.required(),
    }),
    defineField({ name: 'startDateTime', title: 'Start Date & Time', type: 'datetime', validation: R => R.required() }),
    defineField({ name: 'endDateTime',   title: 'End Date & Time',   type: 'datetime' }),
    defineField({
      name: 'isRecurring', title: 'Recurring Event?', type: 'boolean', initialValue: false,
    }),
    defineField({
      name: 'recurrenceRule', title: 'Recurrence (iCal RRULE)',
      type: 'string',
      description: 'e.g. FREQ=WEEKLY;BYDAY=SU — used to generate the iCal feed',
      hidden: ({ document }) => !document?.isRecurring,
    }),
    defineField({ name: 'location',    title: 'Location',    type: 'string', description: 'Room name or external venue' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({
      name: 'image', title: 'Event Image', type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
    }),
    defineField({ name: 'contactEmail', title: 'Contact Email for this Event', type: 'string' }),
    defineField({ name: 'bookingUrl',   title: 'External Booking URL',         type: 'url' }),
    defineField({ name: 'featured',     title: 'Feature on Homepage?',         type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'startDateTime', media: 'image' },
    prepare({ title, subtitle, media }) {
      const date = subtitle ? new Date(subtitle).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }) : 'No date'
      return { title, subtitle: date, media }
    },
  },
})

// ─────────────────────────────────────────────
// 4. SERMON
// ─────────────────────────────────────────────
export const sermon = defineType({
  name: 'sermon',
  title: 'Sermons',
  type: 'document',
  icon: () => '🎙️',
  fields: [
    defineField({ name: 'title',      title: 'Sermon Title',    type: 'string',   validation: R => R.required() }),
    defineField({ name: 'slug',       title: 'Slug',            type: 'slug',     options: { source: 'title' } }),
    defineField({ name: 'date',       title: 'Date Preached',   type: 'date',     validation: R => R.required() }),
    defineField({ name: 'speaker',    title: 'Speaker',         type: 'string' }),
    defineField({ name: 'series',     title: 'Series Name',     type: 'string',   description: 'e.g. "Advent 2025" — groups sermons in the archive' }),
    defineField({ name: 'scripture',  title: 'Scripture Reference', type: 'string', description: 'e.g. "John 3:16–21"' }),
    defineField({
      name: 'audioFile', title: 'Audio File', type: 'file',
      options: { accept: 'audio/*' },
      description: 'MP3 or M4A. This file is also used to build the podcast RSS feed.',
    }),
    defineField({ name: 'audioUrl',   title: 'External Audio URL', type: 'url',
      description: 'Alternative to uploading — paste a SoundCloud/Podbean URL' }),
    defineField({
      name: 'transcript', title: 'Transcript / Notes', type: 'array',
      of: [
        defineArrayMember({ type: 'block' }),        // rich text
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
        }),
      ],
    }),
    defineField({ name: 'thumbnailImage', title: 'Thumbnail', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'notes',      title: 'Internal Notes', type: 'text', description: 'Never shown publicly' }),
  ],
  orderings: [{ title: 'Newest First', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'date', media: 'thumbnailImage' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ?? '', media }
    },
  },
})

// ─────────────────────────────────────────────
// 5. BLOG POST
// ─────────────────────────────────────────────
const postCategories = [
  { title: 'News',          value: 'news'        },
  { title: 'Community',     value: 'community'   },
  { title: 'Faith & Life',  value: 'faith'       },
  { title: 'Youth',         value: 'youth'       },
  { title: 'Announcements', value: 'announcements' },
]

export const post = defineType({
  name: 'post',
  title: 'News & Stories',
  type: 'document',
  icon: () => '📰',
  fields: [
    defineField({ name: 'title',     title: 'Title',      type: 'string', validation: R => R.required() }),
    defineField({ name: 'slug',      title: 'Slug',       type: 'slug',   options: { source: 'title' }, validation: R => R.required() }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: { list: postCategories, layout: 'radio' },
    }),
    defineField({
      name: 'author', title: 'Author',
      type: 'reference', to: [{ type: 'teamMember' }],
    }),
    defineField({ name: 'publishedAt', title: 'Published Date', type: 'date', validation: R => R.required() }),
    defineField({
      name: 'heroImage', title: 'Hero Image', type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text', validation: R => R.required() })],
    }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3,
      description: 'Used in card grid and meta description. ~160 chars.' }),
    defineField({
      name: 'body', title: 'Body', type: 'array',
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({
          type: 'image', options: { hotspot: true },
          fields: [
            defineField({ name: 'alt',     type: 'string', title: 'Alt text' }),
            defineField({ name: 'caption', type: 'string', title: 'Caption'  }),
          ],
        }),
      ],
    }),
    defineField({ name: 'featured', title: 'Feature on Homepage?', type: 'boolean', initialValue: false }),
  ],
  orderings: [{ title: 'Newest First', name: 'publishedDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'publishedAt', media: 'heroImage' },
  },
})

// ─────────────────────────────────────────────
// 6. COMMUNITY GROUP
// ─────────────────────────────────────────────
export const communityGroup = defineType({
  name: 'communityGroup',
  title: 'Community Groups',
  type: 'document',
  icon: () => '🤝',
  fields: [
    defineField({ name: 'name',        title: 'Group Name',   type: 'string', validation: R => R.required() }),
    defineField({ name: 'slug',        title: 'Slug',         type: 'slug', options: { source: 'name' } }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: {
        list: [
          { title: 'Adults',          value: 'adults'   },
          { title: 'Youth & Families',value: 'youth'    },
          { title: 'Prayer',          value: 'prayer'   },
          { title: 'Social Action',   value: 'action'   },
          { title: 'Music',           value: 'music'    },
        ],
      },
    }),
    defineField({ name: 'schedule',    title: 'When They Meet', type: 'string',
      description: 'e.g. "Every Tuesday, 7:30 – 9pm"' }),
    defineField({ name: 'location',    title: 'Location',       type: 'string' }),
    defineField({ name: 'description', title: 'Description',    type: 'text', rows: 4 }),
    defineField({
      name: 'image', title: 'Group Image', type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
    }),
    defineField({ name: 'contactEmail', title: 'Contact Email', type: 'string' }),
    defineField({ name: 'contactName',  title: 'Contact Name',  type: 'string' }),
    defineField({ name: 'open',         title: 'Open to New Members?', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'schedule', media: 'image' },
  },
})

// ─────────────────────────────────────────────
// 7. HALL HIRE ENQUIRY  (write-only from website)
// ─────────────────────────────────────────────
export const hallHireEnquiry = defineType({
  name: 'hallHireEnquiry',
  title: 'Hall Hire Enquiries',
  type: 'document',
  icon: () => '🏛️',
  // Read-only in Studio — submitted via API from contact form
  __experimental_actions: ['update', 'publish', 'delete'],
  fields: [
    defineField({ name: 'name',         title: 'Name',           type: 'string' }),
    defineField({ name: 'email',        title: 'Email',          type: 'string' }),
    defineField({ name: 'phone',        title: 'Phone',          type: 'string' }),
    defineField({ name: 'eventType',    title: 'Event Type',     type: 'string' }),
    defineField({ name: 'preferredDate',title: 'Preferred Date', type: 'date'   }),
    defineField({ name: 'message',      title: 'Message',        type: 'text'   }),
    defineField({ name: 'submittedAt',  title: 'Submitted At',   type: 'datetime' }),
    defineField({ name: 'status',       title: 'Status', type: 'string',
      options: {
        list: [
          { title: '🆕 New',       value: 'new'       },
          { title: '👀 Reviewing', value: 'reviewing' },
          { title: '✅ Confirmed', value: 'confirmed' },
          { title: '❌ Declined',  value: 'declined'  },
        ],
      },
      initialValue: 'new',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'preferredDate' },
  },
})

// ─────────────────────────────────────────────
// 8. HOMEPAGE (singleton — editable hero copy etc.)
// ─────────────────────────────────────────────
export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage Content',
  type: 'document',
  icon: () => '🏠',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'heroHeading',    title: 'Hero Heading',    type: 'string' }),
    defineField({ name: 'heroSubheading', title: 'Hero Subheading', type: 'text', rows: 2 }),
    defineField({
      name: 'heroImage', title: 'Hero Background Image', type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
    }),
    defineField({ name: 'inclusivityStatement', title: 'Inclusivity Statement', type: 'text',
      description: 'The short "All are welcome" band below the hero' }),
    defineField({ name: 'aboutIntro', title: 'About Intro (Homepage teaser)', type: 'text', rows: 3 }),
    defineField({
      name: 'newsletterHeading',    title: 'Newsletter Section Heading', type: 'string',
      initialValue: 'Stay in the loop',
    }),
    defineField({ name: 'newsletterSubheading', title: 'Newsletter Subheading', type: 'string' }),
  ],
})

// ─────────────────────────────────────────────
// ROOT EXPORT  → sanity.config.ts
// ─────────────────────────────────────────────
export const schemaTypes = [
  // Singletons
  siteSettings,
  homepage,
  // Collections
  teamMember,
  event,
  sermon,
  post,
  communityGroup,
  hallHireEnquiry,
]

export const schema = { types: schemaTypes }