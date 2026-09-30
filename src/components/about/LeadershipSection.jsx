import Section from '../ui/Section';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import CardGrid from '../ui/CardGrid';
import { LEADERS } from '../../data/leaders';

const LeadershipSection = () => {
  if (!LEADERS.length) return null;
  return (
    <Section tone='deep'>
      <Container>
        <SectionHeading eyebrow='Leadership' title='Meet our ministry leaders' />
        <CardGrid min='12rem'>
          {LEADERS.map((l) => (
            <div key={l.name} className='text-center'>
              {l.photo && <img src={l.photo} alt={l.name} className='mx-auto h-32 w-32 rounded-full object-cover' loading='lazy' />}
              <p className='mt-4 font-display text-xl font-semibold'>{l.name}</p>
              <p className='text-sm opacity-70'>{l.role}</p>
            </div>
          ))}
        </CardGrid>
      </Container>
    </Section>
  );
};
export default LeadershipSection;
