import React from "react"
import { useRouter } from 'next/router'
import ContentSection from "../../common/ContentSection/ContentSection";
import WalletConnector from "../../common/WalletConnector/WalletConnector";
import { useWalletDataContext } from "../../../state/WalletContext";
import SignMessageButton from "../../common/SignMessageButton/SignMessageButton";

export default function NFTProfileUpdateSection(props) {
    const router = useRouter()
    let { discord_id, salt } = router.query
    const {walletData, connectWallet, setWalletData} = useWalletDataContext();
    const [tokenName, setTokenName] = React.useState(" ");
    const [tokenPhrase, setTokenPhrase] = React.useState(" ");
    const [tokenNotes, setTokenNotes] = React.useState(" ");
    
    const handleNameInput = event => {
        setTokenName(event.target.value);        
    };
    const handlePhraseInput = event => {
        setTokenPhrase(event.target.value);
    };
    const handleNotesInput = event => {
        setTokenNotes(event.target.value);
    };

    let tokenProfile = {contractId:props.contractId,tokenId:props.tokenId,tokenName:tokenName,tokenPhrase:tokenPhrase, tokenNotes:tokenNotes};
    return (  
        <div className="InitializerProfile">
        {walletData?.tokens && walletData.collectibleContract
            ? walletData?.tokens?.length == 0
            ? <div>Is this your NFT? Connect your wallet to enable editing of the Name and Phrase used here when your NFT is scanned. <WalletConnector /></div>
            : walletData.tokens?.map((entry, i) => {
                if(entry == props.tokenId) {  
                    return (
                        <ContentSection width="75%" style={{minHeight:"30vh", display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"center", alignItems:"center"}}>            
                            <p>It looks like you own this NFT, to set the name, phrase, and notes, fill out the following info and sign the data. 
                            This will not incur any gas fees, simply validates your ownership.</p>
                                <div>
                                    <label>Name:</label><input type="text" onChange={handleNameInput}/>
                                </div>
                                <div>
                                    <label>Phrase:</label><input type="text" onChange={handlePhraseInput} />
                                </div>
                                <div>
                                    <label>Notes:</label><input type="text" onChange={handleNotesInput} />
                                </div>
                            {walletData && walletData.accounts.length ? (
                            <div><SignMessageButton message={tokenProfile} accounts={walletData?.accounts} salt={salt} web3={walletData.web3} api="profile"/></div>
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
                        </ContentSection>
                    );
                }
                })
            : "[LOADING...]"}                        
    </div>
    );  
    return null;
}