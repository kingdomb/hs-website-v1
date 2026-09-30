//src/components/shared/StartPrayerGroupForm.jsx
import React, { useMemo, useState } from 'react';
import { FIELD, BTN_PRIMARY, BTN_SECONDARY } from '../ui/fieldClasses';
import PhoneVerify from './PhoneVerify';

const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const CADENCE = ['Weekly', 'Biweekly', 'Monthly'];
const TIMEZONES = ['ET', 'CT', 'MT', 'PT'];
const AUDIENCE = [
  'Anyone',
  'Men',
  'Women',
  'Couples',
  'Students',
  'Young Adults',
  'Seniors',
];
const MEETING_MODE = ['Online', 'In Person'];
const TOPICS = [
  'Bible Study',
  'Friendship',
  'Mental Health',
  'Prayer',
  'Serving',
  'Parents',
  'Young Adults',
  'New to Faith',
];

function formatFrequency(cadence, day, time, tz) {
  if (!cadence || !day || !time || !tz) return '';
  const [H, M] = time.split(':').map(Number);
  const h12 = ((H + 11) % 12) + 1;
  const ampm = H >= 12 ? 'pm' : 'am';
  return `${cadence} on ${day} at ${h12}:${String(M ?? 0).padStart(
    2,
    '0'
  )}${ampm} ${tz}`;
}

export default function StartPrayerGroupForm({
  onCancel,
  onCreate,
  requirePhoneVerification = false, // <-- gating toggle (disabled by default)
}) {
  const [name, setName] = useState('');
  const [leader, setLeader] = useState('');
  const [audience, setAudience] = useState('Anyone');
  const [cadence, setCadence] = useState('Weekly');
  const [day, setDay] = useState('Wednesday');
  const [time, setTime] = useState('19:00');
  const [tz, setTz] = useState('ET');
  const [mode, setMode] = useState('Online');
  const [city, setCity] = useState('');
  const [stateProv, setStateProv] = useState('');
  const [topics, setTopics] = useState([]);
  const [desc, setDesc] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneVerified, setPhoneVerified] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const frequency = useMemo(
    () => formatFrequency(cadence, day, time, tz),
    [cadence, day, time, tz]
  );

  const toggleTopic = (t) =>
    setTopics((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

  const phoneGateOK = requirePhoneVerification ? phoneVerified : true;

  const canSubmit =
    name.trim() &&
    leader.trim() &&
    audience &&
    cadence &&
    day &&
    time &&
    tz &&
    mode &&
    (mode === 'Online' || (city.trim() && stateProv.trim())) &&
    phoneGateOK &&
    !submitting;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phoneGateOK) {
      setError('Please verify your phone number first.');
      return;
    }
    try {
      setError('');
      setSubmitting(true);
      const id = `pg_${Date.now()}`;
      const locationLabel =
        mode === 'Online' ? 'Meets Online' : `${city}, ${stateProv}`;
      const group = {
        id,
        name,
        frequency,
        topics,
        audience,
        locationLabel,
        heroImage: heroImage || undefined,
        leader,
        description: desc,
        phone,
      };
      await new Promise((r) => setTimeout(r, 450));
      onCreate?.(group);
    } catch {
      setError('Could not create the group. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6 p-5'>
      <div className='grid gap-4 grid-cols-[repeat(auto-fit,minmax(min(100%,14rem),1fr))]'>
        <label className='col-span-full'>
          <span className='block mb-1 text-sm font-medium text-navy-800'>
            Group Name
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={FIELD}
            placeholder='Wednesday Evening Prayer'
          />
        </label>

        <label>
          <span className='block mb-1 text-sm font-medium text-navy-800'>
            Leader Name
          </span>
          <input
            value={leader}
            onChange={(e) => setLeader(e.target.value)}
            className={FIELD}
            placeholder='Your name'
          />
        </label>

        <label>
          <span className='block mb-1 text-sm font-medium text-navy-800'>
            Audience
          </span>
          <select
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className={FIELD}
          >
            {AUDIENCE.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </label>

        <label>
          <span className='block mb-1 text-sm font-medium text-navy-800'>
            Cadence
          </span>
          <select
            value={cadence}
            onChange={(e) => setCadence(e.target.value)}
            className={FIELD}
          >
            {CADENCE.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>

        <label>
          <span className='block mb-1 text-sm font-medium text-navy-800'>
            Day of Week
          </span>
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className={FIELD}
          >
            {DAYS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>

        <label>
          <span className='block mb-1 text-sm font-medium text-navy-800'>
            Time
          </span>
          <input
            type='time'
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={FIELD}
          />
        </label>

        <label>
          <span className='block mb-1 text-sm font-medium text-navy-800'>
            Time Zone
          </span>
          <select
            value={tz}
            onChange={(e) => setTz(e.target.value)}
            className={FIELD}
          >
            {TIMEZONES.map((z) => (
              <option key={z}>{z}</option>
            ))}
          </select>
        </label>

        <label>
          <span className='block mb-1 text-sm font-medium text-navy-800'>
            Meeting Type
          </span>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className={FIELD}
          >
            {MEETING_MODE.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </label>

        {mode === 'In Person' && (
          <>
            <label>
              <span className='block mb-1 text-sm font-medium text-navy-800'>
                City
              </span>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={FIELD}
                placeholder='Edmond'
              />
            </label>
            <label>
              <span className='block mb-1 text-sm font-medium text-navy-800'>
                State / Province
              </span>
              <input
                value={stateProv}
                onChange={(e) => setStateProv(e.target.value)}
                className={FIELD}
                placeholder='OK'
              />
            </label>
          </>
        )}

        <div className='col-span-full'>
          <span className='block mb-1 text-sm font-medium text-navy-800'>
            Topics
          </span>
          <div className='flex flex-wrap gap-2'>
            {TOPICS.map((t) => (
              <label
                key={t}
                className={`px-3 py-1.5 rounded-full border cursor-pointer select-none ${
                  topics.includes(t)
                    ? 'bg-royal-500/10 border-royal-500 text-royal-600'
                    : 'bg-ivory-50 border-navy-900/20 text-navy-800'
                }`}
              >
                <input
                  type='checkbox'
                  className='sr-only'
                  checked={topics.includes(t)}
                  onChange={() => toggleTopic(t)}
                />
                {t}
              </label>
            ))}
          </div>
        </div>

        <label className='col-span-full'>
          <span className='block mb-1 text-sm font-medium text-navy-800'>
            Hero Image URL (optional)
          </span>
          <input
            value={heroImage}
            onChange={(e) => setHeroImage(e.target.value)}
            placeholder='https://…'
            className={FIELD}
          />
        </label>

        <label className='col-span-full'>
          <span className='block mb-1 text-sm font-medium text-navy-800'>
            Short Description
          </span>
          <textarea
            rows={3}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className={FIELD}
            placeholder='What can people expect?'
          />
        </label>

        <PhoneVerify
          value={phone}
          onChange={setPhone}
          onVerified={() => setPhoneVerified(true)}
          className='col-span-full'
        />
      </div>

      {frequency && (
        <p className='text-sm text-navy-800'>
          <span className='font-medium text-navy-900'>Preview:</span>{' '}
          {frequency}
        </p>
      )}
      {error && <p className='text-sm text-red-700'>{error}</p>}

      <div className='flex justify-end gap-2 pt-1'>
        <button
          type='button'
          onClick={onCancel}
          className={BTN_SECONDARY}
        >
          Cancel
        </button>
        <button
          type='submit'
          disabled={!canSubmit}
          className={BTN_PRIMARY}
        >
          {submitting ? 'Creating…' : 'Create PrayerGroup'}
        </button>
      </div>
    </form>
  );
}
