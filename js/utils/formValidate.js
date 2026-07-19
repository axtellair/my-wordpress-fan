/**
 * Form Validation Utility
 * Handles form validation, error display, and submission handling
 */

class FormValidator {
  constructor(formSelector, options = {}) {
    this.form = typeof formSelector === 'string'
      ? document.querySelector(formSelector)
      : formSelector;

    if (!this.form) {
      console.error('Form element not found');
      return;
    }

    this.options = {
      errorClassName: 'invalid',
      errorMessageSelector: '.err-msg',
      successCallback: null,
      ...options
    };

    this.rules = new Map();
    this.init();
  }

  /**
   * Initialize form event listeners
   */
  init() {
    // Add input listeners to clear errors on typing
    this.form.querySelectorAll('input, textarea').forEach(el => {
      el.addEventListener('input', () => this.clearFieldError(el));
    });

    // Add form submit listener
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  /**
   * Add validation rule for a field
   * @param {string} fieldName - Field name/id
   * @param {Function|Object} rule - Validation function or rules object
   */
  addRule(fieldName, rule) {
    this.rules.set(fieldName, rule);
  }

  /**
   * Add multiple validation rules
   * @param {Object} rulesObject - { fieldName: validationFn, ... }
   */
  addRules(rulesObject) {
    Object.entries(rulesObject).forEach(([fieldName, rule]) => {
      this.addRule(fieldName, rule);
    });
  }

  /**
   * Validate a single field
   * @param {string} fieldId - Field ID/name
   * @returns {Object} { valid: boolean, message: string }
   */
  validateField(fieldId) {
    const element = document.getElementById(fieldId);
    if (!element) return { valid: false, message: 'Field not found' };

    const rule = this.rules.get(fieldId);
    if (!rule) return { valid: true, message: '' };

    const result = typeof rule === 'function'
      ? rule(element.value.trim())
      : this.applyRuleObject(rule, element.value.trim());

    return result;
  }

  /**
   * Apply rule object validation
   * @private
   */
  applyRuleObject(rule, value) {
    if (rule.required && !value) {
      return { valid: false, message: rule.errorMessage || 'This field is required' };
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      return { valid: false, message: rule.errorMessage || 'Invalid format' };
    }

    if (rule.minLength && value.length < rule.minLength) {
      return { valid: false, message: rule.errorMessage || `Minimum ${rule.minLength} characters required` };
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      return { valid: false, message: rule.errorMessage || `Maximum ${rule.maxLength} characters allowed` };
    }

    if (rule.custom && !rule.custom(value)) {
      return { valid: false, message: rule.errorMessage || 'Invalid input' };
    }

    return { valid: true, message: '' };
  }

  /**
   * Validate entire form
   * @returns {Object} { valid: boolean, errors: Map }
   */
  validate() {
    const errors = new Map();
    let valid = true;

    this.rules.forEach((_, fieldId) => {
      const result = this.validateField(fieldId);
      if (!result.valid) {
        valid = false;
        errors.set(fieldId, result.message);
        this.setFieldError(fieldId, result.message);
      } else {
        this.clearFieldError(fieldId);
      }
    });

    return { valid, errors };
  }

  /**
   * Set field error state and message
   * @private
   */
  setFieldError(fieldId, message = '') {
    const element = document.getElementById(fieldId);
    if (!element) return;

    const field = element.closest('.field');
    if (field) {
      field.classList.add(this.options.errorClassName);
      const errorEl = field.querySelector(this.options.errorMessageSelector);
      if (errorEl && message) {
        errorEl.textContent = message;
      }
    }
  }

  /**
   * Clear field error state
   * @private
   */
  clearFieldError(fieldOrId) {
    const element = typeof fieldOrId === 'string'
      ? document.getElementById(fieldOrId)
      : fieldOrId;

    if (!element) return;

    const field = element.closest('.field');
    if (field) {
      field.classList.remove(this.options.errorClassName);
    }
  }

  /**
   * Handle form submission
   * @private
   */
  async handleSubmit(e) {
    e.preventDefault();

    const validation = this.validate();
    if (!validation.valid) return;

    // Call custom success callback if provided
    if (this.options.successCallback) {
      await this.options.successCallback(new FormData(this.form));
    }
  }

  /**
   * Reset form to initial state
   */
  reset() {
    this.form.reset();
    this.form.querySelectorAll('.field').forEach(field => {
      field.classList.remove(this.options.errorClassName);
    });
  }

  /**
   * Get form data as object
   * @returns {Object}
   */
  getFormData() {
    const formData = new FormData(this.form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    return data;
  }
}

export default FormValidator;
