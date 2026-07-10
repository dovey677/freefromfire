import { serverClient } from '../../lib/sanityServer'
import BaseRecipesClient from './BaseRecipesClient'

export const revalidate = 60

async function getBaseRecipes() {
  return serverClient.fetch(
    `*[_type == "baseRecipe"]{
      _id,
      title,
      category,
      summary,
      intro,
      glutenFree,
      allergens,
      freeBaseRecipe,
      "slug": slug.current,
      thumbnail{
        "url": asset->url,
        hotspot
      }
    }`
  )
}

export default async function BaseRecipesPage() {
  const baseRecipes = await getBaseRecipes()
  return <BaseRecipesClient initialBaseRecipes={baseRecipes} />
}