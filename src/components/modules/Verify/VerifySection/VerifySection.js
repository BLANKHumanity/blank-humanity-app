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
    const {walletData, connectWallet, setWalletData} = useWalletDataContext();

    let message = `Hi, to connect your Ethereum Address to this Discord Account ${discord_id} on the Blank Humanity Server, please sign this random message: ${salt}`
    return (  
        <div className="Verify">
        <ContentSection width="75%" style={{minHeight:"80vh", display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"center", alignItems:"center"}}>
            <h1 style={{flexBasis:"100%"}}>Verify your wallet</h1>
            <p>Connect your wallet with Metamask (on the Ethereum Main Network) and sign the message to validate your discord/wallet connection.</p>
            <p>Once you've completed this, you'll have access to extra features in the BLANK Humanity discord server.</p>
            {walletData && walletData.accounts.length ? (
            <SignMessageButton message={message} accounts={walletData?.accounts} salt={salt} web3={walletData.web3}/>
            ) : (
            <button
                style={{ color: "rgb(0,255,0)", backgroundColor: "black" }}
                onClick={async () => {
                    await connectWallet();
                }}
            >
                Click Here To Connect Your Wallet
            </button>
        )}
            
            <p>This page is open source, you can view the source code <a href="https://github.com/BLANKHumanity/blank-humanity-app/blob/main/src/components/modules/Verify/VerifySection/VerifySection.js">on GitHub</a></p>
        </ContentSection>
        <Footer />
    </div>
    );  
    return null;
}