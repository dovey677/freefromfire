import { client } from '../lib/sanity'
import Link from 'next/link'

async function getRecipes() {
  return client.fetch(`*[_type == "recipe"]{
    _id,
    title,
    category,
    cookTime,
    allergens,
    glutenFree,
    fireMethod,
    freeRecipe,
    "slug": slug.current,
    "thumbnail": thumbnail.asset->url
  }`)
}

export default async function Home() {
  const recipes = await getRecipes()

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-2">Free From Fire</h1>
      <p className="text-gray-400 mb-8">Gluten free BBQ & Baking recipes</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe: any) => (
          <Link key={recipe._id} href={`/recipe/${recipe.slug}`}>
            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition cursor-pointer">
              {recipe.thumbnail && (
                <img 
                  src={recipe.thumbnail} 
                  alt={recipe.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <div className="flex gap-2 mb-2">
                <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">
                  {recipe.category}
                </span>
                {recipe.glutenFree && (
                  <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">
                    GF
                  </span>
                )}
              </div>
              <h2 className="text-xl font-semibold mb-1">{recipe.title}</h2>
              <p className="text-gray-400 text-sm">{recipe.cookTime} mins • {recipe.fireMethod}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}