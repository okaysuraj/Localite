import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Switch, Alert, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { API_URL } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateMatchScreen({ navigation }) {
  const [sport, setSport] = useState('Tennis (Singles)');
  const [level, setLevel] = useState('Amateur');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [isPrivate, setIsPrivate] = useState(false);
  const [houseRules, setHouseRules] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!date || !time) {
      Alert.alert('Validation Error', 'Date and time are required.');
      return;
    }
    setIsSubmitting(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      // Format as an Event creation for Matchmaking
      const payload = {
        title: `${level} ${sport} Match`,
        category: sport.split(' ')[0], // e.g. "Tennis"
        skillLevel: level,
        eventType: isPrivate ? 'Private Match' : 'Public Match',
        date: `${date}T${time}:00`, // basic formatting
        maxAttendees: maxPlayers,
        rules: houseRules,
        location: 'The Heritage Club, Court 4', // Default for now
        cost: 0,
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
        Alert.alert('Success', 'Match created successfully!');
        navigation.goBack();
      } else {
        const errorData = await response.text();
        Alert.alert('Error', errorData || 'Failed to create match');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Match</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContext}>
          <Text style={styles.preTitle}>CREATE NEW MATCH</Text>
          <Text style={styles.title}>Match Configuration</Text>
          <Text style={styles.subtitle}>Curate a premium athletic experience for the community.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>SPORT CATEGORY</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={sport}
              onChangeText={setSport}
              placeholder="e.g. Tennis (Singles)"
            />
          </View>
          
          <Text style={[styles.label, {marginTop: 20}]}>COMPETITIVE LEVEL</Text>
          <View style={styles.levelRow}>
            {['Novice', 'Amateur', 'Elite'].map((lvl) => (
              <TouchableOpacity 
                key={lvl}
                style={[styles.levelBtn, level === lvl && styles.levelBtnActive]}
                onPress={() => setLevel(lvl)}
              >
                <Text style={[styles.levelText, level === lvl && styles.levelTextActive]}>{lvl.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>SCHEDULE</Text>
          <View style={styles.dateTimeRow}>
            <View style={styles.dateTimeInput}>
              <MaterialIcons name="calendar-today" size={20} color="#775a19" />
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={date}
                onChangeText={setDate}
              />
            </View>
            <View style={styles.dateTimeInput}>
              <MaterialIcons name="schedule" size={20} color="#775a19" />
              <TextInput
                style={styles.input}
                placeholder="HH:MM"
                value={time}
                onChangeText={setTime}
              />
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>PARTICIPANT DYNAMICS</Text>
          <View style={styles.dynamicsRow}>
            <Text style={styles.subLabel}>MAX PLAYERS</Text>
            <View style={styles.counterRow}>
              <TouchableOpacity onPress={() => setMaxPlayers(Math.max(2, maxPlayers - 1))} style={styles.counterBtn}>
                <Text style={styles.counterBtnText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>{maxPlayers}</Text>
              <TouchableOpacity onPress={() => setMaxPlayers(Math.min(16, maxPlayers + 1))} style={styles.counterBtnActive}>
                <Text style={styles.counterBtnTextActive}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.dynamicsRow}>
            <Text style={styles.subLabel}>PRIVATE MATCH</Text>
            <Switch
              value={isPrivate}
              onValueChange={setIsPrivate}
              trackColor={{ false: "#e4e2e2", true: "#fed488" }}
              thumbColor={isPrivate ? "#775a19" : "#f4f3f4"}
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>HOUSE RULES</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, {height: 80, textAlignVertical: 'top'}]}
              value={houseRules}
              onChangeText={setHouseRules}
              placeholder="Example: Respect court times, no aggressive behavior..."
              multiline
            />
          </View>
        </View>

        <TouchableOpacity 
          style={styles.submitBtn} 
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.submitBtnText}>{isSubmitting ? 'PUBLISHING...' : 'PUBLISH MATCH'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbf9f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(197, 198, 205, 0.3)',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000000',
  },
  placeholder: {
    width: 32,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  headerContext: {
    marginBottom: 32,
  },
  preTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#775a19',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  title: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000000',
  },
  subtitle: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    marginTop: 8,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
  },
  label: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#75777e',
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  subLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#44474d',
    letterSpacing: 1.2,
  },
  inputContainer: {
    backgroundColor: '#f5f3f3',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  input: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#000000',
    paddingVertical: 12,
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  levelBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#c5c6cd',
  },
  levelBtnActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  levelText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
  },
  levelTextActive: {
    color: '#ffffff',
  },
  dateTimeRow: {
    flexDirection: 'row',
    gap: 16,
  },
  dateTimeInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f3f3',
    borderRadius: 8,
    paddingHorizontal: 12,
    gap: 8,
  },
  dynamicsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  counterBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#c5c6cd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterBtnText: {
    fontSize: 18,
    color: '#44474d',
  },
  counterBtnActive: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#775a19',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterBtnTextActive: {
    fontSize: 18,
    color: '#775a19',
  },
  counterValue: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000000',
  },
  submitBtn: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    color: '#ffffff',
    letterSpacing: 1.2,
  },
});
