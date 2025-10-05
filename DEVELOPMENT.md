# Development Guide

## Quick Start

1. **Run the setup script:**
   ```bash
   ./setup.bat
   ```

2. **Start development servers:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Project Architecture

### Frontend (React + Vite)
- **Landing.jsx** - Welcome screen with retro styling
- **Quiz.jsx** - 5-question quiz with taste profile generation
- **Loading.jsx** - Retro loading animation with cassette tape
- **Results.jsx** - Grid display of recommendations
- **AnimeCard.jsx** - Individual anime card component

### Backend (Express.js)
- **server.js** - Main server with API endpoints
- **CSV Processing** - In-memory caching of 7000+ anime
- **AniList Integration** - Rich data fetching from external API
- **Scoring Algorithm** - Genre matching with rating bonuses

### Styling (Tailwind CSS)
- **Retro Theme** - Custom colors and fonts
- **Responsive Design** - Mobile-first approach
- **Animations** - Smooth transitions and loading states

## Key Features

### Quiz System
Each question maps to specific genres with weighted scores:
- Question 1: World setting (Fantasy, Sci-Fi, Slice of Life, Mystery)
- Question 2: Story pacing (Action, Drama, Psychological, Comedy)
- Question 3: Central theme (Adventure, Romance, Action, Mystery)
- Question 4: Overall feeling (Slice of Life, Psychological, Comedy, Adventure)
- Question 5: Classic tropes (Sports, Music, Sci-Fi, Action)

### Recommendation Algorithm
1. **Genre Matching** - Sum scores for matching genres
2. **Rating Bonus** - Boost highly-rated anime (>7.0)
3. **Top Selection** - Select top 15 matches
4. **Data Enrichment** - Fetch rich data from AniList API

### Error Handling
- Graceful API failures
- Fallback to CSV data
- User-friendly error messages
- Robust CSV parsing

## API Endpoints

### GET /api/health
Health check endpoint
```json
{
  "status": "OK",
  "message": "Retro Anime Finder API is running"
}
```

### POST /api/recommend
Get anime recommendations
```json
// Request
{
  "tasteProfile": {
    "Fantasy": 2,
    "Action": 1,
    "Drama": 1
  }
}

// Response
[
  {
    "title": "Fullmetal Alchemist: Brotherhood",
    "coverImage": "https://...",
    "synopsis": "...",
    "year": 2009,
    "rating": "9.1",
    "genres": ["Fantasy", "Drama", "Adventure", "Action"],
    "episodes": 64
  }
]
```

## Development Tips

### Adding New Questions
1. Update the `questions` array in `Quiz.jsx`
2. Add new genre mappings in the `scores` objects
3. Test the scoring algorithm with various combinations

### Modifying Styling
1. Update colors in `tailwind.config.js`
2. Add new components in `index.css`
3. Use the retro theme classes consistently

### Database Updates
1. Replace the CSV file in `backend/data/`
2. Ensure column names match the parser in `server.js`
3. Test with a small subset first

### API Integration
1. AniList API is rate-limited (no auth required)
2. Add delays between requests to avoid limits
3. Always include fallback handling

## Troubleshooting

### Common Issues
- **Port conflicts**: Change ports in `vite.config.js` and `server.js`
- **CSV parsing errors**: Check file encoding and format
- **API rate limits**: Increase delays between AniList requests
- **Missing dependencies**: Run `npm run install:all`

### Performance Optimization
- CSV data is cached in memory after first load
- AniList requests are batched with delays
- Frontend uses React's built-in optimizations
- Images are lazy-loaded with error fallbacks

## Deployment

### Vercel (Recommended)
1. Deploy frontend as static site
2. Deploy backend as serverless functions
3. Update API URLs in frontend

### Traditional Hosting
1. Build frontend: `npm run build`
2. Serve static files from `frontend/dist/`
3. Run backend with PM2 or similar process manager

---

Happy coding! 🎌
