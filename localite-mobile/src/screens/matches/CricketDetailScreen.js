import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ImageBackground, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function CricketDetailScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {/* Hero Section */}
        <ImageBackground 
          source={{ uri: 'https://via.placeholder.com/600x800' }} 
          style={styles.heroBackground}
        >
          <View style={styles.heroOverlay}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Royal Sports</Text>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialIcons name="notifications" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>

            <View style={styles.heroContent}>
              <Text style={styles.heroSubtitle}>PREMIER LEAGUE SELECTION</Text>
              <Text style={styles.heroTitle}>The Cricket Grounds</Text>
              
              <View style={styles.heroActions}>
                <TouchableOpacity style={styles.primaryAction}>
                  <Text style={styles.primaryActionText}>FIND A MATCH</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryAction}>
                  <Text style={styles.secondaryActionText}>FOLLOW ARENA</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>ACTIVE PLAYERS</Text>
              <Text style={styles.statValue}>1,284</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>SCHEDULED</Text>
              <Text style={styles.statValue}>42</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>FACILITY RATING</Text>
              <Text style={[styles.statValue, {color: '#775a19'}]}>4.9/5</Text>
            </View>
          </View>
        </View>

        {/* Community Overview */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Community Overview</Text>
              <Text style={styles.sectionDesc}>The heart of our local cricket ecosystem.</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.linkText}>VIEW ALL</Text>
            </TouchableOpacity>
          </View>

          <ImageBackground 
            source={{ uri: 'https://via.placeholder.com/400x300' }} 
            style={styles.featuredClub}
            imageStyle={{ borderRadius: 12 }}
          >
            <View style={styles.featuredOverlay}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>FEATURED CLUB</Text>
              </View>
              <Text style={styles.clubName}>The Royal Century Club</Text>
              <Text style={styles.clubDesc}>Our most prestigious local collective, hosting weekly gala matches and private training sessions.</Text>
            </View>
          </ImageBackground>

          <View style={styles.quickPanels}>
            <View style={styles.quickPanelItem}>
              <MaterialIcons name="stadium" size={24} color="#775a19" />
              <View>
                <Text style={styles.panelTitle}>Local Venues</Text>
                <Text style={styles.panelDesc}>Explore 12 certified grounds.</Text>
              </View>
            </View>
            <View style={[styles.quickPanelItem, styles.quickPanelItemPrimary]}>
              <MaterialIcons name="military-tech" size={24} color="#ffdea5" />
              <View>
                <Text style={[styles.panelTitle, {color: '#ffffff'}]}>Weekly Awards</Text>
                <Text style={[styles.panelDesc, {color: 'rgba(255,255,255,0.7)'}]}>Top performances celebrated.</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Top Local Talent */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Local Talent</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.talentList}>
            {/* Player 1 */}
            <View style={styles.talentCard}>
              <View style={styles.talentImageContainer}>
                <Image source={{ uri: 'https://via.placeholder.com/200x200' }} style={styles.talentImage} />
                <View style={styles.rankBadge}>
                  <Text style={styles.rankText}>#1</Text>
                </View>
              </View>
              <Text style={styles.talentName}>Julian Thorne</Text>
              <View style={styles.talentSpecialty}>
                <Text style={styles.talentSpecialtyLabel}>SPECIALTY</Text>
                <Text style={styles.talentSpecialtyValue}>All-Rounder</Text>
              </View>
              <View style={styles.talentFooter}>
                <View>
                  <Text style={styles.talentRatingLabel}>RATING</Text>
                  <Text style={styles.talentRatingValue}>2,450 PR</Text>
                </View>
                <TouchableOpacity style={styles.addBtn}>
                  <MaterialIcons name="person-add" size={16} color="#ffffff" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Player 2 */}
            <View style={styles.talentCard}>
              <View style={styles.talentImageContainer}>
                <Image source={{ uri: 'https://via.placeholder.com/200x200' }} style={styles.talentImage} />
                <View style={styles.rankBadge}>
                  <Text style={styles.rankText}>#2</Text>
                </View>
              </View>
              <Text style={styles.talentName}>Elena Rossi</Text>
              <View style={styles.talentSpecialty}>
                <Text style={styles.talentSpecialtyLabel}>SPECIALTY</Text>
                <Text style={styles.talentSpecialtyValue}>Fast Bowler</Text>
              </View>
              <View style={styles.talentFooter}>
                <View>
                  <Text style={styles.talentRatingLabel}>RATING</Text>
                  <Text style={styles.talentRatingValue}>2,380 PR</Text>
                </View>
                <TouchableOpacity style={styles.addBtn}>
                  <MaterialIcons name="person-add" size={16} color="#ffffff" />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Premier Fixtures */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Premier Fixtures</Text>
            <View style={styles.liveBadge}>
              <Text style={styles.liveBadgeText}>LIVE SOON</Text>
            </View>
          </View>

          <View style={styles.fixturesList}>
            <View style={styles.fixtureCard}>
              <View style={styles.fixtureInfo}>
                <View style={styles.teamView}>
                  <View style={styles.teamLogo}>
                    <MaterialIcons name="shield" size={20} color="#000000" />
                  </View>
                  <Text style={styles.teamNameSm}>Mayfair Lions</Text>
                </View>
                
                <View style={styles.vsView}>
                  <Text style={styles.vsText}>VS</Text>
                  <View style={styles.timeBadge}>
                    <Text style={styles.timeText}>14:30</Text>
                  </View>
                </View>

                <View style={styles.teamView}>
                  <View style={styles.teamLogo}>
                    <MaterialIcons name="security" size={20} color="#775a19" />
                  </View>
                  <Text style={styles.teamNameSm}>Ken. Stags</Text>
                </View>
              </View>
              <View style={styles.fixtureActions}>
                <TouchableOpacity style={styles.outlineBtn}>
                  <Text style={styles.outlineBtnText}>REMIND ME</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.solidBtn}>
                  <Text style={styles.solidBtnText}>JOIN WAITLIST</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Nav Simulation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="stadium" size={24} color="#775a19" />
          <Text style={[styles.navText, {color: '#775a19'}]}>ARENA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="explore" size={24} color="#75777e" />
          <Text style={styles.navText}>DISCOVER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="leaderboard" size={24} color="#75777e" />
          <Text style={styles.navText}>COMPETE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="groups" size={24} color="#75777e" />
          <Text style={styles.navText}>SOCIAL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="person" size={24} color="#75777e" />
          <Text style={styles.navText}>PROFILE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbf9f8',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  heroBackground: {
    height: 500,
    width: '100%',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  iconButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#ffffff',
  },
  heroContent: {
    padding: 24,
    paddingBottom: 48,
  },
  heroSubtitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#ffdea5',
    letterSpacing: 2,
    marginBottom: 8,
  },
  heroTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 40,
    color: '#ffffff',
    marginBottom: 24,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryAction: {
    backgroundColor: '#775a19',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  primaryActionText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#ffffff',
  },
  secondaryAction: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  secondaryActionText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#ffffff',
  },
  statsContainer: {
    marginTop: -24,
    paddingHorizontal: 24,
    zIndex: 10,
  },
  statsGrid: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    justifyContent: 'space-between',
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 9,
    color: '#75777e',
    marginBottom: 4,
  },
  statValue: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 18,
    color: '#000000',
  },
  section: {
    padding: 24,
    paddingBottom: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000000',
    marginBottom: 4,
  },
  sectionDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#44474d',
  },
  linkText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
  },
  featuredClub: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  featuredOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 16,
    justifyContent: 'flex-end',
  },
  badge: {
    backgroundColor: '#775a19',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  badgeText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 8,
    color: '#ffffff',
    letterSpacing: 1,
  },
  clubName: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 4,
  },
  clubDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  quickPanels: {
    flexDirection: 'row',
    gap: 12,
  },
  quickPanelItem: {
    flex: 1,
    backgroundColor: '#f5f3f3',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(197, 198, 205, 0.3)',
  },
  quickPanelItemPrimary: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  panelTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 14,
    color: '#000000',
    marginBottom: 2,
  },
  panelDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 10,
    color: '#44474d',
  },
  talentList: {
    paddingTop: 16,
    gap: 16,
  },
  talentCard: {
    width: 160,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  talentImageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
    position: 'relative',
  },
  talentImage: {
    width: '100%',
    height: '100%',
  },
  rankBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  rankText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#000000',
  },
  talentName: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    color: '#000000',
    marginBottom: 8,
  },
  talentSpecialty: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#efeded',
    paddingBottom: 8,
  },
  talentSpecialtyLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 8,
    color: '#75777e',
  },
  talentSpecialtyValue: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 8,
    color: '#775a19',
  },
  talentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  talentRatingLabel: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 8,
    color: '#75777e',
  },
  talentRatingValue: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#000000',
  },
  addBtn: {
    backgroundColor: '#000000',
    padding: 4,
    borderRadius: 4,
  },
  liveBadge: {
    backgroundColor: '#fed488',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveBadgeText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 8,
    color: '#785a1a',
  },
  fixturesList: {
    gap: 12,
  },
  fixtureCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#efeded',
  },
  fixtureInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  teamView: {
    alignItems: 'center',
    flex: 1,
  },
  teamLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f5f3f3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  teamNameSm: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#000000',
    textAlign: 'center',
  },
  vsView: {
    alignItems: 'center',
    flex: 0.5,
  },
  vsText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    marginBottom: 4,
  },
  timeBadge: {
    backgroundColor: '#eae8e7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  timeText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#000000',
  },
  fixtureActions: {
    flexDirection: 'row',
    gap: 12,
  },
  outlineBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#775a19',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  outlineBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
  },
  solidBtn: {
    flex: 1,
    backgroundColor: '#000000',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  solidBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#ffffff',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(197, 198, 205, 0.3)',
    justifyContent: 'space-around',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    marginTop: 4,
    color: '#75777e',
  },
});
