import React from "react";

export default function InnerSection({ width = "100%", children, style }) {
  let inlineStyle = style ? style : {};
  inlineStyle.width = width;
  return (
    <div className="InnerSection" style={inlineStyle}>
      {children}
    </div>
  );
}
