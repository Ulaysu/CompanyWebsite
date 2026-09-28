/**
 * Generated illustrations (see scripts/generate-images.mjs).
 * Each exists as /images/{name}-{theme}-{width}.webp.
 */
export interface GeneratedImage {
  name: string
  widths: [number, number]
  /** Intrinsic aspect ratio (width / height) of the rendered image. */
  ratio: number
}

export const images = {
  system: { name: 'system', widths: [1000, 2000], ratio: 2400 / 1300 },
} satisfies Record<string, GeneratedImage>

export type ImageName = keyof typeof images

/** The Africa-centred network globe. Dark only, transparent background. */
export const globe = {
  srcset: '/images/globe-dark-900.webp 900w, /images/globe-dark-1800.webp 1800w',
  src: '/images/globe-dark-900.webp',
  size: 1800,
}
