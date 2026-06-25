import { client } from '../../../lib/sanity'
import Link from 'next/link'

async function getRecipe(slug: string) {
  return client.fetch(
    `*[_type == "recipe" && slug.current == $slug][0]{
      _id,
      title,
      category,
      cookTime,
      prepTime,
      serves,
      allergens,
      glutenFree,
      fireMethod,
      ingredients,
      steps,
      videoUrl,
      "thumbnail": thumbnail.asset->url
    }`,
    { slug }
  )
}

export default async function RecipePage({ params }: any) {
  const { slug } = await params
  const recipe = await getRecipe(slug)

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8 max-w-3xl mx-auto">
      
      <Link href="/" className="inline-flex items-center text-orange-500 hover:text-orange-400 mb-6 transition">
        ← Back to recipes
      </Link>

      {recipe.thumbnail && (
        <img
          src={recipe.thumbnail}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
      )}

      <div className="flex gap-2 mb-4">
        <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">
          {recipe.category}
        </span>
        {recipe.glutenFree && (
          <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">
            Gluten Free
          </span>
        )}
      </div>

      <h1 className="text-4xl font-bold mb-2">{recipe.title}</h1>

      <div className="flex gap-6 text-gray-400 text-sm mb-8">
        {recipe.prepTime && <span>Prep: {recipe.prepTime} mins</span>}
        {recipe.cookTime && <span>Cook: {recipe.cookTime} mins</span>}
        {recipe.serves && <span>Serves: {recipe.serves}</span>}
        {recipe.fireMethod && <span>Method: {recipe.fireMethod}</span>}
      </div>

      {recipe.allergens?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Allergens</h2>
          <div className="flex gap-2 flex-wrap">
            {recipe.allergens.map((allergen: string) => (
              <span key={allergen} className="text-xs bg-red-800 text-white px-2 py-1 rounded-full">
                {allergen}
              </span>
            ))}
          </div>
        </div>
      )}

      {recipe.ingredients?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-gray-300">
                <span className="text-orange-500 mt-1">•</span>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      )}

      {recipe.steps?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Method</h2>
          <ol className="space-y-4">
            {recipe.steps.map((step: string, i: number) => (
              <li key={i} className="flex gap-4 text-gray-300">
                <span className="text-orange-500 font-bold text-lg">{i + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      )}

      {recipe.videoUrl && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Video</h2>
          <iframe
            src={recipe.videoUrl}
            className="w-full aspect-video rounded-xl"
            allowFullScreen
          />
        </div>
      )}

    </main>
  )
}