import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ReputationReviewsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <MaterialIcons name="location-on" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Localite</Text>
        </View>
        <View style={styles.avatarWrap}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDebXXqo6iGjbLWIAjgIsHo5BKIB4FOQ9a4jUISpeEtNruO3cMCvD1Ds3cTg5cyFyZztChZYaWakGpVGRC8BC8kEgl7UPowZPgeUDM9j44weBQpPU_y1b4T1N8dMc1ScJuas_TbPpI1e3wj_2Ta1nmRftvNUh2bbEbhXLurubEOMBChCWzcNCCn8tz3jZ9_1b82hEn_C_9JVosWsmEwRU6T7AU3ynsOYeTcaiTXegusBX9LPSku-ibVVg' }}
            style={styles.avatarImg}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Main Score Card */}
        <View style={styles.scoreCard}>
          <Text style={styles.scorePre}>COMMUNITY STANDING</Text>
          <Text style={styles.scoreTitle}>Reputation Score</Text>
          <View style={styles.scoreWrap}>
            <Text style={styles.scoreNum}>98</Text>
            <Text style={styles.scoreDenom}>/100</Text>
          </View>
          <View style={styles.badgeWrap}>
            <MaterialIcons name="verified" size={16} color="#775a19" />
            <Text style={styles.badgeText}>TOP-TIER CONTRIBUTOR</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.starsCard}>
            <View style={styles.starsWrap}>
              <MaterialIcons name="star" size={20} color="#775a19" />
              <MaterialIcons name="star" size={20} color="#775a19" />
              <MaterialIcons name="star" size={20} color="#775a19" />
              <MaterialIcons name="star" size={20} color="#775a19" />
              <MaterialIcons name="star-half" size={20} color="#775a19" />
            </View>
            <Text style={styles.starsScore}>4.9 / 5.0</Text>
            <Text style={styles.starsCount}>124 REVIEWS</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricPre}>RELIABILITY</Text>
            <Text style={styles.metricNum}>100%</Text>
            <MaterialIcons name="handshake" size={32} color="#fed488" style={styles.metricIcon} />
          </View>
        </View>

        {/* Reviews Header */}
        <View style={styles.reviewsHeader}>
          <Text style={styles.reviewsTitle}>Member Testimonials</Text>
          <TouchableOpacity>
            <Text style={styles.sortText}>SORT: NEWEST</Text>
          </TouchableOpacity>
        </View>

        {/* Reviews List */}
        <View style={styles.reviewsList}>
          {/* Review 1 */}
          <View style={styles.reviewCard}>
            <View style={styles.reviewCardHeader}>
              <View style={styles.reviewUser}>
                <Image 
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBa3xVLD2g-3E-rDT21wjImHX77jUti5l0c_UX9m7Z0CLzneKWMdpKwcEst_edySpY0txHWXRMrAQR1WxIR059AbgMHFCP2VKnFo23pTeMbMHINC6StkdzRqohHViSV-Sp2kscltABqH2-_WkN3tg4Nljz6IfiKPC46zmTOYOS7B4wPji5PEAPYCg7P0_FKfI1q4m5envoVfw01QGvUlzQ4jIoGvoQPFcNn4CMbdFn72M3fCIqLO9LQTA' }}
                  style={styles.reviewAvatar}
                />
                <View>
                  <Text style={styles.reviewName}>Julian Thorne</Text>
                  <Text style={styles.reviewDate}>OCTOBER 14, 2023</Text>
                </View>
              </View>
              <View style={styles.reviewStars}>
                <MaterialIcons name="star" size={12} color="#775a19" />
                <MaterialIcons name="star" size={12} color="#775a19" />
                <MaterialIcons name="star" size={12} color="#775a19" />
                <MaterialIcons name="star" size={12} color="#775a19" />
                <MaterialIcons name="star" size={12} color="#775a19" />
              </View>
            </View>
            <Text style={styles.reviewText}>
              "Great host for the tennis match! The coordination was seamless and the energy brought to the court was fantastic. Truly embodies the Localite spirit."
            </Text>
            <View style={styles.tagsRow}>
              <View style={styles.tagWrap}><Text style={styles.tagText}>#Tennis</Text></View>
              <View style={styles.tagWrap}><Text style={styles.tagText}>#Punctual</Text></View>
            </View>
          </View>

          {/* Review 2 */}
          <View style={styles.reviewCard}>
            <View style={styles.reviewCardHeader}>
              <View style={styles.reviewUser}>
                <Image 
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjeULbO6x7bkeRtA8G9rJ58VY7dhUem25JF8vOjlv9DdM4_Gydexvzbu-P2di-V4kirSOUV8v6winKtEDUJaJDWecfQOib4d-1obOpRFHuv39MniH5d8p383oafeLXr6E-0AcnoR4KJk5VTxynHn1S_T8d901yFDpkwAA8uPb4eGwUoLONWiA1yuR155yOxIBp9WG49AOQy2A-IhR9um1ZgGk0wbSOSCYvS60lkcNdYOpOlSryWI1BQA' }}
                  style={styles.reviewAvatar}
                />
                <View>
                  <Text style={styles.reviewName}>Elara Vance</Text>
                  <Text style={styles.reviewDate}>SEPTEMBER 28, 2023</Text>
                </View>
              </View>
              <View style={styles.reviewStars}>
                <MaterialIcons name="star" size={12} color="#775a19" />
                <MaterialIcons name="star" size={12} color="#775a19" />
                <MaterialIcons name="star" size={12} color="#775a19" />
                <MaterialIcons name="star" size={12} color="#775a19" />
                <MaterialIcons name="star" size={12} color="#775a19" />
              </View>
            </View>
            <Text style={styles.reviewText}>
              "Organized an incredible book club mixer. The choice of venue was inspired and the conversation was curated perfectly. Highly recommend joining any event they organize."
            </Text>
            <View style={styles.tagsRow}>
              <View style={styles.tagWrap}><Text style={styles.tagText}>#Literature</Text></View>
              <View style={styles.tagWrap}><Text style={styles.tagText}>#EliteHost</Text></View>
            </View>
          </View>

          {/* Review 3 */}
          <View style={styles.reviewCard}>
            <View style={styles.reviewCardHeader}>
              <View style={styles.reviewUser}>
                <Image 
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDx2ToPRyAncVGW8_TrBOFMm7CE_hvCp8-zn3jUuonBWBm2VIxwM75DRUww8_YjLlPrH8PFnVe-enIvPTx-RKH4KNq4PNBaej_n1SL1bMZEE5nKdqRPN28RW-iOBj8Yr7SC7pjV1JEbVsk-nBW3y4H-25nDaIJcAnVk1nZ1NDzPoWkykHdwtfBT66BDYwoIxKR5i63MefNLJnLwKzXI42PtPiM9vjvexnFEpC1cHFZZGSx3Rf1ylBGP9A' }}
                  style={styles.reviewAvatar}
                />
                <View>
                  <Text style={styles.reviewName}>Marcus Chen</Text>
                  <Text style={styles.reviewDate}>AUGUST 12, 2023</Text>
                </View>
              </View>
              <View style={styles.reviewStars}>
                <MaterialIcons name="star" size={12} color="#775a19" />
                <MaterialIcons name="star" size={12} color="#775a19" />
                <MaterialIcons name="star" size={12} color="#775a19" />
                <MaterialIcons name="star" size={12} color="#775a19" />
                <MaterialIcons name="star-border" size={12} color="#775a19" />
              </View>
            </View>
            <Text style={styles.reviewText}>
              "Consistently reliable and friendly. We've collaborated on three different neighborhood meetups and it's always a pleasure."
            </Text>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Nav Placeholder */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="explore" size={24} color="#44474d" />
          <Text style={styles.navItemText}>Hubs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="event-note" size={24} color="#44474d" />
          <Text style={styles.navItemText}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="add-circle" size={24} color="#44474d" />
          <Text style={styles.navItemText}>Organize</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="group" size={24} color="#775a19" />
          <Text style={[styles.navItemText, { color: '#775a19' }]}>Social</Text>
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
    backgroundColor: '#fbf9f8',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.05,
    shadowRadius: 32,
    elevation: 4,
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
    letterSpacing: -0.5,
  },
  avatarWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 24,
    paddingBottom: 100, // For bottom nav
  },
  scoreCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.06,
    shadowRadius: 32,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(197, 198, 205, 0.1)',
    marginBottom: 16,
  },
  scorePre: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#44474d',
    letterSpacing: 1,
    marginBottom: 8,
  },
  scoreTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#000',
    marginBottom: 24,
  },
  scoreWrap: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 16,
  },
  scoreNum: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 48,
    color: '#000',
    lineHeight: 56,
  },
  scoreDenom: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#75777e',
  },
  badgeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badgeText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#775a19',
    letterSpacing: 1,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  starsCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.06,
    shadowRadius: 32,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(197, 198, 205, 0.1)',
  },
  starsWrap: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  starsScore: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    marginBottom: 4,
  },
  starsCount: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#44474d',
    letterSpacing: 1,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#000',
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.06,
    shadowRadius: 32,
    elevation: 4,
    position: 'relative',
    overflow: 'hidden',
  },
  metricPre: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 1,
    marginBottom: 4,
  },
  metricNum: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#fff',
  },
  metricIcon: {
    position: 'absolute',
    right: 16,
    top: 24,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  reviewsTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
  },
  sortText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#775a19',
    letterSpacing: 1,
    textDecorationLine: 'underline',
  },
  reviewsList: {
    gap: 16,
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#0a192f',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.06,
    shadowRadius: 32,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(197, 198, 205, 0.05)',
  },
  reviewCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  reviewUser: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  reviewAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  reviewName: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    color: '#000',
    marginBottom: 2,
  },
  reviewDate: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#75777e',
    letterSpacing: 1,
  },
  reviewStars: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#44474d',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(197, 198, 205, 0.2)',
  },
  tagWrap: {
    backgroundColor: '#f5f3f3',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  tagText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: '#44474d',
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
    borderTopWidth: 1,
    borderTopColor: 'rgba(197, 198, 205, 0.3)',
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
