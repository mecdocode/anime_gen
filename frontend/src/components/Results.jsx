import React from 'react'
import AnimeCard from './AnimeCard'
import DonateButton from './DonateButton'

const Results = ({ recommendations, onStartOver }) => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="font-pixel text-2xl sm:text-4xl md:text-6xl text-retro-text mb-4">
            ◆ YOUR RECOMMENDATIONS ◆
          </div>
          <p className="font-sans text-sm sm:text-base text-retro-text opacity-75 mb-6">
            Based on your taste profile, here are {recommendations.length} anime we think you'll love
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onStartOver}
              className="retro-button"
            >
              START OVER
            </button>
            <DonateButton />
          </div>
        </div>

        {/* Results Grid */}
        {recommendations.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6 animate-slide-up">
            {recommendations.map((anime, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <AnimeCard anime={anime} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 animate-fade-in">
            <div className="font-pixel text-2xl text-retro-text mb-4">
              No recommendations found
            </div>
            <p className="font-sans text-retro-text opacity-75 mb-6">
              Something went wrong while fetching your recommendations. Please try again.
            </p>
            <button 
              onClick={onStartOver}
              className="retro-button"
            >
              TRY AGAIN
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 font-pixel text-retro-text opacity-30">
          <div className="flex justify-center space-x-8 text-sm">
            <span>◇</span>
            <span>◆</span>
            <span>◇</span>
            <span>◆</span>
            <span>◇</span>
          </div>
          <div className="mt-4 text-xs">
            Powered by AniList API
          </div>
        </div>
      </div>
    </div>
  )
}

export default Results
