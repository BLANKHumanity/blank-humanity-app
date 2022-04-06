import React from "react";
import ethUtil from "ethereumjs-utils";

export default function SignMessageButton({
    accounts,
    web3,
    message,
    salt
  }) {
    const [display, setDisplay] = React.useState("none");
    const [disabled, setDisabled] = React.useState(false);
    const [buttonText, setButtonText] = React.useState("SIGN MESSAGE");
    const [responseMessage, setResponseMessage] = React.useState("");
  
    React.useEffect(async () => {
      const cssDisplay = accounts.length == 0 ? "none" : "inline";
      setDisplay(cssDisplay);
    }, [accounts]);
    return (
      <div>
        <p className="message">{responseMessage}</p>
        <button
          style={{ display: display }}
          className="ButtonBlack"
          disabled={disabled}
          onClick={async () => {
              var signature = await web3.eth.personal.sign(message, accounts[0], function(error, signature) {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", 'https://app.blankhumanity.com/api/verify', true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({
                  salt: salt, 
                  signature: signature, 
                  address:accounts[0]
                }));
                xhr.onreadystatechange = () => {
                  if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                      setResponseMessage("SUCCESS: You can close this window");
                      setButtonText("ALL DONE");
                      setDisabled(true);
                    } else {
                      setButtonText("TRY AGAIN");
                      setResponseMessage("There was an error processing the signature, please try again. If this problem persists, try starting over from discord.")                              
                    }
                  }
                }
              })
          }}
        >
          {buttonText}
        </button>
      </div>
    );
  }
  