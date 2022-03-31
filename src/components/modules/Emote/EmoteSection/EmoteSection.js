import React from "react"
import { useRouter } from 'next/router'
import ContentSection from "../../../common/ContentSection/ContentSection";
import InnerSection from "../../../common/InnerSection/InnerSection";
import Footer from "../../../common/Footer/Footer";
import Dropdown from "../../../common/Dropdown/Dropdown";
import Canvas from "../../../common/Canvas/Canvas";
import initializerMetadata from "../../../../utils/initializers-metadata-lookup.json";

export default function Emote(props) {
  const router = useRouter()
  let { tokenId, emote } = router.query
  
  let sendsLove = ['0','313']
  let lovesThis = ['0', '355', '626', '335']
  let cupWinners = ['248', '46', '757', '868', '475', '407', '556', '184', '758', '184', '758', '421']
  let buyMe = ['466','566','47', '634', '724','217', '88', '96', '641', '484']
  let initializer = 0;

  if( parseInt(tokenId) ) { initializer = tokenId; }  
  if( emote && !validEmoteForToken(tokenId, emote) ) { router.push(`/Emote/${tokenId}`); }
  
  let openSeaLink = "https://opensea.io/assets/0x881d9c2f229323aad28a9c9045111e30e1f1eb25/" + initializer
  
  function generateCaption(initializer, emote) {
    let caption = "";
    switch(emote) {
      case "GL": caption = 'wishes you luck'; break;
      case "WOW": caption = 'is amazed'; break;
      case "TY": caption = 'is grateful'; break;
      case "lovesThis": caption = 'loves this'; break;
      case "sendLove": caption = 'sends love'; break;
      case "CUP": caption = 'is a winner'; break;
      case "buyMe": caption = 'says "Buy me on OpenSea"'; break;
      case "WAGMI": caption = 'insists We\'re All Gonna Make It'; break;
      default: caption = `says "${emote}"`
    }
    return `Initializer #${initializer} ${caption}`;
  }

  function generateEmoteImage(emote) {
    let emoji = "/";
    switch(emote) {
      case "lovesThis": emoji += 'heart'; break;
      case "sendLove": emoji += 'heart'; break;
      case "buyMe": emoji += 'MONEY'; break;
      default: emoji += emote
    }
    return `${emoji}.png`
  }
  function validEmoteForToken(tokenId, emote) {
    switch(emote) {
      case 'sendLove': return sendsLove.indexOf(tokenId) >= 0;
      case 'lovesThis': return lovesThis.indexOf(tokenId) >= 0;
      case 'cupWinners': return cupWinners.indexOf(tokenId) >= 0;
      case 'buyMe': return buyMe.indexOf(tokenId) >= 0;
      case 'GM': 
      case 'GN': return true;
      default: return false;
    }
  }
  let emotes = [];
  if( emote ) {
    emotes = [{emote:generateEmoteImage(emote), caption:generateCaption(tokenId, emote)}];
  } else {
    emotes = [{emote:generateEmoteImage('GM'), caption:generateCaption(tokenId, 'GM')}, {emote:generateEmoteImage('GN'), caption:generateCaption(tokenId, 'GN')}];
    if(sendsLove.indexOf(tokenId) > -1) {
      emotes.push({emote: generateEmoteImage('sendLove'), caption: generateCaption(tokenId, 'sendLove')})
    } 
    if(lovesThis.indexOf(tokenId) > -1) {
      emotes.push({emote: generateEmoteImage('lovesThis'), caption: generateCaption(tokenId, 'lovesThis')})
    } 
    if(cupWinners.indexOf(tokenId) > -1) {
      emotes.push({emote: generateEmoteImage('CUP'), caption: generateCaption(tokenId, 'CUP')})
    } 
    if(buyMe.indexOf(tokenId) > -1) {
      emotes.push({emote: generateEmoteImage('buyMe'), caption: generateCaption(tokenId, 'buyMe')})
    }
  }
  

  const draw = (context, initializer, emote, caption) => {    
    context.fillStyle = '#FFFFFF'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    context.rect(10, 10, context.canvas.width-20 , context.canvas.height-20 )
    context.stroke();
    const img = new Image();    
    img.src= initializerMetadata[initializer][0].imageData;
    img.onload = ()=>{context.drawImage(img, 20, 20, 370, 370);}

    const emoteImg = new Image();
    emoteImg.src = emote;
    emoteImg.onload = ()=>{
      context.drawImage(emoteImg, 390, 20);
    }    
  
    context.font = 'italic 1rem Fira Code';
    context.fillStyle = 'black'
    context.textAlign = 'center'
    context.fillText(caption, 270, 420);
  }

  return (
    <div className="Emote">
        <ContentSection width="75%" style={{minHeight:"80vh", display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"center", alignItems:"center"}}>
          <h1 style={{flexBasis:"100%"}}>Initializer #{initializer} Emotes</h1>
            {emotes.map((entry, i) => {
                return (
                  <InnerSection key={entry.emote} width='540px' style={{margin: "1rem"}}>
                    <Canvas draw={draw} initializer={initializer} emote={entry.emote} caption={entry.caption} width="540px" height="450px"></Canvas>
                  </InnerSection>
                );
                })
                }
          <div style={{marginBottom: "1rem", flexBasis:"100%"}}>Check out Initializer #{initializer} <a href={openSeaLink} >on OpenSea</a></div>
        </ContentSection>
        <Footer />
    </div>
  );
}
  