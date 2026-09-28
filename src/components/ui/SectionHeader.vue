<script setup lang="ts">
/**
 * Section heading used across the site.
 * `index` + `label` render the story numbering, e.g. "01 — The company".
 */
withDefaults(
  defineProps<{
    index?: string
    label?: string
    title: string
    lede?: string
    align?: 'left' | 'center'
    as?: 'h1' | 'h2'
    headingId?: string
  }>(),
  { align: 'left', as: 'h2' },
)
</script>

<template>
  <div :class="['max-w-3xl', align === 'center' ? 'mx-auto text-center' : '']">
    <p v-if="label" v-reveal :class="['index-label mb-6', align === 'center' ? 'justify-center' : '']">
      <span v-if="index" class="text-accent">{{ index }}</span>
      <span v-if="index" class="h-px w-6 bg-edge/20" aria-hidden="true" />
      <span>{{ label }}</span>
    </p>
    <component :is="as" :id="headingId" v-reveal="60" :class="as === 'h1' ? 'display text-gradient' : 'heading-xl text-gradient'">
      {{ title }}
    </component>
    <p v-if="lede" v-reveal="120" :class="['lede mt-6', align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl']">
      {{ lede }}
    </p>
    <slot />
  </div>
</template>
