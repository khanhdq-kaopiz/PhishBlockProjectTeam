chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.active && (tab.url.startsWith('http://') || tab.url.startsWith('https://'))) {
        var url = tab.url;
        var path = tab.url.replace(/^https?:\/\//, '');
        console.log('data before sending: ',JSON.stringify({ url: path }))
        // Send URL to server for processing
        fetch('http://localhost:8080/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: path }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle server response here
            console.log(data)
            console.log(data.status)
            console.log(data.websiteMint)
            if(data.status === 0){
                const urlParams = new URLSearchParams();
                urlParams.set('websiteMint', data.websiteMint);
                urlParams.set('websiteName', data.websiteName);
                console.log(urlParams)
                console.log(urlParams.toString())
                chrome.tabs.create({ url: chrome.runtime.getURL(`popup3.html?${urlParams.toString()}`) });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});
