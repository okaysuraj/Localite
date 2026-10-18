import { Suspense } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { WebSocketProvider } from './context/WebSocketContext';

// The app shell owns providers and page chrome. URLs and access rules live in AppRoutes.
const AppContent = () => {
  const location = useLocation();
  const isAuthPage = ['/', '/welcome', '/login', '/signup', '/verify-email'].includes(location.pathname);
  const isNoFooterPage =
    [
      '/privacy',
      '/terms',
      '/partners',
      '/contact',
      '/messages',
      '/loading',
      '/offline-error',
      '/media-viewer',
    ].includes(location.pathname) ||
    location.pathname.startsWith('/messages/') ||
    location.pathname.includes('/live') ||
    location.pathname.includes('/chat');

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && <Navbar />}
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
              <div className="w-8 h-8 rounded-full border-2 border-border border-t-accent animate-spin" />
              <span className="mt-3 text-body-sm text-fg-muted font-mono text-xs">Loading...</span>
            </div>
          }
        >
          <AppRoutes />
        </Suspense>
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
