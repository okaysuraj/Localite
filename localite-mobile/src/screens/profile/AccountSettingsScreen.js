import React, { useState, useContext } from 'react';
import { 
  StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Switch 
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '../../context/AuthContext';

export default function AccountSettingsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { user } = useContext(AuthContext);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.appBarSafe}>
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>Account Settings</Text>
          <View style={{ width: 40 }} /> {/* Placeholder */}
        </View>
      </SafeAreaView>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.headerDesc}>
          Manage your premium membership details, secure your identity, and customize your local concierge experience.
        </Text>

        {/* Subscription Status */}
        <View style={styles.subscriptionCard}>
          <View style={styles.subCardHeader}>
            <MaterialIcons name="workspace-premium" size={20} color="#775a19" />
            <Text style={styles.subCardTitle}>Elite Status</Text>
          </View>
          <Text style={styles.tierTitle}>Platinum Tier</Text>
          <Text style={styles.billingText}>Next billing cycle: Oct 12, 2024</Text>
          
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={16} color="#ffffff" />
              <Text style={styles.featureText}>Priority Event Booking</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={16} color="#ffffff" />
              <Text style={styles.featureText}>Private Sports Clubs</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={16} color="#ffffff" />
              <Text style={styles.featureText}>Dedicated Concierge</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.manageBtn}>
            <Text style={styles.manageBtnText}>MANAGE MEMBERSHIP</Text>
          </TouchableOpacity>
        </View>

        {/* Personal Details */}
        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="person" size={20} color="#775a19" />
            <Text style={styles.sectionTitle}>Personal Details</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Legal Name</Text>
            <View style={styles.fieldValueContainer}>
              <Text style={styles.fieldValue}>{user?.username || 'Julian Sterling'}</Text>
              <MaterialIcons name="edit" size={16} color="#75777e" />
            </View>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Email Address</Text>
            <View style={styles.fieldValueContainer}>
              <Text style={styles.fieldValue}>{user?.email || 'j.sterling@localite.com'}</Text>
              <MaterialIcons name="edit" size={16} color="#75777e" />
            </View>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Mobile Phone</Text>
            <View style={styles.fieldValueContainer}>
              <Text style={styles.fieldValue}>+1 (555) 012-3456</Text>
              <MaterialIcons name="edit" size={16} color="#75777e" />
            </View>
          </View>

          <View style={[styles.fieldRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
            <Text style={styles.fieldLabel}>Primary Residence</Text>
            <View style={styles.fieldValueContainer}>
              <Text style={styles.fieldValue}>London, Kensington</Text>
              <MaterialIcons name="edit" size={16} color="#75777e" />
            </View>
          </View>
        </View>

        {/* Security & Authentication */}
        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="shield" size={20} color="#775a19" />
            <Text style={styles.sectionTitle}>Security & Authentication</Text>
          </View>

          <View style={styles.actionRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.actionTitle}>Password</Text>
              <Text style={styles.actionSubtitle}>Last changed 4 months ago</Text>
            </View>
            <TouchableOpacity style={styles.outlineBtn}>
              <Text style={styles.outlineBtnText}>UPDATE</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actionRow}>
            <View style={{ flex: 1, paddingRight: 16 }}>
              <Text style={styles.actionTitle}>Two-Factor Authentication</Text>
              <Text style={styles.actionSubtitle}>Add an extra layer of security to your account.</Text>
            </View>
            <Switch 
              value={twoFactorEnabled} 
              onValueChange={setTwoFactorEnabled}
              trackColor={{ false: '#e4e2e2', true: '#775a19' }}
              thumbColor={'#ffffff'}
            />
          </View>

          <View style={[styles.actionRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.actionTitle}>Biometric Login</Text>
              <Text style={styles.actionSubtitle}>Use FaceID or Fingerprint on trusted devices.</Text>
            </View>
            <TouchableOpacity style={styles.outlineBtn}>
              <Text style={styles.outlineBtnText}>MANAGE</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer/Danger Zone */}
        <View style={styles.dangerZone}>
          <View style={{ flex: 1, paddingRight: 16 }}>
            <Text style={styles.dangerTitle}>Deactivate Account</Text>
            <Text style={styles.dangerSubtitle}>Temporarily disable your profile or permanently delete your data.</Text>
          </View>
          <TouchableOpacity style={styles.dangerBtn}>
            <Text style={styles.dangerBtnText}>CLOSE ACCOUNT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  headerDesc: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#44474d',
    marginBottom: 24,
    lineHeight: 22,
  },
  subscriptionCard: {
    backgroundColor: '#000000',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  subCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  subCardTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#775a19',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tierTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 4,
  },
  billingText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 12,
    color: '#c5c6cd',
    marginBottom: 24,
  },
  featuresList: {
    marginBottom: 24,
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#ffffff',
  },
  manageBtn: {
    backgroundColor: '#775a19',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  manageBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#ffffff',
    letterSpacing: 1,
  },
  sectionBlock: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e4e2e2',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 8,
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 20,
    color: '#000000',
  },
  fieldRow: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f3f3',
  },
  fieldLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#75777e',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  fieldValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f3f3',
    padding: 12,
    borderRadius: 8,
  },
  fieldValue: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 14,
    color: '#000000',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f3f3',
  },
  actionTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    color: '#000000',
    marginBottom: 2,
  },
  actionSubtitle: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 12,
    color: '#44474d',
  },
  outlineBtn: {
    borderWidth: 1,
    borderColor: '#775a19',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  outlineBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
  },
  dangerZone: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#e4e2e2',
  },
  dangerTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    color: '#ba1a1a',
    marginBottom: 2,
  },
  dangerSubtitle: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 12,
    color: '#44474d',
  },
  dangerBtn: {
    borderWidth: 1,
    borderColor: '#ba1a1a',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  dangerBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#ba1a1a',
    letterSpacing: 1,
  }
});
