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
          <article
            key={post._id}
            className="group relative flex flex-col space-y-3 rounded-lg border border-slate-200 p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-950"
          >
            <div className="flex flex-col space-y-2">
              <Link href={post.slug} className="font-bold text-xl leading-tight text-slate-900 dark:text-slate-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {post.title}
              </Link>
              {post.description && (
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                  {post.description}
                </p>
              )}
            </div>
            <div className="mt-auto pt-4 flex items-center text-xs text-slate-500 dark:text-slate-500">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="mx-2">•</span>
              <span>Read more →</span>
            </div>
            <Link href={post.slug} className="absolute inset-0">
              <span className="sr-only">View Article</span>
            </Link>
          </article>
        ))}
      </section>
    </div>
  )
}
