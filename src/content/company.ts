/**
 * SOFORR's story and commercial offer.
 *
 * All copy lives here so it can be edited without touching components.
 * Only state what is true. No invented clients, headcount, certifications,
 * metrics or results. Service descriptions say what SOFORR offers, not what
 * it has already delivered.
 */

/** Why SOFORR exists: the philosophy it is named after. */
export const philosophy = {
  title: 'Technology should help people move forward.',
  origin: 'Soforr is a Jola-Bulluf word. It carries the idea of helping one another, and it is the idea this company is named after.',
  body: 'Most of what people achieve, they achieve with help. Technology, at its best, is a way of giving that help to more people, in more places, than any one person could reach alone.',
  lines: [
    'Technology connects people.',
    'It removes barriers that should not be there.',
    'It helps organisations operate better.',
    'It creates opportunities.',
    'It lets people accomplish more together than they could alone.',
  ],
}

/** The two business divisions, given equal weight. */
export const divisions = [
  {
    id: 'engineering',
    index: '01',
    title: 'Engineering Services',
    summary: 'Software engineering for businesses, delivered on your terms.',
    body: 'We design, build and run software for organisations that need it done properly: custom applications, backend systems and APIs, dedicated engineering teams, cloud and DevOps, AI engineering and technical consulting.',
    points: ['Fixed-price, time-and-materials, dedicated team or consulting engagements', 'Senior engineering accountability from first call to production', 'Delivery visible at every stage'],
    cta: { label: 'Explore engineering services', to: '/engineering' },
    secondary: { label: 'Discuss a project', to: '/contact' },
  },
  {
    id: 'products',
    index: '02',
    title: 'Proprietary Products',
    summary: 'Software we own, build and commercialise ourselves.',
    body: 'SOFORR develops its own software products, independently of client work. They are funded, owned and operated by SOFORR, and they hold us to the same engineering standard we bring to every client.',
    points: ['Soforr Business OS, our flagship product', 'Kujaaburun, a travel and experiences platform', 'Each product shown with its real status'],
    cta: { label: 'Explore our products', to: '/products' },
    secondary: { label: 'Talk to us about a product', to: '/contact?engagement=product' },
  },
] as const

export interface Service {
  id: string
  title: string
  summary: string
  description: string
  /** What an engagement can include. Offer language, not claims of past delivery. */
  includes: string[]
}

/** Engineering services. */
export const services: Service[] = [
  {
    id: 'custom-software',
    title: 'Custom Software Development',
    summary: 'Business applications designed around how your organisation actually works.',
    description:
      'We build bespoke web and mobile-ready applications, internal platforms and operational systems when off-the-shelf software does not fit. We start from the problem and the people who will use the system, then deliver working software in short, reviewable cycles.',
    includes: ['Enterprise and internal business applications', 'Operations, workflow and reporting systems', 'Customer and partner-facing platforms', 'Legacy system modernisation and migration'],
  },
  {
    id: 'backend-api',
    title: 'Backend and API Engineering',
    summary: 'The reliable core behind your products: services, data and integrations.',
    description:
      'We design and build backend services, data models and APIs with clear contracts, careful relational modelling and integrations that fail gracefully and recover on their own. Our primary backend stack is C# and .NET.',
    includes: ['REST API design and implementation', 'Relational data modelling and migrations', 'Third-party, webhook and payment integrations', 'Background processing and scheduled work'],
  },
  {
    id: 'dedicated-teams',
    title: 'Dedicated Engineering Teams',
    summary: 'Engineers who work as an extension of your own team.',
    description:
      'For sustained product work we assemble an engineering team around your roadmap. The team works inside your tooling and processes, with a named point of accountability on our side for delivery and quality.',
    includes: ['Team composition shaped to your roadmap', 'Work inside your repositories, tickets and rituals', 'Regular reporting on progress and risk', 'Capacity that can grow or shrink with the work'],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud and DevOps Engineering',
    summary: 'Infrastructure and delivery pipelines you can trust in production.',
    description:
      'We build reproducible infrastructure, automated build and release pipelines and the observability to run them. The goal is that every change is built, checked and shipped the same way, every time.',
    includes: ['CI/CD pipelines and release automation', 'Containerised deployment with Docker', 'Infrastructure as code and environment management', 'Logging, metrics and alerting'],
  },
  {
    id: 'ai-automation',
    title: 'AI Engineering and Automation',
    summary: 'Practical AI features and automation, engineered like any other software.',
    description:
      'We integrate AI capabilities and automate repetitive workflows where they genuinely help, and we are plain about where they do not. AI features are built with the same testing, security and maintainability expectations as the rest of the system.',
    includes: ['Integrating language-model and AI services into applications', 'Workflow and document-processing automation', 'Evaluation, guardrails and cost control', 'Feasibility assessment before you commit to building'],
  },
  {
    id: 'architecture-consulting',
    title: 'Software Architecture and Technical Consulting',
    summary: 'Independent technical judgement before, during and after a build.',
    description:
      'We review architectures, plan systems and advise engineering leadership. Consulting can stand alone or de-risk a larger build, and it ends in written recommendations you can act on with or without us.',
    includes: ['Architecture design and review', 'Technology selection and build-versus-buy analysis', 'Code, security and delivery-practice assessments', 'Technical due diligence and roadmaps'],
  },
]

export interface EngagementModel {
  id: string
  title: string
  summary: string
  bestFor: string
  how: string[]
}

/** How clients can engage SOFORR. */
export const engagementModels: EngagementModel[] = [
  {
    id: 'fixed-price',
    title: 'Fixed-price projects',
    summary: 'Agreed scope, agreed price, agreed outcome.',
    bestFor: 'Well-understood projects with a clear scope and a defined end.',
    how: ['Scope and acceptance criteria agreed in writing', 'Delivery in reviewable milestones', 'Changes handled through an explicit change process'],
  },
  {
    id: 'time-and-materials',
    title: 'Time-and-materials projects',
    summary: 'Flexible scope, transparent effort.',
    bestFor: 'Evolving products where priorities will change as you learn.',
    how: ['Work planned in short iterations', 'You see and steer the backlog', 'Billing follows the effort actually spent, with regular reporting'],
  },
  {
    id: 'dedicated',
    title: 'Dedicated engineering engagements',
    summary: 'An engineering team committed to your product.',
    bestFor: 'Long-running product development that needs continuity and depth.',
    how: ['A team assigned to your roadmap', 'Embedded in your tools and ways of working', 'Monthly commitment that scales with the work'],
  },
  {
    id: 'consulting',
    title: 'Technical consulting',
    summary: 'Expert judgement, without a build commitment.',
    bestFor: 'Architecture decisions, technical reviews and roadmap planning.',
    how: ['A defined question or review scope', 'Hands-on analysis of your system and constraints', 'Written findings and prioritised recommendations'],
  },
]

/** Engagement values accepted by the contact form (also used as `?engagement=` query values). */
export const enquiryTypes = [
  { value: 'fixed-price', label: 'Fixed-price project' },
  { value: 'time-and-materials', label: 'Time-and-materials project' },
  { value: 'dedicated', label: 'Dedicated engineering team' },
  { value: 'consulting', label: 'Technical consulting' },
  { value: 'product', label: 'Product enquiry' },
  { value: 'not-sure', label: 'Not sure yet' },
] as const

/** Engineering delivery methodology. The same loop for client work and our own products. */
export const methodology = [
  { title: 'Understand', body: 'The actual problem, the people it affects and the constraints it has to live with, not just the request. We write down what success looks like before anything is built.' },
  { title: 'Design', body: 'The right architecture, and the smallest first release that proves it. Technical decisions are recorded with their reasons.' },
  { title: 'Build and verify', body: 'Working software in short cycles, reviewed and checked automatically, so progress is visible early and quality is not deferred to the end.' },
  { title: 'Deploy', body: 'Reproducible, secure and observable from the first release, through the same pipeline every time.' },
  { title: 'Operate and improve', body: 'We observe what really happens in production and act on it. Clients keep a named point of accountability after launch.' },
]

export interface Practice {
  title: string
  body: string
  /** The tools that do the work. Only list what we actually use. */
  tools?: string[]
}

/** Technical capabilities, with the tools behind them. */
export const capabilities: Practice[] = [
  { title: 'Architecture', body: 'Clear boundaries and simple designs that stay understandable as a system grows.', tools: ['C#', '.NET', 'ASP.NET Core'] },
  { title: 'Data', body: 'Careful relational modelling and migrations you can trust with real records.', tools: ['PostgreSQL', 'SQL Server'] },
  { title: 'APIs and integrations', body: 'Contracts designed deliberately. Integrations that fail gracefully and recover on their own.', tools: ['REST APIs', 'Webhooks', 'Third-party APIs'] },
  { title: 'Payments', body: 'Money handled with care, across providers and currencies.', tools: ['Payment integrations'] },
  { title: 'Automation', body: 'Work that should run itself, scheduled and processed reliably in the background.', tools: ['Background processing'] },
  { title: 'Delivery', body: 'Every change built, checked and shipped the same way, every time.', tools: ['Git', 'CI/CD', 'Docker'] },
  { title: 'Cloud and security', body: 'Reproducible infrastructure, sensible defaults, and personal data treated with respect.', tools: ['Cloud infrastructure'] },
  { title: 'Observability', body: 'Logs, metrics and alerts, so problems are found before users find them.' },
  { title: 'Maintainability', body: 'Code that the next engineer, and the next year, can work with.' },
]

/** Engineering principles. */
export const principles = [
  { title: 'Build, don’t just advise.', body: 'The best way to understand technology is to build it.' },
  { title: 'Own the outcome.', body: 'We are accountable for whether the system actually works, not just for delivering to a specification.' },
  { title: 'Global standards, real-world constraints.', body: 'Good engineering has to survive reality: poor connectivity, legacy systems, tight budgets.' },
  { title: 'Be honest about status.', body: 'We report progress, risk and limits as they are. Nothing is described as finished before it is.' },
  { title: 'Help one another.', body: 'Duniyai ka Soforr.' },
]

/** Company values, for the About page. */
export const values = [
  { title: 'Helping one another', body: 'The idea the company is named after. We succeed when clients, colleagues and users do.' },
  { title: 'Accountability', body: 'We take responsibility for outcomes and say plainly when something is not working.' },
  { title: 'Craft', body: 'Reliable, readable, maintainable software, built to be worked on long after launch.' },
  { title: 'Integrity', body: 'Accurate claims, honest status, and respect for client and user data.' },
  { title: 'Ambition', body: 'A company from The Gambia, held to global standards and building for the world.' },
]

/** Where SOFORR serves. Origin is The Gambia; the market is global. */
export const globalReach = {
  title: 'Founded in The Gambia. Engineering for the world.',
  lede: 'SOFORR started in The Gambia and works with businesses anywhere. Distance is a delivery discipline, not a limitation: clear communication, written decisions and visible progress.',
  points: [
    { title: 'Global market', body: 'We take engagements from businesses worldwide, in any sector where reliable software matters.' },
    { title: 'Clear delivery across distance', body: 'Written scope, regular reporting and shared tooling keep clients informed wherever they are.' },
    { title: 'One origin, one standard', body: 'Our products and our client work are held to the same engineering standard.' },
  ],
}

/** The founder. CodeDream is the online handle; SOFORR is the company. */
export const founder = {
  name: 'Sulayman Sanyang',
  role: 'Founder and CEO',
  handle: 'CodeDream',
  origin: 'The Gambia',
  title: 'The founder behind SOFORR.',
  story: [
    'Sulayman Sanyang is the Founder and CEO of SOFORR. His professional background is in software engineering: he built his foundation in computer science and software engineering in The Gambia and has written and shipped software for international teams across very different domains. Online, he is known as CodeDream.',
    'He founded SOFORR to build a software engineering company from The Gambia that serves businesses worldwide, and that also owns and develops its own products.',
  ],
  /** A line in the company's voice, not a quote. */
  statement: 'A software engineer from The Gambia, building an engineering company for the world.',
  /**
   * Portrait. Set to `null` to show a designed placeholder frame instead.
   * To replace it: `node scripts/add-founder-photo.mjs path/to/photo.jpg`.
   */
  photo: 'founder' as 'founder' | null,
  photoAlt: 'Portrait of Sulayman Sanyang, Founder and CEO of SOFORR.',
}

/** Where the company is going. */
export const direction = {
  title: 'Where we’re going.',
  body: 'A software engineering company whose services and products are used well beyond the place they were made. We are early on that road, and we build one real thing at a time.',
}
