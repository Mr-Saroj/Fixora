import React from 'react';
import { inputBaseClass } from '../../utils/inputStyles';

const FormSelect = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
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

      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`${inputBaseClass} appearance-none pr-10`}
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-text-muted text-[20px] pointer-events-none">
          expand_more
        </span>
      </div>
    </div>
  );
};

export default FormSelect;