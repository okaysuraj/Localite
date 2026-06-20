import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

export default function ScannerScreen({ route, navigation }) {
  const { eventId, eventTitle } = route.params;
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [manualTicketId, setManualTicketId] = useState('');

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.message}>We need your permission to show the camera</Text>
          <TouchableOpacity style={styles.btnPrimary} onPress={requestPermission}>
            <Text style={styles.btnText}>GRANT PERMISSION</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    await checkInAttendee(data);
  };

  const handleManualCheckIn = async () => {
    if (!manualTicketId) return;
    await checkInAttendee(manualTicketId);
    setManualTicketId('');
  };

  const checkInAttendee = async (ticketId) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/events/${eventId}/checkin/${ticketId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        Alert.alert('Success', 'Attendee Checked In Successfully!', [
          { text: 'OK', onPress: () => setScanned(false) }
        ]);
      } else {
        const errorText = await response.text();
        Alert.alert('Failed', errorText, [
          { text: 'OK', onPress: () => setScanned(false) }
        ]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Network error.', [
        { text: 'OK', onPress: () => setScanned(false) }
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#f8fafc" />
        </TouchableOpacity>
        <View style={{flex: 1, paddingRight: 40}}>
          <Text style={styles.headerTitle}>SCANNER</Text>
          <Text style={styles.headerSub} numberOfLines={1}>{eventTitle}</Text>
        </View>
      </View>

      <View style={styles.cameraContainer}>
        <CameraView 
          style={styles.camera} 
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        >
          <View style={styles.overlay}>
            <View style={styles.scanBox} />
          </View>
        </CameraView>
        {scanned && (
          <TouchableOpacity style={styles.scanAgainBtn} onPress={() => setScanned(false)}>
            <Text style={styles.scanAgainText}>TAP TO SCAN AGAIN</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.manualContainer}>
        <Text style={styles.manualTitle}>MANUAL CHECK-IN</Text>
        <TextInput 
          style={styles.input}
          placeholder="Enter Ticket ID"
          placeholderTextColor="#94a3b8"
          value={manualTicketId}
          onChangeText={setManualTicketId}
        />
        <TouchableOpacity style={styles.btnPrimary} onPress={handleManualCheckIn}>
          <Text style={styles.btnText}>CHECK IN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  message: { color: 'white', textAlign: 'center', marginBottom: 20 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 40 },
  backBtn: { padding: 10, marginRight: 10, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 10 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#f8fafc', textTransform: 'uppercase', letterSpacing: 1 },
  headerSub: { fontSize: 14, color: '#ccff00', marginTop: 2, textTransform: 'uppercase', letterSpacing: 1 },
  cameraContainer: { flex: 1, margin: 20, borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: '#ccff00' },
  camera: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  scanBox: { width: 250, height: 250, borderWidth: 2, borderColor: '#ccff00', backgroundColor: 'transparent' },
  scanAgainBtn: { position: 'absolute', bottom: 20, alignSelf: 'center', backgroundColor: '#ccff00', padding: 15, borderRadius: 10 },
  scanAgainText: { color: '#0f172a', fontWeight: 'bold', letterSpacing: 1 },
  manualContainer: { padding: 20, backgroundColor: '#1e293b', borderTopLeftRadius: 20, borderTopRightRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  manualTitle: { color: '#94a3b8', fontSize: 12, fontWeight: 'bold', letterSpacing: 2, marginBottom: 15 },
  input: { backgroundColor: '#0f172a', color: 'white', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', marginBottom: 15, fontFamily: 'monospace' },
  btnPrimary: { backgroundColor: '#ccff00', padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#0f172a', fontWeight: 'bold', letterSpacing: 1 }
});
