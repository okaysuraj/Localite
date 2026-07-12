import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Switch 
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

export default function NotificationSettingsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  
  const [pushInvitations, setPushInvitations] = useState(true);
  const [pushMessages, setPushMessages] = useState(true);
  const [pushLocation, setPushLocation] = useState(false);
  const [safetyAlerts, setSafetyAlerts] = useState(true);
  const [emailDigest, setEmailDigest] = useState('weekly');
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
        setPushInvitations(user.pushInvitations !== false);
        setPushMessages(user.pushMessages !== false);
        setPushLocation(user.pushLocation || false);
        setSafetyAlerts(user.safetyAlerts !== false);
        setEmailDigest(user.emailDigest || 'weekly');
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
        pushInvitations,
        pushMessages,
        pushLocation,
        safetyAlerts,
        emailDigest
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
          <Text style={styles.appBarTitle}>Notification Settings</Text>
          <View style={{ width: 40 }} /> {/* Placeholder */}
        </View>
      </SafeAreaView>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        
        <View style={styles.headerSection}>
          <Text style={styles.headerSubtitle}>Personalization</Text>
          <Text style={styles.headerDesc}>
            Curate your communication preferences to maintain an undisturbed and premium social experience.
          </Text>
        </View>

        {/* Push Notifications */}
        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="notifications-active" size={20} color="#775a19" />
            <Text style={styles.sectionTitle}>Push Notifications</Text>
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingIconWrapper}>
              <MaterialIcons name="celebration" size={20} color="#000000" />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>New Invitations</Text>
              <Text style={styles.settingDesc}>Instant alerts for exclusive events.</Text>
            </View>
            <Switch 
              value={pushInvitations} 
              onValueChange={setPushInvitations}
              trackColor={{ false: '#e4e2e2', true: '#775a19' }}
              thumbColor={'#ffffff'}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingIconWrapper}>
              <MaterialIcons name="forum" size={20} color="#000000" />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Messages</Text>
              <Text style={styles.settingDesc}>Real-time chat updates.</Text>
            </View>
            <Switch 
              value={pushMessages} 
              onValueChange={setPushMessages}
              trackColor={{ false: '#e4e2e2', true: '#775a19' }}
              thumbColor={'#ffffff'}
            />
          </View>

          <View style={[styles.settingRow, { borderBottomWidth: 0, paddingBottom: 0, marginBottom: 0 }]}>
            <View style={styles.settingIconWrapper}>
              <MaterialIcons name="near-me" size={20} color="#000000" />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Location Proximity</Text>
              <Text style={styles.settingDesc}>Discover hidden gems nearby.</Text>
            </View>
            <Switch 
              value={pushLocation} 
              onValueChange={setPushLocation}
              trackColor={{ false: '#e4e2e2', true: '#775a19' }}
              thumbColor={'#ffffff'}
            />
          </View>
        </View>

        {/* Privacy & Safety Alerts */}
        <View style={styles.privacyCard}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="shield" size={20} color="#e9c176" />
            <Text style={[styles.sectionTitle, { color: '#ffffff' }]}>Safety</Text>
          </View>

          <View style={styles.actionRow}>
            <View style={{ flex: 1, paddingRight: 16 }}>
              <Text style={[styles.actionTitle, { color: '#e9c176' }]}>Safety Alerts</Text>
              <Text style={[styles.actionSubtitle, { color: '#b9c7e4' }]}>Critical updates regarding local safety protocols.</Text>
            </View>
            <Switch 
              value={safetyAlerts} 
              onValueChange={setSafetyAlerts}
              trackColor={{ false: '#46473f', true: '#e9c176' }}
              thumbColor={safetyAlerts ? '#000000' : '#ffffff'}
            />
          </View>

          <View style={styles.vaultStatus}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 }}>
              <MaterialIcons name="verified-user" size={16} color="#e9c176" />
              <Text style={styles.vaultTitle}>VAULT STATUS</Text>
            </View>
            <Text style={styles.vaultDesc}>
              Your data is encrypted. We never share your location history with third-party partners.
            </Text>
          </View>
        </View>

        {/* Email Digests */}
        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="mail-outline" size={20} color="#775a19" />
            <Text style={styles.sectionTitle}>Email Digests</Text>
          </View>
          <Text style={styles.digestDesc}>
            Refined summaries of your weekly social calendar and neighborhood highlights.
          </Text>

          <View style={styles.digestGrid}>
            {['weekly', 'monthly', 'off'].map((freq) => (
              <TouchableOpacity 
                key={freq}
                style={[
                  styles.digestOption, 
                  emailDigest === freq && styles.digestOptionActive
                ]}
                onPress={() => setEmailDigest(freq)}
              >
                <Text style={styles.digestOptionLabel}>FREQUENCY</Text>
                <Text style={styles.digestOptionTitle}>{freq.charAt(0).toUpperCase() + freq.slice(1)}</Text>
                <Text style={styles.digestOptionDesc}>
                  {freq === 'weekly' ? 'Weekend outlook' : freq === 'monthly' ? 'Exec summary' : 'Minimalist'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Save/Discard Actions */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.discardBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.discardBtnText}>DISCARD</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>SAVE PREFERENCES</Text>
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
    marginBottom: 8,
  },
  settingIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f5f3f3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
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
  privacyCard: {
    backgroundColor: '#000000',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  actionSubtitle: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 12,
  },
  vaultStatus: {
    backgroundColor: '#0d1c32',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  vaultTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#ffffff',
    letterSpacing: 1,
  },
  vaultDesc: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 11,
    color: '#76849f',
    lineHeight: 16,
  },
  digestDesc: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 13,
    color: '#44474d',
    marginBottom: 20,
  },
  digestGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  digestOption: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#f5f3f3',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#fbf9f8',
  },
  digestOptionActive: {
    borderColor: '#775a19',
    backgroundColor: '#ffffff',
  },
  digestOptionLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 8,
    color: '#75777e',
    marginBottom: 4,
  },
  digestOptionTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 14,
    color: '#000000',
    marginBottom: 4,
  },
  digestOptionDesc: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 10,
    color: '#44474d',
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  discardBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#775a19',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  discardBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#775a19',
    letterSpacing: 1,
  },
  saveBtn: {
    flex: 1.5,
    backgroundColor: '#000000',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#ffffff',
    letterSpacing: 1,
  }
});
