/**
 * Animated Card Component
 * Card with fade-in and scale animations on entrance
 */

import React, { useEffect, useRef } from 'react';
import {
  Animated,
  ViewStyle,
  StyleProp,
  View,
  ViewProps,
} from 'react-native';
import {
  createFadeScaleAnimation,
} from '../animations/animationUtils';
import { designTokens } from '../../constants/designTokens';

export interface AnimatedCardProps extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  duration?: number;
  delay?: number;
  onAnimationComplete?: () => void;
}

/**
 * AnimatedCard - A card component with fade and scale entrance animation
 */
export const AnimatedCard = React.forwardRef<View, AnimatedCardProps>(
  (
    {
      children,
      style,
      duration = designTokens.animation.normal,
      delay = 0,
      onAnimationComplete,
      ...props
    },
    ref
  ) => {
    const animation = useRef(
      createFadeScaleAnimation(duration)
    ).current;

    useEffect(() => {
      const timer = setTimeout(() => {
        animation.startAnimation();
        if (onAnimationComplete) {
          const completionTimer = setTimeout(
            onAnimationComplete,
            duration
          );
          return () => clearTimeout(completionTimer);
        }
      }, delay);

      return () => clearTimeout(timer);
    }, [delay, duration]);

    return (
      <Animated.View
        ref={ref}
        style={[
          style,
          {
            opacity: animation.fadeOpacity,
            transform: [{ scale: animation.scaleValue }],
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
