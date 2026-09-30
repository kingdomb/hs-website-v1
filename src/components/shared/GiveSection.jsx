import Section from '../ui/Section';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import TithelyGiveButton from './TithelyGiveButton';
import { GIVING } from '../../data/giving';

const GiveSection = () => (
  <Section tone='light' className='text-center'>
    <Container>
      <Reveal>
        <h2 className='mb-8 text-3xl font-semibold lg:text-4xl'>Thank you for supporting our community.</h2>
        <TithelyGiveButton />
        {GIVING.enabled && (
          <p className='mt-8 text-sm text-navy-800'>
            <a href={GIVING.formUrl} target='_blank' rel='noopener noreferrer' className='underline hover:text-royal-600'>View giving form</a>
            {' | '}
            <a href={GIVING.kioskUrl} target='_blank' rel='noopener noreferrer' className='underline hover:text-royal-600'>Open kiosk mode</a>
          </p>
        )}
      </Reveal>
    </Container>
  </Section>
);
export default GiveSection;
