import type { PhotoName } from './photos'
import type { ImageName } from './images'

/**
 * SOFORR's products. A page at `/products/<slug>` is generated for each entry.
 *
 * Only fill in what is true today. Optional fields that are left out do not
 * render. Never add customers, revenue, adoption figures or capabilities that
 * do not exist, and never present a mockup as a screenshot: real screenshots go
 * in `screenshots`, and the section only appears once there are some.
 */
export type ProductStatus = 'In development' | 'In pilot' | 'Live'
export type ProductOwnership = 'Owned by SOFORR' | 'Built for a client'

export interface Screenshot {
  /** Path under /public, e.g. /screenshots/business-os-dashboard.webp */
  src: string
  alt: string
  caption?: string
  width: number
  height: number
}

export interface Product {
  slug: string
  name: string
  ownership: ProductOwnership
  flagship?: boolean
  category: string
  status: ProductStatus
  /** One sentence: what it is. */
  summary: string
  /** Longer explanation, one paragraph per entry. */
  overview: string[]
  /** What the status means, in plain words. */
  statusNote: string
  /** Design intent. State direction, not shipped features. */
  principles?: { title: string; body: string }[]
  /** Optional context shown beside the product (e.g. who it is for). */
  origin?: string
  /** Photograph, if the product has a real place or context. */
  photo?: PhotoName
  detailPhoto?: PhotoName
  /** A technical illustration (never a screenshot). */
  illustration?: { name: ImageName; alt: string; caption: string }
  /** Real product screenshots only. */
  screenshots?: Screenshot[]
  technology?: string[]
  /** Public link, once there is one. */
  url?: string
  cta: { label: string; to: string }
  /** For client-built systems: the related case study. */
  caseStudy?: string
}

export const products: Product[] = [
  {
    slug: 'soforr-business-os',
    name: 'Soforr Business OS',
    ownership: 'Owned by SOFORR',
    flagship: true,
    category: 'Business operations software',
    status: 'In development',
    summary: 'SOFORR’s flagship software product: operating software for businesses, independently owned and developed by SOFORR.',
    overview: [
      'Soforr Business OS is the flagship of SOFORR’s product division. It is owned, funded and developed by SOFORR itself, not built for a client, and it is the product that most directly carries the engineering standards we apply to client work.',
      'It is aimed at businesses that run on disconnected tools and manual processes and would benefit from operating on one dependable system. The product is under active development, and this page will be updated as it reaches pilot and release.',
    ],
    statusNote: 'In development. Soforr Business OS is not yet available for general use. If you would like to follow its progress or discuss early access, get in touch.',
    principles: [
      { title: 'Owned end to end', body: 'Built and operated by SOFORR, so we answer for its quality without a client in between.' },
      { title: 'Designed around real operations', body: 'Shaped by how businesses actually work, not by a generic feature list.' },
      { title: 'Held to our engineering standard', body: 'The same architecture, testing and delivery practices we bring to client engagements.' },
    ],
    illustration: {
      name: 'system',
      alt: 'Isometric technical illustration of a central system connected to payments, orders, inventory, CRM, documents and reporting modules.',
      caption: 'Technical illustration of the single-system idea behind business operating software. It is a concept diagram, not a screenshot of the product.',
    },
    cta: { label: 'Discuss Soforr Business OS', to: '/contact?engagement=product&product=soforr-business-os' },
  },
  {
    slug: 'kujaaburun',
    name: 'Kujaaburun',
    ownership: 'Owned by SOFORR',
    category: 'Travel and tourism platform',
    status: 'In development',
    summary: 'A travel platform connecting travellers with local guides and the experiences they run, originating in The Gambia.',
    overview: [
      'Many of the best experiences a place has to offer are run by local guides and small operators who are hard to find and harder to book. Kujaaburun is SOFORR’s own product, originating in The Gambia: one place where travellers can discover those experiences and book them, and where guides can present and manage what they offer.',
    ],
    statusNote: 'In development. Kujaaburun is not yet publicly available.',
    principles: [
      { title: 'Discovery for travellers', body: 'Finding experiences and the local guides who run them.' },
      { title: 'Tools for guides and operators', body: 'A way to present and manage what they offer.' },
      { title: 'Booking and payments for both sides', body: 'Designed to work for travellers and for the people who host them.' },
    ],
    origin: 'The Gambia, West Africa',
    photo: 'kujaaburun',
    detailPhoto: 'gambia-river',
    cta: { label: 'Talk to us about Kujaaburun', to: '/contact?engagement=product&product=kujaaburun' },
  },
  {
    slug: 'sweetland-farms-os',
    name: 'SweetLand Farms OS',
    ownership: 'Built for a client',
    category: 'Agriculture operations system',
    status: 'In development',
    summary: 'An operational system SOFORR is building for SweetLand Farms in Maine, USA. A client engagement, not a SOFORR-owned product.',
    overview: [
      'SweetLand Farms OS is being built by SOFORR for SweetLand Farms, a farm in Maine, USA. It is shaped around how the farm actually operates, so the farm can see what is happening, manage it in one place and improve it over time.',
      'It is listed here because it is a software system SOFORR is developing, but it is a client engagement. It is not a product SOFORR owns or sells, and it is not available to other farms through SOFORR. The system is still in development.',
    ],
    statusNote: 'In development, for SweetLand Farms. Not available to the public.',
    principles: [
      { title: 'Built around the farm', body: 'A system shaped around the farm’s day-to-day operations.' },
      { title: 'One place for operations', body: 'The information the operation runs on, kept together.' },
      { title: 'Visibility over time', body: 'Information that helps decisions improve.' },
    ],
    origin: 'Maine, USA (the client’s location)',
    photo: 'sweetland',
    detailPhoto: 'sweetland-detail',
    caseStudy: 'sweetland-farms-os',
    cta: { label: 'Discuss a similar system', to: '/contact?engagement=fixed-price' },
  },
]

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug)
export const ownedProducts = products.filter((p) => p.ownership === 'Owned by SOFORR')
export const clientBuiltProducts = products.filter((p) => p.ownership === 'Built for a client')
export const flagshipProduct = products.find((p) => p.flagship)!
