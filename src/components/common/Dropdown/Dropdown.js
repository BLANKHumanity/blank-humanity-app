import React from "react";

export default function Dropdown ({ label, value, options, onChange }) {
  return (
    <div>
      <label>
        {label}
        <select value={value} onChange={onChange} style={{height: "30px", paddingTop: "5px"}}>
          {options.map((option) => (
            <option key={option.label} value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
    </div>
  );
};