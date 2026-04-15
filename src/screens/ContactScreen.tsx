import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import NavBar from '../components/NavBar';

const { width } = Dimensions.get('window');

const LINKS = [
  { label: 'Email', value: 'muhammadagbaje85@gmail.com', url: 'mailto:muhammadagbaje85@gmail.com' },
  { label: 'LinkedIn', value: '', url: 'https://' },
  { label: 'GitHub', value: '', url: 'https://' },
];

export default function ContactScreen() {
  const opacity = useRef(new Animated.Value(0)).current;
  const y = useRef(new Animated.Value(40)).current;
  const lineAnims = LINKS.map(() => useRef(new Animated.Value(0)).current);

  useEffect(() => {
    // Fade in headline
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(y, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Stagger link lines in
    lineAnims.forEach((anim, i) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 600,
        delay: 400 + i * 100,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  const handlePress = (url: string) => {
    Linking.openURL(url).catch(() => null);
  };

  return (
    <View style={styles.root}>
      <NavBar activeRoute="Contact" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[styles.content, { opacity, transform: [{ translateY: y }] }]}
        >
          {/* Eyebrow */}
          <Text style={styles.eyebrow}>Get in touch</Text>

          {/* Headline */}
          <Text style={styles.headline}>
            Let's make{'\n'}something{'\n'}great.
          </Text>

          {/* Availability badge */}
          <View style={styles.availRow}>
            <View style={styles.availDot} />
            <Text style={styles.availText}>
              Open to new opportunities in 2026
            </Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Contact links */}
          <View style={styles.linkList}>
            {LINKS.map((link, i) => (
              <Animated.View
                key={link.label}
                style={{ opacity: lineAnims[i] }}
              >
                <TouchableOpacity
                  style={styles.linkRow}
                  onPress={() => handlePress(link.url)}
                  activeOpacity={0.6}
                >
                  <Text style={styles.linkLabel}>{link.label}</Text>
                  <Text style={styles.linkValue}>{link.value}</Text>
                  {/* Arrow */}
                  <View style={styles.arrow}>
                    <View style={styles.arrowLine} />
                    <View style={styles.arrowHead} />
                  </View>
                </TouchableOpacity>
                <View style={styles.linkDivider} />
              </Animated.View>
            ))}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>©2026 Agbaje Muhammed</Text>
            <Text style={styles.footerText}>Osun / Nigeria</Text>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  content: {
    paddingTop: 120,
    paddingHorizontal: 32,
    paddingBottom: 80,
  },
  eyebrow: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: '#c8ff65',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 24,
  },
  headline: {
    fontFamily: 'serif',
    fontSize: Math.min(width * 0.15, 88),
    color: '#f0ede6',
    fontWeight: '300',
    letterSpacing: -3,
    lineHeight: Math.min(width * 0.165, 96),
    marginBottom: 40,
  },
  availRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 48,
  },
  availDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#c8ff65',
  },
  availText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#666',
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginBottom: 8,
  },
  linkList: {
    marginBottom: 64,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 24,
    gap: 16,
  },
  linkLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: '#555',
    letterSpacing: 2,
    textTransform: 'uppercase',
    width: 80,
  },
  linkValue: {
    fontFamily: 'monospace',
    fontSize: 13,
    color: '#888',
    flex: 1,
  },
  arrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  arrowLine: {
    width: 20,
    height: 1,
    backgroundColor: '#444',
  },
  arrowHead: {
    width: 6,
    height: 6,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderColor: '#444',
    transform: [{ rotate: '45deg' }],
  },
  linkDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 32,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  footerText: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: '#333',
    letterSpacing: 1,
  },
});
