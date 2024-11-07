"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"
import Link from "@/node_modules/next/link"
import { useLocalStorage } from "@/hooks/useLocalStorage"

function ImageResults() {
  const searchParams = useSearchParams()
  const [safeSearch, setSafeSearch] = useLocalStorage("safe_search", false)
  const [blockedDomains, setBlockedDomains] = useLocalStorage("blocked_domains", [])
  const query = searchParams.get("q")
  const router = useRouter()
  const [results, setResults] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState(query.split("/")[0])
  const [loading, setLoading] = useState(true)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log(searchQuery)

      router.push(`/images?q=${searchQuery}`)
    }
  }

  useEffect(() => {
    if (query) {
      axios
        .get(`/api/images?q=${query}&safesearch=${safeSearch}`)
        .then((res) => {
          console.log(res.data)

          const filteredLinks = res.data.results.filter((item) => {
            return !blockedDomains.some((domain) => item.parsed_url[1].includes(domain))
          })
          console.log(filteredLinks)
          setResults(filteredLinks)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [query])

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white">
      <form onSubmit={handleSearch} className="flex items-center sticky top-0 bg-[#1E1E1E] w-full z-10 shadow-lg p-8 mb-4">
        <Link href="/">
          <h1 className="text-xl font-semibold text-white mr-4">Proxy Search</h1>
        </Link>
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="px-6 py-2 w-[500px] text-lg rounded-full bg-[#171717] text-white border border-gray-500 focus:outline-none"
          />
          <button type="submit" className="ml-2 px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition">
            Search
          </button>
        </div>
      </form>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4 m-8">
        {results.map((image, index) => (
          <div key={index} className="relative group cursor-pointers w-fit h-fit overflow-hidden rounded-lg ">
            <div className="aspect-w-16 aspect-h-12 relative">
              <img src={image.img_src || image.thumbnail_src} alt={image.title} className="w-80 h-80 object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
            </div>

            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-sm font-medium truncate">{image.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageResults
