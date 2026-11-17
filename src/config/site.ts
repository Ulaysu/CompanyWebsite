/**
 * Brand + site configuration.
 *
 * Everything that identifies the company lives here, so components never
 * hard-code the name, the positioning or the navigation.
 */

const env = import.meta.env as Record<string, string | undefined>

export const site = {
  name: 'SOFORR',
  descriptor: 'International software engineering company',
  /** The primary homepage message. */
  headline: 'Engineering software. Building what comes next.',
  /** The positioning statement. */
  positioning:
    'SOFORR is a global software engineering company building reliable digital systems, delivering specialised engineering services and creating software products for businesses worldwide.',
  /** Supporting copy under the headline. */
  summary: [
    'We engineer reliable software systems for businesses and build technology products of our own.',
    'From custom enterprise applications and backend systems to independently owned software products, we turn complex problems into technology that works.',
  ],
  /** Origin and scope. The Gambia is where SOFORR was founded; clients are served worldwide. */
  origin: 'Founded in The Gambia. Serving clients worldwide.',
  originShort: 'Founded in The Gambia · Serving clients worldwide',
  description:
    'SOFORR is an international software engineering company founded in The Gambia. We deliver custom software, backend and API engineering, dedicated engineering teams, cloud and DevOps, AI engineering and technical consulting, and we build our own software products.',

  /** The philosophy the company is named after. */
  philosophy: {
    phrase: 'Duniyai ka Soforr.',
    meaning: 'This world is all about helping one another.',
    language: 'Jola-Bulluf',
  },

  /** Canonical production URL (no trailing slash). Set VITE_SITE_URL at build time. */
  url: (env.VITE_SITE_URL ?? '').replace(/\/$/, '') || 'https://www.example.com',

  /**
   * Company-controlled inbox, set with VITE_CONTACT_EMAIL at build time.
   * There is deliberately no default: when it is unset, no email address is shown
   * and the contact page says the enquiry form is not yet connected.
   */
  email: (env.VITE_CONTACT_EMAIL ?? '').trim() || null,

  /**
   * Form backend (Formspree, Basin, your own API) accepting a JSON POST.
   * Set with VITE_CONTACT_ENDPOINT at build time.
   */
  contactEndpoint: (env.VITE_CONTACT_ENDPOINT ?? '').trim() || null,

  /**
   * Company social profiles, set at build time. Anything unset is hidden.
   */
  social: {
    github: (env.VITE_SOCIAL_GITHUB ?? '').trim() || null,
    linkedin: (env.VITE_SOCIAL_LINKEDIN ?? '').trim() || null,
    x: (env.VITE_SOCIAL_X ?? '').trim() || null,
  },
}

export const navigation = [
  { label: 'Home', to: '/' },
  { label: 'Engineering', to: '/engineering' },
  { label: 'Products', to: '/products' },
  { label: 'Our Work', to: '/our-work' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
] as const

export const primaryCta = { label: 'Start a Project', to: '/contact' } as const
