<script setup lang="ts">
import { founder } from '@/content/company'

/** The founder, as a light section with a framed portrait. */
withDefaults(defineProps<{ index?: string }>(), { index: '' })
</script>

<template>
  <section id="founder" class="section" aria-labelledby="founder-title">
    <div class="container-page grid grid-cols-1 gap-12 md:grid-cols-12 lg:gap-x-20">
      <figure class="md:col-span-5">
        <div class="card relative aspect-[4/5] overflow-hidden">
          <img
            v-if="founder.photo"
            loading="lazy"
            decoding="async"
            :alt="founder.photoAlt"
            sizes="(min-width: 1024px) 36vw, (min-width: 768px) 42vw, 100vw"
            :srcset="`/photos/${founder.photo}-720.webp 720w, /photos/${founder.photo}-1440.webp 1440w`"
            :src="`/photos/${founder.photo}-720.webp`"
            width="1440"
            height="1800"
            class="absolute inset-0 h-full w-full object-cover"
          />
          <div v-else class="absolute inset-0 grid place-items-center bg-ink-900" role="img" :aria-label="`${founder.name}, ${founder.role}`">
            <span class="serif text-6xl text-fg italic">{{ founder.handle }}</span>
          </div>
        </div>
        <figcaption class="mt-4 text-sm text-fg-muted"><span class="font-semibold text-fg">{{ founder.name }}</span>, {{ founder.role }}</figcaption>
      </figure>

      <div class="flex flex-col md:col-span-7 lg:col-span-6 lg:col-start-7">
        <h2 id="founder-title" class="heading-xl">{{ founder.title }}</h2>
        <div class="mt-8 space-y-5 text-[1.0625rem] leading-relaxed text-fg-muted">
          <p v-for="(para, i) in founder.story" :key="i" :class="i === founder.story.length - 1 ? 'text-fg' : ''">{{ para }}</p>
        </div>
        <p class="mt-auto border-t border-edge/10 pt-8 font-display text-2xl leading-snug font-medium tracking-[-0.025em] text-fg">{{ founder.statement }}</p>
      </div>
    </div>
  </section>
</template>
