import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import NavBar from "../components/NavBar";

const { width } = Dimensions.get("window");

const SKILLS = [
  { group: "Languages", items: ["JavaScript", "TypeScript", "HTML", "CSS"] },
  {
    group: "Frameworks / Libs",
    items: ["React Native", "React (Vite)", "Tailwind CSS"],
  },
  { group: "Tools", items: ["Git", "GitHub"] },
];

export default function AboutScreen() {
  const insets = useSafeAreaInsets();
  const opacity = useRef(new Animated.Value(0)).current;
  const y = useRef(new Animated.Value(40)).current;

  // Smart nav logic
  const lastScrollY = useRef(0);
  const [navVisible, setNavVisible] = useState(true);

  const handleScroll = (event: any) => {
    const currentY = event.nativeEvent.contentOffset.y;
    const diff = currentY - lastScrollY.current;

    // Ignore small jittery movements (important for Web)
    if (Math.abs(diff) < 6 && currentY > 10) return;

    if (currentY < 50) {
      setNavVisible(true);
    } else if (diff > 0 && currentY > 60 && navVisible) {
      setNavVisible(false);
    } else if (diff < 0 && !navVisible) {
      setNavVisible(true);
    }

    lastScrollY.current = currentY;
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(y, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleEmail = () => {
    Linking.openURL("mailto:muhammadagbaje85@gmail.com").catch(() => null);
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <NavBar activeRoute="About" visible={navVisible} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <Animated.View
            style={[
              styles.content,
              { opacity, transform: [{ translateY: y }], paddingTop: 80 },
            ]}
          >
            {/* Headline */}
            <View style={styles.headlineBlock}>
              <View style={styles.headlineMeta}>
                <Text style={styles.metaText}>Nigerian Based</Text>
                <Text style={styles.metaText}>Software Engineer</Text>
              </View>
              <Text style={styles.headline}>
                Building digital experiences that feel human.
              </Text>
            </View>

            {/* Bio */}
            <View style={styles.bioBlock}>
              <Text style={styles.bioLabel}>About Me</Text>
              <Text style={styles.bioText}>
                I'm Agbaje Muhammed, a software engineer focused on crafting
                clean, high-performance applications. I enjoy bridging the gap
                between design and engineering—ensuring every interaction feels
                smooth and purposeful.
              </Text>
              <Text style={styles.bioText}>
                With experience across the full stack, I specialize in building
                scalable systems and polished mobile interfaces.
              </Text>
            </View>

            {/* Skills */}
            <View style={styles.skillsBlock}>
              <Text style={styles.bioLabel}>Expertise</Text>
              <View style={{ gap: 40 }}>
                {SKILLS.map((skill) => (
                  <View key={skill.group} style={styles.skillGroup}>
                    <Text style={styles.skillGroupLabel}>{skill.group}</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: 12,
                      }}
                    >
                      {skill.items.map((item) => (
                        <Text key={item} style={styles.skillItem}>
                          {item}
                        </Text>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* CTA */}
            <View style={{ marginTop: 40 }}>
              <Text style={styles.bioLabel}>Collaborate</Text>
              <TouchableOpacity style={styles.ctaBtn} onPress={handleEmail}>
                <Text style={styles.ctaBtnText}>
                  muhammadagbaje85@gmail.com
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0a0a0a" },
  content: { paddingHorizontal: 32, paddingBottom: 80, gap: 64 },
  headlineBlock: { gap: 24 },
  headline: {
    fontFamily: "serif",
    fontSize: Math.min(width * 0.13, 50),
    color: "#f0ede6",
    fontWeight: "300",
    letterSpacing: -3,
    lineHeight: Math.min(width * 0.145, 90),
  },
  headlineMeta: { gap: 6 },
  metaText: {
    fontFamily: "monospace",
    fontSize: 15,
    color: "#555",
    letterSpacing: 1,
  },
  bioBlock: { gap: 16 },
  bioLabel: {
    fontFamily: "monospace",
    fontSize: 18,
    color: "#c8ff65",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  bioText: {
    fontFamily: "monospace",
    fontSize: 15,
    color: "#777",
    lineHeight: 24,
    maxWidth: 560,
  },
  skillsBlock: { gap: 32 },
  skillGroup: { gap: 16 },
  skillGroupLabel: {
    fontFamily: "monospace",
    fontSize: 11,
    color: "#444",
    letterSpacing: 3,
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
    paddingBottom: 12,
  },
  skillItem: {
    fontFamily: "serif",
    fontSize: 20,
    color: "#f0ede6",
    fontWeight: "300",
    letterSpacing: -1,
  },
  ctaBtn: {
    marginTop: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  ctaBtnText: {
    fontFamily: "monospace",
    fontSize: 15,
    color: "#f0ede6",
  },
});
