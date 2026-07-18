import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function PushPermissionSetupScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Localite</Text>
      </View>

      <View style={styles.content}>
        
        {/* Central Illustration Component */}
        <View style={styles.heroWrap}>
          {/* Background Decorative Rings */}
          <View style={[styles.circleLayer, styles.circleLayer1]} />
          <View style={[styles.circleLayer, styles.circleLayer2]} />
          
          {/* Main Illustration Card */}
          <View style={styles.bentoCard}>
            <View style={styles.iconBg}>
              <MaterialIcons name="notifications-active" size={40} color="#775a19" />
            </View>
            <View style={styles.skeletonContainer}>
              <View style={[styles.skeletonLine, { width: '75%', marginBottom: 8 }]} />
              <View style={[styles.skeletonLine, { width: '50%', opacity: 0.6 }]} />
            </View>
            <View style={styles.badgeWrap}>
              <Text style={styles.badgeText}>VIP</Text>
            </View>
          </View>

          {/* Floating Micro-Interactions */}
          <View style={[styles.floatingBadge, styles.floatingBadgeLeft]}>
            <MaterialIcons name="shield" size={16} color="#775a19" />
            <Text style={styles.floatingBadgeText}>SAFETY ALERT</Text>
          </View>
          <View style={[styles.floatingBadge, styles.floatingBadgeRight]}>
            <MaterialIcons name="celebration" size={16} color="#775a19" />
            <Text style={styles.floatingBadgeText}>EVENT INVITE</Text>
          </View>
        </View>

        {/* Copy Section */}
        <View style={styles.textSection}>
          <Text style={styles.title}>Stay Connected to the Circle</Text>
          <Text style={styles.desc}>
            Receive real-time invitations, safety alerts, and exclusive community updates.
          </Text>
        </View>

        {/* Action Section */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.primaryBtnText}>ENABLE NOTIFICATIONS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.secondaryBtnText}>MAYBE LATER</Text>
          </TouchableOpacity>
        </View>

        {/* Trust Indicators */}
        <View style={styles.trustSection}>
          <View style={styles.trustItem}>
            <MaterialIcons name="lock" size={24} color="#44474d" />
            <Text style={styles.trustText}>SECURE</Text>
          </View>
          <View style={styles.trustItem}>
            <MaterialIcons name="no-sim" size={24} color="#44474d" />
            <Text style={styles.trustText}>NO SPAM</Text>
          </View>
          <View style={styles.trustItem}>
            <MaterialIcons name="tune" size={24} color="#44474d" />
            <Text style={styles.trustText}>CONTROL</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  heroWrap: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  circleLayer: {
    position: 'absolute',
    borderRadius: 150,
    borderWidth: 1,
    borderColor: 'rgba(119, 90, 25, 0.2)',
  },
  circleLayer1: {
    width: 280,
    height: 280,
  },
  circleLayer2: {
    width: 220,
    height: 220,
  },
  bentoCard: {
    width: 180,
    height: 240,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.05,
    shadowRadius: 32,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(197, 198, 205, 0.2)',
    position: 'relative',
    zIndex: 10,
  },
  iconBg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#efeded',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  skeletonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  skeletonLine: {
    height: 8,
    backgroundColor: '#e4e2e2',
    borderRadius: 4,
  },
  badgeWrap: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#775a19',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 8,
    color: '#fff',
    letterSpacing: 2,
  },
  floatingBadge: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(197, 198, 205, 0.2)',
    zIndex: 20,
  },
  floatingBadgeLeft: {
    top: 40,
    left: 0,
  },
  floatingBadgeRight: {
    bottom: 40,
    right: -10,
  },
  floatingBadgeText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 9,
    color: '#44474d',
    letterSpacing: 1,
  },
  textSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 28,
    color: '#000',
    textAlign: 'center',
    marginBottom: 12,
  },
  desc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  actionSection: {
    width: '100%',
    gap: 16,
    marginBottom: 32,
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  primaryBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#fff',
    letterSpacing: 2,
  },
  secondaryBtn: {
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#775a19',
    letterSpacing: 2,
  },
  trustSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
    paddingTop: 32,
    borderTopWidth: 1,
    borderTopColor: 'rgba(197, 198, 205, 0.3)',
    width: '100%',
  },
  trustItem: {
    alignItems: 'center',
    opacity: 0.6,
  },
  trustText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 9,
    color: '#44474d',
    letterSpacing: 1,
    marginTop: 4,
  }
});
