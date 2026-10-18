import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
const ExplorePage = React.lazy(() => import('./pages/shared/ExplorePage'));
const FeedPage = React.lazy(() => import('./pages/shared/FeedPage'));
const NotificationsPage = React.lazy(() => import('./pages/shared/NotificationsPage'));
const MapPage = React.lazy(() => import('./pages/shared/MapPage'));
const SearchPage = React.lazy(() => import('./pages/shared/SearchPage'));
const CategoriesPage = React.lazy(() => import('./pages/shared/CategoriesPage'));
const PeopleDiscoveryPage = React.lazy(() => import('./pages/network/PeopleDiscoveryPage'));
const EmptyStatePage = React.lazy(() => import('./pages/shared/EmptyStatePage'));
const ProfilePage = React.lazy(() => import('./pages/profile/ProfilePage'));
const NetworkPage = React.lazy(() => import('./pages/network/NetworkPage'));
const SplashPage = React.lazy(() => import('./pages/auth/SplashPage'));
const WelcomeCarouselPage = React.lazy(() => import('./pages/auth/WelcomeCarouselPage'));
const LoginPage = React.lazy(() => import('./pages/auth/LoginPage'));
const SignupPage = React.lazy(() => import('./pages/auth/SignupPage'));
const EmailVerificationPage = React.lazy(() => import('./pages/auth/EmailVerificationPage'));
const AnalyticsDashboard = React.lazy(() => import('./pages/dashboard/AnalyticsDashboard'));
const LeaderboardPage = React.lazy(() => import('./pages/network/LeaderboardPage'));
const AdminDashboard = React.lazy(() => import('./pages/dashboard/AdminDashboard'));
const MessagesPage = React.lazy(() => import('./pages/chat/MessagesPage'));
const EventDetailPage = React.lazy(() => import('./pages/events/EventDetailPage'));
const CreateEventWizard = React.lazy(() => import('./pages/events/CreateEventWizard'));
const EventParticipantsPage = React.lazy(() => import('./pages/events/EventParticipantsPage'));
const EventGroupChatPage = React.lazy(() => import('./pages/chat/EventGroupChatPage'));
const SettingsHomePage = React.lazy(() => import('./pages/settings/SettingsHomePage'));
const EditProfilePage = React.lazy(() => import('./pages/profile/EditProfilePage'));
const AccountSettingsPage = React.lazy(() => import('./pages/profile/AccountSettingsPage'));
const NotificationSettingsPage = React.lazy(() => import('./pages/settings/NotificationSettingsPage'));
const PrivacySettingsPage = React.lazy(() => import('./pages/settings/PrivacySettingsPage'));
import Footer from './components/Footer';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { WebSocketProvider } from './context/WebSocketContext';
const SafetyCenterPage = React.lazy(() => import('./pages/settings/SafetyCenterPage'));
const EmergencySOSPage = React.lazy(() => import('./pages/settings/EmergencySOSPage'));
const VerificationCenterPage = React.lazy(() => import('./pages/auth/VerificationCenterPage'));
const ReportMemberPage = React.lazy(() => import('./pages/profile/ReportMemberPage'));
const CreateMatchPage = React.lazy(() => import('./pages/events/CreateMatchPage'));
const FindPlayersPage = React.lazy(() => import('./pages/shared/FindPlayersPage'));
const JoinMatchPage = React.lazy(() => import('./pages/matches/JoinMatchPage'));
const MatchLobbyPage = React.lazy(() => import('./pages/matches/MatchLobbyPage'));
const LiveMatchPage = React.lazy(() => import('./pages/matches/LiveMatchPage'));
const MatchHistoryPage = React.lazy(() => import('./pages/matches/MatchHistoryPage'));
const TeamFormationPage = React.lazy(() => import('./pages/matches/TeamFormationPage'));
const CricketDetailPage = React.lazy(() => import('./pages/matches/CricketDetailPage'));
const SportsCategoriesPage = React.lazy(() => import('./pages/shared/SportsCategoriesPage'));
const AttendanceCheckInPage = React.lazy(() => import('./pages/events/AttendanceCheckInPage'));
const TicketQRCodePage = React.lazy(() => import('./pages/matches/TicketQRCodePage'));
const AttendeeManagementPage = React.lazy(() => import('./pages/events/AttendeeManagementPage'));
const LiveEventDashboardPage = React.lazy(() => import('./pages/events/LiveEventDashboardPage'));
const LiveEventPollPage = React.lazy(() => import('./pages/events/LiveEventPollPage'));
const LiveMapTrackingPage = React.lazy(() => import('./pages/matches/LiveMapTrackingPage'));
const ChatPage = React.lazy(() => import('./pages/chat/ChatPage'));
const MessageRequestsPage = React.lazy(() => import('./pages/chat/MessageRequestsPage'));
const VoiceNotesPage = React.lazy(() => import('./pages/chat/VoiceNotesPage'));
const EventPlanningAnalyticsPage = React.lazy(() => import('./pages/events/EventPlanningAnalyticsPage'));
const HostDashboardPage = React.lazy(() => import('./pages/dashboard/HostDashboardPage'));
const RevenueDashboardPage = React.lazy(() => import('./pages/dashboard/RevenueDashboardPage'));
const EventInsightsPage = React.lazy(() => import('./pages/events/EventInsightsPage'));
const EventsCatalogPage = React.lazy(() => import('./pages/events/EventsCatalogPage'));
const MyEventsPage = React.lazy(() => import('./pages/events/MyEventsPage'));
const AvailabilityCalendarPage = React.lazy(() => import('./pages/shared/AvailabilityCalendarPage'));
const EventTimelineUpdatesPage = React.lazy(() => import('./pages/events/EventTimelineUpdatesPage'));
const EventReminderDetailPage = React.lazy(() => import('./pages/events/EventReminderDetailPage'));
const NotificationPreferencesPage = React.lazy(() => import('./pages/settings/NotificationPreferencesPage'));
const LocationSettingsPage = React.lazy(() => import('./pages/settings/LocationSettingsPage'));
const DataStorageSettingsPage = React.lazy(() => import('./pages/settings/DataStorageSettingsPage'));
const PrestigeProgressPage = React.lazy(() => import('./pages/network/PrestigeProgressPage'));
const MomentumOfGracePage = React.lazy(() => import('./pages/network/MomentumOfGracePage'));
const TheHallOfHonorPage = React.lazy(() => import('./pages/network/TheHallOfHonorPage'));
const IDVerificationPage = React.lazy(() => import('./pages/auth/IDVerificationPage'));
const SelfieVerificationPage = React.lazy(() => import('./pages/auth/SelfieVerificationPage'));
const TrustedCirclesSetupPage = React.lazy(() => import('./pages/settings/TrustedCirclesSetupPage'));
const VerifiedBadgeInfoPage = React.lazy(() => import('./pages/profile/VerifiedBadgeInfoPage'));
const ReportEventPage = React.lazy(() => import('./pages/events/ReportEventPage'));
const BlockUserPage = React.lazy(() => import('./pages/profile/BlockUserPage'));
const SafetyEtiquetteGuidelinesPage = React.lazy(() => import('./pages/settings/SafetyEtiquetteGuidelinesPage'));
const ReputationReviewsPage = React.lazy(() => import('./pages/network/ReputationReviewsPage'));
const LocationServicesPromptPage = React.lazy(() => import('./pages/settings/LocationServicesPromptPage'));
const PushPermissionSetupPage = React.lazy(() => import('./pages/settings/PushPermissionSetupPage'));
const RestrictedAccessPage = React.lazy(() => import('./pages/shared/RestrictedAccessPage'));
const OfflineErrorPage = React.lazy(() => import('./pages/shared/OfflineErrorPage'));
const EmptyGatheringsPage = React.lazy(() => import('./pages/events/EmptyGatheringsPage'));
const LoadingStatePage = React.lazy(() => import('./pages/shared/LoadingStatePage'));
const MediaViewerPage = React.lazy(() => import('./pages/shared/MediaViewerPage'));
const SocialLinkingPage = React.lazy(() => import('./pages/profile/SocialLinkingPage'));
const ExtendInvitationPage = React.lazy(() => import('./pages/network/ExtendInvitationPage'));
const EngagementStatsPage = React.lazy(() => import('./pages/dashboard/EngagementStatsPage'));
const PrivacyPolicyPage = React.lazy(() => import('./pages/shared/PrivacyPolicyPage'));
const TermsOfServicePage = React.lazy(() => import('./pages/shared/TermsOfServicePage'));
const VenuePartnersPage = React.lazy(() => import('./pages/shared/VenuePartnersPage'));
const ContactPage = React.lazy(() => import('./pages/shared/ContactPage'));
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return null;
  return user ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = ['/', '/welcome', '/login', '/signup', '/verify-email'].includes(location.pathname);
  const isNoFooterPage = [
    '/privacy', '/terms', '/partners', '/contact',
    '/messages', '/loading', '/offline-error', '/media-viewer',
  ].includes(location.pathname)
    || location.pathname.startsWith('/messages/')
    || location.pathname.includes('/live')
    || location.pathname.includes('/chat');

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && <Navbar />}
      <main className="flex-1">
        <React.Suspense fallback={<div className="min-h-[60vh] flex flex-col items-center justify-center p-8"><div className="w-8 h-8 rounded-full border-2 border-border border-t-accent animate-spin" /><span className="mt-3 text-body-sm text-fg-muted font-mono text-xs">Loading...</span></div>}>
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/welcome" element={<WelcomeCarouselPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/events" element={<ExplorePage />} />
          <Route path="/events/:id" element={<ProtectedRoute><EventDetailPage /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
          <Route path="/feed" element={<ProtectedRoute><FeedPage /></ProtectedRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify-email" element={<EmailVerificationPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/partners" element={<VenuePartnersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/matches/create" element={<ProtectedRoute><CreateMatchPage /></ProtectedRoute>} />
          <Route path="/matches/find-players" element={<ProtectedRoute><FindPlayersPage /></ProtectedRoute>} />
          <Route path="/matches/join" element={<ProtectedRoute><JoinMatchPage /></ProtectedRoute>} />
          <Route path="/matches/lobby" element={<ProtectedRoute><MatchLobbyPage /></ProtectedRoute>} />
          <Route path="/matches/:id/lobby" element={<ProtectedRoute><MatchLobbyPage /></ProtectedRoute>} />
          <Route path="/matches/:id/live" element={<ProtectedRoute><LiveMatchPage /></ProtectedRoute>} />
          <Route path="/matches/history" element={<ProtectedRoute><MatchHistoryPage /></ProtectedRoute>} />
          <Route path="/matches/:id/teams" element={<ProtectedRoute><TeamFormationPage /></ProtectedRoute>} />
          <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
          <Route path="/chat" element={<Navigate to="/messages" replace />} />
          <Route path="/messages/requests" element={<ProtectedRoute><MessageRequestsPage /></ProtectedRoute>} />
          <Route path="/messages/:id" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
          <Route path="/messages/:id/voice" element={<ProtectedRoute><VoiceNotesPage /></ProtectedRoute>} />
          <Route path="/sports/cricket" element={<CricketDetailPage />} />
          <Route path="/sports" element={<SportsCategoriesPage />} />
          <Route path="/events/:eventId/checkin" element={<ProtectedRoute><AttendanceCheckInPage /></ProtectedRoute>} />
          <Route path="/events/:eventId/ticket" element={<ProtectedRoute><TicketQRCodePage /></ProtectedRoute>} />
          <Route path="/events/:eventId/attendees" element={<ProtectedRoute><AttendeeManagementPage /></ProtectedRoute>} />
          <Route path="/events/:eventId/live/dashboard" element={<ProtectedRoute><LiveEventDashboardPage /></ProtectedRoute>} />
          <Route path="/events/:eventId/live/poll" element={<ProtectedRoute><LiveEventPollPage /></ProtectedRoute>} />
          <Route path="/events/create" element={<ProtectedRoute><CreateEventWizard /></ProtectedRoute>} />
          <Route path="/events/analytics" element={<ProtectedRoute><EventPlanningAnalyticsPage /></ProtectedRoute>} />
          <Route path="/events/:eventId/map" element={<ProtectedRoute><LiveMapTrackingPage /></ProtectedRoute>} />
          <Route path="/dashboard/host" element={<ProtectedRoute><HostDashboardPage /></ProtectedRoute>} />
          <Route path="/dashboard/revenue" element={<ProtectedRoute><RevenueDashboardPage /></ProtectedRoute>} />
          <Route path="/dashboard/insights" element={<ProtectedRoute><EventInsightsPage /></ProtectedRoute>} />
          <Route path="/my-events" element={<ProtectedRoute><MyEventsPage /></ProtectedRoute>} />
          <Route path="/availability" element={<ProtectedRoute><AvailabilityCalendarPage /></ProtectedRoute>} />
          <Route path="/dashboard/timeline" element={<ProtectedRoute><EventTimelineUpdatesPage /></ProtectedRoute>} />
          <Route path="/reminder" element={<ProtectedRoute><EventReminderDetailPage /></ProtectedRoute>} />
          <Route path="/settings/preferences" element={<ProtectedRoute><NotificationPreferencesPage /></ProtectedRoute>} />
          <Route path="/settings/location" element={<ProtectedRoute><LocationSettingsPage /></ProtectedRoute>} />
          <Route path="/settings/storage" element={<ProtectedRoute><DataStorageSettingsPage /></ProtectedRoute>} />
          <Route path="/prestige" element={<ProtectedRoute><PrestigeProgressPage /></ProtectedRoute>} />
          <Route path="/momentum" element={<ProtectedRoute><MomentumOfGracePage /></ProtectedRoute>} />
          <Route path="/hallofhonor" element={<ProtectedRoute><TheHallOfHonorPage /></ProtectedRoute>} />
          <Route path="/rankings" element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>} />
          <Route path="/verification/id" element={<ProtectedRoute><IDVerificationPage /></ProtectedRoute>} />
          <Route path="/selfie-verification" element={<ProtectedRoute><SelfieVerificationPage /></ProtectedRoute>} />
          <Route path="/trusted-contacts" element={<ProtectedRoute><TrustedCirclesSetupPage /></ProtectedRoute>} />
          <Route path="/verified-badge-info" element={<ProtectedRoute><VerifiedBadgeInfoPage /></ProtectedRoute>} />
          <Route path="/report-event" element={<ProtectedRoute><ReportEventPage /></ProtectedRoute>} />
          <Route path="/block-user" element={<ProtectedRoute><BlockUserPage /></ProtectedRoute>} />
          <Route path="/safety-guidelines" element={<ProtectedRoute><SafetyEtiquetteGuidelinesPage /></ProtectedRoute>} />
          <Route path="/reputation-reviews" element={<ProtectedRoute><ReputationReviewsPage /></ProtectedRoute>} />
          <Route path="/location-services-prompt" element={<ProtectedRoute><LocationServicesPromptPage /></ProtectedRoute>} />
          <Route path="/push-permission-setup" element={<ProtectedRoute><PushPermissionSetupPage /></ProtectedRoute>} />
          <Route path="/restricted-access" element={<ProtectedRoute><RestrictedAccessPage /></ProtectedRoute>} />
          <Route path="/offline-error" element={<ProtectedRoute><OfflineErrorPage /></ProtectedRoute>} />
          <Route path="/empty-gatherings" element={<ProtectedRoute><EmptyGatheringsPage /></ProtectedRoute>} />
          <Route path="/loading" element={<ProtectedRoute><LoadingStatePage /></ProtectedRoute>} />
          <Route path="/media-viewer" element={<ProtectedRoute><MediaViewerPage /></ProtectedRoute>} />
          <Route path="/social-linking" element={<ProtectedRoute><SocialLinkingPage /></ProtectedRoute>} />
          <Route path="/extend-invitation" element={<ProtectedRoute><ExtendInvitationPage /></ProtectedRoute>} />
          <Route path="/engagement-stats" element={<ProtectedRoute><EngagementStatsPage /></ProtectedRoute>} />
          <Route path="/dashboard" element={<LiveEventDashboardPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/categories" element={
            <ProtectedRoute>
              <CategoriesPage />
            </ProtectedRoute>
          } />
          <Route path="/network" element={<PeopleDiscoveryPage />} />
          <Route path="/empty" element={
            <ProtectedRoute>
              <EmptyStatePage />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute>
              <AnalyticsDashboard />
            </ProtectedRoute>
          } />
          <Route path="/leaderboard" element={
            <ProtectedRoute>
              <LeaderboardPage />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/events/:id/participants" element={
            <ProtectedRoute>
              <EventParticipantsPage />
            </ProtectedRoute>
          } />
          <Route path="/events/:id/chat" element={
            <ProtectedRoute>
              <EventGroupChatPage />
            </ProtectedRoute>
          } />
          {/* Settings */}
          <Route path="/settings" element={
            <ProtectedRoute>
              <SettingsHomePage />
            </ProtectedRoute>
          } />
          <Route path="/settings/profile" element={
            <ProtectedRoute>
              <EditProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/settings/account" element={
            <ProtectedRoute>
              <AccountSettingsPage />
            </ProtectedRoute>
          } />
          <Route path="/settings/notifications" element={
            <ProtectedRoute>
              <NotificationSettingsPage />
            </ProtectedRoute>
          } />
          <Route path="/settings/privacy" element={
            <ProtectedRoute>
              <PrivacySettingsPage />
            </ProtectedRoute>
          } />
          <Route path="/settings/safety" element={
            <ProtectedRoute>
              <SafetyCenterPage />
            </ProtectedRoute>
          } />
          <Route path="/settings/verification" element={
            <ProtectedRoute>
              <VerificationCenterPage />
            </ProtectedRoute>
          } />
          <Route path="/verification/center" element={<Navigate to="/settings/verification" replace />} />
          <Route path="/emergency" element={
            <ProtectedRoute>
              <EmergencySOSPage />
            </ProtectedRoute>
          } />
          <Route path="/report-member" element={
            <ProtectedRoute>
              <ReportMemberPage />
            </ProtectedRoute>
          } />
        </Routes>
        </React.Suspense>
      </main>
      {!isAuthPage && !isNoFooterPage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WebSocketProvider>
          <AppContent />
        </WebSocketProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
