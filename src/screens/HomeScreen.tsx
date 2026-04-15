import React, { useRef, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import NavBar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
import ProjectCard, { ProjectData } from '../components/ProjectCard';
import Preloader from '../components/Preloader';

const { width } = Dimensions.get('window');

const PROJECTS: ProjectData[] = [
  {
    id: '1',
    title: 'Neon Bank',
    category: 'Banking',
    year: '2025',
    tags: ['Product Design', 'iOS', 'Fintech'],
    color: '#1a1f3a',
    index: 1,
  },
  {
    id: '2',
    title: 'Pulse Fitness',
    category: 'Health & Fitness',
    year: '2024',
    tags: ['UX Research', 'Android', 'Wearables'],
    color: '#1a2e1a',
    index: 2,
  },
  {
    id: '3',
    title: 'Streamly',
    category: 'Streaming',
    year: '2024',
    tags: ['Design System', 'Web', 'TV'],
    color: '#2e1a1a',
    index: 3,
  },
  {
    id: '4',
    title: 'Plato Food',
    category: 'Food Tech',
    year: '2023',
    tags: ['End-to-end', 'iOS', 'Marketplace'],
    color: '#2a1f0a',
    index: 4,
  },
];

export default function HomeScreen() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.root}>
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      {preloaderDone && (
        <>
          <NavBar scrollY={scrollY} activeRoute="Home" />

          <Animated.ScrollView
            style={styles.scroll}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          >
            {/* Hero */}
            <HeroSection />

            {/* Projects section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionLabel}>Selected Work</Text>
                <Text style={styles.sectionCount}>{PROJECTS.length} Projects</Text>
              </View>

              <View style={styles.projectList}>
                {PROJECTS.map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    animDelay={i * 100}
                  />
                ))}
              </View>
            </View>

            {/* About teaser */}
            <View style={styles.aboutTeaser}>
              <View style={styles.aboutLine} />
              <Text style={styles.aboutHeadline}>
                Building apps{'\n'}that perform flawlessly.
              </Text>
              <Text style={styles.aboutBody}>
                Over 2 years of experience translating ideas into seamless, high-performance
                interfaces across web and mobile platforms.
              </Text>
            </View>

            {/* Contact section */}
            <View style={styles.contact}>
              <Text style={styles.contactEyebrow}>Get in touch</Text>
              <Text style={styles.contactHeadline}>Let's work together</Text>
              <Text style={styles.contactEmail}>muhammadagbaje85@gmail.com</Text>
              <View style={styles.contactDivider} />
              <Text style={styles.contactFoot}>©2026 Agbaje Muhammed</Text>
            </View>
          </Animated.ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scroll: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 24,
    paddingBottom: 80,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
    marginBottom: 24,
  },
  sectionLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: '#555',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  sectionCount: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: '#555',
    letterSpacing: 1,
  },
  projectList: {
    gap: 16,
  },
  aboutTeaser: {
    paddingHorizontal: 32,
    paddingVertical: 80,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
    gap: 24,
  },
  aboutLine: {
    width: 40,
    height: 1,
    backgroundColor: '#c8ff65',
  },
  aboutHeadline: {
    fontFamily: 'serif',
    fontSize: Math.min(width * 0.09, 64),
    color: '#f0ede6',
    fontWeight: '300',
    letterSpacing: -2,
    lineHeight: Math.min(width * 0.1, 72),
  },
  aboutBody: {
    fontFamily: 'monospace',
    fontSize: 13,
    color: '#666',
    lineHeight: 22,
    maxWidth: 480,
  },
  contact: {
    paddingHorizontal: 32,
    paddingVertical: 80,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
    gap: 16,
  },
  contactEyebrow: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: '#c8ff65',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  contactHeadline: {
    fontFamily: 'serif',
    fontSize: Math.min(width * 0.11, 72),
    color: '#f0ede6',
    fontWeight: '300',
    letterSpacing: -2,
    lineHeight: Math.min(width * 0.12, 80),
  },
  contactEmail: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#888',
    textDecorationLine: 'underline',
    marginTop: 8,
  },
  contactDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginVertical: 24,
  },
  contactFoot: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: '#333',
    letterSpacing: 1,
  },
});
