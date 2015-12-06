chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  
  switch (message.type) {
    case "theHelpers.question":
      chrome.desktopCapture.chooseDesktopMedia([ "screen" ], function approved(id) {
        sendResponse({ id: id });
        if (!id) {
          rejected();
          return;
        }
        
        function stream(s) {
          var url = URL.createObjectURL(s);
          chrome.windows.create({
            url: "http://localhost:8000/chat.html#" + url,
            type: "panel",
            focused: true,
            width: 400,
            height: 400
          });
          
        }
        
        function error(error) {
          console.log(error);
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
      
      });
      break;
  }
});

if (chrome.browserAction) {
    
  chrome.browserAction.onClicked.addListener(function (tabs) {
    openPanel();
  });
  
}