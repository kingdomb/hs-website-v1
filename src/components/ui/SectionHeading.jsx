import Reveal from './Reveal';
import { TONES } from './tones';

const SectionHeading = ({ eyebrow, title, subtitle, tone = 'deep', className = '' }) => (
  <Reveal className={`mx-auto mb-12 max-w-2xl text-center ${className}`}>
    {eyebrow && (
      <p className={`mb-3 text-sm font-semibold uppercase tracking-[0.2em] ${TONES[tone].eyebrow}`}>
        {eyebrow}
      </p>
    )}
    <h2 className='text-4xl font-semibold leading-tight lg:text-5xl'>{title}</h2>
    {subtitle && <p className='mt-4 text-lg opacity-80'>{subtitle}</p>}
  </Reveal>
);
export default SectionHeading;
