<script setup lang="ts">
import { founder } from '@/content/company'

/**
 * “Built by CodeDream.” The founder story within the company story:
 * CodeDream → Founder → SOFORR. Always dark, so the portrait reads the same in both themes.
 */
withDefaults(defineProps<{ index?: string }>(), { index: '08' })
</script>

<template>
  <section id="founder" class="surface-dark relative overflow-hidden border-y border-edge/[0.06]" aria-labelledby="founder-title">
    <div class="container-page section relative grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-10 lg:gap-x-20">
      <!-- Portrait -->
      <figure v-reveal class="relative md:col-span-5">
        <div class="relative aspect-[4/5] overflow-hidden bg-ink-900">
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
            class="absolute inset-0 h-full w-full object-cover [filter:saturate(0.9)_contrast(1.04)]"
          />

          <!-- Placeholder until a portrait exists: a designed frame, never a stand-in face. -->
          <div v-else class="absolute inset-0" role="img" :aria-label="`${founder.name}, ${founder.role}`">
            <div class="bg-dots absolute inset-0 opacity-60" />
            <div class="absolute inset-0 grid place-items-center">
              <span class="serif text-[6rem] leading-none text-fg/80 italic">{{ founder.handle }}</span>
            </div>
          </div>

          <div aria-hidden="true" class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950/85 to-transparent" />
          <div aria-hidden="true" class="frame-ticks absolute inset-4" />
          <figcaption class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 font-mono text-[0.6875rem] tracking-wide">
            <span class="flex items-center gap-2 text-fg"><span class="size-1.5 rounded-full bg-accent" aria-hidden="true" />{{ founder.origin }}</span>
            <span class="text-fg-muted">{{ founder.coordinates }}</span>
          </figcaption>
        </div>
      </figure>

      <!-- Story -->
      <div class="md:col-span-7 lg:col-span-6 lg:col-start-7">
        <p v-reveal class="index-label"><span v-if="index" class="text-accent">{{ index }}</span><span class="h-px w-6 bg-edge/20" aria-hidden="true" />Founder</p>
        <h2 id="founder-title" v-reveal="60" class="display mt-8 !text-[3rem] sm:!text-7xl">
          Built by <span class="serif font-normal tracking-[-0.02em] text-accent italic">CodeDream</span>.
        </h2>

        <!-- CodeDream → Founder → SOFORR -->
        <ol v-reveal="100" class="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.6875rem] tracking-[0.16em] uppercase" aria-label="CodeDream, founder of SOFORR">
          <template v-for="(step, i) in founder.chain" :key="step">
            <li :class="i === founder.chain.length - 1 ? 'text-fg' : 'text-fg-muted'">{{ step }}</li>
            <li v-if="i < founder.chain.length - 1" aria-hidden="true" class="text-accent">→</li>
          </template>
        </ol>

        <div v-reveal="140" class="mt-10 border-t border-edge/10 pt-8">
          <p class="text-2xl font-semibold tracking-[-0.025em] text-fg sm:text-[1.75rem]">{{ founder.name }}</p>
          <p class="mt-1 text-[0.9375rem] text-fg-muted">{{ founder.role }}</p>
          <p class="mt-3 font-mono text-[0.6875rem] tracking-wide text-fg-subtle">Known online as <span class="text-fg">{{ founder.handle }}</span></p>
        </div>

        <div class="mt-10 space-y-5 text-[1.0625rem] leading-relaxed text-fg-muted">
          <p v-for="(para, i) in founder.story" :key="i" v-reveal="180 + i * 60" :class="i === founder.story.length - 1 ? 'text-fg' : ''">
            {{ para }}
          </p>
        </div>

        <blockquote v-reveal class="mt-12 border-l-2 border-accent pl-6">
          <p class="serif text-[1.75rem] leading-[1.15] text-fg italic sm:text-4xl">“{{ founder.statement }}”</p>
          <footer class="mt-4 font-mono text-xs text-fg-subtle">{{ founder.name }} / {{ founder.handle }}</footer>
        </blockquote>
      </div>
    </div>
  </section>
</template>
