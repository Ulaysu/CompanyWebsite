import type { Component } from 'vue'
import { AppWindow, Boxes, Cable, Sparkles } from 'lucide-vue-next'
import type { PhotoName } from './photos'

/** The company's point of view. Used on the home and about pages. */
export const manifesto = {
  statement: 'We believe world-class technology can be built anywhere. We’re building it from Africa.',
  paragraphs: [
    'For too long the story has been that important technology is designed somewhere else and delivered to Africa. We think that story is out of date. The talent is here, the ambition is here, and the problems worth solving are everywhere.',
    'So we build: our own products, and systems for the people and businesses we partner with. Every one of them is held to the standard we would expect from the best technology companies in the world.',
  ],
  /** The tension we want visitors to feel. */
  stance: ['Young company.', 'Serious ambition.', 'World-class engineering.'],
}

export interface Capability {
  id: string
  icon: Component
  title: string
  summary: string
  description: string
  examples: string[]
  photo?: PhotoName
}

export const capabilities: Capability[] = [
  {
    id: 'digital-products',
    icon: AppWindow,
    title: 'Digital products',
    summary: 'Marketplaces, platforms and customer-facing applications.',
    description:
      'Products that people choose to use. We take ideas from first version to something people depend on: product thinking, interface design and the engineering underneath.',
    examples: ['Marketplaces', 'Consumer and business platforms', 'Web and mobile-first applications', 'Customer portals'],
  },
  {
    id: 'business-systems',
    icon: Boxes,
    title: 'Business systems',
    summary: 'Operational software that runs the important parts of an organisation.',
    description:
      'Systems shaped around how an organisation actually works: operations, finance, inventory, scheduling and reporting, in one place and built to last.',
    examples: ['Operations platforms', 'Internal tools and admin', 'Inventory and order management', 'Reporting and visibility'],
  },
  {
    id: 'apis-integrations',
    icon: Cable,
    title: 'APIs & integrations',
    summary: 'Payments, data, third-party systems and the infrastructure between them.',
    description:
      'The connective tissue of modern software. Well-designed APIs, reliable integrations and payment flows that work across providers and markets.',
    examples: ['Public and internal APIs', 'Payment integrations', 'Data pipelines and sync', 'Third-party platforms'],
  },
  {
    id: 'automation-intelligence',
    icon: Sparkles,
    title: 'Automation & intelligence',
    summary: 'Software that makes operations faster and gets more useful over time.',
    description:
      'Workflows that run themselves, and systems that turn the data they collect into better decisions, applied where it creates real value rather than as decoration.',
    examples: ['Workflow automation', 'Notifications and scheduling', 'Data and analytics', 'Applied AI where it earns its place'],
  },
]

/** Our stance on software, stated once and then we move on. */
export const softwareBelief = 'Software should adapt to the way people work, not force them into someone else’s workflow.'

export const africaToWorld = {
  title: ['Built here.', 'Designed to travel.'],
  lede:
    'We are based in Africa and it shapes how we see problems. Our products and our engineering are made for global markets from the first commit, because where software is built should never decide how good it is.',
  points: [
    {
      title: 'Rooted in Africa',
      body: 'Our perspective starts here, close to some of the fastest-changing markets in the world.',
    },
    {
      title: 'Fluent in emerging markets',
      body: 'Mobile-first users, variable connectivity and many ways to pay are design inputs for us, not edge cases. Software built for them tends to be better everywhere.',
    },
    {
      title: 'Engineered for anywhere',
      body: 'Cloud infrastructure, international standards and products designed to cross borders from the start.',
    },
  ],
}

export const engineering = {
  title: 'Built to last.',
  lede:
    'Launch is the beginning. We engineer for the years after it: clear architecture, sound data, secure defaults and systems you can see into when they are running in production.',
  pillars: [
    { title: 'Architecture', body: 'Clear boundaries and simple designs that stay understandable as they grow.' },
    { title: 'APIs', body: 'Contracts designed deliberately, versioned carefully and documented properly.' },
    { title: 'Data', body: 'Relational foundations, careful modelling and migrations you can trust.' },
    { title: 'Cloud & infrastructure', body: 'Containerised, reproducible deployments that scale when they need to.' },
    { title: 'Security', body: 'Authentication, authorisation and sensible handling of payments and personal data.' },
    { title: 'Observability', body: 'Logging, metrics and alerts, so problems are found before users find them.' },
  ],
  stack: ['.NET', 'C#', 'ASP.NET Core', 'PostgreSQL', 'Vue', 'TypeScript', 'Docker', 'Cloud infrastructure'],
}

export const principles = [
  {
    title: 'Build, don’t just advise.',
    body: 'Ideas get clearer once they run. We would rather put working software in front of you than another slide deck.',
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

/** How a partnership runs. Used on the What we build page. */
export const engagement = [
  { title: 'Discover', body: 'We learn the idea, the people it serves and the constraints it lives with.' },
  { title: 'Design', body: 'We shape the product and its architecture, and agree what the first version must do.' },
  { title: 'Build', body: 'We ship working software in short cycles, so progress is visible from early on.' },
  { title: 'Run & grow', body: 'We launch, operate and keep improving it as real usage shows what matters next.' },
]

/** The founder. Used on the About page. */
export const founder = {
  name: 'Sulayman Sanyang',
  role: 'Founder & Software Engineer',
  origin: 'The Gambia',
  /** Approximate coordinates of The Gambia, shown as a quiet detail beside the portrait. */
  coordinates: '13.4° N · 16.6° W',
  statement: 'Building world-class technology from Africa, for the world.',
  bio: [
    'Sulayman Sanyang is a software engineer and founder focused on building practical technology that solves real problems and can scale beyond its place of origin.',
    'His journey began in The Gambia, where he built his foundation in computer science and software engineering. Building products, working with international teams and solving problems across different domains led him to something bigger than writing software: building technology companies that can compete globally.',
    'Today he leads the company with a simple ambition: to build exceptional technology from Africa and take it to the world.',
  ],
  /**
   * Portrait. Leave `null` until a real photo exists; the section then shows a
   * designed frame instead. To add one: `node scripts/add-founder-photo.mjs path/to/photo.jpg`,
   * then set this to 'founder'.
   */
  photo: null as 'founder' | null,
  photoAlt: 'Portrait of Sulayman Sanyang, founder of the company.',
}

/** Where the company is going. Closes the About page story before the call to action. */
export const direction = {
  title: 'Where we’re going.',
  body: 'A company that builds products used well beyond the place they were made, and proves along the way that world-class technology can come from Africa. We’re at the start of that road, building one real product at a time.',
}
