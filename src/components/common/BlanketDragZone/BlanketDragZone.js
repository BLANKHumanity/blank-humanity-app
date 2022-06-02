import React from "react";

import blanket from "../../../utils/blanket/index.js";
import loadingAnimationImage from "../../../images/loading-animation.gif";

export default function BlanketDragZone({ handleDrop }) {
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
        zIndex: 100000000,
      }}
    >
      <input
        style={{
          width: "300vw",
          height: "300vh",
          backgroundColor: "transparent",
          position: "fixed",
          left: "-100vw",
          top: "-100vh",
          pointerEvents: "none",
          zIndex: 100000000,
        }}
        type="file"
        id="file-browser-input"
        name="file-browser-input"
        onDragOver={(e) => {
          let inputElement = document.getElementById("file-browser-input");
          inputElement.style.pointerEvents = "auto";
          e.preventDefault();
          e.stopPropagation();
        }}
        onClick={(e) => {
          let inputElement = document.getElementById("file-browser-input");
          inputElement.style.backgroundColor = "transparent";
          inputElement.style.pointerEvents = "none";
          document.getElementById("loading-gif").style.display = "none";
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={(e) => {
          //setContentComponent(<img src={loadingAnimationImage} />);
          //setSimilarImagesComponent(<div />);
          e.preventDefault();
          e.stopPropagation();

          blanket.search.reverseImage((...args) => {
            // remove loading gif
            let inputElement = document.getElementById("file-browser-input");
            inputElement.style.backgroundColor = "transparent";
            inputElement.style.pointerEvents = "none";
            document.getElementById("loading-gif").style.display = "none";

            handleDrop(...args);
          })(e);

          // Show loading gif
          document.getElementById("loading-gif").style.display = "inline";
        }}

        onChange={blanket.search.reverseImage(handleDrop)}
      />
      <img
        id="loading-gif"
        style={{ display: "none" }}
        src={loadingAnimationImage.src}
      />
    </div>
  );
}