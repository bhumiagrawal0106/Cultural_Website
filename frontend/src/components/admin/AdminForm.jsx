import { useState } from 'react';
import api from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import FormField, { FormError, TextInput } from '../FormField';
import { formToPayload, itemToForm, validateForm } from '../../utils/adminSchema';

/** Create / edit form for one document, driven by the collection's field schema. */
export default function AdminForm({ collection, item, states, onSaved, onCancel }) {
  const { ui } = useLanguage();
  const isEdit = Boolean(item && item._id);
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
    if (Object.keys(next).length) return;

    setBusy(true);
    setServerError('');
    try {
      const payload = formToPayload(collection.fields, values);
      const res = isEdit
        ? await api.put(`/api/admin/${collection.key}/${item._id}`, payload)
        : await api.post(`/api/admin/${collection.key}`, payload);
      onSaved(res.data);
    } catch (err) {
      setServerError(err.message || ui('errorGeneric'));
    } finally {
      setBusy(false);
    }
  };

  const control = (f) => {
    const id = `admin-${f.name.replace(/\./g, '-')}`;
    const invalid = errors[f.name] ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : '';
    const common = { id, value: values[f.name], onChange: update(f.name), disabled: busy, lang: f.lang };

    if (f.type === 'state' || f.type === 'select') {
      const options = f.type === 'state' ? states.map((s) => ({ value: s._id, label: s.name_en })) : f.options;
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
      return <textarea {...common} rows={f.type === 'list' ? 3 : 4} placeholder={f.placeholder} className={`input mt-1 resize-y ${invalid}`} />;
    }
    return (
      <TextInput
        {...common}
        type={f.type === 'number' ? 'number' : 'text'}
        step={f.type === 'number' ? 'any' : undefined}
        placeholder={f.placeholder}
        error={errors[f.name]}
      />
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
