export interface ProcessStep {
  number: string
  title: string
  summary: string
  detail: string
  deliverables: string[]
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Understand',
    summary: 'We learn how your operation works today.',
    detail:
      'Conversations with the people who do the work, not only the people who manage it. We look at the real process, including the workarounds.',
    deliverables: ['Current-state walkthrough', 'Key people and roles', 'What success looks like'],
  },
  {
    number: '02',
    title: 'Map',
    summary: 'We identify bottlenecks, manual work, disconnected systems and opportunities.',
    detail:
      'We trace where information enters, where it gets copied, where people intervene, and where money or time is lost.',
    deliverables: ['Process map', 'Bottleneck list', 'Systems and data inventory'],
  },
  {
    number: '03',
    title: 'Design',
    summary: 'We design the simplest system that solves the actual problem.',
    detail:
      'A clear scope, a data model, and the key screens. We cut anything that does not remove a real bottleneck.',
    deliverables: ['Scope and priorities', 'Data model', 'Interface outline'],
  },
  {
    number: '04',
    title: 'Build',
    summary: 'We build incrementally so you can see progress early.',
    detail:
      'Working software in short cycles. You see and use real screens early, and feedback shapes what comes next.',
    deliverables: ['Staging environment', 'Regular demos', 'Tested, reviewed code'],
  },
  {
    number: '05',
    title: 'Deploy',
    summary: 'We put the system into real use.',
    detail:
      'Production infrastructure, data migration, access control and onboarding, so the system is adopted, not just delivered.',
    deliverables: ['Production release', 'Data migration', 'Team onboarding'],
  },
  {
    number: '06',
    title: 'Improve',
    summary: 'We continue refining the system as the business grows.',
    detail:
      'Real usage reveals the next bottleneck. We monitor, support, and extend the system as your operation changes.',
    deliverables: ['Monitoring and support', 'Iterative improvements', 'Roadmap for what’s next'],
  },
]

export const discoveryQuestions = [
  'What happens today?',
  'Where does information enter the process?',
  'Where does it get duplicated?',
  'Where do people have to intervene?',
  'Where does money get delayed?',
  'Where do mistakes happen?',
  'Where does management lack visibility?',
]
