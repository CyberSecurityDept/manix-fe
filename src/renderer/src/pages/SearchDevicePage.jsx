// import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import bgImage from '../assets/bg-darkmode.svg' // Import background image
// import device from '../assets/device.svg'

// const SearchDevicePage = () => {
//   const navigate = useNavigate() // Untuk navigasi kembali

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Gunakan URL baru di sini
//         // const response = await fetch('https://dummyjson.com/c/97bb-ec7e-4755-83f0')
//         const result = await response.json()

//         // Akses data yang berada di dalam objek "data"
//         const { is_cable_connected, is_adb_connected } = result.data

//         // Cek kondisi is_cable_connected dan is_adb_connected
//         if (is_cable_connected && is_adb_connected) {
//           // Pindah ke DeviceInfoPage jika kabel dan adb tersambung
//           navigate('/device-info')
//         } else if (is_cable_connected && !is_adb_connected) {
//           // Pindah ke ADBPage jika kabel tersambung tapi adb tidak tersambung
//           navigate('/adb-device')
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error)
//       }
//     }

//     fetchData()
//   }, [navigate])

//   return (
//     <div
//       className="h-screen w-screen flex flex-col justify-center items-center relative"
//       style={{
//         backgroundImage: `url(${bgImage})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center'
//       }} // Mengatur background
//     >
//       {/* Back button (kiri atas) */}
//       <button
//         className="absolute top-4 left-4 text-gray-600 hover:text-white"
//         onClick={() => navigate(-1)} // Navigasi kembali ke halaman sebelumnya
//         style={{ top: '24px', right: '24px' }}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
//         </svg>
//       </button>

//       {/* History button (kanan atas) */}
//       <div
//         className="absolute w-[165px] h-[71px] rounded-xl p-[3px] bg-gradient-to-r from-blue-500 to-blue-950 shadow-lg"
//         style={{ top: '32px', right: '32px' }}
//       >
//         <button
//           className="w-full h-full bg-gray-800 text-white font-bold text-xl rounded-lg hover:bg-gray-700 transition-all duration-300"
//           onClick={() => console.log('Navigasi ke halaman history')}
//         >
//           History
//         </button>
//       </div>

//       {/* Tombol utama di tengah */}
//       <button className="w-628 h-208 border border-gray-300 text-white rounded-xl bg-opacity-30 bg-gray-600 backdrop-blur-md hover:bg-opacity-60 transition-all duration-300">
//         <img src={device}
//          alt=""
//          className=''
//          />
//         Hubungkan perangkat yang akan di scan
//       </button>
//     </div>
//   )
// }

// export default SearchDevicePage

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import bgDarkmode from '../assets/bg-darkmode.svg'
import modalBackground from '../assets/border/border-box.svg'
import deviceImage from '../assets/device.svg'
import plusSign from '../assets/plus-sign.svg'
import historyIcon from '../assets/history-icon.svg'
import backIcon from '../assets/back-Icon.svg'

const SearchDevicePage = () => {
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
        } else if (is_cable_connected && !is_adb_connected) {
          // Pindah ke ADBPage jika kabel tersambung tapi adb tidak tersambung
          navigate('/adb-device')
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
        className="relative w-[822px] h-[456px] p-6 flex flex-col justify-center items-center text-center"
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

        {/* Device Image */}
        <img src={deviceImage} alt="Device" className="w-[325px] h-[207px] mb-6" />

        {/* Text Content */}
        <h2 className="text-2xl font-bold font-aldrich">Cable are not connected</h2>
        <p className="text-gray-300 mt-2 font-aldrich">Please check on cable connection</p>
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

export default SearchDevicePage
