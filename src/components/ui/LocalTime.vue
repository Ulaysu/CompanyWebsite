<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * The current local time in a place, e.g. "14:05 GMT".
 * Renders a neutral placeholder on the server and fills in after hydration,
 * so pre-rendered HTML never shows a stale time.
 */
const props = defineProps<{ timeZone: string }>()
const time = ref('--:--')
const zone = ref('')
let timer: ReturnType<typeof setInterval> | undefined

function tick() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: props.timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZoneName: 'short',
  }).formatToParts(new Date())
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  time.value = `${get('hour')}:${get('minute')}`
  zone.value = get('timeZoneName')
}

onMounted(() => {
  tick()
  timer = setInterval(tick, 15_000)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <span class="tabular-nums"><time>{{ time }}</time><span v-if="zone" class="ml-1.5 opacity-70">{{ zone }}</span></span>
</template>
