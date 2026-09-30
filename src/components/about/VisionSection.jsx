import Section from '../ui/Section';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import Accordion from '../ui/Accordion';
import ResponsiveImage from '../ui/ResponsiveImage';
import { VISION_ITEMS } from '../../data/vision';

const VisionSection = () => (
  <Section tone='mid'>
    <Container className='flex flex-col gap-10 lg:flex-row lg:items-center'>
      <Reveal className='lg:w-2/5'>
        <ResponsiveImage name='worship-service' alt='Worshipers lifting their hands in a service' sizes='(min-width: 1024px) 420px, 100vw' className='aspect-[4/3] w-full rounded-2xl object-cover' />
      </Reveal>
      <Reveal delay={120} className='lg:w-3/5'>
        <h2 className='mb-6 text-4xl font-semibold'>Our vision</h2>
        <Accordion items={VISION_ITEMS} />
      </Reveal>
    </Container>
  </Section>
);
export default VisionSection;
