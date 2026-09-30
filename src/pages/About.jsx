import PageHero from '../components/hero/PageHero';
import BeliefsSection from '../components/about/BeliefsSection';
import VisionSection from '../components/about/VisionSection';
import LeadershipSection from '../components/about/LeadershipSection';
import FaqDialogButton from '../components/faq/FaqDialogButton';
import Section from '../components/ui/Section';
import Container from '../components/ui/Container';
import Reveal from '../components/ui/Reveal';
import { SITE } from '../data/site';

const About = () => (
  <>
    <PageHero eyebrow='About' title={SITE.name} subtitle='Beliefs and vision' image='dove' />
    <Section tone='deep' className='text-center'>
      <Container className='max-w-3xl'>
        <Reveal>
          <h2 className='mb-4 text-4xl font-semibold'>Who we are</h2>
          <p className='mb-8 text-lg opacity-90'>{SITE.tagline} We facilitate encounters with the Holy Spirit — unhurried times of calling on the name of Jesus — and help people walk with Him afterward.</p>
          <FaqDialogButton>Read the common questions</FaqDialogButton>
        </Reveal>
      </Container>
    </Section>
    <BeliefsSection />
    <VisionSection />
    <LeadershipSection />
  </>
);
export default About;
