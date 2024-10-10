// app/page.tsx

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log(searchQuery)

      router.push(`/search?q=${searchQuery}`)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-[#1E1E1E]">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-8">Proxy Search</h1>
        <form onSubmit={handleSearch}>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="px-6 py-3 w-[800px] text-lg rounded-full bg-[#171717] text-white border-2 border-white focus:outline-none"
            />
            <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 text-white rounded-full hover:bg-white hover:text-black transition">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
