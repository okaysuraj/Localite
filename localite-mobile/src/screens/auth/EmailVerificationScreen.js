import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EmailVerificationScreen({ navigation }) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length < 4) {
      Alert.alert('Error', 'Please enter the 4-digit code');
      return;
    }
    
    setLoading(true);
    // Simulate verification
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Email verified successfully!', [
        { text: 'OK', onPress: () => navigation.replace('MainApp') }
      ]);
    }, 1500);
  };

  const handleResend = () => {
    Alert.alert('Sent', 'Verification code resent to your email.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* App Bar */}
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => navigation.canGoBack() ? navigation.goBack() : null} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#1b1c1c" />
            <Text style={styles.backText}>BACK</Text>
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>LOCALITE</Text>
          <View style={{ width: 60 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          <View style={styles.card}>
            {/* Hero Image */}
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ6Pn0s-rlGp_WV3NLokmsK2Epkwo446eUPdgmOmugLpAbXL9A4wA_TC7L4BrRZIx43bFqXJVzt6gUwmnSKWrCzWPmC1CMIPN36oBFg_5jfccnTs2PqDzq4C01vxTkP7D81cuebtDwMJ6pkfSWExey8dfNfeoNQ3hcnMwf-y8DmLsM4bHMlvsjTb_rGUcivlLg6n0xwb9jDjqIq1y5EgyebACh7tj97KfdMtqPNbleUpfLZCL-OJJBRA' }} 
                style={styles.image} 
              />
              <View style={styles.imageOverlay} />
              <View style={styles.imageBadge}>
                <Text style={styles.imageBadgeText}>SECURITY</Text>
              </View>
            </View>

            {/* Header Section */}
            <View style={styles.headerSection}>
              <Text style={styles.title}>Verify Your Email</Text>
              <Text style={styles.subtitle}>We sent a 4-digit code to your inbox.</Text>
            </View>

            {/* OTP Inputs */}
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={ref => inputs.current[index] = ref}
                  style={[styles.otpInput, digit ? styles.otpInputFilled : null]}
                  value={digit}
                  onChangeText={(val) => handleOtpChange(val, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="numeric"
                  maxLength={1}
                  selectTextOnFocus
                />
              ))}
            </View>

            {/* Verify Button */}
            <TouchableOpacity 
              style={styles.verifyBtn} 
              onPress={handleVerify}
              disabled={loading}
            >
              <Text style={styles.verifyBtnText}>{loading ? 'VERIFYING...' : 'VERIFY'}</Text>
            </TouchableOpacity>

            {/* Resend Link */}
            <View style={styles.resendPrompt}>
              <Text style={styles.resendText}>
                Didn't receive the code?{' '}
              </Text>
              <TouchableOpacity onPress={handleResend}>
                <Text style={styles.resendLink}>Resend Code</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
        
        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>LOCALITE COLLECTIVE © 2024 • PRIVACY FIRST</Text>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fbf9f8',
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#000000',
    letterSpacing: 2,
    marginLeft: 8,
    textTransform: 'uppercase',
  },
  appBarTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 32,
    color: '#000000',
    letterSpacing: -0.5,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 32,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.08,
    shadowRadius: 32,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  imageBadge: {
    position: 'absolute',
    bottom: 16,
    left: 24,
  },
  imageBadgeText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 2,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 32,
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 16,
    color: '#44474d',
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
    gap: 16,
  },
  otpInput: {
    width: 64,
    height: 80,
    backgroundColor: '#f5f3f3',
    borderRadius: 8,
    textAlign: 'center',
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 32,
    color: '#000000',
  },
  otpInputFilled: {
    borderWidth: 1.5,
    borderColor: '#775a19',
    backgroundColor: '#ffffff',
  },
  verifyBtn: {
    width: '100%',
    backgroundColor: '#775a19',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  verifyBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#ffffff',
    letterSpacing: 2,
  },
  resendPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resendText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 16,
    color: '#44474d',
  },
  resendLink: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
    color: '#775a19',
    textDecorationLine: 'underline',
  },
  footer: {
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    opacity: 0.3,
  },
  footerText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#44474d',
    letterSpacing: 2,
  },
});
