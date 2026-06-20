import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EventCard = ({ title, category, date, location, attendees, maxAttendees, imageUrl }) => {
  return (
    <View style={styles.card}>
      <ImageBackground source={{ uri: imageUrl }} style={styles.imageHeader} imageStyle={styles.imageStyle}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{category}</Text>
        </View>
      </ImageBackground>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Ionicons name="calendar" size={16} color="#ec4899" style={styles.icon} />
            <Text style={styles.infoText}>{date}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="location" size={16} color="#ec4899" style={styles.icon} />
            <Text style={styles.infoText} numberOfLines={1}>{location}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="people" size={16} color="#ec4899" style={styles.icon} />
            <Text style={styles.infoText}>{attendees} / {maxAttendees} attending</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.joinBtn}>
          <Text style={styles.joinBtnText}>Join Meetup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 20,
  },
  imageHeader: {
    height: 180,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 15,
  },
  imageStyle: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  badge: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  title: {
    color: '#f8fafc',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  infoContainer: {
    gap: 8,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 10,
  },
  infoText: {
    color: '#94a3b8',
    fontSize: 14,
    flex: 1,
  },
  joinBtn: {
    backgroundColor: '#6366f1',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
  },
  joinBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default EventCard;
