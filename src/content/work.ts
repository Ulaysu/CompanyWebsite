import type { PhotoName } from './photos'

/**
 * SOFORR's work: our own products and the systems we build with partners.
 *
 * Add a project by appending to `projects`. A page at `/work/<slug>` is generated
 * automatically. Only fill in what is true today: optional fields that are left
 * out don't render, and `outcome` stays unset until there are real results.
 */
export type ProjectStatus = 'In development' | 'Live' | 'In pilot'
export type ProjectKind = 'SOFORR product' | 'Partner system'

export interface Place {
  /** Shown large, e.g. "The Gambia" or "Maine, USA". */
  name: string
  /** Shown small beside it, e.g. "West Africa". */
  region: string
  /** IANA time zone, used for the live local-time readout. */
  timeZone: string
}

export interface Project {
  slug: string
  name: string
  kind: ProjectKind
  category: string
  status: ProjectStatus
  place: Place
  /** One sentence: what it is. */
  summary: string
  photo: PhotoName
  /** A second, closer photograph for the project page. */
  detailPhoto?: PhotoName
  /** Why it exists: the problem or opportunity. */
  context: string
  /** What SOFORR is building. Keep to things that are actually in scope. */
  building: string[]
  /** Technology used. Leave empty until confirmed. */
  technology?: string[]
  /** Measured results. Leave unset until they exist. */
  outcome?: string
  /** Public link, once there is one. */
  url?: string
}

export const projects: Project[] = [
  {
    slug: 'kujaaburun',
    name: 'Kujaaburun',
    kind: 'SOFORR product',
    category: 'Travel & tourism technology',
    status: 'In development',
    place: { name: 'The Gambia', region: 'West Africa', timeZone: 'Africa/Banjul' },
    summary: 'A travel platform connecting travellers with local guides and the experiences they run.',
    photo: 'kujaaburun',
    detailPhoto: 'gambia-river',
    context:
      'Many of the best experiences a place has to offer are run by local guides and small operators who are hard to find and harder to book. Kujaaburun is SOFORR’s own product, originating in The Gambia: one place where travellers can discover those experiences and book them, and where guides can present and manage what they offer.',
    building: [
      'Discovery of experiences and guides for travellers',
      'Tools for guides and local operators to present and manage what they offer',
      'Booking and payments that work for both sides',
    ],
  },
  {
    slug: 'sweetland-farms-os',
    name: 'SweetLand Farms OS',
    kind: 'Partner system',
    category: 'Agriculture · Operations technology',
    status: 'In development',
    place: { name: 'Maine, USA', region: 'North America', timeZone: 'America/New_York' },
    summary: 'An operational system for SweetLand Farms in Maine, built around how the farm actually works.',
    photo: 'sweetland',
    detailPhoto: 'sweetland-detail',
    context:
      'Farms run on work that generic software rarely models well: people, fields, inputs and seasons that change week to week. SweetLand Farms OS is being built for SweetLand Farms around how the farm actually operates, so it can see what is happening, manage it in one place and improve it over time.',
    building: [
      'A system shaped around the farm’s day-to-day operations',
      'One place for the information the operation runs on',
      'Visibility that helps decisions improve over time',
    ],
  },
]

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug)
export const ownProducts = projects.filter((p) => p.kind === 'SOFORR product')
