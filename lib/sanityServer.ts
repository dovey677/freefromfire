import { createClient } from 'next-sanity'

// Server-only client. Never import this into a 'use client' component —
// it carries a read token that must never reach the browser bundle.
export const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '95tiozfj',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // fresh reads for a token-authenticated request
  token: process.env.SANITY_API_READ_TOKEN,
})
