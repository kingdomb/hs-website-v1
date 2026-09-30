import Section from '../ui/Section';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import CardGrid from '../ui/CardGrid';
import { ENCOUNTER_STEPS } from '../../data/encounter';
import { PRACTICE_VERSES } from '../../data/scripture';

const HowItWorksSection = () => (
  <Section id='encounter' tone='mid'>
    <Container>
      <SectionHeading eyebrow='The encounter' title='Unhurried. Expectant. Open to Him.' subtitle='An encounter is a time set apart to call on the name of Jesus and make room for the Holy Spirit.' />
      <CardGrid min='17rem'>
        {ENCOUNTER_STEPS.map((step, i) => (
          <div key={step.title} className='h-full rounded-2xl border border-ivory-50/10 bg-navy-950/60 p-8'>
            <span className='font-display text-5xl text-gold-400'>{i + 1}</span>
            <h3 className='mt-2 text-2xl font-semibold'>{step.title}</h3>
            <p className='mt-3 opacity-80'>{step.body}</p>
          </div>
        ))}
      </CardGrid>
      <div className='mt-12'>
        <CardGrid min='18rem'>
          {PRACTICE_VERSES.map((v) => (
            <blockquote key={v.ref} className='h-full rounded-2xl border border-ivory-50/10 p-6'>
              <p className='italic'>&ldquo;{v.quote}&rdquo;</p>
              <footer className='mt-3 text-sm text-gold-300'>{v.ref}</footer>
            </blockquote>
          ))}
        </CardGrid>
      </div>
    </Container>
  </Section>
);
export default HowItWorksSection;
