chrome.browserAction.onClicked.addListener(function (tabs) {
  chrome.windows.create({
    url: "capture.html",
    type: "panel",
    focused: true,
    width: 400,
    height: 400
  });
});
	
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message === "askForScreen") {
    chrome.desktopCapture.chooseDesktopMedia([ "screen", "window" ], approved);
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
