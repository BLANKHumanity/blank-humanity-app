import React from "react"
import { useRouter } from 'next/router'
import ContentSection from "../../../common/ContentSection/ContentSection";
import InnerSection from "../../../common/InnerSection/InnerSection";
import Footer from "../../../common/Footer/Footer";
import emoteUtils from "../../../../utils/emoteUtils";

class EmoteSection extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
        initializerName: "Initializer #"+this.props.initializer,
        initializerNumber: this.props.initializer,
        collectionAddress: "0x881D9c2F229323aad28a9c9045111e30e1F1eB25"
    };
  }
  componentDidMount() {    
    const { initializerName, initializerNumber, collectionAddress } = this.state;    
    const response = fetch(`/api/nft/0x881D9c2F229323aad28a9c9045111e30e1F1eB25/${this.props.initializer}/profile/name`).then(response => response.json())
    .then(result => {
      if(result) {      
        this.setState({ initializerName: result.name });
      }
    });
  }      
  render() {
    const { initializerName, initializerNumber, collectionAddress } = this.state;
    let openSeaLink = `https://opensea.io/assets/${collectionAddress}/${this.props.initializer}`;
  
    let emotes = emoteUtils.getEmotesForInitializer(initializerNumber);  
    return (  
      <div className="Emote">
        <ContentSection width="75%" style={{minHeight:"80vh", display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"center", alignItems:"center"}}>
          <h2 style={{flexBasis:"100%"}}>{initializerName} Emotes</h2>
            {emotes.map((entry, i) => {            
              return (
                  <InnerSection key={entry.emote} width='504px' style={{margin: "1rem"}}>
                    <img src={`/api/emote/${this.props.initializer}/${entry.emote}/med`} width="504px"/>
                    <a style={{display:"block", fontSize:"small"}} href={`/api/emote/${this.props.initializer}/${entry.emote}/med`} download={`${this.props.initializer}-${entry.emote}.png`}>Download {entry.emote}</a>
                  </InnerSection>
                );
              })
                }
          <div style={{marginBottom: "1rem", flexBasis:"100%"}}>Check out {initializerName} <a href={openSeaLink} >on OpenSea</a></div>
        </ContentSection>
        <Footer />
    </div>
    );  
  };
}
export { EmoteSection }; 
  