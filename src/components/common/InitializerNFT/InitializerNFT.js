import React from "react";

import BrandFace from "../BrandFace/BrandFace.js";

import qrImage from "../../../images/blank-qr-code.png";
import loadingAnimation from "../../../images/loading-animation.gif";

export default function InitializerNFT({
  web3,
  contract,
  tokenId,
  style = {},
}) {
  let inlineStyle = style ? style : {};
  //inlineStyle.width = width;

  const [numExisting, setNumExisting] = React.useState(0);
  const [image, setImage] = React.useState(loadingAnimation);
  const [metadata, setMetadata] = React.useState({});

  const fetchIpfsData = async (ipfsUri) => {
    const parts = ipfsUri.split("/");
    const hash = parts.slice(2, parts.length).join("/");
    const ioURL = "https://ipfs.io/ipfs/" + hash;
    return await fetch(ioURL);
  };

  React.useEffect(async () => {
    //let canvas = document.getElementById(tokenId);
    //let ctx = canvas.getContext("2d");
    //generateFaceCanvas(ctx, tokenId);
    //alert(tokenId);
    // Get the metadata for this token

    const tokenURI = await contract.methods.tokenURI(tokenId).call();

    // Get metadata JSON
    let data = await fetchIpfsData(tokenURI);
    data = await data.json();
    console.log(data);
    setMetadata(data);
    const imageUri = data.image;

    // Get image
    data = await fetchIpfsData(imageUri);
    data = await data.blob();
    setImage(URL.createObjectURL(data));
  }, []);

  return (
    <div className="NFTContainer">
      <img className="NFT" id={tokenId} src={image} />
      {/*}
      <div
        style={{
          display: "inline-block",
          width: "15vw",
          height: "15vw",
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BrandFace
          faceColor="white"
          style={{
            width: "3.5rem",
            height: "2.25rem",
            margin: "none",
            padding: "1.5rem",
          }}
        />
      </div>
      {*/}
      {/*}<canvas className="FaceNFT" id={tokenId} width="27" height="27"></canvas>{*/}
      <div className="NFTDescription">
        <span style={{ fontSize: ".8rem", marginBottom: ".5rem" }}>
          Initializer #{tokenId}
        </span>
        <div style={{ width: "100%" }}>
          {metadata?.attributes?.map((attribute) => {
            return (
              <div
                style={{
                  width: "100%",
                  fontSize: ".6rem",
                  color: "rgb(0,255,0)",
                  backgroundColor: "black",
                  padding: ".5rem",
                  textAlign: "left",
                }}
              >
                {attribute["trait_type"]}
                {": "}
                {attribute["value"]}
              </div>
            );
          })}
        </div>
        {/*}
        <br />
        <button
          style={{
            fontSize: "1rem",
            width: "100%",
            padding: "1%",
            margin: ".25rem",
          }}
          className="ButtonBlack"
        >
          Sell
        </button>
        <button
          style={{
            fontSize: "1rem",
            width: "100%",
            padding: "1%",
            margin: ".25rem",
          }}
          className="ButtonBlack"
        >
          Transfer
        </button>
        {*/}
      </div>
    </div>
  );
}
