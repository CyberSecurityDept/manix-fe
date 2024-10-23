import React, { useState, useEffect } from 'react'
import '../styles/Checkbox.css'
import { Link } from 'react-router-dom'
import bgImage from '../assets/bg-darkmode.png'
import RemoveModal from '../components/modal/Delete'
import CompleteModal from '../components/modal/Complete'
import AfterCompleteModal from '../components/modal/AfterComplete'
import DeleteProgressModal from '../components/modal/DeleteProgress'
import deviceImage from '../assets/samsung galaxy s24 ultra 5g sm s928 0.jpg'
import backIcon from '../assets/back-Icon.svg'
import overview from '../assets/border/overview-section.svg'
import viewSection from '../assets/border/view-section.svg'
import bgModel from '../assets/border/percentage-section.svg'
import bgBorder from '../assets/border/overview-border.svg'
import bgGood from '../assets/border/percentage-good.svg'
import bgAverage from '../assets/border/percentage-average.svg'
import bgBad from '../assets/border/percentage-bad.svg'
import removeButtonImage from '../assets/border/remove-button.svg'
import completeScanButton from '../assets/border/complete-scan.svg'
import plusSign from '../assets/plus-sign.svg'

const ResultFastScanPage = () => {
  // State for Remove Modal
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)

  // State for Complete Scan Modal
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false)

  // State for After Complete Modal
  const [isAfterCompleteModalOpen, setIsAfterCompleteModalOpen] = useState(false)

  // State for Delete Progress Modal
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false)

  const [selectedView, setSelectedView] = useState(null)
  const [showView, setShowView] = useState(false)
  const [selectAll, setSelectAll] = useState(false)
  const [checkedItems, setCheckedItems] = useState([false, false, false, false, false])
  const [beforePercentage, setBeforePercentage] = useState(null)

  const scanPercentage = 89
  const lastScanPercentage = 89

  // Handlers for Remove Modal
  const openRemoveModal = () => setIsRemoveModalOpen(true)
  const closeRemoveModal = () => setIsRemoveModalOpen(false)

  // Fungsi untuk buka Complete Scan Modal
  const openCompleteModal = () => setIsCompleteModalOpen(true)

  // Fungsi untuk tutup Complete Modal dan buka After Complete Modal
  const handleCompleteConfirm = () => {
    setIsCompleteModalOpen(false) // Tutup modal Complete
    setIsAfterCompleteModalOpen(true) // Buka modal After Complete
  }

  // Tutup modal AfterComplete
  const closeAfterCompleteModal = () => setIsAfterCompleteModalOpen(false)

  const getPercentageStyle = (percentage) => {
    if (percentage >= 90 && percentage <= 98) {
      return {
        backgroundImage: `url(${bgGood})`,
        color: '#0DDF80',
        label: '(Good)'
      }
    } else if (percentage >= 80 && percentage <= 89) {
      return {
        backgroundImage: `url(${bgAverage})`,
        color: '#F3DA00',
        label: '(Average)'
      }
    } else {
      return {
        backgroundImage: `url(${bgBad})`,
        color: '#D3351D',
        label: '(Bad)'
      }
    }
  }

  const percentageStyle = getPercentageStyle(scanPercentage)
  const lastPercentageStyle = getPercentageStyle(lastScanPercentage)

  const handleViewClick = (viewType) => {
    if (selectedView === viewType) {
      setSelectedView(null)
      setShowView(false)
    } else {
      setSelectedView(viewType)
      setShowView(true)
    }
  }

  const handleSelectAllChange = () => {
    const newSelectAll = !selectAll
    setSelectAll(newSelectAll)
    setCheckedItems(checkedItems.map(() => newSelectAll))
  }

  const handleCheckboxChange = (index) => {
    const newCheckedItems = [...checkedItems]
    newCheckedItems[index] = !newCheckedItems[index]
    setCheckedItems(newCheckedItems)
    setSelectAll(newCheckedItems.every((item) => item === true))
  }

  const handleRemoveScanning = () => {
    // Logic when removing items
    setIsRemoveModalOpen(false) // Close modal after confirming
    setIsProgressModalOpen(true)
  }

  const handleProgressComplete = () => {
    setIsProgressModalOpen(false)
    setBeforePercentage(lastScanPercentage)
  }

  useEffect(() => {
    if (beforePercentage !== null) {
      console.log('Before percentage updated:', beforePercentage)
    }
  }, [beforePercentage])

  return (
    <div
      className={`h-screen w-screen flex flex-col justify-center items-center relative font-aldrich`}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >

      {/* Security Percentage Section */}
      <div className="flex flex-col items-center justify-center space-y-2 mt-2 relative">
        <div>
          <h2 className="text-4xl font-bold text-white">Security Percentage</h2>
        </div>
        <div
          className="relative flex items-center justify-center"
          style={{
            color: percentageStyle.color,
            width: '300px',
            height: '180px',
            backgroundImage: percentageStyle.backgroundImage,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-[52px] leading-none">{scanPercentage}%</h2>
            <p className="text-[18px]" style={{ color: percentageStyle.color }}>
              {percentageStyle.label}
            </p>
            {beforePercentage !== null && (
              <p className="text-[16px]" style={{ color: percentageStyle.color }}>
                Before: {beforePercentage}%
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Security Patch, Phone Model, Last Scan Percentage Card */}
      <div
        className="relative w-[1001px] h-[89px] bg-opacity-90 shadow-inner text-center mb-1 p-6"
        style={{
          backgroundImage: `url(${bgModel})`
        }}
      >
        {/* Plus Sign */}
        <img src={plusSign} alt="Plus Sign" className="absolute top-[-12px] left-[-12px] w-6 h-6" />
        <img
          src={plusSign}
          alt="Plus Sign"
          className="absolute bottom-[-12px] right-[-12px] w-6 h-6 "
        />

        <div className="grid grid-cols-3 gap-4 text-white">
          <div>
            <p className="font-semibold text-gray-400">Security Patch</p>
            <p className="text-gray-100 mt-1">2024-08-05</p>
          </div>
          <div>
            <p className="font-semibold text-gray-400">Phone Model</p>
            <p className="text-gray-100 mt-1">Samsung S24 PRO</p>
          </div>
          <div>
            <p className="font-semibold text-gray-400">Last Scan Percentage</p>
            <p
              className="text-green-400 mt-1 font-bold"
              style={{ color: lastPercentageStyle.color }}
            >
              {lastScanPercentage}% {lastPercentageStyle.label}
            </p>
          </div>
        </div>
      </div>

      {!showView ? (
        <div
          className="w-[1000px] h-[450px] p-6 mt-4 shadow-lg text-white bg-opacity-90 relative"
          style={{ backgroundImage: `url(${bgBorder})` }}
        >
          <img
            src={plusSign}
            alt="Plus Sign"
            className="absolute top-[-12px] left-[-12px] w-6 h-6"
          />
          <img
            src={plusSign}
            alt="Plus Sign"
            className="absolute bottom-[-12px] right-[-12px] w-6 h-6"
          />

          <h3 className="text-2xl font-semibold text-gray-100 mb-6 text-center">Overview</h3>

          <div className="grid grid-cols-7">
            <div className="col-span-3 flex justify-center items-center">
              <img src={deviceImage} alt="Phone Model" className="w-[259px] h-auto" />
            </div>

            <div className="col-span-4 space-y-4 p-6">
              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="font-medium text-gray-400">Application</span>
                <span className="text-gray-100">:</span>
                <div className="flex items-center justify-between">
                  <span className="text-gray-100">
                    <span className="text-red-400">1</span>/
                    <span className="text-gray-100">83</span>
                  </span>
                  <button
                    className="text-teal-400 underline"
                    onClick={() => handleViewClick('Application')}
                  >
                    View
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="font-medium text-gray-400">Document</span>
                <span className="text-gray-100">:</span>
                <div className="flex items-center justify-between">
                  <span className="text-gray-100">
                    <span className="text-red-400">42</span>/{' '}
                    <span className="text-gray-100">20581</span>
                  </span>
                  <button
                    className="text-teal-400 underline"
                    onClick={() => handleViewClick('Document')}
                  >
                    View
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="font-medium text-gray-400">Accessibility</span>
                <span className="text-gray-100">:</span>
                <div className="flex items-center justify-between">
                  <span className="text-gray-100">32</span>
                  <button
                    className="text-teal-400 underline"
                    onClick={() => handleViewClick('Accessibility')}
                  >
                    View
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="font-medium text-gray-400">Installer</span>
                <span className="text-gray-100">:</span>
                <div className="flex items-center justify-between">
                  <span className="text-gray-100">32</span>
                  <button
                    className="text-teal-400 underline"
                    onClick={() => handleViewClick('Installer')}
                  >
                    View
                  </button>
                </div>
              </div>

              <div className="border-b border-gray-400 my-4"></div>

              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-400">Threat</span>
                <span className="text-red-500 font-bold animate-blink bg-slate-600">43 Threat</span>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-400">
              Previous scan history found on this device. Would you like to view{' '}
              <Link to="/history" className="text-teal-400 underline">
                History
              </Link>
              ?
            </p>
          </div>
        </div>
      ) : (
        <div className="flex space-x-6 mt-4 w-[1001px]">
          <div
            className="w-[347px] h-[450px] p-4 text-white"
            style={{
              backgroundImage: `url(${overview})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <h3 className="text-2xl font-semibold mb-10">Overview</h3>
            <div className="space-y-10">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Application :</span>
                <div className="flex items-center">
                  <span className="text-gray-100">1/83</span>
                  <button
                    className="ml-4 text-teal-400 underline"
                    onClick={() => handleViewClick('Application')}
                    style={{
                      color: selectedView === 'Application' ? '#05564F' : '#4FD1C5'
                    }}
                  >
                    View
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Document :</span>
                <div className="flex items-center">
                  <span className="text-gray-100">0/23051</span>
                  <button
                    className="ml-4 text-teal-400 underline"
                    onClick={() => handleViewClick('Document')}
                    style={{
                      color: selectedView === 'Document' ? '#05564F' : '#4FD1C5'
                    }}
                  >
                    View
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Accessibility :</span>
                <div className="flex items-center">
                  <span className="text-gray-100">1/83</span>
                  <button
                    className="ml-4 text-teal-400 underline"
                    onClick={() => handleViewClick('Accessibility')}
                    style={{
                      color: selectedView === 'Accessibility' ? '#05564F' : '#4FD1C5'
                    }}
                  >
                    View
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Installer :</span>
                <div className="flex items-center">
                  <span className="text-gray-100">1/83</span>
                  <button
                    className="ml-4 text-teal-400 underline"
                    onClick={() => handleViewClick('Installer')}
                    style={{
                      color: selectedView === 'Installer' ? '#05564F' : '#4FD1C5'
                    }}
                  >
                    View
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 border-t border-gray-700 pt-4">
                <span className="text-gray-400">Threat :</span>
                <span className="text-gray-100">0/20581</span>
              </div>
            </div>
          </div>

          {/* Right Side: View */}
          <div
            className="w-[630px] h-[450px] p-4 bg-gray-800 text-white relative"
            style={{
              backgroundImage: `url(${viewSection})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <h3 className="text-2xl font-semibold mb-4">{selectedView || 'View'}</h3>
            <div className="grid grid-cols-3 bg-[#00B3A2] p-2 text-black font-semibold mb-2">
              <span className="text-start">Date Time</span>
              <span className="text-center">Name</span>
              <div className="flex items-end justify-end">
                {/* Checkbox for select all */}
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    className="custom-checkbox select-all"
                    onChange={handleSelectAllChange}
                    checked={selectAll}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>

            <div className="space-y-1">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 border-b border-[#EAECF0] p-2 text-white"
                >
                  <span>2024-07-06</span>
                  <div className="flex justify-center items-center">
                    <span>msoffice.exe</span>
                  </div>
                  <div className="flex items-end justify-end">
                    {/* Checkbox at table */}
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        className="custom-checkbox"
                        checked={checkedItems[index]}
                        onChange={() => handleCheckboxChange(index)}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-b border-gray-400 mt-7 mb-5"></div>

            <div className="text-right mb-3">
              <button
                className="w-[267px] h-[43px] bg-transparent text-white font-bold relative overflow-hidden"
                style={{
                  backgroundImage: `url(${removeButtonImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
                onClick={openRemoveModal} // Open modal on click
              >
                <span className="relative z-10">DELETE</span>
                <div className="absolute inset-0 bg-red-900 opacity-0 hover:opacity-30 transition-opacity"></div>
              </button>
            </div>

            {/* Remove Modal */}
            {isRemoveModalOpen && (
              <RemoveModal
                onClose={closeRemoveModal}
                onConfirm={handleRemoveScanning}
                onProgressComplete={handleProgressComplete}
              />
            )}

            {/* Modal untuk Progress Hapus */}
            {isProgressModalOpen && (
              <DeleteProgressModal
                onClose={() => setIsProgressModalOpen(false)}
                onProgressComplete={handleProgressComplete} // Pastikan ini adalah fungsi dan diteruskan dengan benar
              />
            )}
          </div>
        </div>
      )}

      <div className="mt-4">
        <button
          className="w-[389px] h-[64px] bg-transparent text-white font-bold"
          style={{
            backgroundImage: `url(${completeScanButton})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          onClick={openCompleteModal}
        >
          COMPLETE SCAN
        </button>

        {/* Complete Modal */}
        {isCompleteModalOpen && (
          <CompleteModal
            onClose={() => setIsCompleteModalOpen(false)}
            onConfirm={handleCompleteConfirm}
          />
        )}

        {/* After Complete Modal */}
        {isAfterCompleteModalOpen && <AfterCompleteModal onClose={closeAfterCompleteModal} />}
      </div>
    </div>
  )
}

export default ResultFastScanPage
