import React from 'react'
import DonateButton from './DonateButton'

const Landing = ({ onStartQuiz }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto animate-fade-in">
        {/* Pixel Art Logo */}
        <div className="mb-8">
          <div className="font-pixel text-4xl sm:text-6xl md:text-8xl text-retro-text mb-4">
            ◆ RETRO ◆
          </div>
          <div className="font-pixel text-2xl sm:text-4xl md:text-6xl text-retro-accent">
            ANIME FINDER
          </div>
        </div>
        
        {/* Tagline */}
        <div className="mb-12">
          <p className="font-pixel text-lg sm:text-xl md:text-2xl text-retro-text mb-2">
            Find your next story.
          </p>
          <p className="font-sans text-sm md:text-base text-retro-text opacity-75 max-w-md mx-auto px-4">
            Discover personalized anime recommendations through a curated retro quiz experience.
          </p>
        </div>
        
        {/* CTA Button */}
        <div className="flex flex-col items-center gap-6">
          <button 
            onClick={onStartQuiz}
            className="retro-button text-xl md:text-2xl px-8 py-4 animate-pulse-slow"
          >
            BEGIN QUIZ
          </button>
          
          <DonateButton />
        </div>
        
        {/* Decorative Elements */}
        <div className="mt-16 font-pixel text-retro-text opacity-30">
          <div className="flex justify-center space-x-8 text-sm">
            <span>◇</span>
            <span>◆</span>
            <span>◇</span>
            <span>◆</span>
            <span>◇</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
