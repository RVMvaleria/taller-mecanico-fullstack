import { useEffect, useMemo, useState } from 'react';
import { Save } from 'lucide-react';
import { validateForm } from '../../utils/validators.js';
import { buildFieldOptions } from '../../utils/entityConfigs.js';

function initialValues(fields, initialData = {}) {
  return fields.reduce((acc, field) => {
    if (field.type === 'checkbox') acc[field.name] = Boolean(initialData[field.name] ?? field.defaultValue ?? false);
    else acc[field.name] = initialData[field.name] ?? field.defaultValue ?? '';
    return acc;
  }, {});
}

function castPayload(fields, values) {
  const payload = {};
  fields.forEach((field) => {
    const raw = values[field.name];
    if (raw === '' || raw === undefined || raw === null) {
      if (!field.omitWhenEmpty) payload[field.name] = raw;
      return;
    }
    if (field.type === 'number') payload[field.name] = Number(raw);
    else if (field.type === 'checkbox') payload[field.name] = Boolean(raw);
    else if (field.type === 'datetime-local') payload[field.name] = new Date(raw).toISOString();
    else if (field.type === 'multiselect') {
      // For multiselect, map selected IDs to objects with motor ref and years
      if (Array.isArray(raw) && raw.length > 0) {
        const anio_inicio = values.anio_inicio || (new Date().getFullYear() - 10);
        const anio_fin = values.anio_fin || new Date().getFullYear();
        payload[field.name] = raw.map(motorId => ({
          motor: motorId,
          anio_inicio: Number(anio_inicio),
          anio_fin: Number(anio_fin)
        }));
      }
    } else if (field.type === 'select') {
      // For select fields: if storeId is true, keep the ID; otherwise use the nombre
      if (field.storeId) {
        payload[field.name] = raw;
      } else {
        const selectedOption = field.options?.find(opt => opt.value === raw);
        payload[field.name] = selectedOption?.object?.nombre || raw;
      }
    } else payload[field.name] = typeof raw === 'string' ? raw.trim() : raw;
  });
  // Remove anio_inicio and anio_fin from payload since they're only used for motores
  delete payload.anio_inicio;
  delete payload.anio_fin;
  return payload;
}

export default function DynamicForm({ fields, initialData, submitLabel = 'Guardar', loading, onSubmit, onCancel, lookups, config }) {
  const visibleFields = useMemo(() => fields.filter((field) => !field.hidden), [fields]);
  const [values, setValues] = useState(() => initialValues(visibleFields, initialData));
  const [errors, setErrors] = useState({});

  // Recalculate field options when values change (for dependent selects)
  const dynamicFields = useMemo(() => {
    if (!lookups || !config) return visibleFields;
    return visibleFields.map((field) => buildFieldOptions(field, lookups, values));
  }, [visibleFields, values, lookups, config]);

  useEffect(() => {
    setValues(initialValues(visibleFields, initialData));
    setErrors({});
  }, [visibleFields, initialData]);

  const setValue = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = validateForm(dynamicFields, values);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;
    onSubmit(castPayload(dynamicFields, values));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        {dynamicFields.map((field) => {
          const error = errors[field.name];
          return (
            <div key={field.name} className={field.fullWidth ? 'md:col-span-2' : ''}>
              {field.type !== 'checkbox' ? <label className="label" htmlFor={field.name}>{field.label}{field.required ? ' *' : ''}</label> : null}

              {field.type === 'textarea' ? (
                <textarea id={field.name} rows={4} className="input mt-2 resize-none" placeholder={field.placeholder} value={values[field.name] || ''} onChange={(e) => setValue(field.name, e.target.value)} />
              ) : field.type === 'multiselect' ? (
                <select id={field.name} className="input mt-2" multiple value={Array.isArray(values[field.name]) ? values[field.name] : []} onChange={(e) => setValue(field.name, Array.from(e.target.selectedOptions, option => option.value))}>
                  {(field.options || []).map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              ) : field.type === 'select' ? (
                <select id={field.name} className="input mt-2" value={values[field.name] || ''} onChange={(e) => setValue(field.name, e.target.value)} disabled={field.dependsOn && !values[field.dependsOn]}>
                  <option value="">{field.dependsOn && !values[field.dependsOn] ? `Selecciona una ${field.dependsOn} primero...` : 'Seleccionar...'}</option>
                  {(field.options || []).map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              ) : field.type === 'checkbox' ? (
                <label className="mt-2 flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <input type="checkbox" className="h-5 w-5 rounded border-slate-300 text-steel focus:ring-steel" checked={Boolean(values[field.name])} onChange={(e) => setValue(field.name, e.target.checked)} />
                  <span><span className="block text-sm font-semibold text-slate-800">{field.label}</span>{field.help ? <span className="text-xs text-slate-500">{field.help}</span> : null}</span>
                </label>
              ) : (
                <input id={field.name} type={field.type || 'text'} min={field.min} max={field.max} step={field.step} className="input mt-2" placeholder={field.placeholder} value={values[field.name] || ''} onChange={(e) => setValue(field.name, e.target.value)} />
              )}
              {field.help && field.type !== 'checkbox' ? <p className="mt-1 text-xs text-slate-500">{field.help}</p> : null}
              {error ? <p className="mt-1 text-xs font-semibold text-red-600">{error}</p> : null}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
        {onCancel ? <button type="button" onClick={onCancel} className="btn-secondary" disabled={loading}>Cancelar</button> : null}
        <button type="submit" className="btn-primary" disabled={loading}><Save className="h-4 w-4" />{loading ? 'Guardando...' : submitLabel}</button>
      </div>
    </form>
  );
}
