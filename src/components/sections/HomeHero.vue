<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppButton from '@/components/ui/AppButton.vue'
import { site } from '@/config/site'
import { globe } from '@/content/images'
import { products } from '@/content/products'

const rail = ['Africa', 'Technology', 'World']
</script>

<template>
  <section class="surface-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden" aria-labelledby="hero-title">
    <!-- Technical texture -->
    <div aria-hidden="true" class="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_80%_70%_at_70%_40%,#000_10%,transparent_75%)]" />

    <!-- The globe: Africa at the centre, arcs travelling from The Gambia to the world. -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute -z-10 top-[-6%] left-1/2 w-[150vw] max-w-none -translate-x-1/2 opacity-55 sm:top-[-14%] sm:w-[110vw] md:opacity-70 lg:top-1/2 lg:right-[-14vw] lg:left-auto lg:w-[64vw] lg:max-w-[70rem] lg:translate-x-0 lg:-translate-y-1/2 lg:opacity-100"
    >
      <img
        :src="globe.src"
        :srcset="globe.srcset"
        sizes="(min-width: 1024px) 64vw, 150vw"
        :width="globe.size"
        :height="globe.size"
        fetchpriority="high"
        decoding="async"
        alt=""
        class="block h-auto w-full animate-drift"
      />
    </div>
    <!-- Legibility: darken where the text sits. -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent_0%,rgb(10_10_10/0.55)_45%,#0a0a0a_100%)] lg:bg-[linear-gradient(90deg,#0a0a0a_0%,rgb(10_10_10/0.85)_32%,transparent_62%),linear-gradient(180deg,transparent_70%,#0a0a0a_100%)]" />

    <div class="container-page relative flex flex-1 flex-col justify-end pt-32 pb-8 sm:pb-10">
      <p class="index-label animate-fade-up">
        <span class="relative flex size-1.5" aria-hidden="true"><span class="absolute inset-0 animate-pulse-dot rounded-full bg-accent" /></span>
        <span>Technology company <span class="text-fg-subtle/60">/</span> Founded in The Gambia</span>
      </p>

      <h1 id="hero-title" class="mt-8 animate-fade-up [animation-delay:80ms]">
        <span class="wordmark block text-[23vw] leading-[0.78] text-fg sm:text-[9.5rem] lg:text-[12.5rem]">{{ site.name }}</span>
        <span class="sr-only">: {{ site.tagline }}</span>
      </h1>

      <div class="mt-8 grid animate-fade-up grid-cols-1 gap-8 [animation-delay:160ms] sm:mt-10 lg:grid-cols-12">
        <div class="lg:col-span-6">
          <p class="serif text-[2.25rem] leading-none text-fg italic sm:text-5xl">{{ site.philosophy.phrase }}</p>
          <p class="mt-3 font-mono text-[0.6875rem] tracking-wide text-fg-subtle">
            {{ site.philosophy.language }} <span class="text-accent">·</span> “{{ site.philosophy.meaning }}”
          </p>
          <p class="mt-10 max-w-xl text-2xl leading-[1.15] font-medium tracking-[-0.025em] text-fg sm:text-[2.125rem]" aria-hidden="true">
            Building world-class technology from Africa to the world.
          </p>
          <p class="mt-6 max-w-lg text-base leading-relaxed text-fg-muted sm:text-lg">
            SOFORR builds technology products and systems designed to solve real-world problems and create
            opportunities across borders.
          </p>
          <div class="mt-10 flex flex-col gap-3 sm:flex-row">
            <AppButton to="/products" size="lg" arrow>Explore our products</AppButton>
            <AppButton to="/work-with-us" variant="secondary" size="lg">Start a conversation</AppButton>
          </div>
        </div>
      </div>

      <!-- Africa → Technology → World -->
      <div class="mt-16 grid animate-fade-up grid-cols-1 gap-6 border-t border-edge/10 pt-6 [animation-delay:260ms] sm:mt-20 lg:grid-cols-12 lg:items-center">
        <ol class="flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.16em] uppercase lg:col-span-7" aria-label="Africa to technology to the world">
          <template v-for="(step, i) in rail" :key="step">
            <li :class="i === 0 ? 'text-accent' : 'text-fg'">{{ step }}</li>
            <li v-if="i < rail.length - 1" aria-hidden="true" class="relative h-px flex-1 bg-edge/15">
              <span class="absolute top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 animate-travel rounded-full bg-accent shadow-[0_0_12px_2px_rgb(232_114_58/0.6)]" :style="{ animationDelay: `${i * 1.2}s` }" />
            </li>
          </template>
        </ol>
        <p class="font-mono text-[0.6875rem] tracking-wide text-fg-subtle lg:col-span-4 lg:col-start-9 lg:text-right">
          Now building:
          <template v-for="(p, i) in products" :key="p.slug">
            <RouterLink :to="`/products/${p.slug}`" class="text-fg underline decoration-edge/25 underline-offset-4 transition-colors hover:decoration-accent">{{ p.name }}</RouterLink><span v-if="i < products.length - 1">, </span>
          </template>
        </p>
      </div>
    </div>
  </section>
</template>
