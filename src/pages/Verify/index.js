import React from "react";

import VerifySection from "../../components/modules/Verify/VerifySection/VerifySection";
import WalletConnector from "../../components/common/WalletConnector/WalletConnector.js";
import Footer from "../../components/common/Footer/Footer.js";

export default function Verify(props) {  
  return (
    <div>            
      <VerifySection />
      <Footer/>
    </div>    
  );
}
