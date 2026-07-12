import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState({
    username: '', email: '', bio: '', neighborhood: '', sportsInterests: '', interests: '', age: '', gender: '', lookingFor: '', availability: '', trustScore: 0, eventsHosted: 0, eventsAttended: 0, isVerified: false, averageRating: 0, reviewCount: 0, xp: 0, badges: []
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) return;

      const response = await fetch(`${API_URL}/users/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setProfile({
          username: data.username || '',
          email: data.email || '',
          bio: data.bio || '',
          neighborhood: data.neighborhood || '',
          sportsInterests: data.sportsInterests || '',
          interests: data.interests || '',
          age: data.age ? String(data.age) : '',
          gender: data.gender || '',
          lookingFor: data.lookingFor || '',
          availability: data.availability || '',
          trustScore: data.trustScore || 0,
          eventsHosted: data.eventsHosted || 0,
          eventsAttended: data.eventsAttended || 0,
          isVerified: data.isVerified || false,
          averageRating: data.averageRating || 0,
          reviewCount: data.reviewCount || 0,
          xp: data.xp || 0,
          badges: data.badges || []
        });

        const reviewRes = await fetch(`${API_URL}/users/${data.id}/reviews`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (reviewRes.ok) {
          setReviews(await reviewRes.json());
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/users/me`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bio: profile.bio,
          neighborhood: profile.neighborhood,
          sportsInterests: profile.sportsInterests,
          interests: profile.interests,
          age: profile.age ? parseInt(profile.age, 10) : null,
          gender: profile.gender,
          lookingFor: profile.lookingFor,
          availability: profile.availability
        })
      });
      
      if (response.ok) {
        setIsEditing(false);
        Alert.alert('Success', 'Profile updated successfully');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('username');
    navigation.replace('Login'); // Navigate back to Auth stack
  };

  const handleBoostProfile = async () => {
    Alert.alert(
      "Boost Profile",
      "Pay $4.99 to boost your profile for 30 days? (Mock Payment)",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Pay", 
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('userToken');
              const res = await fetch(`${API_URL}/monetization/boost-profile`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
              });
              if (res.ok) {
                Alert.alert("Success", "Payment Successful! Your profile is now boosted.");
                fetchProfile();
              }
            } catch (err) {
              console.error(err);
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{color: 'white', textAlign: 'center', marginTop: 50}}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', width: '100%', marginBottom: -20, zIndex: 10}}>
          <TouchableOpacity onPress={() => navigation.navigate('SettingsHome')} style={{padding: 10}}>
            <Ionicons name="settings-outline" size={24} color="#f8fafc" />
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={60} color="#ccff00" />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Text style={styles.name}>{profile.username}</Text>
            {profile.isVerified && <Ionicons name="checkmark-circle" size={20} color="#ccff00" />}
          </View>
          <Text style={styles.email}>{profile.email}</Text>

          {/* XP Bar */}
          <View style={{width: '100%', marginTop: 20}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
              <Text style={{color: '#ccff00', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1}}>XP LEVEL</Text>
              <Text style={{color: '#94a3b8', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1}}>{profile.xp} / 1000</Text>
            </View>
            <View style={{width: '100%', height: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden'}}>
              <View style={{width: `${Math.min(100, (profile.xp / 1000) * 100)}%`, height: '100%', backgroundColor: '#ccff00'}} />
            </View>
          </View>

          {/* Badges */}
          {profile.badges && profile.badges.length > 0 && (
            <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginTop: 15}}>
              {profile.badges.map(badge => (
                <View key={badge} style={{backgroundColor: 'rgba(204,255,0,0.1)', borderColor: 'rgba(204,255,0,0.3)', borderWidth: 1, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, flexDirection: 'row', alignItems: 'center', gap: 5}}>
                  <Ionicons name="medal" size={14} color="#facc15" />
                  <Text style={{color: 'white', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1}}>{badge}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{profile.trustScore}</Text>
            <Text style={styles.statLabel}>Trust Score</Text>
          </View>
          <View style={styles.statBox}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.statNumber}>{(profile.averageRating || 0).toFixed(1)}</Text>
              <Ionicons name="star" size={16} color="#ccff00" style={{marginLeft: 2}} />
            </View>
            <Text style={styles.statLabel}>{profile.reviewCount} Reviews</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, {color: 'white'}]}>{profile.eventsHosted}</Text>
            <Text style={styles.statLabel}>Hosted</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, {color: 'white'}]}>{profile.eventsAttended}</Text>
            <Text style={styles.statLabel}>Attended</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Parameters</Text>
          
          <View style={styles.field}>
            <Text style={styles.label}>Biography</Text>
            {isEditing ? (
              <TextInput 
                style={[styles.input, { height: 80 }]}
                multiline
                value={profile.bio}
                onChangeText={text => setProfile({...profile, bio: text})}
                placeholderTextColor="#64748b"
              />
            ) : (
              <Text style={styles.value}>{profile.bio || 'Not configured'}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Neighborhood</Text>
            {isEditing ? (
              <TextInput 
                style={styles.input}
                value={profile.neighborhood}
                onChangeText={text => setProfile({...profile, neighborhood: text})}
                placeholderTextColor="#64748b"
              />
            ) : (
              <Text style={styles.value}>{profile.neighborhood || 'Not configured'}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Specializations (Sports)</Text>
            {isEditing ? (
              <TextInput 
                style={styles.input}
                value={profile.sportsInterests}
                onChangeText={text => setProfile({...profile, sportsInterests: text})}
                placeholderTextColor="#64748b"
              />
            ) : (
              <Text style={styles.value}>{profile.sportsInterests || 'Not configured'}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>General Interests</Text>
            {isEditing ? (
              <TextInput 
                style={styles.input}
                value={profile.interests}
                onChangeText={text => setProfile({...profile, interests: text})}
                placeholder="e.g. Music, Gaming"
                placeholderTextColor="#64748b"
              />
            ) : (
              <Text style={styles.value}>{profile.interests || 'Not configured'}</Text>
            )}
          </View>
          
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={[styles.field, {flex: 0.48}]}>
              <Text style={styles.label}>Age</Text>
              {isEditing ? (
                <TextInput 
                  style={styles.input}
                  value={profile.age}
                  onChangeText={text => setProfile({...profile, age: text})}
                  keyboardType="numeric"
                  placeholderTextColor="#64748b"
                />
              ) : (
                <Text style={styles.value}>{profile.age || '-'}</Text>
              )}
            </View>
            <View style={[styles.field, {flex: 0.48}]}>
              <Text style={styles.label}>Gender</Text>
              {isEditing ? (
                <TextInput 
                  style={styles.input}
                  value={profile.gender}
                  onChangeText={text => setProfile({...profile, gender: text})}
                  placeholderTextColor="#64748b"
                />
              ) : (
                <Text style={styles.value}>{profile.gender || '-'}</Text>
              )}
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Looking For</Text>
            {isEditing ? (
              <TextInput 
                style={styles.input}
                value={profile.lookingFor}
                onChangeText={text => setProfile({...profile, lookingFor: text})}
                placeholder="e.g. friends, sports partners"
                placeholderTextColor="#64748b"
              />
            ) : (
              <Text style={styles.value}>{profile.lookingFor || 'Not configured'}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Availability</Text>
            {isEditing ? (
              <TextInput 
                style={styles.input}
                value={profile.availability}
                onChangeText={text => setProfile({...profile, availability: text})}
                placeholder="e.g. Weekends, Evenings"
                placeholderTextColor="#64748b"
              />
            ) : (
              <Text style={styles.value}>{profile.availability || 'Not configured'}</Text>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Host Reviews</Text>
          {reviews.length === 0 ? (
            <Text style={{color: '#94a3b8', fontStyle: 'italic'}}>No reviews yet.</Text>
          ) : (
            reviews.map(review => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Text 
                    style={[styles.reviewerName, review.reviewer && {color: '#ccff00', textDecorationLine: 'underline'}]}
                    onPress={() => review.reviewer && navigation.navigate('PublicProfile', { userId: review.reviewer.id })}
                  >
                    {review.reviewer?.username || 'Anonymous'}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    {[...Array(5)].map((_, i) => (
                      <Ionicons 
                        key={i} 
                        name={i < review.rating ? "star" : "star-outline"} 
                        size={12} 
                        color={i < review.rating ? "#ccff00" : "#475569"} 
                      />
                    ))}
                  </View>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))
          )}
        </View>
        
        <View style={styles.actionContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 10}}>
            <TouchableOpacity 
              style={[isEditing ? styles.btnPrimary : styles.btnSecondary, {flex: 1}]} 
              onPress={() => isEditing ? handleSave() : setIsEditing(true)}
            >
              <Text style={isEditing ? styles.btnPrimaryText : styles.btnSecondaryText}>
                {isEditing ? 'Save' : 'Edit'}
              </Text>
            </TouchableOpacity>
            
            {!isEditing && (
              <TouchableOpacity 
                style={[styles.btnSecondary, {flex: 1, borderColor: '#ccff00'}]} 
                onPress={() => navigation.navigate('Analytics')}
              >
                <Text style={[styles.btnSecondaryText, {color: '#ccff00'}]}>
                  Analytics
                </Text>
              </TouchableOpacity>
            )}
          </View>
          
          {!isEditing && (
            <TouchableOpacity 
              style={[styles.btnSecondary, {marginTop: 15, borderColor: '#a855f7', backgroundColor: 'rgba(168,85,247,0.1)'}]} 
              onPress={handleBoostProfile}
            >
              <Text style={[styles.btnSecondaryText, {color: '#a855f7'}]}>Boost Profile</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity style={[styles.btnSecondary, {marginTop: 15, borderColor: '#ef4444'}]} onPress={handleLogout}>
            <Text style={[styles.btnSecondaryText, {color: '#ef4444'}]}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  scrollContent: { padding: 20 },
  header: { alignItems: 'center', marginTop: 20, marginBottom: 20 },
  avatarContainer: { width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(204, 255, 0, 0.1)', borderWidth: 2, borderColor: '#ccff00', alignItems: 'center', justifyContent: 'center', marginBottom: 15 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#f8fafc', textTransform: 'uppercase' },
  email: { fontSize: 14, color: '#94a3b8', marginTop: 5 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'rgba(30, 41, 59, 0.9)', borderRadius: 15, padding: 20, marginBottom: 30, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.05)' },
  statBox: { alignItems: 'center' },
  statNumber: { fontSize: 24, fontWeight: 'bold', color: '#ccff00' },
  statLabel: { fontSize: 12, color: '#94a3b8', marginTop: 5, textTransform: 'uppercase', letterSpacing: 1 },
  section: { backgroundColor: 'rgba(30, 41, 59, 0.9)', borderRadius: 15, padding: 20, marginBottom: 30, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.05)' },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#ccff00', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 20 },
  field: { marginBottom: 20 },
  label: { fontSize: 12, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  value: { fontSize: 16, color: '#f8fafc', backgroundColor: 'rgba(15, 23, 42, 0.5)', padding: 15, borderRadius: 10 },
  input: { fontSize: 16, color: '#f8fafc', backgroundColor: 'rgba(15, 23, 42, 0.8)', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#ccff00' },
  actionContainer: { marginBottom: 40 },
  btnPrimary: { backgroundColor: '#ccff00', padding: 15, borderRadius: 10, alignItems: 'center' },
  btnPrimaryText: { color: 'white', fontWeight: 'bold', fontSize: 16, textTransform: 'uppercase', letterSpacing: 1 },
  btnSecondary: { backgroundColor: 'transparent', padding: 15, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#94a3b8' },
  btnSecondaryText: { color: '#94a3b8', fontWeight: 'bold', fontSize: 16, textTransform: 'uppercase', letterSpacing: 1 },
  reviewCard: { backgroundColor: 'rgba(15, 23, 42, 0.5)', padding: 15, borderRadius: 10, marginBottom: 10 },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  reviewerName: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  reviewComment: { color: '#94a3b8', fontSize: 12 }
});
