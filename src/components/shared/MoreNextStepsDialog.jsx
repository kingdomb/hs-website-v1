import Modal from './Modal';
import NextStepCard from '../home/NextStepCard';
import CardGrid from '../ui/CardGrid';
import logo from '../../assets/hs-letter-logo-nav.png';
import { FORM_COPY, FORM_IMAGES } from '../../data/nextSteps';

const items = Object.entries(FORM_COPY).map(([key, def]) => ({
  key, title: def.title, text: def.subtitle, img: FORM_IMAGES[key],
}));

export default function MoreNextStepsDialog({ isOpen, onClose, onSelect, title = 'More Next Steps' }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth='max-w-4xl'>
      <div className='space-y-4 p-2'>
        <img src={logo} alt='' className='h-7 w-auto' />
        <CardGrid min='15rem'>
          {items.map((it) => (
            <NextStepCard key={it.key} title={it.title} text={it.text} img={it.img} onClick={() => onSelect?.(it.key)} />
          ))}
        </CardGrid>
      </div>
    </Modal>
  );
}
