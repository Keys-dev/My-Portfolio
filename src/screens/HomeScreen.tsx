import React, { useRef, useState } from "react";
import { Animated, Dimensions, Platform, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, View, TouchableOpacity, Linking, useWindowDimensions} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeroSection from "../components/HeroSection";
import NavBar from "../components/NavBar";
import Preloader from "../components/Preloader";
import ProjectCard from "../components/ProjectCard";
import ScrollReveal, { ScrollRevealHandle } from "../components/ScrollReveal";
import { PROJECTS } from "../constants/projects";

let hasPreloadedOnce = false;

export default function HomeScreen() {
  const { width, height: viewportH } = useWindowDimensions(); // 💡 Dynamic viewport monitoring

  const dynamicHeadlineStyle = {
    fontSize: Math.min(width * 0.09, 64),
    lineHeight: Math.min(width * 0.1, 72),
  };

  const dynamicContactHeadlineStyle = {
    fontSize: Math.min(width * 0.14, 50),
    lineHeight: Math.min(width * 0.12, 80),
  };


  const [preloaderDone, setPreloaderDone] = useState(hasPreloadedOnce);
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollYRaw = useRef(0);
  const lastScrollY = useRef(0);
  const [navVisible, setNavVisible] = useState(true);


  // Refs for each scroll-reveal section
  const sectionHeaderRef = useRef<ScrollRevealHandle>(null);
  const projectRefs = useRef<(ScrollRevealHandle | null)[]>([]);
  const aboutRef = useRef<ScrollRevealHandle>(null);
  const contactRef = useRef<ScrollRevealHandle>(null);

  const checkAllReveal = (y: number) => {
    sectionHeaderRef.current?.checkVisible(y, viewportH);
    projectRefs.current.forEach((r) => r?.checkVisible(y, viewportH));
    aboutRef.current?.checkVisible(y, viewportH);
    contactRef.current?.checkVisible(y, viewportH);
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: true,
      listener: (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const y = e.nativeEvent.contentOffset.y;
        const diff = y - lastScrollY.current;

        // Ignore small jittery movements (important for Web)
        if (Math.abs(diff) < 6 && y > 10) return;

        // Smart nav logic
        if (y < 50) {
          setNavVisible(true);
        } else if (diff > 0 && navVisible) {
          setNavVisible(false);
        } else if (diff < 0 && !navVisible) {
          setNavVisible(true);
        }

        lastScrollY.current = y;
        scrollYRaw.current = y;
        checkAllReveal(y);
      },
    },
  );

  const handleEmail = () => {
    Linking.openURL("mailto:muhammadagbaje85@gmail.com").catch(() => null);
  };

  return (
    <View style={styles.root }>
      {!preloaderDone && (
        <Preloader
          onComplete={() => {
            hasPreloadedOnce = true;
            setPreloaderDone(true);
            setTimeout(() => checkAllReveal(0), 300);
          }}
        />
      )}

      {preloaderDone && (
        <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
          <NavBar scrollY={scrollY} activeRoute="Home" visible={navVisible} />

          <Animated.ScrollView
            style={styles.scroll}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          >
            {/* Hero */}
            <HeroSection />

            {/* Projects section */}
            <View style={styles.section}>
              <ScrollReveal
                ref={sectionHeaderRef}
                delay={80}
                fromY={24}
                duration={600}
              >
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionLabel}>Selected Work</Text>
                  <Text style={styles.sectionCount}>
                    {PROJECTS.length} Projects
                  </Text>
                </View>
              </ScrollReveal>

              <View style={styles.projectList}>
                {PROJECTS.map((project, index) => (
                  <ScrollReveal
                    key={project.id}
                    ref={(el) => {
                      projectRefs.current[index] = el;
                    }}
                    delay={100 + index * 50}
                    fromY={30}
                  >
                    <ProjectCard project={project} />
                  </ScrollReveal>
                ))}
              </View>
            </View>

            {/* About teaser */}
            <ScrollReveal ref={aboutRef} delay={100} fromY={30}>
              <View style={styles.aboutTeaser}>
                <View style={styles.aboutLine} />
                <Text style={[styles.aboutHeadline, dynamicHeadlineStyle]}>
                  Turning complex problems into elegant mobile & web solutions.
                </Text>
                <Text style={styles.aboutBody}>
                  I'm a Frontend and Software Developer with a passion for building
                  high-performance, user-centric applications that make a
                  difference.
                </Text>
              </View>
            </ScrollReveal>

            {/* Contact teaser */}
            <ScrollReveal ref={contactRef} delay={100} fromY={30}>
              <View style={styles.contact}>
                <Text style={styles.contactEyebrow}>Get in touch</Text>
                <Text style={[styles.contactHeadline, dynamicContactHeadlineStyle]}>Let's work together</Text>
                <TouchableOpacity onPress={handleEmail}>
                  <Text style={styles.contactEmail}>
                    muhammadagbaje85@gmail.com
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollReveal>
          </Animated.ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0a0a0a",

    ...Platform.select({
      web: {
        minHeight: "100vh" as any,
      },
    }),
  },
  scroll: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 24,
    paddingBottom: 80,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
    marginBottom: 24,
  },
  sectionLabel: {
    fontFamily: "monospace",
    fontSize: 11,
    color: "#555",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  sectionCount: {
    fontFamily: "monospace",
    fontSize: 11,
    color: "#555",
    letterSpacing: 1,
  },
  projectList: {
    gap: 16,
  },
  aboutTeaser: {
    paddingHorizontal: 32,
    paddingVertical: 80,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
    gap: 24,
  },
  aboutLine: {
    width: 40,
    height: 1,
    backgroundColor: "#c8ff65",
  },
  aboutHeadline: {
    fontFamily: "serif",
    color: "#f0ede6",
    fontWeight: "300",
    letterSpacing: -2,
  },
  aboutBody: {
    fontFamily: "monospace",
    fontSize: 15,
    color: "#888",
    lineHeight: 24,
    maxWidth: 520,
  },
  contact: {
    paddingHorizontal: 32,
    paddingVertical: 80,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
    gap: 16,
  },
  contactEyebrow: {
    fontFamily: "monospace",
    fontSize: 18,
    color: "#c8ff65",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  contactHeadline: {
    fontFamily: "serif",
    color: "#f0ede6",
    fontWeight: "300",
    letterSpacing: -2,
  },
  contactEmail: {
    fontFamily: "monospace",
    fontSize: 16,
    color: "#f0ede6",
    marginTop: 24,
  },
  contactDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    marginVertical: 16,
  },
  contactFoot: {
    fontFamily: "monospace",
    fontSize: 10,
    color: "#333",
    letterSpacing: 1,
  },
});
