<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowLeft, ArrowUpRight } from 'lucide-vue-next'
import { usePageMeta } from '@/composables/usePageMeta'
import PhotoBackdrop from '@/components/ui/PhotoBackdrop.vue'
import StatusBadge from '@/components/work/StatusBadge.vue'
import ProjectCard from '@/components/work/ProjectCard.vue'
import NextProjectCard from '@/components/work/NextProjectCard.vue'
import BuildWithUs from '@/components/sections/BuildWithUs.vue'
import { projectBySlug, projects } from '@/content/work'

const props = defineProps<{ slug: string }>()
const project = computed(() => projectBySlug(props.slug)!)
const others = computed(() => projects.filter((p) => p.slug !== props.slug))

usePageMeta({ title: project.value.name, description: project.value.summary })
</script>

<template>
  <div>
    <section class="surface-dark relative flex min-h-[80svh] flex-col overflow-hidden" aria-labelledby="page-title">
      <PhotoBackdrop :name="project.photo" eager fade="hero" sizes="100vw" />
      <div class="container-page relative flex flex-1 flex-col justify-end pt-36 pb-14 sm:pb-20">
        <RouterLink to="/work" class="inline-flex w-fit animate-fade-up items-center gap-2 font-mono text-xs text-fg-muted transition-colors hover:text-fg">
          <ArrowLeft class="size-3.5" aria-hidden="true" /> All work
        </RouterLink>
        <div class="mt-8 flex animate-fade-up flex-wrap items-center gap-2 [animation-delay:60ms]">
          <StatusBadge :status="project.status" />
          <span class="rounded-full border border-edge/15 bg-ink-950/50 px-2.5 py-1 font-mono text-[0.6875rem] leading-none text-fg-muted">{{ project.kind }}</span>
        </div>
        <h1 id="page-title" class="display text-gradient mt-6 animate-fade-up pb-1 [animation-delay:120ms]">{{ project.name }}</h1>
        <p class="mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-fg-muted [animation-delay:180ms] sm:text-xl">{{ project.summary }}</p>
      </div>
    </section>

    <section class="section" aria-label="Project details">
      <div class="container-page grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
        <aside class="lg:col-span-4">
          <dl class="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-edge/10 pt-6 lg:sticky lg:top-28 lg:grid-cols-1">
            <div>
              <dt class="eyebrow">Type</dt>
              <dd class="mt-2 text-fg">{{ project.kind }}</dd>
            </div>
            <div>
              <dt class="eyebrow">Category</dt>
              <dd class="mt-2 text-fg">{{ project.category }}</dd>
            </div>
            <div>
              <dt class="eyebrow">Status</dt>
              <dd class="mt-2 text-fg">{{ project.status }}</dd>
            </div>
            <div v-if="project.technology?.length">
              <dt class="eyebrow">Technology</dt>
              <dd class="mt-2 font-mono text-sm text-fg-muted">{{ project.technology.join(' · ') }}</dd>
            </div>
            <div v-if="project.url">
              <dt class="eyebrow">Link</dt>
              <dd class="mt-2">
                <a :href="project.url" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-fg underline decoration-edge/25 underline-offset-4 hover:decoration-accent">
                  Visit <ArrowUpRight class="size-3.5" aria-hidden="true" />
                </a>
              </dd>
            </div>
          </dl>
        </aside>

        <div class="space-y-16 lg:col-span-7 lg:col-start-6">
          <div v-reveal>
            <h2 class="eyebrow">Context</h2>
            <p class="mt-5 text-xl leading-relaxed text-fg sm:text-2xl sm:leading-relaxed">{{ project.context }}</p>
          </div>

          <div v-reveal>
            <h2 class="eyebrow">What we’re building</h2>
            <ul class="mt-6 divide-y divide-edge/10 border-y border-edge/10">
              <li v-for="(item, i) in project.building" :key="item" class="flex items-baseline gap-5 py-5">
                <span class="font-mono text-xs text-signal">0{{ i + 1 }}</span>
                <span class="text-lg text-fg">{{ item }}</span>
              </li>
            </ul>
          </div>

          <div v-reveal>
            <h2 class="eyebrow">Outcome</h2>
            <p v-if="project.outcome" class="mt-5 text-lg leading-relaxed text-fg">{{ project.outcome }}</p>
            <p v-else class="mt-5 rounded-2xl border border-dashed border-edge/15 p-6 text-[0.9375rem] leading-relaxed text-fg-muted">
              {{ project.name }} is {{ project.status.toLowerCase() }}. We’ll publish outcomes here once there are real
              results to share.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="border-t border-edge/[0.06] py-20 sm:py-28" aria-labelledby="more-work">
      <div class="container-page">
        <h2 id="more-work" class="eyebrow mb-8">More work</h2>
        <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <ProjectCard v-for="p in others" :key="p.slug" :project="p" />
        </div>
        <NextProjectCard class="mt-5" />
      </div>
    </section>

    <BuildWithUs />
  </div>
</template>
