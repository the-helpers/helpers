window.addEventListener('load', function (event) {
	document.getElementById('yesButton').addEventListener('click', function (event) {
		var url = window.location.hash.substring(1);
		
		var decodedUrl = decodeURIComponent(url);
		
		var video = document.createElement("video");
		
		//video.src = decodedUrl;
	});
});
