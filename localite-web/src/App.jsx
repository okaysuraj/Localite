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
import SafetyCenterPage from './pages/SafetyCenterPage';
import EmergencySOSPage from './pages/EmergencySOSPage';
import VerificationCenterPage from './pages/VerificationCenterPage';
import ReportMemberPage from './pages/ReportMemberPage';
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
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <ExplorePage />
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
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
