import React, { useState } from 'react';
import logo from '../../assets/hs-letter-logo-nav.png';
import { FIELD, BTN_PRIMARY } from '../ui/fieldClasses';
import Field from '../ui/Field';
import PhoneVerify from '../shared/PhoneVerify';

const PrayerRequestForm = ({
  onSubmitted,
  requirePhoneVerification = false,
}) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    campus: '',
    consent: false,
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required.';
    if (!form.lastName.trim()) e.lastName = 'Last name is required.';
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      e.email = 'Valid email is required.';
    if (!form.phone.trim()) e.phone = 'Phone is required.';
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (requirePhoneVerification && !phoneVerified) {
      e.phone = 'Please verify your phone number first.';
    }
    setErrors(e);
    if (Object.keys(e).length) return;

    // TODO: send to your backend
    setSent(true);
    onSubmitted?.(form);
  };

  if (sent) {
    return (
      <div className='text-center'>
        <div className='flex items-center justify-center mb-4'>
          <img src={logo} alt='Holy Spirit logo' className='h-10' />
        </div>
        <h3 className='text-xl font-semibold mb-2'>
          Thanks for sharing your request
        </h3>
        <p className='text-navy-800'>
          We’ll be praying with you and, if needed, a team member may follow up.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className='space-y-4'>
      {/* Header w/ logo */}
      <div className='flex items-center gap-3'>
        <img src={logo} alt='Holy Spirit logo' className='h-8' />
        <div>
          <h3 className='text-lg font-semibold text-navy-900'>
            Ask for Prayer
          </h3>
          <p className='text-sm text-navy-800'>We’d love to pray with you.</p>
        </div>
      </div>

      <div className='grid gap-4 grid-cols-[repeat(auto-fit,minmax(min(100%,14rem),1fr))]'>
        <Field label='First Name' required error={errors.firstName}>
          {(a) => (
            <input
              {...a}
              type='text'
              value={form.firstName}
              onChange={(e) => set('firstName', e.target.value)}
              className={`mt-1 ${FIELD}`}
            />
          )}
        </Field>
        <Field label='Last Name' required error={errors.lastName}>
          {(a) => (
            <input
              {...a}
              type='text'
              value={form.lastName}
              onChange={(e) => set('lastName', e.target.value)}
              className={`mt-1 ${FIELD}`}
            />
          )}
        </Field>
      </div>

      <div className='grid gap-4 grid-cols-[repeat(auto-fit,minmax(min(100%,14rem),1fr))]'>
        <Field label='Email' required error={errors.email}>
          {(a) => (
            <input
              {...a}
              type='email'
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              className={`mt-1 ${FIELD}`}
            />
          )}
        </Field>
        <Field label='Phone' required error={errors.phone}>
          {(a) => (
            <input
              {...a}
              type='tel'
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
              placeholder='(555) 555-5555'
              className={`mt-1 ${FIELD}`}
            />
          )}
        </Field>
      </div>

      <Field label='Prayer Request'>
        {(a) => (
          <textarea
            {...a}
            rows={5}
            value={form.message}
            onChange={(e) => set('message', e.target.value)}
            className={`mt-1 ${FIELD}`}
          />
        )}
      </Field>

      <label className='flex items-start gap-2'>
        <input
          type='checkbox'
          checked={form.consent}
          onChange={(e) => set('consent', e.target.checked)}
          className='mt-1 h-4 w-4 accent-royal-600'
        />
        <span className='text-sm text-navy-800'>
          By selecting this box, you consent to receive text messages related to
          your request.
        </span>
      </label>

      {/* Optional SMS verification UI (does not block submit unless requirePhoneVerification=true) */}
      <PhoneVerify
        value={form.phone}
        onChange={(v) => set('phone', v)}
        onVerified={() => setPhoneVerified(true)}
      />

      <div className='pt-2'>
        <button
          type='submit'
          className={BTN_PRIMARY}
        >
          Share Prayer Request
        </button>
      </div>
    </form>
  );
};

export default PrayerRequestForm;
