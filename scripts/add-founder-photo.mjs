// Turns a local portrait into optimised WebP files for the About page founder section.
// Usage: node scripts/add-founder-photo.mjs path/to/photo.jpg
// Then set `founder.photo` to 'founder' in src/content/company.ts.
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import sharp from 'sharp'

const input = process.argv[2]
if (!input) {
  console.error('Usage: node scripts/add-founder-photo.mjs path/to/photo.jpg')
  process.exit(1)
}
const outDir = fileURLToPath(new URL('../public/photos/', import.meta.url))
await mkdir(outDir, { recursive: true })

// Portrait crop (4:5), centred slightly high so the face sits in the upper third.
for (const width of [720, 1440]) {
  const file = join(outDir, `founder-${width}.webp`)
  await sharp(input)
    .rotate()
    .resize({ width, height: Math.round((width * 5) / 4), fit: 'cover', position: 'attention' })
    .webp({ quality: 80, effort: 6 })
    .toFile(file)
  console.log(`Wrote public/photos/founder-${width}.webp`)
}
