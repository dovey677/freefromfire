import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '95tiozfj',
    dataset: 'production',
  },
  deployment: {
    appId: 'g0vjmiqggx551svt9p33oq2h',
  },
})