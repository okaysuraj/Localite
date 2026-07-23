import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, Switch, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function LocationSettingsScreen() {
  const navigation = useNavigation();

  // Toggles state
  const [guardian, setGuardian] = useState(true);
  const [discovery, setDiscovery] = useState(true);
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <MaterialIcons name="menu" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Localite</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.avatarWrap}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzXhNR0_nhdHY5iEySAwUYQKyYaWe4gWsGHk3krxy49w9A3EBj-pmxHOZ5PJQooH7JveFO30WU-MIhKfw1D8eb7dFUwmghhdyJDpYKIsooivJ0DAhBOCUgEebowt9Ac_fjuwDwrzK5oiT0znt7EXGZ6SFprlyOsVt7xLUyriFsuhP05031tMkbevItNTzyrNPk_1-uLSpUWWHx6huH-UhUvB6msaVDoC2bb8p4ATvGAGSvaK-LSJeclA' }} 
              style={styles.avatarImg} 
            />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Page Header */}
        <View style={styles.pageHeader}>
          <Text style={styles.preTitle}>PRIVACY & SAFETY</Text>
          <Text style={styles.pageTitle}>Your Location, Curated for Your Experience.</Text>
          <Text style={styles.pageDesc}>
            At Localite, proximity is the catalyst for community. Manage how we use your location data to enhance safety, discovery, and seamless event arrivals.
          </Text>
        </View>

        {/* Guardian Presence */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <MaterialIcons name="security" size={20} color="#775a19" />
              <Text style={styles.cardBadge}>ALWAYS ON</Text>
            </View>
            <Switch
              trackColor={{ false: '#eae8e7', true: '#775a19' }}
              thumbColor={'#fff'}
              ios_backgroundColor="#eae8e7"
              onValueChange={setGuardian}
              value={guardian}
            />
          </View>
          <Text style={styles.cardTitle}>Guardian Presence</Text>
          <Text style={styles.cardDesc}>
            Enable "Always On" tracking for comprehensive safety features. This mode powers our SOS Signal and Late-Night Check-in, allowing trusted community moderators to verify your safety.
          </Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={18} color="#000" />
              <Text style={styles.featureText}>AUTOMATIC SOS TRIGGERS</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={18} color="#000" />
              <Text style={styles.featureText}>HUB-TO-HUB PROTECTION</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>ACTIVATE GUARDIAN</Text>
          </TouchableOpacity>
        </View>

        {/* Smart Discovery */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <MaterialIcons name="explore" size={20} color="#775a19" />
              <Text style={styles.cardBadge}>WHILE USING</Text>
            </View>
            <Switch
              trackColor={{ false: '#eae8e7', true: '#775a19' }}
              thumbColor={'#fff'}
              ios_backgroundColor="#eae8e7"
              onValueChange={setDiscovery}
              value={discovery}
            />
          </View>
          <Text style={styles.cardTitle}>Smart Discovery</Text>
          <Text style={styles.cardDesc}>
            Locate hidden boutiques and pop-up events only when the app is active. Perfect for the member who values privacy but seeks inspiration.
          </Text>
          <View style={styles.mapPreviewWrap}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3vdSYSHvbuvMadnyeIvlFKMZN9sFUqXrFlgQjh7ce_koPLcyHG8Isrvn_HY_uHqUw21zczFlM4FnqvySEjn0Czm945JLHYSlg9TS2O2wS3rlUxKsZN7kqLIT9lxn-jCVh1mjqwfWpdneo3KxBQhWblZlmTr8OZgpDC8Tm9hZRgRxE9_AeJFvGyBTT3q90UC2N98ftMf0X896udrLYDaQ9Ah5-kJ7M5j1yOoMvBN_HsDsppNWIIbhLag' }} 
              style={styles.mapPreview} 
            />
          </View>
          <TouchableOpacity style={styles.secondaryBtn}>
            <Text style={styles.secondaryBtnText}>ENABLE DISCOVERY</Text>
          </TouchableOpacity>
        </View>

        {/* Precise Location */}
        <View style={styles.darkCard}>
          <View style={styles.darkCardHeaderLeft}>
            <MaterialIcons name="location-on" size={20} color="#e9c176" />
            <Text style={styles.darkCardBadge}>PRECISE LOCATION</Text>
          </View>
          <Text style={styles.darkCardTitle}>The Concierge Arrival</Text>
          <Text style={styles.darkCardDesc}>
            Grant precise access for high-end event interactions. This allows for Hands-Free Check-ins and Hyper-Local Notifications.
          </Text>
          <View style={styles.darkFeatureList}>
            <View style={styles.darkFeatureBox}>
              <Text style={styles.darkFeatureLabel}>FEATURE</Text>
              <Text style={styles.darkFeatureValue}>Zero-Wait Entry</Text>
            </View>
            <View style={styles.darkFeatureBox}>
              <Text style={styles.darkFeatureLabel}>FEATURE</Text>
              <Text style={styles.darkFeatureValue}>Proximity Content</Text>
            </View>
          </View>
          <View style={styles.darkImageWrap}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2rm63TZFUS30Vqw7u4LHuhlSWr-NZakljeTtHuyhFYni_vrxjoGC_CHV9mAREWkMHfwHT60O4Sq2REi6ooUBM6mxJXwW-hOSWDYR_Vh3BO-QELxgiqJ5OIi6eZqGPh0NZTu9VOs7iHwsluVKgdH26_r_EJr-YBeXK2ahpFreXWT3Yho2eIazB0K0rcLHsNxQJw5AASY35q7Vqc7aGhPJrDBYQ3t63w6hdvD2Fvhkp9OsCgc2HyluZPw' }} 
              style={styles.darkImage} 
            />
            <View style={styles.darkImageOverlay}>
              <TouchableOpacity style={styles.goldBtn}>
                <Text style={styles.goldBtnText}>ENABLE PRECISE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Privacy Note */}
        <View style={styles.privacyNote}>
          <Text style={styles.privacyTitle}>A Note on Integrity</Text>
          <Text style={styles.privacyDesc}>
            Localite never sells your movement data to third parties. We utilize your coordinates exclusively to craft the premium experiences and safety protocols that define our membership.
          </Text>
          <TouchableOpacity style={styles.privacyLink}>
            <Text style={styles.privacyLinkText}>READ FULL PRIVACY CHARTER</Text>
            <MaterialIcons name="arrow-forward" size={16} color="#775a19" />
          </TouchableOpacity>
        </View>

      </ScrollView>
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
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fbf9f8',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    zIndex: 10,
    paddingTop: Platform.OS === 'android' ? 40 : 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: { padding: 4 },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    fontStyle: 'italic',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#c5c6cd',
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  pageHeader: {
    marginBottom: 32,
  },
  preTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 2,
    marginBottom: 8,
  },
  pageTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
    marginBottom: 12,
  },
  pageDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    lineHeight: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardBadge: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
  },
  cardTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    marginBottom: 16,
  },
  cardDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
    lineHeight: 20,
    marginBottom: 24,
  },
  featureList: {
    gap: 12,
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#000',
    letterSpacing: 1,
  },
  primaryBtn: {
    backgroundColor: '#000',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#fff',
    letterSpacing: 1,
  },
  mapPreviewWrap: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
  },
  mapPreview: {
    width: '100%',
    height: '100%',
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: '#775a19',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
  },
  darkCard: {
    backgroundColor: '#0d1c32',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  darkCardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  darkCardBadge: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#e9c176',
    letterSpacing: 1,
  },
  darkCardTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#d6e3ff',
    marginBottom: 16,
  },
  darkCardDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: 'rgba(118, 132, 159, 0.8)',
    lineHeight: 20,
    marginBottom: 24,
  },
  darkFeatureList: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  darkFeatureBox: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderWidth: 1,
    borderColor: 'rgba(118, 132, 159, 0.2)',
    borderRadius: 8,
    padding: 12,
    flex: 1,
  },
  darkFeatureLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#fff',
    opacity: 0.6,
    marginBottom: 4,
  },
  darkFeatureValue: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    color: '#fff',
  },
  darkImageWrap: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  darkImage: {
    width: '100%',
    height: '100%',
  },
  darkImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13, 28, 50, 0.6)',
    justifyContent: 'flex-end',
    padding: 16,
  },
  goldBtn: {
    backgroundColor: '#e9c176',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 24,
  },
  goldBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#785a1a',
    letterSpacing: 1,
  },
  privacyNote: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#efeded',
    paddingTop: 32,
  },
  privacyTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000',
    marginBottom: 16,
  },
  privacyDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
    lineHeight: 20,
    marginBottom: 16,
  },
  privacyLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  privacyLinkText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
    textDecorationLine: 'underline',
  }
});
