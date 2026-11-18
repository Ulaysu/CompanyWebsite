import type { PhotoName } from './photos'

/**
 * Client work. A page at `/our-work/<slug>` is generated for each entry.
 *
 * Rules:
 * - Publish a client only with their permission (`permission: true`). Entries
 *   without it are never rendered.
 * - Employment, internships and any work done before SOFORR must not be added
 *   here. This list is SOFORR client work only.
 * - Leave `technologies`, `implementation` and `outcomes` unset until they are
 *   true and approved. Never invent results.
 */
export interface CaseStudy {
  slug: string
  title: string
  client: string
  clientLocation: string
  sector: string
  status: 'In progress' | 'Completed'
  /** The client has agreed to be named publicly. */
  permission: boolean
  summary: string
  problem: string
  scope: string[]
  approach: string[]
  technologies?: string[]
  implementation?: string[]
  outcomes?: string[]
  photo?: PhotoName
  /** A product page that covers the same system. */
  productSlug?: string
}

export const caseStudiesAll: CaseStudy[] = [
  {
    slug: 'sweetland-farms-os',
    title: 'SweetLand Farms OS',
    client: 'SweetLand Farms',
    clientLocation: 'Maine, USA',
    sector: 'Agriculture',
    status: 'In progress',
    permission: true,
    summary: 'An operational system built around how a working farm actually runs.',
    problem:
      'Farms run on work that generic software rarely models well: people, fields, inputs and seasons that change week to week. SweetLand Farms needs one place to see what is happening across the operation, manage it and improve it over time.',
    scope: [
      'A system shaped around the farm’s day-to-day operations',
      'One place for the information the operation runs on',
      'Visibility that helps decisions improve over time',
    ],
    approach: [
      'Start from how the farm actually operates, not from a feature list',
      'Design the smallest useful first release, then extend it',
      'Build in short cycles so the farm can review working software',
    ],
    productSlug: 'sweetland-farms-os',
  },
]

/** Only case studies that may be published. */
export const caseStudies = caseStudiesAll.filter((c) => c.permission)
export const caseStudyBySlug = (slug: string) => caseStudies.find((c) => c.slug === slug)
