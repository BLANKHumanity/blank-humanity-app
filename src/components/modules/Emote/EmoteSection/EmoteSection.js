import React from "react"
import { useRouter } from 'next/router'
import ContentSection from "../../../common/ContentSection/ContentSection";
import InnerSection from "../../../common/InnerSection/InnerSection";
import Footer from "../../../common/Footer/Footer";
import emoteUtils from "../../../../utils/emoteUtils";

export default function Emote(props) {
  const router = useRouter()
  let { tokenId, emote } = router.query
  
  let initializer = -1;

  if( parseInt(tokenId) >= 0 ) { initializer = tokenId; }  
  if( emote && !emoteUtils.validEmoteForToken(tokenId, emote) ) { router.push(`/Emote/${tokenId}`); }
  
  let openSeaLink = "https://opensea.io/assets/0x881d9c2f229323aad28a9c9045111e30e1f1eb25/" + initializer 

  let emotes = emoteUtils.getEmotesForInitializer(initializer);

  return (  
    <div className="Emote">
      <ContentSection width="75%" style={{minHeight:"80vh", display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"center", alignItems:"center"}}>
        <h2 style={{flexBasis:"100%"}}>Initializer #{initializer} Emotes</h2>
          {emotes.map((entry, i) => {
            console.log(`Initializer ${initializer} emotes ${entry.emote}`)
            return (
                <InnerSection key={entry.emote} width='400px' style={{margin: "1rem"}}>
                  <img src={`/api/emote/${tokenId}/${entry.emote}/med`} width="400px"/>
                  <a style={{display:"block", fontSize:"small"}} href={`/api/emote/${tokenId}/${entry.emote}/med`} download={`${tokenId}-${entry.emote}.png`}>Download {entry.emote}</a>
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
  