// 表单字段校验
export function setFieldInvalid(inputId, invalid) {
  const field = document.getElementById(inputId).closest('.field');
  field.classList.toggle('invalid', invalid);
}

export function validateContactForm() {
  let ok = true;
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const message = document.getElementById('message').value.trim();
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const nameOk = name.length >= 2;
  setFieldInvalid('name', !nameOk);
  ok &&= nameOk;

  const emailOk = emailReg.test(email);
  setFieldInvalid('email', !emailOk);
  ok &&= emailOk;

  const phoneOk = !phone || /^[+\d][\d\s\-()]{6,}$/.test(phone);
  setFieldInvalid('phone', !phoneOk);
  ok &&= phoneOk;

  const msgOk = message.length >= 10;
  setFieldInvalid('message', !msgOk);
  ok &&= msgOk;

  return ok;
}
