<script setup lang="ts">
import { computed } from 'vue'
import { photos, photoSrc, photoSrcset, type PhotoName } from '@/content/photos'

/**
 * A photograph used as a background. It is desaturated and toned to match the
 * theme, then faded into the page so text on top stays readable.
 * Fill the parent: give the parent `relative` and a size.
 */
const props = withDefaults(
  defineProps<{
    name: PhotoName
    /** Decorative backgrounds should pass alt="" (the default). */
    alt?: string
    sizes?: string
    eager?: boolean
    /** How the photo fades into the page. */
    fade?: 'hero' | 'bottom' | 'radial' | 'band' | 'none'
    /** 0–1: how visible the photo is. */
    strength?: number
  }>(),
  { alt: '', sizes: '100vw', eager: false, fade: 'bottom', strength: 1 },
)

const photo = computed(() => photos[props.name]!)
</script>

<template>
  <div class="photo-backdrop pointer-events-none absolute inset-0 overflow-hidden" :aria-hidden="alt ? undefined : 'true'">
    <img
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : undefined"
      decoding="async"
      :alt="alt"
      :sizes="sizes"
      :srcset="photoSrcset(name)"
      :src="photoSrc(name)"
      class="photo-backdrop__img h-full w-full object-cover"
      :style="{ objectPosition: photo.position, opacity: strength }"
    />
    <!-- Tone: pulls the photo towards the page colour and the accent. -->
    <div class="photo-backdrop__tone absolute inset-0" />
    <div :class="['absolute inset-0', `photo-fade--${fade}`]" />
  </div>
</template>

<style>
/* Unscoped on purpose: the light-theme rules key off <html data-theme>. Class names are prefixed to avoid clashes. */
.photo-backdrop__img {
  filter: grayscale(0.45) saturate(0.85) contrast(1.05) brightness(0.62);
}
.photo-backdrop__tone {
  background:
    linear-gradient(180deg, color-mix(in oklab, var(--color-ink-950) 35%, transparent), transparent 40%),
    color-mix(in oklab, var(--color-accent) 6%, transparent);
}
[data-theme='light'] .photo-backdrop__img {
  filter: grayscale(0.6) saturate(0.8) contrast(0.9) brightness(1.1);
}
[data-theme='light'] .photo-backdrop__tone {
  background: color-mix(in oklab, var(--color-ink-950) 68%, transparent);
}

/* Fades: all end in the page background so sections join seamlessly. */
.photo-fade--hero {
  background:
    linear-gradient(90deg, color-mix(in oklab, var(--color-ink-950) 88%, transparent) 0%, color-mix(in oklab, var(--color-ink-950) 55%, transparent) 55%, color-mix(in oklab, var(--color-ink-950) 25%, transparent) 100%),
    linear-gradient(180deg, transparent 45%, var(--color-ink-950) 100%);
}
.photo-fade--bottom {
  background: linear-gradient(180deg, color-mix(in oklab, var(--color-ink-950) 30%, transparent) 0%, transparent 35%, var(--color-ink-950) 100%);
}
.photo-fade--radial {
  background: radial-gradient(ellipse 70% 70% at 50% 50%, color-mix(in oklab, var(--color-ink-950) 55%, transparent) 0%, var(--color-ink-950) 100%);
}
.photo-fade--band {
  background: linear-gradient(0deg, color-mix(in oklab, var(--color-ink-950) 92%, transparent) 0%, color-mix(in oklab, var(--color-ink-950) 20%, transparent) 70%);
}
.photo-fade--none {
  background: none;
}
</style>
