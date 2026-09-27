<script setup lang="ts">
import { ref, watch } from 'vue'
import { ChevronRight, Search } from 'lucide-vue-next'
import type { Solution } from '@/content/solutions'
import WindowFrame from '@/components/ui/WindowFrame.vue'
import StatusPill from '@/components/ui/StatusPill.vue'
import { useVisibleInterval } from '@/composables/useMotion'

/** A miniature operational interface for an example system. Data is illustrative. */
const props = defineProps<{ solution: Solution }>()

const active = ref(1)
watch(() => props.solution.id, () => (active.value = 1))

const root = ref<HTMLElement | null>(null)
useVisibleInterval(
  () => root.value,
  () => (active.value = (active.value + 1) % props.solution.flow.length),
  2200,
)
</script>

<template>
  <div ref="root" aria-hidden="true" class="select-none">
    <WindowFrame :label="solution.appLabel" live>
      <div class="p-3.5 sm:p-5">
        <!-- Flow -->
        <ol class="flex flex-wrap items-center gap-x-1 gap-y-1.5">
          <template v-for="(step, i) in solution.flow" :key="step">
            <li
              :class="[
                'rounded-md border px-1.5 py-1 text-[0.625rem] whitespace-nowrap transition-colors duration-500 sm:px-2 sm:text-[0.6875rem]',
                i === active
                  ? 'border-accent/40 bg-accent/10 text-fg'
                  : i < active
                    ? 'border-edge/[0.08] text-fg-muted'
                    : 'border-edge/[0.05] text-fg-subtle',
              ]"
            >
              {{ step }}
            </li>
            <ChevronRight v-if="i < solution.flow.length - 1" class="size-3 shrink-0 text-fg-subtle/60" />
          </template>
        </ol>

        <!-- Metrics -->
        <div class="mt-4 grid grid-cols-3 gap-2">
          <div v-for="m in solution.metrics" :key="m.label" class="rounded-lg border border-edge/[0.06] bg-edge/[0.015] px-2.5 py-2 sm:px-3">
            <p class="truncate text-[0.625rem] text-fg-subtle">{{ m.label }}</p>
            <p class="mt-0.5 text-base font-semibold tracking-tight text-fg tabular-nums sm:text-lg">{{ m.value }}</p>
          </div>
        </div>

        <!-- Table -->
        <div class="mt-4 overflow-hidden rounded-lg border border-edge/[0.06]">
          <div class="flex items-center justify-between gap-3 border-b border-edge/[0.06] bg-edge/[0.015] px-3 py-2">
            <span class="flex items-center gap-1.5 text-[0.625rem] text-fg-subtle">
              <Search class="size-3" /> Filter
            </span>
            <span class="font-mono text-[0.5625rem] text-fg-subtle">{{ solution.rows.length }} of many</span>
          </div>
          <div class="grid grid-cols-[1fr_auto] gap-3 border-b border-edge/[0.06] px-3 py-1.5 text-[0.5625rem] tracking-wider text-fg-subtle uppercase sm:grid-cols-[1fr_6rem_5rem]">
            <span>{{ solution.columns[0] }}</span>
            <span>{{ solution.columns[1] }}</span>
            <span class="hidden text-right sm:block">{{ solution.columns[2] }}</span>
          </div>
          <ul>
            <li
              v-for="row in solution.rows"
              :key="row.primary"
              class="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-edge/[0.04] px-3 py-2 transition-colors last:border-0 hover:bg-edge/[0.02] sm:grid-cols-[1fr_6rem_5rem]"
            >
              <span class="min-w-0">
                <span class="block truncate text-[0.6875rem] text-fg sm:text-xs">{{ row.primary }}</span>
                <span class="block truncate text-[0.625rem] text-fg-subtle">{{ row.secondary }}</span>
              </span>
              <span><StatusPill :tone="row.tone" :label="row.status" /></span>
              <span class="hidden truncate text-right font-mono text-[0.625rem] text-fg-subtle sm:block">{{ row.meta }}</span>
            </li>
          </ul>
        </div>
      </div>
    </WindowFrame>
  </div>
</template>
