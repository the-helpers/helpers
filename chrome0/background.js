chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  
  switch (message.type) {
    case "theHelpers.question":
      
      chrome.windows.create({
        url: "chat.html",
        type: "panel",
        focused: true,
        width: 450,
        height: 400
      }, function whenDone() {
          
        chrome.desktopCapture.chooseDesktopMedia([ "screen" ], function approved(mediaId) {

          if (!mediaId) {
            rejected();
            return;
          }
          
          function gotStream(stream) {
            chrome.runtime.sendMessage({
              id: message.id,
              stream: stream,
              type: "theHelpers.connect"
            });
          }
          
          function gotError(error) {
            console.log(error);
          }
          
          navigator.webkitGetUserMedia({
            audio: {
              mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: mediaId
              }
            },
            video: {
              mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: mediaId,
                maxWidth: screen.width,
                maxHeight: screen.height
              }
            }
          }, gotStream, gotError);
        });
      });
  }
})


//chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  
function noop(){};

noop(function () {
  switch (message.type) {
    case "theHelpers.question":
      var shortId = message.id;
    
      console.log(shortId);
    
      chrome.desktopCapture.chooseDesktopMedia([ "screen" ], function approved(id) {
        sendResponse({ id: id });
        if (!id) {
          rejected();
          return;
        }
        
        function gotStream(stream) {
          
          chrome.windows.create({
            url: "http://localhost:8000/index.html#" + shortId,
            type: "panel",
            focused: true,
            width: 400,
            height: 400
          });
          
          var peer = new Peer(shortId, {
            host: 'localhost',
            port: 9000,
            path: '/'
          });
          
          console.log(peer);
          
          peer.on('call', function (call) {
            console.log(call);
            call.answer(stream);
            console.log('yea');
            call.on('stream', function (remoteStream) {
              console.log('remote stream?');
            });
          });
        }
        
        function gotError(error) {
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
        }, gotStream, gotError);
      
      });
      break;
  }
});

if (chrome.browserAction) {
    
  chrome.browserAction.onClicked.addListener(function (tabs) {
    openPanel();
  });
  
}
