import { PhotoFrame } from './PhotoFrame'

const stats = [
  { value: '2026 – Present', label: 'Serving' },
  { value: '100%', label: 'Delivery only' },
  { value: '3', label: 'House origins' },
]

/** Brand story with a framed photo of the bar. */
export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="paper-texture relative overflow-hidden bg-cream py-24 sm:py-28 lg:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <p className="eyebrow">Our story</p>
          <h2 id="about-heading" className="section-heading mt-5">
            A small bar with a long memory.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-roast/80 sm:text-lg">
            iverista started with one second-hand espresso machine, a stubborn belief that good coffee
            should feel like a welcome, and a tiny counter we still pull every shot on. We grind in small
            batches, know most of our regulars by order, and still think the best part of the day is the
            first pour.
          </p>
          <p className="mt-4 text-base leading-relaxed text-roast/80 sm:text-lg">
            We are delivery only — every cup is dialled in once you order, sweetened with syrups we make
            ourselves, packed to travel and handed straight to a rider. No seats to reserve, no queue to
            stand in: just coffee on its way to wherever you are.
          </p>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-espresso/10 pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-3xl font-medium text-espresso sm:text-4xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-xs uppercase tracking-widest text-roast/60">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 font-display text-lg italic text-roast/80">— Iver, founder &amp; barista</p>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <PhotoFrame
            src="/images/about.webp"
            alt="The iverista bar: a grinder, espresso machine, fresh milk and bottles of house syrup lined up on a tiled counter"
            title="Where every order starts"
            description="Grinder, machine, fresh milk and syrups we mix ourselves — no shop floor, just the bar."
            aspect="portrait"
          />
          <div className="pointer-events-none absolute -left-2 top-8 -rotate-6 rounded-lg border border-espresso/10 bg-foam px-3.5 py-1.5 font-display text-sm text-roast shadow-plate sm:-left-6">
            2026 – present
          </div>
        </div>
      </div>
    </section>
  )
}
