import React from "react";
import ReactModal from "react-modal";
import { createWatcher } from "@makerdao/multicall";

import InitializerCollection from "../contracts/Initializers.json";
import getWeb3 from "../utils/getWeb3";

import ContentSection from "../components/common/ContentSection/ContentSection.js";
import InnerSection from "../components/common/InnerSection/InnerSection.js";
import BrandFace from "../components/common/BrandFace/BrandFace.js";
import InitializerNFT from "../components/common/InitializerNFT/InitializerNFT.js";
import WalletConnector from "../components/common/WalletConnector/WalletConnector.js";
import Footer from "../components/common/Footer/Footer.js";

import HeroSection from "../components/modules/Home/HeroSection/HeroSection.js";
import MintInitializerSection from "../components/modules/Home/MintInitializerSection/MintInitializerSection.js";
import MyInitializersSection from "../components/modules/Home/MyInitializersSection/MyInitializersSection.js";

const CONTRACT_ADDRESS = "0x881D9c2F229323aad28a9c9045111e30e1F1eB25";
const TOTAL_INITIALIZERS = 969;

export default function Home(props) {
  //////////////////////////////////
  const getTotalTokensMinted = async () => {
    const totalTokensMinted = await collectibleContract.methods
      .totalSupply()
      .call();
    if (!totalTokensMinted) return 0;
    return totalTokensMinted;
  };
  const getNumUnmintedInitializers = async () => {
    return TOTAL_INITIALIZERS - (await getTotalTokensMinted());
  };

  // Modal 
  const [modalContent, setModalContent] = React.useState("");
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const openModal = (content) => {
    setModalContent(content);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const afterOpenModal = () => {};
  // Modal set up
  const customModalStyles = {
    content: {
      position: "absolute",
      width: "70%",
      height: "80%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      zIndex: 1001,
    },
    overlay: { zIndex: 1000, backgroundColor: "rgba(0,0,0,.75)" },
  };

  const [collectibleContract, setCollectibleContract] = React.useState();
  const [tokens, setTokens] = React.useState();
  const [web3, setWeb3] = React.useState();
  const [accounts, setAccounts] = React.useState([]);
  const [price, setPrice] = React.useState();
  const [
    numUnmintedInitializers,
    setNumUnmintedInitializers,
  ] = React.useState();

  const connectWallet = async () => {
    try {
      // Get network provider and web3 contract.
      //const web3 = await getWeb3();
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      web3.eth.getBalance(accounts[0], function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log(web3.utils.fromWei(result, "ether") + " ETH");
        }
      });

      console.log(InitializerCollection);

      // Get the contract contract.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = InitializerCollection.networks[networkId];
      const contract = new web3.eth.Contract(
        InitializerCollection.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed 
      setWeb3(web3);
      setAccounts(accounts);
      setCollectibleContract(contract);

      const price = await contract.methods.price().call();
      setPrice(price);

      window.ethereum.on("accountsChanged", (accounts) => {
        window.location.reload();
      });
      window.ethereum.on("chainChanged", (accounts) => {
        window.location.reload();
      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  const componentDidMount = async () => {
    await connectWallet();
  };

  React.useEffect(async () => {
    // Make sure state has propegated for all state variables
    if (web3 && accounts && collectibleContract) {
      setNumUnmintedInitializers(await getNumUnmintedInitializers());
    }
  }, [web3, accounts, collectibleContract]);

  React.useEffect(componentDidMount, []);
  // Grab data from wallet when web3 cariables are initialized or updated
  React.useEffect(() => {
    if (web3 && accounts && collectibleContract) {
      runExample();
    }
  }, [web3, accounts, collectibleContract]);

  const runExample = async () => {

    if (!accounts[0]) return;

    // Preset can be 'mainnet', 'kovan', 'rinkeby', 'goerli' or 'xdai'
    const watcherConfig = {
      //preset: "mainnet",
      multicallAddress: "0xeefba1e63905ef1d7acba5a8513c70307c1ce441",
      rpcUrl: "https://mainnet.infura.io/v3/1569100bf3fd4f14801eeb39a68c97a3",
      interval: 60000,
    };

    const totalTokensMinted = await getTotalTokensMinted();

    const watcherCalldata = [...Array(totalTokensMinted - 1).keys()].map(
      (tokenId) => {
        return {
          target: CONTRACT_ADDRESS,
          call: ["ownerOf(uint256)(address)", tokenId],
          returns: [["#" + tokenId, (val) => val]],
        };
      }
    );

    const watcher = createWatcher(watcherCalldata, watcherConfig);

    // Subscribe to batched state updates
    watcher.batch().subscribe((updates) => {
      // Handle batched updates here
      // Updates are returned as { type, value } objects, e.g:
      let tokenIds = [];
      updates.forEach((entry) => {
        let tokenId = parseInt(entry.type.substring(1));
        let tokenOwner = entry.value;
        console.log(tokenId, tokenOwner);
        if (tokenOwner == accounts[0]) {
          tokenIds.push(tokenId);
        }
      });
      setTokens(tokenIds);
    });

    // Start the watcher polling
    watcher.start(watcherConfig);

    // Update state with the result.
    //this.setState({ storageValue: tokenIds.join(",") });
  };

  return (
    <div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestOpen={openModal}
        onRequestClose={closeModal}
        style={customModalStyles}
        onAfterOpen={afterOpenModal}
        contentLabel="Template Modal"
      >
        {modalContent}
      </ReactModal>
      <WalletConnector accounts={accounts} connectWalletFunc={connectWallet} />
      <HeroSection />
      {accounts[0] ? (
        <>
          <MintInitializerSection />
          {tokens?.length > 0 ? (
            <MyInitializersSection web3={web3} tokens={tokens} accounts={accounts} collectibleContract={collectibleContract} />
          ) : (
            <div
              style={{ backgroundColor: "white", width: "100%", height: "2vh" }}
            ></div>
          )}
        </>
      ) : (
        ""
      )}
      <Footer />
    </div>
  );
}
