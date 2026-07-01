export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface CaseStudy {
  client: string;
  date: string;
  services: string[];
  result: string;
  screenshot: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export const services: Service[] = [
  { icon: '◐', title: 'Landing Page Design', description: 'High-converting Go High Level landing pages built to turn visitors into booked calls.' },
  { icon: '◑', title: 'Automation Builds', description: 'Workflows, email sequences, and SMS automations that nurture leads on autopilot.' },
  { icon: '◒', title: 'CRM & GHL Setup', description: 'Full Go High Level account configuration, pipelines, and integrations tailored to your business.' },
  { icon: '◓', title: 'Audit & Strategy', description: 'A deep audit of your current funnel with a clear roadmap to improve conversions.' },
];

export const caseStudies: CaseStudy[] = [
  { client: 'Acme Dental', date: '2026-01', services: ['Landing Page', 'Automation'], result: '+38% booked appointments', screenshot: '/placeholders/case-1.svg' },
  { client: 'Brightside Realty', date: '2025-11', services: ['GHL Setup', 'Automation'], result: '2.4x lead response speed', screenshot: '/placeholders/case-2.svg' },
  { client: 'Coastline Fitness', date: '2025-09', services: ['Landing Page', 'Strategy'], result: '+52% trial signups', screenshot: '/placeholders/case-3.svg' },
];

export const processSteps: ProcessStep[] = [
  { number: '01', title: 'Discover', description: 'We learn your business, goals, and current funnel gaps.' },
  { number: '02', title: 'Build', description: 'We design and build your landing pages inside Go High Level.' },
  { number: '03', title: 'Automate', description: 'We wire up follow-up sequences and CRM automations.' },
  { number: '04', title: 'Optimize', description: 'We audit results and refine for higher conversions.' },
];

export const stats: Stat[] = [
  { value: 20, suffix: '+', label: 'Clients served' },
  { value: 50, suffix: '+', label: 'Automations built' },
  { value: 3, suffix: 'x', label: 'Avg. lead response speed' },
];

export const testimonials: Testimonial[] = [
  { quote: 'Palawan Level Up rebuilt our booking funnel and our calendar filled up within two weeks.', author: 'Dr. M. Reyes', role: 'Acme Dental' },
  { quote: 'Their automations saved us hours every week. Leads get followed up instantly now.', author: 'J. Santos', role: 'Brightside Realty' },
];
