import React from "react";
import { useRouter } from 'next/router'
import ContentSection from "../../../common/ContentSection/ContentSection";
import InnerSection from "../../../common/InnerSection/InnerSection";
import initializerMetadata from "../../../../utils/initializers-metadata-lookup.json";

export default function GM(props) {
  const router = useRouter()
  let { tokenId } = router.query
 
  if( !parseInt(tokenId) ) { tokenId = 0; }

  return (
    <div className="GM">
        <ContentSection width="75%">
        <InnerSection>
        <div style={{border:"1px solid black", padding:"1rem", width:"75%", maxWidth:"500px", margin: "0 auto"}}>
          <div>
            <img src={initializerMetadata[tokenId][0].imageData} align="top" width="75%"/>
            <img src="/GM-black.png" align="top" width="25%"/>
          </div>
          <div style={{fontStyle: "italic",fontSize: "2rem", paddingTop: "1rem"}}>Initializer {tokenId} says GM</div>
          </div>
        </InnerSection>
        </ContentSection>
    </div>
  );
}
