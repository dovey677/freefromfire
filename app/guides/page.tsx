import { serverClient } from '../../lib/sanityServer'
import GuidesClient from './GuidesClient'

export const revalidate = 60

async function getGuides() {
  return serverClient.fetch(
    `*[_type == "guide"]{
      _id,
      title,
      category,
      difficulty,
      summary,
      freeGuide,
      "slug": slug.current,
      thumbnail{
        "url": asset->url,
        hotspot
      }
    }`
  )
}

export default async function GuidesPage() {
  const guides = await getGuides()
  return <GuidesClient initialGuides={guides} />
}