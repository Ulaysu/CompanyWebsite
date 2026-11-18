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
    /** Renders a <select> with these options. */
    options?: readonly { value: string; label: string }[]
  }>(),
  { type: 'text', required: false, multiline: false, rows: 4 },
)

const model = defineModel<string>({ default: '' })
const id = useId()
const describedBy = computed(() =>
  [props.hint ? `${id}-hint` : '', props.error ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined,
)

const fieldClass =
  'block w-full rounded-lg border bg-ink-950 px-3.5 text-[0.9375rem] text-fg placeholder:text-fg-subtle/70 transition-[border-color,box-shadow] duration-200 outline-none hover:border-edge/25 focus:border-accent focus:shadow-[0_0_0_3px_rgb(31_91_255/0.18)]'
</script>

<template>
  <div>
    <label :for="id" class="mb-2 flex items-baseline justify-between gap-3 text-sm font-medium text-fg">
      {{ label }}
      <span v-if="!required" class="text-xs font-normal text-fg-subtle">Optional</span>
      <span v-else class="sr-only">(required)</span>
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
      :class="[fieldClass, 'resize-y py-3 leading-relaxed', error ? 'border-red-400/60' : 'border-edge/15']"
    />
    <select
      v-else-if="options"
      :id="id"
      v-model="model"
      :name="name"
      :required="required"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="describedBy"
      :class="[fieldClass, 'h-12', error ? 'border-red-400/60' : 'border-edge/15']"
    >
      <option value="" disabled>Select…</option>
      <option v-for="o in options" :key="o.value" :value="o.value">{{ o.label }}</option>
    </select>
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
      :class="[fieldClass, 'h-12', error ? 'border-red-400/60' : 'border-edge/15']"
    />
    <p v-if="hint && !error" :id="`${id}-hint`" class="mt-2 text-xs text-fg-subtle">{{ hint }}</p>
    <p v-if="error" :id="`${id}-error`" class="mt-2 text-xs text-red-300">{{ error }}</p>
  </div>
</template>
