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
    fade?: 'hero' | 'bottom' | 'radial' | 'band' | 'caption' | 'none'
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
  filter: grayscale(0.15) saturate(0.95) contrast(1.05) brightness(0.88);
}
.photo-backdrop__tone {
  background:
    linear-gradient(180deg, color-mix(in oklab, var(--color-ink-950) 55%, transparent), transparent 22%),
    color-mix(in oklab, var(--color-accent) 4%, transparent);
}
[data-theme='light'] .photo-backdrop__img {
  filter: grayscale(0.2) saturate(0.9) contrast(0.98) brightness(1.04);
}
[data-theme='light'] .photo-backdrop__tone {
  background: color-mix(in oklab, var(--color-ink-950) 22%, transparent);
}

/*
 * Fades: strongest only where text sits (left side / bottom), and every fade
 * ends in the page background so sections still join seamlessly.
 */
.photo-fade--hero {
  background:
    linear-gradient(90deg, color-mix(in oklab, var(--color-ink-950) 82%, transparent) 0%, color-mix(in oklab, var(--color-ink-950) 55%, transparent) 45%, transparent 75%),
    linear-gradient(180deg, transparent 60%, var(--color-ink-950) 100%);
}
/* On narrow screens text spans the full width, so the scrim is even rather than left-weighted. */
@media (max-width: 767px) {
  .photo-fade--hero {
    background: linear-gradient(180deg, color-mix(in oklab, var(--color-ink-950) 66%, transparent) 0%, color-mix(in oklab, var(--color-ink-950) 74%, transparent) 60%, var(--color-ink-950) 100%);
  }
}
.photo-fade--bottom {
  background: linear-gradient(180deg, transparent 0%, transparent 50%, var(--color-ink-950) 100%);
}
.photo-fade--radial {
  background: radial-gradient(ellipse 55% 45% at 50% 50%, color-mix(in oklab, var(--color-ink-950) 72%, transparent) 0%, color-mix(in oklab, var(--color-ink-950) 50%, transparent) 55%, color-mix(in oklab, var(--color-ink-950) 15%, transparent) 80%, var(--color-ink-950) 100%);
}
.photo-fade--band {
  background: linear-gradient(0deg, color-mix(in oklab, var(--color-ink-950) 85%, transparent) 0%, color-mix(in oklab, var(--color-ink-950) 35%, transparent) 38%, transparent 70%);
}
.photo-fade--caption {
  /* Just enough behind a short title at the bottom edge; the rest of the photo is untouched. */
  background: linear-gradient(0deg, color-mix(in oklab, var(--color-ink-950) 72%, transparent) 0%, color-mix(in oklab, var(--color-ink-950) 30%, transparent) 22%, transparent 42%);
}
.photo-fade--none {
  background: none;
}
</style>
