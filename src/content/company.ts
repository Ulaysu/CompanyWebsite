/**
 * SOFORR's story. The homepage tells it in this order:
 * what we do (hero) → why we exist (Duniyai ka Soforr) → what we build
 * → the work, wherever it is → how we build → engineering → partner work
 * → founder → principles.
 *
 * All copy lives here so it can be edited without touching components.
 * Only state what is true. No invented clients, users, metrics or partners.
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

export interface BuildArea {
  id: string
  title: string
  summary: string
  description: string
  examples: string[]
}

/** What SOFORR builds. Four forms of technology, not a menu of services. */
export const whatWeBuild = {
  title: 'We build technology.',
  lede: 'Sometimes it is our own product. Sometimes we build it with a partner. The common thread is ownership: of the problem, and of the outcome.',
  areas: [
    {
      id: 'products',
      title: 'Products',
      summary: 'Our own technology products, designed around real problems.',
      description:
        'We find problems we understand closely and build products that solve them properly, from the first version to something people depend on.',
      examples: ['Consumer products', 'Marketplaces', 'Mobile-first applications'],
    },
    {
      id: 'platforms',
      title: 'Platforms',
      summary: 'Technology that connects people, businesses, services and opportunities.',
      description:
        'Platforms that bring two sides together and make it easy for them to find, trust and transact with each other.',
      examples: ['Two-sided platforms', 'Booking and discovery', 'Service networks'],
    },
    {
      id: 'systems',
      title: 'Systems',
      summary: 'Operational software built around how organisations actually work.',
      description:
        'Systems shaped around the real work of an organisation: operations, inventory, scheduling, finance and reporting, in one place and built to last.',
      examples: ['Operations systems', 'Internal tools', 'Reporting and visibility'],
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure',
      summary: 'APIs, integrations, automation and technical foundations.',
      description:
        'The layer most people never see: well-designed APIs, reliable integrations, payment flows and automation that keep everything above them running.',
      examples: ['APIs', 'Payments and integrations', 'Automation and background processing'],
    },
  ] as BuildArea[],
}

/** The geography of the work. Global because of the evidence, not the adjectives. */
export const geography = {
  title: 'Built wherever the problem is.',
  lede: 'From a tourism platform originating in The Gambia to operational technology for a farm in Maine.',
  contrast: ['Different industries.', 'Different environments.', 'The same engineering discipline.'],
  next: 'More places to come.',
}

/** How we build. The same loop for our own products and for partner work. */
export const buildProcess = [
  { title: 'Understand', body: 'The actual problem, the people it affects and the constraints it has to live with. Not just the request.' },
  { title: 'Design', body: 'The right solution, and the smallest first version that proves it.' },
  { title: 'Build', body: 'Working software, in short cycles, so progress is visible early and often.' },
  { title: 'Deploy', body: 'Properly: reproducible, secure and observable from the first release.' },
  { title: 'Improve', body: 'Observe what really happens in production, then act on it. Continuously.' },
]

export interface Practice {
  title: string
  body: string
  /** The tools that do the work. Only list what we actually use. */
  tools?: string[]
}

/** Engineering, presented as practices with the tools behind them. */
export const engineering = {
  title: 'We care about what happens after launch.',
  lede: 'Launch is the start. We build systems that survive real use, evolve without being rewritten and scale when they need to.',
  practices: [
    { title: 'Architecture', body: 'Clear boundaries and simple designs that stay understandable as a system grows.', tools: ['C#', '.NET', 'ASP.NET Core'] },
    { title: 'Data', body: 'Careful relational modelling and migrations you can trust with real records.', tools: ['PostgreSQL', 'SQL Server'] },
    { title: 'APIs & integrations', body: 'Contracts designed deliberately. Integrations that fail gracefully and recover on their own.', tools: ['REST APIs', 'Webhooks', 'Third-party APIs'] },
    { title: 'Payments', body: 'Money handled with care, across providers and currencies.', tools: ['Payment integrations'] },
    { title: 'Automation', body: 'Work that should run itself, scheduled and processed reliably in the background.', tools: ['Background processing'] },
    { title: 'Delivery', body: 'Every change built, checked and shipped the same way, every time.', tools: ['Git', 'CI/CD', 'Docker'] },
    { title: 'Cloud & security', body: 'Reproducible infrastructure, sensible defaults, and personal data treated with respect.', tools: ['Cloud infrastructure'] },
    { title: 'Observability', body: 'Logs, metrics and alerts, so problems are found before users find them.' },
    { title: 'Maintainability', body: 'Code that the next engineer, and the next year, can work with.' },
  ] as Practice[],
}

/** Partner work. Selective, and framed around outcomes. */
export const partnership = {
  label: 'Partner work',
  title: 'Alongside our own products, we work with organisations that have important problems worth solving.',
  body: 'We take on partner work selectively, and treat it the way we treat our own products: we own the problem with you, build it properly and stay for what happens after launch.',
  flow: ['Problem', 'Technology', 'Outcome'],
  areas: [
    'Custom systems',
    'Operational software',
    'Automation',
    'APIs & integrations',
    'Internal platforms',
    'Payment systems',
    'Data and operational tools',
  ],
  fit: [
    'A real problem, not just a feature list',
    'People who will own the outcome with us',
    'Ambition beyond the first version',
  ],
}

export const principles = [
  { title: 'Build, don’t just advise.', body: 'The best way to understand technology is to build it.' },
  { title: 'Own the outcome.', body: 'We care about whether the system actually works.' },
  { title: 'Global standards, real-world constraints.', body: 'Good engineering has to survive reality.' },
  { title: 'Products that compound.', body: 'What we build should become more valuable over time.' },
  { title: 'Help one another.', body: 'Duniyai ka Soforr.' },
]

/** The founder. CodeDream is the person; SOFORR is the company. */
export const founder = {
  name: 'Sulayman Sanyang',
  role: 'Founder & Software Engineer',
  handle: 'CodeDream',
  origin: 'The Gambia',
  title: 'The person behind SOFORR.',
  story: [
    'Sulayman Sanyang built his foundation in computer science and software engineering in The Gambia. Online, he is known as CodeDream.',
    'He started with software: writing it, shipping products and working with international teams on problems across very different domains.',
    'The ambition grew from writing software to building technology products, and the companies that make them. SOFORR is the company he created to pursue it.',
  ],
  /** A line in the company's voice, not a quote. */
  statement: 'A founder from The Gambia, building a technology company with global ambition.',
  /**
   * Portrait. Set to `null` to show a designed placeholder frame instead.
   * To replace it: `node scripts/add-founder-photo.mjs path/to/photo.jpg`.
   */
  photo: 'founder' as 'founder' | null,
  photoAlt: 'Portrait of Sulayman Sanyang, founder of SOFORR.',
}

/** Where the company is going. Closes the About page. */
export const direction = {
  title: 'Where we’re going.',
  body: 'A technology company whose products and systems are used well beyond the place they were made. We are early on that road, and building one real thing at a time.',
}
