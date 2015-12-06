chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  
  switch (message.type) {
    case "theHelpers.question":
      chrome.windows.create({
        url: "http://localhost:8000/chat.html",
        type: "panel",
        focused: true,
        width: 400,
        height: 400
      });
      break;
  }
  
});



if (chrome.browserAction) {
    
  chrome.browserAction.onClicked.addListener(function (tabs) {
    openPanel();
  });
  
}
	
function openPanel() {
  chrome.windows.create({
    url: "capture.html",
    type: "panel",
    focused: true,
    width: 400,
    height: 400
  });
}
  
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message === "helpers.askForScreen") {
  }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log(message);
  switch (message) {
    case "helpers.shareScreen":
      chrome.desktopCapture.chooseDesktopMedia([ "screen", "window" ], function (id) {
        sendResponse({ id: id });
      });
      break;
    case "helpers.askForScreen":
      chrome.desktopCapture.chooseDesktopMedia([ "screen", "window" ], approved);
      break;
  }
});

function rejected() {
  console.log("rejected")
}

function approved(id) {

  if (!id) {
    rejected();
    return;
  }
  
  navigator.webkitGetUserMedia({
    audio: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: id
      }
    },
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: id,
        maxWidth: screen.width,
        maxHeight: screen.height
      }
    }
  }, stream, error);
}

function error(err) {
  console.log(err);
}

function stream(stream) {
  var url =  URL.createObjectURL(stream);
  chrome.runtime.sendMessage("screenshot:" + url);
  
  console.log(url);
}
