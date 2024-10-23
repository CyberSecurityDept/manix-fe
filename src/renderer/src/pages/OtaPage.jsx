import React, { useState } from 'react'
import bgDarkmode from '../assets/bg-darkmode.png'
import plusSign from '../assets/plus-sign.svg'
import Border from '../assets/border/App-border.svg'
import UpdateBorder from '../assets/border/update.svg'
import UpdateModal from '../components/modal/NewVersion'

const OTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div
      className="w-full h-screen relative bg-cover flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${bgDarkmode})` }}
    >
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
            onClick={openModal}
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
            onClick={openModal}
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
      {isModalOpen && <UpdateModal onClose={closeModal} />}
    </div>
  )
}

export default OTA
