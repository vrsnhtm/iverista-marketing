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
  tagline: 'Specialty coffee, brewed to order, delivered to your door.',
  address: 'Adelfa St., Tanza 1, Navotas City',
  phone: '+63 928 350 6526',
  email: 'i3cabangis@gmail.com',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Adelfa+Street+Tanza+1+Navotas+City',
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
  { days: 'Monday – Thursday', time: '9:00 AM – 9:00 PM' },
  { days: 'Friday – Saturday', time: '9:00 AM – 10:00 PM' },
  { days: 'Sunday', time: '9:00 AM – 10:00 PM' },
]

export const socials: SocialLink[] = [
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61595389176457' },
  // Instagram and TikTok still use placeholder profiles — swap the hrefs once they exist.
  { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/iverista' },
  { id: 'tiktok', label: 'TikTok', href: 'https://tiktok.com/@iverista' },
  { id: 'messenger', label: 'Messenger', href: 'https://www.facebook.com/messages/t/1361975170329933' },
]
