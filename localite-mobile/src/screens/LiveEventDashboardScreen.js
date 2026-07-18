import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, Image, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function LiveEventDashboardScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Royal Assemblage</Text>
        <View style={styles.avatar}>
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.avatarImg} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroSection}>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>Live Now</Text>
          </View>
          <Text style={styles.heroTitle}>Vintage Garden Soiree</Text>
          <Text style={styles.heroSubtitle}>The Willows Estate</Text>
          
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.primaryButton}>
              <MaterialIcons name="directions-walk" size={16} color="#fff" />
              <Text style={styles.primaryButtonText}>I'M ON MY WAY</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <MaterialIcons name="share-location" size={16} color="#775a19" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Guest List</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>32 of 50 Arrived</Text>
            </View>
          </View>

          <View style={styles.guestList}>
            <View style={styles.guestItem}>
              <View style={styles.guestLeft}>
                <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.guestAvatar} />
                <View>
                  <Text style={styles.guestName}>Julian Montgomery</Text>
                  <Text style={styles.guestRole}>PROTOCOL MEMBER</Text>
                </View>
              </View>
              <View style={styles.guestStatus}>
                <MaterialIcons name="verified" size={16} color="#775a19" />
                <Text style={styles.guestStatusText}>ARRIVED</Text>
              </View>
            </View>
            
            <View style={styles.guestItem}>
              <View style={styles.guestLeft}>
                <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.guestAvatar} />
                <View>
                  <Text style={styles.guestName}>Elena Rossi</Text>
                  <Text style={styles.guestRole}>GUEST</Text>
                </View>
              </View>
              <View style={styles.guestStatus}>
                <MaterialIcons name="directions-car" size={16} color="#75777e" />
                <Text style={[styles.guestStatusText, { color: '#75777e' }]}>EN ROUTE</Text>
              </View>
            </View>
          </View>
          
          <TouchableOpacity style={styles.viewAllBtn}>
            <Text style={styles.viewAllText}>VIEW ALL ATTENDEES</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mapCard}>
          <ImageBackground source={{ uri: 'https://via.placeholder.com/600x400' }} style={styles.mapImage} imageStyle={styles.mapImageStyle}>
            <View style={styles.mapOverlay}>
              <MaterialIcons name="my-location" size={16} color="#775a19" />
              <Text style={styles.mapLabel}>LIVE TRACKING</Text>
            </View>
            
            <View style={styles.mapMarker}>
              <View style={styles.markerImgWrapper}>
                <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.markerImg} />
              </View>
              <View style={styles.markerLabel}>
                <Text style={styles.markerText}>ELENA</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.mapFab}>
              <MaterialIcons name="add" size={24} color="#fff" />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <View style={styles.milestoneCard}>
          <View style={styles.milestoneLeft}>
            <View style={styles.milestoneIcon}>
              <MaterialIcons name="emoji-events" size={24} color="#e9c176" />
            </View>
            <View>
              <Text style={styles.milestoneLabel}>NEXT MILESTONE</Text>
              <Text style={styles.milestoneTitle}>Champagne Toast</Text>
            </View>
          </View>
          <View style={styles.milestoneRight}>
            <Text style={styles.milestoneTime}>12:45</Text>
            <Text style={styles.milestoneSub}>MIN REMAINING</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fbf9f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    paddingTop: Platform.OS === 'android' ? 40 : 12,
    backgroundColor: '#fbf9f8',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eae8e7',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
    gap: 24,
  },
  heroSection: {
    alignItems: 'flex-start',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ba1a1a',
  },
  liveText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#ba1a1a',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    marginBottom: 16,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    letterSpacing: 1,
  },
  secondaryButton: {
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#775a19',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000',
  },
  countBadge: {
    backgroundColor: '#fed488',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#785a1a',
  },
  guestList: {
    gap: 12,
  },
  guestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  guestLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  guestAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(119, 90, 25, 0.2)',
  },
  guestName: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    color: '#000',
  },
  guestRole: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
    marginTop: 2,
  },
  guestStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  guestStatusText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
  },
  viewAllBtn: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eae8e7',
    alignItems: 'center',
  },
  viewAllText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
  },
  mapCard: {
    height: 240,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
  },
  mapImage: {
    flex: 1,
  },
  mapImageStyle: {
    opacity: 0.8,
  },
  mapOverlay: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  mapLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#000',
    letterSpacing: 1,
  },
  mapMarker: {
    position: 'absolute',
    top: '40%',
    left: '40%',
    alignItems: 'center',
  },
  markerImgWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  markerImg: {
    width: '100%',
    height: '100%',
  },
  markerLabel: {
    backgroundColor: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  markerText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 8,
    color: '#000',
  },
  mapFab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  milestoneCard: {
    backgroundColor: '#0d1c32', // primary-container
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  milestoneLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  milestoneIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(254, 212, 136, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  milestoneLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 2,
    marginBottom: 4,
  },
  milestoneTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#fff',
  },
  milestoneRight: {
    alignItems: 'flex-end',
  },
  milestoneTime: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 28,
    color: '#fed488',
  },
  milestoneSub: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 8,
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1,
  },
});
