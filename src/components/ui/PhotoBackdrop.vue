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
    <!-- Tone: pulls the photo towards the page colour and the accent. -->
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
  filter: saturate(0.9) contrast(1.06) brightness(0.9);
}
.photo-backdrop__tone {
  /* A cool navy grade so every photo sits in the same palette. */
  background: color-mix(in oklab, #0b1a33 22%, transparent);
  mix-blend-mode: multiply;
}
[data-theme='light'] .photo-backdrop:not(.surface-dark .photo-backdrop) .photo-backdrop__img {
  filter: saturate(0.9) contrast(0.98) brightness(1.04);
}
[data-theme='light'] .photo-backdrop:not(.surface-dark .photo-backdrop) .photo-backdrop__tone {
  background: color-mix(in oklab, var(--color-ink-950) 20%, transparent);
  mix-blend-mode: normal;
}

/* Fades: strongest only where text sits, always ending in the page background. */
.photo-fade--hero {
  background:
    linear-gradient(90deg, color-mix(in oklab, var(--color-ink-950) 94%, transparent) 0%, color-mix(in oklab, var(--color-ink-950) 78%, transparent) 38%, color-mix(in oklab, var(--color-ink-950) 20%, transparent) 70%, transparent 100%),
    linear-gradient(180deg, color-mix(in oklab, var(--color-ink-950) 55%, transparent) 0%, transparent 22%, transparent 62%, var(--color-ink-950) 100%);
}
.photo-fade--side {
  background: linear-gradient(90deg, var(--color-ink-950) 0%, color-mix(in oklab, var(--color-ink-950) 80%, transparent) 35%, transparent 75%);
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
    background: linear-gradient(180deg, color-mix(in oklab, var(--color-ink-950) 55%, transparent) 0%, color-mix(in oklab, var(--color-ink-950) 74%, transparent) 55%, var(--color-ink-950) 100%);
  }
}
</style>
