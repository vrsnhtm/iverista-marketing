/**
 * Single source of truth for shop details, navigation and social links.
 * Edit this file to update the address, hours, phone number or social handles.
 */

export interface NavLink {
  label: string
  href: string
}

export interface SocialLink {
  id: 'facebook' | 'instagram' | 'tiktok' | 'messenger'
  label: string
  href: string
}

export interface OpeningHours {
  days: string
  time: string
}

/** Every "Order Now" / "Order on Messenger" button opens this Messenger conversation. */
export const ORDER_URL = 'https://www.facebook.com/messages/t/1361975170329933'

export const site = {
  name: 'iverista',
  tagline: 'Specialty coffee, slow mornings, and a seat that feels like yours.',
  address: '123 Mabini Street, Poblacion, Makati City, Metro Manila',
  phone: '+63 917 000 0000',
  email: 'hello@iverista.ph',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Mabini+Street+Poblacion+Makati+City',
  orderUrl: ORDER_URL,
} as const

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'Flavors', href: '#flavors' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Visit', href: '#visit' },
]

export const openingHours: OpeningHours[] = [
  { days: 'Monday – Thursday', time: '7:00 AM – 9:00 PM' },
  { days: 'Friday – Saturday', time: '7:00 AM – 11:00 PM' },
  { days: 'Sunday', time: '8:00 AM – 7:00 PM' },
]

/** Replace these hrefs with your real profiles. */
export const socials: SocialLink[] = [
  { id: 'facebook', label: 'Facebook', href: 'https://facebook.com/iverista' },
  { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/iverista' },
  { id: 'tiktok', label: 'TikTok', href: 'https://tiktok.com/@iverista' },
  { id: 'messenger', label: 'Messenger', href: ORDER_URL },
]
