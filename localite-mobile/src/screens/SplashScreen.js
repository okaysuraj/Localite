import React, { useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Animated, 
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebase';

const { width } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.98);
  const progressAnim = new Animated.Value(0);

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(progressAnim, {
        toValue: width * 0.4, // progress bar width
        duration: 2500,
        useNativeDriver: false,
      })
    ]).start();

    // Check auth and navigate
    const checkAuth = async () => {
      // Simulate splash delay
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const userToken = await AsyncStorage.getItem('userToken');
      // If Firebase auth is active and token exists, go to MainApp, else WelcomeCarousel or Login
      // For now, let's route to WelcomeCarousel to show the flow, or Login if they skip.
      // Usually, if there's no token, we go to Login or Welcome. Let's assume Welcome if first time, but we don't have that flag yet.
      // Let's route to 'Login' for now. We will add WelcomeCarousel later if needed.
      if (userToken && auth.currentUser) {
        navigation.replace('MainApp');
      } else {
        // Let's route to WelcomeCarousel since it's part of the flow. We will build it next.
        navigation.replace('WelcomeCarousel');
      }
    };

    checkAuth();
  }, []);

  return (
    <View style={styles.container}>
      {/* Background Glow */}
      <View style={styles.glow} />
      
      <View style={styles.mainContent}>
        {/* Central Branding Cluster */}
        <Animated.View style={[styles.brandCluster, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
          <View style={styles.decorativeLine} />
          
          <Text style={styles.title}>LOCALITE</Text>
          
          <View style={styles.separator} />
          
          <View style={styles.iconContainer}>
            <Ionicons name="sparkles-outline" size={36} color="#775a19" />
          </View>
        </Animated.View>

        {/* Footer / Tagline */}
        <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
          <Text style={styles.tagline}>INTENTIONAL CONNECTION</Text>
          
          <View style={styles.progressContainer}>
            <Animated.View style={[styles.progressBar, { width: progressAnim }]} />
          </View>
        </Animated.View>
      </View>
      
      {/* Contextual Accents */}
      <View style={styles.topLeftAccent}>
        <Text style={[styles.accentText, { transform: [{ rotate: '-90deg' }] }]}>EST. MMXXIV</Text>
      </View>
      <View style={styles.bottomRightAccent}>
        <Text style={[styles.accentText, { transform: [{ rotate: '-90deg' }] }]}>CURIOSITY & COMMUNITY</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a192f',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width * 0.75,
    backgroundColor: '#775a19',
    opacity: 0.05,
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -width * 0.75 },
      { translateY: -width * 0.75 }
    ],
  },
  mainContent: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 80,
  },
  brandCluster: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  decorativeLine: {
    width: 1,
    height: 48,
    backgroundColor: 'rgba(119, 90, 25, 0.4)',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 42,
    color: '#d4af37', // Shimmer gold approximation
    letterSpacing: -0.5,
  },
  separator: {
    width: 64,
    height: 1.5,
    backgroundColor: 'rgba(119, 90, 25, 0.3)',
    marginVertical: 24,
  },
  iconContainer: {
    opacity: 0.6,
  },
  footer: {
    alignItems: 'center',
  },
  tagline: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: 'rgba(251, 249, 248, 0.6)',
    letterSpacing: 4,
    marginBottom: 24,
  },
  progressContainer: {
    width: width * 0.4,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'rgba(119, 90, 25, 0.8)',
  },
  topLeftAccent: {
    position: 'absolute',
    top: 60,
    left: 20,
    opacity: 0.3,
  },
  bottomRightAccent: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    opacity: 0.3,
  },
  accentText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#f5f3f3',
    letterSpacing: 3,
  }
});
