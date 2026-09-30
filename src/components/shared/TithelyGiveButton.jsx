import { GIVING } from '../../data/giving';

const BASE = 'rounded-full px-10 py-3.5 text-lg font-bold transition';

const TithelyGiveButton = ({ children = 'Give', className = '' }) =>
  GIVING.enabled ? (
    <button type='button' data-form={GIVING.tithelyFormId} className={`tithely-give-button ${BASE} bg-gold-400 text-navy-950 hover:bg-gold-300 ${className}`}>
      {children}
    </button>
  ) : (
    <button type='button' disabled className={`${BASE} cursor-not-allowed border border-current opacity-60 ${className}`}>
      Giving coming soon
    </button>
  );
export default TithelyGiveButton;
