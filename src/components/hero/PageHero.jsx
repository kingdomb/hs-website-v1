import useParallax from '../../hooks/useParallax';
import ResponsiveImage from '../ui/ResponsiveImage';
import Container from '../ui/Container';

const SIZES = { full: 'min-h-dvh', short: 'min-h-[60dvh]' };

const PageHero = ({ eyebrow, title, subtitle, image = 'hero-dove', size = 'short', actions, children }) => {
  const bg = useParallax(0.12);
  return (
    <section className={`relative isolate flex ${SIZES[size]} items-center overflow-hidden bg-navy-950 pt-header text-ivory-50`}>
      <div ref={bg} className='absolute inset-x-0 -top-[15%] -z-10 h-[130%]' aria-hidden='true'>
        <ResponsiveImage name={image} alt='' sizes='100vw' loading='eager' fetchPriority='high' className='h-full w-full object-cover' />
      </div>
      <div className='absolute inset-0 -z-10 bg-gradient-to-b from-navy-950/70 via-navy-950/60 to-navy-950' aria-hidden='true' />
      <Container className='py-16 text-center'>
        {eyebrow && <p className='mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-gold-400'>{eyebrow}</p>}
        <h1 className='mx-auto max-w-4xl text-5xl font-semibold leading-[1.05] lg:text-7xl'>{title}</h1>
        {subtitle && <p className='mx-auto mt-6 max-w-2xl text-lg opacity-90 lg:text-xl'>{subtitle}</p>}
        {children}
        {actions && <div className='mt-8 flex flex-col items-center justify-center gap-4 lg:flex-row'>{actions}</div>}
      </Container>
    </section>
  );
};
export default PageHero;
