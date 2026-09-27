<script setup lang="ts">
import { ref } from 'vue'
import { useVisibleInterval } from '@/composables/useMotion'

/** Understand → Map → Design → Build → Deploy → Improve, with a slowly advancing marker. */
const props = defineProps<{ steps: string[] }>()

const active = ref(0)
const root = ref<HTMLElement | null>(null)
useVisibleInterval(() => root.value, () => (active.value = (active.value + 1) % props.steps.length), 1600)
</script>

<template>
  <div ref="root">
    <ol class="relative grid grid-cols-3 gap-y-6 sm:grid-cols-6">
      <li
        v-for="(s, i) in steps"
        :key="s"
        class="relative flex flex-col items-start gap-3 sm:items-center"
      >
        <!-- connecting line -->
        <span
          v-if="i < steps.length - 1"
          aria-hidden="true"
          class="absolute top-[7px] left-4 hidden h-px w-full bg-white/10 sm:left-1/2 sm:block"
        >
          <span
            class="block h-full origin-left bg-accent/60 transition-transform duration-700"
            :class="i < active ? 'scale-x-100' : 'scale-x-0'"
          />
        </span>
        <span
          aria-hidden="true"
          :class="[
            'relative z-10 size-[15px] rounded-full border transition-colors duration-500',
            i <= active ? 'border-accent bg-accent/20' : 'border-white/20 bg-ink-950',
          ]"
        >
          <span v-if="i === active" class="absolute inset-[3px] rounded-full bg-accent" />
        </span>
        <span class="flex items-baseline gap-2 sm:flex-col sm:items-center sm:gap-1">
          <span class="font-mono text-[0.625rem] text-fg-subtle">0{{ i + 1 }}</span>
          <span :class="['text-sm font-medium transition-colors duration-500', i === active ? 'text-fg' : 'text-fg-muted']">{{ s }}</span>
        </span>
      </li>
    </ol>
  </div>
</template>
