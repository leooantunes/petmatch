/**
 * Animation Utilities
 * Fade in animation for screen entrance and UI elements
 */

import { Animated } from 'react-native';
import { designTokens } from '../../constants/designTokens';

/**
 * Creates a fade-in animation
 * @param initialValue - Starting opacity (default: 0)
 * @param finalValue - Ending opacity (default: 1)
 * @param duration - Animation duration in milliseconds
 * @returns Object with animatedValue and startAnimation function
 */
export function createFadeInAnimation(
  initialValue = 0,
  finalValue = 1,
  duration = designTokens.animation.normal
) {
  const animatedValue = new Animated.Value(initialValue);

  const startAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: finalValue,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const resetAnimation = () => {
    animatedValue.setValue(initialValue);
  };

  return {
    animatedValue,
    startAnimation,
    resetAnimation,
  };
}

/**
 * Creates a scale animation (useful for press feedback)
 * @param initialScale - Starting scale (default: 1)
 * @param finalScale - Ending scale (default: 0.95)
 * @param duration - Animation duration
 * @returns Object with animatedValue and animation functions
 */
export function createScaleAnimation(
  initialScale = 1,
  finalScale = 0.95,
  duration = designTokens.animation.fast
) {
  const animatedValue = new Animated.Value(initialScale);

  const scaleDown = () => {
    Animated.timing(animatedValue, {
      toValue: finalScale,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const scaleUp = () => {
    Animated.timing(animatedValue, {
      toValue: initialScale,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const reset = () => {
    animatedValue.setValue(initialScale);
  };

  return {
    animatedValue,
    scaleDown,
    scaleUp,
    reset,
  };
}

/**
 * Creates a slide-from-bottom animation (useful for modals)
 * @param initialPosition - Starting Y position (default: 300)
 * @param finalPosition - Ending Y position (default: 0)
 * @param duration - Animation duration
 * @returns Object with animatedValue and animation functions
 */
export function createSlideFromBottomAnimation(
  initialPosition = 300,
  finalPosition = 0,
  duration = designTokens.animation.normal
) {
  const animatedValue = new Animated.Value(initialPosition);

  const slideIn = () => {
    Animated.timing(animatedValue, {
      toValue: finalPosition,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(animatedValue, {
      toValue: initialPosition,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const reset = () => {
    animatedValue.setValue(initialPosition);
  };

  return {
    animatedValue,
    slideIn,
    slideOut,
    reset,
  };
}

/**
 * Creates a combined fade and scale animation
 * Useful for card or modal entrances
 */
export function createFadeScaleAnimation(
  duration = designTokens.animation.normal
) {
  const fadeOpacity = new Animated.Value(0);
  const scaleValue = new Animated.Value(0.8);

  const startAnimation = () => {
    Animated.parallel([
      Animated.timing(fadeOpacity, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const reset = () => {
    fadeOpacity.setValue(0);
    scaleValue.setValue(0.8);
  };

  return {
    fadeOpacity,
    scaleValue,
    startAnimation,
    reset,
  };
}

/**
 * Creates a pulse animation (for loading states or emphasis)
 */
export function createPulseAnimation(
  duration = designTokens.animation.slow
) {
  const animatedValue = new Animated.Value(1);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 0.6,
          duration: duration / 2,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: duration / 2,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stop = () => {
    animatedValue.stopAnimation(() => {
      animatedValue.setValue(1);
    });
  };

  return {
    animatedValue,
    startAnimation,
    stop,
  };
}

export default {
  createFadeInAnimation,
  createScaleAnimation,
  createSlideFromBottomAnimation,
  createFadeScaleAnimation,
  createPulseAnimation,
};
