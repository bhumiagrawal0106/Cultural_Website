import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

/** Label + control + inline error/hint. Pass the control as children. */
export default function FormField({ id, label, hint, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-india-text">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1 text-xs text-gray-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function TextInput({ id, error, className = '', ...rest }) {
  return (
    <input
      id={id}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`input mt-1 ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : ''} ${className}`}
      {...rest}
    />
  );
}

export function PasswordInput(props) {
  const { ui } = useLanguage();
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <TextInput type={show ? 'text' : 'password'} className="pr-16" {...props} />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? ui('hidePassword') : ui('showPassword')}
        className="absolute right-2 top-1/2 mt-0.5 -translate-y-1/2 rounded px-2 py-1 text-xs font-semibold text-india-navy hover:bg-india-navy/5"
      >
        {show ? ui('hide') : ui('show')}
      </button>
    </div>
  );
}

export function FormError({ message }) {
  if (!message) return null;
  return (
    <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
      {message}
    </div>
  );
}
