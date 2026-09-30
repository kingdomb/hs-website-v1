import { useState } from 'react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import CardGrid from '../ui/CardGrid';
import Modal from '../shared/Modal';
import MoreNextStepsDialog from '../shared/MoreNextStepsDialog';
import NextStepForm from '../shared/NextStepForm';
import PrayerGroupDialog from '../shared/PrayerGroupDialog';
import PrayerRequestForm from './PrayerRequestForm';
import NextStepCard from './NextStepCard';
import { NEXT_STEP_CARDS, FORM_COPY } from '../../data/nextSteps';

const groups = []; // replace with real data when ready; empty shows the "No PrayerGroups yet" state

const NextStepsSection = () => {
  const [dialog, setDialog] = useState(null); // 'prayer' | 'group' | 'more' | null
  const [formKind, setFormKind] = useState(null); // key of FORM_COPY | null
  const close = () => setDialog(null);
  const form = formKind ? FORM_COPY[formKind] : null;

  return (
    <Section id='next-steps' tone='mid'>
      <Container>
        <SectionHeading eyebrow='Your next step' title='Take a step toward Him' subtitle='Ask for prayer, find a group, or tell us about a decision you have made.' />
        <CardGrid min='17rem'>
          {NEXT_STEP_CARDS.map((c) => (
            <NextStepCard key={c.id} {...c} onClick={() => setDialog(c.id)} />
          ))}
        </CardGrid>
      </Container>

      <Modal isOpen={dialog === 'prayer'} onClose={close} title='Ask for Prayer'>
        <PrayerRequestForm requirePhoneVerification={false} onSubmitted={close} />
      </Modal>
      <PrayerGroupDialog isOpen={dialog === 'group'} onClose={close} onStart={() => {}} groups={groups} title='Join a PrayerGroup' />
      <MoreNextStepsDialog
        isOpen={dialog === 'more'}
        onClose={close}
        onSelect={(kind) => { close(); setFormKind(kind); }}
      />
      <Modal isOpen={!!form} onClose={() => setFormKind(null)} title={form?.title ?? ''}>
        {form && (
          <NextStepForm {...form} requirePhoneVerification={false} onSubmitted={() => setFormKind(null)} />
        )}
      </Modal>
    </Section>
  );
};
export default NextStepsSection;
