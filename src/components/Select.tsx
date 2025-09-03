import { memo } from 'react';
import RcSelect, { Option } from 'rc-select';
import type { SelectProps } from 'rc-select';
import { Field } from './Fields/Field';

interface IProps extends SelectProps {
  children: any;
  type: 'text' | 'number';
  name: string;
}


const _Select = memo(function _Select({ children, options, ...props }: IProps) {
  const { type, name, ...restProps } = props;
  return (
    <RcSelect
      suffixIcon={<span className="rc-select-suffix-icon" />}
      menuItemSelectedIcon={<span className="rc-select-option-item-icon" />}
      showSearch={false}
      {...restProps}
    >
      {!!options &&
        options?.map((i) => (
          <Option key={i.value} value={i.value}>
            {i.label}
          </Option>
        ))}
    </RcSelect>
  );
})

const Select = (props: any) => <Field {...props} component={_Select} tag="select" />;

export { Select, Option };
