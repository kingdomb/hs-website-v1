import Section from '../ui/Section';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import ImageCarousel from './ImageCarousel';
import SectionTextBlock from './SectionTextBlock';
import SalvationNotice from '../shared/SalvationNotice';

const carouselItems = [
  { name: 'woman-praying', alt: 'A woman in prayer as light gathers around her' },
  { name: 'surrender', alt: 'A silhouetted figure kneeling in surrender at dusk' },
  { name: 'open-door', alt: 'A softly lit open doorway' },
  { name: 'light-figure', alt: 'A figure wrapped in white light' },
];

const WelcomeSection = () => (
  <Section tone='deep'>
    <Container className='flex flex-col items-center gap-12 lg:flex-row'>
      <Reveal className='w-full lg:w-1/2'>
        <ImageCarousel items={carouselItems} />
      </Reveal>
      <Reveal delay={120} className='w-full lg:w-1/2'>
        <SectionTextBlock
          heading='A deeper encounter with the Holy Spirit'
          paragraph='Whether you are exploring faith or returning to it, this is a place to meet Jesus and to make room for the Helper He promised — who comforts, guides, and frees.'
          buttonText='About the ministry'
          buttonTo='/about'
        >
          <SalvationNotice className='mb-6' />
        </SectionTextBlock>
      </Reveal>
    </Container>
  </Section>
);
export default WelcomeSection;
