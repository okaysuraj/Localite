import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, Switch, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function NotificationPreferencesScreen() {
  const navigation = useNavigation();

  // Toggles state
  const [hubEmail, setHubEmail] = useState(true);
  const [hubPush, setHubPush] = useState(false);
  const [eventCritical, setEventCritical] = useState(true);
  const [eventComments, setEventComments] = useState(true);
  const [msgPreview, setMsgPreview] = useState(false);
  const [msgSmart, setMsgSmart] = useState(true);
  const [commHighlights, setCommHighlights] = useState(true);
  const [commUpdates, setCommUpdates] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <MaterialIcons name="menu" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Localite</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.avatarWrap}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAj0b3tfJnZBm7k7zhHcjoF8FW5r-EJMh3kmErl7byLvlvK6pyn9siwcty-5uiZ20fRCHb9qaq_y5F0RzNH5FPefT_SH1F2HwNgumR2O2gXw8OcUUJ-lkTirCTIVuUPk1NxgmNq16ItBB9gCALmg7YKzIpMOxrHDlnoaezzGExD8csmcUpdXuR46V5-nmscTYrB_gO2xOs0rBjo5vjQnRko9w__fYhAnYWu8xr1LoG3QR43Lqmya4OM6w' }} 
              style={styles.avatarImg} 
            />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Page Header */}
        <View style={styles.pageHeader}>
          <Text style={styles.preTitle}>ACCOUNT SETTINGS</Text>
          <Text style={styles.pageTitle}>Notification Preferences</Text>
          <Text style={styles.pageDesc}>
            Curate your digital experience. Choose how and when you wish to be notified about the gatherings that matter to you.
          </Text>
        </View>

        {/* Section: Hub Invites */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIconWrap, { backgroundColor: '#fed488' }]}>
              <MaterialIcons name="hub" size={24} color="#775a19" />
            </View>
            <View style={styles.sectionHeaderText}>
              <Text style={styles.sectionTitle}>Hub Invites</Text>
              <Text style={styles.sectionDesc}>Manage invitations to exclusive community hubs and interest-based circles.</Text>
            </View>
          </View>

          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleTitle}>Email Notifications</Text>
              <Text style={styles.toggleSubtitle}>WEEKLY DIGEST OF INVITES</Text>
            </View>
            <Switch
              trackColor={{ false: '#eae8e7', true: '#775a19' }}
              thumbColor={'#fff'}
              ios_backgroundColor="#eae8e7"
              onValueChange={setHubEmail}
              value={hubEmail}
            />
          </View>
          
          <View style={[styles.toggleRow, { borderBottomWidth: 0 }]}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleTitle}>Push Notifications</Text>
              <Text style={styles.toggleSubtitle}>INSTANT ALERTS FOR NEW HUBS</Text>
            </View>
            <Switch
              trackColor={{ false: '#eae8e7', true: '#775a19' }}
              thumbColor={'#fff'}
              ios_backgroundColor="#eae8e7"
              onValueChange={setHubPush}
              value={hubPush}
            />
          </View>
        </View>

        {/* Section: Event Updates */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIconWrap, { backgroundColor: '#d6e3ff' }]}>
              <MaterialIcons name="event-available" size={24} color="#000" />
            </View>
            <View style={styles.sectionHeaderText}>
              <Text style={styles.sectionTitle}>Event Updates</Text>
              <Text style={styles.sectionDesc}>Stay informed about schedule changes, venue shifts, and attendee activity for your booked events.</Text>
            </View>
          </View>

          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleTitle}>Critical Changes</Text>
              <Text style={styles.toggleSubtitle}>TIME OR LOCATION UPDATES</Text>
            </View>
            <Switch
              trackColor={{ false: '#eae8e7', true: '#775a19' }}
              thumbColor={'#fff'}
              ios_backgroundColor="#eae8e7"
              onValueChange={setEventCritical}
              value={eventCritical}
            />
          </View>
          
          <View style={[styles.toggleRow, { borderBottomWidth: 0 }]}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleTitle}>Attendee Comments</Text>
              <Text style={styles.toggleSubtitle}>NEW POSTS IN EVENT DISCUSSION</Text>
            </View>
            <Switch
              trackColor={{ false: '#eae8e7', true: '#775a19' }}
              thumbColor={'#fff'}
              ios_backgroundColor="#eae8e7"
              onValueChange={setEventComments}
              value={eventComments}
            />
          </View>
        </View>

        {/* Section: Direct Messages */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIconWrap, { backgroundColor: '#e4e3d7' }]}>
              <MaterialIcons name="chat-bubble" size={24} color="#000" />
            </View>
            <View style={styles.sectionHeaderText}>
              <Text style={styles.sectionTitle}>Direct Messages</Text>
              <Text style={styles.sectionDesc}>Personal outreach from hub organizers and local connections.</Text>
            </View>
          </View>

          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleTitle}>New Message Preview</Text>
              <Text style={styles.toggleSubtitle}>SHOW CONTENT IN NOTIFICATION</Text>
            </View>
            <Switch
              trackColor={{ false: '#eae8e7', true: '#775a19' }}
              thumbColor={'#fff'}
              ios_backgroundColor="#eae8e7"
              onValueChange={setMsgPreview}
              value={msgPreview}
            />
          </View>
          
          <View style={[styles.toggleRow, { borderBottomWidth: 0 }]}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleTitle}>Smart Reply Prompts</Text>
              <Text style={styles.toggleSubtitle}>CONTEXTUAL SUGGESTIONS</Text>
            </View>
            <Switch
              trackColor={{ false: '#eae8e7', true: '#775a19' }}
              thumbColor={'#fff'}
              ios_backgroundColor="#eae8e7"
              onValueChange={setMsgSmart}
              value={msgSmart}
            />
          </View>
        </View>

        {/* Section: Community Announcements */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIconWrap, { backgroundColor: '#ffdad6' }]}>
              <MaterialIcons name="campaign" size={24} color="#ba1a1a" />
            </View>
            <View style={styles.sectionHeaderText}>
              <Text style={styles.sectionTitle}>Community Announcements</Text>
              <Text style={styles.sectionDesc}>High-level updates regarding the Localite platform, membership benefits, and seasonal highlights.</Text>
            </View>
          </View>

          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleTitle}>Member Highlights</Text>
              <Text style={styles.toggleSubtitle}>STORIES FROM THE COMMUNITY</Text>
            </View>
            <Switch
              trackColor={{ false: '#eae8e7', true: '#775a19' }}
              thumbColor={'#fff'}
              ios_backgroundColor="#eae8e7"
              onValueChange={setCommHighlights}
              value={commHighlights}
            />
          </View>
          
          <View style={[styles.toggleRow, { borderBottomWidth: 0 }]}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleTitle}>Product Updates</Text>
              <Text style={styles.toggleSubtitle}>NEW FEATURES AND TIPS</Text>
            </View>
            <Switch
              trackColor={{ false: '#eae8e7', true: '#775a19' }}
              thumbColor={'#fff'}
              ios_backgroundColor="#eae8e7"
              onValueChange={setCommUpdates}
              value={commUpdates}
            />
          </View>
        </View>

        {/* Action Footer */}
        <View style={styles.footerActions}>
          <Text style={styles.lastUpdated}>Last updated: October 24, 2023</Text>
          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.resetBtn}>
              <Text style={styles.resetBtnText}>RESET TO DEFAULT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn}>
              <Text style={styles.saveBtnText}>SAVE CHANGES</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbf9f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fbf9f8',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    zIndex: 10,
    paddingTop: Platform.OS === 'android' ? 40 : 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: { padding: 4 },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    fontStyle: 'italic',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#000',
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  pageHeader: {
    marginBottom: 32,
  },
  preTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 2,
    marginBottom: 8,
  },
  pageTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
    marginBottom: 12,
  },
  pageDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    lineHeight: 24,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#efeded',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 24,
  },
  sectionIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeaderText: {
    flex: 1,
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000',
    marginBottom: 4,
  },
  sectionDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
    lineHeight: 20,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#efeded',
  },
  toggleInfo: {
    flex: 1,
    paddingRight: 16,
  },
  toggleTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
  },
  toggleSubtitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
  },
  footerActions: {
    marginTop: 16,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#e4e2e2',
    alignItems: 'center',
    gap: 16,
  },
  lastUpdated: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
    fontStyle: 'italic',
  },
  btnRow: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
  resetBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#775a19',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
  },
  saveBtn: {
    flex: 1,
    backgroundColor: '#000',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  saveBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#fff',
    letterSpacing: 1,
  }
});
