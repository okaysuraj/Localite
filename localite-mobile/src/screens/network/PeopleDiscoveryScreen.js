import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getUsers } from '../../services/api';

const FILTERS = ['Nearby (2km)', 'Tennis', 'Architecture', 'Jazz', 'Culinary Arts'];

const PEOPLE = [
  {
    id: '1',
    name: 'Julian Vance',
    distance: '0.8km Away',
    role: 'Principal Architect',
    description: 'Exploring the intersection of brutalism and organic living.',
    tags: ['Architecture', 'Photography'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPF9FjuUN6TpNKekR3VD6siD-fdeYXOAkWqkB91YxSDYbi_wFvBwO6wPRvKbDzyfgbvbhAy91RujqArfXH6JVL4uCQe_DTiyp1uCX7K4Ta1LyRMQyL6rrAr4kszD8L_LInCszU3TlnRYP7Ty1-JdRNP2t7W67Wh6Rf5MdWQRrqh9lCKUGTjGkCJ-hDhQ9EXG90_P-XrMEjrFDk4eFLndqRy2P0By1SFnwHnFsiY0ZNZ5fl6He4qDSHLA'
  },
  {
    id: '2',
    name: 'Elena Rossi',
    distance: '1.2km Away',
    role: 'Sommelier',
    description: 'Advocating for sustainable vineyards and rare vintage stories.',
    tags: ['Wine', 'Tennis'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFiyyXIiFU311G-R5hWK95C9zrN_2hXxMX-x2DDiSNzFy9HpoE8OOIbhp64xq7UP1WNS1o6TwtkLKWgWWuoRTIH7QvNQhb4At6hSt0OSoFWTTIx26N7GTbtTq_2NnzGrfx5qLz8PobhWNtIUdOlQ2ztlsn_2D9NW5_Oq2pPhcm5pETmSBgerMsGXi8JoSnYczY1dyTNjhLGXMRR_fpOwGnLg5Y8oxhipS28uG_lbe-rW_XtpMcIgxqvg'
  },
  {
    id: '3',
    name: 'Marcus Thorne',
    distance: '2.4km Away',
    role: 'Creative Director',
    description: 'Curating vinyl collections and mid-century modern spaces.',
    tags: ['Jazz', 'Design'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVeu8rnmEDGcsI1MnvBqP7X-HMukWu8kW5pt0SwcoyG1ejR4-Ck_8tAz0X_qJ-aomH7cdHBMP1GfOPfwVWDntfIEYuQY3t4N6abHfjDlJSGhf3_Zj35pvdZHLaL1PiKuBekFA9mmMJY9tVVXE5pzL-7Tw3U-lYpJQNMqSPWs40RJxnKuBDM4IN8hFqbOLYduUNHBMXMclpZ0bQnvdCnqAZfMV7SwoPwx_U9xZm_xylVorC-HTReNc1iw'
  },
  {
    id: '4',
    name: 'Sasha Moretti',
    distance: '0.3km Away',
    role: 'Visual Artist',
    description: 'Capturing the soul of urban landscapes through oil and light.',
    tags: ['Fine Art', 'Coffee'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcz_Chwwb_QfSxseeW-NOWdpsWNiUpNfKdhdjunJzgEnzojbGSUfuew1aOOnKEJEDz7vAncAotTnOriQU9rDKYZwm58SWmRwQE9cCgZM2zrahXSUvLg_RHe5HoGP6hhfC_75OUb9wvYjDXC0m1Q1Qh4VaV9iQDyoCTxKT5r22JTsojymwTW5HI_NV4XTNPlYZVTkcauJoGNNI1kK_k9u6Wc2JTvMGTymjyakw0LxcBZRAAKhQ7Z3MPGw'
  }
];

export default function PeopleDiscoveryScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'swipe'
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top App Bar */}
      <View style={styles.appBar}>
        <View style={styles.appBarLeft}>
          <Ionicons name="location" size={24} color="#000000" />
          <Text style={styles.appBarTitle}>Localite</Text>
        </View>
        <View style={styles.appBarRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="search" size={24} color="#44474d" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileBtn}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAqI6ZpdvXDp5znehI-H4xiRoDJLBxjfth1BgVcfdOYnDdkNinrC-4hmTW51Y8qjEvOf0QNvrgs1TZgFKBVuj-GrWFWqbfWfeOq6dSjLPttkJpvFvWBk475GDn00feBsn5GV8K_nMbImzz1OBTJ_Bnff41UsCQPJ0nXNqpZa6DXIO6ik9IRnKV76maMgXBGWwzSKGuQNfQLhDhd8O3eUArH-LtExA06YluPW8Gmm0eWZvc34Us2Fy7RQ' }} 
              style={styles.profileImg} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header & View Toggles */}
        <View style={styles.headerSection}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Discover Localites</Text>
            <Text style={styles.headerSubtitle}>Meet the minds and makers shaping your neighborhood's culture.</Text>
          </View>
          
          <View style={styles.toggleContainer}>
            <TouchableOpacity 
              style={[styles.toggleBtn, viewMode === 'grid' && styles.toggleBtnActive]}
              onPress={() => setViewMode('grid')}
            >
              <Text style={[styles.toggleText, viewMode === 'grid' && styles.toggleTextActive]}>Grid</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.toggleBtn, viewMode === 'swipe' && styles.toggleBtnActive]}
              onPress={() => setViewMode('swipe')}
            >
              <Text style={[styles.toggleText, viewMode === 'swipe' && styles.toggleTextActive]}>Swipe</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
          <TouchableOpacity style={styles.filterOptionsBtn}>
            <Ionicons name="options" size={16} color="#000000" />
            <Text style={styles.filterOptionsText}>Filters</Text>
          </TouchableOpacity>
          
          <View style={styles.filterDivider} />
          
          {FILTERS.map((filter, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.filterChip, index === 0 && styles.filterChipPrimary]}
            >
              <Text style={[styles.filterChipText, index === 0 && styles.filterChipTextPrimary]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {loading ? (
          <ActivityIndicator size="large" color="#775a19" style={{ marginTop: 32 }} />
        ) : viewMode === 'grid' ? (
          <View style={styles.gridContainer}>
            {users.map((person) => (
              <View key={person.id} style={styles.personCard}>
                <ImageBackground source={{ uri: person.image || person.profilePhotoUrl }} style={styles.personImageContainer}>
                  <View style={styles.personImageOverlay}>
                    <Text style={styles.personDistance}>{person.distance || person.neighborhood}</Text>
                    <Text style={styles.personName}>{person.name || person.username}</Text>
                  </View>
                </ImageBackground>
                <View style={styles.personDetails}>
                  <Text style={styles.personRole}>{person.role || person.bio}</Text>
                  <Text style={styles.personDesc} numberOfLines={2}>{person.description}</Text>
                  <View style={styles.tagsContainer}>
                    {((person.interests && Array.isArray(person.interests) ? person.interests : (person.interests ? person.interests.split(',') : []))).slice(0, 3).map((tag, idx) => (
                      <View key={idx} style={styles.tagBadge}>
                        <Text style={styles.tagText}>{tag.trim()}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            ))}

            {/* Expand Circle Bento */}
            <View style={styles.expandCard}>
              <Ionicons name="person-add" size={48} color="rgba(255,255,255,0.2)" style={styles.expandIconBg} />
              <Text style={styles.expandTitle}>Expand Your Circle</Text>
              <Text style={styles.expandDesc}>
                Invite local curators to join the collective and discover even more unique perspectives.
              </Text>
              <TouchableOpacity style={styles.inviteBtn}>
                <Text style={styles.inviteBtnText}>INVITE FRIENDS</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.swipeContainer}>
            {users.length > 0 && (
              <View style={styles.swipeCard}>
                <ImageBackground 
                  source={{ uri: users[0].image || users[0].profilePhotoUrl }}
                  style={styles.swipeImage}
                >
                  <View style={styles.swipeOverlay}>
                    <Text style={styles.swipeName}>{users[0].name || users[0].username}</Text>
                    <Text style={styles.swipeInfo}>{users[0].role || users[0].bio} • {users[0].distance || users[0].neighborhood}</Text>
                  </View>
                </ImageBackground>
                <View style={styles.swipeActions}>
                  <TouchableOpacity style={[styles.actionBtn, styles.actionBtnSkip]}>
                    <Ionicons name="close" size={28} color="#ba1a1a" />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionBtn, styles.actionBtnMessage]}>
                    <Ionicons name="chatbubble" size={24} color="#ffffff" />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionBtn, styles.actionBtnLike]}>
                    <Ionicons name="heart" size={28} color="#775a19" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}

        {/* Padding for Bottom Tabs */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbf9f8',
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#fbf9f8',
    zIndex: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#0a192f',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  appBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appBarTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 28,
    color: '#000000',
    marginLeft: 8,
    letterSpacing: -0.5,
  },
  appBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    marginRight: 16,
  },
  profileBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#c5c6cd',
    overflow: 'hidden',
  },
  profileImg: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  headerSection: {
    paddingHorizontal: 24,
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
  },
  headerTextContainer: {
    flex: 1,
    minWidth: 200,
    marginBottom: 16,
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 32,
    color: '#000000',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 16,
    color: '#44474d',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f3f3',
    borderRadius: 24,
    padding: 4,
    marginBottom: 16,
  },
  toggleBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  toggleBtnActive: {
    backgroundColor: '#000000',
  },
  toggleText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#44474d',
    letterSpacing: 1,
  },
  toggleTextActive: {
    color: '#ffffff',
  },
  filtersScroll: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  filterOptionsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#c5c6cd',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  filterOptionsText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#000000',
    marginLeft: 6,
    letterSpacing: 0.5,
  },
  filterDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#c5c6cd',
    marginHorizontal: 8,
    alignSelf: 'center',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#c5c6cd',
    marginRight: 8,
  },
  filterChipPrimary: {
    backgroundColor: 'rgba(254, 212, 136, 0.2)',
    borderColor: 'rgba(119, 90, 25, 0.3)',
  },
  filterChipText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#1b1c1c',
  },
  filterChipTextPrimary: {
    color: '#775a19',
  },
  gridContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  personCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
  personImageContainer: {
    width: '100%',
    aspectRatio: 4/5,
  },
  personImageOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
    padding: 12,
  },
  personDistance: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 9,
    color: '#ffffff',
    letterSpacing: 1,
    textTransform: 'uppercase',
    opacity: 0.9,
    marginBottom: 4,
  },
  personName: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 20,
    color: '#ffffff',
  },
  personDetails: {
    padding: 12,
  },
  personRole: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  personDesc: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 12,
    color: '#44474d',
    marginBottom: 12,
    lineHeight: 18,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tagBadge: {
    backgroundColor: '#f5f3f3',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 9,
    color: '#44474d',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  expandCard: {
    width: '100%',
    backgroundColor: '#000000',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 5,
    overflow: 'hidden',
  },
  expandIconBg: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  expandTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
  },
  expandDesc: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#e4e2e2',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  inviteBtn: {
    backgroundColor: '#775a19',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  inviteBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#ffffff',
    letterSpacing: 1,
  },
  swipeContainer: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  swipeCard: {
    width: '100%',
    maxWidth: 400,
    aspectRatio: 3/4,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.1,
    shadowRadius: 32,
    elevation: 10,
  },
  swipeImage: {
    flex: 1,
    width: '100%',
  },
  swipeOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
    padding: 24,
  },
  swipeName: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 32,
    color: '#ffffff',
    marginBottom: 8,
  },
  swipeInfo: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#e9c176',
    letterSpacing: 1,
  },
  swipeActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#ffffff',
  },
  actionBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnSkip: {
    borderWidth: 1,
    borderColor: '#ba1a1a',
  },
  actionBtnMessage: {
    backgroundColor: '#000000',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  actionBtnLike: {
    borderWidth: 1,
    borderColor: '#775a19',
  }
});
