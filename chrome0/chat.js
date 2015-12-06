chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	
	console.log("A");
	console.log(message);
	console.log("B");
	
	switch (message.type) {
		case "theHelpers.connect":
			break;
	}
	
});