import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

export default function CreateEventScreen({ navigation }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Social',
    date: '',
    location: '',
    maxAttendees: '50',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000',
    recurrence: 'NONE',
    recurrenceEndDate: ''
  });
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!formData.title || !formData.date || !formData.location) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const payload = {
        ...formData,
        maxAttendees: parseInt(formData.maxAttendees) || 50,
        attendees: 0
      };

      const response = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        Alert.alert('Success', 'Protocol Initialized!');
        setFormData({
          title: '', category: 'Social', date: '', location: '', maxAttendees: '50', imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000', recurrence: 'NONE', recurrenceEndDate: ''
        });
        navigation.navigate('Discover');
      } else {
        Alert.alert('Error', 'Failed to initialize protocol');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>INITIALIZE <Text style={{color: '#ccff00'}}>PROTOCOL</Text></Text>
          <Text style={styles.headerSub}>Deploy a new event to the ecosystem</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.field}>
            <Text style={styles.label}>Operation Title *</Text>
            <TextInput 
              style={styles.input}
              value={formData.title}
              onChangeText={text => setFormData({...formData, title: text})}
              placeholder="e.g. Midnight Run Club"
              placeholderTextColor="#64748b"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Category</Text>
            <TextInput 
              style={styles.input}
              value={formData.category}
              onChangeText={text => setFormData({...formData, category: text})}
              placeholder="Sports, Social, Fitness..."
              placeholderTextColor="#64748b"
            />
          </View>

          <View style={styles.fieldRow}>
            <View style={[styles.field, {flex: 1, marginRight: 10}]}>
              <Text style={styles.label}>Date & Time *</Text>
              <TextInput 
                style={styles.input}
                value={formData.date}
                onChangeText={text => setFormData({...formData, date: text})}
                placeholder="2023-10-10T18:00"
                placeholderTextColor="#64748b"
              />
            </View>
            <View style={[styles.field, {flex: 1}]}>
              <Text style={styles.label}>Max Capacity</Text>
              <TextInput 
                style={styles.input}
                value={formData.maxAttendees}
                onChangeText={text => setFormData({...formData, maxAttendees: text})}
                keyboardType="numeric"
                placeholderTextColor="#64748b"
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Recurrence</Text>
            <View style={styles.recurrenceRow}>
              {['NONE', 'DAILY', 'WEEKLY', 'MONTHLY'].map((option) => (
                <TouchableOpacity 
                  key={option}
                  style={[styles.recurrenceBtn, formData.recurrence === option && styles.recurrenceBtnActive]}
                  onPress={() => setFormData({...formData, recurrence: option})}
                >
                  <Text style={[styles.recurrenceText, formData.recurrence === option && styles.recurrenceTextActive]}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {formData.recurrence !== 'NONE' && (
            <View style={styles.field}>
              <Text style={styles.label}>Recurrence End Date *</Text>
              <TextInput 
                style={styles.input}
                value={formData.recurrenceEndDate}
                onChangeText={text => setFormData({...formData, recurrenceEndDate: text})}
                placeholder="2023-11-10T18:00"
                placeholderTextColor="#64748b"
              />
            </View>
          )}

          <View style={styles.field}>
            <Text style={styles.label}>Location / Coordinates *</Text>
            <TextInput 
              style={styles.input}
              value={formData.location}
              onChangeText={text => setFormData({...formData, location: text})}
              placeholder="e.g. Central Park Turf 3"
              placeholderTextColor="#64748b"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Intel Image URL</Text>
            <TextInput 
              style={styles.input}
              value={formData.imageUrl}
              onChangeText={text => setFormData({...formData, imageUrl: text})}
              placeholderTextColor="#64748b"
            />
          </View>

          <TouchableOpacity 
            style={styles.btnPrimary} 
            onPress={handleCreate}
            disabled={loading}
          >
            <Text style={styles.btnPrimaryText}>{loading ? 'TRANSMITTING...' : 'EXECUTE PROTOCOL'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  scrollContent: { padding: 20 },
  header: { paddingVertical: 20, marginBottom: 10 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#f8fafc', textTransform: 'uppercase', letterSpacing: 1 },
  headerSub: { fontSize: 14, color: '#94a3b8', marginTop: 5 },
  formContainer: { backgroundColor: 'rgba(30, 41, 59, 0.9)', borderRadius: 15, padding: 20, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.05)' },
  field: { marginBottom: 20 },
  fieldRow: { flexDirection: 'row' },
  label: { fontSize: 12, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  input: { fontSize: 16, color: '#f8fafc', backgroundColor: 'rgba(15, 23, 42, 0.8)', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#ccff00' },
  recurrenceRow: { flexDirection: 'row', justifyContent: 'space-between' },
  recurrenceBtn: { flex: 1, padding: 10, borderWidth: 1, borderColor: '#ccff00', borderRadius: 8, marginHorizontal: 2, alignItems: 'center' },
  recurrenceBtnActive: { backgroundColor: '#ccff00' },
  recurrenceText: { color: '#ccff00', fontSize: 10, fontWeight: 'bold' },
  recurrenceTextActive: { color: 'black' },
  btnPrimary: { backgroundColor: '#ccff00', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  btnPrimaryText: { color: 'white', fontWeight: 'bold', fontSize: 16, textTransform: 'uppercase', letterSpacing: 1 },
});
