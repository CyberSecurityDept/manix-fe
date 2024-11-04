import React, { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import CreatableSelect from 'react-select/creatable'
import { useNavigate, Link } from 'react-router-dom'
import bgDarkmode from '../assets/bg-darkmode.png'
import plusSign from '../assets/plus-sign.svg'
import historyIcon from '../assets/history-icon.svg'
import backIcon from '../assets/back-Icon.svg'
import buttonScan from '../assets/Scan.svg'

// Mengambil BASE_URL dari environment variables
const BASE_URL = import.meta.env.VITE_BASE_URL

const DeviceInfoPage = () => {
  const navigate = useNavigate()

  // State untuk menyimpan data API
  const [deviceData, setDeviceData] = useState(null)
  const [nameOptions, setNameOptions] = useState([
    { value: 'John', label: 'John' },
    { value: 'Jane', label: 'Jane' },
    { value: 'Doe', label: 'Doe' }
  ])
  const [selectedName, setSelectedName] = useState(null) // State untuk menyimpan nama yang dipilih
  const [loading, setLoading] = useState(true)

  // Fungsi untuk memanggil API saat komponen dimuat
  useEffect(() => {
    fetch(`${BASE_URL}/v1/device-overview`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Device Data:', data);
        setDeviceData(data.data); // Simpan data device ke state
        setNameOptions([{ value: data.data.name, label: data.data.name }]); 
        // Simpan serial number ke local storage
        localStorage.setItem('serial_number', data.data.serial_number);
  
        // Set loading state based on image URL
        if (data.data.image && data.data.image !== 'http://image-example/') {
          setLoading(false); // Stop loading if valid image URL
        } else {
          setLoading(true); // Keep loading if image is the placeholder
        }
      })
      .catch((error) => {
        console.error('Error fetching device data:', error);
        setLoading(false); // Matikan loading jika ada error
      });
  }, []);

  // Fungsi untuk menangani opsi baru yang dibuat
  const handleCreate = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue }
    setNameOptions((prevOptions) => [...prevOptions, newOption])
    setSelectedName(newOption)
  }

  // Fungsi untuk memanggil API saat tombol Fast Scan diklik
  const handleFastScan = () => {
    // Periksa apakah nama dan serial number ada
    if (!selectedName || !deviceData.serial_number) {
      alert('Name or Serial Number is missing')
      return
    }

    // Buat request URL dengan serial_number dan name di dalam query string
    const requestUrl = `${BASE_URL}/v1/fast-scan/${deviceData.serial_number}?name=${selectedName.value}`

    // Log untuk memeriksa URL sebelum dikirim ke API
    console.log('Request URL:', requestUrl)

    // Panggil API fast-scan dengan POST method tanpa body (sesuai dengan cURL yang kamu berikan)
    fetch(requestUrl, {
      method: 'POST',
      headers: {
        accept: 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        // Log untuk melihat respons dari API
        console.log('Fast Scan Response:', data)

        // Periksa apakah fast scan berhasil
        if (
          data.status === 200 &&
          data.message === 'Fast scan started successfully in the background'
        ) {
          // Jika berhasil, pindah ke halaman fast-scan
          navigate('/fast-scan')
        } else {
          // Jika gagal, tampilkan pesan error
          console.error('Fast scan failed:', data)
          alert('Failed to start fast scan. Please try again.')
        }
      })
      .catch((error) => {
        // Log jika terjadi error selama proses API call
        console.error('Error during Fast Scan:', error)
      })
  }

  return (
    <div
      className="h-screen w-screen flex flex-col justify-center items-center relative text-white font-aldrich"
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
      {loading ? (
        <Skeleton
          width={801}
          baseColor="#0B0C0B"
          highlightColor="#4E4B51"
          className="w-[801px] h-[480px]"
        />
      ) : (
        <div
          className="relative w-[801px] h-[480px] p-6 shadow-lg bg-black bg-opacity-30 text-center"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            boxShadow: 'inset 0 0 15px 4px rgba(4, 209, 197, 0.5)',
            border: '1px solid transparent'
          }}
        >
          {/* Plus Sign (Kiri Atas Tengah) */}
          <img
            src={plusSign}
            alt="Plus Sign"
            className="absolute top-[-12px] left-[-12px] w-6 h-6"
          />

          {/* Plus Sign (Kanan Bawah Tengah) */}
          <img
            src={plusSign}
            alt="Plus Sign"
            className="absolute bottom-[-12px] right-[-12px] w-6 h-6"
          />

          <h2 className="text-2xl font-bold mb-4">Device Specification</h2>

          {/* Detail Device Section */}
          <div
            className="w-[740px] h-[300px] flex items-center justify-start mb-[21px] p-4 "
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              boxShadow:
                '0px -9px 0px -7px rgba(4, 209, 197, 0.5), 0px 11px 0px -9px rgba(4, 209, 197, 0.5)',
              border: '1px solid transparent'
            }}
          >
            {/* Gambar Device */}
            <div className="flex justify-center p-4">
              <div className="p-2 rounded-lg w-[187px] h-[187px]">
                {/* Skeleton jika loading */}
                {loading ? (
                  <Skeleton className="w-full h-full" />
                ) : (
                  <img
                    src={deviceData?.image}
                    alt="Device"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>

            {/* Informasi Device */}
            <div className="w-[432px] h-[187px] flex-auto justify-between">
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="w-1/3 text-left">Name</span>
                  <span className="mx-2">:</span>
                  {loading ? (
                    <Skeleton width={150} />
                  ) : (
                    <CreatableSelect
                      value={selectedName} // Nilai terpilih
                      onChange={setSelectedName} // Fungsi untuk mengubah pilihan
                      options={nameOptions} // Opsi yang tersedia
                      placeholder="Input name"
                      onCreateOption={handleCreate}
                      className="text-black flex-1 text-right w-[150px]"
                      isClearable // Memungkinkan menghapus pilihan
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          borderColor: state.isFocused ? '#0C9A8D' : '#0C9A8D', // Ubah warna border
                          boxShadow: state.isFocused ? '0 0 0 1px #0C9A8D' : null, // Ubah shadow saat fokus
                          '&:hover': {
                            borderColor: '#0C9A8D' // Ubah warna border saat hover
                          }
                        })
                      }}
                    />
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="w-1/3 text-left">Model</span>
                  <span className="mx-2">:</span>
                  <span className="flex-1 text-right">
                    {loading ? <Skeleton width={100} /> : deviceData.model}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="w-1/3 text-left">IMEI1</span>
                  <span className="mx-2">:</span>
                  <span className="flex-1 text-right">
                    {loading ? <Skeleton width={150} /> : deviceData.imei1}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="w-1/3 text-left">IMEI2</span>
                  <span className="mx-2">:</span>
                  <span className="flex-1 text-right">
                    {loading ? <Skeleton width={150} /> : deviceData.imei2}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="w-1/3 text-left">Android Version</span>
                  <span className="mx-2">:</span>
                  <span className="flex-1 text-right">
                    {loading ? <Skeleton width={50} /> : deviceData.android_version}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="w-1/3 text-left">Last Scan</span>
                  <span className="mx-2">:</span>
                  <span className="flex-1 text-right">
                    {loading ? <Skeleton width={150} /> : deviceData.last_scan}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="w-1/3 text-left">Security Patch</span>
                  <span className="mx-2">:</span>
                  <span className="flex-1 text-right">
                    {loading ? <Skeleton width={150} /> : deviceData.security_patch}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="w-1/3 text-left">Serial Number</span>
                  <span className="mx-2">:</span>
                  <span className="flex-1 text-right">
                    {loading ? <Skeleton width={150} /> : deviceData.serial_number}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tombol Scan */}
      {/* Fast Scan Button */}
      <div className="flex space-x-8 mt-6 font-aldrich">
        <button
          className={`w-[801px] h-[120px] text-xl font-bold bg-transparent border border-teal-400 hover:bg-teal-700 rounded-md shadow-lg flex flex-col justify-center items-center relative ${
            !selectedName ? 'cursor-not-allowed opacity-50' : ''
          }`}
          style={{
            backgroundImage: `url(${buttonScan})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          onClick={handleFastScan} // Panggil fungsi handleFastScan saat tombol diklik
          disabled={!selectedName} // Disable button jika nama belum diisi
        >
          FAST SCAN
          <p className="text-sm mt-2">Quickly check installed apps and accessibility settings.</p>
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-teal-700 opacity-0 hover:opacity-30 transition-opacity"></div>
        </button>
      </div>
    </div>
  )
}

export default DeviceInfoPage
