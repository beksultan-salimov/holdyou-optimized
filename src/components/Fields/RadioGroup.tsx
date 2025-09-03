import React from "react";
import { Field } from "react-final-form";

interface Option {
  label: React.ReactNode;
  value: string;
}

interface RadioGroupProps {
  name: string;
  options: Option[];
  className?: string;
  radioClassName?: string;
  disabled?: boolean;
  inline?: boolean;
  value?: string;
  onChange?: any;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  className = "",
  radioClassName = "",
  disabled = false,
  inline = false,
  ...input
}) => {
  const handleChange = (e: any) => {
    input.onChange(e.target.value)
  }
  return (
    <div className={`radio-group ${className} ${inline ? 'inline' : ''}`}>
      {options.map(({ label, value }) => (
        <label key={value} className={`radio-label ${radioClassName}`}>
          <input
            name={name}
            type="checkbox"
            value={value}
            checked={input.value === value}
            onChange={handleChange}
            disabled={disabled}
          />
          <span className="radio-custom" />
          <span className="radio-label-text">{label}</span>
        </label>
      ))}
    </div>
  );
};

export { RadioGroup };
