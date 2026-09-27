<script setup lang="ts">
import { computed, ref } from 'vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import AppButton from '@/components/ui/AppButton.vue'
import SolutionFigure from '@/components/visuals/SolutionFigure.vue'
import { solutions } from '@/content/solutions'
import { photoSrc } from '@/content/photos'

const selected = ref(0)
const current = computed(() => solutions[selected.value]!)
const tabs = ref<HTMLButtonElement[]>([])

function onKey(e: KeyboardEvent) {
  const dir = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]
  if (!dir) return
  e.preventDefault()
  selected.value = (selected.value + dir + solutions.length) % solutions.length
  tabs.value[selected.value]?.focus()
}
</script>

<template>
  <section class="relative border-t border-edge/[0.06] bg-ink-900/30 py-24 sm:py-32" aria-labelledby="solutions-title">
    <div class="container-page">
      <SectionHeader
        eyebrow="Solutions"
        title="A better system for the work behind the business."
        lede="Examples of systems we design and build around each client's process. Not off-the-shelf products — starting points for a conversation."
        heading-id="solutions-title"
      />

      <div class="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
        <div role="tablist" aria-label="Example systems" aria-orientation="vertical" class="grid grid-cols-2 gap-2 lg:col-span-4 lg:grid-cols-1 lg:gap-1" @keydown="onKey">
          <button
            v-for="(s, i) in solutions"
            :id="`sol-tab-${s.id}`"
            :key="s.id"
            ref="tabs"
            type="button"
            role="tab"
            :aria-selected="i === selected"
            :aria-controls="`sol-panel`"
            :tabindex="i === selected ? 0 : -1"
            :class="[
              'group relative rounded-lg border px-3.5 py-3 text-left transition-colors duration-300 lg:px-5 lg:py-4',
              i === selected
                ? 'border-edge/12 bg-edge/[0.04]'
                : 'border-transparent hover:bg-edge/[0.02]',
            ]"
            @click="selected = i"
          >
            <span
              v-if="i === selected"
              class="absolute top-4 bottom-4 left-0 hidden w-px bg-accent lg:block"
              aria-hidden="true"
            />
            <span class="flex items-center gap-4">
              <img
                :src="photoSrc(s.photo)"
                alt=""
                loading="lazy"
                decoding="async"
                width="56"
                height="56"
                :class="[
                  'hidden size-14 shrink-0 rounded-md object-cover transition-[filter,opacity] duration-300 lg:block',
                  i === selected ? 'opacity-100 grayscale-[0.3]' : 'opacity-60 grayscale',
                ]"
              />
              <span class="min-w-0">
                <span :class="['block text-sm font-medium lg:text-base', i === selected ? 'text-fg' : 'text-fg-muted']">{{ s.title }}</span>
                <span class="mt-1 hidden font-mono text-[0.6875rem] leading-relaxed text-fg-subtle lg:block">
                  {{ s.flow.join(' → ') }}
                </span>
              </span>
            </span>
          </button>
          <div class="mt-4 hidden lg:block">
            <AppButton to="/solutions" variant="ghost" arrow>Explore example systems</AppButton>
          </div>
        </div>

        <div id="sol-panel" role="tabpanel" :aria-labelledby="`sol-tab-${current.id}`" class="lg:col-span-8">
          <p class="mb-5 max-w-xl text-[0.9375rem] leading-relaxed text-fg-muted">{{ current.summary }}</p>
          <Transition name="swap" mode="out-in">
            <SolutionFigure :key="current.id" :solution="current" hide-image-on-mobile />
          </Transition>
          <div class="mt-6 lg:hidden">
            <AppButton to="/solutions" variant="ghost" arrow>Explore example systems</AppButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.swap-enter-active, .swap-leave-active { transition: opacity 0.25s var(--ease-out-quint), transform 0.25s var(--ease-out-quint); }
.swap-enter-from { opacity: 0; transform: translateY(6px); }
.swap-leave-to { opacity: 0; }
</style>
