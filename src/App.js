import React from "react";

import { WalletDataProvider } from "./state/WalletContext.js";

import "../styles.css";

import HomePage from "./pages/Home.js";
import GMPage from "./pages/GM.js";
import EmotePage from "./pages/Emote/[tokenId]//[emote]//index.js";
import DemoPage from "./pages/Demo.js";

export default function App() {
  return (
    <WalletDataProvider>
      <div className="App">
      </div>
    </WalletDataProvider>
  );
}
