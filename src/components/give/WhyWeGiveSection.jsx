import Section from '../ui/Section';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import ResponsiveImage from '../ui/ResponsiveImage';
import { SITE } from '../../data/site';

const reasons = [
  { title: 'Give your time and talent', body: 'Serve alongside us at an encounter or in community outreach across Atlanta.' },
  { title: 'Give your treasure', body: `Your gifts help ${SITE.name} host encounters, serve our neighbors, and share the gospel.` },
];

const WhyWeGiveSection = () => (
  <Section tone='light'>
    <Container className='flex flex-col items-center gap-10 lg:flex-row'>
      <Reveal className='lg:w-1/2'>
        <ResponsiveImage name='meals-handout' alt='Volunteers handing out meals' sizes='(min-width: 1024px) 520px, 100vw' className='aspect-[4/3] w-full rounded-2xl object-cover' />
      </Reveal>
      <Reveal delay={120} className='lg:w-1/2'>
        <h2 className='mb-4 text-4xl font-semibold'>Why we give</h2>
        <p className='mb-6 text-lg'>Giving is worship. God has given us everything, and we joyfully give back.</p>
        {reasons.map((r, i) => (
          <div key={r.title} className='mb-4'>
            <h3 className='text-2xl font-semibold'>{i + 1}. {r.title}</h3>
            <p className='text-navy-800'>{r.body}</p>
          </div>
        ))}
      </Reveal>
    </Container>
  </Section>
);
export default WhyWeGiveSection;
