import { onBeforeUnmount, onMounted, ref } from 'vue'

/** Reactive prefers-reduced-motion. False during SSR. */
export function usePrefersReducedMotion() {
  const reduced = ref(false)
  let mq: MediaQueryList | null = null
  const update = () => (reduced.value = !!mq?.matches)
  onMounted(() => {
    mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    update()
    mq.addEventListener('change', update)
  })
  onBeforeUnmount(() => mq?.removeEventListener('change', update))
  return reduced
}

/** Runs `fn` on an interval only while the element is on screen and motion is allowed. */
export function useVisibleInterval(target: () => Element | null | undefined, fn: () => void, ms: number) {
  let timer: ReturnType<typeof setInterval> | undefined
  let io: IntersectionObserver | undefined
  const stop = () => {
    if (timer) clearInterval(timer)
    timer = undefined
  }
  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = target()
    if (!el) return
    io = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        if (!timer) timer = setInterval(fn, ms)
      } else stop()
    })
    io.observe(el)
  })
  onBeforeUnmount(() => {
    stop()
    io?.disconnect()
  })
}
