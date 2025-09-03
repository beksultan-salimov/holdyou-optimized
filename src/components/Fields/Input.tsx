import { memo, forwardRef } from 'react';
import { Field } from './Field';

// eslint-disable-next-line react/display-name
const Input = memo(forwardRef(({ ...props }, ref: any) => {
  return <Field {...props} tag="input" ref={ref} />;
}));

export { Input };
