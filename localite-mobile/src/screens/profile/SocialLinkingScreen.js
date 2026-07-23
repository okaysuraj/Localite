import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Platform, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SocialLinkingScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* TopAppBar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Localite</Text>
        </View>
        <View style={styles.profileBtn}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXpbOf3odtKfFSLt2116-Gv9BQvBFhjhzdV6LNWbQDrG2qBhR2Lu3ycnaQsSRAdYGHnkupoDszWRVWxzkmW66lThyRNJanmXSGI5r8hMivd7XgFuGi5VPtDdz3Fmfew1x1dPSYpu1k8Hn4fHmldr3johk_VjQYHh2qj4hcErzn4OqV2z5tRgUImVthWznN_4FJRRa-IPD09IJ1OP3iEypvQbNU3JyvI_xDYVk16EiJOoHLJOvQgb4CmQ' }} 
            style={styles.profileImg} 
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroLabel}>VERIFICATION</Text>
          <Text style={styles.heroTitle}>Elevate Your Status</Text>
          <Text style={styles.heroDesc}>
            Join our circle of trust. Linking your professional and social profiles helps us maintain the integrity of our exclusive community.
          </Text>
        </View>

        {/* Social Connections List */}
        <View style={styles.connectionsList}>
          {/* LinkedIn */}
          <TouchableOpacity style={styles.connectionCard}>
            <View style={styles.cardLeft}>
              <View style={[styles.iconWrap, { backgroundColor: '#000' }]}>
                <MaterialIcons name="badge" size={24} color="#fff" />
              </View>
              <View style={styles.cardTextWrap}>
                <Text style={styles.cardLabel}>PROFESSIONAL</Text>
                <Text style={styles.cardTitle}>Connect LinkedIn</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#75777e" />
          </TouchableOpacity>

          {/* Instagram */}
          <TouchableOpacity style={styles.connectionCard}>
            <View style={styles.cardLeft}>
              <View style={[styles.iconWrap, { backgroundColor: '#775a19' }]}>
                <MaterialIcons name="photo-camera" size={24} color="#fff" />
              </View>
              <View style={styles.cardTextWrap}>
                <Text style={styles.cardLabel}>LIFESTYLE</Text>
                <Text style={styles.cardTitle}>Connect Instagram</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#75777e" />
          </TouchableOpacity>

          {/* X (Twitter) */}
          <TouchableOpacity style={styles.connectionCard}>
            <View style={styles.cardLeft}>
              <View style={[styles.iconWrap, { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#000' }]}>
                <MaterialIcons name="alternate-email" size={24} color="#000" />
              </View>
              <View style={styles.cardTextWrap}>
                <Text style={styles.cardLabel}>COMMUNITY</Text>
                <Text style={styles.cardTitle}>Connect X</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#75777e" />
          </TouchableOpacity>
        </View>

        {/* Privacy Section */}
        <View style={styles.privacySection}>
          <View style={styles.privacyGlow} />
          <View style={styles.privacyContent}>
            <MaterialIcons name="verified-user" size={36} color="#775a19" style={styles.privacyIcon} />
            <Text style={styles.privacyTitle}>Your Privacy is Paramount</Text>
            <Text style={styles.privacyDesc}>
              We use these connections solely to verify your identity and professional background. This ensures every member of Localite is exactly who they say they are.
            </Text>
            
            <View style={styles.privacyDisclaimer}>
              <MaterialIcons name="check-circle" size={16} color="#775a19" style={{ marginTop: 2 }} />
              <Text style={styles.disclaimerText}>
                Localite will <Text style={{ color: '#000', fontWeight: 'bold' }}>never</Text> post to your accounts, message your contacts, or share your private social data with third parties without your explicit, one-time permission.
              </Text>
            </View>
          </View>
        </View>

        {/* Footer Action */}
        <View style={styles.footerAction}>
          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>COMPLETE VERIFICATION</Text>
          </TouchableOpacity>
          <Text style={styles.encryptionText}>SECURE 256-BIT ENCRYPTION</Text>
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
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 40 : 16,
    paddingBottom: 16,
    backgroundColor: '#fbf9f8',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(197, 198, 205, 0.3)',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.05,
    shadowRadius: 32,
    elevation: 4,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 28,
    color: '#000',
    letterSpacing: -0.5,
  },
  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(197, 198, 205, 0.3)',
    overflow: 'hidden',
    backgroundColor: '#efeded',
  },
  profileImg: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 48,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  heroLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#775a19',
    letterSpacing: 2,
    marginBottom: 8,
  },
  heroTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
    marginBottom: 16,
  },
  heroDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 18,
    color: '#44474d',
    textAlign: 'center',
    lineHeight: 28,
  },
  connectionsList: {
    gap: 16,
    marginBottom: 48,
  },
  connectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 2,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTextWrap: {
    gap: 4,
  },
  cardLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#44474d',
    letterSpacing: 2,
    opacity: 0.6,
  },
  cardTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
    color: '#000',
  },
  privacySection: {
    backgroundColor: '#f5f3f3',
    padding: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(197, 198, 205, 0.2)',
    position: 'relative',
    overflow: 'hidden',
  },
  privacyGlow: {
    position: 'absolute',
    top: -48,
    right: -48,
    width: 128,
    height: 128,
    backgroundColor: 'rgba(119, 90, 25, 0.05)',
    borderRadius: 64,
  },
  privacyContent: {
    alignItems: 'center',
  },
  privacyIcon: {
    marginBottom: 16,
  },
  privacyTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    marginBottom: 12,
  },
  privacyDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    textAlign: 'center',
    marginBottom: 16,
  },
  privacyDisclaimer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 16,
    borderRadius: 12,
  },
  disclaimerText: {
    flex: 1,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 11,
    color: '#1b1c1c',
    lineHeight: 18,
  },
  footerAction: {
    marginTop: 48,
    alignItems: 'center',
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
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
  encryptionText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 2,
    marginTop: 16,
  }
});
