import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { menuPosters } from '../data/menu'
import { cn } from '../lib/utils'

const AUTOPLAY_MS = 6500
const SWIPE_THRESHOLD = 48

/**
 * The printed menu as a poster slideshow: autoplay, arrows, labelled dots,
 * swipe and arrow-key controls. Autoplay pauses on hover/focus and is disabled
 * when the visitor asks for reduced motion.
 */
export function MenuSlideshow() {
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [pageHidden, setPageHidden] = useState(false)
  const reduceMotion = useReducedMotion()
  const touchStartX = useRef<number | null>(null)
  const posterRef = useRef<HTMLDivElement | null>(null)

  const active = menuPosters[index]
  const paused = hovered || pageHidden || reduceMotion

  const goTo = useCallback((next: number) => {
    setIndex((next + menuPosters.length) % menuPosters.length)
  }, [])

  // Preload every poster so the first pass through never flashes empty.
  useEffect(() => {
    for (const poster of menuPosters) {
      const image = new Image()
      image.src = poster.image
    }
  }, [])

  useEffect(() => {
    const onVisibility = () => setPageHidden(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  useEffect(() => {
    if (paused) return
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % menuPosters.length), AUTOPLAY_MS)
    return () => window.clearTimeout(timer)
  }, [index, paused])

  const onTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null
  }

  const onTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const start = touchStartX.current
    touchStartX.current = null
    const end = event.changedTouches[0]?.clientX
    if (start === null || typeof end !== 'number') return
    const delta = end - start
    if (Math.abs(delta) < SWIPE_THRESHOLD) return
    goTo(delta < 0 ? index + 1 : index - 1)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goTo(index + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goTo(index - 1)
    }
  }

  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="relative isolate overflow-hidden bg-espresso py-24 sm:py-28 lg:py-32"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHovered(false)
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={onKeyDown}
    >
      <div aria-hidden="true" className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.12]" />

      <div className="container-x relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow !text-caramel">The menu</p>
            <h2 id="menu-heading" className="section-heading mt-5 !text-foam">
              Every cup, on one card.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-cream/75 sm:text-lg">
              Coffee comes iced 16 oz or hot 12 oz; signature coffee, non-coffee, sodas and refreshers are
              iced 16 oz. Swipe through, or use the arrows.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden font-display text-sm tracking-[0.2em] text-cream/60 sm:block">
              {String(index + 1).padStart(2, '0')} / {String(menuPosters.length).padStart(2, '0')}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                aria-label="Previous menu poster"
                className="grid h-11 w-11 place-items-center rounded-full border border-cream/30 text-cream transition hover:border-cream/70 hover:bg-cream/10"
              >
                <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 4l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                aria-label="Next menu poster"
                className="grid h-11 w-11 place-items-center rounded-full border border-cream/30 text-cream transition hover:border-cream/70 hover:bg-cream/10"
              >
                <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M8 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="w-full max-w-[34rem]">
            <div
              ref={posterRef}
              aria-roledescription="carousel"
              aria-label="iverista menu posters"
              className="relative rounded-[1.7rem] bg-gradient-to-br from-[#5a3626] via-roast to-[#332015] p-2.5 shadow-frame"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-cream">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={active.id}
                    src={active.image}
                    alt={active.alt}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 h-full w-full object-contain p-2 sm:p-3"
                  />
                </AnimatePresence>
              </div>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[1.7rem] ring-1 ring-inset ring-white/10"
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Choose a menu poster">
              {menuPosters.map((poster, posterIndex) => (
                <button
                  key={poster.id}
                  type="button"
                  onClick={() => goTo(posterIndex)}
                  aria-current={posterIndex === index ? 'true' : undefined}
                  aria-label={`Show the ${poster.label} menu poster`}
                  className={cn(
                    'rounded-full border px-3.5 py-1.5 text-xs font-medium transition',
                    posterIndex === index
                      ? 'border-caramel bg-caramel text-espresso'
                      : 'border-cream/25 text-cream/70 hover:border-cream/60 hover:text-cream',
                  )}
                >
                  {poster.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {`Poster ${index + 1} of ${menuPosters.length}: ${active.label}`}
        </p>
      </div>
    </section>
  )
}
