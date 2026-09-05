import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from './Spinner/Spinner';
import NotFound from '../pages/NotFound';

/**
 * Redirects anonymous users to /login (remembering where they came from).
 * With `adminOnly`, non-admin users see the 404 page so the route stays undiscoverable.
 */
export default function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin, restoring } = useAuth();
  const location = useLocation();

  if (restoring) return <Spinner className="min-h-[50vh]" />;
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
  if (adminOnly && !isAdmin) return <NotFound />;
  return children;
}
