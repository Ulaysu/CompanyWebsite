<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppButton from '@/components/ui/AppButton.vue'
import PhotoBackdrop from '@/components/ui/PhotoBackdrop.vue'
import { projects } from '@/content/work'
</script>

<template>
  <section class="surface-dark relative flex min-h-[100svh] flex-col overflow-hidden" aria-labelledby="hero-title">
    <PhotoBackdrop name="hero" eager fade="hero" sizes="100vw" />

    <div class="container-page relative flex flex-1 flex-col justify-end pt-36 pb-10 sm:pb-12">
      <p class="index-label animate-fade-up">
        <span class="relative flex size-1.5" aria-hidden="true"><span class="absolute inset-0 animate-pulse-dot rounded-full bg-accent" /></span>
        <span>Technology company <span class="text-fg-subtle/70">·</span> Africa <span class="text-accent">→</span> World</span>
      </p>

      <h1 id="hero-title" class="display mt-8 max-w-5xl animate-fade-up [animation-delay:80ms]">
        <span class="text-gradient block pb-1">World-class technology,</span>
        <span class="block text-fg">built from Africa<span class="text-accent">.</span></span>
      </h1>

      <p class="mt-8 max-w-xl animate-fade-up text-lg leading-relaxed text-fg-muted [animation-delay:160ms] sm:text-xl">
        We design and engineer software products, digital platforms and business systems for companies and ideas
        ready to build what comes next.
      </p>

      <div class="mt-10 flex animate-fade-up flex-col gap-3 [animation-delay:240ms] sm:flex-row">
        <AppButton to="/work" size="lg" arrow>Explore our work</AppButton>
        <AppButton to="/contact" variant="secondary" size="lg">Build with us</AppButton>
      </div>

      <dl class="mt-16 grid animate-fade-up grid-cols-1 gap-6 border-t border-edge/10 pt-6 [animation-delay:320ms] sm:mt-24 sm:grid-cols-3">
        <div>
          <dt class="eyebrow">What we build</dt>
          <dd class="mt-2 text-sm text-fg">Products · Platforms · Systems</dd>
        </div>
        <div>
          <dt class="eyebrow">Where from</dt>
          <dd class="mt-2 text-sm text-fg">Africa, for the world</dd>
        </div>
        <div>
          <dt class="eyebrow">Now building</dt>
          <dd class="mt-2 text-sm text-fg">
            <template v-for="(p, i) in projects" :key="p.slug">
              <RouterLink :to="`/work/${p.slug}`" class="underline decoration-edge/25 underline-offset-4 transition-colors hover:decoration-accent">{{ p.name }}</RouterLink><span v-if="i < projects.length - 1" class="text-fg-subtle">, </span>
            </template>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>
