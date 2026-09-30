///components/shared/PhoneVerify.jsx
import React, { useState } from 'react';
import { FIELD, BTN_PRIMARY, BTN_SECONDARY } from '../ui/fieldClasses';

export default function PhoneVerify({
  value,
  onChange,
  onVerified,
  label = 'Mobile Phone (SMS verification)',
  className = '',
  requestCode = async () => {
    // TODO: hit your backend to send an SMS code (e.g., Twilio)
    await new Promise((r) => setTimeout(r, 400));
    return { ok: true };
  },
  verifyCode = async (_phone, code) => {
    // TODO: verify code against your backend
    await new Promise((r) => setTimeout(r, 400));
    return { ok: code === '123456' }; // dev shortcut
  },
}) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const canSend =
    value && /^\+?[0-9\s\-()]{7,}$/.test(value) && !sending && !verified;

  const handleSend = async () => {
    try {
      setError('');
      setSending(true);
      const res = await requestCode(value);
      setSending(false);
      if (res?.ok) setSent(true);
      else setError('Could not send a code. Try again.');
    } catch {
      setSending(false);
      setError('Something went wrong sending the code.');
    }
  };

  const handleVerify = async () => {
    try {
      setError('');
      setVerifying(true);
      const res = await verifyCode(value, code);
      setVerifying(false);
      if (res?.ok) {
        setVerified(true);
        onVerified?.(value);
      } else {
        setError('That code didn’t match. Check the text and try again.');
      }
    } catch {
      setVerifying(false);
      setError('Could not verify the code. Try again.');
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <label className='block'>
        <span className='block mb-1 text-sm font-medium text-navy-800'>
          {label} <span className='text-navy-800/70'>(optional for now)</span>
        </span>
        <input
          type='tel'
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder='+1 405-555-1234'
          className={FIELD}
          disabled={verified}
        />
      </label>

      <div className='flex items-center gap-2'>
        <button
          type='button'
          onClick={handleSend}
          disabled={!canSend}
          className={BTN_PRIMARY}
        >
          {sending ? 'Sending…' : sent ? 'Resend Code' : 'Send Code'}
        </button>

        {verified && (
          <span className='text-sm font-medium text-royal-600'>Phone verified</span>
        )}
      </div>

      {sent && !verified && (
        <div className='flex items-end gap-2'>
          <label className='flex-1'>
            <span className='block mb-1 text-sm font-medium text-navy-800'>
              Enter Code
            </span>
            <input
              type='text'
              inputMode='numeric'
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder='123456'
              className={FIELD}
            />
          </label>
          <button
            type='button'
            onClick={handleVerify}
            className={BTN_SECONDARY}
          >
            {verifying ? 'Verifying…' : 'Verify'}
          </button>
        </div>
      )}

      {error && <p className='text-sm text-red-700'>{error}</p>}
    </div>
  );
}
