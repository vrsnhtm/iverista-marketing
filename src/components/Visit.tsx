import { ORDER_URL, openingHours, site } from '../data/site'
import { SocialLinks } from './SocialLinks'

/**
 * Visit section. The map panel is a styled placeholder — see the comment inside
 * for where to paste your Google Maps embed iframe.
 */
export function Visit() {
  return (
    <section id="visit" aria-labelledby="visit-heading" className="paper-texture bg-cream py-24 sm:py-28 lg:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow">Delivery only</p>
          <h2 id="visit-heading" className="section-heading mt-5">
            Order with us.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-roast/75 sm:text-lg">
            iverista is delivery only — no shop floor, no seats to reserve. Message us with your order and
            your address, and we’ll brew it fresh and hand it straight to a rider headed your way.
          </p>

          <div className="mt-9 space-y-6">
            <div className="flex gap-4">
              <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-espresso/5 text-roast">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.6" />
                </svg>
              </span>
              <div>
                <h3 className="font-display text-lg text-espresso">Address</h3>
                <p className="mt-1 text-sm leading-relaxed text-roast/75">{site.address}</p>
                <a
                  href={site.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1.5 inline-block text-sm font-semibold text-roast underline decoration-caramel decoration-2 underline-offset-4 hover:text-espresso"
                >
                  View on the map
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-espresso/5 text-roast">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="12" cy="12" r="8.5" />
                  <path d="M12 7.5V12l3 1.8" strokeLinecap="round" />
                </svg>
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-lg text-espresso">Opening hours</h3>
                <dl className="mt-2 space-y-1.5 text-sm">
                  {openingHours.map((row) => (
                    <div key={row.days} className="flex flex-wrap justify-between gap-x-6 gap-y-0.5 text-roast/75">
                      <dt>{row.days}</dt>
                      <dd className="font-medium text-espresso">{row.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-espresso/5 text-roast">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M5 4h3l2 5-2.5 1.5a12 12 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3 6.2 2 2 0 0 1 5 4z" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <h3 className="font-display text-lg text-espresso">Say hello</h3>
                <p className="mt-1 text-sm text-roast/75">
                  <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="hover:text-espresso">
                    {site.phone}
                  </a>
                  {' · '}
                  <a href={`mailto:${site.email}`} className="hover:text-espresso">
                    {site.email}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href={ORDER_URL} target="_blank" rel="noreferrer" className="btn btn-primary">
              Order ahead
            </a>
            <SocialLinks showLabels className="gap-2" />
          </div>
        </div>

        {/* Map placeholder. Replace the inner panel with your Google Maps iframe:
            <iframe src="https://www.google.com/maps/embed?pb=..." ... /> */}
        <div className="relative min-h-[24rem] overflow-hidden rounded-4xl border border-espresso/10 bg-[#e7dccb] shadow-soft lg:min-h-full">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                'linear-gradient(0deg, rgba(43,27,20,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(43,27,20,0.07) 1px, transparent 1px)',
              backgroundSize: '46px 46px',
            }}
          />
          <div aria-hidden="true" className="absolute -left-10 top-1/3 h-24 w-[70%] -rotate-12 rounded-full bg-[#cfd9c4]/70 blur-[1px]" />
          <div aria-hidden="true" className="absolute right-0 top-10 h-[120%] w-16 rotate-12 bg-roast/10" />
          <div aria-hidden="true" className="absolute left-[18%] top-[22%] h-px w-[70%] rotate-[24deg] bg-espresso/20" />
          <div aria-hidden="true" className="absolute left-[8%] top-[64%] h-px w-[80%] -rotate-[8deg] bg-espresso/15" />

          <div className="relative flex h-full min-h-[24rem] flex-col items-center justify-center p-8 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-espresso text-cream shadow-lift">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
                <circle cx="12" cy="10" r="2.6" />
              </svg>
            </span>
            <p className="mt-4 font-display text-2xl text-espresso">iverista</p>
            <p className="mt-1 max-w-[20ch] text-sm leading-relaxed text-roast/75">
              {site.address}
            </p>
            <a
              href={site.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-espresso/20 bg-foam/80 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-espresso backdrop-blur-sm transition hover:border-espresso/50"
            >
              Open in Google Maps
              <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M4 12L12 4M6 4h6v6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
