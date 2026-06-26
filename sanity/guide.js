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
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [{ type: 'text' }],
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