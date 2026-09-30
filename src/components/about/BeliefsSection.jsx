import Section from '../ui/Section';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import Accordion from '../ui/Accordion';
import Reveal from '../ui/Reveal';
import SalvationNotice from '../shared/SalvationNotice';
import { BELIEFS } from '../../data/beliefs';

const BeliefsSection = () => (
  <Section tone='light'>
    <Container className='max-w-3xl'>
      <SectionHeading tone='light' eyebrow='What we believe' title='Our beliefs' />
      <Reveal><SalvationNotice tone='light' className='mb-10' /></Reveal>
      <Reveal delay={100}><Accordion items={BELIEFS} tone='light' /></Reveal>
    </Container>
  </Section>
);
export default BeliefsSection;
