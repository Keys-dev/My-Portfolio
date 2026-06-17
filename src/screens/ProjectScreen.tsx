import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Animated, Dimensions, Linking, FlatList, Image, Modal, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PROJECTS, ProjectData } from "../constants/projects";

const { width, height } = Dimensions.get("window");

export default function ProjectScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const project: ProjectData = route.params?.project;

  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const nextProject = PROJECTS[currentIndex + 1];

  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerY = useRef(new Animated.Value(30)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const backBtnTranslateY = useRef(new Animated.Value(0)).current;

  // Carousel state
  const [cardWidth, setCardWidth] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState<any>(null);
  const carouselRef = useRef<ScrollView>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselIndex = useRef(0);
  const screens: any[] = project.screensImages ?? (project.image ? [project.image] : []);

  // Auto-scroll carousel every 3 seconds
  // Update auto-scroll to use cardWidth
  useEffect(() => {
    if (screens.length <= 1 || cardWidth === 0) return;
    const interval = setInterval(() => {
      const next = (carouselIndex.current + 1) % screens.length;
      if (Platform.OS === 'web') {
        setActiveSlide(next);
      } else {
        (carouselRef.current as any)?.scrollToIndex({ index: next, animated: true });
      }
      carouselIndex.current = next;
      setActiveSlide(next);
    }, 6000);
    return () => clearInterval(interval);
  }, [screens.length, cardWidth]);

  const handleCarouselScroll = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    carouselIndex.current = index;
    setActiveSlide(index);
  };

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    const diff = y - lastScrollY.current;
    if (Math.abs(diff) < 6 && y > 10) return;
    if (y < 50) {
      Animated.timing(backBtnTranslateY, { toValue: 0, duration: 600, useNativeDriver: true }).start();
    } else if (diff > 0 && y > 100) {
      Animated.timing(backBtnTranslateY, { toValue: -150, duration: 600, useNativeDriver: true }).start();
    } else if (diff < 0) {
      Animated.timing(backBtnTranslateY, { toValue: 0, duration: 600, useNativeDriver: true }).start();
    }
    lastScrollY.current = y;
  };

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(headerOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(headerY, { toValue: 0, duration: 700, useNativeDriver: true }),
      ]),
      Animated.timing(contentOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  if (!project) return null;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

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
            onPress={() => navigation.navigate('Home')}
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
          <View style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(0,0,0,0.3)" }]} />
          <SafeAreaView edges={["top"]}>
            <View style={{ paddingHorizontal: 32, paddingBottom: 48, justifyContent: "flex-end", height: height * 0.55 }}>
              <Text style={styles.projectIndex}>0{project.index}</Text>
              <Text style={styles.projectTitle}>{project.title}</Text>
              <View style={styles.metaRow}>
                <Text style={styles.metaItem}>{project.category}</Text>
                <Text style={styles.metaDot}>·</Text>
                <Text style={styles.metaItem}>{project.year}</Text>
                
                {project.link && (
                  <Text
                    style={styles.linkText}
                    onPress={() => Linking.openURL(project.link!)}
                  >
                    View Live Project →
                  </Text>
                )}
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

          {/* Image Grid */}
          <View style={styles.imageGrid}>

            {/* Screens / UI — Carousel */}
            <View
              style={[styles.imageBlock, { backgroundColor: project.color, height: Platform.OS === 'web' ? 600 : 380 }]}
              onLayout={(e) => setCardWidth(e.nativeEvent.layout.width)}
            >
              {screens.length > 0 && cardWidth > 0 ? (
                <>
                  {Platform.OS === 'web' ? (
                    // Web: show one image at a time with opacity, add arrow buttons
                    <View style={{ width: cardWidth, height: Platform.OS === 'web' ? 600 : 380 }}>
                      {screens.map((src: any, i: number) => (
                        <Image
                          key={i}
                          source={src}
                          style={[
                            StyleSheet.absoluteFill,
                            { opacity: i === activeSlide ? 1 : 0 }
                          ]}
                          resizeMode="cover"
                        />
                      ))}

                      {/* Left arrow */}
                      {screens.length > 1 && (
                        <TouchableOpacity
                          style={styles.arrowLeft}
                          onPress={() => {
                            const prev = (activeSlide - 1 + screens.length) % screens.length;
                            carouselIndex.current = prev;
                            setActiveSlide(prev);
                          }}
                        >
                          <Text style={styles.arrowText}>‹</Text>
                        </TouchableOpacity>
                      )}

                      {/* Right arrow */}
                      {screens.length > 1 && (
                        <TouchableOpacity
                          style={styles.arrowRight}
                          onPress={() => {
                            const next = (activeSlide + 1) % screens.length;
                            carouselIndex.current = next;
                            setActiveSlide(next);
                          }}
                        >
                          <Text style={styles.arrowText}>›</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  ) : (
                    // Mobile: FlatList with swipe
                    <FlatList
                      ref={carouselRef as any}
                      data={screens}
                      horizontal
                      pagingEnabled
                      showsHorizontalScrollIndicator={false}
                      snapToInterval={cardWidth}
                      snapToAlignment="center"
                      decelerationRate="fast"
                      bounces={false}
                      scrollEnabled={true}
                      nestedScrollEnabled={true}
                      keyExtractor={(_, i) => String(i)}
                      onMomentumScrollEnd={(e) => {
                        const index = Math.round(e.nativeEvent.contentOffset.x / cardWidth);
                        carouselIndex.current = index;
                        setActiveSlide(index);
                      }}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          activeOpacity={0.9}
                          onPress={() => {
                            setModalImage(item);
                            setModalVisible(true);
                          }}
                        >
                          <Image
                            source={item}
                            style={{ width: cardWidth, height: Platform.OS === 'web' ? 600 : 380 }}
                            resizeMode="cover"
                          />
                        </TouchableOpacity>
                      )}
                      style={{ borderRadius: 12 }}
                    />
                  )}

                  {/* Dots — both platforms */}
                  {screens.length > 1 && (
                    <View style={styles.dotsRow}>
                      {screens.map((_: any, i: number) => (
                        <View key={i} style={[styles.dot, i === activeSlide && styles.dotActive]} />
                      ))}
                    </View>
                  )}
                </>
              ) : (
                <Text style={styles.imagePlaceholderText}>Screens / UI</Text>
              )}
            </View>

            {/* Flow + System */}
            {/* <View style={styles.imageRow}>
              <View style={[styles.imageSmall, { backgroundColor: project.color }]}>
                {project.flowImage ? (
                  <Image
                    source={project.flowImage}
                    style={StyleSheet.absoluteFill}
                    resizeMode="cover"
                  />
                ) : (
                  <Text style={styles.imagePlaceholderText}>Flow</Text>
                )}
              </View>
              <View style={[styles.imageSmall, { backgroundColor: "#1a1a1a" }]}>
                {project.systemImage ? (
                  <Image
                    source={project.systemImage}
                    style={StyleSheet.absoluteFill}
                    resizeMode="cover"
                  />
                ) : (
                  <Text style={styles.imagePlaceholderText}>System</Text>
                )}
              </View>
            </View> */}

          </View>

          {/* Next project */}
          {nextProject && (
            <TouchableOpacity
              style={styles.nextBtn}
              onPress={() => navigation.push("Project", { project: nextProject })}
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

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalClose}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.modalCloseText}>✕</Text>
          </TouchableOpacity>
          {modalImage && (
            <Image
              source={modalImage}
              style={styles.modalImage}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>


    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0a0a0a" },
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
  hero: { height: height * 0.55 },
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


  modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.95)",
  justifyContent: "center",
  alignItems: "center",
  },
  modalClose: {
    position: "absolute",
    top: 56,
    right: 24,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCloseText: {
    color: "#fff",
    fontSize: 16,
  },
  modalImage: {
    width: width,
    height: height * 0.8,
  },


  arrowLeft: {
    position: 'absolute',
    left: 12,
    top: '50%',
    marginTop: -24,
    width: 40,
    height: 48,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    zIndex: 5,
  },
  arrowRight: {
    position: 'absolute',
    right: 12,
    top: '50%',
    marginTop: -24,
    width: 40,
    height: 48,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    zIndex: 5,
  },
  arrowText: {
    color: '#fff',
    fontSize: 32,
    lineHeight: 36,
  },
  


  linkText: {
  fontFamily: "monospace",
  fontSize: 13,
  color: "#c8ff65",
  textDecorationLine: "underline",
  letterSpacing: 0.5,
},


  metaRow: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 16 },
  metaItem: { fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 1 },
  metaDot: { color: "rgba(255,255,255,0.2)" },
  content: { padding: 32, gap: 40 },
  block: { gap: 16 },
  blockLabel: { fontFamily: "monospace", fontSize: 11, color: "#c8ff65", letterSpacing: 3, textTransform: "uppercase" },
  blockText: { fontFamily: "monospace", fontSize: 15, color: "#888", lineHeight: 24 },
  tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tagChip: { borderWidth: 1, borderColor: "rgba(255,255,255,0.1)", paddingHorizontal: 14, paddingVertical: 6, borderRadius: 100 },
  tagChipText: { fontFamily: "monospace", fontSize: 12, color: "#888" },
  imageGrid: { gap: 8 },
  imageBlock: { borderRadius: 12, justifyContent: "center", alignItems: "center", overflow: "hidden" },
  imageRow: { flexDirection: "row", gap: 8 },
  imageSmall: { flex: 1, height: 400, borderRadius: 12, justifyContent: "center", alignItems: "center", overflow: "hidden" },
  imagePlaceholderText: { fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 2, textTransform: "uppercase" },
  dotsRow: { position: "absolute", bottom: 12, flexDirection: "row", gap: 6, alignSelf: "center" },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.3)" },
  dotActive: { backgroundColor: "#c8ff65", width: 18 },
  nextBtn: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.06)", paddingTop: 32, marginTop: 16 },
  nextLabel: { fontFamily: "monospace", fontSize: 9, color: "#666", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 },
  nextTitle: { fontFamily: "serif", fontSize: 28, color: "#f0ede6", fontWeight: "300", letterSpacing: -1 },
  nextArrow: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#c8ff65" },
});