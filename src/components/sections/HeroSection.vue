<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import HeroSystem from '@/components/visuals/HeroSystem.vue'
import PhotoBackdrop from '@/components/ui/PhotoBackdrop.vue'
import { site } from '@/config/site'
</script>

<template>
  <section class="relative overflow-hidden pt-28 pb-20 sm:pt-36 lg:pb-32" aria-labelledby="hero-title">
    <div class="absolute inset-x-0 top-0 h-[46rem] sm:h-[50rem]">
      <PhotoBackdrop name="hero" eager fade="hero" />
    </div>
    <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-edge/15 to-transparent" />

    <div class="container-page relative">
      <p class="eyebrow flex animate-fade-up items-center gap-2.5">
        <span class="size-1.5 shrink-0 animate-pulse-dot rounded-full bg-accent" aria-hidden="true" />
        <span><span class="whitespace-nowrap">Custom software</span> <span class="text-fg-subtle/60">·</span> <span class="whitespace-nowrap">Automation</span> <span class="text-fg-subtle/60">·</span> <span class="whitespace-nowrap">Integrations</span></span>
      </p>

      <h1 id="hero-title" class="display text-gradient mt-6 max-w-4xl animate-fade-up [animation-delay:80ms]">
        Turn messy business processes into software that works.
      </h1>

      <div class="mt-8 grid grid-cols-1 gap-8 lg:mt-10 lg:grid-cols-12 lg:items-end">
        <p class="lede max-w-xl animate-fade-up [animation-delay:160ms] lg:col-span-7">
          We build custom internal systems, automation, APIs, and operational tools that help
          businesses reduce manual work, improve visibility, and keep revenue moving.
        </p>
        <div class="flex animate-fade-up flex-col gap-3 [animation-delay:240ms] sm:flex-row sm:items-center lg:col-span-5 lg:justify-end">
          <AppButton to="/contact" size="lg" arrow>Tell us what isn't working</AppButton>
          <AppButton to="/solutions" variant="secondary" size="lg">See what we build</AppButton>
        </div>
      </div>

      <p class="mt-6 animate-fade-up font-mono text-[0.6875rem] text-fg-subtle [animation-delay:300ms]">
        {{ site.availability }}
      </p>

      <div class="mt-16 sm:mt-20 lg:mt-24">
        <HeroSystem />
      </div>
    </div>
  </section>
</template>
