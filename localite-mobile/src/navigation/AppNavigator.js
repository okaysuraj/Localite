import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/shared/HomeScreen';
import DiscoverScreen from '../screens/shared/DiscoverScreen';
import SearchExploreScreen from '../screens/shared/SearchExploreScreen';
import MapScreen from '../screens/shared/MapScreen';
import CreateEventScreen from '../screens/events/CreateEventScreen';
import PeopleDiscoveryScreen from '../screens/network/PeopleDiscoveryScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SplashScreen from '../screens/auth/SplashScreen';
import WelcomeCarouselScreen from '../screens/auth/WelcomeCarouselScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import EmailVerificationScreen from '../screens/auth/EmailVerificationScreen';
import ChatScreen from '../screens/chat/ChatScreen';
import NotificationsScreen from '../screens/shared/NotificationsScreen';
import DirectMessageScreen from '../screens/chat/DirectMessageScreen';
import ScannerScreen from '../screens/shared/ScannerScreen';
import FeedScreen from '../screens/shared/FeedScreen';
import PublicProfileScreen from '../screens/profile/PublicProfileScreen';
import AnalyticsScreen from '../screens/dashboard/AnalyticsScreen';
import LeaderboardScreen from '../screens/network/LeaderboardScreen';
import EventDetailScreen from '../screens/events/EventDetailScreen';
import EventParticipantsScreen from '../screens/events/EventParticipantsScreen';
import MessagesInboxScreen from '../screens/chat/MessagesInboxScreen';
import ChatScreen1x1 from '../screens/chat/ChatScreen1x1';
import EventGroupChatScreen from '../screens/chat/EventGroupChatScreen';
import NewConversationScreen from '../screens/chat/NewConversationScreen';
import SettingsHomeScreen from '../screens/settings/SettingsHomeScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import AccountSettingsScreen from '../screens/profile/AccountSettingsScreen';
import NotificationSettingsScreen from '../screens/settings/NotificationSettingsScreen';
import PrivacySettingsScreen from '../screens/settings/PrivacySettingsScreen';
import SafetyCenterScreen from '../screens/settings/SafetyCenterScreen';
import EmergencySOSScreen from '../screens/settings/EmergencySOSScreen';
import VerificationCenterScreen from '../screens/auth/VerificationCenterScreen';
import ReportUserScreen from '../screens/profile/ReportUserScreen';
import CreateMatchScreen from '../screens/events/CreateMatchScreen';
import FindPlayersScreen from '../screens/shared/FindPlayersScreen';
import JoinMatchScreen from '../screens/matches/JoinMatchScreen';
import MatchLobbyScreen from '../screens/matches/MatchLobbyScreen';
import LiveMatchScreen from '../screens/matches/LiveMatchScreen';
import MatchHistoryScreen from '../screens/matches/MatchHistoryScreen';
import TeamFormationScreen from '../screens/matches/TeamFormationScreen';
import CricketDetailScreen from '../screens/matches/CricketDetailScreen';
import SportsCategoriesScreen from '../screens/shared/SportsCategoriesScreen';
import AttendanceCheckInScreen from '../screens/events/AttendanceCheckInScreen';
import TicketQRCodeScreen from '../screens/matches/TicketQRCodeScreen';
import AttendeeManagementScreen from '../screens/events/AttendeeManagementScreen';
import LiveEventDashboardScreen from '../screens/events/LiveEventDashboardScreen';
import LiveEventPollScreen from '../screens/events/LiveEventPollScreen';
import LiveMapTrackingScreen from '../screens/matches/LiveMapTrackingScreen';
import MessageRequestsScreen from '../screens/chat/MessageRequestsScreen';
import VoiceNotesScreen from '../screens/chat/VoiceNotesScreen';
import CreateEventBasicInfoScreen from '../screens/events/CreateEventBasicInfoScreen';
import CreateEventDateTimeScreen from '../screens/events/CreateEventDateTimeScreen';
import CreateEventLocationPickerScreen from '../screens/events/CreateEventLocationPickerScreen';
import CreateEventCapacityRulesScreen from '../screens/events/CreateEventCapacityRulesScreen';
import CreateEventPaymentSetupScreen from '../screens/events/CreateEventPaymentSetupScreen';
import CreateEventReviewPublishScreen from '../screens/events/CreateEventReviewPublishScreen';
import CreateEventAnalyticsScreen from '../screens/events/CreateEventAnalyticsScreen';
import OrganizerDashboardScreen from '../screens/dashboard/OrganizerDashboardScreen';
import RevenueDashboardScreen from '../screens/dashboard/RevenueDashboardScreen';
import EventInsightsScreen from '../screens/events/EventInsightsScreen';
import EventsListScreen from '../screens/shared/EventsListScreen';
import MyEventsScreen from '../screens/events/MyEventsScreen';
import AvailabilityCalendarScreen from '../screens/shared/AvailabilityCalendarScreen';
import EventTimelineUpdatesScreen from '../screens/events/EventTimelineUpdatesScreen';
import EventReminderDetailScreen from '../screens/events/EventReminderDetailScreen';
import NotificationPreferencesScreen from '../screens/settings/NotificationPreferencesScreen';
import LocationSettingsScreen from '../screens/settings/LocationSettingsScreen';
import DataStorageSettingsScreen from '../screens/settings/DataStorageSettingsScreen';
import LogoutDeleteAccountScreen from '../screens/shared/LogoutDeleteAccountScreen';
import PrestigeProgressDashboardScreen from '../screens/network/PrestigeProgressDashboardScreen';
import MomentumOfGraceStreaksScreen from '../screens/network/MomentumOfGraceStreaksScreen';
import TheHallOfHonorAchievementsScreen from '../screens/network/TheHallOfHonorAchievementsScreen';
import IDVerificationUploadScreen from '../screens/auth/IDVerificationUploadScreen';
import SelfieVerificationScreen from '../screens/auth/SelfieVerificationScreen';
import TrustedContactsSetupScreen from '../screens/settings/TrustedContactsSetupScreen';
import VerifiedBadgeInfoScreen from '../screens/profile/VerifiedBadgeInfoScreen';
import ReportEventScreen from '../screens/events/ReportEventScreen';
import BlockUserScreen from '../screens/profile/BlockUserScreen';
import SafetyGuidelinesScreen from '../screens/settings/SafetyGuidelinesScreen';
import ReputationReviewsScreen from '../screens/network/ReputationReviewsScreen';
import LocationServicesPromptScreen from '../screens/settings/LocationServicesPromptScreen';
import PushPermissionSetupScreen from '../screens/settings/PushPermissionSetupScreen';
import RestrictedAccessScreen from '../screens/shared/RestrictedAccessScreen';
import OfflineErrorScreen from '../screens/shared/OfflineErrorScreen';
import EmptyGatheringsScreen from '../screens/events/EmptyGatheringsScreen';
import LoadingStateScreen from '../screens/shared/LoadingStateScreen';
import MediaViewerScreen from '../screens/shared/MediaViewerScreen';
import SocialLinkingScreen from '../screens/profile/SocialLinkingScreen';
import ExtendInvitationScreen from '../screens/network/ExtendInvitationScreen';
import MyActivityStatsScreen from '../screens/dashboard/MyActivityStatsScreen';

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
