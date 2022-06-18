import React from "react";
import ethUtil from "ethereumjs-utils";

export default function SignMessageButton({
    accounts,
    web3,
    message,
    salt,
    api
  }) {
    const [display, setDisplay] = React.useState("none");
    const [disabled, setDisabled] = React.useState(false);
    
    const [responseMessage, setResponseMessage] = React.useState("");
  
    React.useEffect(async () => {
      const cssDisplay = accounts.length == 0 ? "none" : "inline";
      setDisplay(cssDisplay);
    }, [accounts]);
    let apis = ['verify', 'profile'];
    let apiIndex = apis.indexOf(api);
    let endpoint = '/api/verify';
    let buttonDefaultText = "SIGN MESSAGE";
    if(api == 'profile' && message.contractId && message.tokenId ) {
      endpoint = `/api/nft/${message.contractId}/${message.tokenId}/profile`;
      buttonDefaultText = "UPDATE PROFILE";
    }
    const [buttonText, setButtonText] = React.useState(buttonDefaultText);
    return (
      <div>
        <p className="message">{responseMessage}</p>
        <button
          style={{ display: display }}
          className="ButtonBlack"
          disabled={disabled}
          onClick={async () => {
            if(buttonText == "ALL DONE") {
              window.location = '/';
            } else { 
              //const token = await Web3Token.sign(msg => message.eth.personal.sign(msg, address), '1d');
              var signature = await web3.eth.personal.sign(JSON.stringify(message), accounts[0], function(error, signature) {
                  fetch(`${endpoint}`, {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json'                          
                      },
                      body: JSON.stringify({
                          salt: salt, 
                          signature: signature, 
                          address:accounts[0],
                          tokenName: message.tokenName || "",
                          tokenNotes: message.tokenNotes || "",
                          tokenPhrase: message.tokenPhrase || ""
                      }),
                  }).then(res => {
                    if(res.status == 200) {
                      if(api == 'verify') {
                        setResponseMessage("SUCCESS: You can close this window");
                        setButtonText("ALL DONE");
                      } else {
                        setResponseMessage("SUCCESS: The new name and phrase will show from now on.");
                      }
                    } else {
                      setButtonText("TRY AGAIN");
                      setResponseMessage("There was an error processing the signature, please try again. If this problem persists, try starting over from discord.")
                    } 
                  })
              })
            }
          }}
        >
          {buttonText}
        </button>
      </div>
    );
  }
  