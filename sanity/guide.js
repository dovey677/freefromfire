export default {
  name: 'guide',
  title: 'Guide',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Fire Starting', 'Kamado', 'Maintenance', 'Cleaning', 'General Tips'],
      },
    },
    {
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      options: {
        list: ['Beginner', 'Intermediate', 'Advanced'],
      },
    },
    {
      name: 'equipment',
      title: 'Equipment',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'summary',
      title: 'Summary (max 5 lines — shown on the listing card)',
      type: 'text',
      rows: 5,
    },
    {
      name: 'intro',
      title: 'Introduction (shown at the top of the guide, before steps)',
      type: 'array',
      of: [{ type: 'text' }],
    },
    {
      name: 'componentName',
      title: 'Interactive Component (optional)',
      type: 'string',
      options: {
        list: ['HeatZones'],
      },
    },
    {
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Step Text',
              type: 'text',
            },
            {
              name: 'image',
              title: 'Step Image (optional)',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
          preview: {
            select: {
              text: 'text',
              media: 'image',
            },
            prepare({ text, media }) {
              return {
                title: text?.substring(0, 60) || 'Step',
                media,
              }
            },
          },
        },
      ],
    },
    {
      name: 'videoUrl',
      title: 'Video URL (YouTube/Vimeo)',
      type: 'url',
    },
    {
      name: 'freeGuide',
      title: 'Free Guide (visible without login)',
      type: 'boolean',
      initialValue: true,
    },
  ],
}