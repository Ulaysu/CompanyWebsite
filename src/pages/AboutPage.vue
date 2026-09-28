<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import PageHero from '@/components/sections/PageHero.vue'
import PhotoBackdrop from '@/components/ui/PhotoBackdrop.vue'
import AfricaWorldSection from '@/components/sections/AfricaWorldSection.vue'
import PrinciplesSection from '@/components/sections/PrinciplesSection.vue'
import BuildWithUs from '@/components/sections/BuildWithUs.vue'
import { manifesto } from '@/content/company'
import { projects } from '@/content/work'
import { site } from '@/config/site'

usePageMeta({
  title: 'About',
  description: `${site.name} is a young technology company building world-class software from Africa, for the world.`,
})
</script>

<template>
  <div>
    <PageHero
      label="About"
      title="Built from Africa, for the world."
      lede="A young technology company with a simple conviction: where software is built should never decide how good it can be."
      photo="city"
    />

    <section class="section" aria-labelledby="why-title">
      <div class="container-page grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-7">
          <p v-reveal class="index-label"><span class="h-px w-6 bg-accent" aria-hidden="true" />Why we exist</p>
          <h2 id="why-title" v-reveal="60" class="statement text-gradient mt-8">{{ manifesto.statement }}</h2>
          <div class="mt-10 space-y-6 text-lg leading-relaxed text-fg-muted">
            <p v-for="(para, i) in manifesto.paragraphs" :key="i" v-reveal="i * 80">{{ para }}</p>
            <p v-reveal="160">
              The company was founded by Sulayman Sanyang, a software engineer who wanted to build technology from
              Africa that could stand next to anything built elsewhere, and to prove it with real products rather than
              promises.
            </p>
          </div>
        </div>
        <figure v-reveal class="relative aspect-[4/5] overflow-hidden rounded-2xl border border-edge/[0.07] lg:col-span-4 lg:col-start-9">
          <PhotoBackdrop name="builders" fade="none" sizes="(min-width: 1024px) 400px, 100vw" />
        </figure>
      </div>
    </section>

    <AfricaWorldSection />
    <PrinciplesSection index="" />

    <section class="section border-t border-edge/[0.06]" aria-labelledby="now-title">
      <div class="container-page grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-5">
          <p v-reveal class="index-label"><span class="h-px w-6 bg-accent" aria-hidden="true" />Where we are now</p>
          <h2 id="now-title" v-reveal="60" class="heading-xl text-gradient mt-8">
            <span v-for="line in manifesto.stance" :key="line" class="block">{{ line }}</span>
          </h2>
        </div>
        <div class="space-y-6 text-lg leading-relaxed text-fg-muted lg:col-span-6 lg:col-start-7">
          <p v-reveal>
            We’re early, and we’d rather be honest about that than invent a track record. Right now we’re building our
            first products and our first partnerships:
          </p>
          <ul v-reveal="80" class="divide-y divide-edge/10 border-y border-edge/10">
            <li v-for="p in projects" :key="p.slug" class="flex flex-wrap items-baseline justify-between gap-2 py-4">
              <RouterLink :to="`/work/${p.slug}`" class="font-semibold text-fg underline decoration-edge/25 underline-offset-4 hover:decoration-accent">{{ p.name }}</RouterLink>
              <span class="font-mono text-xs text-fg-subtle">{{ p.kind }} · {{ p.status }}</span>
            </li>
          </ul>
          <p v-reveal="120">The ambition is much bigger than the portfolio, for now. That’s the point.</p>
        </div>
      </div>
    </section>

    <BuildWithUs />
  </div>
</template>
