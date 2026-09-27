<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

/** Renders the final value on the server; animates up from zero once visible on the client. */
const props = withDefaults(defineProps<{ value: number; duration?: number }>(), { duration: 1200 })

const display = ref(props.value)
const el = ref<HTMLElement | null>(null)
let io: IntersectionObserver | undefined
let raf = 0

function run() {
  const start = performance.now()
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / props.duration)
    const eased = 1 - Math.pow(1 - t, 4)
    display.value = Math.round(props.value * eased)
    if (t < 1) raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !el.value) return
  display.value = 0
  io = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) {
      run()
      io?.disconnect()
    }
  })
  io.observe(el.value)
})
onBeforeUnmount(() => {
  io?.disconnect()
  cancelAnimationFrame(raf)
})
</script>

<template>
  <span ref="el" class="tabular-nums">{{ display }}</span>
</template>
