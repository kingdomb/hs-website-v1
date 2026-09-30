import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../../data/nav';
import { SITE } from '../../data/site';
import logo from '../../assets/hs-logo-combo.png';
import Container from '../ui/Container';
import SocialIcons from './SocialIcons';

const Footer = () => (
  <footer className='bg-ivory-50 text-navy-900'>
    <Container className='grid gap-10 py-14' >
      <div className='flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between'>
        <img src={logo} alt={SITE.name} className='max-h-40 w-auto' />
        <div className='grid gap-8 text-center lg:grid-cols-3 lg:text-left'>
          <div>
            <h2 className='mb-2 text-xl'>Explore</h2>
            <ul className='space-y-1 text-sm'>
              {NAV_LINKS.map((l) => (
                <li key={l.label}><Link to={l.to} className='hover:text-royal-600'>{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className='mb-2 text-xl'>Address</h2>
            {SITE.address ? (
              <p className='text-sm'>
                {SITE.address.lines.map((line) => (<span key={line} className='block'>{line}</span>))}
                {SITE.address.mapUrl && (
                  <a href={SITE.address.mapUrl} target='_blank' rel='noopener noreferrer' className='text-royal-600 underline'>View map</a>
                )}
              </p>
            ) : (
              <p className='text-sm opacity-60'>Address coming soon</p>
            )}
          </div>
          <div>
            <h2 className='mb-2 text-xl'>Contact</h2>
            <ul className='space-y-1 text-sm'>
              <li><a href={SITE.phone.href} className='hover:text-royal-600'>{SITE.phone.display}</a></li>
              <li>{SITE.email ? <a href={`mailto:${SITE.email}`} className='hover:text-royal-600'>{SITE.email}</a> : <span className='opacity-60'>Email coming soon</span>}</li>
            </ul>
            <SocialIcons className='mt-4 justify-center lg:justify-start' />
          </div>
        </div>
      </div>
    </Container>
    <div className='border-t border-navy-900/10 bg-ivory-100 py-3 text-center text-sm'>
      © {new Date().getFullYear()} {SITE.name}. All rights reserved.
    </div>
  </footer>
);
export default Footer;
