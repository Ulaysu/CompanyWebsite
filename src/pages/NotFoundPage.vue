<script setup lang="ts">
import { useHead } from '@unhead/vue'
import AppButton from '@/components/ui/AppButton.vue'
import { site } from '@/config/site'

useHead({ title: `Page not found — ${site.name}`, meta: [{ name: 'robots', content: 'noindex' }] })
</script>

<template>
  <section class="surface-dark"><div class="container-page flex min-h-[80vh] flex-col items-start justify-center pt-32 pb-24">
    <p class="eyebrow">404</p>
    <h1 class="heading-xl text-gradient mt-4">This page doesn't exist.</h1>
    <p class="lede mt-4 max-w-md">The link may be out of date. Everything else is where you'd expect it.</p>
    <div class="mt-8 flex flex-wrap gap-3">
      <AppButton to="/" arrow>Back to home</AppButton>
      <AppButton to="/work" variant="secondary">See our work</AppButton>
    </div>
  </div></section>
</template>
