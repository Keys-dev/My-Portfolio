export interface ProjectData {
  id: string;
  title: string;
  category: string;
  year: string;
  tags: string[];
  color: string;
  image?: any; // For require() expressions
  index: number;
  description: string;
  role: string;
}

export const PROJECTS: ProjectData[] = [
  {
    id: '1',
    title: 'VitalSync',
    category: 'Health',
    year: '2026',
    tags: ['IoT', 'Web', 'Health'],
    color: '#1a1f3a',
    index: 1,
    image: null, // TODO: Add project image (e.g., require('../../assets/images/vitalsync.jpg'))
    description: 'A comprehensive IoT-based health monitoring platform that bridges the gap between patients and clinics through real-time data streaming and predictive analytics.',
    role: 'Lead Fullstack Developer — Architected the real-time data ingestion engine and designed the clinical dashboard for medical practitioners.',
  },
  {
    id: '2',
    title: 'Pulse Fitness',
    category: 'Health & Fitness',
    year: '2024',
    tags: ['UX Research', 'Android', 'Wearables'],
    color: '#1a2e1a',
    index: 2,
    image: null, // TODO: Add project image
    description: 'A mobile-first fitness ecosystem integrated with wearable technology to provide users with deep insights into their training performance and recovery metrics.',
    role: 'Mobile Lead — Focused on Bluetooth LE integration for wearable devices and implementing high-performance biometric visualization charts.',
  },
  {
    id: '3',
    title: 'Streamly',
    category: 'Streaming',
    year: '2024',
    tags: ['Design System', 'Web', 'TV'],
    color: '#2e1a1a',
    index: 3,
    image: null, // TODO: Add project image
    description: 'A global video-on-demand streaming service optimized for low-latency delivery across various screen sizes, from smart TVs to mobile devices.',
    role: 'Frontend Architect — Developed the core design system and optimized the custom video player for seamless performance across multiple environments.',
  },
  {
    id: '4',
    title: 'Plato Food',
    category: 'Food Tech',
    year: '2023',
    tags: ['End-to-end', 'iOS', 'Marketplace'],
    color: '#2a1f0a',
    index: 4,
    image: null, // TODO: Add project image
    description: 'A high-speed food delivery marketplace focused on local artisanal vendors, featuring real-time tracking and an intelligent recommendation engine.',
    role: 'Product Engineer — Designed the marketplace architecture and implemented the real-time order tracking system using WebSocket technology.',
  },
];
