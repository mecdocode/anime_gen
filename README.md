# Retro Anime Finder

A retro-inspired anime recommendation web application that helps users discover their next favorite anime through a personalized quiz experience.

## Features

- **Retro Minimalist Design**: 90s-inspired interface with pixel fonts and muted colors
- **Personalized Quiz**: 5-question quiz that builds a taste profile
- **Smart Recommendations**: Algorithm matches user preferences with 7000+ anime titles
- **Rich Data**: Integration with AniList API for up-to-date anime information
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React + Vite, Tailwind CSS
- **Backend**: Node.js + Express.js
- **Data**: CSV database + AniList GraphQL API
- **Styling**: Tailwind CSS with custom retro theme

## Project Structure

```
retro-anime-finder/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── index.html
│   └── package.json
├── backend/                 # Express.js backend
│   ├── data/               # CSV data files
│   ├── server.js           # Main server file
│   └── package.json
└── package.json            # Root package.json
```

## Installation & Setup

1. **Install dependencies for all packages:**
   ```bash
   npm run install:all
   ```

2. **Start the development servers:**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend on http://localhost:3000
   - Backend on http://localhost:5000

## How It Works

### Quiz System
The quiz consists of 5 carefully crafted questions that map user preferences to anime genres:

1. **World Setting** - Fantasy, Sci-Fi, Slice of Life, Mystery
2. **Story Pacing** - Action, Drama, Psychological, Comedy  
3. **Central Theme** - Friendship, Romance, Personal Quest, Mystery
4. **Overall Feeling** - Heartwarming, Intense, Hilarious, Epic
5. **Classic Tropes** - Sports, Music, Supernatural, Survival

Each answer adds points to specific genres, building a "taste profile" object.

### Recommendation Algorithm
1. **Scoring**: Each anime gets a score based on genre matches with user's taste profile
2. **Rating Bonus**: Highly-rated anime get a small bonus to break ties
3. **Top Selection**: Top 15 scoring anime are selected
4. **Data Enrichment**: Selected anime are enriched with AniList API data

### API Integration
- **Internal Database**: Fast in-memory processing of 7000+ anime from CSV
- **AniList API**: Rich metadata including cover images, descriptions, and current ratings
- **Error Handling**: Graceful fallbacks if external API fails

## Development

### Frontend Development
```bash
cd frontend
npm run dev
```

### Backend Development  
```bash
cd backend
npm run dev
```

### Building for Production
```bash
npm run build
```

## Deployment

### Vercel (Recommended)
This project is optimized for Vercel deployment with serverless functions:

1. **One-Click Deploy**:
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/retro-anime-finder)

2. **Manual Deploy**:
   ```bash
   npm i -g vercel
   vercel
   ```

3. **Configuration**: 
   - Uses `vercel.json` for automatic configuration
   - Frontend builds with Vite to `frontend/dist/`
   - API functions in `/api/` directory deploy as serverless endpoints
   - No environment variables required

### Other Platforms
- **Netlify** - Static site with serverless functions
- **Railway** - Full-stack deployment
- **Heroku** - Traditional server deployment

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/recommend` - Get anime recommendations
  - Body: `{ "tasteProfile": { "Fantasy": 2, "Action": 1, ... } }`
  - Response: Array of anime objects with rich metadata

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for learning or building your own anime recommendation system!

---

**Find your next story.** ◆
