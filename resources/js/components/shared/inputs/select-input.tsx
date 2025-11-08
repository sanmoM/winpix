import { cn } from "@/lib/utils";
import React from "react";

interface Option {
  value: string | number;
  label: string;
}

interface SelectInputProps {
  id: string;
  name?: string;
  label?: string;
  options: Option[];
  value?: string | number;
  placeholder?: string;
  onChange?: (value: string | number) => void;
  className?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  name,
  label,
  options,
  value = "",
  placeholder,
  onChange,
  className = "",
}) => {
  return (
    <div className={cn("w-full max-w-xs", className)}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium mb-2 "
        >
          {label}
        </label>
      )}

      <div className="relative">
        {/* The Select Element */}
        <select
          id={id}
          name={name || id}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="
            block w-full appearance-none rounded-lg border border-gray-300 
            py-3 px-4 pr-10 text-base 
            bg-bg-primary 
            focus:outline-none focus:ring-0
          "
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Dropdown Arrow Icon */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SelectInput;
