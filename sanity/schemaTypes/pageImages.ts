/**
 * WCMC — Page Images Schema
 * Separate schema for page-specific images
 */

import { defineField, defineType } from 'sanity'

export const pageImages = defineType({
  name: 'pageImages',
  title: 'Page Images',
  type: 'document',
  icon: () => '🖼️',
  // Singleton intent: only one document of this type (enforce via Studio structure)
  fields: [
    defineField({
      name: 'aboutPageImage',
      title: 'About Page Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
      description: 'Image shown in the church story section on the About page',
    }),
    defineField({
      name: 'visitPageImage',
      title: 'Visit Page Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
      description: 'Image shown in the kids and young people section on the Visit page',
    }),
    defineField({
      name: 'communityPageImage',
      title: 'Community Page Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
      description: 'Image shown in the volunteering section on the Community page',
    }),
  ],
  preview: {
    select: {
      title: "'Page Images'",
    },
    prepare({ title }) {
      return { title }
    },
  },
})
