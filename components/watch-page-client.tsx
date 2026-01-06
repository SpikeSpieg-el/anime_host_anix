"use client"

import { useState } from "react"
import { KodikPlayer } from "@/components/kodik-player"
import { EpisodeSelector } from "@/components/episode-selector"

interface WatchPageClientProps {
  shikimoriId: string
  title: string
  poster: string
  totalEpisodes: number
  initialEpisode?: number
}

export function WatchPageClient({
  shikimoriId,
  title,
  poster,
  totalEpisodes,
  initialEpisode
}: WatchPageClientProps) {
  // Устанавливаем 1 серию по умолчанию, если ничего не пришло
  const [selectedEpisode, setSelectedEpisode] = useState<number>(initialEpisode || 1)
  const [isStarted, setIsStarted] = useState(!!initialEpisode)

  const handleSelectEpisode = (episode: number) => {
    setSelectedEpisode(episode)
    setIsStarted(true) // При клике на серию сразу включаем плеер
    
    // Плавная прокрутка к плееру при выборе серии (для мобилок)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col gap-6 mb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white">
          {title}
        </h1>
        <div className="flex items-center gap-2 text-orange-500 font-medium">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          Серия {selectedEpisode}
        </div>
      </div>

      {/* Контейнер плеера */}
      <div className="w-full">
        <KodikPlayer
          shikimoriId={shikimoriId}
          title={title}
          poster={poster}
          episode={selectedEpisode}
        />
      </div>

      {/* Селектор серий под плеером */}
      <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-4 md:p-6 backdrop-blur-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
            Выбор серии
            <span className="text-zinc-500 text-sm font-normal">
              (Всего: {totalEpisodes})
            </span>
          </h2>
        </div>

        <EpisodeSelector
          totalEpisodes={totalEpisodes}
          currentEpisode={selectedEpisode}
          onSelectEpisode={handleSelectEpisode}
        />
      </div>
    </div>
  )
}