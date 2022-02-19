import React from "react";
import instagramLogo from "./assets/instagram-logo.svg";
import artGalleryLogo from "./assets/art-gallery-logo.svg";
import "./App.css";

// Constants
const INSTAGRAM_HANDLE = "shubhankardev";
const INSTAGRAM_LINK = `https://instagram.com/${INSTAGRAM_HANDLE}`;

const App = () => {
  return (
    <div className="App">
      <div className="container">
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
