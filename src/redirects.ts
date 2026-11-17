import data from './redirects.json'

/**
 * Retired URLs, kept so old links still land somewhere sensible.
 * The single source of truth is redirects.json. `npm run sync:redirects` writes
 * vercel.json and public/_redirects from it (and runs automatically before build).
 */
export const redirects: Record<string, string> = data
