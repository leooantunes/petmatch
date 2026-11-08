/**
 * Animated Button Component
 * Themed pressable button with scale feedback, haptics, variants and sizes.
 */

import * as Haptics from 'expo-haptics';
import React, { useCallback, useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { designTokens } from '../../constants/designTokens';
import { Theme, useThemedStyles } from '../../hooks/useTheme';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface AnimatedButtonProps extends Omit<PressableProps, 'style' | 'children'> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Rendered before the title, e.g. an icon from @expo/vector-icons. */
  icon?: React.ReactNode;
  loading?: boolean;
  /** Light haptic tap on press. Defaults to true. */
  haptic?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  scaleDuration?: number;
}

const SIZE_HEIGHT: Record<ButtonSize, number> = { sm: 38, md: 46, lg: 52 };
const SIZE_FONT: Record<ButtonSize, number> = {
  sm: designTokens.typography.fontSize.sm,
  md: designTokens.typography.fontSize.md,
  lg: designTokens.typography.fontSize.md + 1,
};

const createStyles = ({ colors, shadows }: Theme) =>
  StyleSheet.create({
    base: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: designTokens.spacing.sm,
      paddingHorizontal: designTokens.spacing.lg,
      borderRadius: 14,
    },
    primary: { backgroundColor: colors.primary, ...shadows.sm },
    secondary: {
      backgroundColor: colors.surfaceAlt,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    danger: { backgroundColor: colors.error },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: colors.primary,
    },
    ghost: { backgroundColor: 'transparent' },
    text: { fontFamily: 'Inter_700Bold' },
    primaryText: { color: colors.onPrimary },
    secondaryText: { color: colors.textBrand },
    dangerText: { color: colors.onPrimary },
    outlineText: { color: colors.textBrand },
    ghostText: { color: colors.primary },
    disabled: { opacity: 0.5 },
    fullWidth: { alignSelf: 'stretch' },
  });

/**
 * AnimatedButton - themed button with built-in scale animation and haptic feedback.
 */
export const AnimatedButton = React.forwardRef<View, AnimatedButtonProps>(
  (
    {
      title,
      variant = 'primary',
      size = 'lg',
      icon,
      loading = false,
      haptic = true,
      fullWidth = false,
      onPress,
      onPressIn,
      onPressOut,
      style,
      textStyle,
      scaleDuration = designTokens.animation.fast,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const styles = useThemedStyles(createStyles);
    const scale = useRef(new Animated.Value(1)).current;
    const isDisabled = disabled || loading;

    const animateTo = useCallback(
      (toValue: number) =>
        Animated.timing(scale, {
          toValue,
          duration: scaleDuration,
          useNativeDriver: true,
        }).start(),
      [scale, scaleDuration]
    );

    const handlePressIn = (e: GestureResponderEvent) => {
      animateTo(0.96);
      onPressIn?.(e);
    };

    const handlePressOut = (e: GestureResponderEvent) => {
      animateTo(1);
      onPressOut?.(e);
    };

    const handlePress = (e: GestureResponderEvent) => {
      if (haptic) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      }
      onPress?.(e);
    };

    const labelColor = StyleSheet.flatten(styles[`${variant}Text`]).color;

    return (
      <Animated.View
        style={[{ transform: [{ scale }] }, fullWidth && styles.fullWidth]}
      >
        <Pressable
          ref={ref}
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={isDisabled}
          accessibilityRole="button"
          accessibilityLabel={title}
          accessibilityState={{ disabled: isDisabled, busy: loading }}
          {...props}
          style={[
            styles.base,
            styles[variant],
            { height: SIZE_HEIGHT[size] },
            isDisabled && styles.disabled,
            style,
          ]}
        >
          {loading ? (
            <ActivityIndicator color={labelColor} />
          ) : (
            <>
              {icon}
              <Text
                style={[
                  styles.text,
                  styles[`${variant}Text`],
                  { fontSize: SIZE_FONT[size] },
                  textStyle,
                ]}
              >
                {title}
              </Text>
            </>
          )}
        </Pressable>
      </Animated.View>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';

export default AnimatedButton;
