import Section from '../ui/Section';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';
import { GIVING } from '../../data/giving';

const TithelyAppSection = () => GIVING.appLinks.length === 0 ? null : (
  <Section tone='mid' className='text-center'>
    <Container>
      <SectionHeading eyebrow='On the go' title='Download the Tithe.ly giving app' subtitle='Give from your phone.' />
      <Reveal className='flex flex-col items-center justify-center gap-4 lg:flex-row'>
        {GIVING.appLinks.map((a) => (
          <Button key={a.label} href={a.href} target='_blank' rel='noopener noreferrer' variant='outline'>{a.label}</Button>
        ))}
      </Reveal>
    </Container>
  </Section>
);
export default TithelyAppSection;
