<script setup lang="ts">
import { CornerDownRight } from 'lucide-vue-next'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import CtaInline from '@/components/sections/CtaInline.vue'
import { problemStatements } from '@/content/general'
</script>

<template>
  <section class="border-t border-edge/[0.06] py-24 sm:py-32" aria-labelledby="pws-title">
    <div class="container-page">
      <SectionHeader
        eyebrow="Sound familiar?"
        title="Problems worth solving."
        lede="Illustrative examples of the problems operational businesses run into — and the kind of system that fixes each one."
        heading-id="pws-title"
      />

      <ul class="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
        <li
          v-for="(p, i) in problemStatements"
          :key="p.quote"
          v-reveal="(i % 2) * 90"
          class="panel group flex flex-col p-6 transition-colors duration-300 hover:border-edge/12 sm:p-8"
        >
          <span class="eyebrow">{{ p.area }}</span>
          <blockquote class="mt-5 flex-1 text-lg leading-snug font-medium tracking-tight text-fg sm:text-xl">
            <span class="text-fg-subtle">“</span>{{ p.quote }}<span class="text-fg-subtle">”</span>
          </blockquote>
          <p class="mt-8 flex items-start gap-3 border-t border-edge/[0.06] pt-5 text-sm leading-relaxed text-fg-muted">
            <CornerDownRight class="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
            {{ p.response }}
          </p>
        </li>
      </ul>

      <CtaInline class="mt-10" title="If your problem sounds familiar, let's talk." button="Start a conversation" />
    </div>
  </section>
</template>
