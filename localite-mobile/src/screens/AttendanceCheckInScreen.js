import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';

export default function AttendanceCheckInScreen({ route }) {
  const navigation = useNavigation();
  const { eventId = 1, ticketId = 'DEMO-TICKET-ID' } = route.params || {};
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      // Assuming a host is scanning this, but for this screen, it's the attendee presenting the pass
      // The actual check-in is usually done by the host scanning the QR, but we can simulate it here.
      // const response = await api.post(`/events/${eventId}/checkin/${ticketId}`);
      // if (response.status === 200) {
      setSuccess(true);
      setTimeout(() => {
        navigation.goBack();
      }, 3500);
      // }
    } catch (err) {
      console.error('Check-in error', err);
      Alert.alert('Error', 'Failed to check-in. Please see host.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successIconWrapper}>
          <MaterialIcons name="done" size={64} color="#775a19" />
        </View>
        <Text style={styles.successTitle}>Welcome, Your Eminence</Text>
        <Text style={styles.successSubtitle}>ENJOY THE ASSEMBLAGE</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
            <MaterialIcons name="close" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Royal Assemblage</Text>
          <View style={{ width: 28 }} />
        </View>

        <View style={styles.content}>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>ELITE MEMBER</Text>
          </View>
          
          <Text style={styles.title}>Arrive at The Willows</Text>
          <Text style={styles.subtitle}>"You've Arrived"</Text>

          <TouchableOpacity style={styles.qrCard} onPress={handleCheckIn} disabled={loading}>
            <View style={styles.qrInner}>
              <MaterialIcons name="qr-code-2" size={160} color="#000" />
              <View style={styles.qrCenterLogo}>
                <MaterialIcons name="verified" size={24} color="#775a19" />
              </View>
            </View>
            <Text style={styles.qrLabel}>SCAN FOR ENTRY</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleCheckIn}
            disabled={loading}
          >
            <Text style={styles.actionButtonText}>
              {loading ? 'PROCESSING...' : 'CHECK-IN NOW'}
            </Text>
            {!loading && <MaterialIcons name="arrow-forward" size={20} color="#fff" />}
          </TouchableOpacity>

          <View style={styles.infoRow}>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>TIME</Text>
              <Text style={styles.infoValue}>19:30</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>GUESTS</Text>
              <Text style={styles.infoValue}>Plus One</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>PROTOCOL: PRESENTATION IS PARAMOUNT</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fbf9f8',
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 24 : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  badgeContainer: {
    backgroundColor: '#fed488',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(119, 90, 25, 0.2)',
    marginBottom: 24,
  },
  badgeText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#785a1a',
    letterSpacing: 2,
  },
  title: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 18,
    color: '#44474d',
    fontStyle: 'italic',
    marginBottom: 48,
  },
  qrCard: {
    backgroundColor: '#fff',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.05,
    shadowRadius: 32,
    elevation: 4,
    width: '100%',
    maxWidth: 320,
    marginBottom: 48,
    borderWidth: 1,
    borderColor: '#eae8e7',
  },
  qrInner: {
    borderWidth: 2,
    borderColor: 'rgba(119, 90, 25, 0.3)',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 16,
    position: 'relative',
  },
  qrCenterLogo: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -20,
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#775a19',
  },
  qrLabel: {
    marginTop: 24,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#75777e',
    letterSpacing: 3,
  },
  actionButton: {
    backgroundColor: '#000',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 4,
  },
  actionButtonText: {
    color: '#fff',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    letterSpacing: 2,
    marginRight: 12,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
    marginTop: 48,
  },
  infoBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#f5f3f3',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eae8e7',
  },
  infoLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
    letterSpacing: 1,
    marginBottom: 4,
  },
  infoValue: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    color: '#000',
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 2,
  },
  successContainer: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIconWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: '#775a19',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  successTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#fbf9f8',
    marginBottom: 12,
  },
  successSubtitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#ffdea5',
    letterSpacing: 4,
  },
});
