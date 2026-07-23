import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';

export default function SelfieVerificationScreen() {
  const navigation = useNavigation();
  const [processing, setProcessing] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleCapture = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setVerified(true);
    }, 1800);
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
          <MaterialIcons name="close" size={24} color="#44474d" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Localite</Text>
        <View style={{ width: 32 }} /> {/* Spacer */}
      </View>

      <View style={styles.content}>
        
        {/* Instructional Header */}
        <View style={styles.instructionalHeader}>
          <Text style={styles.title}>Identity Verification</Text>
          <Text style={styles.subtitle}>
            Position your face within the circle and ensure your eyes are visible.
          </Text>
        </View>

        {/* Verification Frame */}
        <View style={styles.frameContainer}>
          <View style={styles.cameraPlaceholder}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgShfMHKZaLsbPETFdVi1BWVZ11Vm38Jy8FBX5eZj8C8SPi9_bi1LTdsAqyXTPh_eX4oc4zvA8mJ3mTc8lzq5C0oawxoQW5qqJwM8YsWp6J_AR-mGWuCbvFW7Y83Yv5VAtMQbWkCas66SE8aD7RekvvgGNd686C_3umKrR58lOvUwaUtIFTpKES9MTlSXrCzr8Q9JLxqls2jhH2neL2QCB2vB85HIlDlbe837oa6EDBewVE7LuvQE58A' }}
              style={styles.cameraImg}
            />
          </View>

          <View style={styles.captureCircle}>
            <View style={styles.scanlineWrap}>
              <View style={styles.scanline} />
            </View>
            <View style={styles.guideLines}>
              <Svg height="240" width="240" viewBox="0 0 240 240">
                <Path d="M120 40C90 40 60 70 60 110C60 150 85 190 120 190C155 190 180 150 180 110C180 70 150 40 120 40Z" stroke="#775a19" strokeDasharray="8 8" strokeWidth="2" fill="none" />
              </Svg>
            </View>
          </View>

          {/* Corners */}
          <View style={[styles.corner, styles.cornerTL]} />
          <View style={[styles.corner, styles.cornerTR]} />
          <View style={[styles.corner, styles.cornerBL]} />
          <View style={[styles.corner, styles.cornerBR]} />
        </View>

        {/* Requirements */}
        <View style={styles.requirementsBox}>
          <View style={styles.reqRow}>
            <MaterialIcons name="check-circle" size={20} color="#775a19" />
            <Text style={styles.reqText}>GOOD LIGHTING</Text>
          </View>
          <View style={styles.reqRow}>
            <MaterialIcons name="panorama-fish-eye" size={20} color="#75777e" />
            <Text style={styles.reqText}>FACE WITHIN CIRCLE</Text>
          </View>
          <View style={styles.reqRow}>
            <MaterialIcons name="panorama-fish-eye" size={20} color="#75777e" />
            <Text style={styles.reqText}>NO GLASSES OR HATS</Text>
          </View>
        </View>

        <View style={{ flex: 1 }} />

        {/* Action */}
        <View style={styles.actionWrap}>
          <TouchableOpacity style={[styles.captureBtn, processing && {opacity: 0.7}]} onPress={handleCapture} disabled={processing}>
            {processing ? (
              <MaterialIcons name="sync" size={24} color="#775a19" />
            ) : (
              <>
                <Text style={styles.captureBtnText}>CAPTURE</Text>
                <MaterialIcons name="camera" size={24} color="#775a19" />
              </>
            )}
          </TouchableOpacity>
          <Text style={styles.secureText}>Secure 256-bit encrypted verification.</Text>
        </View>

      </View>

      {/* Success Modal */}
      {verified && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.verifiedIconWrap}>
              <MaterialIcons name="verified-user" size={36} color="#785a1a" />
            </View>
            <Text style={styles.modalTitle}>Authenticated</Text>
            <Text style={styles.modalDesc}>Your identity has been confirmed. Welcome to the inner circle.</Text>
            <TouchableOpacity style={styles.enterBtn} onPress={handleContinue}>
              <Text style={styles.enterBtnText}>ENTER HUB</Text>
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
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#fbf9f8',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.05,
    shadowRadius: 32,
    elevation: 4,
    zIndex: 10,
    paddingTop: Platform.OS === 'android' ? 40 : 16,
  },
  iconBtn: { padding: 4 },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 28,
    color: '#000',
    letterSpacing: -0.5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    alignItems: 'center',
  },
  instructionalHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 24,
  },
  frameContainer: {
    width: '100%',
    aspectRatio: 1,
    maxWidth: 340,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 24,
  },
  cameraPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 200,
    borderWidth: 2,
    borderColor: 'rgba(197, 198, 205, 0.2)',
    overflow: 'hidden',
  },
  cameraImg: {
    width: '100%',
    height: '100%',
    opacity: 0.4,
  },
  captureCircle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 4,
    borderColor: '#775a19',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#775a19',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  scanlineWrap: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(119, 90, 25, 0.05)',
  },
  scanline: {
    width: '100%',
    height: 2,
    backgroundColor: '#775a19',
    shadowColor: '#775a19',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
    top: '50%',
  },
  guideLines: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.3,
  },
  corner: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderColor: 'rgba(119, 90, 25, 0.4)',
  },
  cornerTL: { top: 0, left: 0, borderTopWidth: 2, borderLeftWidth: 2, borderTopLeftRadius: 12 },
  cornerTR: { top: 0, right: 0, borderTopWidth: 2, borderRightWidth: 2, borderTopRightRadius: 12 },
  cornerBL: { bottom: 0, left: 0, borderBottomWidth: 2, borderLeftWidth: 2, borderBottomLeftRadius: 12 },
  cornerBR: { bottom: 0, right: 0, borderBottomWidth: 2, borderRightWidth: 2, borderBottomRightRadius: 12 },
  requirementsBox: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 2,
    gap: 8,
  },
  reqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reqText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#44474d',
    letterSpacing: 1,
  },
  actionWrap: {
    width: '100%',
    paddingBottom: 24,
  },
  captureBtn: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  captureBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#fff',
    letterSpacing: 2,
    marginBottom: 4,
  },
  secureText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 13,
    color: 'rgba(68, 71, 77, 0.6)',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 16,
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(27, 28, 28, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    zIndex: 60,
  },
  modalContent: {
    backgroundColor: '#fbf9f8',
    borderRadius: 12,
    padding: 48,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 32 },
    shadowOpacity: 0.2,
    shadowRadius: 64,
    elevation: 24,
  },
  verifiedIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fed488',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    marginBottom: 8,
  },
  modalDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  enterBtn: {
    width: '100%',
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  enterBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#fff',
    letterSpacing: 2,
  }
});
