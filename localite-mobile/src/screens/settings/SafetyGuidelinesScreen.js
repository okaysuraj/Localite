import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SafetyGuidelinesScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <MaterialIcons name="menu" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Royal Assemblage</Text>
        <View style={styles.avatarWrap}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBerB-u7VGnEL574wjiKMtuqz2QCvlmVrhyqM7GtRqO4w20fTxwKXNSJ0r2sYHLXUu-SJs-yZ0jNtkhxQoFB4yXO3qhtOrwIxwxl2gSJZelD8imuxmdYO7OjC70WSZwX1TAVeSQhyfNmWQd84egTDYDsw9XyM3g796fMtVEJ8-hpYQxkgwX6i3mWXKJlhhr71g_xu4NEX3JpCYqW1zRMcg3ynzqz1hhYsEEK5Iy1Uo0ADLoe0qpCazsmA' }}
            style={styles.avatarImg}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.heroPre}>THE LOCALITE PROTOCOL</Text>
          <Text style={styles.heroTitle}>Safety and Etiquette in the Third Place</Text>
          <View style={styles.heroDivider} />
          <Text style={styles.heroDesc}>
            Our community is built on the pillars of mutual respect, intentional presence, and the sanctity of shared environments.
          </Text>
        </View>

        {/* Section 1 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Respect the Third Place</Text>
          <Text style={styles.sectionText}>
            The Third Place is a sanctuary between labor and domesticity. It is a shared canvas where diverse stories intersect. When entering a Localite-curated space, one must acknowledge that their presence affects the collective equilibrium. Respecting the physical environment and the emotional boundaries of others is not merely a rule, but a requirement of membership.
          </Text>
          <View style={styles.bulletList}>
            <View style={styles.bulletItem}>
              <MaterialIcons name="verified" size={20} color="#775a19" />
              <Text style={styles.bulletText}>Maintain a curated volume; your conversation should remain within the immediate circle of your companions.</Text>
            </View>
            <View style={styles.bulletItem}>
              <MaterialIcons name="verified" size={20} color="#775a19" />
              <Text style={styles.bulletText}>Capture memories with discretion. Photography of other members without explicit consent is strictly prohibited.</Text>
            </View>
            <View style={styles.bulletItem}>
              <MaterialIcons name="verified" size={20} color="#775a19" />
              <Text style={styles.bulletText}>Treat the venue and its staff with the same reverence you would afford a host in their private residence.</Text>
            </View>
          </View>
        </View>

        {/* Feature Image */}
        <View style={styles.featureImageWrap}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8lKwzvhF4ACk_6zFfA0UmUx-wgynV6yssOndLXjq_c6F8xdcvELdLe7o77mMVJlQiZHihiV4eMI2URvxFOfeW0vxT6PZ_sBf230kbNmpjDUz0ULgnJmuTY1rGACQpNa78ym7V3xu-3x2JkGOyigbQ8E6rzBDnu5MIjQRSChq9DBhsPPE3NI9gmnQQcaAtywoLdGGPcdrUCpw_D8rCOosE45jhdgN1tKW4nx9JcxYLypwi7hV06OlM0A' }}
            style={styles.featureImage}
          />
          <View style={styles.featureOverlay}>
            <Text style={styles.featureQuote}>"True nobility is found in the way we honor the spaces we share."</Text>
          </View>
        </View>

        {/* Section 2 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Verification Standards</Text>
          <Text style={styles.sectionText}>
            To maintain the integrity of our gatherings, every Localite member undergoes a multi-step verification process. This ensures that every individual you meet is a verified steward of our shared values.
          </Text>
          <View style={styles.cardGrid}>
            <View style={styles.infoCard}>
              <MaterialIcons name="fingerprint" size={28} color="#775a19" style={styles.cardIcon} />
              <Text style={styles.cardTitle}>IDENTITY SHIELD</Text>
              <Text style={styles.cardDesc}>Multi-factor identity verification via encrypted government ID matching for all tiers.</Text>
            </View>
            <View style={styles.infoCard}>
              <MaterialIcons name="stars" size={28} color="#775a19" style={styles.cardIcon} />
              <Text style={styles.cardTitle}>PEER CREDIBILITY</Text>
              <Text style={styles.cardDesc}>A reputation-based system where community stewardship leads to increased access.</Text>
            </View>
          </View>
        </View>

        {/* Section 3 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safe Transitions</Text>
          <Text style={styles.sectionText}>
            Safety doesn't end at the venue door. We provide integrated tools to ensure your journey to and from our gatherings is as seamless and secure as the event itself.
          </Text>
          <View style={styles.featureCard}>
            <View style={styles.featureCardHeader}>
              <View style={styles.featureCardHeaderLeft}>
                <View style={styles.featureCardIconWrap}>
                  <MaterialIcons name="share-location" size={20} color="#785a1a" />
                </View>
                <View>
                  <Text style={styles.featureCardTitle}>GUARDIAN CIRCLE</Text>
                  <Text style={styles.featureCardSub}>Active during event hours</Text>
                </View>
              </View>
              <View style={styles.badgeWrap}>
                <Text style={styles.badgeText}>ENABLED</Text>
              </View>
            </View>
            <Text style={styles.featureCardDesc}>
              Automatically share your real-time location with trusted community members or our concierge team until you reach your destination.
            </Text>
            <TouchableOpacity style={styles.actionBtn}>
              <Text style={styles.actionBtnText}>CONFIGURE GUARDIAN</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* CTA */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to Assemble?</Text>
          <Text style={styles.ctaDesc}>
            By proceeding, you acknowledge that you have read and understood the Protocol. Membership is a privilege of conduct, not just subscription.
          </Text>
          <View style={styles.ctaActions}>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.goBack()}>
              <Text style={styles.primaryBtnText}>I ACCEPT THE PROTOCOL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryBtn}>
              <Text style={styles.secondaryBtnText}>VIEW FULL BYLAWS</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Nav Placeholder */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="event-upcoming" size={24} color="#44474d" />
          <Text style={styles.navItemText}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="explore" size={24} color="#44474d" />
          <Text style={styles.navItemText}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="verified" size={24} color="#775a19" />
          <Text style={[styles.navItemText, { color: '#775a19' }]}>Protocol</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="person" size={24} color="#44474d" />
          <Text style={styles.navItemText}>Profile</Text>
        </TouchableOpacity>
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
    backgroundColor: 'rgba(251, 249, 248, 0.85)',
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
    padding: 24,
    paddingBottom: 100, // For bottom nav
  },
  hero: {
    alignItems: 'center',
    marginBottom: 48,
  },
  heroPre: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#775a19',
    letterSpacing: 2,
    marginBottom: 8,
  },
  heroTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 40,
  },
  heroDivider: {
    width: 96,
    height: 1,
    backgroundColor: '#775a19',
    marginBottom: 24,
  },
  heroDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 18,
    color: '#44474d',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 28,
  },
  section: {
    marginBottom: 48,
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    marginBottom: 24,
  },
  sectionText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    lineHeight: 24,
    marginBottom: 24,
  },
  bulletList: {
    gap: 16,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  bulletText: {
    flex: 1,
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    lineHeight: 24,
  },
  featureImageWrap: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 48,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.05,
    shadowRadius: 32,
    elevation: 4,
  },
  featureImage: {
    width: '100%',
    height: '100%',
  },
  featureOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    padding: 24,
  },
  featureQuote: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#fff',
    fontStyle: 'italic',
  },
  cardGrid: {
    gap: 24,
  },
  infoCard: {
    backgroundColor: '#f5f3f3',
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(197, 198, 205, 0.3)',
  },
  cardIcon: {
    marginBottom: 8,
  },
  cardTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#000',
    letterSpacing: 2,
    marginBottom: 8,
  },
  cardDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
    lineHeight: 20,
  },
  featureCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.05,
    shadowRadius: 32,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e4e2e2',
  },
  featureCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  featureCardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureCardIconWrap: {
    backgroundColor: '#fed488',
    padding: 8,
    borderRadius: 20,
  },
  featureCardTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#000',
    letterSpacing: 2,
  },
  featureCardSub: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#44474d',
  },
  badgeWrap: {
    backgroundColor: '#ffdea5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  badgeText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#261900',
    letterSpacing: 1,
  },
  featureCardDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#44474d',
    lineHeight: 20,
    marginBottom: 16,
  },
  actionBtn: {
    width: '100%',
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#fff',
    letterSpacing: 1,
  },
  ctaSection: {
    paddingTop: 48,
    borderTopWidth: 1,
    borderTopColor: '#c5c6cd',
    alignItems: 'center',
  },
  ctaTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
    marginBottom: 16,
  },
  ctaDesc: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  ctaActions: {
    width: '100%',
    gap: 16,
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  primaryBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#fff',
    letterSpacing: 2,
  },
  secondaryBtn: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#775a19',
  },
  secondaryBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#775a19',
    letterSpacing: 2,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 10,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItemText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
    marginTop: 4,
  }
});
