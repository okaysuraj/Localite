import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView, Platform 
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SUGGESTED_CONTACTS = [
  {
    id: 1,
    name: 'Arthur Sterling',
    hub: 'Wine Collectors',
    icon: 'workspace-premium', // mapping 'workspace_premium' to material icons or standard
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoT3QrhhDRsRlU7lLQWtjsw5u9YfIxexpV37-PbNEWYdvSR24D6jVlSZC5XrXDT7XcbfVwUUw_ZZqOW286_CNUp1XkxEEJrtmAmM8Qm-1_GeHdmJygW6dkvUJTMEQq6yApxR9GZ3O8_Ifdhb5rHWZuwBgdCtCD_qp0DqZX0knMoiw29QkvPdg-2yB4RY-8B3TqVQLEJmW6oTas3Zpkx1y209TgXOQwSt-eOyGn85uteWrAYrZ0OCaD9g',
    online: true
  },
  {
    id: 2,
    name: 'Elena Rossi',
    hub: 'Tennis Hub',
    icon: 'sports-tennis',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8pc4criHwQ3IFAKaltSqkq2qWTrqUa57cNQ0ZwAMtxCcezZ0C5kKkm4aqfWQfprXopPl5wW840Xo-x1f2Y0mTWMjJeELWe7DJlEjDTi8gm2izqcur25-cZofHswIyTe1XUIISmvYRtPMACgZ3Ld_jS8qyLz-3hw2-75K43EOZnOJo9CYehfytzPM-2z9wog70PVvA8hXCHiMvPd84DNF7jKqxAmwJ9Z9QJ1-4pyVvPFI97htp0nw4Bw',
    online: false
  },
  {
    id: 3,
    name: 'Julian Vane',
    hub: 'Modern Art Hub',
    icon: 'palette',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdA9dF4WOfA_xgtLED9Rnadzfk7zQfdYN7jvcsEHcjr1TgDBZ0wzUM-vhFWZhcSz4v2ZHAc3YT4K2J8pZ9VrGtuoTTU-Row0DXtnanYOL7vLRHqdAdBW1tOhoIZo3gF4rbiscpUyrvflCluiDpvhsyY7AaRyedtHoa4S90ffQmTdLdNzL3zRW8s_RNr0DQNYyt7d5nHwwTaGyLKwpvIVfqL85p2MMO7Q7tYoUG7K7budqACDr1gj090g',
    online: false
  },
  {
    id: 4,
    name: 'Beatrice Thorne',
    hub: 'Wine Collectors',
    icon: 'history-edu',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBn10SAhgFYPqaESPpOFJM73v4yoVZYDCwZ4q2tEJNf-myCjTvM3VQ6p3txrhfXjh9ACB5j8SZqvpw5TR19h4PuEo7z8BOyX5TxKuMFdcs6dClZinSHgYFu54wBEaQ5J5CYQKx9Gg3YL0bi6Mw5Y2-me5M4SqWmgzvArVrN27XGY_Z8ovFA1tF64INkH4n776DZpWQnTlDqegdcbAw0IPbo9Z8CNyWjD2gdYJacT6dL0wC9-qHSAiKvsw',
    online: false
  }
];

export default function NewConversationScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.appBarSafe}>
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Ionicons name="close" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>Start Conversation</Text>
          <View style={{ width: 40 }} /> {/* Placeholder to balance title */}
        </View>
      </SafeAreaView>

      <View style={styles.content}>
        {/* Search */}
        <View style={styles.searchSection}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color="#75777e" />
            <TextInput 
              style={styles.searchInput}
              placeholder="Search Localites"
              placeholderTextColor="#75777e"
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <TouchableOpacity style={styles.startGroupBtn}>
            <Ionicons name="people" size={18} color="#ffffff" style={{marginRight: 8}} />
            <Text style={styles.startGroupBtnText}>START GROUP</Text>
          </TouchableOpacity>
        </View>

        {/* List */}
        <ScrollView style={styles.listArea} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionHeader}>SUGGESTED CONTACTS</Text>
          
          <View style={styles.grid}>
            {SUGGESTED_CONTACTS.map(contact => (
              <TouchableOpacity key={contact.id} style={styles.contactCard} onPress={() => navigation.navigate('ChatScreen1x1', { chatId: contact.id, title: contact.name })}>
                <View style={styles.avatarContainer}>
                  <Image source={{ uri: contact.imageUrl }} style={styles.avatarImg} />
                  {contact.online && <View style={styles.onlineDot} />}
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName} numberOfLines={1}>{contact.name}</Text>
                  <View style={styles.hubInfo}>
                    <MaterialIcons name={contact.icon} size={14} color="#775a19" />
                    <Text style={styles.hubText} numberOfLines={1}>{contact.hub}</Text>
                  </View>
                </View>
                <View style={styles.mailBtn}>
                  <Ionicons name="mail-outline" size={18} color="#000000" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  appBarSafe: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#eae8e7',
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  iconBtn: {
    padding: 8,
    marginLeft: -8,
  },
  appBarTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 20,
    color: '#000000',
  },
  content: {
    flex: 1,
    backgroundColor: '#fbf9f8',
  },
  searchSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eae8e7',
    backgroundColor: '#ffffff',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f3f3',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 16,
    color: '#1b1c1c',
  },
  startGroupBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    paddingVertical: 14,
    borderRadius: 8,
  },
  startGroupBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#ffffff',
    letterSpacing: 1,
  },
  listArea: {
    flex: 1,
    padding: 16,
  },
  sectionHeader: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#775a19',
    letterSpacing: 1,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'column',
    gap: 12,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eae8e7',
  },
  avatarContainer: {
    position: 'relative',
    width: 48,
    height: 48,
  },
  avatarImg: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  contactInfo: {
    flex: 1,
    marginLeft: 16,
  },
  contactName: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
    color: '#1b1c1c',
    marginBottom: 4,
  },
  hubInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  hubText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#75777e',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  mailBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#c5c6cd',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  }
});
