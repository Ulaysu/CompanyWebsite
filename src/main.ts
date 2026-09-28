import { ViteSSG } from 'vite-ssg'
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import '@fontsource/instrument-serif/latin-400.css'
import '@fontsource/instrument-serif/latin-400-italic.css'
import './style.css'
import App from './App.vue'
import { routes } from './routes'
import { vReveal } from './directives/reveal'
import { site } from './config/site'
import { founder } from './content/company'

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior(to, _from, saved) {
      if (saved) return saved
      if (to.hash) return { el: to.hash, top: 88, behavior: 'smooth' }
      return { top: 0 }
    },
  },
  ({ app, head }) => {
    app.directive('reveal', vReveal)
    head?.push({
      htmlAttrs: { lang: 'en' },
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: site.name,
            description: site.description,
            slogan: site.tagline,
            url: site.url,
            email: site.email,
            founder: { '@type': 'Person', name: founder.name, alternateName: founder.handle, jobTitle: founder.role },
            foundingLocation: 'The Gambia',
            areaServed: 'Worldwide',
            knowsAbout: ['Software engineering', 'Technology products', 'Platforms', 'Business systems', 'APIs and integrations', 'Payments', 'Automation'],
          }),
        },
      ],
    })
  },
)
