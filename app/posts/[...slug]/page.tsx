import { notFound } from "next/navigation"
import { allPosts } from "contentlayer/generated"

import { Metadata } from "next"
import { Mdx } from "@/components/mdx-components"

interface PostProps {
  params: {
    slug: string[]
  }
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/")
  const post = allPosts.find((post) => post.slugAsParams === slug)

  if (!post) {
    null
  }

  return post
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
  }
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }))
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  return (
    <article className="py-6 prose dark:prose-invert mx-auto">
      <div className="mb-6 text-center">
        <div className="mb-2 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {post.readingTime && (
            <>
              <span>•</span>
              <span>{post.readingTime.text}</span>
            </>
          )}
        </div>
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">{post.title}</h1>
        {post.description && (
          <p className="text-xl mt-4 text-slate-600 dark:text-slate-300">
            {post.description}
          </p>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <hr className="my-8 border-slate-200 dark:border-slate-800" />
      <Mdx code={post.body.code} />

      <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
        <h2 className="mb-8 text-2xl font-bold tracking-tight">Read Next</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 not-prose">
          {allPosts
            .filter((p) => p._id !== post._id)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 3)
            .map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
        </div>
      </div>
    </article>
  )
}
