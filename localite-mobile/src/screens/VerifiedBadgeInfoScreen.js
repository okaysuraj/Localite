import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, Animated, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function VerifiedBadgeInfoScreen() {
  const navigation = useNavigation();
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <MaterialIcons name="close" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Royal Assemblage</Text>
        <View style={styles.avatarWrap}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfmT29yfFr1H3JrLB8nKFa9bjkxLCF3KcdpsLcCVcXzSLdbxGPsNhm_ljsLWKHY_qx_KSnNJ5AmcckqI2l2-4gAnWdTdzQLNyxdkXEhbSQhB9axwsQ35xruJSznjJG8nEuPEgvrepMQGBl08bFciJm37ec-jl3uBe01bMAlPqULMsue44SsQKBPN1eCT_FdjjOVkmGjM9IXvEDxyt1pizv_KNaunwzSrevVaGXR1JO7BM48mh19T0Dsg' }}
            style={styles.avatarImg}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.badgeWrap}>
            <Animated.View style={[styles.pulseRing, { transform: [{ scale: pulseAnim }] }]} />
            <View style={styles.badgeContainer}>
              <MaterialIcons name="verified" size={72} color="#fff" />
            </View>
          </View>
          <Text style={styles.heroTitle}>The Mark of Distinction</Text>
          <Text style={styles.heroDesc}>
            Elevate your presence within the Royal Assemblage. Our verification process ensures that every member of our curated circle is authentic and esteemed.
          </Text>
        </View>

        {/* Status Breakdown */}
        <View style={styles.statusGrid}>
          {/* Verified Status */}
          <View style={styles.statusCard}>
            <View style={styles.statusHeaderRow}>
              <MaterialIcons name="check-circle" size={16} color="#775a19" />
              <Text style={styles.statusLabel}>VERIFIED STATUS</Text>
            </View>
            <Text style={styles.statusTitle}>Authenticity Confirmed</Text>
            <Text style={styles.statusDesc}>
              The baseline for community trust. Indicates that the individual's identity has been cross-referenced with official documentation.
            </Text>
            <View style={styles.statusList}>
              <View style={styles.listItem}>
                <MaterialIcons name="done" size={16} color="#1b1c1c" />
                <Text style={styles.listItemText}>Basic Event Access</Text>
              </View>
              <View style={styles.listItem}>
                <MaterialIcons name="done" size={16} color="#1b1c1c" />
                <Text style={styles.listItemText}>Direct Messaging Rights</Text>
              </View>
            </View>
          </View>

          {/* Elite Status */}
          <View style={[styles.statusCard, styles.eliteCard]}>
            <MaterialIcons name="workspace-premium" size={120} color="rgba(255,255,255,0.1)" style={styles.eliteBgIcon} />
            <View style={styles.statusHeaderRow}>
              <MaterialIcons name="grade" size={16} color="#fed488" />
              <Text style={[styles.statusLabel, { color: '#fed488' }]}>ELITE STATUS</Text>
            </View>
            <Text style={[styles.statusTitle, { color: '#fff' }]}>Pillar of Reputation</Text>
            <Text style={[styles.statusDesc, { color: 'rgba(214, 227, 255, 0.8)' }]}>
              Reserved for members with high community rapport, verified social standing, and a history of excellence.
            </Text>
            <View style={[styles.statusList, { borderTopColor: 'rgba(255,255,255,0.1)' }]}>
              <View style={styles.listItem}>
                <MaterialIcons name="verified" size={16} color="#fed488" />
                <Text style={[styles.listItemText, { color: '#fff' }]}>Private Salon Access</Text>
              </View>
              <View style={styles.listItem}>
                <MaterialIcons name="verified" size={16} color="#fed488" />
                <Text style={[styles.listItemText, { color: '#fff' }]}>Priority Table Reservations</Text>
              </View>
            </View>
          </View>
        </View>

        {/* The Protocol */}
        <View style={styles.protocolSection}>
          <Text style={styles.protocolPre}>THE PROTOCOL</Text>
          <Text style={styles.protocolTitle}>Refining the Circle</Text>
          
          <View style={styles.stepsWrap}>
            {/* Step 1 */}
            <View style={styles.stepItem}>
              <View style={styles.stepNumWrap}>
                <Text style={styles.stepNum}>01</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Identity Attestation</Text>
                <Text style={styles.stepDesc}>A secure, encrypted upload of government-issued identification to confirm your legal name and age.</Text>
              </View>
            </View>
            {/* Step 2 */}
            <View style={styles.stepItem}>
              <View style={styles.stepNumWrap}>
                <Text style={styles.stepNum}>02</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Social Integration</Text>
                <Text style={styles.stepDesc}>Synchronizing professional or curated social presences to provide a multidimensional view of your community impact.</Text>
              </View>
            </View>
            {/* Step 3 */}
            <View style={styles.stepItem}>
              <View style={styles.stepNumWrap}>
                <Text style={styles.stepNum}>03</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Reputation Review</Text>
                <Text style={styles.stepDesc}>A qualitative assessment of your interactions and feedback from existing verified members within the network.</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Visual Element */}
        <View style={styles.visualWrap}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfgP_UFVgHM9UM860ZfPCrHLu1nlwlwpaXIJByHoo9nZdyMQnxFf-XNyHZcX3M9GUuEk9zcFl1SOre6gIGQXZQ70ZnAxMjJRJjGJ2WTaaFz1IrD_1rTAkOB7xijIhf-sfHd6Cqpzv2U_0M9bys9JLANp63gl1m4KWuI3SLM7_GEMcWfyd0IdJOSugXV4XYtWlxMayc1C-8B12kJIyo2vxnDUm_L9alwgH97JTMf9LdMi5kFnFFfugvjQ' }}
            style={styles.visualImg}
          />
          <View style={styles.visualOverlay}>
            <Text style={styles.visualQuote}>"In a world of noise, we curate the signal."</Text>
          </View>
        </View>

      </ScrollView>

      {/* Fixed Bottom Action */}
      <View style={styles.bottomActionWrap}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('IDVerificationUpload')}>
          <Text style={styles.actionBtnText}>INITIATE VERIFICATION</Text>
        </TouchableOpacity>
        <Text style={styles.actionSubText}>APPROXIMATE REVIEW TIME: 48-72 HOURS</Text>
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
    paddingVertical: 12,
    backgroundColor: '#fbf9f8',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.05,
    shadowRadius: 32,
    elevation: 4,
    zIndex: 10,
    paddingTop: Platform.OS === 'android' ? 40 : 12,
  },
  iconBtn: { padding: 4 },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    letterSpacing: -0.5,
  },
  avatarWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#c5c6cd',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 24,
    paddingBottom: 140,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  badgeWrap: {
    position: 'relative',
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  pulseRing: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: 'rgba(119, 90, 25, 0.2)',
  },
  badgeContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#d2ab67', // simplified gold gradient approximation
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.1,
    shadowRadius: 32,
    elevation: 5,
  },
  heroTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
    marginBottom: 16,
    textAlign: 'center',
  },
  heroDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    textAlign: 'center',
    lineHeight: 24,
  },
  statusGrid: {
    gap: 16,
    marginBottom: 48,
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.05,
    shadowRadius: 32,
    elevation: 4,
  },
  eliteCard: {
    backgroundColor: '#000',
    position: 'relative',
    overflow: 'hidden',
  },
  eliteBgIcon: {
    position: 'absolute',
    top: -20,
    right: -20,
  },
  statusHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  statusLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
  },
  statusTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    marginBottom: 8,
  },
  statusDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
    lineHeight: 20,
    marginBottom: 16,
  },
  statusList: {
    borderTopWidth: 1,
    borderTopColor: '#e4e2e2',
    paddingTop: 16,
    gap: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  listItemText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#1b1c1c',
  },
  protocolSection: {
    marginBottom: 48,
  },
  protocolPre: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
    textAlign: 'center',
  },
  protocolTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 24,
  },
  stepsWrap: {
    gap: 24,
  },
  stepItem: {
    flexDirection: 'row',
    gap: 16,
  },
  stepNumWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#75777e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNum: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 18,
    color: '#75777e',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    color: '#000',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  stepDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
    lineHeight: 20,
  },
  visualWrap: {
    height: 240,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.1,
    shadowRadius: 32,
    elevation: 4,
  },
  visualImg: {
    width: '100%',
    height: '100%',
  },
  visualOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    padding: 24,
  },
  visualQuote: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#fff',
    fontStyle: 'italic',
  },
  bottomActionWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#e4e2e2',
  },
  actionBtn: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 5,
    marginBottom: 12,
  },
  actionBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#fff',
    letterSpacing: 2,
  },
  actionSubText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 10,
    color: '#75777e',
    textAlign: 'center',
    letterSpacing: 1,
  }
});
