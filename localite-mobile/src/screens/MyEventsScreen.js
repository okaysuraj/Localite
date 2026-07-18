import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function MyEventsScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('joined'); // 'joined' or 'hosted'

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.openDrawer && navigation.openDrawer()} style={styles.iconBtn}>
            <MaterialIcons name="menu" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Localite</Text>
        </View>
        <TouchableOpacity style={styles.avatarWrap} onPress={() => navigation.navigate('MyProfilePublicView')}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYXIGuAiNSE5qWpsOh2SjoBN2OsP2Q8NvRt3ZJ4zl-AuTLcJncFsqjxL8Ga8iib89M_RfGnytlTOW4yWdCRSdVV8IpRuT4lA6SG2JvS1TUPikuigebxktPVkQaVQhbfejMX9KBpCbeEhekMaIPUxD_gLpRDN3BsTho-CyssYODC5g1OUxoWTjRygzKyUsbKrhEd4pAtGTQkojUYNjNjfWpChBi75AciMo8Ioggqy9OTnDfr-o8yjDzMw' }} 
            style={styles.avatarImg} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Dashboard Header */}
        <View style={styles.dashboardHeader}>
          <View style={styles.dashboardHeaderTitleContainer}>
            <Text style={styles.sectionPreTitle}>YOUR COLLECTION</Text>
            <Text style={styles.sectionTitle}>My Events</Text>
          </View>
          
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tabBtn, activeTab === 'joined' && styles.tabBtnActive]}
              onPress={() => setActiveTab('joined')}
            >
              <Text style={[styles.tabText, activeTab === 'joined' && styles.tabTextActive]}>Joined</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tabBtn, activeTab === 'hosted' && styles.tabBtnActive]}
              onPress={() => setActiveTab('hosted')}
            >
              <Text style={[styles.tabText, activeTab === 'hosted' && styles.tabTextActive]}>Hosted</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.gridContainer}>
          {/* Featured / Upcoming Card */}
          <TouchableOpacity style={styles.featuredCard} activeOpacity={0.9} onPress={() => navigation.navigate('CricketDetail')}>
            <View style={styles.featuredImgWrap}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCf3_ThJ9ci-nKUDlKF3lbuKWRfcp82ojocO6-Ve_L6B76tHzcwQTBtWR14IXSxy0Xx_UrHrKAV1ZCNN6PUw8Mdl-xRxXQKjMUY4Z8cbLghsJXxqST4nK0-xhdVA_Mee_qxTIr1W2HNSJ-D_kcJHVdAT_QgrDfX5VbKsHrsYKjFZujBlk6QpS8FCE7qS1hUMLeMivz5Dwmyt4wjJk6E_xYz2eTgEdAXxjNV7o3Kx4o3gTGtLurYfjmV4g' }} 
                style={styles.featuredImg} 
              />
              <View style={styles.badgeDark}>
                <Text style={styles.badgeDarkText}>UPCOMING</Text>
              </View>
            </View>
            <View style={styles.featuredBody}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.dateTextPrimary}>JUN 12 • 19:00</Text>
                <View style={styles.statusConfirmed}>
                  <MaterialIcons name="check-circle" size={12} color="#15803d" />
                  <Text style={styles.statusConfirmedText}>CONFIRMED</Text>
                </View>
              </View>
              <Text style={styles.cardTitle}>The Collector's Soirée</Text>
              <Text style={styles.cardDesc} numberOfLines={3}>
                An exclusive evening of curated discussions on modern art and heritage architecture at the Grand Pavilion.
              </Text>
              <View style={styles.cardDetails}>
                <View style={styles.detailRow}>
                  <MaterialIcons name="location-on" size={18} color="#775a19" />
                  <Text style={styles.detailText}>The Glass House, Mayfair</Text>
                </View>
                <View style={styles.detailRow}>
                  <MaterialIcons name="group" size={18} color="#775a19" />
                  <Text style={styles.detailText}>Guest of Julian Montgomery</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.viewInviteBtn}>
                <Text style={styles.viewInviteBtnText}>VIEW INVITATION</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          {/* Side Card 1 */}
          {activeTab === 'joined' && (
            <TouchableOpacity style={styles.sideCard} activeOpacity={0.9}>
              <View style={styles.sideCardContent}>
                <View style={styles.cardHeaderRow}>
                  <Text style={styles.dateTextSecondary}>JUN 15</Text>
                  <View style={styles.statusWaitlist}>
                    <MaterialIcons name="hourglass-empty" size={12} color="#775a19" />
                    <Text style={styles.statusWaitlistText}>WAITLISTED</Text>
                  </View>
                </View>
                <Text style={styles.cardTitle}>Polo Brunch</Text>
                <Text style={styles.cardDesc}>Summer tournament finals with premium hospitality.</Text>
              </View>
              <View style={styles.sideCardFooter}>
                <View style={styles.facesWrap}>
                  <View style={[styles.face, { backgroundColor: '#e2e8f0' }]} />
                  <View style={[styles.face, { backgroundColor: '#cbd5e1' }]} />
                  <View style={styles.faceMore}><Text style={styles.faceMoreText}>+12</Text></View>
                </View>
                <MaterialIcons name="arrow-forward" size={20} color="#000" />
              </View>
            </TouchableOpacity>
          )}

          {/* Horizontal Small Card 1 */}
          {activeTab === 'joined' && (
            <TouchableOpacity style={styles.horizontalCard} activeOpacity={0.9}>
              <View style={styles.horizontalImgWrap}>
                <Image 
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcbGso_42OgmkRi45TsaFp8k2Ggfx9b7fuU_ZPSJAkF4koRgCgtE2WVVETlGRonsxv8Axo46PSMfO-Z3fR87QIBmxGcF-FsLfS6fztygVF0aUpmqLU-0Uf51GkY-PwDBVTFryArOTKprYz9htn_ZHbUgJ9cgqnieeP3TrgJplvSinkyzjKKUwzz4vFgHgm6hj73AZXAofRFQGnynBFsMV7Fe5xMPhLolHelO84QsxImbddAAe5G0Q1nA' }} 
                  style={styles.horizontalImg} 
                />
              </View>
              <View style={styles.horizontalBody}>
                <View style={styles.horizontalHeaderRow}>
                  <Text style={styles.dateTextSecondary}>TOMORROW</Text>
                  <View style={styles.statusPast}><Text style={styles.statusPastText}>PAST</Text></View>
                </View>
                <Text style={styles.horizontalTitle}>Roastery Tour</Text>
                <Text style={styles.horizontalStatusText}>Confirmed</Text>
              </View>
            </TouchableOpacity>
          )}

          {/* Horizontal Small Card 2 */}
          {activeTab === 'joined' && (
            <TouchableOpacity style={styles.horizontalCard} activeOpacity={0.9}>
              <View style={styles.horizontalImgWrap}>
                <Image 
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDwWYVlWZ7zcPCndtNesqsfvahgqXcQ4tYL_qy2xieXAAgllBo-Afoq7UD_6OVv1SdqR5i2DPcGBiCyxMCg9tUZiC7f7rPNBRQnArV45oJxrsite5LfwxceM0WyKAqfZ-3Qq5dGZnbLXxtv5AXHdvHyMIzQ5f7oIINyRZoCMJXsOwehCdm-qFW-YWUyq5qG2eIl7HAaDfS7QKX7L7u_3qMbfBdzv14bympf4SrwOa70AjBwHnO03kpBA' }} 
                  style={styles.horizontalImg} 
                />
              </View>
              <View style={styles.horizontalBody}>
                <View style={styles.horizontalHeaderRow}>
                  <Text style={styles.dateTextSecondary}>JUL 02</Text>
                  <View style={styles.statusNew}><Text style={styles.statusNewText}>NEW</Text></View>
                </View>
                <Text style={styles.horizontalTitle}>Tennis Mixer</Text>
                <Text style={styles.horizontalStatusText}>Confirmed</Text>
              </View>
            </TouchableOpacity>
          )}

          {/* Hosted Specific Card */}
          {activeTab === 'hosted' && (
            <TouchableOpacity style={styles.hostedCard} activeOpacity={0.9} onPress={() => navigation.navigate('EventInsights')}>
              <View>
                <View style={styles.cardHeaderRow}>
                  <Text style={[styles.dateTextSecondary, { color: '#ffdea5' }]}>AUG 10</Text>
                  <View style={styles.statusHost}>
                    <MaterialIcons name="star" size={12} color="#ffdea5" />
                    <Text style={styles.statusHostText}>HOST</Text>
                  </View>
                </View>
                <Text style={[styles.cardTitle, { color: '#fff' }]}>Wine Tasting: Old World</Text>
                <Text style={styles.hostedDesc}>
                  Leading a private tasting of rare Bordeaux vintages for the wine committee.
                </Text>
              </View>
              <View style={styles.hostedFooter}>
                <Text style={styles.hostedAttendeesText}>24 ATTENDEES</Text>
                <TouchableOpacity style={styles.manageBtn} onPress={() => navigation.navigate('HostDashboard')}>
                  <Text style={styles.manageBtnText}>MANAGE</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}

        </View>

        {/* History Section */}
        <View style={styles.historySection}>
          <Text style={styles.historyTitle}>Past Experiences</Text>
          <View style={styles.historyList}>
            {/* History Item 1 */}
            <View style={styles.historyItem}>
              <View style={styles.historyItemLeft}>
                <View style={styles.historyDate}>
                  <Text style={styles.historyMonth}>MAY</Text>
                  <Text style={styles.historyDay}>24</Text>
                </View>
                <View style={styles.historyInfo}>
                  <Text style={styles.historyItemTitle}>Architectural Walk: Brutalist Roots</Text>
                  <Text style={styles.historyItemDesc}>Hosted by Sarah Jenkins</Text>
                </View>
              </View>
            </View>

            {/* History Item 2 */}
            <View style={styles.historyItem}>
              <View style={styles.historyItemLeft}>
                <View style={styles.historyDate}>
                  <Text style={styles.historyMonth}>MAY</Text>
                  <Text style={styles.historyDay}>12</Text>
                </View>
                <View style={styles.historyInfo}>
                  <Text style={styles.historyItemTitle}>Private View: The Modernist Exhibit</Text>
                  <Text style={styles.historyItemDesc}>Tate Modern Lounge</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreateEventBasicInfo')}>
        <MaterialIcons name="add" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('EventsList')}>
          <MaterialIcons name="explore" size={24} color="rgba(68, 71, 77, 0.6)" />
          <Text style={styles.navText}>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemActive}>
          <MaterialIcons name="event-note" size={24} color="#775a19" />
          <Text style={styles.navTextActive}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="storefront" size={24} color="rgba(68, 71, 77, 0.6)" />
          <Text style={styles.navText}>Places</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('MyProfilePublicView')}>
          <MaterialIcons name="person" size={24} color="rgba(68, 71, 77, 0.6)" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
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
    gap: 16,
  },
  iconBtn: { padding: 4 },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    letterSpacing: -0.5,
  },
  avatarWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#eae8e7',
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  content: {
    paddingTop: 24,
    paddingBottom: 120,
  },
  dashboardHeader: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  dashboardHeaderTitleContainer: {
    marginBottom: 16,
  },
  sectionPreTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 2,
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f3f3',
    borderRadius: 24,
    padding: 4,
    alignSelf: 'flex-start',
  },
  tabBtn: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tabBtnActive: {
    backgroundColor: '#000',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  tabText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#44474d',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tabTextActive: {
    color: '#fff',
  },
  gridContainer: {
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 32,
  },
  featuredCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },
  featuredImgWrap: {
    height: 256,
    width: '100%',
    position: 'relative',
  },
  featuredImg: {
    width: '100%',
    height: '100%',
  },
  badgeDark: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  badgeDarkText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 8,
    color: '#fff',
    letterSpacing: 1,
  },
  featuredBody: {
    padding: 24,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateTextPrimary: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
  },
  dateTextSecondary: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
    letterSpacing: 1,
  },
  statusConfirmed: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusConfirmedText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 8,
    color: '#15803d',
    letterSpacing: 1,
  },
  cardTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    marginBottom: 8,
  },
  cardDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
    lineHeight: 20,
    marginBottom: 16,
  },
  cardDetails: {
    gap: 8,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#1b1c1c',
  },
  viewInviteBtn: {
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewInviteBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#000',
    letterSpacing: 1,
  },
  sideCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },
  sideCardContent: {
    marginBottom: 16,
  },
  statusWaitlist: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 222, 165, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusWaitlistText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 8,
    color: '#775a19',
    letterSpacing: 1,
  },
  sideCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eae8e7',
    paddingTop: 16,
  },
  facesWrap: {
    flexDirection: 'row',
  },
  face: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#fff',
    marginLeft: -8,
  },
  faceMore: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#fff',
    marginLeft: -8,
    backgroundColor: '#fed488',
    alignItems: 'center',
    justifyContent: 'center',
  },
  faceMoreText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 8,
    color: '#000',
  },
  horizontalCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },
  horizontalImgWrap: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
  },
  horizontalImg: {
    width: '100%',
    height: '100%',
  },
  horizontalBody: {
    flex: 1,
  },
  horizontalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  statusPast: {
    backgroundColor: '#eae8e7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusPastText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 8,
    color: '#44474d',
  },
  statusNew: {
    backgroundColor: '#000',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusNewText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 8,
    color: '#fff',
  },
  horizontalTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
  },
  horizontalStatusText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#775a19',
  },
  hostedCard: {
    backgroundColor: '#000',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 4,
    justifyContent: 'space-between',
    minHeight: 180,
  },
  statusHost: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#ffdea5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusHostText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 8,
    color: '#ffdea5',
    letterSpacing: 1,
  },
  hostedDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#b9c7e4',
    marginBottom: 16,
  },
  hostedFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hostedAttendeesText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#fff',
    letterSpacing: 1,
  },
  manageBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  manageBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 8,
    color: '#000',
    letterSpacing: 1,
  },
  historySection: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  historyTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    marginBottom: 16,
  },
  historyList: {
    gap: 16,
  },
  historyItem: {
    backgroundColor: 'rgba(245, 243, 243, 0.5)',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
  },
  historyItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  historyDate: {
    alignItems: 'center',
    width: 48,
  },
  historyMonth: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
    letterSpacing: 1,
  },
  historyDay: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
  },
  historyInfo: {
    flex: 1,
  },
  historyItemTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
  },
  historyItemDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
  },
  fab: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 100 : 80,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 5,
    zIndex: 20,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
    paddingTop: 16,
    paddingHorizontal: 24,
    justifyContent: 'space-around',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  navItemActive: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 2,
    borderTopColor: '#775a19',
    paddingTop: 6,
  },
  navText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: 'rgba(68, 71, 77, 0.6)',
    marginTop: 4,
  },
  navTextActive: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    marginTop: 4,
  }
});
