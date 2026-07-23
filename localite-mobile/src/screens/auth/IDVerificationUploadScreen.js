import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function IDVerificationUploadScreen() {
  const navigation = useNavigation();
  const [processing, setProcessing] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleCapture = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setVerified(true);
    }, 2500);
  };

  const handleContinue = () => {
    setVerified(false);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Localite</Text>
        <View style={styles.avatarWrap}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCu3qSCZ4MZR0fXFRHrnauD2kzNHtrLGQTHoOQ3vvIwZ1fSa6k8tz0G1WvZJOala39IbkvjzRJyICncOKHSqBNHYcy8uab9IkbKrISlafSJPciEt0EGHgFx38zvogDFGSOCzni7dcbX-pC-nNc_9ql_t5SxrbwktgX0GKzh-yS9FY8n_5YqO5oNcTQzC-Le5-PnDAB-47HwzWY6FuVxZdz2fTcR9ix6nG0zJFt24ZY8jVn5Amp5uiPJhQ' }} 
            style={styles.avatarImg} 
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Header Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.preTitle}>SECURE VERIFICATION</Text>
          <Text style={styles.title}>Verify your Identity</Text>
          <Text style={styles.subtitle}>
            To maintain our community's standard of safety, please provide a clear image of your government-issued ID.
          </Text>
        </View>

        {/* Viewfinder */}
        <View style={styles.viewfinderContainer}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-hltUIF0yQv4Yehrp8iNhonDrcvRN7Y-tTkY8YD4D2fhfo9FfL1iymxCVlvQVEj76D2PpL1lmnQM-LXwmYbE-_0YXHL8NQxqJb7J1kXcHe9OixBsH3tWAFeiQOqdzmOqhAlkZzGNuq2MXCgGRMXKP3NIKB1RI6onONsppQS5X8TU36CXyk8jFxzYfRv4lwCJOBloc-K_5Ggk6ifFQSF0mP3ywzY97BmtQM7sxmoaO_-7W9pfLCO135Q' }}
            style={styles.viewfinderBg}
          />
          <View style={styles.viewfinderMask}>
            <View style={styles.cutout}>
              {/* Corners */}
              <View style={[styles.corner, styles.cornerTL]} />
              <View style={[styles.corner, styles.cornerTR]} />
              <View style={[styles.corner, styles.cornerBL]} />
              <View style={[styles.corner, styles.cornerBR]} />
            </View>
          </View>
          
          <View style={styles.cameraControls}>
            <TouchableOpacity style={styles.cameraBtnSmall}>
              <MaterialIcons name="flash-on" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.shutterBtn} onPress={handleCapture}>
              <View style={styles.shutterInner} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraBtnSmall}>
              <MaterialIcons name="image" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <View style={styles.instructionCard}>
            <View style={styles.instructionIconWrap}>
              <MaterialIcons name="light-mode" size={24} color="#775a19" />
            </View>
            <View style={styles.instructionTextWrap}>
              <Text style={styles.instructionTitle}>LIGHTING</Text>
              <Text style={styles.instructionDesc}>Find a well-lit area. Avoid harsh direct sunlight or deep shadows on the document.</Text>
            </View>
          </View>
          <View style={styles.instructionCard}>
            <View style={styles.instructionIconWrap}>
              <MaterialIcons name="center-focus-strong" size={24} color="#775a19" />
            </View>
            <View style={styles.instructionTextWrap}>
              <Text style={styles.instructionTitle}>CLARITY</Text>
              <Text style={styles.instructionDesc}>Ensure all four corners are visible. Text and photo must be sharp and legible.</Text>
            </View>
          </View>
        </View>

        {/* Upload Action */}
        <TouchableOpacity style={styles.uploadBtn}>
          <Text style={styles.uploadBtnText}>UPLOAD FROM GALLERY</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Processing Overlay */}
      {processing && (
        <View style={styles.overlay}>
          <View style={styles.overlayContent}>
            <View style={styles.spinner} />
            <Text style={styles.overlayTitle}>Analyzing Document</Text>
            <Text style={styles.overlayDesc}>Our high-security protocol is verifying your credentials. This typically takes a few moments.</Text>
          </View>
        </View>
      )}

      {/* Verified Overlay */}
      {verified && (
        <View style={styles.overlay}>
          <View style={styles.overlayContent}>
            <MaterialIcons name="check-circle" size={80} color="#775a19" style={{ marginBottom: 24 }} />
            <Text style={styles.overlayTitle}>Verification Sent</Text>
            <Text style={styles.overlayDesc}>Your identity has been successfully submitted for review. Welcome to the inner circle.</Text>
            <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
              <Text style={styles.continueBtnText}>CONTINUE</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  iconBtn: { padding: 4 },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
  },
  avatarWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#e4e2e2',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  sectionHeader: {
    marginBottom: 32,
  },
  preTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 2,
    marginBottom: 8,
  },
  title: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
    marginBottom: 16,
    lineHeight: 40,
  },
  subtitle: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    lineHeight: 24,
  },
  viewfinderContainer: {
    width: '100%',
    aspectRatio: 4/3,
    backgroundColor: '#0d1c32',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 32,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.15,
    shadowRadius: 32,
    elevation: 8,
  },
  viewfinderBg: {
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  viewfinderMask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13, 28, 50, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cutout: {
    width: '85%',
    height: '70%',
    borderWidth: 2,
    borderColor: 'rgba(119, 90, 25, 0.3)',
    borderStyle: 'dashed',
    borderRadius: 8,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#fed488',
  },
  cornerTL: { top: -2, left: -2, borderTopWidth: 4, borderLeftWidth: 4 },
  cornerTR: { top: -2, right: -2, borderTopWidth: 4, borderRightWidth: 4 },
  cornerBL: { bottom: -2, left: -2, borderBottomWidth: 4, borderLeftWidth: 4 },
  cornerBR: { bottom: -2, right: -2, borderBottomWidth: 4, borderRightWidth: 4 },
  cameraControls: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
  },
  cameraBtnSmall: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shutterBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  shutterInner: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    backgroundColor: '#fff',
  },
  instructionsContainer: {
    gap: 16,
    marginBottom: 32,
  },
  instructionCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 16,
    borderWidth: 1,
    borderColor: '#eae8e7',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 12,
    elevation: 1,
  },
  instructionIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(254, 212, 136, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionTextWrap: {
    flex: 1,
  },
  instructionTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#000',
    letterSpacing: 1,
    marginBottom: 4,
  },
  instructionDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
    lineHeight: 20,
  },
  uploadBtn: {
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(119, 90, 25, 0.3)',
    paddingBottom: 4,
  },
  uploadBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    padding: 24,
  },
  overlayContent: {
    alignItems: 'center',
  },
  spinner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'rgba(119, 90, 25, 0.2)',
    borderTopColor: '#775a19',
    marginBottom: 32,
  },
  overlayTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  overlayDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#e9c176',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  continueBtn: {
    backgroundColor: '#775a19',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 32,
  },
  continueBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#fff',
    letterSpacing: 2,
  }
});
