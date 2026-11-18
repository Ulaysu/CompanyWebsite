<script setup lang="ts">
/** A short plain-language label that names a section. Index numbers were removed: only real sequences are numbered. */
defineProps<{ index?: string; label: string }>()
</script>

<template>
  <p class="index-label">{{ label }}</p>
</template>
