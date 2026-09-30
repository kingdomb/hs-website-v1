import Section from '../ui/Section';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import TithelyGiveButton from '../shared/TithelyGiveButton';
import { GIVING } from '../../data/giving';

const WaysToGiveSection = () => (
  <Section tone='deep' className='text-center'>
    <Container>
      <SectionHeading eyebrow='Ways to give' title='Give online' subtitle={GIVING.enabled ? 'Use a debit or credit card to give once or set up recurring giving.' : 'Online giving is being set up. Please check back soon.'} />
      <Reveal><TithelyGiveButton /></Reveal>
    </Container>
  </Section>
);
export default WaysToGiveSection;
