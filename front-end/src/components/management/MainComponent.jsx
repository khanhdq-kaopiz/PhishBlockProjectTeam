import { useNavigate } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import '/home/ubuntu/projects/front-end/src/assets/css/style.css'
import '/home/ubuntu/projects/front-end/src/assets/vendor/aos/aos.css'
import '/home/ubuntu/projects/front-end/src/assets/vendor/bootstrap-icons/bootstrap-icons.css'
import '/home/ubuntu/projects/front-end/src/assets/vendor/boxicons/css/boxicons.min.css'
import '/home/ubuntu/projects/front-end/src/assets/vendor/glightbox/css/glightbox.min.css'
import '/home/ubuntu/projects/front-end/src/assets/vendor/remixicon/remixicon.css'
import '/home/ubuntu/projects/front-end/src/assets/vendor/swiper/swiper-bundle.min.css'
import icon from '/home/ubuntu/projects/front-end/src/assets/img/icon.png'
import '/home/ubuntu/projects/front-end/src/assets/vendor/bootstrap/css/bootstrap.min.css'
import '/home/ubuntu/projects/front-end/src/assets/js/main.js'
import son from '/home/ubuntu/projects/front-end/src/assets/img/son.jpg'
import loc from '/home/ubuntu/projects/front-end/src/assets/img/l61003.jpg'

function MainComponent(){

  useEffect(() => {
    document.title = 'PhishBlock'; 
  }, []);

  const navigate = useNavigate()

  const [walletAvail, setWalletAvail] = useState(false);
  const [provider, setProvider] = useState(null);
  const [connected, setConnected] = useState(false);
  const [pubKey, setPubKey] = useState(null);

  useEffect(() => {
    if ("suiet" in window) {
      const suiWindow = window;
      if (suiWindow.suiet && suiWindow.suiet.isSuietWallet) {
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

    function Register(){
        navigate(`/register/${pubKey}`)
    }

    function moveToPhantom(){
      window.location.href = 'https://phantom.app/';
    }

    function download(){
      window.location.href = 'https://phantom.app/'
    }

    return (
      <body>
        <link rel="icon" type="image/x-icon" href="assets/img/icon.png" />

  <header id="header" class="fixed-top header-scrolled">
    <div class="container d-flex align-items-center justify-content-lg-between">

      <h1 class="logo me-auto me-lg-0"><a href="index.html"><img src={icon}/><span></span></a></h1>

      <nav id="navbar" class="navbar order-last order-lg-0">
        <ul>
          <li><a class="nav-link scrollto active" href="#hero">Home</a></li>
          <li><a class="nav-link scrollto" href="#about">Register</a></li>
          <li><a class="nav-link scrollto" href="#services">Wallet</a></li>
          <li><a class="nav-link scrollto " href="#portfolio">Portfolio</a></li>
          <li><a class="nav-link scrollto" href="#team">Team</a></li>
            
          <li><a class="nav-link scrollto" href="#contact">Contact</a></li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>


      {walletAvail ? (
  <>
    {connected ? (
      <a class="get-started-btn scrollto" style={{textDecoration: 'none'}} onClick={disconnectHandler}>
        Disconnect from Suiet Wallet
      </a>
    ) : (
      <a class="get-started-btn scrollto" style={{textDecoration: 'none'}} onClick={connectHandler}>
        Connect to Suiet Wallet
      </a>
    )}
  </>
) : (
  <>
    <a href="https://suiet.app/" style={{textDecoration: 'none'}} class="get-started-btn scrollto">
        Download Suiet Wallet
      </a>
  </>
)}

    </div>
  </header>

  <section id="hero" class="d-flex align-items-center justify-content-center">
    <div class="container" >

      <div class="row justify-content-center">
        <div class="col-xl-6 col-lg-8">
          <h1>PhishBlock<span>.</span></h1>
          <h2>Defend Yours With Blockchain</h2>
        </div>
      </div>

      <div class="row gy-4 mt-5 justify-content-center">
        <div class="col-xl-2 col-md-4">
          <div class="icon-box">
            <i class="ri-store-line"></i>
             {walletAvail ? (
  <>
    {connected ? (
      <h3>
        Connect Successfully. {pubKey.toString()}
      </h3>
    ) : (
      <h3>
        Please connect to your Suiet wallet to use our service.
      </h3>
    )}
  </>
) : (
  <>
    <h3><a href="https://suiet.app/">
        Oops! Suiet Wallet is not available. Go get it now
      </a></h3>
  </>
)}
          </div>
        </div>
      </div>


    </div>
  </section>

  <main id="main">

    {/* <!-- ======= Services Section ======= --> */}
    <section id="services" class="services">
      <div class="container">

        <div class="section-title">
          <h2>Services</h2>
          <p>Check our Services</p>
        </div>

        <div class="row">
          <div class="col-lg-4 col-md-6 d-flex align-items-stretch" >
            <div class="icon-box">
              <div class="icon"><i class="bx bxl-dribbble"></i></div>
              <h4><a style={{textDecoration: 'none'}} href="">User Subscription</a></h4>
              <p>Users pay a monthly fee to be protected from counterfeit websites on the Internet.</p>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0" >
            <div class="icon-box">
              <div class="icon"><i class="bx bx-file"></i></div>
              <h4><a style={{textDecoration: 'none'}} href="">Enterprise Subscription</a></h4>
              <p>Businesses utilize the service to prevent and identify counterfeit websites that target their enterprise.</p>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0" >
            <div class="icon-box">
              <div class="icon"><i class="bx bx-tachometer"></i></div>
              <h4><a style={{textDecoration: 'none'}} href="">Marketing Service</a></h4>
              <p>The business is awarded an NFT Certificate to verify that it has been protected and widely recognized within the community.</p>
            </div>
          </div>

        </div>

      </div>
    </section>

    <section id="cta" class="cta">
      <div class="container" >

        <div class="text-center">
          <h3>Click here to register</h3>
          <p>Protect your information with our PhishBlock service now.</p>
          {walletAvail ? (
  <>
    {connected ? (
      <>
        
        <a style={{textDecoration: 'none'}} onClick={Register} class="cta-btn">Click here to register</a>
      </>
    ) : (
      <>
         <a style={{textDecoration: 'none'}} class="cta-btn">
            Connect to Suiet Wallet
          </a>
      </>
    )}
  </>
) : 
<a style={{textDecoration: 'none'}} class="cta-btn" onClick={moveToPhantom}>Download Suiet Wallet.</a>
}
        </div>

      </div>
    </section>
    
  </main>

  <footer id="footer">
    <div class="footer-top">
      <div class="container">
        <div class="row">

          <div class="col-lg-3 col-md-6">
            <div class="footer-info">
              <h3>PhishBlock<span></span></h3>
              <p>Defend Yours With Blockchain</p>
              
              <div class="social-links mt-3">
                <a href="#" class="twitter"><i class="bx bxl-twitter"></i></a>
                <a href="#" class="facebook"><i class="bx bxl-facebook"></i></a>
                <a href="#" class="instagram"><i class="bx bxl-instagram"></i></a>
                <a href="#" class="google-plus"><i class="bx bxl-skype"></i></a>
                <a href="#" class="linkedin"><i class="bx bxl-linkedin"></i></a>
              </div>
            </div>
          </div>

          <div class="col-lg-2 col-md-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><i class="bx bx-chevron-right"></i> <a href="#">Home</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#">About us</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#">Services</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#">Terms of service</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#">Privacy policy</a></li>
            </ul>
          </div>

          <div class="col-lg-3 col-md-6 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li><i class="bx bx-chevron-right"></i> <a href="#">UserSubscription</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#">EnterpriseSubscription</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#">Marketing Serivce</a></li>
            </ul>
          </div>

          <div class="col-lg-4 col-md-6 footer-newsletter">
            <h4>Our Newsletter</h4>
          </div>

        </div>
      </div>
    </div>
  </footer>

</body>
    )
}

export default () => (
    <>
      <MainComponent />
    </>
  );