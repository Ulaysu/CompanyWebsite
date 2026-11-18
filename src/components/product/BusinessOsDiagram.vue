<script setup lang="ts">
/** A concept diagram: one system at the centre of a business's operations. It shows no features and is not a screenshot. */
const nodes = [
  [90, 70], [310, 50], [350, 190], [260, 300], [70, 280], [30, 170],
] as const
</script>

<template>
  <svg viewBox="0 0 400 350" role="img" aria-label="Concept diagram: one system connected to the separate parts of a business" class="h-full w-full">
    <g stroke="currentColor" class="text-ink-700" stroke-width="1.5" fill="none">
      <line v-for="(n, i) in nodes" :key="i" x1="200" y1="175" :x2="n[0]" :y2="n[1]" stroke-dasharray="4 5" />
    </g>
    <g v-for="(n, i) in nodes" :key="`n${i}`">
      <rect :x="n[0] - 26" :y="n[1] - 18" width="52" height="36" rx="9" class="fill-ink-950 stroke-ink-700" stroke-width="1.5" />
      <rect :x="n[0] - 12" :y="n[1] - 3" width="24" height="5" rx="2.5" class="fill-ink-700" />
    </g>
    <rect x="140" y="140" width="120" height="70" rx="16" class="fill-fg" />
    <text x="200" y="171" text-anchor="middle" class="fill-ink-950" font-size="14" font-weight="600" font-family="var(--font-display)">Soforr</text>
    <text x="200" y="190" text-anchor="middle" class="fill-ink-950" font-size="14" font-weight="600" font-family="var(--font-display)">Business OS</text>
  </svg>
</template>
