import MainTabs from './MainTabs';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import DiscoverScreen from '../screens/shared/DiscoverScreen';
import MapScreen from '../screens/shared/MapScreen';
import SplashScreen from '../screens/auth/SplashScreen';
import WelcomeCarouselScreen from '../screens/auth/WelcomeCarouselScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import EmailVerificationScreen from '../screens/auth/EmailVerificationScreen';
import ChatScreen from '../screens/chat/ChatScreen';
import NotificationsScreen from '../screens/shared/NotificationsScreen';
import DirectMessageScreen from '../screens/chat/DirectMessageScreen';
import ScannerScreen from '../screens/shared/ScannerScreen';

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
import AdminDashboardScreen from '../screens/dashboard/AdminDashboardScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="WelcomeCarousel" component={WelcomeCarouselScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
        <Stack.Screen name="MainApp" component={MainTabs} />
        <Stack.Screen name="Discover" component={DiscoverScreen} />
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
        <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
        <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} />
        <Stack.Screen name="SafetyCenter" component={SafetyCenterScreen} />
        <Stack.Screen
          name="EmergencySOS"
          component={EmergencySOSScreen}
          options={{ presentation: 'fullScreenModal' }}
        />
        <Stack.Screen name="VerificationCenter" component={VerificationCenterScreen} />
        <Stack.Screen name="ReportUser" component={ReportUserScreen} />
        <Stack.Screen name="CreateMatch" component={CreateMatchScreen} />
        <Stack.Screen name="FindPlayers" component={FindPlayersScreen} />
        <Stack.Screen name="JoinMatch" component={JoinMatchScreen} />
        <Stack.Screen name="MatchLobby" component={MatchLobbyScreen} />
        <Stack.Screen name="LiveMatch" component={LiveMatchScreen} />
        <Stack.Screen name="MatchHistory" component={MatchHistoryScreen} />
        <Stack.Screen name="TeamFormation" component={TeamFormationScreen} />
        <Stack.Screen name="CricketDetail" component={CricketDetailScreen} />
        <Stack.Screen name="SportsCategories" component={SportsCategoriesScreen} />
        <Stack.Screen name="AttendanceCheckIn" component={AttendanceCheckInScreen} />
        <Stack.Screen name="TicketQRCode" component={TicketQRCodeScreen} />
        <Stack.Screen name="AttendeeManagement" component={AttendeeManagementScreen} />
        <Stack.Screen name="LiveEventDashboard" component={LiveEventDashboardScreen} />
        <Stack.Screen name="LiveEventPoll" component={LiveEventPollScreen} />
        <Stack.Screen name="LiveMapTracking" component={LiveMapTrackingScreen} />
        <Stack.Screen name="MessageRequestsScreen" component={MessageRequestsScreen} />
        <Stack.Screen name="VoiceNotesScreen" component={VoiceNotesScreen} />
        <Stack.Screen name="CreateEventBasicInfo" component={CreateEventBasicInfoScreen} />
        <Stack.Screen name="CreateEventDateTime" component={CreateEventDateTimeScreen} />
        <Stack.Screen name="CreateEventLocationPicker" component={CreateEventLocationPickerScreen} />
        <Stack.Screen name="CreateEventCapacityRules" component={CreateEventCapacityRulesScreen} />
        <Stack.Screen name="CreateEventPaymentSetup" component={CreateEventPaymentSetupScreen} />
        <Stack.Screen name="CreateEventReviewPublish" component={CreateEventReviewPublishScreen} />
        <Stack.Screen name="CreateEventAnalytics" component={CreateEventAnalyticsScreen} />
        <Stack.Screen name="OrganizerDashboard" component={OrganizerDashboardScreen} />
        <Stack.Screen name="RevenueDashboard" component={RevenueDashboardScreen} />
        <Stack.Screen name="EventInsights" component={EventInsightsScreen} />
        <Stack.Screen name="EventsList" component={EventsListScreen} />
        <Stack.Screen name="MyEvents" component={MyEventsScreen} />
        <Stack.Screen name="AvailabilityCalendar" component={AvailabilityCalendarScreen} />
        <Stack.Screen name="EventTimelineUpdates" component={EventTimelineUpdatesScreen} />
        <Stack.Screen name="EventReminderDetail" component={EventReminderDetailScreen} />
        <Stack.Screen name="NotificationPreferences" component={NotificationPreferencesScreen} />
        <Stack.Screen name="LocationSettings" component={LocationSettingsScreen} />
        <Stack.Screen name="DataStorageSettings" component={DataStorageSettingsScreen} />
        <Stack.Screen name="LogoutDeleteAccount" component={LogoutDeleteAccountScreen} />
        <Stack.Screen name="PrestigeProgress" component={PrestigeProgressDashboardScreen} />
        <Stack.Screen name="MomentumOfGrace" component={MomentumOfGraceStreaksScreen} />
        <Stack.Screen name="TheHallOfHonor" component={TheHallOfHonorAchievementsScreen} />
        <Stack.Screen name="IDVerificationUpload" component={IDVerificationUploadScreen} />
        <Stack.Screen name="SelfieVerification" component={SelfieVerificationScreen} />
        <Stack.Screen name="TrustedContactsSetup" component={TrustedContactsSetupScreen} />
        <Stack.Screen name="VerifiedBadgeInfo" component={VerifiedBadgeInfoScreen} />
        <Stack.Screen name="ReportEvent" component={ReportEventScreen} />
        <Stack.Screen name="BlockUser" component={BlockUserScreen} />
        <Stack.Screen name="SafetyGuidelines" component={SafetyGuidelinesScreen} />
        <Stack.Screen name="ReputationReviews" component={ReputationReviewsScreen} />
        <Stack.Screen name="LocationServicesPrompt" component={LocationServicesPromptScreen} />
        <Stack.Screen name="PushPermissionSetup" component={PushPermissionSetupScreen} />
        <Stack.Screen name="RestrictedAccess" component={RestrictedAccessScreen} />
        <Stack.Screen name="OfflineError" component={OfflineErrorScreen} />
        <Stack.Screen name="EmptyGatherings" component={EmptyGatheringsScreen} />
        <Stack.Screen name="LoadingState" component={LoadingStateScreen} />
        <Stack.Screen name="MediaViewer" component={MediaViewerScreen} />
        <Stack.Screen name="SocialLinking" component={SocialLinkingScreen} />
        <Stack.Screen name="ExtendInvitation" component={ExtendInvitationScreen} />
        <Stack.Screen name="MyActivityStats" component={MyActivityStatsScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
