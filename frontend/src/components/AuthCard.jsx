import { useLanguage } from '../context/LanguageContext';

/** Centered card shell shared by the Login and Signup pages. */
export default function AuthCard({ title, subtitle, children, footer }) {
  const { isHindi } = useLanguage();
  return (
    <div className="container-page animate-fade-up flex min-h-[70vh] items-center justify-center py-10">
      <div className="card w-full max-w-md">
        <div className="h-1.5 w-full bg-gradient-to-r from-india-orange via-white to-india-green" aria-hidden="true" />
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl font-extrabold text-india-navy sm:text-3xl" lang={isHindi ? 'hi' : 'en'}>
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-600" lang={isHindi ? 'hi' : 'en'}>
              {subtitle}
            </p>
          )}
          <div className="mt-6">{children}</div>
          {footer && <div className="mt-6 border-t border-gray-100 pt-4 text-center text-sm text-gray-600">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
