import React, { useEffect, useRef } from 'react';
import { Animated, Image, Text, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import auth from '@react-native-firebase/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#198A4D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  branding: {
    marginTop: 20,
  },
  brandText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FBF4E6',
    fontFamily: 'Inter_800ExtraBold',
    textAlign: 'center',
  },
});

export default function SplashScreen() {
  const router = useRouter();
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const brandingOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequence of animations
    Animated.sequence([
      // Logo scale + fade in
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      // Branding text fade in
      Animated.timing(brandingOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate after animations complete
    const timer = setTimeout(() => {
      checkAuthAndNavigate();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const checkAuthAndNavigate = async () => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        router.replace('/screens/petList/petList.screen');
      } else {
        router.replace('/screens/login/login.screen');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      router.replace('/screens/login/login.screen');
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{ scale: logoScale }],
            opacity: logoOpacity,
          },
        ]}
      >
        <Image
          source={require('../../../assets/images/petmatch-splash.png')}
          style={styles.logo}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.branding,
          {
            opacity: brandingOpacity,
          },
        ]}
      >
        <Text style={styles.brandText}>PetMatch</Text>
      </Animated.View>
    </View>
  );
}
