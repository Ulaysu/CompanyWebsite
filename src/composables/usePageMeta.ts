import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import { site } from '@/config/site'

interface PageMeta {
  /** Page title. Omit on the home page to use the brand title. */
  title?: string
  description?: string
}

/** Sets title, description, canonical, Open Graph and Twitter metadata for a page. */
export function usePageMeta({ title, description = site.description }: PageMeta = {}) {
  const route = useRoute()
  const fullTitle = title
    ? `${title} — ${site.name}`
    : `${site.name} — ${site.descriptor}`
  const url = `${site.url}${route.path === '/' ? '' : route.path.replace(/\/$/, '')}`
  const image = `${site.url}/og-image.png`

  useHead({
    title: fullTitle,
    link: [{ rel: 'canonical', href: url }],
    meta: [
      { name: 'description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: site.name },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: `${site.name} — ${site.descriptor}` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ],
  })
}
