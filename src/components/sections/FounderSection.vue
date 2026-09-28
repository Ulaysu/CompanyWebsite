<script setup lang="ts">
import SectionLabel from '@/components/ui/SectionLabel.vue'
import { founder } from '@/content/company'

/**
 * The founder. CodeDream is the person; SOFORR is the company.
 * Always dark, so the portrait reads the same in both themes.
 */
withDefaults(defineProps<{ index?: string }>(), { index: '07' })
</script>

<template>
  <section id="founder" class="surface-dark relative overflow-hidden" aria-labelledby="founder-title">
    <div class="container-page section grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-10 lg:gap-x-20">
      <!-- Portrait -->
      <figure class="relative md:col-span-5">
        <div v-reveal class="reveal-clip relative aspect-[4/5] overflow-hidden bg-ink-900">
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
            class="absolute inset-0 h-full w-full object-cover [filter:saturate(0.85)_contrast(1.05)]"
          />
          <!-- Placeholder until a portrait exists: a designed frame, never a stand-in face. -->
          <div v-else class="absolute inset-0 grid place-items-center" role="img" :aria-label="`${founder.name}, ${founder.role}`">
            <div class="bg-dots absolute inset-0 opacity-60" />
            <span class="serif relative text-[5rem] leading-none text-fg/80 italic">{{ founder.handle }}</span>
          </div>
          <div aria-hidden="true" class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950/80 to-transparent" />
        </div>
        <figcaption class="mt-4 flex items-baseline justify-between gap-4 font-mono text-[0.6875rem] tracking-wide text-fg-subtle">
          <span>{{ founder.name }}</span><span>{{ founder.origin }}</span>
        </figcaption>
      </figure>

      <!-- Story -->
      <div class="flex flex-col md:col-span-7 lg:col-span-6 lg:col-start-7">
        <SectionLabel :index="index" label="Founder" />
        <h2 id="founder-title" v-reveal="60" class="heading-xl mt-8">{{ founder.title }}</h2>

        <!-- Person and company, kept distinct. -->
        <dl v-reveal="100" class="mt-10 grid grid-cols-2 border-y border-edge/15">
          <div class="border-r border-edge/15 py-5 pr-5">
            <dt class="font-mono text-[0.625rem] tracking-[0.16em] text-fg-subtle uppercase">The engineer</dt>
            <dd class="serif mt-2 text-4xl leading-none text-fg italic sm:text-5xl">{{ founder.handle }}</dd>
            <dd class="mt-3 text-sm text-fg-muted">{{ founder.name }} · {{ founder.role }}</dd>
          </div>
          <div class="py-5 pl-5">
            <dt class="font-mono text-[0.625rem] tracking-[0.16em] text-fg-subtle uppercase">The company</dt>
            <dd class="mt-2 text-4xl leading-none font-semibold tracking-[0.06em] text-fg sm:text-5xl">SOFORR</dd>
            <dd class="mt-3 text-sm text-fg-muted">Technology company</dd>
          </div>
        </dl>

        <div class="mt-10 space-y-5 text-[1.0625rem] leading-relaxed text-fg-muted">
          <p v-for="(para, i) in founder.story" :key="i" v-reveal="140 + i * 60" :class="i === founder.story.length - 1 ? 'text-fg' : ''">{{ para }}</p>
        </div>

        <p v-reveal class="mt-auto border-t border-edge/15 pt-8 text-2xl leading-snug font-medium tracking-[-0.025em] text-fg sm:mt-14 sm:text-[1.75rem]">
          {{ founder.statement }}
        </p>
      </div>
    </div>
  </section>
</template>
