import type { Directive } from 'vue'

/**
 * v-reveal: fades an element in when it scrolls into view.
 * Usage: v-reveal or v-reveal="120" (delay in ms).
 * Content stays visible without JS and with reduced motion (see style.css).
 */
let observer: IntersectionObserver | null = null

function getObserver() {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer?.unobserve(entry.target)
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  )
  return observer
}

export const vReveal: Directive<HTMLElement, number | undefined> = {
  getSSRProps(binding) {
    return {
      'data-reveal': '',
      style: binding.value ? `--reveal-delay:${binding.value}ms` : undefined,
    }
  },
  mounted(el, binding) {
    el.setAttribute('data-reveal', '')
    if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible')
      return
    }
    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
