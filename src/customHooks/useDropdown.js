// Custom hook for dropdowns
import React, { useState } from "react";

const useDropdown = (label, defaultState, options) => {
  const [state, setState] = useState(defaultState);
  // Construct a unique key by using the label and removing any spaces and convert to lowercase
  const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;

  // Dropdown component
  const Dropdown = () => (
    <label htmlFor={id}>
      {label}
      <br />
      <select
        id={id}
        value={state}
        onChange={(e) => setState(e.target.value)}
        onBlur={(e) => setState(e.target.value)}
        disabled={options.length === 0}
      >
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );

  return [state, Dropdown, setState];
};

export default useDropdown;
