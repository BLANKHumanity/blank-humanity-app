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
  
    React.useEffect(async () => {
      const cssDisplay = accounts.length == 0 ? "none" : "inline";
      setDisplay(cssDisplay);
    }, [accounts]);
    return (
      <button
        style={{ display: display }}
        className="ButtonBlack"
        disabled={disabled}
        onClick={async () => {
            var signature = await web3.eth.personal.sign(message, accounts[0], function(error, signature) {
                fetch('/api/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        salt: salt, 
                        signature: signature, 
                        address:accounts[0]
                    }),
                }).then(res => res.status == 200 ? setDisabled(true) : setButtonText("TRY AGAIN"))
            })
        }}
      >
        {disabled?"SUCCESS: You can close this window":buttonText}
      </button>
    );
  }
  