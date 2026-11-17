<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Mail, CheckCircle2, ArrowRight, Loader2, TriangleAlert } from 'lucide-vue-next'
import { usePageMeta } from '@/composables/usePageMeta'
import FormField from '@/components/ui/FormField.vue'
import AppButton from '@/components/ui/AppButton.vue'
import PageHero from '@/components/sections/PageHero.vue'
import { site } from '@/config/site'
import { enquiryTypes } from '@/content/company'

usePageMeta({
  title: 'Contact',
  description:
    'Start a project with SOFORR. Tell us about your software engineering needs: engagement type, scope, budget range and timeline. We will reply with questions and a recommended next step.',
})

const route = useRoute()

const budgets = [
  { value: 'under-10k', label: 'Under $10,000' },
  { value: '10k-50k', label: '$10,000 – $50,000' },
  { value: '50k-150k', label: '$50,000 – $150,000' },
  { value: 'over-150k', label: 'Over $150,000' },
  { value: 'unsure', label: 'Not sure yet' },
] as const
const timelines = [
  { value: 'asap', label: 'As soon as possible' },
  { value: '1-3-months', label: 'Within 1–3 months' },
  { value: '3-6-months', label: 'In 3–6 months' },
  { value: 'exploring', label: 'Just exploring' },
] as const

const form = reactive({
  name: '',
  email: '',
  company: '',
  country: '',
  engagement: '',
  description: '',
  budget: '',
  timeline: '',
  // Honeypot: real people never see or fill this field.
  fax: '',
})

// Prefill from links such as /contact?engagement=consulting. Done after mount so pre-rendered HTML stays identical.
onMounted(() => {
  const requested = String(route.query.engagement ?? '')
  const product = String(route.query.product ?? '')
  if (enquiryTypes.some((t) => t.value === requested)) form.engagement = requested
  if (product && !form.description) form.description = `I would like to discuss: ${product.replace(/-/g, ' ')}.\n\n`
})

type Field = keyof typeof form
const errors = reactive<Partial<Record<Field, string>>>({})
/**
 * idle → sending → sent (endpoint accepted it) | mailto (email app opened, not yet sent) | error.
 * `sent` is only ever set after the endpoint returns a 2xx response.
 */
const status = ref<'idle' | 'sending' | 'sent' | 'mailto' | 'error' | 'unconfigured'>('idle')

const endpoint = site.contactEndpoint
const configured = Boolean(endpoint || site.email)

const label = (list: readonly { value: string; label: string }[], v: string) => list.find((o) => o.value === v)?.label ?? v

function validate() {
  for (const k of Object.keys(errors) as Field[]) delete errors[k]
  if (!form.name.trim()) errors.name = 'Please tell us your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Please enter a valid business email address.'
  if (!form.company.trim()) errors.company = 'Please tell us your company or organisation.'
  if (!form.country.trim()) errors.country = 'Please tell us your country.'
  if (!form.engagement) errors.engagement = 'Please choose an engagement type.'
  if (form.description.trim().length < 20) errors.description = 'Please describe the project in a few sentences.'
  return Object.keys(errors).length === 0
}

const messageBody = computed(() =>
  [
    ['Name', form.name],
    ['Business email', form.email],
    ['Company', form.company],
    ['Country', form.country],
    ['Engagement type', label(enquiryTypes, form.engagement)],
    ['Budget range', form.budget ? label(budgets, form.budget) : ''],
    ['Desired timeline', form.timeline ? label(timelines, form.timeline) : ''],
    ['Project description', form.description],
  ]
    .filter(([, v]) => v.trim())
    .map(([k, v]) => `${k}\n${v.trim()}`)
    .join('\n\n'),
)

async function submit(e: Event) {
  if (!validate()) {
    await nextTick()
    ;(e.target as HTMLFormElement).querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
    return
  }
  // A filled honeypot is a bot. Pretend nothing happened, but never tell a real person we sent anything.
  if (form.fax) return

  if (endpoint) {
    status.value = 'sending'
    try {
      const { fax: _fax, ...payload } = form
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...payload,
          engagementLabel: label(enquiryTypes, form.engagement),
          budgetLabel: form.budget ? label(budgets, form.budget) : '',
          timelineLabel: form.timeline ? label(timelines, form.timeline) : '',
          source: 'sofforr-website',
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      status.value = 'sent'
    } catch {
      status.value = 'error'
    }
    return
  }

  if (site.email) {
    // No backend configured: open the visitor's email client with everything pre-filled.
    const subject = `Project enquiry: ${form.company.trim()}`
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(messageBody.value)}`
    status.value = 'mailto'
    return
  }

  // Neither a form endpoint nor an email address is configured: do not pretend anything was sent.
  status.value = 'unconfigured'
}

const nextSteps = [
  { title: 'We read it properly', body: 'Every enquiry is read by the engineers who would deliver the work.' },
  { title: 'We reply with questions', body: 'Usually a few, to understand the problem, the constraints and what success looks like.' },
  { title: 'We recommend a next step', body: 'An engagement model, an approach and a clear way forward. If we are not the right fit, we say so.' },
]
</script>

<template>
  <div>
    <PageHero
      label="Contact"
      title="Start a project."
      lede="Tell us what you need built, improved or reviewed. Share the engagement type, scope, budget range and timeline you have in mind, and we will reply with questions and a recommended next step. You don’t need a full specification."
      photo="team"
    />

    <section class="container-page grid grid-cols-1 gap-14 py-20 sm:py-28 lg:grid-cols-12 lg:gap-12" aria-label="Project enquiry">
      <div class="lg:col-span-4">
        <div class="lg:sticky lg:top-28">
          <ol class="space-y-6 border-l border-edge/[0.1] pl-6">
            <li v-for="(s, i) in nextSteps" :key="s.title" class="relative">
              <span class="absolute top-1.5 -left-[27.5px] size-1.5 rounded-full bg-fg-subtle" aria-hidden="true" />
              <p class="text-sm font-medium text-fg"><span class="mr-2 font-mono text-xs text-fg-subtle">0{{ i + 1 }}</span>{{ s.title }}</p>
              <p class="mt-1 text-sm text-fg-muted">{{ s.body }}</p>
            </li>
          </ol>

          <div v-if="site.email" class="mt-10 flex items-center gap-4 border border-edge/[0.1] p-4">
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
        <div v-if="!configured" role="note" class="mb-6 flex gap-3 border border-warning/40 bg-warning/[0.06] p-4 text-sm leading-relaxed text-fg">
          <TriangleAlert class="mt-0.5 size-4 shrink-0 text-warning" aria-hidden="true" />
          <p>
            <strong class="font-medium">The enquiry form is not connected yet.</strong>
            Backend integration is still required (set <code class="font-mono text-xs">VITE_CONTACT_ENDPOINT</code> or <code class="font-mono text-xs">VITE_CONTACT_EMAIL</code> when building the site). Submitting will not send your enquiry.
          </p>
        </div>

        <div class="panel p-5 sm:p-10">
          <div v-if="status === 'sent' || status === 'mailto'" class="py-10 text-center" role="status" aria-live="polite">
            <CheckCircle2 class="mx-auto size-10 text-positive" aria-hidden="true" />
            <h2 class="mt-5 text-2xl font-semibold tracking-tight text-fg">
              {{ status === 'sent' ? 'Thank you. Your enquiry has been received.' : 'Your email is ready to send.' }}
            </h2>
            <p class="mx-auto mt-3 max-w-sm text-fg-muted">
              <template v-if="status === 'sent'">We will read it carefully and reply by email.</template>
              <template v-else>
                We opened your email app with your answers filled in. It has not been sent until you send it. If nothing opened, write to
                <a :href="`mailto:${site.email}`" class="text-fg underline underline-offset-4">{{ site.email }}</a>.
              </template>
            </p>
            <button type="button" class="mt-8 text-sm text-fg-subtle underline-offset-4 hover:text-fg hover:underline" @click="status = 'idle'">Back to the form</button>
          </div>

          <form v-else novalidate class="space-y-10" @submit.prevent="submit">
            <fieldset class="min-w-0 space-y-5">
              <legend class="eyebrow mb-5">About you</legend>
              <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField v-model="form.name" label="Name" name="name" autocomplete="name" required :error="errors.name" />
                <FormField v-model="form.email" label="Business email" name="email" type="email" inputmode="email" autocomplete="email" required :error="errors.email" />
                <FormField v-model="form.company" label="Company" name="company" autocomplete="organization" required :error="errors.company" />
                <FormField v-model="form.country" label="Country" name="country" autocomplete="country-name" required :error="errors.country" />
              </div>
            </fieldset>

            <div class="border-t border-edge/[0.08] pt-10">
            <fieldset class="min-w-0 space-y-5">
              <legend class="eyebrow mb-5">The project</legend>
              <FormField v-model="form.engagement" label="Engagement type" name="engagement" :options="enquiryTypes" required :error="errors.engagement" hint="Not sure? Choose “Not sure yet” and we will recommend one." />
              <FormField v-model="form.description" label="Project description" name="description" multiline :rows="6" required :error="errors.description" placeholder="What needs to exist or improve, who is it for, and what does success look like?" />
              <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField v-model="form.budget" label="Budget range" name="budget" :options="budgets" />
                <FormField v-model="form.timeline" label="Desired timeline" name="timeline" :options="timelines" />
              </div>
            </fieldset>
            </div>

            <div class="absolute -left-[9999px]" aria-hidden="true">
              <label for="fax">Fax</label>
              <input id="fax" v-model="form.fax" name="fax" type="text" tabindex="-1" autocomplete="off" />
            </div>

            <div class="flex flex-col-reverse gap-4 border-t border-edge/[0.08] pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p class="text-xs leading-relaxed text-fg-subtle sm:max-w-xs">We only use your details to reply to your enquiry. No mailing lists.</p>
              <AppButton type="submit" size="lg" :disabled="status === 'sending'" class="w-full sm:w-auto">
                <Loader2 v-if="status === 'sending'" class="size-4 animate-spin" aria-hidden="true" />
                {{ status === 'sending' ? 'Sending…' : 'Send enquiry' }}
                <ArrowRight v-if="status !== 'sending'" class="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </AppButton>
            </div>
            <p v-if="status === 'error'" role="alert" class="text-sm text-red-400">
              Something went wrong sending your enquiry, and it has not been sent.
              <template v-if="site.email">Please try again, or email <a :href="`mailto:${site.email}`" class="underline underline-offset-4">{{ site.email }}</a>.</template>
              <template v-else>Please try again later.</template>
            </p>
            <p v-if="status === 'unconfigured'" role="alert" class="text-sm text-red-400">
              Your enquiry has not been sent: this site’s enquiry form is not yet connected to a backend.
            </p>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
