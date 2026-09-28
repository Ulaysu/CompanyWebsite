<script setup lang="ts">
import SectionHeader from '@/components/ui/SectionHeader.vue'
import AppButton from '@/components/ui/AppButton.vue'
import ProjectCard from '@/components/work/ProjectCard.vue'
import NextProjectCard from '@/components/work/NextProjectCard.vue'
import { projects } from '@/content/work'
</script>

<template>
  <section class="section border-t border-edge/[0.06]" aria-labelledby="work-title">
    <div class="container-page">
      <div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          index="02"
          label="What we're building"
          title="The work."
          lede="Our own products and the systems we build with partners. It's early, and every project is shown with its real status."
          heading-id="work-title"
        />
        <AppButton v-reveal to="/work" variant="secondary" arrow class="self-start lg:self-auto">All work</AppButton>
      </div>

      <div class="mt-14 grid grid-cols-1 gap-5 sm:mt-20 lg:grid-cols-2">
        <div v-for="(p, i) in projects" :key="p.slug" v-reveal="i * 100">
          <ProjectCard :project="p" size="lg" />
        </div>
      </div>
      <div v-reveal class="mt-5">
        <NextProjectCard />
      </div>
    </div>
  </section>
</template>
