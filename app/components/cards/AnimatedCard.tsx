/**
 * Animated Card Component
 * Wraps content with a fade + rise entrance animation (native driver).
 */

import React, { useEffect, useRef } from 'react';
import { Animated, StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import { designTokens } from '../../constants/designTokens';

export interface AnimatedCardProps extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  duration?: number;
  delay?: number;
  /** Position in a list; staggers the entrance (capped so long lists don't lag). */
  index?: number;
  onAnimationComplete?: () => void;
}

const STAGGER_MS = 70;
const MAX_STAGGER_MS = 420;

export const AnimatedCard = React.forwardRef<View, AnimatedCardProps>(
  (
    {
      children,
      style,
      duration = designTokens.animation.normal,
      delay,
      index = 0,
      onAnimationComplete,
      ...props
    },
    ref
  ) => {
    const progress = useRef(new Animated.Value(0)).current;
    const startDelay = delay ?? Math.min(index * STAGGER_MS, MAX_STAGGER_MS);
    const onCompleteRef = useRef(onAnimationComplete);
    onCompleteRef.current = onAnimationComplete;

    useEffect(() => {
      const animation = Animated.timing(progress, {
        toValue: 1,
        duration,
        delay: startDelay,
        useNativeDriver: true,
      });
      animation.start(({ finished }) => {
        if (finished) onCompleteRef.current?.();
      });
      return () => animation.stop();
    }, [progress, duration, startDelay]);

    return (
      <Animated.View
        ref={ref}
        style={[
          style,
          {
            opacity: progress,
            transform: [
              {
                translateY: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [12, 0],
                }),
              },
              {
                scale: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.98, 1],
                }),
              },
            ],
          },
        ]}
        {...props}
      >
        {children}
      </Animated.View>
    );
  }
);

AnimatedCard.displayName = 'AnimatedCard';

export default AnimatedCard;
