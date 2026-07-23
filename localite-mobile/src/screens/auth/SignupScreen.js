import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthContext';

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSignup = async () => {
    if (!username || !email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    if (!agreeTerms) {
      Alert.alert('Error', 'Please agree to the Terms of Service and Privacy Policy');
      return;
    }
    
    setLoading(true);
    try {
      const result = await register(username, email, password);
      
      if (result.success) {
        await AsyncStorage.setItem('username', username);
        Alert.alert(
          'Verification Required',
          result.message,
          [{ text: 'OK', onPress: () => navigation.replace('Login') }]
        );
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Network error. Could not reach the server.');
      console.error(error);
    } finally {
      setLoading(false);
    }
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
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>LOCALITE</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          <View style={styles.headerSection}>
            <Text style={styles.title}>Modern Nobility</Text>
            <Text style={styles.subtitle}>Join an exclusive community of local explorers.</Text>
          </View>

          <View style={styles.card}>
            {/* Full Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>FULL NAME</Text>
              <View style={styles.inputContainer}>
                <TextInput 
                  style={styles.input}
                  placeholder="E.g. Alexander Sterling"
                  placeholderTextColor="rgba(68, 71, 77, 0.4)"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>EMAIL ADDRESS</Text>
              <View style={styles.inputContainer}>
                <TextInput 
                  style={styles.input}
                  placeholder="alexander@domain.com"
                  placeholderTextColor="rgba(68, 71, 77, 0.4)"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>PASSWORD</Text>
              <View style={styles.inputContainer}>
                <TextInput 
                  style={[styles.input, { paddingRight: 40 }]}
                  placeholder="••••••••"
                  placeholderTextColor="rgba(68, 71, 77, 0.4)"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity 
                  style={styles.eyeIcon} 
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="rgba(68, 71, 77, 0.6)" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Terms & Conditions */}
            <View style={styles.termsContainer}>
              <Switch 
                value={agreeTerms}
                onValueChange={setAgreeTerms}
                trackColor={{ false: "#eae8e7", true: "#775a19" }}
                thumbColor={"#ffffff"}
                ios_backgroundColor="#eae8e7"
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
              />
              <Text style={styles.termsText}>
                I agree to the <Text style={styles.termsLink}>Terms of Service</Text> and <Text style={styles.termsLink}>Privacy Policy</Text>.
              </Text>
            </View>

            {/* Create Account Button */}
            <TouchableOpacity 
              style={styles.signupBtn} 
              onPress={handleSignup}
              disabled={loading}
            >
              <Text style={styles.signupBtnText}>{loading ? 'CREATING...' : 'CREATE ACCOUNT'}</Text>
              <Ionicons name="chevron-forward" size={18} color="#ffffff" style={{ marginLeft: 8 }} />
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR SIGN UP WITH</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Buttons */}
            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity style={styles.socialBtn}>
                <Ionicons name="logo-google" size={16} color="#000000" />
                <Text style={styles.socialBtnText}>GOOGLE</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn}>
                <Ionicons name="logo-apple" size={16} color="#000000" />
                <Text style={styles.socialBtnText}>APPLE</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Link */}
          <View style={styles.loginPrompt}>
            <Text style={styles.loginText}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
        
        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 LOCALITE. ALL RIGHTS RESERVED.</Text>
          <View style={styles.footerLinks}>
            <Text style={styles.footerLinkItem}>PRIVACY</Text>
            <Text style={styles.footerLinkItem}>LEGAL</Text>
            <Text style={styles.footerLinkItem}>CONTACT</Text>
          </View>
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
    padding: 4,
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
    paddingTop: 32,
    paddingBottom: 24,
    alignItems: 'center',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 24,
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
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 32,
    borderWidth: 1,
    borderColor: '#eae8e7',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.06,
    shadowRadius: 32,
    elevation: 5,
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#44474d',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    width: '100%',
    backgroundColor: '#f5f3f3',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 16,
    color: '#000000',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 14,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    paddingRight: 10,
  },
  termsText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 13,
    color: '#44474d',
    marginLeft: 8,
    flexShrink: 1,
    marginTop: 2,
  },
  termsLink: {
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#775a19',
  },
  signupBtn: {
    width: '100%',
    backgroundColor: '#775a19',
    borderRadius: 8,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  signupBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#ffffff',
    letterSpacing: 1.2,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#eae8e7',
  },
  dividerText: {
    marginHorizontal: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#44474d',
    letterSpacing: 1,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#c5c6cd',
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 4,
  },
  socialBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 11,
    color: '#000000',
    letterSpacing: 1,
    marginLeft: 8,
  },
  loginPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 16,
    color: '#44474d',
  },
  loginLink: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
    color: '#775a19',
    textDecorationLine: 'underline',
  },
  footer: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: '#eae8e7',
    flexDirection: 'column',
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#44474d',
    letterSpacing: 1,
    marginBottom: 12,
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerLinkItem: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#44474d',
    marginHorizontal: 12,
    letterSpacing: 1,
  },
});
