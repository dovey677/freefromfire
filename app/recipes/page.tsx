import { serverClient } from '../../lib/sanityServer'
import RecipesClient from './RecipesClient'

export const revalidate = 60

async function getRecipes() {
  return serverClient.fetch(
    `*[_type == "recipe"] | order(_createdAt desc) {
      _id,
      title,
      category,
      cookTime,
      allergens,
      glutenFree,
      fireMethod,
      summary,
      freeRecipe,
      "slug": slug.current,
      "thumbnail": thumbnail.asset->url
    }`
  )
}

export default async function RecipesPage() {
  const recipes = await getRecipes()
  return <RecipesClient initialRecipes={recipes} />
}
