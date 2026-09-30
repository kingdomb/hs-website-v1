import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import useScrollLock from '../../hooks/useScrollLock';
import { NAV_LINKS, NAV_CTA } from '../../data/nav';
import Button from '../ui/Button';

// Rendered as a SIBLING of <header> (never inside its backdrop-filter).
const MobileMenu = ({ id, open, onClose, returnFocusRef }) => {
  const closeRef = useRef(null);
  useScrollLock(open);

  useEffect(() => {
    if (!open) return undefined;
    const trigger = returnFocusRef?.current;
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e) => e.matches && onClose();
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onChange);
    return () => {
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onChange);
      trigger?.focus();
    };
  }, [open, onClose, returnFocusRef]);

  if (!open) return null;
  return (
    <div id={id} className='fixed inset-0 z-[60] flex flex-col bg-navy-950 p-6 lg:hidden' role='dialog' aria-modal='true' aria-label='Menu'>
      <button ref={closeRef} type='button' aria-label='Close menu' onClick={onClose} className='self-end p-2 text-ivory-50'>
        <FiX size={28} />
      </button>
      <ul className='mt-8 flex flex-col gap-6 font-display text-4xl'>
        {NAV_LINKS.map((l) => (
          <li key={l.label}>
            <Link to={l.to} onClick={onClose} className='block text-ivory-50 hover:text-gold-300'>{l.label}</Link>
          </li>
        ))}
      </ul>
      <Button to={NAV_CTA.to} onClick={onClose} className='mt-auto'>{NAV_CTA.label}</Button>
    </div>
  );
};
export default MobileMenu;
