import { useState } from 'react';
import api from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import FormField, { FormError, TextInput } from '../FormField';
import SafeImage from '../SafeImage';
import { formToPayload, itemToForm, validateForm, normalizeWikipediaImageUrl } from '../../utils/adminSchema';
import { saveOverride } from '../../utils/culturalStorage';

/** Create / edit form for one document, driven by the collection's field schema. */
export default function AdminForm({ collection, item, states, onSaved, onCancel }) {
  const { ui } = useLanguage();
  const isEdit = Boolean(item && (item._id || item.slug));
  const [values, setValues] = useState(() => itemToForm(collection.fields, item));
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [busy, setBusy] = useState(false);

  const update = (name) => (e) => {
    const v = e.target.value;
    setValues((vs) => ({ ...vs, [name]: v }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const next = validateForm(collection.fields, values);
    setErrors(next);
    if (Object.keys(next).length) {
      setServerError(`Please check required fields: ${Object.keys(next).join(', ')}`);
      return;
    }

    setBusy(true);
    setServerError('');
    try {
      const payload = formToPayload(collection.fields, values);
      if (collection.placeType) {
        payload.type = collection.placeType;
      }

      // Ensure stateId is populated with object metadata
      if (payload.stateId && states && states.length > 0) {
        const matched = states.find((s) => s._id === payload.stateId || s.slug === payload.stateId);
        if (matched) {
          payload.stateId = {
            _id: matched._id || matched.slug,
            slug: matched.slug,
            name_en: matched.name_en,
            name_hi: matched.name_hi,
          };
        }
      }

      // Always save to client override store so changes reflect immediately!
      const finalDoc = {
        ...item,
        ...payload,
        _id: item?._id || `custom-${Date.now()}`,
        slug: item?.slug || payload.slug || payload.name_en?.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      };

      if (payload.images && payload.images.length > 0) {
        finalDoc.image = payload.images[0];
        finalDoc.images = payload.images;
      }
      if (payload.thumbnail) {
        finalDoc.thumbnail = payload.thumbnail;
        if (!finalDoc.image) finalDoc.image = payload.thumbnail;
      }

      saveOverride(finalDoc);

      // Also persist to backend API if available
      try {
        const backendKey = collection.backendKey || collection.key;
        const res = isEdit && item._id && !item._id.startsWith('custom-')
          ? await api.put(`/api/admin/${backendKey}/${item._id}`, payload)
          : await api.post(`/api/admin/${backendKey}`, payload);
        onSaved(res.data || finalDoc);
      } catch (apiErr) {
        // Even if backend fails or is offline, local save succeeded!
        onSaved(finalDoc);
      }
    } catch (err) {
      setServerError(err.message || ui('errorGeneric'));
    } finally {
      setBusy(false);
    }
  };

  const getImagePreview = () => {
    if (values.thumbnail) return normalizeWikipediaImageUrl(values.thumbnail.trim());
    if (values.images) {
      const first = values.images.split('\n')[0];
      if (first) return normalizeWikipediaImageUrl(first.trim());
    }
    return null;
  };

  const previewImage = getImagePreview();

  const control = (f) => {
    const id = `admin-${f.name.replace(/\./g, '-')}`;
    const invalid = errors[f.name] ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : '';
    const common = { id, value: values[f.name], onChange: update(f.name), disabled: busy, lang: f.lang };

    if (f.type === 'state' || f.type === 'select') {
      const options = f.type === 'state' ? states.map((s) => ({ value: s._id || s.slug, label: s.name_en })) : f.options;
      return (
        <select {...common} className={`input mt-1 ${invalid}`}>
          <option value="">Select...</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      );
    }
    if (f.type === 'textarea' || f.type === 'list') {
      return (
        <div>
          <textarea {...common} rows={f.type === 'list' ? 3 : 4} placeholder={f.placeholder} className={`input mt-1 resize-y ${invalid}`} />
          {f.name === 'images' && previewImage && (
            <div className="mt-2.5 flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/80 p-2.5">
              <SafeImage
                src={previewImage}
                alt="Live Preview"
                fallbackText={values.name_en || 'Preview'}
                className="h-16 w-24 rounded-lg object-cover shadow-sm border border-gray-200"
              />
              <div className="min-w-0 text-xs text-gray-600">
                <span className="inline-flex items-center gap-1 font-semibold text-india-green">
                  <span className="h-2 w-2 rounded-full bg-india-green" /> Live Image Preview
                </span>
                <p className="truncate text-gray-400 mt-0.5 max-w-xs sm:max-w-md">{previewImage}</p>
              </div>
            </div>
          )}
        </div>
      );
    }
    return (
      <div>
        <TextInput
          {...common}
          type={f.type === 'number' ? 'number' : 'text'}
          step={f.type === 'number' ? 'any' : undefined}
          placeholder={f.placeholder}
          error={errors[f.name]}
        />
        {f.name === 'thumbnail' && previewImage && (
          <div className="mt-2.5 flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/80 p-2.5">
            <SafeImage
              src={previewImage}
              alt="Live Preview"
              fallbackText={values.name_en || 'Preview'}
              className="h-16 w-24 rounded-lg object-cover shadow-sm border border-gray-200"
            />
            <div className="min-w-0 text-xs text-gray-600">
              <span className="inline-flex items-center gap-1 font-semibold text-india-green">
                <span className="h-2 w-2 rounded-full bg-india-green" /> Live Image Preview
              </span>
              <p className="truncate text-gray-400 mt-0.5 max-w-xs">{previewImage}</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={submit} noValidate className="card p-5 sm:p-6 animate-fade-up">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-bold text-india-navy">
          {isEdit ? `${ui('edit')}: ${item.name_en}` : `${ui('addNew')} ${collection.singular}`}
        </h2>
        <button type="button" onClick={onCancel} className="btn-ghost" disabled={busy}>
          {ui('cancel')}
        </button>
      </div>

      <div className="mt-4">
        <FormError message={serverError} />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {collection.fields.map((f) => (
          <div key={f.name} className={f.type === 'textarea' || f.type === 'list' ? 'sm:col-span-2' : ''}>
            <FormField id={`admin-${f.name.replace(/\./g, '-')}`} label={f.required ? `${f.label} *` : f.label} hint={f.hint} error={errors[f.name]}>
              {control(f)}
            </FormField>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap justify-end gap-2 border-t border-gray-100 pt-4">
        <button type="button" onClick={onCancel} className="btn-outline" disabled={busy}>
          {ui('cancel')}
        </button>
        <button type="submit" className="btn-primary px-6" disabled={busy}>
          {busy ? ui('submitting') : ui('save')}
        </button>
      </div>
    </form>
  );
}
