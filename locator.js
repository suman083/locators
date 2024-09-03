
let tagName = null;

document.addEventListener('keydown', function(event) {

	const hoveredElement = event.target; 
	console.log(hoveredElement)
	tagName = hoveredElement.tagName
	const attributes = hoveredElement.attributes;
	const attributesObj = {};

	for (let i 0; i < attributes.length; i++) { 
		const attr attributes[i];
		attributesObj[attr.name] attr.value; 
	}
}

function displayVariables() {
	document.getElementById("tagName").innerText = tagName;
	document.getElementById("cssSelector").innerText  ="div#id";
	document.getElementById("relXpath").innerText = "//"div";
	document.getElementById("absXpath").innerText = "/div/input";
}

displayVariables();



