/**
 * Generated illustrations (see scripts/generate-images.mjs).
 * Each exists as /images/{name}-{dark|light}-{width}.webp.
 */
export interface GeneratedImage {
  name: string
  widths: [number, number]
  /** Intrinsic aspect ratio (width / height) of the rendered image. */
  ratio: number
}

export const images = {
  field: { name: 'field', widths: [1000, 2000], ratio: 2000 / 1100 },
  fleet: { name: 'fleet', widths: [800, 1600], ratio: 2000 / 1250 },
  property: { name: 'property', widths: [800, 1600], ratio: 2000 / 1250 },
  wholesale: { name: 'wholesale', widths: [800, 1600], ratio: 2000 / 1250 },
  admin: { name: 'admin', widths: [800, 1600], ratio: 2000 / 1250 },
  system: { name: 'system', widths: [1000, 2000], ratio: 2400 / 1300 },
  process: { name: 'process', widths: [1000, 2000], ratio: 2400 / 1100 },
} satisfies Record<string, GeneratedImage>

export type ImageName = keyof typeof images
