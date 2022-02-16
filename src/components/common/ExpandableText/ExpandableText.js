import React from "react";

export default function ExpandableText(props) {
  const [isExpanded, setIsExpanded] = React.useState(props.isExpanded);
  const [children, setChildren] = React.useState(props.children);

  return (
    <span>
      <span
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        {isExpanded ? (
          <span style={{ cursor: "pointer" }}>▽ {props.title}</span>
        ) : (
          <span style={{ cursor: "pointer" }}>▷ {props.title}</span>
        )}
      </span>
      <br />
      {isExpanded ? children : ""}
    </span>
  );
}
