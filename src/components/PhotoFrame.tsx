import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '../lib/utils'

export type PhotoAspect = 'portrait' | 'tall' | 'square' | 'landscape' | 'wide'

const ASPECT_CLASS: Record<PhotoAspect, string> = {
  portrait: 'aspect-portrait',
  tall: 'aspect-tall',
  square: 'aspect-square',
  landscape: 'aspect-landscape',
  wide: 'aspect-wide',
}

export interface PhotoFrameProps {
  /** Public URL of the image. Omit it to render a "photo coming soon" plate. */
  src?: string
  /** Required description of the image for screen readers. */
  alt: string
  title: string
  price?: number
  description?: string
  aspect?: PhotoAspect
  /** Optional tiny base64/LQIP image shown while the full photo loads. */
  blurDataURL?: string
  /** Set for above-the-fold images so they load eagerly. */
  priority?: boolean
  className?: string
}

/** Formats a peso amount, e.g. 165 → "₱165". */
export function formatPrice(price: number): string {
  return `₱${price.toLocaleString('en-PH')}`
}

function CoffeeBeanIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 text-caramel" fill="none">
      <ellipse cx="12" cy="12" rx="6.5" ry="9" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 3.2c-2.6 2.6-2.6 15 0 17.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

/**
 * A framed photo: espresso wood outer frame, cream mat, caption plate and an
 * accessible lightbox. Used by the flavors, gallery and about sections.
 */
export function PhotoFrame({
  src,
  alt,
  title,
  price,
  description,
  aspect = 'portrait',
  blurDataURL,
  priority = false,
  className,
}: PhotoFrameProps) {
  const [loaded, setLoaded] = useState(false)
  const [open, setOpen] = useState(false)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const dialogTitleId = useId()

  // Reset the loading state (and detect cached images) whenever the source changes.
  useEffect(() => {
    setLoaded(false)
    const image = imageRef.current
    if (image?.complete && image.naturalWidth > 0) setLoaded(true)
  }, [src])

  const close = useCallback(() => setOpen(false), [])

  // Lock the page, trap focus and close on Escape while the lightbox is open.
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 40)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
        return
      }
      if (event.key !== 'Tab') return

      const dialog = dialogRef.current
      if (!dialog) return
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'),
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      window.clearTimeout(focusTimer)
    }
  }, [open, close])

  const handleClose = () => {
    close()
    window.setTimeout(() => triggerRef.current?.focus(), 0)
  }

  const frameClasses =
    'relative block w-full rounded-[1.7rem] bg-gradient-to-br from-[#5a3626] via-roast to-[#332015] p-2.5 shadow-frame transition-transform duration-500 ease-out-soft motion-safe:group-hover:-translate-y-1.5 motion-safe:group-hover:rotate-[-0.7deg] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-4 focus-visible:ring-offset-foam'

  const inner = (
    <>
      <span className="block rounded-[1.35rem] bg-cream p-3">
        <span className={cn('relative block overflow-hidden rounded-[0.95rem] bg-espresso/10', ASPECT_CLASS[aspect])}>
          {src ? (
            <>
              {!loaded && (
                <span aria-hidden="true" className="absolute inset-0 block">
                  {blurDataURL ? (
                    <img
                      src={blurDataURL}
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full scale-110 object-cover blur-xl"
                    />
                  ) : (
                    <span className="photo-shimmer block h-full w-full" />
                  )}
                </span>
              )}
              <img
                ref={imageRef}
                src={src}
                alt={alt}
                loading={priority ? 'eager' : 'lazy'}
                decoding="async"
                onLoad={() => setLoaded(true)}
                className={cn(
                  'relative h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out-soft motion-safe:group-hover:scale-[1.04]',
                  loaded ? 'opacity-100' : 'opacity-0',
                )}
              />
            </>
          ) : (
            <span className="flex h-full w-full flex-col items-center justify-center gap-2 bg-cream/70 px-4 text-center">
              <CoffeeBeanIcon />
              <span className="font-display text-sm text-roast">Photo coming soon</span>
            </span>
          )}
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[0.95rem] ring-1 ring-inset ring-espresso/10" />
        </span>
      </span>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[1.7rem] ring-1 ring-inset ring-white/10" />
    </>
  )

  return (
    <figure className={cn('group relative', className)}>
      {src ? (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-label={`View ${title} in a larger view`}
          className={frameClasses}
        >
          {inner}
        </button>
      ) : (
        <div className={frameClasses}>{inner}</div>
      )}

      <figcaption className="relative mt-4 flex flex-col items-center text-center">
        <span className="inline-flex max-w-full items-baseline gap-2 rounded-lg border border-espresso/10 bg-foam px-4 py-1.5 shadow-plate">
          <span className="truncate font-display text-[1.02rem] font-medium text-espresso">{title}</span>
          {typeof price === 'number' && price > 0 ? (
            <span className="whitespace-nowrap text-sm font-medium text-roast/75">— {formatPrice(price)}</span>
          ) : null}
        </span>
        {description ? (
          <p className="mt-2.5 max-w-[26ch] text-[0.82rem] leading-relaxed text-roast/70 sm:max-w-[32ch]">{description}</p>
        ) : null}
      </figcaption>

      {createPortal(
        <AnimatePresence>
          {open && src ? (
            <motion.div
              key="lightbox"
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={dialogTitleId}
              className="fixed inset-0 z-[80] flex items-center justify-center bg-espresso/90 p-4 backdrop-blur-md sm:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <button
                type="button"
                aria-label="Close enlarged photo"
                tabIndex={-1}
                onClick={handleClose}
                className="absolute inset-0 h-full w-full cursor-zoom-out"
              />
              <motion.div
                className="relative z-10 w-full max-w-3xl"
                initial={{ opacity: 0, scale: 0.96, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="rounded-[1.6rem] bg-cream p-3 shadow-frame">
                  <img
                    src={src}
                    alt={alt}
                    className="mx-auto max-h-[64vh] w-full rounded-[1.1rem] object-contain"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between gap-4 rounded-2xl bg-foam px-5 py-4 shadow-soft">
                  <div>
                    <h3 id={dialogTitleId} className="font-display text-xl font-medium text-espresso">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-roast/75">{description ?? alt}</p>
                  </div>
                  {typeof price === 'number' && price > 0 ? (
                    <p className="whitespace-nowrap font-display text-lg text-roast">{formatPrice(price)}</p>
                  ) : null}
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={handleClose}
                  aria-label="Close enlarged photo"
                  className="absolute -right-2 -top-3 grid h-10 w-10 place-items-center rounded-full bg-foam text-espresso shadow-lift transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel sm:-right-4"
                >
                  <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body,
      )}
    </figure>
  )
}
