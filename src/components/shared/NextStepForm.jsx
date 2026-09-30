import React, { useState } from 'react';
import logo from '../../assets/hs-letter-logo-nav.png';
import { FIELD, BTN_PRIMARY } from '../ui/fieldClasses';
import Field from '../ui/Field';
import PhoneVerify from './PhoneVerify'; // same folder as Modal/other shared

/**
 * Generic form that mirrors PrayerRequestForm's UX.
 * - requirePhoneVerification: if true, blocks submit until verified (disabled for now in usage)
 */
const NextStepForm = ({
  title = 'Next Step',
  subtitle = 'Tell us a little about yourself.',
  submitLabel = 'Submit',
  requirePhoneVerification = false,
  onSubmitted,
}) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
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
    if (requirePhoneVerification && !phoneVerified) {
      e.phone = 'Please verify your phone number first.';
    }
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    // TODO: send to backend
    setSent(true);
    onSubmitted?.(form);
  };

  if (sent) {
    return (
      <div className='text-center'>
        <div className='flex items-center justify-center mb-4'>
          <img src={logo} alt='Holy Spirit logo' className='h-10' />
        </div>
        <h3 className='text-xl font-semibold mb-2'>Thanks!</h3>
        <p className='text-navy-800'>
          We’ve received your info and a team member may follow up.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className='space-y-4'>
      {/* Header with logo */}
      <div className='flex items-center gap-3'>
        <img src={logo} alt='Holy Spirit logo' className='h-8' />
        <div>
          <h3 className='text-lg font-semibold text-navy-900'>{title}</h3>
          {subtitle && <p className='text-sm text-navy-800'>{subtitle}</p>}
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

      <Field label='Message'>
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

      {/* Optional SMS verification UI (does not block unless requirePhoneVerification=true) */}
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
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default NextStepForm;
