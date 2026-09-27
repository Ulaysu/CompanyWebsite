<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
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
  <div
    :class="[
      'max-w-3xl',
      align === 'center' ? 'mx-auto text-center' : '',
    ]"
  >
    <p v-if="eyebrow" v-reveal class="eyebrow mb-5 flex items-center gap-2" :class="align === 'center' ? 'justify-center' : ''">
      <span class="h-px w-5 bg-accent/70" aria-hidden="true" />
      {{ eyebrow }}
    </p>
    <component :is="as" :id="headingId" v-reveal="60" :class="as === 'h1' ? 'display text-gradient' : 'heading-xl text-gradient'">
      {{ title }}
    </component>
    <p v-if="lede" v-reveal="120" class="lede mt-6" :class="align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl'">
      {{ lede }}
    </p>
    <slot />
  </div>
</template>
