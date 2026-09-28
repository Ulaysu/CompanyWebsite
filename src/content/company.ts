/**
 * SOFORR's story, in the order the site tells it:
 * belief → vision → what we build → products → built from Africa → how we build
 * → work with us → founder.
 *
 * All copy lives here so it can be edited without touching components.
 * Only state what is true. No invented clients, users, metrics or partners.
 */

/** 01 · Belief. The philosophy behind the name. */
export const belief = {
  title: 'Technology should help people move forward.',
  body: [
    'Soforr comes from Jola-Bulluf and is rooted in the idea of helping one another. Duniyai ka Soforr: this world is all about helping one another.',
    'We think that is exactly what technology is for.',
  ],
  /** Each line completes “Technology should …”. */
  lines: [
    'connect people.',
    'remove unnecessary barriers.',
    'help businesses operate better.',
    'create opportunities.',
    'let people build what they could not build alone.',
  ],
}

/** 02 · Vision. Why the company exists. */
export const vision = {
  statement: 'World-class technology can be imagined and built from Africa. We are building it.',
  paragraphs: [
    'SOFORR is a technology company. We build products, platforms, systems and infrastructure that solve real problems, and we hold every one of them to the standard of the best technology companies in the world.',
    'Some of what we build is our own. Some we build with ambitious people and organisations who have a problem worth solving. All of it starts from Africa, and none of it is meant to stay there.',
  ],
  stance: ['We build.', 'We experiment.', 'We solve.'],
}

export interface BuildArea {
  id: string
  title: string
  summary: string
  description: string
  examples: string[]
}

/** 03 · What we build. Four kinds of technology, not a menu of services. */
export const buildAreas: BuildArea[] = [
  {
    id: 'products',
    title: 'Products',
    summary: 'Our own technology products, designed around real problems.',
    description:
      'We find problems we understand first-hand and build products that solve them properly: from the first version to something people depend on.',
    examples: ['Consumer products', 'Marketplaces', 'Mobile-first applications'],
  },
  {
    id: 'platforms',
    title: 'Platforms',
    summary: 'Technology that connects people, businesses, services and opportunities.',
    description:
      'Platforms that bring two sides together and make it easy for them to find, trust and transact with each other, across towns and across borders.',
    examples: ['Two-sided platforms', 'Booking and discovery', 'Service networks'],
  },
  {
    id: 'systems',
    title: 'Systems',
    summary: 'Serious operational software for organisations that need more than off-the-shelf tools.',
    description:
      'Systems shaped around how an organisation actually works: operations, finance, inventory, scheduling and reporting, in one place and built to last.',
    examples: ['Operations platforms', 'Internal tools', 'Reporting and visibility'],
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure',
    summary: 'APIs, integrations, automation and the technical foundations that let organisations operate and scale.',
    description:
      'The layer most people never see: well-designed APIs, reliable integrations, payment flows and automation that keep everything above them running.',
    examples: ['APIs', 'Payments and integrations', 'Automation and background processing'],
  },
]

/** 05 · Built from Africa. Confident, not defensive. */
export const builtFromAfrica = {
  title: ['Built from Africa.', 'Designed for the world.'],
  lines: [
    'Africa is where SOFORR is rooted.',
    'The problems we encounter here sharpen how we think.',
    'The constraints force us to build differently.',
    'The opportunity is global.',
  ],
  closing:
    'SOFORR is not building technology exclusively for Africa. It is building technology from Africa that can travel anywhere.',
  points: [
    {
      title: 'Mobile first, by default',
      body: 'Most people meet software on a phone. We design for that first, and it makes products better everywhere.',
    },
    {
      title: 'Resilient to real conditions',
      body: 'Variable connectivity and many ways to pay are design inputs for us, not edge cases.',
    },
    {
      title: 'Built to cross borders',
      body: 'Cloud infrastructure, international standards and products designed to travel from the first commit.',
    },
  ],
}

/** 06 · How we build. */
export const buildProcess = [
  { title: 'Understand', body: 'The problem, the people it affects and the constraints it lives with.' },
  { title: 'Design', body: 'The product and its architecture, and what the first version must do.' },
  { title: 'Build', body: 'Working software in short cycles, so progress is visible early.' },
  { title: 'Deploy', body: 'Into production on infrastructure that is reproducible and observable.' },
  { title: 'Improve', body: 'Continuously, as real usage shows what matters next.' },
]

export const engineeringFocus = [
  { title: 'Strong architecture', body: 'Clear boundaries and simple designs that stay understandable as they grow.' },
  { title: 'Reliable APIs', body: 'Contracts designed deliberately, versioned carefully and documented properly.' },
  { title: 'Data', body: 'Relational foundations, careful modelling and migrations you can trust.' },
  { title: 'Integrations', body: 'Third-party systems connected so they fail gracefully and recover on their own.' },
  { title: 'Automation', body: 'Work that should run itself, scheduled and processed in the background.' },
  { title: 'Payments', body: 'Payment flows that work across providers and markets, handled with care.' },
  { title: 'Cloud infrastructure', body: 'Containerised, reproducible deployments that scale when they need to.' },
  { title: 'Security', body: 'Authentication, authorisation and sensible handling of money and personal data.' },
  { title: 'Observability', body: 'Logging, metrics and alerts, so problems are found before users find them.' },
  { title: 'Maintainability', body: 'Code that the next engineer, and the next year, can work with.' },
]

export const stack = [
  { group: 'Language & runtime', items: ['C#', '.NET', 'ASP.NET Core'] },
  { group: 'Data', items: ['PostgreSQL', 'SQL Server'] },
  { group: 'Interfaces', items: ['REST APIs', 'Webhooks', 'Third-party APIs', 'Payment integrations'] },
  { group: 'Delivery', items: ['Docker', 'Git', 'CI/CD', 'Cloud infrastructure', 'Background processing'] },
]

/** 07 · Work with us. Selective, not a quote form. */
export const partnership = {
  title: 'Have a problem worth building around?',
  body: [
    'Alongside our own products, SOFORR works selectively with organisations that need technology to solve meaningful operational or business problems.',
    'We build for partners the way we build for ourselves: properly, to last, and with ownership of the outcome.',
  ],
  areas: [
    { title: 'Custom systems', body: 'Software shaped around how your organisation actually works.' },
    { title: 'Business automation', body: 'Workflows that run themselves, so people can do the work only people can do.' },
    { title: 'APIs & integrations', body: 'Connecting the systems you already depend on, reliably.' },
    { title: 'Internal platforms', body: 'The tools your teams use every day, built to fit them.' },
    { title: 'Payment systems', body: 'Collecting, reconciling and moving money across providers.' },
    { title: 'Data & operational tools', body: 'Visibility into what is happening, and what to do about it.' },
  ],
  fit: [
    'A real problem, not just a feature list',
    'People who will own the outcome with us',
    'Ambition beyond the first version',
  ],
}

/** How SOFORR works, stated once. Used on the About page. */
export const principles = [
  {
    title: 'Build, don’t just advise.',
    body: 'Ideas get clearer once they run. We would rather put working software in front of people than another slide deck.',
  },
  {
    title: 'Global standards, local insight.',
    body: 'Where we come from shapes what we notice. It never lowers the bar.',
  },
  {
    title: 'Products that compound.',
    body: 'We build technology that becomes more valuable with every user, every data point and every release.',
  },
  {
    title: 'Own the outcome.',
    body: 'From the first conversation to production and beyond, we take responsibility for what we ship.',
  },
]

/** 08 · Founder. CodeDream → Founder → SOFORR. */
export const founder = {
  name: 'Sulayman Sanyang',
  role: 'Founder & Software Engineer',
  handle: 'CodeDream',
  origin: 'The Gambia',
  /** Approximate coordinates of The Gambia, shown as a quiet detail beside the portrait. */
  coordinates: '13.4° N · 16.6° W',
  chain: ['CodeDream', 'Founder', 'SOFORR'],
  story: [
    'Sulayman Sanyang is a Gambian software engineer. Online, he is known as CodeDream: the name under which he has written software, built products and worked with international teams on problems across very different domains.',
    'He built his foundation in computer science and software engineering in The Gambia. Along the way, the ambition outgrew writing software for others. The goal became building technology companies that can compete with anyone, anywhere.',
    'SOFORR is that company. It exists to build serious technology from Africa, starting with its own products, and to take it to the world.',
  ],
  statement: 'World-class technology can be imagined and built from Africa. SOFORR exists to prove it, one product at a time.',
  /**
   * Portrait. Set to `null` to show a designed placeholder frame instead.
   * To replace it: `node scripts/add-founder-photo.mjs path/to/photo.jpg`.
   */
  photo: 'founder' as 'founder' | null,
  photoAlt: 'Portrait of Sulayman Sanyang, founder of SOFORR.',
}

/** Where the company is going. Closes the About page story. */
export const direction = {
  title: 'Where we’re going.',
  body: 'A global technology company whose products are used well beyond the place they were made. We are at the start of that road, building one real product at a time.',
}
