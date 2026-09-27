<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowUpRight } from 'lucide-vue-next'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import ServiceVisual from '@/components/visuals/ServiceVisual.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { services } from '@/content/services'
</script>

<template>
  <section class="border-t border-edge/[0.06] py-24 sm:py-32" aria-labelledby="services-title">
    <div class="container-page">
      <div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader eyebrow="Services" title="Software built around your operation." heading-id="services-title" />
        <AppButton v-reveal to="/services" variant="secondary" arrow class="self-start lg:self-auto">All services</AppButton>
      </div>

      <ul class="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <li v-for="(s, i) in services" :key="s.id" v-reveal="i * 90">
          <RouterLink
            :to="`/services#${s.id}`"
            class="group panel flex h-full flex-col overflow-hidden transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-edge/15"
          >
            <div class="bg-dots h-44 border-b sm:h-52 border-edge/[0.06] bg-ink-950/40">
              <ServiceVisual :kind="s.visual" />
            </div>
            <div class="flex flex-1 flex-col p-5 sm:p-6">
              <p class="font-mono text-xs text-fg-subtle">{{ s.number }}</p>
              <h3 class="mt-3 flex items-start justify-between gap-4 text-xl font-semibold tracking-tight text-fg">
                {{ s.title }}
                <ArrowUpRight class="mt-1 size-4 shrink-0 text-fg-subtle transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg" aria-hidden="true" />
              </h3>
              <p class="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted">{{ s.summary }}</p>
              <ul class="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-edge/[0.06] pt-4 text-[0.8125rem] text-fg-subtle sm:mt-6 sm:pt-5">
                <li v-for="(e, j) in s.examples.slice(0, 6)" :key="e" :class="['items-center gap-2', j >= 4 ? 'hidden sm:flex' : 'flex']">
                  <span class="size-1 shrink-0 rounded-full bg-edge/25" aria-hidden="true" />{{ e }}
                </li>
              </ul>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>
