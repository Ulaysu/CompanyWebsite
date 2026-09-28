<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import PageHero from '@/components/sections/PageHero.vue'
import ProjectCard from '@/components/work/ProjectCard.vue'
import NextProjectCard from '@/components/work/NextProjectCard.vue'
import BuildWithUs from '@/components/sections/BuildWithUs.vue'
import { projects } from '@/content/work'

usePageMeta({
  title: 'Work',
  description: 'The products we are building and the systems we build with partners, each shown with its real status.',
})
</script>

<template>
  <div>
    <PageHero
      label="Work"
      title="What we’re building."
      lede="Our own products and the systems we build with partners. We’re a young company, so the portfolio is small and growing, and every project is shown exactly as it stands."
      photo="servers"
    />

    <section class="section !pt-16 sm:!pt-24" aria-label="Projects">
      <div class="container-page">
        <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div v-for="(p, i) in projects" :key="p.slug" v-reveal="i * 100">
            <ProjectCard :project="p" size="lg" />
          </div>
        </div>
        <div v-reveal class="mt-5">
          <NextProjectCard />
        </div>
        <p v-reveal class="mt-12 max-w-2xl text-sm leading-relaxed text-fg-subtle">
          A note on how we show work: projects appear with their real status. Case studies and outcomes are published
          once there are results worth reporting, not before.
        </p>
      </div>
    </section>

    <BuildWithUs />
  </div>
</template>
