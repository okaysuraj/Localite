import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Switch, Platform 
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

export default function PrivacySettingsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  
  const [publicProfile, setPublicProfile] = useState(false);
  const [liveActivity, setLiveActivity] = useState(true);
  const [preciseLocation, setPreciseLocation] = useState(false);
  const [showBlocked, setShowBlocked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const res = await fetch(`${API_URL}/users/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const user = await res.json();
        setPublicProfile(user.publicProfile || false);
        setLiveActivity(user.liveActivity !== false); // default true
        setPreciseLocation(user.preciseLocation || false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const payload = {
        publicProfile,
        liveActivity,
        preciseLocation
      };
      
      const res = await fetch(`${API_URL}/users/me`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        navigation.goBack();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.appBarSafe}>
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>Privacy Controls</Text>
          <View style={{ width: 40 }} /> {/* Placeholder */}
        </View>
      </SafeAreaView>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        
        <View style={styles.headerSection}>
          <Text style={styles.headerSubtitle}>Your Digital Sovereignty</Text>
          <Text style={styles.headerDesc}>
            Manage your visibility and digital footprint within the Localite ecosystem. We prioritize your anonymity.
          </Text>
        </View>

        {/* Profile & Activity */}
        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="visibility" size={20} color="#000000" />
            <Text style={styles.sectionTitle}>Profile & Activity</Text>
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Public Profile Visibility</Text>
              <Text style={styles.settingDesc}>Allow non-members to view your basic profile.</Text>
            </View>
            <Switch 
              value={publicProfile} 
              onValueChange={setPublicProfile}
              trackColor={{ false: '#e4e2e2', true: '#000000' }}
              thumbColor={'#ffffff'}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Live Activity Status</Text>
              <Text style={styles.settingDesc}>Show others when you are active at a gathering.</Text>
            </View>
            <Switch 
              value={liveActivity} 
              onValueChange={setLiveActivity}
              trackColor={{ false: '#e4e2e2', true: '#000000' }}
              thumbColor={'#ffffff'}
            />
          </View>

          <View style={[styles.settingRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Precise Location Sharing</Text>
              <Text style={styles.settingDesc}>Share exact GPS coordinates with attendees.</Text>
            </View>
            <Switch 
              value={preciseLocation} 
              onValueChange={setPreciseLocation}
              trackColor={{ false: '#e4e2e2', true: '#000000' }}
              thumbColor={'#ffffff'}
            />
          </View>
        </View>

        {/* Trusted Circle */}
        <View style={[styles.sectionBlock, { borderTopWidth: 4, borderTopColor: '#775a19' }]}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="verified-user" size={20} color="#775a19" />
            <Text style={styles.sectionTitle}>Trusted Circle</Text>
          </View>
          <Text style={styles.trustedDesc}>
            Members bypass global privacy restrictions to see your full schedule.
          </Text>

          <View style={styles.trustedList}>
            <View style={styles.trustedItem}>
              <View style={styles.trustedUser}>
                <View style={[styles.trustedAvatar, { backgroundColor: '#fed488' }]}>
                  <Text style={styles.trustedInitials}>JV</Text>
                </View>
                <Text style={styles.trustedName}>Julian V.</Text>
              </View>
              <MaterialIcons name="remove-circle" size={20} color="#ba1a1a" />
            </View>
            
            <View style={styles.trustedItem}>
              <View style={styles.trustedUser}>
                <View style={[styles.trustedAvatar, { backgroundColor: '#0d1c32' }]}>
                  <Text style={[styles.trustedInitials, { color: '#ffffff' }]}>EM</Text>
                </View>
                <Text style={styles.trustedName}>Elena M.</Text>
              </View>
              <MaterialIcons name="remove-circle" size={20} color="#ba1a1a" />
            </View>
          </View>

          <TouchableOpacity style={styles.addMemberBtn}>
            <Text style={styles.addMemberBtnText}>ADD MEMBER</Text>
          </TouchableOpacity>
        </View>

        {/* Restricted Access */}
        <View style={styles.sectionBlock}>
          <TouchableOpacity 
            style={styles.expandableHeader}
            onPress={() => setShowBlocked(!showBlocked)}
            activeOpacity={0.7}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <MaterialIcons name="block" size={20} color="#75777e" />
              <Text style={styles.sectionTitle}>Restricted Access</Text>
            </View>
            <MaterialIcons name={showBlocked ? "expand-less" : "expand-more"} size={24} color="#000000" />
          </TouchableOpacity>

          {showBlocked && (
            <View style={styles.blockedList}>
              <View style={styles.blockedItem}>
                <View>
                  <Text style={styles.blockedName}>Mark Sterling</Text>
                  <Text style={styles.blockedDate}>Blocked on Mar 12, 2024</Text>
                </View>
                <TouchableOpacity>
                  <Text style={styles.unblockText}>UNBLOCK</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.blockedItem}>
                <View>
                  <Text style={styles.blockedName}>Unknown Member #42</Text>
                  <Text style={styles.blockedDate}>Blocked on Jan 05, 2024</Text>
                </View>
                <TouchableOpacity>
                  <Text style={styles.unblockText}>UNBLOCK</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Zero Knowledge */}
        <View style={styles.zeroKnowledgeCard}>
          <View style={styles.zkBadge}>
            <Text style={styles.zkBadgeText}>ENCRYPTION: AES-256-GCM</Text>
          </View>
          <View style={styles.zkHeaderRow}>
            <Text style={styles.zkTitle}>Zero-Knowledge Architecture</Text>
            <MaterialIcons name="enhanced-encryption" size={32} color="#ffffff" style={{ opacity: 0.8 }} />
          </View>
          <Text style={styles.zkDesc}>
            Your private data is encrypted locally on your device before it ever reaches our servers. You hold the only keys.
          </Text>
        </View>

        {/* Save/Discard Actions */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.discardBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.discardBtnText}>DISCARD CHANGES</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>APPLY MANIFEST</Text>
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
  headerSection: {
    marginBottom: 24,
  },
  headerSubtitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#775a19',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 8,
  },
  headerDesc: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#44474d',
    lineHeight: 22,
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
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  expandableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 20,
    color: '#000000',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f3f3',
  },
  settingTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  settingTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    color: '#000000',
    marginBottom: 2,
  },
  settingDesc: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 12,
    color: '#44474d',
  },
  trustedDesc: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 12,
    color: '#44474d',
    marginBottom: 16,
  },
  trustedList: {
    marginBottom: 16,
    gap: 12,
  },
  trustedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f3f3',
    padding: 12,
    borderRadius: 12,
  },
  trustedUser: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  trustedAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trustedInitials: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#261900',
  },
  trustedName: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 14,
    color: '#000000',
  },
  addMemberBtn: {
    borderWidth: 1,
    borderColor: '#775a19',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addMemberBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#775a19',
    letterSpacing: 1,
  },
  blockedList: {
    marginTop: 20,
    gap: 12,
  },
  blockedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: '#c5c6cd',
    borderRadius: 12,
  },
  blockedName: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    color: '#000000',
    marginBottom: 4,
  },
  blockedDate: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 11,
    color: '#75777e',
  },
  unblockText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#775a19',
    textTransform: 'uppercase',
  },
  zeroKnowledgeCard: {
    backgroundColor: '#000000',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
  },
  zkBadge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 20,
  },
  zkBadgeText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#e4e3d7',
    letterSpacing: 1,
  },
  zkHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  zkTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 24,
    color: '#ffffff',
    flex: 1,
    paddingRight: 16,
  },
  zkDesc: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#c5c6cd',
    lineHeight: 22,
  },
  actionButtons: {
    flexDirection: 'column',
    gap: 12,
  },
  discardBtn: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  discardBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#44474d',
    letterSpacing: 1,
  },
  saveBtn: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#0a192f',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  saveBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#ffffff',
    letterSpacing: 1,
  }
});
