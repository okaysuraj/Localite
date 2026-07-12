import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Modal, Alert 
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SafetyCenterScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [sosModalVisible, setSosModalVisible] = useState(false);

  const handleSosConfirm = () => {
    setSosModalVisible(false);
    Alert.alert("SOS Triggered", "Emergency contacts and local authorities have been notified.");
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.appBarSafe}>
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>Safety Center</Text>
          <View style={{ width: 40 }} /> {/* Placeholder */}
        </View>
      </SafeAreaView>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        
        {/* Hero Section / SOS Action */}
        <View style={styles.heroCard}>
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroSubtitle}>PROTECTION PROTOCOL</Text>
            <Text style={styles.heroTitle}>Safety Center</Text>
            <Text style={styles.heroDesc}>
              Your security is our highest priority. Access immediate assistance and manage your circle of protection.
            </Text>
          </View>
          <View style={styles.sosButtonContainer}>
            <TouchableOpacity 
              style={styles.sosButton} 
              onPress={() => setSosModalVisible(true)}
              activeOpacity={0.8}
            >
              <MaterialIcons name="emergency-share" size={40} color="#ffffff" />
              <Text style={styles.sosButtonText}>SOS</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Your Safety Circle */}
        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Safety Circle</Text>
            <TouchableOpacity style={styles.addContactBtn}>
              <Text style={styles.addContactBtnText}>ADD CONTACT</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contactCard}>
            <View style={styles.contactAvatar}>
              <Text style={styles.contactInitials}>JT</Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>Julian Thorne</Text>
              <Text style={styles.contactRole}>PRIMARY CONTACT</Text>
            </View>
            <MaterialIcons name="verified" size={24} color="#775a19" />
          </View>

          <View style={styles.contactCard}>
            <View style={styles.contactAvatar}>
              <Text style={styles.contactInitials}>EV</Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>Eleanor Vance</Text>
              <Text style={styles.contactRole}>FAMILY CIRCLE</Text>
            </View>
            <MaterialIcons name="call" size={24} color="#75777e" />
          </View>

          <View style={styles.infoBanner}>
            <MaterialIcons name="info" size={20} color="#775a19" />
            <Text style={styles.infoBannerText}>
              Your circle will be automatically notified if you trigger an SOS alert or miss a scheduled check-in.
            </Text>
          </View>
        </View>

        {/* Side Actions - Emergency Support */}
        <View style={styles.supportCard}>
          <Text style={styles.supportTitle}>Emergency Support</Text>
          <Text style={styles.supportDesc}>
            24/7 Concierge Security is standing by for immediate assistance.
          </Text>

          <TouchableOpacity style={styles.supportAction}>
            <MaterialIcons name="support-agent" size={24} color="#e9c176" />
            <Text style={styles.supportActionText}>Live Support Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.supportAction}>
            <MaterialIcons name="call" size={24} color="#e9c176" />
            <Text style={styles.supportActionText}>Security Hotline</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.supportAction}>
            <MaterialIcons name="local-police" size={24} color="#e9c176" />
            <Text style={styles.supportActionText}>Local Authorities</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Check-in */}
        <View style={styles.checkInCard}>
          <Text style={styles.checkInSubtitle}>QUICK CHECK-IN</Text>
          <Text style={styles.checkInTitle}>I've arrived safely.</Text>
          <TouchableOpacity style={styles.checkInBtn}>
            <Text style={styles.checkInBtnText}>SEND TO CIRCLE</Text>
          </TouchableOpacity>
        </View>

        {/* Report an Issue (Button to navigate) */}
        <TouchableOpacity 
          style={styles.reportBtn}
          onPress={() => navigation.navigate('ReportUser')} // Navigate to report screen
        >
          <Text style={styles.reportBtnText}>REPORT AN ISSUE / MEMBER</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* SOS Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={sosModalVisible}
        onRequestClose={() => setSosModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalWarningIcon}>
              <MaterialIcons name="warning" size={40} color="#ba1a1a" />
            </View>
            <Text style={styles.modalTitle}>Initiate SOS?</Text>
            <Text style={styles.modalDesc}>
              This will immediately notify your safety circle and dispatch our 24/7 security concierge to your current GPS location.
            </Text>
            <TouchableOpacity style={styles.confirmSosBtn} onPress={handleSosConfirm}>
              <Text style={styles.confirmSosBtnText}>CONFIRM EMERGENCY</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelSosBtn} onPress={() => setSosModalVisible(false)}>
              <Text style={styles.cancelSosBtnText}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbf9f8',
  },
  appBarSafe: {
    backgroundColor: '#fbf9f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eae8e7',
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  iconBtn: {
    padding: 8,
    marginLeft: -8,
  },
  appBarTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 20,
    color: '#000000',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: '#0d1c32', // Regal gradient fallback
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    overflow: 'hidden',
  },
  heroTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  heroSubtitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#e9c176',
    letterSpacing: 2,
    marginBottom: 8,
  },
  heroTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 24,
    color: '#fbf9f8',
    marginBottom: 12,
  },
  heroDesc: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#b9c7e4',
    lineHeight: 22,
  },
  sosButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sosButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ba1a1a',
    borderWidth: 4,
    borderColor: '#ffdad6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sosButtonText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    color: '#ffffff',
    marginTop: -4,
  },
  sectionBlock: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e4e2e2',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 20,
    color: '#000000',
  },
  addContactBtn: {
    borderWidth: 1,
    borderColor: '#775a19',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  addContactBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f3f3',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  contactAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e4e2e2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  contactInitials: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
    color: '#44474d',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    color: '#000000',
    marginBottom: 4,
  },
  contactRole: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(254, 212, 136, 0.2)',
    borderWidth: 1,
    borderColor: '#ffdea5',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
    gap: 12,
  },
  infoBannerText: {
    flex: 1,
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 12,
    color: '#785a1a',
    lineHeight: 18,
  },
  supportCard: {
    backgroundColor: '#0d1c32',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  supportTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 20,
    color: '#fbf9f8',
    marginBottom: 8,
  },
  supportDesc: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#76849f',
    marginBottom: 20,
  },
  supportAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    gap: 12,
  },
  supportActionText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    color: '#ffffff',
  },
  checkInCard: {
    backgroundColor: '#f5f3f3',
    borderRadius: 16,
    padding: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#775a19',
    marginBottom: 24,
  },
  checkInSubtitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
    marginBottom: 8,
  },
  checkInTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
    color: '#000000',
    marginBottom: 16,
  },
  checkInBtn: {
    borderWidth: 1,
    borderColor: '#775a19',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  checkInBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#775a19',
    letterSpacing: 1,
  },
  reportBtn: {
    borderWidth: 1,
    borderColor: '#000000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  reportBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#000000',
    letterSpacing: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 32,
    width: '100%',
    alignItems: 'center',
  },
  modalWarningIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(186,26,26,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 24,
    color: '#000000',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalDesc: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#44474d',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  confirmSosBtn: {
    backgroundColor: '#ba1a1a',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  confirmSosBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    color: '#ffffff',
    letterSpacing: 1,
  },
  cancelSosBtn: {
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
  },
  cancelSosBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    color: '#75777e',
    letterSpacing: 1,
  }
});
