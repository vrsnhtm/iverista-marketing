import { navLinks, openingHours, site } from '../data/site'
import { SocialLinks } from './SocialLinks'

const year = new Date().getFullYear()

/** Site footer: brand, quick links, contact details and socials. */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-espresso text-cream">
      <div aria-hidden="true" className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.1]" />

      <div className="container-x relative py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1.1fr]">
          <div>
            <a href="#home" aria-label="iverista — back to top" className="inline-flex">
              <img src="/images/logo-cream.webp" alt="iverista" width={916} height={513} className="h-14 w-auto" />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/65">{site.tagline}</p>
            <SocialLinks tone="light" className="mt-6" />
          </div>

          <nav aria-label="Footer">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-caramel">Explore</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-cream/70 transition-colors hover:text-cream">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-caramel">Find us</h2>
            <address className="mt-4 space-y-2.5 text-sm not-italic leading-relaxed text-cream/70">
              <p>{site.address}</p>
              <p>
                <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="transition-colors hover:text-cream">
                  {site.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-cream">
                  {site.email}
                </a>
              </p>
            </address>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-caramel">Hours</h2>
            <dl className="mt-4 space-y-2.5 text-sm text-cream/70">
              {openingHours.map((row) => (
                <div key={row.days}>
                  <dt>{row.days}</dt>
                  <dd className="text-cream/90">{row.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-cream/10 pt-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© iverista</p>
          <p className="flex items-center gap-2">
            Brewed with care in Navotas
            <span aria-hidden="true" className="text-caramel">
              ·
            </span>
            <span>{year}</span>
          </p>
          <a href="#home" className="inline-flex items-center gap-1.5 transition-colors hover:text-cream">
            Back to top
            <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M8 13V3M4 7l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
