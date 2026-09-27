<script setup lang="ts">
import {
  Calculator,
  Users,
  FileSpreadsheet,
  Mail,
  MessageCircle,
  Check,
  ChevronRight,
} from 'lucide-vue-next'
import StatusPill from '@/components/ui/StatusPill.vue'

const tools = [
  { icon: Calculator, label: 'Accounting' },
  { icon: Users, label: 'CRM' },
  { icon: FileSpreadsheet, label: 'Spreadsheets' },
  { icon: Mail, label: 'Email' },
  { icon: MessageCircle, label: 'Chat' },
]

const rules = ['Intake validated', 'Approvals routed', 'Records synced', 'Customers notified']

const bars = [38, 52, 44, 63, 58, 71, 80]

const tangle = [
  'M4 18 C 60 18, 40 96, 116 100',
  'M4 44 C 70 44, 30 12, 116 20',
  'M4 70 C 50 70, 80 130, 116 126',
  'M4 96 C 60 96, 50 48, 116 60',
  'M4 122 C 40 122, 90 70, 116 80',
]
</script>

<template>
  <figure>
    <figcaption class="sr-only">
      Diagram: existing tools feed a messy manual workflow of copying, re-entering and chasing. A
      custom operational layer replaces it with validated intake, routed approvals, synced records
      and automatic notifications, giving management clear visibility.
    </figcaption>
    <div
      aria-hidden="true"
      class="grid grid-cols-2 gap-3 select-none lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-stretch lg:gap-0"
    >
      <!-- 01 tools -->
      <div class="panel p-3.5 sm:p-4" v-reveal>
        <p class="eyebrow mb-4"><span class="text-fg-muted">01</span> · <span class="sm:hidden">Tools</span><span class="hidden sm:inline">Existing tools</span></p>
        <ul class="space-y-1.5">
          <li
            v-for="t in tools"
            :key="t.label"
            class="flex items-center gap-2.5 rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-1.5 text-xs text-fg-muted"
          >
            <component :is="t.icon" class="size-3.5 text-fg-subtle" />
            {{ t.label }}
          </li>
        </ul>
      </div>

      <div class="hidden place-items-center px-2 lg:grid">
        <ChevronRight class="size-4 text-fg-subtle" />
      </div>

      <!-- 02 messy -->
      <div class="panel relative overflow-hidden p-3.5 sm:p-4" v-reveal="80">
        <p class="eyebrow mb-4"><span class="text-fg-muted">02</span> · <span class="sm:hidden">Workarounds</span><span class="hidden sm:inline">Messy workflow</span></p>
        <div class="relative">
          <svg viewBox="0 0 120 140" class="h-36 w-full" preserveAspectRatio="none" fill="none">
            <path
              v-for="(d, i) in tangle"
              :key="i"
              :d="d"
              stroke="rgb(226 180 84 / 0.45)"
              stroke-width="1"
              stroke-dasharray="2 4"
              vector-effect="non-scaling-stroke"
            />
          </svg>
          <span class="absolute top-[6%] left-[46%] rounded border border-warning/25 bg-ink-900 px-1.5 font-mono text-[0.5625rem] text-warning/90">copy</span>
          <span class="absolute top-[38%] left-[8%] rounded border border-warning/25 bg-ink-900 px-1.5 font-mono text-[0.5625rem] text-warning/90">re-enter</span>
          <span class="absolute top-[56%] right-[4%] rounded border border-warning/25 bg-ink-900 px-1.5 font-mono text-[0.5625rem] text-warning/90">chase</span>
          <span class="absolute bottom-[4%] left-[30%] rounded border border-warning/25 bg-ink-900 px-1.5 font-mono text-[0.5625rem] text-warning/90">check again</span>
        </div>
      </div>

      <div class="hidden place-items-center px-2 lg:grid">
        <ChevronRight class="size-4 text-fg-subtle" />
      </div>

      <!-- 03 operational layer -->
      <div
        class="panel relative p-3.5 ring-1 ring-accent/25 sm:p-4"
        v-reveal="160"
      >
        <div class="pointer-events-none absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
        <p class="eyebrow mb-4"><span class="text-accent">03</span> · <span class="sm:hidden">New layer</span><span class="hidden sm:inline">Operational layer</span></p>
        <ul class="space-y-1.5">
          <li
            v-for="r in rules"
            :key="r"
            class="flex items-center gap-2 rounded-md border border-white/[0.06] bg-white/[0.025] px-2 py-1.5 text-[0.6875rem] leading-tight text-fg sm:gap-2.5 sm:px-2.5 sm:py-2 sm:text-xs"
          >
            <span class="grid size-4 shrink-0 place-items-center rounded-full bg-accent/15">
              <Check class="size-2.5 text-accent" />
            </span>
            {{ r }}
          </li>
        </ul>
      </div>

      <div class="hidden place-items-center px-2 lg:grid">
        <ChevronRight class="size-4 text-fg-subtle" />
      </div>

      <!-- 04 visibility -->
      <div class="panel p-3.5 sm:p-4" v-reveal="240">
        <p class="eyebrow mb-4"><span class="text-fg-muted">04</span> · <span class="sm:hidden">Visibility</span><span class="hidden sm:inline">Visibility</span></p>
        <div class="flex h-16 items-end gap-1.5 border-b border-white/[0.06] pb-px">
          <span
            v-for="(b, i) in bars"
            :key="i"
            class="flex-1 rounded-t-sm"
            :class="i === bars.length - 1 ? 'bg-accent/80' : 'bg-white/15'"
            :style="{ height: `${b}%` }"
          />
        </div>
        <ul class="mt-3 space-y-2 text-[0.6875rem] text-fg-muted">
          <li class="flex items-center justify-between gap-2">Orders <StatusPill tone="positive" label="On track" /></li>
          <li class="flex items-center justify-between gap-2">Approvals <StatusPill tone="accent" label="2 waiting" /></li>
          <li class="flex items-center justify-between gap-2">Payments <StatusPill tone="neutral" label="Matched" /></li>
        </ul>
      </div>
    </div>
  </figure>
</template>
