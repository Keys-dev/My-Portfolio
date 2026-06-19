import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing, StyleSheet, Dimensions, useWindowDimensions } from 'react-native';


interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const { height } = useWindowDimensions();
  const counter = useRef(new Animated.Value(0)).current;
  const overlayTop = useRef(new Animated.Value(0)).current;
  const overlayBottom = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Step 1: Logo fade in
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(logoY, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    // Step 2: Counter from 0 → 100
    Animated.timing(counter, {
      toValue: 100,
      duration: 1200,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: false,
    }).start(() => {
      // Step 3: Split curtain reveal
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(overlayTop, {
            toValue: -height / 2,
            duration: 600,
            easing: Easing.inOut(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(overlayBottom, {
            toValue: height / 2,
            duration: 600,
            easing: Easing.inOut(Easing.cubic),
            useNativeDriver: true,
          }),
        ]).start(() => onComplete());
      }, 150);
    });
  }, []);

  const counterText = counter.interpolate({
    inputRange: [0, 100],
    outputRange: ['000', '100'],
  });

  return (
    <View style={styles.root} pointerEvents="none">
      {/* Top curtain */}
      <Animated.View
        style={[styles.curtain, styles.curtainTop, { transform: [{ translateY: overlayTop }] }]}
      />
      {/* Bottom curtain */}
      <Animated.View
        style={[styles.curtain, styles.curtainBottom, { transform: [{ translateY: overlayBottom }] }]}
      />

      {/* Logo */}
      <Animated.View style={[styles.logoWrap, { opacity: logoOpacity, transform: [{ translateY: logoY }] }]}>
        <Text style={styles.logoText}>Agbaje</Text>
        <Text style={styles.logoSub}>Muhammed</Text>
      </Animated.View>

      {/* Counter */}
      <Animated.Text style={styles.counter}>
        {counterText}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  curtain: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: '#0a0a0a',
    zIndex: 10,
  },
  curtainTop: {
    top: 0,
  },
  curtainBottom: {
    bottom: 0,
  },
  logoWrap: {
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    fontFamily: 'serif',
    fontSize: 64,
    color: '#f0ede6',
    letterSpacing: -2,
    fontWeight: '300',
  },
  logoSub: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: '#888',
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  counter: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    fontFamily: 'monospace',
    fontSize: 11,
    color: '#555',
    letterSpacing: 2,
  },
});
