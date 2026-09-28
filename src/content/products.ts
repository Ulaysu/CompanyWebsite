import type { PhotoName } from './photos'

/**
 * SOFORR's products and technology initiatives.
 *
 * Add one by appending to `products`. A page at `/products/<slug>` is generated
 * automatically. Only fill in what is true today: optional fields that are left
 * out simply don't render, and `outcome` stays unset until there are real results.
 */
export type ProductStatus = 'In development' | 'Live' | 'In pilot'
export type ProductKind = 'SOFORR product' | 'Technology initiative'

export interface Product {
  slug: string
  name: string
  kind: ProductKind
  category: string
  status: ProductStatus
  /** One sentence: what it is. */
  summary: string
  photo: PhotoName
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

export const products: Product[] = [
  {
    slug: 'kujaaburun',
    name: 'Kujaaburun',
    kind: 'SOFORR product',
    category: 'Travel & tourism platform',
    status: 'In development',
    summary: 'A technology platform connecting travellers, guides and tourism opportunities across Africa.',
    photo: 'kujaaburun',
    context:
      'Some of the most memorable experiences on the continent are run by local guides and small operators who are hard to find and harder to book. Kujaaburun is SOFORR’s own product: one platform that brings travellers, guides and tourism opportunities together, built to the standard travellers expect from the best global platforms.',
    building: [
      'Discovery of experiences and guides for travellers',
      'Tools for guides and local operators to present and manage what they offer',
      'Booking and payments that work for both sides',
    ],
  },
  {
    slug: 'sweetland-farms',
    name: 'SweetLand Farms',
    kind: 'Technology initiative',
    category: 'Agriculture · Operations technology',
    status: 'In development',
    summary: 'Technology that helps agricultural operations understand, manage and improve how they run.',
    photo: 'sweetland',
    context:
      'Agricultural operations run on work that generic software rarely models well, spread across people, places and seasons. With SweetLand Farms, SOFORR is building technology around how a farm actually operates, so the operation can see what is happening, manage it in one place and improve it over time.',
    building: [
      'A system shaped around the farm’s day-to-day operations',
      'One place for the information the operation runs on',
      'Visibility that helps decisions improve over time',
    ],
  },
]

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug)
