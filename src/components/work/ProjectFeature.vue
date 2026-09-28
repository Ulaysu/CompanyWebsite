<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'
import type { Project } from '@/content/work'
import { photoSrc, photoSrcset, photos } from '@/content/photos'
import StatusBadge from '@/components/work/StatusBadge.vue'

/** A project told editorially: a large photograph beside the story. */
defineProps<{ project: Project; index: number; flip?: boolean }>()
</script>

<template>
  <article class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16" :aria-labelledby="`project-${project.slug}`">
    <RouterLink
      v-reveal
      :to="`/work/${project.slug}`"
      tabindex="-1"
      aria-hidden="true"
      class="reveal-clip group relative block aspect-[4/3] overflow-hidden bg-ink-900 lg:col-span-7"
      :class="flip ? 'lg:order-2 lg:col-start-6' : ''"
    >
      <img
        loading="lazy"
        decoding="async"
        alt=""
        sizes="(min-width: 1024px) 58vw, 100vw"
        :srcset="photoSrcset(project.photo)"
        :src="photoSrc(project.photo)"
        class="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        :style="{ objectPosition: photos[project.photo]!.position }"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
            <span class="absolute bottom-5 left-5 font-mono text-[0.6875rem] tracking-[0.16em] text-fg uppercase">
        {{ String(index + 1).padStart(2, '0') }} / {{ project.place.name }}
      </span>
    </RouterLink>

    <div class="flex flex-col justify-center lg:col-span-5" :class="flip ? 'lg:order-1 lg:col-start-1' : ''">
      <div v-reveal class="flex flex-wrap items-center gap-2">
        <StatusBadge :status="project.status" />
        <span class="border border-edge/15 px-2.5 py-1 font-mono text-[0.6875rem] leading-none text-fg-muted">{{ project.kind }}</span>
      </div>
      <h3 :id="`project-${project.slug}`" v-reveal="60" class="mt-8 text-5xl font-semibold tracking-[-0.045em] text-fg sm:text-6xl">{{ project.name }}</h3>
      <p v-reveal="80" class="mt-3 font-mono text-[0.6875rem] tracking-wide text-fg-subtle">{{ project.category }}</p>
      <p v-reveal="100" class="mt-5 text-xl leading-snug text-fg">{{ project.summary }}</p>

      <div v-reveal="140" class="mt-10">
        <p class="eyebrow">What we’re building</p>
        <ul class="mt-4 border-t border-edge/10">
          <li v-for="item in project.building" :key="item" class="flex items-baseline gap-3 border-b border-edge/10 py-3 text-[0.9375rem] text-fg-muted">
            <span class="size-1 shrink-0 translate-y-[-2px] bg-fg-subtle" aria-hidden="true" />{{ item }}
          </li>
        </ul>
      </div>

      <RouterLink
        v-reveal="180"
        :to="`/work/${project.slug}`"
        class="group mt-10 inline-flex w-fit items-center gap-2 text-sm font-medium text-fg"
      >
        <span class="border-b border-edge/30 pb-1 transition-colors group-hover:border-fg">View {{ project.name }}</span>
        <ArrowRight class="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </RouterLink>
    </div>
  </article>
</template>
