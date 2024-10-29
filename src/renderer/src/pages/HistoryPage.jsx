import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import bgDarkmode from '../assets/bg-darkmode.png';
import borderImage from '../assets/border/history.svg';
import backIcon from '../assets/back-Icon.svg';
import filterIcon from '../assets/filter-history-page.svg';

const HistoryPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [sortLastScanAsc, setSortLastScanAsc] = useState(true);
  const [sortNumberAsc, setSortNumberAsc] = useState(true);
  const [sortSecurityPercentageAsc, setSortSecurityPercentageAsc] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(10); 
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/c/be16-80bd-46be-a845');
        const result = await response.json();
        if (result.data) {
          setData(result.data);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fungsi untuk mengubah jumlah item per halaman
  const handleItemsPerPageChange = (number) => {
    setItemsPerPage(number);
    setDropdownOpen(false); // Tutup dropdown setelah memilih
    setCurrentPage(1); // Reset ke halaman 1 saat jumlah item diubah
  };

  const handleSortNumber = () => {
    const sortedData = [...data].sort((a, b) => 
      sortNumberAsc ? a.id - b.id : b.id - a.id
    );
    setData(sortedData);
    setSortNumberAsc(!sortNumberAsc);
  };

  const handleSortLastScan = () => {
    const sortedData = [...data].sort((a, b) => 
      sortLastScanAsc 
        ? new Date(b.last_scan) - new Date(a.last_scan)
        : new Date(a.last_scan) - new Date(b.last_scan)
    );
    setData(sortedData);
    setSortLastScanAsc(!sortLastScanAsc);
  };

  const handleSortSecurityPercentage = () => {
    const sortedData = [...data].sort((a, b) => 
      sortSecurityPercentageAsc 
        ? b.security_percentage - a.security_percentage
        : a.security_percentage - b.security_percentage
    );
    setData(sortedData);
    setSortSecurityPercentageAsc(!sortSecurityPercentageAsc);
  };

  // Reset halaman ke 1 setiap kali searchTerm berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredData = data.filter((item) => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
    item.phone_model.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()) ||
    item.imei1.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
    item.last_scan.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative text-white font-aldrich" style={{
        backgroundImage: `url(${bgDarkmode})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
      <button className="absolute top-6 left-6 flex items-center justify-center focus:outline-none group hover:bg-transparent transition-all duration-300"
        onClick={() => navigate(-1)}
        style={{ borderRadius: '50%', width: '68px', height: '68px' }}>
        <img src={backIcon} alt="Back Icon" className="w-10 h-10" />
      </button>

      <h2 className="text-3xl font-semibold mb-4 absolute top-[80px]">HISTORY</h2>

      <div className="relative mt-[92px] w-[1283px]">
        <div className="absolute top-[-52px] right-[10px]">
          <input
            type="text"
            placeholder="SEARCH..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border border-teal-400 px-4 py-2 rounded-md text-white focus:outline-none placeholder-gray-500"
            style={{ width: '275px', height: '40px' }}
          />
        </div>

        <div className="relative w-full p-10 shadow-lg text-center"
          style={{ backgroundImage: `url(${borderImage})`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', height: '700px' }}>
          <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', height: '544px', overflowY: itemsPerPage > 10 ? 'auto' : 'visible' }}>
            <table className="table-auto w-full text-left text-sm">
              <thead style={{ backgroundColor: '#00B3A2' }}>
                <tr className="text-black">
                  {/* Table Headers */}
                  <th className="p-2 text-center">
                    <div className="flex items-center justify-center">
                      No
                      <img src={filterIcon} alt="Filter Icon" className="ml-1 w-3 h-3 cursor-pointer" onClick={handleSortNumber}/>
                    </div>
                  </th>
                  <th className="p-2 text-center">Name</th>
                  <th className="p-2 text-center">
                    <div className="flex items-center justify-center">
                      Model
                      <img src={filterIcon} alt="Filter Icon" className="ml-1 w-3 h-3 cursor-pointer" />
                    </div>
                  </th>
                  <th className="p-2 text-center">IMEI</th>
                  <th className="p-2 text-center">Security Patch</th>
                  <th className="p-2 text-center">
                    <div className="flex items-center justify-center">
                      Last Scan
                      <img src={filterIcon} alt="Filter Icon" className="ml-1 w-3 h-3 cursor-pointer" onClick={handleSortLastScan} />
                    </div>
                  </th>
                  <th className="p-2 text-center">
                    <div className="flex items-center justify-center">
                      Security Percentage
                      <img src={filterIcon} alt="Filter Icon" className="ml-1 w-3 h-3 cursor-pointer" onClick={handleSortSecurityPercentage} />
                    </div>
                  </th>
                  <th className="p-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  Array.from({ length: itemsPerPage }).map((_, index) => (
                    <tr key={index}>
                      <td className="p-2 text-center"><Skeleton /></td>
                      {/* Table Skeletons */}
                    </tr>
                  ))
                ) : (
                  currentData.map((item, index) => (
                    <tr key={item.id} className="border-b border-teal-400 hover:bg-[#7D9B9B] transition">
                      <td className="p-2 text-center">{item.id}</td>
                      <td className="p-2 text-center">{item.name}</td>
                      <td className="p-2 text-center">{item.phone_model}</td>
                      <td className="p-2 text-center">{item.imei1}</td>
                      <td className="p-2 text-center">{item.security_patch}</td>
                      <td className="p-2 text-center">{item.last_scan}</td>
                      <td className="p-2 text-center">{item.security_percentage}%</td>
                      <td className="p-2 text-center">
                        <button className="bg-[#064039] border border-teal-400 px-4 py-1" onClick={() => navigate('/result-fast-scan')}>DETAIL</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-between items-center px-4 relative">
            {/* Dropdown Menu */}
            <div className="relative inline-block text-left">
              <div>
                <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[#091817] px-3 py-2 text-sm  text-[#fff] shadow-sm  hover:bg-[#1a2c2b]" id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={() => setDropdownOpen(!dropdownOpen)}>
                  Showing {itemsPerPage}
                  <svg className="-mr-1 h-5 w-5 text-[#00FFE7]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-[#091817] shadow-lg ring-1 ring-teal-400 ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                  <div className="py-1" role="none">
                    <a className="block px-4 py-2 text-sm text-[#00FFE7] hover:bg-teal-700" role="menuitem" tabIndex="-1" onClick={() => handleItemsPerPageChange(5)}>5 items</a>
                    <a className="block px-4 py-2 text-sm text-[#00FFE7] hover:bg-teal-700" role="menuitem" tabIndex="-1" onClick={() => handleItemsPerPageChange(10)}>10 items</a>
                    <a className="block px-4 py-2 text-sm text-[#00FFE7] hover:bg-teal-700" role="menuitem" tabIndex="-1" onClick={() => handleItemsPerPageChange(25)}>25 items</a>
                    <a className="block px-4 py-2 text-sm text-[#00FFE7] hover:bg-teal-700" role="menuitem" tabIndex="-1" onClick={() => handleItemsPerPageChange(50)}>50 items</a>
                  </div>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center">
              <button onClick={() => handlePageChange(currentPage - 1)} className="px-2 py-1 text-[#00FFE7] rounded-md hover:bg-[#00FFE7] hover:text-black transition"
                disabled={currentPage === 1} style={{ height: '36px' }}>Prev</button>
              <div className="flex space-x-2 mx-4">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button key={index + 1} onClick={() => handlePageChange(index + 1)}
                    className={`px-2 py-1 border border-[#00FFE7] rounded-md transition ${currentPage === index + 1 ? 'bg-[#00FFE7] text-black' : 'text-[#00FFE7] hover:bg-[#00FFE7] hover:text-black'}`}
                    style={{ height: '36px', width: '36px' }}>{index + 1}</button>
                ))}
              </div>
              <button onClick={() => handlePageChange(currentPage + 1)} className="px-2 py-1 text-[#00FFE7] rounded-md hover:bg-[#00FFE7] hover:text-black transition"
                disabled={currentPage === totalPages} style={{ height: '36px' }}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;
