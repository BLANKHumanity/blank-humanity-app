import { React } from "react";
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

  console.debug("tokenId: " + tokenId);
  console.debug("emote: " + emote);
  if( !parseInt(tokenId) ) { tokenId = 0; }  
  if( !emote ) { emote = 'GM' }
  let sendsLove = ['0','313']
  let lovesThis = ['0', '355', '626']
  let cupWinners = ['248', '46', '757', '868', '475', '407', '556', '184', '758', '184', '758', '421']
  let buyMe = ['466','566','47', '634', '724','217', '88', '96', '641', '484']
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
      case "buyMe": caption = 'says "Buy me on OpenSea"'; break;
      case "WAGMI": caption = 'insists We\'re All Gonna Make It'; break;
      default: caption = `says "${emote}"`
    }
    return caption
  }
  function emojiForEmote(emote) {
    let emoji = "/";
    switch(emote) {
      case "lovesThis": emoji += 'heart'; break;
      case "sendLove": emoji += 'heart'; break;
      case "buyMe": emoji += 'MONEY'; break;
      default: emoji += emote
    }
    return emoji
  }
    
  function handleSelect(event) {  
       router.push(`/Emote/${tokenId}/${event.currentTarget.value}`);
  }   
  
  let caption = generateCaption(emote);
  let emoji = emojiForEmote(emote)  + '.png';
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
  if(buyMe.indexOf(tokenId) > -1) {
    emotes.push({label: "BUY ME", value:'buyMe'})
  }
  let fullCaption = `Initializer #${tokenId} ${caption}`

  const draw = (context) => {    
    context.fillStyle = '#FFFFFF'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    context.rect(10, 10, context.canvas.width-20 , context.canvas.height-20 )
    context.stroke();
    const img = new Image();    
    img.src= initializerMetadata[tokenId][0].imageData;
    img.onload = ()=>{context.drawImage(img, 20, 20, 370, 370);}

    const emoteImg = new Image();
    emoteImg.src = emoji;
    emoteImg.onload = ()=>{context.drawImage(emoteImg, 390, 20);}    
    
    context.font = 'italic 1rem Fira Code';
    context.fillStyle = 'black'
    context.textAlign = 'center'
    context.fillText(fullCaption, 270, 420);
  }

  return (
    <div className="Emote">
        <ContentSection width="75%" style={{minHeight:"80vh", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
          <Dropdown 
            label="Emote:"
            options={emotes}
            value={emote}
            onChange={handleSelect}
            ></Dropdown>
          <InnerSection>
            <Canvas draw={draw} width="540px" height="450px"></Canvas>
          </InnerSection>
          <div>Check out Initializer #{tokenId} <a href={osLink} >on OpenSea</a></div>
        </ContentSection>
        <Footer />
    </div>
  );
}
  