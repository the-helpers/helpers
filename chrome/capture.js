
document.querySelector("#world").addEventListener("click", function (ev) {
  chrome.runtime.sendMessage("askForScreen");
});

var prefix = "screenshot:";

chrome.runtime.onMessage.addListener(function (message) {
  if (message.startsWith(prefix)) {
    var data = message.substring(prefix.length);
    console.log(data);
    document.getElementById("image").src = data;
  }
})