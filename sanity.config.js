import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import recipe from './sanity/recipe'
import guide from './sanity/guide'
import baseRecipe from './sanity/baserecipe'
import schoolLesson from './sanity/schoolLesson'

export default defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '95tiozfj',
  dataset: 'production',
  title: 'Free From Fire',
  plugins: [structureTool()],
  schema: {
    types: [recipe, guide, baseRecipe, schoolLesson],
  },
})
