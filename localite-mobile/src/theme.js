import { Platform } from 'react-native';

export const colors = {
  bg: '#FFFFFF',
  bgSubtle: '#F7F6F3',
  fg: '#1A1A1A',
  fgMuted: '#6B6B6B',
  fgFaint: '#A0A0A0',
  border: '#E8E8E8',
  accent: '#1A6B4A',
  accentHover: '#155A3E',
  accentSubtle: '#EDF5F0',
  error: '#C0392B',
  errorSubtle: '#FDECEB',
  live: '#E67E22',
};

export const typography = {
  fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
};

export default {
  colors,
  typography,
};
