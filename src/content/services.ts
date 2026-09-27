export type ServiceVisualKind = 'systems' | 'integrations' | 'operations'

export interface Service {
  id: string
  number: string
  title: string
  summary: string
  description: string
  examples: string[]
  outcomes: string[]
  visual: ServiceVisualKind
}

export const services: Service[] = [
  {
    id: 'custom-business-systems',
    number: '01',
    title: 'Custom Business Systems',
    summary: "Build software for processes that don't fit existing tools.",
    description:
      'When the way you work has outgrown spreadsheets and off-the-shelf tools, we design and build the system that fits: the screens your team uses every day, the rules behind them, and the data model that holds it together.',
    examples: [
      'Internal dashboards',
      'Admin portals',
      'Customer portals',
      'Workflow management',
      'Booking systems',
      'Inventory systems',
      'Reporting systems',
      'Approval workflows',
    ],
    outcomes: ['One source of truth', 'Fewer handoffs', 'Clear ownership of each step'],
    visual: 'systems',
  },
  {
    id: 'automation-integrations',
    number: '02',
    title: 'Automation & Integrations',
    summary: 'Connect the systems your business already uses.',
    description:
      'Most businesses already pay for good software. The cost is in the gaps between it. We connect your tools through APIs, move data automatically, and trigger the right action at the right time, so people stop copying information from one place to another.',
    examples: [
      'Payment integrations',
      'APIs',
      'Third-party integrations',
      'Notifications',
      'Data synchronization',
      'Automated workflows',
      'Document generation',
    ],
    outcomes: ['No re-keying of data', 'Faster payment cycles', 'Fewer silent failures'],
    visual: 'integrations',
  },
  {
    id: 'operational-software',
    number: '03',
    title: 'Operational Software',
    summary: 'Turn complex day-to-day operations into a single system.',
    description:
      'Some businesses run on dozens of moving parts: assets, people, locations, schedules, and money. We build operational software that models all of it, so the team works from one place and management can see what is actually happening.',
    examples: [
      'Fleet & equipment operations',
      'Property operations',
      'Wholesale operations',
      'Order management',
      'Maintenance workflows',
      'Scheduling',
      'Financial/admin workflows',
    ],
    outcomes: ['Real-time operational view', 'Predictable scheduling', 'Accountability built in'],
    visual: 'operations',
  },
]
