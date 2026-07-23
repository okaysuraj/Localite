import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function EmptyGatheringsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.menuBtn}>
            <MaterialIcons name="menu" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Localite</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.profileBtn}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWswPK1gHD0FrxVCku0jfQRavuwz2-bCQHo66ICvoDA3sF9L-oP_LpMo4DEquCYkMfRrRsmJDpY3LxP2ql7ZnvjpoeUJ809jSYosVqS85xH9WpIJKTFjU8Rwnj4xdTT70DeHr2auKJkHFCVntOWBaiBi-3oX-VvhuvnYR31mDdI8Uun1dCzXS7fI--JoMKRWaeFCQlcF43Thp9VW6US-acIGmsk0jfpP3puU73vpG4COx2xCycvuCfww' }} 
              style={styles.profileImg} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        
        {/* Illustration Area */}
        <View style={styles.illustrationWrap}>
          {/* Decorative Gold Accent */}
          <View style={styles.goldAccent} />
          
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ1xv4OYTFfEyy_OmHz_qsJgj5Uuzqg8ITfIqYuXWVX4g4L-Ab0JeZhFjSHGnf9Eu1PR2tHFyIT_V1vxBUtAL2aEzRc0ZL-ODplyYBgY_BD4tOVt9jx7_xgPO53OlHa1JkS4h7J1wL4d-7JLDARrzfVoU9UUVKTHxE8OfzW3J6l_L7LYTFu43fyw3wCP5250aJqZVgKH0U8Z5kY3NiRT33kN7SfqecCL07whMfo3tPMCx2JfgnFaM-tQ' }}
              style={styles.illustrationImg}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Text Content */}
        <View style={styles.textSection}>
          <Text style={styles.title}>The Calendar is Currently Unveiled</Text>
          <Text style={styles.desc}>
            A moment of quiet before the next grand affair. Be the architect of connection in your community or explore our curated hubs of influence.
          </Text>
        </View>

        {/* Call to Actions */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>ORGANIZE A GATHERING</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryBtn}>
            <Text style={styles.secondaryBtnText}>EXPLORE HUBS</Text>
          </TouchableOpacity>
        </View>

        {/* Secondary Prompt */}
        <View style={styles.promptSection}>
          <MaterialIcons name="auto-awesome" size={16} color="#75777e" />
          <Text style={styles.promptText}>CURATED EXCELLENCE ALWAYS FOLLOWS</Text>
        </View>

      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Dashboard')}>
          <MaterialIcons name="explore" size={24} color="#44474d" />
          <Text style={styles.navLabel}>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemActive}>
          <MaterialIcons name="auto-awesome" size={24} color="#775a19" />
          <Text style={styles.navLabelActive}>Gatherings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="room-service" size={24} color="#44474d" />
          <Text style={styles.navLabel}>Concierge</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="person" size={24} color="#44474d" />
          <Text style={styles.navLabel}>Profile</Text>
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
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 40 : 16,
    paddingBottom: 16,
    backgroundColor: '#fbf9f8',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(197, 198, 205, 0.3)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuBtn: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 28,
    color: '#000',
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#c5c6cd',
    overflow: 'hidden',
  },
  profileImg: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 80, // Space for bottom nav
  },
  illustrationWrap: {
    width: '100%',
    aspectRatio: 4/3,
    maxWidth: 320,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  goldAccent: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(254, 212, 136, 0.1)',
    borderRadius: 200,
    transform: [{ scale: 0.75 }],
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e4e2e2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
  },
  illustrationImg: {
    width: '80%',
    height: '80%',
    opacity: 0.9,
  },
  textSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 28,
    color: '#000',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  desc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    textAlign: 'center',
    lineHeight: 24,
  },
  actionSection: {
    width: '100%',
    gap: 16,
    marginBottom: 32,
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 32,
    alignItems: 'center',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  primaryBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#fff',
    letterSpacing: 2,
  },
  secondaryBtn: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#775a19',
  },
  secondaryBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#775a19',
    letterSpacing: 2,
  },
  promptSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  promptText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 2,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e4e2e2',
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 8,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navItemActive: {
    alignItems: 'center',
    gap: 4,
  },
  navLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
  },
  navLabelActive: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
  }
});
