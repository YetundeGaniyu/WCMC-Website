'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function HeroSlideshow({ images, heading, subheading }: {
  images: any[]
  heading: string
  subheading: string
}) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [images.length])

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {/* Images */}
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={img.url}
            alt={img.alt || heading}
            fill
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20 z-10" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-white max-w-2xl">
            {heading}
          </h1>
          <p className="text-white/90 text-lg mt-4 max-w-xl">{subheading}</p>
          <div className="flex gap-4 mt-8">
            <a href="/visit" className="bg-red text-white px-6 py-3 rounded-md font-semibold hover:bg-red-dark transition-colors">
              Plan your visit
            </a>
            <a href="/whats-on" className="border border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white/10 transition-colors">
              What&apos;s on this week
            </a>
          </div>
        </div>
      </div>

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === current ? 'bg-white scale-125' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      )}

      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => setCurrent(prev => (prev - 1 + images.length) % images.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/50 text-white flex items-center justify-center hover:bg-white/20"
          >
            ‹
          </button>
          <button
            onClick={() => setCurrent(prev => (prev + 1) % images.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/50 text-white flex items-center justify-center hover:bg-white/20"
          >
            ›
          </button>
        </>
      )}
    </div>
  )
}
