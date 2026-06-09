import React, { useRef } from 'react';
import { Animated, Easing, View, ViewStyle } from 'react-native';

interface ScrollRevealProps {
  children: React.ReactNode;
  /** translateY start offset in px (default 40) */
  fromY?: number;
  /** fade+slide duration in ms (default 700) */
  duration?: number;
  /** delay in ms after element enters viewport (default 80) */
  delay?: number;
  style?: ViewStyle;
}

export interface ScrollRevealHandle {
  checkVisible: (scrollY: number, viewportHeight: number) => void;
}

const ScrollReveal = React.forwardRef<ScrollRevealHandle, ScrollRevealProps>(
  ({ children, fromY = 40, duration = 700, delay = 80, style }, ref) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(fromY)).current;
    const hasAnimated = useRef(false);
    const viewRef = useRef<View>(null);

    const animate = () => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration,
          delay,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration,
          delay,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    };

    React.useImperativeHandle(ref, () => ({
      checkVisible(_scrollY: number, viewportHeight: number) {
        if (hasAnimated.current || !viewRef.current) return;

        // measure() gives pageY = screen-relative Y of the element top.
        // As the user scrolls DOWN, pageY DECREASES.
        // Element is in view when: pageY < viewportHeight (top edge entered screen)
        viewRef.current.measure((_x, _y, _w, _h, _pageX, pageY) => {
          if (hasAnimated.current) return;
          if (pageY < viewportHeight) {
            hasAnimated.current = true;
            animate();
          }
        });
      },
    }));

    return (
      <Animated.View
        ref={viewRef as any}
        collapsable={false}
        style={[style, { opacity, transform: [{ translateY }] }]}
      >
        {children}
      </Animated.View>
    );
  }
);

export default ScrollReveal;
