import React from 'react';
import { Animated, Image, View, StyleSheet } from 'react-native';
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
});

export default function SplashScreen() {
  const router = useRouter();
  const logoScale = React.useRef(new Animated.Value(0.8)).current;
  const logoOpacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // Logo scale + fade in animation
    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
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
          source={require('../../assets/images/petmatch-splash.png')}
          style={styles.logo}
        />
      </Animated.View>
    </View>
  );
}
