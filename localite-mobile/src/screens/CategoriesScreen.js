import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FILTERS = ['All Access', 'Elite Matches', 'Beginner Friendly', 'Social Clubs'];

const CATEGORIES = [
  {
    id: '1',
    title: 'Tennis',
    subtitle: '01 Disciplines',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEQzkEpIkmLXeb7tM65NSmIyQKZ6DND6egTUw7qJd6o5aETZbGPdYRPKa_kMI_kzizZM1q76X0CtUlQOPbqG1zKuLavvXDRU1v2cW8Ws9tbwz7MIfJXj5ED2dDzh75cVj5kNP74TM1gmiv-Rhufy-Bwz30QxUxY6hjBOZ5utyxoXp5vKgyieukPE4wENTII0wVUnVNpbQOFdjz18WtfrJREHdsZ60CyTj5OKBHPqolOA1C3jBVfUBaZw',
    size: 'large'
  },
  {
    id: '2',
    title: 'Polo',
    subtitle: '02 Disciplines',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1Xlc6iU_7eZ1xXJrnxwRb49jMIOQgVlLf1wdzYHOBGavYGBsDw9jpkd2uh3eGGOxLI8QtV9S473vCS_LT3sne2QqwQS3RQavXij9aHXKUHjXuW0D71gXhKXi5rMYNUWaKUPM9A7j3bDIOLVejIZObLJtjJx67za5OJNHhXqNBsZLFfH8qUzPPMu8mXRaiA6q9oCfHgvnndd1px4tXf4h8t0iwW3gXQVC73f6dQUManCwJwsyqjC2hSw',
    size: 'small'
  },
  {
    id: '3',
    title: 'Golf',
    subtitle: '03 Disciplines',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6IdVUIYy-sE31EII-bLm6KgIqyBakE0iMT3ZN3Jg1pFwVA2e_0Iv--PmRBsXXdhDyIYqsc0occY-4sI6JkqTowzlUJWnYzv7gFFFnuDoKY2JzgjIK7TK5NTybpk1t9_fjK8erTzeRYZly6h3d5txZmuwN-LDOexIYmsos_BFY41tO5C4SbegeDhBkOkZ9UsTNwgB5i1cTzguxFFrTuFMq31QEs1iXg2IxlQhbzSsoyVpcgbmTXgk-qw',
    size: 'small'
  },
  {
    id: '4',
    title: 'Cricket',
    subtitle: '04 Disciplines',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjKvsoDleJa8cWdqS1XDGa4PxkkqDuQCej4XsPpcej0aG0jSourlI0VaxU38VQnh0mPZENzrvdrInDfa8eUykitqFWldYca6wQCSlg5PNxCd7hl-oaaUViex-1BzZkrH2MNAwUs1r6Q0EyToMP5nHo96q_rTUJOjDyiUkhYOkTV8YUo34bJHQt-8bixFpgAA0utgjALlyw0B1_yExWkuEAaI4aEEvHadSUzNc44EcUcQfPDgMXEmS28w',
    size: 'wide'
  }
];

export default function CategoriesScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState('All Access');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top App Bar */}
      <View style={styles.appBar}>
        <View style={styles.appBarLeft}>
          <View style={styles.profileBtn}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvVkF4bGnKfJ8bBgW0FAk74Bbxl3nFxS46sKl7UpvJWWwb6yOH6c1xYzBGpk7frjNEapvwRJRAjHsHFEKpkwKdbpdvVrgUCOGL7TKq74_ByEBaXBJrwdy9YixUqVPKWL-HVSJSWljVxGQeir0c_PUIGBlbd40p4BTaBJ44pesu8hXKlhMdY_12idinOYrrY2QX7uX89eyylKrru3Rb7aD_U5H3dLn4HKXrekdK-omdx917n7HcSqRShw' }} 
              style={styles.profileImg} 
            />
          </View>
        </View>
        <Text style={styles.appBarTitle}>Royal Sports</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="notifications-outline" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Search & Filter Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color="#75777e" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search disciplines..."
              placeholderTextColor="#75777e"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
            {FILTERS.map((filter) => (
              <TouchableOpacity 
                key={filter} 
                style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text style={[styles.filterChipText, activeFilter === filter && styles.filterChipTextActive]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Hero Editorial Content */}
        <View style={styles.heroSection}>
          <Text style={styles.heroLabel}>Curated Selections</Text>
          <Text style={styles.heroTitle}>Refined Athletic Pursuits</Text>
          <Text style={styles.heroSubtitle}>
            Discover a world where sporting excellence meets aesthetic grace. Our curated categories offer more than competition; they offer a lifestyle.
          </Text>
        </View>

        {/* Sports Categories Grid */}
        <View style={styles.gridSection}>
          {CATEGORIES.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={[
                styles.categoryCard, 
                item.size === 'large' ? styles.cardLarge : 
                item.size === 'wide' ? styles.cardWide : styles.cardSmall
              ]}
              activeOpacity={0.9}
            >
              <ImageBackground source={{ uri: item.image }} style={styles.cardImage}>
                <View style={styles.cardOverlay}>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                  </View>
                  {item.size === 'large' && (
                    <View style={styles.arrowIconBtn}>
                      <Ionicons name="arrow-forward" size={20} color="#ffffff" />
                    </View>
                  )}
                </View>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </View>

        {/* Lifestyle Quote */}
        <View style={styles.quoteSection}>
          <View style={styles.quoteContainer}>
            <Ionicons name="chatbubble-outline" size={32} color="#775a19" style={styles.quoteIcon} />
            <Text style={styles.quoteText}>
              "Sport is the poetry of the body, a refined conversation between discipline and grace."
            </Text>
            <Text style={styles.quoteAuthor}>— The Royal Archive</Text>
          </View>
        </View>

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
    paddingVertical: 12,
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
    fontSize: 24,
    color: '#000000',
    letterSpacing: -0.5,
  },
  iconBtn: {
    padding: 4,
  },
  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eae8e7',
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
  searchSection: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f3f3',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 16,
    color: '#1b1c1c',
  },
  filtersScroll: {
    marginTop: 16,
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#775a19',
    marginRight: 12,
  },
  filterChipActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  filterChipText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#775a19',
  },
  filterChipTextActive: {
    color: '#ffffff',
  },
  heroSection: {
    paddingHorizontal: 24,
    marginTop: 48,
  },
  heroLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#775a19',
    marginBottom: 8,
  },
  heroTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 32,
    color: '#000000',
    lineHeight: 40,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 16,
    color: '#44474d',
    lineHeight: 24,
  },
  gridSection: {
    paddingHorizontal: 24,
    marginTop: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.06,
    shadowRadius: 32,
    elevation: 4,
  },
  cardLarge: {
    width: '100%',
    height: 350,
  },
  cardSmall: {
    width: '48%',
    height: 180,
  },
  cardWide: {
    width: '100%',
    height: 180,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
    padding: 24,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  cardContent: {
    flex: 1,
  },
  cardSubtitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#ffdea5',
    marginBottom: 8,
  },
  cardTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 32,
    color: '#ffffff',
  },
  arrowIconBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quoteSection: {
    paddingHorizontal: 24,
    marginTop: 48,
    alignItems: 'center',
  },
  quoteContainer: {
    paddingVertical: 48,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#c5c6cd',
    alignItems: 'center',
    width: '100%',
  },
  quoteIcon: {
    marginBottom: 24,
  },
  quoteText: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 24,
    color: '#000000',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 32,
    marginBottom: 16,
  },
  quoteAuthor: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#75777e',
  }
});
