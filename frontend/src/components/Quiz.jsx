import React, { useState } from 'react'

const Quiz = ({ onSubmitQuiz }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [tasteProfile, setTasteProfile] = useState({})

  const questions = [
    {
      id: 1,
      question: "What kind of emotional experience are you looking for?",
      answers: [
        {
          text: "I want to cry and feel deeply moved by beautiful storytelling",
          scores: { mood_emotional: 3, complexity_medium: 2, themes_love_loss: 2, pacing_slow: 1 }
        },
        {
          text: "I want to laugh and have a fun, lighthearted time",
          scores: { mood_lighthearted: 3, complexity_low: 2, pacing_fast: 2, target_teen: 1 }
        },
        {
          text: "I want to be on the edge of my seat with suspense and thrills",
          scores: { mood_tense: 3, complexity_high: 2, pacing_fast: 2, themes_mystery: 1 }
        },
        {
          text: "I want to feel inspired and motivated by heroic characters",
          scores: { mood_inspiring: 3, themes_heroism: 2, target_teen: 1, pacing_medium: 1 }
        }
      ]
    },
    {
      id: 2,
      question: "How much mental effort do you want to put into following the story?",
      answers: [
        {
          text: "I want something simple and easy to follow while I relax",
          scores: { complexity_low: 3, mood_lighthearted: 2, pacing_medium: 1 }
        },
        {
          text: "I enjoy moderately complex stories with some depth",
          scores: { complexity_medium: 3, target_mature: 1, themes_growth: 1 }
        },
        {
          text: "I love complex narratives that make me think and theorize",
          scores: { complexity_high: 3, target_mature: 2, mood_psychological: 2 }
        },
        {
          text: "I want mind-bending plots that challenge my understanding",
          scores: { complexity_very_high: 3, target_mature: 2, themes_philosophy: 2 }
        }
      ]
    },
    {
      id: 3,
      question: "What setting appeals to you most?",
      answers: [
        {
          text: "Modern day school or city life that feels relatable",
          scores: { setting_modern: 3, target_teen: 2, themes_friendship: 1 }
        },
        {
          text: "Fantasy worlds with magic, dragons, and adventure",
          scores: { setting_fantasy: 3, mood_adventurous: 2, themes_power: 1 }
        },
        {
          text: "Futuristic sci-fi with technology and space",
          scores: { setting_scifi: 3, complexity_high: 1, themes_technology: 1 }
        },
        {
          text: "Historical periods or unique artistic worlds",
          scores: { setting_historical: 2, art_unique: 2, complexity_medium: 1 }
        }
      ]
    },
    {
      id: 4,
      question: "What type of character development interests you most?",
      answers: [
        {
          text: "Romance and relationships between characters",
          scores: { themes_love: 3, mood_romantic: 2, target_teen_adult: 1 }
        },
        {
          text: "Personal growth through friendship and teamwork",
          scores: { themes_friendship: 3, mood_inspiring: 2, target_teen: 1 }
        },
        {
          text: "Dark psychological exploration of human nature",
          scores: { themes_psychology: 3, mood_dark: 2, complexity_high: 2, target_mature: 2 }
        },
        {
          text: "Characters overcoming trauma and finding healing",
          scores: { themes_healing: 3, mood_emotional: 2, complexity_medium: 1, target_mature: 1 }
        }
      ]
    },
    {
      id: 5,
      question: "What's your preferred pacing and episode commitment?",
      answers: [
        {
          text: "Short series (12-26 episodes) with tight, focused storytelling",
          scores: { pacing_fast: 2, complexity_medium: 1, episodes_short: 2 }
        },
        {
          text: "Long series (50+ episodes) I can get deeply invested in",
          scores: { episodes_long: 3, themes_friendship: 2, complexity_medium: 1 }
        },
        {
          text: "Movies or short series with beautiful, complete stories",
          scores: { episodes_movie: 3, art_beautiful: 2, complexity_medium: 1 }
        },
        {
          text: "Slow-paced, contemplative series I can savor",
          scores: { pacing_slow: 3, complexity_high: 2, mood_contemplative: 2, target_mature: 1 }
        }
      ]
    }
  ]

  const handleAnswerClick = (answer) => {
    // Add scores to taste profile
    const newTasteProfile = { ...tasteProfile }
    Object.entries(answer.scores).forEach(([genre, points]) => {
      newTasteProfile[genre] = (newTasteProfile[genre] || 0) + points
    })
    setTasteProfile(newTasteProfile)

    // Move to next question or submit
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      onSubmitQuiz(newTasteProfile)
    }
  }

  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl mx-auto w-full animate-slide-up">
        {/* Progress Indicator */}
        <div className="text-center mb-8">
          <div className="font-pixel text-retro-accent text-lg mb-2">
            {currentQuestion + 1} / {questions.length}
          </div>
          <div className="w-full bg-retro-bg-dark border-2 border-retro-text h-2">
            <div 
              className="bg-retro-accent h-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-12">
          <h2 className="font-pixel text-2xl md:text-3xl text-retro-text mb-4">
            {currentQ.question}
          </h2>
        </div>

        {/* Answer Options */}
        <div className="space-y-4">
          {currentQ.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(answer)}
              className="w-full retro-card hover:bg-retro-accent hover:text-white 
                         text-left p-6 transition-all duration-200 hover:-translate-y-1"
            >
              <div className="font-pixel text-lg md:text-xl">
                {String.fromCharCode(65 + index)}. {answer.text}
              </div>
            </button>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 text-center font-pixel text-retro-text opacity-30">
          <div className="flex justify-center space-x-4 text-sm">
            {Array.from({ length: questions.length }, (_, i) => (
              <span key={i} className={i <= currentQuestion ? 'text-retro-accent' : ''}>
                ◆
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quiz
