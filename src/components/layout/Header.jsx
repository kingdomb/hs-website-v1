import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { NAV_LINKS, NAV_CTA } from '../../data/nav';
import { SITE } from '../../data/site';
import logo from '../../assets/hs-letter-logo-nav.png';
import Button from '../ui/Button';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const openBtn = useRef(null);
  const closeMenu = useCallback(() => setOpen(false), []);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Logo: same behavior on every route and size — go home, or scroll to top if already there.
  const onLogo = (e) => {
    if (pathname === '/' && !hash) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-header border-b transition-colors duration-300 ${
          scrolled ? 'border-navy-900/10 bg-ivory-50/95 shadow-md backdrop-blur' : 'border-transparent bg-ivory-50/90 backdrop-blur'
        }`}
      >
        <div className='mx-auto flex h-full max-w-6xl items-center justify-between px-5 lg:px-8'>
          <Link to='/' onClick={onLogo} className='h-full py-3'>
            <img src={logo} alt={SITE.name} className='h-full w-auto' />
          </Link>
          <nav aria-label='Main' className='hidden items-center gap-8 lg:flex'>
            {NAV_LINKS.map((l) => (
              <Link key={l.label} to={l.to} className='font-medium text-navy-900 hover:text-royal-600'>{l.label}</Link>
            ))}
            <Button to={NAV_CTA.to} className='!py-2'>{NAV_CTA.label}</Button>
          </nav>
          <button ref={openBtn} type='button' aria-label='Open menu' aria-expanded={open} aria-controls={menuId} onClick={() => setOpen(true)} className='p-2 text-navy-900 lg:hidden'>
            <FiMenu size={26} />
          </button>
        </div>
      </header>
      <MobileMenu id={menuId} open={open} onClose={closeMenu} returnFocusRef={openBtn} />
    </>
  );
};
export default Header;
