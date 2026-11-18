<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import PipelineCard from '@/components/product/PipelineCard.vue'
import { site } from '@/config/site'
</script>

<template>
  <section class="relative isolate overflow-hidden bg-ink-950 pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pb-28" aria-labelledby="hero-title">
    <div aria-hidden="true" class="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_70%_at_30%_20%,#000_20%,transparent_75%)]" />
    <div aria-hidden="true" class="pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[34rem] w-[34rem] rounded-full bg-accent/10 blur-3xl" />

    <div class="container-page grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
      <div class="lg:col-span-7">
        <p class="animate-fade-up text-sm font-semibold text-accent-soft">{{ site.descriptor }}, founded in The Gambia</p>
        <h1 id="hero-title" class="mt-5 animate-fade-up text-[3rem] leading-[0.98] font-semibold tracking-[-0.05em] [animation-delay:60ms] sm:text-[4rem] xl:text-[4.75rem]">
          Engineering software. Building what comes next.
        </h1>
        <div class="mt-8 max-w-xl animate-fade-up space-y-4 text-lg leading-relaxed text-fg-muted [animation-delay:140ms]">
          <p v-for="line in site.summary" :key="line">{{ line }}</p>
        </div>
        <div class="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:200ms] sm:flex-row">
          <AppButton to="/contact" size="lg" arrow>Discuss a project</AppButton>
          <AppButton to="/products" variant="secondary" size="lg">Explore our products</AppButton>
        </div>
      </div>

      <div class="animate-fade-up [animation-delay:260ms] lg:col-span-5">
        <PipelineCard />
      </div>
    </div>
  </section>
</template>
