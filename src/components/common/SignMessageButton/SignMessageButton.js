import React from "react";
import ethUtil from "ethereumjs-utils";

export default function SignMessageButton({
    accounts,
    web3,
    message,
    salt
  }) {
    const [display, setDisplay] = React.useState("none");
  
    React.useEffect(async () => {
      const cssDisplay = accounts.length == 0 ? "none" : "inline";
      setDisplay(cssDisplay);
    }, [accounts]);
    return (
      <button
        style={{ display: display }}
        className="ButtonBlack"
        onClick={async () => {
            var signature = await web3.eth.personal.sign(message, accounts[0], function(error, signature) {
                fetch('/api/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        salt: salt, 
                        signature: signature
                    }),
                })
            })
        }}
      >
        SIGN MESSAGE
      </button>
    );
  }
  