<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowUpRight } from 'lucide-vue-next'
import type { Project } from '@/content/work'
import { photoSrc, photoSrcset, photos } from '@/content/photos'
import StatusBadge from '@/components/work/StatusBadge.vue'

/** A project in the portfolio. The image carries the card; text sits on a scrim at the bottom. */
withDefaults(defineProps<{ project: Project; size?: 'lg' | 'md' }>(), { size: 'md' })
</script>

<template>
  <RouterLink
    :to="`/work/${project.slug}`"
    class="surface-dark group relative flex overflow-hidden rounded-2xl border border-edge/[0.08] outline-offset-4"
    :class="size === 'lg' ? 'aspect-[4/5] sm:aspect-[16/11]' : 'aspect-[4/5] sm:aspect-[4/3]'"
  >
    <img
      loading="lazy"
      decoding="async"
      alt=""
      sizes="(min-width: 1024px) 50vw, 100vw"
      :srcset="photoSrcset(project.photo)"
      :src="photoSrc(project.photo)"
      class="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
      :style="{ objectPosition: photos[project.photo]!.position }"
    />
    <div aria-hidden="true" class="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/10" />
    <div class="relative mt-auto flex w-full flex-col gap-4 p-6 sm:p-8">
      <div class="flex flex-wrap items-center gap-2">
        <StatusBadge :status="project.status" />
        <span class="rounded-full border border-edge/15 bg-ink-950/50 px-2.5 py-1 font-mono text-[0.6875rem] leading-none text-fg-muted backdrop-blur-sm">
          {{ project.kind }}
        </span>
      </div>
      <div>
        <p class="font-mono text-xs text-fg-subtle">{{ project.category }}</p>
        <h3 class="mt-2 flex items-center gap-3 text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-4xl">
          {{ project.name }}
          <ArrowUpRight class="size-6 text-fg-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-fg" aria-hidden="true" />
        </h3>
        <p class="mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-fg-muted">{{ project.summary }}</p>
      </div>
    </div>
  </RouterLink>
</template>
