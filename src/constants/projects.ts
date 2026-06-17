export interface ProjectData {
  id: string;
  title: string;
  category: string;
  year: string;
  color: string;
  index: number;
  image: any;
  screensImages?: any[];  // array of screenshots for carousel
  flowImage?: any;        // flow diagram
  systemImage?: any;      // system architecture diagram
  description: string;
  tags: string[];
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
    image: require('../../assets/images/vitalsync1.png'),         // hero image
    screensImages: [
    require('../../assets/images/vitalsyncscr1.png'),
    require('../../assets/images/vitalsyncscr2.png'),
    require('../../assets/images/vitalsyncscr3.png'),
  ],
  flowImage: null,
  systemImage: null,

    description: 'A comprehensive IoT-based health monitoring platform that bridges the gap between patients and clinics through real-time data streaming and predictive analytics.',
  },
  {
    id: '2',
    title: 'Pokedex',
    category: 'Thesarus',
    year: '2024',
    tags: ['UX Research', 'Android/IOS', 'Thesarus'],
    color: '#1a2e1a',
    index: 2,
    image: require('../../assets/images/pokedex1.png'),         // hero image
    screensImages: [
    require('../../assets/images/pokedexscr1.png'),
    require('../../assets/images/pokedexscr2.png'),
    require('../../assets/images/pokedexscr3.png'),
  ],
  flowImage: null,
  systemImage: null,
  description: 'A sleek, modern Pokédex built with React Native and Expo. Browse the first generation of Pokémon, search by name, and tap any card to view detailed stats, types, and sprites — all powered by the PokéAPI.',
  },
  {
    id: '3',
    title: 'Tempo',
    category: 'Reminder',
    year: '2024',
    tags: ['Design System', 'Web', 'TV'],
    color: '#2e1a1a',
    index: 3,
    image: require('../../assets/images/tempo1.png'),         // hero image
    screensImages: [
    require('../../assets/images/temposcr1.png'),
    require('../../assets/images/temposcr2.png'),
    require('../../assets/images/temposcr3.png'),
  ],
  flowImage: null,
  systemImage: null,
    description: 'A global video-on-demand streaming service optimized for low-latency delivery across various screen sizes, from smart TVs to mobile devices.',
  },
  {
    id: '4',
    title: 'ArchiveX',
    category: 'Record Tracking',
    year: '2025',
    tags: [],
    color: '#2a1f0a',
    index: 4,
    image: require('../../assets/images/archivex1.png'),         // hero image
    screensImages: [
    require('../../assets/images/archivexscr1.png'),
    require('../../assets/images/archivexscr2.png'),
    require('../../assets/images/archivexscr3.png'),
  ],
  flowImage: null,
  systemImage: null,
    description: 'A high-speed food delivery marketplace focused on local artisanal vendors, featuring real-time tracking and an intelligent recommendation engine.',
  },
];
