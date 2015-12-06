
document.querySelector("#world").addEventListener("click", function (ev) {
  chrome.runtime.sendMessage("helpers.askForScreen");
});

var prefix = "screenshot:";

chrome.runtime.onMessage.addListener(function (message) {
  if (message.startsWith(prefix)) {
    var data = message.substring(prefix.length);
    console.log(data);
    document.getElementById("image").src = data;
    var i = 0;
    window.setInterval(function () {
      document.getElementById("msg").innerHTML = i++;
    }, 1000);
  }
})