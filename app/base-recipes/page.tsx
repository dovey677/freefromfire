import { client } from '../../lib/sanity'
import Link from 'next/link'

async function getBaseRecipes() {
  return client.fetch(`*[_type == "baseRecipe"]{
    _id,
    title,
    category,
    summary,
    glutenFree,
    allergens,
    freeBaseRecipe,
    "slug": slug.current,
    "thumbnail": thumbnail.asset->url
  }`)
}

export default async function BaseRecipesPage() {
  const baseRecipes = await getBaseRecipes()

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-2">Base Recipes</h1>
      <p className="text-gray-400 mb-8">Doughs, rubs, sauces, marinades and more</p>

      {baseRecipes.length === 0 && (
        <p className="text-gray-500">No base recipes yet — check back soon!</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {baseRecipes.map((baseRecipe: any) => (
          <Link key={baseRecipe._id} href={`/base-recipes/${baseRecipe.slug}`}>
            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition cursor-pointer">
              {baseRecipe.thumbnail && (
                <img
                  src={baseRecipe.thumbnail}
                  alt={baseRecipe.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <div className="flex gap-2 mb-2">
                {baseRecipe.category && (
                  <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">
                    {baseRecipe.category}
                  </span>
                )}
                {baseRecipe.glutenFree && (
                  <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">
                    GF
                  </span>
                )}
              </div>
              <h2 className="text-xl font-semibold mb-2">{baseRecipe.title}</h2>
              {baseRecipe.summary && (
                <p className="text-gray-400 text-sm line-clamp-2">{baseRecipe.summary}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}