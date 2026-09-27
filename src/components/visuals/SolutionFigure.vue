<script setup lang="ts">
import type { Solution } from '@/content/solutions'
import ThemedImage from '@/components/ui/ThemedImage.vue'
import SolutionMock from '@/components/visuals/SolutionMock.vue'

/** Generated scene of the operation, with the mock interface layered over it. */
withDefaults(defineProps<{ solution: Solution; hideImageOnMobile?: boolean }>(), { hideImageOnMobile: false })
</script>

<template>
  <div class="relative">
    <div
      :class="[
        'overflow-hidden rounded-xl border border-edge/[0.07] bg-ink-900',
        hideImageOnMobile ? 'hidden sm:block' : '',
      ]"
    >
      <ThemedImage
        :name="solution.image"
        :alt="solution.imageAlt"
        sizes="(min-width: 1024px) 720px, 100vw"
        img-class="block aspect-[16/10] h-auto w-full scale-[1.3] object-cover [transform-origin:52%_48%]"
      />
    </div>
    <div
      :class="[
        'relative sm:-mt-16 sm:ml-14 lg:ml-24',
        hideImageOnMobile ? '' : '-mt-8 ml-3',
      ]"
    >
      <SolutionMock :solution="solution" />
    </div>
  </div>
</template>
