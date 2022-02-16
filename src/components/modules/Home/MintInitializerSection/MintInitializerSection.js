import React from "react";

import ContentSection from "../../../common/ContentSection/ContentSection";
import InnerSection from "../../../common/InnerSection/InnerSection";

export default function Hero(props) {
  return (
    <div
        className="CreateCitizen"
        style={{ backgroundColor: "black", color: "white" }}
    >
        <ContentSection
            width="65%"
            style={{ backgroundColor: "black", color: "white" }}
        >
            <InnerSection>
                <b>SOLD OUT!</b>
            </InnerSection>
            <InnerSection>
                There are <u>0</u> Initializers left to be initialized.
            </InnerSection>
        </ContentSection>
    </div>
  );
}
