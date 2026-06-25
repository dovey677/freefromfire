import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-8 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-white">
        🔥 Free From Fire
      </Link>
      <div className="flex gap-6">
        <Link href="/" className="text-gray-300 hover:text-orange-500 transition">
          Recipes
        </Link>
        <Link href="/guides" className="text-gray-300 hover:text-orange-500 transition">
          Guides
        </Link>
        <Link href="/base-recipes" className="text-gray-300 hover:text-orange-500 transition">
          Base Recipes
        </Link>
      </div>
    </nav>
  )
}