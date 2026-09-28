<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import { partnership } from '@/content/company'

withDefaults(defineProps<{ index?: string; showCta?: boolean }>(), { index: '07', showCta: true })
</script>

<template>
  <section class="section border-t border-edge/[0.07]" aria-labelledby="partner-title">
    <div class="container-page grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
      <div class="lg:col-span-5">
        <p v-reveal class="index-label"><span v-if="index" class="text-accent">{{ index }}</span><span class="h-px w-6 bg-edge/20" aria-hidden="true" />Work with us</p>
        <h2 id="partner-title" v-reveal="60" class="heading-xl mt-8">{{ partnership.title }}</h2>
        <div class="mt-8 space-y-4 text-lg leading-relaxed text-fg-muted">
          <p v-for="(para, i) in partnership.body" :key="i" v-reveal="100 + i * 60">{{ para }}</p>
        </div>

        <div v-reveal class="mt-10 border-t border-edge/10 pt-6">
          <p class="eyebrow">What we look for</p>
          <ul class="mt-4 space-y-2">
            <li v-for="f in partnership.fit" :key="f" class="flex items-baseline gap-3 text-[0.9375rem] text-fg">
              <span class="size-1 shrink-0 translate-y-[-2px] bg-accent" aria-hidden="true" />{{ f }}
            </li>
          </ul>
        </div>

        <div v-if="showCta" v-reveal class="mt-10">
          <AppButton to="/work-with-us" size="lg" arrow>Start a conversation</AppButton>
        </div>
      </div>

      <ul class="grid grid-cols-1 border-t border-l border-edge/10 sm:grid-cols-2 lg:col-span-7 lg:self-end">
        <li
          v-for="(a, i) in partnership.areas"
          :key="a.title"
          v-reveal="(i % 2) * 70"
          class="group border-r border-b border-edge/10 p-6 transition-colors duration-300 hover:bg-edge/[0.025] sm:p-8"
        >
          <span class="font-mono text-[0.6875rem] text-fg-subtle transition-colors group-hover:text-accent">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="mt-8 text-xl font-semibold tracking-[-0.02em] text-fg sm:mt-12">{{ a.title }}</h3>
          <p class="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted">{{ a.body }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
