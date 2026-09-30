import ResponsiveImage from '../ui/ResponsiveImage';

const CARD = 'group block h-full overflow-hidden rounded-2xl bg-navy-900 shadow-lg transition hover:-translate-y-1 hover:shadow-glow motion-reduce:transform-none motion-reduce:transition-none';

const EventCard = ({ title, date, month, location, image, href }) => {
  const body = (
    <>
      <ResponsiveImage name={image} alt='' sizes='(min-width: 1024px) 360px, 100vw' className='h-48 w-full object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100' />
      <div className='relative p-5'>
        <div className='absolute -top-8 right-5 flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-gold-400 text-navy-950 shadow'>
          <span className='text-xs uppercase leading-tight'>{month}</span>
          <span className='text-xl font-bold leading-none'>{date}</span>
        </div>
        <h3 className='pr-14 text-xl font-semibold'>{title}</h3>
        {location && <p className='mt-1 text-sm opacity-70'>{location}</p>}
      </div>
    </>
  );
  // Only render a link when there is a real destination; '#' would just jump to the page top.
  if (!href || href === '#') return <article className={CARD}>{body}</article>;
  return <a href={href} className={CARD}>{body}</a>;
};
export default EventCard;
