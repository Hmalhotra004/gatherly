/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Select from "react-select";

interface SelectProps {
  value?: Record<string, any>;
  onChange: (id: Record<string, any>) => void;
  options: Record<string, any>[];
  disabled: boolean;
}

const SelectBox = ({ disabled, value, onChange, options }: SelectProps) => {
  return (
    <div className="z-[100]">
      <div className="mt-2">
        <Select
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti
          options={options}
          className="text-sm"
        />
      </div>
    </div>
  );
};

export default SelectBox;
