import { allPosts } from "contentlayer/generated"
import Link from "next/link"
import { SearchBar } from "@/components/search-bar"

export default function Home() {
  const posts = allPosts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return (
    <div className="space-y-12">
      <section className="flex flex-col items-center text-center space-y-6 py-12 md:py-20 lg:py-24">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          Simplify your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Knowledge</span>
        </h1>
        <p className="max-w-[700px] text-lg text-slate-600 dark:text-slate-400 md:text-xl">
          Beautifully designed content to help you build faster and learn better. Explore our latest guides and articles.
        </p>
        <div className="w-full max-w-sm sm:max-w-md">
          <SearchBar />
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </section>
    </div>
  )
}
