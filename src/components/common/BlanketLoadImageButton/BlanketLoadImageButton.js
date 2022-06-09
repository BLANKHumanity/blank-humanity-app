import React from "react";

import blanket from "../../../utils/blanket/index.js";

export default function BlanketLoadImageButton({ handleImageLoad }) {
  return (
    <input
      style={{ margin: "1rem" }}
      type="file"
      id="file-browser-input"
      name="file-browser-input"
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrop={blanket.search.reverseImage(handleImageLoad)}
      onChange={blanket.search.reverseImage(handleImageLoad)}
    />
  );
}