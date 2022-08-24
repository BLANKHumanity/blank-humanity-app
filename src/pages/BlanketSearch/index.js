import React from "react";
import * as tf from '@tensorflow/tfjs';

import Footer from "../../components/common/Footer/Footer.js";
import { input } from "@tensorflow/tfjs";

import nftCollectionData from "../../content/blanket/nftCollectionData.js";

import BlanketDragZone from "../../components/common/BlanketDragZone/BlanketDragZone.js";
import BlanketLoadImageButton from "../../components/common/BlanketLoadImageButton/BlanketLoadImageButton.js";
import NftDetailBox from "../../components/modules/NFTDetailBox/NFTDetailBox.js";
import NFTProfileUpdateSection from "../../components/modules/NFTProfileUpdate/NFTProfileUpdateSection.js";

import loadingAnimationImage from "../../images/loading-animation.gif";
import dragDropIcon from "../../images/drag-drop-icon.png";

console.log("DRAG DROP ICON");
console.log(dragDropIcon);

function TitleArea(props) {
  return (
    <div
      style={{
        marginTop: "10vh",
        marginBottom: "10vh",
        margin: "5vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "50%", textAlign: "left" }}>
        <span style={{ fontFamily: "Bungee" }}>Blanket Search</span>
        <br />
        Drag an Initializer NFT here to interact with it!
        <br />
      </div>
      <div
        style={{
          width: "50%",
          color: "#FF6A16",
          fontFamily: "Bungee",
          fontSize: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "50%", backgroundColor: "rgba(255,163,0,.6)" }}>
          
        </div>
      </div>
    </div>
  );
}

function ContentArea({ displayedComponent }) {
  return <div>{displayedComponent}</div>;
}

function SimilarNFTsArea({ similarNFTs }) {
  return (
    <div style={{ marginTop: "5rem" }}>
      <div>Similar NFTs</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "5vh",
        }}
      >
        {similarNFTs.slice(1, 4).map((entry) => {
          return (
            <div>
              <span style={{fontSize:"1rem"}}>Initializer #{entry.id}</span>
              <br />
              <img
                style={{
                  width: "90%",
                }}
                src={entry.imageData}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function BlanketSearch(props) {
  const [contentComponent, setContentComponent] = React.useState(
    <div
      style={{
        minHeight: "60vh",
        height: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "lightgrey",
          height: "90%",
          width: "90%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={dragDropIcon.src} style={{ width: "10%", opacity: ".5" }} />
      </div>
    </div>
  );
  const [similarImagesComponent, setSimilarImagesComponent] = React.useState(
    <div></div>
  );
  const [name, setName] = React.useState("");
  const [phrase, setPhrase] = React.useState("");
  const [notes, setNotes] = React.useState("No notes.");

  React.useEffect(() => {
    window.ondragenter = (e) => {
      console.log("ondragenter");
      let inputElement = document.getElementById("file-browser-input");
      inputElement.style.backgroundColor = "rgba(0,0,0,.5)";
      inputElement.style.pointerEvents = "auto";
    };
  }, []);

  function handleBlanketResponse(
    nftID,
    collectionData,
    imageData,
    similarWeb3Assets
  ) {
    if (nftID) {
      const collectionData = nftCollectionData[collectionAddress];            
      console.log(`fetching profile from /api/nft/${collectionAddress}/${nftID}/profile`)
      fetch(`/api/nft/${collectionAddress}/${nftID}/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'                          
        }
      }).then(res => res.json())
      .then(profile => {
        let name = collectionData.name + " #" + nftID;
        let phrase = "This is "+name;
        let notes = "No notes.";
        
        if(profile && profile.length) {          
          name = decodeURIComponent(profile[0].nft_token_name);
          phrase = decodeURIComponent(profile[0].nft_token_phrase);
          notes = decodeURIComponent(profile[0].nft_token_notes);
        }                    
        setContentComponent(<div>
          <NftDetailBox
            id={nftID}
            collectionData={collectionData}
            imageData={imageData}
            name={name}
            phrase={phrase}
            notes={notes}
          />
          <NFTProfileUpdateSection contractId={collectionAddress} tokenId={nftID}/></div>
        );                
      });
      setSimilarImagesComponent(
        <SimilarNFTsArea similarNFTs={similarWeb3Assets} />
      );                    
    } else {
      alert("ID NOT FOUND");
      setContentComponent(<div>Asset ID not found</div>);
    }
  }

  return (
    <div>
      {" "}
      <BlanketDragZone handleDrop={handleBlanketResponse} />
      <TitleArea />
      <div style={{ minHeight: "60vh" }}>
        <ContentArea displayedComponent={contentComponent} />
        <ContentArea displayedComponent={similarImagesComponent} />
      </div>
      <BlanketLoadImageButton handleImageLoad={handleBlanketResponse} />      
      <Footer />
      <img id="test-image" />
    </div>
  );
}