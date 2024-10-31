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
            className="w-10/12 px-4 py-2 bg-gradient-to-b from-[#091817] to-[#0C1612] border border-[#4FD1C5] placeholder-gray-500 text-white"
          />
          <button className="w-3/12 px-6 py-2 border border-y-[#0C9A8D] border-x-[#05564F] bg-gradient-to-b from-[#091817] to-[#0C1612] text-white hover:bg-teal-600">
            Search
          </button>
        </div>
      </div>
    </div>
  )
}

export default CaseManagementDashboard
