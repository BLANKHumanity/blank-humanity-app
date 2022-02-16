import React from "react";

import BrandFace from "../BrandFace/BrandFace.js";
import JoinDiscordButton from "../JoinDiscordButton/JoinDiscordButton.js";

import Logo from "../Logo/Logo.js";

export default function Footer(props) {
  return (
    <div
      className="Footer"
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "end",
        }}
      >
        <BrandFace
          faceColor="white"
          style={{
            width: "3.5rem",
            height: "2.25rem",
            margin: "none",
            padding: "1.5rem",
          }}
        />
        <Logo tagline="Episode 0: Greetings" />
      </div>
      <div
        style={{
          width: "10%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <a
          href="https://discord.gg/ANT6XsSUyZ"
          target="_blank"
          style={{ color: "white", textDecoration: "none" }}
        >
          <i class="fab fa-discord"></i>
        </a>
        <a
          href="https://twitter.com/blankhumanity"
          target="_blank"
          style={{ color: "white", textDecoration: "none" }}
        >
          <i class="fab fa-twitter"></i>
        </a>
        {/*}
        <a
          href="https://reddit.com/r/blankhumanity"
          target="_blank"
          style={{ color: "white", textDecoration: "none" }}
        >
          <i class="fab fa-reddit-alien"></i>
        </a>
        {*/}
      </div>
      <div
        style={{
          width: "100%",
          textAlign: "center",
          position: "absolute",
          bottom: "1rem",
          fontSize: "1rem",
        }}
      >
        <a href="https://blankhumanity.com/privacy-policy" target="_blank">
          Privacy Policy
        </a>{" "}
        |{" "}
        <a
          href="https://blankhumanity.com/terms-and-conditions"
          target="_blank"
        >
          Terms and Conditions
        </a>
      </div>
    </div>
  );
}
