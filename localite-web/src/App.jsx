import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ExplorePage from './pages/shared/ExplorePage';
import MapPage from './pages/shared/MapPage';
import SearchPage from './pages/shared/SearchPage';
import CategoriesPage from './pages/shared/CategoriesPage';
import PeopleDiscoveryPage from './pages/network/PeopleDiscoveryPage';
import EmptyStatePage from './pages/shared/EmptyStatePage';
import ProfilePage from './pages/profile/ProfilePage';
import NetworkPage from './pages/network/NetworkPage';
import SplashPage from './pages/auth/SplashPage';
import WelcomeCarouselPage from './pages/auth/WelcomeCarouselPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import EmailVerificationPage from './pages/auth/EmailVerificationPage';
import AnalyticsDashboard from './pages/dashboard/AnalyticsDashboard';
import LeaderboardPage from './pages/network/LeaderboardPage';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import MessagesPage from './pages/chat/MessagesPage';
import EventDetailPage from './pages/events/EventDetailPage';
import CreateEventWizard from './pages/events/CreateEventWizard';
import EventParticipantsPage from './pages/events/EventParticipantsPage';
import EventGroupChatPage from './pages/chat/EventGroupChatPage';
import SettingsHomePage from './pages/settings/SettingsHomePage';
import EditProfilePage from './pages/profile/EditProfilePage';
import AccountSettingsPage from './pages/profile/AccountSettingsPage';
import NotificationSettingsPage from './pages/settings/NotificationSettingsPage';
import PrivacySettingsPage from './pages/settings/PrivacySettingsPage';
import Footer from './components/Footer';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { WebSocketProvider } from './context/WebSocketContext';
import SafetyCenterPage from './pages/settings/SafetyCenterPage';
import EmergencySOSPage from './pages/settings/EmergencySOSPage';
import VerificationCenterPage from './pages/auth/VerificationCenterPage';
import ReportMemberPage from './pages/profile/ReportMemberPage';
import CreateMatchPage from './pages/events/CreateMatchPage';
import FindPlayersPage from './pages/shared/FindPlayersPage';
import JoinMatchPage from './pages/matches/JoinMatchPage';
import MatchLobbyPage from './pages/matches/MatchLobbyPage';
import LiveMatchPage from './pages/matches/LiveMatchPage';
import MatchHistoryPage from './pages/matches/MatchHistoryPage';
import TeamFormationPage from './pages/matches/TeamFormationPage';
import CricketDetailPage from './pages/matches/CricketDetailPage';
import SportsCategoriesPage from './pages/shared/SportsCategoriesPage';
import AttendanceCheckInPage from './pages/events/AttendanceCheckInPage';
import TicketQRCodePage from './pages/matches/TicketQRCodePage';
import AttendeeManagementPage from './pages/events/AttendeeManagementPage';
import LiveEventDashboardPage from './pages/events/LiveEventDashboardPage';
import LiveEventPollPage from './pages/events/LiveEventPollPage';
import LiveMapTrackingPage from './pages/matches/LiveMapTrackingPage';
import ChatPage from './pages/chat/ChatPage';
import MessageRequestsPage from './pages/chat/MessageRequestsPage';
import VoiceNotesPage from './pages/chat/VoiceNotesPage';
import CreateEventBasicInfoPage from './pages/events/CreateEventBasicInfoPage';
import CreateEventDateTimePage from './pages/events/CreateEventDateTimePage';
import CreateEventLocationPickerPage from './pages/events/CreateEventLocationPickerPage';
import CreateEventCapacityRulesPage from './pages/events/CreateEventCapacityRulesPage';
import CreateEventPaymentSetupPage from './pages/events/CreateEventPaymentSetupPage';
import CreateEventReviewPublishPage from './pages/events/CreateEventReviewPublishPage';
import EventPlanningAnalyticsPage from './pages/events/EventPlanningAnalyticsPage';
import HostDashboardPage from './pages/dashboard/HostDashboardPage';
import RevenueDashboardPage from './pages/dashboard/RevenueDashboardPage';
import EventInsightsPage from './pages/events/EventInsightsPage';
import EventsCatalogPage from './pages/events/EventsCatalogPage';
import MyEventsPage from './pages/events/MyEventsPage';
import AvailabilityCalendarPage from './pages/shared/AvailabilityCalendarPage';
import EventTimelineUpdatesPage from './pages/events/EventTimelineUpdatesPage';
import EventReminderDetailPage from './pages/events/EventReminderDetailPage';
import NotificationPreferencesPage from './pages/settings/NotificationPreferencesPage';
import LocationSettingsPage from './pages/settings/LocationSettingsPage';
import DataStorageSettingsPage from './pages/settings/DataStorageSettingsPage';
import PrestigeProgressPage from './pages/network/PrestigeProgressPage';
import MomentumOfGracePage from './pages/network/MomentumOfGracePage';
import TheHallOfHonorPage from './pages/network/TheHallOfHonorPage';
import InnerCircleRankingsPage from './pages/network/InnerCircleRankingsPage';
import IDVerificationPage from './pages/auth/IDVerificationPage';
import SelfieVerificationPage from './pages/auth/SelfieVerificationPage';
import TrustedCirclesSetupPage from './pages/settings/TrustedCirclesSetupPage';
import VerifiedBadgeInfoPage from './pages/profile/VerifiedBadgeInfoPage';
import ReportEventPage from './pages/events/ReportEventPage';
import BlockUserPage from './pages/profile/BlockUserPage';
import SafetyEtiquetteGuidelinesPage from './pages/settings/SafetyEtiquetteGuidelinesPage';
import ReputationReviewsPage from './pages/network/ReputationReviewsPage';
import LocationServicesPromptPage from './pages/settings/LocationServicesPromptPage';
import PushPermissionSetupPage from './pages/settings/PushPermissionSetupPage';
import RestrictedAccessPage from './pages/shared/RestrictedAccessPage';
import OfflineErrorPage from './pages/shared/OfflineErrorPage';
import EmptyGatheringsPage from './pages/events/EmptyGatheringsPage';
import LoadingStatePage from './pages/shared/LoadingStatePage';
import MediaViewerPage from './pages/shared/MediaViewerPage';
import SocialLinkingPage from './pages/profile/SocialLinkingPage';
import ExtendInvitationPage from './pages/network/ExtendInvitationPage';
import EngagementStatsPage from './pages/dashboard/EngagementStatsPage';
import PrivacyPolicyPage from './pages/shared/PrivacyPolicyPage';
import TermsOfServicePage from './pages/shared/TermsOfServicePage';
import VenuePartnersPage from './pages/shared/VenuePartnersPage';
import ContactPage from './pages/shared/ContactPage';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return null;
  return user ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = ['/', '/welcome', '/login', '/signup', '/verify-email'].includes(location.pathname);
  const isNoFooterPage = ['/privacy', '/terms', '/partners', '/contact'].includes(location.pathname);

  return (
    <div className="app-container">
      {!isAuthPage && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/welcome" element={<WelcomeCarouselPage />} />
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
          <Route path="/matches/:id/lobby" element={<ProtectedRoute><MatchLobbyPage /></ProtectedRoute>} />
          <Route path="/matches/:id/live" element={<ProtectedRoute><LiveMatchPage /></ProtectedRoute>} />
          <Route path="/matches/history" element={<ProtectedRoute><MatchHistoryPage /></ProtectedRoute>} />
          <Route path="/matches/:id/teams" element={<ProtectedRoute><TeamFormationPage /></ProtectedRoute>} />
          <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
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
          <Route path="/events/create" element={<ProtectedRoute><CreateEventBasicInfoPage /></ProtectedRoute>} />
          <Route path="/events/create/datetime" element={<ProtectedRoute><CreateEventDateTimePage /></ProtectedRoute>} />
          <Route path="/events/create/location" element={<ProtectedRoute><CreateEventLocationPickerPage /></ProtectedRoute>} />
          <Route path="/events/create/capacity" element={<ProtectedRoute><CreateEventCapacityRulesPage /></ProtectedRoute>} />
          <Route path="/events/create/payment" element={<ProtectedRoute><CreateEventPaymentSetupPage /></ProtectedRoute>} />
          <Route path="/events/create/review" element={<ProtectedRoute><CreateEventReviewPublishPage /></ProtectedRoute>} />
          <Route path="/events/analytics" element={<ProtectedRoute><EventPlanningAnalyticsPage /></ProtectedRoute>} />
          <Route path="/events/:eventId/map" element={<ProtectedRoute><LiveMapTrackingPage /></ProtectedRoute>} />
          <Route path="/dashboard/host" element={<ProtectedRoute><HostDashboardPage /></ProtectedRoute>} />
          <Route path="/dashboard/revenue" element={<ProtectedRoute><RevenueDashboardPage /></ProtectedRoute>} />
          <Route path="/dashboard/insights" element={<ProtectedRoute><EventInsightsPage /></ProtectedRoute>} />
          <Route path="/events" element={<EventsCatalogPage />} />
          <Route path="/my-events" element={<ProtectedRoute><MyEventsPage /></ProtectedRoute>} />
          <Route path="/availability" element={<ProtectedRoute><AvailabilityCalendarPage /></ProtectedRoute>} />
          <Route path="/dashboard/timeline" element={<ProtectedRoute><EventTimelineUpdatesPage /></ProtectedRoute>} />
          <Route path="/reminder" element={<ProtectedRoute><EventReminderDetailPage /></ProtectedRoute>} />
          <Route path="/settings/notifications" element={<ProtectedRoute><NotificationPreferencesPage /></ProtectedRoute>} />
          <Route path="/settings/location" element={<ProtectedRoute><LocationSettingsPage /></ProtectedRoute>} />
          <Route path="/settings/storage" element={<ProtectedRoute><DataStorageSettingsPage /></ProtectedRoute>} />
          <Route path="/prestige" element={<ProtectedRoute><PrestigeProgressPage /></ProtectedRoute>} />
          <Route path="/momentum" element={<ProtectedRoute><MomentumOfGracePage /></ProtectedRoute>} />
          <Route path="/hallofhonor" element={<ProtectedRoute><TheHallOfHonorPage /></ProtectedRoute>} />
          <Route path="/rankings" element={<ProtectedRoute><InnerCircleRankingsPage /></ProtectedRoute>} />
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
          <Route path="/search" element={
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
          } />
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
          <Route path="/messages" element={
            <ProtectedRoute>
              <MessagesPage />
            </ProtectedRoute>
          } />
          <Route path="/events/:id" element={
            <ProtectedRoute>
              <EventDetailPage />
            </ProtectedRoute>
          } />
          <Route path="/create-event" element={
            <ProtectedRoute>
              <CreateEventWizard />
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
      </main>
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
