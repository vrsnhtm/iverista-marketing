import { ORDER_URL } from './site'

/**
 * Hero slideshow content.
 * Edit the headlines, subtext or CTA label/href here — the slideshow reads this array.
 * `image` is a public URL, so use `/flavors/your-file.jpg` or any image in /public.
 */
export interface Slide {
  id: string
  image: string
  alt: string
  eyebrow: string
  headline: string
  subtext: string
  cta: {
    label: string
    href: string
  }
}

export const slides: Slide[] = [
  {
    id: 'ritual',
    image: '/images/hero-ritual.jpg',
    alt: 'A caramel macchiato in a handmade ceramic cup on a warm wooden table',
    eyebrow: 'Specialty coffee · Makati',
    headline: 'Your daily ritual, brewed with love.',
    subtext:
      'Single-origin beans, slow pours and a caramel finish worth waking up for. Come for the coffee — stay for the quiet.',
    cta: { label: 'See Our Flavors', href: '#flavors' },
  },
  {
    id: 'big-flavor',
    image: '/images/hero-big-flavor.jpg',
    alt: 'A silky Spanish latte being set down beside a sunlit window',
    eyebrow: 'Small batch · Big heart',
    headline: 'Small shop. Big flavor.',
    subtext:
      'Every cup is pulled to order, sweetened just enough, and served with a conversation if you want one.',
    cta: { label: 'Order Now', href: ORDER_URL },
  },
  {
    id: 'story',
    image: '/images/hero-story.jpg',
    alt: 'An iced americano with condensation on the glass, photographed in warm afternoon light',
    eyebrow: 'Since 2019',
    headline: 'Every cup tells a story.',
    subtext:
      'From the farms we buy from to the regulars who know our baristas by name — this is coffee with a memory attached.',
    cta: { label: 'Visit Us Today', href: '#visit' },
  },
]
