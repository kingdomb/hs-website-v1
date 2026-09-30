import { useState } from 'react';
import Modal from '../shared/Modal';
import Accordion from '../ui/Accordion';
import Button from '../ui/Button';
import SalvationNotice from '../shared/SalvationNotice';
import { FAQS } from '../../data/faqs';

const FaqDialogButton = ({ variant = 'outline', children = 'Common questions' }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant={variant} onClick={() => setOpen(true)}>{children}</Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title='Common questions' maxWidth='max-w-3xl'>
        <SalvationNotice tone='light' className='mb-4 !text-base' />
        <Accordion items={FAQS} tone='light' />
      </Modal>
    </>
  );
};
export default FaqDialogButton;
