import React from "react";

export default function Logo(props) {
  return (
    <span className="Logo" style={{ fontFamily: "Bungee" }}>
      BLANK_
      {"  "}
      <span style={{ fontSize: ".6em" }}>humanity</span>
      <div
        style={{ width: "100%", fontSize: "1.25rem", fontFamily: "Fira Code" }}
      >
        {props.tagline}
      </div>
    </span>
  );
}
