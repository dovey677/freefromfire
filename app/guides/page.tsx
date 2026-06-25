import { client } from '../../lib/sanity'
import Link from 'next/link'

async function getGuides() {
  return client.fetch(`*[_type == "guide"]{
    _id,
    title,
    category,
    difficulty,
    summary,
    freeGuide,
    "slug": slug.current,
    "thumbnail": thumbnail.asset->url
  }`)
}

export default async function GuidesPage() {
  const guides = await getGuides()

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-2">Guides & Tips</h1>
      <p className="text-gray-400 mb-8">Fire starting, kamado tips, maintenance and more</p>

      {guides.length === 0 && (
        <p className="text-gray-500">No guides yet — check back soon!</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide: any) => (
          <Link key={guide._id} href={`/guides/${guide.slug}`}>
            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition cursor-pointer">
              {guide.thumbnail && (
                <img
                  src={guide.thumbnail}
                  alt={guide.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <div className="flex gap-2 mb-2">
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
              <h2 className="text-xl font-semibold mb-2">{guide.title}</h2>
              {guide.summary && (
                <p className="text-gray-400 text-sm line-clamp-2">{guide.summary}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}