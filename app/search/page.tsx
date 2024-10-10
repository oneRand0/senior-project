"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"
import Link from "@/node_modules/next/link"

type SearchResult = {
  title: string
  url: string
  content: string
  engine: string
}

export default function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q")
  const page = parseInt(searchParams.get("pageno") || "1")
  const [results, setResults] = useState<SearchResult[]>([])
  const [infoBox, setInfoBox] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log(searchQuery)

      router.push(`/search?q=${searchQuery}&pageno=1`)
    }
  }
  const handlePageChange = (newPage: number) => {
    console.log(newPage)
    router.push(`/search?q=${query}&pageno=${newPage}`)
  }

  useEffect(() => {
    if (query) {
      axios
        .get(`/api/search?q=${query}&pageno=${page}`)
        .then((res) => {
          console.log(res.data)

          setResults(res.data.results)
          setInfoBox(res.data.infoboxes[0])
          setLoading(false)
        })
        .catch((err) => {
          console.error(err)
          setLoading(false)
        })
    }
  }, [query, page])

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white p-8">
      <form onSubmit={handleSearch} className="flex items-center  mb-8">
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

      <h1 className="text-4xl mb-8">Search Results for: {query}</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex gap-8">
          <div className="w-2/3">
            {results.map((result, index) => (
              <div key={index} className="bg-[#171717] border-2 border-white p-4 rounded-lg mb-4 shadow-lg">
                <p className="text-sm text-gray-500 mt-1">{result.url}</p>
                <a href={result.url} className="text-xl font-semibold text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  {result.title}
                </a>
                <p className="mt-2 text-gray-300">{result.content}</p>
                <p className="text-sm text-gray-500 mt-1">Engine: {result.engines.join(", ")}</p>
              </div>
            ))}
          </div>
          {infoBox && infoBox.img_src ? (
            <div className="w-1/3 max-h-fit bg-[#171717] border-2 border-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-center mb-4">
                <img src={infoBox.img_src} alt="Infobox image" className=" object-cover  border-4 border-gray-700" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">{infoBox.infobox}</h2>
              <p className="text-gray-300 mb-4">{infoBox.content}</p>
              {infoBox.attributes &&
                infoBox.attributes.map((attribute) => (
                  <div className="flex flex-row gap-2">
                    <span className="mt-1 font-bold texttext-gray-300">{`${attribute.label}:`}</span>
                    <span className="mt-1 texttext-gray-300">{`${attribute.value}`}</span>
                  </div>
                ))}
              <a href={infoBox.urls[0].url} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                {`Source: ${infoBox.urls[0].title}`}
              </a>
            </div>
          ) : null}
        </div>
      )}

      <div className="mt-8 flex bottom-0 justify-center gap-4">
        <button className="px-4 py-2 bg-gray-700 text-white rounded-full" disabled={page === 1} onClick={() => handlePageChange(page - 1)}>
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-800 text-white rounded-full">Page {page}</span>
        <button className="px-4 py-2 bg-gray-700 text-white rounded-full" onClick={() => handlePageChange(page + 1)}>
          Next
        </button>
      </div>
    </div>
  )
}
