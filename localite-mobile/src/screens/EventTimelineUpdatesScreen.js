import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, TextInput, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function EventTimelineUpdatesScreen() {
  const navigation = useNavigation();
  const [updateText, setUpdateText] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setUpdateText('');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <MaterialIcons name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Royal Assemblage</Text>
        <View style={styles.avatarWrap}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbwD6J0sji-Yo1YJXcMVhppWAFQcskoDDivj7ejOPeVzud4El79o19zbO5pAJphlIZTxhG_l0xEgOBgpar90ImA4QQ-L8tMGsRoxrkwESxUCS6eJEynoPwTfMOnGORGPB5tw0502czjjRgTgbZryBlB_8wQMzrfFLKqMM6vzW_RU07JJFXVax4KkJue17CXNfRRPh2PLpE3At26ZhfzjvFY5KMfqRbhlhEF6lIH852-4w6bqY5HRkT9w' }} 
            style={styles.avatarImg} 
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroImageWrap}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaL8X2rEK6vzlkFFomji-WRSOu0CqAIDn4NL5GoMnA4vZ7tqQ2Fo4m20zxG5pk5aZzJVuOUCaqzcWxt3Zs0iLks7D1FJ-nXjfxsTdJBeDTREGtZEEvj2b1QlChZfRsXu2P3L-adAWKme-WKm_UyN0QZW2ydLC4X20uqNlb5wux4-NCdNBRg5_DUtBPM_vuXA2KUF-iZDYJrEIVx_oFBiLtqlPYkaWuV2s1BbyelYbDHw_zB0FPtNa6Tg' }} 
              style={styles.heroImg} 
            />
            <View style={styles.heroOverlay} />
            <View style={styles.heroTextWrap}>
              <Text style={styles.heroPreTitle}>NOW HAPPENING</Text>
              <Text style={styles.heroTitle}>Vintage Garden Soiree</Text>
            </View>
          </View>
        </View>

        {/* Timeline Section */}
        <View style={styles.timelineSection}>
          <View style={styles.timelineHeader}>
            <Text style={styles.timelineTitle}>Event Milestones</Text>
            <View style={styles.liveBadge}>
              <Text style={styles.liveBadgeText}>LIVE UPDATES</Text>
            </View>
          </View>

          <View style={styles.timelineList}>
            {/* Timeline Line */}
            <View style={styles.timelineLine} />

            {/* Past Item 1 */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineIconWrap}>
                <View style={styles.timelineDotPast} />
              </View>
              <View style={styles.timelineCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.timeText}>6:00 PM</Text>
                  <MaterialIcons name="check-circle" size={16} color="#75777e" />
                </View>
                <Text style={styles.cardTitle}>Welcome Cocktails</Text>
                <Text style={styles.cardDesc}>Arrivals at the West Garden. Artisanal botanical drinks served on vintage glassware.</Text>
              </View>
            </View>

            {/* Past Item 2 */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineIconWrap}>
                <View style={styles.timelineDotPast} />
              </View>
              <View style={styles.timelineCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.timeText}>7:30 PM</Text>
                  <MaterialIcons name="check-circle" size={16} color="#75777e" />
                </View>
                <Text style={styles.cardTitle}>Live Jazz Ensemble</Text>
                <Text style={styles.cardDesc}>The Sterling Quartet begins their performance by the fountain. Smooth jazz selections.</Text>
              </View>
            </View>

            {/* Current Item */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineIconWrap}>
                <View style={styles.timelineDotCurrent}>
                  <View style={styles.timelineDotInner} />
                </View>
              </View>
              <View style={[styles.timelineCard, styles.timelineCardCurrent]}>
                <View style={styles.cardHeader}>
                  <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>NEW</Text>
                  </View>
                  <Text style={styles.timeText}>8:15 PM</Text>
                </View>
                <Text style={styles.cardTitle}>Host Announcement</Text>
                <Text style={styles.cardDesc}>A special toast and introduction to the evening's main proceedings by the Grand Host.</Text>
                
                <View style={styles.cardActions}>
                  <TouchableOpacity style={styles.actionBtnPrimary}>
                    <Text style={styles.actionBtnPrimaryText}>NOTIFY ALL</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtnSecondary}>
                    <Text style={styles.actionBtnSecondaryText}>EDIT DETAILS</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Future Item */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineIconWrap}>
                <View style={styles.timelineDotFuture} />
              </View>
              <View style={styles.timelineCardFuture}>
                <Text style={styles.timeTextFuture}>9:30 PM</Text>
                <Text style={styles.cardTitleFuture}>Dinner is Served</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Host Update Prompt */}
        <View style={styles.updateSection}>
          <View style={styles.updateCard}>
            <View style={styles.updateHeader}>
              <MaterialIcons name="edit-note" size={28} color="#775a19" />
              <Text style={styles.updateTitle}>Post an Update</Text>
            </View>
            
            <TextInput
              style={styles.updateInput}
              placeholder="Share a moment or update the schedule..."
              placeholderTextColor="#75777e"
              multiline
              value={updateText}
              onChangeText={setUpdateText}
            />

            <View style={styles.updateFooter}>
              <View style={styles.updateTools}>
                <TouchableOpacity style={styles.toolBtn}>
                  <MaterialIcons name="image" size={20} color="#44474d" />
                  <Text style={styles.toolBtnText}>PHOTO</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.toolBtn}>
                  <MaterialIcons name="schedule" size={20} color="#44474d" />
                  <Text style={styles.toolBtnText}>SET TIME</Text>
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity 
                style={[styles.publishBtn, isPublishing && styles.publishingBtn]} 
                onPress={handlePublish}
                disabled={isPublishing}
              >
                {isPublishing ? (
                  <MaterialIcons name="sync" size={16} color="#fff" />
                ) : (
                  <Text style={styles.publishBtnText}>PUBLISH UPDATE</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItemActive}>
          <MaterialIcons name="event" size={24} color="#775a19" />
          <Text style={styles.navTextActive}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Map')}>
          <MaterialIcons name="explore" size={24} color="rgba(68, 71, 77, 0.6)" />
          <Text style={styles.navText}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="poll" size={24} color="rgba(68, 71, 77, 0.6)" />
          <Text style={styles.navText}>Polls</Text>
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
    paddingBottom: 100,
  },
  heroSection: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  heroImageWrap: {
    width: '100%',
    aspectRatio: 16/9,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },
  heroImg: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  heroTextWrap: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
  },
  heroPreTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#ffdea5',
    letterSpacing: 2,
    marginBottom: 8,
  },
  heroTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#fff',
  },
  timelineSection: {
    paddingHorizontal: 24,
    marginTop: 48,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  timelineTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
  },
  liveBadge: {
    backgroundColor: '#eae8e7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  liveBadgeText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
    letterSpacing: 1,
  },
  timelineList: {
    position: 'relative',
    paddingLeft: 32,
    gap: 32,
    paddingBottom: 32,
  },
  timelineLine: {
    position: 'absolute',
    left: 11,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: 'rgba(117, 119, 126, 0.2)',
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  timelineIconWrap: {
    position: 'absolute',
    left: -32,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fbf9f8',
  },
  timelineDotPast: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#c5c6cd',
  },
  timelineDotCurrent: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fed488',
    borderWidth: 2,
    borderColor: '#775a19',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineDotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#775a19',
  },
  timelineDotFuture: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(197, 198, 205, 0.5)',
  },
  timelineCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  timelineCardCurrent: {
    borderLeftWidth: 4,
    borderLeftColor: '#775a19',
    shadowOpacity: 0.1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
  },
  newBadge: {
    backgroundColor: '#000',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  newBadgeText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 8,
    color: '#e9c176',
    letterSpacing: 1,
  },
  cardTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
  },
  cardDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
    lineHeight: 20,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  actionBtnPrimary: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionBtnPrimaryText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#fff',
    letterSpacing: 1,
  },
  actionBtnSecondary: {
    borderWidth: 1,
    borderColor: '#c5c6cd',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionBtnSecondaryText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
    letterSpacing: 1,
  },
  timelineCardFuture: {
    flex: 1,
    backgroundColor: '#f5f3f3',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#c5c6cd',
    borderStyle: 'dashed',
    opacity: 0.6,
  },
  timeTextFuture: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
    marginBottom: 4,
  },
  cardTitleFuture: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    color: '#75777e',
  },
  updateSection: {
    paddingHorizontal: 24,
    marginTop: 32,
  },
  updateCard: {
    backgroundColor: '#eae8e7',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(197, 198, 205, 0.3)',
  },
  updateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  updateTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000',
  },
  updateInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#000',
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  updateFooter: {
    flexDirection: 'column',
    gap: 16,
  },
  updateTools: {
    flexDirection: 'row',
    gap: 12,
  },
  toolBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f5f3f3',
  },
  toolBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
    letterSpacing: 1,
  },
  publishBtn: {
    backgroundColor: '#000',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  publishingBtn: {
    backgroundColor: '#775a19',
  },
  publishBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#fff',
    letterSpacing: 1,
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
