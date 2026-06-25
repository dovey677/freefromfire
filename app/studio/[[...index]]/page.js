'use client'

import { NextStudio } from 'next-sanity/studio'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import recipe from '../../../sanity/recipe'

const config = defineConfig({
  projectId: '95tiozfj',
  dataset: 'production',
  title: 'Free From Fire',
  plugins: [structureTool()],
  schema: {
    types: [recipe],
  },
})

export default function StudioPage() {
  return <NextStudio config={config} />
}