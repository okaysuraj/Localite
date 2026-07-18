import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ImageBackground, TextInput, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function SportsCategoriesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar}>
            <Image source={{ uri: 'https://via.placeholder.com/100x100' }} style={styles.avatarImage} />
          </View>
        </View>
        <Text style={styles.headerTitle}>Royal Sports</Text>
        <TouchableOpacity style={styles.headerRight}>
          <MaterialIcons name="notifications" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        
        {/* Search & Filter */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <MaterialIcons name="search" size={20} color="#75777e" style={styles.searchIcon} />
            <TextInput 
              placeholder="Search disciplines..." 
              placeholderTextColor="#75777e"
              style={styles.searchInput}
            />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterList}>
            <TouchableOpacity style={[styles.filterChip, styles.filterChipActive]}>
              <Text style={[styles.filterText, styles.filterTextActive]}>ALL ACCESS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <Text style={styles.filterText}>ELITE MATCHES</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <Text style={styles.filterText}>BEGINNER FRIENDLY</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <Text style={styles.filterText}>SOCIAL CLUBS</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Hero Editorial */}
        <View style={styles.heroSection}>
          <Text style={styles.heroSubtitle}>CURATED SELECTIONS</Text>
          <Text style={styles.heroTitle}>Refined Athletic Pursuits</Text>
          <Text style={styles.heroDesc}>Discover a world where sporting excellence meets aesthetic grace. Our curated categories offer more than competition; they offer a lifestyle.</Text>
        </View>

        {/* Categories Grid */}
        <View style={styles.categoriesSection}>
          
          {/* Tennis */}
          <TouchableOpacity 
            style={styles.largeCard}
            onPress={() => {}}
          >
            <ImageBackground 
              source={{ uri: 'https://via.placeholder.com/600x800' }} 
              style={styles.cardBg}
              imageStyle={{ borderRadius: 12 }}
            >
              <View style={styles.cardOverlay}>
                <View>
                  <Text style={styles.cardCategory}>01 DISCIPLINES</Text>
                  <Text style={styles.cardTitleLg}>Tennis</Text>
                </View>
                <View style={styles.iconBtn}>
                  <MaterialIcons name="arrow-outward" size={24} color="#ffffff" />
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>

          <View style={styles.gridRow}>
            {/* Polo */}
            <TouchableOpacity style={styles.smallCard}>
              <ImageBackground 
                source={{ uri: 'https://via.placeholder.com/400x400' }} 
                style={styles.cardBg}
                imageStyle={{ borderRadius: 12 }}
              >
                <View style={styles.cardOverlay}>
                  <Text style={styles.cardCategory}>02 DISCIPLINES</Text>
                  <Text style={styles.cardTitleSm}>Polo</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>

            {/* Golf */}
            <TouchableOpacity style={styles.smallCard}>
              <ImageBackground 
                source={{ uri: 'https://via.placeholder.com/400x400' }} 
                style={styles.cardBg}
                imageStyle={{ borderRadius: 12 }}
              >
                <View style={styles.cardOverlay}>
                  <Text style={styles.cardCategory}>03 DISCIPLINES</Text>
                  <Text style={styles.cardTitleSm}>Golf</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          {/* Cricket */}
          <TouchableOpacity 
            style={styles.mediumCard}
            onPress={() => navigation.navigate('CricketDetail')}
          >
            <ImageBackground 
              source={{ uri: 'https://via.placeholder.com/600x400' }} 
              style={styles.cardBg}
              imageStyle={{ borderRadius: 12 }}
            >
              <View style={styles.cardOverlay}>
                <Text style={styles.cardCategory}>04 DISCIPLINES</Text>
                <Text style={styles.cardTitleSm}>Cricket</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>

        </View>

        {/* Quote Section */}
        <View style={styles.quoteSection}>
          <MaterialIcons name="format-quote" size={48} color="#775a19" style={{marginBottom: 16}} />
          <Text style={styles.quoteText}>"Sport is the poetry of the body, a refined conversation between discipline and grace."</Text>
          <Text style={styles.quoteAuthor}>— THE ROYAL ARCHIVE</Text>
        </View>

      </ScrollView>

      {/* Bottom Nav Simulation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="stadium" size={24} color="#75777e" />
          <Text style={styles.navText}>ARENA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="explore" size={24} color="#775a19" />
          <Text style={[styles.navText, {color: '#775a19'}]}>DISCOVER</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 12,
    backgroundColor: '#fbf9f8',
  },
  headerLeft: {
    flex: 1,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#c5c6cd',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000000',
    flex: 2,
    textAlign: 'center',
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  searchSection: {
    paddingHorizontal: 24,
    marginTop: 16,
    gap: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f3f3',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#000000',
  },
  filterList: {
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#775a19',
    borderRadius: 20,
  },
  filterChipActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  filterText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  heroSection: {
    paddingHorizontal: 24,
    marginTop: 32,
  },
  heroSubtitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
    marginBottom: 8,
  },
  heroTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000000',
    marginBottom: 12,
  },
  heroDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
    lineHeight: 22,
  },
  categoriesSection: {
    paddingHorizontal: 24,
    marginTop: 24,
    gap: 16,
  },
  largeCard: {
    width: '100%',
    aspectRatio: 0.8,
  },
  cardBg: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 12,
    padding: 24,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  cardCategory: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#ffdea5',
    letterSpacing: 1,
    marginBottom: 8,
  },
  cardTitleLg: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 36,
    color: '#ffffff',
  },
  cardTitleSm: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#ffffff',
  },
  iconBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 12,
    borderRadius: 24,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 16,
  },
  smallCard: {
    flex: 1,
    aspectRatio: 1,
  },
  mediumCard: {
    width: '100%',
    aspectRatio: 1.5,
  },
  quoteSection: {
    paddingHorizontal: 24,
    marginTop: 48,
    marginBottom: 24,
    paddingVertical: 48,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#efeded',
    alignItems: 'center',
  },
  quoteText: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000000',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 28,
    marginBottom: 16,
  },
  quoteAuthor: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
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
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
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
