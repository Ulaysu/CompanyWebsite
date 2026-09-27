<script setup lang="ts">
import { ref } from 'vue'
import {
  FileSpreadsheet,
  Mail,
  MessageCircle,
  FileText,
  Landmark,
  LayoutGrid,
  Inbox,
  CalendarRange,
  Boxes,
  CreditCard,
  BarChart3,
  Zap,
  Check,
  ArrowRightLeft,
  Bell,
  FileCheck2,
} from 'lucide-vue-next'
import WindowFrame from '@/components/ui/WindowFrame.vue'
import CountUp from '@/components/ui/CountUp.vue'
import { useVisibleInterval } from '@/composables/useMotion'

const sources = [
  { icon: FileSpreadsheet, name: 'bookings_v7_FINAL.xlsx', note: '3 versions', offset: 'lg:ml-2' },
  { icon: Mail, name: 'Re: Fwd: invoice?', note: '14 unread', offset: 'lg:ml-7' },
  { icon: MessageCircle, name: 'Team chat', note: 'Photo of form', offset: 'lg:ml-0' },
  { icon: FileText, name: 'Signed form (scan)', note: 'Re-typed', offset: 'lg:ml-5' },
  { icon: Landmark, name: 'Bank transfer', note: 'Unmatched', offset: 'lg:ml-1' },
]

const sidebar = [
  { icon: LayoutGrid, label: 'Overview', active: true },
  { icon: Inbox, label: 'Requests' },
  { icon: CalendarRange, label: 'Schedule' },
  { icon: Boxes, label: 'Assets' },
  { icon: CreditCard, label: 'Payments' },
  { icon: BarChart3, label: 'Reports' },
]

const kpis = [
  { label: 'Open requests', value: 18, delta: '+3 today' },
  { label: 'Awaiting approval', value: 5, delta: '2 due today' },
  { label: 'Scheduled', value: 27, delta: 'This week' },
  { label: 'Payments matched', value: 42, delta: 'Automatically' },
]

const pipeline = [
  { label: 'Intake', count: 6, pct: 30 },
  { label: 'Review', count: 5, pct: 26 },
  { label: 'Scheduled', count: 9, pct: 46 },
  { label: 'In progress', count: 7, pct: 36 },
  { label: 'Invoiced', count: 12, pct: 62 },
]

const eventPool = [
  { icon: ArrowRightLeft, text: 'Payment matched to INV-2041' },
  { icon: Check, text: 'Booking confirmed · customer notified' },
  { icon: Bell, text: 'Approval requested from Finance' },
  { icon: Zap, text: 'Stock levels synced from supplier API' },
  { icon: FileCheck2, text: 'Delivery note attached to SO-10482' },
  { icon: Check, text: 'Service interval scheduled for EX-08' },
]

let seq = 0
const events = ref(
  eventPool.slice(0, 4).map((e, i) => ({ ...e, id: seq++, time: ['now', '2m', '6m', '11m'][i] })),
)

const root = ref<HTMLElement | null>(null)
useVisibleInterval(
  () => root.value,
  () => {
    const next = eventPool[seq % eventPool.length]!
    const aged = events.value.map((e, i) => ({ ...e, time: ['1m', '3m', '7m', '12m'][i] ?? e.time }))
    events.value = [{ ...next, id: seq++, time: 'now' }, ...aged].slice(0, 4)
  },
  3200,
)

// Five chips, 48px tall with 12px gaps, all converging on the vertical centre.
const connectorPaths = [24, 84, 144, 204, 264].map(
  (y) => `M0 ${y} C 44 ${y}, 36 144, 80 144`,
)
</script>

<template>
  <figure ref="root" class="relative">
    <figcaption class="sr-only">
      Illustration: information scattered across spreadsheets, email, chat, scanned forms and bank
      transfers flows into a single operational system with requests, approvals, scheduling and
      payments in one place.
    </figcaption>

    <div aria-hidden="true" class="relative select-none">
      <!-- Ambient glow -->
      <div class="pointer-events-none absolute inset-x-[10%] -top-24 h-72 rounded-full bg-accent/[0.07] blur-3xl" />

      <div class="relative grid grid-cols-1 items-center gap-4 lg:grid-cols-[15rem_5rem_minmax(0,1fr)] lg:gap-0">
        <!-- BEFORE: scattered sources -->
        <div class="relative">
          <p class="eyebrow mb-3 flex items-center gap-2 lg:absolute lg:-top-8 lg:left-0 lg:mb-0">
            <span class="size-1.5 rounded-full bg-warning/80" />
            Today · scattered
          </p>
          <ul class="flex flex-wrap gap-2 lg:flex-col lg:flex-nowrap lg:gap-3">
            <li
              v-for="(s, i) in sources"
              :key="s.name"
              :class="[
                'flex h-9 items-center gap-2.5 rounded-lg border border-dashed border-edge/12 bg-ink-900/70 px-2.5 lg:h-12 lg:w-[13.5rem] lg:px-3',
                s.offset,
                i > 2 ? 'hidden sm:flex' : '',
              ]"
              :style="{ animationDelay: `${300 + i * 80}ms` }"
              class="animate-fade-up"
            >
              <component :is="s.icon" class="size-3.5 shrink-0 text-fg-subtle lg:size-4" />
              <span class="min-w-0 flex-1">
                <span class="block truncate text-[0.6875rem] text-fg-muted lg:text-xs">{{ s.name }}</span>
                <span class="hidden font-mono text-[0.625rem] text-warning/80 lg:block">{{ s.note }}</span>
              </span>
            </li>
          </ul>
        </div>

        <!-- Connector (desktop) -->
        <svg
          class="hidden h-[288px] w-full lg:block"
          viewBox="0 0 80 288"
          preserveAspectRatio="none"
          fill="none"
        >
          <path v-for="(d, i) in connectorPaths" :key="`b${i}`" :d="d" class="stroke-edge/10" stroke-width="1" vector-effect="non-scaling-stroke" />
          <path
            v-for="(d, i) in connectorPaths"
            :key="`f${i}`"
            :d="d"
            stroke="var(--color-accent)"
            stroke-opacity="0.7"
            stroke-width="1.25"
            stroke-dasharray="3 9"
            vector-effect="non-scaling-stroke"
            class="animate-flow"
            :style="{ animationDelay: `${i * -0.4}s` }"
          />
        </svg>

        <!-- Connector (mobile) -->
        <div class="flex justify-center lg:hidden">
          <svg width="2" height="36" viewBox="0 0 2 36" fill="none">
            <path d="M1 0 V36" class="stroke-edge/12" />
            <path d="M1 0 V36" stroke="var(--color-accent)" stroke-dasharray="3 9" class="animate-flow" />
          </svg>
        </div>

        <!-- AFTER: the operational system -->
        <div class="relative animate-fade-up [animation-delay:450ms]">
          <WindowFrame label="ops.yourcompany.com / overview" live>
            <div class="flex">
              <!-- Sidebar -->
              <aside class="hidden w-44 shrink-0 flex-col border-r border-edge/[0.06] p-3 md:flex">
                <div class="mb-4 flex items-center gap-2 px-2 pt-1">
                  <span class="grid size-5 place-items-center rounded bg-accent/90 font-mono text-[0.5625rem] font-bold text-ink-950">Y</span>
                  <span class="text-xs font-medium text-fg">Your Company</span>
                </div>
                <ul class="space-y-0.5">
                  <li
                    v-for="item in sidebar"
                    :key="item.label"
                    :class="[
                      'flex items-center gap-2.5 rounded-md px-2 py-1.5 text-xs',
                      item.active ? 'bg-edge/[0.06] text-fg' : 'text-fg-subtle',
                    ]"
                  >
                    <component :is="item.icon" class="size-3.5" />
                    {{ item.label }}
                  </li>
                </ul>
                <div class="mt-auto rounded-md border border-edge/[0.06] p-2.5">
                  <p class="flex items-center gap-1.5 text-[0.6875rem] text-fg-muted">
                    <Zap class="size-3 text-accent" /> Automations
                  </p>
                  <p class="mt-1 font-mono text-[0.625rem] text-fg-subtle">12 rules active</p>
                </div>
              </aside>

              <!-- Main -->
              <div class="min-w-0 flex-1 p-3.5 sm:p-5">
                <div class="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p class="text-sm font-medium text-fg">Overview</p>
                    <p class="text-[0.6875rem] text-fg-subtle">Everything in one place</p>
                  </div>
                  <div class="flex rounded-md border border-edge/[0.08] p-0.5 text-[0.625rem] text-fg-subtle">
                    <span class="rounded bg-edge/[0.07] px-2 py-0.5 text-fg">Today</span>
                    <span class="px-2 py-0.5">Week</span>
                    <span class="hidden px-2 py-0.5 sm:inline">Month</span>
                  </div>
                </div>

                <!-- KPIs -->
                <div class="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5">
                  <div
                    v-for="k in kpis"
                    :key="k.label"
                    class="rounded-lg border border-edge/[0.06] bg-edge/[0.015] p-2.5 sm:p-3"
                  >
                    <p class="truncate text-[0.625rem] text-fg-subtle sm:text-[0.6875rem]">{{ k.label }}</p>
                    <p class="mt-1 text-lg font-semibold tracking-tight text-fg sm:text-xl">
                      <CountUp :value="k.value" />
                    </p>
                    <p class="mt-0.5 truncate font-mono text-[0.5625rem] text-fg-subtle sm:text-[0.625rem]">{{ k.delta }}</p>
                  </div>
                </div>

                <div class="mt-3 grid grid-cols-1 gap-3 sm:mt-4 xl:grid-cols-5">
                  <!-- Pipeline -->
                  <div class="rounded-lg border border-edge/[0.06] p-3 xl:col-span-3">
                    <p class="mb-3 flex items-center justify-between text-[0.6875rem] text-fg-muted">
                      Workflow
                      <span class="font-mono text-[0.625rem] text-fg-subtle">39 active</span>
                    </p>
                    <ul class="space-y-2">
                      <li v-for="(p, i) in pipeline" :key="p.label" class="grid grid-cols-[5rem_1fr_1.5rem] items-center gap-3">
                        <span class="text-[0.6875rem] text-fg-subtle">{{ p.label }}</span>
                        <span class="h-1.5 overflow-hidden rounded-full bg-edge/[0.05]">
                          <span
                            class="block h-full origin-left animate-[grow_1.2s_var(--ease-out-quint)_both] rounded-full"
                            :class="i === 4 ? 'bg-accent/80' : 'bg-edge/25'"
                            :style="{ width: `${p.pct}%`, animationDelay: `${700 + i * 90}ms` }"
                          />
                        </span>
                        <span class="text-right font-mono text-[0.6875rem] text-fg-muted tabular-nums">{{ p.count }}</span>
                      </li>
                    </ul>
                  </div>

                  <!-- Activity -->
                  <div class="rounded-lg border border-edge/[0.06] p-3 xl:col-span-2">
                    <p class="mb-2 flex items-center justify-between text-[0.6875rem] text-fg-muted">
                      Activity
                      <span class="font-mono text-[0.625rem] text-fg-subtle">automated</span>
                    </p>
                    <TransitionGroup tag="ul" name="feed" class="relative space-y-0.5">
                      <li
                        v-for="(e, i) in events"
                        :key="e.id"
                        :class="['flex items-center gap-2 rounded-md py-1.5', i > 2 ? 'hidden sm:flex' : '']"
                      >
                        <span class="grid size-5 shrink-0 place-items-center rounded-md border border-edge/[0.08] bg-edge/[0.03]">
                          <component :is="e.icon" class="size-2.5 text-fg-muted" />
                        </span>
                        <span class="min-w-0 flex-1 truncate text-[0.6875rem] text-fg-muted">{{ e.text }}</span>
                        <span class="font-mono text-[0.5625rem] text-fg-subtle">{{ e.time }}</span>
                      </li>
                    </TransitionGroup>
                  </div>
                </div>
              </div>
            </div>
          </WindowFrame>

          <!-- Floating automation rule -->
          <div
            class="panel absolute -right-6 -bottom-20 hidden w-72 animate-fade-up p-3.5 [animation-delay:900ms] xl:block"
          >
            <p class="flex items-center justify-between text-[0.6875rem] text-fg-muted">
              <span class="flex items-center gap-1.5"><Zap class="size-3 text-accent" /> Rule · payment received</span>
              <span class="relative h-3.5 w-6 rounded-full bg-accent/80">
                <span class="absolute top-0.5 right-0.5 size-2.5 rounded-full bg-white" />
              </span>
            </p>
            <ol class="mt-2.5 space-y-1.5 font-mono text-[0.625rem] text-fg-subtle">
              <li><span class="text-fg-muted">when</span> bank transfer arrives</li>
              <li><span class="text-fg-muted">then</span> match to open invoice</li>
              <li><span class="text-fg-muted">and</span> notify account owner</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </figure>
</template>

<style scoped>
@keyframes grow {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
.feed-enter-active { transition: opacity 0.5s var(--ease-out-quint), transform 0.5s var(--ease-out-quint); }
.feed-enter-from { opacity: 0; transform: translateY(-6px); }
.feed-leave-active { display: none; }
.feed-move { transition: transform 0.5s var(--ease-out-quint); }
</style>
