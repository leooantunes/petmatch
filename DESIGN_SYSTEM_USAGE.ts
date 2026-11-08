/**
 * Design System Usage Guide
 * Examples of how to use tokens, themes, and animations in PetMatch
 */

// ============================================================================
// EXAMPLE 1: Using the useTheme hook for dynamic colors
// ============================================================================

// In any screen or component:
//
// import { useTheme } from '../hooks/useTheme';
// import { StyleSheet } from 'react-native';
//
// export default function MyScreen() {
//   const theme = useTheme();
//
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: theme.colors.background,
//     },
//     text: {
//       color: theme.colors.text,
//       fontSize: 16,
//     },
//   });
//
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Hello World</Text>
//     </View>
//   );
// }

// ============================================================================
// EXAMPLE 2: Using designTokens directly for static styles
// ============================================================================

// import { designTokens } from '../constants/designTokens';
// import { StyleSheet } from 'react-native';
//
// const styles = StyleSheet.create({
//   container: {
//     padding: designTokens.spacing.lg,
//     borderRadius: designTokens.borderRadius.md,
//     ...designTokens.shadows.light.md,
//   },
//   title: {
//     fontSize: designTokens.typography.fontSize.xl,
//     fontWeight: designTokens.typography.fontWeight.bold,
//   },
// });

// ============================================================================
// EXAMPLE 3: Using animations - Fade In
// ============================================================================

// import { createFadeInAnimation } from '../components/animations/animationUtils';
// import { Animated } from 'react-native';
// import { useEffect, useRef } from 'react';
//
// export default function MyComponent() {
//   const fadeAnimation = useRef(
//     createFadeInAnimation(0, 1, 500)
//   ).current;
//
//   useEffect(() => {
//     fadeAnimation.startAnimation();
//   }, []);
//
//   return (
//     <Animated.View style={{ opacity: fadeAnimation.animatedValue }}>
//       <Text>I fade in!</Text>
//     </Animated.View>
//   );
// }

// ============================================================================
// EXAMPLE 4: Using animations - Scale on Press (Button)
// ============================================================================

// import { createScaleAnimation } from '../components/animations/animationUtils';
// import { Animated, Pressable } from 'react-native';
// import { useRef } from 'react';
//
// export default function MyButton() {
//   const scaleAnimation = useRef(createScaleAnimation()).current;
//
//   const handlePress = () => {
//     scaleAnimation.scaleDown();
//     setTimeout(() => scaleAnimation.scaleUp(), 150);
//   };
//
//   return (
//     <Animated.View
//       style={{
//         transform: [{ scale: scaleAnimation.animatedValue }],
//       }}
//     >
//       <Pressable onPress={handlePress}>
//         <Text>Press me!</Text>
//       </Pressable>
//     </Animated.View>
//   );
// }

// ============================================================================
// EXAMPLE 5: Using animations - Slide From Bottom (Modal)
// ============================================================================

// import { createSlideFromBottomAnimation } from '../components/animations/animationUtils';
// import { Animated, Modal } from 'react-native';
// import { useRef, useState } from 'react';
//
// export default function MyModal() {
//   const [visible, setVisible] = useState(false);
//   const slideAnimation = useRef(
//     createSlideFromBottomAnimation(300, 0, 500)
//   ).current;
//
//   const showModal = () => {
//     setVisible(true);
//     slideAnimation.slideIn();
//   };
//
//   const hideModal = () => {
//     slideAnimation.slideOut();
//     setTimeout(() => setVisible(false), 500);
//   };
//
//   return (
//     <Modal visible={visible} transparent animationType="none">
//       <Animated.View
//         style={{
//           transform: [{ translateY: slideAnimation.animatedValue }],
//         }}
//       >
//         {/* Modal content */}
//       </Animated.View>
//     </Modal>
//   );
// }

// ============================================================================
// REFERENCE: Design Tokens
// ============================================================================

/**
 * Spacing Scale:
 * - xs: 4px
 * - sm: 8px
 * - md: 12px
 * - lg: 16px
 * - xl: 20px
 * - xxl: 24px
 * - xxxl: 32px
 *
 * Font Sizes:
 * - xs: 12px
 * - sm: 14px
 * - md: 16px
 * - lg: 18px
 * - xl: 24px
 * - xxl: 32px
 * - xxxl: 40px
 *
 * Border Radius:
 * - sm: 8px
 * - md: 10px
 * - lg: 12px
 * - xl: 20px
 * - full: 999px
 *
 * Animation Durations:
 * - fast: 150ms
 * - normal: 300ms
 * - slow: 500ms
 * - slower: 800ms
 */

export const DESIGN_SYSTEM_REFERENCE = {
  documentation: 'Design tokens at app/constants/designTokens.ts',
  themeHook: 'useTheme at app/hooks/useTheme.ts',
  animations: 'Utilities at app/components/animations/animationUtils.ts',
  loginExample: 'Enhanced login screen at app/screens/login/login.screen.tsx',
};

export default DESIGN_SYSTEM_REFERENCE;
