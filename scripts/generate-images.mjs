// Generates the site's illustrations (dark + light, two widths each) as WebP.
// Usage: node scripts/generate-images.mjs [sceneName ...]
// Requires Playwright + Chromium. Scenes live in scripts/images/scenes.js.
import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const outDir = join(root, 'public', 'images')

/** name → [render width, render height, output widths, webp quality, themes] */
const SCENES = {
  system: [2400, 1300, [1000, 2000]],
  // Always shown on a dark section, so only a dark version is rendered.
  globe: [2000, 2000, [900, 1800], 0.86, ['dark']],
}

const only = process.argv.slice(2)
const types = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.woff2': 'font/woff2' }

// Serve the repo root so the page can import ES modules and fonts.
const server = createServer(async (req, res) => {
  try {
    const path = normalize(join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname)))
    if (!path.startsWith(root)) throw new Error('outside root')
    const body = await readFile(path)
    res.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream' })
    res.end(body)
  } catch {
    res.writeHead(404)
    res.end()
  }
}).listen(0)
const port = server.address().port

await mkdir(outDir, { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage()
page.on('pageerror', (e) => console.error('page error:', e.message))
await page.goto(`http://localhost:${port}/scripts/images/render.html`)
await page.waitForFunction(() => window.ready)

for (const [name, [w, h, sizes, quality = 0.84, themes = ['dark', 'light']]] of Object.entries(SCENES)) {
  if (only.length && !only.includes(name)) continue
  for (const theme of themes) {
    const urls = await page.evaluate(
      ([n, t, w, h, sizes, q]) => window.exportScene(n, t, w, h, sizes, q),
      [name, theme, w, h, sizes, quality],
    )
    for (const [size, url] of Object.entries(urls)) {
      const file = join(outDir, `${name}-${theme}-${size}.webp`)
      const buf = Buffer.from(url.split(',')[1], 'base64')
      await writeFile(file, buf)
      console.log(`${file.replace(root, '')}  ${(buf.length / 1024).toFixed(0)} KB`)
    }
  }
}

await browser.close()
server.close()
