// ImageCarousel.jsx — items: [{ name, alt, caption? }] (name = ResponsiveImage name)
import { useState } from 'react';
import { FiPause, FiPlay } from 'react-icons/fi';
import ResponsiveImage from '../ui/ResponsiveImage';
import useRotation from '../../hooks/useRotation';

const ImageCarousel = ({ items = [], intervalMs = 6000 }) => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const { index, visible, goTo } = useRotation(items.length, intervalMs, 300, hovered || focused || userPaused);
  if (!items.length) return null;
  const { name, alt, caption } = items[index];
  const arrow =
    'absolute top-1/2 -translate-y-1/2 rounded-full bg-navy-950/50 px-3 py-2 text-ivory-50 backdrop-blur-sm hover:bg-navy-950/80';

  return (
    <div
      className='relative overflow-hidden rounded-2xl bg-navy-900 shadow-glow'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <ResponsiveImage
        name={name}
        alt={alt}
        sizes='(min-width: 1024px) 560px, 100vw'
        className={`aspect-[16/10] w-full object-cover transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
      />
      {caption && <div className='absolute inset-x-0 bottom-0 bg-navy-950/60 p-2 text-sm'>{caption}</div>}
      <button type='button' aria-label='Previous image' onClick={() => goTo(index - 1)} className={`${arrow} left-2`}>‹</button>
      <button type='button' aria-label='Next image' onClick={() => goTo(index + 1)} className={`${arrow} right-2`}>›</button>
      <button
        type='button'
        aria-label={userPaused ? 'Play slideshow' : 'Pause slideshow'}
        onClick={() => setUserPaused((v) => !v)}
        className='absolute right-2 top-2 rounded-full bg-navy-950/50 p-2 text-ivory-50 backdrop-blur-sm hover:bg-navy-950/80'
      >
        {userPaused ? <FiPlay aria-hidden='true' /> : <FiPause aria-hidden='true' />}
      </button>
      <div className='absolute inset-x-0 bottom-3 flex justify-center gap-2'>
        {items.map((it, i) => (
          <button
            key={it.name}
            type='button'
            aria-label={`Show image ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2 w-2 rounded-full ${i === index ? 'bg-ivory-50' : 'bg-ivory-50/50'}`}
          />
        ))}
      </div>
    </div>
  );
};
export default ImageCarousel;
