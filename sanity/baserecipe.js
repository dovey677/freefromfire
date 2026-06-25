export default {
  name: 'baseRecipe',
  title: 'Base Recipe',
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
        list: ['Dough', 'Rubs', 'Sauces', 'Marinades', 'Brines', 'Other'],
      },
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
      title: 'Summary',
      type: 'text',
    },
    {
      name: 'glutenFree',
      title: 'Gluten Free',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'allergens',
      title: 'Allergens',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: ['Dairy', 'Eggs', 'Nuts', 'Soya', 'Sesame'],
      },
    },
    {
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [{ type: 'string' }],
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
      name: 'freeBaseRecipe',
      title: 'Free Base Recipe (visible without login)',
      type: 'boolean',
      initialValue: true,
    },
  ],
}