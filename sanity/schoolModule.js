export default {
  name: 'schoolModule',
  title: 'BBQ School Module',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "Module 1: Getting Started"',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Order',
      description: 'Controls the sequence modules appear in (lower numbers first).',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
  ],
}
