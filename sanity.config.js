import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import recipe from './sanity/recipe'

export default defineConfig({
  projectId: '95tiozfj',
  dataset: 'production',
  title: 'Free From Fire',
  plugins: [structureTool()],
  schema: {
    types: [recipe],
  },
})