<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Menu, X } from 'lucide-vue-next'
import LogoMark from '@/components/ui/LogoMark.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { navigation, primaryCta, site } from '@/config/site'

const route = useRoute()
const scrolled = ref(false)
const open = ref(false)

const onScroll = () => (scrolled.value = window.scrollY > 4)
const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') open.value = false }

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
  document.documentElement.style.overflow = ''
})
watch(() => route.fullPath, () => (open.value = false))
watch(open, (v) => { document.documentElement.style.overflow = v ? 'hidden' : '' })
</script>

<template>
  <header :class="['fixed inset-x-0 top-0 z-50 bg-ink-950/85 backdrop-blur-xl transition-shadow duration-200', scrolled || open ? 'shadow-[0_1px_0_rgb(10_31_68/0.08)]' : '']">
    <div class="tri-band-h h-[3px]" aria-hidden="true" />
    <div class="container-page flex h-16 items-center justify-between gap-6">
      <RouterLink to="/" class="-m-1 rounded-md p-1" :aria-label="`${site.name}, home`"><LogoMark /></RouterLink>

      <nav aria-label="Primary" class="hidden md:block">
        <ul class="flex items-center gap-1">
          <li v-for="item in navigation" :key="item.to">
            <RouterLink
              :to="item.to"
              class="rounded-full px-3.5 py-2 text-sm font-medium whitespace-nowrap text-fg-muted transition-colors hover:bg-edge/[0.05] hover:text-fg"
              :active-class="item.to === '/' ? '' : '!bg-edge/[0.06] !text-fg'"
              :exact-active-class="item.to === '/' ? '!bg-edge/[0.06] !text-fg' : ''"
            >{{ item.label }}</RouterLink>
          </li>
        </ul>
      </nav>

      <div class="hidden md:block"><AppButton :to="primaryCta.to" size="sm">{{ primaryCta.label }}</AppButton></div>

      <button type="button" class="-mr-2 grid size-10 place-items-center text-fg md:hidden" :aria-expanded="open" aria-controls="mobile-nav" :aria-label="open ? 'Close menu' : 'Open menu'" @click="open = !open">
        <X v-if="open" class="size-5" aria-hidden="true" />
        <Menu v-else class="size-5" aria-hidden="true" />
      </button>
    </div>

    <div v-if="open" id="mobile-nav" class="h-[calc(100dvh-4.1875rem)] overflow-y-auto border-t border-edge/10 bg-ink-950 md:hidden">
      <nav aria-label="Mobile" class="container-page flex min-h-full flex-col pt-4 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <ul>
          <li v-for="item in navigation" :key="item.to" class="border-b border-edge/10">
            <RouterLink :to="item.to" class="block py-4 text-3xl font-semibold tracking-[-0.03em] text-fg-muted" :active-class="item.to === '/' ? '' : '!text-fg'" :exact-active-class="item.to === '/' ? '!text-fg' : ''">{{ item.label }}</RouterLink>
          </li>
        </ul>
        <div class="mt-auto space-y-5 pt-10">
          <p class="serif text-3xl leading-none text-fg italic">{{ site.philosophy.phrase }}</p>
          <AppButton :to="primaryCta.to" size="lg" class="w-full">{{ primaryCta.label }}</AppButton>
          <p class="flex justify-between gap-4 text-xs text-fg-subtle"><a v-if="site.email" :href="`mailto:${site.email}`">{{ site.email }}</a><span>{{ site.originShort.split(' · ')[0] }}</span></p>
        </div>
      </nav>
    </div>
  </header>
</template>
