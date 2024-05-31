import { FC, useEffect, useState } from "react";
import '/home/ubuntu/projects/front-end/src/assets/css/style.css'
import icon from '/home/ubuntu/projects/front-end/src/assets/img/icon.png'

export default function HeaderComponent1(){

  const [walletAvail, setWalletAvail] = useState(false);
  const [provider, setProvider] = useState(null);
  const [connected, setConnected] = useState(false);
  const [pubKey, setPubKey] = useState(null);

  useEffect(() => {
    if ("sui" in window) {
      const suiWindow = window;
      if (suiWindow.sui && suiWindow.sui.isSuiWallet) {
        setProvider(suiWindow.sui);
        setWalletAvail(true);
        // Attempt an eager connection
        suiWindow.sui.connect();
      }
    }
  }, []);

  useEffect(() => {
    if (provider) {
      // Add Sui wallet listeners (adapt based on library)
      provider.on("connected", (address) => {
        console.log(`Sui wallet connected: ${address}`);
        setConnected(true);
        setPubKey(address); // Assuming address is the public key
      });
      provider.on("disconnected", () => {
        console.log("Sui wallet disconnected");
        setConnected(false);
        setPubKey(null);
      });
    }
  }, [provider]);
  
  const connectHandler = async (event) => {
    console.log("Sui wallet connect requested");
    try {
      const connected = await provider.connect(); // Replace with appropriate connect method
      if (connected) {
        console.log("Connected to Sui wallet successfully!");
      } else {
        console.log("Connection to Sui wallet failed.");
      }
    } catch (error) {
      console.error("Error connecting to Sui wallet:", error);
    }
  };
  
  const disconnectHandler = async (event) => {
    console.log("Sui wallet disconnect requested");
    try {
      await provider.disconnect(); // Replace with appropriate disconnect method
      console.log("Disconnected from Sui wallet.");
    } catch (error) {
      console.error("Error disconnecting from Sui wallet:", error);
    }
  };

    return (
        <header role="banner" aria-label="site-wide-navigation" class="site-header">
            <div class="container">
        <nav role="navigation" aria-label="navigation" class="site-header-nav">

          <ul class="site-nav-left">
            <li>
              <a href="#">
                <img src={icon} alt="Citrus" class="logo" />
              </a>
            </li>
            <li>
              <a href="#" class="site-nav-link">About</a>
            </li>
            <li>
              <a href="#" class="site-nav-link-active">Register URL</a>
            </li>
          </ul>

          <ul class="site-nav-right">
            <li>
              <a href="#" class="site-nav-link" aria-label="site-wide-search-button" role="button">
                <img src="https://s3.amazonaws.com/codecademy-content/programs/ui-design/color-ui/icon-search.svg" alt="Search" />
              </a>
            </li>
            <li>
            {walletAvail ? (
  <>
    {connected ? (
      <button className="button-30" role="button" onClick={disconnectHandler}>
        Disconnect from Suiet Wallet
      </button>
    ) : (
      <button className="button-30" role="button" onClick={connectHandler}>
        Connect to Suiet Wallet
      </button>
    )}
  </>
) : (
  <>
    <p>
      <a href="https://suiet.app/">Download Suiet wallet</a>.
    </p>
  </>
)}
            </li>
          </ul>
        </nav>
      </div>
    </header>
    )
}