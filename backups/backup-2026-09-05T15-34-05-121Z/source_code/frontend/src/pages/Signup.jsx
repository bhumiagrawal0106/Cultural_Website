import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import usePageMeta from '../hooks/usePageMeta';
import AuthCard from '../components/AuthCard';
import FormField, { FormError, PasswordInput, TextInput } from '../components/FormField';
import Spinner from '../components/Spinner/Spinner';
import { isValidEmail, isValidName, isValidPassword, NAME_MAX, PASSWORD_MIN } from '../utils/validation';

export default function Signup() {
  const { ui } = useLanguage();
  const { signup, isAuthenticated, restoring } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state && location.state.from) || '/dashboard';

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [busy, setBusy] = useState(false);

  usePageMeta(ui('signup'), ui('signupSub'));

  if (restoring) return <Spinner className="min-h-[50vh]" />;
  if (isAuthenticated) return <Navigate to={from} replace />;

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!isValidName(form.name)) next.name = ui('nameTooShort');
    if (!isValidEmail(form.email)) next.email = ui('invalidEmail');
    if (!isValidPassword(form.password)) next.password = ui('passwordTooShort');
    if (form.confirm !== form.password) next.confirm = ui('passwordsMismatch');
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
      await signup(form.name.trim(), form.email.trim(), form.password);
      navigate(from, { replace: true });
    } catch (err) {
      setServerError(err.status === 409 ? ui('errEmailInUse') : err.message || ui('errorGeneric'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthCard
      title={ui('signupTitle')}
      subtitle={ui('signupSub')}
      footer={
        <>
          {ui('haveAccount')}{' '}
          <Link to="/login" state={{ from }} className="font-semibold text-india-navy hover:underline">
            {ui('login')}
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <FormError message={serverError} />

        <FormField id="signup-name" label={ui('name')} error={errors.name}>
          <TextInput
            id="signup-name"
            type="text"
            autoComplete="name"
            autoFocus
            maxLength={NAME_MAX}
            value={form.name}
            onChange={update('name')}
            error={errors.name}
          />
        </FormField>

        <FormField id="signup-email" label={ui('email')} error={errors.email}>
          <TextInput
            id="signup-email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={update('email')}
            error={errors.email}
            placeholder="you@example.com"
          />
        </FormField>

        <FormField id="signup-password" label={ui('password')} hint={ui('passwordHint')} error={errors.password}>
          <PasswordInput
            id="signup-password"
            autoComplete="new-password"
            minLength={PASSWORD_MIN}
            value={form.password}
            onChange={update('password')}
            error={errors.password}
          />
        </FormField>

        <FormField id="signup-confirm" label={ui('confirmPassword')} error={errors.confirm}>
          <PasswordInput
            id="signup-confirm"
            autoComplete="new-password"
            value={form.confirm}
            onChange={update('confirm')}
            error={errors.confirm}
          />
        </FormField>

        <button type="submit" disabled={busy} className="btn-primary w-full py-2.5">
          {busy ? ui('submitting') : ui('signup')}
        </button>
      </form>
    </AuthCard>
  );
}
