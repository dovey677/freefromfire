export default {
  name: 'schoolLesson',
  title: 'BBQ School Lesson',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Order',
      description: 'Controls the sequence lessons appear in within BBQ School (lower numbers first).',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'module',
      title: 'Module',
      description: 'Which module this lesson belongs to.',
      type: 'reference',
      to: [{ type: 'schoolModule' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'teaser',
      title: 'Teaser',
      description: 'Public-safe preview shown to everyone, including non-payers. Never put full instructions or key techniques here.',
      type: 'text',
    },
    {
      name: 'body',
      title: 'Full Lesson Body',
      description: 'The full lesson content. This must only ever be sent to entitled, logged-in users on the server — never included in any public list query.',
      type: 'text',
    },
    {
      name: 'video',
      title: 'Video (Mux)',
      type: 'object',
      fields: [
        {
          name: 'assetId',
          title: 'Mux Asset ID',
          type: 'string',
        },
        {
          name: 'playbackId',
          title: 'Mux Playback ID',
          type: 'string',
        },
      ],
    },
    {
      name: 'pdf',
      title: 'Lesson PDF',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
    },
    {
      name: 'published',
      title: 'Published',
      description: 'Only published lessons should ever be fetched by the site. Leave unpublished while a lesson is still being built.',
      type: 'boolean',
      initialValue: false,
    },
  ],
}
