import React from 'react';
import { Image, View } from 'react-native';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  style?: any;
}

export function Logo({ size = 'md', style }: Readonly<LogoProps>) {
  const sizes = {
    sm: 60,
    md: 100,
    lg: 140,
  };

  return (
    <View style={[{ alignItems: 'center' }, style]}>
      <Image
        source={require('../../../assets/images/gato-cachorro-pixel-v3.png')}
        style={{
          width: sizes[size],
          height: sizes[size],
          resizeMode: 'contain',
        }}
      />
    </View>
  );
}
