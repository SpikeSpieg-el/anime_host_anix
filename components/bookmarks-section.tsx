"use client"

import { useMemo } from "react"
import { AnimeCard } from "@/components/anime-card"
import { useBookmarks } from "@/components/bookmarks-provider"

export function BookmarksSection() {
  const { items } = useBookmarks()

  const list = useMemo(() => items.slice(0, 12), [items])

  if (items.length === 0) return null

  return (
    <section className="mb-16">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">Сохранённое</h2>
          <p className="text-zinc-500 text-sm">Закладки: что посмотреть позже</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8">
        {list.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </section>
  )
}
