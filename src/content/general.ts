import type { Component } from 'vue'
import {
  Workflow,
  CreditCard,
  Boxes,
  Building2,
  Truck,
  Network,
  BarChart3,
  Plug,
} from 'lucide-vue-next'

/** Types of operational problems we solve. These are not clients. */
export const problemDomains: { label: string; icon: Component }[] = [
  { label: 'Operations', icon: Workflow },
  { label: 'Payments', icon: CreditCard },
  { label: 'Inventory', icon: Boxes },
  { label: 'Property', icon: Building2 },
  { label: 'Fleet', icon: Truck },
  { label: 'Distribution', icon: Network },
  { label: 'Reporting', icon: BarChart3 },
  { label: 'Integrations', icon: Plug },
]

/** The "messy middle" most businesses live in. */
export const manualWork = [
  'Spreadsheets',
  'Manual approvals',
  'Repeated data entry',
  'WhatsApp messages',
  'Emails',
  'Disconnected systems',
  'People checking things manually',
  'Copying information between places',
]

/** Illustrative problem statements. Not quotes from real clients. */
export const problemStatements = [
  {
    quote: 'Our team still tracks equipment availability across spreadsheets.',
    area: 'Operations',
    response: 'A single availability and booking system, updated as work happens.',
  },
  {
    quote: "We have the data, but management can't see what is happening in one place.",
    area: 'Visibility',
    response: 'An operational dashboard built on the data you already have.',
  },
  {
    quote: 'Customers pay through different channels and our team reconciles everything manually.',
    area: 'Payments',
    response: 'Payment integrations that match money to invoices automatically.',
  },
  {
    quote: 'Our existing software handles the basics, but the workflow around it is still manual.',
    area: 'Workflow',
    response: 'A workflow layer that connects to your existing tools instead of replacing them.',
  },
]

export const capabilities = [
  { group: 'Application', items: ['.NET / C#', 'ASP.NET Core', 'REST APIs', 'Authentication & authorization'] },
  { group: 'Data', items: ['PostgreSQL', 'SQL Server', 'Data and reporting'] },
  { group: 'Infrastructure', items: ['Cloud infrastructure', 'Docker', 'CI/CD'] },
  { group: 'Integration', items: ['Payment integrations', 'Third-party APIs', 'Webhooks & background jobs'] },
]

export const engineeringPrinciples = [
  {
    title: 'Built to be maintained',
    body: 'Clear architecture, tested code, and documentation, so the system stays understandable after launch.',
  },
  {
    title: 'Secure by default',
    body: 'Role-based access, audit trails, and careful handling of payments and personal data.',
  },
  {
    title: 'Yours to keep',
    body: 'You own the code and the data. No lock-in to a proprietary platform.',
  },
]
