import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import usePageMeta from '../hooks/usePageMeta';
import AuthCard from '../components/AuthCard';
import FormField, { FormError, PasswordInput, TextInput } from '../components/FormField';
import Spinner from '../components/Spinner/Spinner';
import { isValidEmail } from '../utils/validation';

export default function Login() {
  const { ui } = useLanguage();
  const { login, isAuthenticated, restoring } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state && location.state.from) || '/dashboard';

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [busy, setBusy] = useState(false);

  usePageMeta(ui('login'), ui('loginSub'));

  if (restoring) return <Spinner className="min-h-[50vh]" />;
  if (isAuthenticated) return <Navigate to={from} replace />;

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!isValidEmail(form.email)) next.email = ui('invalidEmail');
    if (!form.password) next.password = ui('passwordRequired');
    return next;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;

    setBusy(true);
    setServerError('');
    try {
      await login(form.email.trim(), form.password);
      navigate(from, { replace: true });
    } catch (err) {
      setServerError(err.status === 401 ? ui('errInvalidCredentials') : err.message || ui('errorGeneric'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthCard
      title={ui('loginTitle')}
      subtitle={ui('loginSub')}
      footer={
        <>
          {ui('noAccount')}{' '}
          <Link to="/signup" state={{ from }} className="font-semibold text-india-navy hover:underline">
            {ui('signup')}
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <FormError message={serverError} />

        <FormField id="login-email" label={ui('email')} error={errors.email}>
          <TextInput
            id="login-email"
            type="email"
            autoComplete="email"
            autoFocus
            value={form.email}
            onChange={update('email')}
            error={errors.email}
            placeholder="you@example.com"
          />
        </FormField>

        <FormField id="login-password" label={ui('password')} error={errors.password}>
          <PasswordInput
            id="login-password"
            autoComplete="current-password"
            value={form.password}
            onChange={update('password')}
            error={errors.password}
          />
        </FormField>

        <button type="submit" disabled={busy} className="btn-primary w-full py-2.5">
          {busy ? ui('submitting') : ui('login')}
        </button>
      </form>
    </AuthCard>
  );
}
