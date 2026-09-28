<script setup lang="ts">
import { computed } from 'vue'
import { photos, photoSrc, photoSrcset, type PhotoName } from '@/content/photos'

/**
 * A photograph used as a background, shown as clearly as possible and faded
 * into the page only where text sits on top of it.
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
    fade?: 'hero' | 'side' | 'full' | 'bottom' | 'radial' | 'caption' | 'none'
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
    <!-- Tone: a very light grade so photos sit in the palette. -->
    <div class="photo-backdrop__tone absolute inset-0" />
    <div :class="['absolute inset-0', `photo-fade--${fade}`]" />
  </div>
</template>

<style>
/*
 * Unscoped on purpose: the light-theme rules key off <html data-theme>.
 * Inside an always-dark section (.surface-dark) the dark treatment is kept.
 */
.photo-backdrop__img {
  filter: contrast(1.04);
}
.photo-backdrop__tone {
  /* A very light warm grade so photos sit in the palette without losing clarity. */
  background: color-mix(in oklab, #0a0a0a 8%, transparent);
  mix-blend-mode: multiply;
}
[data-theme='light'] .photo-backdrop:not(.surface-dark .photo-backdrop) .photo-backdrop__img {
  filter: none;
}
[data-theme='light'] .photo-backdrop:not(.surface-dark .photo-backdrop) .photo-backdrop__tone {
  background: none;
}

/* Fades: strongest only where text sits, always ending in the page background. */
.photo-fade--hero {
  background:
    linear-gradient(90deg, color-mix(in oklab, var(--color-ink-950) 82%, transparent) 0%, color-mix(in oklab, var(--color-ink-950) 55%, transparent) 36%, transparent 62%),
    linear-gradient(180deg, color-mix(in oklab, var(--color-ink-950) 45%, transparent) 0%, transparent 18%, transparent 68%, var(--color-ink-950) 100%);
}
.photo-fade--side {
  background: linear-gradient(90deg, color-mix(in oklab, var(--color-ink-950) 90%, transparent) 0%, color-mix(in oklab, var(--color-ink-950) 65%, transparent) 38%, transparent 70%);
}
.photo-fade--full {
  background: color-mix(in oklab, var(--color-ink-950) 72%, transparent);
}
.photo-fade--bottom {
  background: linear-gradient(180deg, transparent 0%, transparent 45%, var(--color-ink-950) 100%);
}
.photo-fade--radial {
  background: radial-gradient(ellipse 60% 55% at 50% 50%, color-mix(in oklab, var(--color-ink-950) 70%, transparent) 0%, color-mix(in oklab, var(--color-ink-950) 45%, transparent) 60%, var(--color-ink-950) 100%);
}
.photo-fade--caption {
  background: linear-gradient(0deg, color-mix(in oklab, var(--color-ink-950) 88%, transparent) 0%, color-mix(in oklab, var(--color-ink-950) 40%, transparent) 30%, transparent 55%);
}
.photo-fade--none {
  background: none;
}
/* On narrow screens text spans the full width, so side-weighted scrims become even. */
@media (max-width: 767px) {
  .photo-fade--hero,
  .photo-fade--side {
    background: linear-gradient(180deg, color-mix(in oklab, var(--color-ink-950) 35%, transparent) 0%, color-mix(in oklab, var(--color-ink-950) 20%, transparent) 30%, color-mix(in oklab, var(--color-ink-950) 75%, transparent) 70%, var(--color-ink-950) 100%);
  }
}
</style>
