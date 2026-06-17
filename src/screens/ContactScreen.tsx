import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import NavBar from "../components/NavBar";

const { width } = Dimensions.get("window");

const LINKS = [
  {
    label: "Email",
    value: "muhammadagbaje85@gmail.com",
    url: "mailto:muhammadagbaje85@gmail.com",
  },
  { label: "LinkedIn", value: "LinkedIn", url: "www.linkedin.com/in/muhammed-agbaje-717485255" },
  { label: "GitHub", value: "GitHub", url: "https://github.com/Keys-dev" },
];

export default function ContactScreen() {
  const insets = useSafeAreaInsets();
  const opacity = useRef(new Animated.Value(0)).current;
  const y = useRef(new Animated.Value(40)).current;
  const lineAnims = LINKS.map(() => useRef(new Animated.Value(0)).current);

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
      Animated.timing(y, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

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
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <NavBar activeRoute="Contact" visible={navVisible} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <Animated.View
            style={[
              styles.content,
              { opacity, transform: [{ translateY: y }], paddingTop: 100 },
            ]}
          >
            <Text style={styles.eyebrow}>Get in touch</Text>
            <Text style={styles.headline}>Let's work together</Text>

            <View style={styles.linksBlock}>
              {LINKS.map((link, i) => (
                <TouchableOpacity
                  key={link.label}
                  onPress={() => handlePress(link.url)}
                  style={styles.linkItem}
                >
                  <Animated.View
                    style={[styles.linkLine, { opacity: lineAnims[i] }]}
                  >
                    <Text style={styles.linkLabel}>{link.label}</Text>
                    <Text style={styles.linkValue}>{link.value}</Text>
                  </Animated.View>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}> nigeria / gmt+1 </Text>
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  content: {
    paddingHorizontal: 32,
    paddingBottom: 80,
  },
  eyebrow: {
    fontFamily: "monospace",
    fontSize: 18,
    color: "#c8ff65",
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 24,
  },
  headline: {
    fontFamily: "serif",
    fontSize: Math.min(width * 0.14, 50),
    color: "#f0ede6",
    fontWeight: "300",
    letterSpacing: -3,
    lineHeight: Math.min(width * 0.15, 88),
    marginBottom: 80,
  },
  linksBlock: {
    gap: 48,
  },
  linkItem: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
    paddingBottom: 16,
  },
  linkLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  linkLabel: {
    fontFamily: "monospace",
    fontSize: 11,
    color: "#555",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  linkValue: {
    fontFamily: "serif",
    fontSize: Math.min(width * 0.06, 16),
    color: "#f0ede6",
    letterSpacing: -0.5,
  },
  footer: {
    marginTop: 100,
  },
  footerText: {
    fontFamily: "monospace",
    fontSize: 11,
    color: "#333",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
});
