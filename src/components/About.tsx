import { PhotoFrame } from './PhotoFrame'

const stats = [
  { value: '2019', label: 'Doors opened' },
  { value: '12', label: 'Cozy seats' },
  { value: '3', label: 'House origins' },
]

/** Brand story with a framed shop photo. */
export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="paper-texture relative overflow-hidden bg-cream py-24 sm:py-28 lg:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <p className="eyebrow">Our story</p>
          <h2 id="about-heading" className="section-heading mt-5">
            A small shop with a long memory.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-roast/80 sm:text-lg">
            iverista started with one second-hand espresso machine, a stubborn belief that good coffee
            should feel like a welcome, and a tiny corner on Mabini Street. We still roast in small
            batches, still know most of our regulars by order, and still think the best part of the day
            is the first pour.
          </p>
          <p className="mt-4 text-base leading-relaxed text-roast/80 sm:text-lg">
            Every cup is dialled in each morning, sweetened with syrups we make ourselves, and served
            with a seat you’re welcome to keep for as long as you like.
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
            src="/images/about.jpg"
            alt="The warm interior of iverista with a wooden counter, espresso machine and hanging bulbs"
            title="Our corner on Mabini Street"
            description="Twelve seats, one long counter, and the smell of fresh espresso all day."
            aspect="portrait"
          />
          <div className="pointer-events-none absolute -left-2 top-8 -rotate-6 rounded-lg border border-espresso/10 bg-foam px-3.5 py-1.5 font-display text-sm text-roast shadow-plate sm:-left-6">
            est. 2019
          </div>
        </div>
      </div>
    </section>
  )
}
