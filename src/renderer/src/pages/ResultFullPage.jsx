import { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import bgImage from '../assets/bg-darkmode.png'
import plusSign from '../assets/plus-sign.svg'
import RemoveModal from '../components/modal/Delete'
import CompleteModal from '../components/modal/AfterComplete'
import DeleteProgressModal from '../components/modal/DeleteProgress'
import removeButtonImage from '../assets/border/remove-button.svg'
import completeScanButton from '../assets/border/complete-scan.svg'
import noMalwareImage from '../assets/no-malware3.jpg'

// Mengambil BASE_URL dari environment variables
const BASE_URL = import.meta.env.VITE_BASE_URL
const DEVICE_INFO_ENDPOINT = '/v1/simplify-get-info'
const FULLSCAN_ACTIVITIES_ENDPOINT = '/v1/fullscan-activities'
const DELETE_MALWARE_ENDPOINT = '/v1/delete-malware'

const ResultFullPage = () => {
  // State for modals
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false)
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false)

  // State to store device info
  const [deviceInfo, setDeviceInfo] = useState({ phone_model: '', security_patch: '' })

  // State to store activities
  const [activities, setActivities] = useState([])

  // State for loading
  const [loading, setLoading] = useState(true)

  // Fetch device info from API
  useEffect(() => {
    const fetchDeviceInfo = async () => {
      try {
        const response = await fetch(`${BASE_URL}${DEVICE_INFO_ENDPOINT}`)
        const data = await response.json()
        if (data.status === 'success') {
          setDeviceInfo(data.data)
        } else {
          console.error('Failed to fetch device info:', data.message)
        }
      } catch (error) {
        console.error('Error fetching device info:', error)
      }
    }

    const fetchFullScanActivities = async () => {
      try {
        const response = await fetch(`${BASE_URL}${FULLSCAN_ACTIVITIES_ENDPOINT}`)
        const data = await response.json()
        if (data.status === 'success') {
          // Pastikan data.data adalah array
          if (Array.isArray(data.data)) {
            setActivities(data.data)
          } else {
            console.error('Expected data.data to be an array:', data.data)
            setActivities([]) // Set to empty array if data is not an array
          }
        } else {
          console.error('Failed to fetch fullscan activities:', data.message)
          setActivities([]) // Set to empty array on failure
        }
      } catch (error) {
        console.error('Error fetching fullscan activities:', error)
        setActivities([]) // Set to empty array on error
      } finally {
        setLoading(false) // Set loading to false
      }
    }

    fetchDeviceInfo()
    fetchFullScanActivities()
  }, []) // Run once on mount

  // Open modal functions
  const openRemoveModal = () => setIsRemoveModalOpen(true)
  const openCompleteModal = () => setIsCompleteModalOpen(true)

  // Handle delete confirmation
  const handleDeleteConfirmation = async () => {
    setIsProgressModalOpen(true) // Show the progress modal
    try {
      const response = await fetch(`${BASE_URL}${DELETE_MALWARE_ENDPOINT}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()

      if (data.status === 'success') {
        // Successfully deleted, show complete scan modal
        openCompleteModal()
      } else {
        console.error('Failed to delete malware:', data.message)
      }
    } catch (error) {
      console.error('Error deleting malware:', error)
    } finally {
      setIsRemoveModalOpen(false) // Close delete modal
      setIsProgressModalOpen(false) // Hide progress modal
    }
  }

  return (
    <div
      className="h-screen w-screen flex flex-col justify-center items-center relative font-aldrich"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}
    >
      <h2 className="text-4xl font-bold text-white mb-8">Result Full Scan</h2>

      {/* Card Container */}
      <div className="relative w-[1001px] mb-4">
        {/* Security Patch & Phone Model Card */}
        <div className="relative h-[89px] text-center p-6 border-2 border-y-[#0C9A8D] border-x-[#05564F] bg-gradient-to-b from-[#091817] to-[#0C1612]">
          <img
            src={plusSign}
            alt="Plus Sign"
            className="absolute top-[-13px] left-[-13px] w-6 h-6"
          />
          <img
            src={plusSign}
            alt="Plus Sign"
            className="absolute bottom-[-12px] right-[-13px] w-6 h-6"
          />

          <div className="grid grid-cols-2 gap-4 text-white">
            <div>
              <p className="font-semibold text-gray-400">Security Patch</p>
              <p className="text-gray-100 mt-1">
                {loading ? <Skeleton width={100} /> : deviceInfo.security_patch}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-400">Phone Model</p>
              <p className="text-gray-100 mt-1">
                {loading ? <Skeleton width={150} /> : deviceInfo.phone_model}
              </p>
            </div>
          </div>
        </div>

        {/* View Section */}
        <div className="w-full h-[450px] p-4 border-2 border-y-[#0C9A8D] border-x-[#05564F] bg-gradient-to-b from-[#091817] to-[#0C1612] text-white relative mt-4">
          {loading ? (
            // Show loading skeleton if data is being fetched
            <div className="space-y-1">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 border-b border-[#EAECF0] p-2 text-white"
                >
                  <Skeleton width={100} />
                  <Skeleton width={150} />
                </div>
              ))}
            </div>
          ) : activities.length > 0 ? (
            <>
              <h3 className="text-2xl font-semibold mb-4">View</h3>
              <div className="grid grid-cols-2 bg-[#00B3A2] p-2 text-black font-semibold mb-2">
                <span className="text-start">Name</span>
                <span className="text-center">Package Name</span>
              </div>

              <div className="space-y-1">
                {activities.map((activity, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 border-b border-[#EAECF0] p-2 text-white"
                  >
                    <span>{activity.matched_indicator.name}</span>
                    <div className="flex justify-center items-center">
                      <span>{activity.package_name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            // If no activities, show no malware image and message
            <div className="relative flex justify-center items-center h-full">
              <img src={noMalwareImage} alt="No Malware" className="h-[320px]" />
              <div className="absolute inset-0 bg-black opacity-85"></div>
              <p className="absolute text-center text-[#00FFE7] font-bold text-2xl">
                No Malware Detected
              </p>
            </div>
          )}

          {activities.length > 0 && <div className="border-b border-gray-400 mt-7 mb-5"></div>}

          {/* Show Remove button only if there are activities */}
          {activities.length > 0 && (
            <div className="text-right mb-3">
              <button
                className="w-[267px] h-[43px] bg-transparent text-white font-bold relative overflow-hidden"
                style={{
                  backgroundImage: `url(${removeButtonImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
                onClick={openRemoveModal}
              >
                <span className="relative z-10">Remove</span>
                <div className="absolute inset-0 bg-red-900 opacity-0 hover:opacity-30 transition-opacity"></div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Complete Scan Button */}
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
      </div>

      {/* Modals (Conditional Rendering) */}
      {isRemoveModalOpen && (
        <RemoveModal
          onClose={() => setIsRemoveModalOpen(false)}
          onConfirm={handleDeleteConfirmation} // Pass the delete confirmation function
        />
      )}
      {isCompleteModalOpen && <CompleteModal onClose={() => setIsCompleteModalOpen(false)} />}
      {isProgressModalOpen && (
        <DeleteProgressModal
          onClose={() => setIsProgressModalOpen(false)}
          onProgressComplete={openCompleteModal} // Call to show complete scan modal
        />
      )}
    </div>
  )
}

export default ResultFullPage
