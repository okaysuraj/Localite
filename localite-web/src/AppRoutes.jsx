import { lazy } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const ExplorePage = lazy(() => import('./pages/shared/ExplorePage'));
const FeedPage = lazy(() => import('./pages/shared/FeedPage'));
const NotificationsPage = lazy(() => import('./pages/shared/NotificationsPage'));
const MapPage = lazy(() => import('./pages/shared/MapPage'));
const SearchPage = lazy(() => import('./pages/shared/SearchPage'));
const CategoriesPage = lazy(() => import('./pages/shared/CategoriesPage'));
const PeopleDiscoveryPage = lazy(() => import('./pages/network/PeopleDiscoveryPage'));
const EmptyStatePage = lazy(() => import('./pages/shared/EmptyStatePage'));
const ProfilePage = lazy(() => import('./pages/profile/ProfilePage'));
const SplashPage = lazy(() => import('./pages/auth/SplashPage'));
const WelcomeCarouselPage = lazy(() => import('./pages/auth/WelcomeCarouselPage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const SignupPage = lazy(() => import('./pages/auth/SignupPage'));
const EmailVerificationPage = lazy(() => import('./pages/auth/EmailVerificationPage'));
const AnalyticsDashboard = lazy(() => import('./pages/dashboard/AnalyticsDashboard'));
const LeaderboardPage = lazy(() => import('./pages/network/LeaderboardPage'));
const AdminDashboard = lazy(() => import('./pages/dashboard/AdminDashboard'));
const MessagesPage = lazy(() => import('./pages/chat/MessagesPage'));
const EventDetailPage = lazy(() => import('./pages/events/EventDetailPage'));
const CreateEventWizard = lazy(() => import('./pages/events/CreateEventWizard'));
const EventParticipantsPage = lazy(() => import('./pages/events/EventParticipantsPage'));
const EventGroupChatPage = lazy(() => import('./pages/chat/EventGroupChatPage'));
const SettingsHomePage = lazy(() => import('./pages/settings/SettingsHomePage'));
const EditProfilePage = lazy(() => import('./pages/profile/EditProfilePage'));
const AccountSettingsPage = lazy(() => import('./pages/profile/AccountSettingsPage'));
const NotificationSettingsPage = lazy(() => import('./pages/settings/NotificationSettingsPage'));
const PrivacySettingsPage = lazy(() => import('./pages/settings/PrivacySettingsPage'));
const SafetyCenterPage = lazy(() => import('./pages/settings/SafetyCenterPage'));
const EmergencySOSPage = lazy(() => import('./pages/settings/EmergencySOSPage'));
const VerificationCenterPage = lazy(() => import('./pages/auth/VerificationCenterPage'));
const ReportMemberPage = lazy(() => import('./pages/profile/ReportMemberPage'));
const CreateMatchPage = lazy(() => import('./pages/events/CreateMatchPage'));
const FindPlayersPage = lazy(() => import('./pages/shared/FindPlayersPage'));
const JoinMatchPage = lazy(() => import('./pages/matches/JoinMatchPage'));
const MatchLobbyPage = lazy(() => import('./pages/matches/MatchLobbyPage'));
const LiveMatchPage = lazy(() => import('./pages/matches/LiveMatchPage'));
const MatchHistoryPage = lazy(() => import('./pages/matches/MatchHistoryPage'));
const TeamFormationPage = lazy(() => import('./pages/matches/TeamFormationPage'));
const CricketDetailPage = lazy(() => import('./pages/matches/CricketDetailPage'));
const SportsCategoriesPage = lazy(() => import('./pages/shared/SportsCategoriesPage'));
const AttendanceCheckInPage = lazy(() => import('./pages/events/AttendanceCheckInPage'));
const TicketQRCodePage = lazy(() => import('./pages/matches/TicketQRCodePage'));
const AttendeeManagementPage = lazy(() => import('./pages/events/AttendeeManagementPage'));
const LiveEventDashboardPage = lazy(() => import('./pages/events/LiveEventDashboardPage'));
const LiveEventPollPage = lazy(() => import('./pages/events/LiveEventPollPage'));
const LiveMapTrackingPage = lazy(() => import('./pages/matches/LiveMapTrackingPage'));
const ChatPage = lazy(() => import('./pages/chat/ChatPage'));
const MessageRequestsPage = lazy(() => import('./pages/chat/MessageRequestsPage'));
const VoiceNotesPage = lazy(() => import('./pages/chat/VoiceNotesPage'));
const EventPlanningAnalyticsPage = lazy(() => import('./pages/events/EventPlanningAnalyticsPage'));
const HostDashboardPage = lazy(() => import('./pages/dashboard/HostDashboardPage'));
const RevenueDashboardPage = lazy(() => import('./pages/dashboard/RevenueDashboardPage'));
const EventInsightsPage = lazy(() => import('./pages/events/EventInsightsPage'));
const MyEventsPage = lazy(() => import('./pages/events/MyEventsPage'));
const AvailabilityCalendarPage = lazy(() => import('./pages/shared/AvailabilityCalendarPage'));
const EventTimelineUpdatesPage = lazy(() => import('./pages/events/EventTimelineUpdatesPage'));
const EventReminderDetailPage = lazy(() => import('./pages/events/EventReminderDetailPage'));
const NotificationPreferencesPage = lazy(() => import('./pages/settings/NotificationPreferencesPage'));
const LocationSettingsPage = lazy(() => import('./pages/settings/LocationSettingsPage'));
const DataStorageSettingsPage = lazy(() => import('./pages/settings/DataStorageSettingsPage'));
const PrestigeProgressPage = lazy(() => import('./pages/network/PrestigeProgressPage'));
const MomentumOfGracePage = lazy(() => import('./pages/network/MomentumOfGracePage'));
const TheHallOfHonorPage = lazy(() => import('./pages/network/TheHallOfHonorPage'));
const IDVerificationPage = lazy(() => import('./pages/auth/IDVerificationPage'));
const SelfieVerificationPage = lazy(() => import('./pages/auth/SelfieVerificationPage'));
const TrustedCirclesSetupPage = lazy(() => import('./pages/settings/TrustedCirclesSetupPage'));
const VerifiedBadgeInfoPage = lazy(() => import('./pages/profile/VerifiedBadgeInfoPage'));
const ReportEventPage = lazy(() => import('./pages/events/ReportEventPage'));
const BlockUserPage = lazy(() => import('./pages/profile/BlockUserPage'));
const SafetyEtiquetteGuidelinesPage = lazy(() => import('./pages/settings/SafetyEtiquetteGuidelinesPage'));
const ReputationReviewsPage = lazy(() => import('./pages/network/ReputationReviewsPage'));
const LocationServicesPromptPage = lazy(() => import('./pages/settings/LocationServicesPromptPage'));
const PushPermissionSetupPage = lazy(() => import('./pages/settings/PushPermissionSetupPage'));
const RestrictedAccessPage = lazy(() => import('./pages/shared/RestrictedAccessPage'));
const OfflineErrorPage = lazy(() => import('./pages/shared/OfflineErrorPage'));
const EmptyGatheringsPage = lazy(() => import('./pages/events/EmptyGatheringsPage'));
const LoadingStatePage = lazy(() => import('./pages/shared/LoadingStatePage'));
const MediaViewerPage = lazy(() => import('./pages/shared/MediaViewerPage'));
const SocialLinkingPage = lazy(() => import('./pages/profile/SocialLinkingPage'));
const ExtendInvitationPage = lazy(() => import('./pages/network/ExtendInvitationPage'));
const EngagementStatsPage = lazy(() => import('./pages/dashboard/EngagementStatsPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/shared/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('./pages/shared/TermsOfServicePage'));
const VenuePartnersPage = lazy(() => import('./pages/shared/VenuePartnersPage'));
const ContactPage = lazy(() => import('./pages/shared/ContactPage'));

// One guard covers every signed-in route; public URLs stay available without a session.
function ProtectedRoute() {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/welcome" element={<WelcomeCarouselPage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/events" element={<ExplorePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/verify-email" element={<EmailVerificationPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsOfServicePage />} />
      <Route path="/partners" element={<VenuePartnersPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/chat" element={<Navigate to="/messages" replace />} />
      <Route path="/sports/cricket" element={<CricketDetailPage />} />
      <Route path="/sports" element={<SportsCategoriesPage />} />
      <Route path="/dashboard" element={<LiveEventDashboardPage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/network" element={<PeopleDiscoveryPage />} />
      <Route path="/verification/center" element={<Navigate to="/messages" replace />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/matches/create" element={<CreateMatchPage />} />
        <Route path="/matches/find-players" element={<FindPlayersPage />} />
        <Route path="/matches/join" element={<JoinMatchPage />} />
        <Route path="/matches/lobby" element={<MatchLobbyPage />} />
        <Route path="/matches/:id/lobby" element={<MatchLobbyPage />} />
        <Route path="/matches/:id/live" element={<LiveMatchPage />} />
        <Route path="/matches/history" element={<MatchHistoryPage />} />
        <Route path="/matches/:id/teams" element={<TeamFormationPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/messages/requests" element={<MessageRequestsPage />} />
        <Route path="/messages/:id" element={<ChatPage />} />
        <Route path="/messages/:id/voice" element={<VoiceNotesPage />} />
        <Route path="/events/:eventId/checkin" element={<AttendanceCheckInPage />} />
        <Route path="/events/:eventId/ticket" element={<TicketQRCodePage />} />
        <Route path="/events/:eventId/attendees" element={<AttendeeManagementPage />} />
        <Route path="/events/:eventId/live/dashboard" element={<LiveEventDashboardPage />} />
        <Route path="/events/:eventId/live/poll" element={<LiveEventPollPage />} />
        <Route path="/events/create" element={<CreateEventWizard />} />
        <Route path="/events/analytics" element={<EventPlanningAnalyticsPage />} />
        <Route path="/events/:eventId/map" element={<LiveMapTrackingPage />} />
        <Route path="/dashboard/host" element={<HostDashboardPage />} />
        <Route path="/dashboard/revenue" element={<RevenueDashboardPage />} />
        <Route path="/dashboard/insights" element={<EventInsightsPage />} />
        <Route path="/my-events" element={<MyEventsPage />} />
        <Route path="/availability" element={<AvailabilityCalendarPage />} />
        <Route path="/dashboard/timeline" element={<EventTimelineUpdatesPage />} />
        <Route path="/reminder" element={<EventReminderDetailPage />} />
        <Route path="/settings/preferences" element={<NotificationPreferencesPage />} />
        <Route path="/settings/location" element={<LocationSettingsPage />} />
        <Route path="/settings/storage" element={<DataStorageSettingsPage />} />
        <Route path="/prestige" element={<PrestigeProgressPage />} />
        <Route path="/momentum" element={<MomentumOfGracePage />} />
        <Route path="/hallofhonor" element={<TheHallOfHonorPage />} />
        <Route path="/rankings" element={<LeaderboardPage />} />
        <Route path="/verification/id" element={<IDVerificationPage />} />
        <Route path="/selfie-verification" element={<SelfieVerificationPage />} />
        <Route path="/trusted-contacts" element={<TrustedCirclesSetupPage />} />
        <Route path="/verified-badge-info" element={<VerifiedBadgeInfoPage />} />
        <Route path="/report-event" element={<ReportEventPage />} />
        <Route path="/block-user" element={<BlockUserPage />} />
        <Route path="/safety-guidelines" element={<SafetyEtiquetteGuidelinesPage />} />
        <Route path="/reputation-reviews" element={<ReputationReviewsPage />} />
        <Route path="/location-services-prompt" element={<LocationServicesPromptPage />} />
        <Route path="/push-permission-setup" element={<PushPermissionSetupPage />} />
        <Route path="/restricted-access" element={<RestrictedAccessPage />} />
        <Route path="/offline-error" element={<OfflineErrorPage />} />
        <Route path="/empty-gatherings" element={<EmptyGatheringsPage />} />
        <Route path="/loading" element={<LoadingStatePage />} />
        <Route path="/media-viewer" element={<MediaViewerPage />} />
        <Route path="/social-linking" element={<SocialLinkingPage />} />
        <Route path="/extend-invitation" element={<ExtendInvitationPage />} />
        <Route path="/engagement-stats" element={<EngagementStatsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/empty" element={<EmptyStatePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/events/:id/participants" element={<EventParticipantsPage />} />
        <Route path="/events/:id/chat" element={<EventGroupChatPage />} />
        <Route path="/settings" element={<SettingsHomePage />} />
        <Route path="/settings/profile" element={<EditProfilePage />} />
        <Route path="/settings/account" element={<AccountSettingsPage />} />
        <Route path="/settings/notifications" element={<NotificationSettingsPage />} />
        <Route path="/settings/privacy" element={<PrivacySettingsPage />} />
        <Route path="/settings/safety" element={<SafetyCenterPage />} />
        <Route path="/settings/verification" element={<VerificationCenterPage />} />
        <Route path="/emergency" element={<EmergencySOSPage />} />
        <Route path="/report-member" element={<ReportMemberPage />} />
      </Route>
    </Routes>
  );
}
