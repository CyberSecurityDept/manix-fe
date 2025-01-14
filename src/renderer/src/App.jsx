import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import SearchDevicePage from './pages/SearchDevicePage'
import DeviceInfoPage from './pages/DeviceInfoPage'
import ADBPage from './pages/ADBPage'
import FastScanPage from './pages/FastScanPage'
import ResultFastScanPage from './pages/ResultFastScanPage'
import UnderMaintenance from './pages/UnderMaintenance'
import ResultPage from './pages/ResultPage'
import FullScanPage from './pages/FullScanPage'
import ResultFullScanPage from './pages/ResultFullScanPage'

function App() {
  // Pastikan ipcHandle hanya dipanggil jika window.electron ada
  const ipcHandle = () => {
    if (window.electron) {
      window.electron.ipcRenderer.send('ping')
    } else {
      console.error('IPC Renderer not found. Make sure preload.js is properly configured.')
    }
  }

  return (
    <Router>
      <Routes>
        {/* Route untuk halaman SearchDevicePage */}
        <Route path="/" element={<SearchDevicePage />} />

        {/* Route untuk halaman ADBPage */}
        <Route path="/adb-device" element={<ADBPage />} />

        {/* Route untuk maintenance*/}
        <Route path="/maintenance" element={<UnderMaintenance />} />

        {/* Route untuk halaman DeviceInfoPage */}
        <Route path="/device-info" element={<DeviceInfoPage />} />

        {/* Route untuk halaman FastScanPage */}
        <Route path="/fast-scan" element={<FastScanPage />} />

        {/* Route untuk halaman ResultFastScanPage */}
        <Route path="/result-fast-scan" element={<ResultFastScanPage />} />

        {/* Route untuk halaman ResultPage */}
        <Route path="/result" element={<ResultPage />} />

        {/* Route untuk halaman FullScanPage */}
        <Route path="/full-scan" element={<FullScanPage />} />

        {/* Route untuk halaman ResultFullScanPage */}
        <Route path="/result-full-scan" element={<ResultFullScanPage />} />
      </Routes>
    </Router>
  )
}

export default App
