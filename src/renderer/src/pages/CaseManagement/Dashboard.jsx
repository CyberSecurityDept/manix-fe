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
        <div className="flex w-full max-w-screen-md space-x-2">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-md border border-cyan-400 placeholder-gray-500"
          />
          <button className="px-6 py-2 bg-cyan-600 text-white rounded-md hover:bg-teal-600">
            Search
          </button>
        </div>
      </div>
    </div>
  )
}

export default CaseManagementDashboard
