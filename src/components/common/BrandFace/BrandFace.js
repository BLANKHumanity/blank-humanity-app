import React from "react";

export default function BrandFace({ style, faceColor }) {
  faceColor = faceColor ? faceColor : "black";
  return (
    <div className="FaceHolder" style={style}>
      <div className="FaceRow">
        <div className="FacePixel" style={{ backgroundColor: faceColor }}></div>
        <div className="FacePixel"></div>
        <div className="FacePixel"></div>
        <div className="FacePixel"></div>
        <div className="FacePixel"></div>
        <div className="FacePixel"></div>
        <div className="FacePixel" style={{ backgroundColor: faceColor }}></div>
      </div>
      <div className="FaceRow">
        <div className="FacePixel"></div>
        <div className="FacePixel"></div>
        <div className="FacePixel"></div>
        <div className="FacePixel"></div>
        <div className="FacePixel"></div>
        <div className="FacePixel"></div>
        <div className="FacePixel"></div>
      </div>
      <div className="FaceRow">
        <div className="FacePixel"></div>
        <div className="FacePixel"></div>
        <div className="FacePixel"></div>
        <div className="FacePixel"></div>
        <div className="FacePixel"></div>
        <div className="FacePixel"></div>
        <div className="FacePixel"></div>
      </div>
      <div className="FaceRow">
        <div className="FacePixel" style={{ backgroundColor: faceColor }}></div>
        <div className="FacePixel" style={{ backgroundColor: faceColor }}></div>
        <div className="FacePixel" style={{ backgroundColor: faceColor }}></div>
        <div className="FacePixel" style={{ backgroundColor: faceColor }}></div>
        <div className="FacePixel" style={{ backgroundColor: faceColor }}></div>
        <div className="FacePixel" style={{ backgroundColor: faceColor }}></div>
        <div className="FacePixel" style={{ backgroundColor: faceColor }}></div>
      </div>
    </div>
  );
}
