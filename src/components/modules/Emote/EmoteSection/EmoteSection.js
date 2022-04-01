import React from "react"
import { useRouter } from 'next/router'
import ContentSection from "../../../common/ContentSection/ContentSection";
import InnerSection from "../../../common/InnerSection/InnerSection";
import Footer from "../../../common/Footer/Footer";
import Dropdown from "../../../common/Dropdown/Dropdown";
import Canvas from "../../../common/Canvas/Canvas";
import emoteUtils from "../../../../utils/emoteUtils";

export default function Emote(props) {
  const router = useRouter()
  let { tokenId, emote } = router.query
  
  let initializer = -1;
  let justTheEmote = emote && emoteUtils.validEmoteForToken(tokenId, emote);

  if( parseInt(tokenId) >= 0 ) { initializer = tokenId; }  
  if( emote && !emoteUtils.validEmoteForToken(tokenId, emote) ) { router.push(`/Emote/${tokenId}`); }
  
  let openSeaLink = "https://opensea.io/assets/0x881d9c2f229323aad28a9c9045111e30e1f1eb25/" + initializer 

  let emotes = emoteUtils.getEmotesForInitializer(initializer);

  return (  
    <div className="Emote">
      <ContentSection width="75%" style={{minHeight:"80vh", display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"center", alignItems:"center"}}>
        <h1 style={{flexBasis:"100%"}}>Initializer #{initializer} Emotes</h1>
          {emotes.map((entry, i) => {
            console.log(`Initializer ${initializer} emotes ${entry.emote}`)
            return (
                <InnerSection key={entry.emote} width='540px' style={{margin: "1rem"}}>
                  <Canvas draw={emoteUtils.drawEmote} initializer={initializer} emote={entry.emote} caption={entry.caption} width="540px" height="450px"></Canvas>
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
  