import React from "react";
import BrandFace from "../components/common/BrandFace/BrandFace";
import InnerSection from "../components/common/InnerSection/InnerSection";

export default function Demo(props) {

  React.useEffect(() => {
    window.location = "https://demo.blankhumanity.com/";
  }, []);

  return (
    <div>
      <BrandFace />
      <InnerSection>
        My minions are upgrading this page, please be patient, they are not as fast as I am.
      </InnerSection>
    </div>
  );
}
