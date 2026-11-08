/**
 * Icon
 * Single entry point for icons: picks the vector family, maps semantic sizes
 * and defaults the color to the current theme.
 *
 * @example
 * <Icon name="paw" />                                  // FontAwesome, md, primary
 * <Icon family="antdesign" name="left" size="sm" color="textBrand" />
 * <Icon family="material" name="check" color="#fff" />  // raw colors still work
 */

import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, { ComponentProps } from "react";
import { StyleProp, TextProps, TextStyle } from "react-native";
import { ThemeColors, useTheme } from "../../hooks/useTheme";

export const ICON_SIZE = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 40,
  xxl: 64,
} as const;

export type IconSize = keyof typeof ICON_SIZE;

type FamilyMap = {
  fontawesome: ComponentProps<typeof FontAwesome>["name"];
  antdesign: ComponentProps<typeof AntDesign>["name"];
  material: ComponentProps<typeof MaterialCommunityIcons>["name"];
};

export type IconFamily = keyof FamilyMap;

type IconProps<F extends IconFamily> = {
  family?: F;
  name: FamilyMap[F];
  size?: IconSize | number;
  /** A theme color key (e.g. "primary", "onPrimary") or any raw color string. */
  color?: keyof ThemeColors | (string & {});
  style?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
};

const FAMILIES = {
  fontawesome: FontAwesome,
  antdesign: AntDesign,
  material: MaterialCommunityIcons,
} as const;

export function Icon<F extends IconFamily = "fontawesome">({
  family,
  name,
  size = "md",
  color = "primary",
  style,
  accessibilityLabel,
}: Readonly<IconProps<F>>) {
  const { colors } = useTheme();
  const Component = FAMILIES[family ?? "fontawesome"] as React.ComponentType<
    Omit<TextProps, "children"> & { name: string; size: number; color: string }
  >;
  const resolvedColor =
    color in colors ? colors[color as keyof ThemeColors] : color;
  const resolvedSize = typeof size === "number" ? size : ICON_SIZE[size];

  return (
    <Component
      name={name as string}
      size={resolvedSize}
      color={resolvedColor}
      style={style}
      // Decorative unless a label is given.
      accessibilityElementsHidden={!accessibilityLabel}
      importantForAccessibility={accessibilityLabel ? "yes" : "no"}
      accessibilityLabel={accessibilityLabel}
    />
  );
}

export default Icon;
