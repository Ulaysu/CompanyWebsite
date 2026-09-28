/**
 * Brand + site configuration.
 *
 * Everything that identifies the company lives here, so the brand can be
 * renamed (e.g. to a registered company name) without touching components.
 */
export const site = {
  /** TODO(owner): replace with the company name once it's final. */
  name: 'Sulayman Sanyang',
  descriptor: 'Technology, built from Africa',
  /** Short monogram used in the logo mark. */
  monogram: 'SS',
  tagline: 'World-class technology, built from Africa.',
  description:
    'A technology company building world-class software from Africa for the world: digital products, platforms, business systems and the infrastructure behind them.',

  /** Canonical production URL (no trailing slash). Override with VITE_SITE_URL. */
  url: (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') || 'https://www.example.com',

  /**
   * TODO(owner): replace with the real inbox before launch.
   * Shown on the contact page and used as the fallback when no form endpoint is configured.
   */
  email: 'hello@example.com',

  /** One honest line about where the company is and who it builds for. */
  basedIn: 'Based in Africa · Building for the world',

  /**
   * Social profiles. Leave `null` to hide.
   * TODO(owner): add real URLs, e.g. 'https://github.com/<handle>' / 'https://www.linkedin.com/company/<handle>'.
   */
  social: {
    github: null as string | null,
    linkedin: null as string | null,
  },
} as const

export const navigation = [
  { label: 'Work', to: '/work' },
  { label: 'What we build', to: '/what-we-build' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
] as const

export const primaryCta = { label: 'Build with us', to: '/contact' } as const
