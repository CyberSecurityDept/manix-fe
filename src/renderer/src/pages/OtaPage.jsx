import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bgDarkmode from '../assets/bg-darkmode.png'
import plusSign from '../assets/plus-sign.svg'
import Border from '../assets/border/App-border.svg'
import UpdateBorder from '../assets/border/update.svg'
import UpdateModal from '../components/modal/Update'
import NewVersionModal from '../components/modal/NewVersion'
import UpdateProgress from '../components/modal/UpdateProgress' // Import UpdateProgress modal
import backIcon from '../assets/back-Icon.svg'

const OTA = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const UPDATE_URL = '/v1/update-version'
  const CHECK_URL = '/v1/check-update'

  const navigate = useNavigate()
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isNewVersionModalOpen, setIsNewVersionModalOpen] = useState(false)
  const [isUpdateProgressModalOpen, setIsUpdateProgressModalOpen] = useState(false) // State untuk UpdateProgress modal
  const [updateData, setUpdateData] = useState(null)

  const checkUpdate = async () => {
    try {
      setIsUpdateModalOpen(true) // Buka UpdateModal
      const url = `${BASE_URL}${CHECK_URL}`
      console.log('Fetching data from:', url)

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      })

      console.log('Response status:', response.status)

      if (!response.ok) {
        throw new Error(`Network response was not ok. Status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Update data:', data)
      setUpdateData(data)

      // Jika ada versi baru, tampilkan NewVersionModal
      if (data.current_tag !== data.latest_remote_tag) {
        setIsUpdateModalOpen(false)
        setIsNewVersionModalOpen(true)
      } else {
        setIsUpdateModalOpen(false)
        alert('You are using the latest version.')
      }
    } catch (error) {
      console.error('Error fetching update data:', error)
      setIsUpdateModalOpen(false)
      alert(`Failed to check for updates. Error: ${error.message}`)
    }
  }

  const handleUpdate = async () => {
    setIsNewVersionModalOpen(false) // Tutup NewVersionModal
    setIsUpdateProgressModalOpen(true) // Tampilkan UpdateProgress modal

    try {
      const url = `${BASE_URL}${UPDATE_URL}`
      console.log('Updating to latest version:', url)

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      })

      console.log('Response status:', response.status)

      if (!response.ok) {
        throw new Error(`Network response was not ok. Status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Update response:', data)

      // Tampilkan pesan sukses berdasarkan respons
      if (data.status === 'success') {
        alert(data.message) // Tampilkan pesan sukses
      } else {
        throw new Error(data.message || 'Update failed')
      }
    } catch (error) {
      console.error('Error updating version:', error)
      alert(`Failed to update. Error: ${error.message}`)
    } finally {
      setIsUpdateProgressModalOpen(false) // Tutup UpdateProgress modal setelah selesai
    }
  }

  return (
    <div
      className="w-full h-screen relative bg-cover flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${bgDarkmode})` }}
    >
      {/* Tombol Back */}
      <button className="absolute top-6 left-6" onClick={() => navigate('/')}>
        <img src={backIcon} alt="Back Icon" className="w-[48px] h-[48px]" />
      </button>

      <h1 className="text-white text-3xl font-semibold mb-10">OTA</h1>

      {/* APP & CYBER Section */}
      <div className="w-[1022px] h-[222px] relative border-2 border-y-[#0C9A8D] border-x-[#05564F] bg-gradient-to-b from-[#091817] to-[#0C1612] flex justify-around items-center mb-8">
        {/* Plus Sign */}
        <img src={plusSign} alt="Plus Sign" className="absolute top-[-14px] left-[-13px] w-6 h-6" />
        <img
          src={plusSign}
          alt="Plus Sign"
          className="absolute bottom-[-12px] right-[-12px] w-6 h-6"
        />

        {/* APP Box */}
        <div
          className="w-[403px] h-[123px] bg-cover bg-no-repeat border border-[#05564F] flex flex-col justify-center items-center bg-gradient-to-b from-[#0C1E1B] to-[#0C1612]"
          style={{ backgroundImage: `url(${Border})` }}
        >
          <h2 className="text-white text-lg mb-2">APP V1.1.1.2</h2>
          <button
            onClick={checkUpdate}
            className="text-white py-1 px-4"
            style={{
              backgroundImage: `url(${UpdateBorder})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: '228px',
              height: '37px',
              color: '#FFFFFF'
            }}
          >
            CHECK UPDATE
          </button>
        </div>

        {/* CYBER Box */}
        <div
          className="w-[403px] h-[123px] bg-cover bg-no-repeat border border-[#05564F] flex flex-col justify-center items-center bg-gradient-to-b from-[#0C1E1B] to-[#0C1612]"
          style={{ backgroundImage: `url(${Border})` }}
        >
          <h2 className="text-white text-lg mb-2">CYBER V1.2.3.4</h2>
          <button
            onClick={checkUpdate}
            className="text-white py-1 px-4"
            style={{
              backgroundImage: `url(${UpdateBorder})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: '228px',
              height: '37px',
              color: '#FFFFFF'
            }}
          >
            CHECK UPDATE
          </button>
        </div>
      </div>

      {/* UPDATE LOG Section */}
      <div className="w-[1022px] h-[444px] relative border-2 border-y-[#0C9A8D] border-x-[#05564F] bg-gradient-to-b from-[#091817] to-[#0C1612] p-6">
        {/* Plus Sign */}
        <img src={plusSign} alt="Plus Sign" className="absolute top-[-14px] left-[-13px] w-6 h-6" />
        <img
          src={plusSign}
          alt="Plus Sign"
          className="absolute bottom-[-12px] right-[-12px] w-6 h-6"
        />

        {/* Header and View More Button */}
        <div className="flex justify-between items-center px-10 py-4 border-b border-[#05564F]">
          <h3 className="text-white text-xl font-semibold">Update Log</h3>
          <button className="bg-transparent border border-[#0C9A8D] text-[#FFFFFF] py-1 px-4 rounded hover:border-[#00FFE7]">
            VIEW MORE
          </button>
        </div>

        {/* Table Header */}
        <div className="flex justify-between items-center px-10 py-2 bg-[#0C9A8D] text-[#091817] font-semibold">
          <div className="text-center w-1/2">Patch</div>
          <div className="text-center w-1/2">Data</div>
        </div>

        {/* Update Table Rows */}
        <div className="overflow-y-auto h-[320px]">
          {['APK V1.1.12', 'APK V1.1.12', 'CYBER V1.1.12'].map((patch, index) => (
            <div
              key={index}
              className="flex justify-between items-center px-10 py-2 text-white border-t border-[#05564F]"
            >
              <div className="w-1/2 text-center">{patch}</div>
              <div className="w-1/2 text-center">2024-08-05</div>
            </div>
          ))}
        </div>
      </div>

      {/* Update Modal */}
      {isUpdateModalOpen && (
        <UpdateModal onClose={() => setIsUpdateModalOpen(false)} updateData={updateData} />
      )}

      {/* New Version Modal */}
      {isNewVersionModalOpen && (
        <NewVersionModal
          onClose={() => setIsNewVersionModalOpen(false)}
          onUpdate={handleUpdate}
          updateData={updateData}
        />
      )}

      {/* Update Progress Modal */}
      {isUpdateProgressModalOpen && (
        <UpdateProgress onClose={() => setIsUpdateProgressModalOpen(false)} />
      )}

      {/* OTA Button */}
      <button
        className="absolute bottom-[42px] right-[52px] flex items-center justify-center w-[60px] h-[60px] bg-gradient-to-b from-[#0C1612] to-[#091817] border-t border-b border-[#4FD1C5] text-sm font-bold text-white border hover:bg-teal-700 font-roboto"
        onClick={() => navigate('/info')}
      >
        <span className="text-2xl">i</span>
      </button>
    </div>
  )
}

export default OTA
