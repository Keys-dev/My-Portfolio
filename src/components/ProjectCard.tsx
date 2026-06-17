import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
} from "react-native";
import { ProjectData } from "../constants/projects";

const { width } = Dimensions.get("window");

interface ProjectCardProps {
  project: ProjectData;
  animDelay?: number;
}

export default function ProjectCard({
  project,
  animDelay = 0,
}: ProjectCardProps) {
  const navigation = useNavigation<any>();
  const scale = useRef(new Animated.Value(1)).current;
  const hoverLine = useRef(new Animated.Value(0)).current;
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 0.98,
        useNativeDriver: true,
      }),
      Animated.timing(hoverLine, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(hoverLine, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const lineWidth = hoverLine.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <Animated.View style={[styles.cardOuter, { transform: [{ scale }] }]}>
      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => navigation.navigate("Project", { project })}
      >
        <View style={styles.card}>
          {/* Image panel */}
          <View style={[styles.imageWrap, { backgroundColor: project.color }]}>
            {project.image ? (
              <Image
                source={project.image}
                style={[
                  // StyleSheet.absoluteFill,
                ]}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imagePlaceholderText}>
                  {project.title[0]}
                </Text>
              </View>
            )}
            
            {/* Category pill */}
            <View style={styles.categoryPill}>
              <Text style={styles.categoryPillText}>{project.category}</Text>
            </View>
          </View>

          {/* Content */}
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardIndex}>0{project.index}</Text>
              <Text style={styles.cardYear}>{project.year}</Text>
            </View>

            <Text style={styles.cardTitle}>{project.title}</Text>

            {/* Tags */}
            <View style={styles.tags}>
              {project.tags.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>

            {/* Animated underline */}
            <View style={styles.lineTrack}>
              <Animated.View style={[styles.lineAnim, { width: lineWidth }]} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardOuter: {
    marginBottom: 2,
  },
  card: {
    flexDirection: width > 768 ? "row" : "column",
    backgroundColor: "#111",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  imageWrap: {
    width: width > 768 ? "45%" : "100%",
    aspectRatio: 1365 / 681,  // ≈ 2:1
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholderText: {
    fontSize: 36,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "serif",
    fontWeight: "300",
  },
  categoryPill: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "rgba(0,0,0,0.35)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
  },
  categoryPillText: {
    fontFamily: "monospace",
    fontSize: 9,
    color: "#f0ede6",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  cardContent: {
    flex: 1,
    padding: 28,
    justifyContent: "space-between",
    gap: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardIndex: {
    fontFamily: "monospace",
    fontSize: 11,
    color: "#555",
    letterSpacing: 1,
  },
  cardYear: {
    fontFamily: "monospace",
    fontSize: 11,
    color: "#555",
    letterSpacing: 1,
  },
  cardTitle: {
    fontFamily: "serif",
    fontSize: 32,
    color: "#f0ede6",
    fontWeight: "300",
    letterSpacing: -1,
    lineHeight: 38,
    flex: 1,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
  },
  tagText: {
    fontFamily: "monospace",
    fontSize: 10,
    color: "#666",
    letterSpacing: 0.5,
  },
  lineTrack: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    overflow: "hidden",
  },
  lineAnim: {
    height: 1,
    backgroundColor: "#c8ff65",
  },
});
