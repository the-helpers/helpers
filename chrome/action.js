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

function approved(id) {

  if (!id) {
    console.log("REJECTED");
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
  }, stream2, error);
}

function error(err) {
  console.log(err);
}

function stream2(stream) {
  chrome.runtime.sendMessage("screenshot:" + URL.createObjectURL(stream));
}

function stream(stream) {
  var video = document.createElement("video");
  video.videoWidth = screen.width;
  video.videoHeight = screen.height;
  video.height = screen.height;
  video.width = screen.width;
  video.src = URL.createObjectURL(stream);
  console.log(video.src);
  
  var canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  
  var context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, screen.width, screen.height);
  
  var data = canvas.toDataURL();
  console.log(data);
  chrome.runtime.sendMessage("screenshot:" + data)
}