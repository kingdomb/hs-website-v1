import Section from '../ui/Section';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import CardGrid from '../ui/CardGrid';
import WorshipOptionCard from './WorshipOptionCard';

// DB wiring later: <WorshipOptionsSection options={mapEventsToOptions(rows)} />  (see utils/mapEventsToOptions.js)
const WorshipOptionsSection = ({ options = [], subtitle = 'YouTube & TikTok channels coming soon for prayer and sharing.' }) => {
  const shown = options.slice(0, 3);
  const title = shown.length
    ? `${shown.length} upcoming ${shown.length === 1 ? 'event' : 'events'}`
    : 'Online prayer and worship — coming soon';
  return (
    <Section tone='mid'>
      <Container>
        <SectionHeading title={title} subtitle={subtitle} />
        {shown.length > 0 && (
          <CardGrid min='16rem'>{shown.map((o) => (<WorshipOptionCard key={o.title} {...o} />))}</CardGrid>
        )}
      </Container>
    </Section>
  );
};
export default WorshipOptionsSection;
