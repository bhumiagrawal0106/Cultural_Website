import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import api, { getToken, setToken, setUnauthorizedHandler } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(getToken());
  const [restoring, setRestoring] = useState(Boolean(getToken()));

  const logout = useCallback(() => {
    setToken(null);
    setTokenState(null);
    setUser(null);
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(logout);
  }, [logout]);

  // Restore the session on first load
  useEffect(() => {
    if (!getToken()) return;
    api
      .get('/api/auth/me')
      .then((res) => setUser(res.user))
      .catch(() => logout())
      .finally(() => setRestoring(false));
  }, [logout]);

  const applyAuth = useCallback((res) => {
    setToken(res.token);
    setTokenState(res.token);
    setUser(res.user);
    return res.user;
  }, []);

  const login = useCallback(
    async (email, password) => applyAuth(await api.post('/api/auth/login', { email, password })),
    [applyAuth]
  );

  const signup = useCallback(
    async (name, email, password) => applyAuth(await api.post('/api/auth/signup', { name, email, password })),
    [applyAuth]
  );

  const favorites = useMemo(() => (user && user.favorites ? user.favorites.map(String) : []), [user]);

  const isFavorite = useCallback((placeId) => favorites.includes(String(placeId)), [favorites]);

  const toggleFavorite = useCallback(
    async (placeId) => {
      if (!user) throw new Error('Login required');
      const id = String(placeId);
      const res = favorites.includes(id)
        ? await api.del(`/api/user/favorites/${id}`)
        : await api.post(`/api/user/favorites/${id}`);
      setUser((u) => (u ? { ...u, favorites: res.data } : u));
      return res.data.map(String);
    },
    [user, favorites]
  );

  const value = useMemo(
    () => ({
      user,
      token,
      restoring,
      isAuthenticated: Boolean(user),
      isAdmin: Boolean(user && user.role === 'admin'),
      login,
      signup,
      logout,
      favorites,
      isFavorite,
      toggleFavorite,
    }),
    [user, token, restoring, login, signup, logout, favorites, isFavorite, toggleFavorite]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
