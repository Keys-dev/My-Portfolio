import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, Linking, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";


interface HeroProps {
  onScrollHint?: () => void;
}


const LINES = ["Frontend Developer", "Mobile Developer"];

// Path to your resume PDF — drop the file at assets/resume.pdf
const RESUME_URL = "https://tvsqevrjvnvpeifgkail.supabase.co/storage/v1/object/public/public-assets/Muhammed_Agbaje_Resume.pdf";

export default function HeroSection({ onScrollHint }: HeroProps) {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const lineAnims = LINES.map(() => ({
    opacity: useRef(new Animated.Value(0)).current,
    y: useRef(new Animated.Value(40)).current,
  }));

  const subOpacity = useRef(new Animated.Value(0)).current;
  const subY = useRef(new Animated.Value(20)).current;
  const scrollOpacity = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const resumeOpacity = useRef(new Animated.Value(0)).current;
  const resumeY = useRef(new Animated.Value(20)).current;

  const handleResumePress = () => {
    // Opens the resume in a new browser tab (web) / external viewer (mobile)
    Linking.openURL(RESUME_URL).catch(() => null);
  };

  useEffect(() => {
    const delay = 1800; // after preloader (preloader = ~1950ms total)

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

    Animated.parallel([
      Animated.timing(resumeOpacity, {
        toValue: 1,
        duration: 700,
        delay: delay + 300,
        useNativeDriver: true,
      }),
      Animated.timing(resumeY, {
        toValue: 0,
        duration: 700,
        delay: delay + 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Scroll indicator bounce loop
    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scrollY, {
            toValue: 8,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(scrollY, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
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
    <View style={[styles.hero, {
      height: height,
    }]}>
      {/* Background noise texture overlay */}
      <View style={styles.noise} />

      {/* Ambient glow */}
      <View style={[styles.glow, {
        width: width * 0.5,
        height: width * 0.5,
        borderRadius: width * 0.25,
      }]} />

      {/* Headline row — title on the left, resume button on the right */}
      <View style={[styles.headlineRow, {
        flexDirection: width > 768 ? "row" : "column",
        alignItems: width > 768 ? "flex-end" : "flex-start",
        justifyContent: "space-between",
        }
      ]}>
        <View style={styles.headlineWrap}>
          {LINES.map((line, i) => (
            <View key={i} style={styles.lineClip}>
              <Animated.Text
                style={[
                  styles.headline,
                  {
                    fontSize: Math.min(width * 0.13, 96),
                    lineHeight: Math.min(width * 0.14, 105),
                  },
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

        <Animated.View
          style={[
            styles.resumeWrap,
            {
              marginBottom: width > 768 ? 12 : 0,
              marginTop: width > 768 ? 0 : 8,
            },
            { opacity: resumeOpacity, transform: [{ translateY: resumeY }] },
          ]}
        >
          <TouchableOpacity
            style={styles.resumeBtn}
            onPress={handleResumePress}
            activeOpacity={0.8}
          >
            <Text style={styles.resumeBtnText}>Download Resume</Text>
            <View style={styles.resumeArrow} />
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Sub info row */}
      <Animated.View
        style={[
          styles.subRow,
          { opacity: subOpacity, transform: [{ translateY: subY }] },
        ]}
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
          <Text style={styles.subValue}> Health · Productivity · Tools </Text>
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
    backgroundColor: "#0a0a0a",
    justifyContent: "center",
    paddingHorizontal: 32,
    overflow: "hidden",
  },
  noise: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.03,
    backgroundColor: "#888",
  },
  glow: {
    position: "absolute",
    right: -100,
    width: 500,
    height: 500,
    borderRadius: 250,
    backgroundColor: "rgba(200, 255, 101, 0.04)",
  },
  headlineRow: {
    justifyContent: "space-between",
    marginBottom: 56,
    gap: 24,
  },
  headlineWrap: {
    flexShrink: 1,
  },
  lineClip: {
    overflow: "hidden",
  },
  headline: {
    color: "#f0ede6",
    fontFamily: "serif",
    fontWeight: "300",
    letterSpacing: -3,
  },
  resumeWrap: {
    marginBottom: 12,
  },
  resumeBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "rgba(200, 255, 101, 0.3)",
    backgroundColor: "rgba(200, 255, 101, 0.06)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 100,
  },
  resumeBtnText: {
    fontFamily: "monospace",
    fontSize: 11,
    color: "#c8ff65",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  resumeArrow: {
    width: 8,
    height: 8,
    borderTopWidth: 1.5,
    borderRightWidth: 1.5,
    borderColor: "#c8ff65",
    transform: [{ rotate: "45deg" }],
  },
  subRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    flexWrap: "wrap",
  },
  subLeft: {
    gap: 4,
  },
  subRight: {
    gap: 4,
  },
  subLabel: {
    fontFamily: "monospace",
    fontSize: 9,
    color: "#555",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  subValue: {
    fontFamily: "monospace",
    fontSize: 14,
    color: "#888",
    letterSpacing: 0.5,
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  scrollIndicator: {
    position: "absolute",
    bottom: 40,
    left: 32,
    alignItems: "center",
    gap: 10,
  },
  scrollLine: {
    width: 1,
    height: 48,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  scrollText: {
    fontFamily: "monospace",
    fontSize: 9,
    color: "#555",
    letterSpacing: 2,
    textTransform: "uppercase",
    transform: [{ rotate: "90deg" }],
    marginTop: 12,
  },
  yearTag: {
    position: "absolute",
    bottom: 40,
    right: 32,
    fontFamily: "monospace",
    fontSize: 10,
    color: "#333",
    letterSpacing: 1,
  },
});