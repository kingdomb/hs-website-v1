import { TONES } from './tones';

const Section = ({ tone = 'deep', id, className = '', children }) => (
  <section id={id} className={`${TONES[tone].section} py-20 lg:py-28 ${className}`}>
    {children}
  </section>
);
export default Section;
