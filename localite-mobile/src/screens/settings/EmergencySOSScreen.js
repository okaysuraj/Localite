import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Animated, Easing, Vibration, Image
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const CIRCLE_RADIUS = 104;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;
const HOLD_DURATION = 3000;

export default function EmergencySOSScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  
  const [isHolding, setIsHolding] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false);
  
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const pulseAnimation1 = useRef(new Animated.Value(0)).current;
  const pulseAnimation2 = useRef(new Animated.Value(0)).current;

  // Setup pulsing rings
  useEffect(() => {
    const createPulse = (anim, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 3000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          })
        ])
      ).start();
    };
    
    createPulse(pulseAnimation1, 0);
    createPulse(pulseAnimation2, 1000);
  }, []);

  const startHold = () => {
    if (isTriggered) return;
    setIsHolding(true);
    Animated.timing(progressAnimation, {
      toValue: 1,
      duration: HOLD_DURATION,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        triggerSOS();
      }
    });
  };

  const cancelHold = () => {
    if (isTriggered) return;
    setIsHolding(false);
    Animated.timing(progressAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const triggerSOS = () => {
    setIsTriggered(true);
    setIsHolding(false);
    Vibration.vibrate([100, 50, 100, 50, 300]);
    // Actual API call would go here
  };

  const strokeDashoffset = progressAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [CIRCLE_CIRCUMFERENCE, 0],
  });

  const buttonScale = isHolding ? 0.95 : 1;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.appBarSafe}>
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Ionicons name="close" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>EMERGENCY PORTAL</Text>
          <View style={{ width: 40 }} />
        </View>
      </SafeAreaView>

      <View style={styles.content}>
        
        {/* Header Text */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Immediate Assistance</Text>
          <Text style={styles.headerDesc}>
            Hold the button for 3 seconds to trigger a priority emergency alert.
          </Text>
        </View>

        {/* SOS Button Area */}
        <View style={styles.sosContainer}>
          
          {/* Pulsing Rings */}
          <Animated.View style={[
            styles.pulseRing, 
            { width: 256, height: 256, borderRadius: 128 },
            {
              transform: [{
                scale: pulseAnimation1.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.95, 1.05, 0.95] })
              }],
              opacity: pulseAnimation1.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.5, 0.2, 0.5] })
            }
          ]} />
          
          <Animated.View style={[
            styles.pulseRing, 
            { width: 320, height: 320, borderRadius: 160 },
            {
              transform: [{
                scale: pulseAnimation2.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.95, 1.05, 0.95] })
              }],
              opacity: pulseAnimation2.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.5, 0.2, 0.5] })
            }
          ]} />

          {/* Progress Circle SVG */}
          <View style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}>
            <Svg width="224" height="224">
              <Circle
                cx="112"
                cy="112"
                r={CIRCLE_RADIUS}
                stroke="rgba(254, 212, 136, 0.1)"
                strokeWidth="8"
                fill="transparent"
              />
              <AnimatedCircle
                cx="112"
                cy="112"
                r={CIRCLE_RADIUS}
                stroke="#fed488"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={CIRCLE_CIRCUMFERENCE}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </Svg>
          </View>

          {/* Main Button */}
          <TouchableOpacity
            activeOpacity={1}
            onPressIn={startHold}
            onPressOut={cancelHold}
            style={[styles.mainButtonWrapper, { transform: [{ scale: buttonScale }] }]}
          >
            <View style={styles.mainButton}>
              <MaterialIcons name="emergency" size={48} color="#0d1c32" />
              <Text style={styles.mainButtonText}>
                {isTriggered ? 'TRIGGERED' : 'Hold to SOS'}
              </Text>
            </View>
          </TouchableOpacity>

        </View>

        {/* Location Info */}
        <View style={styles.locationCard}>
          <View style={styles.locationHeader}>
            <View style={styles.locationIconWrap}>
              <MaterialIcons name="location-on" size={24} color="#775a19" />
            </View>
            <View style={styles.locationTextWrap}>
              <Text style={styles.locationLabel}>CURRENT LOCATION</Text>
              <Text style={styles.locationAddress}>Mayfair District, London</Text>
              <Text style={styles.locationCoords}>51.5115° N, 0.1472° W</Text>
            </View>
          </View>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.mapView}
              initialRegion={{
                latitude: 51.5115,
                longitude: -0.1472,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              scrollEnabled={false}
              zoomEnabled={false}
              pitchEnabled={false}
              rotateEnabled={false}
              userInterfaceStyle="light"
            >
              <Marker
                coordinate={{ latitude: 51.5115, longitude: -0.1472 }}
                title="Your Location"
                description="Mayfair District, London"
                pinColor="#ba1a1a"
              />
            </MapView>
          </View>
        </View>

        {/* Action Grid */}
        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.actionBtnPrimary}>
            <MaterialIcons name="call" size={32} color="#ba1a1a" />
            <Text style={styles.actionBtnTextPrimary}>Call Emergency</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtnSecondary}>
            <MaterialIcons name="group" size={32} color="#775a19" />
            <Text style={styles.actionBtnTextSecondary}>Alert Contacts</Text>
          </TouchableOpacity>
        </View>

      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>PRIORITY ENCRYPTED CONNECTION ACTIVE</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1c32',
  },
  appBarSafe: {
    backgroundColor: '#0d1c32',
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  iconBtn: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 24,
  },
  appBarTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#e9c176',
    letterSpacing: 2,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 32,
    color: '#ffffff',
    marginBottom: 8,
  },
  headerDesc: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#b9c7e4',
    textAlign: 'center',
    maxWidth: 280,
  },
  sosContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 320,
    marginBottom: 48,
    position: 'relative',
    width: '100%',
  },
  pulseRing: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(119, 90, 25, 0.3)',
  },
  mainButtonWrapper: {
    position: 'absolute',
  },
  mainButton: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#775a19',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#fed488',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  mainButtonText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#0d1c32',
    letterSpacing: 1,
    marginTop: 8,
    textTransform: 'uppercase',
  },
  locationCard: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 24,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationIconWrap: {
    padding: 8,
    backgroundColor: 'rgba(119, 90, 25, 0.1)',
    borderRadius: 8,
    marginRight: 12,
  },
  locationTextWrap: {
    flex: 1,
  },
  locationLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#e9c176',
    letterSpacing: 1,
    marginBottom: 2,
  },
  locationAddress: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#ffffff',
  },
  locationCoords: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#b9c7e4',
    marginTop: 2,
    letterSpacing: 1,
  },
  mapContainer: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
  },
  mapView: {
    width: '100%',
    height: '100%',
  },
  actionGrid: {
    flexDirection: 'row',
    width: '100%',
    gap: 16,
  },
  actionBtnPrimary: {
    flex: 1,
    backgroundColor: 'rgba(186, 26, 26, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(186, 26, 26, 0.3)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnTextPrimary: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 8,
  },
  actionBtnSecondary: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnTextSecondary: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 8,
  },
  footer: {
    paddingBottom: 24,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 2,
  }
});
