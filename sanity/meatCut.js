export default {
  name: 'meatCut',
  title: 'Meat Cut (Temperature Guide)',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Cut Name (e.g. Ribeye Steak, Pork Shoulder)',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Beef', 'Pork', 'Lamb', 'Poultry', 'Fish & Seafood', 'Game'],
      },
    },
    {
      name: 'image',
      title: 'Image (optional)',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'notes',
      title: 'Notes (e.g. "Rest 10 minutes before slicing")',
      type: 'text',
      rows: 2,
    },
    {
      name: 'restRiseC',
      title: 'Expected Rest Rise (°C, optional)',
      description:
        'How many degrees this cut typically climbs after removal from heat, while resting. Leave blank to use the default (3°C). Thick roasts and large joints rise more (4–6°C); thin steaks and quick cooks rise less (1–2°C).',
      type: 'number',
    },
    {
      name: 'doneness',
      title: 'Doneness Levels',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label (e.g. Rare, Medium, Pulled, Sliced)',
              type: 'string',
            },
            {
              name: 'tempC',
              title: 'Target Temp (°C)',
              type: 'number',
            },
            {
              name: 'note',
              title: 'Short note (optional, e.g. "Pull at this temp, rest, then shred")',
              type: 'string',
            },
          ],
          preview: {
            select: {
              label: 'label',
              tempC: 'tempC',
            },
            prepare({ label, tempC }) {
              return {
                title: `${label || 'Doneness'} — ${tempC != null ? tempC + '°C' : '?'}`,
              }
            },
          },
        },
      ],
    },
    {
      name: 'order',
      title: 'Display Order (optional — lower numbers show first)',
      type: 'number',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image',
    },
  },
}
