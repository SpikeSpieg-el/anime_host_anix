"use client"
import Image from "next/image"
import Link from "next/link"
import { Play, Info, Star, Calendar, Film, Globe, Tv, Flame, Sparkles } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"

interface HeroBannerProps {
  topOfWeekAnime: any
  recommendedAnime: any
}

export function HeroBanner({ topOfWeekAnime, recommendedAnime }: HeroBannerProps) {
  const [mode, setMode] = useState<'top' | 'recommended'>('top')
  const anime = mode === 'top' ? topOfWeekAnime : recommendedAnime
  
  if (!anime) return null

  const desktopBackdrop = anime.backdrop || anime.poster

  return (
    <div className="relative w-full h-[550px] md:h-[700px] mb-12 overflow-hidden">
      {/* Фоновое изображение */}
      <div className="absolute inset-0">
        {/* Mobile image */}
        <Image
          src={anime.poster}
          alt={anime.title}
          fill
          priority
          className="object-cover object-top opacity-60 md:hidden"
        />

        {/* Desktop image (prefer horizontal backdrop if available) */}
        <Image
          src={desktopBackdrop}
          alt={anime.title}
          fill
          priority
          className="hidden md:block object-cover object-top opacity-100"
        />
        {/* Градиентный переход в черный */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent" />
      </div>

      {/* Контент */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-20 z-10">
        <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-10 duration-700">
          {/* Кнопки переключения */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setMode('top')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                mode === 'top'
                  ? 'bg-orange-500 text-white border border-orange-400'
                  : 'bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Flame size={14} />
              Топ недели
            </button>
            <button
              onClick={() => setMode('recommended')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                mode === 'recommended'
                  ? 'bg-orange-500 text-white border border-orange-400'
                  : 'bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Sparkles size={14} />
              Рекомендуем
            </button>
          </div>

          <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-orange-400 border border-orange-500/30 bg-orange-500/10 rounded-full uppercase">
            {mode === 'top' ? 'Хит сезона' : 'Для вас'}
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            {anime.title}
          </h1>

          <div className="flex items-center gap-4">
            <Link
              href={`/watch/${anime.id}`}
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all hover:scale-105 shadow-lg shadow-orange-900/20"
            >
              <Play fill="currentColor" size={20} />
              Смотреть
            </Link>

            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-3.5 rounded-xl font-bold transition-colors border border-white/10">
                  <Info size={20} />
                  Подробнее
                </button>
              </DialogTrigger>
              <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">{anime.title}</DialogTitle>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                  {/* Технические характеристики */}
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <Film className="h-4 w-4 text-orange-500" />
                      <span>{anime.quality}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <Calendar className="h-4 w-4 text-orange-500" />
                      <span>{anime.year}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <Tv className="h-4 w-4 text-orange-500" />
                      <span>{anime.episodesTotal > 0 ? `${anime.episodesTotal} эп.` : 'Анонс'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <span className="text-amber-500 font-medium">{anime.rating}</span>
                    </div>
                  </div>

                  {/* Жанры */}
                  <div className="flex flex-wrap gap-2">
                    {anime.genres?.map((genre: string) => (
                      <span key={genre} className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300 border border-zinc-700">
                        {genre}
                      </span>
                    ))}
                  </div>

                  {/* Описание */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-white">Описание</h3>
                    <p className="text-zinc-400 leading-relaxed">
                      {anime.description || "Описание отсутствует..."}
                    </p>
                  </div>

                  {/* Кнопка действия */}
                  <Link
                    href={`/watch/${anime.id}`}
                    className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl font-bold transition-all"
                  >
                    <Play fill="currentColor" size={20} />
                    Смотреть сейчас
                  </Link>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}