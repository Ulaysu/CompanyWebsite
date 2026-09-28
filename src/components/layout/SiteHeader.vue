<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Menu, X } from 'lucide-vue-next'
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
        <LogoMark />
      </RouterLink>

      <nav aria-label="Primary" class="hidden md:block">
        <ul class="flex items-center gap-0.5 lg:gap-1">
          <li v-for="item in navigation" :key="item.to">
            <RouterLink
              :to="item.to"
              class="relative px-3 py-2 text-sm whitespace-nowrap text-fg-muted transition-colors duration-200 hover:text-fg lg:px-4"
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
        class="-mr-2 grid size-10 place-items-center text-fg md:hidden"
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
          <ul class="border-b border-edge/[0.08]">
            <li v-for="(item, i) in navigation" :key="item.to" class="border-t border-edge/[0.08]">
              <RouterLink
                :to="item.to"
                class="flex items-baseline gap-4 py-5 text-[2.25rem] leading-none font-semibold tracking-[-0.04em] text-fg-muted"
                active-class="!text-fg"
              >
                <span class="font-mono text-[0.6875rem] font-normal tracking-normal text-fg-subtle">{{ String(i + 1).padStart(2, '0') }}</span>
                {{ item.label }}
              </RouterLink>
            </li>
          </ul>
          <div class="mt-auto space-y-6 pt-10">
            <p class="serif text-3xl leading-none text-fg italic">{{ site.philosophy.phrase }}</p>
            <AppButton :to="primaryCta.to" size="lg" arrow class="w-full">{{ primaryCta.label }}</AppButton>
            <p class="flex justify-between gap-4 font-mono text-[0.6875rem] text-fg-subtle">
              <a :href="`mailto:${site.email}`">{{ site.email }}</a><span>{{ site.originShort.split(' · ')[0] }}</span>
            </p>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>
