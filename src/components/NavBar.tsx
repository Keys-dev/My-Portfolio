import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

interface NavBarProps {
  scrollY?: Animated.Value;
  activeRoute?: string;
  visible?: boolean;
}

export default function NavBar({ scrollY, activeRoute = 'Home', visible = true }: NavBarProps) {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const navOpacity = useRef(new Animated.Value(0)).current;
  const navY = useRef(new Animated.Value(-20)).current;
  const pillWidth = useRef(new Animated.Value(0)).current;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuHeight = useRef(new Animated.Value(0)).current;
  const menuOpacity = useRef(new Animated.Value(0)).current;
  
  // Animation for hiding/showing the header on scroll
  const visibilityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(navOpacity, {
        toValue: 1,
        duration: 600,
        delay: 1600,
        useNativeDriver: true,
      }),
      Animated.timing(navY, {
        toValue: 0,
        duration: 600,
        delay: 1600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Animate visibility based on prop
  useEffect(() => {
    Animated.timing(visibilityAnim, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const translateY = visibilityAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  const navItems = [
    { label: 'Work', route: 'Home' },
    { label: 'About', route: 'About' },
    { label: 'Contact', route: 'Contact' },
  ];

  const toggleMenu = () => {
    const toOpen = !menuOpen;
    setMenuOpen(toOpen);
    Animated.parallel([
      Animated.timing(menuHeight, {
        toValue: toOpen ? 220 : 0,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(menuOpacity, {
        toValue: toOpen ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <>
      <Animated.View
        style={[
          styles.nav,
          {
            opacity: navOpacity,
            transform: [{ translateY: Animated.add(navY, translateY) }],
            paddingTop: insets.top + 16,
          },
        ]}
      >
        {/* Logo */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navLogo}>Agbaje</Text>
        </TouchableOpacity>

        {/* Desktop Links */}
        {width > 768 ? (
          <View style={styles.navLinks}>
            {navItems.map((item) => (
              <TouchableOpacity
                key={item.label}
                onPress={() => item.route && navigation.navigate(item.route)}
                style={styles.navItem}
              >
                <Text
                  style={[
                    styles.navLinkText,
                    activeRoute === item.route && styles.navLinkActive,
                  ]}
                >
                  {item.label}
                </Text>
                {activeRoute === item.route && <View style={styles.activeDot} />}
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          /* Mobile Hamburger */
          <TouchableOpacity onPress={toggleMenu} style={styles.hamburger}>
            <View style={[styles.bar, menuOpen && styles.barTop]} />
            <View style={[styles.bar, menuOpen && styles.barBottom]} />
          </TouchableOpacity>
        )}

        {/* Availability badge */}
        <View style={styles.badge}>
          <View style={styles.badgeDot} />
          <Text style={styles.badgeText}>Available 2026</Text>
        </View>
      </Animated.View>

      {/* Mobile Menu Dropdown */}
      <Animated.View
        style={[
          styles.mobileMenu,
          {
            height: menuHeight,
            opacity: menuOpacity,
            top: insets.top + 64,
          },
        ]}
      >
        {navItems.map((item, i) => (
          <TouchableOpacity
            key={item.label}
            onPress={() => {
              toggleMenu();
              item.route && navigation.navigate(item.route);
            }}
            style={styles.mobileMenuItem}
          >
            <Text style={styles.mobileMenuText}>{item.label}</Text>
            <Text style={styles.mobileMenuIndex}>0{i + 1}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  nav: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingBottom: 16,
  },
  navLogo: {
    fontFamily: 'serif',
    fontSize: 22,
    color: '#f0ede6',
    letterSpacing: -1,
    fontWeight: '300',
  },
  navLinks: {
    flexDirection: 'row',
    gap: 40,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navLinkText: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: '#888',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  navLinkActive: {
    color: '#f0ede6',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#c8ff65',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#c8ff65',
  },
  badgeText: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: '#888',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  hamburger: {
    gap: 6,
    padding: 4,
  },
  bar: {
    width: 22,
    height: 1.5,
    backgroundColor: '#f0ede6',
  },
  barTop: {
    transform: [{ rotate: '45deg' }, { translateY: 4 }],
  },
  barBottom: {
    transform: [{ rotate: '-45deg' }, { translateY: -4 }],
  },
  mobileMenu: {
    position: 'absolute',
    top: 72,
    left: 0,
    right: 0,
    zIndex: 49,
    backgroundColor: '#111',
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  mobileMenuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.04)',
  },
  mobileMenuText: {
    fontFamily: 'serif',
    fontSize: 28,
    color: '#f0ede6',
    fontWeight: '300',
  },
  mobileMenuIndex: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: '#555',
    letterSpacing: 1,
  },
});