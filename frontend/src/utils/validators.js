export function validateRequired(value) {
  return value !== undefined && value !== null && String(value).trim() !== '';
}

export function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
}

export function validateForm(fields, values) {
  const errors = {};
  fields.forEach((field) => {
    if (field.required && !validateRequired(values[field.name])) {
      errors[field.name] = `${field.label} es requerido`;
      return;
    }
    if (field.type === 'email' && values[field.name] && !validateEmail(values[field.name])) {
      errors[field.name] = 'Formato de email inválido';
      return;
    }
    if (field.minLength && String(values[field.name] || '').length < field.minLength) {
      errors[field.name] = `${field.label} debe tener al menos ${field.minLength} caracteres`;
      return;
    }
    if (field.exactLength && String(values[field.name] || '').length !== field.exactLength) {
      errors[field.name] = `${field.label} debe tener ${field.exactLength} caracteres`;
      return;
    }
    if (field.pattern && values[field.name] && !field.pattern.test(String(values[field.name]))) {
      errors[field.name] = field.patternMessage || `${field.label} tiene formato inválido`;
    }
  });
  return errors;
}

export function castPayload(fields, values) {
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
    else payload[field.name] = typeof raw === 'string' ? raw.trim() : raw;
  });
  return payload;
}
