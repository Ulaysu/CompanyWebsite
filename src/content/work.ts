import type { PhotoName } from './photos'

/**
 * The company's work: our own products and partner projects.
 *
 * Add a project by appending to `projects`. Only fill in what is true today.
 * Optional fields that are left out simply don't render, and `outcome` stays
 * unset until there are real results to report.
 */
export type ProjectStatus = 'In development' | 'Live' | 'In pilot'
export type ProjectKind = 'Our product' | 'Partner project'

export interface Project {
  slug: string
  name: string
  kind: ProjectKind
  category: string
  status: ProjectStatus
  /** One sentence: what it is. */
  summary: string
  photo: PhotoName
  /** Why it exists: the context or opportunity. */
  context: string
  /** What we are building (or built). Keep to things that are actually in scope. */
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
    kind: 'Our product',
    category: 'Travel platform',
    status: 'In development',
    summary: 'A technology platform connecting travellers with experiences and the local operators who run them.',
    photo: 'kujaaburun',
    context:
      'Some of the best experiences a traveller can have are run by small local operators who are hard to find and harder to book. Kujaaburun is our own product: a platform that brings those experiences and operators online, built to the standard travellers expect from global platforms.',
    building: [
      'Discovery of experiences for travellers',
      'Tools for local operators to present and manage what they offer',
      'Booking and payments that work for both sides',
    ],
  },
  {
    slug: 'sweetland-farms',
    name: 'SweetLand Farms',
    kind: 'Partner project',
    category: 'Operations system · Agriculture',
    status: 'In development',
    summary: 'An operational technology system built around the real workflows of a growing agricultural business.',
    photo: 'sweetland',
    context:
      'A growing agricultural business runs on work that off-the-shelf software rarely models well. We are building a system around how SweetLand Farms actually operates, rather than asking the farm to change how it works to fit a generic tool.',
    building: [
      'A system shaped around the farm’s day-to-day workflows',
      'One place for the information the business runs on',
      'A foundation that can grow with the operation',
    ],
  },
]

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug)
