import React from "react";
import ethUtil from "ethereumjs-utils";
import Web3Token from "web3-token";

export default function CheckBalanceButton({
    accounts,
    web3,
    web3Token
  }) {
    const [display, setDisplay] = React.useState("none");
    const [disabled, setDisabled] = React.useState(false);
    const [buttonText, setButtonText] = React.useState("CHECK BALANCE");
    const [responseMessage, setResponseMessage] = React.useState("");
  
    React.useEffect(async () => {
      const cssDisplay = accounts.length == 0 ? "none" : "inline";
      setDisplay(cssDisplay);
    }, [accounts]);
    
    return (
      <div>
        <p className="message">Hyper Credit Balance {responseMessage}</p>
        <button
          style={{ display: display }}
          className="ButtonBlack"
          disabled={disabled}
          onClick={async () => {
            if(buttonText == "ALL DONE") {
              window.location = '/';
            } else if(web3Token) {               
                console.log(`web3Token: ${web3Token}`);
                fetch('http://localhost:8081/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': web3Token,
                    },
                }).then(res=>res.json().then(response => {
                    setResponseMessage(response[0].balance);
                }))
            }
          }}
        >
          {buttonText}
        </button>
      </div>
    );
  }
  