import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  Easing,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface HeroProps {
  onScrollHint?: () => void;
}

const LINES = [
  'Frontend Developer',
  'Mobile Developer',
];

export default function HeroSection({ onScrollHint }: HeroProps) {
  const lineAnims = LINES.map(() => ({
    opacity: useRef(new Animated.Value(0)).current,
    y: useRef(new Animated.Value(40)).current,
  }));

  const subOpacity = useRef(new Animated.Value(0)).current;
  const subY = useRef(new Animated.Value(20)).current;
  const scrollOpacity = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const delay = 3200; // after preloader

    lineAnims.forEach((anim, i) => {
      Animated.parallel([
        Animated.timing(anim.opacity, {
          toValue: 1,
          duration: 900,
          delay: delay + i * 160,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(anim.y, {
          toValue: 0,
          duration: 900,
          delay: delay + i * 160,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    });

    Animated.parallel([
      Animated.timing(subOpacity, {
        toValue: 1,
        duration: 700,
        delay: delay + 500,
        useNativeDriver: true,
      }),
      Animated.timing(subY, {
        toValue: 0,
        duration: 700,
        delay: delay + 500,
        useNativeDriver: true,
      }),
    ]).start();

    // Scroll indicator bounce loop
    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scrollY, { toValue: 8, duration: 800, useNativeDriver: true }),
          Animated.timing(scrollY, { toValue: 0, duration: 800, useNativeDriver: true }),
        ])
      ).start();
      Animated.timing(scrollOpacity, {
        toValue: 1,
        duration: 600,
        delay: delay + 1000,
        useNativeDriver: true,
      }).start();
    }, delay);
  }, []);

  return (
    <View style={styles.hero}>
      {/* Background noise texture overlay */}
      <View style={styles.noise} />

      {/* Ambient glow */}
      <View style={styles.glow} />

      {/* Main headline */}
      <View style={styles.headlineWrap}>
        {LINES.map((line, i) => (
          <View key={i} style={styles.lineClip}>
            <Animated.Text
              style={[
                styles.headline,
                {
                  opacity: lineAnims[i].opacity,
                  transform: [{ translateY: lineAnims[i].y }],
                },
              ]}
            >
              {line}
            </Animated.Text>
          </View>
        ))}
      </View>

      {/* Sub info row */}
      <Animated.View
        style={[styles.subRow, { opacity: subOpacity, transform: [{ translateY: subY }] }]}
      >
        <View style={styles.subLeft}>
          <Text style={styles.subLabel}>Based in</Text>
          <Text style={styles.subValue}>Nigeria / Osun</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.subRight}>
          <Text style={styles.subLabel}>Experience</Text>
          <Text style={styles.subValue}>2+ Years</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.subRight}>
          <Text style={styles.subLabel}>Domains</Text>
          <Text style={styles.subValue}>Fintech · Health · E-commerce</Text>
        </View>
      </Animated.View>

      {/* Scroll indicator */}
      <Animated.View
        style={[
          styles.scrollIndicator,
          { opacity: scrollOpacity, transform: [{ translateY: scrollY }] },
        ]}
      >
        <View style={styles.scrollLine} />
        <Text style={styles.scrollText}>Scroll</Text>
      </Animated.View>

      {/* Year tag */}
      <Text style={styles.yearTag}>©2026</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: height,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    paddingHorizontal: 32,
    overflow: 'hidden',
  },
  noise: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.03,
    backgroundColor: '#888',
  },
  glow: {
    position: 'absolute',
    top: height * 0.1,
    right: -100,
    width: 500,
    height: 500,
    borderRadius: 250,
    backgroundColor: 'rgba(200, 255, 101, 0.04)',
  },
  headlineWrap: {
    marginBottom: 56,
  },
  lineClip: {
    overflow: 'hidden',
  },
  headline: {
    fontSize: Math.min(width * 0.13, 96),
    color: '#f0ede6',
    fontFamily: 'serif',
    fontWeight: '300',
    lineHeight: Math.min(width * 0.14, 105),
    letterSpacing: -3,
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    flexWrap: 'wrap',
  },
  subLeft: {
    gap: 4,
  },
  subRight: {
    gap: 4,
  },
  subLabel: {
    fontFamily: 'monospace',
    fontSize: 9,
    color: '#555',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  subValue: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#888',
    letterSpacing: 0.5,
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: 40,
    left: 32,
    alignItems: 'center',
    gap: 10,
  },
  scrollLine: {
    width: 1,
    height: 48,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  scrollText: {
    fontFamily: 'monospace',
    fontSize: 9,
    color: '#555',
    letterSpacing: 2,
    textTransform: 'uppercase',
    transform: [{ rotate: '90deg' }],
    marginTop: 12,
  },
  yearTag: {
    position: 'absolute',
    bottom: 40,
    right: 32,
    fontFamily: 'monospace',
    fontSize: 10,
    color: '#333',
    letterSpacing: 1,
  },
});
