import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '../lib/utils'

interface Testimonial {
  quote: string
  name: string
  role: string
  /** Optional photo of the drink arriving, shown beside the quote. */
  photo?: string
  photoAlt?: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      'Honest review: yung matcha latte lasang ceremonial grade na matcha ginamit, sakto lang yung tamis, creaminess at matcha lang matitikman mo. 9.5/10. Yung spanish latte naman nag susuntukan sa pag balance yung espresso at cream, the best! 9.5/10.',
    name: 'JB P.',
    role: 'Customer review',
    photo: '/images/review-jb-p.webp',
    photoAlt: 'JB P. smiling while holding up two iverista iced drinks in a takeaway bag',
  },
]

function Stars() {
  return (
    <div className="flex gap-1" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg key={index} viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 fill-caramel">
          <path d="M10 1.8l2.5 5 5.5.8-4 3.9.95 5.5L10 14.4 5.05 17l.95-5.5-4-3.9 5.5-.8z" />
        </svg>
      ))}
    </div>
  )
}

/** Customer quotes in a keyboard-accessible carousel (controls hide themselves when only one is listed). */
export function Testimonials() {
  const [index, setIndex] = useState(0)
  const active = testimonials[index]

  const go = (next: number) => setIndex((next + testimonials.length) % testimonials.length)

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-espresso py-24 text-cream sm:py-28 lg:py-32"
    >
      <div aria-hidden="true" className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.12]" />
      <div aria-hidden="true" className="absolute -right-16 top-10 select-none font-display text-[16rem] leading-none text-cream/[0.04]">
        ”
      </div>

      <div className="container-x relative">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Kind words</p>
            <h2 id="testimonials-heading" className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-[1.08]">
              From our regulars.
            </h2>
          </div>
          <div className={cn('flex gap-2', testimonials.length < 2 && 'hidden')}>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-cream/25 text-cream transition hover:border-cream/70 hover:bg-cream/10"
            >
              <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 4l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-cream/25 text-cream transition hover:border-cream/70 hover:bg-cream/10"
            >
              <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M8 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-12 min-h-[19rem] sm:min-h-[16rem]" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.blockquote
              key={active.name}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="grid max-w-4xl gap-8 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-start lg:gap-12"
            >
              <div>
                <Stars />
                <p className="mt-6 font-display text-[clamp(1.45rem,3.2vw,2.15rem)] font-normal leading-snug text-cream/95">
                  “{active.quote}”
                </p>
                <footer className="mt-7 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-caramel/20 font-display text-sm text-caramel">
                    {active.name.charAt(0)}
                  </span>
                  <span>
                    <cite className="block not-italic font-semibold text-cream">{active.name}</cite>
                    <span className="block text-xs uppercase tracking-widest text-cream/50">{active.role}</span>
                  </span>
                </footer>
              </div>

              {active.photo ? (
                <figure className="order-first w-36 sm:w-44 lg:order-none lg:mt-1 lg:w-full">
                  <img
                    src={active.photo}
                    alt={active.photoAlt ?? ''}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[9/16] w-full rounded-[1.2rem] object-cover ring-1 ring-cream/15"
                  />
                  <figcaption className="mt-3 text-[0.68rem] uppercase tracking-[0.18em] text-cream/45">
                    Delivered to {active.name}
                  </figcaption>
                </figure>
              ) : null}
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div
          className={cn('mt-8 gap-2', testimonials.length > 1 ? 'flex' : 'hidden')}
          role="group"
          aria-label="Choose a testimonial"
        >
          {testimonials.map((testimonial, dotIndex) => (
            <button
              key={testimonial.name}
              type="button"
              onClick={() => setIndex(dotIndex)}
              aria-label={`Testimonial ${dotIndex + 1}: ${testimonial.name}`}
              aria-current={dotIndex === index ? 'true' : undefined}
              className={cn(
                'h-2 rounded-full transition-all duration-500',
                dotIndex === index ? 'w-10 bg-caramel' : 'w-2 bg-cream/30 hover:bg-cream/60',
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
