<script setup lang="ts">
import PhotoBackdrop from '@/components/ui/PhotoBackdrop.vue'
import { manifesto } from '@/content/company'
import { site } from '@/config/site'
</script>

<template>
  <section class="section" aria-labelledby="company-title">
    <div class="container-page">
      <p v-reveal class="index-label"><span class="text-accent">01</span><span class="h-px w-6 bg-edge/20" aria-hidden="true" />The company</p>
      <h2 id="company-title" v-reveal="60" class="statement text-gradient mt-8 max-w-5xl">{{ manifesto.statement }}</h2>

      <div class="mt-16 grid grid-cols-1 gap-12 sm:mt-24 lg:grid-cols-12 lg:gap-16">
        <figure v-reveal class="relative aspect-[4/3] overflow-hidden rounded-2xl border border-edge/[0.07] lg:col-span-6 lg:aspect-[5/4]">
          <PhotoBackdrop name="builders" fade="none" sizes="(min-width: 1024px) 600px, 100vw" />
        </figure>

        <div class="flex flex-col lg:col-span-5 lg:col-start-8">
          <div class="space-y-6 text-lg leading-relaxed text-fg-muted">
            <p v-for="(para, i) in manifesto.paragraphs" :key="i" v-reveal="i * 80">{{ para }}</p>
          </div>
          <ul class="mt-auto space-y-1 border-t border-edge/10 pt-8" aria-label="Where we are">
            <li
              v-for="(line, i) in manifesto.stance"
              :key="line"
              v-reveal="i * 90"
              class="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
              :class="i === manifesto.stance.length - 1 ? 'text-fg' : 'text-fg-subtle'"
            >
              {{ line }}
            </li>
          </ul>
          <p v-reveal class="mt-6 font-mono text-xs text-fg-subtle">{{ site.basedIn }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
