import { socials } from '../data/site'
import { cn, SocialIcon } from '../lib/utils'

interface SocialLinksProps {
  /** `light` is for dark backgrounds, `dark` for cream backgrounds. */
  tone?: 'light' | 'dark'
  showLabels?: boolean
  className?: string
}

/** Row of social buttons (Facebook, Instagram, TikTok, Messenger). */
export function SocialLinks({ tone = 'dark', showLabels = false, className }: SocialLinksProps) {
  return (
    <ul className={cn('flex flex-wrap items-center gap-2', className)}>
      {socials.map((social) => (
        <li key={social.id}>
          <a
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`iverista on ${social.label}`}
            className={cn(
              'inline-flex items-center justify-center gap-2 rounded-full border transition duration-300 ease-out-soft',
              showLabels ? 'px-4 py-2.5 text-sm font-medium' : 'h-11 w-11',
              tone === 'light'
                ? 'border-cream/25 bg-white/5 text-cream hover:border-cream/60 hover:bg-cream/10'
                : 'border-espresso/15 text-roast hover:border-espresso hover:bg-espresso hover:text-cream',
            )}
          >
            <SocialIcon id={social.id} className={showLabels ? 'h-4 w-4' : 'h-[1.15rem] w-[1.15rem]'} />
            {showLabels ? <span>{social.label}</span> : null}
          </a>
        </li>
      ))}
    </ul>
  )
}
