import Section from '../ui/Section';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import CardGrid from '../ui/CardGrid';
import EventCard from './EventCard';
import { EVENT_DEFS } from '../../data/events';
import { getUpcomingEventRows } from '../../utils/nextEvents';
import { mapEventsToCards } from '../../utils/mapEventsToCards';

// DB wiring later: pass `rows` from a fetch instead of the computed recurring events.
const UpcomingEventsSection = ({
  rows = getUpcomingEventRows(EVENT_DEFS),
  title = 'Serve with us',
  subtitle = 'Our homeless food outreach is every second Sunday, with community meals at Thanksgiving and Christmas. Bring a friend.',
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcoming = rows.filter((r) => new Date(r.startsOn) >= today).slice(0, 3);
  const cards = mapEventsToCards(upcoming);
  return (
    <Section id='events' tone='deep'>
      <Container>
        <SectionHeading eyebrow='Events' title={title} subtitle={subtitle} />
        {cards.length > 0 ? (
          <CardGrid min='17rem'>
            {cards.map((c) => (<EventCard key={c.title} {...c} />))}
          </CardGrid>
        ) : (
          <p className='text-center text-lg opacity-80'>Upcoming events will be posted here.</p>
        )}
      </Container>
    </Section>
  );
};
export default UpcomingEventsSection;
