<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import { primaryCta, site } from '@/config/site'
</script>

<template>
  <section class="surface-dark relative isolate overflow-hidden border-t border-edge/[0.06]" aria-labelledby="final-cta-title">
    <div aria-hidden="true" class="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(ellipse_70%_80%_at_80%_100%,#000_10%,transparent_75%)]" />
    <div class="container-page grid grid-cols-1 gap-12 py-28 sm:py-40 lg:grid-cols-12 lg:items-end">
      <div class="lg:col-span-8">
        <h2 id="final-cta-title" v-reveal class="display">
          Have something <span class="serif font-normal tracking-[-0.03em] italic">worth building?</span>
        </h2>
        <p v-reveal="80" class="mt-8 max-w-xl text-xl leading-relaxed text-fg-muted">
          Tell us about the problem, opportunity or idea. Let’s see what we can build.
        </p>
      </div>
      <div v-reveal="160" class="flex flex-col gap-5 lg:col-span-4 lg:items-end">
        <AppButton :to="primaryCta.to" size="lg" arrow>{{ primaryCta.label }}</AppButton>
        <a :href="`mailto:${site.email}`" class="font-mono text-sm text-fg-muted transition-colors hover:text-fg">{{ site.email }}</a>
      </div>
    </div>
  </section>
</template>
