import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getAsset } from '../utils/assets'
// import darkmodebutton from '../assets/darkmode-button.svg'

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <div
      className="h-screen w-screen flex flex-col justify-center items-center relative text-white"
      style={{
        backgroundImage: `url(${getAsset('bg-darkmode.png')})`,
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
          className="w-[389px] h-[120px] text-xl font-bold bg-transparent shadow-lg flex items-center justify-center relative overflow-hidden"
          style={{
            backgroundImage: `url(${getAsset('scan.svg')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          onClick={() => navigate('/search-device')}
        >
          <span className="relative z-10">Security Scanning</span>
          <div className="absolute inset-0 bg-teal-700 opacity-0 hover:opacity-30 transition-opacity"></div>
        </button>

        {/* Case Management Button */}
        <button
          className="w-[389px] h-[120px] text-xl font-bold bg-transparent shadow-lg flex items-center justify-center relative overflow-hidden"
          style={{
            backgroundImage: `url(${getAsset('scan.svg')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          onClick={() => navigate('/dashboard')}
        >
          <span className="relative z-10">Case Management</span>
          <div className="absolute inset-0 bg-teal-700 opacity-0 hover:opacity-30 transition-opacity"></div>
        </button>
      </div>

      {/* Dark Mode Toggle */}
      {/* <button
        className="absolute bottom-[52px] left-[52px] flex items-center justify-between w-[143px] h-[50px] px-2 bg-[#091817] text-sm font-bold text-white border border-[#4FD1C5] hover:bg-teal-700 font-roboto"
        onClick={() => console.log('Toggle dark mode')}
      >
        <span>Dark Mode</span>
        <div
          className="w-11 h-10 bg-no-repeat bg-center bg-contain"
          style={{ backgroundImage: `url(${darkmodebutton})` }}
        />
      </button> */}

      {/* OTA Button */}
      <button
        className="absolute bottom-[52px] right-[52px] flex items-center justify-center w-[143px] h-[50px] bg-[#091817] text-sm font-bold text-white border border-[#4FD1C5] hover:bg-teal-700 font-roboto"
        onClick={() => navigate('/ota')}
      >
        <span>OTA</span>
      </button>
    </div>
  )
}

export default HomePage
