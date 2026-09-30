import { SALVATION_NOTICE } from '../../data/site';

const SalvationNotice = ({ tone = 'deep', className = '' }) => (
  <aside
    className={`rounded-2xl border-l-4 border-gold-400 p-5 text-lg leading-relaxed ${
      tone === 'light' ? 'bg-ivory-100 text-navy-900' : 'bg-ivory-50/5 text-ivory-50'
    } ${className}`}
  >
    {SALVATION_NOTICE}
  </aside>
);
export default SalvationNotice;
