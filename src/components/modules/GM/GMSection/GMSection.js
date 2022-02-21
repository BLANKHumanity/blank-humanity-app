import React from "react";
import { useParams } from "react-router-dom";
import ContentSection from "../../../common/ContentSection/ContentSection";
import InnerSection from "../../../common/InnerSection/InnerSection";

export default function GM(props) {
  let { initializer } = useParams();
  if( !parseInt(initializer) ) { initializer = 0; }
  return (
    <div className="GM">
        <ContentSection width="75%">
        <InnerSection>
        <div style={{border:"1px solid black", padding:"1rem", width:"26rem", margin: "0 auto"}}>
          <div>
            <img src={'/initializers/' + initializer + '.png'} width="75%"/>
            <img src="/GM-black.png" align="top" width="25%"/>
          </div>
          <div style={{fontStyle: "italic",fontSize: "large"}}>Initializer {initializer} says GM</div>
          </div>
        </InnerSection>
        </ContentSection>
    </div>
  );
}
