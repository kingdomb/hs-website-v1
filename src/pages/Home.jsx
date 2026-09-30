import PageHero from '../components/hero/PageHero';
import ScriptureRotator from '../components/shared/ScriptureRotator';
import FaqDialogButton from '../components/faq/FaqDialogButton';
import Button from '../components/ui/Button';
import WelcomeSection from '../components/home/WelcomeSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import NextStepsSection from '../components/home/NextStepsSection';
import WorshipOptionsSection from '../components/home/WorshipOptionsSection';
import UpcomingEventsSection from '../components/home/UpcomingEventsSection';
import GiveSection from '../components/shared/GiveSection';
import useTithelyScript from '../hooks/useTithelyScript';
import { HERO_SCRIPTURE } from '../data/scripture';
import { NAV_CTA } from '../data/nav';

const Home = () => {
  useTithelyScript();
  return (
    <>
      <PageHero
        size='full'
        eyebrow='Holy Spirit Ministries'
        title='Encounter the Holy Spirit'
        subtitle='An immersive, unhurried time of calling on the name of Jesus — to feel Him more deeply and to see resistance and strongholds broken.'
        actions={
          <>
            <Button to={NAV_CTA.to}>{NAV_CTA.label}</Button>
            <FaqDialogButton />
          </>
        }
      >
        <ScriptureRotator items={HERO_SCRIPTURE} />
      </PageHero>
      <WelcomeSection />
      <HowItWorksSection />
      <NextStepsSection />
      <WorshipOptionsSection />
      <UpcomingEventsSection />
      <GiveSection />
    </>
  );
};
export default Home;
