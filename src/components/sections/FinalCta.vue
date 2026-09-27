<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import { site } from '@/config/site'

withDefaults(
  defineProps<{ title?: string; body?: string }>(),
  {
    title: "Tell us what isn't working.",
    body: "You don't need to know exactly what software you need. Start with the problem. We'll help you work out what should be built.",
  },
)
</script>

<template>
  <section class="relative overflow-hidden border-t border-edge/[0.06]" aria-labelledby="final-cta-title">
    <div aria-hidden="true" class="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_80%_at_50%_100%,#000_20%,transparent_70%)]" />
    <div aria-hidden="true" class="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-accent/[0.09] blur-3xl" />
    <div class="container-page relative py-24 text-center sm:py-32">
      <h2 id="final-cta-title" v-reveal class="heading-xl text-gradient mx-auto max-w-3xl">{{ title }}</h2>
      <p v-reveal="80" class="lede mx-auto mt-6 max-w-xl">{{ body }}</p>
      <div v-reveal="160" class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <AppButton to="/contact" size="lg" arrow>Start the conversation</AppButton>
        <a :href="`mailto:${site.email}`" class="font-mono text-sm text-fg-muted transition-colors hover:text-fg">{{ site.email }}</a>
      </div>
    </div>
  </section>
</template>
