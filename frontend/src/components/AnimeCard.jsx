import React from 'react'

const AnimeCard = ({ anime }) => {
  const {
    title,
    coverImage,
    year,
    rating,
    genres,
    synopsis,
    episodes
  } = anime

  return (
    <div className="anime-card group w-full max-w-[180px] sm:max-w-none mx-auto">
      {/* Cover Image */}
      <div className="aspect-[2/3] sm:aspect-[3/4] mb-3 sm:mb-4 overflow-hidden bg-retro-bg-dark border border-retro-text">
        {coverImage ? (
          <img 
            src={coverImage} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
        ) : null}
        <div className="w-full h-full flex items-center justify-center font-pixel text-retro-text opacity-50 hidden text-xs sm:text-sm">
          NO IMAGE
        </div>
      </div>

      {/* Anime Info */}
      <div className="space-y-2">
        {/* Title */}
        <h3 className="font-pixel text-sm sm:text-lg text-retro-text line-clamp-2 leading-tight">
          {title}
        </h3>

        {/* Year and Rating */}
        <div className="flex justify-between items-center font-pixel text-xs sm:text-sm text-retro-text opacity-75">
          <span>{year}</span>
          {rating && <span>★ {rating}</span>}
        </div>

        {/* Episodes */}
        {episodes && (
          <div className="font-pixel text-xs text-retro-accent">
            {episodes} eps
          </div>
        )}

        {/* Genres */}
        {genres && genres.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {genres.slice(0, 2).map((genre, index) => (
              <span 
                key={index}
                className="font-pixel text-xs px-1 sm:px-2 py-1 bg-retro-accent text-white"
              >
                {genre}
              </span>
            ))}
            {genres.length > 2 && (
              <span className="font-pixel text-xs text-retro-text opacity-50">
                +{genres.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Synopsis Preview - Hidden on mobile */}
        {synopsis && (
          <p className="hidden sm:block font-sans text-xs text-retro-text opacity-75 line-clamp-2 leading-relaxed">
            {synopsis}
          </p>
        )}
      </div>
    </div>
  )
}

export default AnimeCard
