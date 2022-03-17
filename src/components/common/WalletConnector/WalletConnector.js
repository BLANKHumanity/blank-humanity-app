import React from "react";

import { useWalletDataContext } from "../../../state/WalletContext";

export default function WalletConnector({}) {

  const {walletData, setWalletData, connectWallet } = useWalletDataContext();

  return (
    <div
        className="connectedWalletDisplay"
        style={{
        position: "fixed",
        color: "rgb(0,255,0)",
        backgroundColor: "black",
        right: 0,
        bottom: 0,
        fontSize: "1rem",
        padding: ".1rem",
        zIndex: 999999999,
        }}
    >
        {walletData && walletData.accounts.length ? (
        "Connected with wallet " + walletData.accounts[0]
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
  </div>
  );
}
