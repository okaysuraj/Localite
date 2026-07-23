import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function RestrictedAccessScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Localite</Text>
      </View>

      <View style={styles.content}>
        
        {/* Visual Metaphor Door */}
        <View style={styles.doorContainer}>
          <View style={styles.doorPanel}>
            <View style={styles.iconWrap}>
              <MaterialIcons name="lock" size={48} color="#775a19" />
            </View>
            <View style={styles.divider} />
            <Text style={styles.doorText}>PRIVATE ACCESS ONLY</Text>
          </View>
        </View>

        {/* Text & CTA */}
        <View style={styles.textSection}>
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>ELITE LOUNGE</Text>
            </View>
            <Text style={styles.badgeDot}>•</Text>
            <Text style={styles.reqText}>MEMBERSHIP REQUIRED</Text>
          </View>

          <Text style={styles.title}>Reserved for the Exquisite Few.</Text>
          
          <Text style={styles.desc}>
            Access to the Elite Lounge is a privilege reserved for our Gold Tier members and above. Within these digital walls lie curated experiences, private concierge services, and early-access invitations that define modern nobility.
          </Text>
        </View>

        {/* Actions */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.primaryBtnText}>VIEW MEMBERSHIP TIERS</Text>
            <MaterialIcons name="arrow-forward" size={16} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.secondaryBtnText}>RETURN TO EXPLORE</Text>
          </TouchableOpacity>
        </View>

        {/* Status */}
        <View style={styles.statusSection}>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>CURRENT STATUS</Text>
            <Text style={styles.statusValue}>Standard Member</Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>ACCOUNT ID</Text>
            <Text style={styles.statusValue}>#LX-88921</Text>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbf9f8',
  },
  header: {
    paddingTop: Platform.OS === 'android' ? 40 : 16,
    paddingBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 28,
    color: '#000',
    letterSpacing: -0.5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    paddingBottom: 40,
  },
  doorContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  doorPanel: {
    backgroundColor: '#0d1c32',
    width: 200,
    height: 280,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.2,
    shadowRadius: 32,
    elevation: 8,
  },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#775a19',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  divider: {
    height: 4,
    width: 60,
    backgroundColor: '#775a19',
    opacity: 0.5,
    borderRadius: 2,
    marginBottom: 16,
  },
  doorText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 2,
  },
  textSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  badge: {
    backgroundColor: '#0d1c32',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(119, 90, 25, 0.3)',
  },
  badgeText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#e9c176',
    letterSpacing: 1,
  },
  badgeDot: {
    marginHorizontal: 8,
    color: '#c5c6cd',
  },
  reqText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
  },
  title: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 40,
  },
  desc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    textAlign: 'center',
    lineHeight: 24,
  },
  actionSection: {
    gap: 16,
    marginBottom: 32,
  },
  primaryBtn: {
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
    gap: 8,
  },
  primaryBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#fff',
    letterSpacing: 2,
  },
  secondaryBtn: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#775a19',
  },
  secondaryBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#775a19',
    letterSpacing: 2,
  },
  statusSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(197, 198, 205, 0.3)',
    paddingTop: 24,
  },
  statusItem: {
    flex: 1,
  },
  statusLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
    marginBottom: 4,
  },
  statusValue: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    color: '#000',
  }
});
