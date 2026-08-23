import React from 'react';
import { inputBaseClass } from '../../utils/inputStyles';

const FormInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  icon,
  disabled = false,
}) => {
  return (
    <div>
      <label className="block text-[13px] font-bold text-text-main uppercase mb-2 flex items-center gap-1">
        {label}

        {icon && (
          <span className="material-symbols-outlined text-[16px] text-primary">
            {icon}
          </span>
        )}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={inputBaseClass}
      />
    </div>
  );
};

export default FormInput;