/**
 * Flavor catalogue.
 *
 * 1. Drop your edited photos into `public/flavors/` (jpg, png, webp or avif).
 * 2. Every file in that folder is loaded automatically by FlavorGrid.
 * 3. To control the name/price/copy/tag of a photo, add an entry below whose `id`
 *    matches the filename without the extension (e.g. `sweet-black.webp` → `sweet-black`).
 * 4. Photos without an entry still appear, with a title generated from the filename.
 */

export type FlavorTag = 'Hot' | 'Iced' | 'Specials'

/** Menu grouping used by the filter bar in the menu section. */
export type FlavorCategory = 'Signature Coffee' | 'Non Coffee'

export interface Flavor {
  id: string
  name: string
  image: string
  description: string
  price: number
  tag: FlavorTag
  /** Leave undefined to show the drink under “All” only. */
  category?: FlavorCategory
}

/** A catalogue entry paired with the photo discovered for it. */
export type FlavorCard = Flavor

export const flavors: Flavor[] = [
  {
    id: 'sweet-black',
    name: 'Sweet Black',
    image: '/flavors/sweet-black.webp',
    description:
      'Our house black coffee, lightly sweetened and poured over ice. Simple, bold, always right.',
    price: 0,
    tag: 'Iced',
  },
  {
    id: 'long-black',
    name: 'Long Black',
    image: '/flavors/long-black.webp',
    description: 'A double shot poured over cold water — coffee front and centre, no milk in the way.',
    price: 0,
    tag: 'Iced',
  },
  {
    id: 'americano',
    name: 'Americano',
    image: '/flavors/americano.webp',
    description: 'Espresso and chilled water over ice. Clean, bright and endlessly drinkable.',
    price: 0,
    tag: 'Iced',
  },
  {
    id: 'sea-salt-latte',
    name: 'Sea Salt Latte',
    image: '/flavors/sea-salt-latte.webp',
    description:
      'Espresso, fresh milk and a whisper of sea salt foam — sweet, savoury and impossibly smooth.',
    price: 0,
    tag: 'Specials',
    category: 'Signature Coffee',
  },
  {
    id: 'white-mocha',
    name: 'White Mocha',
    image: '/flavors/white-mocha.webp',
    description: 'White chocolate melted into espresso and steamed milk. Soft, creamy, a little indulgent.',
    price: 0,
    tag: 'Specials',
    category: 'Signature Coffee',
  },
  {
    id: 'french-vanilla',
    name: 'French Vanilla',
    image: '/flavors/french-vanilla.webp',
    description: 'Espresso, milk and mellow French vanilla — the comfort order, double the flavour.',
    price: 0,
    tag: 'Iced',
    category: 'Signature Coffee',
  },
  {
    id: 'cafe-latte',
    name: 'Cafe Latte',
    image: '/flavors/cafe-latte.webp',
    description: 'Espresso and plenty of steamed milk over ice — the everyday latte, smooth and mellow.',
    price: 0,
    tag: 'Iced',
  },
  {
    id: 'spanish-latte',
    name: 'Spanish Latte',
    image: '/flavors/spanish-latte.webp',
    description:
      'Condensed milk, espresso and fresh milk poured over ice. Sweet, silky and a house favourite.',
    price: 0,
    tag: 'Iced',
  },
  {
    id: 'caramel-macchiato',
    name: 'Caramel Macchiato',
    image: '/flavors/caramel-macchiato.webp',
    description: 'Espresso, cold milk and a slow ribbon of caramel — our most-photographed cup.',
    price: 0,
    tag: 'Specials',
    category: 'Signature Coffee',
  },
  {
    id: 'caramel',
    name: 'Caramel',
    image: '/flavors/caramel.webp',
    description: 'Espresso, milk and buttery caramel over ice. Straightforwardly sweet, always a good idea.',
    price: 0,
    tag: 'Iced',
    category: 'Signature Coffee',
  },
  {
    id: 'salted-caramel',
    name: 'Salted Caramel',
    image: '/flavors/salted-caramel.webp',
    description: 'Caramel with a pinch of salt to keep it grown-up — sweet, savoury and smooth.',
    price: 0,
    tag: 'Specials',
    category: 'Signature Coffee',
  },
  {
    id: 'dark-mocha',
    name: 'Dark Mocha',
    image: '/flavors/dark-mocha.webp',
    description: 'Espresso and dark chocolate over ice, finished with cold milk. Rich without the weight.',
    price: 0,
    tag: 'Specials',
    category: 'Signature Coffee',
  },
  {
    id: 'matcha-latte',
    name: 'Matcha Latte',
    image: '/flavors/matcha-latte.webp',
    description:
      'Ceremonial-grade matcha whisked to order over ice and fresh milk. Smooth, earthy, very creamy.',
    price: 0,
    tag: 'Iced',
    category: 'Non Coffee',
  },
  {
    id: 'signature-dark-chocolate',
    name: 'Signature Dark Chocolate',
    image: '/flavors/signature-dark-chocolate.webp',
    description: 'Our signature dark chocolate, chilled and shaken over ice. Deep, velvety, bittersweet.',
    price: 0,
    tag: 'Specials',
    category: 'Non Coffee',
  },
]

const IMAGE_EXTENSION = /\.(jpe?g|png|webp|avif|gif)$/i

/** `"/flavors/sweet-black.webp"` → `"sweet-black"` */
export function slugFromPath(path: string): string {
  const file = path.split('/').pop() ?? ''
  return file.replace(IMAGE_EXTENSION, '').toLowerCase()
}

/** `"sea-salt-latte.webp"` → `"Sea Salt Latte"` */
export function nameFromFilename(path: string): string {
  return slugFromPath(path)
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

/** Normalises a display name for matching against filenames. */
export function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/**
 * Merges the auto-discovered image list with the catalogue above.
 * Images win: if a photo exists, its card is shown even without a data entry.
 */
export function buildFlavorCards(images: readonly string[]): FlavorCard[] {
  const seen = new Set<string>()
  const cards: FlavorCard[] = []

  for (const image of images) {
    const slug = slugFromPath(image)
    if (!slug || seen.has(slug)) continue
    seen.add(slug)

    const match = flavors.find((flavor) => flavor.id === slug || slugifyName(flavor.name) === slug)

    cards.push(
      match
        ? { ...match, image }
        : {
            id: slug,
            name: nameFromFilename(image),
            image,
            description: 'A fresh addition from the bar — ask us about today’s roast.',
            price: 0,
            tag: 'Specials',
          },
    )
  }

  return cards
}
