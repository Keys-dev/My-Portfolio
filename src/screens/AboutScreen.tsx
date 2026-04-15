import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import NavBar from '../components/NavBar';

const { width } = Dimensions.get('window');

const SKILLS = [
  { group: 'Languages', items: ['JavaScript', 'TypeScript', 'HTML', 'CSS'] },
  { group: 'Frameworks / Libs', items: ['React Native', 'React (Vite)', 'Tailwind CSS'] },
  { group: 'Tools', items: ['Git', 'GitHub'] },
];

export default function AboutScreen() {
  const opacity = useRef(new Animated.Value(0)).current;
  const y = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(y, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={styles.root}>
      <NavBar activeRoute="About" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.content, { opacity, transform: [{ translateY: y }] }]}>
          {/* Headline */}
          <View style={styles.headlineBlock}>
            <Text style={styles.headline}>
              Nigeria{'\n'}raised,{'\n'}Osun based.
            </Text>
            <View style={styles.headlineMeta}>
              <Text style={styles.metaText}>Frontend Developer</Text>
              <Text style={styles.metaText}>2+ Years Experience</Text>
            </View>
          </View>

          {/* Bio */}
          <View style={styles.bioBlock}>
            <Text style={styles.bioLabel}>About</Text>
            <Text style={styles.bioText}>
              I'm Muhammed — a Frontend and Mobile Developer specializing in building
              high-performance applications that deliver seamless user experiences.
              My background spans fintech, health, and e-commerce, equipping me with
              the technical skills to solve complex challenges across diverse platforms.
            </Text>
            <Text style={styles.bioText}>
              I believe great software is invisible — it performs flawlessly,
              scales efficiently, and makes complex interactions feel effortless.
              I collaborate closely with design and product teams to turn ideas
              into reality, shipping clean and maintainable code with precision.
            </Text>
          </View>

          {/* Skills grid */}
          <View style={styles.skillsBlock}>
            {SKILLS.map((group) => (
              <View key={group.group} style={styles.skillGroup}>
                <Text style={styles.skillGroupLabel}>{group.group}</Text>
                <View style={styles.skillList}>
                  {group.items.map((skill) => (
                    <View key={skill} style={styles.skillRow}>
                      <View style={styles.skillDot} />
                      <Text style={styles.skillText}>{skill}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>

          {/* Contact CTA */}
          <View style={styles.ctaBlock}>
            <Text style={styles.ctaHeadline}>Let's make something great.</Text>
            <TouchableOpacity style={styles.ctaBtn}>
              <Text style={styles.ctaBtnText}>muhammadagbaje85@gmail.com</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0a0a0a' },
  content: { paddingTop: 100, paddingHorizontal: 32, paddingBottom: 80, gap: 64 },
  headlineBlock: { gap: 24 },
  headline: {
    fontFamily: 'serif',
    fontSize: Math.min(width * 0.13, 80),
    color: '#f0ede6',
    fontWeight: '300',
    letterSpacing: -3,
    lineHeight: Math.min(width * 0.145, 90),
  },
  headlineMeta: { gap: 6 },
  metaText: { fontFamily: 'monospace', fontSize: 11, color: '#555', letterSpacing: 1 },
  bioBlock: { gap: 16 },
  bioLabel: {
    fontFamily: 'monospace', fontSize: 9, color: '#c8ff65',
    letterSpacing: 3, textTransform: 'uppercase',
  },
  bioText: {
    fontFamily: 'monospace', fontSize: 13, color: '#777',
    lineHeight: 22, maxWidth: 520,
  },
  skillsBlock: { gap: 32 },
  skillGroup: { gap: 16 },
  skillGroupLabel: {
    fontFamily: 'monospace', fontSize: 9, color: '#444',
    letterSpacing: 3, textTransform: 'uppercase',
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)',
    paddingBottom: 12,
  },
  skillList: { gap: 10 },
  skillRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  skillDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#333' },
  skillText: { fontFamily: 'monospace', fontSize: 13, color: '#777' },
  ctaBlock: {
    gap: 20, borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)', paddingTop: 48,
  },
  ctaHeadline: {
    fontFamily: 'serif', fontSize: Math.min(width * 0.09, 52),
    color: '#f0ede6', fontWeight: '300', letterSpacing: -2,
  },
  ctaBtn: {
    alignSelf: 'flex-start',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 20, paddingVertical: 12, borderRadius: 100,
  },
  ctaBtnText: { fontFamily: 'monospace', fontSize: 12, color: '#888', letterSpacing: 0.5 },
});
