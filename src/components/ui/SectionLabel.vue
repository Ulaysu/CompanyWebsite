<script setup lang="ts">
/** The quiet label that opens every chapter, e.g. "01 / Philosophy". */
defineProps<{ index?: string; label: string }>()
</script>

<template>
  <p v-reveal class="index-label">
    <span v-if="index" class="text-fg">{{ index }}</span>
    <span v-if="index" class="text-fg-subtle/60" aria-hidden="true">/</span>
    <span>{{ label }}</span>
  </p>
</template>
