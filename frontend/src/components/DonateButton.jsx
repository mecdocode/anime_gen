import React, { useState } from 'react'

const DonateButton = ({ className = "" }) => {
  const [showQR, setShowQR] = useState(false)

  return (
    <div className={`relative ${className}`}>
      {/* Donate Button */}
      <button 
        onClick={() => setShowQR(!showQR)}
        className="group relative bg-gradient-to-r from-retro-accent to-pink-500 text-white px-6 py-3 font-pixel text-sm border-2 border-retro-text hover:scale-105 transition-all duration-200 shadow-lg animate-pulse"
      >
        <div className="flex items-center space-x-2">
          <span>💖</span>
          <div>
            <div className="text-xs">Help me clear my</div>
            <div className="text-lg font-bold">BACKLOG!</div>
          </div>
          <span>🎮</span>
        </div>
        
        {/* Floating animation */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
      </button>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-retro-bg border-4 border-retro-text p-6 max-w-sm w-full text-center animate-fade-in">
            <div className="font-pixel text-xl text-retro-text mb-4">
              ◆ SUPPORT THE DEV ◆
            </div>
            
            <div className="bg-white p-4 border-2 border-retro-text mb-4">
              <img 
                src="/donation-qr.png" 
                alt="Donation QR Code" 
                className="w-full h-auto max-w-[250px] mx-auto"
              />
            </div>
            
            <div className="font-pixel text-sm text-retro-text mb-2">
              dakxrawat@fam
            </div>
            <div className="font-sans text-xs text-retro-text opacity-75 mb-4">
              Every donation helps me focus on creating more awesome projects! 🚀
            </div>
            
            <button 
              onClick={() => setShowQR(false)}
              className="retro-button text-sm px-4 py-2"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DonateButton
