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
      list: ['BBQ', 'Bakes', 'Pizza', 'Sides'],
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
      title: 'Introduction (shown at the top of the recipe, before ingredients)',
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
      list: ['Dairy', 'Eggs', 'Nuts', 'Soya', 'Sesame', 'Wheat'],
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
      name: 'equipment',
      title: 'Equipment',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'ingredientGroups',
      title: 'Ingredient Groups',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'groupTitle',
              title: 'Group Title (e.g. "For the sauce", "For the rub")',
              type: 'string',
            },
            {
              name: 'ingredients',
              title: 'Ingredients',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'quantity',
                      title: 'Quantity (number only, e.g. 3)',
                      type: 'number',
                    },
                    {
                      name: 'unit',
                      title: 'Unit (e.g. g, kg, tbsp, tsp — leave blank for items like "steaks")',
                      type: 'string',
                    },
                    {
                      name: 'name',
                      title: 'Ingredient Name (e.g. ribeye steaks, butter)',
                      type: 'string',
                    },
                  ],
                  preview: {
                    select: {
                      quantity: 'quantity',
                      unit: 'unit',
                      name: 'name',
                    },
                    prepare({ quantity, unit, name }) {
                      return {
                        title: `${quantity || ''} ${unit || ''} ${name || ''}`.trim(),
                      }
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
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