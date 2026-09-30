import { useState } from 'react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';

const NewsletterSignupSection = () => {
  const [sent, setSent] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault(); // TODO(owner): wire to a mailing-list provider; static hosting has no /subscribers endpoint
    setSent(true);
  };
  return (
    <Section tone='mid' className='!py-14'>
      <Container>
        <Reveal className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
          <div className='lg:w-1/2'>
            <h2 className='mb-2 text-3xl'>Stay in the loop</h2>
            <p className='opacity-80'>Get updates on encounters and outreach.</p>
          </div>
          <form onSubmit={onSubmit} className='flex flex-col gap-3 lg:w-1/2 lg:flex-row'>
            <label htmlFor='newsletter-email' className='sr-only'>Email address</label>
            <input
              id='newsletter-email' type='email' required placeholder='Your email'
              className='w-full rounded-full border border-ivory-50/30 bg-navy-950 px-5 py-3 text-ivory-50 placeholder:text-ivory-50/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300'
            />
            <Button type='submit'>Subscribe</Button>
          </form>
        </Reveal>
        {sent && <p role='status' className='mt-4 text-gold-300'>Thank you — newsletter signup is coming soon.</p>}
      </Container>
    </Section>
  );
};
export default NewsletterSignupSection;
