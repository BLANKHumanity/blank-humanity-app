import React from "react";

import ContentSection from "../../../common/ContentSection/ContentSection";
import BrandFace from "../../../common/BrandFace/BrandFace";
import InnerSection from "../../../common/InnerSection/InnerSection";

export default function Hero(props) {
  return (
    <div className="Hero">
        <ContentSection width="75%">
        <BrandFace />
        <InnerSection>
            Greetings Humanity. Welcome to The Beginning.
        </InnerSection>
        <InnerSection>
            Collect NFTs. Form alliances. Betray allies. <br />
            <u>Shape the future of Humanity.</u>
        </InnerSection>
        <InnerSection style={{ marginTop: "5rem" }}>
            <span className="PlayInvitationText">
            Would you like to continue?
            </span>
        </InnerSection>
        </ContentSection>
    </div>
  );
}
