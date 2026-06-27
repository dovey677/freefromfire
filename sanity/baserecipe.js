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
      name: 'servesCount',
      title: 'Makes (number)',
      type: 'number',
    },
    {
      name: 'servesLabel',
      title: 'Makes (label, e.g. "pizza bases", "300g dough balls")',
      type: 'string',
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
              title: 'Group Title (e.g. "For the poolish", "For the dough")',
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
                      title: 'Quantity',
                      type: 'number',
                    },
                    {
                      name: 'unit',
                      title: 'Unit (e.g. g, ml, tsp — leave blank for items like "eggs")',
                      type: 'string',
                    },
                    {
                      name: 'name',
                      title: 'Ingredient Name',
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
      name: 'freeBaseRecipe',
      title: 'Free Base Recipe (visible without login)',
      type: 'boolean',
      initialValue: true,
    },
  ],
}