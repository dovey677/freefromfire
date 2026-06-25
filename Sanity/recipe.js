export default {
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Recipe Title',
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
        list: ['BBQ', 'Baking'],
      },
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
      name: 'cookTime',
      title: 'Cook Time (minutes)',
      type: 'number',
    },
    {
      name: 'prepTime',
      title: 'Prep Time (minutes)',
      type: 'number',
    },
    {
      name: 'serves',
      title: 'Serves',
      type: 'number',
    },
    {
      name: 'fireMethod',
      title: 'Fire Method',
      type: 'string',
      options: {
        list: ['Direct', 'Indirect', 'Double Indirect', 'Oven'],
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
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'freeRecipe',
      title: 'Free Recipe (visible without login)',
      type: 'boolean',
      initialValue: false,
    },
  ],
}