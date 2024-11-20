import { useLocalStorage } from "@/hooks/useLocalStorage"
import React, { useState } from "react"

function Settings({ setSettingsModal }: any) {
  const [safeSearch, setSafeSearch] = useLocalStorage("safe_search", 2)
  const [blockedDomains, setBlockedDomains] = useLocalStorage("blocked_domains", [])
  const [inputValue, setInputValue] = useState("")

  const handleInputChange = (e) => {
    const newValue = e.target.value
    setInputValue(newValue)
  }

  const addDomain = () => {
    let temp = [...blockedDomains]

    if (!temp.includes(inputValue)) {
      temp.push(inputValue)
      setBlockedDomains(temp)
      setInputValue("")
    }
  }

  const removeDomain = (index: number) => {
    let temp = [...blockedDomains]
    temp.splice(index, 1)
    setBlockedDomains(temp)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center text-white z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="flex flex-col bg-[#2E2E2E] ring-1 ring-white p-6 rounded-lg shadow-lg z-10 w-2/3 h-2/3 ">
        <button className="bg-[#1B1B1B] hover:bg-white hover:text-black self-end font-semibold px-1 py-2 rounded-md w-10  ring-1 ring-white transition" onClick={() => setSettingsModal(false)}>
          x
        </button>

        <div className="flex flex-row items-center gap-4 mb-8">
          <h1>Safe Search:</h1>
          <div className="flex flex-row text-center">
            <div
              onClick={() => {
                setSafeSearch(2)
              }}
              className={`${safeSearch === 2 ? "bg-white text-black" : "bg-[#1B1B1B]"} self-end font-semibold px-1 py-2 rounded-l-md w-10  ring-1 ring-white`}
            >
              On
            </div>
            <div
              onClick={() => {
                setSafeSearch(0)
              }}
              className={`${safeSearch === 0 ? "bg-white text-black" : "bg-[#1B1B1B]"} self-end font-semibold px-1 py-2 rounded-r-md w-10  ring-1 ring-white`}
            >
              Off
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h1>Blocked Domains</h1>
          <div className="flex flex-row gap-4">
            <input
              id="safeInput"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="w-2/3 px-3 py-2 border rounded-md shadow-sm text-black focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              placeholder="Add a blocked domain EX. google.com"
              aria-describedby="input-error"
            />
            <button onClick={() => addDomain()} className="bg-[#1B1B1B] hover:bg-white hover:text-black self-end font-semibold px-1 py-2 rounded-md w-10  ring-1 ring-white transition">
              +
            </button>
          </div>
          <div className="flex flex-col">
            {blockedDomains.map((link, index) => (
              <div key={index} className={`flex flex-row w-2/3 p-2 justify-between ${index % 2 === 0 ? "bg-[#1B1B1B]" : "bg-[#2E2E2E]"}`}>
                <div>{link}</div>
                <div onClick={() => removeDomain(index)}>Remove</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
