import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Modal, TextInput, Alert, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';
import { API_URL } from '../config';

export default function EventCard({ item, onRsvp, onChat, isHost, onManage, onUserClick }) {
  const [ticketData, setTicketData] = useState(null);
  const [showQr, setShowQr] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showMemories, setShowMemories] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [media, setMedia] = useState([]);
  const [newMediaUrl, setNewMediaUrl] = useState('');

  const isPastEvent = item.date ? new Date(item.date) < new Date() : false;

  useEffect(() => {
    fetchTicket();
  }, [item.id]);

  const fetchTicket = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/events/${item.id}/ticket`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setTicketData(await response.json());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleJoin = () => {
    if (onRsvp) {
      onRsvp(item.id).then(() => {
        setTimeout(fetchTicket, 1000);
      });
    }
  };

  const handleReviewSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const res = await fetch(`${API_URL}/events/${item.id}/reviews`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rating, comment })
      });
      if (res.ok) {
        Alert.alert("Success", "Review submitted successfully!");
        setShowReview(false);
      } else {
        const errText = await res.text();
        Alert.alert("Failed", errText);
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Network error.");
    }
  };

  const fetchMedia = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/events/${item.id}/media`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setMedia(await response.json());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMediaUpload = async () => {
    if (!newMediaUrl) return;
    try {
      const token = await AsyncStorage.getItem('userToken');
      const res = await fetch(`${API_URL}/events/${item.id}/media`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mediaUrl: newMediaUrl })
      });
      if (res.ok) {
        setNewMediaUrl('');
        fetchMedia();
      } else {
        const errText = await res.text();
        Alert.alert("Failed", errText);
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Network error.");
    }
  };

  useEffect(() => {
    if (showMemories) {
      fetchMedia();
    }
  }, [showMemories]);

  return (
    <View style={styles.card}>
      <ImageBackground 
        source={{ uri: item.imageUrl || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000' }} 
        style={styles.cardImage}
        imageStyle={{ opacity: 0.4 }}
      >
        <View style={styles.cardOverlay}>
          <View style={styles.cardHeader}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.category}</Text>
            </View>
            <View style={styles.attendeeBadge}>
              <Ionicons name="people" size={14} color="#94a3b8" />
              <Text style={styles.attendeeText}>{item.attendees}/{item.maxAttendees}</Text>
            </View>
          </View>
          
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
            {item.host && (
              <Text style={{color: '#94a3b8', fontSize: 10, fontFamily: 'monospace', textTransform: 'uppercase', marginBottom: 5}}>
                HOSTED BY{' '}
                <Text 
                  style={{color: '#ccff00', fontWeight: 'bold', textDecorationLine: 'underline'}} 
                  onPress={() => onUserClick && onUserClick(item.host.id)}
                >
                  {item.host.username}
                </Text>
              </Text>
            )}
            
            <View style={styles.cardDetailRow}>
              <Ionicons name="calendar" size={14} color="#ccff00" />
              <Text style={styles.cardDetailText}>{new Date(item.date).toLocaleString([], {weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'})}</Text>
            </View>
            <View style={styles.cardDetailRow}>
              <Ionicons name="location" size={14} color="#ccff00" />
              <Text style={styles.cardDetailText} numberOfLines={1}>{item.location}</Text>
            </View>
            
            <View style={{flexDirection: 'row', gap: 10, marginTop: 15}}>
              {isPastEvent ? (
                <>
                  <TouchableOpacity style={[styles.joinBtn, {flex: 1, backgroundColor: 'rgba(30,41,59,0.8)'}]} onPress={() => setShowMemories(true)}>
                    <Ionicons name="images" size={16} color="#ccff00" />
                    <Text style={styles.joinBtnText}>MEMORIES</Text>
                  </TouchableOpacity>
                  {ticketData?.status === 'ATTENDED' && !isHost && (
                    <TouchableOpacity style={[styles.joinBtn, {flex: 1, backgroundColor: '#ccff00'}]} onPress={() => setShowReview(true)}>
                      <Ionicons name="star" size={16} color="#0f172a" />
                      <Text style={[styles.joinBtnText, {color: '#0f172a'}]}>RATE</Text>
                    </TouchableOpacity>
                  )}
                  {isHost && (
                    <TouchableOpacity style={[styles.joinBtn, {flex: 1, backgroundColor: 'rgba(30,41,59,0.8)'}]} onPress={() => onManage(item)}>
                      <Ionicons name="settings" size={16} color="#ccff00" />
                      <Text style={styles.joinBtnText}>MANAGE</Text>
                    </TouchableOpacity>
                  )}
                </>
              ) : (
                <>
                  {isHost ? (
                    <TouchableOpacity style={[styles.joinBtn, {flex: 1, backgroundColor: 'rgba(30,41,59,0.8)'}]} onPress={() => onManage(item)}>
                      <Ionicons name="settings" size={16} color="#ccff00" />
                      <Text style={styles.joinBtnText}>MANAGE</Text>
                    </TouchableOpacity>
                  ) : ticketData ? (
                    <TouchableOpacity style={[styles.joinBtn, {flex: 1, backgroundColor: '#ccff00'}]} onPress={() => setShowQr(true)}>
                      <Ionicons name="ticket" size={16} color="#0f172a" />
                      <Text style={[styles.joinBtnText, {color: '#0f172a'}]}>{ticketData.status === 'ATTENDED' ? 'ATTENDED' : 'VIEW TICKET'}</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={[styles.joinBtn, {flex: 1}]} onPress={handleJoin}>
                      <Text style={styles.joinBtnText}>JOIN</Text>
                      <Ionicons name="arrow-forward" size={16} color="#ccff00" />
                    </TouchableOpacity>
                  )}
                </>
              )}
              <TouchableOpacity 
                style={[styles.joinBtn, {backgroundColor: 'rgba(30,41,59,0.8)', borderColor: 'transparent', paddingHorizontal: 15}]} 
                onPress={() => onChat(item.id, item.title)}
              >
                <Ionicons name="chatbubbles" size={20} color="#ccff00" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>

      <Modal visible={showQr} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setShowQr(false)}>
              <Ionicons name="close" size={24} color="#94a3b8" />
            </TouchableOpacity>
            
            <Text style={styles.modalTitle} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.modalStatus}>{ticketData?.status}</Text>
            
            <View style={styles.qrContainer}>
              {ticketData?.ticketId && (
                <QRCode
                  value={ticketData.ticketId}
                  size={200}
                />
              )}
            </View>
            
            <Text style={styles.ticketLabel}>TICKET ID</Text>
            <View style={styles.ticketIdBox}>
              <Text style={styles.ticketIdText} selectable={true}>{ticketData?.ticketId}</Text>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={showReview} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setShowReview(false)}>
              <Ionicons name="close" size={24} color="#94a3b8" />
            </TouchableOpacity>
            
            <Text style={styles.modalTitle}>RATE HOST</Text>
            <Text style={styles.modalStatus}>POST-EVENT REVIEW</Text>
            
            <View style={{flexDirection: 'row', justifyContent: 'center', gap: 10, marginBottom: 20}}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Ionicons 
                    name={star <= rating ? "star" : "star-outline"} 
                    size={32} 
                    color={star <= rating ? "#ccff00" : "#475569"} 
                  />
                </TouchableOpacity>
              ))}
            </View>

            <TextInput 
              style={styles.reviewInput}
              placeholder="How was the event? Leave a comment..."
              placeholderTextColor="#94a3b8"
              value={comment}
              onChangeText={setComment}
              multiline={true}
              numberOfLines={4}
            />

            <TouchableOpacity style={styles.submitBtn} onPress={handleReviewSubmit}>
              <Text style={styles.submitBtnText}>SUBMIT REVIEW</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={showMemories} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, {height: '80%', padding: 15}]}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setShowMemories(false)}>
              <Ionicons name="close" size={24} color="#94a3b8" />
            </TouchableOpacity>
            
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 10, marginBottom: 5}}>
              <Ionicons name="images" size={24} color="#ccff00" />
              <Text style={styles.modalTitle}>MEMORIES</Text>
            </View>
            <Text style={[styles.modalStatus, {marginBottom: 10}]}>SHARED GALLERY</Text>
            
            <ScrollView style={{flex: 1, width: '100%', marginBottom: 15}} contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
              {media.length === 0 ? (
                <View style={{width: '100%', alignItems: 'center', marginTop: 50}}>
                  <Ionicons name="images-outline" size={48} color="rgba(255,255,255,0.2)" />
                  <Text style={{color: '#94a3b8', marginTop: 10, textTransform: 'uppercase', fontSize: 10}}>No memories uploaded yet.</Text>
                </View>
              ) : (
                media.map((m) => (
                  <View key={m.id} style={styles.galleryImageContainer}>
                    <Image source={{uri: m.mediaUrl}} style={styles.galleryImage} />
                    <View style={styles.galleryImageOverlay}>
                      <Text style={styles.galleryImageText} numberOfLines={1}>by {m.uploader?.username}</Text>
                    </View>
                  </View>
                ))
              )}
            </ScrollView>

            {(isHost || ticketData?.status === 'ATTENDED') && (
              <View style={{flexDirection: 'row', gap: 10, width: '100%', borderTopWidth: 1, borderColor: 'rgba(255,255,255,0.1)', paddingTop: 15}}>
                <TextInput 
                  style={[styles.reviewInput, {flex: 1, minHeight: 40, marginBottom: 0, padding: 10}]}
                  placeholder="Paste image URL..."
                  placeholderTextColor="#94a3b8"
                  value={newMediaUrl}
                  onChangeText={setNewMediaUrl}
                />
                <TouchableOpacity style={[styles.submitBtn, {width: 100}]} onPress={handleMediaUpload}>
                  <Text style={[styles.submitBtnText, {fontSize: 12}]}>UPLOAD</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { height: 350, borderRadius: 15, overflow: 'hidden', marginBottom: 20, backgroundColor: '#1e293b', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  cardImage: { flex: 1, backgroundColor: '#0f172a' },
  cardOverlay: { flex: 1, backgroundColor: 'rgba(15,23,42,0.6)', padding: 20, justifyContent: 'space-between' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  badge: { backgroundColor: 'rgba(15,23,42,0.8)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  badgeText: { color: '#ccff00', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  attendeeBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(15,23,42,0.8)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  attendeeText: { color: '#94a3b8', fontSize: 10, fontWeight: 'bold', marginLeft: 5 },
  cardContent: { gap: 10 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: 'white', textTransform: 'uppercase', letterSpacing: 0.5 },
  cardDetailRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  cardDetailText: { color: '#94a3b8', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
  joinBtn: { paddingVertical: 15, paddingHorizontal: 10, borderWidth: 1, borderColor: 'rgba(204,255,0,0.5)', borderRadius: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5 },
  joinBtnText: { color: 'white', fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15,23,42,0.9)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { width: '100%', maxWidth: 350, backgroundColor: '#1e293b', borderRadius: 20, padding: 30, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(204,255,0,0.3)' },
  closeBtn: { position: 'absolute', top: 15, right: 15, zIndex: 1 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: 'white', textTransform: 'uppercase', letterSpacing: 1, textAlign: 'center', marginBottom: 5, marginTop: 10 },
  modalStatus: { fontSize: 12, color: '#ccff00', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 20 },
  qrContainer: { backgroundColor: 'white', padding: 15, borderRadius: 15, marginBottom: 20 },
  ticketLabel: { fontSize: 10, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 5 },
  ticketIdBox: { backgroundColor: '#0f172a', padding: 10, borderRadius: 8, width: '100%', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  ticketIdText: { color: 'white', fontSize: 10, fontFamily: 'monospace' },
  reviewInput: { backgroundColor: '#0f172a', color: 'white', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', marginBottom: 20, width: '100%', minHeight: 100, textAlignVertical: 'top' },
  submitBtn: { backgroundColor: '#ccff00', padding: 15, borderRadius: 10, alignItems: 'center', justifyContent: 'center', width: '100%' },
  submitBtnText: { color: '#0f172a', fontWeight: 'bold', letterSpacing: 1, textTransform: 'uppercase' },
  galleryImageContainer: { width: '48%', aspectRatio: 1, marginBottom: '4%', borderRadius: 10, overflow: 'hidden', backgroundColor: 'rgba(0,0,0,0.5)' },
  galleryImage: { width: '100%', height: '100%' },
  galleryImageOverlay: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'rgba(0,0,0,0.7)', padding: 5 },
  galleryImageText: { color: 'white', fontSize: 8, fontFamily: 'monospace' }
});
