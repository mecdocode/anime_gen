import React, { useState, useEffect } from 'react'

const Loading = () => {
  const [currentMessage, setCurrentMessage] = useState(0)
  
  const messages = [
    "Consulting the archives...",
    "Analyzing your taste profile...",
    "Connecting to the AniList network...",
    "Calculating compatibility scores...",
    "Preparing your recommendations..."
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto animate-fade-in">
        {/* Retro Loading Animation */}
        <div className="mb-12">
          <div className="font-pixel text-4xl md:text-6xl text-retro-accent mb-8">
            ◆ PROCESSING ◆
          </div>
          
          {/* ASCII Art Cassette Tape */}
          <div className="font-pixel text-retro-text text-sm md:text-base mb-8 leading-tight">
            <pre className="whitespace-pre">
{`    ┌─────────────────┐
    │  ◉         ◉   │
    │    ┌─────┐     │
    │    │█████│     │
    │    └─────┘     │
    └─────────────────┘`}
            </pre>
          </div>
          
          {/* Loading Bar */}
          <div className="w-64 mx-auto bg-retro-bg-dark border-2 border-retro-text h-4 mb-6">
            <div className="bg-retro-accent h-full animate-pulse" style={{ width: '70%' }} />
          </div>
        </div>

        {/* Loading Messages */}
        <div className="font-pixel text-lg md:text-xl text-retro-text">
          <div className="loading-dots">
            {messages[currentMessage]}
          </div>
        </div>

        {/* Command Line Style */}
        <div className="mt-8 font-pixel text-sm text-retro-text opacity-50">
          <div className="text-left max-w-md mx-auto">
            <div>&gt; init_recommendation_engine.exe</div>
            <div>&gt; loading_anime_database...</div>
            <div>&gt; parsing_user_preferences...</div>
            <div className="animate-pulse">&gt; _</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading
