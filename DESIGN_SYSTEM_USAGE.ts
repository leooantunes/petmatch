/**
 * Design System Usage Guide — PetMatch
 *
 * Every example below mirrors code that exists in the app; follow the linked
 * file when in doubt. Rule of thumb: never import `COLORS` (light-only,
 * deprecated) — colors always come from the theme so dark mode keeps working.
 */

// ============================================================================
// 1. THEMED STYLES — the standard pattern for every screen and component
//    Real example: app/screens/petList/_petList.styles.ts + petList.screen.tsx
// ============================================================================

// --- _myScreen.styles.ts -----------------------------------------------------
// import { StyleSheet } from "react-native";
// import { Theme } from "../../hooks/useTheme";
// import { BORDER_RADIUS, FONT_SIZE, SPACING } from "../../styles/colors";
//
// export const createMyScreenStyles = ({ colors, shadows }: Theme) =>
//   StyleSheet.create({
//     container: { flex: 1, backgroundColor: colors.screen },
//     card: {
//       backgroundColor: colors.card,
//       borderRadius: BORDER_RADIUS.xl,
//       padding: SPACING.xl,
//       ...shadows.md,
//     },
//     title: { fontSize: FONT_SIZE.lg, color: colors.textBrand },
//   });
//
// --- myScreen.screen.tsx -----------------------------------------------------
// import { useTheme, useThemedStyles } from "../../hooks/useTheme";
// import { createMyScreenStyles } from "./_myScreen.styles";
//
// export default function MyScreen() {
//   const theme = useTheme();
//   const styles = useThemedStyles(createMyScreenStyles); // memoized per theme
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle={theme.statusBarStyle} translucent backgroundColor="transparent" />
//       ...
//     </SafeAreaView>
//   );
// }
//
// Keep the factory at module level (not inline) so useThemedStyles can memoize it.
// Prefix style files with "_" so expo-router does not treat them as routes.

// ============================================================================
// 2. WHICH COLOR TOKEN? (app/constants/designTokens.ts)
// ============================================================================
//
// Surfaces
//   screen       page background (soft green / near-black)
//   card         cards, inputs, sheets
//   surfaceTint  tags, image placeholders, icon halos
//   field        neutral form fields (FormField)
// Text
//   text / textSecondary / textTertiary   neutral copy
//   textBrand        green headings & values      (was primaryDark)
//   textBrandStrong  green body copy               (was primaryDarker)
//   textBrandMuted   green secondary copy          (was primaryMedium)
//   textBrandSoft    green tertiary / descriptions (was primaryLight)
//   onPrimary        text & icons on a primary/danger background (was white)
//   placeholder      TextInput placeholderTextColor
// Brand & status
//   primary, primaryDark, error, warning, info, success
// Borders
//   border, borderLight, borderVeryLight, divider
// Other
//   overlay      modal / loading backdrop
//
// Never use a raw "#fff" for text on green: use colors.onPrimary.

// ============================================================================
// 3. BUTTONS — app/components/buttons/AnimatedButton.tsx
// ============================================================================
//
// <AnimatedButton title="Cadastrar pet" onPress={handleSubmit} />
// <AnimatedButton title="Cancelar" variant="ghost" size="md" onPress={router.back} />
// <AnimatedButton title="Rejeitar" variant="danger" loading={isProcessing}
//   icon={<Icon family="material" name="close" size="md" color="onPrimary" />} />
//
// variant: primary | secondary | danger | outline | ghost   (default primary)
// size:    sm (38) | md (46) | lg (52)                        (default lg)
// Built in: scale on press-in/out, light haptic (haptic={false} to opt out,
// e.g. when the handler already fires its own notification haptic), disabled
// while loading, accessibilityRole/label/state.

// ============================================================================
// 4. ICONS — app/components/icon/Icon.tsx
// ============================================================================
//
// <Icon name="paw" />                                     FontAwesome, md, primary
// <Icon family="antdesign" name="left" size="sm" color="textBrand" />
// <Icon family="material" name="check-all" size="xxl" color="primaryLight" />
//
// size:  xs 12 | sm 16 | md 20 | lg 24 | xl 40 | xxl 64 | any number
// color: a theme token name or a raw color string
// Icons are hidden from screen readers unless you pass accessibilityLabel.

// ============================================================================
// 5. LIST ENTRANCES — app/components/cards/AnimatedCard.tsx
// ============================================================================
//
// renderItem={({ item, index }) => (
//   <AnimatedCard index={index}>          // fade + rise, stagger capped at 420ms
//     <TouchableOpacity style={styles.card}>...</TouchableOpacity>
//   </AnimatedCard>
// )}

// ============================================================================
// 6. LOADING & EMPTY STATES
// ============================================================================
//
// Lists: show skeletons instead of the blocking overlay
//   import { PetCardSkeleton, Skeleton } from "../../components/skeleton/Skeleton";
//   ListEmptyComponent={isLoading ? <PetCardSkeleton /> : <EmptyList ... />}
//
// Blocking actions (upload, save): useLoading().showLoading() / hideLoading()
//
// Empty states with the brand illustration:
//   <EmptyList illustration icon="paw" message="Nenhum pet encontrado."
//     hint="Volte mais tarde: novos amigos chegam todos os dias." />

// ============================================================================
// 7. DIALOGS — app/components/modal/modernModal.tsx
// ============================================================================
//
// <ModernModal visible title message variant="warning" showCancelButton
//   confirmText="Excluir" onConfirm={remove} onClose={hide} />
// Spring entrance; a warning with a cancel button renders the confirm as danger.

// ============================================================================
// 8. NAVIGATION TRANSITIONS — app/_layout.tsx, app/screens/_layout.tsx
// ============================================================================
//
// Default: slide_from_right (280ms). Detail/edit screens: slide_from_bottom.
// Login: fade. Override per screen with <Stack.Screen name="..." options={{ animation }} />.

// ============================================================================
// 9. CUSTOM ANIMATIONS
// ============================================================================
//
// Prefer Animated with useNativeDriver: true and durations from
// designTokens.animation (fast 150 / normal 300 / slow 500 / slower 800).
// Helpers in app/components/animations/animationUtils.ts:
//   createFadeInAnimation(from, to, ms)  -> { animatedValue, startAnimation }
//   createScaleAnimation(from, to, ms)   -> { animatedValue, scaleDown (→ to), scaleUp (→ from) }
//   createSlideFromBottomAnimation, createFadeScaleAnimation, createPulseAnimation
// Note: createScaleAnimation has no startAnimation(); call scaleDown().

// ============================================================================
// REFERENCE: scales (designTokens)
// ============================================================================

/**
 * Spacing:       xs 4 | sm 8 | md 12 | lg 16 | xl 20 | xxl 24 | xxxl 32 | xxxxl 40
 * Font size:     xs 12 | sm 14 | md 16 | lg 18 | xl 24 | xxl 32 | xxxl 40
 * Border radius: sm 8 | md 10 | lg 12 | xl 20 | full 999
 * Animation:     fast 150 | normal 300 | slow 500 | slower 800 (ms)
 * Control heights: inputs & primary buttons 52, secondary buttons 46, small 38
 */

export const DESIGN_SYSTEM_REFERENCE = {
  tokens: 'app/constants/designTokens.ts',
  themeHook: 'app/hooks/useTheme.ts (useTheme, useThemedStyles)',
  button: 'app/components/buttons/AnimatedButton.tsx',
  card: 'app/components/cards/AnimatedCard.tsx',
  icon: 'app/components/icon/Icon.tsx',
  skeleton: 'app/components/skeleton/Skeleton.tsx',
  emptyState: 'app/components/emptyList/emptyList.component.tsx',
  modal: 'app/components/modal/modernModal.tsx',
  animations: 'app/components/animations/animationUtils.ts',
  screenExample: 'app/screens/petList/petList.screen.tsx',
};

export default DESIGN_SYSTEM_REFERENCE;
