import React from "react";

import { useWalletDataContext } from "../../../../state/WalletContext";
import Web3Token from 'web3-token';
import CheckBalanceButton from "../../../common/CheckBalanceButton/CheckBalanceButton";

function getBalance(walletData) {
    if(walletData && walletData.web3Token) {
        fetch('http://localhost:8081/user/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': walletData.web3Token
            }
        }).then(res=>res.json().then(response => {
            return response[0]['balance'] || 0;
        }))
    }     
}
export default function Hero({web3, tokens, accounts, collectibleContract}) {

  const {walletData, setWalletData} = useWalletDataContext();

  return (
    <div className="CitizenCollection">
        <u>Your Inventory</u>
        <div className="CitizenCollectionNFTHolder">
            Hyper Credit Balance: {walletData?.accounts?.length ? getBalance(walletData) : 0}
        </div>        
    </div>
  );
}
