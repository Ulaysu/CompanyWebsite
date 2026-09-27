<script setup lang="ts">
import { Check, Database, CreditCard, Calculator, Users, Mail, FileText, Landmark } from 'lucide-vue-next'
import type { ServiceVisualKind } from '@/content/services'
import StatusPill from '@/components/ui/StatusPill.vue'

/**
 * Small, decorative interface sketches for each service.
 * Place inside an element with the `group` class to enable hover motion.
 */
withDefaults(defineProps<{ kind: ServiceVisualKind; size?: 'sm' | 'lg' }>(), { size: 'sm' })

const trail = [
  { who: 'Operations', what: 'Submitted request with 2 quotes attached', when: 'Mon' },
  { who: 'Finance', what: 'Budget checked against CC-210', when: 'Tue' },
  { who: 'Director', what: 'Approval requested · notified by email', when: 'now' },
]

const steps = ['Submitted', 'Reviewed', 'Approved', 'Completed']

const nodes = [
  { icon: CreditCard, label: 'Payments', x: 16, y: 24 },
  { icon: Calculator, label: 'Accounting', x: 83, y: 24 },
  { icon: Users, label: 'CRM', x: 13, y: 76 },
  { icon: Mail, label: 'Email / SMS', x: 82, y: 76 },
  { icon: FileText, label: 'Documents', x: 50, y: 90 },
  { icon: Landmark, label: 'Bank feed', x: 50, y: 10 },
]


const schedule = [
  { label: 'Unit 04', bars: [{ s: 4, w: 30, tone: 'bg-white/20' }, { s: 40, w: 22, tone: 'bg-accent/70' }] },
  { label: 'Unit 11', bars: [{ s: 14, w: 40, tone: 'bg-white/20' }, { s: 62, w: 18, tone: 'bg-white/10' }] },
  { label: 'Crew A', bars: [{ s: 0, w: 18, tone: 'bg-white/10' }, { s: 24, w: 44, tone: 'bg-white/20' }] },
  { label: 'Van 02', bars: [{ s: 30, w: 26, tone: 'bg-warning/50' }, { s: 64, w: 30, tone: 'bg-white/20' }] },
]
</script>

<template>
  <div aria-hidden="true" class="relative h-full min-h-[13rem] overflow-hidden select-none">
    <!-- 01: record with approval workflow -->
    <div v-if="kind === 'systems'" class="flex h-full flex-col gap-3 p-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="font-mono text-[0.625rem] text-fg-subtle">REQ-3108</p>
          <p class="text-xs font-medium text-fg">Equipment purchase request</p>
        </div>
        <StatusPill tone="accent" label="In approval" />
      </div>
      <div class="grid grid-cols-3 gap-2 text-[0.625rem]">
        <div class="rounded-md border border-white/[0.06] p-2"><p class="text-fg-subtle">Requested by</p><p class="mt-0.5 text-fg-muted">Operations</p></div>
        <div class="rounded-md border border-white/[0.06] p-2"><p class="text-fg-subtle">Cost centre</p><p class="mt-0.5 text-fg-muted">CC-210</p></div>
        <div class="rounded-md border border-white/[0.06] p-2"><p class="text-fg-subtle">Due</p><p class="mt-0.5 text-fg-muted">Friday</p></div>
      </div>
      <ul v-if="size === 'lg'" class="space-y-1.5 rounded-md border border-white/[0.06] p-2.5">
        <li v-for="t in trail" :key="t.who" class="flex items-center gap-2 text-[0.625rem] sm:text-[0.6875rem]">
          <span class="w-16 shrink-0 text-fg-muted">{{ t.who }}</span>
          <span class="min-w-0 flex-1 truncate text-fg-subtle">{{ t.what }}</span>
          <span class="font-mono text-[0.5625rem] text-fg-subtle">{{ t.when }}</span>
        </li>
      </ul>
      <ol class="mt-auto grid grid-cols-4 gap-1.5">
        <li v-for="(s, i) in steps" :key="s" class="space-y-1.5">
          <span
            :class="[
              'block h-1 rounded-full transition-colors duration-500',
              i < 2 ? 'bg-accent/80' : i === 2 ? 'bg-white/15 group-hover:bg-accent/80' : 'bg-white/10',
            ]"
          />
          <span class="flex items-center gap-1 text-[0.5625rem] text-fg-subtle">
            <Check v-if="i < 2" class="size-2.5 text-accent" />
            {{ s }}
          </span>
        </li>
      </ol>
    </div>

    <!-- 02: integration hub -->
    <div v-else-if="kind === 'integrations'" class="relative h-full">
      <svg class="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
        <g v-for="n in nodes" :key="n.label">
          <line :x1="n.x" :y1="n.y" x2="50" y2="50" stroke="rgb(255 255 255 / 0.08)" vector-effect="non-scaling-stroke" />
          <line
            :x1="n.x" :y1="n.y" x2="50" y2="50"
            stroke="var(--color-accent)" stroke-opacity="0.6" stroke-dasharray="2 8"
            vector-effect="non-scaling-stroke"
            class="animate-flow opacity-40 transition-opacity duration-500 group-hover:opacity-100"
          />
        </g>
      </svg>
      <span
        v-for="n in nodes"
        :key="n.label"
        class="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-md border border-white/[0.08] bg-ink-900 px-2 py-1 text-[0.625rem] whitespace-nowrap text-fg-muted"
        :style="{ left: `${n.x}%`, top: `${n.y}%` }"
      >
        <component :is="n.icon" class="size-3 text-fg-subtle" />
        {{ n.label }}
      </span>
      <span class="absolute top-1/2 left-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center">
        <span class="absolute size-16 rounded-full bg-accent/10 blur-md transition-transform duration-700 group-hover:scale-125" />
        <span class="relative flex items-center gap-1.5 rounded-lg border border-accent/30 bg-ink-850 px-2.5 py-1.5 text-[0.6875rem] font-medium text-fg shadow-lg">
          <Database class="size-3.5 text-accent" /> Your system
        </span>
      </span>
    </div>

    <!-- 03: operational schedule -->
    <div v-else class="flex h-full flex-col p-4">
      <div class="mb-3 flex items-center justify-between">
        <p class="text-xs font-medium text-fg">Schedule · this week</p>
        <p class="font-mono text-[0.625rem] text-fg-subtle">Mon — Sun</p>
      </div>
      <div class="relative flex-1 space-y-2.5">
        <div class="absolute inset-y-0 left-14 right-0 grid grid-cols-7">
          <span v-for="d in 7" :key="d" class="border-l border-white/[0.04]" />
        </div>
        <div
          class="absolute inset-y-0 left-[calc(3.5rem+46%)] w-px bg-accent/70 transition-transform duration-700 group-hover:translate-x-3"
        >
          <span class="absolute -top-1 -left-[3px] size-[7px] rounded-full bg-accent" />
        </div>
        <div v-for="row in schedule" :key="row.label" class="relative flex items-center gap-2">
          <span class="w-12 shrink-0 text-[0.625rem] text-fg-subtle">{{ row.label }}</span>
          <span class="relative h-5 flex-1">
            <span
              v-for="(b, i) in row.bars"
              :key="i"
              :class="['absolute inset-y-0 rounded transition-transform duration-500 group-hover:translate-x-1', b.tone]"
              :style="{ left: `${b.s}%`, width: `${b.w}%` }"
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
