<script setup lang="ts">
import { computed } from 'vue'
import { images, type ImageName } from '@/content/images'

/**
 * A generated illustration with dark and light variants. Both <img>s are in the
 * markup; CSS shows the one matching data-theme, and the hidden one is not
 * downloaded because lazy images with display:none are skipped. `loading` is
 * listed before `src` so it is already set if Vue ever creates the element.
 */
const props = withDefaults(
  defineProps<{
    name: ImageName
    alt: string
    sizes?: string
    eager?: boolean
    imgClass?: string
  }>(),
  { sizes: '(min-width: 1024px) 50vw, 100vw', eager: false, imgClass: '' },
)

const img = computed(() => images[props.name])
const width = computed(() => img.value.widths[1])
const height = computed(() => Math.round(img.value.widths[1] / img.value.ratio))
const srcset = (theme: 'dark' | 'light') =>
  img.value.widths.map((w) => `/images/${img.value.name}-${theme}-${w}.webp ${w}w`).join(', ')
const src = (theme: 'dark' | 'light') => `/images/${img.value.name}-${theme}-${img.value.widths[0]}.webp`
</script>

<template>
  <img
    :loading="eager ? 'eager' : 'lazy'"
    decoding="async"
    :width="width"
    :height="height"
    :alt="alt"
    :sizes="sizes"
    :srcset="srcset('dark')"
    :src="src('dark')"
    :class="['light:hidden', imgClass]"
  />
  <img
    :loading="eager ? 'eager' : 'lazy'"
    decoding="async"
    :width="width"
    :height="height"
    :alt="alt"
    :sizes="sizes"
    :srcset="srcset('light')"
    :src="src('light')"
    :class="['hidden light:block', imgClass]"
  />
</template>
