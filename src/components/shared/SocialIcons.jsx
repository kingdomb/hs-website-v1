import { SOCIAL_LINKS } from '../../data/socials';

const SocialIcons = ({ size = 18, className = '' }) => {
  if (!SOCIAL_LINKS.length) return null;
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {SOCIAL_LINKS.map(({ href, label, Icon }) => (
        <a key={label} href={href} target='_blank' rel='noopener noreferrer' aria-label={label} className='hover:text-royal-600'>
          <Icon style={{ fontSize: size }} />
        </a>
      ))}
    </div>
  );
};
export default SocialIcons;
