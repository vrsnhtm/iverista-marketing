import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '../lib/utils'

interface DrinkNote {
  drink: string
  /** Stars out of five, decimals allowed. */
  rating: number
  note: string
}

interface Testimonial {
  quote?: string
  /** One review that covers several drinks, each scored on its own. */
  items?: DrinkNote[]
  /** Stars out of five for the whole review, decimals allowed. */
  rating?: number
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
    rating: 4.75,
    name: 'JB P.',
    role: 'Customer review',
    photo: '/images/review-jb-p.webp',
    photoAlt: 'JB P. smiling while holding up two iverista iced drinks in a takeaway bag',
  },
  {
    items: [
      {
        drink: 'Signature dark choco',
        rating: 4,
        note:
          'As mahilig sa chocolate, nagustuhan ko yung timpla. Sakto yung blending ng tamis at pait. Sarap inumin habang nag-aaral.',
      },
      {
        drink: 'Spanish latte (hot)',
        rating: 5,
        note: 'Masarap, tama lang daw yung timpla. Di masyadong matamis kaya nagustuhan ng lola ko.',
      },
    ],
    name: 'M.N.G',
    role: 'Customer review',
  },
  {
    quote:
      '9/10 for the Spanish latte. Gusto ko yung balance lang ang sweetness and tapang ng coffee. Ang cute din ng cup, pwede pang IG story HWHAHAHAHAHA. Thank you verr!! Will order again soon!',
    rating: 4.5,
    name: 'L.P',
    role: 'Customer review',
  },
  {
    quote:
      'Sarap, lasang lasa yung damo hahaha solid, 10/10 bet na strong yung matcha flavor hindi lang lasang gatas, will recommend sa friends ko 🙌',
    rating: 5,
    name: 'M.J.P',
    role: 'Customer review',
  },
]

function Stars({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => {
        const fill = Math.max(0, Math.min(1, rating - index))
        return (
          <span key={index} className="relative block h-4 w-4" aria-hidden="true">
            <svg viewBox="0 0 20 20" className="absolute inset-0 h-4 w-4 fill-cream/20">
              <path d="M10 1.8l2.5 5 5.5.8-4 3.9.95 5.5L10 14.4 5.05 17l.95-5.5-4-3.9 5.5-.8z" />
            </svg>
            <span className="absolute inset-y-0 left-0 block overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <svg viewBox="0 0 20 20" className="h-4 w-4 fill-caramel">
                <path d="M10 1.8l2.5 5 5.5.8-4 3.9.95 5.5L10 14.4 5.05 17l.95-5.5-4-3.9 5.5-.8z" />
              </svg>
            </span>
          </span>
        )
      })}
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

        <div className="mt-12 min-h-[22rem] sm:min-h-[19rem]" aria-live="polite">
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
                {active.items ? (
                  <ul className="space-y-6">
                    {active.items.map((item) => (
                      <li key={item.drink}>
                        <div className="flex flex-wrap items-center gap-3">
                          <Stars rating={item.rating} />
                          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-caramel">
                            {item.drink}
                          </span>
                        </div>
                        <p className="mt-2.5 font-display text-[clamp(1.15rem,2.3vw,1.55rem)] font-normal leading-snug text-cream/95">
                          “{item.note}”
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <>
                    <Stars rating={active.rating} />
                    <p className="mt-6 font-display text-[clamp(1.45rem,3.2vw,2.15rem)] font-normal leading-snug text-cream/95">
                      “{active.quote}”
                    </p>
                  </>
                )}
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
