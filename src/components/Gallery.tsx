import { motion } from 'framer-motion'
import { PhotoFrame } from './PhotoFrame'

const photos = [
  {
    src: '/images/gallery-rosetta-1.webp',
    alt: 'A latte art rosetta poured into a white cup, photographed from above',
    title: 'Rosetta',
    description: 'The classic leaf — a slow, steady pour from start to finish.',
    aspect: 'portrait' as const,
  },
  {
    src: '/images/gallery-shiba-inu.webp',
    alt: 'A shiba inu dog drawn in the milk foam of a latte, held above the coffee bar',
    title: 'Shiba inu',
    description: 'Ordered by a regular, drawn freehand. Not on the menu — yet.',
    aspect: 'portrait' as const,
  },
  {
    src: '/images/gallery-tulip-2.webp',
    alt: 'A tulip latte art pattern of concentric arcs topped with a heart, photographed from above',
    title: 'Tulip',
    description: 'Stacked hearts, one pour, no touching up afterwards.',
    aspect: 'portrait' as const,
  },
  {
    src: '/images/gallery-freehand.webp',
    alt: 'A freehand rosetta with fanned wings and a heart at the top, poured in a pale pink cup',
    title: 'Rosetta, freehand',
    description: 'Our barista’s steadiest hand, on a good morning.',
    aspect: 'portrait' as const,
  },
]

/** Framed photos of the coffee and the latte art coming off the bar. */
export function Gallery() {
  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="bg-foam py-24 sm:py-28 lg:py-32">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow">Life at iverista</p>
          <h2 id="gallery-heading" className="section-heading mt-5">
            Poured by hand.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-roast/75 sm:text-lg">
            Milk steamed to silk and poured in one go — rosettas, tulips, and the occasional request we
            could not say no to. This is what leaves the bar on a good morning.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:items-start">
          {photos.map((photo, index) => (
            <motion.li
              key={photo.src}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.07 }}
              className={index % 2 === 0 ? 'lg:mt-10' : ''}
            >
              <PhotoFrame
                src={photo.src}
                alt={photo.alt}
                title={photo.title}
                description={photo.description}
                aspect={photo.aspect}
              />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
