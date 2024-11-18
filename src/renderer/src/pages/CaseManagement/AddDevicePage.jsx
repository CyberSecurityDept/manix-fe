import React, { useState } from 'react'
import bgDarkmode from '../../assets/bg-darkmode.png'
import headerImage from '../../assets/Header.png'
import backIcon from '../../assets/chevronleft.svg'
import plusSign from '../../assets/plus-sign.svg'
import deviceImage from '../../assets/device.svg'
import chevronDownIcon from '../../assets/chevron-down.svg'

const AddDevicePage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedPerson, setSelectedPerson] = useState('Pick Person')

  const people = [
    { name: 'Arlene McCoy', case: 'Pembobolan ATM BCA Simatupang' },
    { name: 'Albert Flores', case: 'Pembobolan ATM BCA Simatupang' },
    { name: 'Jane Cooper', case: 'Pembobolan ATM BCA Simatupang' },
    { name: 'Kristin Watson', case: 'Pembobolan ATM BCA Simatupang' },
    { name: 'Marvin McKinney', case: 'Pembobolan ATM BCA Simatupang' }
  ]

  const handleSelectPerson = (personName) => {
    setSelectedPerson(personName)
    setIsDropdownOpen(false)
  }

  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat bg-center font-aldrich"
      style={{ backgroundImage: `url(${bgDarkmode})` }}
    >
      {/* Header Section */}
      <div className="relative">
        <img src={headerImage} alt="Header" className="w-full h-[85px] object-cover" />
        <h1 className="absolute left-1/2 transform -translate-x-1/2 top-6 text-3xl text-white tracking-widest uppercase">
          Add Device
        </h1>
        <button className="absolute top-16 left-6 flex items-center">
          <img src={backIcon} alt="Back" className="w-16 h-16" />
        </button>
      </div>

      {/* Main Content Section */}
      <div className="flex items-center justify-center mt-44">
        <div className="flex gap-8 w-full max-w-6xl">
          {/* Left Section */}
          <div className="flex-1 relative">
            {/* Plus Sign at the border */}
            <img
              src={plusSign}
              alt="Plus Sign"
              className="absolute top-[-12px] left-[-12px] w-6 h-6"
            />
            <img
              src={plusSign}
              alt="Plus Sign"
              className="absolute bottom-[-11px] right-[-11px] w-6 h-6"
            />

            <div className="w-full h-[540px] max-h-[540px] border border-y-[#0C9A8D] border-x-[#05564F] bg-gradient-to-b from-[#091817] to-[#0C1612] text-white flex flex-col items-center justify-center p-4">
              {/* Content for Left Section */}
              <div className="text-center">
                <span className="text-3xl">Serial Number</span>
                <div className="mt-2 text-2xl">-</div>
              </div>

              {/* Gambar Device */}
              <img
                src={deviceImage}
                alt="Device"
                className="w-[250px] h-[160px] object-contain mb-4"
              />

              {/* Status Box */}
              <div className="w-[382px] mt-6 p-4 border border-y-[#0C9A8D] border-x-[#05564F] bg-gradient-to-b from-[#091817] to-[#0C1612] text-white text-center">
                <div className="text-lg mb-2">Status</div>
                <div className="mt-1 text-lg">Cable: not connected</div>
                <div className="mt-1 text-lg">ADB: not connected</div>
                <div className="mt-4 text-lg">Please Connect the phone</div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col flex-1 space-y-4">
            {/* Add Person Section */}
            <div className="flex-1 p-8 border border-y-[#0C9A8D] border-x-[#05564F] bg-gradient-to-b from-[#091817] to-[#0C1612] text-white flex flex-col items-center justify-center relative">
              <span className="text-2xl mb-2">Add Person</span>
              <button
                className="w-full px-4 py-2 bg-transparent border border-[#4FD1C5] text-white text-lg flex justify-between items-center"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {selectedPerson}
                <img
                  src={chevronDownIcon}
                  alt="Chevron Down"
                  className={`w-8 h-8 transition-transform duration-300 ${
                    isDropdownOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full mt-2 w-full p-8 bg-gradient-to-b from-[#091817] to-[#0C1612] shadow-lg z-10 border border-y-[#0C9A8D] border-x-[#05564F]">
                  <div className="relative flex items-center justify-between mb-4">
                    {/* Search Input */}
                    <div className="flex items-center w-full max-w-sm border border-[#4FD1C5] rounded px-3 py-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="white"
                        className="w-5 h-5 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                        />
                      </svg>
                      <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-transparent flex-1 text-white placeholder-gray-500 focus:outline-none"
                      />
                    </div>

                    {/* Add New Button */}
                    <button className="ml-4 text-[#4FD1C5] font-semibold hover:underline">
                      Add new
                    </button>
                  </div>

                  <div className="h-64 overflow-y-auto custom-scrollbar">
                    {people
                      .filter((person) => person.name.toLowerCase().includes(search.toLowerCase()))
                      .map((person, index) => (
                        <div
                          key={index}
                          className="py-2 border-b border-[#4FD1C5] cursor-pointer"
                          onClick={() => handleSelectPerson(person.name)}
                        >
                          <p className="text-white font-semibold">{person.name}</p>
                          <p className="text-[#4FD1C5] text-sm">Case: {person.case}</p>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Add Case Section */}
            <div className="flex-1 p-8 border border-y-[#0C9A8D] border-x-[#05564F] bg-gradient-to-b from-[#091817] to-[#0C1612] text-white flex flex-col items-center justify-center">
              <span className="text-2xl mb-2">Add Case</span>
              <select className="w-full px-4 py-2 bg-transparent border border-[#4FD1C5] text-white text-lg">
                <option>Pick Case</option>
                <option>Case 1</option>
                <option>Case 2</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddDevicePage
