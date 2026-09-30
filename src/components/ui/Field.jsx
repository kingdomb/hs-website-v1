import { useId } from 'react';
import { LABEL } from './fieldClasses';

// Labelled form control. `children` is a render-prop receiving { id, aria-* } to spread onto the control.
const Field = ({ label, required = false, error, children }) => {
  const id = useId();
  const errId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className={LABEL}>
        {label}{required ? ' *' : ''}
      </label>
      {children({
        id,
        'aria-required': required || undefined,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': error ? errId : undefined,
      })}
      {error && (
        <p id={errId} className='mt-1 text-xs text-red-700'>{error}</p>
      )}
    </div>
  );
};
export default Field;
