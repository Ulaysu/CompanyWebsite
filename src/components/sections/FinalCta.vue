<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import PhotoBackdrop from '@/components/ui/PhotoBackdrop.vue'
import { site } from '@/config/site'

/** Closing call to action. `sub` lets a page ask the question in its own terms. */
withDefaults(defineProps<{ title?: string; italic?: string; body?: string }>(), {
  title: 'Ready to build',
  italic: 'something that works?',
  body: 'Tell us about your project. We will come back with questions, a view on approach and a clear next step.',
})
</script>

<template>
  <section class="surface-dark relative isolate overflow-hidden border-t border-edge/[0.06]" aria-labelledby="final-cta-title">
    <PhotoBackdrop name="team" fade="side" sizes="100vw" class="-z-10" />
    <div class="on-photo container-page py-32 sm:py-48">
      <h2 id="final-cta-title" v-reveal class="display max-w-4xl">
        {{ title }} <span class="serif font-normal tracking-[-0.03em] italic">{{ italic }}</span>
      </h2>
      <p v-reveal="80" class="mt-8 max-w-xl text-xl leading-relaxed text-fg">{{ body }}</p>
      <div v-reveal="160" class="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
        <AppButton to="/contact" size="lg" arrow>Discuss a project</AppButton>
        <AppButton to="/products" variant="secondary" size="lg">Explore our products</AppButton>
        <a v-if="site.email" :href="`mailto:${site.email}`" class="font-mono text-sm text-fg transition-colors hover:text-fg-muted sm:ml-4">{{ site.email }}</a>
      </div>
    </div>
  </section>
</template>
