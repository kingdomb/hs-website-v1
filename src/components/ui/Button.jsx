import { Link } from 'react-router-dom';

const VARIANTS = {
  primary: 'bg-gold-400 text-navy-950 hover:bg-gold-300',
  outline: 'border border-ivory-50/60 text-ivory-50 hover:bg-ivory-50 hover:text-navy-950',
  dark: 'bg-navy-900 text-ivory-50 hover:bg-navy-800',
};
const BASE =
  'inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950';

export default function Button({ variant = 'primary', to, href, className = '', children, ...rest }) {
  const cls = `${BASE} ${VARIANTS[variant]} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return <button type='button' className={cls} {...rest}>{children}</button>;
}
