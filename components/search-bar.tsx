// components/search-bar.tsx
"use client" // This is required for interactivity

import { useState } from "react"
import { allPosts } from "contentlayer/generated" // Import your data
import Link from "next/link"

export function SearchBar() {
  const [query, setQuery] = useState("")

  // Filter posts based on the search query
  const filteredPosts = allPosts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.description?.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Search articles..."
          className="w-full px-4 py-3 pl-10 text-sm border rounded-full shadow-sm outline-none focus:ring-2 focus:ring-blue-500 border-slate-200 bg-white/50 backdrop-blur-sm dark:bg-slate-900/50 dark:border-slate-800 dark:focus:ring-blue-500 placeholder:text-slate-500"
          onChange={(e) => setQuery(e.target.value)}
        />
        <svg
          className="absolute w-4 h-4 text-slate-500 left-3.5 top-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {query && (
        <ul className="absolute z-10 w-full mt-2 overflow-hidden bg-white border rounded-lg shadow-xl dark:bg-slate-900 border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-top-2">
          {filteredPosts.length === 0 ? (
            <li className="p-4 text-sm text-center text-slate-500">No results found.</li>
          ) : (
            filteredPosts.map((post) => (
              <li key={post._id} className="border-b last:border-0 border-slate-100 dark:border-slate-800">
                <Link
                  href={post.slug}
                  className="block px-4 py-3 text-sm transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <span className="font-medium text-slate-900 dark:text-slate-100">{post.title}</span>
                  {post.description && (
                    <p className="mt-1 text-xs text-slate-500 truncate">{post.description}</p>
                  )}
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
