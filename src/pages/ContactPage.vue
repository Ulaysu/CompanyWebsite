<script setup lang="ts">
import { computed, nextTick, reactive, ref } from 'vue'
import { Mail, CheckCircle2, ArrowRight, Loader2 } from 'lucide-vue-next'
import { usePageMeta } from '@/composables/usePageMeta'
import FormField from '@/components/ui/FormField.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { site } from '@/config/site'

usePageMeta({
  title: 'Contact',
  description:
    "Tell us what isn't working. You don't need to know exactly what software you need — start with the problem.",
})

const form = reactive({
  name: '',
  email: '',
  company: '',
  website: '',
  business: '',
  process: '',
  difficulty: '',
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
  email: 'Work email',
  company: 'Company',
  website: 'Website',
  business: 'What does your business do?',
  process: 'What process are you trying to improve?',
  difficulty: 'What is currently difficult or manual?',
  other: 'Anything else we should know?',
}

function validate() {
  for (const k of Object.keys(errors) as Field[]) delete errors[k]
  if (!form.name.trim()) errors.name = 'Please tell us your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Please enter a valid email address.'
  if (!form.business.trim()) errors.business = 'A sentence is enough.'
  if (!form.process.trim()) errors.process = 'Which process would you like to improve?'
  if (!form.difficulty.trim()) errors.difficulty = 'What is slow, manual or unclear today?'
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
    const subject = `New conversation — ${form.company.trim() || form.name.trim()}`
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
  { title: 'We read it properly', body: 'Every message is read by the engineer who would build the system.' },
  { title: 'We reply with questions', body: 'Usually a few, to understand how the process works today.' },
  { title: 'We suggest a first step', body: 'Often a short call, then a clear view of what should be built.' },
]
</script>

<template>
  <div class="relative">
    <div aria-hidden="true" class="bg-grid mask-radial pointer-events-none absolute inset-x-0 top-0 h-[40rem] opacity-60" />

    <section class="container-page relative grid grid-cols-1 gap-14 pt-32 pb-24 sm:pt-40 sm:pb-32 lg:grid-cols-12 lg:gap-12" aria-labelledby="page-title">
      <div class="lg:col-span-5">
        <div class="lg:sticky lg:top-28">
          <p class="eyebrow flex animate-fade-up items-center gap-2"><span class="h-px w-5 bg-accent/70" aria-hidden="true" />Contact</p>
          <h1 id="page-title" class="text-gradient mt-6 animate-fade-up text-[2.375rem] leading-[1.04] font-semibold tracking-[-0.035em] [animation-delay:80ms] sm:text-6xl">
            Tell us what isn't working.
          </h1>
          <p class="lede mt-6 max-w-md animate-fade-up [animation-delay:160ms]">
            You don't need to know exactly what software you need. Start with the problem. We'll help
            you work out what should be built.
          </p>

          <ol class="mt-12 hidden space-y-6 border-l border-edge/[0.08] pl-6 lg:block">
            <li v-for="(s, i) in nextSteps" :key="s.title" class="relative">
              <span class="absolute top-1.5 -left-[27.5px] size-1.5 rounded-full bg-accent" aria-hidden="true" />
              <p class="text-sm font-medium text-fg"><span class="mr-2 font-mono text-xs text-fg-subtle">0{{ i + 1 }}</span>{{ s.title }}</p>
              <p class="mt-1 text-sm text-fg-muted">{{ s.body }}</p>
            </li>
          </ol>

          <div class="mt-10 flex items-center gap-4 rounded-xl border border-edge/[0.08] p-4">
            <span class="grid size-10 shrink-0 place-items-center rounded-lg border border-edge/10 bg-edge/[0.03]">
              <Mail class="size-4 text-fg-muted" aria-hidden="true" />
            </span>
            <div class="min-w-0">
              <p class="text-xs text-fg-subtle">Prefer email?</p>
              <a :href="`mailto:${site.email}`" class="block truncate font-medium text-fg underline-offset-4 hover:underline">{{ site.email }}</a>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-7">
        <div class="panel p-5 sm:p-8">
          <div v-if="status === 'sent' || status === 'mailto'" class="py-10 text-center" role="status" aria-live="polite">
            <CheckCircle2 class="mx-auto size-10 text-accent" aria-hidden="true" />
            <h2 class="mt-5 text-2xl font-semibold tracking-tight text-fg">
              {{ status === 'sent' ? 'Thank you — message received.' : 'Your email is ready to send.' }}
            </h2>
            <p class="mx-auto mt-3 max-w-sm text-fg-muted">
              <template v-if="status === 'sent'">We'll read it carefully and reply personally.</template>
              <template v-else>
                We've opened your email app with your answers filled in. If nothing opened, write to
                <a :href="`mailto:${site.email}`" class="text-fg underline underline-offset-4">{{ site.email }}</a>.
              </template>
            </p>
            <button type="button" class="mt-8 text-sm text-fg-subtle underline-offset-4 hover:text-fg hover:underline" @click="status = 'idle'">
              Back to the form
            </button>
          </div>

          <form v-else novalidate class="space-y-8" @submit.prevent="submit">
            <fieldset class="min-w-0 space-y-5">
              <legend class="eyebrow mb-5">About you</legend>
              <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField v-model="form.name" label="Name" name="name" autocomplete="name" required :error="errors.name" />
                <FormField v-model="form.email" label="Work email" name="email" type="email" inputmode="email" autocomplete="email" required :error="errors.email" />
                <FormField v-model="form.company" label="Company" name="company" autocomplete="organization" />
                <FormField v-model="form.website" label="Website" name="website" type="url" inputmode="url" autocomplete="url" placeholder="https://" />
              </div>
            </fieldset>

            <div class="border-t border-edge/[0.06] pt-8">
            <fieldset class="min-w-0 space-y-5">
              <legend class="eyebrow mb-5">The problem</legend>
              <FormField v-model="form.business" label="What does your business do?" name="business" multiline :rows="2" required :error="errors.business" placeholder="e.g. We rent construction equipment to contractors across three regions." />
              <FormField v-model="form.process" label="What process are you trying to improve?" name="process" multiline :rows="3" required :error="errors.process" placeholder="e.g. Bookings, dispatch and returns." />
              <FormField v-model="form.difficulty" label="What is currently difficult or manual?" name="difficulty" multiline :rows="4" required :error="errors.difficulty" placeholder="e.g. Availability lives in two spreadsheets and we double-book about once a week." />
              <FormField v-model="form.other" label="Anything else we should know?" name="other" multiline :rows="3" hint="Tools you already use, timelines, constraints — whatever is useful." />
            </fieldset>
            </div>

            <div class="absolute -left-[9999px]" aria-hidden="true">
              <label for="fax">Fax</label>
              <input id="fax" v-model="form.fax" name="fax" type="text" tabindex="-1" autocomplete="off" />
            </div>

            <div class="flex flex-col-reverse gap-4 border-t border-edge/[0.06] pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p class="text-xs leading-relaxed text-fg-subtle sm:max-w-xs">
                We only use your details to reply to you. No mailing lists.
              </p>
              <AppButton type="submit" size="lg" :disabled="status === 'sending'" class="w-full sm:w-auto">
                <Loader2 v-if="status === 'sending'" class="size-4 animate-spin" aria-hidden="true" />
                {{ status === 'sending' ? 'Sending…' : 'Start the conversation' }}
                <ArrowRight v-if="status !== 'sending'" class="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </AppButton>
            </div>
            <p v-if="status === 'error'" role="alert" class="text-sm text-red-300">
              Something went wrong sending your message. Please try again, or email
              <a :href="`mailto:${site.email}`" class="underline underline-offset-4">{{ site.email }}</a>.
            </p>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
