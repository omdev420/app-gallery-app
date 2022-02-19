import React, { useEffect, useState } from "react";
import instagramLogo from "./assets/instagram-logo.svg";
import artGalleryLogo from "./assets/art-gallery-logo.svg";
import "./App.css";

// Constants
const INSTAGRAM_HANDLE = "shubhankardev";
const INSTAGRAM_LINK = `https://instagram.com/${INSTAGRAM_HANDLE}`;

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;
      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom Wallet found!");

          const response = await solana.connect({ onlyIfTrusted: true });

          console.log(
            "Connected with Public Key:",
            response.publicKey.toString(),
          );
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert("Solana object not found! Get a Phantom Wallet 👻");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;
    if (solana) {
      const response = await solana.connect();
      console.log("Connected with Public Key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div className="App">
      <div className={walletAddress ? "authed-container" : "container"}>
        <div className="header-container">
          <img
            alt="Art Gallery Icon"
            className="art-gallery-logo"
            src={artGalleryLogo}
          />
          <p className="header">Art Gallery</p>
          <p className="sub-text">
            Showcase your art collection in the metaverse ✨
          </p>
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        <div className="footer-container">
          <img
            alt="Instagram Logo"
            className="instagram-logo"
            src={instagramLogo}
          />
          <a
            className="footer-text"
            href={INSTAGRAM_LINK}
            target="_blank"
            rel="noreferrer"
          >{`@${INSTAGRAM_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
