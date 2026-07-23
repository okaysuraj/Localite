import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Dimensions, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

export default function MediaViewerScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Background with blur (simulated) */}
      <Image 
        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_5Mnpll2b0BB_cu6RqDkjTRsjDce8befJTWIVSDjUh_HhSbadRsfHII3mX4CxxeIlGB1CGYrZFulcU8TfuJfz2CrZxvJ1MM72s-_okzNoiBHh697AmKAcfXO9J_sL5NKsO9SkEZcoIMNCASlS2F3QHpxqTEuxaXcHK-3Cg1G5V_qF1hTy7CYRnOWJIZPdc3RyWunG2dMJ5r7DjZmO9tjKune8vuzg6ZiMQL4e0h4RMgERiWL3wwJqgg' }}
        style={styles.bgImage}
        blurRadius={10}
      />
      <View style={styles.bgOverlay} />

      {/* Main Image */}
      <View style={styles.mainImageContainer}>
        <View style={styles.glow} />
        <Image 
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAo5ODwGRGowQL_6nLpoFwlF_c7nVRqS24fZetry3jxyTnRn76Wr__G7KJcoQFzfJd0KC--gmyLtjqKtL-9MemrD3MG-ZxQqwOIVm0xAgygExroQSAB81aNt-Z3IFjvKCd2o7aJAxg0MoxjsJEq4DtYovBjQ2d6pFFPDhth-OX3RFz06dQRpGbX22u3UJ1mq157-iQnbDe8e59R6jQj2ujExsNLOjNFx7sKmMjd9ZH4fTxTOuSgc4xSFg' }}
          style={styles.mainImage}
          resizeMode="contain"
        />
      </View>

      {/* Top Controls */}
      <SafeAreaView style={styles.topControls}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios" size={24} color="#fff" />
            <Text style={styles.backText}>Close Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="share" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Bottom Content */}
      <View style={styles.bottomSection}>
        <View style={styles.captionContainer}>
          <Text style={styles.title}>Moments from the Soiree</Text>
          <Text style={styles.subtitle}>ESTATE GARDENS • LATE SUMMER SERIES</Text>
        </View>

        <View style={styles.curatorContainer}>
          <View style={styles.curatorInfo}>
            <Text style={styles.curatorLabel}>CURATED BY</Text>
            <Text style={styles.curatorName}>Julian Thorne</Text>
          </View>
          <View style={styles.curatorAvatar}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgHGf3SwuW-UYT0p6p6z98MhVQcMQQ11Haix5KC0C-xIXY3KHVE4tsTmW_BRg_IuwByC4dJyl7JTZfitwijTbTTBHI_KLUn9nFt-McjtRoB_R63moj3OYtWyf5CdZPtAgO0gTG6l5hfSYkAkvky9JNFKXeJ_K0-qe_5hFpuvITerr9esoMswkshSdAXIJxHl_e3xvFugkc9znIUrlBaiTvA-sm5KmUeB3v9Ygtno-Qo3FRZcBZLgJyDQ' }}
              style={styles.avatarImg}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050a12',
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.3,
  },
  bgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 10, 18, 0.7)',
  },
  mainImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glow: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    backgroundColor: 'rgba(119, 90, 25, 0.2)',
    borderRadius: width * 0.4,
  },
  mainImage: {
    width: '100%',
    height: '80%',
  },
  topControls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: Platform.OS === 'android' ? 40 : 16,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#fff',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  iconBtn: {
    padding: 8,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 48 : 24,
    backgroundColor: 'rgba(5, 10, 18, 0.8)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  captionContainer: {
    flex: 1,
    paddingRight: 16,
  },
  title: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#76849f',
    letterSpacing: 2,
  },
  curatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255, 255, 255, 0.1)',
    paddingLeft: 16,
  },
  curatorInfo: {
    alignItems: 'flex-end',
  },
  curatorLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 8,
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: 2,
    marginBottom: 4,
  },
  curatorName: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#e9c176',
  },
  curatorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  }
});
