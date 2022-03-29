import React from "react";
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

  const emoteLink = `/Emote/${tokenId}`
  React.useEffect(async () => {
    // Get the metadata for this token
    try {
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
    } catch(e) {
      console.error("Could not fetch Initializer image", e);
    }
  }, []);

  return (
    <div className="NFTContainer">
      <img className="NFT" id={tokenId} src={image} />
      <div className="NFTDescription">
        <span style={{ fontSize: ".8rem", marginBottom: ".5rem" }}>
          Initializer #{tokenId}
        </span>
        <span>
          <a href={emoteLink}>Emote</a>
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
      </div>
    </div>
  );
}
