/**
 * Skeleton placeholders shown while content loads.
 */

import React, { useEffect, useRef } from 'react';
import { Animated, DimensionValue, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { designTokens } from '../../constants/designTokens';
import { Theme, useTheme, useThemedStyles } from '../../hooks/useTheme';

type SkeletonProps = {
  width?: DimensionValue;
  height?: DimensionValue;
  radius?: number;
  style?: StyleProp<ViewStyle>;
};

/** A single pulsing block. */
export function Skeleton({
  width = '100%',
  height = 16,
  radius = designTokens.borderRadius.sm,
  style,
}: Readonly<SkeletonProps>) {
  const { colors, isDark } = useTheme();
  const opacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 650, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.5, duration: 650, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        {
          width,
          height,
          borderRadius: radius,
          backgroundColor: isDark ? colors.surfaceTint : colors.borderVeryLight,
          opacity,
        },
        style,
      ]}
    />
  );
}

const createStyles = ({ colors, shadows }: Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: designTokens.borderRadius.xl,
      overflow: 'hidden',
      marginBottom: designTokens.spacing.lg,
      ...shadows.sm,
    },
    body: { padding: designTokens.spacing.lg, gap: designTokens.spacing.sm },
    tags: { flexDirection: 'row', gap: designTokens.spacing.sm },
  });

/** Placeholder shaped like a pet card (image + name + tags + description). */
export function PetCardSkeleton() {
  const styles = useThemedStyles(createStyles);
  return (
    <View style={styles.card} accessibilityLabel="Carregando pet">
      <Skeleton height={180} radius={0} />
      <View style={styles.body}>
        <Skeleton width="55%" height={20} />
        <View style={styles.tags}>
          <Skeleton width={64} height={24} radius={designTokens.borderRadius.full} />
          <Skeleton width={84} height={24} radius={designTokens.borderRadius.full} />
          <Skeleton width={72} height={24} radius={designTokens.borderRadius.full} />
        </View>
        <Skeleton width="90%" height={12} />
        <Skeleton width="70%" height={12} />
      </View>
    </View>
  );
}

export default Skeleton;
