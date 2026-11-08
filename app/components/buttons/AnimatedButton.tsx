/**
 * Animated Button Component
 * Pressable button with scale animation feedback
 */

import React, { useRef } from 'react';
import {
  Animated,
  Pressable as RNPressable,
  PressableProps,
  StyleProp,
  ViewStyle,
  TextStyle,
  Text,
} from 'react-native';
import { createScaleAnimation } from '../animations/animationUtils';
import { designTokens } from '../../constants/designTokens';

export interface AnimatedButtonProps extends PressableProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  scaleDuration?: number;
  disabled?: boolean;
}

/**
 * AnimatedButton - A pressable button with built-in scale animation
 */
export const AnimatedButton = React.forwardRef<
  typeof RNPressable,
  AnimatedButtonProps
>(
  (
    {
      title,
      onPress,
      style,
      textStyle,
      scaleDuration = designTokens.animation.fast,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const scaleAnimation = useRef(createScaleAnimation(1, 0.95, scaleDuration))
      .current;

    const handlePress = () => {
      scaleAnimation.scaleDown();
      setTimeout(() => scaleAnimation.scaleUp(), scaleDuration);
      if (onPress && !disabled) {
        onPress({} as any);
      }
    };

    return (
      <Animated.View
        style={{
          transform: [{ scale: scaleAnimation.animatedValue }],
        }}
      >
        <RNPressable
          ref={ref as any}
          onPress={handlePress}
          disabled={disabled}
          {...props}
          style={style}
        >
          <Text style={textStyle}>{title}</Text>
        </RNPressable>
      </Animated.View>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';

export default AnimatedButton;
