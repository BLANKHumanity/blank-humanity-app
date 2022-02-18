import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";

import { WalletDataProvider } from "./state/WalletContext.js";

import "./styles.css";

import HomePage from "./pages/Home.js";
import DemoPage from "./pages/Demo.js";

export default function App() {
  return (
    <WalletDataProvider>
      <div className="App">
        <Router basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/demo" element={<DemoPage />} />
          </Routes>
        </Router>
      </div>
    </WalletDataProvider>
  );
}
