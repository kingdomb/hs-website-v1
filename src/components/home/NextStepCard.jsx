const NextStepCard = ({ title, text, img, onClick }) => (
  <button
    type='button'
    onClick={onClick}
    className='flex h-full w-full items-center gap-4 rounded-2xl bg-ivory-50 p-4 text-left text-navy-900 shadow-lg transition hover:-translate-y-1 hover:shadow-glow motion-reduce:transform-none motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300'
  >
    {img && <img src={img} alt='' className='h-20 w-20 shrink-0 rounded-lg object-cover' />}
    <span>
      <span className='block font-display text-xl font-semibold leading-tight'>{title}</span>
      <span className='block text-sm text-navy-800'>{text}</span>
    </span>
  </button>
);
export default NextStepCard;
