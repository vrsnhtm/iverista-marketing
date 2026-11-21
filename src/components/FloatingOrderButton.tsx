import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ORDER_URL } from '../data/site'

/** Mobile-only sticky order CTA, revealed once the hero is scrolled past. */
export function FloatingOrderButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.a
          href={ORDER_URL}
          target="_blank"
          rel="noreferrer"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-4 z-40 flex items-center justify-center gap-2.5 rounded-full bg-espresso px-6 py-4 text-sm font-semibold tracking-wide text-cream shadow-lift md:hidden"
          style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
        >
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-caramel" />
          Order Now
          <span className="text-xs font-normal text-cream/60">on Messenger</span>
        </motion.a>
      ) : null}
    </AnimatePresence>
  )
}
