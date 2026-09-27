<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    to?: string
    href?: string
    type?: 'button' | 'submit'
    variant?: 'primary' | 'secondary' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    arrow?: boolean
    disabled?: boolean
  }>(),
  { variant: 'primary', size: 'md', arrow: false, type: 'button' },
)

const tag = computed(() => (props.to ? RouterLink : props.href ? 'a' : 'button'))

const classes = computed(() => [
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap',
  'transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out',
  'disabled:cursor-not-allowed disabled:opacity-60 active:translate-y-px',
  {
    sm: 'h-9 px-4 text-[0.8125rem]',
    md: 'h-11 px-5 text-sm',
    lg: 'h-12 px-6 text-[0.9375rem]',
  }[props.size],
  {
    primary:
      'bg-fg text-ink-950 shadow-[0_0_0_1px_rgb(255_255_255/0.1),0_8px_24px_-8px_rgb(242_128_62/0.35)] hover:bg-fg/90 hover:shadow-[0_0_0_1px_rgb(255_255_255/0.2),0_10px_32px_-8px_rgb(242_128_62/0.5)]',
    secondary:
      'border border-edge/12 bg-edge/[0.03] text-fg hover:border-edge/25 hover:bg-edge/[0.06]',
    ghost: 'px-0 text-fg hover:text-fg',
  }[props.variant],
])
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :type="tag === 'button' ? type : undefined"
    :disabled="tag === 'button' ? disabled : undefined"
    :class="classes"
  >
    <slot />
    <ArrowRight
      v-if="arrow"
      class="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
      aria-hidden="true"
    />
  </component>
</template>
