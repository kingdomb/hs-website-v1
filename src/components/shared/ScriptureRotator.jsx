import { useState } from 'react';
import { FiPause, FiPlay } from 'react-icons/fi';
import useRotation from '../../hooks/useRotation';

const ScriptureRotator = ({ items = [], intervalMs = 6000, className = '' }) => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const { index, visible } = useRotation(items.length, intervalMs, 350, hovered || focused || userPaused);
  if (!items.length) return null;
  const { quote, ref } = items[index];
  return (
    <div
      className={`mx-auto mt-6 min-h-[7rem] max-w-2xl text-lg italic text-ivory-50 lg:text-xl ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <div className={`transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <span className='block'>&ldquo;{quote}&rdquo;</span>
        <span className='mt-2 block text-sm not-italic text-gold-300'>{ref}</span>
      </div>
      {items.length > 1 && (
        <button
          type='button'
          aria-label={userPaused ? 'Play slideshow' : 'Pause slideshow'}
          onClick={() => setUserPaused((v) => !v)}
          className='mt-2 rounded-full p-2 text-sm not-italic text-ivory-50/80 hover:text-ivory-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300'
        >
          {userPaused ? <FiPlay aria-hidden='true' /> : <FiPause aria-hidden='true' />}
        </button>
      )}
    </div>
  );
};
export default ScriptureRotator;
