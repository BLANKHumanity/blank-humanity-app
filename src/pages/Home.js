import React from "react";
import ReactModal from "react-modal";

import { useWalletDataContext } from "../state/WalletContext";

import ContentSection from "../components/common/ContentSection/ContentSection.js";
import InnerSection from "../components/common/InnerSection/InnerSection.js";
import BrandFace from "../components/common/BrandFace/BrandFace.js";
import InitializerNFT from "../components/common/InitializerNFT/InitializerNFT.js";
import WalletConnector from "../components/common/WalletConnector/WalletConnector.js";
import Footer from "../components/common/Footer/Footer.js";

import HeroSection from "../components/modules/Home/HeroSection/HeroSection.js";
import MintInitializerSection from "../components/modules/Home/MintInitializerSection/MintInitializerSection.js";
import MyInitializersSection from "../components/modules/Home/MyInitializersSection/MyInitializersSection.js";

export default function Home(props) {

  const {walletData, setWalletData} = useWalletDataContext();

  React.useEffect(() => {
    console.log(walletData);
    console.log(setWalletData);
    alert(walletData);

    setTimeout(() => {
      console.log(walletData);
      alert(walletData);
    }, 5000);
  }, []);

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
      <WalletConnector />
      <HeroSection />
      {walletData?.accounts?.length ? (
        <>
          <MintInitializerSection />
          {walletData.tokens?.length > 0 ? (
            <MyInitializersSection />
          ) : (
            <div
              style={{ backgroundColor: "white", width: "100%", height: "2vh" }}
            >thrtdujftyik</div>
          )}
        </>
      ) : (
        "NONENOEN"
      )}
      <Footer />
    </div>
  );
}
