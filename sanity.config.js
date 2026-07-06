import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import recipe from './sanity/recipe'
import guide from './sanity/guide'
import baseRecipe from './sanity/baseRecipe'

export default defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  title: 'Free From Fire',
  plugins: [structureTool()],
  schema: {
    types: [recipe, guide, baseRecipe],
  },
})