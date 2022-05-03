import React, { useEffect, useState } from "react";
import instagramLogo from "./assets/instagram-logo.svg";
import artGalleryLogo from "./assets/art-gallery-logo.svg";
import "./App.css";

// Constants
const INSTAGRAM_HANDLE = "shubhankardev";
const INSTAGRAM_LINK = `https://instagram.com/${INSTAGRAM_HANDLE}`;
const TEST_PICS = [
"https://i.imgur.com/xvY3SYOl.jpg",
"https://i.imgur.com/X6iykcZl.jpg",
"https://i.imgur.com/nkNZn4fl.jpg",
"https://i.imgur.com/DR3WLerl.jpg",
"https://i.imgur.com/8caqgWGl.jpg",
"https://i.imgur.com/UMq5Jipl.jpg",
"https://i.imgur.com/6Ugjyzgl.jpg",
"https://i.imgur.com/yRKbj5Xl.jpg",
"https://i.imgur.com/kWYPjBMl.jpg",
"https://i.imgur.com/3HLdTS5l.jpg",
];

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [picList, setPicList] = useState([]);

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

  const sendPic = async () => {
    if (inputValue.length > 0) {
      console.log("Pic Link:", inputValue);
      setPicList([...picList, inputValue]);
      setInputValue("");
    } else {
      console.log("Empty input. Try Again.");
    }
  };

  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  const renderConnectedContainer = () => (
    <div className="connected-container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          sendPic();
        }}
      >
        <input
          type="text"
          placeholder="Enter art work link!"
          value={inputValue}
          onChange={onInputChange}
        />
        <button type="submit" className="cta-button submit-gif-button">
          Submit
        </button>
      </form>
      <div className="gif-grid">
        {picList.map((pic) => (
          <div className="gif-item" key={pic}>
            <img src={pic} alt={pic} />
          </div>
        ))}
      </div>
    </div>
  );

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    if (walletAddress) {
      console.log("Fetching artworks...");

      setPicList(TEST_PICS);
    }
  }, [walletAddress]);

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
          {walletAddress && renderConnectedContainer()}
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
