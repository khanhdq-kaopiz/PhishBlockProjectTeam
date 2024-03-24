const proceedButton = document.getElementById('proceedButton');

const urlParams = new URLSearchParams(window.location.search);
const websiteMint = urlParams.get('websiteMint');
const websiteName = urlParams.get('websiteName');

document.addEventListener('DOMContentLoaded', function() {

  var websiteNameContainer = document.getElementById('website');
  websiteNameContainer.textContent = 'It seems like you want to visit this website: ' + websiteName;
});

proceedButton.addEventListener('click', () => {
  // Get the current tab's URL
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => { 
    console.log(websiteMint);

    const targetUrl = `http://localhost:4000/detail/${websiteMint}`;

    // Open the target URL in a new tab
    chrome.tabs.create({ url: targetUrl });

    // Close the popup
    window.close();
  });
});

continueButton.addEventListener('click', () => {
  // Get the current tab's URL
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => { 
    const currentTabUrl = tabs[0].url;
    
    // Open the current tab's URL in a new tab
    chrome.tabs.create({ url: currentTabUrl });

    // Close the popup
    window.close();
  });
});