import React from "react";
import { useParams } from "react-router-dom";
import ContentSection from "../../../common/ContentSection/ContentSection";
import InnerSection from "../../../common/InnerSection/InnerSection";
import initializerMetadata from "../../../../utils/initializers-metadata-lookup.json";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function Emote(props) {
  let { tokenId, emote } = useParams();
  if( !parseInt(tokenId) ) { tokenId = 0; }  

  const [displayEmote, setDisplayEmote] = React.useState({displayEmote: "GM"});
  const [caption, setCaption] = React.useState({caption: ""});
  const [initializer, setInitializer] = React.useState({initializer: tokenId});
  
  function generateCaption(emote) {
    let caption = "";
    switch(emote) {
      case "WOW": caption = 'is amazed'; break;
      case "TY": caption = 'is grateful'; break;
      case "heart": caption = 'sends love'; break;
      default: caption = "says " + emote
    }
    return caption;
  }

  function changeEmote(newEmote) {  
    setCaption(generateCaption(newEmote));
    setDisplayEmote(newEmote);
  }
  function handleSelect(event) {
    changeEmote(event.value);
  } 
  
  console.log(displayEmote);
  console.log(caption);
  
  let emotes = ['GM', 'GN', 'TY', 'WOW', 'heart'];

  return (
    <div className="Emote">
        <ContentSection width="75%">               
        <InnerSection>
        <Dropdown options={emotes} onChange={handleSelect} value={displayEmote} placeholder="Select an option" />
        <div style={{border:"1px solid black", padding:"1rem", width:"75%", maxWidth:"500px", margin: "0 auto"}}>
          <div>
            <img src={initializerMetadata[tokenId][0].imageData} align="top" width="75%"/>
            <img src={displayEmote.displayEmote + '.png'} align="top" width="25%"/>
          </div>
          <div style={{fontStyle: "italic",fontSize: "2rem", paddingTop: "1rem"}}>Initializer {tokenId} {generateCaption(displayEmote.displayEmote)}</div>
          </div>
        </InnerSection>
        </ContentSection>
    </div>
  );
}
