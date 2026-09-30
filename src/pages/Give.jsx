import PageHero from '../components/hero/PageHero';
import WhyWeGiveSection from '../components/give/WhyWeGiveSection';
import WaysToGiveSection from '../components/give/WaysToGiveSection';
import TithelyAppSection from '../components/give/TithelyAppSection';
import useTithelyScript from '../hooks/useTithelyScript';

const Give = () => {
  useTithelyScript();
  return (
    <>
      <PageHero eyebrow='Give' title='Why and how we give' image='hero-dove' />
      <WhyWeGiveSection />
      <WaysToGiveSection />
      <TithelyAppSection />
    </>
  );
};
export default Give;
