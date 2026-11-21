import { ORDER_URL } from '../data/site'

/**
 * Feedback band. Lets customers raise a concern or suggest an improvement in the
 * same Messenger thread they order from.
 */
export function Feedback() {
  return (
    <section id="feedback" aria-labelledby="feedback-heading" className="bg-caramel">
      <div className="container-x flex flex-col gap-7 py-14 sm:flex-row sm:items-center sm:justify-between sm:gap-10 sm:py-16">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-espresso/60">Help us improve</p>
          <h2
            id="feedback-heading"
            className="mt-3 font-display text-[clamp(1.6rem,3.4vw,2.35rem)] font-medium leading-tight text-espresso"
          >
            Any concerns? Tell us straight.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-espresso/75 sm:text-base">
            Too sweet, too slow, or something we could pour better — message us and we will fix it on your next cup.
          </p>
        </div>

        <a
          href={ORDER_URL}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex shrink-0 items-center gap-2.5 self-start rounded-full bg-espresso px-6 py-3.5 text-sm font-semibold text-cream shadow-plate transition duration-300 ease-out-soft hover:-translate-y-0.5 hover:bg-roast sm:self-auto"
        >
          Message us now
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  )
}
