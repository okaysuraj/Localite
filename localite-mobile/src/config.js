import { Platform } from 'react-native';

// Set EXPO_PUBLIC_API_IP in .env to your machine's local Wi-Fi IP (e.g. 192.168.1.5)
// Android Emulator uses 10.0.2.2 to reach host machine's localhost
const IP = process.env.EXPO_PUBLIC_API_IP || 'localhost';
const PORT = process.env.EXPO_PUBLIC_API_PORT || '8080';

const host = Platform.OS === 'android' && IP === 'localhost' ? '10.0.2.2' : IP;

export const API_URL = `http://${host}:${PORT}/api`;
