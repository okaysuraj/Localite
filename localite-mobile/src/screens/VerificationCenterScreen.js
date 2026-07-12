import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image, Alert
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

export default function VerificationCenterScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [isVerifying, setIsVerifying] = useState(false);
  const [socialLinked, setSocialLinked] = useState(false);

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const res = await fetch(`${API_URL}/users/verify-identity`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setSocialLinked(true);
        Alert.alert("Verified", "Social profile linked successfully!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.appBarSafe}>
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>Localite</Text>
          <View style={{ width: 40 }} /> {/* Placeholder */}
        </View>
      </SafeAreaView>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        
        {/* Hero Header */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Trust & Safety</Text>
          <Text style={styles.heroDesc}>
            Verification ensures a secure and exclusive environment for all Localite members. Complete the steps below to unlock full hub access.
          </Text>
        </View>

        {/* Progress Overview */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>VERIFICATION STATUS</Text>
            <Text style={styles.progressValue}>66%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '66%' }]} />
          </View>
          <Text style={styles.progressFooter}>Complete social linking to achieve 'Elite' status</Text>
        </View>

        {/* Verification List */}
        <View style={styles.verificationList}>
          
          {/* Item 1 */}
          <TouchableOpacity style={styles.verifyItem} activeOpacity={0.7}>
            <View style={styles.verifyItemLeft}>
              <View style={styles.verifyIconWrap}>
                <MaterialIcons name="badge" size={24} color="#775a19" />
              </View>
              <View>
                <Text style={styles.verifyItemTitle}>ID Verification</Text>
                <Text style={styles.verifyItemDesc}>Passport or Driver's License</Text>
              </View>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: '#dcfce7' }]}>
              <Text style={[styles.statusText, { color: '#15803d' }]}>Verified</Text>
            </View>
          </TouchableOpacity>

          {/* Item 2 */}
          <TouchableOpacity style={styles.verifyItem} activeOpacity={0.7}>
            <View style={styles.verifyItemLeft}>
              <View style={styles.verifyIconWrap}>
                <MaterialIcons name="face" size={24} color="#775a19" />
              </View>
              <View>
                <Text style={styles.verifyItemTitle}>Selfie Verification</Text>
                <Text style={styles.verifyItemDesc}>Biometric Photo Scan</Text>
              </View>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: '#fed488' }]}>
              <Text style={[styles.statusText, { color: '#775a19' }]}>Pending</Text>
            </View>
          </TouchableOpacity>

          {/* Item 3 */}
          <TouchableOpacity style={[styles.verifyItem, styles.verifyItemDashed]} activeOpacity={0.7}>
            <View style={styles.verifyItemLeft}>
              <View style={[styles.verifyIconWrap, { backgroundColor: '#efeded' }]}>
                <MaterialIcons name="link" size={24} color="#75777e" />
              </View>
              <View>
                <Text style={styles.verifyItemTitle}>Social Linking</Text>
                <Text style={styles.verifyItemDesc}>LinkedIn or Instagram</Text>
              </View>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: '#e4e2e2' }]}>
              <Text style={[styles.statusText, { color: '#44474d' }]}>Not Started</Text>
            </View>
          </TouchableOpacity>

        </View>

        {/* Featured Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoHeroImageWrap}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7eEMFYb3nVTDlwo1CnwvcKs02CqE8xyTsmL4RSAV7mOzShIUg2QDO7pkJVnxFltJ132jaXH7BPZ3hDRP37dXNPdlzDFuIvF66xu5k-xfPScfVoAzviKQEfmJ83SF-t1n3AAfCm8jjX1Zz1pduhKTXYyJStW5zCc79oVOFNoTtnlI0jOKD7jNir6QroFrOIs01EdPKMCNR6gzmEBhCANDZ7ZO2bGEgnLKx0Pz5iuBPMByA7cv0bSWERQ' }}
              style={styles.infoImage}
            />
            <View style={styles.infoImageOverlay}>
              <Text style={styles.infoImageText}>Why Verify?</Text>
            </View>
          </View>
          
          <View style={styles.infoGrid}>
            <View style={styles.infoGridItem}>
              <MaterialIcons name="lock" size={24} color="#775a19" style={{ marginBottom: 8 }} />
              <Text style={styles.infoGridTitle}>Privacy First</Text>
              <Text style={styles.infoGridDesc}>Data encrypted with banking-grade protocols.</Text>
            </View>
            <View style={styles.infoGridItem}>
              <MaterialIcons name="verified-user" size={24} color="#775a19" style={{ marginBottom: 8 }} />
              <Text style={styles.infoGridTitle}>Elite Access</Text>
              <Text style={styles.infoGridDesc}>Unlock curated events and private hubs.</Text>
            </View>
          </View>
        </View>

        {/* CTA Button */}
        {!socialLinked && (
          <TouchableOpacity style={styles.ctaButton} onPress={handleVerify} disabled={isVerifying}>
            <Text style={styles.ctaButtonText}>{isVerifying ? 'Connecting...' : 'Continue Verification'}</Text>
            {!isVerifying && <MaterialIcons name="arrow-forward" size={16} color="#ffffff" />}
          </TouchableOpacity>
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbf9f8',
  },
  appBarSafe: {
    backgroundColor: '#fbf9f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eae8e7',
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
    marginLeft: -8,
  },
  appBarTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 20,
    color: '#000000',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  heroSection: {
    marginBottom: 24,
  },
  heroTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 32,
    color: '#000000',
    marginBottom: 8,
  },
  heroDesc: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 16,
    color: '#44474d',
    lineHeight: 24,
  },
  progressCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(197, 198, 205, 0.1)',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.05,
    shadowRadius: 32,
    elevation: 4,
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  progressLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#775a19',
    letterSpacing: 1,
  },
  progressValue: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 24,
    color: '#000000',
  },
  progressBarBg: {
    height: 8,
    width: '100%',
    backgroundColor: '#e4e2e2',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#775a19',
  },
  progressFooter: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#75777e',
    textAlign: 'center',
    marginTop: 16,
  },
  verificationList: {
    marginBottom: 24,
    gap: 16,
  },
  verifyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(197, 198, 205, 0.1)',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.05,
    shadowRadius: 32,
    elevation: 2,
  },
  verifyItemDashed: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(197, 198, 205, 0.4)',
    shadowOpacity: 0,
    elevation: 0,
  },
  verifyItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 16,
  },
  verifyIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(119, 90, 25, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  verifyItemTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
  },
  verifyItemDesc: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 13,
    color: '#44474d',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  infoSection: {
    marginTop: 24,
    marginBottom: 24,
  },
  infoHeroImageWrap: {
    height: 192,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
  },
  infoImage: {
    width: '100%',
    height: '100%',
  },
  infoImageOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    padding: 24,
  },
  infoImageText: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 24,
    color: '#ffffff',
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  infoGridItem: {
    flex: 1,
    backgroundColor: '#efeded',
    borderRadius: 12,
    padding: 16,
  },
  infoGridTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 11,
    color: '#000000',
    marginBottom: 4,
  },
  infoGridDesc: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 12,
    color: '#44474d',
    lineHeight: 16,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    height: 56,
    borderRadius: 28,
    gap: 8,
  },
  ctaButtonText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    color: '#ffffff',
  }
});
