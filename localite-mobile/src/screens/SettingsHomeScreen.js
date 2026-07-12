import React, { useContext } from 'react';
import { 
  StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, Platform 
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';

export default function SettingsHomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.appBarSafe}>
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>Settings</Text>
          <View style={{ width: 40 }} /> {/* Placeholder for balance */}
        </View>
      </SafeAreaView>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Profile Overview Card */}
        <View style={styles.profileCard}>
          <View style={styles.tierBadge}>
            <Text style={styles.tierText}>Local Tastemaker</Text>
          </View>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: user?.profileImageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDW1qiDqa912VQ4ahLu3m6E4_qX8AcQSjYpyVOZNhftrwaPiXL3n11Utone_nzzHBn-TLwImCo9qe0Alsu04BLr1PY7M-6Z8lnrhiccG_l04S7ghg2q71pOlsuR5eADbqYNrWiDszNTxssqSceGJgQ-zFxtwZw7QdK6J-z2ZgM9mK0BHRmd6hm126e1z1kXtJ9_o9YjxV5iQ_3iiDC6gywzFaEfKxUnlgMIYTepsSBzwzetH5fb-wfhOw' }} 
              style={styles.avatar} 
            />
          </View>
          <Text style={styles.name}>{user?.username || 'Julian Sterling'}</Text>
          <Text style={styles.email}>{user?.email || 'julian.sterling@localite.com'}</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Member Since</Text>
              <Text style={styles.statValue}>Oct 2021</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Reputation</Text>
              <Text style={styles.statValue}>98/100</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.editProfileBtn}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={styles.editProfileText}>EDIT PROFILE</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Menu Items */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AccountSettings')}>
            <View style={styles.menuIconContainer}>
              <MaterialIcons name="person-outline" size={24} color="#000000" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Account</Text>
              <Text style={styles.menuSubtitle}>Membership & billing</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#75777e" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('NotificationSettings')}>
            <View style={styles.menuIconContainer}>
              <MaterialIcons name="notifications-active" size={24} color="#000000" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Notifications</Text>
              <Text style={styles.menuSubtitle}>Push & email alerts</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#75777e" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PrivacySettings')}>
            <View style={styles.menuIconContainer}>
              <MaterialIcons name="visibility-off" size={24} color="#000000" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Privacy</Text>
              <Text style={styles.menuSubtitle}>Visibility & trusted circles</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#75777e" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <MaterialIcons name="security" size={24} color="#000000" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Security</Text>
              <Text style={styles.menuSubtitle}>Password & 2FA</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#75777e" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.supportBtn}>
          <Text style={styles.supportBtnText}>CONNECT WITH CONCIERGE</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutBtnText}>LOG OUT</Text>
        </TouchableOpacity>
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
    padding: 16,
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e4e2e2',
    marginBottom: 24,
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#0a192f',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  tierBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#fed488',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tierText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#785a1a',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: '#eae8e7',
    overflow: 'hidden',
    marginBottom: 16,
    marginTop: 16,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 24,
    color: '#000000',
    marginBottom: 4,
  },
  email: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#44474d',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  statLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#75777e',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  statValue: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    color: '#000000',
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#c5c6cd',
  },
  editProfileBtn: {
    backgroundColor: '#000000',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  editProfileText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#ffffff',
    letterSpacing: 1,
  },
  menuSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e4e2e2',
    overflow: 'hidden',
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f3f3',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f5f3f3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 18,
    color: '#000000',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#44474d',
  },
  supportBtn: {
    borderWidth: 1,
    borderColor: '#775a19',
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  supportBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#775a19',
    letterSpacing: 1,
  },
  logoutBtn: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoutBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#ba1a1a',
    letterSpacing: 1,
  }
});
