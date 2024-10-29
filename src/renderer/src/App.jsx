import React from 'react';
import HomePage from "./pages/HomePage";
import SearchDevicePage from "./pages/SearchDevicePage";
import DeviceInfoPage from "./pages/DeviceInfoPage";
import ADBPage from "./pages/ADBPage";
import { HashRouter as Router, Route, Routes } from 'react-router-dom';  
import FastScanPage from './pages/FastScanPage';
import ResultFastScanPage from './pages/ResultFastScanPage';
import HistoryPage from './pages/HistoryPage';
import CaseManagementDashboard from './pages/CaseManagement/Dashboard';
import OTA from './pages/OtaPage';
import UnderMaintenance from './pages/UnderMaintenance';
import IframePage from './pages/IframePage';

function App() {
  // Pastikan ipcHandle hanya dipanggil jika window.electron ada
  const ipcHandle = () => {
    if (window.electron) {
      window.electron.ipcRenderer.send('ping');
    } else {
      console.error("IPC Renderer not found. Make sure preload.js is properly configured.");
    }
  }

  return (
    <Router>
      <Routes>
        {/* Route untuk halaman utama */}
        <Route path="/" element={<HomePage />} />

        {/* Route untuk maintenance*/}
        <Route path="/maintenance" element={<UnderMaintenance />} />

        {/* Route untuk OTA */}
        <Route path="/ota" element={<OTA />} />

        {/* Route untuk IframePage */}
        <Route path="/iframe-page" element={<IframePage />} />

        {/* Route untuk halaman SearchDevicePage */}
        <Route path="/search-device" element={<SearchDevicePage />} />

        {/* Route untuk halaman ADBPage */}
        <Route path="/adb-device" element={<ADBPage />} />

        {/* Route untuk halaman DeviceInfoPage */}
        <Route path="/device-info" element={<DeviceInfoPage />} />

        {/* Route untuk halaman FastScanPage */}
        <Route path="/fast-scan" element={<FastScanPage />} />

        {/* Route untuk halaman ResultFastScanPage */}
        <Route path="/result-fast-scan" element={<ResultFastScanPage />} />

        {/* Route untuk halaman HistoryPage */}
        <Route path="/history" element={<HistoryPage />} />

        {/* Route untuk halaman CaseManagementDashboard*/}
        <Route path="/dashboard" element={<CaseManagementDashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;
