import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function LocationServicesPromptScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* Hero Illustration Container */}
        <View style={styles.heroWrap}>
          {/* Decorative Layers - Simplified for Native */}
          <View style={[styles.circleLayer, styles.circleLayer1]} />
          <View style={[styles.circleLayer, styles.circleLayer2]} />
          
          <View style={styles.mapContainer}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzhHk9EKZ8cnCHyEQuWq0tj-QhBj02P-paWsi2b01NPM39AqQmRkG-O6ytaRfhkQNgliEwRVgQFmKDFSaDq5fWib6GmyKUGShX6fDjVaC7S5Iw6xxnnKEmqO8ElfksAusOT-szuqLx9YLUdk9AT1zmxxfwuHZMxDCtLg3SV5yfmm0BLwTqldsS9YqbvdpsQbEXFZ11PkE8zaS9iDO3cSPjEyAyfR2Tec62t2nTLom2-e4rPRil_LV68g' }}
              style={styles.mapImg}
            />
            {/* Golden Pin Overlay */}
            <View style={styles.pinWrap}>
              <View style={styles.pinBg}>
                <MaterialIcons name="location-on" size={32} color="#fff" />
              </View>
            </View>
          </View>
        </View>

        {/* Header Content */}
        <View style={styles.headerContent}>
          <Text style={styles.title}>Find Your Place in the Circle</Text>
          <Text style={styles.desc}>
            To curate your exclusive local experience, we need to know where you stand.
          </Text>
        </View>

        {/* Feature Grid */}
        <View style={styles.featureGrid}>
          {/* Feature 1 */}
          <View style={styles.featureCard}>
            <View style={styles.featureIconWrap}>
              <MaterialIcons name="bolt" size={24} color="#775a19" />
            </View>
            <View style={styles.featureTextWrap}>
              <Text style={styles.featureTitle}>HANDS-FREE CHECK-INS</Text>
              <Text style={styles.featureDesc}>
                Enter lounges and events seamlessly without ever reaching for your device.
              </Text>
            </View>
          </View>

          {/* Feature 2 */}
          <View style={styles.featureCard}>
            <View style={styles.featureIconWrap}>
              <MaterialIcons name="explore" size={24} color="#775a19" />
            </View>
            <View style={styles.featureTextWrap}>
              <Text style={styles.featureTitle}>LOCAL HUB DISCOVERY</Text>
              <Text style={styles.featureDesc}>
                Unlock neighborhood secrets and partner perks nearby as you move through the city.
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionWrap}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.primaryBtnText}>ENABLE LOCATION</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.secondaryBtnText}>ENTER ADDRESS MANUALLY</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.dismissBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.dismissBtnText}>MAYBE LATER</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbf9f8',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  heroWrap: {
    width: 240,
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  circleLayer: {
    position: 'absolute',
    borderRadius: 120,
    borderWidth: 1,
    borderColor: 'rgba(119, 90, 25, 0.2)',
  },
  circleLayer1: {
    width: 240,
    height: 240,
  },
  circleLayer2: {
    width: 280,
    height: 280,
    opacity: 0.5,
  },
  mapContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#fff',
    padding: 8,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.08,
    shadowRadius: 32,
    elevation: 4,
    position: 'relative',
  },
  mapImg: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    opacity: 0.6,
  },
  pinWrap: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinBg: {
    width: 64,
    height: 64,
    backgroundColor: '#775a19',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#fff',
  },
  headerContent: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 28,
    color: '#000',
    textAlign: 'center',
    marginBottom: 12,
  },
  desc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  featureGrid: {
    width: '100%',
    gap: 16,
    marginBottom: 32,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(197, 198, 205, 0.3)',
    alignItems: 'flex-start',
    gap: 16,
  },
  featureIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(254, 212, 136, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureTextWrap: {
    flex: 1,
  },
  featureTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
    marginBottom: 4,
  },
  featureDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#44474d',
    lineHeight: 18,
  },
  actionWrap: {
    width: '100%',
    gap: 16,
    marginBottom: 24,
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 32,
    alignItems: 'center',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  primaryBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#fff',
    letterSpacing: 2,
  },
  secondaryBtn: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 32,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#775a19',
  },
  secondaryBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#775a19',
    letterSpacing: 2,
  },
  dismissBtn: {
    padding: 8,
  },
  dismissBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 2,
  }
});
