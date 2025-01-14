import { useState } from 'react'

const RiskModal = ({ isOpen, onClose, riskData }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-gray-900 text-white w-full max-w-2xl rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">
            Malware Probability: <span className="text-red-500">60%</span>
          </h2>
          <button onClick={onClose} className="text-teal-400 hover:text-teal-300 text-xl">
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Malicious Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Malicious</h3>
              <span className="text-red-500">5/19</span>
            </div>
          </div>

          {/* Common Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Common</h3>
              <span className="text-gray-400">16/26</span>
            </div>
          </div>

          {/* Risk Items */}
          <div className="space-y-4">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-teal-900/30 rounded p-4">
                <div className="text-teal-400 font-medium mb-2">Android.permission.INTERNET</div>
                <p className="text-gray-300 text-sm">
                  Malware can send your personal data to external servers without your knowledge.
                  Used for network communication that can potentially steal sensitive information.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RiskModal
