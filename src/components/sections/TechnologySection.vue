<script setup lang="ts">
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { capabilities, engineeringPrinciples } from '@/content/general'
</script>

<template>
  <section class="border-t border-white/[0.06] py-24 sm:py-32" aria-labelledby="tech-title">
    <div class="container-page">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-5">
          <SectionHeader
            eyebrow="Engineering"
            title="Engineering that holds up in production."
            lede="Business outcomes come first. Underneath them sits a proven, conventional stack chosen for reliability and long-term maintainability."
            heading-id="tech-title"
          />
        </div>
        <dl class="grid grid-cols-2 gap-px self-start overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.06] lg:col-span-6 lg:col-start-7">
          <div v-for="(c, i) in capabilities" :key="c.group" v-reveal="i * 60" class="bg-ink-950 p-4 sm:p-6">
            <dt class="eyebrow">{{ c.group }}</dt>
            <dd class="mt-4">
              <ul class="space-y-2">
                <li v-for="item in c.items" :key="item" class="font-mono text-xs text-fg-muted sm:text-[0.8125rem]">{{ item }}</li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>

      <ul class="mt-16 grid grid-cols-1 gap-8 border-t border-white/[0.06] pt-10 sm:grid-cols-3">
        <li v-for="(p, i) in engineeringPrinciples" :key="p.title" v-reveal="i * 80">
          <h3 class="text-[0.9375rem] font-medium text-fg">{{ p.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-fg-muted">{{ p.body }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
