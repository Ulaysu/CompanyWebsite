<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import PhotoBackdrop from '@/components/ui/PhotoBackdrop.vue'
import { site } from '@/config/site'
</script>

<template>
  <section class="surface-dark relative overflow-hidden" aria-labelledby="build-with-us-title">
    <PhotoBackdrop name="earth" fade="radial" sizes="100vw" />
    <div class="container-page relative py-32 text-center sm:py-44">
      <p v-reveal class="index-label justify-center"><span class="h-px w-6 bg-accent" aria-hidden="true" />Build with us</p>
      <h2 id="build-with-us-title" v-reveal="60" class="display text-gradient mx-auto mt-8 max-w-4xl !text-[2.5rem] sm:!text-6xl lg:!text-7xl">
        Have something worth building?
      </h2>
      <p v-reveal="120" class="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-fg-muted">
        Whether it’s a product idea, a business system, or technology that needs to become something more, we’d like
        to hear about it.
      </p>
      <div v-reveal="180" class="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
        <AppButton to="/contact" size="lg" arrow>Build with us</AppButton>
        <a :href="`mailto:${site.email}`" class="font-mono text-sm text-fg-muted transition-colors hover:text-fg">{{ site.email }}</a>
      </div>
    </div>
  </section>
</template>
