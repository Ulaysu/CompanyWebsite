/**
 * Brand + site configuration.
 *
 * Everything that identifies the company lives here, so components never
 * hard-code the name, the philosophy or the navigation.
 */
export const site = {
  name: 'SOFORR',
  descriptor: 'Technology company',
  tagline: 'Building world-class technology from Africa to the world.',
  description:
    'SOFORR is a technology company building products, platforms, systems and infrastructure that solve real problems. Founded in The Gambia, building from Africa to the world.',

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
   * Shown on the Work with us page and used as the fallback when no form endpoint is configured.
   */
  email: 'hello@example.com',

  /** One honest line about where the company is and who it builds for. */
  basedIn: 'Rooted in The Gambia · Building for the world',

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
  { label: 'Home', to: '/' },
  { label: 'What we build', to: '/what-we-build' },
  { label: 'Products', to: '/products' },
  { label: 'About', to: '/about' },
  { label: 'Work with us', to: '/work-with-us' },
] as const

export const primaryCta = { label: 'Start a conversation', to: '/work-with-us' } as const
