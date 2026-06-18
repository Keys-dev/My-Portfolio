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
  link?: string;
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

    link: "vital-sync-iot.vercel.app",

    description: `A bridge between patients and the people caring for them. Pulls in real-time vitals from connected sensors, flags anything that needs attention, and gives doctors and family members a shared, live view of what's going on — built to make remote monitoring feel less like a guessing game.`,
  },
  {
    id: '2',
    title: 'Pokedex',
    category: 'Thesarus',
    year: '2024',
    tags: ['Mobile', 'API Integration', 'UI/UX'],
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

  link: "pok-dex-blue.vercel.app",

  description: `A sleek, modern Pokédex built with React Native and Expo. Browse the first generation of Pokémon, search by name, and tap any card to view detailed stats, types, and sprites — all powered by the PokéAPI.`,
  },
  {
    id: '3',
    title: 'Tempo',
    category: 'Reminder',
    year: '2024',
    tags: ['Web', 'Productivity', 'Behavioral Design'],
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

    link: "tempo-vo.vercel.app",
    description: `A task and reminder manager that actually nags you the right amount — organizes what's urgent, what's overdue, and what can wait, so nothing slips through because it got buried in a list.`,
  },
  {
    id: '4',
    title: 'ArchiveX',
    category: 'Record Tracking',
    year: '2025',
    tags: [' Web', 'UI/UX', 'Productivity'],
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

    link: "archivex-vo.vercel.app",

    description: `A digital home for your physical filing system. Track where every document, folder, and box actually lives, search across locations and notes in seconds, and stop relying on memory (or sticky notes) to find things.`,
  },
];
