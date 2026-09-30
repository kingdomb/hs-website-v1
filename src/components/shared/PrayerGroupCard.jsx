import React from 'react';

export default function PrayerGroupCard({ group }) {
  const bg = group?.heroImage
    ? {
        backgroundImage: `url("${group.heroImage}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {};

  return (
    <div className='rounded-xl overflow-hidden border border-navy-900/15 bg-ivory-50'>
      <div className='h-36 bg-navy-900/10' style={bg} />
      <div className='p-3 space-y-2'>
        {group?.frequency && (
          <p className='m-0 text-sm text-navy-800'>{group.frequency}</p>
        )}
        <h3 className='m-0 text-lg font-semibold text-navy-900'>
          {group?.name}
        </h3>

        {/* Topics */}
        {!!group?.topics?.length && (
          <div className='flex flex-wrap gap-2'>
            {group.topics.map((t) => (
              <span
                key={t}
                className='text-xs px-2.5 py-1 rounded-full bg-royal-500/10 text-royal-600 border border-royal-500/40'
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Audience + Location */}
        <div className='flex flex-wrap gap-2 items-center'>
          {group?.audience && (
            <span className='text-xs px-2.5 py-1 rounded-full bg-gold-400/20 text-navy-900 border border-gold-500'>
              {group.audience}
            </span>
          )}
          {group?.locationLabel && (
            <span className='text-sm text-navy-800'>{group.locationLabel}</span>
          )}
        </div>
      </div>
    </div>
  );
}
