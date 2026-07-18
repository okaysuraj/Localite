import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const REQUESTS = [
  {
    id: 1,
    name: 'Julian Thorne',
    verified: true,
    title: 'Art Enthusiast • London',
    message: '"I saw your recent contribution to the Gallery Circle. I\'d love to discuss the upcoming exhibition..."',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    name: 'Elena Rossi',
    verified: false,
    title: 'Product Designer • Milan',
    message: '"Would you be open to a coffee chat about the Localite design systems? I\'m visiting next week."',
    image: 'https://via.placeholder.com/150'
  }
];

export default function MessageRequestsScreen() {
  const navigation = useNavigation();
  const [requests, setRequests] = useState(REQUESTS);

  const handleAction = (id, action) => {
    // In a real app, this would call the backend to accept/decline
    setRequests(prev => prev.filter(req => req.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <MaterialIcons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Localite</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.avatarWrap}>
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.avatarImg} />
          </View>
          <TouchableOpacity>
            <MaterialIcons name="settings" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Message Requests</Text>
          <Text style={styles.pageDesc}>Messages from people who are not in your circle. To protect your privacy, they won't know you've seen their message until you connect.</Text>
        </View>

        <View style={styles.banner}>
          <View style={styles.bannerIconWrap}>
            <MaterialIcons name="verified-user" size={24} color="#ffdea5" />
          </View>
          <View style={styles.bannerTextWrap}>
            <Text style={styles.bannerTitle}>TRUST-BASED FILTERING</Text>
            <Text style={styles.bannerDesc}>Our AI concierge has curated these requests based on shared interests and community standing. Only high-integrity interactions reach this inbox.</Text>
          </View>
        </View>

        <View style={styles.requestsList}>
          {requests.map(req => (
            <View key={req.id} style={styles.requestCard}>
              <View style={styles.reqTop}>
                <Image source={{ uri: req.image }} style={styles.reqAvatar} />
                <View style={styles.reqInfo}>
                  <View style={styles.reqNameRow}>
                    <Text style={styles.reqName}>{req.name}</Text>
                    {req.verified && <MaterialIcons name="verified" size={16} color="#775a19" />}
                  </View>
                  <Text style={styles.reqTitle}>{req.title}</Text>
                  <Text style={styles.reqMessage} numberOfLines={3}>{req.message}</Text>
                </View>
              </View>
              <View style={styles.reqActions}>
                <TouchableOpacity style={styles.declineBtn} onPress={() => handleAction(req.id, 'decline')}>
                  <Text style={styles.declineText}>Decline</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.connectBtn} onPress={() => handleAction(req.id, 'connect')}>
                  <Text style={styles.connectText}>Connect</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          {requests.length === 0 && (
            <Text style={styles.emptyText}>No pending requests.</Text>
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>ENCRYPTED & SECURE</Text>
          <Text style={styles.footerText}>Localite respects your space. All conversations remain private and untracked.</Text>
        </View>
      </ScrollView>
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    fontStyle: 'italic',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#c5c6cd',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  titleSection: {
    marginBottom: 24,
  },
  pageTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
    marginBottom: 8,
  },
  pageDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    lineHeight: 24,
  },
  banner: {
    backgroundColor: '#0d1c32',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
    shadowColor: '#0a1947',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  bannerIconWrap: {
    backgroundColor: 'rgba(254, 212, 136, 0.2)',
    padding: 10,
    borderRadius: 24,
    alignSelf: 'flex-start',
  },
  bannerTextWrap: {
    flex: 1,
  },
  bannerTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#ffdea5',
    letterSpacing: 1,
    marginBottom: 4,
  },
  bannerDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#76849f',
    lineHeight: 20,
  },
  requestsList: {
    gap: 16,
  },
  requestCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    shadowColor: '#0a1947',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  reqTop: {
    flexDirection: 'row',
    gap: 16,
  },
  reqAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  reqInfo: {
    flex: 1,
  },
  reqNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  reqName: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000',
  },
  reqTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    textTransform: 'uppercase',
    marginTop: 2,
    marginBottom: 8,
  },
  reqMessage: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  reqActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  declineBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#775a19',
    alignItems: 'center',
  },
  declineText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    color: '#775a19',
  },
  connectBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#0d1c32',
    alignItems: 'center',
  },
  connectText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    color: '#fff',
  },
  emptyText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    textAlign: 'center',
    marginTop: 20,
  },
  footer: {
    marginTop: 48,
    alignItems: 'center',
  },
  footerTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 2,
    marginBottom: 8,
  },
  footerText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
    fontStyle: 'italic',
    textAlign: 'center',
  }
});
