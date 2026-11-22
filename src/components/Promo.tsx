import { ORDER_URL } from '../data/site'

/**
 * Promo band shown directly under the menu: buy five drinks, get a free 12oz
 * Spanish Latte while 12oz cup stock lasts.
 */
export function Promo() {
  return (
    <section id="promo" aria-labelledby="promo-heading" className="relative overflow-hidden bg-roast">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-caramel/15 blur-3xl sm:h-80 sm:w-80"
      />

      <div className="container-x relative flex flex-col gap-8 py-14 sm:py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
          <div className="flex shrink-0 items-center gap-3">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cream/10 font-display text-2xl font-semibold text-cream ring-1 ring-cream/20">
              5+1
            </span>
          </div>

          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-caramel">Ongoing promo</p>
            <h2
              id="promo-heading"
              className="mt-3 font-display text-[clamp(1.6rem,3.4vw,2.35rem)] font-medium leading-tight text-cream"
            >
              Buy 5 drinks, get a Spanish Latte free.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cream/75 sm:text-base">
              Order any five coffee or non-coffee drinks and we will add a <strong className="font-semibold text-cream">12oz Spanish Latte</strong> on
              the house. Good until our 12oz cup supply runs out.
            </p>
          </div>
        </div>

        <a
          href={ORDER_URL}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex shrink-0 items-center gap-2.5 self-start rounded-full bg-cream px-6 py-3.5 text-sm font-semibold text-espresso shadow-plate transition duration-300 ease-out-soft hover:-translate-y-0.5 hover:bg-foam lg:self-auto"
        >
          Claim on Messenger
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
