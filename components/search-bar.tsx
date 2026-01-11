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
    <div className="relative w-full max-w-md mb-8">
      <input
        type="text"
        placeholder="Search articles..."
        className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && (
        <ul className="absolute z-10 w-full mt-2 bg-white border rounded-md shadow-lg dark:bg-slate-900 dark:border-slate-700 max-h-60 overflow-auto">
          {filteredPosts.length === 0 ? (
            <li className="p-2 text-sm text-gray-500">No results found.</li>
          ) : (
            filteredPosts.map((post) => (
              <li key={post._id} className="border-b last:border-0 border-gray-100 dark:border-gray-800">
                <Link href={post.slug} className="block p-2 hover:bg-gray-100 dark:hover:bg-slate-800">
                  <span className="font-medium">{post.title}</span>
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
