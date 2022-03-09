import React from "react";
import { useParams } from "react-router-dom";
import ContentSection from "../../../common/ContentSection/ContentSection";
import InnerSection from "../../../common/InnerSection/InnerSection";
import Footer from "../../../common/Footer/Footer";
import Dropdown from "../../../common/Dropdown/Dropdown";
import initializerMetadata from "../../../../utils/initializers-metadata-lookup.json";


export default function Emote(props) {
  let { tokenId } = useParams();
  if( !parseInt(tokenId) ) { tokenId = '0'; }  
  
  const [displayEmote, setDisplayEmote] = React.useState({displayEmote: "GM"});
  const [initializer, setInitializer] = React.useState({initializer: tokenId});
  let sendsLove = ['0','313']
  let lovesThis = ['0', '355', '626']
  let cupWinners = ['248', '46', '757', '868', '475', '407', '556', '184', '758', '184', '758']

  //[update initializer when url is updated]
  React.useEffect(() => {
    setInitializer({initializer:tokenId})
    setDisplayEmote({displayEmote: "GM"})
  }, [tokenId]);
  let osLink = "https://opensea.io/assets/0x881d9c2f229323aad28a9c9045111e30e1f1eb25/" + tokenId
  
  function generateCaption(emote) {
    let caption = "";
    switch(emote) {
      case "GL": caption = 'wishes you luck'; break;
      case "WOW": caption = 'is amazed'; break;
      case "TY": caption = 'is grateful'; break;
      case "lovesThis": caption = 'loves this'; break;
      case "sendLove": caption = 'sends love'; break;
      case "CUP": caption = 'is a winner'; break;
      case "WAGMI": caption = 'insists We\'re All Gonna Make It'; break;
      default: caption = "says " + emote
    }
    return caption
  }
  function emojiForEmote(emote) {
    let emoji = "";
    switch(emote) {
      case "lovesThis": emoji = 'heart'; break;
      case "sendLove": emoji = 'heart'; break;
      default: emoji = emote
    }
    return emoji
  }

  function handleSelect(event) {
      setDisplayEmote({displayEmote: event.currentTarget.value})
  }   
  
  let caption = generateCaption(displayEmote.displayEmote);
  let emoji = emojiForEmote(displayEmote.displayEmote)  + '.png';
  let emotes = [
    {label:"GM", value:'GM'}, 
    {label:"GN", value:'GN'}
  ];
  
  if(sendsLove.indexOf(tokenId) > -1) {
    emotes.push({label: "Sends love", value:'sendLove'})
  }
  if(lovesThis.indexOf(tokenId) > -1) {
    emotes.push({label: "Loves this", value:'lovesThis'})
  }
  if(cupWinners.indexOf(tokenId) > -1) {
    emotes.push({label: "Is a winner", value:'CUP'})
  }
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
              <img src={emoji} align="top" width="25%"/>
            </div>
            <div style={{fontStyle: "italic",fontSize: "2rem", paddingTop: "1rem"}}>Initializer #{initializer.initializer} {caption}</div>
            </div>
          </InnerSection>
          <div>Check out Initializer #{tokenId} <a href={osLink} >on OpenSea</a></div>
        </ContentSection>
        <Footer />
    </div>
  );
}
