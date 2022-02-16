import React from "react";

export default function ContentSection({ width = "100%", children, style }) {
  let inlineStyle = style ? style : {};
  inlineStyle.width = width;
  return (
    <div className="ContentSection" style={inlineStyle}>
      {children}
    </div>
  );
}
