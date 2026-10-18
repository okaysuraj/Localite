import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { 
  PlayfairDisplay_400Regular, 
  PlayfairDisplay_600SemiBold, 
  PlayfairDisplay_700Bold 
} from '@expo-google-fonts/playfair-display';
import { 
  PlusJakartaSans_300Light, 
  PlusJakartaSans_400Regular, 
  PlusJakartaSans_500Medium, 
  PlusJakartaSans_600SemiBold, 
  PlusJakartaSans_700Bold 
} from '@expo-google-fonts/plus-jakarta-sans';

import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { WebSocketProvider } from './src/context/WebSocketContext';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          // Underscore naming (Expo Google Fonts standard)
          PlayfairDisplay_400Regular,
          PlayfairDisplay_600SemiBold,
          PlayfairDisplay_700Bold,
          PlusJakartaSans_300Light,
          PlusJakartaSans_400Regular,
          PlusJakartaSans_500Medium,
          PlusJakartaSans_600SemiBold,
          PlusJakartaSans_700Bold,

          // Hyphenated aliases (matching React Native screen style references)
          'PlayfairDisplay-Regular': PlayfairDisplay_400Regular,
          'PlayfairDisplay-SemiBold': PlayfairDisplay_600SemiBold,
          'PlayfairDisplay-Bold': PlayfairDisplay_700Bold,
          'PlusJakartaSans-Light': PlusJakartaSans_300Light,
          'PlusJakartaSans-Regular': PlusJakartaSans_400Regular,
          'PlusJakartaSans-Medium': PlusJakartaSans_500Medium,
          'PlusJakartaSans-SemiBold': PlusJakartaSans_600SemiBold,
          'PlusJakartaSans-Bold': PlusJakartaSans_700Bold,
        });
      } catch (err) {
        console.warn('Font loading error (continuing with system fonts):', err);
      } finally {
        setFontsLoaded(true);
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <ActivityIndicator size="large" color="#1A6B4A" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <WebSocketProvider>
          <AppNavigator />
          <StatusBar style="light" />
        </WebSocketProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
