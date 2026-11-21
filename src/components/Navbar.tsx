import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ORDER_URL, navLinks, socials } from '../data/site'
import { cn, SocialIcon } from '../lib/utils'

/** Sticky navigation: transparent over the hero, cream + blur once scrolled. */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('#home')
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  const solid = scrolled || menuOpen

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the link for the section currently in view.
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((section): section is HTMLElement => section !== null)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Mobile menu: lock the page, focus the close button, close on Escape.
  useEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 140)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      window.clearTimeout(focusTimer)
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out-soft',
          solid
            ? 'border-b border-espresso/10 bg-cream/85 shadow-[0_12px_30px_-26px_rgba(43,27,20,0.8)] backdrop-blur-xl'
            : 'bg-transparent',
        )}
      >
        <div className="container-x flex h-16 items-center justify-between gap-4 sm:h-20">
          <a href="#home" aria-label="iverista — back to top" className="group inline-flex items-center">
            <img
              src={solid ? '/images/logo.webp' : '/images/logo-cream.webp'}
              alt="iverista"
              width={916}
              height={513}
              className="h-9 w-auto transition-opacity duration-300 group-hover:opacity-80 sm:h-11"
            />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={active === link.href ? 'true' : undefined}
                className={cn(
                  'relative py-2 text-sm font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-caramel after:transition-transform after:duration-300 hover:after:scale-x-100',
                  solid ? 'text-roast hover:text-espresso' : 'text-cream/85 hover:text-foam',
                  active === link.href && 'after:scale-x-100',
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={ORDER_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full bg-caramel px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-espresso shadow-plate transition duration-300 ease-out-soft hover:-translate-y-0.5 hover:bg-[#d29a68] lg:inline-flex"
            >
              Order Now
              <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              className={cn(
                'inline-flex h-11 w-11 items-center justify-center rounded-full border transition duration-300 lg:hidden',
                solid
                  ? 'border-espresso/15 text-espresso hover:bg-espresso/5'
                  : 'border-cream/30 text-cream hover:bg-cream/10',
              )}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M4 7h16M4 12h16M4 17h10" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div key="mobile-menu" className="fixed inset-0 z-[60] lg:hidden">
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 h-full w-full bg-espresso/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              className="paper-texture relative ml-auto flex h-full w-[88%] max-w-sm flex-col overflow-y-auto bg-cream px-6 pb-10 pt-5 shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <img src="/images/logo.webp" alt="iverista" width={916} height={513} className="h-9 w-auto" />
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="grid h-11 w-11 place-items-center rounded-full border border-espresso/15 text-espresso transition hover:bg-espresso/5"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <nav aria-label="Mobile" className="mt-10 flex flex-col">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline justify-between border-b border-espresso/10 py-4 font-display text-3xl text-espresso transition-colors hover:text-roast"
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + index * 0.06, duration: 0.4 }}
                  >
                    {link.label}
                    <span aria-hidden="true" className="text-sm text-caramel transition-transform group-hover:translate-x-1">
                      ↗
                    </span>
                  </motion.a>
                ))}
              </nav>

              <a
                href={ORDER_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMenuOpen(false)}
                className="btn btn-caramel mt-8 w-full"
              >
                Order Now
              </a>

              <div className="mt-auto pt-10">
                <p className="text-xs uppercase tracking-widest text-roast/60">Follow the brew</p>
                <div className="mt-3 flex gap-2">
                  {socials.map((social) => (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`iverista on ${social.label}`}
                      className="grid h-11 w-11 place-items-center rounded-full border border-espresso/15 text-roast transition hover:border-espresso/40 hover:bg-espresso hover:text-cream"
                    >
                      <SocialIcon id={social.id} className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
