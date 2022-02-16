import React from "react";

import InitializerNFT from "../../../common/InitializerNFT/InitializerNFT.js";

export default function Hero({web3, tokens, accounts, collectibleContract}) {
  return (
    <div className="CitizenCollection">
        <u>Your Initializers</u>
        <div className="CitizenCollectionNFTHolder">
        {tokens
            ? tokens.length == 0
            ? "NONE"
            : tokens?.map((entry, i) => {
                return (
                    <InitializerNFT
                    web3={web3}
                    contract={collectibleContract}
                    tokenId={entry}
                    />
                );
                })
            : "[LOADING...]"}
        </div>
        <div style={{ fontSize: "1.5rem", margin: "2rem" }}>
        View your tokens on Etherscan{" "}
        <a
            href={
            "https://etherscan.io/address/" +
            accounts[0] +
            "#tokentxnsErc721"
            }
            target="_blank"
        >
            HERE
        </a>
        </div>
    </div>
  );
}
