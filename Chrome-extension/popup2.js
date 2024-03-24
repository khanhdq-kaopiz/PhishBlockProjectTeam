const proceedButton = document.getElementById('proceedButton');

proceedButton.addEventListener('click', () => {
  // Get the current tab's URL
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTabUrl = tabs[0].url;

    // Update the current tab with the original URL
    chrome.tabs.update(tabs[0].id, { url: currentTabUrl });

    // Close the popup
    window.close();
  });
});