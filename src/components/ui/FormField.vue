<script setup lang="ts">
import { computed, useId } from 'vue'

const props = withDefaults(
  defineProps<{
    label: string
    name: string
    type?: string
    required?: boolean
    multiline?: boolean
    rows?: number
    placeholder?: string
    hint?: string
    error?: string
    autocomplete?: string
    inputmode?: 'text' | 'email' | 'url'
  }>(),
  { type: 'text', required: false, multiline: false, rows: 4 },
)

const model = defineModel<string>({ default: '' })
const id = useId()
const describedBy = computed(() =>
  [props.hint ? `${id}-hint` : '', props.error ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined,
)

const fieldClass =
  'block w-full rounded-lg border bg-ink-950/60 px-3.5 text-[0.9375rem] text-fg placeholder:text-fg-subtle/70 transition-[border-color,box-shadow] duration-200 outline-none focus:border-edge/25 focus:shadow-[0_0_0_4px_rgb(242_128_62/0.12)]'
</script>

<template>
  <div>
    <label :for="id" class="mb-2 flex items-baseline justify-between gap-3 text-sm font-medium text-fg">
      {{ label }}
      <span v-if="!required" class="text-xs font-normal text-fg-subtle">Optional</span>
    </label>
    <textarea
      v-if="multiline"
      :id="id"
      v-model="model"
      :name="name"
      :rows="rows"
      :required="required"
      :placeholder="placeholder"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="describedBy"
      :class="[fieldClass, 'resize-y py-3 leading-relaxed', error ? 'border-red-400/60' : 'border-edge/10']"
    />
    <input
      v-else
      :id="id"
      v-model="model"
      :name="name"
      :type="type"
      :required="required"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :inputmode="inputmode"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="describedBy"
      :class="[fieldClass, 'h-12', error ? 'border-red-400/60' : 'border-edge/10']"
    />
    <p v-if="hint && !error" :id="`${id}-hint`" class="mt-2 text-xs text-fg-subtle">{{ hint }}</p>
    <p v-if="error" :id="`${id}-error`" class="mt-2 text-xs text-red-300">{{ error }}</p>
  </div>
</template>
