import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomIframe from '../components/CustomIframe'
import { createIframe, iframeEvents } from '../utils/iframeHelper'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import backIcon from '../assets/chevronleft.svg'

const IframePage = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const testUrl = 'http://10.8.0.7:8001/'

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    document.body.style.overflow = 'hidden'
    
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => {
      clearTimeout(timer)
      document.documentElement.style.overflow = ''
      document.body.style.margin = ''
      document.body.style.padding = ''
      document.body.style.overflow = ''
    }
  }, [])

  const iframeConfig = createIframe(testUrl, {
    allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
  })

  const events = {
    ...iframeEvents.onLoad(() => {
      console.log('Content loaded successfully!')
      setError(null)
      setIsLoading(false)
    }),
    ...iframeEvents.onError((error) => {
      console.error('Failed to load content:', error)
      setError('Failed to load content. This might be due to X-Frame-Options restrictions.')
      setIsLoading(false)
    })
  }

  const SkeletonLoader = () => (
    <div className="fixed top-0 left-0 w-screen h-screen bg-gray-100">
      <Skeleton height="100%" width="100%" />
    </div>
  )

  return (
    <div className="fixed top-0 left-0 w-screen h-screen m-0 p-0 overflow-hidden bg-white">
      {/* Back Button Container */}
      <div className="absolute top-5 left-5 z-50 flex items-center gap-2">
        <button
          onClick={() => navigate('/')}
          className="w-[68px] h-[68px] bg-transparent border-none cursor-pointer flex items-center justify-center p-0 transition-transform duration-200 hover:scale-110 select-none"
        >
          <img 
            src={backIcon} 
            alt="Back"
            className="w-full h-full object-contain"
          />
        </button>
      </div>

      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <div className="relative w-full h-full">
          <CustomIframe
            type="iframe"
            source={iframeConfig.url}
            options={{
              ...iframeConfig.options,
              className: "w-full h-full border-none"
            }}
            events={events}
          />
          {error && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white p-5 rounded-lg text-center z-50">
              <p className="m-0 mb-2">Failed to load content</p>
              <small className="block mb-4">
                Try using a different URL that allows iframe embedding
              </small>
              <button 
                onClick={() => {
                  setIsLoading(true)
                  setError(null)
                  const iframe = document.querySelector('iframe')
                  if (iframe) {
                    iframe.src = iframe.src
                  }
                }}
                className="px-4 py-2 bg-white text-black border-none rounded cursor-pointer hover:bg-gray-100"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default IframePage