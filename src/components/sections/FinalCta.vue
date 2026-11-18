<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import { site } from '@/config/site'

/** Closing call to action, set as a navy band. Pages can ask the question in their own words. */
withDefaults(defineProps<{ title?: string; italic?: string; body?: string }>(), {
  title: 'Ready to build',
  italic: 'something that works?',
  body: 'Tell us about your project. We will come back with questions, a view on approach and a clear next step.',
})
</script>

<template>
  <section class="surface-dark relative overflow-hidden" aria-labelledby="final-cta-title">
    <div class="container-page py-20 sm:py-28">
      <div class="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
        <div class="lg:col-span-8">
          <h2 id="final-cta-title" class="display max-w-3xl">{{ title }} {{ italic }}</h2>
          <p class="mt-6 max-w-xl text-xl leading-relaxed text-fg-muted">{{ body }}</p>
        </div>
        <div class="flex flex-col gap-3 lg:col-span-4 lg:items-end">
          <AppButton to="/contact" size="lg" arrow>Discuss a project</AppButton>
          <AppButton to="/products" variant="secondary" size="lg">Explore our products</AppButton>
          <a v-if="site.email" :href="`mailto:${site.email}`" class="mt-2 text-sm text-fg-muted transition-colors hover:text-fg">{{ site.email }}</a>
        </div>
      </div>
    </div>
  </section>
</template>
