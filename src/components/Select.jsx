import React from "react";
import { useId } from "react";

const Select = ({ options = [], label, className = "", ...props }, ref) => {
  const id = useId();
  return (
    <div className="select-container">
      {label && (
        <label htmlFor={id} className="select-label">
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`custom-select ${className}`}
      >
        {options?.map(option => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.forwardRef(Select);
