import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ImageBackground, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function TicketQRCodeScreen({ route }) {
  const navigation = useNavigation();
  const { event = { name: "The Winter Masquerade" } } = route.params || {};

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="close" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Entry Pass</Text>
        <TouchableOpacity>
          <MaterialIcons name="share" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.ticketCard}>
          {/* Hero Image */}
          <ImageBackground 
            source={{ uri: 'https://via.placeholder.com/800x400' }} 
            style={styles.heroImage}
          >
            <View style={styles.heroOverlay}>
              <Text style={styles.heroLabel}>VIP ACCESS</Text>
              <Text style={styles.heroTitle}>{event.name}</Text>
            </View>
          </ImageBackground>

          {/* Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <View style={styles.detailBox}>
                <Text style={styles.detailLabel}>DATE & TIME</Text>
                <Text style={styles.detailValue}>Dec 24, 2024</Text>
                <Text style={styles.detailSub}>21:00 — Late</Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={styles.detailLabel}>LOCATION</Text>
                <Text style={styles.detailValue}>Palais Garnier</Text>
                <Text style={styles.detailSub}>Paris, FR</Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <View style={styles.detailBox}>
                <Text style={styles.detailLabel}>SEAT / TIER</Text>
                <Text style={styles.detailValue}>Gold Tier</Text>
                <Text style={styles.detailSub}>Box 12, Row A</Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={styles.detailLabel}>GUEST</Text>
                <Text style={styles.detailValue}>Julian Montgomery</Text>
                <Text style={styles.detailSub}>Elite Member</Text>
              </View>
            </View>
          </View>

          {/* Perforation */}
          <View style={styles.perforationContainer}>
            <View style={styles.notchLeft} />
            <View style={styles.dashedLine} />
            <View style={styles.notchRight} />
          </View>

          {/* QR Code */}
          <View style={styles.qrContainer}>
            <View style={styles.qrInner}>
              <MaterialIcons name="qr-code-2" size={120} color="#775a19" />
            </View>
            <Text style={styles.qrLabel}>TXN ID: LCT-99283-GA-24</Text>
          </View>
        </View>

        {/* Buttons */}
        <TouchableOpacity style={styles.primaryButton}>
          <MaterialIcons name="account-balance-wallet" size={20} color="#fff" />
          <Text style={styles.primaryButtonText}>ADD TO APPLE WALLET</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.secondaryButton}>
          <MaterialIcons name="download" size={20} color="#775a19" />
          <Text style={styles.secondaryButtonText}>SAVE AS PDF</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fbf9f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingTop: Platform.OS === 'android' ? 40 : 16,
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  ticketCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.1,
    shadowRadius: 32,
    elevation: 5,
    marginBottom: 32,
  },
  heroImage: {
    width: '100%',
    height: 180,
    justifyContent: 'flex-end',
  },
  heroOverlay: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  heroLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#fed488',
    letterSpacing: 2,
    marginBottom: 4,
  },
  heroTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 28,
    color: '#fff',
  },
  detailsContainer: {
    padding: 24,
    gap: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailBox: {
    flex: 1,
  },
  detailLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    marginBottom: 4,
  },
  detailValue: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    color: '#000',
    marginBottom: 2,
  },
  detailSub: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#44474d',
  },
  perforationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    overflow: 'hidden',
  },
  notchLeft: {
    width: 12,
    height: 24,
    backgroundColor: '#fbf9f8',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    marginLeft: -1,
  },
  notchRight: {
    width: 12,
    height: 24,
    backgroundColor: '#fbf9f8',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    marginRight: -1,
  },
  dashedLine: {
    flex: 1,
    height: 1,
    borderTopWidth: 2,
    borderColor: '#eae8e7',
    borderStyle: 'dashed',
    marginHorizontal: 8,
  },
  qrContainer: {
    alignItems: 'center',
    padding: 24,
    paddingTop: 12,
  },
  qrInner: {
    padding: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(119, 90, 25, 0.2)',
    borderRadius: 12,
    marginBottom: 16,
  },
  qrLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    marginBottom: 12,
    gap: 8,
  },
  primaryButtonText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#fff',
    letterSpacing: 1,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#775a19',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    gap: 8,
  },
  secondaryButtonText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#775a19',
    letterSpacing: 1,
  },
});
