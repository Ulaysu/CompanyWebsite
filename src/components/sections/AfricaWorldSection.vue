<script setup lang="ts">
import PhotoBackdrop from '@/components/ui/PhotoBackdrop.vue'
import { builtFromAfrica } from '@/content/company'
import { photoSrc, photoSrcset, photos, type PhotoName } from '@/content/photos'

withDefaults(defineProps<{ index?: string }>(), { index: '05' })

const plates: { name: PhotoName; caption: string; coords: string; class: string }[] = [
  { name: 'lagos', caption: 'Lagos, Nigeria', coords: '6.43° N · 3.42° E', class: 'aspect-[4/5]' },
  { name: 'flight', caption: 'Approaching Kigali, Rwanda', coords: '1.94° S · 30.06° E', class: 'aspect-[16/10]' },
  { name: 'city', caption: 'Nairobi, Kenya', coords: '1.29° S · 36.82° E', class: 'aspect-[16/10]' },
]
</script>

<template>
  <section class="surface-dark relative overflow-hidden" aria-labelledby="africa-title">
    <!-- Opening plate: full-bleed, cinematic. -->
    <div class="relative flex min-h-[78svh] items-end">
      <PhotoBackdrop name="bridge" fade="caption" sizes="100vw" />
      <div aria-hidden="true" class="absolute inset-0 bg-[linear-gradient(0deg,#0a0a0a_0%,rgb(10_10_10/0.7)_35%,rgb(10_10_10/0.15)_70%,rgb(10_10_10/0.35)_100%)]" />
      <div class="container-page relative pt-40 pb-14 sm:pb-20">
        <p v-reveal class="index-label"><span v-if="index" class="text-accent">{{ index }}</span><span class="h-px w-6 bg-edge/30" aria-hidden="true" />Africa <span class="text-accent">→</span> World</p>
        <h2 id="africa-title" v-reveal="60" class="display mt-8 max-w-5xl">
          <span class="block">{{ builtFromAfrica.title[0] }}</span>
          <span class="block text-fg-muted">{{ builtFromAfrica.title[1] }}</span>
        </h2>
        <p v-reveal="120" class="mt-8 font-mono text-[0.6875rem] tracking-wide text-fg-subtle">Lagos, Nigeria · 6.45° N · 3.42° E</p>
      </div>
    </div>

    <div class="container-page section !pt-20 sm:!pt-28">
      <div class="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-6">
          <ol class="space-y-2">
            <li
              v-for="(line, i) in builtFromAfrica.lines"
              :key="line"
              v-reveal="i * 90"
              class="statement !text-[1.75rem] sm:!text-[2.5rem] lg:!text-[2.75rem]"
              :class="i === builtFromAfrica.lines.length - 1 ? 'text-accent' : i === 0 ? 'text-fg' : 'text-fg-muted'"
            >
              {{ line }}
            </li>
          </ol>
          <p v-reveal class="mt-14 max-w-xl border-l-2 border-accent pl-6 text-xl leading-relaxed text-fg">
            {{ builtFromAfrica.closing }}
          </p>

          <ul class="mt-16 grid grid-cols-1 gap-8 border-t border-edge/10 pt-10 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <li v-for="(pt, i) in builtFromAfrica.points" :key="pt.title" v-reveal="i * 80">
              <span class="font-mono text-xs text-accent">0{{ i + 1 }}</span>
              <h3 class="mt-3 text-base font-semibold text-fg">{{ pt.title }}</h3>
              <p class="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted">{{ pt.body }}</p>
            </li>
          </ul>
        </div>

        <!-- Photo plates -->
        <div class="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-5 lg:col-start-8">
          <figure v-for="(p, i) in plates" :key="p.name" v-reveal="i * 100" :class="i === 0 ? 'col-span-2' : ''">
            <div class="relative overflow-hidden bg-ink-900" :class="p.class">
              <img
                loading="lazy"
                decoding="async"
                :alt="photos[p.name]!.alt"
                :sizes="i === 0 ? '(min-width: 1024px) 40vw, 100vw' : '(min-width: 1024px) 20vw, 50vw'"
                :srcset="photoSrcset(p.name)"
                :src="photoSrc(p.name)"
                class="absolute inset-0 h-full w-full object-cover [filter:saturate(0.85)_contrast(1.05)]"
                :style="{ objectPosition: photos[p.name]!.position }"
              />
              <div class="frame-ticks absolute inset-3" aria-hidden="true" />
            </div>
            <figcaption class="mt-3 flex flex-wrap justify-between gap-x-3 font-mono text-[0.625rem] tracking-wide">
              <span class="text-fg-muted">{{ p.caption }}</span>
              <span class="text-fg-subtle">{{ p.coords }}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>
