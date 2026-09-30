// src/components/shared/PrayerGroupDialog.jsx
import React from 'react';
import Modal from './Modal';
import PrayerGroupCard from './PrayerGroupCard';
import { BTN_PRIMARY, BTN_SECONDARY } from '../ui/fieldClasses';
import logo from '../../assets/hs-letter-logo-nav.png';

export default function PrayerGroupDialog({
  isOpen,
  onClose,
  onStart,
  groups = [],
  title = 'Join a PrayerGroup',
}) {
  const empty = !groups || groups.length === 0;

  // Centralize disabled handling (disabled for now)
  const startDisabled = true;

  // Guard against any parent onClick firing when disabled
  const stopIfDisabled = (e) => {
    if (startDisabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <section className='p-5 space-y-4'>
        {/* Keep logo (title is shown by the Modal) */}
        <img src={logo} alt='' className='h-7 w-auto' />

        {empty ? (
          <div className='space-y-3 text-navy-800'>
            <h3 className='text-lg font-semibold text-navy-900 m-0'>
              No PrayerGroups yet
            </h3>
            <p>
              Right now there aren’t any PrayerGroups. Check back soon to start
              a PrayerGroup to meet this need in your community.
            </p>
            <div className='flex gap-2 pt-1.5'>
              <button
                type='button'
                onClick={startDisabled ? stopIfDisabled : onStart}
                onClickCapture={stopIfDisabled}
                disabled={startDisabled}
                aria-disabled={startDisabled}
                className={`${BTN_PRIMARY} ${startDisabled ? 'cursor-not-allowed pointer-events-none' : ''}`}
              >
                Start a PrayerGroup
              </button>

              <button
                type='button'
                onClick={onClose}
                className={BTN_SECONDARY}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h3 className='text-base font-medium text-navy-900'>
                {groups.length} PrayerGroup{groups.length > 1 ? 's' : ''}
              </h3>

              <button
                type='button'
                onClick={startDisabled ? stopIfDisabled : onStart}
                onClickCapture={stopIfDisabled}
                disabled={startDisabled}
                aria-disabled={startDisabled}
                className={`${BTN_PRIMARY} ${startDisabled ? 'cursor-not-allowed pointer-events-none' : ''}`}
              >
                Start a PrayerGroup
              </button>
            </div>

            <div className='grid gap-4 grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))]'>
              {groups.map((g) => (
                <PrayerGroupCard key={g.id} group={g} />
              ))}
            </div>
          </div>
        )}
      </section>
    </Modal>
  );
}
