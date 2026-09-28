<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'

const { theme, toggle } = useTheme()
</script>

<template>
  <button
    type="button"
    class="grid size-9 place-items-center border border-edge/12 text-fg-muted transition-colors duration-200 hover:border-edge/20 hover:text-fg"
    :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
    :title="theme === 'dark' ? 'Light theme' : 'Dark theme'"
    @click="toggle"
  >
    <!-- Icons switch on the data-theme attribute so the server-rendered HTML is correct before hydration. -->
    <Sun class="size-4 light:hidden" aria-hidden="true" />
    <Moon class="hidden size-4 light:block" aria-hidden="true" />
  </button>
</template>
