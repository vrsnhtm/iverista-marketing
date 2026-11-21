import { motion } from 'framer-motion'
import { PhotoFrame } from './PhotoFrame'

const photos = [
  {
    src: '/images/shop-counter.jpg',
    alt: 'The iverista coffee counter with an espresso machine, ceramic cups and warm pendant lights',
    title: 'The counter',
    description: 'Where everything happens — usually with a record playing.',
    aspect: 'landscape' as const,
  },
  {
    src: '/images/pour.jpg',
    alt: 'A barista pouring steamed milk into a cup to make latte art',
    title: 'Slow pours',
    description: 'Milk steamed to silk, one cup at a time.',
    aspect: 'portrait' as const,
  },
  {
    src: '/images/guests.jpg',
    alt: 'Two friends laughing over coffee at a wooden table in the iverista shop',
    title: 'Our regulars',
    description: 'The best part of the shop is who fills it.',
    aspect: 'landscape' as const,
  },
  {
    src: '/images/gallery-matcha.jpg',
    alt: 'An iced matcha latte on a linen surface with a bamboo whisk nearby',
    title: 'Something green',
    description: 'For the days that call for matcha instead.',
    aspect: 'portrait' as const,
  },
]

/** Framed photos of the shop, the coffee and the people in it. */
export function Gallery() {
  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="bg-foam py-24 sm:py-28 lg:py-32">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow">Life at iverista</p>
          <h2 id="gallery-heading" className="section-heading mt-5">
            Pull up a chair.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-roast/75 sm:text-lg">
            Warm light, worn wood, and the quiet hum of the grinder. This is what an ordinary afternoon
            here looks like.
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
