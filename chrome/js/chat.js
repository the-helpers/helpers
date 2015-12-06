window.addEventListener('load', function (event) {
	document.getElementById('yesButton').addEventListener('click', function (event) {
		var shortId = window.location.hash.substring(1);
		
		var id = decodeURIComponent(url);
		
		console.log(id);
	});
});
