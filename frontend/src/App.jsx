import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ChatWidget from './components/ChatWidget/ChatWidget';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorState from './components/ErrorState/ErrorState';
import ProtectedRoute from './components/ProtectedRoute';
import Spinner from './components/Spinner/Spinner';
import Home from './pages/Home';
import StatePage from './pages/StatePage';
import ItemDetail from './pages/ItemDetail';
import SearchResults from './pages/SearchResults';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Feedback from './pages/Feedback';
import About from './pages/About';
import NotFound from './pages/NotFound';

// Admin tooling is only needed by the team, so keep it out of the main bundle.
const Admin = lazy(() => import('./pages/Admin'));

function Layout() {
  const { pathname } = useLocation();
  const { ui } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-india-navy focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {ui('skipToContent')}
      </a>
      <ScrollToTop />
      <Navbar />

      <main id="main" className="flex-1">
        {/* Keyed on pathname so a crash on one page does not follow the user to the next */}
        <ErrorBoundary
          key={pathname}
          fallback={(error) => <ErrorState error={error} onRetry={() => window.location.reload()} className="mt-10" />}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/state/:slug" element={<StatePage />} />
            <Route path="/item/:collection/:id" element={<ItemDetail />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <Suspense fallback={<Spinner className="min-h-[50vh]" />}>
                    <Admin />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <Layout />
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
