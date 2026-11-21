import type { ReactNode } from 'react'

/**
 * Joins conditional class names without pulling in a dependency.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

/** Shared inline SVG social icons used by Visit, Footer and the mobile menu. */
const paths: Record<string, ReactNode> = {
  facebook: (
    <path
      fill="currentColor"
      d="M13.5 21v-7.2h2.4l.4-2.8h-2.8V9.2c0-.8.2-1.4 1.4-1.4h1.5V5.3c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11H8.1v2.8h2.4V21h3z"
    />
  ),
  instagram: (
    <>
      <rect x="4.5" y="4.5" width="15" height="15" rx="4.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16.6" cy="7.4" r="1" fill="currentColor" />
    </>
  ),
  tiktok: (
    <path
      fill="currentColor"
      d="M14.4 3h-2.6v11.4a2.2 2.2 0 1 1-1.6-2.1V9.6a4.9 4.9 0 1 0 4.2 4.8V8.6a5.3 5.3 0 0 0 3 1v-2.5a3 3 0 0 1-3-3.1z"
    />
  ),
  messenger: (
    <path
      fill="currentColor"
      d="M12 3.2c-5 0-8.8 3.6-8.8 8.4 0 2.7 1.1 5 3 6.6v2.6l2.5-1.4c1 .3 2.1.5 3.3.5 5 0 8.8-3.6 8.8-8.3S17 3.2 12 3.2zm.9 10.5-2.3-2.4-4.4 2.4 4.8-5.1 2.3 2.4 4.3-2.4-4.7 5.1z"
    />
  ),
}

export function SocialIcon({ id, className }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
      {paths[id] ?? null}
    </svg>
  )
}
