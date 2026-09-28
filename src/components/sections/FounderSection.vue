<script setup lang="ts">
import { founder } from '@/content/company'
import { site } from '@/config/site'

/**
 * "The person behind the company." A founder story within the company story.
 * Always dark, so the portrait and statement read the same in both themes.
 */
</script>

<template>
  <section class="surface-dark relative overflow-hidden border-y border-edge/[0.06]" aria-labelledby="founder-title">
    <div aria-hidden="true" class="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_55%_70%_at_25%_50%,#000_10%,transparent_75%)]" />

    <div class="container-page section relative grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-10 lg:gap-x-20">
      <!-- Portrait -->
      <figure v-reveal class="relative md:col-span-5 lg:col-span-6">
        <div class="relative aspect-[4/5] overflow-hidden rounded-2xl border border-edge/[0.1] bg-ink-900">
          <img
            v-if="founder.photo"
            loading="lazy"
            decoding="async"
            :alt="founder.photoAlt"
            sizes="(min-width: 1024px) 50vw, (min-width: 768px) 42vw, 100vw"
            :srcset="`/photos/${founder.photo}-720.webp 720w, /photos/${founder.photo}-1440.webp 1440w`"
            :src="`/photos/${founder.photo}-720.webp`"
            width="1440"
            height="1800"
            class="absolute inset-0 h-full w-full object-cover [filter:saturate(0.92)_contrast(1.04)]"
          />

          <!-- Until a real portrait is added: a designed frame, never a stand-in face. -->
          <div v-else class="absolute inset-0" role="img" :aria-label="`${founder.name}, ${founder.role}`">
            <div class="bg-dots absolute inset-0 opacity-60" />
            <div class="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_42%,color-mix(in_oklab,var(--color-signal)_14%,transparent),transparent_70%)]" />
            <div class="absolute inset-0 grid place-items-center">
              <span class="text-gradient font-mono text-[7rem] leading-none font-semibold tracking-[-0.06em] sm:text-[9rem]">{{ site.monogram }}</span>
            </div>
          </div>

          <!-- Editorial scrim and frame details -->
          <div aria-hidden="true" class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950/85 to-transparent" />
          <span aria-hidden="true" class="absolute top-4 left-4 size-4 border-t border-l border-edge/40" />
          <span aria-hidden="true" class="absolute top-4 right-4 size-4 border-t border-r border-edge/40" />
          <span aria-hidden="true" class="absolute right-4 bottom-4 size-4 border-r border-b border-edge/40" />
          <span aria-hidden="true" class="absolute bottom-4 left-4 size-4 border-b border-l border-edge/40" />
          <figcaption class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 font-mono text-[0.6875rem] tracking-wide">
            <span class="flex items-center gap-2 text-fg"><span class="size-1.5 rounded-full bg-accent" aria-hidden="true" />{{ founder.origin }}</span>
            <span class="text-fg-muted">{{ founder.coordinates }}</span>
          </figcaption>
        </div>
      </figure>

      <!-- Story -->
      <div class="md:col-span-7 lg:col-span-6">
        <p v-reveal class="index-label"><span class="h-px w-6 bg-accent" aria-hidden="true" />The founder</p>
        <h2 id="founder-title" v-reveal="60" class="heading-xl text-gradient mt-8">The person behind the company.</h2>

        <div v-reveal="100" class="mt-10 flex flex-col gap-1 border-l-2 border-accent pl-5">
          <p class="text-2xl font-semibold tracking-[-0.025em] text-fg sm:text-[1.75rem]">{{ founder.name }}</p>
          <p class="font-mono text-xs tracking-wide text-signal uppercase">{{ founder.role }}</p>
        </div>

        <div class="mt-10 space-y-5 text-[1.0625rem] leading-relaxed text-fg-muted">
          <p v-for="(para, i) in founder.bio" :key="i" v-reveal="140 + i * 60" :class="i === founder.bio.length - 1 ? 'text-fg' : ''">
            {{ para }}
          </p>
        </div>

        <blockquote v-reveal class="mt-12 border-t border-edge/10 pt-10">
          <p class="statement text-gradient !text-[1.75rem] sm:!text-[2.25rem] lg:!text-[2.5rem]">
            “{{ founder.statement }}”
          </p>
          <footer class="mt-5 font-mono text-xs text-fg-subtle">— {{ founder.name }}</footer>
        </blockquote>
      </div>
    </div>
  </section>
</template>
