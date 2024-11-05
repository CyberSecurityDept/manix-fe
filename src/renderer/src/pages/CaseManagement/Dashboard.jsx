import React from 'react';
import bgDarkmode from '../../assets/bg-darkmode.png';
import Header from '../../components/Header';
import Navbar from '../../components/NavBar';
import plusSign from '../../assets/plus-sign.svg';

const CaseManagementDashboard = () => {
  return (
    <div
      className="case-management-dashboard min-h-screen bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${bgDarkmode})` }}
    >
      {/* Header Section */}
      <Header />

      {/* Main Content Section */}
      <Navbar />

      {/* Search Section */}
      <div className="flex justify-center mt-24">
        <div className="flex w-full max-w-screen-sm space-x-2">
          <input
            type="text"
            placeholder="Search..."
            className="w-10/12 px-4 py-2 bg-gradient-to-b from-[#091817] to-[#0C1612] border border-[#4FD1C5] text-white focus:outline-none placeholder-gray-500"
          />
          <button className="w-3/12 px-6 py-2 border border-y-[#0C9A8D] border-x-[#05564F] bg-gradient-to-b from-[#091817] to-[#0C1612] text-white hover:bg-teal-600">
            Search
          </button>
        </div>
      </div>

      {/* Case Section */}
      <div className="w-full flex justify-center mt-10">
        <div className="flex gap-3">
          {/* Left Section */}
          <div className="grid gap-4 grid-cols-2">
            <div className="relative w-[350px] h-[295px] border border-y-[#0C9A8D] border-x-[#05564F] bg-gradient-to-b from-[#091817] to-[#0C1612] text-white">
              <img
                src={plusSign}
                alt="Plus Sign"
                className="absolute top-[-13px] left-[-12px] w-6 h-6"
              />
              <span className="absolute top-2 left-10 font-bold">01</span>
            </div>
            
            <div className="relative w-[350px] h-[295px] border border-y-[#0C9A8D] border-x-[#05564F] bg-gradient-to-b from-[#091817] to-[#0C1612] text-white">
              <span className="absolute top-2 left-10 font-bold">02</span>
            </div>
            
            <div className="relative w-[350px] h-[295px] border border-y-[#0C9A8D] border-x-[#05564F] bg-gradient-to-b from-[#091817] to-[#0C1612] text-white">
              <span className="absolute top-2 left-10 font-bold">03</span>
            </div>
            
            <div className="relative w-[350px] h-[295px] border border-y-[#0C9A8D] border-x-[#05564F] bg-gradient-to-b from-[#091817] to-[#0C1612] text-white">
              <img
                src={plusSign}
                alt="Plus Sign"
                className="absolute bottom-[-12px] right-[-12px] w-6 h-6"
              />
              <span className="absolute top-2 left-10 font-bold">04</span>
            </div>
          </div>

          {/* Divider */}
          <div
            className="w-[2px] bg-[#00B3A2] mx-[50px]"
            style={{ minHeight: '500px' }} // Adjust height as necessary
          ></div>

          {/* Right Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-[350px] h-[295px] border border-y-[#0C9A8D] border-x-[#05564F] bg-gradient-to-b from-[#091817] to-[#0C1612]"></div>
            <button className="w-[389px] h-[120px] border border-[#4FD1C5] bg-gradient-to-b from-[#091817] to-[#0C1612] text-white hover:bg-teal-600">
              Add Device
            </button>
            <button className="w-[389px] h-[120px] border border-[#4FD1C5] bg-gradient-to-b from-[#091817] to-[#0C1612] text-white hover:bg-teal-600">
              Add Case
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseManagementDashboard;
