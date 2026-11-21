import { useMemo, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import flavorImages from 'virtual:flavor-images'
import { buildFlavorCards, type FlavorTag } from '../data/flavors'
import { ORDER_URL } from '../data/site'
import { cn } from '../lib/utils'
import { PhotoFrame } from './PhotoFrame'

type FilterId = 'All' | FlavorTag

const FILTERS: FilterId[] = ['All', 'Hot', 'Iced', 'Specials']

/**
 * Flavor menu. Every photo in `public/flavors/` becomes a framed card; prices and
 * copy come from `src/data/flavors.ts` (with filename fallbacks).
 */
export function FlavorGrid() {
  const cards = useMemo(() => buildFlavorCards(flavorImages), [])
  const [filter, setFilter] = useState<FilterId>('All')

  const visible = filter === 'All' ? cards : cards.filter((card) => card.tag === filter)
  const hasPlaceholders = cards.some((card) => card.isPlaceholder)

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const nextIndex =
      event.key === 'ArrowRight'
        ? (currentIndex + 1) % FILTERS.length
        : (currentIndex - 1 + FILTERS.length) % FILTERS.length
    const nextFilter = FILTERS[nextIndex]
    setFilter(nextFilter)
    document.getElementById(`flavor-tab-${nextFilter}`)?.focus()
  }

  return (
    <section id="flavors" aria-labelledby="flavors-heading" className="paper-texture relative bg-foam py-24 sm:py-28 lg:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">The menu</p>
            <h2 id="flavors-heading" className="section-heading mt-5">
              Flavors worth a detour.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-roast/75 sm:text-lg">
              Classic espresso, house-made syrups and seasonal specials — all pulled to order. Tap any
              frame to see it up close.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter flavors"
            className="no-scrollbar -mx-5 flex gap-1 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {FILTERS.map((option, index) => {
              const selected = option === filter
              return (
                <button
                  key={option}
                  type="button"
                  role="tab"
                  id={`flavor-tab-${option}`}
                  aria-selected={selected}
                  aria-controls="flavor-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setFilter(option)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className="relative shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-colors"
                >
                  {selected ? (
                    <motion.span
                      layoutId="flavor-filter-pill"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-espresso shadow-plate"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                  <span className={cn('relative z-10', selected ? 'text-cream' : 'text-roast/75 hover:text-espresso')}>
                    {option}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div
          id="flavor-panel"
          role="tabpanel"
          aria-labelledby={`flavor-tab-${filter}`}
          className="mt-12 sm:mt-14"
        >
          <motion.ul layout className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((card, index) => (
                <motion.li
                  key={card.id}
                  layout
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
                >
                  <PhotoFrame
                    src={card.image || undefined}
                    alt={
                      card.image
                        ? `${card.name}, an iverista ${card.tag.toLowerCase()} coffee`
                        : `${card.name} — photo coming soon`
                    }
                    title={card.name}
                    price={card.price}
                    description={card.description}
                    aspect="portrait"
                  />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>

          {visible.length === 0 ? (
            <p className="py-14 text-center text-roast/70">
              Nothing in this category just yet — try another filter.
            </p>
          ) : null}

          {hasPlaceholders ? (
            <p className="mt-10 text-center text-xs leading-relaxed text-roast/55">
              A few of our newest pours are still being photographed. Ask the bar for today’s list.
            </p>
          ) : null}
        </div>

        <div className="mt-14 flex flex-col items-center justify-center gap-3 rounded-4xl border border-espresso/10 bg-cream/60 px-6 py-8 text-center sm:flex-row sm:gap-6">
          <p className="font-display text-lg text-espresso">Want it ready when you arrive?</p>
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Order on Messenger
          </a>
        </div>
      </div>
    </section>
  )
}
