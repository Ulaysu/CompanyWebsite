<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Menu, X, ArrowRight } from 'lucide-vue-next'
import LogoMark from '@/components/ui/LogoMark.vue'
import AppButton from '@/components/ui/AppButton.vue'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'
import { navigation, primaryCta, site } from '@/config/site'

const route = useRoute()
const scrolled = ref(false)
const open = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 8
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}

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
watch(open, (v) => {
  document.documentElement.style.overflow = v ? 'hidden' : ''
})
</script>

<template>
  <header
    :class="[
      'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300',
      scrolled || open
        ? 'border-b border-edge/[0.06] bg-ink-950/75 backdrop-blur-xl backdrop-saturate-150'
        : // Every page opens on a dark hero, so the bar reads as dark until it scrolls.
          'surface-dark border-b border-transparent !bg-transparent',
    ]"
  >
    <div class="container-page flex h-16 items-center justify-between gap-6">
      <RouterLink to="/" class="-m-1 rounded-md p-1" :aria-label="`${site.name} — home`">
        <LogoMark :show-descriptor="true" />
      </RouterLink>

      <nav aria-label="Primary" class="hidden md:block">
        <ul class="flex items-center gap-1">
          <li v-for="item in navigation" :key="item.to">
            <RouterLink
              :to="item.to"
              class="rounded-full px-3.5 py-2 text-sm text-fg-muted transition-colors duration-200 hover:text-fg"
              active-class="!text-fg"
            >
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="hidden items-center gap-3 md:flex">
        <ThemeToggle />
        <AppButton :to="primaryCta.to" size="sm" arrow>{{ primaryCta.label }}</AppButton>
      </div>

      <div class="flex items-center gap-1 md:hidden">
      <ThemeToggle />
      <button
        type="button"
        class="-mr-2 grid size-10 place-items-center rounded-full text-fg md:hidden"
        :aria-expanded="open"
        aria-controls="mobile-nav"
        :aria-label="open ? 'Close menu' : 'Open menu'"
        @click="open = !open"
      >
        <X v-if="open" class="size-5" aria-hidden="true" />
        <Menu v-else class="size-5" aria-hidden="true" />
      </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-if="open"
        id="mobile-nav"
        class="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-edge/[0.06] bg-ink-950 md:hidden"
      >
        <nav aria-label="Mobile" class="container-page flex h-full flex-col pt-4 pb-[max(2rem,env(safe-area-inset-bottom))]">
          <ul class="divide-y divide-edge/[0.06]">
            <li v-for="(item, i) in navigation" :key="item.to">
              <RouterLink
                :to="item.to"
                class="flex items-center justify-between py-5 text-2xl font-medium tracking-tight text-fg-muted"
                active-class="!text-fg"
                :style="{ animationDelay: `${i * 40}ms` }"
              >
                {{ item.label }}
                <ArrowRight class="size-5 text-fg-subtle" aria-hidden="true" />
              </RouterLink>
            </li>
          </ul>
          <div class="mt-auto space-y-5 pt-10">
            <p class="text-sm leading-relaxed text-fg-muted">
              Have something worth building? Tell us about it.
            </p>
            <AppButton :to="primaryCta.to" size="lg" arrow class="w-full">{{ primaryCta.label }}</AppButton>
            <a :href="`mailto:${site.email}`" class="block text-center font-mono text-xs text-fg-subtle">{{ site.email }}</a>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>
