import React from "react";

import { useWalletDataContext } from "../../../../state/WalletContext";

import InitializerNFT from "../../../common/InitializerNFT/InitializerNFT.js";

export default function Hero({web3, tokens, accounts, collectibleContract}) {

  const {walletData, setWalletData} = useWalletDataContext();

  return (
    <div className="CitizenCollection">
        <u>Your Initializers</u>
        <div className="CitizenCollectionNFTHolder">
        {walletData?.tokens && walletData.collectibleContract
            ? walletData?.tokens?.length == 0
            ? "NONE"
            : walletData.tokens?.map((entry, i) => {
                return (
                    <InitializerNFT
                        tokenId={entry}
                        web3={walletData.web3}
                        contract={walletData.collectibleContract}
                    />
                );
                })
            : "[LOADING...]"}
        </div>
        <div style={{ fontSize: "1.5rem", margin: "2rem" }}>
        {walletData?.accounts?.length ? 
            <div>
                View your tokens on Etherscan{" "}
                <a
                    href={
                    "https://etherscan.io/address/" +
                    walletData.accounts[0] +
                    "#tokentxnsErc721"
                    }
                    target="_blank"
                >
                    HERE
                </a>
            </div> 
            : <></>
        }
        </div>
    </div>
  );
}
