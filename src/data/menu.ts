/**
 * Menu posters shown in the menu slideshow. Order matches the reading order of
 * the printed menu: full price list first, then each category.
 */
export interface MenuPoster {
  id: string
  image: string
  alt: string
  label: string
}

export const menuPosters: MenuPoster[] = [
  {
    id: 'price-list',
    image: '/menu/price-list.webp',
    label: 'Full price list',
    alt: 'iverista menu poster listing coffee, signature coffee, non-coffee, soda, water-based drinks and add-ons with prices',
  },
  {
    id: 'coffee',
    image: '/menu/coffee.webp',
    label: 'Coffee',
    alt: 'iverista coffee poster showing americano, long black, sweet black, cafe latte and spanish latte with prices',
  },
  {
    id: 'signature-coffee',
    image: '/menu/signature-coffee.webp',
    label: 'Signature coffee',
    alt: 'iverista signature coffee poster showing french vanilla, caramel, caramel macchiato, salted caramel, dark mocha, white mocha and sea salt latte with prices',
  },
  {
    id: 'non-coffee',
    image: '/menu/non-coffee.webp',
    label: 'Non-coffee',
    alt: 'iverista non-coffee poster showing the signature dark chocolate and matcha latte with prices',
  },
  {
    id: 'soda-series',
    image: '/menu/soda-series.webp',
    label: 'Soda series',
    alt: 'iverista soda series poster showing green apple, strawberry, blueberry and lychee sodas with prices',
  },
  {
    id: 'water-based',
    image: '/menu/water-based.webp',
    label: 'Water-based',
    alt: 'iverista water-based poster showing green apple, strawberry, blueberry and lychee refreshers with prices',
  },
]
