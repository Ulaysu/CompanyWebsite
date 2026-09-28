<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import PhotoBackdrop from '@/components/ui/PhotoBackdrop.vue'
import { primaryCta, site } from '@/config/site'
</script>

<template>
  <section class="surface-dark relative isolate overflow-hidden border-t border-edge/[0.06]" aria-labelledby="final-cta-title">
    <PhotoBackdrop name="team" fade="side" sizes="100vw" class="-z-10" />
    <div class="on-photo container-page py-32 sm:py-48">
      <h2 id="final-cta-title" v-reveal class="display max-w-4xl">
        Have something <span class="serif font-normal tracking-[-0.03em] italic">worth building?</span>
      </h2>
      <p v-reveal="80" class="mt-8 max-w-xl text-xl leading-relaxed text-fg">
        Tell us about the problem, opportunity or idea. Let’s see what we can build.
      </p>
      <div v-reveal="160" class="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center">
        <AppButton :to="primaryCta.to" size="lg" arrow>{{ primaryCta.label }}</AppButton>
        <a :href="`mailto:${site.email}`" class="font-mono text-sm text-fg transition-colors hover:text-fg-muted">{{ site.email }}</a>
      </div>
    </div>
  </section>
</template>
