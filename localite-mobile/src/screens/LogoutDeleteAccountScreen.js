import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, Modal, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function LogoutDeleteAccountScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <MaterialIcons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Localite</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.avatarWrap}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXTMRG35lIXo6nrTCOc5ELJR2LYb_EpEWSUIHpTA5HvavIzXjOlVw6yM8yZWef0ak-4QZsw6IoQf711PuuH-V8wldBX_asOiq_6CkxwB2gYFaQYAK1PCu5L25LOiq9u16RaXN0as3J80IoeRDq3hJbu1f2myLxdYQvETk7KzBjut60S5OSXHWu499uyVyi7kG1xDwFzwP5BjuENlj0exMEYGf868HdYl7h3h0dJPvEYtJJ9_4iw8I1tw' }} 
              style={styles.avatarImg} 
            />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Page Header */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Account Sanctuary</Text>
          <Text style={styles.pageDesc}>
            Manage your presence within the Localite community with intentionality and care.
          </Text>
        </View>

        {/* Logout Option */}
        <TouchableOpacity style={styles.actionCard}>
          <View style={styles.actionCardLeft}>
            <View style={styles.iconCirclePrimary}>
              <MaterialIcons name="logout" size={24} color="#fff" />
            </View>
            <View>
              <Text style={styles.actionTitlePrimary}>SESSION</Text>
              <Text style={styles.actionDesc}>Sign out of this device</Text>
            </View>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#75777e" />
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerWrap}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>END OF JOURNEY</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Delete Option */}
        <TouchableOpacity style={styles.actionCardDanger} onPress={() => setModalVisible(true)}>
          <View style={styles.actionCardLeft}>
            <View style={styles.iconCircleDanger}>
              <MaterialIcons name="person-remove" size={24} color="#ba1a1a" />
            </View>
            <View>
              <Text style={styles.actionTitleDanger}>PERMANENCE</Text>
              <Text style={styles.actionDesc}>Terminate your Localite account</Text>
            </View>
          </View>
          <MaterialIcons name="warning" size={24} color="rgba(186, 26, 26, 0.4)" />
        </TouchableOpacity>

        {/* Decorative Asset */}
        <View style={styles.decorativeImageWrap}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCfdmNCerd9J4-Aa0I17n4Z_1tSKCv4E28kjBDVU0qXYU1C_YApjggJ89IzMpSET0Vvft7dmXLpSVFNAAj_4xb1oQg6wQo7LHJjCfiaEccQyhFZBrAm3FEbYU3Z3xNFx7jM0ckSdyms4RYSUQrsglBy_fewRyLQ-7x-cT7uqDvFbumFc1GhcwxRR6Z5XOR7Ta6EzdbYQ7iJu0e9Tbwv2HNd66bmlbe_ENprGEoE89WltvM1bIj2WlQ2A' }} 
            style={styles.decorativeImage} 
          />
          <View style={styles.decorativeOverlay} />
        </View>

      </ScrollView>

      {/* Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setModalVisible(false)}>
          <TouchableOpacity style={styles.modalContent} activeOpacity={1} onPress={() => {}}>
            <View style={styles.modalIconWrap}>
              <MaterialIcons name="priority-high" size={32} color="#ba1a1a" />
            </View>
            <Text style={styles.modalTitle}>Farewell, Peer?</Text>
            <Text style={styles.modalDesc}>Termination is absolute. By proceeding, you will forfeit:</Text>
            
            <View style={styles.consequencesBox}>
              <View style={styles.consequenceRow}>
                <MaterialIcons name="stars" size={16} color="#775a19" style={styles.consequenceIcon} />
                <Text style={styles.consequenceText}><Text style={styles.bold}>Prestigious Status:</Text> All earned credentials and community standing will be dissolved.</Text>
              </View>
              <View style={styles.consequenceRow}>
                <MaterialIcons name="hub" size={16} color="#775a19" style={styles.consequenceIcon} />
                <Text style={styles.consequenceText}><Text style={styles.bold}>Inner Circles:</Text> Your connections within local hubs will be permanently severed.</Text>
              </View>
              <View style={styles.consequenceRow}>
                <MaterialIcons name="history" size={16} color="#775a19" style={styles.consequenceIcon} />
                <Text style={styles.consequenceText}><Text style={styles.bold}>Legacy:</Text> Your curated event history and personal contributions will be erased.</Text>
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.confirmBtn}>
                <Text style={styles.confirmBtnText}>CONFIRM TERMINATION</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelBtnText}>RETAIN MY ACCOUNT</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.warningNote}>THIS ACTION CANNOT BE UNDONE</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

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
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    zIndex: 10,
    paddingTop: Platform.OS === 'android' ? 40 : 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: { padding: 4 },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    fontStyle: 'italic',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#c5c6cd',
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  pageHeader: {
    marginBottom: 32,
    alignItems: 'center',
  },
  pageTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
    marginBottom: 12,
    textAlign: 'center',
  },
  pageDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 300,
  },
  actionCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
    marginBottom: 24,
  },
  actionCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconCirclePrimary: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTitlePrimary: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#000',
    letterSpacing: 1,
    marginBottom: 4,
  },
  actionDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#1b1c1c',
  },
  dividerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    width: '100%',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#c5c6cd',
  },
  dividerText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 2,
  },
  actionCardDanger: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  iconCircleDanger: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffdad6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTitleDanger: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#ba1a1a',
    letterSpacing: 1,
    marginBottom: 4,
  },
  decorativeImageWrap: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 32,
    position: 'relative',
  },
  decorativeImage: {
    width: '100%',
    height: '100%',
    opacity: 0.4,
  },
  decorativeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(251, 249, 248, 0.2)',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 25, 47, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.1,
    shadowRadius: 32,
    elevation: 10,
  },
  modalIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ffdad6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    marginBottom: 12,
  },
  modalDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
    textAlign: 'center',
    marginBottom: 20,
  },
  consequencesBox: {
    width: '100%',
    backgroundColor: '#f5f3f3',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    marginBottom: 24,
  },
  consequenceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  consequenceIcon: {
    marginTop: 2,
  },
  consequenceText: {
    flex: 1,
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#1b1c1c',
    lineHeight: 18,
  },
  bold: {
    fontFamily: 'PlusJakartaSans-Bold',
  },
  modalActions: {
    width: '100%',
    gap: 12,
  },
  confirmBtn: {
    width: '100%',
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#fff',
    letterSpacing: 1,
  },
  cancelBtn: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#775a19',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cancelBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#775a19',
    letterSpacing: 1,
  },
  warningNote: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 2,
    marginTop: 16,
  }
});
