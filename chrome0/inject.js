window.addEventListener("message", function (event) {
	console.log(event);
	if (event.source != window) {
		return;
	}
	switch (event.data.type) {
		case "theHelpers.shareScreen":
		case "theHelpers.question":
			console.log("I know this message:", event.data.type);
			chrome.runtime.sendMessage(event.data);
			break;
	}
}, false);

document.getElementsByTagName("body")[0].appendChild(document.createElement("hr"));