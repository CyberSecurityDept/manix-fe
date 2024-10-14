// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import './home.css'
// import bgImage from '../assets/bg-darkmode.svg'

// const HomePage = () => {
//   const [darkMode, setDarkMode] = useState(false)
//   const navigate = useNavigate()

//   return (
//     <div
//       className={`h-screen w-screen transition-colors duration-300 p-8 flex flex-col justify-center items-center relative`}
//       style={{
//         backgroundImage: `url(${bgImage})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center'
//       }} // Mengatur background
//     >
//       {/* Dark mode toggle */}
//       <div className="absolute top-4 right-4 flex items-center">
//         <span className="mr-2 text-white">Dark mode</span>
//         <input
//           type="checkbox"
//           className="toggle-checkbox"
//           onChange={() => setDarkMode(!darkMode)}
//         />
//       </div>

//       {/* Security scanning and Court case buttons */}
//       <div className="flex flex-col space-y-8 items-center">
//         <button
//           className="w-[628px] h-[208px] text-white text-2xl font-semibold rounded-xl bg-gray-300 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 border border-gray-100 hover:bg-opacity-60 transition-all duration-300"
//           onClick={() => navigate('/search-device')}
//         >
//           Security Scanning
//         </button>

//         <button
//           className="w-[628px] h-[208px] text-white text-2xl font-semibold rounded-xl bg-gray-300 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 border border-gray-100 hover:bg-opacity-60 transition-all duration-300"
//           onClick={() => console.log('Navigasi ke Court Case')}
//         >
//           Case Management
//         </button>
//       </div>

//       {/* OTA button */}
//       <div
//         className="absolute w-[165px] h-[71px] rounded-xl p-[3px] bg-gradient-to-r from-blue-500 to-blue-950 shadow-lg"
//         style={{ bottom: '32px', right: '32px' }} // Posisi tombol OTA di bawah
//       >
//         <button
//           className="w-full h-full bg-gray-800 text-white font-bold text-xl rounded-lg hover:bg-gray-700 transition-all duration-300"
//           onClick={() => console.log('Navigasi ke halaman OTA')}
//         >
//           OTA
//         </button>
//       </div>
//     </div>
//   )
// }

// export default HomePage

import React from 'react'
import { useNavigate } from 'react-router-dom'
import bgDarkmode from '../assets/bg-darkmode.svg'
import buttonScan from '../assets/Scan.svg'

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <div
      className="h-screen w-screen flex flex-col justify-center items-center relative text-white"
      style={{
        backgroundImage: `url(${bgDarkmode})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Title Section */}
      <h1 className="text-3xl font-semibold mb-4 font-aldrich">What would you like to do?</h1>
      <p className="mb-8 font-aldrich">
        <span
          className="text-teal-400 cursor-pointer hover:underline"
          onClick={() => navigate('/search-device')}
        >
          Security Scanning
        </span>{' '}
        to protect your data, or{' '}
        <span
          className="text-teal-400 cursor-pointer hover:underline"
          onClick={() => navigate('/case-management')}
        >
          Court Case
        </span>{' '}
        to manage and track your cases?
      </p>

      {/* Buttons Section */}
      <div className="flex space-x-8 font-aldrich">
        {/* Security Scanning Button */}
        <button
          className="w-[389px] h-[120px] text-xl font-bold bg-transparent  shadow-lg flex items-center justify-center relative overflow-hidden"
          style={{
            backgroundImage: `url(${buttonScan})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          onClick={() => navigate('/search-device')}
        >
          <span className="relative z-10">Security Scanning</span>
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-teal-700 opacity-0 hover:opacity-30 transition-opacity"></div>
        </button>

        {/* Case Management Button */}
        <button
          className="w-[389px] h-[120px] text-xl font-bold bg-transparent  shadow-lg flex items-center justify-center relative overflow-hidden"
          style={{
            backgroundImage: `url(${buttonScan})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          onClick={() => navigate('/case-management')}
        >
          <span className="relative z-10">Case Management</span>
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-teal-700 opacity-0 hover:opacity-30 transition-opacity"></div>
        </button>
      </div>

      {/* Dark Mode Toggle (Bottom Left Corner) */}
      <button
        className="absolute bottom-[52px] left-[52px] w-[143px] h-[50px] text-sm font-bold text-white border border-[#4FD1C5]  hover:bg-teal-700 font-helvetica"
        onClick={() => console.log('Toggle dark mode')}
      >
        <span>🌙 Dark Mode</span>
      </button>
    </div>
  )
}

export default HomePage
