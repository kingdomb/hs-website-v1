// CardGrid.jsx — intrinsic responsive grid (no breakpoints) with staggered reveal
import { Children } from 'react';
import Reveal from './Reveal';

const CardGrid = ({ min = '16rem', className = '', children }) => (
  <div
    className={`grid gap-6 ${className}`}
    style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${min}), 1fr))` }}
  >
    {Children.toArray(children).map((child, i) => (
      <Reveal key={child.key ?? i} delay={i * 80} className='h-full'>
        {child}
      </Reveal>
    ))}
  </div>
);
export default CardGrid;
