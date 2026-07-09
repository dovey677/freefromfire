import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import recipe from './sanity/recipe'
import guide from './sanity/guide'
import baseRecipe from './sanity/baserecipe'
import schoolLesson from './sanity/schoolLesson'
import siteSettings from './sanity/siteSettings'
import meatCut from './sanity/meatCut'

export default defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '95tiozfj',
  dataset: 'production',
  title: 'Free From Fire',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) => listItem.getId() !== 'siteSettings'
            ),
          ]),
    }),
  ],
  schema: {
    types: [recipe, guide, baseRecipe, schoolLesson, siteSettings, meatCut],
  },
})
