

// Listen for a click event on the page
document.addEventListener('click', function(event) {
	event.preventDefault;
	event.stopImmediatePropagation();
	event.stopPropagation();
    const clickedElement = event.target;

    // Get the tag name
    const tagName = clickedElement.tagName;

    // Function to get the relative XPath
    function getXPath(element) {
        if (element.id) {
            return //*[@id="${element.id}"];
        } else {
            const parts = [];
            while (element && element.nodeType === Node.ELEMENT_NODE) {
                let siblingIndex = 0;
                let sibling = element.previousSibling;

                while (sibling) {
                    if (sibling.nodeType === Node.ELEMENT_NODE && sibling.nodeName === element.nodeName) {
                        siblingIndex++;
                    }
                    sibling = sibling.previousSibling;
                }

                const part = element.nodeName.toLowerCase() + (siblingIndex ? `[${siblingIndex + 1}]` : '');
                parts.unshift(part);
                element = element.parentNode;
            }
            return parts.length ? '/' + parts.join('/') : null;
        }
    }

    // Function to get the CSS selector
    function getCSSSelector(element) {
        if (element.id) {
            return `#${element.id}`;
        } else if (element.className) {
            return `${element.tagName.toLowerCase()}.${Array.from(element.classList).join('.')}`;
        } else {
            let path = [], sibling, nth;
            while (element.parentNode) {
                sibling = element;
                nth = 1;
                while (sibling.previousElementSibling) {
                    sibling = sibling.previousElementSibling;
                    if (sibling.tagName === element.tagName) nth++;
                }
                path.unshift(`${element.tagName.toLowerCase()}:nth-of-type(${nth})`);
                element = element.parentNode;
            }
            return path.join(' > ');
        }
    }

    // Get the relative XPath and CSS selector
    const xpath = getXPath(clickedElement);
    const cssSelector = getCSSSelector(clickedElement);
	
	console.log("xpath:" ,  xpath);
	console.log("css:" ,  cssSelector);

    // Send the information to the background script or popup
    chrome.runtime.sendMessage({
        tagName: tagName,
        xpath: xpath,
        cssSelector: cssSelector
    });
	

});