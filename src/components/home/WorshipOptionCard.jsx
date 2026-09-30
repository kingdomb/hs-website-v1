import { FiPlayCircle } from 'react-icons/fi';

const WorshipOptionCard = ({ Icon = FiPlayCircle, title, description, link }) => (
  <a href={link} target='_blank' rel='noopener noreferrer' className='group block h-full rounded-2xl border border-ivory-50/10 p-8 text-center transition hover:bg-ivory-50/5'>
    <Icon className='mx-auto mb-4 text-4xl text-gold-400' aria-hidden='true' />
    <h3 className='text-xl font-semibold'>{title}</h3>
    <p className='mt-2 text-sm opacity-80'>{description}</p>
  </a>
);
export default WorshipOptionCard;
