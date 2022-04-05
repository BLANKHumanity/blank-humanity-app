import React from "react"
import { useRouter } from 'next/router'
import ContentSection from "../../../common/ContentSection/ContentSection";
import InnerSection from "../../../common/InnerSection/InnerSection";
import { useWalletDataContext } from "../../../../state/WalletContext";
import SignMessageButton from "../../../common/SignMessageButton/SignMessageButton";
import Footer from "../../../common/Footer/Footer";

export default function Verify(props) {
    const router = useRouter()
    let { discord_id, salt } = router.query
    const {walletData, setWalletData} = useWalletDataContext();
    
    if(walletData?.accounts?.length) {
        let message = `Hi, to connect your Ethereum Address to this Discord Account ${discord_id} on the Blank Humanity Server, please sign this random message: ${salt}`
        return (  
            <div className="Verify">
            <ContentSection width="75%" style={{minHeight:"80vh", display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"center", alignItems:"center"}}>
                <h1 style={{flexBasis:"100%"}}>Verify your wallet</h1>
                <p>Connect your wallet with Metamask and sign the message to validate your discord/wallet connection</p>
                <SignMessageButton message={message} accounts={walletData?.accounts} salt={salt} web3={walletData.web3}/>
            </ContentSection>
            <Footer />
        </div>
        );  
    }
    return null;
}