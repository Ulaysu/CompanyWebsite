<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import PhotoBackdrop from '@/components/ui/PhotoBackdrop.vue'
import { primaryCta, site } from '@/config/site'
</script>

<template>
  <section class="surface-dark relative overflow-hidden border-t border-edge/[0.06]" aria-labelledby="final-cta-title">
    <PhotoBackdrop name="earth" fade="side" sizes="100vw" :strength="0.9" />
    <div class="container-page relative py-32 sm:py-48">
      <p v-reveal class="index-label"><span class="h-px w-6 bg-accent" aria-hidden="true" />{{ site.philosophy.phrase }}</p>
      <h2 id="final-cta-title" v-reveal="60" class="display mt-8 max-w-4xl">Have something worth building?</h2>
      <p v-reveal="120" class="mt-8 max-w-xl text-xl leading-relaxed text-fg-muted">
        Tell us about the problem, opportunity or idea. Let’s see what we can build.
      </p>
      <div v-reveal="180" class="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center">
        <AppButton :to="primaryCta.to" size="lg" arrow>{{ primaryCta.label }}</AppButton>
        <a :href="`mailto:${site.email}`" class="font-mono text-sm text-fg-muted transition-colors hover:text-fg">{{ site.email }}</a>
      </div>
    </div>
  </section>
</template>
