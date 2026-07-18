import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function BlockUserScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Royal Assemblage</Text>
        <View style={styles.avatarWrap}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMCP-UHDdlq4RgyaYMIhduDSlqg4_hCnjzUJuGnTeApYu9k5Uu5HCwBWjfTENhCCkMIGAJht4QaQmO0HQ-id1ACOXsPkJW5SFGt0tJSJXnReG7tATSYFuzOeSDxeEAV22wpuHy87u36Kwa_E59f2JUjeOx5eO-BGP3BjNtSIW0VJxcX8-J0zMExfnpxUk3Bc5bhOXsBTIiNJlZ5kPJZGQ37nBzHmsztkgA5MOhB6QUKK945z6mq8q8gw' }}
            style={styles.avatarImg}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.modalCard}>
          {/* Top Border Detail */}
          <View style={styles.topGradient} />
          
          <View style={styles.iconWrap}>
            <MaterialIcons name="block" size={48} color="#ba1a1a" />
          </View>

          <Text style={styles.title}>Are you sure you want to block Julian Vance?</Text>
          <Text style={styles.desc}>
            By confirming this action, Julian will be restricted from viewing your profile, attending your private assemblies, or initiating messages.
          </Text>

          {/* User Context Card */}
          <View style={styles.userCard}>
            <View style={styles.userImgWrap}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbj07cEXDCalIbjmrQgxyWPkHCwVPGrCcXrwkyKjTX9OGuFiwLXLtXiAV-ihMvWVg9x5WftvMTywvGHgkURO5iWjZvWY-i4YyOulEpd9WCZBi66PHuri7lk8b73zYOO3yAC_sQ_NOk3QkzbPITNGxr2AKCJmuC9c5viqu9dP_mB7RGxumCo8MLPq5eXi9CHimf6Zkfrs2bsBIVKxgV-w8ISJYl9hi8fOaQIO0-2fouXW0GeUMRiYAaGA' }}
                style={styles.userImg}
              />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userPre}>MEMBER PROFILE</Text>
              <Text style={styles.userName}>Julian Vance</Text>
              <Text style={styles.userSub}>Inner Circle Member • Since 2022</Text>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actionsWrap}>
            <TouchableOpacity style={styles.blockBtn} onPress={() => navigation.goBack()}>
              <Text style={styles.blockBtnText}>BLOCK AND REMOVE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
              <Text style={styles.cancelBtnText}>CANCEL</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.noteText}>
            This action is reversible within your <Text style={styles.linkText}>Privacy Settings</Text>.
          </Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerBrand}>LOCALITE PREMIUM CONCIERGE</Text>
        <View style={styles.footerLinks}>
          <Text style={styles.footerLink}>Privacy Protocol</Text>
          <Text style={styles.footerLink}>Safety Standards</Text>
        </View>
      </View>
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
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#fbf9f8',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.05,
    shadowRadius: 32,
    elevation: 4,
    zIndex: 10,
    paddingTop: Platform.OS === 'android' ? 40 : 12,
  },
  iconBtn: { padding: 4 },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    letterSpacing: -0.5,
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
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.05,
    shadowRadius: 32,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#eae8e7',
    position: 'relative',
    overflow: 'hidden',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#775a19',
  },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e4e2e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 28,
    color: '#000',
    textAlign: 'center',
    marginBottom: 12,
  },
  desc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
    textAlign: 'center',
    lineHeight: 20,
  },
  userCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#fbf9f8',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(197, 198, 205, 0.3)',
    marginTop: 24,
  },
  userImgWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
  },
  userImg: {
    width: '100%',
    height: '100%',
  },
  userInfo: {
    flex: 1,
  },
  userPre: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
    marginBottom: 2,
  },
  userName: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    color: '#000',
    marginBottom: 2,
  },
  userSub: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#44474d',
  },
  actionsWrap: {
    width: '100%',
    gap: 12,
    marginTop: 32,
  },
  blockBtn: {
    width: '100%',
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  blockBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#fff',
    letterSpacing: 2,
  },
  cancelBtn: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#775a19',
  },
  cancelBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#775a19',
    letterSpacing: 2,
  },
  noteText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 11,
    color: '#75777e',
    marginTop: 24,
    textAlign: 'center',
  },
  linkText: {
    color: '#775a19',
    textDecorationLine: 'underline',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerBrand: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#c5c6cd',
    letterSpacing: 1,
    marginBottom: 8,
  },
  footerLinks: {
    flexDirection: 'row',
    gap: 16,
  },
  footerLink: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#75777e',
  }
});
