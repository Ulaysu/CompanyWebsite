import { ViteSSG } from 'vite-ssg'
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import './style.css'
import App from './App.vue'
import { routes } from './routes'
import { vReveal } from './directives/reveal'
import { site } from './config/site'

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
            '@type': 'ProfessionalService',
            name: site.name,
            description: site.description,
            url: site.url,
            email: site.email,
            areaServed: 'Worldwide',
            serviceType: ['Custom software development', 'Business process automation', 'API integration'],
          }),
        },
      ],
    })
  },
)
