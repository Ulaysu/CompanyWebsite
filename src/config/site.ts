/**
 * Brand + site configuration.
 *
 * Everything that identifies the studio lives here so the brand can be
 * renamed later (e.g. to a company name) without touching components.
 */
export const site = {
  name: 'Sulayman Sanyang',
  descriptor: 'Custom Software & Automation',
  /** Short monogram used in the logo mark. */
  monogram: 'SS',
  tagline: 'Software built around how your business actually works.',
  description:
    'We build custom internal systems, automation, APIs, and operational software that help businesses reduce manual work, improve visibility, and keep revenue moving.',

  /** Canonical production URL (no trailing slash). Override with VITE_SITE_URL. */
  url: (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') || 'https://www.example.com',

  /**
   * TODO(owner): replace with the real inbox before launch.
   * Shown on the contact page and used as the fallback when no form endpoint is configured.
   */
  email: 'hello@example.com',

  /** Where the business operates. Kept deliberately broad. */
  availability: 'Working with businesses internationally',

  /**
   * Social profiles. Leave `null` to hide.
   * TODO(owner): add real URLs, e.g. 'https://github.com/<handle>' / 'https://www.linkedin.com/in/<handle>'.
   */
  social: {
    github: null as string | null,
    linkedin: null as string | null,
  },
} as const

export const navigation = [
  { label: 'Services', to: '/services' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'How We Work', to: '/how-we-work' },
  { label: 'About', to: '/about' },
] as const

export const primaryCta = { label: 'Start a conversation', to: '/contact' } as const
