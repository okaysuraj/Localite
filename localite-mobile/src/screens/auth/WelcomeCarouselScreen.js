import React, { useRef, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Dimensions, 
  TouchableOpacity, 
  SafeAreaView,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    category: 'INTRODUCTION',
    title: 'Find Your Third Place',
    description: 'Beyond home and work, discover the curated spaces where your soul feels at rest.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYZrpzrBc9hN9QnwfMXgb9e_Qjgj9GgX2jjwUpu1sASEddgIchVjRHkMFycGHJxb23Kbj05sYgyzqEeELAk253p6_VLAckmA7EjVpF9ClwtINuNEbOS-Qb7xOx66u-a4Gg7s-92o0CIalXZG3DRcG2F8JzkYA1gnIcpb4sr4sZEvFX9bGVREaoZ460dLVpBSAq1vDWoISQewIfDZIynaf4cCYqYUlh4h7mIvqupMsKGl37BC0f3TE_tQ'
  },
  {
    id: '2',
    category: 'COMMUNITY',
    title: 'Join Meaningful Gatherings',
    description: 'Quality interactions in aesthetic surroundings, designed for those who value depth.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbFbhFvGY4V_AzbgtdlapW09fdGZuHOhe-oTTwZ39m_l3mfQi6GpeLmGtGUvNFTmkHA6b3EYa66BmbMzavwzGscgW-JkfXR5hoBrqdtTxkBnODRfX2EMNXM8eSCwOgXLCdlxHzyEELfXv5W_ICxwn2Iv3CQyg43rTgY4ZqH2nUdiVleI2gxijst1Gs8CvJCsnjWCNkuNMCW_EuROxvmCJWPLgrK1Kd2g5-R06_BgJAmBICtWZEzXZgjg'
  },
  {
    id: '3',
    category: 'IDENTITY',
    title: 'Meet Local Souls',
    description: 'Connect with discerning neighbors who share your vision for a refined local life.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcKgr0j5iXu0gowj4eJliBQX1qMjQyIKkw-Sbe1NmnbXNfegWw3AnSGYoWpqyzLh6gzP7KQp95k5zNc1vUNhWdoR-xfVcx065haVjQE9m30ghsBEZA2YN_Weo_SaGGB5M0U8KzeMdFMAoYD06OLLArGsCzNunRa9zT-dyI1hDtaTVdiM4w75ZXNPNlNIGZe5T5JYkm3ufq4BTGqCtPRfodGpBG2VTXPEGDUb7e3ZO6iABfyrvHvCJIIg'
  }
];

export default function WelcomeCarouselScreen({ navigation }) {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const x = event.nativeEvent.contentOffset.x;
    const index = Math.round(x / width);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const goToNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      scrollRef.current?.scrollTo({ x: (currentIndex + 1) * width, animated: true });
    }
  };

  const startJourney = () => {
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* App Bar */}
      <View style={styles.appBar}>
        {/* No back button on welcome typically, but keeping structural balance */}
        <View style={{ width: 24 }} />
        <Text style={styles.appBarTitle}>LOCALITE</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Carousel */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {SLIDES.map((slide, index) => (
          <View key={slide.id} style={styles.slide}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: slide.image }} style={styles.image} />
              <View style={styles.imageOverlay} />
            </View>
            
            <View style={styles.textContainer}>
              <Text style={styles.category}>{slide.category}</Text>
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.description}>{slide.description}</Text>
              
              {index === SLIDES.length - 1 && (
                <TouchableOpacity style={styles.getStartedBtn} onPress={startJourney}>
                  <Text style={styles.getStartedBtnText}>GET STARTED</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Pagination & Next Button */}
      <View style={styles.footer}>
        <View style={styles.pagination}>
          {SLIDES.map((_, i) => (
            <View 
              key={i} 
              style={[
                styles.dot, 
                currentIndex === i ? styles.activeDot : styles.inactiveDot
              ]} 
            />
          ))}
        </View>

        {currentIndex < SLIDES.length - 1 && (
          <TouchableOpacity onPress={goToNext}>
            <View style={styles.nextBtnContainer}>
              <Text style={styles.nextBtnText}>NEXT</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fbf9f8',
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  appBarTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 24,
    color: '#000000',
    letterSpacing: -0.5,
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 4/5,
    maxWidth: 400,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 48,
    backgroundColor: '#eae8e7',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.08,
    shadowRadius: 32,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.05)', // Subtle darkening
  },
  textContainer: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
  },
  category: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#775a19',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  title: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 32,
    color: '#000000',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 16,
    color: '#44474d',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  getStartedBtn: {
    width: '100%',
    backgroundColor: '#775a19',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  getStartedBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#ffffff',
    letterSpacing: 2,
  },
  footer: {
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120, // Ensure fixed space for pagination/button
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: '#775a19',
  },
  inactiveDot: {
    width: 8,
    backgroundColor: '#c5c6cd',
  },
  nextBtnContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#775a19',
    paddingBottom: 2,
  },
  nextBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#775a19',
    letterSpacing: 2,
  }
});
