import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'

// Cache for anime database
let animeDatabase = []
let isDatabaseLoaded = false

// Load anime database from CSV
const loadAnimeDatabase = () => {
  if (isDatabaseLoaded && animeDatabase.length > 0) {
    return animeDatabase
  }

  try {
    // Read CSV file from the data directory
    const csvPath = path.join(process.cwd(), 'backend', 'data', 'enhanced_anime_database.csv')
    const csvContent = fs.readFileSync(csvPath, 'utf-8')
    
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true
    })

    const results = []
    
    records.forEach((data) => {
      try {
        // Parse genres from string format
        let genres = []
        if (data.genres) {
          const genreString = data.genres.replace(/[\[\]']/g, '').trim()
          if (genreString) {
            genres = genreString.split(',').map(g => g.trim().replace(/'/g, ''))
          }
        }

        results.push({
          title: data.base_title,
          episodes: parseInt(data.episodes) || null,
          year: parseInt(data.year) || null,
          rating: parseFloat(data.rating) || null,
          genres: genres,
          mood: data.mood || '',
          complexity: data.complexity || '',
          pacing: data.pacing || '',
          target_audience: data.target_audience || '',
          themes: data.themes || '',
          setting: data.setting || '',
          art_style: data.art_style || '',
          popularity_score: parseInt(data.popularity_score) || 50
        })
      } catch (error) {
        console.error('Error parsing row:', error, data)
      }
    })

    animeDatabase = results
    isDatabaseLoaded = true
    console.log(`Loaded ${animeDatabase.length} anime entries`)
    return animeDatabase
  } catch (error) {
    console.error('Error loading anime database:', error)
    return []
  }
}

// Fetch anime data from AniList API
const fetchAnimeFromAniList = async (title) => {
  try {
    const query = `
      query ($search: String) {
        Media (search: $search, type: ANIME) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            large
            medium
          }
          startDate {
            year
          }
          meanScore
          genres
          description
          episodes
        }
      }
    `

    const variables = { search: title }
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query, variables })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    if (data.data && data.data.Media) {
      const media = data.data.Media
      return {
        title: media.title.romaji || media.title.english || title,
        coverImage: media.coverImage.large || media.coverImage.medium,
        year: media.startDate?.year,
        rating: media.meanScore ? (media.meanScore / 10).toFixed(1) : null,
        genres: media.genres || [],
        synopsis: media.description ? media.description.replace(/<[^>]*>/g, '').substring(0, 200) + '...' : null,
        episodes: media.episodes
      }
    }
    return null
  } catch (error) {
    console.error(`Error fetching ${title} from AniList:`, error.message)
    return null
  }
}

// Improved scoring algorithm
const calculateAnimeScore = (anime, tasteProfile) => {
  let totalScore = 0
  let matchedAttributes = 0
  
  // Helper function to check exact matches
  const checkExactMatch = (animeValue, userPreference, weight = 1) => {
    if (tasteProfile[userPreference] && animeValue === userPreference.split('_')[1]) {
      const score = tasteProfile[userPreference] * weight
      totalScore += score
      matchedAttributes++
      return true
    }
    return false
  }
  
  // Helper function to check if themes contain keywords
  const checkThemeMatch = (animeThemes, themeKeyword, userPreference, weight = 1) => {
    if (tasteProfile[userPreference] && animeThemes.includes(themeKeyword)) {
      const score = tasteProfile[userPreference] * weight
      totalScore += score
      matchedAttributes++
      return true
    }
    return false
  }
  
  // 1. Mood matching (highest priority - 4x weight)
  checkExactMatch(anime.mood, 'mood_emotional', 4)
  checkExactMatch(anime.mood, 'mood_lighthearted', 4)
  checkExactMatch(anime.mood, 'mood_tense', 4)
  checkExactMatch(anime.mood, 'mood_inspiring', 4)
  checkExactMatch(anime.mood, 'mood_psychological', 4)
  checkExactMatch(anime.mood, 'mood_romantic', 4)
  checkExactMatch(anime.mood, 'mood_dark', 4)
  checkExactMatch(anime.mood, 'mood_adventurous', 4)
  checkExactMatch(anime.mood, 'mood_contemplative', 4)
  
  // Handle special mood cases
  if (anime.mood === 'hilarious' && tasteProfile['mood_lighthearted']) {
    const score = tasteProfile['mood_lighthearted'] * 4
    totalScore += score
    matchedAttributes++
  }
  if (anime.mood === 'serious' && tasteProfile['mood_tense']) {
    const score = tasteProfile['mood_tense'] * 3
    totalScore += score
    matchedAttributes++
  }
  if (anime.mood === 'bittersweet' && tasteProfile['mood_emotional']) {
    const score = tasteProfile['mood_emotional'] * 4
    totalScore += score
    matchedAttributes++
  }
  
  // 2. Complexity matching (high priority - 3x weight)
  checkExactMatch(anime.complexity, 'complexity_low', 3)
  checkExactMatch(anime.complexity, 'complexity_medium', 3)
  checkExactMatch(anime.complexity, 'complexity_high', 3)
  if (anime.complexity === 'very_high' && tasteProfile['complexity_very_high']) {
    const score = tasteProfile['complexity_very_high'] * 3
    totalScore += score
    matchedAttributes++
  }
  
  // 3. Theme matching (high priority - 3x weight)
  checkThemeMatch(anime.themes, 'love', 'themes_love', 3)
  checkThemeMatch(anime.themes, 'loss', 'themes_love_loss', 3)
  checkThemeMatch(anime.themes, 'friendship', 'themes_friendship', 3)
  checkThemeMatch(anime.themes, 'psychology', 'themes_psychology', 3)
  checkThemeMatch(anime.themes, 'healing', 'themes_healing', 3)
  checkThemeMatch(anime.themes, 'heroism', 'themes_heroism', 3)
  checkThemeMatch(anime.themes, 'growth', 'themes_growth', 3)
  checkThemeMatch(anime.themes, 'philosophy', 'themes_philosophy', 3)
  checkThemeMatch(anime.themes, 'mystery', 'themes_mystery', 3)
  checkThemeMatch(anime.themes, 'power', 'themes_power', 3)
  checkThemeMatch(anime.themes, 'technology', 'themes_technology', 3)
  
  // 4. Setting matching (medium priority - 2x weight)
  if (anime.setting.includes('modern') && tasteProfile['setting_modern']) {
    const score = tasteProfile['setting_modern'] * 2
    totalScore += score
    matchedAttributes++
  }
  if (anime.setting.includes('fantasy') && tasteProfile['setting_fantasy']) {
    const score = tasteProfile['setting_fantasy'] * 2
    totalScore += score
    matchedAttributes++
  }
  if (anime.setting.includes('sci') && tasteProfile['setting_scifi']) {
    const score = tasteProfile['setting_scifi'] * 2
    totalScore += score
    matchedAttributes++
  }
  if (anime.setting.includes('historical') && tasteProfile['setting_historical']) {
    const score = tasteProfile['setting_historical'] * 2
    totalScore += score
    matchedAttributes++
  }
  
  // 5. Target audience matching (medium priority - 2x weight)
  checkExactMatch(anime.target_audience, 'target_teen', 2)
  checkExactMatch(anime.target_audience, 'target_mature', 2)
  if (anime.target_audience === 'teen_adult' && tasteProfile['target_teen_adult']) {
    const score = tasteProfile['target_teen_adult'] * 2
    totalScore += score
    matchedAttributes++
  }
  
  // 6. Episode preference matching (medium priority - 2x weight)
  if (tasteProfile['episodes_short'] && anime.episodes && anime.episodes <= 26) {
    const score = tasteProfile['episodes_short'] * 2
    totalScore += score
    matchedAttributes++
  }
  if (tasteProfile['episodes_long'] && anime.episodes && anime.episodes >= 50) {
    const score = tasteProfile['episodes_long'] * 2
    totalScore += score
    matchedAttributes++
  }
  if (tasteProfile['episodes_movie'] && anime.episodes && anime.episodes <= 3) {
    const score = tasteProfile['episodes_movie'] * 2
    totalScore += score
    matchedAttributes++
  }
  
  // 7. Pacing matching (low priority - 1x weight)
  checkExactMatch(anime.pacing, 'pacing_slow', 1)
  checkExactMatch(anime.pacing, 'pacing_medium', 1)
  checkExactMatch(anime.pacing, 'pacing_fast', 1)
  
  // 8. Art style matching (low priority - 1x weight)
  if (tasteProfile['art_beautiful'] && anime.art_style.includes('beautiful')) {
    const score = tasteProfile['art_beautiful'] * 1
    totalScore += score
    matchedAttributes++
  }
  if (tasteProfile['art_unique'] && anime.art_style.includes('unique')) {
    const score = tasteProfile['art_unique'] * 1
    totalScore += score
    matchedAttributes++
  }
  
  // If no attributes matched, return 0
  if (matchedAttributes === 0) {
    return 0
  }
  
  // Calculate base score
  const baseScore = totalScore
  
  // Rating bonus (high-rated anime get significant boost)
  const rating = anime.rating || 6.0
  const ratingBonus = Math.max(0, (rating - 7.0) * 2)
  
  // Popularity bonus (popular anime get small boost)
  const popularity = anime.popularity_score || 50
  const popularityBonus = Math.max(0, (popularity - 80) / 20)
  
  // Final score calculation
  const finalScore = baseScore + ratingBonus + popularityBonus
  
  return finalScore
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { tasteProfile } = req.body
    
    if (!tasteProfile || typeof tasteProfile !== 'object') {
      return res.status(400).json({ error: 'Invalid taste profile' })
    }

    // Load database
    const database = loadAnimeDatabase()
    
    if (database.length === 0) {
      return res.status(500).json({ error: 'Failed to load anime database' })
    }
    
    console.log('\n=== RECOMMENDATION PROCESS ===')
    console.log('User Taste Profile:', tasteProfile)
    
    // Calculate scores for all anime using the advanced algorithm
    const scoredAnime = database.map(anime => ({
      ...anime,
      score: calculateAnimeScore(anime, tasteProfile)
    }))
    
    // Filter and sort by score
    const topAnime = scoredAnime
      .filter(anime => anime.score > 5) // Only anime with good matches
      .sort((a, b) => b.score - a.score) // Sort by score descending
      .slice(0, 15) // Take top 15
    
    console.log(`Found ${topAnime.length} recommendations from ${database.length} total anime`)
    
    // Fetch rich data from AniList API
    const enrichedRecommendations = []
    
    for (const anime of topAnime) {
      try {
        const enrichedData = await fetchAnimeFromAniList(anime.title)
        if (enrichedData) {
          enrichedRecommendations.push(enrichedData)
        } else {
          // Fallback to CSV data if AniList fails
          enrichedRecommendations.push({
            title: anime.title,
            coverImage: null,
            year: anime.year,
            rating: anime.rating,
            genres: anime.genres,
            synopsis: `A ${anime.genres.join(', ')} anime from ${anime.year}`,
            episodes: anime.episodes
          })
        }
      } catch (error) {
        console.error(`Error enriching ${anime.title}:`, error)
        // Add fallback data
        enrichedRecommendations.push({
          title: anime.title,
          coverImage: null,
          year: anime.year,
          rating: anime.rating,
          genres: anime.genres,
          synopsis: `A ${anime.genres.join(', ')} anime from ${anime.year}`,
          episodes: anime.episodes
        })
      }
    }

    console.log(`Returning ${enrichedRecommendations.length} enriched recommendations`)
    
    res.status(200).json({
      recommendations: enrichedRecommendations,
      total: enrichedRecommendations.length
    })

  } catch (error) {
    console.error('Error in recommend endpoint:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    })
  }
}
