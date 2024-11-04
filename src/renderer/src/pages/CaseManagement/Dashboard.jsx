import React from 'react'
import bgDarkmode from '../../assets/bg-darkmode.png'
import Header from '../../components/Header'
import Navbar from '../../components/NavBar'
// import backIcon from '../../assets/chevronleft.svg'
// import settingsIcon from '../../assets/settings.svg'
// import ActiveButton from '../../assets/navbar-aktif.svg'
// import DeactiveButton from '../../assets/border/button-nonaktif.svg'

const CaseManagementDashboard = () => {
  return (
    <div
      className="case-management-dashboard min-h-screen bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${bgDarkmode})` }}
    >
      {/* Header Section */}
      <Header></Header>

      {/* Main Content Section */}
      <Navbar></Navbar>

      {/* Search Section */}
      <div className="flex justify-center mt-24">
        <div className="flex w-full max-w-screen-sm space-x-2">
          <input
            type="text"
            placeholder="Search..."
            className="w-10/12 px-4 py-2 bg-gradient-to-b from-[#091817] to-[#0C1612] border border-[#4FD1C5] text-white focus:outline-none placeholder-gray-500"
          />
          <button className="w-3/12 px-6 py-2 border border-y-[#0C9A8D] border-x-[#05564F] bg-gradient-to-b from-[#091817] to-[#0C1612] text-white hover:bg-teal-600">
            Search
          </button>
        </div>
      </div>

      {/* Case Section */}
      <div className="flex justify-center mt-10">
        <div className="flex gap-4 w-full max-w-screen-lg">
          {/* Left Section */}
          <div className="grid gap-4 grid-cols-2">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="w-[307px] h-[283px] border border-y-[#0C9A8D] border-x-[#05564F] bg-gradient-to-b from-[#091817] to-[#0C1612]"
              ></div>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex flex-col space-y-4">
            <div className="w-[337px] h-[287px] border border-y-[#0C9A8D] border-x-[#05564F] bg-gradient-to-b from-[#091817] to-[#0C1612]"></div>
            <button className="w-[389px] h-[120px] border border-[#4FD1C5] bg-gradient-to-b from-[#091817] to-[#0C1612] text-white hover:bg-teal-600">
              Add Device
            </button>
            <button className="w-[389px] h-[120px] border border-[#4FD1C5] bg-gradient-to-b from-[#091817] to-[#0C1612] text-white hover:bg-teal-600">
              Add Case
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaseManagementDashboard
