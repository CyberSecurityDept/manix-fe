import React, { useState, useEffect } from 'react';
import modalBackground from '../../assets/border/bawah-scanning-process.svg';
import plusSign from '../../assets/plus-sign.svg';
import ArrowPattern from '../ArrowPattern';

const DeleteProgressModal = ({ onClose, onProgressComplete }) => {
  const [progress, setProgress] = useState(0);
  console.log('onProgressComplete:', onProgressComplete);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 10;

        // Jika progress mencapai 100, hentikan interval dan panggil callback
        if (newProgress >= 100) {
          clearInterval(interval);
          // Tunda pemanggilan onClose dan onProgressComplete
          setTimeout(() => {
            onProgressComplete(); // Panggil onProgressComplete
            onClose(); // Panggil onClose
          }, 0);
        }

        return Math.min(newProgress, 100);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onClose, onProgressComplete]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 font-aldrich backdrop-blur-md"
      style={{
        background: 'rgba(0, 0, 0, 0.8)',
      }}
    >
      <div
        className="relative w-[822px] h-[456px] flex flex-col items-center justify-center p-8"
        style={{
          backgroundImage: `url(${modalBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <img src={plusSign} alt="Plus Sign" className="absolute top-[0px] left-[-12px] w-6 h-6" />
        <img
          src={plusSign}
          alt="Plus Sign"
          className="absolute bottom-[0px] right-[-12px] w-6 h-6"
        />

        <h1 className="text-2xl font-bold text-[#00E6E6] mb-4">Removing process {progress}%</h1>

        <div className="w-[663px] h-[45px] border border-[#00E6E6] flex items-center justify-center mb-4 p-2">
          <ArrowPattern progress={progress} />
        </div>

        <div className="w-[663px] h-[200px] bg-black bg-opacity-50 overflow-y-auto p-4 mb-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex justify-between text-white text-sm mb-2">
              <span>07/09/2024</span>
              <span>17:43</span>
              <span>Removing item asdfadf asdfasd adsfa</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default DeleteProgressModal;
