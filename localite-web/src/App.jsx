import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ExplorePage from './pages/ExplorePage';
import MapPage from './pages/MapPage';
import SearchPage from './pages/SearchPage';
import CategoriesPage from './pages/CategoriesPage';
import PeopleDiscoveryPage from './pages/PeopleDiscoveryPage';
import EmptyStatePage from './pages/EmptyStatePage';
import ProfilePage from './pages/ProfilePage';
import NetworkPage from './pages/NetworkPage';
import SplashPage from './pages/SplashPage';
import WelcomeCarouselPage from './pages/WelcomeCarouselPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import LeaderboardPage from './pages/LeaderboardPage';
import AdminDashboard from './pages/AdminDashboard';
import MessagesPage from './pages/MessagesPage';
import EventDetailPage from './pages/EventDetailPage';
import CreateEventWizard from './pages/CreateEventWizard';
import EventParticipantsPage from './pages/EventParticipantsPage';
import EventGroupChatPage from './pages/EventGroupChatPage';
import SettingsHomePage from './pages/SettingsHomePage';
import EditProfilePage from './pages/EditProfilePage';
import AccountSettingsPage from './pages/AccountSettingsPage';
import NotificationSettingsPage from './pages/NotificationSettingsPage';
import PrivacySettingsPage from './pages/PrivacySettingsPage';
import Footer from './components/Footer';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { WebSocketProvider } from './context/WebSocketContext';
import SafetyCenterPage from './pages/SafetyCenterPage';
import EmergencySOSPage from './pages/EmergencySOSPage';
import VerificationCenterPage from './pages/VerificationCenterPage';
import ReportMemberPage from './pages/ReportMemberPage';
import CreateMatchPage from './pages/CreateMatchPage';
import FindPlayersPage from './pages/FindPlayersPage';
import JoinMatchPage from './pages/JoinMatchPage';
import MatchLobbyPage from './pages/MatchLobbyPage';
import LiveMatchPage from './pages/LiveMatchPage';
import MatchHistoryPage from './pages/MatchHistoryPage';
import TeamFormationPage from './pages/TeamFormationPage';
import CricketDetailPage from './pages/CricketDetailPage';
import SportsCategoriesPage from './pages/SportsCategoriesPage';
import AttendanceCheckInPage from './pages/AttendanceCheckInPage';
import TicketQRCodePage from './pages/TicketQRCodePage';
import AttendeeManagementPage from './pages/AttendeeManagementPage';
import LiveEventDashboardPage from './pages/LiveEventDashboardPage';
import LiveEventPollPage from './pages/LiveEventPollPage';
import LiveMapTrackingPage from './pages/LiveMapTrackingPage';
import ChatPage from './pages/ChatPage';
import MessageRequestsPage from './pages/MessageRequestsPage';
import VoiceNotesPage from './pages/VoiceNotesPage';
import CreateEventBasicInfoPage from './pages/CreateEventBasicInfoPage';
import CreateEventDateTimePage from './pages/CreateEventDateTimePage';
import CreateEventLocationPickerPage from './pages/CreateEventLocationPickerPage';
import CreateEventCapacityRulesPage from './pages/CreateEventCapacityRulesPage';
import CreateEventPaymentSetupPage from './pages/CreateEventPaymentSetupPage';
import CreateEventReviewPublishPage from './pages/CreateEventReviewPublishPage';
import EventPlanningAnalyticsPage from './pages/EventPlanningAnalyticsPage';
import HostDashboardPage from './pages/HostDashboardPage';
import RevenueDashboardPage from './pages/RevenueDashboardPage';
import EventInsightsPage from './pages/EventInsightsPage';
import EventsCatalogPage from './pages/EventsCatalogPage';
import MyEventsPage from './pages/MyEventsPage';
import AvailabilityCalendarPage from './pages/AvailabilityCalendarPage';
import EventTimelineUpdatesPage from './pages/EventTimelineUpdatesPage';
import EventReminderDetailPage from './pages/EventReminderDetailPage';
import NotificationPreferencesPage from './pages/NotificationPreferencesPage';
import LocationSettingsPage from './pages/LocationSettingsPage';
import DataStorageSettingsPage from './pages/DataStorageSettingsPage';
import PrestigeProgressPage from './pages/PrestigeProgressPage';
import MomentumOfGracePage from './pages/MomentumOfGracePage';
import TheHallOfHonorPage from './pages/TheHallOfHonorPage';
import InnerCircleRankingsPage from './pages/InnerCircleRankingsPage';
import IDVerificationPage from './pages/IDVerificationPage';
import SelfieVerificationPage from './pages/SelfieVerificationPage';
import TrustedCirclesSetupPage from './pages/TrustedCirclesSetupPage';
import VerifiedBadgeInfoPage from './pages/VerifiedBadgeInfoPage';
import ReportEventPage from './pages/ReportEventPage';
import BlockUserPage from './pages/BlockUserPage';
import SafetyEtiquetteGuidelinesPage from './pages/SafetyEtiquetteGuidelinesPage';
import ReputationReviewsPage from './pages/ReputationReviewsPage';
import LocationServicesPromptPage from './pages/LocationServicesPromptPage';
import PushPermissionSetupPage from './pages/PushPermissionSetupPage';
import RestrictedAccessPage from './pages/RestrictedAccessPage';
import OfflineErrorPage from './pages/OfflineErrorPage';
import EmptyGatheringsPage from './pages/EmptyGatheringsPage';
import LoadingStatePage from './pages/LoadingStatePage';
import MediaViewerPage from './pages/MediaViewerPage';
import SocialLinkingPage from './pages/SocialLinkingPage';
import ExtendInvitationPage from './pages/ExtendInvitationPage';
import EngagementStatsPage from './pages/EngagementStatsPage';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return null;
  return user ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = ['/', '/welcome', '/login', '/signup', '/verify-email'].includes(location.pathname);

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
          <Route path="/sports/cricket" element={<ProtectedRoute><CricketDetailPage /></ProtectedRoute>} />
          <Route path="/sports" element={<ProtectedRoute><SportsCategoriesPage /></ProtectedRoute>} />
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
          <Route path="/events" element={<ProtectedRoute><EventsCatalogPage /></ProtectedRoute>} />
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
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <LiveEventDashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/map" element={
            <ProtectedRoute>
              <MapPage />
            </ProtectedRoute>
          } />
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
          <Route path="/network" element={
            <ProtectedRoute>
              <PeopleDiscoveryPage />
            </ProtectedRoute>
          } />
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
        {!isAuthPage && <Footer />}
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
