import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import bgDarkmode from '../assets/bg-darkmode.png'
import modalBackground from '../assets/border-box.svg'
import adbImage from '../assets/adb.svg'
import plusSign from '../assets/plus-sign.svg'

// Mengambil BASE_URL dari environment variables
const BASE_URL = import.meta.env.VITE_BASE_URL;
const ENDPOINT = "/v1/check-device-status/";

const ADBPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gabungkan BASE_URL dengan ENDPOINT
        const response = await fetch(`${BASE_URL}${ENDPOINT}`);
        const result = await response.json()

        // Akses data yang berada di dalam objek "data"
        const { is_cable_connected, is_adb_connected } = result.data

        // Cek kondisi is_cable_connected dan is_adb_connected
        if (is_cable_connected && is_adb_connected) {
          // Pindah ke DeviceInfoPage jika kabel dan adb tersambung
          setTimeout(() => {
            navigate('/device-info')
          }, 3000)
        } else if (!is_cable_connected && is_adb_connected) {
          // Pindah ke SearchDevicePage jika kabel tersambung tapi adb tidak tersambung
          setTimeout(() => {
            navigate('/search-device')
          }, 3000)
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
    </div>
  )
}

export default ADBPage
