import { useId, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const Accordion = ({ items, tone = 'deep', headingLevel = 3 }) => {
  const [open, setOpen] = useState(null);
  const base = useId();
  const divider = tone === 'light' ? 'divide-navy-900/15' : 'divide-ivory-50/15';
  const Heading = `h${headingLevel}`;
  const ref = tone === 'light' ? 'text-royal-600' : 'text-gold-400';

  return (
    <div className={`divide-y ${divider}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${base}-${i}`;
        return (
          <div key={item.title}>
            <Heading className='m-0'>
              <button
                id={`${panelId}-btn`}
                type='button'
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className='flex w-full items-center justify-between gap-4 py-5 text-left font-display text-2xl font-semibold'
              >
                {item.title}
                <FiChevronDown className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
            </Heading>
            <div
              id={panelId}
              role='region'
              aria-labelledby={`${panelId}-btn`}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className='overflow-hidden'>
                <p className='pb-2 leading-relaxed opacity-90'>{item.body}</p>
                {item.refs && (
                  <p className={`pb-5 text-sm font-medium ${ref}`}>{item.refs.join(' · ')}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Accordion;
