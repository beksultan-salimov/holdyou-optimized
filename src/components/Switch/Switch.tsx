import RcSwitch from 'rc-switch';
import './switch.scss';

interface IProps {
  disabled?: boolean;
  className?: string;
  checked?: boolean;
  onChange?: any;
  style?: React.CSSProperties;
  input?: any
}
const Switch = ({ disabled, className, checked, onChange, style, input }: IProps) => {
  return (
    <RcSwitch
      disabled={disabled}
      className={className}
      checked={checked || input?.value}
      onChange={onChange || input?.onChange}
      style={style}
    />
  );
};

export { Switch };
