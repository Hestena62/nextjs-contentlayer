import Link from "next/link"
import { Post } from "contentlayer/generated"

interface PostCardProps {
    post: Post
}

export function PostCard({ post }: PostCardProps) {
    return (
        <article
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
            <div className="mt-auto pt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-500">
                <div className="flex items-center gap-2">
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
                <span>Read more →</span>
            </div>
            {post.tags && post.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                        <span key={tag} className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-semibold font-medium text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
                            {tag}
                        </span>
                    ))}
                </div>
            )}
            <Link href={post.slug} className="absolute inset-0">
                <span className="sr-only">View Article</span>
            </Link>
        </article>
    )
}
