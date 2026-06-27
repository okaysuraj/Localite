import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      if (!userCredential.user.emailVerified) {
        await signOut(auth);
        Alert.alert('Verification Required', 'Please verify your email before logging in. Check your inbox.');
        return;
      }

      const token = await userCredential.user.getIdToken();
      await AsyncStorage.setItem('userToken', token); // Keep for legacy/compatibility
      // We don't have username from Firebase directly without a backend fetch, 
      // but we can fetch it if needed or just skip setting it if not strictly required
      navigation.replace('MainApp');
    } catch (error) {
      Alert.alert('Error', error.message || 'Network error. Could not reach the server.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <Ionicons name="location" size={40} color="white" />
          </View>
          <Text style={styles.logoText}>Localite</Text>
        </View>
        
        <Text style={styles.title}>WELCOME BACK</Text>
        
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#94a3b8" style={styles.inputIcon} />
          <TextInput 
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#94a3b8"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#94a3b8" style={styles.inputIcon} />
          <TextInput 
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#94a3b8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity 
          style={styles.loginBtn} 
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginText}>{loading ? 'AUTHENTICATING...' : 'INITIALIZE SESSION'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkBtn} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.linkText}>Don't have an account? <Text style={styles.linkHighlight}>Sign Up</Text></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  content: { flex: 1, justifyContent: 'center', padding: 20 },
  logoContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 40 },
  logoIcon: { backgroundColor: '#ccff00', padding: 10, borderRadius: 12, marginRight: 10 },
  logoText: { color: 'white', fontSize: 32, fontWeight: 'bold' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#f8fafc', marginBottom: 30, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(30, 41, 59, 0.9)', borderRadius: 10, marginBottom: 15, paddingHorizontal: 15, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.05)' },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, paddingVertical: 15, color: 'white', fontSize: 16 },
  loginBtn: { backgroundColor: '#ccff00', paddingVertical: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  loginText: { color: '#0f172a', fontWeight: 'bold', fontSize: 16, textTransform: 'uppercase', letterSpacing: 1 },
  linkBtn: { marginTop: 20, alignItems: 'center' },
  linkText: { color: '#94a3b8', fontSize: 14 },
  linkHighlight: { color: '#ccff00', fontWeight: 'bold' }
});
