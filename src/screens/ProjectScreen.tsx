import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { PROJECTS, ProjectData } from "../constants/projects";

const { width, height } = Dimensions.get("window");

export default function ProjectScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const project: ProjectData = route.params?.project;

  // Find index of current project to determine next
  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const nextProject = PROJECTS[currentIndex + 1];

  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerY = useRef(new Animated.Value(30)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;

  // Smart back bubble anim
  const lastScrollY = useRef(0);
  const backBtnTranslateY = useRef(new Animated.Value(0)).current;

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    const diff = y - lastScrollY.current;

    if (Math.abs(diff) < 6 && y > 10) return;

    if (y < 50) {
      Animated.timing(backBtnTranslateY, { toValue: 0, duration: 300, useNativeDriver: true }).start();
    } else if (diff > 0 && y > 100) {
      Animated.timing(backBtnTranslateY, { toValue: -150, duration: 300, useNativeDriver: true }).start();
    } else if (diff < 0) {
      Animated.timing(backBtnTranslateY, { toValue: 0, duration: 300, useNativeDriver: true }).start();
    }

    lastScrollY.current = y;
  };

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(headerOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(headerY, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  if (!project) return null;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      {/* Back button wrapper */}
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          zIndex: 10,
          transform: [{ translateY: backBtnTranslateY }],
        }}
      >
        <SafeAreaView edges={["top"]}>
          <TouchableOpacity
            style={[styles.backBtn, { top: 24 }]}
            onPress={() => navigation.goBack()}
          >
            <View style={styles.backArrow} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Animated.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Hero */}
        <Animated.View
          style={[
            styles.hero,
            { backgroundColor: project.color },
            { opacity: headerOpacity, transform: [{ translateY: headerY }] },
          ]}
        >
          {project.image && (
            <Image
              source={project.image}
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
            />
          )}
          <View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: "rgba(0,0,0,0.3)" },
            ]}
          />

          <SafeAreaView edges={["top"]}>
            <View
              style={{
                paddingHorizontal: 32,
                paddingBottom: 48,
                justifyContent: "flex-end",
                height: height * 0.55,
              }}
            >
              <Text style={styles.projectIndex}>0{project.index}</Text>
              <Text style={styles.projectTitle}>{project.title}</Text>
              <View style={styles.metaRow}>
                <Text style={styles.metaItem}>{project.category}</Text>
                <Text style={styles.metaDot}>·</Text>
                <Text style={styles.metaItem}>{project.year}</Text>
              </View>
            </View>
          </SafeAreaView>
        </Animated.View>

        {/* Content */}
        <Animated.View style={[styles.content, { opacity: contentOpacity }]}>
          {/* Overview */}
          <View style={styles.block}>
            <Text style={styles.blockLabel}>Overview</Text>
            <Text style={styles.blockText}>{project.description}</Text>
          </View>

          {/* Tags */}
          <View style={styles.block}>
            <Text style={styles.blockLabel}>Disciplines</Text>
            <View style={styles.tagRow}>
              {project.tags.map((tag) => (
                <View key={tag} style={styles.tagChip}>
                  <Text style={styles.tagChipText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Scope image placeholders */}
          <View style={styles.imageGrid}>
            <View
              style={[
                styles.imageBlock,
                { backgroundColor: project.color, height: 260 },
              ]}
            >
              <Text style={styles.imagePlaceholderText}>Screens / UI</Text>
            </View>
            <View style={styles.imageRow}>
              <View
                style={[styles.imageSmall, { backgroundColor: project.color }]}
              >
                <Text style={styles.imagePlaceholderText}>Flow</Text>
              </View>
              <View style={[styles.imageSmall, { backgroundColor: "#1a1a1a" }]}>
                <Text style={styles.imagePlaceholderText}>System</Text>
              </View>
            </View>
          </View>

          {/* Role */}
          <View style={styles.block}>
            <Text style={styles.blockLabel}>Role</Text>
            <Text style={styles.blockText}>{project.role}</Text>
          </View>

          {/* Next project */}
          {nextProject && (
            <TouchableOpacity
              style={styles.nextBtn}
              onPress={() =>
                navigation.push("Project", { project: nextProject })
              }
            >
              <View>
                <Text style={styles.nextLabel}>Next Project</Text>
                <Text style={styles.nextTitle}>{nextProject.title}</Text>
              </View>
              <View style={styles.nextArrow} />
            </TouchableOpacity>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  backBtn: {
    marginLeft: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  backArrow: {
    width: 10,
    height: 10,
    borderLeftWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: "#888",
    transform: [{ rotate: "45deg" }],
  },
  backText: {
    fontFamily: "monospace",
    fontSize: 12,
    color: "#888",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  hero: {
    height: height * 0.55,
  },
  projectIndex: {
    fontFamily: "monospace",
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
    letterSpacing: 2,
    marginBottom: 16,
  },
  projectTitle: {
    fontFamily: "serif",
    fontSize: Math.min(width * 0.14, 80),
    color: "#f0ede6",
    fontWeight: "300",
    letterSpacing: -2,
    lineHeight: Math.min(width * 0.15, 88),
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 16,
  },
  metaItem: {
    fontFamily: "monospace",
    fontSize: 11,
    color: "rgba(255,255,255,0.4)",
    letterSpacing: 1,
  },
  metaDot: {
    color: "rgba(255,255,255,0.2)",
  },
  content: {
    padding: 32,
    gap: 40,
  },
  block: {
    gap: 16,
  },
  blockLabel: {
    fontFamily: "monospace",
    fontSize: 11,
    color: "#c8ff65",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  blockText: {
    fontFamily: "monospace",
    fontSize: 15,
    color: "#888",
    lineHeight: 24,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tagChip: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 100,
  },
  tagChipText: {
    fontFamily: "monospace",
    fontSize: 12,
    color: "#888",
  },
  imageGrid: {
    gap: 8,
  },
  imageBlock: {
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  imageRow: {
    flexDirection: "row",
    gap: 8,
  },
  imageSmall: {
    flex: 1,
    height: 160,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholderText: {
    fontFamily: "monospace",
    fontSize: 10,
    color: "rgba(255,255,255,0.25)",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  nextBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
    paddingTop: 32,
    marginTop: 16,
  },
  nextLabel: {
    fontFamily: "monospace",
    fontSize: 9,
    color: "#666",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  nextTitle: {
    fontFamily: "serif",
    fontSize: 28,
    color: "#f0ede6",
    fontWeight: "300",
    letterSpacing: -1,
  },
  nextArrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#c8ff65",
  },
});
