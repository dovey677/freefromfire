import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: '95tiozfj',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})