import { onMounted, ref } from 'vue'

export type Theme = 'light' | 'dark'

const theme = ref<Theme>('dark')
let initialised = false

function apply(t: Theme) {
  theme.value = t
  document.documentElement.setAttribute('data-theme', t)
}

/**
 * Current theme plus a toggle. The initial value is set before paint by the
 * inline script in index.html; an explicit choice is remembered in localStorage.
 */
export function useTheme() {
  onMounted(() => {
    if (initialised) return
    initialised = true
    const current = document.documentElement.getAttribute('data-theme')
    theme.value = current === 'light' ? 'light' : 'dark'

    // Follow the system setting until the visitor makes a choice.
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    mq.addEventListener('change', (e) => {
      let saved: string | null = null
      try {
        saved = localStorage.getItem('theme')
      } catch {}
      if (!saved) apply(e.matches ? 'light' : 'dark')
    })
  })

  function toggle() {
    const next: Theme = theme.value === 'dark' ? 'light' : 'dark'
    apply(next)
    try {
      localStorage.setItem('theme', next)
    } catch {}
  }

  return { theme, toggle }
}
