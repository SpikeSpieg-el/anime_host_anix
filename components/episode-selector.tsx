"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface EpisodeSelectorProps {
  totalEpisodes: number
  currentEpisode: number
  onSelectEpisode: (episode: number) => void
}

export function EpisodeSelector({ 
  totalEpisodes, 
  currentEpisode, 
  onSelectEpisode 
}: EpisodeSelectorProps) {
  const episodesPerPage = 30 // Чуть больше серий на страницу для удобства
  
  // Вычисляем начальную страницу на основе текущей серии
  // (currentEpisode - 1) потому что серии с 1, а индексы с 0
  const initialPage = Math.floor((currentEpisode - 1) / episodesPerPage)
  
  const [currentPage, setCurrentPage] = useState(initialPage)

  const totalPages = Math.ceil(totalEpisodes / episodesPerPage)
  const startEpisode = currentPage * episodesPerPage + 1
  const endEpisode = Math.min(startEpisode + episodesPerPage - 1, totalEpisodes)

  // Если currentEpisode изменился извне (например, переключили в плеере), 
  // подстраиваем страницу, если серия не видна
  useEffect(() => {
    const targetPage = Math.floor((currentEpisode - 1) / episodesPerPage)
    if (targetPage !== currentPage) {
      setCurrentPage(targetPage)
    }
  }, [currentEpisode])

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1)
  }

  const episodes = Array.from(
    { length: endEpisode - startEpisode + 1 },
    (_, i) => startEpisode + i
  )

  return (
    <div className="w-full">
      {/* Сетка серий */}
      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2 mb-6">
        {episodes.map((episode) => (
          <button
            key={episode}
            type="button"
            onClick={() => onSelectEpisode(episode)}
            className={`
              relative aspect-square rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center
              ${currentEpisode === episode
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30 scale-105 z-10'
                : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-white/5 hover:border-white/10'
              }
            `}
          >
            {episode}
          </button>
        ))}
      </div>

      {/* Пагинация (показываем только если страниц > 1) */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 py-2 bg-zinc-950/30 rounded-lg border border-white/5 w-fit mx-auto px-4">
          <button
            type="button"
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft size={18} />
          </button>
          
          <span className="text-xs font-medium text-zinc-500 min-w-[80px] text-center">
            {startEpisode} - {endEpisode} <span className="text-zinc-700 mx-1">/</span> {totalEpisodes}
          </span>
          
          <button
            type="button"
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
            className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  )
}