import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import SearchExploreScreen from '../screens/SearchExploreScreen';
import MapScreen from '../screens/MapScreen';
import CreateEventScreen from '../screens/CreateEventScreen';
import PeopleDiscoveryScreen from '../screens/PeopleDiscoveryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SplashScreen from '../screens/SplashScreen';
import WelcomeCarouselScreen from '../screens/WelcomeCarouselScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import EmailVerificationScreen from '../screens/EmailVerificationScreen';
import ChatScreen from '../screens/ChatScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import SearchExploreScreen from '../screens/SearchExploreScreen';
import MapScreen from '../screens/MapScreen';
import CreateEventScreen from '../screens/CreateEventScreen';
import PeopleDiscoveryScreen from '../screens/PeopleDiscoveryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SplashScreen from '../screens/SplashScreen';
import WelcomeCarouselScreen from '../screens/WelcomeCarouselScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import EmailVerificationScreen from '../screens/EmailVerificationScreen';
import ChatScreen from '../screens/ChatScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import DirectMessageScreen from '../screens/DirectMessageScreen';
import ScannerScreen from '../screens/ScannerScreen';
import FeedScreen from '../screens/FeedScreen';
import PublicProfileScreen from '../screens/PublicProfileScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import EventParticipantsScreen from '../screens/EventParticipantsScreen';
import MessagesInboxScreen from '../screens/MessagesInboxScreen';
import ChatScreen1x1 from '../screens/ChatScreen1x1';
import EventGroupChatScreen from '../screens/EventGroupChatScreen';
import NewConversationScreen from '../screens/NewConversationScreen';
import SettingsHomeScreen from '../screens/SettingsHomeScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import AccountSettingsScreen from '../screens/AccountSettingsScreen';
import NotificationSettingsScreen from '../screens/NotificationSettingsScreen';
import PrivacySettingsScreen from '../screens/PrivacySettingsScreen';
import SafetyCenterScreen from '../screens/SafetyCenterScreen';
import EmergencySOSScreen from '../screens/EmergencySOSScreen';
import VerificationCenterScreen from '../screens/VerificationCenterScreen';
import ReportUserScreen from '../screens/ReportUserScreen';
import CreateMatchScreen from '../screens/CreateMatchScreen';
import FindPlayersScreen from '../screens/FindPlayersScreen';
import JoinMatchScreen from '../screens/JoinMatchScreen';
import MatchLobbyScreen from '../screens/MatchLobbyScreen';
import LiveMatchScreen from '../screens/LiveMatchScreen';
import MatchHistoryScreen from '../screens/MatchHistoryScreen';
import TeamFormationScreen from '../screens/TeamFormationScreen';
import CricketDetailScreen from '../screens/CricketDetailScreen';
import SportsCategoriesScreen from '../screens/SportsCategoriesScreen';
import AttendanceCheckInScreen from '../screens/AttendanceCheckInScreen';
import TicketQRCodeScreen from '../screens/TicketQRCodeScreen';
import AttendeeManagementScreen from '../screens/AttendeeManagementScreen';
import LiveEventDashboardScreen from '../screens/LiveEventDashboardScreen';
import LiveEventPollScreen from '../screens/LiveEventPollScreen';
import LiveMapTrackingScreen from '../screens/LiveMapTrackingScreen';
import MessageRequestsScreen from '../screens/MessageRequestsScreen';
import VoiceNotesScreen from '../screens/VoiceNotesScreen';
import CreateEventBasicInfoScreen from '../screens/CreateEventBasicInfoScreen';
import CreateEventDateTimeScreen from '../screens/CreateEventDateTimeScreen';
import CreateEventLocationPickerScreen from '../screens/CreateEventLocationPickerScreen';
import CreateEventCapacityRulesScreen from '../screens/CreateEventCapacityRulesScreen';
import CreateEventPaymentSetupScreen from '../screens/CreateEventPaymentSetupScreen';
import CreateEventReviewPublishScreen from '../screens/CreateEventReviewPublishScreen';
import CreateEventAnalyticsScreen from '../screens/CreateEventAnalyticsScreen';
import OrganizerDashboardScreen from '../screens/OrganizerDashboardScreen';
import RevenueDashboardScreen from '../screens/RevenueDashboardScreen';
import EventInsightsScreen from '../screens/EventInsightsScreen';
import EventsListScreen from '../screens/EventsListScreen';
import MyEventsScreen from '../screens/MyEventsScreen';
import AvailabilityCalendarScreen from '../screens/AvailabilityCalendarScreen';
import EventTimelineUpdatesScreen from '../screens/EventTimelineUpdatesScreen';
import EventReminderDetailScreen from '../screens/EventReminderDetailScreen';
import NotificationPreferencesScreen from '../screens/NotificationPreferencesScreen';
import LocationSettingsScreen from '../screens/LocationSettingsScreen';
import DataStorageSettingsScreen from '../screens/DataStorageSettingsScreen';
import LogoutDeleteAccountScreen from '../screens/LogoutDeleteAccountScreen';
import PrestigeProgressDashboardScreen from '../screens/PrestigeProgressDashboardScreen';
import MomentumOfGraceStreaksScreen from '../screens/MomentumOfGraceStreaksScreen';
import TheHallOfHonorAchievementsScreen from '../screens/TheHallOfHonorAchievementsScreen';
import IDVerificationUploadScreen from '../screens/IDVerificationUploadScreen';
import SelfieVerificationScreen from '../screens/SelfieVerificationScreen';
import TrustedContactsSetupScreen from '../screens/TrustedContactsSetupScreen';
import VerifiedBadgeInfoScreen from '../screens/VerifiedBadgeInfoScreen';
import ReportEventScreen from '../screens/ReportEventScreen';
import BlockUserScreen from '../screens/BlockUserScreen';
import SafetyGuidelinesScreen from '../screens/SafetyGuidelinesScreen';
import ReputationReviewsScreen from '../screens/ReputationReviewsScreen';
import LocationServicesPromptScreen from '../screens/LocationServicesPromptScreen';
import PushPermissionSetupScreen from '../screens/PushPermissionSetupScreen';
import RestrictedAccessScreen from '../screens/RestrictedAccessScreen';
import OfflineErrorScreen from '../screens/OfflineErrorScreen';
import EmptyGatheringsScreen from '../screens/EmptyGatheringsScreen';
import LoadingStateScreen from '../screens/LoadingStateScreen';
import MediaViewerScreen from '../screens/MediaViewerScreen';
import SocialLinkingScreen from '../screens/SocialLinkingScreen';
import ExtendInvitationScreen from '../screens/ExtendInvitationScreen';
import MyActivityStatsScreen from '../screens/MyActivityStatsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Hubs') iconName = focused ? 'compass' : 'compass-outline';
          else if (route.name === 'Events') iconName = focused ? 'calendar' : 'calendar-outline';
          else if (route.name === 'Organize') iconName = focused ? 'add-circle' : 'add-circle-outline';
          else if (route.name === 'Social') iconName = focused ? 'people' : 'people-outline';
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#775a19', // Secondary gold
        tabBarInactiveTintColor: '#c5c6cd', // Outline variant
        tabBarStyle: {
          backgroundColor: '#f5f3f3', // Surface container low
          borderTopColor: 'rgba(10,25,47,0.05)',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
          position: 'absolute', // Floating effect
          bottom: 0,
          left: 0,
          right: 0,
          shadowColor: '#0a192f',
          shadowOffset: { width: 0, height: -8 },
          shadowOpacity: 0.05,
          shadowRadius: 24,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontFamily: 'PlusJakartaSans_700Bold',
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Hubs" component={HomeScreen} />
      <Tab.Screen name="Events" component={SearchExploreScreen} />
      <Tab.Screen name="Organize" component={CreateEventScreen} />
      <Tab.Screen name="Social" component={PeopleDiscoveryScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="WelcomeCarousel" component={WelcomeCarouselScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
        <Stack.Screen name="MainApp" component={MainTabNavigator} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="DirectMessage" component={DirectMessageScreen} />
        <Stack.Screen name="Scanner" component={ScannerScreen} />
        <Stack.Screen name="PublicProfile" component={PublicProfileScreen} />
        <Stack.Screen name="Analytics" component={AnalyticsScreen} />
        <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
        <Stack.Screen name="EventDetail" component={EventDetailScreen} />
        <Stack.Screen name="EventParticipants" component={EventParticipantsScreen} />
        <Stack.Screen name="MessagesInbox" component={MessagesInboxScreen} />
        <Stack.Screen name="ChatScreen1x1" component={ChatScreen1x1} />
        <Stack.Screen name="EventGroupChat" component={EventGroupChatScreen} />
        <Stack.Screen name="NewConversation" component={NewConversationScreen} />
        <Stack.Screen name="SettingsHome" component={SettingsHomeScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} />
        <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SafetyCenter" component={SafetyCenterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EmergencySOS" component={EmergencySOSScreen} options={{ headerShown: false, presentation: 'fullScreenModal' }} />
        <Stack.Screen name="VerificationCenter" component={VerificationCenterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ReportUser" component={ReportUserScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateMatch" component={CreateMatchScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FindPlayers" component={FindPlayersScreen} options={{ headerShown: false }} />
        <Stack.Screen name="JoinMatch" component={JoinMatchScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MatchLobby" component={MatchLobbyScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LiveMatch" component={LiveMatchScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MatchHistory" component={MatchHistoryScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TeamFormation" component={TeamFormationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CricketDetail" component={CricketDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SportsCategories" component={SportsCategoriesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AttendanceCheckIn" component={AttendanceCheckInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TicketQRCode" component={TicketQRCodeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AttendeeManagement" component={AttendeeManagementScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LiveEventDashboard" component={LiveEventDashboardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LiveEventPoll" component={LiveEventPollScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LiveMapTracking" component={LiveMapTrackingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MessageRequestsScreen" component={MessageRequestsScreen} />
        <Stack.Screen name="VoiceNotesScreen" component={VoiceNotesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateEventBasicInfo" component={CreateEventBasicInfoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateEventDateTime" component={CreateEventDateTimeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateEventLocationPicker" component={CreateEventLocationPickerScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateEventCapacityRules" component={CreateEventCapacityRulesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateEventPaymentSetup" component={CreateEventPaymentSetupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateEventReviewPublish" component={CreateEventReviewPublishScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateEventAnalytics" component={CreateEventAnalyticsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OrganizerDashboard" component={OrganizerDashboardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RevenueDashboard" component={RevenueDashboardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EventInsights" component={EventInsightsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EventsList" component={EventsListScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MyEvents" component={MyEventsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AvailabilityCalendar" component={AvailabilityCalendarScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EventTimelineUpdates" component={EventTimelineUpdatesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EventReminderDetail" component={EventReminderDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NotificationPreferences" component={NotificationPreferencesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LocationSettings" component={LocationSettingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DataStorageSettings" component={DataStorageSettingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LogoutDeleteAccount" component={LogoutDeleteAccountScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PrestigeProgress" component={PrestigeProgressDashboardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MomentumOfGrace" component={MomentumOfGraceStreaksScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TheHallOfHonor" component={TheHallOfHonorAchievementsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="IDVerificationUpload" component={IDVerificationUploadScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SelfieVerification" component={SelfieVerificationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TrustedContactsSetup" component={TrustedContactsSetupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="VerifiedBadgeInfo" component={VerifiedBadgeInfoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ReportEvent" component={ReportEventScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BlockUser" component={BlockUserScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SafetyGuidelines" component={SafetyGuidelinesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ReputationReviews" component={ReputationReviewsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LocationServicesPrompt" component={LocationServicesPromptScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PushPermissionSetup" component={PushPermissionSetupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RestrictedAccess" component={RestrictedAccessScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OfflineError" component={OfflineErrorScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EmptyGatherings" component={EmptyGatheringsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoadingState" component={LoadingStateScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MediaViewer" component={MediaViewerScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SocialLinking" component={SocialLinkingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ExtendInvitation" component={ExtendInvitationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MyActivityStats" component={MyActivityStatsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
