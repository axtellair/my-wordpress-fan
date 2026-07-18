// formValidate.js — minimal form validation helpers
export function isEmail(value) {
  return /\S+@\S+\.\S+/.test(value);
}

export function isRequired(value) {
  return value != null && String(value).trim().length > 0;
}
