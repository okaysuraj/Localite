import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'MENTION',
    time: '2M AGO',
    user: 'Julian Thorne',
    message: 'mentioned you in a comment.',
    quote: '"I think the acoustics at the grand hall would suit your performance perfectly..."',
    image: 'https://via.placeholder.com/150',
    icon: 'chat-bubble',
    isSpecial: false
  },
  {
    id: 2,
    type: 'NEW EVENT',
    time: '1H AGO',
    title: 'The Winter Masquerade',
    message: "Your presence is requested at the season's most anticipated gathering.",
    bgImage: 'https://via.placeholder.com/300x150',
    isEvent: true
  },
  {
    id: 3,
    type: 'MEMBERSHIP',
    time: 'YESTERDAY',
    message: 'Your membership status has been updated to Elite.',
    desc: 'Unlock exclusive access to private hubs and priority event bookings.',
    isPremium: true
  }
];

export default function NotificationsScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('ACTIVITY');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <MaterialIcons name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Localite</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="settings" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.pageTitleWrap}>
          <Text style={styles.pageTitle}>Notifications</Text>
          <Text style={styles.pageSubtitle}>PERSONAL CONCIERGE UPDATES</Text>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tabBtn} onPress={() => setActiveTab('ACTIVITY')}>
            <Text style={[styles.tabText, activeTab === 'ACTIVITY' && styles.tabTextActive]}>ACTIVITY</Text>
            {activeTab === 'ACTIVITY' && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabBtn} onPress={() => setActiveTab('COMMUNITY')}>
            <Text style={[styles.tabText, activeTab === 'COMMUNITY' && styles.tabTextActive]}>COMMUNITY</Text>
            {activeTab === 'COMMUNITY' && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        </View>

        <View style={styles.listArea}>
          {NOTIFICATIONS.map(notif => {
            if (notif.isEvent) {
              return (
                <View key={notif.id} style={styles.eventCard}>
                  <Image source={{ uri: notif.bgImage }} style={styles.eventImg} />
                  <View style={styles.eventBody}>
                    <View style={styles.notifTopRow}>
                      <Text style={styles.notifType}>{notif.type}</Text>
                      <Text style={styles.notifTime}>{notif.time}</Text>
                    </View>
                    <Text style={styles.eventTitle}>{notif.title}</Text>
                    <Text style={styles.eventMessage}>{notif.message}</Text>
                    <View style={styles.eventActionRow}>
                      <View style={styles.attendeeFaces}>
                        <Image source={{ uri: 'https://via.placeholder.com/30' }} style={[styles.attendeeImg, { zIndex: 3 }]} />
                        <Image source={{ uri: 'https://via.placeholder.com/30' }} style={[styles.attendeeImg, { marginLeft: -10, zIndex: 2 }]} />
                        <View style={[styles.attendeeCountWrap, { marginLeft: -10, zIndex: 1 }]}>
                          <Text style={styles.attendeeCount}>+12</Text>
                        </View>
                      </View>
                      <TouchableOpacity style={styles.viewInvBtn}>
                        <Text style={styles.viewInvText}>VIEW INVITATION</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }

            if (notif.isPremium) {
              return (
                <View key={notif.id} style={styles.premiumCard}>
                  <View style={styles.notifTopRow}>
                    <Text style={styles.premiumType}>{notif.type}</Text>
                    <Text style={styles.premiumTime}>{notif.time}</Text>
                  </View>
                  <Text style={styles.premiumMessage}>{notif.message}</Text>
                  <Text style={styles.premiumDesc}>{notif.desc}</Text>
                  <TouchableOpacity style={styles.perksBtn}>
                    <Text style={styles.perksText}>EXPLORE PERKS</Text>
                  </TouchableOpacity>
                </View>
              );
            }

            return (
              <View key={notif.id} style={styles.standardCard}>
                <View style={styles.avatarWrap}>
                  <Image source={{ uri: notif.image }} style={styles.avatar} />
                  <View style={styles.avatarIconBadge}>
                    <MaterialIcons name={notif.icon} size={10} color="#785a1a" />
                  </View>
                </View>
                <View style={styles.notifContent}>
                  <View style={styles.notifTopRow}>
                    <Text style={styles.notifType}>{notif.type}</Text>
                    <Text style={styles.notifTime}>{notif.time}</Text>
                  </View>
                  <Text style={styles.messageText}>
                    <Text style={styles.boldName}>{notif.user}</Text> {notif.message}
                  </Text>
                  {notif.quote && (
                    <View style={styles.quoteWrap}>
                      <Text style={styles.quoteText}>{notif.quote}</Text>
                    </View>
                  )}
                </View>
              </View>
            );
          })}

          <View style={styles.dividerWrap}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>EARLIER THIS WEEK</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.subtleRow}>
            <View style={styles.subtleIconWrap}>
              <MaterialIcons name="group" size={20} color="#000" />
            </View>
            <View style={styles.subtleContent}>
              <Text style={styles.subtleText}>3 new members joined the <Text style={styles.boldNameGold}>Vanguard Social Hub</Text></Text>
              <Text style={styles.subtleType}>COMMUNITY UPDATE</Text>
            </View>
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
  },
  iconBtn: { padding: 4 },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  pageTitleWrap: {
    marginBottom: 24,
  },
  pageTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
    marginBottom: 4,
  },
  pageSubtitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#eae8e7',
    marginBottom: 24,
  },
  tabBtn: {
    paddingVertical: 8,
    position: 'relative',
  },
  tabText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#75777e',
    letterSpacing: 1,
  },
  tabTextActive: {
    color: '#000',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -1,
    left: '50%',
    transform: [{ translateX: -2 }],
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#775a19',
  },
  listArea: {
    gap: 24,
  },
  notifTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notifType: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
  },
  notifTime: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
  },
  standardCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 16,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.02)',
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'rgba(254, 212, 136, 0.3)',
  },
  avatarIconBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#fed488',
    padding: 4,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  notifContent: {
    flex: 1,
  },
  messageText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#000',
    lineHeight: 20,
  },
  boldName: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontWeight: 'bold',
  },
  quoteWrap: {
    marginTop: 8,
    borderLeftWidth: 2,
    borderLeftColor: 'rgba(254, 212, 136, 0.5)',
    paddingLeft: 12,
  },
  quoteText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#44474d',
    fontStyle: 'italic',
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.02)',
  },
  eventImg: {
    width: '100%',
    height: 128,
  },
  eventBody: {
    padding: 16,
  },
  eventTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000',
    marginBottom: 4,
  },
  eventMessage: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
  },
  eventActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  attendeeFaces: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeeImg: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  attendeeCountWrap: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fed488',
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  attendeeCount: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 8,
    color: '#785a1a',
  },
  viewInvBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#775a19',
  },
  viewInvText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
  },
  premiumCard: {
    backgroundColor: '#000',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  premiumType: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#ffdea5',
    letterSpacing: 1,
  },
  premiumTime: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#c5c6cd',
    letterSpacing: 1,
  },
  premiumMessage: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#fff',
    marginBottom: 8,
  },
  premiumDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#c5c6cd',
    marginBottom: 16,
  },
  perksBtn: {
    backgroundColor: '#fed488',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 24,
    alignSelf: 'flex-start',
  },
  perksText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#785a1a',
  },
  dividerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#eae8e7',
  },
  dividerText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    marginHorizontal: 16,
    letterSpacing: 1,
  },
  subtleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 8,
  },
  subtleIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eae8e7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtleContent: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#eae8e7',
    paddingBottom: 16,
  },
  subtleText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#000',
  },
  boldNameGold: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontWeight: 'bold',
    color: '#775a19',
  },
  subtleType: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    marginTop: 4,
    letterSpacing: 1,
  },
});
