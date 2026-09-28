<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowRight, Plus } from 'lucide-vue-next'
import SectionLabel from '@/components/ui/SectionLabel.vue'
import LocalTime from '@/components/ui/LocalTime.vue'
import StatusBadge from '@/components/work/StatusBadge.vue'
import { geography } from '@/content/company'
import { projects } from '@/content/work'
import { photoSrc, photoSrcset, photos } from '@/content/photos'

/**
 * The geography of the work. Each project is shown in its own place, so the
 * contrast between them does the talking.
 */
withDefaults(defineProps<{ index?: string; headingLevel?: 'h1' | 'h2' }>(), { index: '03', headingLevel: 'h2' })
</script>

<template>
  <section class="surface-dark relative overflow-hidden" aria-labelledby="work-title">
    <div class="container-page section">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-8">
          <SectionLabel :index="index" label="Work" />
          <component :is="headingLevel" id="work-title" v-reveal="60" class="display mt-8">{{ geography.title }}</component>
        </div>
        <p v-reveal="120" class="lede lg:col-span-4">{{ geography.lede }}</p>
      </div>

      <!-- Places. Hovering one quietly steps the other back. -->
      <div class="mt-20 grid grid-cols-1 gap-20 sm:mt-28 lg:grid-cols-2 lg:gap-x-16 lg:[&:has(article:hover)_article:not(:hover)]:opacity-45">
        <article
          v-for="(p, i) in projects"
          :key="p.slug"
          class="group transition-opacity duration-500"
          :class="i % 2 === 1 ? 'lg:mt-40' : ''"
          :aria-labelledby="`place-${p.slug}`"
        >
          <!-- Where -->
          <div v-reveal class="flex items-end justify-between gap-4 border-b border-edge/15 pb-4">
            <p class="text-3xl font-semibold tracking-[-0.04em] text-fg sm:text-[2.75rem] sm:leading-none">{{ p.place.name }}</p>
            <p class="shrink-0 text-right font-mono text-[0.6875rem] leading-relaxed tracking-wide text-fg-subtle">
              {{ p.place.region }}<br /><LocalTime :time-zone="p.place.timeZone" />
            </p>
          </div>

          <!-- What -->
          <RouterLink :to="`/work/${p.slug}`" class="mt-6 block outline-offset-4" tabindex="-1" aria-hidden="true">
            <div v-reveal="80" class="reveal-clip relative aspect-[4/5] overflow-hidden bg-ink-900 sm:aspect-[5/6]">
              <img
                loading="lazy"
                decoding="async"
                alt=""
                sizes="(min-width: 1024px) 44vw, 100vw"
                :srcset="photoSrcset(p.photo)"
                :src="photoSrc(p.photo)"
                class="absolute inset-0 h-full w-full object-cover [filter:saturate(0.82)_contrast(1.04)] transition-transform duration-[1.6s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
                :style="{ objectPosition: photos[p.photo]!.position }"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent" />
              <span class="absolute bottom-5 left-5 font-mono text-[0.6875rem] tracking-[0.16em] text-fg uppercase">{{ String(i + 1).padStart(2, '0') }} / {{ p.category }}</span>
            </div>
          </RouterLink>

          <div v-reveal="120" class="mt-7">
            <div class="flex flex-wrap items-center gap-2">
              <StatusBadge :status="p.status" />
              <span class="border border-edge/15 px-2.5 py-1 font-mono text-[0.6875rem] leading-none text-fg-muted">{{ p.kind }}</span>
            </div>
            <h3 :id="`place-${p.slug}`" class="mt-6 text-4xl font-semibold tracking-[-0.045em] text-fg sm:text-5xl">{{ p.name }}</h3>
            <p class="mt-4 max-w-md text-lg leading-snug text-fg-muted">{{ p.summary }}</p>
            <RouterLink :to="`/work/${p.slug}`" class="group/link mt-7 inline-flex items-center gap-2 text-sm font-medium text-fg">
              <span class="border-b border-edge/30 pb-1 transition-colors group-hover/link:border-fg">View {{ p.name }}</span>
              <ArrowRight class="size-4 transition-transform group-hover/link:translate-x-0.5" aria-hidden="true" />
            </RouterLink>
          </div>
        </article>
      </div>

      <!-- Next -->
      <div v-reveal class="mt-24 flex flex-col gap-4 border-y border-dashed border-edge/15 py-8 sm:mt-32 sm:flex-row sm:items-center sm:justify-between">
        <p class="flex items-center gap-4 text-2xl font-semibold tracking-[-0.03em] text-fg sm:text-3xl">
          <span class="grid size-10 place-items-center border border-edge/20" aria-hidden="true"><Plus class="size-4 text-fg-muted" /></span>
          {{ geography.next }}
        </p>
        <RouterLink to="/contact" class="w-fit border-b border-edge/30 pb-1 text-sm font-medium text-fg transition-colors hover:border-fg">
          Have a problem somewhere else? Tell us.
        </RouterLink>
      </div>

      <!-- The point -->
      <p class="mt-24 max-w-4xl sm:mt-32">
        <span
          v-for="(line, i) in geography.contrast"
          :key="line"
          v-reveal="i * 120"
          class="statement block"
          :class="i === geography.contrast.length - 1 ? 'text-fg' : 'text-fg-subtle'"
        >{{ line }} </span>
      </p>
    </div>
  </section>
</template>
