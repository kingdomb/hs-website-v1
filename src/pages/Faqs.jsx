import PageHero from '../components/hero/PageHero';
import Section from '../components/ui/Section';
import Container from '../components/ui/Container';
import Reveal from '../components/ui/Reveal';
import Accordion from '../components/ui/Accordion';
import SalvationNotice from '../components/shared/SalvationNotice';
import { FAQS } from '../data/faqs';

const Faqs = () => (
  <>
    <PageHero eyebrow='FAQs' title='Common questions' subtitle='Honest answers about the encounter, calling on the name of Jesus, and what Scripture says.' image='dove' />
    <Section tone='light'>
      <Container className='max-w-3xl'>
        <Reveal><SalvationNotice tone='light' className='mb-10' /></Reveal>
        <Reveal delay={100}><Accordion items={FAQS} headingLevel={2} tone='light' /></Reveal>
      </Container>
    </Section>
  </>
);
export default Faqs;
