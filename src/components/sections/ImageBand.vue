<script setup lang="ts">
import ThemedImage from '@/components/ui/ThemedImage.vue'
import type { ImageName } from '@/content/images'

/** A full-width generated illustration with a caption line. */
withDefaults(
  defineProps<{
    name: ImageName
    alt: string
    caption?: string
    /** Crop into the centre of the scene (1 = no crop). */
    zoom?: number
  }>(),
  { zoom: 1 },
)
</script>

<template>
  <figure class="container-page" v-reveal>
    <div class="overflow-hidden rounded-2xl border border-edge/[0.07] bg-ink-900">
      <div :style="zoom !== 1 ? { transform: `scale(${zoom})` } : undefined">
        <ThemedImage :name="name" :alt="alt" sizes="(min-width: 1216px) 1216px, 100vw" img-class="block h-auto w-full" />
      </div>
    </div>
    <figcaption v-if="caption" class="mt-3 font-mono text-[0.6875rem] text-fg-subtle">{{ caption }}</figcaption>
  </figure>
</template>
