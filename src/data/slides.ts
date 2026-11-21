import { ORDER_URL } from './site'

/**
 * Hero slideshow content.
 * Edit the headlines, subtext or CTA label/href here — the slideshow reads this array.
 * `image` is a public URL, so use `/images/your-file.jpg` or any image in /public.
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
    id: 'counter',
    image: '/images/hero-counter.webp',
    alt: 'The iverista coffee bar — grinder, espresso machine and bottles of house syrup lined up on the counter',
    eyebrow: 'Specialty coffee · Makati',
    headline: 'Your daily ritual, brewed with love.',
    subtext:
      'Single-origin beans, slow pours and a bar we are always happy to show you. Come for the coffee — stay for the quiet.',
    cta: { label: 'See Our Flavors', href: '#flavors' },
  },
  {
    id: 'latte',
    image: '/images/hero-latte.webp',
    alt: 'A fresh latte with rosetta art on a yellow saucer beside a portafilter full of coffee beans',
    eyebrow: 'Small batch · Big heart',
    headline: 'Small shop. Big flavor.',
    subtext:
      'Every cup is pulled to order, milk steamed to silk, and served with a conversation if you want one.',
    cta: { label: 'Order Now', href: ORDER_URL },
  },
  {
    id: 'cups',
    image: '/images/hero-cups.webp',
    alt: 'Colourful coffee cups hanging on a rack above a latte on a yellow plate scattered with beans',
    eyebrow: '2026 – Present',
    headline: 'Every cup tells a story.',
    subtext:
      'From the farms we buy from to the regulars who know our baristas by name — this is coffee with a memory attached.',
    cta: { label: 'Visit Us Today', href: '#visit' },
  },
  {
    id: 'portafilter',
    image: '/images/hero-portafilter.webp',
    alt: 'A latte beside a portafilter packed with freshly ground beans on the espresso machine tray',
    eyebrow: 'Pulled to order',
    headline: 'Freshly ground, never rushed.',
    subtext:
      'We weigh, grind and pull shot by shot, so what lands in your cup is a cup we would happily order ourselves.',
    cta: { label: 'See Our Flavors', href: '#flavors' },
  },
  {
    id: 'grinder',
    image: '/images/hero-grinder.webp',
    alt: 'The grinder and espresso machine with a yellow plate of roasted beans in front of them',
    eyebrow: 'Ground fresh daily',
    headline: 'Beans, milk, and nothing to hide.',
    subtext:
      'No shortcuts behind the bar — good beans, cold milk and syrups we are happy to name for you.',
    cta: { label: 'Order Now', href: ORDER_URL },
  },
]
