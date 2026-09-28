/**
 * Brand + site configuration.
 *
 * Everything that identifies the company lives here, so components never
 * hard-code the name, the positioning or the navigation.
 */
export const site = {
  name: 'SOFORR',
  descriptor: 'Technology company',
  /** The primary positioning line. */
  headline: 'We build technology for ideas worth building.',
  summary: 'We build products, platforms and systems for people and organisations solving problems that matter.',
  /** Origin and scope, stated once and quietly. */
  origin: 'Founded in The Gambia. Building globally.',
  originShort: 'Founded in The Gambia · Building globally',
  description:
    'SOFORR is a technology company. We build products, platforms and systems for people and organisations solving problems that matter. Founded in The Gambia, building globally.',

  /** The philosophy the company is named after. */
  philosophy: {
    phrase: 'Duniyai ka Soforr.',
    meaning: 'This world is all about helping one another.',
    language: 'Jola-Bulluf',
  },

  /** Canonical production URL (no trailing slash). Override with VITE_SITE_URL. */
  url: (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') || 'https://www.example.com',

  /**
   * TODO(owner): replace with the real inbox before launch.
   * Shown on the Contact page and used as the fallback when no form endpoint is configured.
   */
  email: 'hello@example.com',

  /**
   * Company social profiles. Leave `null` to hide.
   * TODO(owner): add the real SOFORR accounts, e.g. 'https://github.com/<handle>'.
   */
  social: {
    github: null as string | null,
    linkedin: null as string | null,
    x: null as string | null,
  },
} as const

export const navigation = [
  { label: 'Work', to: '/work' },
  { label: 'Products', to: '/products' },
  { label: 'Approach', to: '/approach' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
] as const

export const primaryCta = { label: 'Start a conversation', to: '/contact' } as const
