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

export interface Flavor {
  id: string
  name: string
  image: string
  description: string
  price: number
  tag: FlavorTag
}

export interface FlavorCard extends Flavor {
  /** True for catalogue entries that have no photo yet. */
  isPlaceholder?: boolean
}

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
  },
  {
    id: 'white-mocha',
    name: 'White Mocha',
    image: '/flavors/white-mocha.webp',
    description: 'White chocolate melted into espresso and steamed milk. Soft, creamy, a little indulgent.',
    price: 0,
    tag: 'Specials',
  },
  {
    id: 'french-vanilla',
    name: 'French Vanilla',
    image: '/flavors/french-vanilla.webp',
    description: 'Espresso, milk and mellow French vanilla — the comfort order, double the flavour.',
    price: 0,
    tag: 'Iced',
  },
]

/**
 * Three ready-to-edit entries without photos. Replace the copy and price, or drop a
 * matching image into public/flavors/ and this entry picks it up automatically.
 */
export const placeholderFlavors: FlavorCard[] = [
  {
    id: 'house-blend',
    name: 'House Blend',
    image: '',
    description: 'The everyday pour: chocolate, toasted nuts and a hint of brown sugar.',
    price: 140,
    tag: 'Hot',
    isPlaceholder: true,
  },
  {
    id: 'biscoff-latte',
    name: 'Biscoff Latte',
    image: '',
    description: 'Espresso, milk and a caramelised biscuit swirl. Limited weekend batch.',
    price: 185,
    tag: 'Specials',
    isPlaceholder: true,
  },
  {
    id: 'pandan-cold-brew',
    name: 'Pandan Cold Brew',
    image: '',
    description: 'Twelve-hour cold brew finished with pandan syrup and fresh milk.',
    price: 170,
    tag: 'Iced',
    isPlaceholder: true,
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

  // Placeholder entries only show when they have no photo of their own yet.
  for (const placeholder of placeholderFlavors) {
    if (!seen.has(placeholder.id)) cards.push({ ...placeholder })
  }

  return cards
}
