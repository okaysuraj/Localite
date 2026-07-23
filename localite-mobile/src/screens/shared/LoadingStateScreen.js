import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Animated, Dimensions, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const SkeletonBase = ({ style }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View style={[{ backgroundColor: '#efeded', opacity }, style]} />
  );
};

export default function LoadingStateScreen() {
  const rotateValue = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: 1,
          duration: 1250,
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: 0,
          duration: 1250,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const pulseOpacity = pulseValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1],
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Top AppBar Skeleton */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <SkeletonBase style={styles.avatar} />
          <SkeletonBase style={styles.title} />
        </View>
        <SkeletonBase style={styles.avatar} />
      </View>

      <View style={styles.content}>
        {/* Hero Skeleton */}
        <SkeletonBase style={styles.hero} />

        {/* List Skeletons */}
        <View style={styles.list}>
          <View style={styles.sectionHeader}>
            <SkeletonBase style={styles.sectionTitle} />
          </View>
          
          {[1, 2, 3].map(i => (
            <View key={i} style={styles.card}>
              <SkeletonBase style={styles.cardImg} />
              <View style={styles.cardContent}>
                <SkeletonBase style={styles.cardTitle} />
                <SkeletonBase style={styles.cardText1} />
                <SkeletonBase style={styles.cardText2} />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Overlay Loader */}
      <View style={styles.overlay} pointerEvents="none">
        <View style={styles.loaderContainer}>
          <Animated.View style={[styles.crestLoader, { transform: [{ rotate }] }]}>
            <View style={[styles.crestRing, { transform: [{ rotate: '45deg' }, { scale: 1.1 }] }]} />
            <View style={[styles.crestRing, { transform: [{ rotate: '-45deg' }, { scale: 1.1 }] }]} />
          </Animated.View>
          
          <Animated.View style={[styles.loaderContent, { opacity: pulseOpacity }]}>
            <MaterialIcons name="auto-awesome" size={40} color="#775a19" />
            <Text style={styles.loaderText}>LOCALITE</Text>
          </Animated.View>
        </View>
      </View>

      {/* Bottom Nav Skeleton */}
      <View style={styles.bottomNav}>
        {[1, 2, 3, 4].map(i => (
          <View key={i} style={styles.navItem}>
            <SkeletonBase style={styles.navIcon} />
            <SkeletonBase style={styles.navLabel} />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbf9f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 40 : 16,
    paddingBottom: 16,
    backgroundColor: '#fbf9f8',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    width: 96,
    height: 24,
    borderRadius: 4,
  },
  content: {
    flex: 1,
  },
  hero: {
    width: '100%',
    height: 300,
  },
  list: {
    padding: 24,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    width: 120,
    height: 24,
    borderRadius: 4,
  },
  card: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e4e2e2',
  },
  cardImg: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    gap: 8,
  },
  cardTitle: {
    width: '80%',
    height: 16,
    borderRadius: 4,
  },
  cardText1: {
    width: '100%',
    height: 12,
    borderRadius: 4,
  },
  cardText2: {
    width: '60%',
    height: 12,
    borderRadius: 4,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e4e2e2',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  navLabel: {
    width: 40,
    height: 8,
    borderRadius: 4,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
  },
  crestLoader: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderWidth: 1.5,
    borderColor: 'rgba(119, 90, 25, 0.2)',
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  crestRing: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderWidth: 1.5,
    borderColor: 'rgba(119, 90, 25, 0.1)',
    borderRadius: 48,
  },
  loaderContent: {
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 8,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 2,
  },
});
