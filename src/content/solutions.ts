import type { ImageName } from './images'
import type { PhotoName } from './photos'

/**
 * Example systems we can custom-build. These are NOT products for sale,
 * and the data shown in each mock interface is illustrative only.
 */
export type Tone = 'neutral' | 'accent' | 'positive' | 'warning' | 'muted'

export interface SolutionRow {
  primary: string
  secondary: string
  status: string
  tone: Tone
  meta: string
}

export interface Solution {
  id: string
  /** Generated isometric illustration for this example system. */
  image: ImageName
  /** Real photograph of this kind of operation. */
  photo: PhotoName
  imageAlt: string
  title: string
  summary: string
  flow: string[]
  /** Label for the mock app window. */
  appLabel: string
  metrics: { label: string; value: string }[]
  columns: [string, string, string]
  rows: SolutionRow[]
  problems: string[]
}

export const solutions: Solution[] = [
  {
    id: 'equipment-fleet',
    photo: 'fleet',
    image: 'fleet',
    imageAlt: 'Isometric model of an equipment yard with containers, generators, trucks and an excavator; one telehandler is highlighted as on hire.',
    title: 'Equipment & Fleet',
    summary:
      'Know what is available, where it is, who has it, and when it needs attention, without calling around or checking three spreadsheets.',
    flow: ['Bookings', 'Availability', 'Dispatch', 'Returns', 'Maintenance'],
    appLabel: 'fleet / assets',
    metrics: [
      { label: 'Available', value: '14' },
      { label: 'On hire', value: '23' },
      { label: 'In service', value: '3' },
    ],
    columns: ['Asset', 'Status', 'Next'],
    rows: [
      { primary: 'Telehandler TH-12', secondary: 'Site B · North yard', status: 'On hire', tone: 'accent', meta: 'Returns Thu' },
      { primary: 'Generator 60 kVA', secondary: 'Depot', status: 'Available', tone: 'positive', meta: 'Ready' },
      { primary: 'Excavator 8t', secondary: 'Workshop', status: 'Service', tone: 'warning', meta: '250h check' },
      { primary: 'Van LX-04', secondary: 'Route 3', status: 'Dispatched', tone: 'neutral', meta: 'ETA 14:20' },
    ],
    problems: [
      'Double-booked equipment',
      'Missed service intervals',
      'Unclear return condition',
      'Utilisation nobody can measure',
    ],
  },
  {
    id: 'property-operations',
    photo: 'property',
    image: 'property',
    imageAlt: 'Isometric model of a block of residential buildings with one unit highlighted for a lease renewal.',
    title: 'Property Operations',
    summary:
      'Bring tenants, leases, maintenance requests, and documents into one operational view, so nothing depends on someone remembering.',
    flow: ['Tenants', 'Leases', 'Maintenance', 'Documents', 'Reporting'],
    appLabel: 'property / units',
    metrics: [
      { label: 'Occupied', value: '41' },
      { label: 'Renewals', value: '6' },
      { label: 'Open jobs', value: '9' },
    ],
    columns: ['Unit', 'Status', 'Action'],
    rows: [
      { primary: 'Unit 4B', secondary: 'Lease ends in 45 days', status: 'Renewal', tone: 'accent', meta: 'Send offer' },
      { primary: 'Unit 2A', secondary: 'Leak reported', status: 'Maintenance', tone: 'warning', meta: 'Assigned' },
      { primary: 'Unit 7C', secondary: 'Deposit received', status: 'Occupied', tone: 'positive', meta: 'Signed' },
      { primary: 'Unit 1D', secondary: 'Inspection booked', status: 'Vacant', tone: 'muted', meta: 'Mon 10:00' },
    ],
    problems: [
      'Renewals noticed too late',
      'Maintenance lost in messages',
      'Documents scattered across inboxes',
      'Owners asking for reports manually',
    ],
  },
  {
    id: 'wholesale-distribution',
    photo: 'wholesale',
    image: 'wholesale',
    imageAlt: 'Isometric model of a warehouse with racking; allocated pallets are highlighted with a route to the loading dock.',
    title: 'Wholesale & Distribution',
    summary:
      'Move from order to invoice with stock allocated correctly, deliveries planned, and billing that happens without re-typing anything.',
    flow: ['Orders', 'Inventory', 'Allocation', 'Delivery', 'Invoicing'],
    appLabel: 'orders / today',
    metrics: [
      { label: 'Orders', value: '38' },
      { label: 'Allocated', value: '31' },
      { label: 'To invoice', value: '12' },
    ],
    columns: ['Order', 'Status', 'Delivery'],
    rows: [
      { primary: 'SO-10482', secondary: '24 lines · Account 118', status: 'Allocated', tone: 'positive', meta: 'Route 2' },
      { primary: 'SO-10481', secondary: 'Short 3 SKUs', status: 'Partial', tone: 'warning', meta: 'Backorder' },
      { primary: 'SO-10479', secondary: 'Proof of delivery', status: 'Delivered', tone: 'neutral', meta: 'Invoice' },
      { primary: 'SO-10477', secondary: 'Awaiting stock', status: 'Pending', tone: 'muted', meta: 'Tue' },
    ],
    problems: [
      'Stock promised twice',
      'Orders arriving by phone, email and chat',
      'Invoices sent days after delivery',
      'No clear view of margin by customer',
    ],
  },
  {
    id: 'business-administration',
    photo: 'admin',
    image: 'admin',
    imageAlt: 'Isometric model of document stacks flowing into an approval step and a report, with the approved item highlighted.',
    title: 'Business Administration',
    summary:
      'Replace the approval emails, shared folders, and task lists with a workflow that moves work forward and records every decision.',
    flow: ['Customers', 'Approvals', 'Tasks', 'Documents', 'Reporting'],
    appLabel: 'admin / approvals',
    metrics: [
      { label: 'Pending', value: '7' },
      { label: 'Due today', value: '4' },
      { label: 'Completed', value: '52' },
    ],
    columns: ['Request', 'Status', 'Owner'],
    rows: [
      { primary: 'Credit limit increase', secondary: 'Customer onboarding', status: 'Review', tone: 'accent', meta: 'Finance' },
      { primary: 'Supplier contract', secondary: 'Document pending', status: 'Blocked', tone: 'warning', meta: 'Legal' },
      { primary: 'Refund request', secondary: 'Approved · auto-notified', status: 'Approved', tone: 'positive', meta: 'Ops' },
      { primary: 'New account setup', secondary: 'KYC checks', status: 'Queued', tone: 'muted', meta: 'Admin' },
    ],
    problems: [
      'Approvals stuck in someone’s inbox',
      'No audit trail of decisions',
      'Repeated data entry across tools',
      'Reports assembled by hand every month',
    ],
  },
]
