import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function EmptyState({
  title = "The Calendar is Currently Unveiled",
  description = "A moment of quiet before the next grand affair. Be the architect of connection in your community or explore our curated hubs of influence.",
  primaryButtonText = "Organize a Gathering",
  onPrimaryPress,
  secondaryButtonText = "Explore Hubs",
  onSecondaryPress,
  imageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuAJ1xv4OYTFfEyy_OmHz_qsJgj5Uuzqg8ITfIqYuXWVX4g4L-Ab0JeZhFjSHGnf9Eu1PR2tHFyIT_V1vxBUtAL2aEzRc0ZL-ODplyYBgY_BD4tOVt9jx7_xgPO53OlHa1JkS4h7J1wL4d-7JLDARrzfVoU9UUVKTHxE8OfzW3J6l_L7LYTFu43fyw3wCP5250aJqZVgKH0U8Z5kY3NiRT33kN7SfqecCL07whMfo3tPMCx2JfgnFaM-tQ"
}) {
  return (
    <View style={styles.container}>
      {/* Illustration Area */}
      <View style={styles.illustrationContainer}>
        {/* Decorative background blur equivalent (simplified for RN) */}
        <View style={styles.glowEffect} />
        
        <View style={styles.imageCard}>
          <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
        </View>
      </View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      {/* Call to Actions */}
      <View style={styles.actionContainer}>
        {primaryButtonText && (
          <TouchableOpacity style={styles.primaryBtn} onPress={onPrimaryPress} activeOpacity={0.8}>
            <Text style={styles.primaryBtnText}>{primaryButtonText}</Text>
          </TouchableOpacity>
        )}
        
        {secondaryButtonText && (
          <TouchableOpacity style={styles.secondaryBtn} onPress={onSecondaryPress} activeOpacity={0.6}>
            <Text style={styles.secondaryBtnText}>{secondaryButtonText}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Secondary Prompt */}
      <View style={styles.promptContainer}>
        <Ionicons name="sparkles" size={16} color="#75777e" />
        <Text style={styles.promptText}>Curated Excellence Always Follows</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
    backgroundColor: '#fbf9f8',
  },
  illustrationContainer: {
    width: '100%',
    maxWidth: 400,
    aspectRatio: 4/3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  glowEffect: {
    position: 'absolute',
    width: '80%',
    height: '80%',
    backgroundColor: 'rgba(254, 212, 136, 0.2)',
    borderRadius: 200,
    transform: [{ scale: 0.8 }],
  },
  imageCard: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e4e2e2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.08,
    shadowRadius: 32,
    elevation: 5,
  },
  image: {
    width: '80%',
    height: '80%',
    opacity: 0.9,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 32,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 40,
  },
  description: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 16,
    color: '#44474d',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
  },
  actionContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 32,
  },
  primaryBtn: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 4,
  },
  primaryBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#ffffff',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  secondaryBtn: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#775a19',
    alignItems: 'center',
  },
  secondaryBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#775a19',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  promptContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promptText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginLeft: 8,
  }
});
