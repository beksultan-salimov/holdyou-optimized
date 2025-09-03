import { memo, useState } from 'react';
import { Field } from './Field';
import { Icon } from '../Icon';

const InputPassword = ({ ...props }) => {
  const [visiblePass, toggleVisiblePass] = useState(false);
  const togglePass = () => {
    toggleVisiblePass((visible) => !visible);
  };

  props.type = visiblePass ? 'text' : 'password';

  return (
    <Field
      {...props}
      tag="input"
      suffix={
        <div className="password-suffix-btn" onClick={togglePass}>
          <Icon name={!visiblePass ? 'Eye' : 'EyeSlash'} />
        </div>
      }
    />
  );
};

export { InputPassword };
