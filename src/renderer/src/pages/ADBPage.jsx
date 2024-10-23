import React, { useEffect } from 'react'
import bgDarkmode from '../assets/bg-darkmode.png'
import modalBackground from '../assets/border-box.svg'
import adbImage from '../assets/adb.svg'
import plusSign from '../assets/plus-sign.svg'
import historyIcon from '../assets/history-icon.svg'
import backIcon from '../assets/chevronleft.svg'
import { useNavigate } from 'react-router-dom'

const ADBPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gunakan URL baru di sini
        const response = await fetch('http://172.15.1.36:1337/v1/check-device-status/')
        const result = await response.json()

        // Akses data yang berada di dalam objek "data"
        const { is_cable_connected, is_adb_connected } = result.data

        // Cek kondisi is_cable_connected dan is_adb_connected
        if (is_cable_connected && is_adb_connected) {
          // Pindah ke DeviceInfoPage jika kabel dan adb tersambung
          navigate('/device-info')
        } else if (!is_cable_connected && is_adb_connected) {
          // Pindah ke SearchDevicePage jika kabel tersambung tapi adb tidak tersambung
          navigate('/search-device')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [navigate])

  return (
    <div
      className="h-screen w-screen flex flex-col justify-center items-center relative text-white"
      style={{
        backgroundImage: `url(${bgDarkmode})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Tombol Back */}
      <button
        className="absolute top-6 left-6 flex items-center justify-center focus:outline-none group transition-all duration-300"
        onClick={() => navigate('/')}
        style={{
          width: '68px',
          height: '68px',
          backgroundColor: 'transparent'
        }}
      >
        <img src={backIcon} alt="Back Icon" className="w-10 h-10" />
      </button>

      {/* Main Container */}
      <div
        className="relative w-[801px] h-[422px] p-6 flex flex-col justify-center items-center text-center"
        style={{
          backgroundImage: `url(${modalBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Plus Sign (Kiri Atas Tengah) */}
        <img src={plusSign} alt="Plus Sign" className="absolute top-[-12px] left-[-12px] w-6 h-6" />

        {/* Plus Sign (Kanan Bawah Tengah) */}
        <img
          src={plusSign}
          alt="Plus Sign"
          className="absolute bottom-[-12px] right-[-12px] w-6 h-6"
        />

        {/* Device Image (ADB) */}
        <img src={adbImage} alt="ADB Not Connected" className="w-[325px] h-[207px] mb-6" />

        {/* Text Content */}
        <h2 className="text-2xl font-semibold mb-2 font-aldrich">ADB are not connected</h2>
        <p className="text-sm text-center font-aldrich">
          Please connect ADB. <br />
          Open setting, accessibility, ADB turn on.
        </p>
      </div>

      {/* Tombol History */}
      <button
        className="absolute top-6 right-6 flex items-center focus:outline-none group"
        onClick={() => navigate('/history')}
        style={{ top: '24px', right: '24px' }}
      >
        {/* Lingkaran dengan Ikon */}
        <div
          className="relative flex items-center justify-center rounded-full border-2 border-[#4FD1C5] bg-[#0B1E1E] shadow-lg -mr-4 z-10 group-hover:bg-teal-700 transition-all duration-300"
          style={{ width: '53px', height: '53px' }} // Ukuran lingkaran
        >
          <img src={historyIcon} alt="History Icon" className="w-8 h-8" />
          {/* Border efek glowing */}
          <div className="absolute inset-0 rounded-full border-[1px] border-[#4FD1C5]"></div>
        </div>

        {/* Persegi Panjang dengan Teks */}
        <div
          className="flex items-center justify-center bg-[#0B1E1E] rounded-r-lg border-t-2 border-b-2 border-r-2 border-[#4FD1C5] shadow-lg group-hover:bg-teal-700 transition-all duration-300"
          style={{ width: '134px', height: '40px' }} // Ukuran persegi panjang
        >
          <span className="text-lg font-semibold tracking-wide text-white group-hover:text-white font-aldrich">
            HISTORY
          </span>
        </div>
      </button>
    </div>
  )
}

export default ADBPage
