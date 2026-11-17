import { copyFileSync, existsSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { redirects } from './src/redirects'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const siteUrl = (env.VITE_SITE_URL || 'https://www.example.com').replace(/\/$/, '')
  if (mode === 'production' && !env.VITE_SITE_URL) {
    console.warn('\n[sofforr] WARNING: VITE_SITE_URL is not set. Canonical URLs, Open Graph URLs and the sitemap fall back to https://www.example.com. Set it before launch.\n')
  }
  let renderedPaths: string[] = []

  return {
    plugins: [vue(), tailwindcss()],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    ssgOptions: {
      script: 'async',
      formatting: 'minify',
      dirStyle: 'nested',
      includedRoutes(paths) {
        // Redirect-only routes come from src/redirects.ts and are served by vercel.json / public/_redirects, not pre-rendered.
        const redirectOnly = Object.keys(redirects)
        renderedPaths = paths.filter((p) => !p.includes(':') && !redirectOnly.includes(p))
        return [...renderedPaths, '/404']
      },
      onFinished() {
        const outDir = join(process.cwd(), 'dist')
        const urls = renderedPaths
          .map((p) => `  <url><loc>${siteUrl}${p === '/' ? '/' : p}</loc></url>`)
          .join('\n')
        writeFileSync(
          join(outDir, 'sitemap.xml'),
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        )
        // Most static hosts serve /404.html for unknown paths.
        const notFound = join(outDir, '404', 'index.html')
        if (existsSync(notFound)) copyFileSync(notFound, join(outDir, '404.html'))
        writeFileSync(join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)
      },
    },
  }
})
