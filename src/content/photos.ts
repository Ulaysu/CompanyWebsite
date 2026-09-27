import data from './photos.json'

export interface Photo {
  unsplash: string
  alt: string
  widths: number[]
  /** CSS object-position focal point. */
  position: string
}

/** Real photography (Unsplash License). Files live in /photos/{key}-{width}.webp; widths ascend. */
export const photos = data.photos as Record<string, Photo>
export type PhotoName = keyof typeof data.photos

export function photoSrcset(name: PhotoName) {
  return photos[name]!.widths.map((w) => `/photos/${name}-${w}.webp ${w}w`).join(', ')
}
export function photoSrc(name: PhotoName) {
  return `/photos/${name}-${photos[name]!.widths[0]}.webp`
}
