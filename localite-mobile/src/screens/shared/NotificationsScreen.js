import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { getNotifications, markNotificationAsRead } from '../../services/api';

export default function NotificationsScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('ACTIVITY');
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      fetchData(); // Refresh list
    } catch (err) {
      console.error(err);
    }
  };

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
          {loading ? (
            <ActivityIndicator size="large" color="#775a19" style={{ marginTop: 40 }} />
          ) : (
            notifications.map((notif) => {
              // Map backend notification to UI
              // Backend notification has: id, type, message, isRead, createdAt, user
              const timeStr = new Date(notif.createdAt).toLocaleDateString();
              const isEvent = notif.type === 'EVENT';
              const isPremium = notif.type === 'PREMIUM' || notif.type === 'MEMBERSHIP';

              if (isEvent) {
                return (
                  <TouchableOpacity
                    key={notif.id}
                    style={[styles.eventCard, notif.read ? { opacity: 0.7 } : {}]}
                    onPress={() => handleMarkAsRead(notif.id)}
                  >
                    <Image source={{ uri: 'https://via.placeholder.com/300x150' }} style={styles.eventImg} />
                    <View style={styles.eventBody}>
                      <View style={styles.notifTopRow}>
                        <Text style={styles.notifType}>{notif.type}</Text>
                        <Text style={styles.notifTime}>{timeStr}</Text>
                      </View>
                      <Text style={styles.eventTitle}>New Event</Text>
                      <Text style={styles.eventMessage}>{notif.message}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }

              if (isPremium) {
                return (
                  <TouchableOpacity
                    key={notif.id}
                    style={[styles.premiumCard, notif.read ? { opacity: 0.7 } : {}]}
                    onPress={() => handleMarkAsRead(notif.id)}
                  >
                    <View style={styles.notifTopRow}>
                      <Text style={styles.premiumType}>{notif.type}</Text>
                      <Text style={styles.premiumTime}>{timeStr}</Text>
                    </View>
                    <Text style={styles.premiumMessage}>{notif.message}</Text>
                  </TouchableOpacity>
                );
              }

              return (
                <TouchableOpacity
                  key={notif.id}
                  style={[styles.standardCard, notif.read ? { opacity: 0.7 } : {}]}
                  onPress={() => handleMarkAsRead(notif.id)}
                >
                  <View style={styles.avatarWrap}>
                    <Image
                      source={{ uri: notif.user?.profileImageUrl || 'https://via.placeholder.com/150' }}
                      style={styles.avatar}
                    />
                  </View>
                  <View style={styles.notifContent}>
                    <View style={styles.notifTopRow}>
                      <Text style={styles.notifType}>{notif.type}</Text>
                      <Text style={styles.notifTime}>{timeStr}</Text>
                    </View>
                    <Text style={styles.messageText}>
                      <Text style={styles.boldName}>{notif.user?.username}</Text> {notif.message}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          )}

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
              <Text style={styles.subtleText}>
                3 new members joined the <Text style={styles.boldNameGold}>Vanguard Social Hub</Text>
              </Text>
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
