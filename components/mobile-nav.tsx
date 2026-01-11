"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function MobileNav() {
    const [isOpen, setIsOpen] = React.useState(false)
    const pathname = usePathname()

    React.useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    return (
        <div className="sm:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-9 h-9 border rounded-md dark:border-slate-800"
                aria-label="Toggle menu"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    )}
                </svg>
            </button>

            {isOpen && (
                <div className="absolute left-0 right-0 top-16 z-50 p-4 border-b border-t border-slate-200 bg-white/95 backdrop-blur-sm dark:bg-slate-950/95 dark:border-slate-800 animate-in slide-in-from-top-2">
                    <nav className="flex flex-col space-y-4">
                        <Link
                            href="/"
                            className="text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className="text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            About
                        </Link>
                        <Link
                            href="/posts"
                            className="text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            Blog
                        </Link>
                    </nav>
                </div>
            )}
        </div>
    )
}
