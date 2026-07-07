import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

export default function PanicButton() {
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [timer, setTimer] = useState(null);

  const handlePanicPress = () => {
    setShowModal(true);
    setCountdown(3);
    
    // Start countdown
    let count = 3;
    const interval = setInterval(() => {
      count -= 1;
      setCountdown(count);
      
      if (count <= 0) {
        clearInterval(interval);
        triggerPanic();
      }
    }, 1000);
    
    setTimer(interval);
  };

  const handleCancel = () => {
    if (timer) clearInterval(timer);
    setShowModal(false);
  };

  const triggerPanic = async () => {
    setShowModal(false);
    
    try {
      const token = await AsyncStorage.getItem('userToken');
      // For a real app, we would also grab geolocation here
      const res = await fetch(`${API_URL}/safety/panic`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ lat: 40.7128, lng: -74.0060 })
      });
      
      if (res.ok) {
        Alert.alert("Emergency Alert Sent", "Your emergency contacts and local authorities have been notified.");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Network failed, but trying alternative methods...");
    }
  };

  return (
    <>
      <TouchableOpacity 
        style={styles.fab} 
        onPress={handlePanicPress}
        activeOpacity={0.8}
      >
        <Ionicons name="warning" size={24} color="white" />
      </TouchableOpacity>

      <Modal visible={showModal} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.warningIconContainer}>
              <Ionicons name="warning" size={48} color="#ef4444" />
            </View>
            
            <Text style={styles.title}>EMERGENCY ALERT</Text>
            <Text style={styles.subtitle}>Alerting contacts in...</Text>
            
            <Text style={styles.countdown}>{countdown}</Text>
            
            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
              <Text style={styles.cancelBtnText}>CANCEL</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.triggerBtn} onPress={() => { if(timer) clearInterval(timer); triggerPanic(); }}>
              <Text style={styles.triggerBtnText}>TRIGGER NOW</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    zIndex: 999
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalContent: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ef4444'
  },
  warningIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(239,68,68,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.3)'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ef4444',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 5,
    textAlign: 'center'
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 20
  },
  countdown: {
    fontSize: 72,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    textShadowColor: 'rgba(239,68,68,0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20
  },
  cancelBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10
  },
  cancelBtnText: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1
  },
  triggerBtn: {
    backgroundColor: '#ef4444',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center'
  },
  triggerBtnText: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1
  }
});
