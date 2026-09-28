<script setup lang="ts">
import { computed, nextTick, reactive, ref } from 'vue'
import { Mail, CheckCircle2, ArrowRight, Loader2 } from 'lucide-vue-next'
import { usePageMeta } from '@/composables/usePageMeta'
import FormField from '@/components/ui/FormField.vue'
import AppButton from '@/components/ui/AppButton.vue'
import PageHero from '@/components/sections/PageHero.vue'
import { site } from '@/config/site'
import { partnership } from '@/content/company'

usePageMeta({
  title: 'Contact',
  description:
    'Have something worth building? Tell SOFORR about the problem, opportunity or idea. We work selectively with organisations that have important problems worth solving.',
})

const kinds = [...partnership.areas, 'Something else'] as const

const form = reactive({
  name: '',
  email: '',
  organisation: '',
  kind: '' as string,
  idea: '',
  stage: '',
  other: '',
  // Honeypot: real people never see or fill this field.
  fax: '',
})

type Field = keyof typeof form
const errors = reactive<Partial<Record<Field, string>>>({})
const status = ref<'idle' | 'sending' | 'sent' | 'mailto' | 'error'>('idle')

const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined

const labels: Record<Exclude<Field, 'fax'>, string> = {
  name: 'Name',
  email: 'Email',
  organisation: 'Company or organisation',
  kind: 'Area',
  idea: 'The problem, opportunity or idea',
  stage: 'Where is it today?',
  other: 'Anything else we should know?',
}

function validate() {
  for (const k of Object.keys(errors) as Field[]) delete errors[k]
  if (!form.name.trim()) errors.name = 'Please tell us your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Please enter a valid email address.'
  if (!form.idea.trim()) errors.idea = 'A few sentences is plenty.'
  return Object.keys(errors).length === 0
}

const messageBody = computed(() =>
  (Object.keys(labels) as (keyof typeof labels)[])
    .filter((k) => form[k].trim())
    .map((k) => `${labels[k]}\n${form[k].trim()}`)
    .join('\n\n'),
)

async function submit(e: Event) {
  if (!validate()) {
    await nextTick()
    const first = (e.target as HTMLFormElement).querySelector<HTMLElement>('[aria-invalid="true"]')
    first?.focus()
    return
  }
  if (form.fax) {
    status.value = 'sent'
    return
  }

  if (!endpoint) {
    // No backend configured: open the visitor's email client with everything pre-filled.
    const subject = `SOFORR — ${form.organisation.trim() || form.name.trim()}`
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(messageBody.value)}`
    status.value = 'mailto'
    return
  }

  status.value = 'sending'
  try {
    const { fax: _fax, ...payload } = form
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error(String(res.status))
    status.value = 'sent'
  } catch {
    status.value = 'error'
  }
}

const nextSteps = [
  { title: 'We read it properly', body: 'Every message is read by the people who would build it.' },
  { title: 'We reply with questions', body: 'Usually a few, to understand the problem and who it affects.' },
  { title: 'We decide together', body: 'If it is a good fit, we suggest a first step. If not, we say so.' },
]
</script>

<template>
  <div>
    <PageHero
      label="Contact"
      title="Have something worth building?"
      lede="Tell us about the problem, opportunity or idea. Alongside our own products, we work selectively with organisations that have important problems worth solving. You don’t need a specification."
      photo="team"
    />

    <section class="container-page grid grid-cols-1 gap-14 py-20 sm:py-28 lg:grid-cols-12 lg:gap-12" aria-label="Contact form">
      <div class="lg:col-span-4">
        <div class="lg:sticky lg:top-28">
          <ol class="space-y-6 border-l border-edge/[0.1] pl-6">
            <li v-for="(s, i) in nextSteps" :key="s.title" class="relative">
              <span class="absolute top-1.5 -left-[27.5px] size-1.5 rounded-full bg-fg-subtle" aria-hidden="true" />
              <p class="text-sm font-medium text-fg"><span class="mr-2 font-mono text-xs text-fg-subtle">0{{ i + 1 }}</span>{{ s.title }}</p>
              <p class="mt-1 text-sm text-fg-muted">{{ s.body }}</p>
            </li>
          </ol>

          <div class="mt-10 flex items-center gap-4 border border-edge/[0.1] p-4">
            <span class="grid size-10 shrink-0 place-items-center border border-edge/10 bg-edge/[0.03]">
              <Mail class="size-4 text-fg-muted" aria-hidden="true" />
            </span>
            <div class="min-w-0">
              <p class="text-xs text-fg-subtle">Prefer email?</p>
              <a :href="`mailto:${site.email}`" class="block truncate font-medium text-fg underline-offset-4 hover:underline">{{ site.email }}</a>
            </div>
          </div>
          <p class="mt-6 font-mono text-xs text-fg-subtle">{{ site.originShort }}</p>
        </div>
      </div>

      <div class="lg:col-span-8">
        <div class="panel p-5 sm:p-10">
          <div v-if="status === 'sent' || status === 'mailto'" class="py-10 text-center" role="status" aria-live="polite">
            <CheckCircle2 class="mx-auto size-10 text-positive" aria-hidden="true" />
            <h2 class="mt-5 text-2xl font-semibold tracking-tight text-fg">
              {{ status === 'sent' ? 'Thank you. Message received.' : 'Your email is ready to send.' }}
            </h2>
            <p class="mx-auto mt-3 max-w-sm text-fg-muted">
              <template v-if="status === 'sent'">We’ll read it carefully and reply personally.</template>
              <template v-else>
                We’ve opened your email app with your answers filled in. If nothing opened, write to
                <a :href="`mailto:${site.email}`" class="text-fg underline underline-offset-4">{{ site.email }}</a>.
              </template>
            </p>
            <button type="button" class="mt-8 text-sm text-fg-subtle underline-offset-4 hover:text-fg hover:underline" @click="status = 'idle'">
              Back to the form
            </button>
          </div>

          <form v-else novalidate class="space-y-10" @submit.prevent="submit">
            <fieldset class="min-w-0 space-y-5">
              <legend class="eyebrow mb-5">About you</legend>
              <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField v-model="form.name" label="Name" name="name" autocomplete="name" required :error="errors.name" />
                <FormField v-model="form.email" label="Email" name="email" type="email" inputmode="email" autocomplete="email" required :error="errors.email" />
              </div>
              <FormField v-model="form.organisation" label="Company or organisation" name="organisation" autocomplete="organization" />
            </fieldset>

            <div class="border-t border-edge/[0.08] pt-10">
            <fieldset class="min-w-0">
              <legend class="eyebrow mb-5">What is it about? <span class="ml-2 normal-case tracking-normal text-fg-subtle">Optional</span></legend>
              <div class="flex flex-wrap gap-2">
                <label
                  v-for="k in kinds"
                  :key="k"
                  :class="[
                    'cursor-pointer border px-4 py-2 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent',
                    form.kind === k ? 'border-fg bg-fg text-ink-950' : 'border-edge/15 text-fg-muted hover:border-edge/30 hover:text-fg',
                  ]"
                >
                  <input v-model="form.kind" type="radio" name="kind" :value="k" class="sr-only" />
                  {{ k }}
                </label>
              </div>
            </fieldset>
            </div>

            <div class="border-t border-edge/[0.08] pt-10">
            <fieldset class="min-w-0 space-y-5">
              <legend class="eyebrow mb-5">The problem</legend>
              <FormField v-model="form.idea" label="The problem, opportunity or idea" name="idea" multiline :rows="5" required :error="errors.idea" placeholder="What needs to exist, who is it for, and why does it matter now?" />
              <FormField v-model="form.stage" label="Where is it today?" name="stage" placeholder="e.g. An idea, a manual process, a system that has outgrown itself" />
              <FormField v-model="form.other" label="Anything else we should know?" name="other" multiline :rows="3" hint="Timelines, constraints, links: whatever is useful." />
            </fieldset>
            </div>

            <div class="absolute -left-[9999px]" aria-hidden="true">
              <label for="fax">Fax</label>
              <input id="fax" v-model="form.fax" name="fax" type="text" tabindex="-1" autocomplete="off" />
            </div>

            <div class="flex flex-col-reverse gap-4 border-t border-edge/[0.08] pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p class="text-xs leading-relaxed text-fg-subtle sm:max-w-xs">We only use your details to reply to you. No mailing lists.</p>
              <AppButton type="submit" size="lg" :disabled="status === 'sending'" class="w-full sm:w-auto">
                <Loader2 v-if="status === 'sending'" class="size-4 animate-spin" aria-hidden="true" />
                {{ status === 'sending' ? 'Sending…' : 'Start a conversation' }}
                <ArrowRight v-if="status !== 'sending'" class="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </AppButton>
            </div>
            <p v-if="status === 'error'" role="alert" class="text-sm text-red-400">
              Something went wrong sending your message. Please try again, or email
              <a :href="`mailto:${site.email}`" class="underline underline-offset-4">{{ site.email }}</a>.
            </p>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
