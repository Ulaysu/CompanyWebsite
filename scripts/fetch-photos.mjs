// Downloads the photos listed in src/content/photos.json from Unsplash and
// writes optimised WebP files to public/photos/{key}-{width}.webp.
// Usage: node scripts/fetch-photos.mjs [key ...]
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'
import sharp from 'sharp'

const root = fileURLToPath(new URL('..', import.meta.url))
const { photos } = JSON.parse(await readFile(join(root, 'src/content/photos.json'), 'utf8'))
const outDir = join(root, 'public', 'photos')
await mkdir(outDir, { recursive: true })
const only = process.argv.slice(2)

for (const [key, photo] of Object.entries(photos)) {
  if (only.length && !only.includes(key)) continue
  const max = Math.max(...photo.widths)
  const url = `https://images.unsplash.com/photo-${photo.unsplash}?w=${max}&q=85&fm=jpg`
  // curl honours the environment's proxy and CA settings.
  const original = execFileSync('curl', ['-sfL', '--max-time', '60', url], { maxBuffer: 64 * 1024 * 1024 })
  for (const w of photo.widths) {
    const file = join(outDir, `${key}-${w}.webp`)
    const buf = await sharp(original).resize({ width: w, withoutEnlargement: true }).webp({ quality: 80, effort: 6 }).toBuffer()
    await writeFile(file, buf)
    console.log(`public/photos/${key}-${w}.webp  ${(buf.length / 1024).toFixed(0)} KB`)
  }
}
