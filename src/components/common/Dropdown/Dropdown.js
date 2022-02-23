import React from "react";

export default function Dropdown ({ label, value, options, onChange }) {
  return (
    <label>
      {label}
      <select value={value} onChange={onChange} style={{position: "absolute", top: "5px", height: "30px"}}>
        {options.map((option) => (
          <option key={option.label} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
};