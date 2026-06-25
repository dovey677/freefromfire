import { client } from '../../../lib/sanity'
import Link from 'next/link'

async function getBaseRecipe(slug: string) {
  return client.fetch(
    `*[_type == "baseRecipe" && slug.current == $slug][0]{
      _id,
      title,
      category,
      summary,
      glutenFree,
      allergens,
      ingredients,
      steps,
      videoUrl,
      "thumbnail": thumbnail.asset->url
    }`,
    { slug }
  )
}

export default async function BaseRecipePage({ params }: any) {
  const { slug } = await params
  const baseRecipe = await getBaseRecipe(slug)

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8 max-w-3xl mx-auto">
      <Link href="/base-recipes" className="inline-flex items-center text-orange-500 hover:text-orange-400 mb-6 transition">
        ← Back to base recipes
      </Link>

      {baseRecipe.thumbnail && (
        <img
          src={baseRecipe.thumbnail}
          alt={baseRecipe.title}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
      )}

      <div className="flex gap-2 mb-4">
        {baseRecipe.category && (
          <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">
            {baseRecipe.category}
          </span>
        )}
        {baseRecipe.glutenFree && (
          <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">
            Gluten Free
          </span>
        )}
      </div>

      <h1 className="text-4xl font-bold mb-4">{baseRecipe.title}</h1>

      {baseRecipe.summary && (
        <p className="text-gray-400 mb-8 text-lg">{baseRecipe.summary}</p>
      )}

      {baseRecipe.allergens?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Allergens</h2>
          <div className="flex gap-2 flex-wrap">
            {baseRecipe.allergens.map((allergen: string) => (
              <span key={allergen} className="text-xs bg-red-800 text-white px-2 py-1 rounded-full">
                {allergen}
              </span>
            ))}
          </div>
        </div>
      )}

      {baseRecipe.ingredients?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
          <ul className="space-y-2">
            {baseRecipe.ingredients.map((ingredient: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-gray-300">
                <span className="text-orange-500 mt-1">•</span>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      )}

      {baseRecipe.steps?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Method</h2>
          <ol className="space-y-4">
            {baseRecipe.steps.map((step: string, i: number) => (
              <li key={i} className="flex gap-4 text-gray-300">
                <span className="text-orange-500 font-bold text-lg">{i + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      )}

      {baseRecipe.videoUrl && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Video</h2>
          <iframe
            src={baseRecipe.videoUrl}
            className="w-full aspect-video rounded-xl"
            allowFullScreen
          />
        </div>
      )}
    </main>
  )
}