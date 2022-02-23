import React from "react";
import { useParams } from "react-router-dom";
import ContentSection from "../../../common/ContentSection/ContentSection";
import InnerSection from "../../../common/InnerSection/InnerSection";
import Footer from "../../../common/Footer/Footer";
import Dropdown from "../../../common/Dropdown/Dropdown";
import initializerMetadata from "../../../../utils/initializers-metadata-lookup.json";


export default function Emote(props) {
  let { tokenId } = useParams();
  if( !parseInt(tokenId) ) { tokenId = 0; }  
  
  const [displayEmote, setDisplayEmote] = React.useState({displayEmote: "GM"});
  const [initializer, setInitializer] = React.useState({initializer: tokenId});
  
  React.useEffect(() => {
    setInitializer({initializer:tokenId})
  }, [tokenId]);

  function generateCaption(emote) {
    let caption = "";
    switch(emote) {
      case "GL": caption = 'wishes you luck'; break;
      case "WOW": caption = 'is amazed'; break;
      case "TY": caption = 'is grateful'; break;
      case "heart": caption = 'loves this'; break;
      case "WAGMI": caption = 'insists We\'re All Gonna Make It'; break;
      default: caption = "says " + emote
    }
    return caption
  }

  function handleSelect(event) {
    setDisplayEmote({displayEmote: event.currentTarget.value});
  }   
  
  let caption = generateCaption(displayEmote.displayEmote);
  let emotes = [
    {label:"GL", value:'GL'}, 
    {label:"GM", value:'GM'}, 
    {label:"GN", value:'GN'}, 
    {label:"HI", value:'HI'},
    {label:"TY", value:'TY'}, 
    {label:"WOW", value:'WOW'}, 
    {label:"HEART", value:'heart'}, 
    {label:"WAGMI", value:'WAGMI'}
  ];

  return (
    <div className="Emote">
        <ContentSection width="75%" style={{minHeight:"80vh", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
          <Dropdown 
            label="Emote:"
            options={emotes}
            value={displayEmote.displayEmote}
            onChange={handleSelect}></Dropdown>
          <InnerSection>
          <div style={{border:"1px solid black", padding:"1rem", width:"75%", maxWidth:"500px", margin: "0 auto"}}>
            <div>
              <img src={initializerMetadata[tokenId][0].imageData} align="top" width="75%" alt={caption}/>
              <img src={displayEmote.displayEmote + '.png'} align="top" width="25%"/>
            </div>
            <div style={{fontStyle: "italic",fontSize: "2rem", paddingTop: "1rem"}}>Initializer #{initializer.initializer} {caption}</div>
            </div>
          </InnerSection>
        </ContentSection>
        <Footer />
    </div>
  );
}
