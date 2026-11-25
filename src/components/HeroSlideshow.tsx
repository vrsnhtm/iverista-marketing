import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion'
import { slides } from '../data/slides'
import { cn } from '../lib/utils'

const AUTOPLAY_MS = 5600
const SWIPE_THRESHOLD = 48

const textGroup: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const textItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

/**
 * Full-viewport cinematic slideshow with Ken Burns motion, crossfades, swipe,
 * keyboard controls and an autoplay progress indicator. Autoplay is disabled
 * when the visitor asks for reduced motion.
 */
export function HeroSlideshow() {
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [pageHidden, setPageHidden] = useState(false)
  const reduceMotion = useReducedMotion()
  const progressRef = useRef<HTMLSpanElement | null>(null)
  const touchStartX = useRef<number | null>(null)

  const active = slides[index]
  const paused = hovered || pageHidden || reduceMotion

  const goTo = useCallback((next: number) => {
    setIndex((next + slides.length) % slides.length)
  }, [])

  // Preload only the slide after this one — the rest would fight the first paint for bandwidth.
  useEffect(() => {
    const next = slides[(index + 1) % slides.length]
    const image = new Image()
    image.src = next.image
  }, [index])

  useEffect(() => {
    const onVisibility = () => setPageHidden(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  // Autoplay timer + progress bar (updated directly on the DOM to avoid re-renders).
  useEffect(() => {
    if (progressRef.current) progressRef.current.style.transform = 'scaleX(0)'
    if (paused) return

    let frame = 0
    let elapsed = 0
    let last = performance.now()

    const step = (now: number) => {
      elapsed += now - last
      last = now
      const progress = Math.min(1, elapsed / AUTOPLAY_MS)
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`
      if (progress >= 1) {
        setIndex((current) => (current + 1) % slides.length)
        return
      }
      frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
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

  const ctaIsExternal = /^https?:/i.test(active.cta.href)

  return (
    <section
      id="home"
      aria-label="iverista highlights"
      aria-roledescription="carousel"
      className="relative isolate h-[100svh] min-h-[620px] w-full overflow-hidden bg-espresso"
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
      {/* Background images: crossfade + Ken Burns */}
      <div className="absolute inset-0" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.div
            key={active.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={active.image}
              alt={active.alt}
              className={cn(
                'h-full w-full object-cover',
                !reduceMotion && (index % 2 === 0 ? 'ken-burns-a' : 'ken-burns-b'),
              )}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Cinematic overlays: gradient, vignette, grain, letterbox bars */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/50 to-espresso/25" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(100deg,rgba(20,12,9,0.72)_0%,rgba(20,12,9,0.28)_55%,transparent_100%)]" />
      <div aria-hidden="true" className="film-vignette absolute inset-0" />
      <div aria-hidden="true" className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.18]" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-2 bg-espresso/95" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2 bg-espresso/95" />

      {/* Slide copy */}
      <div className="relative z-20 flex h-full items-center">
        <div className="container-x w-full pb-28 pt-28 sm:pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              className="max-w-2xl"
              variants={textGroup}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              <motion.p variants={textItem} className="eyebrow !text-caramel">
                {active.eyebrow}
              </motion.p>
              <motion.h1
                variants={textItem}
                className="mt-5 font-display text-[clamp(2.55rem,7.2vw,5rem)] font-medium leading-[1.03] text-foam text-shadow-hero"
              >
                {active.headline}
              </motion.h1>
              <motion.p variants={textItem} className="mt-5 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
                {active.subtext}
              </motion.p>
              <motion.div variants={textItem} className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
                <a
                  href={active.cta.href}
                  {...(ctaIsExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="btn btn-caramel"
                >
                  {active.cta.label}
                  <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a href="#visit" className="btn btn-light">
                  Get It Delivered
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0 z-30">
        <div className="container-x flex items-end justify-between gap-4 pb-7">
          <div className="flex items-center gap-2.5" role="group" aria-label="Choose a slide">
            {slides.map((slide, slideIndex) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(slideIndex)}
                aria-label={`Go to slide ${slideIndex + 1}: ${slide.headline}`}
                aria-current={slideIndex === index ? 'true' : undefined}
                className={cn(
                  'relative h-2.5 rounded-full transition-all duration-500 ease-out-soft focus-visible:ring-offset-espresso',
                  slideIndex === index ? 'w-12 bg-cream/30' : 'w-2.5 bg-cream/45 hover:bg-cream/80',
                )}
              >
                {slideIndex === index ? (
                  <span
                    ref={progressRef}
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 block w-full origin-left rounded-full bg-caramel"
                    style={{ transform: 'scaleX(0)' }}
                  />
                ) : null}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden font-display text-sm tracking-[0.2em] text-cream/70 sm:block">
              {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                aria-label="Previous slide"
                className="grid h-11 w-11 place-items-center rounded-full border border-cream/30 bg-espresso/20 text-cream backdrop-blur-sm transition hover:border-cream/70 hover:bg-cream/15"
              >
                <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 4l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                aria-label="Next slide"
                className="grid h-11 w-11 place-items-center rounded-full border border-cream/30 bg-espresso/20 text-cream backdrop-blur-sm transition hover:border-cream/70 hover:bg-cream/15"
              >
                <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M8 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {`Slide ${index + 1} of ${slides.length}: ${active.headline}`}
      </p>
    </section>
  )
}
