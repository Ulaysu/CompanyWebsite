<script setup lang="ts">
import { methodology } from '@/content/company'

/**
 * The hero's memorable element: how SOFORR works. Two sources feed one delivery
 * standard, and a single pulse moves through its stages. It illustrates the
 * process; it shows no data and makes no claim about any project.
 */
const stages = methodology.map((m, i) => ({
  title: m.title,
  note: ['Scope and success written down', 'Architecture and the smallest first release', 'Reviewed, automated checks', 'Same pipeline, every time', 'Observed in production, then improved'][i],
}))
</script>

<template>
  <figure class="card overflow-hidden" aria-label="Illustration: one delivery standard for client engineering and SOFORR products">
    <div class="tri-band-h h-1.5" aria-hidden="true" />
    <div class="p-5 sm:p-7">
      <div class="grid grid-cols-2 gap-3">
        <div class="rounded-xl border border-edge/10 bg-ink-900 p-3.5">
          <p class="text-[0.8125rem] font-semibold text-fg">Engineering services</p>
          <p class="mt-0.5 text-xs text-fg-subtle">Your system, your terms</p>
        </div>
        <div class="rounded-xl border border-edge/10 bg-ink-900 p-3.5">
          <p class="text-[0.8125rem] font-semibold text-fg">SOFORR products</p>
          <p class="mt-0.5 text-xs text-fg-subtle">Software we own</p>
        </div>
      </div>

      <div class="relative mx-auto h-6 w-[calc(50%+0.75rem)]" aria-hidden="true">
        <svg viewBox="0 0 100 24" preserveAspectRatio="none" class="h-full w-full text-ink-700">
          <path d="M0 0 V10 Q0 12 2 12 H48 Q50 12 50 14 V24 M100 0 V10 Q100 12 98 12 H52 Q50 12 50 14" fill="none" stroke="currentColor" stroke-width="1.5" vector-effect="non-scaling-stroke" />
        </svg>
      </div>

      <p class="text-center text-sm font-semibold text-fg">One delivery standard</p>

      <ol class="relative mt-4">
        <span class="absolute top-4 bottom-4 left-[1.0625rem] w-px bg-ink-700" aria-hidden="true" />
        <li v-for="(s, i) in stages" :key="s.title" class="pipeline-stage relative flex items-center gap-4 rounded-xl px-2 py-2.5" :style="{ '--i': i + 1 }">
          <span class="pipeline-dot relative z-10 ml-[0.3125rem] size-3 shrink-0 rounded-full ring-4 ring-ink-950" aria-hidden="true" :style="{ '--i': i + 1 }" />
          <span class="min-w-0">
            <span class="block text-[0.9375rem] font-semibold text-fg">{{ s.title }}</span>
            <span class="block text-[0.8125rem] text-fg-muted">{{ s.note }}</span>
          </span>
        </li>
      </ol>
    </div>
    <figcaption class="border-t border-edge/10 bg-ink-900 px-5 py-3 text-xs text-fg-subtle sm:px-7">Illustration of our delivery process, not project data.</figcaption>
  </figure>
</template>
