import { client } from '../../../lib/sanity'
import Link from 'next/link'

async function getGuide(slug: string) {
  return client.fetch(
    `*[_type == "guide" && slug.current == $slug][0]{
      _id,
      title,
      category,
      difficulty,
      summary,
      steps,
      videoUrl,
      "thumbnail": thumbnail.asset->url
    }`,
    { slug }
  )
}

export default async function GuidePage({ params }: any) {
  const { slug } = await params
  const guide = await getGuide(slug)

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8 max-w-3xl mx-auto">
      <Link href="/guides" className="inline-flex items-center text-orange-500 hover:text-orange-400 mb-6 transition">
        ← Back to guides
      </Link>

      {guide.thumbnail && (
        <img
          src={guide.thumbnail}
          alt={guide.title}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
      )}

      <div className="flex gap-2 mb-4">
        {guide.category && (
          <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">
            {guide.category}
          </span>
        )}
        {guide.difficulty && (
          <span className="text-xs bg-gray-600 text-white px-2 py-1 rounded-full">
            {guide.difficulty}
          </span>
        )}
      </div>

      <h1 className="text-4xl font-bold mb-4">{guide.title}</h1>

      {guide.summary && (
        <p className="text-gray-400 mb-8 text-lg">{guide.summary}</p>
      )}

      {guide.steps?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Steps</h2>
          <ol className="space-y-4">
            {guide.steps.map((step: string, i: number) => (
              <li key={i} className="flex gap-4 text-gray-300">
                <span className="text-orange-500 font-bold text-lg">{i + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      )}

      {guide.videoUrl && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Video</h2>
          <iframe
            src={guide.videoUrl}
            className="w-full aspect-video rounded-xl"
            allowFullScreen
          />
        </div>
      )}
    </main>
  )
}