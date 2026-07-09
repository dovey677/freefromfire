import { serverClient } from './sanityServer'

export type Doneness = {
  label: string
  tempC: number
  note?: string
}

export type MeatCut = {
  _id: string
  name: string
  slug: string
  category: string
  notes?: string
  image?: string
  doneness: Doneness[]
}

export async function getMeatCuts(): Promise<MeatCut[]> {
  return serverClient.fetch(
    `*[_type == "meatCut"] | order(order asc, name asc){
      _id,
      name,
      "slug": slug.current,
      category,
      notes,
      "image": image.asset->url,
      doneness[]{ label, tempC, note }
    }`
  )
}
