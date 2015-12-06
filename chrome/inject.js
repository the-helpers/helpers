window.addEventListener("message", function (event) {
	console.log(event);
	if (event.source != window) {
		return;
	}
	switch (event.data.type) {
		case "theHelpers.question":
			console.log("I know this message");
			chrome.runtime.sendMessage(event.data);
			break;
	}
}, false);
