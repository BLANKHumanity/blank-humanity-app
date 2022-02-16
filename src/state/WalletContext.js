import React from "react";
import constate from "constate"; // State Context Object Creator

const DEFAULT_WALLET = {};

// Built from this article: https://www.sitepoint.com/replace-redux-react-hooks-context-api/

// Step 1: Create a custom hook that contains your state and actions
function useWalletData() {
  const [walletData, setWalletData] = React.useState(DEFAULT_WALLET);

  React.useEffect(() => {
    setWalletData({});
  }, []);

  return [ walletData, setWalletData ];
}

// Step 2: Declare your context state object to share the state with other components
const [WalletDataProvider, useWalletDataContext] = constate(useWalletData);
export { WalletDataProvider, useWalletDataContext };
