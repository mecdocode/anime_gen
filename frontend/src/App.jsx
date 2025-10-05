import { useState } from 'react'
import Landing from './components/Landing'
import Quiz from './components/Quiz'
import Loading from './components/Loading'
import Results from './components/Results'

function App() {
  const [appState, setAppState] = useState('landing') // 'landing', 'quiz', 'loading', 'results'
  const [quizAnswers, setQuizAnswers] = useState({})
  const [recommendations, setRecommendations] = useState([])

  const startQuiz = () => {
    setAppState('quiz')
    setQuizAnswers({})
  }

  const submitQuiz = async (answers) => {
    setQuizAnswers(answers)
    setAppState('loading')
    
    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tasteProfile: answers }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to get recommendations')
      }
      
      const data = await response.json()
      setRecommendations(data)
      setAppState('results')
    } catch (error) {
      console.error('Error getting recommendations:', error)
      // For now, show empty results on error
      setRecommendations([])
      setAppState('results')
    }
  }

  const resetApp = () => {
    setAppState('landing')
    setQuizAnswers({})
    setRecommendations([])
  }

  return (
    <div className="min-h-screen bg-retro-bg">
      {appState === 'landing' && <Landing onStartQuiz={startQuiz} />}
      {appState === 'quiz' && <Quiz onSubmitQuiz={submitQuiz} />}
      {appState === 'loading' && <Loading />}
      {appState === 'results' && (
        <Results 
          recommendations={recommendations} 
          onStartOver={resetApp}
        />
      )}
    </div>
  )
}

export default App
