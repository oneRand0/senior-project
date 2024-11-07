"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import Settings from "./_components/Settings"

export default function Home() {
  const [safeSearch, setSafeSearch] = useLocalStorage("safe_search", false)
  const [searchQuery, setSearchQuery] = useState("")
  const [settingModal, setSettingsModal] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${searchQuery}&safesearch=${safeSearch}`)
    }
  }

  return (
    <>
      {settingModal ? <Settings setSettingsModal={setSettingsModal} /> : null}
      <div className="flex flex-col justify-center items-center h-screen bg-[#1E1E1E]">
        <div className=" self-end m-8" onClick={() => setSettingsModal(true)}>
          Settings
        </div>
        <div className=" flex flex-col justify-center text-center basis-full mb-16">
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
    </>
  )
}
