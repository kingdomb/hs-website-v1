import Button from '../ui/Button';

const SectionTextBlock = ({ heading, paragraph, buttonText, buttonTo, children }) => (
  <div>
    <h2 className='mb-4 text-4xl font-semibold lg:text-5xl'>{heading}</h2>
    <p className='mb-6 text-lg opacity-90'>{paragraph}</p>
    {children}
    {buttonText && <Button to={buttonTo} variant='outline'>{buttonText}</Button>}
  </div>
);
export default SectionTextBlock;
