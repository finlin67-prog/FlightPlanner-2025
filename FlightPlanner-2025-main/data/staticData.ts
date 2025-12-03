import { City, Question, Route, Scenario } from '../types';

export const CITIES: City[] = [
  { name: 'New York City', function: 'Content Marketing', coords: [40.7128, -74.0060], region: 'NA' },
  { name: 'Los Angeles', function: 'Social Media', coords: [34.0522, -118.2437], region: 'NA' },
  { name: 'San Francisco', function: 'AI in Marketing', coords: [37.7749, -122.4194], region: 'NA' },
  { name: 'Chicago', function: 'Sales Enablement', coords: [41.8781, -87.6298], region: 'NA' },
  { name: 'Toronto', function: 'ABM', coords: [43.6532, -79.3832], region: 'NA' },
  { name: 'London', function: 'Demand Generation', coords: [51.5074, -0.1278], region: 'EU' },
  { name: 'Paris', function: 'Brand & Positioning', coords: [48.8566, 2.3522], region: 'EU' },
  { name: 'Berlin', function: 'Market Research', coords: [52.5200, 13.4050], region: 'EU' },
  { name: 'Tokyo', function: 'SEO', coords: [35.6762, 139.6503], region: 'APAC' },
  { name: 'Seoul', function: 'Video Marketing', coords: [37.5665, 126.9780], region: 'APAC' },
  { name: 'Singapore', function: 'Growth Marketing', coords: [1.3521, 103.8198], region: 'APAC' },
  { name: 'Dubai', function: 'Omnichannel', coords: [25.2048, 55.2708], region: 'MENA' },
  { name: 'Stockholm', function: 'Marketing Ops', coords: [59.3293, 18.0686], region: 'EU' },
];

export const ROUTES: Route[] = [
  { from: 'New York City', to: 'London', name: 'Content → Demand Gen', difficulty: 'Medium', miles: 1800, stops: 3 },
  { from: 'New York City', to: 'Tokyo', name: 'Content → SEO', difficulty: 'Medium', miles: 2100, stops: 2 },
  { from: 'New York City', to: 'Toronto', name: 'Content → ABM', difficulty: 'Hard', miles: 1200, stops: 4 },
  { from: 'Los Angeles', to: 'Seoul', name: 'Social → Video', difficulty: 'Easy', miles: 1500, stops: 1 },
  { from: 'London', to: 'Stockholm', name: 'Demand Gen → Ops', difficulty: 'Medium', miles: 900, stops: 2 },
  { from: 'San Francisco', to: 'Chicago', name: 'AI → Sales Enablement', difficulty: 'Hard', miles: 2200, stops: 5 },
  { from: 'Tokyo', to: 'Singapore', name: 'SEO → Growth', difficulty: 'Medium', miles: 1600, stops: 3 },
];

export const ROLES = ['CMO', 'VP Marketing', 'Director', 'Manager', 'Practitioner', 'Consultant'];
export const INDUSTRIES = ['SaaS / Tech', 'Finance', 'Healthcare', 'Manufacturing', 'Retail', 'Education', 'Other'];
export const COMPANY_SIZES = ['1-100', '100-500', '500-1000', '1000-5000', '5000+'];
export const REVENUES = ['Under $5M', '$5M - $50M', '$50M - $100M', '$100M - $500M', '$500M - $1B', '$1B+'];
export const COMPANY_TYPES = ['B2B', 'B2C', 'Both', 'Non-Profit'];
export const PURPOSES = [
  'Improve pipeline quality',
  'Reduce CAC',
  'Increase retention',
  'Launch ABM',
  'Optimize tech stack',
  'Build content engine',
  'Improve attribution',
  'Scale globally'
];

export const QUESTIONS: Question[] = [
  {
    id: 1,
    category: "Strategy & Planning",
    question: "How mature is your marketing strategy and planning process?",
    description: "Evaluate your strategic planning, goal-setting, market positioning, and competitive analysis.",
    options: [
      { label: "Not developed / Reactive only", value: 0 },
      { label: "Basic / Getting started", value: 25 },
      { label: "Defined / Structured approach", value: 50 },
      { label: "Advanced / Data-driven", value: 75 },
      { label: "World-class / Industry leading", value: 100 }
    ]
  },
  {
    id: 2,
    category: "Content & Communication",
    question: "How sophisticated is your content marketing operation?",
    description: "Assess content creation, editorial calendar, distribution channels, and performance measurement.",
    options: [
      { label: "Not developed / Reactive only", value: 0 },
      { label: "Basic / Getting started", value: 25 },
      { label: "Defined / Structured approach", value: 50 },
      { label: "Advanced / Data-driven", value: 75 },
      { label: "World-class / Industry leading", value: 100 }
    ]
  },
  {
    id: 3,
    category: "Pipeline & Growth",
    question: "How effective is your demand generation and lead nurturing?",
    description: "Evaluate lead generation, multi-channel campaigns, nurture programs, and conversion optimization.",
    options: [
      { label: "Not developed / Reactive only", value: 0 },
      { label: "Basic / Getting started", value: 25 },
      { label: "Defined / Structured approach", value: 50 },
      { label: "Advanced / Data-driven", value: 75 },
      { label: "World-class / Industry leading", value: 100 }
    ]
  },
  {
    id: 4,
    category: "Cross-Functional Collaboration",
    question: "How aligned are your sales and marketing teams?",
    description: "Measure shared goals, SLAs, handoff processes, and joint revenue accountability.",
    options: [
      { label: "Not developed / Reactive only", value: 0 },
      { label: "Basic / Getting started", value: 25 },
      { label: "Defined / Structured approach", value: 50 },
      { label: "Advanced / Data-driven", value: 75 },
      { label: "World-class / Industry leading", value: 100 }
    ]
  },
  {
    id: 5,
    category: "Process & Efficiency",
    question: "How mature are your marketing operations and processes?",
    description: "Assess process documentation, workflow automation, resource management, and operational efficiency.",
    options: [
      { label: "Not developed / Reactive only", value: 0 },
      { label: "Basic / Getting started", value: 25 },
      { label: "Defined / Structured approach", value: 50 },
      { label: "Advanced / Data-driven", value: 75 },
      { label: "World-class / Industry leading", value: 100 }
    ]
  },
  {
    id: 6,
    category: "Tools & Systems",
    question: "How optimized is your marketing technology ecosystem?",
    description: "Evaluate tool selection, integration, utilization, data flow, and tech stack ROI.",
    options: [
      { label: "Not developed / Reactive only", value: 0 },
      { label: "Basic / Getting started", value: 25 },
      { label: "Defined / Structured approach", value: 50 },
      { label: "Advanced / Data-driven", value: 75 },
      { label: "World-class / Industry leading", value: 100 }
    ]
  },
  {
    id: 7,
    category: "Measurement & Insights",
    question: "How data-driven are your marketing decisions?",
    description: "Assess data collection, analysis capabilities, attribution modeling, and predictive insights.",
    options: [
      { label: "Not developed / Reactive only", value: 0 },
      { label: "Basic / Getting started", value: 25 },
      { label: "Defined / Structured approach", value: 50 },
      { label: "Advanced / Data-driven", value: 75 },
      { label: "World-class / Industry leading", value: 100 }
    ]
  },
  {
    id: 8,
    category: "Brand Strategy",
    question: "How clear and differentiated is your brand positioning?",
    description: "Evaluate brand clarity, messaging consistency, competitive differentiation, and market perception.",
    options: [
      { label: "Not developed / Reactive only", value: 0 },
      { label: "Basic / Getting started", value: 25 },
      { label: "Defined / Structured approach", value: 50 },
      { label: "Advanced / Data-driven", value: 75 },
      { label: "World-class / Industry leading", value: 100 }
    ]
  },
  {
    id: 9,
    category: "Customer Journey",
    question: "How integrated and optimized is your customer journey?",
    description: "Assess touchpoint mapping, personalization, omnichannel consistency, and experience measurement.",
    options: [
      { label: "Not developed / Reactive only", value: 0 },
      { label: "Basic / Getting started", value: 25 },
      { label: "Defined / Structured approach", value: 50 },
      { label: "Advanced / Data-driven", value: 75 },
      { label: "World-class / Industry leading", value: 100 }
    ]
  },
  {
    id: 10,
    category: "People & Capabilities",
    question: "How capable and well-structured is your marketing team?",
    description: "Evaluate team skills, role clarity, training programs, and alignment with marketing goals.",
    options: [
      { label: "Not developed / Reactive only", value: 0 },
      { label: "Basic / Getting started", value: 25 },
      { label: "Defined / Structured approach", value: 50 },
      { label: "Advanced / Data-driven", value: 75 },
      { label: "World-class / Industry leading", value: 100 }
    ]
  }
];

export const SCENARIOS: Scenario[] = [
  {
    id: 'launch-abm',
    title: 'Launch ABM Program',
    industry: 'SaaS / Tech',
    from: 'Content Marketing',
    to: 'ABM',
    challenge: "We generate leads but struggle to land enterprise accounts",
    complexity: 3,
    timeline: '90-120 days',
    investment: '$25k-50k'
  },
  {
    id: 'scale-pipeline',
    title: 'Scale Pipeline Generation',
    industry: 'SaaS / Tech',
    from: 'Demand Generation',
    to: 'Predictive Demand Engine',
    challenge: "Pipeline is inconsistent and unpredictable",
    complexity: 4,
    timeline: '120-150 days',
    investment: '$40k-80k'
  },
  {
    id: 'optimize-martech',
    title: 'Optimize MarTech',
    industry: 'SaaS / Tech',
    from: 'Fragmented Tools',
    to: 'Integrated Ecosystem',
    challenge: "Too many tools that don't talk to each other",
    complexity: 3,
    timeline: '60-90 days',
    investment: '$10k-30k'
  },
  {
    id: 'omnichannel-retail',
    title: 'Omnichannel CX',
    industry: 'Retail',
    from: 'Siloed Channels',
    to: 'Unified Shopping',
    challenge: "Online and offline data are completely disconnected",
    complexity: 5,
    timeline: '6-9 months',
    investment: '$100k+'
  },
  {
    id: 'financial-trust',
    title: 'Trust-Based Content',
    industry: 'Finance',
    from: 'Product-Centric',
    to: 'Education-First',
    challenge: "Building authority in a crowded financial market",
    complexity: 3,
    timeline: '3-6 months',
    investment: '$30k-60k'
  },
  {
    id: 'healthcare-patient',
    title: 'Patient Engagement',
    industry: 'Healthcare',
    from: 'One-way Comms',
    to: 'Patient Community',
    challenge: "Improving patient retention through digital touchpoints",
    complexity: 4,
    timeline: '6-12 months',
    investment: '$80k+'
  },
  {
    id: 'manufacturing-digital',
    title: 'Digital Transformation',
    industry: 'Manufacturing',
    from: 'Traditional Sales',
    to: 'Digital Buying',
    challenge: "Shifting from catalog sales to online configuration",
    complexity: 5,
    timeline: '12+ months',
    investment: '$150k+'
  }
];

export const PLANE_LEVELS = [
  { max: 20, name: 'Grounded', icon: '🛬', desc: "You're on the runway, preparing for takeoff" },
  { max: 40, name: 'Puddle Jumper', icon: '🛩️', desc: "Short local flights, building foundational capabilities" },
  { max: 60, name: 'Regional Jet', icon: '✈️', desc: "Cross-regional capability with growing efficiency" },
  { max: 80, name: 'Commercial Jet', icon: '🛫', desc: "Long-haul capability with strong infrastructure" },
  { max: 100, name: 'Airbus 380', icon: '🚀', desc: "World-class capability, intercontinental reach" }
];