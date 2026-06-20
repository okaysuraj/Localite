import { Platform } from 'react-native';

// Use 10.0.2.2 for Android Emulator, localhost for iOS simulator
// If testing on a physical device, change this to your computer's local Wi-Fi IP address (e.g. 192.168.1.X)
export const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:8080/api' : 'http://localhost:8080/api';
