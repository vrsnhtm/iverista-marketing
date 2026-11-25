import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const VIDEO_SRC = '/video/iverista-reel.mp4'

/** A short vertical clip from the bar, sitting between the gallery and the reviews. */
export function VideoReel() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const reduceMotion = useReducedMotion()
  const [failed, setFailed] = useState(false)

  // Autoplay only for visitors who have not asked for reduced motion.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (reduceMotion) {
      video.pause()
      video.currentTime = 0
      return
    }
    video.play().catch(() => {
      /* Autoplay blocked — the controls are still there. */
    })
  }, [reduceMotion])

  return (
    <section id="reel" aria-labelledby="reel-heading" className="bg-espresso py-24 text-cream sm:py-28 lg:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-center lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <p className="eyebrow !text-caramel">Straight from the bar</p>
          <h2 id="reel-heading" className="section-heading mt-5 !text-foam">
            A few seconds at the bar.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-cream/75 sm:text-lg">
            Everything is made to order, one cup at a time. Here is a short clip from inside
            iverista — then pick your drink and we will take it from there.
          </p>
          {reduceMotion ? (
            <p className="mt-4 text-sm text-cream/50">Your device asks for reduced motion, so the clip stays paused until you press play.</p>
          ) : null}
        </motion.div>

        <div className="mx-auto w-full max-w-xs lg:mx-0">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-cream/15 bg-black shadow-2xl shadow-black/40">
            <div className="aspect-[9/16]">
              {failed ? (
                <p className="grid h-full place-items-center p-6 text-center text-sm text-cream/70">
                  The clip could not load on this connection.
                </p>
              ) : (
                <video
                  ref={videoRef}
                  src={VIDEO_SRC}
                  className="h-full w-full object-cover"
                  autoPlay={!reduceMotion}
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                  aria-label="Short video clip from iverista"
                  onError={() => setFailed(true)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
