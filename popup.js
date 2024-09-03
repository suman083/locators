// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // Update the popup with the received information
    document.getElementById('tag-name').textContent = request.tagName;
    document.getElementById('xpath').textContent = request.xpath;
    document.getElementById('css-selector').textContent = request.cssSelector;
});